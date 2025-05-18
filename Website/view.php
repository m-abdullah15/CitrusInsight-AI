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
  <link rel="stylesheet" href="./css/navbar.css" />
  <link rel="stylesheet" href="./css/navbar.css">
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #0f172a;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    header {
      width: 100%;
      background-color: #1e293b;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      color: rgb(255, 255, 255);
      font-weight: bold;
    }

    .container {
      display: flex;
      flex-direction: row;
      gap: 50px;
      margin: 40px;
      max-width: 1200px;
      width: 100%;
      justify-content: space-between;
      margin-top: 110px;
    }

    .box {
      background-color: rgb(27, 37, 54);
      border-radius: 12px;
      border: 2px solid #1e293b;
      padding: 25px;
      flex: 1;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    h2 {
      margin-bottom: 20px;
      color: #3b82f6;
    }
    .box h2 {
      color: white;
      font-weight: bold;
      font-size: 30px;
    }
    .image-preview {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0f172a;
      border: 2px solid #3b82f6;
      border-radius: 12px;
      overflow: hidden;
      width: 400px;
      height: 400px;
      margin: 0 auto;
    }

    .image-preview img {
      max-height: 350px;
      max-width: 100%;
      height: auto;
      object-fit: contain;
      border-radius: 8px;
    }

    .timestamp {
      font-size: 14px;
      color: #94a3b8;
      margin-bottom: 20px;
      margin-top: -14px;
    }

    .risk-box {
      background-color: #1e293b;
      border-radius: 12px;
      padding: 15px 20px;
      position: relative;
      border: 1px solid #334155;
      margin-bottom: 20px;
      color: #f8fafc;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
    }

    .risk-box .icon {
      margin-right: 10px;
      font-size: 18px;
      vertical-align: middle;
    }

    .risk-box .risk-text {
      font-weight: bold;
      font-size: 16px;
      color: inherit;
    }

    /* Updated progress bar container with flex layout */
    .progress-container {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 10px;
    }

    .progress-container .label {
      white-space: nowrap;
      font-weight: bold;
      color: #fff;
      flex-shrink: 0;
    }

    .progress-bar-container {
      flex-grow: 1;
      height: 12px;
      background-color: #0f172a;
      border-radius: 20px;
      overflow: hidden;
      position: relative;
    }

    .progress-bar-fill {
      background-color: #3b82f6;
      height: 100%;
      transition: width 0.4s ease-in-out;
    }

    .progress-container .percentage {
      white-space: nowrap;
      font-weight: bold;
      color: #fff;
      flex-shrink: 0;
      min-width: 40px;
      text-align: right;
    }

    .risk-box.low .risk-text,
    .risk-box.low .icon {
      color: #10b981;
    }

    .risk-box.medium .risk-text,
    .risk-box.medium .icon {
      color: #fbbf24;
    }

    .risk-box.high .risk-text,
    .risk-box.high .icon {
      color: #ef4444;
    }

    .section {
      margin-top: 20px;
    }

    .section h4 {
      font-size: 18px;
      margin-bottom: 8px;
      color: #fbbf24;
    }

    .solution-box {
      background-color: #0f172a;
      border-left: 5px solid #fbbf24;
      padding: 15px;
      border-radius: 8px;
      font-size: 15px;
      color: #e2e8f0;
    }
    a {
      color: #3b82f6;
    }
    .back-btn {
      margin-top: 10px;
      text-align: right;
    }

    .back-btn a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: bold;
    }

    @media (max-width: 768px) {
      .container {
        flex-direction: column;
      }
    }
    .scan-another-btn {
  text-align: center;
  margin-top: 20px;
}

.scan-another-btn button {
  background-color: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.scan-another-btn button:hover {
  background-color: #2563eb;
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
document.querySelector(".logout-btn").addEventListener("click", ()=> {
window.open("logout.php", "_self");
});
</script> 
</body> </html>