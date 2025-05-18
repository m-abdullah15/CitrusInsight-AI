<?php
include 'connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];

// Delete user from database
$stmt = $conn->prepare("DELETE FROM user_data WHERE user_id = ?");
$stmt->bind_param("i", $user_id);

if ($stmt->execute()) {
    // Clear session and redirect to index
    session_destroy();
    header("Location: index.php");
    exit();
} else {
    echo "Failed to delete account.";
}
?>
