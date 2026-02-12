import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Camera, ChevronLeft, Music, Bookmark, MoreHorizontal, MousePointer2 } from 'lucide-react';
import './Projects.css';
import Lightbox from './Lightbox';
import ReelViewer from './ReelViewer';
import OptimizedVideo from './OptimizedVideo';
import ReelCard from './ReelCard';
import AutoScrollGrid from './AutoScrollGrid';
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

const WhitfordProject = () => {
    const [selectedReel, setSelectedReel] = useState(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImages, setCurrentImages] = useState([]);
    const [initialIndex, setInitialIndex] = useState(0);
    const [likedItems, setLikedItems] = useState({});

    const gridData = [
        { id: 1, images: [cImg("/whitford_grid/g1_1.jpg"), cImg("/whitford_grid/g1_2.jpg")] },
        { id: 2, images: [cImg("/whitford_grid/g2_1.jpg"), cImg("/whitford_grid/g2_2.jpg"), cImg("/whitford_grid/g2_3.jpg")] },
        { id: 3, images: [cImg("/whitford_grid/g3_1.png"), cImg("/whitford_grid/g3_2.jpg")] },
        { id: 4, images: [cImg("/whitford_grid/g4_1.jpg"), cImg("/whitford_grid/g4_2.jpg"), cImg("/whitford_grid/g4_3.jpg")] },
        { id: 5, images: [cImg("/whitford_grid/g5_1.jpg"), cImg("/whitford_grid/g5_2.jpg"), cImg("/whitford_grid/g5_3.jpg"), cImg("/whitford_grid/g5_4.jpg")] },
        { id: 6, images: [cImg("/whitford_grid/g6_1.jpg"), cImg("/whitford_grid/g6_2.jpg"), cImg("/whitford_grid/g6_3.jpg")] },
        { id: 7, images: [cImg("/whitford_grid/g7_1.jpg"), cImg("/whitford_grid/g7_2.jpg"), cImg("/whitford_grid/g7_3.jpg")] },
        { id: 8, images: [cImg("/whitford_grid/g8_1.jpg"), cImg("/whitford_grid/g8_2.jpg"), cImg("/whitford_grid/g8_3.jpg")] },
        { id: 9, images: [cImg("/whitford_grid/g9_1.jpg"), cImg("/whitford_grid/g9_2.jpg"), cImg("/whitford_grid/g9_3.jpg")] },
    ];

    return (
        <section
            className="projects-container"
            id="whitford-project"
            style={{ position: 'relative' }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0 }}
                transition={{ duration: 1 }}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                <div className="project-showcase">
                    <motion.div
                        className="project-info"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h3 className="project-title">
                            Whitford. <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: "normal", textTransform: "none" }}>wardrobe</span>
                        </h3>
                        <p className="project-date">January 2025</p>

                        <div className="project-tags">
                            <span className="tag">SOCIAL MEDIA</span>
                            <span className="tag">REELS</span>
                            <span className="tag">PHOTOGRAPHY</span>
                            <span className="tag">GRAPHIC DESIGN</span>
                        </div>

                        <div className="project-description">
                            <p>Managed Whitford Wardrobe’s end-to-end <strong>social media presence</strong>, crafting a cohesive and premium digital identity aligned with the brand’s modern fashion aesthetic.</p>
                            <p>Delivered <strong>high-quality photography shoots and reel productions</strong>, capturing product details, fabric textures, fits, and styling through visually compelling storytelling. From concept to execution, all shoots were carefully curated to reflect the brand’s signature elegance.</p>
                            <p>Handled <strong>complete reel editing with dynamic cuts, smooth transitions, and trend-driven audio</strong> to maximize engagement and reach. Designed <strong>custom graphic and typography-based posts</strong> that strengthened brand recognition and visual consistency across platforms.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="project-visual"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Mobile Hint Overlay for Tablets/Mobiles */}
                        <div className="mobile-hint-overlay">
                            <img src="/scrawl_arrow.png" alt="Click to watch" className="hint-arrow-img" />
                            <span className="hint-text">Click to Watch</span>
                        </div>

                        <div className="reels-container">
                            {[
                                { id: 1, img: cImg("/thumbnails/W1.png"), title: "Summer Lookbook", likes: "3.4k", video: cVid("/videos/W1.mp4"), uid: "whitford-1", username: "whitford.wardrobe", profileImg: "/whitford_logo.jpg" },
                                { id: 2, img: cImg("/thumbnails/W2.png"), title: "OOTD Inspiration", likes: "2.8k", video: cVid("/videos/W2.mp4"), uid: "whitford-2", username: "whitford.wardrobe", profileImg: "/whitford_logo.jpg" },
                                { id: 3, img: cImg("/thumbnails/W3.png"), title: "New Arrivals", likes: "5.1k", video: cVid("/videos/W3.mp4"), uid: "whitford-3", username: "whitford.wardrobe", profileImg: "/whitford_logo.jpg" }
                            ].map((reel, index) => (
                                <ReelCard
                                    key={reel.id}
                                    reel={reel}
                                    index={index}
                                    onClick={() => setSelectedReel(reel)}
                                />
                            ))}
                            <div className="hover-hint">
                                <MousePointer2 />
                                hover on me
                            </div>
                        </div>
                    </motion.div>
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

                <motion.div
                    className="whitford-grid-section"
                    id="creative-highlights"
                    style={{ scrollMarginTop: '100px' }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0 }}
                >
                    <div className="grid-header">
                        <h4>Creative Highlights</h4>
                        <p>Selected photography and typography designed for digital platforms.</p>
                    </div>
                    <motion.div
                        className="whitford-photo-grid"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.15 // Smooth sequential delay
                                }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0 }}
                    >
                        {gridData.map((gridItem, index) => (
                            <motion.div key={gridItem.id} className="social-grid-card"
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                                }}
                                whileHover={{ y: -5, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                            >
                                <div className="social-card-header">
                                    <div className="header-left">
                                        <img src="/whitford_logo.jpg" alt="Profile" className="mini-avatar-img" />
                                        <span className="mini-username-text">whitford.wardrobe</span>
                                    </div>
                                    <MoreHorizontal size={14} color="#999" />
                                </div>

                                <AutoScrollGrid
                                    images={gridItem.images}
                                    onImageClick={(idx) => {
                                        setCurrentImages(gridItem.images);
                                        setInitialIndex(idx);
                                        setLightboxOpen(true);
                                    }}
                                />

                                <div className="social-card-footer">
                                    <div className="footer-left">
                                        <Heart
                                            size={18}
                                            className="action-icon"
                                            color={likedItems[gridItem.id] ? "#ed4956" : "#333"}
                                            fill={likedItems[gridItem.id] ? "#ed4956" : "none"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLikedItems(prev => ({ ...prev, [gridItem.id]: !prev[gridItem.id] }));
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        />
                                        <MessageCircle size={18} color="#333" />
                                        <Send size={18} color="#333" />
                                    </div>
                                    <Bookmark size={18} color="#333" />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Lightbox Portal */}
                <AnimatePresence>
                    {lightboxOpen && (
                        <Lightbox
                            isOpen={lightboxOpen}
                            onClose={() => setLightboxOpen(false)}
                            images={currentImages}
                            initialIndex={initialIndex}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
};

export default WhitfordProject;
