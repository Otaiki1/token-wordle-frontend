import React, { useState, useEffect } from 'react';

const ProgressBar = ({ value, maxValue }) => {
  const [progressValue, setProgressValue] = useState((value / maxValue) * 100);

  useEffect(() => {
    setProgressValue((value / maxValue) * 100);
  }, [value, maxValue]);

  return (
    <div className="w-full bg-gray-200 rounded-xl h-6">
      <div className={`w-${progressValue} bg-green-500 rounded-xl h-full`} style={{ width: `${progressValue}%` }}>
        </div>
    </div>
  );
};

export default ProgressBar;
