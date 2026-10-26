import React from 'react';
import { Play } from 'lucide-react';
import { sounds } from '../components/SoundEffects';

export default function HeroView({ onStartJourney }) {
  const handleClickPlay = () => {
    sounds.playEnterRealm();
    onStartJourney();
  };

  return (
    <section className="hero-view" aria-label="Portfolio Start Portal">
      {/* Background image container with ambient darkening vignette */}
      <div className="hero-bg-layer" />
      <div className="hero-ambient-vignette" />

      <div className="hero-content">
        {/* Epic Serif Main Title */}
        <div className="hero-title-box">
          <h1 className="hero-title">PORTFOLIO</h1>
        </div>

        {/* Cinematic Play / Initiate Button */}
        <div className="hero-play-wrap">
          <button
            className="hero-play-btn"
            onClick={handleClickPlay}
            aria-label="Begin Journey"
            title="Begin the Journey of Discovery"
            id="hero-play-btn"
          >
            <div className="play-btn-glow" />
            <div className="play-triangle-shape">
              <svg viewBox="0 0 100 100" className="play-svg">
                <defs>
                  <linearGradient id="playGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8db4d0" />
                    <stop offset="50%" stopColor="#486e8a" />
                    <stop offset="100%" stopColor="#253e52" />
                  </linearGradient>
                </defs>
                <polygon
                  points="25,15 88,50 25,85"
                  fill="url(#playGrad)"
                  filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.6))"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Atmospheric Bottom Subtitle */}
        <div className="hero-footer-lore">
          <p className="lore-line-1">FORGE THE PATH TO WHERE DISCOVERY BEGINS</p>
          <p className="lore-line-2">BEGIN THE JOURNEY OF DISCOVERY</p>
        </div>
      </div>
    </section>
  );
}
