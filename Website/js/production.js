Chart.register(ChartDataLabels);
document.addEventListener("DOMContentLoaded", () => {
  // Chart 1: Yearly Production Chart (Line)
  const yearlyProductionChartEl = document.getElementById(
    "yearlyProductionChart"
  );
  if (yearlyProductionChartEl) {
    new Chart(yearlyProductionChartEl, {
      type: "line",
      data: {
        labels: ["2019", "2020", "2021", "2022", "2023"],
        datasets: [
          {
            label: "Production (tons)",
            data: [2289262, 2300000, 2372119, 2372187, 2229520],
            borderColor: "#F39C12",
            backgroundColor: "rgba(243, 156, 18, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
    });
  }

  // Chart 2: Province Production Chart (Bar)
  Chart.register(ChartDataLabels);
  const provinceProductionChartEl = document.getElementById(
    "provinceProductionChart"
  );
  if (provinceProductionChartEl) {
    new Chart(provinceProductionChartEl, {
      type: "bar",
      data: {
        labels: ["Punjab", "Sindh", "Balochistan", "KPK", "Overall"],

        datasets: [
          {
            label: "Production (tons)",
            data: [2160411, 33677, 5946, 29486, 2229520],
            backgroundColor: ["#27AE60", "#F39C12", "#F1C40F", "#2C3E50"],
          },
        ],
      },
    });
  }

  // Chart 3: Yearly Citrus Production Trends (Line)
  Chart.register(ChartDataLabels);
  const productionTrendChartEl = document.getElementById(
    "productionTrendChart"
  );
  if (productionTrendChartEl) {
    const trendCtx = productionTrendChartEl.getContext("2d");
    new Chart(trendCtx, {
      type: "line",
      data: {
        labels: [2018, 2019, 2020, 2021, 2022, 2023],

        datasets: [
          {
            label: "Citrus Production (in tons)",
            data: [450000, 480000, 500000, 520000, 550000, 580000],
            borderColor: "#F39C12",
            backgroundColor: "rgba(243, 156, 18, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
        scales: {
          x: {
            title: { display: true, text: "Year" },
          },
          y: {
            title: { display: true, text: "Production (in tons)" },
          },
        },
      },
    });
  }

  // Chart 4: Provincial Contribution to Citrus Production (Doughnut)
  // Register the ChartDataLabels plugin (ensure it's loaded via your external script)
  // Register Chart.js and the datalabels plugin
  Chart.register(ChartDataLabels);

  const provinceContributionChartEl = document.getElementById(
    "provinceContributionChart"
  );
  if (provinceContributionChartEl) {
    const provinceCtx = provinceContributionChartEl.getContext("2d");

    new Chart(provinceCtx, {
      type: "doughnut",
      data: {
        labels: ["Punjab", "Sindh", "Balochistan", "KPK"],
        datasets: [
          {
            label: "Production Contribution (%)",
            data: [97.0, 1.26, 0.29, 1.45],
            backgroundColor: ["#3498DB", "#1ABC9C", "#E74C3C", "#F1C40F"],
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "right" },
          tooltip: {
            callbacks: {
              label: (context) =>
                `${context.label}: ${context.raw.toFixed(2)}%`,
            },
          },
          datalabels: {
            color: "#000",
            font: { size: 13, weight: "bold" },
            anchor: "end",
            align: "end",
            clamp: true,
            formatter: (value, context) => {
              const total = context.chart.data.datasets[0].data.reduce(
                (a, b) => a + b,
                0
              );
              const percentage = (value / total) * 100;
              return percentage >= 0.2 ? percentage.toFixed(1) + "%" : ""; // hide very small ones
            },
          },
        },
      },
      plugins: [ChartDataLabels], // this is CRITICAL — plugin must be here
    });
  }

  // Sidebar toggle functionality
  const toggleBtn = document.getElementById("toggleBtn");
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent"); // Ensure your main container has this ID
  if (toggleBtn && sidebar && mainContent) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
      mainContent.classList.toggle("full-width");
    });
  }

  // Smooth Scroll Functionality for Sidebar Links
  document.querySelectorAll(".sidebar a").forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = event.target.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Active Section Highlight on Scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(".dashboard-section");
    const sidebarLinks = document.querySelectorAll(".sidebar a");
    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
        sidebarLinks.forEach((link) => link.classList.remove("active"));
        if (sidebarLinks[index]) {
          sidebarLinks[index].classList.add("active");
        }
      }
    });
  });
});