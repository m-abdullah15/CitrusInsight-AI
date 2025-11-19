import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import Navbar from '../../components/common/Navbar';
import ImageUploader from '../../components/detection/ImageUploader';
import ScanResult from '../../components/detection/ScanResult';
import AnalysisLoader from '../../components/detection/AnalysisLoader';
import { uploadImage } from '../../services/scanService';

const DiseaseDetection = () => {
  const { showError, showSuccess } = useToast();
  const [scanResult, setScanResult] = useState(null);
  const [error, setError] = useState('');
  const [loadingState, setLoadingState] = useState({
    isVisible: false,
    currentStep: 0,
    steps: [
      { id: 1, label: 'Uploading Image', description: 'Saving to cloud storage...' },
      { id: 2, label: 'Detecting Disease', description: 'Analyzing with AI...' }
    ]
  });

  // Handle image upload and analysis
  const handleImageSelect = async (imageFile) => {
    setError('');
    setScanResult(null);

    // Show loader at step 1 (Uploading Image)
    setLoadingState({
      ...loadingState,
      isVisible: true,
      currentStep: 1
    });

    // Track step transition timeout to clear it on error
    let stepTransitionTimeout = null;

    try {
      // Start upload - transition to step 2 after a delay to show upload step
      const uploadPromise = uploadImage(imageFile);
      
      // Transition to step 2 (Detecting Disease) after 1.5 seconds
      stepTransitionTimeout = setTimeout(() => {
        setLoadingState(prev => ({
          ...prev,
          currentStep: 2
        }));
      }, 1500);

      // Wait for the complete result (upload + detection)
      const result = await uploadPromise;
      setScanResult(result);
      showSuccess('Image analyzed successfully!');
    } catch (err) {
      // Clear step transition timeout if error occurs before transition
      if (stepTransitionTimeout) {
        clearTimeout(stepTransitionTimeout);
      }

      // Determine error type and message
      let errorMessage = 'Failed to analyze image. Please try again.';
      let errorType = 'unknown';

      if (!err.response && err.message?.includes('Network Error')) {
        errorType = 'network';
        errorMessage = err.userMessage || 'Network error. Please check your internet connection and try again.';
      } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
        errorType = 'timeout';
        errorMessage = 'Request timed out. Please try again.';
      } else if (err.response?.status >= 500) {
        errorType = 'server';
        errorMessage = err.userMessage || 'Server error. Please try again later.';
      } else if (err.response?.status === 413) {
        errorType = 'file_size';
        errorMessage = 'Image file is too large. Please use a smaller image.';
      } else if (err.response?.status === 400) {
        errorType = 'validation';
        errorMessage = err.response?.data?.message || err.userMessage || 'Invalid image file. Please upload a valid image.';
      } else {
        errorMessage = err.userMessage || err.message || errorMessage;
      }

      // Set error state and show toast notification
      setError(errorMessage);
      showError(errorMessage);

      // Enhanced error logging for debugging
      console.error('Disease detection error:', {
        type: errorType,
        message: errorMessage,
        originalError: err,
        response: err.response?.data,
        status: err.response?.status,
        timestamp: new Date().toISOString()
      });
    } finally {
      // Always ensure loader is hidden and reset to initial state
      // This prevents the loader from getting stuck in visible state
      setLoadingState(prev => ({
        ...prev,
        isVisible: false,
        currentStep: 0
      }));

      // Cleanup: Clear timeout if it hasn't fired yet to prevent memory leaks
      if (stepTransitionTimeout) {
        clearTimeout(stepTransitionTimeout);
      }
    }
  };

  // Handle new scan
  const handleNewScan = () => {
    setScanResult(null);
    setError('');
  };

  return (
    <><Navbar />
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <AnalysisLoader 
        isVisible={loadingState.isVisible}
        currentStep={loadingState.currentStep}
        steps={loadingState.steps}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-6 relative z-10">
        {/* Compact Header with Animation */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full shadow-lg animate-bounce-slow">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Disease Detection
            </h1>
          </div>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Upload a citrus leaf image for instant AI-powered disease analysis
          </p>
        </div>

        {/* Info Cards with Staggered Animation - Compact */}
        {!scanResult && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-emerald-500 transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">
                    Clear Image
                  </h3>
                  <p className="text-xs text-gray-600">
                    Well-lit photo
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-500 transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">
                    Fast Analysis
                  </h3>
                  <p className="text-xs text-gray-600">
                    Results in seconds
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-amber-500 transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">
                    Treatment Guide
                  </h3>
                  <p className="text-xs text-gray-600">
                    Detailed steps
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-5 sm:p-6 border border-emerald-100 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {!scanResult ? (
            <>
              {/* Image Uploader */}
              <ImageUploader
                onImageSelect={handleImageSelect}
                isLoading={loadingState.isVisible}
              />

              {/* Error Message */}
              {error && (
                <div className="mt-6 max-w-2xl mx-auto">
                  <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 shadow-md">
                    <div className="flex items-start">
                      <svg
                        className="w-6 h-6 text-red-500 mr-3 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div>
                        <h3 className="text-red-800 font-semibold">
                          Analysis Failed
                        </h3>
                        <p className="text-red-700 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading State - Now handled by AnalysisLoader overlay */}
            </>
          ) : (
            /* Scan Results */
            <ScanResult scanData={scanResult} onNewScan={handleNewScan} />
          )}
        </div>

        {/* Additional Info */}
        {!scanResult && !loadingState.isVisible && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Supported: Citrus Canker, Greening, Black Spot & more
            </p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default DiseaseDetection;
