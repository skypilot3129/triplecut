import { MapPin, Phone, Clock, MessageCircle, Navigation } from 'lucide-react';
import heroImg from '../assets/hero-contact.png';
import './Contact.css';


const hours = [
    { day: 'Senin - Jumat', time: '09.00 - 21.00' },
    { day: 'Sabtu', time: '08.00 - 22.00' },
    { day: 'Minggu', time: '10.00 - 20.00' },
];

export default function Contact() {
    const phoneNumber = '6285940722924';
    const waMessage = encodeURIComponent('Halo Vantex Barbershop! Saya ingin tanya tentang layanan barbershop.');
    const waLink = `https://wa.me/${phoneNumber}?text=${waMessage}`;
    const mapsLink = 'https://maps.google.com/?q=Triple+cut+barbershop+Surabaya';

    return (
        <div className="contact-page page-content">
            <section className="contact-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="contact-hero__overlay" />
                <div className="container contact-hero__inner">
                    <div className="hero__badge">✦ LOKASI & KONTAK</div>
                    <h1>Temukan <span className="text-gold">Kami</span></h1>
                    <p>Berlokasi strategis di kawasan Perak, Surabaya. Kami siap melayani Anda setiap hari.</p>
                </div>
            </section>

            <section className="section">
                <div className="container contact-grid">
                    {/* MAP */}
                    <div className="contact-map">
                        <iframe
                            title="Vantex Barbershop Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15832.64278239043!2d112.7356159!3d-7.2225044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7f900149ad2e9%3A0x176bb2ab9187f4c2!2sTriple%20cut%20barbershop!5e0!3m2!1sid!2sid!4v1772439166501!5m2!1sid!2sid"
                            width="100%"
                            height="100%"
                            style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    {/* INFO */}
                    <div className="contact-info">
                        <div className="glass-card contact-info__card">
                            <div className="contact-info__item">
                                <div className="contact-info__icon"><MapPin size={24} /></div>
                                <div>
                                    <h4>Alamat</h4>
                                    <p>Jl. Sisingamangaraja, Perak Tim.,<br />Kec. Pabean Cantian, Surabaya, Jawa Timur</p>
                                </div>
                            </div>

                            <div className="contact-info__item">
                                <div className="contact-info__icon"><Phone size={24} /></div>
                                <div>
                                    <h4>Telepon / WhatsApp</h4>
                                    <p>+62 859-4072-2924</p>
                                </div>
                            </div>

                            <div className="contact-info__item">
                                <div className="contact-info__icon"><Clock size={24} /></div>
                                <div>
                                    <h4>Jam Operasional</h4>
                                    <div className="contact-hours">
                                        {hours.map((h, i) => (
                                            <div key={i} className="contact-hours__row">
                                                <span>{h.day}</span>
                                                <span className="contact-hours__time">{h.time}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-actions">
                            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                                <MessageCircle size={20} />
                                Chat via WhatsApp
                            </a>
                            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ width: '100%' }}>
                                <Navigation size={20} />
                                Buka di Google Maps
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
