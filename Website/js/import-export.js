// Country wise
const countryCtx = document.getElementById("countryChart").getContext("2d");
const countryChart = new Chart(countryCtx, {
  type: "bar",
  data: {
    labels: ["Afghanistan", "UAE", "Russia", "Philippines", "Saudi Arabia"], // Example countries
    datasets: [
      {
        label: "Import",
        data: [5, 3, 4, 2, 3], // Example data
        backgroundColor: "#3498DB",
      },
      {
        label: "Export",
        data: [77, 24, 13, 7, 5, 4], // Example data
        backgroundColor: "#1ABC9C",
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Countries",
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: "Value (in million $)",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  },
});
// Trade Type
// const tradeTypeCtx = document.getElementById("tradeTypeChart").getContext("2d");
// Ensure you have the correct context
const tradeTypeCtx = document.getElementById("tradeTypeChart").getContext("2d");

// Create the pie chart
const tradeTypeChart = new Chart(tradeTypeCtx, {
  type: "pie",
  data: {
    labels: ["Import", "Export"],
    datasets: [
      {
        label: "Trade Type",
        data: [60, 40], // Example percentages
        backgroundColor: ["#E74C3C", "#F1C40F"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let total = context.dataset.data.reduce((a, b) => a + b, 0);
            let value = context.raw;
            let percentage = ((value / total) * 100).toFixed(2) + "%";
            return `${context.label}: ${value} (${percentage})`;
          },
        },
      },
      datalabels: {
        anchor: "end",
        align: "start",
        color: "#000",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          let total = context.dataset.data.reduce((a, b) => a + b, 0);
          let percentage = ((value / total) * 100).toFixed(2) + "%";
          return percentage;
        },
      },
    },
  },
  plugins: [ChartDataLabels], // Ensure the plugin is enabled
});

// Update charts dynamically
function updateCharts() {
  const country = document.getElementById("country-filter").value;
  const tradeType = document.getElementById("trade-type-filter").value;

  // Example: Adjust data based on filters
  if (country !== "all") {
    countryChart.data.labels = [country];
    countryChart.data.datasets[0].data = [800]; // Example filtered data
    countryChart.data.datasets[1].data = [600]; // Example filtered data
  } else {
    // Reset to default
    countryChart.data.labels = ["USA", "China", "UAE", "Germany", "UK"];
    countryChart.data.datasets[0].data = [500, 700, 400, 800, 600];
    countryChart.data.datasets[1].data = [300, 500, 600, 700, 400];
  }
  countryChart.update();

  if (tradeType !== "all") {
    tradeTypeChart.data.datasets[0].data =
      tradeType === "import" ? [100, 0] : [0, 100]; // Example
  } else {
    tradeTypeChart.data.datasets[0].data = [60, 40]; // Reset
  }
  tradeTypeChart.update();
}

// Attach event listeners
document
  .getElementById("country-filter")
  .addEventListener("change", updateCharts);
document
  .getElementById("trade-type-filter")
  .addEventListener("change", updateCharts);

  
      document.addEventListener("DOMContentLoaded", () => {
        // Import/Export Charts
// Export graph
        new Chart(document.getElementById("exportTrendsChart"), {
          type: "bar",
          data: {
            labels: ["2019", "2020", "2021", "2022", "2023"],
            datasets: [
              {
                label: "Exports (in Million $)",
                data: [160, 205, 171, 118, 78],
                backgroundColor: "#27AE60",
              },
            ],
          },
        });
// import graph 
        new Chart(document.getElementById("importTrendsChart"), {
          type: "bar",
          data: {
            labels: ["2019", "2020", "2021", "2022", "2023"],
            datasets: [
              {
                label: "Imports (in Million $)",
                data: [411, 1612, 20, 12, 18],
                // label : "Million $",
                backgroundColor: "#F39C12",
              },
            ],
          },
        });

        new Chart(document.getElementById("exportImportComparisonChart"), {
          type: "line",
          data: {
            labels: ["2019", "2020", "2021", "2022", "2023"],
            datasets: [
              {
                label: "Exports (in Million $)",
                data: [160, 205, 171, 118, 78],
                borderColor: "#27AE60",
                fill: false,
              },
              {
                label: "Imports (in Million $)",
                data: [411, 1612, 20, 12, 18],
                borderColor: "#F39C12",
                fill: false,
              },
            ],
          },
        });
      });

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