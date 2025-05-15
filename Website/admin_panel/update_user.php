<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $username = $_POST['username'];
    $email = $_POST['email'];

    if (!empty($_POST['password'])) {
        $password = $_POST['password'];
        $stmt = $conn->prepare("UPDATE user_data SET name=?, username=?, email=?, password=? WHERE user_id=?");
        $stmt->bind_param("ssssi", $name, $username, $email, $password, $id);
    } else {
        $stmt = $conn->prepare("UPDATE user_data SET name=?, username=?, email=? WHERE user_id=?");
        $stmt->bind_param("sssi", $name, $username, $email, $id);
    }

    if ($stmt->execute()) {
        header("Location: admin_panel.php");
    } else {
        echo "Update Error: " . $stmt->error;
    }
    $stmt->close();
}
?>
