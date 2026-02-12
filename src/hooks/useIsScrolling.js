import { useState, useEffect } from 'react';

const useIsScrolling = (delay = 100) => {
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let timeoutId;

        const handleScroll = () => {
            setIsScrolling(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsScrolling(false);
            }, delay);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(timeoutId);
        };
    }, [delay]);

    return isScrolling;
};

export default useIsScrolling;
