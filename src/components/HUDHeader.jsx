import React from 'react';
import { Volume2, VolumeX, ArrowLeft } from 'lucide-react';

export default function HUDHeader({
  currentSection,
  isExploring,
  onBack,
  isMuted,
  onToggleMute,
  onOpenArchitect
}) {
  const isHero = currentSection === 'hero';

  const getLocationName = () => {
    if (currentSection === 'hero') return 'THE CRADLE OF FLAME';
    if (currentSection === 'about') return 'BRIMSTONE BASIN';
    if (isExploring) return 'THE OBSIDIAN SCAR';
    if (currentSection === 'projects') return 'THE CINDER-VAIL PEAKS';
    if (currentSection === 'quests') return 'THE WRATHFUL CALDERA';
    if (currentSection === 'skills') return 'THE INFERNAL THRESHOLD';
    if (currentSection === 'contact') return "MOUNT PYRE'S REACH";
    return 'THE OBSIDIAN SCAR';
  };

  return (
    <header className="hud-header">
      <div className="hud-left">
        {(!isHero && (isExploring || currentSection !== 'about')) && (
          <button
            className="hud-back-btn"
            onClick={onBack}
            aria-label="Return to previous location"
            title="Return back (Esc / Left Arrow)"
          >
            <div className="hud-bracket">[</div>
            <ArrowLeft size={18} className="hud-back-icon" />
            <div className="hud-bracket">]</div>
          </button>
        )}
        <div className="hud-location">
          <span className="location-label">LOCATION</span>
          <span className="location-sep">|</span>
          <span className="location-name">
            {getLocationName()}
          </span>
        </div>
      </div>

      <div className="hud-right">
        {/* Sound toggle button */}
        <button
          className={`hud-sound-btn ${isMuted ? 'muted' : 'active'}`}
          onClick={onToggleMute}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label="Toggle Audio"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>

        {/* Architect Forge Badge */}
        <div 
          className="architect-badge"
          onClick={onOpenArchitect}
          title="Architect: Adharshini KS (Click to inspect)"
        >
          <div className="architect-info">
            <span className="architect-title">ARCHITECT</span>
            <span className="forge-status">FORGE ACTIVE</span>
          </div>
          <div className="architect-avatar-ring">
            <img
              src="/assets/avatar.png"
              alt="Architect Profile"
              className="architect-avatar-img"
              onError={(e) => {
                e.target.src = '/Vector.png';
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
