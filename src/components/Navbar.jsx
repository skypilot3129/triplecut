import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const navLinks = [
    { path: '/', label: 'Beranda' },
    { path: '/about', label: 'Tentang Kami' },
    { path: '/services', label: 'Layanan' },
    { path: '/gallery', label: 'Galeri' },
    { path: '/contact', label: 'Kontak' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <div className="container navbar__inner">
                <Link to="/" className="navbar__logo">
                    <img src={logoImg} alt="Triple Cut Barbershop" className="navbar__logo-img" />
                    <span className="navbar__logo-text">
                        Triple<span className="navbar__logo-accent">Cut</span>
                    </span>
                </Link>

                <ul className={`navbar__links ${isOpen ? 'navbar__links--open' : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li className="navbar__links-cta">
                        <Link to="/booking" className="btn btn-primary btn-sm">
                            Pesan Sekarang
                        </Link>
                    </li>
                </ul>

                <Link to="/booking" className="btn btn-primary btn-sm navbar__cta-desktop">
                    Pesan Sekarang
                </Link>

                <button
                    className="navbar__toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
            </div>

            {isOpen && <div className="navbar__overlay" onClick={() => setIsOpen(false)} />}
        </nav>
    );
}
