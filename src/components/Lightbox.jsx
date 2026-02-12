import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import './Lightbox.css';

const Lightbox = ({ images, initialIndex = 0, onClose }) => {
    const [index, setIndex] = useState(initialIndex);
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);

    // Reset scale when image changes
    useEffect(() => {
        setScale(1);
    }, [index]);

    const handleNext = (e) => {
        e?.stopPropagation();
        if (index < images.length - 1) {
            setIndex(index + 1);
        } else {
            // Loop back to start? Or stop? Let's loop for better UX
            setIndex(0);
        }
    };

    const handlePrev = (e) => {
        e?.stopPropagation();
        if (index > 0) {
            setIndex(index - 1);
        } else {
            setIndex(images.length - 1);
        }
    };

    const handleZoomIn = (e) => {
        e.stopPropagation();
        setScale(curr => Math.min(curr + 0.5, 3));
    };

    const handleZoomOut = (e) => {
        e.stopPropagation();
        setScale(curr => Math.max(curr - 0.5, 1));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);

        // Lock body scroll and stop Lenis
        document.body.style.overflow = 'hidden';
        if (window.lenis) {
            window.lenis.stop();
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            if (window.lenis) {
                window.lenis.start();
            }
        };
    }, []);

    // Swipe handlers
    const onDragEnd = (event, info) => {
        setIsDragging(false);
        if (scale > 1) return; // Don't swipe if zoomed in

        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (offset < -100 || velocity < -500) {
            handleNext();
        } else if (offset > 100 || velocity > 500) {
            handlePrev();
        }
    };

    return ReactDOM.createPortal(
        <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
        >
            {/* Toolbar */}
            <div className="lightbox-toolbar" onClick={e => e.stopPropagation()}>
                <div className="lightbox-controls">
                    <button className="icon-btn" onClick={handleZoomOut} disabled={scale <= 1}>
                        <ZoomOut size={24} />
                    </button>
                    <span className="zoom-level">{Math.round(scale * 100)}%</span>
                    <button className="icon-btn" onClick={handleZoomIn} disabled={scale >= 3}>
                        <ZoomIn size={24} />
                    </button>
                </div>
                <button className="close-btn" onClick={onClose}>
                    <X size={32} />
                </button>
            </div>

            {/* Navigation Buttons */}
            <button className="nav-btn prev" onClick={handlePrev}>
                <ChevronLeft size={40} />
            </button>
            <button className="nav-btn next" onClick={handleNext}>
                <ChevronRight size={40} />
            </button>

            {/* Image Container */}
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                <AnimatePresence mode='wait'>
                    <motion.img
                        key={index}
                        src={images[index]}
                        alt={`Gallery view ${index + 1}`}
                        className="lightbox-image"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: scale, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        drag={scale > 1 || true} // Allow drag for swipe even at scale 1
                        dragConstraints={scale > 1 ? { left: -1000, right: 1000, top: -500, bottom: 500 } : { left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={onDragEnd}
                        style={{ cursor: scale > 1 ? 'grab' : 'default', touchAction: 'none' }}
                        onClick={(e) => {
                            // Double tap to zoom
                            if (e.detail === 2) {
                                setScale(prev => prev === 1 ? 2 : 1);
                            }
                        }}
                    />
                </AnimatePresence>
            </div>

            <div className="lightbox-counter">
                {index + 1} / {images.length}
            </div>

        </motion.div>,
        document.body
    );
};

export default Lightbox;
