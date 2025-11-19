import { useNavigate } from 'react-router-dom';
import ProgressBar from '../common/ProgressBar';
import TreatmentInfo from './TreatmentInfo';

const ScanResult = ({ scanData, onNewScan }) => {
  const navigate = useNavigate();

  if (!scanData) {
    return null;
  }

  // Handle both direct scan object and nested data structure
  const scan = scanData.data?.scan || scanData.scan || scanData;

  // Safety check - ensure scan has required properties
  if (!scan || !scan.imageUrl) {
    console.error('Invalid scan data:', scanData);
    return (
      <div className="text-center p-8">
        <p className="text-red-600">Error: Invalid scan data received</p>
      </div>
    );
  }

  // Format date
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

  // Navigate to scan history
  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 animate-fadeIn">
      {/* Success Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Analysis Complete!</h2>
            <p className="text-emerald-50 mt-1">
              Your citrus leaf has been analyzed successfully
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 flex items-center">
                <svg
                  className="w-6 h-6 mr-2 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Uploaded Image
              </h3>
            </div>
            <div className="p-4">
              <img
                src={scan.imageUrl}
                alt="Analyzed citrus leaf"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>

          {/* Scan Metadata */}
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">
              Scan Details
            </h4>
            <div className="space-y-2 text-sm">
              {scan._id && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Scan ID:</span>
                  <span className="font-mono text-gray-800">
                    {scan._id.slice(-8)}
                  </span>
                </div>
              )}
              {scan.createdAt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-800">
                    {formatDate(scan.createdAt)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          {/* Disease Detection Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Detection Results
            </h3>

            {/* Disease Name */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Detected Disease
              </label>
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-lg p-4">
                <p className="text-2xl font-bold text-gray-900">
                  {scan.predictedDisease}
                </p>
              </div>
            </div>

            {/* Confidence Score */}
            <div>
              <label className="text-sm font-medium text-gray-600 mb-3 block">
                Confidence Level
              </label>
              <ProgressBar
                percentage={scan.confidence}
                label="Model Confidence"
              />
              
              {/* Confidence Interpretation */}
              <div className="mt-3 text-xs text-gray-500">
                {scan.confidence >= 80 && (
                  <p className="flex items-center text-emerald-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    High confidence - Result is highly reliable
                  </p>
                )}
                {scan.confidence >= 60 && scan.confidence < 80 && (
                  <p className="flex items-center text-amber-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    Moderate confidence - Consider additional verification
                  </p>
                )}
                {scan.confidence < 60 && (
                  <p className="flex items-center text-orange-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Lower confidence - Recommend expert consultation
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Treatment Information */}
          <TreatmentInfo treatment={scan.treatment} diseaseName={scan.predictedDisease} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={onNewScan}
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Analyze Another Image
          </span>
        </button>

        <button
          onClick={handleViewHistory}
          className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl shadow-lg hover:shadow-xl border-2 border-gray-300 transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <span className="flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            View Scan History
          </span>
        </button>
      </div>
    </div>
  );
};

export default ScanResult;
