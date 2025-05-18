<?php
include 'connect.php';
session_start();
if (!isset($_SESSION['user_id'])) {
  header("Location: login.php");
  exit();
}
if (isset($_GET['report_id'])) {
  $scan_id = $_GET['report_id'];
  $_SESSION['report_id'] = $scan_id; // Optional: save it for later
} elseif (isset($_SESSION['report_id'])) {
  $scan_id = $_SESSION['report_id'];
} else {
  echo "No scan ID provided.";
  exit();
}

$user_id = $_SESSION['user_id'];
$path_addition = '../../'; // Path to add to the image path
// Fetch scan detail
$sql = "SELECT * FROM disease_report WHERE report_id = ? AND user_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $scan_id, $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
  echo "No scan found.";
  exit();
}

$row = $result->fetch_assoc();
$image_path = $path_addition.$row['image_path'];
$confidence = $row['confidence_score'];
$disease = $row['prediction_result'];
$timestamp = date('d M Y, h:i A', strtotime($row['time']));
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Scan Details</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="./css/navbar.css"/>
  <link rel="stylesheet" href="./css/view.css">
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
    <button class="theme-toggle" onclick="toggleTheme()">Toggle Mode</button>
    <!-- Image Container -->
    <div class="box">
      <h2>Image Scanned</h2>
      <div class="image-preview">
        <img src="<?= htmlspecialchars($image_path) ?>" alt="Scanned Leaf" />
      </div>
      <div class="scan-another-btn">
  <a href="disease_detection.php">
    <button>Scan Another Image</button>
  </a>
</div>

    </div>

    <!-- Analysis Container -->
    <div class="box">
      <h2>Analysis Result</h2> 
      <div class="timestamp">Scanned on: <?= $timestamp ?></div>

      <div class="section">
        <div class="risk-box <?= ($confidence < 40) ? 'low' : (($confidence <= 70) ? 'medium' : 'high') ?>">
          <i class="fas fa-info-circle icon"></i>
          <span class="risk-text">
            <?= ($confidence < 40) ? 'Low Risk' : (($confidence < 60) ? 'Medium Risk' : 'High Risk') ?> - <?= htmlspecialchars($disease) ?>
          </span>

          <div class="progress-container">
            <span class="label">Confidence Score</span>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: <?= $confidence ?>%;"></div>
            </div>
            <span class="percentage"><?= $confidence ?>%</span>
          </div>
        </div>
      </div>

      <div class="section">
        <h4>Detected Disease</h4>
        <div class="solution-box">
          <strong><?= htmlspecialchars($disease) ?></strong>
        </div>
      </div>

      <div class="section">
        <h4>Solution</h4>
        <div class="solution-box" id="solution">
        </div>
      </div>
    </div>
  </div>
  <script>
    let solution = document.querySelector('#solution');
    let predictedClass = "<?= $disease; ?>";

    if (predictedClass == "Citrus canker") {
      solution.innerHTML = "<h2>Chemical control</h2><ul><li>1st spray of Bordeauxe mixture (1%) after fruit harvest).</li><li>2nd spray during the month of April Copper Oxycholoride @3gm/lit. of water)</li><li>3rd spray during the month of July-August Copper Hydrooxide @2.5gm/lit. of water</li></ul>Early detection and removal of infected plants are crucial.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a> ";
    } else if (predictedClass == "Citrus greening") {
      solution.innerHTML = "<ul><li>Removal of infected trees</li><li>Vector control  ( citrus psylla) by spraying Novastar or Confidar @1ml/lit. of water</li><li> Disease free planting material.</li></ul> There is no cure for the disease,but treatment of the corresponding infestation with conventional insecticides and removal of the infected trees is mandatory.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
    } else if (predictedClass== "Citrus mealybugs") {
      solution.innerHTML = "<ul><li>Pruning of heavily infested twigs</li><li>Spraying of water-diluted neem oil or insecticides.</li><li>Maintaining good orchard hygiene.</li></ul> Control measures should focus on early detection and insecticide application.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
} else if (predictedClass == "Die back") {
solution.innerHTML = "<ul><li>Pruning of affected branches</li><li>Spraying fungicides such as copper oxychloride.</li><li>Ensure proper irrigation and fertilization</li></ul> Regular monitoring and maintaining tree health can reduce incidence.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
} else if (predictedClass == "Foliage damaged") {
solution.innerHTML = "<ul><li>Identify and remove the cause of damage (pests, weather)</li><li>Apply appropriate treatments like insecticides or fertilizers.</li></ul> Prevention is better by maintaining orchard health.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
} else if (predictedClass == "Healthy leaf") {
solution.innerHTML = "No disease detected. Keep maintaining good agricultural practices.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
} else if (predictedClass == "Powdery mildew") {
solution.innerHTML = "<ul><li>Apply fungicides like sulfur or neem oil.</li><li>Ensure good air circulation around plants.</li></ul> Early treatment reduces spread.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
} else if (predictedClass == "Shot hole") {
solution.innerHTML = "<ul><li>Spray with copper fungicides.</li><li>Remove and destroy infected leaves.</li></ul> Keep orchard clean to minimize infection.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
} else if (predictedClass == "Spiny whitefly") {
solution.innerHTML = "<ul><li>Spray insecticides targeting whiteflies.</li><li>Use yellow sticky traps to monitor.</li></ul> Regular monitoring is key.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
} else if (predictedClass == "Yellow leaves") {
solution.innerHTML = "<ul><li>Check for nutrient deficiencies and correct fertilization.</li><li>Inspect for root diseases or pests.</li></ul> Proper diagnosis is essential.<h4 class='solution_heading'>Source:</h4><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
} else {
solution.innerHTML = "Solution not available for this disease.";
}
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
document.querySelector(".logout-btn").addEventListener("click", ()=> {
window.open("logout.php", "_self");
});
</script> 
</body> </html>