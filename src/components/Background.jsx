import React from 'react';
import grupo2 from '../images/grupo2.png';

const Background = ({ isActive }) => {
  return (
    <div className="background">
      <img 
        src={grupo2} 
        alt="Band Background" 
        className="background-image"
        style={{ opacity: isActive ? 1 : 0 }}
      />
    </div>
  );
};

export default Background;
