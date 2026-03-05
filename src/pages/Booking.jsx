import { useState, useMemo } from 'react';
import { Calendar, Clock, User, Phone, Scissors, Check, ArrowRight, ArrowLeft, MessageCircle, Star } from 'lucide-react';
import heroImg from '../assets/hero-booking.png';
import './Booking.css';

const barbers = [
    { id: 'rizky', name: 'Rizky Aditya', role: 'Head Barber', specialty: 'Fade & Skin Fade Specialist', exp: '8 tahun' },
    { id: 'dimas', name: 'Dimas Pratama', role: 'Senior Barber', specialty: 'Classic & Modern Styles', exp: '5 tahun' },
    { id: 'fajar', name: 'Fajar Ramadhan', role: 'Barber & Colorist', specialty: 'Hair Coloring Expert', exp: '4 tahun' },
];

const serviceCategories = [
    {
        category: '✂️ Haircut',
        items: [
            { name: 'Gentleman', price: 35000, desc: 'Cuci, Hair Tonik, Hot Towel, Styling' },
            { name: 'Kids Man Cut', price: 30000, desc: 'Potongan anak laki-laki' },
            { name: 'Saving / Hair Tattoo', price: 20000, desc: 'Cukur bersih / desain tattoo rambut' },
        ],
    },
    {
        category: '💆 Treatment',
        items: [
            { name: 'Creambath', price: 60000, desc: 'Perawatan nutrisi & pijat kepala' },
            { name: 'Black Mask', price: 20000, desc: 'Masker wajah charcoal' },
            { name: 'Eye Mask', price: 10000, desc: 'Masker mata relaksasi' },
        ],
    },
    {
        category: '🎨 Hair Color',
        items: [
            { name: 'Semir Uban / Toning', price: 60000, desc: 'Pewarnaan natural uban' },
            { name: 'Highlight / Bleaching Saja', price: 100000, desc: 'Bleaching tanpa cat warna' },
            { name: 'Bleaching Sampai Putih', price: 150000, desc: 'Full bleaching white/platinum' },
            { name: 'Highlight Warna Fashion', price: 200000, desc: 'Warna fashion pilihan' },
        ],
    },
];

const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30',
];

const fmt = (n) => 'Rp ' + n.toLocaleString('id-ID');

export default function Booking() {
    const [step, setStep] = useState(1);
    const [selected, setSelected] = useState([]); // array of {name, price, desc}
    const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', barber: '' });
    const [submitted, setSubmitted] = useState(false);

    const total = useMemo(() => selected.reduce((s, i) => s + i.price, 0), [selected]);

    const toggleService = (item) => {
        setSelected((prev) =>
            prev.find((s) => s.name === item.name)
                ? prev.filter((s) => s.name !== item.name)
                : [...prev, item]
        );
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const canStep2 = selected.length > 0;
    const canStep3 = form.name && form.phone && form.date && form.time && form.barber;
    const selectedBarber = barbers.find(b => b.id === form.barber);

    const handleSubmit = () => {
        const serviceList = selected.map((s) => `  • ${s.name} — ${fmt(s.price)}`).join('\n');
        const message = encodeURIComponent(
            `Halo Vantex Barbershop! \u{1F525}\n\nSaya ingin melakukan reservasi:\n\n` +
            `\u{1F464} Nama: ${form.name}\n` +
            `\u{1F4F1} No. HP: ${form.phone}\n\n` +
            `\u2702\uFE0F Layanan:\n${selected.map(s => `  \u2022 ${s.name} \u2014 ${fmt(s.price)}`).join('\n')}\n\n` +
            `\u{1F4B0} Total: ${fmt(total)}\n\n` +
            `\u{1F4C5} Tanggal: ${form.date}\n` +
            `\u{1F550} Jam: ${form.time}\n` +
            `\u{1F4C7} Barber: ${selectedBarber?.name || '-'}\n\n` +
            `Mohon konfirmasinya. Terima kasih!`
        );
        window.open(`https://wa.me/6285940722924?text=${message}`, '_blank');
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="booking-page page-content">
                <div className="booking-success">
                    <div className="booking-success__icon"><Check size={48} /></div>
                    <h2>Reservasi Terkirim!</h2>
                    <p>Pesan WhatsApp Anda telah dibuka. Tim kami akan mengkonfirmasi jadwal Anda.</p>
                    <button className="btn btn-primary" onClick={() => { setSubmitted(false); setStep(1); setSelected([]); setForm({ name: '', phone: '', date: '', time: '', barber: '' }); }}>
                        Buat Reservasi Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page page-content">
            {/* HERO */}
            <section className="booking-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="booking-hero__overlay" />
                <div className="container booking-hero__inner">
                    <div className="hero__badge">✦ BOOKING ONLINE</div>
                    <h1>Pesan Kursi <span className="text-gold">Sekarang</span></h1>
                    <p>3 langkah mudah — pilih layanan, isi data, konfirmasi via WhatsApp.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">

                    {/* STEP INDICATOR */}
                    <div className="bk-steps">
                        {['Pilih Layanan', 'Data & Jadwal', 'Konfirmasi'].map((label, i) => (
                            <div key={i} className={`bk-steps__item ${step > i + 1 ? 'bk-steps__item--done' : ''} ${step === i + 1 ? 'bk-steps__item--active' : ''}`}>
                                <span className="bk-steps__num">{step > i + 1 ? '✓' : i + 1}</span>
                                <span className="bk-steps__label">{label}</span>
                            </div>
                        ))}
                        <div className="bk-steps__line" style={{ width: `${((step - 1) / 2) * 100}%` }} />
                    </div>

                    {/* ====== STEP 1: Service picker ====== */}
                    {step === 1 && (
                        <div className="bk-panel bk-step1">
                            {serviceCategories.map((cat, ci) => (
                                <div key={ci} className="bk-cat">
                                    <h3 className="bk-cat__title">{cat.category}</h3>
                                    <div className="bk-cat__grid">
                                        {cat.items.map((item, ii) => {
                                            const active = selected.find((s) => s.name === item.name);
                                            return (
                                                <button
                                                    key={ii}
                                                    className={`bk-service ${active ? 'bk-service--active' : ''}`}
                                                    onClick={() => toggleService(item)}
                                                    type="button"
                                                >
                                                    <span className="bk-service__check">{active ? <Check size={16} /> : null}</span>
                                                    <span className="bk-service__name">{item.name}</span>
                                                    <span className="bk-service__desc">{item.desc}</span>
                                                    <span className="bk-service__price">{fmt(item.price)}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            {/* Bottom bar */}
                            <div className="bk-bottom">
                                <div className="bk-bottom__info">
                                    <span className="bk-bottom__count">{selected.length} layanan dipilih</span>
                                    <span className="bk-bottom__total">{fmt(total)}</span>
                                </div>
                                <button className="btn btn-primary" onClick={() => setStep(2)} disabled={!canStep2}>
                                    Lanjut <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ====== STEP 2: Data & Jadwal ====== */}
                    {step === 2 && (
                        <div className="bk-panel bk-step2">
                            <div className="bk-form glass-card">
                                <h3 className="bk-form__title"><User size={20} /> Data Anda</h3>

                                <div className="bk-field">
                                    <label htmlFor="bk-name"><User size={14} /> Nama Lengkap</label>
                                    <input id="bk-name" name="name" type="text" placeholder="Masukkan nama" value={form.name} onChange={handleChange} />
                                </div>

                                <div className="bk-field">
                                    <label htmlFor="bk-phone"><Phone size={14} /> Nomor WhatsApp</label>
                                    <input id="bk-phone" name="phone" type="tel" placeholder="08123456789" value={form.phone} onChange={handleChange} />
                                </div>

                                <div className="bk-field">
                                    <label htmlFor="bk-date"><Calendar size={14} /> Pilih Tanggal</label>
                                    <input id="bk-date" name="date" type="date" value={form.date} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                                </div>

                                <div className="bk-field">
                                    <label><Clock size={14} /> Pilih Jam</label>
                                    <div className="bk-timegrid">
                                        {timeSlots.map((t) => (
                                            <button key={t} type="button"
                                                className={`bk-time ${form.time === t ? 'bk-time--active' : ''}`}
                                                onClick={() => setForm({ ...form, time: t })}
                                            >{t}</button>
                                        ))}
                                    </div>
                                </div>

                                {/* Barber picker */}
                                <div className="bk-field">
                                    <label><Scissors size={14} /> Pilih Barber</label>
                                    <div className="bk-barbers">
                                        {barbers.map((b) => (
                                            <button key={b.id} type="button"
                                                className={`bk-barber ${form.barber === b.id ? 'bk-barber--active' : ''}`}
                                                onClick={() => setForm({ ...form, barber: b.id })}
                                            >
                                                <div className="bk-barber__avatar">{b.name.charAt(0)}</div>
                                                <div className="bk-barber__info">
                                                    <strong>{b.name}</strong>
                                                    <span className="bk-barber__role">{b.role}</span>
                                                    <span className="bk-barber__spec"><Star size={10} /> {b.specialty}</span>
                                                </div>
                                                {form.barber === b.id && <div className="bk-barber__check"><Check size={14} /></div>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Nav */}
                            <div className="bk-bottom">
                                <button className="btn btn-outline" onClick={() => setStep(1)}>
                                    <ArrowLeft size={18} /> Kembali
                                </button>
                                <button className="btn btn-primary" onClick={() => setStep(3)} disabled={!canStep3}>
                                    Lanjut <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ====== STEP 3: Nota / Preview ====== */}
                    {step === 3 && (
                        <div className="bk-panel bk-step3">
                            <div className="bk-nota glass-card">
                                <div className="bk-nota__header">
                                    <Scissors size={24} />
                                    <div>
                                        <h3>Nota Reservasi</h3>
                                        <span>Vantex Barbershop · Surabaya</span>
                                    </div>
                                </div>

                                <div className="bk-nota__divider" />

                                <div className="bk-nota__section">
                                    <h4>👤 Data Pelanggan</h4>
                                    <p><strong>{form.name}</strong></p>
                                    <p>{form.phone}</p>
                                </div>

                                <div className="bk-nota__section">
                                    <h4>📅 Jadwal</h4>
                                    <p>{form.date} — <strong>{form.time} WIB</strong></p>
                                </div>
                                <div className="bk-nota__section">
                                    <h4>Barber</h4>
                                    <p><strong>{selectedBarber?.name}</strong> &mdash; {selectedBarber?.role}</p>
                                </div>

                                <div className="bk-nota__divider" />

                                <div className="bk-nota__section">
                                    <h4>✂️ Layanan</h4>
                                    {selected.map((s, i) => (
                                        <div key={i} className="bk-nota__line">
                                            <span>{s.name}</span>
                                            <span>{fmt(s.price)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bk-nota__divider" />

                                <div className="bk-nota__total">
                                    <span>Total</span>
                                    <span>{fmt(total)}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="bk-bottom">
                                <button className="btn btn-outline" onClick={() => setStep(2)}>
                                    <ArrowLeft size={18} /> Edit
                                </button>
                                <button className="btn btn-primary bk-wa-btn" onClick={handleSubmit}>
                                    <MessageCircle size={18} /> Kirim via WhatsApp
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}
