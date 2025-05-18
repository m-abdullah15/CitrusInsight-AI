<?php
session_start();
include('./connect.php');

if(isset($_POST['signin'])){

    $username = $_POST['username'];
    $password = $_POST['password'];
    $select_query = "SELECT * FROM `user_data` WHERE username='$username'";
    $select_query2 = "SELECT * FROM `ML_model` WHERE model_id='1'";
    $result = mysqli_query($conn, $select_query);
    $result_model = mysqli_query($conn, $select_query2);
    $row_count = mysqli_num_rows($result);
    $row_data = mysqli_fetch_assoc($result);
    $row_count2 = mysqli_num_rows($result_model);
    $row_data2 = mysqli_fetch_assoc($result_model);
        if($row_count > 0){
    $model_name = $row_data2['model_name'];
    $pass = $row_data['password'];
    $name = $row_data['name'];
    $user_id = $row_data['user_id'];
    $email = $row_data['email'];
    $user_date = $row_data['date'];
    $_SESSION['name'] = $name;
    $_SESSION['user_id'] = $user_id;
    $_SESSION['user'] = $username;
    $_SESSION['email'] = $email;
    $_SESSION['model_name'] = $model_name;
    $_SESSION['user_date']=$user_date;

        if($password == $pass){ 
            echo "<script>alert('Welcome, " . addslashes($name) . "');</script>";
            echo "<script>window.open('disease_detection.php','_self')</script>";
        } else {
            echo "<script>alert('Incorrect Password or username')</script>";
        }
    } else {
        echo "<script>alert('User does not exist or wrong password')</script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Citrus Production</title>
    <link rel="stylesheet" href="../Website/css/login.css">
    <link rel="stylesheet" href="../Website/css/home.css">
</head>
<body>
    <!-- navbar -->
    <nav>
        <div class="navbar">
            <i class='bx bx-menu'></i>
            <div class="logo-container"></div>
            <div class="nav-links">
                <div class="sidebar-logo">
                    <span class="logo-name">Citrus Production</span>
                    <i class='bx bx-x'></i>
                </div>
                <ul class="links">
                    <li><a href="./index.php">Home</a></li>
                    <li><a href="./services.html">Our Services</a></li>
                    <li><a href="./about.html">About us</a></li>
                    <li><a href="./contact.html">Contact us</a></li>
                    <li><a href="./login.php" class="login-link">Login</a></li>
                    <li><a href="./signup.php" class="login-link">Sign-up</a></li>
                </ul>
            </div>
            <div class="search-box">
                <i class='bx bx-search'></i>
                <div class="input-box">
                    <input type="text" placeholder="Search...">
                </div>
            </div>
        </div>
    </nav>
    <!-- navbar end -->

    <div id="container" class="container">
        <!-- FORM SECTION -->
        <div class="row">
            <!-- SIGN UP -->
            <div class="col align-items-center flex-col sign-up">
                <div class="form-wrapper align-items-center">
                    <div class="form sign-up">
                        <div class="input-group">
                            <i class='bx bxs-user'></i>
                            <input type="text" placeholder="Username">
                        </div>
                        <div class="input-group">
                            <i class='bx bx-mail-send'></i>
                            <input type="email" placeholder="Email">
                        </div>
                        <div class="input-group">
                            <i class='bx bxs-lock-alt'></i>
                            <input type="password" placeholder="Password">
                        </div>
                        <div class="input-group">
                            <i class='bx bxs-lock-alt'></i>
                            <input type="password" placeholder="Confirm password">
                        </div>
                        <button>
                            Sign up
                        </button>
                        <p>
                            <span>
                                Already have an account?
                            </span>
                            <b onclick="toggle()" class="pointer">
                                Sign in here
                            </b>
                        </p>
                    </div>
                </div>
            </div>
            <!-- END SIGN UP -->

            <!-- SIGN IN -->
            <div class="col align-items-center flex-col sign-in">
                <div class="form-wrapper align-items-center">
                    <div class="form sign-in">
                        <!-- Wrap form inputs inside <form> tag -->
                        <form method="POST" action="login.php">
                            <div class="input-group">
                                <i class='bx bxs-user'></i>
                                <input type="text" name="username" placeholder="Username" required>
                            </div>
                            <div class="input-group">
                                <i class='bx bxs-lock-alt'></i>
                                <input type="password" name="password" placeholder="Password" required>
                            </div>
                            <button type="submit" name="signin">
                                Sign in
                            </button>
                        </form>
                        <p>
                            <b>
                                Forgot password?
                            </b>
                        </p>
                        <p>
                            <span>
                                Don't have an account?
                            </span>
                            <a href="signup.php"><b class="pointer">
                                Sign up here
                            </b></a>
                        </p>
                    </div>
                </div>
                <div class="form-wrapper"></div>
            </div>
            <!-- END SIGN IN -->
        </div>
        <!-- END FORM SECTION -->

        <!-- CONTENT SECTION -->
        <div class="row content-row">
            <!-- SIGN IN CONTENT -->
            <div class="col align-items-center flex-col">
                <div class="text sign-in">
                    <h2>
                        Welcome To The Citrus Insight AI
                    </h2>
                </div>
            </div>
            <!-- END SIGN IN CONTENT -->
            <!-- SIGN UP CONTENT -->
            <div class="col align-items-center flex-col">
                <div class="img sign-up"></div>
                <div class="text sign-up">
                    <h2>
                        Join Us For Better Production !
                    </h2>
                </div>
            </div>
            <!-- END SIGN UP CONTENT -->
        </div>
    </div>

    <script src="../Website/js/login.js"></script>
    <script src="../Website/js/about.js"></script>
</body>
</html>
