import { useState, useEffect } from 'react';

const ResponsiveHelper = () => {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [show, setShow] = useState(true);

    useEffect(() => {
        const handleResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!show || process.env.NODE_ENV === 'production') return null;

    const getBreakpoint = (w) => {
        if (w < 768) return 'MOBILE (max-768px)';
        if (w < 1024) return 'TABLET (768px-1024px)';
        return 'DESKTOP (>1024px)';
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            background: 'rgba(3, 7, 18, 0.9)',
            color: '#3b82f6',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #3b82f6',
            fontSize: '12px',
            fontFamily: 'monospace',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                <strong>DEV RESPONSIVE HELPER</strong>
                <span onClick={() => setShow(false)} style={{ cursor: 'pointer', color: '#ff4444' }}>✕</span>
            </div>
            <div>Rozmiar: {size.width}px x {size.height}px</div>
            <div>Tryb: {getBreakpoint(size.width)}</div>
        </div>
    );
};

export default ResponsiveHelper;
