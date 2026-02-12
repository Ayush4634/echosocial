import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, MoreVertical, Camera, ChevronLeft, Music, Maximize, Loader2 } from 'lucide-react';
import OptimizedVideo from './OptimizedVideo';
import './Projects.css'; // Assuming styles are shared

const ReelCard = ({ reel, index, onClick, profileImg, username }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const videoRef = useRef(null);

    const isCenter = index === 1;
    const isLeft = index === 0;
    const isRight = index === 2;

    let motionStyle = { cursor: 'pointer' };
    let hoverStyle = {};

    if (isLeft) {
        motionStyle = { ...motionStyle, x: 40, scale: 0.9, rotateY: 25, zIndex: 1 };
        hoverStyle = { scale: 0.95, rotateY: 20, zIndex: 25 };
    } else if (isCenter) {
        motionStyle = { ...motionStyle, zIndex: 10, rotateY: 0 };
        hoverStyle = { scale: 1.05, zIndex: 30 };
    } else if (isRight) {
        motionStyle = { ...motionStyle, x: -40, scale: 0.9, rotateY: -25, zIndex: 1 };
        hoverStyle = { scale: 0.95, rotateY: -20, zIndex: 25 };
    }

    const hoverTimeoutRef = useRef(null);

    const handleMouseEnter = () => {
        // Clear any existing leave timeout
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }

        hoverTimeoutRef.current = setTimeout(() => {
            setIsHovering(true);
        }, 150); // Consistent 150ms delay
    };

    const handleMouseLeave = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
        }
        setIsHovering(false);
        // unmount handles pause
    };

    // Play/Pause logic on hover
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isHovering) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Auto-play was prevented:", error);
                    setIsLoading(false); // Stop spinner if play fails
                });
            }
        } else {
            video.pause();
            video.currentTime = 0; // Optional: Reset to start? Or keep position? Kept 0 for "preview" feel
        }
    }, [isHovering]);

    // Scroll listener to clear hover (fixes sticky cursor)
    useEffect(() => {
        const handleScroll = () => {
            if (isHovering) {
                if (hoverTimeoutRef.current) {
                    clearTimeout(hoverTimeoutRef.current);
                    hoverTimeoutRef.current = null;
                }
                setIsHovering(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHovering]);

    return (
        <motion.div
            className={`reel-card ${isHovering ? 'is-hovering' : ''}`}
            layoutId={`reel-container-${reel.uid}`}
            onClick={onClick}
            style={motionStyle}
            whileHover={hoverStyle}
            transition={{ duration: 0.3 }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => {
                // If we scrolled and lost hover, but we are moving the mouse inside, regain hover
                if (!isHovering && !hoverTimeoutRef.current) {
                    handleMouseEnter();
                }

                const cursor = document.getElementById(`cursor-${reel.uid}`);
                if (cursor) {
                    cursor.style.left = `${e.clientX}px`;
                    cursor.style.top = `${e.clientY}px`;
                }
            }}
        >
            {createPortal(
                <div id={`cursor-${reel.uid}`} className={`smart-cursor ${isHovering ? 'active' : ''}`}>
                    <div className="cursor-content">
                        <Maximize size={14} className="cursor-icon" />
                        <span className="cursor-text">Click to Fullscreen</span>
                    </div>
                </div>,
                document.body
            )}
            {/* <img /> for thumbnail - always visible as background */}
            <img
                src={reel.img}
                className="reel-image"
                style={{
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1
                }}
                alt={reel.title}
                loading="lazy"
            />

            {/* Video always mounted to allow buffering, visibility toggled */}
            <video
                ref={videoRef}
                src={reel.video}
                className="reel-image"
                muted
                loop
                playsInline
                preload="metadata"
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                onCanPlay={() => setIsLoading(false)}
                style={{
                    objectFit: 'cover',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 2, // Above thumbnail
                    opacity: isHovering ? 1 : 0,
                    transition: 'opacity 0.3s ease'
                }}
            />

            {/* Loading Spinner */}
            {isHovering && isLoading && (
                <div className="reel-loading-overlay">
                    <Loader2 className="animate-spin" size={32} color="#fff" />
                </div>
            )}


            <div className="play-button-overlay" style={{ opacity: isHovering ? 0 : 1, transition: 'opacity 0.3s ease' }}>
                <div className="play-icon"></div>
            </div>
            <div className="reel-ui-overlay">
                <div className="reel-top-bar">
                    <ChevronLeft className="top-icon" size={28} />
                    <span className="reels-title">Reels</span>
                    <Camera className="top-icon" size={28} />
                </div>
                <div className="reel-right-actions">
                    <div className="action-group">
                        <Heart className="action-icon" size={28} />
                        <span className="action-text">{reel.likes}</span>
                    </div>
                    <div className="action-group">
                        <MessageCircle className="action-icon" size={28} />
                        <span className="action-text">458</span>
                    </div>
                    <div className="action-group">
                        <Send className="action-icon" size={28} />
                    </div>
                    <div className="action-group">
                        <MoreVertical className="action-icon" size={28} />
                    </div>
                    <div className="action-group spacer"></div>
                    <div className="action-group">
                        <div className="album-art-small"></div>
                    </div>
                </div>
                <div className="reel-bottom-info">
                    <div className="user-row">
                        <img src={profileImg || reel.profileImg} alt="Profile" className="user-avatar-small" loading="lazy" />
                        <span className="username">{username || reel.username}</span>
                    </div>
                    <div className="caption-line">
                        {reel.title} <span className="caption-more">... more</span>
                    </div>
                    <div className="audio-line">
                        <Music size={14} />
                        <div className="audio-ticker">Original Audio</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ReelCard;
