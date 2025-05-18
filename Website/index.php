
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
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
   <script src="https://cdn.tailwindcss.com"></script>

<style>
  .logooo-flex img{
    height: 130px;
    width: 130px;
  }
  .logooo {
  position: relative; /* Needed for background image */
  background-image: url("./assets/images/background.jpg"); /* Add your image path */
  background-size: cover; /* Cover full area */
  background-position: center; /* Center the background */
  background-repeat: no-repeat;
  height: 210px; /* Adjust height based on content */
  width: 100%;
  padding: 2rem 0; /* Add some padding */
}
.text-section h1{
  font-size:45px;
  font-weight: bold;
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
  <main class="hero2" style="background-color:#F8F4E1; padding: 60px 150px;">
  <div class="container" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; width: 100%;">
    <div class="text-section" style="max-width: 650px;">
      <h1>
        <span style="color:#2563eb; font-weight: bold;">Advance</span><br>
        <strong style="color: #ffc400; font-weight: bold;">Disease Detection System</strong><br>
        <span style="color: #db2777; font-weight: bold;"></span>
      </h1>
      <p style="font-size: 15px; color: #374151; margin: 20px 0 30px; max-width: 500px;">
        Our cutting-edge AI technology analyzes leaf image with precision previously only achievable by specialists, detecting potential concerns in seconds.
      </p>
      <div style="display: flex; gap: 15px;">
        <a href="login.php"><button style="padding: 12px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; background-color: #2563eb; color: white; border: none;">Analyze Your Image</button></a>
        <a href="login.php"><button style="padding: 12px 20px; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; background-color: white; color: #2563eb; border: 2px solid #2563eb;">Recommendation-System</button></a>
      </div>
    </div>

    <div class="card" style="background-color: white; border-radius: 16px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); width: 400px; padding: 25px 30px; color: #1e293b; position: relative;">
      <div style="display: flex; gap: 8px; margin-bottom: 15px;">
        <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #ef4444;"></div>
        <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #eab308;"></div>
        <div style="width: 10px; height: 10px; border-radius: 50%; background-color: #22c55e;"></div>
      </div>
      <div style="font-weight: 600; font-size: 16px; margin-bottom: 15px;">AI Analysis</div>
      <div style="background-color: #f3f4f6; border-radius: 10px; height: 140px; display: flex; align-items: center; justify-content: center; font-size: 30px; margin-bottom: 25px; color: #6b7280;">📷</div>
      <div style="display: flex; justify-content: space-between; gap: 5px; margin-bottom: 25px;">
        <div style="width: 150px;">
          <p style="font-size: 13px; margin: 0; color: #041224;">Probability</p>
          <h2 style="font-size: 16px; margin: 6px 0;">95.6%</h2>
          <div style="height: 6px; background-color: #334155; border-radius: 4px; overflow: hidden;">
            <div style="height: 100%; background-color: #3b82f6; width: 94.6%;"></div>
          </div>
        </div>
        <div style="width: 150px;">
          <p style="font-size: 13px; margin: 0; color: #041224;">Severity</p>
          <h2 style="font-size: 16px; margin: 6px 0; color: #fbbf24;">High</h2>
          <div style="height: 6px; background-color: #334155; border-radius: 4px; overflow: hidden;">
            <div style="height: 100%; background-color: #fbbf24; width: 90%;"></div>
          </div>
        </div>
      </div>
      <a href="login.php"><div style="background-color: #2563eb; color: white; text-align: center; padding: 10px; border-radius: 8px; font-weight: 600; transition: background-color 0.3s; cursor: pointer;">
        View Analysis
      </div></a>
    </div>
  </div>
</main>

  <!-- gpt  -->
 <main class="hero" style="background-color:#FFD580;">
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
        <a href="https://aari.punjab.gov.pk/Cit-Dis#:~:text=Symptoms%20include%20rotted%20roots%3B%20cracked,and%20death%20of%20the%20tree.">how to detect the pest and disease</a> and protect Pakistan’s
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
        <a href="https://www.groworganic.com/blogs/articles/the-sunlight-sensitivity-of-citrus-trees-and-how-to-protect-them" class="hero-link">tips to protect citrus trees</a>.
      </p>
      <ul>
        <li>
          Inspect trees for the 
          <a href="https://californiacitrusthreat.org/pest-disease/" class="hero-link">Asian citrus psyllid and Huanglongbing</a> 
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
      <a href="https://aari.punjab.gov.pk/Cit-Dis#:~:text=Symptoms%20include%20rotted%20roots%3B%20cracked,and%20death%20of%20the%20tree.">
      <button class="hero-btn">Learn More</button>
      </a>
    </div>
  </div>
</div>
<!-- page 3 -->
 <div class="hero-section-3">
  <div class="hero-overlayy">
    <div class="hero-contenttt">
      <h1>Pakistan: Rich in Citrus Heritage</h1>
      <p>
        Pakistan is enjoying the 13th position among  top  15  citrus  producing countries  (FAO,  2021).  In  Pakistan  citrus  production  is spreading  on  an  area  of  approximately  200,000  hectares producing  a  yield  of  over <strong style="color:chocolate">2.32  million  tons  per  year (Report linker, 2021)</strong>,  production  mainly  concentrated  in provinces  of  Punjab  and  Khyber  Pakhtunkhwa  (KP).
      </p>
      <a href="https://www.reportlinker.com/clp/country/470135/726402#:~:text=Key%20Market%20Indicators&text=Pakistan%20is%20currently%20ranked%2015th,million%20metric%20tons%20in%202021.">
      <button class="hero-btn">Learn More</button>
      </a>
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
<!-- Footer  -->
<footer class="relative bg-[#f8efcf] text-gray-800 py-10 px-6 border-t-4 border-orange-300 shadow-inner overflow-hidden">
  <!-- Decorative Citrus Image -->
  <img src="./assets/logo.png" 
       alt="Citrus" 
       class="absolute bottom-2 right-2 w-20 h-20 opacity-60 pointer-events-none select-none" />

  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
    
    <!-- Brand -->
    <div>
      <h2 class="text-2xl font-bold mb-3 text-orange-600">CitrusInsight AI</h2>
      <p class="text-sm">Empowering farmers with smart citrus insights.</p>
      <div class="flex space-x-3 mt-4 text-xl text-orange-500">
        <a href="#" class="hover:text-yellow-500"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="hover:text-yellow-500"><i class="fab fa-twitter"></i></a>
        <a href="#" class="hover:text-yellow-500"><i class="fab fa-instagram"></i></a>
      </div>
    </div>

    <!-- Get Help -->
    <div>
      <h3 class="text-xl font-semibold mb-4 text-orange-600">Get Help</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-orange-500">FAQs</a></li>
        <li><a href="#" class="hover:text-orange-500">Privacy Policy</a></li>
        <li><a href="#" class="hover:text-orange-500">Terms of Service</a></li>
        <li><a href="#" class="hover:text-orange-500">Support</a></li>
      </ul>
    </div>

    <!-- Discover -->
    <div>
      <h3 class="text-xl font-semibold mb-4 text-orange-600">Discover</h3>
      <ul class="space-y-2 text-sm">
        <li><a href="#" class="hover:text-orange-500">Recommendation System</a></li>
        <li><a href="#" class="hover:text-orange-500">Disease Detection</a></li>
        <li><a href="#" class="hover:text-orange-500">Yearly Planner</a></li>
        <li><a href="#" class="hover:text-orange-500">Dashboard</a></li>
      </ul>
    </div>

    <!-- Contact Us -->
    <div>
      <h3 class="text-xl font-semibold mb-4 text-orange-600">Contact Us</h3>
      <p class="text-sm">Email: m.abdullahhh15@gmail.com</p>
      <p class="text-sm mt-2">Phone: 
      +92-305-2686065</p>
      <p class="text-sm mt-2">Location: Sargodha, Pakistan</p>
    </div>
  </div>

  <!-- Bottom Bar -->
  <div class="mt-10 border-t border-orange-300 pt-4 text-center text-sm text-gray-600 z-10 relative">
    © 2025 CitrusInsight AI. All rights reserved.
  </div>
</footer>


<script src="js/index.js"></script>
    <script src="../Website/js/about.js"></script>
    <script src="../Website/js/login.js"></script>
</body>
</html>