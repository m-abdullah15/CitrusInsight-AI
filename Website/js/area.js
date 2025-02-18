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
