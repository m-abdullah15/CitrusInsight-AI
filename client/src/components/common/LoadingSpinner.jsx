/**
 * LoadingSpinner component with animated spinner
 * Uses CSS animations with brand colors
 * Reusable across the app with customizable size
 */
const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  // Size variants
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-12 w-12 border-2',
    lg: 'h-16 w-16 border-3',
    xl: 'h-24 w-24 border-4',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Spinner with gradient border */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-gray-200 animate-spin`}
          style={{
            borderTopColor: '#f9c02e',
            borderRightColor: '#4caf50',
          }}
        ></div>
        {/* Inner glow effect */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 blur-sm`}
        ></div>
      </div>
      
      {/* Loading message */}
      {message && (
        <p className={`mt-4 ${textSizeClasses[size]} text-gray-600 font-medium`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
