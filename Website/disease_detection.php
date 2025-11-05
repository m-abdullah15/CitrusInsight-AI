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

  <script type="module">
  import { Client } from "https://esm.sh/@gradio/client";

  let mode = "light";
  const themeToggle = document.querySelector(".theme-toggle");
  const loader = document.getElementById("loaderOverlay");

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
  window.toggleTheme = toggleTheme;

  const captureButton = document.getElementById("captureButton");
  const selectButton = document.getElementById("selectButton");
  const fileInput = document.getElementById("fileInput");
  const cameraInput = document.getElementById("cameraInput");

  captureButton.onclick = () => cameraInput.click();
  selectButton.onclick = () => fileInput.click();
  document.querySelector(".browse-btn").onclick = () => fileInput.click();

  // --- ✅ Connect to Hugging Face once globally ---
  const client = await Client.connect("https://abdjutt777-citrus-demo.hf.space/");

  // --- handle file input changes ---
  [fileInput, cameraInput].forEach(input =>
    input.addEventListener("change", predictDisease)
  );

  async function predictDisease() {
    const file = fileInput.files[0] || cameraInput.files[0];
    if (!file) return alert("Please select an image!");

    loader.style.display = "flex";

    try {
      // --- send directly, no FileReader needed ---
      const result = await client.predict("/predict", { image: file });
      const predictedClass = result.data[0];
      const Confidence = parseFloat(result.data[1]);

      const formData = new FormData();
      formData.append("predicted_class", predictedClass);
      formData.append("confidence_score", Confidence);
      formData.append("image", file);

      // 🔹 Show upload message while saving to Cloudinary
      const loaderText = loader.querySelector("p");
      loaderText.textContent = " Saving Image to Cloudinary... Please wait";

      const res = await fetch("save_disease_result.php", { method: "POST", body: formData });
      const data = await res.json();

      // Restore text back after upload
      loaderText.textContent = "Analyzing Leaf... Please wait";

      if (data.status === "success") {
        loader.style.opacity = "0";
        setTimeout(() => (window.location.href = "view.php"), 500);
      } else {
        console.error("Failed to save:", data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("⚠️ Prediction failed!");
    } finally {
      loader.style.display = "none";
    }
  }
  </script>
</body>
</html>
