<?php
// Set headers
header("Content-Type: application/json");
session_start();
$user_id=$_SESSION['user_id'];
// Get the JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Check if all required fields are present
if (!isset($data['farm_size'], $data['plant_count'], $data['soil_type'], $data['avg_temperature'], $data['citrus_type'])) {
    echo json_encode(["success" => false, "message" => "Incomplete data."]);
    exit;
}

include('./connect.php');

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO farm_data (user_id,farm_size, plant_count, soil_type, avg_temperature, citrus_type) VALUES (?,?, ?, ?, ?, ?)");
$stmt->bind_param("dddsds", $user_id,$farm_size, $plant_count, $soil_type, $avg_temperature, $citrus_type);

// Set parameters
$farm_size = $data['farm_size'];
$plant_count = $data['plant_count'];
$soil_type = $data['soil_type'];
$avg_temperature = $data['avg_temperature'];
$citrus_type = $data['citrus_type'];

// Execute statement
if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => $stmt->error]);
}

// Close connections
$stmt->close();
$conn->close();
?>
