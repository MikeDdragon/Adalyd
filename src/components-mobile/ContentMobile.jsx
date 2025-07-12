import React, { useState, useEffect } from 'react';
import YouTubeCarouselMobile from './YoutubeCaruselMobile';
import './YouTubeCarouselMobile.css';

const Content = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div id="contentMobile">
      {isLoaded && (
        <div className="content-mobile">
          <div className="spotify-player-mobile">
            <h2>Top Songs</h2>
            <iframe 
              src="https://open.spotify.com/embed/album/75z9XpPOorJX2R3dvpwvhi?utm_source=generator" 
              width="200%" 
              height="450vh" 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              style={{
                borderRadius: "12px",
                transform: "scale(0.8)",
                transformOrigin: "top left",
                margin: "-5vh auto", 
              }}
              title="Spotify Album Player"
            />
          </div>
          <YouTubeCarouselMobile 
            channelId="UC0Srsl_aIu6QDr6NKwBji_Q"
          />
        </div>
      )}
    </div>
  );
};

export default Content;
