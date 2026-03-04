import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Sparkles, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import heroBanner from '../assets/hero-banner.png';
import img1 from '../assets/gallery1.png';
import img2 from '../assets/gallery2.png';
import img3 from '../assets/gallery3.png';
import img4 from '../assets/gallery4.png';
import useScrollReveal from '../hooks/useScrollReveal';
import useCountUp from '../hooks/useCountUp';
import Lightbox from '../components/Lightbox';
import Testimonials from '../components/Testimonials';
import './Home.css';

const services = [
    { icon: <Scissors size={32} />, title: 'Gentleman Cut', desc: 'Cuci, Hair Tonik, Hot Towel, Styling — pengalaman premium lengkap.', price: 'Rp 35.000' },
    { icon: <Sparkles size={32} />, title: 'Creambath Treatment', desc: 'Perawatan kulit kepala dengan cream nutrisi dan pijat relaksasi.', price: 'Rp 60.000' },
    { icon: <Star size={32} />, title: 'Highlight Warna Fashion', desc: 'Pewarnaan rambut fashion trendi, termasuk bleaching dan cat warna pilihan.', price: 'Mulai Rp 200.000' },
];

const pillars = [
    { icon: <Scissors size={36} />, title: 'Vanguard', subtitle: 'Terdepan', desc: 'Selalu menjadi yang pertama mengadopsi teknik dan tren terkini.' },
    { icon: <ShieldCheck size={36} />, title: 'Artisan', subtitle: 'Keahlian', desc: 'Setiap potongan adalah karya seni. Kami merancang identitas visual Anda.' },
    { icon: <Sparkles size={36} />, title: 'Excellence', subtitle: 'Keunggulan', desc: 'Standar kebersihan tertinggi dan pelayanan melampaui ekspektasi.' },
];

const galleryImages = [
    { src: img1, alt: 'Skin Fade Cut', category: 'Haircut' },
    { src: img2, alt: 'Classic Gentleman Style', category: 'Haircut' },
    { src: img3, alt: 'Modern Textured Crop', category: 'Fade' },
    { src: img4, alt: 'Blonde Highlight', category: 'Hair Color' },
];

export default function Home() {
    const servicesRef = useScrollReveal({ stagger: true });
    const pillarsRef = useScrollReveal({ stagger: true });
    const galleryRef = useScrollReveal({ stagger: true, staggerDelay: 100 });
    const ctaRef = useScrollReveal({ threshold: 0.2 });

    // Counter animations
    const years = useCountUp(3, 2000);
    const clients = useCountUp(5000, 2500);
    const barbers = useCountUp(3, 1200);
    const rating = useCountUp(49, 2000); // 4.9 → count to 49, display /10

    // Lightbox state
    const [lbIndex, setLbIndex] = useState(-1);
    const openLb = useCallback((i) => setLbIndex(i), []);
    const closeLb = useCallback(() => setLbIndex(-1), []);
    const prevLb = useCallback(() => setLbIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length), []);
    const nextLb = useCallback(() => setLbIndex((p) => (p + 1) % galleryImages.length), []);

    return (
        <div className="home">
            {/* HERO */}
            <section className="hero" id="hero">
                <div className="hero__bg">
                    <img src={heroBanner} alt="Vantex Barbershop Interior" />
                    <div className="hero__overlay" />
                </div>
                <div className="container hero__content">
                    <div className="hero__badge">✦ BARBERSHOP PREMIUM SURABAYA</div>
                    <h1 className="hero__title">
                        Potongan Tajam,<br />
                        <span className="hero__title-accent">Gaya Maksimal.</span>
                    </h1>
                    <p className="hero__subtitle">
                        Vantex Barbershop menghadirkan pengalaman cukur rambut premium. Terdepan dalam presisi, artisan dalam gaya — standar baru gentleman Surabaya.
                    </p>
                    <div className="hero__ctas">
                        <Link to="/booking" className="btn btn-primary-light">
                            Pesan Kursi Sekarang
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/gallery" className="btn btn-outline-light">
                            Lihat Model Rambut
                        </Link>
                    </div>
                </div>
                <div className="hero__scroll-hint"><span /></div>
            </section>

            <hr className="section-wave" />

            {/* SERVICES PREVIEW */}
            <section className="section home-services" id="services-preview">
                <div className="container">
                    <div className="section-header reveal reveal-up" ref={useScrollReveal()}>
                        <h2>Layanan Unggulan</h2>
                        <p>Pengalaman grooming premium yang disesuaikan dengan gaya Anda.</p>
                    </div>
                    <div className="home-services__grid" ref={servicesRef}>
                        {services.map((s, i) => (
                            <div key={i} className="glass-card home-services__card hover-lift hover-glow reveal reveal-up">
                                <div className="home-services__icon">{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                <span className="home-services__price">{s.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="home-services__cta reveal reveal-up" ref={useScrollReveal()}>
                        <Link to="/services" className="btn btn-outline">
                            Lihat Semua Layanan
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            <hr className="section-wave" />

            {/* STATS with animated counters */}
            <section className="home-stats" id="stats">
                <div className="container home-stats__grid">
                    <div className="home-stats__item" ref={years.ref}>
                        <span className="home-stats__number">{years.value}+</span>
                        <span className="home-stats__label">Tahun Pengalaman</span>
                    </div>
                    <div className="home-stats__item" ref={clients.ref}>
                        <span className="home-stats__number">{clients.value.toLocaleString()}+</span>
                        <span className="home-stats__label">Pelanggan Puas</span>
                    </div>
                    <div className="home-stats__item" ref={barbers.ref}>
                        <span className="home-stats__number">{barbers.value}</span>
                        <span className="home-stats__label">Barber Profesional</span>
                    </div>
                    <div className="home-stats__item" ref={rating.ref}>
                        <span className="home-stats__number">{(rating.value / 10).toFixed(1)}</span>
                        <span className="home-stats__label">Rating Google</span>
                    </div>
                </div>
            </section>

            <hr className="section-wave" />

            {/* GALLERY PREVIEW with Lightbox */}
            <section className="section home-gallery" id="gallery-preview">
                <div className="container">
                    <div className="section-header reveal reveal-up" ref={useScrollReveal()}>
                        <h2>Hasil Karya Terbaru</h2>
                        <p>Klik foto untuk lihat detail potongan. Setiap guntingan adalah karya seni.</p>
                    </div>
                    <div className="home-gallery__grid" ref={galleryRef}>
                        {galleryImages.map((img, i) => (
                            <div key={i} className="home-gallery__item reveal reveal-scale" onClick={() => openLb(i)}>
                                <img src={img.src} alt={img.alt} loading="lazy" />
                                <div className="home-gallery__overlay">
                                    <span className="home-gallery__tag">{img.category}</span>
                                    <span className="home-gallery__zoom">🔍 Lihat</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="home-services__cta reveal reveal-up" ref={useScrollReveal()}>
                        <Link to="/gallery" className="btn btn-outline">
                            Lihat Semua Galeri
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Lightbox modal */}
            {lbIndex >= 0 && (
                <Lightbox
                    images={galleryImages}
                    currentIndex={lbIndex}
                    onClose={closeLb}
                    onPrev={prevLb}
                    onNext={nextLb}
                />
            )}

            <hr className="section-wave" />

            {/* PILLARS */}
            <section className="section home-pillars" id="pillars">
                <div className="container">
                    <div className="section-header reveal reveal-up" ref={useScrollReveal()}>
                        <h2>Kenapa Vantex?</h2>
                        <p>Tiga pilar utama yang menjadikan kami standar baru barbershop di Surabaya.</p>
                    </div>
                    <div className="home-pillars__grid" ref={pillarsRef}>
                        {pillars.map((p, i) => (
                            <div key={i} className="home-pillars__item reveal reveal-scale">
                                <div className="home-pillars__icon">{p.icon}</div>
                                <h3>{p.title}</h3>
                                <span className="home-pillars__subtitle">{p.subtitle}</span>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <hr className="section-wave" />

            {/* TESTIMONIALS CAROUSEL */}
            <Testimonials />

            {/* CTA BANNER */}
            <section className="home-cta" id="cta-banner">
                <div className="container home-cta__inner reveal reveal-up" ref={ctaRef}>
                    <h2>Siap Tampil Lebih Keren?</h2>
                    <p>Pesan jadwal Anda sekarang dan rasakan pengalaman barbershop premium di Surabaya.</p>
                    <Link to="/booking" className="btn btn-primary-light">
                        Pesan Kursi Sekarang
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
