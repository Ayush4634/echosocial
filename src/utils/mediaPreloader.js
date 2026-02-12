import { getCloudinaryVideoUrl } from './cloudinary';
import { getAssetPath } from './assetMapping';

class MediaPreloader {
    constructor() {
        this.cache = new Set();
    }

    /**
     * Preload a list of images.
     * @param {string[]} urls 
     */
    preloadImages(urls) {
        urls.forEach(url => {
            if (this.cache.has(url)) return;
            const img = new Image();
            img.src = url;
            this.cache.add(url);
        });
    }

    /**
     * Preload a video by fetching a small chunk or using link preload.
     * @param {string} url 
     */
    preloadVideo(url) {
        if (this.cache.has(url)) return;
        this.cache.add(url);

        // Use link preload for video to let browser handle buffering strategy
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'video';
        link.href = url;
        document.head.appendChild(link);
    }

    /**
     * Main entry point to preload critical "Below the Fold" content
     * while the user looks at the Preloader/Hero.
     */
    preloadCriticalAssets() {
        // Critical UI Elements
        this.preloadImages([
            '/echo_logo.png',
            '/hyatt_logo.png'
        ]);

        // Dual Video Showcase (high priority as they are large)
        // We use link preload here to warm up the connection
        const m1Id = getAssetPath('videos/M1_C.mp4');
        const m2Id = getAssetPath('videos/M2_c.mp4');

        if (m1Id) this.preloadVideo(getCloudinaryVideoUrl(m1Id));
        if (m2Id) this.preloadVideo(getCloudinaryVideoUrl(m2Id));

        // Project Thumbnails (from Projects.jsx - hardcoded for performance)
        this.preloadImages([
            "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1887&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1571896349842-6e5a513e610a?q=80&w=1887&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1887&auto=format&fit=crop"
        ]);
    }
}

export default new MediaPreloader();
