<?php
include 'connect.php';
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}

$name = $_SESSION['name'];
$email = $_SESSION['email'];
$user_id = $_SESSION['user_id'];

$scan_sql = "SELECT report_id, prediction_result, confidence_score, time FROM disease_report WHERE user_id = ? ORDER BY time DESC";
$stmt = $conn->prepare($scan_sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$scan_result = $stmt->get_result();
$scans = $scan_result->fetch_all(MYSQLI_ASSOC);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Scan History - Citrus Insight</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="./css/navbar.css">
  <link rel="stylesheet" href="./css/scan_history.css">
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
    <h1>Scan History</h1>
    <div class="tabs">
      <a href="user_dashboard.php"><button class="tab">Overview</button></a>
      <button class="tab active">Scan History</button>
      <a href="profile.php"><button class="tab">Profile</button></a>
      <button class="theme-toggle" onclick="toggleTheme()">Toggle Mode</button>
    </div>

    <ul class="scan-list">
      <?php if (count($scans) > 0): ?>
        <?php foreach ($scans as $scan): ?>
          <li>
            <div class="scan-info">
              <i class="fas fa-image"></i>
              <div class="scan-details">
                <strong><?= htmlspecialchars($scan['prediction_result']) ?> - <?= $scan['confidence_score'] ?>%</strong>
                <small><?= date('d M Y, h:i A', strtotime($scan['time'])) ?></small>
              </div>
            </div>
            <a href="view.php?report_id=<?= $scan['report_id'] ?>" class="btn">View ></a>
          </li>
        <?php endforeach; ?>
      <?php else: ?>
        <li>No scans found.</li>
      <?php endif; ?>
    </ul>
  </div>

  <script>
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
