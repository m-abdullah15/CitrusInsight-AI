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
  <style>
    body {
      background-color:rgb(15, 19, 34);
      color: white;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 40px;
    }

    .container {
      max-width: 1000px;
      margin: 0 auto;
      margin-top: 70px;
    }

    h1 {
      font-size: 32px;
      color: #c084fc;
    }

    h1 span {
      color: #ff7300;
    }

    .description {
      color: #9ca3af;
      margin-top: 15px;
      margin-bottom: 30px;
    }

    .upload-section {
      background-color:rgb(24, 28, 48);
      border-radius: 12px;
      padding: 30px;
      margin-top: 40px;
      box-shadow: 0 10px 30px rgba(126, 122, 122, 0.3);
    }

    .upload-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }

    .upload-header h2 {
      font-size: 30px;
      margin: 0;
      color: white;
    }

    .upload-subtext {
      color: #9ca3af;
      font-size: 14px;
      margin-top: 8px;
      margin-bottom: 20px;
    }

    .button-group {
      display: flex;
      gap: 10px;
    }

    .btn {
      background-color: #152f55;
      border: 1px solid #4b5563;
      color: #f9fafb;
      padding: 8px 16px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn:hover {
      background-color: #374151;
    }

    .drop-area {
      padding: 58px 20px;
      text-align: center;
      border-radius: 12px;
      color: #9ca3af;
      background-color:rgb(34, 46, 66);
      margin-top: 20px;
    }

    .upload-icon {
      background-color: #1e40af;
      border-radius: 50%;
      width: 64px;
      height: 64px;
      margin: 0 auto 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .upload-icon svg {
      width: 30px;
      height: 30px;
      stroke: white;

    }

    @keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 115, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(255, 115, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 115, 0, 0);
  }
}

.upload-icon {
  animation: pulse 2s infinite;
  transition: transform 0.3s ease;
}


    .browse-btn {
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 20px;
      font-size: 14px;
    }

    .browse-btn:hover {
      background-color: #1d4ed8;
    }

    /* Loader overlay */
    #loaderOverlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #0c0f1aee;
      z-index: 9999;
      justify-content: center;
      align-items: center;
      opacity: 1;
      transition: opacity 0.5s ease;
    }

    .branded-loader {
      border: 10px solid #1e40af;
      border-top: 10px solid #ff7300;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
     ul.links{
      margin-left: 0px;
    }
  </style>
</head>
<body>
  <nav>
    <div class="navbar">
      <div class="nav-links">
        <ul class="links">
              <a href="#" class="logo">
                  <img src="./assets/logo.png" alt="Citrus Insight AI Logo">
                  CitrusInsight AI
              </a>
                <a href="./recommendation_system.html">
                  <li><button class="nav-btn">Recommendation System</button></li>
                </a>
                <a href="./disease_detection.php"><li><button class="nav-btn">Disease Detection</button></li></a>
                <a href="./dashboard.php"><li><button class="nav-btn">Trade Dashboard</button></li></a>
                <a href="./yearly_planner_en.html">
                <li><button class="nav-btn">Yearly Planner</button></li>
                </a>
                <a href="./fertilizer_schedule_en.html"><li><button class="nav-btn">Fertilizers Schedule</button></li></a>
                <a href="./user_dashboard.php"><li><button class="nav-btn">User Dashboard</button></li></a>  
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
  

  <div class="container">
    <h1>AI-Powered <span>Citrus Disease Detection</span></h1>
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

  <!-- Branded Loader Overlay -->
  <div id="loaderOverlay">
    <div class="branded-loader"></div>
    <p style="margin-top: 20px; font-size: 18px; color: #c084fc; font-weight: 600;">Analyzing Leaf... Please wait</p>
  </div>

  <script>
    // Button triggers
    document.getElementById("captureButton").addEventListener("click", () => {
      document.getElementById("cameraInput").click();
    });

    document.getElementById("selectButton").addEventListener("click", () => {
      document.getElementById("fileInput").click();
    });

    document.querySelector(".browse-btn").addEventListener("click", () => {
      document.getElementById("fileInput").click();
    });

    // Auto prediction after file selection
    document.getElementById("fileInput").addEventListener("change", () => {
      predictDisease();
    });

    document.getElementById("cameraInput").addEventListener("change", () => {
      predictDisease();
    });

    // Drag & drop
    const dropArea = document.querySelector(".drop-area");
    dropArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropArea.style.backgroundColor = "#334155";
    });

    dropArea.addEventListener("dragleave", () => {
      dropArea.style.backgroundColor = "#1e293b";
    });

    dropArea.addEventListener("drop", (e) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        document.getElementById("fileInput").files = files;
        predictDisease();
      }
    });

    // Disease prediction logic
    async function predictDisease() {
      const fileInput = document.getElementById("fileInput").files[0] || document.getElementById("cameraInput").files[0];
      if (!fileInput) {
        alert("Please select an image!");
        return;
      }

      // Show loader
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

          // Send to backend
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
                  // Delay then fade out and redirect
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
          alert("⚠️ Error in prediction!");
          loader.style.display = "none";
        }
      };
    }

    document.querySelector(".logout-btn").addEventListener("click", () => {
      window.open("logout.php", "_self");
    });
  </script>
</body>
</html>
