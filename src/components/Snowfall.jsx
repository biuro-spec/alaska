import { useEffect, useRef } from 'react';

const Snowfall = ({ active }) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const isRunningRef = useRef(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const snowflakes = [];
        for (let i = 0; i < 60; i++) {
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 2 + 0.5,
                d: Math.random() * 1,
                step: Math.random() * 0.05,
            });
        }

        const draw = () => {
            if (!isRunningRef.current) return;
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.beginPath();
            for (const s of snowflakes) {
                ctx.moveTo(s.x, s.y);
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
            }
            ctx.fill();

            for (const s of snowflakes) {
                s.y += Math.cos(s.step) + 0.3 + s.r / 10;
                s.x += Math.sin(s.step) * 0.5;
                if (s.y > height) {
                    s.y = -10;
                    s.x = Math.random() * width;
                }
            }

            animationRef.current = requestAnimationFrame(draw);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        // Use IntersectionObserver to pause when not visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && active) {
                    if (!isRunningRef.current) {
                        isRunningRef.current = true;
                        animationRef.current = requestAnimationFrame(draw);
                    }
                } else {
                    isRunningRef.current = false;
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                        animationRef.current = null;
                    }
                }
            },
            { threshold: 0 }
        );

        observer.observe(canvas);
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            isRunningRef.current = false;
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, [active]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: active ? 0.6 : 0,
                transition: 'opacity 1.5s ease-in-out'
            }}
        />
    );
};

export default Snowfall;
