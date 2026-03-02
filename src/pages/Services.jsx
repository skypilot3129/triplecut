import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero-services.png';
import './Services.css';


const serviceCategories = [
    {
        category: 'HAIRCUT',
        icon: '✂️',
        services: [
            {
                title: 'Gentleman',
                desc: 'Termasuk Cuci, Hair Tonik, Hot Towel, dan Styling.',
                price: 'Rp 35.000',
                features: ['Konsultasi gaya', 'Potong presisi', 'Cuci rambut', 'Hair Tonik', 'Hot Towel', 'Styling'],
                popular: true,
            },
            {
                title: 'Kids Man Cut',
                desc: 'Potong rambut khusus anak-anak (under 12 tahun).',
                price: 'Rp 30.000',
                features: ['Potong anak', 'Cuci rambut', 'Styling ringan'],
                popular: false,
            },
            {
                title: 'Saving / Hair Tattoo',
                desc: 'Cukur / desain motif artistik pada rambut.',
                price: 'Rp 20.000',
                features: ['Cukur bersih', 'Desain motif custom'],
                popular: false,
            },
        ],
    },
    {
        category: 'TREATMENT',
        icon: '💆',
        services: [
            {
                title: 'Creambath',
                desc: 'Perawatan kulit kepala dengan cream nutrisi dan pijat relaksasi.',
                price: 'Rp 60.000',
                features: ['Pijat kulit kepala', 'Cream nutrisi', 'Hair mask', 'Bilas bersih'],
                popular: false,
            },
            {
                title: 'Black Mask',
                desc: 'Masker rambut hitam untuk perawatan intensif.',
                price: 'Rp 20.000',
                features: ['Black mask treatment', 'Perawatan intensif'],
                popular: false,
            },
            {
                title: 'Eye Mask',
                desc: 'Perawatan kulit di sekitar area mata.',
                price: 'Rp 10.000',
                features: ['Eye mask premium', 'Kulit lebih segar'],
                popular: false,
            },
        ],
    },
    {
        category: 'HAIR COLOR',
        icon: '🎨',
        services: [
            {
                title: 'Semir Uban / Toning',
                desc: 'Pewarnaan uban atau toning warna natural.',
                price: 'Rp 60.000',
                features: ['Cat menutup uban', 'Toning warna natural', 'Perawatan post-color'],
                popular: false,
            },
            {
                title: 'Highlight / Bleaching Saja',
                desc: 'Proses bleaching tanpa pewarnaan lanjutan.',
                price: 'Rp 100.000',
                features: ['Bleaching profesional', 'Produk premium'],
                popular: false,
            },
            {
                title: 'Highlight / Bleaching Sampai Putih',
                desc: 'Bleaching penuh hingga warna putih.',
                price: 'Rp 150.000',
                features: ['Bleaching full', 'Hingga warna putih', 'Perawatan intensif'],
                popular: false,
            },
            {
                title: 'Highlight Warna Fashion',
                desc: 'Pewarnaan warna fashion trendi (blue, green, dll).',
                price: 'Rp 200.000',
                features: ['Warna fashion pilihan', 'Bleaching + color', 'Cat premium'],
                popular: false,
            },
        ],
    },
];

export default function Services() {
    return (
        <div className="services-page page-content">
            <section className="services-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="services-hero__overlay" />
                <div className="container services-hero__inner">
                    <div className="hero__badge">✦ LAYANAN & HARGA</div>
                    <h1>Layanan <span className="text-gold">Resmi</span> Kami</h1>
                    <p>Harga terjangkau, kualitas premium. Semua layanan ditangani barber profesional.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    {serviceCategories.map((cat, ci) => (
                        <div key={ci} className="services-category">
                            <div className="services-category__header">
                                <span className="services-category__icon">{cat.icon}</span>
                                <h2>{cat.category}</h2>
                            </div>
                            <div className="services-grid">
                                {cat.services.map((s, si) => (
                                    <div key={si} className={`glass-card services-card ${s.popular ? 'services-card--popular' : ''}`}>
                                        {s.popular && <span className="services-card__badge">Terlaris</span>}
                                        <h3>{s.title}</h3>
                                        <p className="services-card__desc">{s.desc}</p>
                                        <div className="services-card__price">{s.price}</div>
                                        <ul className="services-card__features">
                                            {s.features.map((f, fi) => (
                                                <li key={fi}><Check size={14} /> {f}</li>
                                            ))}
                                        </ul>
                                        <Link to="/booking" className={`btn ${s.popular ? 'btn-primary' : 'btn-outline'} btn-sm`}>
                                            Pesan
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
