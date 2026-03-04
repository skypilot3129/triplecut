import { lazy, Suspense, useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import LoadingScreen from './components/LoadingScreen';
import useSectionNav from './hooks/useSectionNav';
import './App.css';

// Code-splitting: each page loads only when visited
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Booking = lazy(() => import('./pages/Booking'));

// Minimal inline fallback for page-to-page transitions
function PageFallback() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 36, height: 36,
        border: '3px solid #f0e6c8',
        borderTopColor: '#b8860b',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);
  useSectionNav(); // arrow key section scrolling

  return (
    <>
      {/* Preload screen — shown only on first visit */}
      {loading && <LoadingScreen onFinish={handleFinish} />}

      <div className="app-layout" style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/booking" element={<Booking />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WhatsAppFAB />
      </div>
    </>
  );
}
