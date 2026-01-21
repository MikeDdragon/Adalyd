import React, { useState, useEffect, useCallback, useRef } from 'react';
import './YouTubeCarousel.css';

// FullScreenVideo component
const FullScreenVideo = ({ videoId, onClose }) => {
  useEffect(() => {
    // Prevent background scrolling when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fullscreen-video-overlay" onClick={onClose}>
      <div className="fullscreen-video-container" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>&times;</button>
        <div className="video-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0&controls=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

const CACHE_KEY = 'youtube_videos_cache_mobile';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const YouTubeCarousel = ({ channelId, maxResults = 3 }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);

  // Navigation functions
  const nextVideo = useCallback(() => {
    setActiveIndex(prev => (prev === videos.length - 1 ? 0 : prev + 1));
  }, [videos.length]);

  const prevVideo = useCallback(() => {
    setActiveIndex(prev => (prev === 0 ? videos.length - 1 : prev - 1));
  }, [videos.length]);

  // Handle touch events for swipe gestures
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);
  
  const handleTouchEnd = useCallback(() => {
    if (!touchStartX || !touchEndX) return;
    
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) nextVideo();
    if (isRightSwipe) prevVideo();
    
    setTouchStartX(0);
    setTouchEndX(0);
  }, [touchStartX, touchEndX, nextVideo, prevVideo]);

  // Fetch videos from YouTube API
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { videos: cachedVideos, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setVideos(cachedVideos);
            setLoading(false);
            return;
          }
        }

        const apiKey = 'AIzaSyAD40YggyUa7b65HI8PiypfS8E0MN5eFf0'; // Using the same API key as desktop version
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?` +
          `part=snippet&channelId=${channelId}&maxResults=${maxResults}&order=date&type=video&key=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
        }

        if (!response.ok) throw new Error('Failed to fetch videos');
        
        const data = await response.json();
        
        if (!data.items) throw new Error('No videos found');

        const formattedVideos = data.items.map(item => ({
          id: item.id.videoId,
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          date: new Date(item.snippet.publishedAt).toLocaleDateString()
        }));

        // Cache the results
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          videos: formattedVideos,
          timestamp: Date.now()
        }));

        setVideos(formattedVideos);
        setError(null);
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError('Error loading videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [channelId, maxResults]);

  // Scroll active video into view
  useEffect(() => {
    if (videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeIndex]);

  if (loading) {
    return <div className="youtube-loading">Loading videos...</div>;
  }

  if (error) {
    return (
      <div className="youtube-error">
        Error loading videos. Please check your internet connection or try again later.
        <div style={{fontSize: '0.8em', marginTop: '10px'}}>{error.message || error}</div>
      </div>
    );
  }

  if (videos.length === 0) {
    return <div className="youtube-empty">No videos available</div>;
  }

  return (
    <>
      {fullscreenVideo && (
        <FullScreenVideo 
          videoId={fullscreenVideo} 
          onClose={() => setFullscreenVideo(null)} 
        />
      )}
      <div 
        className="youtube-carousel-mobile"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={containerRef}
      >
      <div className="carousel-container">
        <button 
          className="carousel-button prev" 
          onClick={prevVideo}
          aria-label="Video anterior"
        >
          ‹
        </button>
        
        <div className="videos-wrapper">
          {videos.map((video, index) => (
            <div 
              key={video.id}
              ref={el => videoRefs.current[index] = el}
              className={`video-card ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setFullscreenVideo(video.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              aria-label={`Video: ${video.title}`}
            >
              <div className="video-thumbnail">
                <>
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    loading="lazy"
                  />
                  <div className="play-icon">▶</div>
                </>
              </div>
              {index === activeIndex && (
                <div className="video-info">
                  <h3 className="video-title">{video.title}</h3>
                  <span className="video-date">{video.date}</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <button 
          className="carousel-button next" 
          onClick={nextVideo}
          aria-label="Siguiente video"
        >
          ›
        </button>
      </div>
      
      <div className="carousel-indicators">
        {videos.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Ir al video ${index + 1}`}
          />
        ))}
      </div>
      </div>
    </>
  );
};

export default YouTubeCarousel;
