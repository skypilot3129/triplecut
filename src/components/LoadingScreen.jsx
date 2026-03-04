import { useEffect, useState } from 'react';
import logoImg from '../assets/logo.png';
import './LoadingScreen.css';

export default function LoadingScreen({ onFinish }) {
    const [progress, setProgress] = useState(0);
    const [hiding, setHiding] = useState(false);

    useEffect(() => {
        let current = 0;
        const steps = [
            { target: 40, delay: 60 },
            { target: 70, delay: 80 },
            { target: 90, delay: 100 },
            { target: 100, delay: 60 },
        ];

        let stepIndex = 0;

        function runStep() {
            if (stepIndex >= steps.length) return;
            const { target, delay } = steps[stepIndex];

            const interval = setInterval(() => {
                current += Math.random() * 4 + 1;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                    stepIndex++;
                    if (current >= 100) {
                        setProgress(100);
                        setTimeout(() => {
                            setHiding(true);
                            setTimeout(onFinish, 700);
                        }, 350);
                    } else {
                        setTimeout(runStep, delay + Math.random() * 80);
                    }
                }
                setProgress(Math.min(current, 100));
            }, delay);
        }

        runStep();
    }, [onFinish]);

    return (
        <div className={`ls ${hiding ? 'ls--out' : ''}`}>
            {/* Barber pole stripes — top */}
            <div className="ls__pole ls__pole--top">
                <div className="ls__pole-track" />
            </div>

            {/* Center content */}
            <div className="ls__center">
                {/* Scissors spinning around logo */}
                <div className="ls__logo-wrap">
                    <div className="ls__ring" />
                    <img src={logoImg} alt="Vantex Barbershop" className="ls__logo" />
                </div>

                <div className="ls__brand">
                    <span className="ls__brand-name">
                        VAN<span className="ls__brand-accent">TEX</span>
                    </span>
                    <span className="ls__brand-sub">BARBERSHOP · SURABAYA</span>
                </div>

                {/* Progress */}
                <div className="ls__progress-wrap">
                    <div className="ls__progress-bar">
                        <div
                            className="ls__progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <span className="ls__progress-text">{Math.round(progress)}%</span>
                </div>
            </div>

            {/* Barber pole stripes — bottom */}
            <div className="ls__pole ls__pole--bottom">
                <div className="ls__pole-track" />
            </div>
        </div>
    );
}
