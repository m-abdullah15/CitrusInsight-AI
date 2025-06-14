<?php
include('./connect.php');
session_start();

$user_id = $_SESSION['user_id'];
$model_name = $_SESSION['model_name'];
$predicted_class = $_POST['predicted_class'] ?? null;
$confidence_score = $_POST['confidence_score'] ?? null;

if (empty($predicted_class) || empty($confidence_score)) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit();
}
if (!$user_id || !$model_name) {
    echo json_encode(["status" => "error", "message" => "Missing session data", "user_id" => $user_id, "model_name" => $model_name]);
    exit();
}

// Image upload
$target_dir = "../uploads/";
$image_name = basename($_FILES["image"]["name"]);
$target_file = $target_dir . time() . "_" . $image_name;

if (!move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    echo json_encode(["status" => "error", "message" => "Image upload failed"]);
    exit();
}

$image_path = str_replace("../", "", $target_file);

// Save record to database
$sql = "INSERT INTO disease_report (user_id, model_name, prediction_result, confidence_score, image_path) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issds", $user_id, $model_name, $predicted_class, $confidence_score, $image_path);

if (!$stmt->execute()) {
    echo json_encode(["status" => "error", "message" => "DB Insert Error"]);
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Get latest report ID
$sql2 = "SELECT report_id FROM disease_report WHERE user_id = ? ORDER BY time DESC LIMIT 1";
$stmt2 = $conn->prepare($sql2);
$stmt2->bind_param("i", $user_id);
$stmt2->execute();
$stmt2->bind_result($report_id);

if ($stmt2->fetch()) {
    $_SESSION['report_id'] = $report_id;
    echo json_encode(["status" => "success", "report_id" => $report_id]);
} else {
    echo json_encode(["status" => "error", "message" => "No report found after insert"]);
}

$stmt2->close();
$conn->close();
?>
