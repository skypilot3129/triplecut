import { useState } from 'react';
import { Calendar, Clock, User, Phone, Scissors, Check } from 'lucide-react';
import heroImg from '../assets/hero-booking.png';
import './Booking.css';


const services = [
    // HAIRCUT
    'Gentleman — Rp 35.000',
    'Kids Man Cut — Rp 30.000',
    'Saving / Hair Tattoo — Rp 20.000',
    // TREATMENT
    'Creambath — Rp 60.000',
    'Black Mask — Rp 20.000',
    'Eye Mask — Rp 10.000',
    // HAIR COLOR
    'Semir Uban / Toning — Rp 60.000',
    'Highlight / Bleaching Saja — Rp 100.000',
    'Highlight / Bleaching Sampai Putih — Rp 150.000',
    'Highlight Warna Fashion — Rp 200.000',
];

const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30',
];

export default function Booking() {
    const [form, setForm] = useState({
        name: '', phone: '', service: '', date: '', time: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleTimeSelect = (time) => {
        setForm({ ...form, time });
    };

    const isValid = form.name && form.phone && form.service && form.date && form.time;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) return;

        const message = encodeURIComponent(
            `Halo Vantex Barbershop! 🔥\n\nSaya ingin melakukan reservasi:\n\n` +
            `👤 Nama: ${form.name}\n` +
            `📱 No. HP: ${form.phone}\n` +
            `✂️ Layanan: ${form.service}\n` +
            `📅 Tanggal: ${form.date}\n` +
            `🕐 Jam: ${form.time}\n\n` +
            `Mohon konfirmasinya. Terima kasih!`
        );
        window.open(`https://wa.me/6285940722924?text=${message}`, '_blank');
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="booking-page page-content">
                <div className="booking-success">
                    <div className="booking-success__icon">
                        <Check size={48} />
                    </div>
                    <h2>Reservasi Terkirim!</h2>
                    <p>Pesan WhatsApp Anda telah dibuka. Silakan konfirmasi dengan tim kami.</p>
                    <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                        Buat Reservasi Lagi
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="booking-page page-content">
            <section className="booking-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="booking-hero__overlay" />
                <div className="container booking-hero__inner">
                    <div className="hero__badge">✦ BOOKING ONLINE</div>
                    <h1>Pesan Kursi <span className="text-gold">Sekarang</span></h1>
                    <p>Isi form reservasi berikut dan tim kami akan mengkonfirmasi jadwal Anda via WhatsApp.</p>
                </div>
            </section>

            <section className="section">
                <div className="container booking-container">

                    {/* FORM */}
                    <form className="booking-form glass-card" onSubmit={handleSubmit} id="booking-form">
                        <h3 className="booking-form__title">
                            <Scissors size={22} /> Form Reservasi
                        </h3>

                        {/* Name */}
                        <div className="booking-field">
                            <label htmlFor="booking-name">
                                <User size={16} /> Nama Lengkap
                            </label>
                            <input
                                id="booking-name"
                                type="text"
                                name="name"
                                placeholder="Masukkan nama Anda"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Phone */}
                        <div className="booking-field">
                            <label htmlFor="booking-phone">
                                <Phone size={16} /> Nomor WhatsApp
                            </label>
                            <input
                                id="booking-phone"
                                type="tel"
                                name="phone"
                                placeholder="Contoh: 08123456789"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Service */}
                        <div className="booking-field">
                            <label htmlFor="booking-service">
                                <Scissors size={16} /> Pilih Layanan
                            </label>
                            <select
                                id="booking-service"
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                required
                            >
                                <option value="">-- Pilih layanan --</option>
                                {services.map((s, i) => (
                                    <option key={i} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div className="booking-field">
                            <label htmlFor="booking-date">
                                <Calendar size={16} /> Tanggal
                            </label>
                            <input
                                id="booking-date"
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                        </div>

                        {/* Time Slots */}
                        <div className="booking-field">
                            <label><Clock size={16} /> Pilih Jam</label>
                            <div className="booking-timeslots">
                                {timeSlots.map((t) => (
                                    <button
                                        key={t}
                                        type="button"
                                        className={`booking-timeslot ${form.time === t ? 'booking-timeslot--active' : ''}`}
                                        onClick={() => handleTimeSelect(t)}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary booking-submit"
                            disabled={!isValid}
                            id="booking-submit"
                        >
                            Konfirmasi via WhatsApp
                            <Phone size={18} />
                        </button>
                    </form>

                    {/* SIDEBAR INFO */}
                    <div className="booking-info">
                        <div className="glass-card booking-info__card">
                            <h4>📍 Lokasi</h4>
                            <p>Jl. Sisingamangaraja, Perak Tim., Kec. Pabean Cantian, Surabaya</p>
                        </div>
                        <div className="glass-card booking-info__card">
                            <h4>⏰ Jam Buka</h4>
                            <p>Senin–Jumat: 09.00–21.00</p>
                            <p>Sabtu: 08.00–22.00</p>
                            <p>Minggu: 10.00–20.00</p>
                        </div>
                        <div className="glass-card booking-info__card booking-info__tip">
                            <h4>💡 Tips</h4>
                            <p>Reservasi minimal 1 jam sebelum kedatangan. Pembatalan harap hubungi kami min. 30 menit sebelumnya.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
