import { useEffect } from 'react';

const Snowfall = ({ active }) => {
    useEffect(() => {
        const canvas = document.getElementById('snow-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const snowflakes = [];
        for (let i = 0; i < 60; i++) { // Much fewer flakes for a delicate look
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 2 + 0.5, // Smaller, more delicate flakes
                d: Math.random() * 1,
                step: Math.random() * 0.05, // Slower oscillation
            });
        }

        let animationFrameId;
        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'; // More subtle snow
            ctx.beginPath();
            for (const s of snowflakes) {
                ctx.moveTo(s.x, s.y);
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2, true);
            }
            ctx.fill();
            update();
            animationFrameId = requestAnimationFrame(draw);
        };

        const update = () => {
            for (const s of snowflakes) {
                // Drifting effect (much slower)
                s.y += Math.cos(s.step) + 0.3 + s.r / 10;
                s.x += Math.sin(s.step) * 0.5;
                if (s.y > height) {
                    s.y = -10;
                    s.x = Math.random() * width;
                }
            }
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        animationFrameId = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            id="snow-canvas"
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
