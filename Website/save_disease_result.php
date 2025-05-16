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

// Image upload path
$target_dir = "../../uploads/"; // 👈 Relative path from current file
$image_name = basename($_FILES["image"]["name"]);
$target_file = $target_dir . time() . "_" . $image_name; // Unique filename

// Move uploaded file
if (!move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    echo json_encode(["status" => "error", "message" => "Image upload failed"]);
    exit();
}

// Optional: Save image path to DB
$image_path = str_replace("../", "", $target_file);
$sql = "INSERT INTO disease_report (user_id,model_name, prediction_result, confidence_score,image_path) VALUES (?,?, ?, ?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issds", $user_id,$model_name, $predicted_class, $confidence_score, $image_path);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "DB Error"]);
}

$stmt->close();
$conn->close();
?>
