import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, MoreVertical, Camera, ChevronLeft, Music, MousePointer2 } from 'lucide-react';
import './Projects.css';
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

const CerebrumProject = () => {
    const [selectedReel, setSelectedReel] = React.useState(null);
    // Removed timeout states as we are moving to hover-to-play

    // Ref to store video elements for individual control - REMOVED
    // const videoRefs = React.useRef({});

    return (
        <section className="projects-container" id="cerebrum-project" style={{ position: 'relative' }}>
            {/* ... (lines 14-70 unchanged) - Wait, we need to match context. */}
            {/* Actually, let's just replacing the component body logic and the map render. */}

            {/* Header removed from replacement to save context lines, I'm replacing from line 9 down */}
            {/* ... */}

            <div className="project-showcase">
                <motion.div
                    className="project-info"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <h3 className="project-title">
                        CEREBRUM <br /> <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400, fontStyle: "normal", textTransform: "none" }}>Memory Academy</span>
                    </h3>
                    <p className="project-date">August 2025</p>

                    <div className="project-tags">
                        <span className="tag">Content Creation</span>
                        <span className="tag">PHOTOGRAPHY</span>
                        <span className="tag">TESTIMONIALS</span>
                    </div>

                    <div className="project-description">
                        <p>
                            Provided <strong>comprehensive visual coverage</strong> for cerebrum.memory.academy, documenting their <strong>Rubik’s Cube competition</strong> through high-quality <strong>event photography</strong>, engaging <strong>reels</strong>, and authentic <strong>testimonials</strong>.
                        </p>

                        <p>
                            Captured <strong>key moments, participant interactions, and competitive energy</strong> through carefully planned visuals that highlighted focus, precision, and discipline while maintaining a <strong>clean, professional event narrative</strong>.
                        </p>

                        <p>
                            Covered <strong>all three academy branches</strong>, producing <strong>consistent classroom and activity-based content</strong> while building a <strong>strong social media presence</strong> to support advertising, audience engagement, enrollment growth, and <strong>long-term brand credibility</strong> across platforms.
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
                    {/* Mobile Hint Overlay for Tablets/Mobiles */}
                    <div className="mobile-hint-overlay">
                        <img src="/scrawl_arrow.png" alt="Click to watch" className="hint-arrow-img" />
                        <span className="hint-text">Click to Watch</span>
                    </div>

                    <div className="reels-container">
                        {[
                            { id: 1, img: cImg("/thumbnails/CA1.png"), title: "Memory Techniques", likes: "1.5k", video: cVid("/videos/CA1.mp4"), uid: "cerebrum-1", username: "cerebrum.memory", profileImg: "/assets/cerebrum_logo.png" },
                            { id: 2, img: cImg("/thumbnails/CA2.png"), title: "Study Hacks", likes: "920", video: cVid("/videos/CA2.mp4"), uid: "cerebrum-2", username: "cerebrum.memory", profileImg: "/assets/cerebrum_logo.png" },
                            { id: 3, img: cImg("/thumbnails/CA3.png"), title: "Brain Health", likes: "2.3k", video: cVid("/videos/CA3.mp4"), uid: "cerebrum-3", username: "cerebrum.memory", profileImg: "/assets/cerebrum_logo.png" }
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
            </div >

            <AnimatePresence>
                {selectedReel && (
                    <ReelViewer
                        reel={selectedReel}
                        isOpen={!!selectedReel}
                        onClose={() => setSelectedReel(null)}
                    />
                )}
            </AnimatePresence>
        </section >
    );
};

export default CerebrumProject;
