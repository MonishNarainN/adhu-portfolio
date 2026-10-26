import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { sounds } from '../SoundEffects';

// Vector icons helper for high-fidelity brand representation
function SkillIcon({ type, color }) {
  switch (type) {
    case 'java':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor">
          <path d="M7 19c3 1 7 1 10 0M5 21c5 1.5 9 1.5 14 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M12 3c-2 2-3 4-2 6 1 2 4 3 3 5-1 2-4 2-5 4" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 5c-1 1.5-2 3-1 4.5.8 1.5 3 2.2 2.2 3.8" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'c':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <circle cx="12" cy="12" r="10" fill="#283593" />
          <path d="M16 8.5C14.5 7 10 6.5 8 9.5c-2 3-1.5 7 1 8.5 2.5 1.5 6 .5 7-1" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'sql':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill={color}>
          <path d="M12 3c-4.97 0-9 1.79-9 4v10c0 2.21 4.03 4 9 4s9-1.79 9-4V7c0-2.21-4.03-4-9-4zm0 2c4.41 0 7 1.34 7 2s-2.59 2-7 2-7-1.34-7-2 2.59-2 7-2zm0 6c-4.41 0-7-1.34-7-2v3c0 .66 2.59 2 7 2s7-1.34 7-2V9c0 .66-2.59 2-7 2zm0 6c-4.41 0-7-1.34-7-2v3c0 .66 2.59 2 7 2s7-1.34 7-2v-3c0 .66-2.59 2-7 2z" />
        </svg>
      );
    case 'python':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path d="M11.9 2C8.3 2 8.5 3.5 8.5 3.5v3.6h7.1v1H5.4S2 7.7 2 11.9c0 4.1 3 3.9 3 3.9h1.8v-2.5s-.1-3 3-3h7.2s2.9.1 2.9-2.8V5.3S20.3 2 11.9 2zm-2 2.1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="#387EB8" />
          <path d="M12.1 22c3.6 0 3.4-1.5 3.4-1.5v-3.6H8.4v-1h10.2s3.4.4 3.4-3.8c0-4.1-3-3.9-3-3.9h-1.8v2.5s.1 3-3 3H7s-2.9-.1-2.9 2.8v2.2S3.7 22 12.1 22zm2-2.1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" fill="#FFE052" />
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <path d="M8 3h4v4.5H8a2.25 2.25 0 0 1 0-4.5z" fill="#F24E1E" />
          <path d="M12 3h4a2.25 2.25 0 0 1 0 4.5h-4V3z" fill="#FF7262" />
          <path d="M8 7.5h4V12H8a2.25 2.25 0 0 1 0-4.5z" fill="#A259FF" />
          <path d="M12 7.5h4a2.25 2.25 0 1 1 0 4.5h-4V7.5z" fill="#1ABCFE" />
          <path d="M8 12h4v4.5a2.25 2.25 0 1 1-4 0V12z" fill="#0ACF83" />
        </svg>
      );
    case 'vscode':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path d="M17.5 2.5 7.5 10.5 4 8 2 9.5 4.5 12 2 14.5 4 16l3.5-2.5 10 8 4.5-2V4.5l-4.5-2zm0 4.5v10l-6.5-5 6.5-5z" fill="#007ACC" />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#FFFFFF">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case 'mongodb':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <path d="M12 2C11.5 3 6 8.5 6 14.5c0 4 3 6.5 6 7.5 3-1 6-3.5 6-7.5C18 8.5 12.5 3 12 2zm.2 18.5V13c-.1 0-.3.1-.4.1-1 0-1.8-.8-1.8-1.8 0-.4.1-.7.3-1l.7-.8v-4c0-.7.3-1.4.6-2 .3.6.6 1.3.6 2v13.2z" fill="#47A248" />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#61DAFB" strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="10" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );
    case 'html':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#E34F26">
          <path d="M3 3h18l-1.6 18-7.4 2-7.4-2L3 3zm14.5 4.5H6.5l.3 3.5h10.4l-.5 5-4.3 1.2-4.3-1.2-.3-2.5h2.5l.1 1.2 1.7.5 1.7-.5.2-2.5H6.8l-.8-8h11.8l-.3 2.5z" />
        </svg>
      );
    case 'bootstrap':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#7952B3">
          <rect width="22" height="22" x="1" y="1" rx="4" />
          <path d="M8 6h4.5c1.8 0 3 1 3 2.4 0 1-.6 1.8-1.6 2.1 1.2.3 1.9 1.2 1.9 2.4 0 1.6-1.3 2.6-3.2 2.6H8V6zm2.4 3.7h1.9c.7 0 1.2-.4 1.2-1 0-.6-.5-1-1.2-1h-1.9v2zm0 3.7h2.2c.8 0 1.3-.4 1.3-1.1 0-.7-.5-1.1-1.3-1.1h-2.2v2.2z" fill="#FFF" />
        </svg>
      );
    case 'css':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#1572B6">
          <path d="M3 3h18l-1.6 18-7.4 2-7.4-2L3 3zm14.7 4.5H6.3l.3 3.5h10.4l-.5 5-4.2 1.2-4.2-1.2-.2-2h2.5l.1 1 1.8.5 1.8-.5.2-2.5H6.6l-.8-8h12.1l-.2 2.5z" />
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <rect width="22" height="22" x="1" y="1" rx="3" fill="#F7DF1E" />
          <path d="M7 16.5c.5.8 1.2 1.3 2.2 1.3 1.2 0 1.9-.6 1.9-2v-5.3H9.4v5.3c0 .6-.2.9-.6.9-.4 0-.7-.3-.9-.6L7 16.5zm8.2-.2c.4.6 1 1.1 1.8 1.1.8 0 1.3-.4 1.3-.9 0-.6-.5-.8-1.4-1.2l-.5-.2c-1.4-.6-2.3-1.4-2.3-2.8 0-1.4 1.1-2.4 2.8-2.4 1.2 0 2 .4 2.6 1.5l-1.3.8c-.3-.5-.7-.8-1.3-.8-.6 0-1 .4-1 .8 0 .5.4.8 1.3 1.1l.5.2c1.6.7 2.4 1.4 2.4 2.9 0 1.6-1.3 2.6-3.1 2.6-1.5 0-2.5-.6-3.1-1.8l1.3-.9z" fill="#000" />
        </svg>
      );
    case 'flask':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#C084FC" strokeWidth="2">
          <path d="M9 3h6M10 3v5l-6 11a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-11V3" />
          <path d="M7.5 16h9" stroke="#E879F9" />
        </svg>
      );
    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="#22C55E">
          <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 3.2L5.5 8.9v7.4l6.5 3.7 6.5-3.7V8.9L12 5.2z" />
          <path d="M12 8a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0v-2a3 3 0 0 0-3-3z" />
        </svg>
      );
    case 'express':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28">
          <circle cx="12" cy="12" r="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="1.5" />
          <text x="12" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold" fontFamily="sans-serif">ex</text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill={color || '#38BDF8'}>
          <circle cx="12" cy="12" r="9" opacity="0.2" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      );
  }
}

export default function SkillModal({ category, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        sounds.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!category) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container skill-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          aria-label="Close artifacts"
        >
          <X size={20} />
        </button>

        <div className="skill-modal-content">
          {/* Top Title: ARTIFACTS */}
          <div className="artifacts-title-row">
            <h2 className="artifacts-title">ARTIFACTS</h2>
            <span className="artifacts-category-name">{category.title}</span>
          </div>

          <div className="modal-content-grid">
            {/* Left Column: Enchanted Bow with proper horizontal arrow */}
            <div className="modal-artifact-col bow-col">
              <div className="artifact-halo bow-halo" />
              <img
                src="/assets/anim-bow.gif"
                alt="Enchanted Hunter Bow and Arrow"
                className="artifact-img artifact-bow-img"
              />
            </div>

            {/* Right Column: Skill Tiles Grid */}
            <div className="modal-details-col skill-tiles-col">
              <div className="skill-grid">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="skill-tile-card"
                    style={{ backgroundColor: skill.badgeBg || '#092537' }}
                  >
                    <div className="skill-tile-icon">
                      {skill.logo ? (
                        <img src={skill.logo} alt={skill.name} className="skill-logo-img" />
                      ) : (
                        <SkillIcon type={skill.type} color={skill.color} />
                      )}
                    </div>
                    <span className="skill-tile-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
