import { useEffect, useState } from 'react';

const ProgressBar = ({ percentage, label }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    // Animate progress bar on mount
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  // Determine color based on confidence level
  const getColorClasses = () => {
    if (percentage >= 80) {
      return 'from-emerald-400 to-green-500';
    } else if (percentage >= 60) {
      return 'from-yellow-400 to-amber-500';
    } else {
      return 'from-orange-400 to-red-500';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm font-bold text-gray-900">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
      
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full bg-gradient-to-r ${getColorClasses()} rounded-full transition-all duration-1000 ease-out shadow-lg`}
          style={{ width: `${animatedPercentage}%` }}
        >
          <div className="h-full w-full bg-white opacity-20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
