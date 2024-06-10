import React from 'react';
import './style.css';

const TimerDisplay = ({ hours, minutes, seconds, shake }) => {
  const formatTime = (value) => String(value).padStart(2, '0');

  return (
    <div className={`timer-display ${shake ? 'shake' : ''}`} >
      {`${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`}
    </div>
  );
};

export default TimerDisplay;
