import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Projects.css'; // Assuming styles are here or shared

const AutoScrollGrid = ({
    images,
    onImageClick,
    interval = 1000,
    className = "",
    style = {}
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [hasLoadedMore, setHasLoadedMore] = useState(false); // Track if secondary images are requested
    const timerRef = useRef(null);

    useEffect(() => {
        if (isHovering && images.length > 1) {
            // Start the cycle
            // Move to next slide after 'interval'
            const cycle = () => {
                // Disable auto-scroll on mobile (under 900px)
                if (window.innerWidth <= 900) return;

                timerRef.current = setTimeout(() => {
                    setCurrentIndex(prev => (prev + 1) % images.length);
                    cycle();
                }, interval);
            };

            // Initial delay before first move? Or immediate? 
            // Original code had: 
            // setGrid2Index(1); timeout1 = setTimeout(...)
            // It seemed to start immediately on hover.
            // Let's simple wait for interval then move.
            // Actually original code was: 
            // if (isHoveringGrid1) { setGrid1Index(1); timeout = setTimeout(() => setGrid1Index(0), 1000); }
            // It toggled 0 -> 1 immediately? No, it set index 1 immediately, then back to 0 after 1s.
            // That's a bit specific. Let's make a standard carousel:
            // On hover -> start cycling.

            // To match original "immediate movement" feel if needed:
            // But standard carousel is better.
            cycle();
        } else {
            // Reset to 0 when not hovering
            clearTimeout(timerRef.current);
            setCurrentIndex(0);
        }

        return () => clearTimeout(timerRef.current);
    }, [isHovering, images.length, interval]);

    const handlePrev = (e) => {
        e.stopPropagation();
        setHasLoadedMore(true);
        setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        setHasLoadedMore(true);
        setCurrentIndex(prev => (prev + 1) % images.length);
    };

    return (
        <div
            className={`grid-item ${className}`}
            style={{ position: 'relative', cursor: 'zoom-in', overflow: 'hidden', ...style }}
            onClick={() => onImageClick && onImageClick(currentIndex)}
            onMouseEnter={() => {
                setIsHovering(true);
                setHasLoadedMore(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={(e) => {
                setHasLoadedMore(true);
                const touch = e.touches[0];
                e.currentTarget.touchStartX = touch.clientX;
            }}
            onTouchEnd={(e) => {
                const touch = e.changedTouches[0];
                const deltaX = touch.clientX - e.currentTarget.touchStartX;
                if (Math.abs(deltaX) > 50) { // Threshold for swipe
                    if (deltaX > 0) {
                        handlePrev(e);
                    } else {
                        handleNext(e);
                    }
                }
            }}
        >
            <div style={{
                display: 'flex',
                width: `${images.length * 100}%`,
                height: '100%',
                transform: `translateX(-${currentIndex * (100 / images.length)}%)`,
                transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }}>
                {/* Optimized: Only render first image initially. Load others on hover. */}
                {images.map((imgSrc, idx) => {
                    // Always render first image. Render others only if user has interacted.
                    if (idx !== 0 && !hasLoadedMore) return null;

                    return (
                        <img
                            key={idx}
                            src={imgSrc}
                            alt={`Grid Image ${idx + 1}`}
                            className="grid-image"
                            loading="lazy"
                            decoding="async"
                            style={{
                                width: `${100 / images.length}%`,
                                objectFit: 'cover',
                                // Fix layout for single image vs multiple
                                flexShrink: 0
                            }}
                        />
                    );
                })}
            </div>

            {images.length > 1 && (
                <>
                    <div
                        className="carousel-arrow-left"
                        onClick={handlePrev}
                    >
                        <ChevronLeft size={16} color="#fff" />
                    </div>
                    <div
                        className="carousel-arrow-right"
                        onClick={handleNext}
                    >
                        <ChevronRight size={16} color="#fff" />
                    </div>
                    <div style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '5px',
                        zIndex: 10
                    }}>
                        {images.map((_, i) => (
                            <div
                                key={i}
                                style={{
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    backgroundColor: currentIndex === i ? '#fff' : 'rgba(255, 255, 255, 0.4)',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default AutoScrollGrid;
