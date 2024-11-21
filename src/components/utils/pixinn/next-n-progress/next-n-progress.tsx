import ProgressBar from 'nextjs-progressbar';
import React from 'react';

export const NextNprogress = () => {
  // const color = 'rgb(191, 0, 0)';
  const color = '#000';
  const startPosition = 0.3;
  const stopDelayMs = 200;
  const height = 3;
  const options = { easing: 'ease', speed: 500 };

  return (
    <ProgressBar
      color={color}
      startPosition={startPosition}
      stopDelayMs={stopDelayMs}
      height={height}
      options={options}
    />
  );
};
