import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import heroImg from '../assets/hero-gallery.png';
import img1 from '../assets/gallery1.png';
import img2 from '../assets/gallery2.png';
import img3 from '../assets/gallery3.png';
import img4 from '../assets/gallery4.png';
import img5 from '../assets/gallery5.png';
import './Gallery.css';

const categories = ['Semua', 'Haircut', 'Hair Color', 'Fade', 'Curly'];

const galleryItems = [
    { id: 1, img: img1, category: 'Hair Color', alt: 'Blue fade dengan hair tattoo' },
    { id: 2, img: img2, category: 'Hair Color', alt: 'Navy blue two-block style' },
    { id: 3, img: img3, category: 'Haircut', alt: 'Ash gray wavy curly fade' },
    { id: 4, img: img4, category: 'Hair Color', alt: 'Blonde bleach curly fade' },
    { id: 5, img: img5, category: 'Fade', alt: 'Highlight dengan fade undercut' },
];

export default function Gallery() {
    const [activeFilter, setActiveFilter] = useState('Semua');

    const filtered = activeFilter === 'Semua'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeFilter);

    return (
        <div className="gallery-page page-content">
            <section className="gallery-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="gallery-hero__overlay" />
                <div className="container gallery-hero__inner">
                    <div className="hero__badge">✦ GALERI KARYA</div>
                    <h1>Hasil Karya <span className="text-gold">Kami</span></h1>
                    <p>Portofolio nyata dari pelanggan Triple Cut Barbershop Surabaya.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {/* Filter Tabs */}
                    <div className="gallery-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`gallery-filter__btn ${activeFilter === cat ? 'gallery-filter__btn--active' : ''}`}
                                onClick={() => setActiveFilter(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="gallery-grid">
                        {filtered.map(item => (
                            <div key={item.id} className="gallery-item">
                                <img src={item.img} alt={item.alt} loading="lazy" />
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-2xl)' }}>
                        <Link to="/booking" className="btn btn-primary">
                            Pesan Sekarang
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Social CTA */}
            <section className="section gallery-social section--alt">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="section-header">
                        <h2>Ikuti Kami di Media Sosial</h2>
                        <p>Update potongan terbaru, promo, dan konten menarik dari Triple Cut Barbershop.</p>
                    </div>
                    <div className="gallery-social__btns">
                        <a
                            href="https://tiktok.com/@triple.cut.barber"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
                            </svg>
                            TikTok @triple.cut.barber
                        </a>
                        <a
                            href="https://instagram.com/triple.cut.barber"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                        >
                            <ExternalLink size={18} />
                            Instagram @triple.cut.barber
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
