import React from 'react';
import '../styles.css';

const MenuButton = ({ text, href, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick(e, href);
    }
  };

  return (
    <button 
      className="menu-button"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default MenuButton;
