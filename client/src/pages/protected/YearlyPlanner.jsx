import Navbar from '../../components/common/Navbar';

const YearlyPlanner = () => {
  // Citrus cultivation planning data by month
  const planningData = [
    {
      month: 'January',
      activities: 'Pruning, fertilization, pest monitoring',
      diseases: 'Citrus canker, root rot',
      tasks: 'Apply winter fertilizer, inspect for frost damage',
      priority: 'High'
    },
    {
      month: 'February',
      activities: 'Irrigation management, soil testing',
      diseases: 'Gummosis, melanose',
      tasks: 'Prepare for spring growth, check irrigation systems',
      priority: 'Medium'
    },
    {
      month: 'March',
      activities: 'Spring fertilization, flowering support',
      diseases: 'Citrus greening, aphid infestation',
      tasks: 'Apply bloom fertilizer, monitor for pests',
      priority: 'High'
    },
    {
      month: 'April',
      activities: 'Pollination support, pest control',
      diseases: 'Citrus leaf miner, scale insects',
      tasks: 'Spray for pests, support fruit set',
      priority: 'High'
    },
    {
      month: 'May',
      activities: 'Fruit thinning, irrigation increase',
      diseases: 'Fruit drop, sunburn',
      tasks: 'Thin excess fruit, increase watering',
      priority: 'Medium'
    },
    {
      month: 'June',
      activities: 'Summer fertilization, weed control',
      diseases: 'Citrus rust mite, thrips',
      tasks: 'Apply summer nutrients, mulch around trees',
      priority: 'Medium'
    },
    {
      month: 'July',
      activities: 'Heat stress management, deep watering',
      diseases: 'Sooty mold, spider mites',
      tasks: 'Ensure adequate water, shade young trees',
      priority: 'High'
    },
    {
      month: 'August',
      activities: 'Fruit development monitoring, pest scouting',
      diseases: 'Brown rot, fruit flies',
      tasks: 'Monitor fruit size, control fruit flies',
      priority: 'High'
    },
    {
      month: 'September',
      activities: 'Pre-harvest preparation, quality checks',
      diseases: 'Anthracnose, fruit splitting',
      tasks: 'Reduce irrigation, prepare harvest equipment',
      priority: 'Medium'
    },
    {
      month: 'October',
      activities: 'Harvest early varieties, post-harvest care',
      diseases: 'Post-harvest decay, storage issues',
      tasks: 'Begin harvest, maintain tree health',
      priority: 'High'
    },
    {
      month: 'November',
      activities: 'Main harvest season, storage management',
      diseases: 'Green mold, blue mold',
      tasks: 'Peak harvest activities, proper storage',
      priority: 'High'
    },
    {
      month: 'December',
      activities: 'Late harvest, winter preparation',
      diseases: 'Cold damage, root diseases',
      tasks: 'Complete harvest, prepare for winter',
      priority: 'Medium'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-300';
      case 'Low':
        return 'bg-green-100 text-green-700 border-green-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Yearly Planner</h1>
          <p className="text-gray-600">
            Comprehensive citrus cultivation planning guide for year-round management
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🌱</span>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Growing Season</p>
                <p className="text-xl font-bold text-gray-800">March - November</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🍊</span>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Harvest Period</p>
                <p className="text-xl font-bold text-gray-800">October - December</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">🔬</span>
              <div>
                <p className="text-sm text-gray-600 font-semibold">Critical Months</p>
                <p className="text-xl font-bold text-gray-800">March, July, October</p>
              </div>
            </div>
          </div>
        </div>

        {/* Planning Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Key Activities
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Common Diseases
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Tasks
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">
                    Priority
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {planningData.map((data, index) => (
                  <tr
                    key={data.month}
                    className="hover:bg-amber-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl">📅</span>
                        <span className="font-bold text-gray-800">{data.month}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{data.activities}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{data.diseases}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700">{data.tasks}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                          data.priority
                        )}`}
                      >
                        {data.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Best Practices Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">✅</span>
              <h2 className="text-2xl font-bold text-gray-800">Best Practices</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span className="text-gray-700">Regular monitoring for early disease detection</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span className="text-gray-700">Maintain proper irrigation schedules</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span className="text-gray-700">Apply fertilizers at recommended times</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span className="text-gray-700">Keep detailed records of all activities</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-500 mt-1">•</span>
                <span className="text-gray-700">Use CitrusInsight AI for disease identification</span>
              </li>
            </ul>
          </div>

          {/* Important Notes Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-2xl font-bold text-gray-800">Important Notes</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700">Adjust activities based on local climate conditions</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700">Consult local agricultural extension services</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700">Weather patterns may shift activity timings</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700">Keep emergency contact for pest control experts</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-500 mt-1">•</span>
                <span className="text-gray-700">Document all treatments and their effectiveness</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YearlyPlanner;
