import React from 'react';
import './style.css';

const TimerButtons = ({ onStart, onPause, onRestart, disabled }) => {
  return (
    <div className='btn-div'>
      <button className={disabled ? "btn-disabled" : "btn"} onClick={onStart} disabled={disabled}>START</button>
      <button className={disabled ? "btn-disabled" : "btn"} onClick={onPause} disabled={disabled}>PAUSE</button>
      <button className={disabled ? "btn-disabled" : "btn"} onClick={onRestart} disabled={disabled}>RESTART</button>
    </div>
  );
};

export default TimerButtons;
