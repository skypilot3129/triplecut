import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useScrollReveal from '../hooks/useScrollReveal';
import './Testimonials.css';

const testimonials = [
    {
        name: 'Ahmad Fauzan',
        rating: 5,
        text: 'Barbershop terbaik di Surabaya! Hasilnya selalu rapi dan sesuai ekspektasi. Barbernya ramah dan berpengalaman.',
        service: 'Gentleman Cut',
    },
    {
        name: 'Denny Prasetyo',
        rating: 5,
        text: 'Pertama kali potong di sini, langsung jadi langganan. Fade-nya clean banget dan tempatnya sangat bersih.',
        service: 'Skin Fade',
    },
    {
        name: 'Rizal Mahendra',
        rating: 5,
        text: 'Pewarnaan rambut di sini oke banget. Warnanya tahan lama dan hasilnya sesuai referensi yang saya kasih.',
        service: 'Highlight Warna Fashion',
    },
    {
        name: 'Kevin Hartono',
        rating: 4,
        text: 'Tempatnya nyaman, ada WiFi dan minuman. Potongannya presisi. Recommended untuk yang mau gaya kekinian.',
        service: 'Gentleman Cut',
    },
    {
        name: 'Bayu Setyawan',
        rating: 5,
        text: 'Creambath-nya super rileks. Setelah potong + creambath, rambut jadi lebih sehat dan mudah ditata.',
        service: 'Creambath Treatment',
    },
];

export default function Testimonials() {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);
    const intervalRef = useRef(null);
    const sectionRef = useScrollReveal({ threshold: 0.15 });

    const count = testimonials.length;

    const next = () => setCurrent((p) => (p + 1) % count);
    const prev = () => setCurrent((p) => (p - 1 + count) % count);

    useEffect(() => {
        if (paused) return;
        intervalRef.current = setInterval(next, 5000);
        return () => clearInterval(intervalRef.current);
    }, [paused, current]);

    const t = testimonials[current];

    return (
        <section className="section testi" id="testimonials">
            <div className="container">
                <div className="section-header reveal reveal-up" ref={sectionRef}>
                    <h2>Apa Kata Pelanggan?</h2>
                    <p>Kepuasan pelanggan adalah prioritas utama kami.</p>
                </div>

                <div
                    className="testi__slider"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    <button className="testi__arrow testi__arrow--left" onClick={prev} aria-label="Previous">
                        <ChevronLeft size={22} />
                    </button>

                    <div className="testi__card glass-card" key={current}>
                        <div className="testi__stars">
                            {Array.from({ length: 5 }, (_, i) => (
                                <Star key={i} size={18} fill={i < t.rating ? '#b8860b' : 'none'} color={i < t.rating ? '#b8860b' : '#ccc'} />
                            ))}
                        </div>
                        <blockquote className="testi__quote">"{t.text}"</blockquote>
                        <div className="testi__author">
                            <div className="testi__avatar">{t.name.charAt(0)}</div>
                            <div>
                                <strong className="testi__name">{t.name}</strong>
                                <span className="testi__service">{t.service}</span>
                            </div>
                        </div>
                    </div>

                    <button className="testi__arrow testi__arrow--right" onClick={next} aria-label="Next">
                        <ChevronRight size={22} />
                    </button>
                </div>

                {/* Dots */}
                <div className="testi__dots">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            className={`testi__dot ${i === current ? 'testi__dot--active' : ''}`}
                            onClick={() => setCurrent(i)}
                            aria-label={`Testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
