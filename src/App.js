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

  const [inputs, setInputs] = useState([{ id: 1, value: '', interval: 0 }]);
  const timerIntervalRef = useRef(null);
  const logTimeoutRef = useRef(null);

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
      startLogTimeout(0);
    } else {
      clearInterval(timerIntervalRef.current);
      clearTimeout(logTimeoutRef.current);
    }
    return () => {
      clearInterval(timerIntervalRef.current);
      clearTimeout(logTimeoutRef.current);
    };
  }, [isActive, inputs]);

  const startLogTimeout = (index) => {
    if (inputs.length === 0 || inputs[index].interval === 0) return;
    logTimeoutRef.current = setTimeout(() => {
      audio.play();
      startLogTimeout((index + 1) % inputs.length);
    }, inputs[index].interval * 1000);
  };


  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleRestart = () => {
    setIsActive(false);
    setTime({ hours: 0, minutes: 0, seconds: 0 });
    clearTimeout(logTimeoutRef.current);
    setInputs([{ id: 1, value: '', interval: 0 }]);
    setDisable(true);
  };

  const handleInputChange = (id, value) => {
    if (value === '00:00:00') {
      setDisable(true);
    } else {
      setDisable(false);
    }
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === id
          ? { ...input, value, interval: calculateInterval(value) }
          : input
      )
    );
  };

  const calculateInterval = (value) => {
    const [hh, mm, ss] = value.split(':').map(Number);
    if (!isNaN(hh) && !isNaN(mm) && !isNaN(ss)) {
      return hh * 3600 + mm * 60 + ss;
    }
    return 0;
  };

  const handleAddInput = () => {
    setInputs((prevInputs) => [
      ...prevInputs,
      { id: prevInputs.length + 1, value: '', interval: 0 },
    ]);
  };

  return (
    <div className="main">
      <HeaderTitle />
      <div className="component-div">
        <TimerDisplay hours={time.hours} minutes={time.minutes} seconds={time.seconds} />
        <p className='slide-up-fade-in'>Especifica un horario para comenzar:</p>
        {inputs.map((input) => (
          <div key={input.id} className="input-div">
            <TimerInput
              inputTime={input.value}
              onInputChange={(e) => handleInputChange(input.id, e.target.value)}
            />
            <PlusButton addInput={handleAddInput} />
          </div>
        ))}
        <TimerButtons onStart={handleStart} onPause={handlePause} onRestart={handleRestart} disabled={disable} />
      </div>
    </div>
  );
};

export default App;
