import React from 'react';
import { useNavigate } from 'react-router-dom';


import '../../../assets/css/static/Header.css';
import Navbar from './Navbar';
import ToggleTheme from '../../ToggleTheme';

const Header = () => {
  const navigate = useNavigate();

  const handlePartnerWithUsClick = () => {
    navigate('/partner-with-us');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <h1 className="company-name">TWISTMART</h1>
        </div>

        <div className="header-right">
          <ToggleTheme />
          {/* Partner With Us Button */}
          <button className="header-button" onClick={handlePartnerWithUsClick}>
            Partner With Us
          </button>
          {/* Login Button */}
          <button className="header-button" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </header>
      <Navbar />
    </>
  );
};

export default Header;
