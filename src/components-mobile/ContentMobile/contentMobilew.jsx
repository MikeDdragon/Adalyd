import React, { useState, useEffect } from 'react';
import YouTubeCarousel from '../YouTubeCarousel';
import './ContentMobile.css';

const ContentMobile = () => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isMobileOrTablet) {
    return null; // This component is for mobile and tablet only
  }

  return (
    <div className="content-mobile">
      <div className="spotify-player-mobile">
        <h2>Escucha Nuestra Música</h2>
        <iframe 
          src="https://open.spotify.com/embed/album/5CxUrSI3hlmdMVGZZCtDyZ?utm_source=generator" 
          width="100%" 
          height="400px"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          title="Spotify Album Player"
          style={{
            borderRadius: "12px",
            border: 'none',
            margin: '0 auto',
            display: 'block',
            maxWidth: '100%',
            backgroundColor: '#181818'
          }}
        />
      </div>
      
      <div className="youtube-section-mobile">
        <YouTubeCarousel 
          channelId="UC0Srsl_aIu6QDr6NKwBji_Q" 
          
          maxResults={5}
        />
      </div>
      
    </div>
  );
};

export default ContentMobile;