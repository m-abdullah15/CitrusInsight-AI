<?php
include('./connect.php');

// Initialize variables for errors or success messages
$errorMessage = '';
$successMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['signup'])) {
    $name = $_POST['name'] ?? '';
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['conpassword'] ?? '';
    $date=date("Y-m-d");
    // Validation: Check if passwords match
    if ($password !== $confirmPassword) {
        $errorMessage = 'Passwords do not match!';
    } else {
        
        // Insert into database
        $query = "INSERT INTO `user_data` ( name , username, email, password,date) VALUES ('$name','$username', '$email', '$password','$date')";
        if (mysqli_query($conn, $query)) {
            $successMessage = 'Sign up successful!';
            echo "<script>alert('$successMessage');</script>";
            echo "<script>window.open('login.php', '_self');</script>";
        } else {
            $errorMessage = 'Error: ' . mysqli_error($conn);
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Citrus Production</title>
    <link rel="stylesheet" href="../Website/css/home.css" />
    <link rel="stylesheet" href="../Website/css/signup.css" />
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
                    <li><a href="index.php">Home</a></li>
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
                        
                    <form method="POST" action="signup.php" id="signupForm">
                    <div class="input-group">
                    <i class="bx bxs-user"></i>
                    <input type="text" name="name" placeholder="Name" required />
                    <span id="nameError" class="error-msg"></span>
                    </div>
                    <div class="input-group">
                    <i class="bx bxs-user"></i>
                    <input type="text" name="username" placeholder="Username" required />
                    <span id="usernameError" class="error-msg"></span>
                    </div>
                    <div class="input-group">
                    <i class="bx bx-mail-send"></i>
                    <input type="email" name="email" placeholder="Email" required />
                    <span id="emailError" class="error-msg"></span>
                    </div>
                    <div class="input-group">
                    <i class="bx bxs-lock-alt"></i>
                    <input type="password" name="password" placeholder="Password" required />
                    <span id="passwordError" class="error-msg"></span>
                    </div>
                    <div class="input-group">
                    <i class="bx bxs-lock-alt"></i>
                    <input type="password" name="conpassword" placeholder="Confirm password" required />
                    <span id="confirmPasswordError" class="error-msg"></span>
                    </div>
                    <button type="submit" name="signup">Sign up</button>
                    </form>


                        <p>
                            <span>Already have an account?</span>
                            <a href="login.php"><b class="pointer">Sign in here</b></a>
                        </p>
                    </div>
                </div>
            </div>
            <!-- END SIGN UP -->
        </div>
        <!-- END FORM SECTION -->

        <!-- CONTENT SECTION -->
        <div class="row content-row">
            <!-- SIGN IN CONTENT -->
            <div class="col align-items-center flex-col">
                <div class="text sign-in">
                    <h2>Welcome To The Citrus Insight AI</h2>
                </div>
                <div class="img sign-in"></div>
            </div>
            <!-- END SIGN IN CONTENT -->
            <!-- SIGN UP CONTENT -->
            <div class="col align-items-center flex-col">
                <div class="img sign-up"></div>
                <div class="text sign-up">
                    <h2>Join Us For Better Production !</h2>
                </div>
            </div>
            <!-- END SIGN UP CONTENT -->
        </div>
        <!-- END CONTENT SECTION -->
    </div>
    <script src="../Website/js/signup.js"></script>
    <script src="../Website/js/about.js"></script>
</body>
</html>
