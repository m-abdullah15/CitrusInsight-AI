import { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import StepIndicator from '../common/StepIndicator';

/**
 * AnimatedSpinner Component
 * 
 * Spinning gradient ring animation for loading indication.
 * Uses CSS keyframe animation for smooth 60fps performance.
 * Memoized to prevent unnecessary re-renders.
 */
const AnimatedSpinner = memo(() => {
  return (
    <>
      <div className="spinner"></div>
      
      <style>{`
        .spinner {
          width: 80px;
          height: 80px;
          border: 4px solid #e5e7eb;
          border-top-color: #10b981;
          border-right-color: #1e40af;
          border-radius: 50%;
          animation: spin 1.5s linear infinite;
          will-change: transform;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive styles for mobile (320px - 640px) */
        @media (max-width: 640px) {
          .spinner {
            width: 60px;
            height: 60px;
            border-width: 3px;
          }
        }

        /* Responsive styles for tablet (641px - 1024px) */
        @media (min-width: 641px) and (max-width: 1024px) {
          .spinner {
            width: 70px;
            height: 70px;
          }
        }
      `}</style>
    </>
  );
});

AnimatedSpinner.displayName = 'AnimatedSpinner';

/**
 * AnalysisLoader Component
 * 
 * Full-page overlay loader with blur effect for disease detection analysis.
 * Displays a two-step progress indicator during image upload and disease detection.
 * 
 * Performance optimizations:
 * - Conditional rendering: Component only mounts when visible to reduce bundle impact
 * - Memoized child components (AnimatedSpinner, StepIndicator) prevent unnecessary re-renders
 * - GPU-accelerated animations using transform and opacity
 * - will-change CSS hints for animated elements
 * - Proper cleanup of timeouts to prevent memory leaks
 * 
 * @param {boolean} isVisible - Controls overlay visibility
 * @param {number} currentStep - Current step (1 or 2)
 * @param {Array} steps - Array of step objects with id, label, and description
 */
const AnalysisLoader = ({ isVisible, currentStep, steps }) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    let timer;
    
    if (isVisible) {
      setShouldRender(true);
      setIsAnimatingOut(false);
    } else if (shouldRender) {
      // Start fade-out animation
      setIsAnimatingOut(true);
      // Remove from DOM after animation completes (300ms)
      timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimatingOut(false);
      }, 300);
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isVisible, shouldRender]);

  // Conditional rendering optimization: Don't mount component when not visible
  // This reduces memory footprint and prevents unnecessary DOM operations
  if (!shouldRender) return null;

  const currentStepData = steps[currentStep - 1];

  return (
    <div 
      className={`analysis-overlay ${isAnimatingOut ? 'fade-out' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="loader-title"
      aria-describedby="loader-description"
    >
      <div className={`loader-container ${isAnimatingOut ? 'scale-out' : ''}`}>
        <h2 id="loader-title" className="sr-only">Analyzing Image</h2>
        <p id="loader-description" className="sr-only">
          Step {currentStep} of {steps.length}: {currentStepData?.label}. {currentStepData?.description}
        </p>
        
        {/* Aria-live region for announcing step changes to screen readers */}
        <div 
          className="sr-only" 
          role="status" 
          aria-live="polite" 
          aria-atomic="true"
        >
          {currentStepData && `Now on step ${currentStep}: ${currentStepData.label}. ${currentStepData.description}`}
        </div>
        
        <div className="loader-content">
          <AnimatedSpinner />
          <StepIndicator steps={steps} currentStep={currentStep} />
          <p className="status-text" aria-hidden="true">Processing your image...</p>
        </div>
      </div>

      <style>{`
        .analysis-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease-in-out;
          padding: 16px;
          will-change: opacity;
        }

        .analysis-overlay.fade-out {
          animation: fadeOut 0.3s ease-in-out forwards;
        }

        .loader-container {
          background: white;
          border-radius: 24px;
          padding: 48px 64px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          max-width: 500px;
          width: 90%;
          animation: scaleIn 0.3s ease-out;
          margin: 0 auto;
          will-change: transform, opacity;
        }

        .loader-container.scale-out {
          animation: scaleOut 0.3s ease-in forwards;
        }

        .loader-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        .status-text {
          color: #374151;
          text-align: center;
          font-size: 16px;
          font-weight: 500;
          margin: 0;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes scaleOut {
          from {
            transform: scale(1);
            opacity: 1;
          }
          to {
            transform: scale(0.95);
            opacity: 0;
          }
        }

        /* Responsive styles for mobile (320px - 640px) */
        @media (max-width: 640px) {
          .analysis-overlay {
            padding: 12px;
          }

          .loader-container {
            padding: 32px 24px;
            width: 90%;
            max-width: 100%;
            border-radius: 20px;
          }

          .loader-content {
            gap: 20px;
          }

          .status-text {
            font-size: 14px;
          }
        }

        /* Responsive styles for tablet (641px - 1024px) */
        @media (min-width: 641px) and (max-width: 1024px) {
          .loader-container {
            padding: 40px 48px;
            max-width: 480px;
          }

          .status-text {
            font-size: 15px;
          }
        }

        /* Desktop styles (1025px+) - Full design specifications */
        @media (min-width: 1025px) {
          .loader-container {
            padding: 48px 64px;
            max-width: 500px;
          }

          .status-text {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
};

AnalysisLoader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AnalysisLoader;
