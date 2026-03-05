import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                if (options.once) observer.unobserve(entry.target);
            } else {
                if (!options.once) setIsVisible(false);
            }
        }, {
            threshold: options.threshold || 0.1,
            ...options
        });

        const currentRef = elementRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return [elementRef, isVisible];
};
