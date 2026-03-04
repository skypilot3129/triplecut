import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import './BackToTop.css';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        function onScroll() {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setVisible(scrollY > 300);
            setProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // SVG circle progress ring
    const r = 22;
    const c = 2 * Math.PI * r;
    const offset = c - (progress / 100) * c;

    return (
        <button
            className={`btt ${visible ? 'btt--show' : ''}`}
            onClick={scrollUp}
            aria-label="Back to top"
            id="back-to-top"
        >
            <svg className="btt__ring" viewBox="0 0 50 50">
                <circle cx="25" cy="25" r={r} className="btt__ring-bg" />
                <circle cx="25" cy="25" r={r} className="btt__ring-fill"
                    strokeDasharray={c} strokeDashoffset={offset}
                />
            </svg>
            <ChevronUp size={20} className="btt__icon" />
        </button>
    );
}
