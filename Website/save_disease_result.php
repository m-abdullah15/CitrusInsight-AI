<?php
require __DIR__ . '/vendor/autoload.php'; // include Cloudinary SDK
include('./connect.php');
session_start();

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;

// ===== CLOUDINARY CONFIGURATION =====
Configuration::instance([
    'cloud' => [
        'cloud_name' => 'dnhy8zo1b',   // 🔹 replace with your Cloudinary cloud name
        'api_key'    => '125242777624126',      // 🔹 replace with your API key
        'api_secret' => 'EjIBsze87CLWcpuI1JFMJiD2qf8'    // 🔹 replace with your API secret
    ],
    'url' => [
        'secure' => true
    ]
]);

// ===== SESSION & POST DATA =====
$user_id = $_SESSION['user_id'];
$model_name = $_SESSION['model_name'];
$predicted_class = $_POST['predicted_class'] ?? null;
$confidence_score = $_POST['confidence_score'] ?? null;

if (empty($predicted_class) || empty($confidence_score)) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit();
}
if (!$user_id || !$model_name) {
    echo json_encode(["status" => "error", "message" => "Missing session data"]);
    exit();
}

// ===== IMAGE UPLOAD TO CLOUDINARY =====
try {
    $file_tmp = $_FILES['image']['tmp_name'];

    // ✅ Compress image before upload if larger than 2MB
    if ($_FILES['image']['size'] > 2000000) { // 2 MB
        $img = imagecreatefromstring(file_get_contents($file_tmp));
        if ($img !== false) {
            imagejpeg($img, $file_tmp, 70); // Compress to 70% quality
            imagedestroy($img);
        }
    }

    // Upload the (possibly compressed) file to Cloudinary
    $upload = (new UploadApi())->upload($file_tmp, [
        'folder' => 'citrus_disease_scans', // Folder name in Cloudinary
        'public_id' => time() . '_' . pathinfo($_FILES['image']['name'], PATHINFO_FILENAME),
        'overwrite' => false,
        'resource_type' => 'image'
    ]);

    $image_path = $upload['secure_url']; // ✅ Get the hosted image URL
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Cloudinary upload failed: " . $e->getMessage()]);
    exit();
}

// ===== SAVE TO DATABASE =====
$sql = "INSERT INTO disease_report (user_id, model_name, prediction_result, confidence_score, image_path)
        VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issds", $user_id, $model_name, $predicted_class, $confidence_score, $image_path);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "Database insert failed"]);
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// ===== FETCH LATEST REPORT ID =====
$sql2 = "SELECT report_id FROM disease_report WHERE user_id = ? ORDER BY time DESC LIMIT 1";
$stmt2 = $conn->prepare($sql2);
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$stmt2->bind_result($report_id);

if ($stmt2->fetch()) {
    $_SESSION['report_id'] = $report_id;
    echo json_encode(["status" => "success", "report_id" => $report_id, "image_url" => $image_path]);
} else {
    echo json_encode(["status" => "error", "message" => "No report found after insert"]);
}

$stmt2->close();
$conn->close();
?>
