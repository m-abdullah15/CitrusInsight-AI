import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { getScanById, deleteScan } from '../../services/scanService';
import Navbar from '../../components/common/Navbar';
import ProgressBar from '../../components/common/ProgressBar';
import TreatmentInfo from '../../components/detection/TreatmentInfo';

const ViewScan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  
  const [scan, setScan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchScanDetails();
  }, [id]);

  const fetchScanDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getScanById(id);
      
      // Handle different response structures
      const scanData = response.data?.scan || response.scan || response.data || response;
      
      if (!scanData) {
        throw new Error('Invalid scan data received');
      }
      
      setScan(scanData);
    } catch (err) {
      const errorMessage = err.userMessage || err.message || 'Failed to load scan details';
      setError(errorMessage);
      showError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteScan(id);
      showSuccess('Scan deleted successfully');
      navigate('/history');
    } catch (err) {
      const errorMessage = err.userMessage || err.message || 'Failed to delete scan';
      setError(errorMessage);
      showError(errorMessage);
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading scan details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 64px)' }}>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/history')}
              className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-lg hover:from-emerald-600 hover:to-blue-700 transition-all duration-200 font-medium"
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!scan) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
        {/* Header with Back and Delete buttons */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <button
            onClick={() => navigate('/history')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Back to History</span>
          </button>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleting}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>{deleting ? 'Deleting...' : 'Delete Scan'}</span>
          </button>
        </div>

        {/* Two-column layout (stacked on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Image */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Scan Image
              </h2>
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={scan.imageUrl}
                  alt="Citrus leaf scan"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right column - Details */}
          <div className="space-y-6">
            {/* Scan Details Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Scan Details
              </h2>

              {/* Disease Name */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
                  Detected Disease
                </label>
                <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-l-4 border-emerald-500 rounded-lg p-4">
                  <p className="text-2xl font-bold text-gray-800">
                    {scan.predictedDisease}
                  </p>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-3 block">
                  Confidence Level
                </label>
                <ProgressBar 
                  percentage={scan.confidence} 
                  label="Model Confidence"
                />
              </div>

              {/* Scan Date */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
                  Scan Date & Time
                </label>
                <div className="flex items-center space-x-3 text-gray-700">
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-lg">{formatDate(scan.createdAt)}</span>
                </div>
              </div>

              {/* Scan ID */}
              <div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
                  Scan ID
                </label>
                <p className="text-sm text-gray-500 font-mono bg-gray-50 px-3 py-2 rounded border border-gray-200">
                  {scan._id}
                </p>
              </div>
            </div>

            {/* Treatment Information */}
            <TreatmentInfo treatment={scan.treatment} diseaseName={scan.predictedDisease} />
          </div>
        </div>
      </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
              Delete Scan?
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Are you sure you want to delete this scan? This action cannot be undone.
            </p>

            <div className="flex space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewScan;
