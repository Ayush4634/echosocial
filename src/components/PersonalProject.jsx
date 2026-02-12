import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './PersonalProject.css';
import Lightbox from './Lightbox';
import { getCloudinaryUrl } from '../utils/cloudinary';
import { getAssetPath } from '../utils/assetMapping';

const cImg = (path) => {
    const assetId = getAssetPath(path);
    // Note: For PersonalProject, we need to ensure the path format matches what we indexed
    // e.g. "/assets/personal/p_3.jpg" -> "assets/personal/p_3.jpg" -> lookup
    return assetId ? getCloudinaryUrl(assetId) : path;
};

const PersonalProject = () => {
    // State for lightbox
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [initialIndex, setInitialIndex] = useState(0);

    const projectImages = [
        cImg("/assets/personal/p_3.jpg"),
        cImg("/assets/personal/p_4.jpg"),
        cImg("/assets/personal/p_5.jpg"),
        cImg("/assets/personal/p_6.jpg"),
        cImg("/assets/personal/p_7.jpg")
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.section
            id="personal-project"
            className="personal-project-container"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1, margin: "0px" }}
        >
            <motion.div
                className="pp-gallery-grid"
                variants={containerVariants}
            >
                {/* Column 1: Text + 2 Images */}
                <motion.div className="pp-col pp-col-1" variants={itemVariants}>
                    <div className="pp-text-block">
                        <div className="pp-title-group">
                            <span className="pp-title-main">
                                LIOLY
                            </span>
                            <span className="pp-title-sub">
                                Makeupstudio
                            </span>
                        </div>
                        <div className="pp-date">
                            September 2025
                        </div>
                        <div className="pp-tags-container">
                            <span className="pp-tag">
                                CONTENT CREATION
                            </span>
                            <span className="pp-tag">
                                PHOTO EDITING
                            </span>
                        </div>
                        <p className="pp-description">
                            Curated refined visual content for Lioly Makeup Studio, focusing on <strong>enhancing makeup and hairstyling looks</strong> through <strong>professional photo editing</strong> and <strong>detailed retouching</strong>.
                            <br /><br />
                            Worked primarily on freelance assignments to elevate final images by <strong>improving skin tones, color balance, and overall aesthetics</strong>, ensuring a <strong>clean, polished, and portfolio-ready finish</strong> aligned with the studio’s style.
                        </p>
                        <p className="pp-instruction">
                            * Hover over images to reveal the final edits.
                        </p>
                    </div>

                </motion.div>

                {/* Column 2: 2 Images */}
                <motion.div className="pp-col pp-col-2" variants={itemVariants}>
                    <motion.div className="pp-image-container" whileHover={{ scale: 0.98 }} onClick={() => { setInitialIndex(0); setLightboxOpen(true); }}>
                        <img src={projectImages[0]} alt="Portrait" className="pp-image" style={{ backgroundColor: '#333', cursor: 'pointer' }} decoding="async" loading="lazy" />
                    </motion.div>
                    <motion.div className="pp-image-container" whileHover={{ scale: 0.98 }} onClick={() => { setInitialIndex(1); setLightboxOpen(true); }}>
                        <img src={projectImages[1]} alt="Portrait" className="pp-image" style={{ backgroundColor: '#444', cursor: 'pointer' }} decoding="async" loading="lazy" />
                    </motion.div>
                </motion.div>

                {/* Column 3: 2 Images */}
                <motion.div className="pp-col pp-col-3" variants={itemVariants}>
                    <motion.div className="pp-image-container" whileHover={{ scale: 0.98 }} onClick={() => { setInitialIndex(2); setLightboxOpen(true); }}>
                        <img src={projectImages[2]} alt="Portrait" className="pp-image" style={{ backgroundColor: '#333', cursor: 'pointer' }} decoding="async" loading="lazy" />
                    </motion.div>
                    <motion.div className="pp-image-container" whileHover={{ scale: 0.98 }} onClick={() => { setInitialIndex(3); setLightboxOpen(true); }}>
                        <img src={projectImages[3]} alt="Portrait" className="pp-image" style={{ backgroundColor: '#444', cursor: 'pointer' }} decoding="async" loading="lazy" />
                    </motion.div>
                </motion.div>

                {/* Column 4: 1 Large Image */}
                <motion.div className="pp-col pp-col-4" variants={itemVariants}>
                    <motion.div className="pp-image-container" whileHover={{ scale: 0.98 }} onClick={() => { setInitialIndex(4); setLightboxOpen(true); }}>
                        <img src={projectImages[4]} alt="Portrait Wide" className="pp-image" style={{ backgroundColor: '#555', cursor: 'pointer' }} decoding="async" loading="lazy" />
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Lightbox Portal */}
            <AnimatePresence>
                {lightboxOpen && (
                    <Lightbox
                        images={projectImages}
                        initialIndex={initialIndex}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default PersonalProject;
