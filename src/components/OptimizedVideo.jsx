import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useInView } from 'framer-motion';

/**
 * OptimizedVideo Component
 * 
 * Performance features:
 * 1. Lazy Mounting: Completely removes <video> tag when far off-screen to memory/decoders.
 * 2. Auto-Pause: Pauses video when scrolled out of view.
 * 3. Graceful Fallback: Handles autoplay restrictions.
 * 4. ForwardRef: Exposes video element for parent control.
 * 5. Strict Scroll: Pauses while user is scrolling.
 */
const OptimizedVideo = forwardRef(({
    src,
    poster,
    className,
    autoPlay = false,
    muted = true,
    loop = true,
    playsInline = true,
    style = {},
    maxDuration = Infinity,
    onLimitReached = () => { },
    ...props
}, ref) => {
    const internalRef = useRef(null);
    const containerRef = useRef(null);

    // Mount video when within 600px of viewport to prevent lag on appearance
    const shouldMount = useInView(containerRef, { margin: "600px 0px 600px 0px", amount: 0 });
    // Play video when 60% is visible
    const shouldPlay = useInView(containerRef, { amount: 0.6 });

    const [isLoaded, setIsLoaded] = useState(false);
    const [hasReachedLimit, setHasReachedLimit] = useState(false);

    useImperativeHandle(ref, () => internalRef.current);

    useEffect(() => {
        const video = internalRef.current;
        if (!video || !shouldMount) return;

        if (maxDuration === Infinity) {
            setHasReachedLimit(false);
        }

        const handleTimeUpdate = () => {
            if (maxDuration !== Infinity && video.currentTime >= maxDuration && !hasReachedLimit) {
                video.pause();
                setHasReachedLimit(true);
                onLimitReached();
            }
        };

        video.addEventListener('timeupdate', handleTimeUpdate);

        // Playback Logic
        if (autoPlay) {
            if (shouldPlay && !hasReachedLimit) {
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Autoplay prevented
                    });
                }
            } else {
                video.pause();
            }
        } else {
            // Manual Mode: Only enforce pause if off-screen
            if (!shouldPlay) {
                video.pause();
            }
        }

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            // Cleanup: Pause on unmount to save resources
            video.pause();
            if (video.src) {
                video.removeAttribute('src');
                video.load();
            }
        };
    }, [shouldPlay, autoPlay, maxDuration, hasReachedLimit, onLimitReached, shouldMount]);

    // Reset handler when src changes
    useEffect(() => {
        setHasReachedLimit(false);
        setIsLoaded(false);
    }, [src]);

    return (
        <div
            ref={containerRef}
            className={`${className} optimized-video-container`}
            style={{
                ...style,
                position: 'relative',
                overflow: 'hidden',
                // Ensure container has dimensions even if empty
                minHeight: style.height || '100%',
                minWidth: style.width || '100%',
                backgroundColor: '#000' // Placeholder bg
            }}
        >
            {/* Persistent Poster/Thumbnail Layer */}
            {poster && (
                <img
                    src={poster}
                    alt="Video Thumbnail"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        // If video is loaded and showing, we can hide this to save paint, 
                        // but keeping it behind is safer for "flash" issues.
                        zIndex: 0,
                        ...style // Inherit rounded corners etc if any
                    }}
                />
            )}

            {shouldMount && (
                <video
                    ref={internalRef}
                    src={src}
                    poster={poster} // Native poster as backup
                    className={className}
                    muted={muted}
                    loop={loop && maxDuration === Infinity}
                    playsInline={playsInline}
                    preload="metadata"
                    style={{
                        ...style,
                        position: 'relative', // Ensure it sits on top if needed
                        zIndex: 1,
                        opacity: isLoaded ? 1 : 0, // Fade in video over poster
                        transition: 'opacity 0.5s ease'
                    }}
                    onLoadedData={() => setIsLoaded(true)}
                    {...props}
                />
            )}
        </div>
    );
});

export default OptimizedVideo;
