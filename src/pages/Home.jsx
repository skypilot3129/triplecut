import { Link } from 'react-router-dom';
import { Scissors, Sparkles, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import heroBanner from '../assets/hero-banner.png';
import './Home.css';

const services = [
    {
        icon: <Scissors size={32} />,
        title: 'Gentleman Cut',
        desc: 'Potong, Cuci, Hair Tonik, Hot Towel, dan Styling — pengalaman premium lengkap.',
        price: 'Rp 35.000',
    },
    {
        icon: <Sparkles size={32} />,
        title: 'Creambath Treatment',
        desc: 'Perawatan kulit kepala dengan cream nutrisi dan pijat relaksasi.',
        price: 'Rp 60.000',
    },
    {
        icon: <Star size={32} />,
        title: 'Highlight Warna Fashion',
        desc: 'Pewarnaan rambut fashion trendi, termasuk bleaching dan cat warna pilihan.',
        price: 'Mulai Rp 200.000',
    },
];

const pillars = [
    {
        icon: <Scissors size={36} />,
        title: 'Teknik',
        subtitle: 'Skill',
        desc: 'Kapster berpengalaman dengan pelatihan teknik terkini.',
    },
    {
        icon: <ShieldCheck size={36} />,
        title: 'Kebersihan',
        subtitle: 'Hygiene',
        desc: 'Sterilisasi alat dan standar kebersihan premium.',
    },
    {
        icon: <Sparkles size={36} />,
        title: 'Kenyamanan',
        subtitle: 'Comfort',
        desc: 'Interior maskulin, AC, WiFi, dan minuman gratis.',
    },
];

export default function Home() {
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
                        <Link to="/booking" className="btn btn-primary">
                            Pesan Kursi Sekarang
                            <ArrowRight size={18} />
                        </Link>
                        <Link to="/gallery" className="btn btn-outline">
                            Lihat Model Rambut
                        </Link>
                    </div>
                </div>
            </section>

            {/* SERVICES PREVIEW */}
            <section className="section home-services" id="services-preview">
                <div className="container">
                    <div className="section-header">
                        <h2>Layanan Unggulan</h2>
                        <p>Pengalaman grooming premium yang disesuaikan dengan gaya Anda.</p>
                    </div>
                    <div className="home-services__grid">
                        {services.map((s, i) => (
                            <div key={i} className="glass-card home-services__card" style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className="home-services__icon">{s.icon}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                <span className="home-services__price">{s.price}</span>
                            </div>
                        ))}
                    </div>
                    <div className="home-services__cta">
                        <Link to="/services" className="btn btn-outline">
                            Lihat Semua Layanan
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* PILLARS */}
            <section className="section home-pillars" id="pillars">
                <div className="container">
                    <div className="section-header">
                        <h2>Kenapa Vantex?</h2>
                        <p>Tiga pilar utama yang menjadikan kami standar baru barbershop di Surabaya.</p>
                    </div>
                    <div className="home-pillars__grid">
                        {pillars.map((p, i) => (
                            <div key={i} className="home-pillars__item" style={{ animationDelay: `${i * 0.15}s` }}>
                                <div className="home-pillars__icon">{p.icon}</div>
                                <h3>{p.title}</h3>
                                <span className="home-pillars__subtitle">{p.subtitle}</span>
                                <p>{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BANNER */}
            <section className="home-cta" id="cta-banner">
                <div className="container home-cta__inner">
                    <h2>Siap Tampil Lebih Keren?</h2>
                    <p>Pesan jadwal Anda sekarang dan rasakan pengalaman barbershop premium di Surabaya.</p>
                    <Link to="/booking" className="btn btn-primary">
                        Pesan Kursi Sekarang
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
