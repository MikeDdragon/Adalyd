import React from 'react';
import '../styles.css';

const LogoHome = ({ image, isActive, onClose, setActiveMenu }) => {
  const handleClick = (e) => {
    e.stopPropagation();
    if (setActiveMenu) {
      setActiveMenu('#home');
      window.location.hash = '#home';
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div 
      className={`logo-container ${isActive ? 'active' : ''}`}
      onClick={handleClick}
    >
      <img src={image} alt="Logo Adalyd" />
    </div>
  );
};

export default LogoHome;
