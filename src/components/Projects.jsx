import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, MoreVertical, Share2, Plus, ArrowRight, Play, ExternalLink, MousePointer2 } from 'lucide-react';
import './Projects.css';
import mindgradesImg from '../assets/mindgrades_mockup.png';
import ReelViewer from './ReelViewer';
import { AnimatePresence } from 'framer-motion';
import ReelCard from './ReelCard';
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

const projects = [
    {
        id: 1,
        title: "Neon Horizon",
        category: "Video Editing",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        size: "large"
    },
    {
        id: 2,
        title: "Urban Pulse",
        category: "Content Creation",
        image: "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1974&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 3,
        title: "Eco Future",
        category: "Branding",
        image: "https://images.unsplash.com/photo-1542601906990-24d4c16419d9?q=80&w=1974&auto=format&fit=crop",
        size: "small"
    },
    {
        id: 4,
        title: "Tech Noir",
        category: "Motion Graphics",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
        size: "medium"
    }
];

const Projects = () => {
    const [selectedReel, setSelectedReel] = React.useState(null);
    // Removed old timeout states

    // Ref to store video elements for individual control - REMOVED as ReelCard handles it
    // const videoRefs = React.useRef({});

    return (
        <section className="projects-container" id="projects">
            <div className="projects-header">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="featured-work-title"
                >
                    FEATURED <span className="serif-highlight">Work</span>
                </motion.h2>


                <motion.div
                    className="projects-filter"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <button
                        className="filter-btn active"
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.lenis) {
                                window.lenis.scrollTo('#projects', {
                                    offset: 0,
                                    immediate: true
                                });
                            } else {
                                const element = document.getElementById('projects');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'auto', block: 'start' });
                                }
                            }
                        }}
                    >
                        Content Creation
                    </button>
                    <a
                        href="#creative-highlights"
                        className="filter-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.lenis) {
                                window.lenis.scrollTo('#creative-highlights', {
                                    offset: -80,
                                    immediate: true
                                });
                            } else {
                                const element = document.getElementById('creative-highlights');
                                if (element) {
                                    const headerOffset = 80;
                                    const elementPosition = element.getBoundingClientRect().top;
                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: "auto"
                                    });
                                }
                            }
                        }}
                        style={{ display: 'inline-block', textDecoration: 'none', lineHeight: 'normal' }}
                    >
                        Typography Edits
                    </a>
                    <a
                        href="#event-project"
                        className="filter-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            if (window.lenis) {
                                window.lenis.scrollTo('#event-project', {
                                    offset: 0, // No offset needed for full section? Or maybe stick to -80 if it has a header. Let's try 0 first as it's a full section. Actually usually sections need header offset. Let's use 0 for now as it seems to be a full screen section.
                                    immediate: true
                                });
                            } else {
                                const element = document.getElementById('event-project');
                                if (element) {
                                    element.scrollIntoView({ behavior: 'auto' });
                                }
                            }
                        }}
                        style={{ display: 'inline-block', textDecoration: 'none', lineHeight: 'normal' }}
                    >
                        Photography
                    </a>
                </motion.div>
            </div>

            <div className="project-showcase" id="hyatt-project">
                <motion.div
                    className="project-info"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="project-title">
                        HYATT <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: "normal", textTransform: "none" }}>Place</span>
                    </h3>
                    <p className="project-date">March 2023</p>

                    <div className="project-tags">
                        <span className="tag">Content Creation</span>
                        <span className="tag">Professional Reels</span>
                        <span className="tag">Video Editing</span>
                    </div>

                    <div className="project-description">
                        <p>
                            Created <strong>high-quality short-form video content and professionally edited Instagram reels</strong> for Hyatt Place Bharuch, showcasing the property’s modern interiors, gym facilities, and food and dining experiences.
                        </p>

                        <p>
                            Delivered <strong>cinematic reel productions</strong> designed to highlight luxury, comfort, and lifestyle appeal through clean visuals and refined storytelling. From planning to final execution, each reel was carefully crafted to reflect premium hospitality standards.
                        </p>

                        <p>
                            Handled <strong>complete reel editing with smooth transitions, refined pacing, and trend-aware audio</strong> to ensure maximum engagement. Maintained a <strong>social-media-optimized visual flow</strong> that strengthened brand perception and enhanced overall digital presence across platforms.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="project-visual"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {/* Mobile Hint Overlay - Properly placed outside scale container */}
                    <div className="mobile-hint-overlay">
                        <img src="/scrawl_arrow.png" alt="Click to watch" className="hint-arrow-img" />
                        <span className="hint-text">Click to Watch</span>
                    </div>

                    <div className="reels-container">
                        {[
                            { id: 1, img: cImg("/thumbnails/Hyatt_1.png"), title: "Signature Dining", likes: "1.2k", video: cVid("/videos/Hyatt_1.mp4"), uid: "hyatt-1", username: "hyatt.bharuch", profileImg: "/hyatt_logo.png" },
                            { id: 2, img: cImg("/thumbnails/Hyatt_2.png"), title: "Luxury Interiors", likes: "854", video: cVid("/videos/Hyatt_2.mp4"), uid: "hyatt-2", username: "hyatt.bharuch", profileImg: "/hyatt_logo.png" },
                            { id: 3, img: cImg("/thumbnails/Hyatt_3.png"), title: "Refreshing Drinks", likes: "2.1k", video: cVid("/videos/Hyatt_3.mp4"), uid: "hyatt-3", username: "hyatt.bharuch", profileImg: "/hyatt_logo.png" }
                        ].map((reel, index) => (
                            <ReelCard
                                key={reel.id}
                                reel={reel}
                                index={index}
                                onClick={() => setSelectedReel(reel)}
                                profileImg="/hyatt_logo.png"
                                username="hyatt.bharuch"
                            />
                        ))}
                        <div className="hover-hint">
                            <MousePointer2 />
                            hover on me
                        </div>
                    </div>
                </motion.div>
            </div >

            <AnimatePresence>
                {selectedReel && (
                    <ReelViewer
                        key="hyatt-viewer"
                        reel={selectedReel}
                        isOpen={!!selectedReel}
                        onClose={() => setSelectedReel(null)}
                    />
                )}
            </AnimatePresence>
        </section >
    );
};

export default Projects;
