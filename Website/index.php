
<!-- // include('../LoginSignup/signup.php');
// include('../connect.php'); -->

<!DOCTYPE html>
<!-- Created By CodingNepal - www.codingnepalweb.com -->x
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8">
   <title>Citrus Production</title>
   <link rel="icon" type="png" href="/LoginSignup/assets/orange slice.jpg" style="border-radius: 50%;">
   
   <!-- Boxicons CDN Link -->
   <link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <!-- Linking Font Awesome for icons -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
   <!-- Linking Swiper CSS -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
   <link rel="stylesheet" href="./css/home.css">
   <style>
.logooo {
  position: relative; /* Needed for background image */
  background-image: url("./assets/images/background.jpg"); /* Add your image path */
  background-size: cover; /* Cover full area */
  background-position: center; /* Center the background */
  background-repeat: no-repeat;
  height: auto; /* Adjust height based on content */
  width: 100%;
  padding: 2rem 0; /* Add some padding */
}
.logooo::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Black overlay with 50% opacity */
  z-index: 1;
}

/* Ensure content appears above overlay */
.logooo * {
  position: relative;
  z-index: 2;
}
.logooo-flex {
  display: flex; /* Use flexbox */
  align-items: center; /* Center vertically */
  justify-content: start; /* Center horizontally */
  gap: 0.5rem; /* Add space between logo and heading */
}

.logoimg {
  margin-top: 2rem;
  width: 15rem; /* Adjust logo size */
  height: auto;
  left: 10px;
}

.logo-heading {
  left: 10px;
  padding-top: 1rem; ;
  font-size: 2.25rem; /* Adjust heading size */
  color: white; /* Ensure text is visible */
}

   </style>
   </head>
<body>
<div class="logooo">
  <div class="logooo-flex">
    <img src="./assets/logo.png" alt="Citrus Prevention Logo" class="logoimg">
    <h1 class="logo-heading">CITRUSINSIGHT AI</h1>
  </div>
</div>

  <header>
    <nav>
    <div class="navbar">
      <i class='bx bx-menu'></i>
    <div class="logo-container">
  
    </div>
      <div class="nav-links">
        <div class="sidebar-logo">
          <span class="logo-name">Citrus Production</span>
          <i class='bx bx-x' ></i>
        </div>
        <ul class="links">
          <li><a href="#">Home</a></li>
          <li>
            <ul><a href="./services.html">Our Services</a>
              </li>
            </ul>
          </li>
         
          <li><a href="about.html">About Us</a></li>
          <li><a href="contact.html">Contact Us</a></li>
           <li><a href="login.php" class="login-link">Login</a></li>
           <li><a href="signup.php" class="login-link">Sign-up</a></li>
        </ul>
      </div>
      <div class="search-box">
        <i class='bx bx-search'></i>
        <div class="input-box">
          <input type="text" placeholder="Search...">
        </div>
      </div>
    </div>
  </nav>
  </header>

  <!-- gpt  -->
 <main class="hero">
    <div class="hero-image">
      <img src="./assets/orange slice.jpg" alt="Orange Slice">
    </div>
    <div class="hero-content">
      <h2>A Threat to Pakistan Citrus</h2>
      <p>
        A plant disease that kills citrus trees has been found in Pakistan.
        The disease, called Huanglongbing or citrus greening disease, isn’t
        harmful to humans, but it is fatal for citrus trees and has no cure.
        The disease is spread by a pest called the Asian citrus psyllid as it
        feeds on citrus tree leaves. Until researchers find a solution,
        Pakistan homeowners who enjoy growing fresh citrus fruit in their
        yards, and Pakistan farmers tending to $800 million worth of citrus
        fruit trees must work together to protect their trees. Learn more about
        <a href="#">how to detect the pest and disease</a> and protect Pakistan’s
        beloved citrus heritage.
      </p>
    </div>
  </main>
  <!-- 2nd page  -->
<div class="hero-section-2">
  <div class="hero-overlay">
    <div class="hero-contentt">
      <h1>Protect Your Citrus Trees</h1>
      <p>
        The Citrus Pest & Disease Prevention Program recommends these 
        <a href="#" class="hero-link">tips to protect citrus trees</a>.
      </p>
      <ul>
        <li>
          Inspect trees for the 
          <a href="#" class="hero-link">Asian citrus psyllid and Huanglongbing</a> 
          monthly, and whenever watering, spraying, pruning or tending trees. If the disease is spotted, call the CDFA hotline at 800-491-1899 immediately.
        </li>
        <li>
          Do not move citrus plants, leaves, or foliage into or out of the quarantine area or across state or international borders. Keep it local.
        </li>
        <li>
          As part of tree care, visit your local nursery or garden center to get advice on products that can help protect citrus trees from the Asian citrus psyllid.
        </li>
      
        <li>
          Buy citrus trees from licensed, local nurseries and only use registered budwood.
        </li>
        <li>
          Cooperate with agricultural officials placing insect traps, inspecting trees, and treating for the pest.
        </li>
        <li>
          Be sure to dry out citrus tree clippings or double bag them before disposing of the plant material.
        </li>
        <li>
          If you no longer wish to care for your citrus tree, consider removing it so it does not become a host to the pest or disease.
        </li>
      </ul>
      <button class="hero-btn">Learn More</button>
    </div>
  </div>
</div>
<!-- page 3 -->
 <div class="hero-section-3">
  <div class="hero-overlayy">
    <div class="hero-contenttt">
      <h1>Pakistan: Rich in Citrus Heritage</h1>
      <p>
        Pakistan is enjoying the 13th position among  top  15  citrus  producing countries  (FAO,  2013).  In  Pakistan  citrus  production  is spreading  on  an  area  of  approximately  200,000  hectares producing  a  yield  of  over  2  million  tons  per  year (Anonymous,  2011),  production  mainly  concentrated  in provinces  of  Punjab  and  Khyber  Pakhtunkhwa  (KP).
        <a href="#" class="hero-link">Pest & Disease page</a>.
      </p>
      <button class="hero-btn">Learn More</button>
    </div>
    <div class="hero-image-3">
      <img src="https://www.researchgate.net/profile/Zahid-Ali-7/publication/306327677/figure/fig1/AS:397267648434179@1471727396447/Major-Citrus-Producing-Districts-in-Punjab-Khyber-Pakhtunkhwa-KP-Balochistan-and.png" alt="California Citrus Map" />
    </div>
  </div>
</div>
<div class="did-you-know-section">
  <h2>Did You Know?</h2>
  <p>
    Pakistan is one of the world's top citrus-producing countries, particularly famous for its high-quality Kinnow, a hybrid mandarin. The Punjab region is the hub of citrus cultivation, contributing over 95% of the country's citrus production. Exported to more than 40 countries, Pakistani citrus is prized for its vibrant flavor, juiciness, and extended shelf life. The Kinnow season runs from December to March, making it a winter delight globally.
  </p>
</div>
<!-- 4 page -->
<section class="kinnow-processing-section">
  <div class="kinnow-processing-container">
    <h2 class="kinnow-processing-heading">KINNOW PROCESSING</h2>
    <div class="kinnow-processing-steps">
      <div class="step">
        <img src="./assets/images/harvesting.jpg" alt="Harvesting" style="width: 160px; height: 160px;" />
        <p class="step-title">Harvesting</p>
      </div>
      <div class="step">
        <img src="./assets/images/sortingg.jpg" alt="Sorting" style="width: 160px; height: 160px;"/>
        <p class="step-title">Sorting</p>
      </div>
      <div class="step">
        <img src="./assets/images/water-washing.jpg" alt="Water Washing" style="width: 160px; height: 160px;"/>
        <p class="step-title">Water Washing</p>
      </div>
      <div class="step">
        <img src="./assets/images/drying.jpg" alt="Drying" style="width: 160px; height: 160px;"/>
        <p class="step-title">Drying</p>
      </div>
      <div class="step">
        <img src="./assets/images/waxing.jpg" alt="Waxing" style="width: 160px; height: 160px;"/>
        <p class="step-title">Waxing</p>
      </div>
       <div class="step">
        <img src="./assets/images/packaging.jpg" alt="Packaging" style="width: 160px; height: 160px;"/>
        <p class="step-title">Packaging</p>
      </div>
    </div>
  </div>
</section>
 <!-- Packaging and Storage section: -->
<section class="packaging-storage-section">
  <div class="packaging-storage-container">
    <h2 class="packaging-storage-heading">PACKAGING & STORAGE</h2>
    <div class="packaging-storage-gallery">
      <div class="image-box">
        <img src="./assets/images/packaging1.jpg" alt="Packaging Example 1" />
      </div>
      <div class="image-box">
        <img src="./assets/images/packaging3.jpg" alt="Packaging Example 2" />
      </div>
      <div class="image-box">
        <img src="./assets/images/packaging2.jpg" alt="Packaging Example 3" />
      </div>
      <div class="image-box">
        <img src="./assets/images/packaging5.jpg" alt="Packaging Example 4" />
      </div>
      <div class="image-box">
        <img src="./assets/images/packaging4.jpg" alt="Packaging Example 5" />
      </div>
    </div>
  </div>
</section>
<!-- Standards and Certification  -->
 <section class="standards-section">
  <div class="standards-container">
    <h2 class="standards-heading">STANDARDS AND CERTIFICATION:</h2>
    <div class="standards-icons">
      <!-- Add images here -->
      <div class="standard-item">
        <img src="./assets/images/global-gap.png" alt="GlobalG.A.P Certification" />
      </div>
      <div class="standard-item">
        <img src="./assets/images/HACCP.jpg" alt="HACCP Certification" />
      </div>
      <div class="standard-item">
        <img src="./assets/images/brc-global.png" alt="BRC Global Standards" />
      </div>
      <div class="standard-item">
        <img src="./assets/images/iso22000.png" alt="ISO 22000 Certification" />
      </div>
    </div>
  </div>
</section>
<!-- World Top Importers and Exporters-->
<section class="import-export-section">
  <div class="import-export-container">
    <h2 class="section-heading">World Top Importers</h2>
    <div class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Importer</th>
            <th>2015</th>
            <th>2016</th>
            <th>2017</th>
            <th>2018</th>
            <th>2019</th>
          </tr>
        </thead>
        <tbody>
          <tr>
    <td>World</td>
    <td>13,359,221</td>
    <td>14,392,623</td>
    <td>14,911,691</td>
    <td>16,107,582</td>
    <td>14,919,402</td>
  </tr>
  <tr>
    <td>United States of America</td>
    <td>985,414</td>
    <td>1,060,459</td>
    <td>1,223,128</td>
    <td>1,466,505</td>
    <td>1,390,819</td>
  </tr>
  <tr>
    <td>Russian Federation</td>
    <td>1,137,824</td>
    <td>1,160,771</td>
    <td>1,189,212</td>
    <td>1,231,478</td>
    <td>1,281,039</td>
  </tr>
  <tr>
    <td>Germany</td>
    <td>1,115,226</td>
    <td>1,213,141</td>
    <td>1,212,946</td>
    <td>1,321,919</td>
    <td>1,180,736</td>
  </tr>
  <tr>
    <td>France</td>
    <td>1,089,281</td>
    <td>1,214,519</td>
    <td>1,233,931</td>
    <td>1,236,038</td>
    <td>1,115,167</td>
  </tr>
          
          <!-- Add more rows as needed -->
        </tbody>
      </table>
    </div>

    <h2 class="section-heading">Pakistan's Top Export Destinations</h2>
    <div class="table-wrapper">
      <table class="styled-table">
        <thead>
          <tr>
            <th>Exporter</th>
            <th>2015</th>
            <th>2016</th>
            <th>2017</th>
            <th>2018</th>
            <th>2019</th>
          </tr>
        </thead>
        <tbody>
           <tr>
    <td>World</td>
    <td>184,793</td>
    <td>171,472</td>
    <td>139,803</td>
    <td>178,960</td>
    <td>160,700</td>
  </tr>
  <tr>
    <td>Afghanistan</td>
    <td>73,341</td>
    <td>65,560</td>
    <td>46,288</td>
    <td>57,363</td>
    <td>47,849</td>
  </tr>
  <tr>
    <td>Russian Federation</td>
    <td>53,870</td>
    <td>49,097</td>
    <td>33,233</td>
    <td>44,954</td>
    <td>40,566</td>
  </tr>
  <tr>
    <td>Philippines</td>
    <td>5,333</td>
    <td>9,126</td>
    <td>9,622</td>
    <td>13,392</td>
    <td>13,572</td>
  </tr>
  <tr>
    <td>Indonesia</td>
    <td>9,364</td>
    <td>8,906</td>
    <td>20,915</td>
    <td>20,442</td>
    <td>12,606</td>
  </tr>
          <!-- Add more rows as needed -->
        </tbody>
      </table>
    </div>
  </div>
</section>
<!-- Dashboard section  -->
 <div class="dashboard-section">
  <div class="dashboard-container">
    <div class="dashboard-text">
      <h2>Citrus Insights Dashboard</h2>
      <p>
        Explore comprehensive data on citrus production, land utilization, and trade in Pakistan. Gain valuable insights into:
      </p>
      <ul>
        <li>
          <strong>Total Citrus Production:</strong> Detailed statistics of how much citrus is produced for Pakistan, Punjab, Sindh, Balochistan, KPK, and Sargodha.
        </li>
        <li>
          <strong>Land Area Cultivation:</strong> Breakdown of land dedicated to citrus farming across regions. The areas where citrus are grown.
        </li>
        <li>
          <strong>Citrus Trade Analysis:</strong> Overview of citrus exports and imports, highlighting contributions to the economy.
        </li>
      </ul>
      <p>
        Empowering stakeholders with real-time data to support decision-making and sustainable growth in the citrus industry.
      </p>
      <h3>Why Use the Citrus Insights Dashboard?</h3>
      <ul>
        <li><strong>Real-Time Data:</strong> Stay updated with the latest figures for informed decision-making.</li>
        <li><strong>Interactive Visualizations:</strong> Explore trends through intuitive charts and graphs.</li>
        <li><strong>Policy Support:</strong> Enable data-driven strategies for sustainable agricultural growth.</li>
      </ul>
      <p>
        Whether you're a policymaker, farmer, researcher, or entrepreneur, the Citrus Insights Dashboard is your gateway to understanding and optimizing Pakistan's citrus industry.
      </p>
    </div>
    <div class="dashboard-image">
      <img src="./assets/images/dashboard.jpeg" alt="Citrus Insights Dashboard" />
    </div>
  </div>
</div>
<script>
  // search-box open close js code
let navbar = document.querySelector(".navbar");
let searchBox = document.querySelector(".search-box .bx-search");
// let searchBoxCancel = document.querySelector(".search-box .bx-x");
searchBox.addEventListener("click", ()=>{
  navbar.classList.toggle("showInput");
  if(navbar.classList.contains("showInput")){
    searchBox.classList.replace("bx-search" ,"bx-x");
  }else {
    searchBox.classList.replace("bx-x" ,"bx-search");
  }
});
// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let menuCloseBtn = document.querySelector(".nav-links .bx-x");
menuOpenBtn.onclick = function() {
navLinks.style.left = "0";
}
menuCloseBtn.onclick = function() {
navLinks.style.left = "-100%";
}
// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
 navLinks.classList.toggle("show1");
}
let moreArrow = document.querySelector(".more-arrow");
moreArrow.onclick = function() {
 navLinks.classList.toggle("show2");
}
let jsArrow = document.querySelector(".js-arrow");
jsArrow.onclick = function() {
 navLinks.classList.toggle("show3");
}
// gpt 
// Add functionality if required (e.g., animations or dynamic content)
document.querySelector('.cta-btn').addEventListener('click', () => {
    alert('Welcome to the Citrus Guide! Stay tuned for more.');
});

</script>


    <script src="../Website/js/about.js"></script>
    <script src="../Website/js/login.js"></script>
</body>
</html>