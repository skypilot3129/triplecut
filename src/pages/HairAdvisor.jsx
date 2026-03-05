import { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Sparkles, RotateCcw, Scissors, Star, Info, ArrowRight, AlertTriangle, ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { analyzeHairstyle, generateHairstyleImage } from '../services/geminiService';
import heroImg from '../assets/hero-about.png';
import './HairAdvisor.css';

const diffColors = { 'Mudah': '#22c55e', 'Sedang': '#f59e0b', 'Advance': '#ef4444' };
const maintColors = { 'Rendah': '#22c55e', 'Sedang': '#f59e0b', 'Tinggi': '#ef4444' };

export default function HairAdvisor() {
    const [phase, setPhase] = useState('upload'); // upload | analyzing | results | error
    const [preview, setPreview] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [result, setResult] = useState(null);
    const [recImages, setRecImages] = useState({}); // { index: dataURI }
    const [loadingImages, setLoadingImages] = useState({}); // { index: true }
    const [error, setError] = useState('');
    const fileRef = useRef(null);

    const processFile = useCallback((file) => {
        if (!file || !file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result);
            const base64 = e.target.result.split(',')[1];
            setImageData({ base64, mimeType: file.type });
        };
        reader.readAsDataURL(file);
    }, []);

    const handleFileChange = (e) => processFile(e.target.files?.[0]);
    const handleDrop = (e) => { e.preventDefault(); processFile(e.dataTransfer.files?.[0]); };

    // Generate images for all recommendations in parallel
    const generateImages = async (recommendations) => {
        const loading = {};
        recommendations.forEach((_, i) => { loading[i] = true; });
        setLoadingImages(loading);

        const promises = recommendations.map(async (rec, i) => {
            if (!rec.image_prompt) return;
            try {
                const dataUri = await generateHairstyleImage(rec.image_prompt);
                if (dataUri) {
                    setRecImages((prev) => ({ ...prev, [i]: dataUri }));
                }
            } catch { /* silent fail */ }
            setLoadingImages((prev) => ({ ...prev, [i]: false }));
        });

        await Promise.allSettled(promises);
    };

    const handleAnalyze = async () => {
        if (!imageData) return;
        setPhase('analyzing');
        setError('');
        setRecImages({});
        setLoadingImages({});
        try {
            const data = await analyzeHairstyle(imageData.base64, imageData.mimeType);
            setResult(data);
            setPhase('results');
            // Fire image generation in background (non-blocking)
            if (data.recommendations?.length) {
                generateImages(data.recommendations);
            }
        } catch (err) {
            setError(err.message || 'Terjadi kesalahan saat analisis.');
            setPhase('error');
        }
    };

    const handleReset = () => {
        setPhase('upload');
        setPreview(null);
        setImageData(null);
        setResult(null);
        setRecImages({});
        setLoadingImages({});
        setError('');
    };

    return (
        <div className="advisor-page page-content">
            {/* HERO */}
            <section className="advisor-hero" style={{ backgroundImage: `url(${heroImg})` }}>
                <div className="advisor-hero__overlay" />
                <div className="container advisor-hero__inner">
                    <div className="hero__badge">✦ AI HAIR ADVISOR</div>
                    <h1>Gaya Rambut <span className="text-gold">Terbaik</span> untuk Anda</h1>
                    <p>Upload foto wajah Anda — AI kami akan menganalisis bentuk wajah dan merekomendasikan gaya rambut yang paling cocok, lengkap dengan gambar referensi.</p>
                </div>
            </section>

            <section className="section">
                <div className="container">

                    {/* ═══ UPLOAD PHASE ═══ */}
                    {phase === 'upload' && (
                        <div className="adv-upload">
                            <div
                                className={`adv-dropzone ${preview ? 'adv-dropzone--has-image' : ''}`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
                                onClick={() => !preview && fileRef.current?.click()}
                            >
                                {preview ? (
                                    <div className="adv-preview">
                                        <img src={preview} alt="Preview wajah" />
                                        <button className="adv-preview__remove" onClick={(e) => { e.stopPropagation(); handleReset(); }}>×</button>
                                    </div>
                                ) : (
                                    <div className="adv-dropzone__content">
                                        <Camera size={48} />
                                        <h3>Upload Foto Wajah</h3>
                                        <p>Drag & drop foto atau klik untuk memilih file</p>
                                        <span className="adv-dropzone__formats">JPG, PNG, WebP — Maks 5MB</span>
                                    </div>
                                )}
                                <input ref={fileRef} type="file" accept="image/*" capture="user" onChange={handleFileChange} hidden />
                            </div>

                            {!preview && (
                                <div className="adv-upload__btns">
                                    <button className="btn btn-outline" onClick={() => fileRef.current?.click()}>
                                        <Upload size={18} /> Pilih File
                                    </button>
                                    <button className="btn btn-outline" onClick={() => { fileRef.current?.setAttribute('capture', 'user'); fileRef.current?.click(); }}>
                                        <Camera size={18} /> Ambil Selfie
                                    </button>
                                </div>
                            )}

                            {preview && (
                                <div className="adv-upload__actions">
                                    <div className="adv-tip glass-card">
                                        <Info size={16} />
                                        <span>Pastikan wajah terlihat jelas, pencahayaan baik, dan dari depan untuk hasil terbaik.</span>
                                    </div>
                                    <button className="btn btn-primary adv-analyze-btn" onClick={handleAnalyze}>
                                        <Sparkles size={20} /> Analisis dengan AI
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ═══ ANALYZING PHASE ═══ */}
                    {phase === 'analyzing' && (
                        <div className="adv-loading">
                            <div className="adv-loading__spinner">
                                <Scissors size={32} className="adv-loading__icon" />
                            </div>
                            <h3>AI Sedang Menganalisis...</h3>
                            <p>Gemini Vision sedang membaca bentuk wajah dan mencocokkan gaya rambut terbaik untuk Anda.</p>
                            <div className="adv-loading__bar"><div className="adv-loading__fill" /></div>
                        </div>
                    )}

                    {/* ═══ ERROR PHASE ═══ */}
                    {phase === 'error' && (
                        <div className="adv-error">
                            <AlertTriangle size={48} />
                            <h3>Oops! Terjadi Kesalahan</h3>
                            <p>{error}</p>
                            <button className="btn btn-primary" onClick={handleReset}>
                                <RotateCcw size={18} /> Coba Lagi
                            </button>
                        </div>
                    )}

                    {/* ═══ RESULTS PHASE ═══ */}
                    {phase === 'results' && result && (
                        <div className="adv-results">

                            {/* Header */}
                            <div className="adv-results__header">
                                <div className="adv-results__photo">
                                    <img src={preview} alt="Foto Anda" />
                                </div>
                                <div className="adv-results__face glass-card">
                                    <span className="adv-results__shape-label">Bentuk Wajah Anda</span>
                                    <h2 className="adv-results__shape">{result.face_shape}</h2>
                                    <p>{result.face_analysis}</p>
                                </div>
                            </div>

                            {/* Recommendations */}
                            <div className="adv-results__section">
                                <h3><Scissors size={20} /> Rekomendasi Gaya Rambut</h3>
                                <div className="adv-recs">
                                    {result.recommendations?.map((rec, i) => (
                                        <div key={i} className="adv-rec glass-card hover-lift">
                                            {/* Image */}
                                            <div className="adv-rec__image">
                                                {recImages[i] ? (
                                                    <img src={recImages[i]} alt={rec.name} />
                                                ) : loadingImages[i] ? (
                                                    <div className="adv-rec__img-loading">
                                                        <div className="adv-rec__img-spinner" />
                                                        <span>Generating...</span>
                                                    </div>
                                                ) : (
                                                    <div className="adv-rec__img-placeholder">
                                                        <ImageIcon size={32} />
                                                        <span>Gambar tidak tersedia</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="adv-rec__body">
                                                <div className="adv-rec__rank">{i + 1}</div>
                                                <h4>{rec.name}</h4>
                                                {rec.name_id && <span className="adv-rec__name-id">{rec.name_id}</span>}
                                                <p>{rec.description}</p>
                                                <div className="adv-rec__tags">
                                                    <span className="adv-tag" style={{ '--tag-color': diffColors[rec.difficulty] || '#888' }}>
                                                        ⚡ {rec.difficulty}
                                                    </span>
                                                    <span className="adv-tag" style={{ '--tag-color': maintColors[rec.maintenance] || '#888' }}>
                                                        🔧 {rec.maintenance}
                                                    </span>
                                                    <span className="adv-tag adv-tag--gold">
                                                        <Star size={12} /> {rec.best_for}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="adv-results__tips glass-card">
                                <h4>💡 Tips Styling</h4>
                                <p>{result.styling_tips}</p>
                            </div>

                            {/* Avoid */}
                            <div className="adv-results__avoid glass-card">
                                <h4>⚠️ Sebaiknya Dihindari</h4>
                                <p>{result.avoid}</p>
                            </div>

                            {/* CTA */}
                            <div className="adv-results__cta">
                                <h3>Suka hasilnya?</h3>
                                <p>Booking sekarang dan tunjukkan rekomendasi ini ke barber kami!</p>
                                <div className="adv-results__btns">
                                    <Link to="/booking" className="btn btn-primary">
                                        Pesan Kursi <ArrowRight size={18} />
                                    </Link>
                                    <button className="btn btn-outline" onClick={handleReset}>
                                        <RotateCcw size={18} /> Analisis Lagi
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </section>
        </div>
    );
}
