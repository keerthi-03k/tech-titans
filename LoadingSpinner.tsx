import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/40 border-t-white rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-b-white/60 rounded-full animate-spin animate-reverse"></div>
      </div>
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-2 drop-shadow-lg">Loading Tamil Nadu Weather</h3>
        <p className="text-white font-semibold">Getting the latest weather information...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;