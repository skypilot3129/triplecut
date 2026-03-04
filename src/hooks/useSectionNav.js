import { useEffect } from 'react';

/**
 * useSectionNav — keyboard arrow-key navigation between <section> elements.
 * ArrowDown → scroll to next section
 * ArrowUp   → scroll to previous section
 */
export default function useSectionNav() {
    useEffect(() => {
        function getSections() {
            return Array.from(document.querySelectorAll('section'));
        }

        function getCurrentIndex(sections) {
            let closestIndex = 0;
            let closestDist = Infinity;
            const viewportMid = window.scrollY + window.innerHeight / 2;

            sections.forEach((sec, i) => {
                const rect = sec.getBoundingClientRect();
                const secMid = window.scrollY + rect.top + rect.height / 2;
                const dist = Math.abs(viewportMid - secMid);
                if (dist < closestDist) {
                    closestDist = dist;
                    closestIndex = i;
                }
            });

            return closestIndex;
        }

        let isScrolling = false;

        function handleKeyDown(e) {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

            const sections = getSections();
            if (!sections.length) return;

            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (isScrolling) return;

                const current = getCurrentIndex(sections);
                const target = e.key === 'ArrowDown'
                    ? Math.min(current + 1, sections.length - 1)
                    : Math.max(current - 1, 0);

                if (target === current) return;

                isScrolling = true;
                sections[target].scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Debounce to prevent rapid triggers
                setTimeout(() => { isScrolling = false; }, 800);
            }
        }

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);
}
