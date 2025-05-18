<?php
include 'connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_profile'])) {
  $name = trim($_POST['name']);
  $email = trim($_POST['email']);

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $error = "Invalid email format.";
  } elseif (empty($name)) {
    $error = "Name cannot be empty.";
  } else {
    $stmt = $conn->prepare("UPDATE user_data SET name=?, email=? WHERE user_id=?");
    $stmt->bind_param("ssi", $name, $email, $user_id);
    if ($stmt->execute()) {
      $_SESSION['name'] = $name;
      $_SESSION['email'] = $email;
      header("Location: profile.php");
      exit();
    } else {
      $error = "Failed to update profile.";
    }
  }
}

$stmt = $conn->prepare("SELECT name, email FROM user_data WHERE user_id=?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result()->fetch_assoc();

$name = htmlspecialchars($result['name']);
$email = htmlspecialchars($result['email']);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Profile</title>
  <link rel="stylesheet" href="./css/navbar.css">
  <link rel="stylesheet" href="./css/profile.css">
</head>
<body>
  <nav>
<div class="navbar">
<div class="nav-links">
<ul class="links">
<div class="logo">
<img src="./assets/logo.png" alt="Citrus Insight AI Logo">
CitrusInsight AI
</div>
<a href="./recommendation_system.html"><li><button class="nav-btn">Recommendation System</button></li></a>
<a href="./disease_detection.php"><li><button class="nav-btn">Disease Detection</button></li></a>
<a href="./dashboard.php"><li><button class="nav-btn">Trade Dashboard</button></li></a>
<a href="./yearly_planner_en.html"><li><button class="nav-btn">Yearly Planner</button></li></a>
<a href="./fertilizer_schedule_en.html"><li><button class="nav-btn">Fertilizers Schedule</button></li></a>
<a href="./user_dashboard.php"><li><button class="nav-btn">User Dashboard</button></li></a> 
<a href="./index.php"><li><button class="logout-btn">
<svg class="logout-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10 15L15 12L10 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 12H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M20 4V20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>Logout</button>
</li>
</a>
</ul>
</div>
</div>
</nav>

  <div class="container">
    <h1>Profile Dashboard</h1>
    <div class="tabs">
      <a href="user_dashboard.php"><button class="tab">Overview</button></a>
      <a href="scan_history.php"><button class="tab">Scan History</button></a>
      <button class="tab active">Profile</button>
      <button class="theme-toggle" onclick="toggleTheme()">Toggle Mode</button>
    </div>

    <div class="card">
      <div class="card-header">
        Profile Information
        <button class="edit-button" id="editBtn">Edit Profile</button>
        <button class="submit-button" id="submitBtn" form="profileForm">Submit</button>
      </div>

      <?php if (isset($error)): ?>
        <p class="error"><?= $error ?></p>
      <?php endif; ?>

      <form id="profileForm" method="POST" action="profile.php">
        <input type="hidden" name="update_profile" value="1" />
        <div class="info-group">
          <div class="avatar"><?= strtoupper(substr($name, 0, 2)) ?></div>
          <div>
            <p style="margin: 0; font-weight: bold;"><?= $name ?></p>
            <p style="margin: 0; font-size: 14px; color: var(--profile-email);"><?= $email ?></p>
          </div>
        </div>

        <div class="input-group">
          <div class="input-field">
            <label for="name">Full Name</label>
            <input type="text" id="name" name="name" value="<?= $name ?>" disabled />
          </div>
          <div class="input-field">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" value="<?= $email ?>" disabled />
          </div>
        </div>
      </form>
    </div>

    <div class="card">
      <div class="card-header">Account Actions</div>
      <div class="account-actions">
        <form id="deleteForm" method="POST" action="delete_account.php" onsubmit="return confirm('Are you sure you want to delete your account? This action cannot be undone.');">
          <button type="submit" class="danger">Delete Account</button>
        </form>
        <form action="logout.php" method="post">
          <button type="submit" class="logout">Logout</button>
        </form>
      </div>
    </div>
  </div>

  <script>
    const editBtn = document.getElementById('editBtn');
    const submitBtn = document.getElementById('submitBtn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    editBtn.addEventListener('click', () => {
      nameInput.disabled = false;
      emailInput.disabled = false;
      submitBtn.style.display = 'inline-block';
      editBtn.style.display = 'none';
      nameInput.focus();
    });

    let mode = "light";
const themeToggle = document.querySelector(".theme-toggle");
 document.addEventListener("DOMContentLoaded", () => {
      document.body.classList.add("light");
      themeToggle.innerHTML = "Dark Mode";
    });
  function toggleTheme() {
if (mode === "light") {
        document.body.classList.add("dark");
        themeToggle.innerHTML = "Light Mode";
        mode = "dark";
      } else {
        document.body.classList.remove("dark");
        themeToggle.innerHTML = "Dark Mode";
        mode = "light";
      }
    };
     document.querySelector(".logout-btn")?.addEventListener("click", () => {
    window.open("logout.php", "_self");
  });
  </script>
</body>
</html>
