import { useEffect, useCallback } from 'react';
import './Lightbox.css';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
    }, [onClose, onNext, onPrev]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    if (currentIndex < 0 || currentIndex >= images.length) return null;
    const img = images[currentIndex];

    return (
        <div className="lb" onClick={onClose}>
            <div className="lb__inner" onClick={(e) => e.stopPropagation()}>
                <button className="lb__close" onClick={onClose} aria-label="Close">×</button>

                {images.length > 1 && (
                    <>
                        <button className="lb__arrow lb__arrow--left" onClick={onPrev} aria-label="Previous">‹</button>
                        <button className="lb__arrow lb__arrow--right" onClick={onNext} aria-label="Next">›</button>
                    </>
                )}

                <img src={img.src} alt={img.alt} className="lb__img" />

                <div className="lb__info">
                    <span className="lb__caption">{img.alt}</span>
                    <span className="lb__counter">{currentIndex + 1} / {images.length}</span>
                </div>
            </div>
        </div>
    );
}
