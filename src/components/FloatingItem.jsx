import React from 'react';
import { motion } from 'framer-motion';
import { Folder } from 'lucide-react';
import './FloatingItem.css';

const FloatingItem = ({ type, label, icon: Icon, src, x, y, rotate = 0, delay = 0, noBackground = false, scaleProp = 1, className = "", isMobile = false, physicsEnabled = true }) => {
    // Safe duration defaults
    const baseDuration = isMobile ? 4 : 3;
    const duration = baseDuration + Math.random() * 3;

    // Mobile Size Logic
    const mobileBaseScale = 0.8;
    const desktopBaseScale = 1;
    const finalBaseScale = (isMobile ? mobileBaseScale : desktopBaseScale) * scaleProp;

    const yAnim = physicsEnabled ? [0, -10, 0] : 0;

    return (
        <motion.div
            className={`floating-item ${type} ${className}`}
            style={{
                left: x,
                top: y,
            }}
            initial={{ opacity: 0, scale: finalBaseScale * 0.8, y: 20, rotate: rotate }}
            animate={{
                opacity: 1,
                scale: finalBaseScale,
                y: yAnim,
                rotate: rotate
            }}
            transition={{
                opacity: { duration: 0.8, delay },
                scale: { duration: 0.8, delay },
                y: {
                    duration: duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: delay + Math.random() // Random offset
                }
            }}
            whileHover={{
                scale: finalBaseScale * 1.05,
                rotate: 0,
                boxShadow: "0px 15px 30px rgba(0,0,0,0.15)",
                y: -5,
                zIndex: 100
            }}
        // Removed drag constraints temporarily to reduce complexity if that was causing issues
        >
            {type === 'folder' && (
                <div className="folder-content">
                    <div className="folder-tab"></div>
                    <div className="folder-body">
                        {Icon ? <Icon size={64} className="folder-icon-inner" /> : <Folder size={80} fill="#A6B9D6" stroke="none" className="default-folder-icon" />}
                    </div>
                    <span className="item-label">{label}</span>
                </div>
            )}

            {type === 'image' && src && (
                <div className={`image-content ${noBackground ? 'no-bg' : ''}`}>
                    <img src={src} alt={label} draggable="false" />
                    <span className="item-label">{label}</span>
                </div>
            )}

            {type === 'icon' && Icon && (
                <div className="icon-content">
                    <div className="icon-bg">
                        <Icon size={32} />
                    </div>
                    <span className="item-label">{label}</span>
                </div>
            )}
        </motion.div>
    );
};

export default FloatingItem;
