import React, { useState } from 'react';
import './style.css';

const TimerInput = ({ inputTime, onInputChange }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (value.length > 6) value = value.slice(0, 6); // Limit to 6 digits

    let formattedValue = value;
    if (value.length > 4) {
      formattedValue = value.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
    } else if (value.length > 2) {
      formattedValue = value.replace(/(\d{2})(\d{2})/, '$1:$2');
    }

    onInputChange({ target: { value: formattedValue } });
  };

  return (
      <input
        className='main-input'
        type="text"
        placeholder="hh:mm:ss"
        value={inputTime}
        onChange={handleChange}
      />
  );
};

export default TimerInput;
