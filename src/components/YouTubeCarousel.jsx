import React from 'react';

const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const YouTubeCarousel = ({ channelId }) => {
    const [videos, setVideos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchVideos = async () => {
            try {
                // Check cache first
                const cachedData = localStorage.getItem(CACHE_KEY);
                if (cachedData) {
                    const { videos, timestamp } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        setVideos(videos);
                        return;
                    }
                }

                // Using a reliable proxy service to avoid CORS issues
                const response = await fetch(
                    `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=3&order=date&type=video&key=AIzaSyAD40YggyUa7b65HI8PiypfS8E0MN5eFf0`
                );

                const data = await response.json();
                
                if (!data.items) {
                    throw new Error('No videos found for this channel');
                }

                const formattedVideos = data.items.map(item => ({
                    id: item.id.videoId,
                    title: item.snippet.title,
                    date: new Date(item.snippet.publishedAt).toLocaleDateString(),
                    thumbnail: item.snippet.thumbnails.medium.url
                }));
                
                // Cache the results
                localStorage.setItem(CACHE_KEY, JSON.stringify({
                    videos: formattedVideos,
                    timestamp: Date.now()
                }));
                
                setVideos(formattedVideos);
                setError(null);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setError(`Failed to load videos. ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (channelId) {
            fetchVideos();
        }
    }, [channelId]);

    return (
        <div className="youtube-carousel">
            {loading ? (
                <div className="loading">Loading videos...</div>
            ) : error ? (
                <div className="loading">{error}</div>
            ) : (
                <div className="video-list">
                    {videos.map((video, index) => (
                        <div key={index} className="video-card">
                            <iframe
                                width="300"
                                height="600"
                                src={`https://www.youtube.com/embed/${video.id}`}
                                title={video.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ borderRadius: '50px' }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default YouTubeCarousel;
