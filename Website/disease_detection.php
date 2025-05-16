<?php
include('./connect.php');
session_start();
$name = $_SESSION['name'];
$user_id = $_SESSION['user_id'];
$email = $_SESSION['email'];
$username = $_SESSION['user'];
$model_name = $_SESSION['model_name'];
if (!isset($_SESSION['user_id'])) {
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
    <link rel="stylesheet" href="./css/navbar.css">
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
<div class="container enhanced-detection">
  <h2 class="section-title">🍊 Citrus Disease Detection</h2>

  <div class="card-detection">
    <img id="imagePreview" src="../Website/assets/images/placeholder.jpg" alt="Image Preview" class="image-preview" />

    <div class="button-group">
      <label class="custom-file-upload" id="captureButton">📸 Take Photo</label>
      <label class="custom-file-upload" id="selectButton">📂 Choose from Storage</label>
      <input type="file" id="cameraInput" accept="image/*" capture="environment" style="display: none;">
      <input type="file" id="fileInput" accept="image/*" style="display: none;">
      <button id="predictButton">🔍 Predict</button>
    </div>

    <div class="loader" id="loader"></div>

    <div class="result-area">
  <h3 class="result"><span id="result"></span></h3>
  <h3 class="result"><span id="confidence"></span></h3>

  <div class="solution-card hide" id="solutionCard">
    <h3>🩺 Suggested Solution:</h3>
    <strong id="solutionText"></strong>
  </div>
</div>
  </div>
</div>

    </div>
    <script>
let name = "<?php echo $name; ?>";
let email = "<?php echo $email; ?>";
let username = "<?php echo $username; ?>";
let id = "<?php echo $user_id; ?>";
document.getElementById("profileName").innerText = name;
document.getElementById("profileEmail").innerText = email;
document.getElementById("profileUser").innerText = "Username: " + username;
let solution = document.querySelector(".solution");
let solution_heading = document.querySelector(".solution_heading");
let result = document.querySelector("#result");
let confidence = document.querySelector("#confidence");
function previewImage(file) {
    solution.innerHTML = "";
    solution_heading.classList.add("hide");
    result.innerText = "";
    confidence.innerText = "";
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
            
            if(predictedClass == "Citrus canker"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="<h2>Chemical control</h2><ul><li>1st spray of Bordeauxe mixture (1%) after fruit harvest).</li><li>2nd spray during the month of April Copper Oxycholoride @3gm/lit. of water)</li><li>3rd spray during the month of July-August Copper Hydrooxide @2.5gm/lit. of water</li></ul>Early detection and removal of infected plants are crucial.<h3 class='solution_heading'>Source:</h3><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a> ";
            }
            else if(predictedClass == "Citrus greening"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="<ul><li>Removal of infected trees</li><li>Vector control  ( citrus psylla) by spraying Novastar or Confidar @1ml/lit. of water</li><li> Disease free planting material.</li></ul> There is no cure for the disease,but treatment of the corresponding infestation with conventional insecticides and removal of the infected trees is mandatory.<h3 class='solution_heading'>Source:</h3><a href='https://aari.punjab.gov.pk/Cit-Dis'>Ayub Agricultural Research Institute,Faisalabad</a>";
            }
            else if(predictedClass == "Citrus mealybugs"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="Wash plants with mild soapy water (about 2% soap, not detergent) to remove wax left by mealybugs.Pesticide can be sprayed weekly to control all new mealybugs hatched from eggs. Chemicals have been recommended for their control.<h3 class='solution_heading'>Source:</h3><a href='https://blogs.ifas.ufl.edu/stlucieco/2022/03/31/citrus-mealybug-and-control-methods/'>University of Florida/IFAS Research and Education Center</a>";
            }
            else if(predictedClass == "Die back"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="Apply copper-based fungicides or other appropriate fungicides as recommended by local agricultural extension services.Apply foliar sprays of zinc sulfate, copper sulfate, and magnesium sulfate to correct potential deficiencies.<h3 class='solution_heading'>Source:</h3><a href='https://www.yara.us/crop-nutrition/citrus/managing-limb-twig-dieback/'>Yara Australia</a> ";
            }
            else if(predictedClass == "Foliage damaged"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="<ul><li>1st spray of Bordeauxe mixture (1%) after fruit harvest)</li><li>2nd spray during the month of April Copper Oxycholoride @3gm/lit. of water)</li><li>3rd spray during the month of July-August Copper Hydrooxide @2.5gm/lit. of water</li><li>several management strategies can be employed to control its spread and minimize damage. These include exclusion, sanitation, and eradication, along with the use of copper-based sprays and resistant citrus varieties. </li></ul>";
            }
            else if(predictedClass == "Powdery mildew"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="<ul><li>Spray sulphur 80% WP @ 2g/L of water, repeat after 10-15 days.</li><li>Spray dinocap (48% EC) @ 2ml/L of water, repeat after 10-15 days.</li><li>Prune Diseased Plant Parts: Remove and destroy infected leaves, shoots, and fruits. </li></ul><h3 class='solution_heading'>Source:</h3><a href='https://plantwiseplusknowledgebank.org/doi/10.1079/pwkb.20187800003'>PlantwisePlus Knowledge Bank</a>";
            }
            else if(predictedClass == "Shot hole"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="Shot hole disease is caused by a fungus. As such, the fungus needs to be treated to stop the infection. Fungicide treatment, including the Bordeaux mixture, copper fungicides, and synthetic fungicides, such as chlorothalonil, are applied. Multiple treatments may be needed depending on the severity of the disease, the weather conditions where you live, and whether the tree is in an orchard with other affected trees.<h3 class='solution_heading'>Source:</h3><a href='https://www.arborvisioninc.com/tree-treatment/shot-hole-fungus'>ARBOR VISION</a>";
            }
            else if(predictedClass == "Spiny whitefly"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="<ul><li>Apply insecticidal soap or horticultural oil to the affected areas of the plant.</li><li>Apply mulch, manure or synthetic fertilizers to assist plant vigour.</li><li>Use yellow sticky traps to monitor and control whitefly populations.</li></ul><h3 class='solution_heading'>Source:</h3><a href='https://apps.lucidcentral.org/ppp_v9/text/web_full/entities/citrus_orange_spiny_whitefly_244.htm'>LucidCentral</a>";
            }
            else if(predictedClass == "Yellow leaves"){
                solution_heading.classList.remove("hide");
                solution.innerHTML="Yellow leaves on citrus trees can be caused by various factors, including nutrient deficiencies (like nitrogen or iron), fungal diseases, or improper watering and sunlight conditions. Treatment involves addressing the specific cause. This may include providing nitrogen-rich fertilizer, applying copper-based fungicides for fungal diseases, improving drainage and watering practices, and ensuring adequate sunlight.<h3 class='solution_heading'>Source:</h3><a href='https://myplantin.com/blog/lemon-tree-leaves-turning-yellow'>PplantIn</a> ";
            }
           

            // Send prediction data to database
const formData = new FormData();
formData.append('predicted_class', predictedClass);
formData.append('confidence_score', Confidence);

fetch('save_disease_result.php', {
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
