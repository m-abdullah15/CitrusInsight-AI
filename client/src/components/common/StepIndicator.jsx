import { memo } from 'react';
import PropTypes from 'prop-types';

/**
 * StepIndicator Component
 * 
 * Visual representation of a multi-step process with progress indication.
 * Displays step circles connected by lines, showing active, completed, and pending states.
 * 
 * Optimized with React.memo to prevent unnecessary re-renders when props haven't changed.
 * 
 * @param {Array} steps - Array of step objects with id, label, and description
 * @param {number} currentStep - Current active step number (1-based index)
 */
const StepIndicator = memo(({ steps, currentStep }) => {
  /**
   * Determines the state of a step based on current progress
   * @param {number} stepId - The step ID to check
   * @returns {string} - 'completed', 'active', or 'pending'
   */
  const getStepState = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  return (
    <div className="step-indicator-container">
      <nav className="step-indicator" aria-label="Progress steps">
        {steps.map((step, index) => {
          const state = getStepState(step.id);
          const isLastStep = index === steps.length - 1;

          return (
            <div 
              key={step.id} 
              className="step-wrapper"
              role="listitem"
              aria-current={state === 'active' ? 'step' : undefined}
            >
              <div className="step-row">
                {/* Step Circle */}
                <div 
                  className={`step-circle step-${state}`}
                  aria-label={`Step ${step.id}: ${step.label} - ${state}`}
                  role="img"
                >
                  {state === 'completed' ? (
                    <svg
                      className="checkmark"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span className="step-number" aria-hidden="true">{step.id}</span>
                  )}
                </div>

                {/* Connecting Line */}
                {!isLastStep && (
                  <div 
                    className={`step-line ${state === 'completed' ? 'completed' : ''}`}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Step Label and Description */}
              <div className="step-info">
                <div className="step-label">{step.label}</div>
                <div className="step-description">{step.description}</div>
              </div>
            </div>
          );
        })}
      </nav>

      <style>{`
        .step-indicator-container {
          width: 100%;
          margin: 24px 0;
        }

        .step-indicator {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
        }

        .step-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-row {
          display: flex;
          align-items: center;
          width: 100%;
          margin-bottom: 12px;
        }

        .step-circle {
          width: 48px;
          height: 48px;
          min-width: 48px;
          min-height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 18px;
          transition: all 0.3s ease;
          position: relative;
        }

        .step-active {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          will-change: transform, box-shadow;
        }

        .step-completed {
          background: #10b981;
          color: white;
        }

        .step-pending {
          background: #e5e7eb;
          color: #6b7280;
        }

        .step-number {
          display: block;
        }

        .checkmark {
          width: 24px;
          height: 24px;
        }

        .step-line {
          flex: 1;
          height: 2px;
          background: #e5e7eb;
          margin: 0 8px;
          transition: background 0.3s ease;
          will-change: background;
        }

        .step-line.completed {
          background: #10b981;
        }

        .step-info {
          text-align: center;
          width: 100%;
        }

        .step-label {
          font-weight: 600;
          font-size: 14px;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .step-description {
          font-size: 12px;
          color: #6b7280;
          line-height: 1.4;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(16, 185, 129, 0.6);
          }
        }

        /* Responsive styles for mobile (320px - 640px) */
        @media (max-width: 640px) {
          .step-circle {
            width: 40px;
            height: 40px;
            min-width: 40px;
            min-height: 40px;
            font-size: 16px;
          }

          .checkmark {
            width: 20px;
            height: 20px;
          }

          .step-label {
            font-size: 12px;
          }

          .step-description {
            font-size: 11px;
          }

          .step-indicator {
            gap: 8px;
          }

          .step-line {
            margin: 0 4px;
          }
        }

        /* Responsive styles for tablet (641px - 1024px) */
        @media (min-width: 641px) and (max-width: 1024px) {
          .step-circle {
            width: 44px;
            height: 44px;
            min-width: 44px;
            min-height: 44px;
            font-size: 17px;
          }

          .checkmark {
            width: 22px;
            height: 22px;
          }

          .step-label {
            font-size: 13px;
          }

          .step-description {
            font-size: 11px;
          }
        }
      `}</style>
    </div>
  );
});

StepIndicator.displayName = 'StepIndicator';

StepIndicator.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default StepIndicator;
