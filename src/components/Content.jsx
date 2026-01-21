import React, { useState, useEffect } from 'react';
import YouTubeCarousel from './YouTubeCarousel';
import './YouTubeCarousel.css';

const Content = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div id="content">
      {isLoaded && (
        <div className="content-wrapper">
          <div className="spotify-player">
            <iframe 
              src="https://open.spotify.com/embed/album/75z9XpPOorJX2R3dvpwvhi?utm_source=generator" 
              width="100%" 
              height="600" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              style={{borderRadius: "12px"}}
              title="Spotify Album Player"
            />
          </div>
          <YouTubeCarousel 
            channelId="UC0Srsl_aIu6QDr6NKwBji_Q"
          />
        </div>
      )}
    </div>
  );
};

export default Content;
