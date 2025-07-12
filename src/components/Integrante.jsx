import '../styles.css';
import React from 'react';

const Integrante = ({ name, role, image, alt }) => {
  
  return (
    <div className="integrante-container">
      <img src={image} alt={alt} />
      <h3 className="integrante-name">{name}</h3>
      <p className="integrante-role">{role}</p>
    </div>
  );
};

export default Integrante;
