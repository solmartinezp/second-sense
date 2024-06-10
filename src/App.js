import React, { useState, useEffect, useRef } from 'react';
import TimerDisplay from './components/TimerDisplay';
import TimerButtons from './components/TimerButtons/TimerButtons';
import PlusButton from './components/TimerButtons/PlusButton';
import TimerInput from './components/TimerInput';
import HeaderTitle from './components/HeaderTitle';
import Ringtone from './assets/ringtone.mp4';
import './App.css';

const App = () => {
  const [disable, setDisable] = useState(true);
  const [audio, setAudio] = useState(new Audio(Ringtone));
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);
  const [inputTime, setInputTime] = useState('');
  const [intervalTime, setIntervalTime] = useState(0);
  const timerIntervalRef = useRef(null);
  const logIntervalRef = useRef(null);

  const incrementTime = () => {
    setTime((prevTime) => {
      let { hours, minutes, seconds } = prevTime;
      seconds += 1;
      if (seconds === 60) {
        seconds = 0;
        minutes += 1;
      }
      if (minutes === 60) {
        minutes = 0;
        hours += 1;
      }
      return { hours, minutes, seconds };
    });
  };

  useEffect(() => {
    if (isActive) {
      timerIntervalRef.current = setInterval(incrementTime, 1000);
      if (intervalTime > 0) {
        logIntervalRef.current = setInterval(() => {
           audio.play();
        }, intervalTime * 1000);
      }
    } else {
      clearInterval(timerIntervalRef.current);
      clearInterval(logIntervalRef.current);
    }
    return () => {
      clearInterval(timerIntervalRef.current);
      clearInterval(logIntervalRef.current);
    };
  }, [isActive, intervalTime]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleRestart = () => {
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputTime(value);

    const [hh, mm, ss] = value.split(':').map(Number);
    if (!isNaN(hh) && !isNaN(mm) && !isNaN(ss)) {
      const totalSeconds = hh * 3600 + mm * 60 + ss;
      setIntervalTime(totalSeconds);
    } else {
      setIntervalTime(0);
    }
  };

  useEffect(() => {
    if (!inputTime) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [inputTime]);

  return (
    <div className="main">
      <HeaderTitle />
      <div className="component-div">
        <TimerDisplay hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
        <TimerButtons onStart={handleStart} onPause={handlePause} onRestart={handleRestart} disabled={disable} />
        <p>Especifica un horario para comenzar:</p>
        <TimerInput inputTime={inputTime} onInputChange={handleInputChange} />

        <PlusButton />
      </div>
    </div>
  );
};

export default App;
