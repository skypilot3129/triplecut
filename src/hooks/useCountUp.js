import { useState, useEffect, useRef } from 'react';

/**
 * useCountUp — Animates a number counting up from 0 when visible.
 * @param {number} end - target number
 * @param {number} duration - animation duration in ms (default 2200)
 * @returns {{ ref, value }} ref to observe, current display value
 */
export default function useCountUp(end, duration = 2200) {
    const ref = useRef(null);
    const [value, setValue] = useState(0);
    const hasRun = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasRun.current) {
                    hasRun.current = true;
                    const startTime = performance.now();

                    function tick(now) {
                        const elapsed = now - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease-out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setValue(Math.round(eased * end));

                        if (progress < 1) {
                            requestAnimationFrame(tick);
                        }
                    }

                    requestAnimationFrame(tick);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.3 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [end, duration]);

    return { ref, value };
}
