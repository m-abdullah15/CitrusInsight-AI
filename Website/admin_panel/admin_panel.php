<?php include 'connect.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin Panel</title>
    <style>
        * { box-sizing: border-box; font-family: 'Segoe UI', Tahoma, sans-serif; }
        body { margin: 0; padding: 0; background: #f4f7f9; }
        .container {
            max-width: 1100px; margin: 50px auto; padding: 20px;
            background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.1); border-radius: 12px;
        }
        h2 { text-align: center; color: #2c3e50; }
        .add-user-form {
            display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; margin: 20px 0;
        }
        .add-user-form input {
            padding: 10px; width: 200px; border: 1px solid #ccc; border-radius: 8px;
        }
        .add-user-form button {
            padding: 10px 20px; background-color: #3498db; color: #fff;
            border: none; border-radius: 8px; cursor: pointer;
        }
        .add-user-form button:hover { background-color: #2980b9; }
        table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        th, td {
            padding: 14px; text-align: center; border-bottom: 1px solid #ddd;
        }
        th { background-color: #3498db; color: white; }
        tr:hover { background-color: #f1f1f1; }
        input[type="text"], input[type="email"], input[type="password"] {
             padding: 6px; border: 1px solid #ccc; border-radius: 6px;
        }
        button { margin: 4px; padding: 6px 14px; border: none; border-radius: 6px; cursor: pointer; color: white; }
        button[type="submit"] { background-color: #2ecc71; }
        button[type="submit"]:hover { background-color: #27ae60; }
        form[action="delete_user.php"] button { background-color: #e74c3c; }
        form[action="delete_user.php"] button:hover { background-color: #c0392b; }
    </style>
</head>
<body>

<div class="container">
    <h2>Admin Panel - User Management</h2>

    <!-- Add User Form -->
    <form class="add-user-form" method="POST" action="add_user.php">
        <input type="text" name="name" placeholder="Full Name" required>
        <input type="text" name="username" placeholder="Username" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Add User</button>
    </form>

    <!-- Show Users -->
    <table>
        <tr>
            <th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>Password</th><th>Actions</th>
        </tr>
        <?php
        $result = $conn->query("SELECT * FROM user_data");
        while($row = $result->fetch_assoc()) {
            echo "<tr>
                    <form method='POST' action='update_user.php'>
                        <td>{$row['user_id']}
                            <input type='hidden' name='id' value='{$row['user_id']}'>
                        </td>
                        <td><input type='text' name='name' value='{$row['name']}' required></td>
                        <td><input type='text' name='username' value='{$row['username']}' required></td>
                        <td><input type='email' name='email' value='{$row['email']}' required></td>
                        <td><input type='password' name='password' placeholder='New Password'></td>
                        <td>
                            <button type='submit'>Update</button>
                    </form>
                    <form method='POST' action='delete_user.php' onsubmit=\"return confirm('Are you sure?');\">
                        <input type='hidden' name='id' value='{$row['user_id']}'>
                        <button type='submit'>Delete</button>
                    </form>
                    </td>
                </tr>";
        }
        ?>
    </table>
</div>

</body>
</html>
