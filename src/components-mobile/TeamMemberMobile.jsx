import React, { useState, useRef, useEffect } from 'react';
import './TeamMemberMobile.css';
import danImage from '../images/dan1.png';
import mikeImage from '../images/mike1.png';
import baldoImage from '../images/bald1.png';
import edgarImage from '../images/edgar1.png';

const TeamMemberMobile = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  const teamMembers = [
    {
      name: "Daniel Tamayo",
      role: "Guitarrista de varios grupos de la ciudad de Hermosillo Sonora, integrante de agrupaciones versatiles. Sus inspiraciones mas fuertes son Stratovarius, Sonata Arctica, Childer of bodom.",
      image: danImage
    },
    {
      name: "Miguel García",
      role: "Baterista de diferentes grupos de trash metal, melodic metal y power metal, inspiraciones principales son Kamelot, Sonata Arctica, Avantasia, Beast in Black, etc.",
      image: mikeImage
    },
    {
      name: "Baldo",
      role: "Bajista, guitarrista y compositor del grupo Anima Ignis, inspiraciones principales son Avantasia, Kamelot, Childer of bodom, WarCry.",
      image: baldoImage
    },
    {
      name: "Edgar López",
      role: "Cantante, parte de diferentes grupos con inspiracion en Angra, Mago de Oz, WarCry, Sonata Arctica",
      image: edgarImage
    }
  ];

  const nextMember = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % teamMembers.length);
  };

  const prevMember = () => {
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) return teamMembers.length - 1;
      return prevIndex - 1;
    });
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      nextMember();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      prevMember();
    }
  };

  return (
    <div className="team-members-container">
      <div 
        className="team-members-wrapper"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={sliderRef}
      >
        {teamMembers.map((member, index) => (
          <div 
            key={index} 
            className="team-member-mobile"
            style={{ 
              zIndex: activeIndex === index ? 10 : 1,
              opacity: activeIndex === index ? 1 : 0.7,
              transform: activeIndex === index ? 'translateX(0)' : 'translateX(-2%)',
            }}
          >
            <img 
              src={member.image} 
              alt={member.name}
              className="team-member-image"
            />
            <div className="team-member-info">
              <div className="team-member-name">{member.name}</div>
              <div className="team-member-role">{member.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMemberMobile;
