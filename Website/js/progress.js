// Example for Updating Import/Export Charts
document.getElementById("year-select").addEventListener("change", (event) => {
  const selectedYear = event.target.value;

  // Update chart data based on selected year
  exportTrendsChart.data.datasets[0].data = getExportDataForYear(selectedYear);
  exportTrendsChart.update();

  importTrendsChart.data.datasets[0].data = getImportDataForYear(selectedYear);
  importTrendsChart.update();
});

// Dummy data-fetching functions
function getExportDataForYear(year) {
  const data = {
    2019: [150, 200, 250, 300],
    2020: [200, 300, 350, 400],
    2021: [300, 400, 450, 500],
    2022: [400, 500, 550, 600],
    2023: [500, 600, 650, 700],
  };
  return data[year];
}

function getImportDataForYear(year) {
  const data = {
    2019: [100, 150, 200, 250],
    2020: [150, 200, 250, 300],
    2021: [200, 250, 300, 350],
    2022: [250, 300, 350, 400],
    2023: [300, 350, 400, 450],
  };
  return data[year];
}
// update data dynamically by listening filters
document
  .getElementById("country-filter")
  .addEventListener("change", updateImportExportData);
document
  .getElementById("trade-type-filter")
  .addEventListener("change", updateImportExportData);

function updateImportExportData() {
  const country = document.getElementById("country-filter").value;
  const tradeType = document.getElementById("trade-type-filter").value;

  // Logic to filter and update the chart/table
  console.log(`Selected Country: ${country}, Trade Type: ${tradeType}`);
  // Fetch new data or filter existing data here
}
