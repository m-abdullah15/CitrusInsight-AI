<?php
include('./connect.php');
session_start();
$name = $_SESSION['name'];
$id = $_SESSION['id'];
$email = $_SESSION['email'];
$username = $_SESSION['user'];
if (!isset($_SESSION['user'])) {
    echo "<script>alert('Please login first');</script>";
    echo "<script>window.open('login.php','_self')</script>";
    exit();
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Citrus Disease Detection</title>
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
      
      <div class="full-container">
      <button class="toggleSidebar">☰ Profile</button>

<div id="sidebar" class="sidebar">
  <div class="profile">
    <img src="assets/images/side.png" alt="Profile Picture" class="profile-pic" />
    <h3 id="profileName"></h3>
    <p id="profileUser"></p>
    <p id="profileEmail"></p>
    
  </div>
  <button id="closeSidebar" class="close-btn">✖</button>
</div>
    <div class="container">
        <h2>🍊 Citrus Disease Detection</h2>
        <br>
        <img id="imagePreview" src="../Website/assets/images/placeholder.jpg" alt="Image Preview">
        <br>
        <div class="button-group">
            <label class="custom-file-upload" id="captureButton">📸 Take Photo</label>
            <label class="custom-file-upload" id="selectButton">📂 Choose from Storage</label>
            <input type="file" id="cameraInput" accept="image/*" capture="environment" style="display: none;">
            <input type="file" id="fileInput" accept="image/*" style="display: none;">
            <button id="predictButton">🔍 Predict</button>
        </div>        
        <div class="loader" id="loader"></div>
        <h3 class="result"><span id="result"></span></h3>
        <h3 class="result"><span id="confidence"></span></h3>
    </div>
    </div>
    <script>
let name = "<?php echo $name; ?>";
let email = "<?php echo $email; ?>";
let username = "<?php echo $username; ?>";
let id = "<?php echo $id; ?>";
document.getElementById("profileName").innerText = name;
document.getElementById("profileEmail").innerText = email;
document.getElementById("profileUser").innerText = "Username: " + username;
function previewImage(file) {
    const preview = document.getElementById("imagePreview");
    if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            preview.src = e.target.result;
        };
    } else {
        preview.src = "./assets/images/placeholder.jpg";
    }
}

document.getElementById("captureButton").addEventListener("click", function () {
    document.getElementById("cameraInput").click();
});

document.getElementById("selectButton").addEventListener("click", function () {
    document.getElementById("fileInput").click();
});

document.getElementById("cameraInput").addEventListener("change", function () {
    previewImage(this.files[0]);
});

document.getElementById("fileInput").addEventListener("change", function () {
    previewImage(this.files[0]);
});

async function predictDisease() {
    const fileInput = document.getElementById("fileInput").files[0] || document.getElementById("cameraInput").files[0];
    const resultText = document.getElementById("result");
    const confidenceText = document.getElementById("confidence");
    const loader = document.getElementById("loader");

    if (!fileInput) {
        alert("Please select an image!");
        return;
    }

    resultText.innerText = "";
    confidenceText.innerText = "";
    loader.style.display = "block";

    let reader = new FileReader();
    reader.readAsDataURL(fileInput);
    reader.onload = async function () {
        try {
            const { Client } = await import("https://esm.sh/@gradio/client");
            const client = await Client.connect("https://abdjutt777-citrus-demo.hf.space/");
            const result = await client.predict("/predict", { image: fileInput });

            const predictedClass = result.data[0];
            const Confidence = parseFloat(result.data[1]);

            loader.style.display = "none";
            resultText.innerHTML = `✅Disease: ${predictedClass}`;
            confidenceText.innerHTML = `📊Confidence: ${Confidence}%`;
            // Send prediction data to database
const formData = new FormData();
formData.append('predicted_class', predictedClass);
formData.append('confidence_score', Confidence);

fetch('save_result.php', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    if (data.status === "success") {
        console.log("Report saved to database");
    } else {
        console.error("Failed to save report:", data.message);
    }
})
.catch(error => console.error("Error:", error));

                } catch (error) {
                    console.error("Error:", error);
                    loader.style.display = "none";
                    resultText.innerText = "⚠️ Error in prediction!";
                    confidenceText.innerText = "";
                }
            };
        }

        document.getElementById("predictButton").addEventListener("click", predictDisease);
        document.querySelector(".logout-btn").addEventListener("click", ()=> {
            session_destroy();
            exit();
        });
        const toggleSidebar = document.querySelector(".toggleSidebar");

const closeSidebar = document.getElementById("closeSidebar");
const sidebar = document.getElementById("sidebar");

toggleSidebar.addEventListener("click", () => {
  sidebar.classList.add("active");
  toggleSidebar.classList.add("hidden");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
    toggleSidebar.classList.remove("hidden");
});
    </script>
</body>
</html>
