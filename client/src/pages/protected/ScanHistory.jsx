import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import ScanCard from '../../components/history/ScanCard';
import { getUserScans, deleteScan } from '../../services/scanService';
import Navbar from '../../components/common/Navbar';

const ScanHistory = () => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalScans, setTotalScans] = useState(0);
  const scansPerPage = 20;

  useEffect(() => {
    fetchScans(currentPage);
  }, [currentPage]);

  const fetchScans = async (page) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getUserScans(page, scansPerPage);
      
      if (response.success) {
        setScans(response.data.scans);
        setTotalPages(response.data.pagination.totalPages);
        setTotalScans(response.data.pagination.total);
      }
    } catch (err) {
      console.error('Failed to fetch scans:', err);
      const errorMessage = err.userMessage || err.message || 'Failed to load scan history';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (scanId) => {
    try {
      await deleteScan(scanId);
      
      // Show success message
      showSuccess('Scan deleted successfully');
      
      // Update scan list without page reload
      setScans(prevScans => prevScans.filter(scan => scan._id !== scanId));
      setTotalScans(prev => prev - 1);
      
      // If current page is empty after deletion and not the first page, go to previous page
      if (scans.length === 1 && currentPage > 1) {
        setCurrentPage(prev => prev - 1);
      } else if (scans.length === 1 && currentPage === 1) {
        // If it was the last scan on the first page, just refresh
        fetchScans(1);
      }
    } catch (err) {
      console.error('Failed to delete scan:', err);
      const errorMessage = err.userMessage || err.message || 'Failed to delete scan';
      showError(errorMessage);
      throw err; // Re-throw to let ScanCard handle the error state
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Loading State
  if (loading) {
    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Scan History</h1>
            <p className="text-gray-600">View your past disease detection scans</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="flex-1 h-10 bg-gray-200 rounded"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      </>
    );
  }

  // Error State
  if (error) {
    return (

      <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Scan History</h1>
            <p className="text-gray-600">View your past disease detection scans</p>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <div className="text-red-600 text-5xl mb-4">⚠️</div>
            <h2 className="text-xl font-bold text-red-800 mb-2">Error Loading Scans</h2>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={() => fetchScans(currentPage)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Empty State
  if (scans.length === 0 && !loading) {
    return (
      <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Scan History</h1>
            <p className="text-gray-600">View your past disease detection scans</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="text-8xl mb-6">🔬</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">No Scans Yet</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              You haven't performed any disease detection scans yet. Start by uploading your first citrus leaf image!
            </p>
            <button
              onClick={() => navigate('/detection')}
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Your First Scan
            </button>
          </div>
        </div>
      </div>
      </>
    );
  }

  // Main Content
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Scan History</h1>
              <p className="text-gray-600">
                {totalScans} {totalScans === 1 ? 'scan' : 'scans'} total
              </p>
            </div>
            <button
              onClick={() => navigate('/detection')}
              className="mt-4 md:mt-0 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>New Scan</span>
            </button>
          </div>
        </div>

        {/* Scans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {scans.map((scan) => (
            <ScanCard key={scan._id} scan={scan} onDelete={handleDelete} />
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    // Show first page, last page, current page, and pages around current
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentPage === pageNum
                              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return <span key={pageNum} className="px-2 text-gray-500">...</span>;
                    }
                    return null;
                  })}
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
                
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default ScanHistory;
