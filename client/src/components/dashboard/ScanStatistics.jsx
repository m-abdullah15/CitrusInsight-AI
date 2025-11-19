import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';
import DashboardCard from './DashboardCard';

const ScanStatistics = () => {
  const { user } = useAuth();
  const { showError } = useToast();
  const [stats, setStats] = useState({
    totalScans: 0,
    avgConfidence: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await api.get('/scans/stats');
        
        if (response.data.success) {
          setStats({
            totalScans: response.data.data.totalScans,
            avgConfidence: response.data.data.avgConfidence,
          });
        }
      } catch (err) {
        console.error('Failed to fetch scan statistics:', err);
        const errorMessage = err.userMessage || 'Failed to load statistics';
        setError(errorMessage);
        showError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate member since duration
  const getMemberSince = () => {
    if (!user?.createdAt) return 'N/A';
    
    const createdDate = new Date(user.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} days`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'}`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <DashboardCard
        icon="🔬"
        title="Total Scans"
        value={stats.totalScans}
        gradient="from-emerald-500 to-teal-600"
      />
      
      <DashboardCard
        icon="📅"
        title="Member Since"
        value={getMemberSince()}
        gradient="from-blue-500 to-indigo-600"
      />
      
      <DashboardCard
        icon="📊"
        title="Avg Confidence"
        value={`${stats.avgConfidence}%`}
        gradient="from-amber-500 to-orange-600"
      />
    </div>
  );
};

export default ScanStatistics;
