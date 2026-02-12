import React from 'react';
import { motion } from 'framer-motion';
import './SoftwareUsed.css';
import davinciImg from '../assets/davinci_final.png';
import capcutImg from '../assets/capcut_updated.png';
import aiImg from '../assets/ai_final.png';
import psImg from '../assets/ps_final.png';
import lrImg from '../assets/lr_updated.png';
import figmaImg from '../assets/figma_final.png';
import canvaImg from '../assets/canva_processed.png';
import filmoraImg from '../assets/filmora_logo.png';

const AdobeIcon = ({ text, color, bg }) => (
    <div className="adobe-icon" style={{ color: color, backgroundColor: bg }}>
        {text}
    </div>
);

const SoftwareUsed = () => {
    return (
        <section className="software-container" id="software-used">
            <div className="software-content">
                <motion.div
                    className="social-design-header"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="social-text">Softwares</h1>
                    <h2 className="media-design-text">Used</h2>
                </motion.div>

                <div className="software-grid">
                    {/* Editing Tools */}
                    <motion.div
                        className="software-row"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="software-label">
                            <h3>Editing Tools</h3>
                        </div>
                        <div className="software-divider"></div>
                        <div className="software-icons">
                            <AdobeIcon text="Pr" color="#d8a5ff" bg="#00005b" />
                            <AdobeIcon text="Ae" color="#d8a5ff" bg="#00005b" />
                            <img src={davinciImg} alt="DaVinci Resolve" className="software-img" width="60" height="60" />
                            <img src={capcutImg} alt="CapCut" className="software-img" width="60" height="60" />
                            <img src={filmoraImg} alt="Filmora" className="software-img" width="60" height="60" />
                        </div>
                    </motion.div>

                    {/* GFX Tools */}
                    <motion.div
                        className="software-row"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className="software-label">
                            <h3>GFX Tools</h3>
                        </div>
                        <div className="software-divider"></div>
                        <div className="software-icons">
                            <img src={figmaImg} alt="Figma" className="software-img" width="60" height="60" />
                            <img src={aiImg} alt="Illustrator" className="software-img" width="60" height="60" />
                            <img src={psImg} alt="Photoshop" className="software-img" width="60" height="60" />
                            <img src={lrImg} alt="Lightroom" className="software-img" width="60" height="60" />
                            <img src={canvaImg} alt="Canva" className="software-img" width="60" height="60" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default SoftwareUsed;
