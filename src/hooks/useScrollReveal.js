import { useEffect, useRef } from 'react';

/**
 * useScrollReveal — applies a CSS class when element enters the viewport.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <div ref={ref} className="reveal">...</div>
 *
 * Or with stagger:
 *   const ref = useScrollReveal({ stagger: true });
 *   <div ref={ref}>
 *     <div className="reveal">...</div>
 *     <div className="reveal">...</div>
 *   </div>
 */
export default function useScrollReveal({ threshold = 0.12, stagger = false, staggerDelay = 120 } = {}) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets = stagger
            ? Array.from(el.querySelectorAll('.reveal'))
            : [el];

        if (stagger) {
            targets.forEach((t, i) => {
                t.style.transitionDelay = `${i * staggerDelay}ms`;
            });
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (stagger) {
                            targets.forEach((t) => t.classList.add('revealed'));
                        } else {
                            entry.target.classList.add('revealed');
                        }
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold }
        );

        if (stagger) {
            observer.observe(el);
        } else {
            targets.forEach((t) => observer.observe(t));
        }

        return () => observer.disconnect();
    }, [threshold, stagger, staggerDelay]);

    return ref;
}
