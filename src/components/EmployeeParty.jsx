import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './EmployeeParty.css';
import Lightbox from './Lightbox';
import { getCloudinaryUrl } from '../utils/cloudinary';
import { getAssetPath } from '../utils/assetMapping';

const cImg = (path) => {
    const assetId = getAssetPath(path);
    return assetId ? getCloudinaryUrl(assetId) : path;
};

const EmployeeParty = () => {
    // State for lightbox
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [initialIndex, setInitialIndex] = useState(0);

    // Placeholder data - using generic images for now since exact ones aren't available
    const tshImages = [
        cImg("/assets/sanam/1.jpg"),
        cImg("/assets/sanam/2.jpg"),
        cImg("/assets/sanam/3.jpg"),
        cImg("/assets/sanam/4.jpg"),
        cImg("/assets/sanam/5.jpg")
    ];

    const bandImages = [
        cImg("/assets/falguni/1.jpg"),
        cImg("/assets/falguni/2.jpg"),
        cImg("/assets/falguni/3.jpg"),
        cImg("/assets/falguni/4.jpg"),
        cImg("/assets/falguni/5.jpg")
    ];

    const amitImages = [
        cImg("/assets/amit/1.jpg"),
        cImg("/assets/amit/2.jpg"),
        cImg("/assets/amit/3.jpg"),
        cImg("/assets/amit/4.jpg"),
        cImg("/assets/amit/5.jpg")
    ];

    const salimImages = [
        cImg("/assets/salim/1.jpg"),
        cImg("/assets/salim/2.jpg"),
        cImg("/assets/salim/3.jpg"),
        cImg("/assets/salim/4.jpg"),
        cImg("/assets/salim/5.jpg")
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section id="employee-party" className="employee-party-section">
            <div className="employee-party-container">

                {/* TSH Employee Party Group */}
                <motion.div
                    className="party-group"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h3 className="party-title" variants={itemVariants}>
                        SANAM PURI — 2023
                    </motion.h3>

                    <motion.div className="gallery-scroll-container">
                        <div className="gallery-track">
                            {[...tshImages, ...tshImages, ...tshImages].map((src, index) => (
                                <motion.div
                                    className="image-card"
                                    key={`tsh-${index}`}
                                    variants={itemVariants}
                                    layoutId={`img-tsh-${index}`}
                                    onClick={() => {
                                        setCurrentImages(tshImages);
                                        setInitialIndex(index % tshImages.length);
                                        setLightboxOpen(true);
                                    }}
                                >
                                    <img src={src} className="party-img" alt={`TSH Party ${index + 1}`} loading="lazy" decoding="async" />
                                    <img src="/assets/ev_logo_v2.png" className="ev-watermark" alt="Logo" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Pribumi Band Group */}
                <motion.div
                    className="party-group"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h3 className="party-title" variants={itemVariants}>
                        FALGUNI PATHAK — 2023
                    </motion.h3>

                    <motion.div className="gallery-scroll-container">
                        <div className="gallery-track">
                            {[...bandImages, ...bandImages, ...bandImages].map((src, index) => (
                                <motion.div
                                    className="image-card"
                                    key={`band-${index}`}
                                    variants={itemVariants}
                                    layoutId={`img-band-${index}`}
                                    onClick={() => {
                                        setCurrentImages(bandImages);
                                        setInitialIndex(index % bandImages.length);
                                        setLightboxOpen(true);
                                    }}
                                >
                                    <img src={src} className="party-img" alt={`Pribumi Band ${index + 1}`} loading="lazy" decoding="async" />
                                    <img src="/assets/ev_logo_v2.png" className="ev-watermark" alt="Logo" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Third Event Group - Amit Trivedi */}
                <motion.div
                    className="party-group"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h3 className="party-title" variants={itemVariants}>
                        Amit Trivedi — 2024
                    </motion.h3>

                    <motion.div className="gallery-scroll-container">
                        <div className="gallery-track">
                            {[...amitImages, ...amitImages, ...amitImages].map((src, index) => (
                                <motion.div
                                    className="image-card"
                                    key={`amit-${index}`}
                                    variants={itemVariants}
                                    layoutId={`img-amit-${index}`}
                                    onClick={() => {
                                        setCurrentImages(amitImages);
                                        setInitialIndex(index % amitImages.length);
                                        setLightboxOpen(true);
                                    }}
                                >
                                    <img src={src} className="party-img" alt={`Amit Concert ${index + 1}`} loading="lazy" decoding="async" />
                                    <img src="/assets/ev_logo_v2.png" className="ev-watermark" alt="Logo" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* Fourth Event Group - New Section */}
                <motion.div
                    className="party-group"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.h3 className="party-title" variants={itemVariants}>
                        Salim–Sulaiman — 2024
                    </motion.h3>

                    <motion.div className="gallery-scroll-container">
                        <div className="gallery-track">
                            {[...salimImages, ...salimImages, ...salimImages].map((src, index) => (
                                <motion.div
                                    className="image-card"
                                    key={`salim-${index}`}
                                    variants={itemVariants}
                                    layoutId={`img-salim-${index}`}
                                    onClick={() => {
                                        setCurrentImages(salimImages);
                                        setInitialIndex(index % salimImages.length);
                                        setLightboxOpen(true);
                                    }}
                                >
                                    <img src={src} className="party-img" alt={`Salim Concert ${index + 1}`} loading="lazy" decoding="async" />
                                    <img src="/assets/ev_logo_v2.png" className="ev-watermark" alt="Logo" />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

            </div>

            {/* Lightbox Portal */}
            <AnimatePresence>
                {lightboxOpen && (
                    <Lightbox
                        images={currentImages}
                        initialIndex={initialIndex}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default EmployeeParty;
