
  // Get the current month dynamically
  const currentMonthIndex = new Date().getMonth(); // 0 = January, 1 = February, ..., 11 = December
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  let currentMonth = monthNames[currentMonthIndex]; // Convert index to month name

document.addEventListener("DOMContentLoaded", function () {
  const recommendationContainer = document.getElementById("recommendation");
  const tasksDiv = document.getElementById("tasks");
  const fertilizersDiv = document.getElementById("fertilizers");
  const pesticidesDiv = document.getElementById("pesticides");
  const monthInfoContainer = document.getElementById("monthly-info");

  if (
    !recommendationContainer ||
    !tasksDiv ||
    !fertilizersDiv ||
    !pesticidesDiv ||
    !monthInfoContainer
  ) {
    console.error(
      "One or more elements not found in the DOM. Check your HTML IDs."
    );
    return;
  }

  console.log("All elements found! JavaScript is working.");

  console.log("Current Month:", currentMonth);

  // Hide all month-related sections initially
  document.querySelectorAll(".month-details").forEach((div) => {
    div.style.display = "none";
  });

  // Show the section for the current month
  const currentMonthInfo = document.getElementById(`${currentMonth}-info`);
  if (currentMonthInfo) {
    currentMonthInfo.style.display = "block";
  }

  // Define recommendations for each month
  let tasks = "No specific tasks for this month.";
  let fertilizers = "No fertilizer recommendation.";
  let pesticides = "No pesticide recommendation.";

  const recommendations = {
    january: {
      tasks: "🌱 Pruning and training should start in this month.",
      fertilizers: "💧 Use nitrogen-based fertilizers.",
      pesticides: "🐞 Apply pest control to prevent diseases.",
    },
    february: {
      tasks: "🍊 Fertilization begins in this month to enhance growth.",
      fertilizers: "💧 Use phosphorus-rich fertilizers.",
      pesticides: "🐜 Monitor citrus pests and apply treatment if needed.",
    },
    march: {
      tasks: "🌞 Pest control should be carefully monitored.",
      fertilizers: "💧 Balanced fertilizer application is required.",
      pesticides: "🐛 Use organic pesticides to protect the citrus trees.",
    },
    april: {
      tasks: "🌿 Start irrigation as temperatures rise.",
      fertilizers: "💧 Apply potassium-rich fertilizers.",
      pesticides: "🦟 Monitor and control fungal infections.",
    },
    may: {
      tasks: "🌞 Protect trees from extreme heat.",
      fertilizers: "💧 Apply micronutrient foliar spray.",
      pesticides: "🐝 Use pest traps to prevent infestations.",
    },
    june: {
      tasks: "🌱 Ensure proper watering and mulching.",
      fertilizers: "💧 Reduce fertilizer application in extreme heat.",
      pesticides: "🦗 Apply insecticides if pest activity increases.",
    },
    july: {
      tasks: "🌦️ Monitor soil moisture levels carefully.",
      fertilizers: "💧 Apply organic compost to enrich soil.",
      pesticides: "🐜 Protect against fungal diseases during monsoon.",
    },
    august: {
      tasks: "🌿 Maintain irrigation cycles.",
      fertilizers: "💧 Use nitrogen-based fertilizers to boost growth.",
      pesticides: "🦟 Check for citrus psyllid and control accordingly.",
    },
    september: {
      tasks: "🍂 Prepare for fruit maturation.",
      fertilizers: "💧 Apply calcium-based nutrients for fruit quality.",
      pesticides: "🐞 Spray organic pesticides to protect from late pests.",
    },
    october: {
      tasks: "🍊 Monitor fruit ripening closely.",
      fertilizers: "💧 Maintain steady fertilizer application.",
      pesticides: "🦗 Apply protective sprays to prevent pest attacks.",
    },
    november: {
      tasks: "🌡️ Reduce irrigation as temperatures drop.",
      fertilizers: "💧 Apply potassium-based fertilizers.",
      pesticides: "🐝 Keep trees free from overwintering pests.",
    },
    december: {
      tasks: "❄️ Protect trees from frost if needed.",
      fertilizers: "💧 Stop fertilizer application until early spring.",
      pesticides: "🦟 Inspect trees for dormant pests and take action.",
    },
  };

  if (recommendations[currentMonth]) {
    tasks = recommendations[currentMonth].tasks;
    fertilizers = recommendations[currentMonth].fertilizers;
    pesticides = recommendations[currentMonth].pesticides;
  }

  // Display recommendations
  recommendationContainer.style.display = "none";
  tasksDiv.textContent = tasks;
  fertilizersDiv.textContent = fertilizers;
  pesticidesDiv.textContent = pesticides;
});
// water and fertiliser information
// Define water and fertilizer requirements for each month
const resourceRequirements = {
  january: {
    water: "💧 20-30 liters per tree per week.",
    fertilizer: "🌱 200g Nitrogen fertilizer per tree.",
  },
  february: {
    water: "💧 25-35 liters per tree per week.",
    fertilizer: "🌱 150g Phosphorus fertilizer per tree.",
  },
  march: {
    water: "💧 30-40 liters per tree per week.",
    fertilizer: "🌱 Balanced 100g NPK fertilizer per tree.",
  },
  april: {
    water: "💧 35-45 liters per tree per week.",
    fertilizer: "🌱 150g Potassium fertilizer per tree.",
  },
  may: {
    water: "💧 40-50 liters per tree per week.",
    fertilizer: "🌱 Micronutrient foliar spray once a month.",
  },
  june: {
    water: "💧 45-55 liters per tree per week.",
    fertilizer: "🌱 Minimal fertilization needed.",
  },
  july: {
    water: "💧 50-60 liters per tree per week.",
    fertilizer: "🌱 Apply organic compost around base.",
  },
  august: {
    water: "💧 45-55 liters per tree per week.",
    fertilizer: "🌱 Nitrogen fertilizer 100g per tree.",
  },
  september: {
    water: "💧 40-50 liters per tree per week.",
    fertilizer: "🌱 Calcium foliar spray for fruit strengthening.",
  },
  october: {
    water: "💧 30-40 liters per tree per week.",
    fertilizer: "🌱 Maintain steady fertilizer support.",
  },
  november: {
    water: "💧 20-30 liters per tree per week.",
    fertilizer: "🌱 Potassium fertilizer before winter.",
  },
  december: {
    water: "💧 Minimal irrigation needed.",
    fertilizer: "🌱 Stop fertilization during dormancy.",
  },
};

let waterRequirement = "No water data.";
let fertilizerRequirement = "No fertilizer data.";

if (resourceRequirements[currentMonth]) {
  waterRequirement = resourceRequirements[currentMonth].water;
  fertilizerRequirement = resourceRequirements[currentMonth].fertilizer;
}

// Display water and fertilizer info
function calculateResources() {
  const farmSize = document.getElementById("farmSize").value;
  const treesPerAcre = document.getElementById("treesPerAcre").value || 80;
  const citrusType = document.getElementById("citrusType").value;

  if (farmSize <= 0) {
    alert("Please enter a valid farm size.");
    return;
  }

  const totalTrees = farmSize * treesPerAcre;

  // Base values per citrus type
  let waterPerTreeLiters, fertilizerPerTreeGrams;

  if (citrusType === "kinnow") {
    waterPerTreeLiters = 30;
    fertilizerPerTreeGrams = 200;
  } else if (citrusType === "orange") {
    waterPerTreeLiters = 35;
    fertilizerPerTreeGrams = 220;
  } else if (citrusType === "lemon") {
    waterPerTreeLiters = 25;
    fertilizerPerTreeGrams = 180;
  } else if (citrusType === "grapefruit") {
    waterPerTreeLiters = 40;
    fertilizerPerTreeGrams = 250;
  }

  // ✅ Month-based adjustment
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentMonthIndex = new Date().getMonth(); // 0 = Jan, 11 = Dec
  const currentMonthName = monthNames[currentMonthIndex];

  let waterMultiplier = 1;
  let fertilizerMultiplier = 1;
  let season = "";

  if (currentMonthIndex >= 3 && currentMonthIndex <= 7) {
    // April to August (Summer)
    waterMultiplier = 1.2;
    fertilizerMultiplier = 1.1;
    season = "Summer Season 🌞";
  } else if (currentMonthIndex >= 10 || currentMonthIndex <= 1) {
    // Nov, Dec, Jan, Feb (Winter)
    waterMultiplier = 0.8;
    fertilizerMultiplier = 1.0;
    season = "Winter Season ❄️";
  } else {
    // Spring/Autumn
    waterMultiplier = 1.0;
    fertilizerMultiplier = 1.0;
    season = "Spring/Autumn 🌼";
  }

  // Apply adjustment
  const adjustedWaterPerTree = waterPerTreeLiters * waterMultiplier;
  const adjustedFertilizerPerTree =
    fertilizerPerTreeGrams * fertilizerMultiplier;

  // Total calculations
  const totalWater = totalTrees * adjustedWaterPerTree;
  const totalFertilizer = totalTrees * adjustedFertilizerPerTree;

  // Display result with Month & Season info
  const resultHTML = `
    <h3>Recommendation for <span style="color:#e67e22">${currentMonthName}</span> (${season})</h3>
    <table border="1" cellpadding="10">
      <tr>
        <th>Resource</th>
        <th>Per Tree</th>
        <th>Total for Your Farm</th>
      </tr>
      <tr>
        <td>💧 Water</td>
        <td>${adjustedWaterPerTree.toFixed(1)} liters/week</td>
        <td>${totalWater.toLocaleString()} liters/week</td>
      </tr>
      <tr>
        <td>🌱 Fertilizer (Nitrogen)</td>
        <td>${adjustedFertilizerPerTree.toFixed(0)} grams</td>
        <td>${(totalFertilizer / 1000).toLocaleString()} kg</td>
      </tr>
    </table>
  `;

  document.getElementById("resourceTable").innerHTML = resultHTML;
  // ✅ Monthly Tips Logic
  let monthlyTip = "";

  switch (currentMonthName) {
    case "January":
      monthlyTip =
        "🌿 It's pruning season! Remove dead branches and prepare for flowering.";
      break;
    case "February":
      monthlyTip = "🌱 Apply pre-bloom fertilizers and monitor pest activity.";
      break;
    case "March":
      monthlyTip =
        "🌸 Trees will start blooming, ensure proper irrigation and pest control.";
      break;
    case "April":
      monthlyTip =
        "☀️ Increase watering as temperature rises. Watch for aphids.";
      break;
    case "May":
      monthlyTip = "💦 Heavy irrigation needed. Apply summer nutrient sprays.";
      break;
    case "June":
      monthlyTip =
        "🌞 Peak summer — mulch trees and maintain high soil moisture.";
      break;
    case "July":
      monthlyTip = "🌀 Monsoon season — protect roots from waterlogging.";
      break;
    case "August":
      monthlyTip =
        "🌳 Apply post-monsoon fertilizers and manage fungal diseases.";
      break;
    case "September":
      monthlyTip = "🍊 Fruit sizing starts — maintain balanced nutrition.";
      break;
    case "October":
      monthlyTip = "🌾 Prepare for harvest by reducing irrigation.";
      break;
    case "November":
      monthlyTip =
        "🍊 Start harvesting mature fruits and monitor for early frost.";
      break;
    case "December":
      monthlyTip =
        "❄️ Minimal irrigation needed. Protect young trees from cold.";
      break;
    default:
      monthlyTip = "✅ Keep monitoring your citrus orchard regularly!";
  }

  // ✅ Append Tip below your result table
  document.getElementById("resourceTable").innerHTML += `
  <p style="margin-top: 20px; font-size: 1.1em; color: green;">
    🔔 <strong>Tip for ${currentMonthName}:</strong> ${monthlyTip}
  </p>
`;
}
let monthlyInfo = document.querySelector("#monthly-info");
if(currentMonth==='may'||currentMonth==='june'||currentMonth==='july')
  monthlyInfo.style.marginBottom="250px";