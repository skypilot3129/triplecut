import { Scissors, ShieldCheck, Sparkles, Award, Users } from 'lucide-react';
import heroImg from '../assets/hero-about.png';
import './About.css';

const team = [
    { name: 'Rizky Aditya', role: 'Head Barber', experience: '8 tahun pengalaman', specialty: 'Fade & Skin Fade Specialist' },
    { name: 'Dimas Pratama', role: 'Senior Barber', experience: '5 tahun pengalaman', specialty: 'Classic & Modern Styles' },
    { name: 'Fajar Ramadhan', role: 'Barber & Colorist', experience: '4 tahun pengalaman', specialty: 'Hair Coloring Expert' },
];

export default function About() {
    return (
        <div className="about page-content">
            {/* HERO */}
            <section className="about-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="about-hero__overlay" />
                <div className="container about-hero__inner">
                    <div className="hero__badge">✦ TENTANG KAMI</div>
                    <h1>Cerita Di Balik <span className="text-gold">Triple Cut</span></h1>
                    <p>Barbershop premium yang lahir dari passion terhadap seni grooming dan gaya hidup pria modern di Surabaya.</p>
                </div>
            </section>

            {/* PHILOSOPHY */}
            <section className="section about-philosophy">
                <div className="container">
                    <div className="section-header">
                        <h2>Filosofi Triple Cut</h2>
                        <p>Nama "Triple Cut" mewakili tiga pilar utama yang menjadi fondasi pelayanan kami.</p>
                    </div>
                    <div className="about-philosophy__grid">
                        <div className="glass-card about-philosophy__card">
                            <div className="about-philosophy__icon"><Scissors size={40} /></div>
                            <h3>Teknik <span className="text-gold-sm">(Skill)</span></h3>
                            <p>Setiap kapster kami terlatih dalam teknik potong rambut terkini — dari classic hingga modern fade. Kami percaya bahwa keahlian adalah pondasi dari setiap potongan sempurna.</p>
                        </div>
                        <div className="glass-card about-philosophy__card">
                            <div className="about-philosophy__icon"><ShieldCheck size={40} /></div>
                            <h3>Kebersihan <span className="text-gold-sm">(Hygiene)</span></h3>
                            <p>Alat-alat kami selalu disterilkan sebelum dan sesudah penggunaan. Kami menjaga standar kebersihan tertinggi untuk kenyamanan dan keamanan pelanggan.</p>
                        </div>
                        <div className="glass-card about-philosophy__card">
                            <div className="about-philosophy__icon"><Sparkles size={40} /></div>
                            <h3>Kenyamanan <span className="text-gold-sm">(Comfort)</span></h3>
                            <p>Interior maskulin yang instagramable, kursi premium, AC, WiFi gratis, dan minuman — semua dirancang agar Anda rileks menikmati proses grooming.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="about-stats">
                <div className="container about-stats__grid">
                    <div className="about-stats__item">
                        <span className="about-stats__number">3+</span>
                        <span className="about-stats__label">Tahun Pengalaman</span>
                    </div>
                    <div className="about-stats__item">
                        <span className="about-stats__number">5000+</span>
                        <span className="about-stats__label">Pelanggan Puas</span>
                    </div>
                    <div className="about-stats__item">
                        <span className="about-stats__number">3</span>
                        <span className="about-stats__label">Barber Profesional</span>
                    </div>
                    <div className="about-stats__item">
                        <span className="about-stats__number">4.9</span>
                        <span className="about-stats__label">Rating Google</span>
                    </div>
                </div>
            </section>

            {/* TEAM */}
            <section className="section about-team">
                <div className="container">
                    <div className="section-header">
                        <h2>Tim Barber Kami</h2>
                        <p>Para profesional berpengalaman yang siap memberikan potongan terbaik untuk Anda.</p>
                    </div>
                    <div className="about-team__grid">
                        {team.map((member, i) => (
                            <div key={i} className="glass-card about-team__card">
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
