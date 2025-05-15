<?php
session_start();
header('Content-Type: application/json');
$conn=mysqli_connect('localhost','root','','citrus_insight');
if(!$conn){
    die(mysqli_error($conn));
}

$user_id = $_SESSION['user_id'];
// Adjust this query as needed (e.g. by session user)
$sql = "SELECT farm_size, plant_count, citrus_type FROM farm_data WHERE user_id = '$user_id'";
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(["error" => "No data found"]);
}

$conn->close();
?>