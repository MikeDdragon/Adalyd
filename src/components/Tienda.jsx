import React, { useState } from 'react';
import './Tienda.css';

import camisetasAdalyd from '../images/camisetasAdalyd.jpg';
import puasGuitarra from '../images/Pua1.png';
import llaverosAdalyd from '../images/Llaveros1.png';

const products = [
  {
    id: 1,
    name: 'Camisetas Adalyd',
    image: camisetasAdalyd,
    price: '$200 + envio',
    buyUrl: 'https://www.mercadolivre.com.br/'
  },
  {
    id: 2,
    name: 'Puas de guitarra Pack 25',
    image: puasGuitarra,
    price: '$50 + envio',
    buyUrl: 'https://www.mercadolivre.com.br/'
  },
  {
    id: 3,
    name: 'Llaveros Adalyd',
    image: llaverosAdalyd,
    price: '$10 + envio',
    buyUrl: 'https://www.mercadolivre.com.br/'
  }
];

const Tienda = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 500);
  };

  const prevSlide = () => {
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    }, 500);
  };

  const openProductLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="tienda-container">
      <div className="carousel">
        <div className="carousel-controls">
          <button onClick={prevSlide} className="control-btn prev">
            ❮
          </button>
          <button onClick={nextSlide} className="control-btn next">
            ❯
          </button>
        </div>
        <div className="product-card">
          <div className="product-info">
            <h3 className="product-name">{products[currentIndex].name}</h3>
            <p className="product-price">{products[currentIndex].price}</p>
            <button 
              onClick={() => openProductLink(products[currentIndex].buyUrl)}
              className="buy-btn"
            >
              Comprar
            </button>
          </div>
          <div className="product-image-wrapper">
            <img 
              src={products[currentIndex].image} 
              alt={products[currentIndex].name}
              className="product-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tienda;
