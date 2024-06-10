import React from 'react';
import Logo from '../../assets/work-time.gif';
import './style.css';

const HeaderTitle = () => {
  return (
    <div className="header-div">
      <img src={Logo} alt="Logo" className="header-img" />
      <h1 className="header-title">SecondSense</h1>
    </div>
  );
};

export default HeaderTitle;
