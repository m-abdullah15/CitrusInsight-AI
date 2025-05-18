<?php
include('./connect.php');
session_start();
if (!isset($_SESSION['user_id'])) {
  echo "<script>alert('Please login first');</script>";
  echo "<script>window.open('login.php','_self')</script>";
  exit();
}
$user_id = $_SESSION['user_id'];
$model_name = $_SESSION['model_name'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CitrusInsight-AI</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
  <link rel="stylesheet" href="./css/navbar.css">
  <link rel="stylesheet" href="./css/disease_detection.css">
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
    <div class="header-container">
      <div style="display: flex; align-items: center; gap: 12px;">
        <h1>AI-Powered <span>Citrus Disease Detection</span></h1>
        <button class="theme-toggle" onclick="toggleTheme()">Toggle Theme</button>
      </div>
    </div>
    <p class="description">Our advanced AI analyzes your Citrus Plant with 95.8% accuracy in seconds</p>

    <div class="upload-section">
      <div class="upload-header">
        <div>
          <strong><h2>Leaf Image Scan</h2></strong>
          <p class="upload-subtext">Upload a Leaf image for advanced AI analysis with real-time Disease Detection</p>
        </div>
        <div class="button-group">
          <button class="custom-file-upload btn" id="captureButton"><i class="fas fa-camera"></i> Use Camera</button>
          <button class="custom-file-upload btn" id="selectButton"><i class="fas fa-upload"></i> Upload Image</button>
          <input type="file" id="cameraInput" accept="image/*" capture="environment" style="display: none;">
          <input type="file" id="fileInput" accept="image/*" style="display: none;">
        </div>
      </div>

      <div class="drop-area">
        <div class="upload-icon">
          <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 12l8-8 8 8M12 4v16" />
          </svg>
        </div>
        <p>Drag & Drop your Image here</p>
        <p style="font-size: 12px;">or click to browse your files (JPEG, JPG, PNG etc)</p>
        <button class="browse-btn">Browse Files</button>
      </div>
    </div>
  </div>

  <div id="loaderOverlay">
    <div class="branded-loader"></div>
    <p style="margin-top: 20px; font-size: 18px; color: #c084fc; font-weight: 600;">Analyzing Leaf... Please wait</p>
  </div>

  <script>
    let mode = "light";
    let themeToggle = document.querySelector(".theme-toggle");
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
    }

    document.getElementById("captureButton").addEventListener("click", () => {
      document.getElementById("cameraInput").click();
    });

    document.getElementById("selectButton").addEventListener("click", () => {
      document.getElementById("fileInput").click();
    });

    document.querySelector(".browse-btn").addEventListener("click", () => {
      document.getElementById("fileInput").click();
    });

    document.getElementById("fileInput").addEventListener("change", () => {
      predictDisease();
    });

    document.getElementById("cameraInput").addEventListener("change", () => {
      predictDisease();
    });

    const dropArea = document.querySelector(".drop-area");
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = "#dbeafe";
    });

    dropArea.addEventListener("dragleave", () => {
      dropArea.style.backgroundColor = "var(--drop-bg)";
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        document.getElementById("fileInput").files = files;
        predictDisease();
      }
    });

    async function predictDisease() {
      const fileInput = document.getElementById("fileInput").files[0] || document.getElementById("cameraInput").files[0];
      if (!fileInput) {
        alert("Please select an image!");
        return;
      }
      const loader = document.getElementById("loaderOverlay");
      loader.style.display = "flex";
      loader.style.opacity = "1";

      let reader = new FileReader();
      reader.readAsDataURL(fileInput);
      reader.onload = async function () {
        try {
          const { Client } = await import("https://esm.sh/@gradio/client");
          const client = await Client.connect("https://abdjutt777-citrus-demo.hf.space/");
          const result = await client.predict("/predict", { image: fileInput });

          const predictedClass = result.data[0];
          const Confidence = parseFloat(result.data[1]);

          const formData = new FormData();
          formData.append('predicted_class', predictedClass);
          formData.append('confidence_score', Confidence);
          formData.append('image', fileInput);

          fetch('save_disease_result.php', {
            method: 'POST',
            body: formData
          })
            .then(response => response.text())
            .then(raw => {
              try {
                const data = JSON.parse(raw);
                if (data.status === "success") {
                  setTimeout(() => {
                    loader.style.opacity = "0";
                    setTimeout(() => {
                      window.location.href = "view.php";
                    }, 500);
                  }, 800);
                } else {
                  console.error("Failed to save report:", data.message);
                }
              } catch (e) {
                console.error("Error parsing JSON:", e, raw);
              }
            })
            .catch(error => console.error("Fetch error:", error));

        } catch (error) {
          console.error("Prediction error:", error);
          alert("\u26A0\uFE0F Error in prediction!");
          loader.style.display = "none";
        }
      };
    }
  </script>
</body>
</html>
