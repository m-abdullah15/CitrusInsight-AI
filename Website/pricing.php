<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Pricing - Citrus Insight AI</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet"/>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
</head>
<style>
 .pricing-card {
  background: #fff;
  border-top: 4px solid;
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.pricing-card:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
}
.plan-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 0.5rem;
}
.plan-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #ea580c;
  margin-bottom: 1rem;
}
.features-list {
  text-align: left;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  color: #374151;
}
.pricing-btn {
  color: #fff;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
}
</style>
<body class="bg-orange-50 font-sans">
  <!-- Skip Button -->
  <div class="text-right p-4">
    <button onclick="window.location.href='dashboard.php'" class="text-xl text-orange-600 underline hover:text-orange-800">
      Skip for now
    </button>
  </div>

  <section class="text-center py-6 px-4">
    <h2 class="text-4xl font-bold text-orange-600 mb-2">Choose Your Plan</h2>
    <p class="text-gray-600 mb-4">Flexible pricing for citrus growers and professionals</p>

    <!-- Toggle Switch -->
    <div class="flex justify-center items-center gap-2 mb-8">
      <span class="text-sm text-gray-600">Monthly</span>
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" id="billingToggle" class="sr-only peer" onchange="toggleBilling()" />
        <div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer peer-checked:bg-orange-600"></div>
        <span class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-full"></span>
      </label>
      <span class="text-sm text-gray-600">Yearly</span>
    </div>

    <!-- Pricing Cards -->
    <div class="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
      <!-- Free Plan -->
      <div class="pricing-card border-orange-400">
        <h3 class="plan-title">Free</h3>
        <p class="plan-price" data-monthly="Rs 0 / month" data-yearly="Rs 0 / year">Rs 0 / month</p>
        <ul class="features-list">
          <li><i class="fas fa-check text-green-500 mr-2"></i>Basic Recommendations</li>
          <li><i class="fas fa-check text-green-500 mr-2"></i>Monthly Citrus Calendar</li>
          <li><i class="fas fa-check text-green-500 mr-2"></i>Fertilizer Schedule</li>
          <li><i class="fas fa-times text-red-500 mr-2"></i>Disease Detection</li>
          <li><i class="fas fa-times text-red-500 mr-2"></i>Dashboard</li>
        </ul>
        <button class="pricing-btn bg-orange-400 hover:bg-orange-500">Get Started</button>
      </div>

      <!-- Pro Plan -->
      <div class="pricing-card border-orange-500 scale-105 shadow-2xl">
        <h3 class="plan-title">Pro</h3>
        <p class="plan-price" data-monthly="Rs 999 / month" data-yearly="Rs 9999 / year">Rs 999 / month</p>
        <ul class="features-list">
          <li><i class="fas fa-check text-green-500 mr-2"></i>Everything in Free</li>
          <li><i class="fas fa-check text-green-500 mr-2"></i>Disease Detection</li>
          <li><i class="fas fa-check text-green-500 mr-2"></i>Visual Dashboard</li>
          <li><i class="fas fa-check text-green-500 mr-2"></i>Advanced Recommendations</li>
        </ul>
        <button class="pricing-btn bg-orange-500 hover:bg-orange-600">Upgrade to Pro</button>
      </div>

      <!-- Enterprise Plan -->
      <div class="pricing-card border-orange-700">
        <h3 class="plan-title">Enterprise</h3>
        <p class="plan-price" data-monthly="Rs 2499 / month" data-yearly="Rs 24,999 / year">Rs 2499 / month</p>
        <ul class="features-list">
          <li><i class="fas fa-check text-green-500 mr-2"></i>All Pro Features</li>
          <li><i class="fas fa-check text-green-500 mr-2"></i>Custom Land Analysis</li>
          <li><i class="fas fa-check text-green-500 mr-2"></i>Team Tools</li>
          <li><i class="fas fa-check text-green-500 mr-2"></i>Priority Support</li>
        </ul>
        <button class="pricing-btn bg-orange-700 hover:bg-orange-800">Contact Sales</button>
      </div>
    </div>
  </section>

  <script>// Toggle Monthly/Yearly Pricing
   function toggleBilling() {
     const toggle = document.getElementById('billingToggle');
     const prices = document.querySelectorAll('.plan-price');
     prices.forEach(price => {
       price.textContent = toggle.checked ? price.dataset.yearly : price.dataset.monthly;
     });
   }
   
   // Skip Pricing
   function skipPricing() {
     window.location.href = "dashboard.php"; // Change to your landing page or dashboard
   }
   </script>
</body>
</html>
