// map chart 
document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([30.3753, 69.3451], 5); // Center on Pakistan

  // Add Tile Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  // Add Region Markers (Example)
  const regions = [
    { name: "Punjab", lat: 31.1704, lng: 72.7097 },
    { name: "Sindh", lat: 25.8943, lng: 68.5247 },
    { name: "Balochistan", lat: 28.2868, lng: 65.3048 },
    { name: "KPK", lat: 34.0151, lng: 71.5249 },
  ];

  regions.forEach((region) => {
    L.marker([region.lat, region.lng])
      .addTo(map)
      .bindPopup(`<b>${region.name}</b><br>Citrus Production Area`);
  });
});

// map chart 

// bar chart for comparing areas
// const areaCtx = document.getElementById("areaComparisonChart").getContext("2d");

// new Chart(areaCtx, {
//   type: "bar",
//   data: {
//     labels: ["Punjab", "Sindh", "Balochistan", "KPK"], // Example regions
//     datasets: [
//       {
//         label: "Citrus Area (in hectares)",
//         data: [120000, 80000, 50000, 70000], // Example data
//         backgroundColor: "#27AE60", // Lime green
//       },
//     ],
//   },
//   options: {
//     responsive: true,
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Regions",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Area (in hectares)",
//         },
//       },
//     },
//   },
// });
// bar chart for comparing areas
document.addEventListener("DOMContentLoaded", () => {
  // Production Areas Charts
// new Chart(document.getElementById("areaDistributionChart"), {
//   type: "pie",
//   data: {
//     labels: ["Punjab", "Sindh", "Balochistan", "KPK"],
//     datasets: [
//       {
//         label: "Area Distribution (%)",
//         data: [90, 30, 20, 10],
//         backgroundColor: ["#27AE60", "#F39C12", "#F1C40F", "#2C3E50"],
//       },
//     ],
//   },
// });
      // Register the plugin
      Chart.register(ChartDataLabels);

      new Chart(document.getElementById("areaDistributionChart"), {
  type: "pie",
  data: {
      labels: ["Punjab", "Sindh", "Balochistan", "KPK"],
      datasets: [
          {
              label: "Area Distribution (%)",
              data: [94.7,2.5,0.7,2.1],
              backgroundColor: ["#27AE60", "#F39C12", "#F1C40F", "#2C3E50"],
          },
      ],
  },
  options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
          datalabels: {
              color: "#fff",
              font: {
                  weight: "bold",
                  size: 14,
              },
              formatter: (value, ctx) => {
                  let total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                  let percentage = ((value / total) * 100).toFixed(1) + "%";
                  return percentage;
              },
          },
      },
  },
});

// new Chart(document.getElementById("areaUtilizationChart"), {
//   type: "doughnut",
//   data: {
//     labels: ["Cultivated", "Uncultivated"],
//     datasets: [
//       {
//         label: "Land Utilization (%)",
//         data: [70, 30],
//         backgroundColor: ["#27AE60", "#F39C12"],
//       },
//     ],
//   },
// });
        // Register the Data La <!-- leaflet.js for Interactive map -->bels plugin
      Chart.register(ChartDataLabels);
      new Chart(document.getElementById("areaUtilizationChart"), {
          type: "doughnut",
          data: {
              labels: ["Cultivated", "Uncultivated"],
              datasets: [
                  {
                      label: "Land Utilization (%)",
                      data: [20.7,4.9],
                      backgroundColor: ["#27AE60", "#F39C12"],
                  },
              ],
          },
          options: {
              responsive: true,  // ✅ Ensures responsiveness
              maintainAspectRatio: false, // ✅ Allows manual control of size
              plugins: {
                  datalabels: {
                      color: "#fff",
                      font: {
                          weight: "bold",
                          size: 14,
                      },
                      formatter: (value, ctx) => {
                          let total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                          let percentage = ((value / total) * 100).toFixed(1) + "%";
                          return percentage;
                      },
                  },
              },
          },
      });
      // Comparison of citrus insight ai 
             // Register Data Labels Plugin
      Chart.register(ChartDataLabels);

      new Chart(document.getElementById("areaChart"), {
          type: "bar",
          data: {
              labels: ["Punjab", "Sindh", "Balochistan", "KPK"],
              datasets: [
                  {
                      label: "Citrus Area (in hectares)",
                      data: [120000, 80000, 50000, 70000],
                      backgroundColor: "#27AE60",
                      borderColor: "#145A32",
                      borderWidth: 2,
                      borderRadius: 5,
                  },
              ],
          },
          options: {
              responsive: true,
              maintainAspectRatio: false,
              animation: false,  // ✅ Prevents movement
              layout: {
                  padding: {
                      left: 0,
                      right: 0,
                      top: 10,
                      bottom: 10,
                  },
              },
              plugins: {
                  legend: {
                      display: true,
                      position: "top",
                  },
                  datalabels: {
                      anchor: "end",
                      align: "top",
                      color: "#000",
                      font: { size: 14, weight: "bold" },
                      formatter: (value) => value.toLocaleString() + " ha",
                  },
              },
              scales: {
                  x: {
                      title: {
                          display: true,
                          text: "Regions",
                      },
                  },
                  y: {
                      title: {
                          display: true,
                          text: "Area (in hectares)",
                      },
                      beginAtZero: true,
                  },
              },
          },
      });


})
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
// Smooth Scroll Functionality
document.querySelectorAll(".sidebar a").forEach((link) => {
link.addEventListener("click", (event) => {
  // event.preventDefault();
  const targetId = event.target.getAttribute("href").substring(1);
  const targetSection = document.getElementById(targetId);
  targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
});
});

// Active Section Highlight
window.addEventListener("scroll", () => {
const sections = document.querySelectorAll(".dashboard-section");
const sidebarLinks = document.querySelectorAll(".sidebar a");

sections.forEach((section, index) => {
  const rect = section.getBoundingClientRect();
  if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
    sidebarLinks.forEach((link) => link.classList.remove("active"));
    sidebarLinks[index].classList.add("active");
  }
});
});