<?php
include 'connect.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];

    $stmt = $conn->prepare("DELETE FROM user_data WHERE user_id=?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        header("Location: admin_panel.php");
    } else {
        echo "Delete Error: " . $stmt->error;
    }
    $stmt->close();
}
?>
