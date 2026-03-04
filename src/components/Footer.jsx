import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Instagram } from 'lucide-react';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__grid">
                    {/* Brand */}
                    <div className="footer__brand">
                        <div className="footer__logo">
                            <span className="footer__logo-text">
                                VAN<span className="footer__logo-accent">TEX</span>{' '}
                                <span className="footer__logo-sub">Barbershop</span>
                            </span>
                        </div>
                        <p className="footer__desc">
                            Barbershop premium di Surabaya. Terdepan dalam presisi, artisan dalam gaya, excellence dalam pelayanan.
                        </p>
                        <div className="footer__socials">
                            <a href="https://tiktok.com/@vantex.barbershop" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="footer__social-link">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z" />
                                </svg>
                            </a>
                            <a href="https://instagram.com/vantex.barbershop" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer__social-link">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer__section">
                        <h4 className="footer__heading">Menu</h4>
                        <ul className="footer__list">
                            <li><Link to="/">Beranda</Link></li>
                            <li><Link to="/about">Tentang Kami</Link></li>
                            <li><Link to="/services">Layanan &amp; Harga</Link></li>
                            <li><Link to="/gallery">Galeri</Link></li>
                            <li><Link to="/booking">Booking Online</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="footer__section">
                        <h4 className="footer__heading">Layanan</h4>
                        <ul className="footer__list">
                            <li>Gentleman Cut</li>
                            <li>Kids Man Cut</li>
                            <li>Saving / Hair Tattoo</li>
                            <li>Creambath Treatment</li>
                            <li>Highlight Warna Fashion</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer__section">
                        <h4 className="footer__heading">Kontak</h4>
                        <ul className="footer__list footer__contact-list">
                            <li>
                                <MapPin size={16} />
                                <span>Jl. Sisingamangaraja, Perak Tim., Kec. Pabean Cantian, Surabaya</span>
                            </li>
                            <li>
                                <Phone size={16} />
                                <span>+62 859-4072-2924</span>
                            </li>
                            <li>
                                <Clock size={16} />
                                <span>Senin–Sabtu: 09.00–21.00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer__bottom">
                    <div className="gold-divider" />
                    <p>&copy; 2026 Vantex Barbershop. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
