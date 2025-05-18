<?php
include 'connect.php';
session_start();

if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

$user_id = $_SESSION['user_id'];

// Handle profile update POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_profile'])) {
  $name = trim($_POST['name']);
  $email = trim($_POST['email']);

  // Simple validation
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $error = "Invalid email format.";
  } elseif (empty($name)) {
    $error = "Name cannot be empty.";
  } else {
    $stmt = $conn->prepare("UPDATE user_data SET name=?, email=? WHERE user_id=?");
    $stmt->bind_param("ssi", $name, $email, $user_id);
    if ($stmt->execute()) {
      // Update session variables too
      $_SESSION['name'] = $name;
      $_SESSION['email'] = $email;
      // Redirect to refresh page and show updated info
      header("Location: profile.php");
      exit();
    } else {
      $error = "Failed to update profile.";
    }
  }
}

// Fetch latest user data
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
  <style>
    body {
      
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0f172a;
      color: #f1f5f9;
    }

    .container {
      max-width: 900px;
      margin: 40px auto;
      padding: 20px;
      margin-top:90px;
    }

    h1 {
      text-align: left;
      font-size: 28px;
      margin-bottom: 20px;
    }
    .tabs {
      grid-column: span 2;
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .tab {
      background-color: #1e293b;
      color: #cbd5e1;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
    }

    .tab.active {
      background-color: #3b82f6;
      color: white;
    }

    .card {
      background-color: #1e293b;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 18px;
      margin-bottom: 16px;
      font-weight: bold;
    }

    .edit-button, .submit-button {
      background-color: #3b82f6;
      color: white;
      border: none;
      padding: 8px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 600;
    }

    .submit-button {
      display: none; /* hidden initially */
      background-color: #10b981;
    }

    .info-group {
      display: flex;
      align-items: center;
      gap: 15px;
      margin-bottom: 20px;
    }

    .avatar {
      width: 60px;
      height: 60px;
      background-color: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
    }

    .input-group {
      display: flex;
      gap: 40px;
      justify-content: flex-start;
    }

    .input-field {
      width: 45%;
    }

    .input-field label {
      display: block;
      font-size: 14px;
      margin-bottom: 6px;
      color: #94a3b8;
    }

    .input-field input {
      width: 100%;
      padding: 10px;
      background-color: #0f172a;
      border: 1px solid #334155;
      border-radius: 6px;
      color: #fff;
    }

    .input-field input:disabled {
      background-color: transparent;
      border: none;
      color: #cbd5e1;
      cursor: default;
    }

    .account-actions {
      display: flex;
      justify-content: space-between;
      gap: 10px;
    }

    .danger {
      background-color: #ef4444;
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
    }

    .logout {
      background-color: #334155;
      color: #cbd5e1;
      padding: 10px 20px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }

    .error {
      color: #ef4444;
      margin-bottom: 10px;
      font-weight: 600;
    }
    ul.links{
      margin-left: -35px;
    }
  </style>
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
            <p style="margin: 0; font-size: 14px; color: #cbd5e1;"><?= $email ?></p>
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
  document.querySelector(".logout-btn").addEventListener("click", ()=> {
window.open("logout.php", "_self");
});
</script>

</body>
</html>
