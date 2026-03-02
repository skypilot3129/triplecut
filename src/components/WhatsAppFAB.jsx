import { MessageCircle } from 'lucide-react';
import './WhatsAppFAB.css';

export default function WhatsAppFAB() {
    const phoneNumber = '6285940722924';
    const message = encodeURIComponent('Halo Triple Cut! Saya ingin reservasi potong rambut.');
    const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-fab"
            aria-label="Chat di WhatsApp"
            id="whatsapp-fab"
        >
            <MessageCircle size={28} />
            <span className="wa-fab__tooltip">Chat WhatsApp</span>
        </a>
    );
}
