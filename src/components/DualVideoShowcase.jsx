import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import './DualVideoShowcase.css';
import ReelViewer from './ReelViewer';
import { AnimatePresence } from 'framer-motion';
import { getCloudinaryUrl, getCloudinaryVideoUrl } from '../utils/cloudinary';
import { getAssetPath } from '../utils/assetMapping';

const cImg = (path) => {
    const assetId = getAssetPath(path);
    return assetId ? getCloudinaryUrl(assetId) : path;
};

const cVid = (path) => {
    const assetId = getAssetPath(path);
    return assetId ? getCloudinaryVideoUrl(assetId) : path;
};

const formatTime = (time) => {
    if (!time || isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const VideoFrame = ({ id, src, title, thumbnail, onMobileClick }) => {
    const videoRef = useRef(null);
    const wrapperRef = useRef(null);

    // Player State
    const [isPlaying, setIsPlaying] = useState(false); // Default false for hover-to-play
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(100);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(true); // Start muted by default
    const [isHovering, setIsHovering] = useState(false);

    // ... (keep existing state/metadata/play logic same) ...

    // Handle Metadata (Duration)
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    // Play/Pause Toggle
    const togglePlay = (e) => {
        e?.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    // Time Update (Throttled for performance)
    const lastUpdate = useRef(0);
    const handleTimeUpdate = () => {
        const now = Date.now();
        if (now - lastUpdate.current > 250) { // Update text only 4 times a second
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
            }
            lastUpdate.current = now;
        }
    };

    // Scrubbing
    const handleSeek = (e) => {
        e.stopPropagation(); // prevent drag bubbling
        const time = parseFloat(e.target.value);
        if (videoRef.current) {
            videoRef.current.currentTime = time;
            setCurrentTime(time);
        }
    };

    // Volume
    const handleVolumeChange = (e) => {
        e.stopPropagation();
        const vol = parseFloat(e.target.value);
        setVolume(vol);
        if (videoRef.current) {
            videoRef.current.volume = vol;
            setIsMuted(vol === 0);
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            const newMuted = !isMuted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
            // If unmoting and volume was 0, reset to 1
            if (!newMuted && volume === 0) {
                setVolume(1);
                videoRef.current.volume = 1;
            }
        }
    };



    // Skip logic (Placeholder for Prev/Next)
    const skip = (seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    // Keyboard (Space to Play/Pause when hovering)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isHovering && e.code === 'Space') {
                e.preventDefault();
                togglePlay();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isHovering, isPlaying]);

    const hoverTimeoutRef = useRef(null);

    // Handle Hover to Play
    // We persist the video element to keep timing, but play/pause on hover
    const handleMouseEnter = () => {
        // Clear any existing leave timeout if user comes back quickly
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }

        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovering(true);
            if (videoRef.current) {
                // Ensure muted for autoplay reliability
                videoRef.current.muted = isMuted;
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => setIsPlaying(true))
                        .catch(err => {
                            console.log("Play interrupted or blocked:", err);
                            setIsPlaying(false);
                        });
                }
            }
        }, 150); // Reduced delay for better responsiveness (150ms)
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setIsHovering(false);
        if (videoRef.current) {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Global scroll listener to clear sticky cursor
    useEffect(() => {
        const handleScroll = () => {
            if (isHovering) {
                if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                }
                setIsHovering(false);
                if (videoRef.current) {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHovering]);

    // Mobile Detection
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fullscreen logic
    const toggleFullscreen = async (e) => {
        e?.stopPropagation();

        if (isMobile) {
            // Mobile: Call parent handler to open ReelViewer
            if (onMobileClick) {
                onMobileClick({
                    id,
                    video: src,
                    title: title,
                    profileImg: "/assets/echo_logo.png", // Start with default generic assets
                    username: "echo.social",
                    mode: "clean", // IMPT: Enable clean mode
                    aspectRatio: "16/9" // IMPT: Default 16:9 as requested
                });
            }
            // Pause current small player to avoid double audio
            if (videoRef.current) {
                videoRef.current.pause();
                setIsPlaying(false);
            }
        } else {
            // Desktop: Custom wrapper fullscreen
            if (wrapperRef.current) {
                if (!document.fullscreenElement) {
                    wrapperRef.current.requestFullscreen();
                } else {
                    document.exitFullscreen();
                }
            }
        }
    };

    // Handle Fullscreen Scroll Lock (Lenis integration) & Orientation Unlock
    useEffect(() => {
        const handleFullscreenChange = () => {
            // Unlock orientation when exiting fullscreen
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
                    try {
                        window.screen.orientation.unlock();
                    } catch (e) {
                        // ignore
                    }
                }
            }

            if (document.fullscreenElement) {
                // Stop scroll when entering fullscreen
                document.body.style.overflow = 'hidden';
                if (window.lenis) window.lenis.stop();
            } else {
                // Restore scroll when exiting
                document.body.style.overflow = '';
                if (window.lenis) window.lenis.start();
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange); // iOS
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
        };
    }, []);

    return (
        <div
            className={`video-frame-container ${isHovering ? 'is-hovering' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => {
                // If we scrolled and lost hover, but we are moving the mouse inside, regain hover
                if (!isHovering && !hoverTimeoutRef.current) {
                    handleMouseEnter();
                }

                const cursor = document.getElementById(`cursor-${id}`);
                if (cursor) {
                    cursor.style.left = `${e.clientX}px`;
                    cursor.style.top = `${e.clientY}px`;
                }
            }}
        >



            {createPortal(
                <div id={`cursor-${id}`} className={`smart-cursor ${isHovering ? 'active' : ''}`}>
                    <div className="cursor-content">
                        <Maximize size={14} className="cursor-icon" />
                        <span className="cursor-text">Click to Fullscreen</span>
                    </div>
                </div>,
                document.body
            )}

            <div
                className="macos-window"
                style={{ opacity: 1, transform: 'none' }} // specific inline style
            >
                {/* MacOS Top Bar */}
                <div className="window-bar">
                    <div className="window-dot red"></div>
                    <div className="window-dot yellow"></div>
                    <div className="window-dot green"></div>
                </div>

                {/* Video Wrapper */}
                <div className="video-wrapper" ref={wrapperRef} onClick={toggleFullscreen}>
                    {/* Fullscreen Toggle (Top Right Overlay) */}
                    <div className="fullscreen-btn-container">
                        <button className="overlay-btn" onClick={toggleFullscreen} aria-label="Fullscreen">
                            <Maximize size={16} />
                        </button>
                    </div>

                    {/* Persisted Video Element: Always in DOM to maintain currentTime */}
                    <video
                        ref={videoRef}
                        src={src}
                        className={`showcase-video ${isHovering ? 'visible' : 'hidden'}`}
                        muted={isMuted}
                        playsInline
                        loop
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            opacity: isHovering ? 1 : 0,
                            transition: 'opacity 0.4s ease',
                            zIndex: 1
                        }}
                    />

                    {/* Facade/Placeholder */}
                    <div className="video-placeholder" style={{
                        width: '100%',
                        height: '100%',
                        background: '#1a1a1a',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                        position: 'relative',
                        zIndex: 0
                    }}>
                        {thumbnail ? (
                            <img
                                src={thumbnail}
                                alt={title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <>
                                <img
                                    src="/echo_logo.png"
                                    alt="Echo Social"
                                    style={{ width: '50px', opacity: 0.2 }}
                                />
                                <span style={{
                                    color: 'rgba(255,255,255,0.3)',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '0.9rem',
                                    letterSpacing: '1px',
                                    fontWeight: 500
                                }}>
                                    {title}
                                </span>
                            </>
                        )}
                    </div>



                    {/* Cinematic Glass Controls */}
                    <div className="video-controls-overlay" onClick={(e) => e.stopPropagation()}>
                        <div className="glass-control-bar">

                            {/* 1. Timeline Row */}
                            <div className="timeline-row">
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 100} // Fallback to avoid NaN
                                    step="0.1"
                                    value={currentTime}
                                    onChange={handleSeek}
                                    className="cinematic-range"
                                    style={{
                                        background: `linear-gradient(to right, #ff0000 ${(currentTime / (duration || 1)) * 100}%, rgba(255,255,255,0.3) ${(currentTime / (duration || 1)) * 100}%)`
                                    }}
                                />
                            </div>

                            {/* 2. Buttons Row */}
                            <div className="controls-main-row">
                                <div className="controls-left">
                                    {/* Prev / Play / Next */}
                                    <button className="icon-btn" onClick={() => skip(-10)} aria-label="Rewind 10s">
                                        <SkipBack size={18} />
                                    </button>

                                    <button className="icon-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                                        {isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                                    </button>

                                    <button className="icon-btn" onClick={() => skip(10)} aria-label="Forward 10s">
                                        <SkipForward size={18} />
                                    </button>

                                    <span className="time-display">
                                        {formatTime(currentTime)} / {formatTime(duration)}
                                    </span>
                                </div>

                                <div className="controls-right">
                                    {/* Volume SliderReveal */}
                                    <div className="volume-container">
                                        <div className="volume-slider-wrapper">
                                            <input
                                                type="range"
                                                min="0"
                                                max="1"
                                                step="0.05"
                                                value={isMuted ? 0 : volume}
                                                onChange={handleVolumeChange}
                                                className="volume-range"
                                            />
                                        </div>
                                        <button className="icon-btn" onClick={toggleMute}>
                                            {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DualVideoShowcase = () => {
    const [selectedReel, setSelectedReel] = useState(null);

    const handleMobileClick = (reelData) => {
        setSelectedReel(reelData);
    };

    return (
        <section className="dual-showcase-section">
            <div className="dual-showcase-container">
                <VideoFrame
                    id="video-1"
                    src={cVid("/videos/M1_C.mp4")}
                    title="BRAND CAMPAIGN"
                    thumbnail={cImg("/thumbnails/M1.png")}
                    onMobileClick={handleMobileClick}
                />
                <VideoFrame
                    id="video-2"
                    src={cVid("/videos/M2_c.mp4")}
                    title="DIGITAL SHOWCASE"
                    thumbnail={cImg("/thumbnails/M2.png")}
                    onMobileClick={handleMobileClick}
                />
            </div>

            <AnimatePresence>
                {selectedReel && (
                    <ReelViewer
                        reel={selectedReel}
                        isOpen={!!selectedReel}
                        onClose={() => setSelectedReel(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default DualVideoShowcase;

