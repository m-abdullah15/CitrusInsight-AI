import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import ScanStatistics from '../../components/dashboard/ScanStatistics';
import RecentScans from '../../components/dashboard/RecentScans';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-600">
            Here's an overview of your citrus disease detection activity
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8">
          <ScanStatistics />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Scans Section - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <RecentScans />
          </div>

          {/* Quick Actions Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/detection')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-between group"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-2xl">🔬</span>
                    <span className="font-semibold">New Scan</span>
                  </span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => navigate('/history')}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-between group"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-2xl">📋</span>
                    <span className="font-semibold">View History</span>
                  </span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => navigate('/planner')}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-between group"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-2xl">📅</span>
                    <span className="font-semibold">Yearly Planner</span>
                  </span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={() => navigate('/import-export')}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-4 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-between group"
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-2xl">💾</span>
                    <span className="font-semibold">Import/Export</span>
                  </span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
