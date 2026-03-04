import { Scissors, ShieldCheck, Sparkles, Award, Users } from 'lucide-react';
import heroImg from '../assets/hero-about.png';
import useScrollReveal from '../hooks/useScrollReveal';
import './About.css';

const team = [
    { name: 'Rizky Aditya', role: 'Head Barber', experience: '8 tahun pengalaman', specialty: 'Fade & Skin Fade Specialist' },
    { name: 'Dimas Pratama', role: 'Senior Barber', experience: '5 tahun pengalaman', specialty: 'Classic & Modern Styles' },
    { name: 'Fajar Ramadhan', role: 'Barber & Colorist', experience: '4 tahun pengalaman', specialty: 'Hair Coloring Expert' },
];

export default function About() {
    const philRef = useScrollReveal({ stagger: true, staggerDelay: 130 });
    const statsRef = useScrollReveal({ stagger: true, staggerDelay: 80 });
    const teamRef = useScrollReveal({ stagger: true, staggerDelay: 150 });

    return (
        <div className="about page-content">
            {/* HERO */}
            <section className="about-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="about-hero__overlay" />
                <div className="container about-hero__inner">
                    <div className="hero__badge">✦ TENTANG KAMI</div>
                    <h1>Cerita Di Balik <span className="text-gold">Vantex</span></h1>
                    <p>Lahir dari passion terhadap presisi dan keahlian sejati — barbershop yang tidak sekadar memotong, tapi menciptakan identitas.</p>
                </div>
            </section>

            <hr className="section-wave" />

            {/* PHILOSOPHY */}
            <section className="section about-philosophy">
                <div className="container">
                    <div className="section-header reveal reveal-up" ref={useScrollReveal()}>
                        <h2>Filosofi Vantex</h2>
                        <p>Nama "VANTEX" mewakili tiga nilai utama yang menjadi fondasi setiap layanan kami.</p>
                    </div>
                    <div className="about-philosophy__grid" ref={philRef}>
                        <div className="glass-card about-philosophy__card hover-lift hover-glow reveal reveal-up">
                            <div className="about-philosophy__icon"><Scissors size={40} /></div>
                            <h3>Vanguard <span className="text-gold-sm">(Terdepan)</span></h3>
                            <p>Kami selalu menjadi yang pertama mengadopsi teknik dan tren terkini. Inovasi bukan pilihan — itu standar kami.</p>
                        </div>
                        <div className="glass-card about-philosophy__card hover-lift hover-glow reveal reveal-up">
                            <div className="about-philosophy__icon"><ShieldCheck size={40} /></div>
                            <h3>Artisan <span className="text-gold-sm">(Keahlian)</span></h3>
                            <p>Setiap potongan adalah karya seni. Kapster kami tidak hanya memotong rambut — mereka merancang identitas visual Anda.</p>
                        </div>
                        <div className="glass-card about-philosophy__card hover-lift hover-glow reveal reveal-up">
                            <div className="about-philosophy__icon"><Sparkles size={40} /></div>
                            <h3>Excellence <span className="text-gold-sm">(Keunggulan)</span></h3>
                            <p>Standar higienitas tertinggi, interior premium, produk terbaik, dan pelayanan tanpa kompromi.</p>
                        </div>
                    </div>
                </div>
            </section>

            <hr className="section-wave" />

            {/* STATS */}
            <section className="about-stats">
                <div className="container about-stats__grid" ref={statsRef}>
                    <div className="about-stats__item reveal reveal-scale">
                        <span className="about-stats__number">3+</span>
                        <span className="about-stats__label">Tahun Pengalaman</span>
                    </div>
                    <div className="about-stats__item reveal reveal-scale">
                        <span className="about-stats__number">5000+</span>
                        <span className="about-stats__label">Pelanggan Puas</span>
                    </div>
                    <div className="about-stats__item reveal reveal-scale">
                        <span className="about-stats__number">3</span>
                        <span className="about-stats__label">Barber Profesional</span>
                    </div>
                    <div className="about-stats__item reveal reveal-scale">
                        <span className="about-stats__number">4.9</span>
                        <span className="about-stats__label">Rating Google</span>
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section className="section about-team">
                <div className="container">
                    <div className="section-header reveal reveal-up" ref={useScrollReveal()}>
                        <h2>Tim Barber Kami</h2>
                        <p>Para artisan berpengalaman yang siap memberikan potongan terbaik untuk Anda.</p>
                    </div>
                    <div className="about-team__grid" ref={teamRef}>
                        {team.map((member, i) => (
                            <div key={i} className="glass-card about-team__card hover-lift hover-glow reveal reveal-up">
                                <div className="about-team__avatar"><Users size={40} /></div>
                                <h3>{member.name}</h3>
                                <span className="about-team__role">{member.role}</span>
                                <div className="about-team__details">
                                    <span><Award size={14} /> {member.experience}</span>
                                    <span><Scissors size={14} /> {member.specialty}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
