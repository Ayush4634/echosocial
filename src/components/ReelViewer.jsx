import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX, Heart, MessageCircle, Send, MoreVertical, Music, Maximize } from 'lucide-react';
import './ReelViewer.css';

const ReelViewer = ({ reel, onClose, isOpen }) => {
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef(null);

    // Aspect Ratio Logic
    const [isLandscape, setIsLandscape] = useState(false);

    // Reset landscape on open/change
    useEffect(() => {
        setIsLandscape(false);
    }, [reel.id, isOpen]);

    // Handle open/close playback state
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isOpen) {
            // Check if we need to reset or if it's already playing
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                    setIsLoading(false); // We are playing!
                }).catch(err => {
                    console.log("Viewer Auto-play prevented:", err);
                    setIsPlaying(false);
                });
            }
        } else {
            video.pause();
            setIsPlaying(false);
            // Optional: reset time?
            // video.currentTime = 0; 
        }
    }, [isOpen]);

    // Lock scroll when Open
    useEffect(() => {
        if (!isOpen) return;

        // Stop scroll on mount
        document.body.style.overflow = 'hidden';
        if (window.lenis) {
            window.lenis.stop();
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // Restore scroll on unmount/close
            document.body.style.overflow = '';
            if (window.lenis) {
                window.lenis.start();
            }
            window.removeEventListener('keydown', handleKeyDown);
            // No cleanup of video source - we persist it!
        };
    }, [isOpen, onClose]);

    // Handle Mute Toggle
    const toggleMute = (e) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };

    // Handle Play/Pause Toggle
    const togglePlay = (e) => {
        e.stopPropagation();
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

    // Render into body to bypass any section-level positioning/overflow
    // Persist completely to keep video state
    return createPortal(
        <div
            className="reel-viewer-backdrop"
            onClick={onClose}
            style={{
                visibility: isOpen ? 'visible' : 'hidden',
                opacity: isOpen ? 1 : 0,
                pointerEvents: isOpen ? 'auto' : 'none',
                transition: 'opacity 0.3s ease, visibility 0.3s ease'
            }}
        >
            {/* Show content only if open OR if we want to keep it alive (we do, but maybe pause frame updates?)
                Actually, to keep buffering, it must be rendered.
            */}
            <motion.div
                className={`reel-viewer-container ${reel.mode === 'clean' ? 'clean-mode' : ''} ${isLandscape ? 'landscape-mode' : ''}`}
                layoutId={`reel-container-${reel.id}`}
                onClick={(e) => e.stopPropagation()}
                transition={{ type: "spring", stiffness: 350, damping: 35, mass: 0.8 }}
                // Only animate/transform if open to avoid weird rect calculations when hidden
                // Only animate/transform if open to avoid weird rect calculations when hidden
                style={{
                    transform: isOpen ? 'none' : 'scale(0.8)',
                    aspectRatio: isLandscape ? '16/9' : (reel.aspectRatio || '1/2'),
                }}
            >
                {/* Main Content Area - Mimics Phone */}
                <div className="reel-phone-frame" onClick={togglePlay} style={{ cursor: 'pointer' }}>

                    {/* Close Button - Moved INSIDE for visibility, strict Top-Right */}
                    <button className="reel-close-btn-internal" onClick={(e) => { e.stopPropagation(); onClose(); }}>
                        <X size={26} color="#fff" />
                    </button>

                    {/* Video Player - ALWAYS RENDERED */}
                    <video
                        ref={videoRef}
                        src={reel.video}
                        className="reel-video-player"
                        autoPlay={false} // Managed manually
                        loop
                        muted={isMuted}
                        playsInline
                        preload="auto"
                        onWaiting={() => setIsLoading(true)}
                        onPlaying={() => setIsLoading(false)}
                        onCanPlay={() => setIsLoading(false)}
                    />

                    {/* Loading Spinner */}
                    {isLoading && (
                        <div className="reel-loading-spinner">
                            <div className="spinner-icon"></div>
                        </div>
                    )}

                    {/* Persistent Play Button (Only when Paused) */}
                    <AnimatePresence>
                        {!isPlaying && !isLoading && (
                            <motion.div
                                className="center-play-indicator"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 0.8, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="play-triangle"></div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mute Control - Top Left */}
                    <button className="reel-mute-btn" onClick={toggleMute}>
                        {isMuted ? <VolumeX size={20} color="#fff" /> : <Volume2 size={20} color="#fff" />}
                    </button>

                    {/* Clean Mode Toggle Button */}
                    {reel.mode === 'clean' && (
                        <button
                            className="reel-maximize-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLandscape(!isLandscape);
                            }}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '70px', // Left of close button
                                zIndex: 10005,
                                background: 'rgba(0,0,0,0.5)',
                                border: '1px solid rgba(255,255,255,0.3)',
                                borderRadius: '50%',
                                width: '36px', // Match mute button size
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                cursor: 'pointer',
                                backdropFilter: 'blur(4px)'
                            }}
                        >
                            <Maximize size={18} />
                        </button>
                    )}

                    {/* Overlay UI (Instagram Style) - Hidden in Clean Mode */}
                    {reel.mode !== 'clean' && (
                        <div className="reel-viewer-ui">
                            <div className="reel-viewer-right">
                                <div className="ui-action-group">
                                    <Heart size={28} className="ui-icon" />
                                    <span className="ui-text">{reel.likes || '1.2k'}</span>
                                </div>
                                <div className="ui-action-group">
                                    <MessageCircle size={28} className="ui-icon" />
                                    <span className="ui-text">458</span>
                                </div>
                                <div className="ui-action-group">
                                    <Send size={28} className="ui-icon" />
                                </div>
                                <div className="ui-action-group">
                                    <MoreVertical size={28} className="ui-icon" />
                                </div>
                                <div className="ui-action-group spacer"></div>
                                <div className="ui-action-group">
                                    <div className="ui-album-art"></div>
                                </div>
                            </div>

                            <div className="reel-viewer-bottom">
                                <div className="ui-user-row">
                                    <img
                                        className="ui-avatar"
                                        src={reel.profileImg || '/assets/echo_logo.png'}
                                        alt={reel.username}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/assets/echo_logo.png';
                                        }}
                                    />
                                    <span className="ui-username">{reel.username || 'echo.social'}</span>
                                    <button className="ui-follow-btn">Follow</button>
                                </div>
                                <div className="ui-caption">
                                    <span className="ui-caption-text">{reel.title}</span> ... <span className="ui-more">more</span>
                                </div>
                                <div className="ui-audio-row">
                                    <Music size={14} />
                                    <span className="ui-audio-text">Original Audio - Trending...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>,
        document.body
    );
};

export default ReelViewer;
