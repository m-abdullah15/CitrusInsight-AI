import Navbar from '../../components/common/Navbar';

const ImportExport = () => {
  // Statistics data for Pakistan citrus industry
  const exportStats = [
    { year: '2023', volume: '370,000 MT', value: '$280M', growth: '+12%' },
    { year: '2022', volume: '330,000 MT', value: '$250M', growth: '+8%' },
    { year: '2021', volume: '305,000 MT', value: '$231M', growth: '+5%' },
  ];

  const topDestinations = [
    { country: 'Afghanistan', share: '28%', icon: '🇦🇫' },
    { country: 'UAE', share: '22%', icon: '🇦🇪' },
    { country: 'Russia', share: '15%', icon: '🇷🇺' },
    { country: 'Philippines', share: '12%', icon: '🇵🇭' },
    { country: 'Indonesia', share: '10%', icon: '🇮🇩' },
    { country: 'Others', share: '13%', icon: '🌍' },
  ];

  const citrusVarieties = [
    { name: 'Kinnow', production: '95%', export: 'High', season: 'Dec-Mar' },
    { name: 'Blood Red', production: '2%', export: 'Medium', season: 'Jan-Feb' },
    { name: 'Musambi', production: '1.5%', export: 'Low', season: 'Nov-Jan' },
    { name: 'Feutrell\'s Early', production: '1.5%', export: 'Low', season: 'Oct-Nov' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Import Export of Citrus of Pakistan
          </h1>
          <p className="text-gray-600">
            Comprehensive overview of Pakistan's citrus trade and industry statistics
          </p>
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🍊</span>
              <span className="text-emerald-500 text-sm font-semibold">Production</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">2.3M MT</p>
            <p className="text-sm text-gray-600 mt-1">Annual Production</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">📦</span>
              <span className="text-blue-500 text-sm font-semibold">Export</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">370K MT</p>
            <p className="text-sm text-gray-600 mt-1">Export Volume (2023)</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">💰</span>
              <span className="text-purple-500 text-sm font-semibold">Revenue</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">$280M</p>
            <p className="text-sm text-gray-600 mt-1">Export Value (2023)</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">🌍</span>
              <span className="text-amber-500 text-sm font-semibold">Markets</span>
            </div>
            <p className="text-3xl font-bold text-gray-800">40+</p>
            <p className="text-sm text-gray-600 mt-1">Export Destinations</p>
          </div>
        </div>

        {/* Export Trends */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl">📈</span>
            <h2 className="text-3xl font-bold text-gray-800">Export Trends</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Year</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Volume</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase">Growth</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {exportStats.map((stat, index) => (
                  <tr key={stat.year} className="hover:bg-indigo-50 transition-colors duration-200">
                    <td className="px-6 py-4 font-bold text-gray-800">{stat.year}</td>
                    <td className="px-6 py-4 text-gray-700">{stat.volume}</td>
                    <td className="px-6 py-4 text-gray-700">{stat.value}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {stat.growth}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Export Destinations */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🌐</span>
              <h2 className="text-2xl font-bold text-gray-800">Top Export Destinations</h2>
            </div>
            
            <div className="space-y-4">
              {topDestinations.map((dest, index) => (
                <div
                  key={dest.country}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{dest.icon}</span>
                    <span className="font-semibold text-gray-800">{dest.country}</span>
                  </div>
                  <span className="text-lg font-bold text-indigo-600">{dest.share}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Citrus Varieties */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🍋</span>
              <h2 className="text-2xl font-bold text-gray-800">Citrus Varieties</h2>
            </div>
            
            <div className="space-y-4">
              {citrusVarieties.map((variety, index) => (
                <div
                  key={variety.name}
                  className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800 text-lg">{variety.name}</span>
                    <span className="text-sm font-semibold text-amber-600">
                      {variety.production}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Export Potential: {variety.export}</span>
                    <span className="text-gray-600">Season: {variety.season}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Export Challenges */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-2xl font-bold text-gray-800">Export Challenges</h2>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-red-500 mt-1 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-800">Quality Standards</p>
                  <p className="text-sm text-gray-600">Meeting international phytosanitary requirements</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 mt-1 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-800">Disease Management</p>
                  <p className="text-sm text-gray-600">Controlling citrus diseases for export quality</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 mt-1 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-800">Cold Chain Infrastructure</p>
                  <p className="text-sm text-gray-600">Maintaining freshness during transportation</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-red-500 mt-1 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-800">Market Competition</p>
                  <p className="text-sm text-gray-600">Competing with other citrus-producing nations</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Growth Opportunities */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl">🚀</span>
              <h2 className="text-2xl font-bold text-gray-800">Growth Opportunities</h2>
            </div>
            
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <span className="text-green-500 mt-1 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-800">New Markets</p>
                  <p className="text-sm text-gray-600">Expanding to European and Asian markets</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 mt-1 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-800">Value Addition</p>
                  <p className="text-sm text-gray-600">Processing citrus into juices and concentrates</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 mt-1 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-800">Technology Adoption</p>
                  <p className="text-sm text-gray-600">Using AI for disease detection and quality control</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-green-500 mt-1 text-xl">•</span>
                <div>
                  <p className="font-semibold text-gray-800">Organic Certification</p>
                  <p className="text-sm text-gray-600">Premium pricing for organic citrus products</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Information Banner */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="flex items-start space-x-4">
            <span className="text-4xl">💡</span>
            <div>
              <h3 className="text-2xl font-bold mb-3">Did You Know?</h3>
              <p className="text-lg leading-relaxed">
                Pakistan is the 12th largest citrus producer in the world, with Punjab province 
                accounting for over 95% of the country's total citrus production. The Kinnow mandarin, 
                a hybrid variety, dominates Pakistan's citrus exports and is renowned for its sweet 
                taste and high juice content. CitrusInsight AI helps farmers maintain export-quality 
                standards by detecting diseases early and ensuring healthy crops.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportExport;
