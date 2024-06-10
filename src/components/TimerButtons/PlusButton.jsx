import React from 'react';
import './style.css';

const PlusButton = ({ addInput }) => {
  return (
    <div className='btn-div'>
      <button className="btn-plus"
        onClick={addInput}
      >
        +
    </button>
    </div>
  );
};

export default PlusButton;
