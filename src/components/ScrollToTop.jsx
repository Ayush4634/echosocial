import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Native scroll
        window.scrollTo(0, 0);

        // Lenis scroll if available
        if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
