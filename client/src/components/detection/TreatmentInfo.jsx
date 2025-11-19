import { useState, useEffect } from 'react';

const TreatmentInfo = ({ treatment, diseaseName }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [geminiTreatment, setGeminiTreatment] = useState('');
  const [isLoadingGemini, setIsLoadingGemini] = useState(false);
  const [geminiError, setGeminiError] = useState('');

  const API_KEY = "AIzaSyDIqGii2_Wi6WtSDvcw5NSRI7sqnWav7qw";
  const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent";

  useEffect(() => {
    if (diseaseName) {
      fetchGeminiTreatment();
    }
  }, [diseaseName]);

  const fetchGeminiTreatment = async () => {
    setIsLoadingGemini(true);
    setGeminiError('');
    
    const prompt = `Tell me a very short content about 100 words on the solution of ${diseaseName} problem of citrus`;

    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();

      if (response.ok) {
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
        setGeminiTreatment(text);
      } else {
        setGeminiError("Failed to fetch AI recommendations: " + (data.error?.message || "Unknown error"));
      }
    } catch (error) {
      setGeminiError("Request failed: " + error.message);
    } finally {
      setIsLoadingGemini(false);
    }
  };

  if (!treatment && !diseaseName) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 bg-gradient-to-r from-emerald-50 to-blue-50 flex items-center justify-between hover:from-emerald-100 hover:to-blue-100 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
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
          <h3 className="text-lg font-bold text-gray-800">
            Treatment Information
          </h3>
        </div>
        
        <svg
          className={`w-6 h-6 text-gray-600 transition-transform duration-300 ${
            isExpanded ? 'transform rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 py-5 space-y-5">
          {/* AI-Generated Treatment Recommendation */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-purple-800 mb-3 flex items-center">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              AI-Powered Treatment Recommendation
            </h4>
            {isLoadingGemini ? (
              <div className="flex items-center space-x-2 text-purple-600">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm">Generating AI recommendations...</span>
              </div>
            ) : geminiError ? (
              <p className="text-red-600 text-sm">{geminiError}</p>
            ) : geminiTreatment ? (
              <p className="text-purple-900 text-sm leading-relaxed whitespace-pre-line">
                {geminiTreatment}
              </p>
            ) : null}
          </div>

          {/* Description */}
          {treatment?.description && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Description
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {treatment.description}
              </p>
            </div>
          )}

          {/* Treatment Steps */}
          {treatment?.treatment && treatment.treatment.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
                Treatment Steps
              </h4>
              <ul className="space-y-2">
                {treatment.treatment.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 text-gray-600"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {index + 1}
                    </span>
                    <span className="flex-1 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prevention Tips */}
          {treatment?.prevention && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                Prevention
              </h4>
              <p className="text-amber-900 text-sm leading-relaxed">
                {treatment.prevention}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TreatmentInfo;
