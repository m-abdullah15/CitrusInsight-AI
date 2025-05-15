<?php
include('./connect.php');
session_start();

$user_id = $_SESSION['user_id'];
$model_name = $_SESSION['model_name'];
$predicted_class = $_POST['predicted_class'];
$confidence_score = $_POST['confidence_score'];

if (empty($predicted_class) || empty($confidence_score)) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit();
}

$sql = "INSERT INTO disease_report (user_id,model_name, prediction_result, confidence_score) VALUES (?,?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("issd", $user_id,$model_name, $predicted_class, $confidence_score);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => "DB Error"]);
}

$stmt->close();
$conn->close();
?>
