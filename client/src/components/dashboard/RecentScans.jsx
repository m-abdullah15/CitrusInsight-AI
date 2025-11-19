import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

const RecentScans = () => {
  const navigate = useNavigate();
  const { showError } = useToast();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentScans = async () => {
      try {
        setLoading(true);
        const response = await api.get('/scans?limit=10&page=1');
        
        if (response.data.success) {
          setScans(response.data.data.scans);
        }
      } catch (err) {
        console.error('Failed to fetch recent scans:', err);
        const errorMessage = err.userMessage || 'Failed to load recent scans';
        setError(errorMessage);
        showError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentScans();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  const handleScanClick = (scanId) => {
    navigate(`/scan/${scanId}`);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Scans</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center space-x-4 animate-pulse">
              <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Scans</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  if (scans.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Scans</h2>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🔬</div>
          <p className="text-gray-600 mb-4">No scans yet</p>
          <button
            onClick={() => navigate('/detection')}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
          >
            Start Your First Scan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Scans</h2>
        <button
          onClick={() => navigate('/history')}
          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors"
        >
          View All →
        </button>
      </div>
      
      <div className="space-y-4">
        {scans.map((scan) => (
          <div
            key={scan._id}
            onClick={() => handleScanClick(scan._id)}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
          >
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow">
              <img
                src={scan.imageUrl}
                alt={scan.predictedDisease}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 truncate group-hover:text-emerald-600 transition-colors">
                {scan.predictedDisease}
              </h3>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-gray-500">
                  {formatDate(scan.createdAt)}
                </span>
                <span className="text-sm font-medium text-emerald-600">
                  {Math.round(scan.confidence)}% confidence
                </span>
              </div>
            </div>
            
            <div className="text-gray-400 group-hover:text-emerald-600 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentScans;
