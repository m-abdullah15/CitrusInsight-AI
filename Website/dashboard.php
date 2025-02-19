<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Dashboards</title>
  <link rel="stylesheet" href="../Website/css/dashboard.css">
	<link rel="stylesheet" href="../Website/css/progress.css">

    <script>
       // sidebar 
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("toggleBtn");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("mainContent");

    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      mainContent.classList.toggle("full-width");
    });
  });

  </script>
 </head>
<body>
  <!-- navbar  -->
<nav>
    <div class="navbar">
        <a href="#" class="logo">
            <img src="./assets/logo.png" alt="Citrus Insight AI Logo">
            CitrusInsight AI
        </a>
        <div class="nav-links">
            <ul class="links">
                <a href="./recommendation.html">
                  <li><button class="nav-btn">Recommendation System</button></li>
                </a>
                <a href="./disease_detection.html"><li><button class="nav-btn">Disease Detection</button></li></a>
                <a href="./dashboard.php"><li><button class="nav-btn">Trade Dashboard</button></li></a>
                <a href="./yearly_planner_en.html">
                <li><button class="nav-btn">Yearly Planner</button></li>
                </a>
                <a href="./fertilizer_schedule_en.html"><li><button class="nav-btn">Fertilizers Schedule</button></li></a> 
              <a href="./index.php"><li>
    <button class="logout-btn">
        <svg class="logout-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 15L15 12L10 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M15 12H3" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 4V20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Logout
    </button>
</li>

              </a>
            </ul>
          </div>
        </div>
      </nav>
      <!-- navbar  -->
	<div class="dashboard-page">
          <!-- Sidebar -->
<div class="sidebar" id="sidebar">
  <div class="sidebar-material">
    <a href="./dashboard.php"><h2>Citrus Dashboard</h2></a>
  <ul>
    <li><a href="import-export.html" class="nav-link">Import-Export Data</a></li>
    <li><a href="area.html" class="nav-link">Production Areas</a></li>
    <li><a href="production.html" class="nav-link">Citrus Production</a></li>
  </ul>
</div> 
</div>

<!-- Toggle Button Outside Sidebar -->
<button id="toggleBtn" class="toggle-btn">☰</button>

  <!-- Main Content -->
</div>
<div class="dashboard-content">
  <h1>Welcome to the Citrus Dashboard</h1>
  <p>Select an option from the sidebar to view detailed data.</p>
 <!-- Example Filter for Import/Export -->
  <div class="filter">
<label for="year-select">Select Year:</label>
<select id="year-select">
  <option value="2019">2019</option>
  <option value="2020">2020</option>
  <option value="2021">2021</option>
  <option value="2022">2022</option>
  <option value="2023" selected>2023</option>
</select>
</div>
</div>


<!-- <script src="../LoginSignup/assets/js/progress.js"></script> -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

</body>
</html>