<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("INSERT INTO user_data (name, username, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $username, $email, $password);

    if ($stmt->execute()) {
        header("Location: admin_panel.php");
    } else {
        echo "Error: " . $stmt->error;
    }
    $stmt->close();
}
?>
