<?php
include 'connect.php'; 
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}
if (isset($_SESSION['user_date'])) {
    $user_date = $_SESSION['user_date'];
    $formatted_user_date = date('d M Y', strtotime($user_date));
} else {
    $user_date = null;
}
$name = $_SESSION['name'];
$email = $_SESSION['email'];
$user_id = $_SESSION['user_id'];
$model_name = $_SESSION['model_name'];
// Fetch 4 recent scans
$scan_sql = "SELECT report_id,prediction_result, confidence_score, time FROM disease_report WHERE user_id = ? ORDER BY time DESC LIMIT 3";
$stmt = $conn->prepare($scan_sql);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$scan_result = $stmt->get_result();
$scans = $scan_result->fetch_all(MYSQLI_ASSOC);

// Count scans
$today = date("Y-m-d");
$week_start = date("Y-m-d", strtotime("monday this week"));
$month_start = date("Y-m-01");

function get_count($conn, $user_id, $condition = "") {
  $sql = "SELECT COUNT(*) as count FROM disease_report WHERE user_id = ? $condition";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $user_id);
  $stmt->execute();
  $result = $stmt->get_result()->fetch_assoc();
  return $result['count'];
}

$total = get_count($conn, $user_id);
$today_count = get_count($conn, $user_id, "AND DATE(time) = '$today'");
$week_count = get_count($conn, $user_id, "AND DATE(time) >= '$week_start'");
$month_count = get_count($conn, $user_id, "AND DATE(time) >= '$month_start'");
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Citrus Disease Dashboard</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="./css/navbar.css">
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0f172a;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    header {
      width: 100%;
      text-align: center;
      padding: 20px 0;
      font-size: 24px;
      font-weight: bold;
      background-color: #1e293b;
      color: #3b82f6;
    }
    .user_dashboard{
      margin-left: 620px;
    }
    .dashboard {
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 20px;
      padding: 20px;
      width: 100%;
      max-width: 1200px;
      margin-top: 110px;
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

    .left-panel {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .statistics {
      display: flex;
      gap: 10px;
    }
.stat-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  justify-content: center;
}

    .stat-card {
      background-color: #1e293b;
      padding: 10px;
      flex: 1;
      border-radius: 10px;
      text-align: center;
    }

    .stat-card h3 {
      margin: 0;
      font-size: 14px;
      color: #94a3b8;
    }

    .stat-card p {
      font-size: 20px;
      margin-top: 10px;
      font-weight: bold;
    }

    .stat-card i {
      display: block;
      font-size: 18px;
      margin-bottom: 8px;
      color: #3b82f6;
    }

    .scan-list {
      background-color: #1e293b;
      padding: 20px;
      border-radius: 12px;
    }

    .scan-list h2 {
      margin-top: 0;
    }

    #scan-items {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    #scan-items li {
  background-color: #334155;
  margin-bottom: 8px;
  padding: 12px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}


    .view-all {
      margin-top: 10px;
      background-color: #3b82f6;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    .view{
      margin-top: 10px;
      background-color: #3b82f6;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
    .profile {
      background-color: #1e293b;
      padding: 15px;
      border-radius: 12px;
      text-align: center;
      width: 100%;
      max-width: 300px;
      align-self: start;
    }

    .avatar {
      width: 50px;
      height: 50px;
      background-color: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin: 0 auto 10px;
      font-weight: bold;
    }

    .email {
      color: #cbd5e1;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .badge {
      background-color: #10b981;
      padding: 5px 10px;
      border-radius: 8px;
      font-size: 12px;
      display: inline-block;
      margin-bottom: 20px;
      color:white;
    }

    .summary, .usage {
      text-align: left;
      margin-top: 20px;
    }

    .summary p, .usage p {
      margin: 8px 0;
    }

    progress {
      width: 100%;
      height: 8px;
      border-radius: 4px;
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

  <div class="dashboard">
    <div class="tabs">
      <button class="tab active">Overview</button>
      <a href="scan_history.php"><button class="tab">Scan History</button></a>
      <a href="profile.php"><button class="tab">Profile</button></a>
      
  </div>

    <div class="left-panel">
      <section class="statistics">
  <div class="stat-card">
    <div class="stat-header">
      <i class="fas fa-microscope" style="color: #3b82f6; font-size: 20px;"></i>
      <h3>Total Scans</h3>
    </div>
    <p><?= $total ?></p>
  </div>
  <div class="stat-card">
    <div class="stat-header">
      <i class="fas fa-calendar-week" style="color:rgb(127, 207, 81); font-size: 20px;"></i>
      <h3>This Week</h3>
    </div>
    <p><?= $week_count ?></p>
  </div>
  <div class="stat-card">
    <div class="stat-header">
      <i class="fas fa-calendar-day" style="color:rgb(207, 81, 186); font-size: 20px;"></i>
      <h3>Today</h3>
    </div>
    <p><?= $today_count ?></p>
  </div>
  <div class="stat-card">
    <div class="stat-header">
      <i class="fas fa-calendar-alt" style="color:rgb(184, 207, 81); font-size: 20px;"></i>
      <h3>This Month</h3>
    </div>
    <p><?= $month_count ?></p>
  </div>
</section>


      <section class="scan-list">
        <h2>Recent Scans</h2>
        <ul id="scan-items">
          <?php if (count($scans) > 0): ?>
            <?php foreach ($scans as $scan): ?>
              <li style="display: flex; justify-content: space-between; align-items: center;">
  <div style="display: flex; align-items: center; gap: 15px;">
    <i class="fas fa-image" style="color: #3b82f6; font-size: 20px;"></i>
    <div>
      <strong><?= htmlspecialchars($scan['prediction_result']) ?> - <?= $scan['confidence_score'] ?>%</strong><br>
      <small style="color: #94a3b8; font-size: 13px;"><?= date('d M Y', strtotime($scan['time'])) ?></small>
    </div>
  </div>
  <a href="view.php?report_id=<?= $scan['report_id'] ?>"><button class="view">
    View &gt;
  </button></a>
</li>


            <?php endforeach; ?>
          <?php else: ?>
            <li>No scan data found.</li>
          <?php endif; ?>
        </ul>
        <a href="scan_history.php"><button class="view-all">View All Scans</button></a>
      </section>
    </div>

    <aside class="profile">
      <div class="avatar"><?= strtoupper(substr($name, 0, 2)) ?></div>
      <h3><?= htmlspecialchars($name) ?></h3>
      <p class="email"><?= htmlspecialchars($email) ?></p>
      <a href="profile.php"><span class="badge">Edit Profile</span></a>

      <div class="summary">
        <p><strong>Member Since:</strong> <?= $formatted_user_date ?></p>
        <p><strong>Last Updated:</strong> May 5, 2025</p>
      </div>

      <div class="usage">
        <p>Daily Scan <progress value="<?= $today_count ?>" max="10"></progress></p>
        <p>Weekly Usage <progress value="<?= $week_count ?>" max="100"></progress></p>
        <p>Monthly Usage <progress value="<?= $month_count ?>" max="1000"></progress></p>
      </div>
    </aside>
  </div>
  <script>
    document.querySelector(".logout-btn").addEventListener("click", ()=> {
window.open("logout.php", "_self");
});
  </script>
</body>
</html>
