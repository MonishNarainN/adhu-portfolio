import React, { useEffect } from 'react';
import { X, ExternalLink, Award, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { sounds } from '../SoundEffects';

export default function QuestModal({ quest, onClose }) {
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

  if (!quest) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container quest-modal"
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
          aria-label="Close quest log"
        >
          <X size={20} />
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Flame Sword */}
          <div className="modal-artifact-col sword-col">
            <div className="artifact-halo sword-halo" />
            <img
              src="/assets/anim-sword.gif"
              alt="Sword of the Victor"
              className="artifact-img artifact-sword-img"
            />
          </div>

          {/* Right Column: Quest Information */}
          <div className="modal-details-col quest-details">
            <div className="quest-header-block">
              <div className="quest-status-badge">
                <CheckCircle2 size={16} className="quest-check-icon" />
                <span>QUEST COMPLETED</span>
              </div>
              <h2 className="quest-title">{quest.title}</h2>
              {quest.subtitle && (
                <div className="quest-rank-badge">{quest.subtitle}</div>
              )}
            </div>

            <div className="quest-stats-list">
              {/* Battlefield */}
              <div className="quest-stat-row">
                <div className="stat-label-group">
                  <MapPin size={14} className="stat-icon" />
                  <span className="stat-label">BATTLEFIELD</span>
                </div>
                <div className="stat-value">{quest.battlefield}</div>
              </div>

              {/* Timeline Mark */}
              {quest.timelineMark && (
                <div className="quest-stat-row">
                  <div className="stat-label-group">
                    <Calendar size={14} className="stat-icon" />
                    <span className="stat-label">TIMELINE MARK</span>
                  </div>
                  <div className="stat-value mono">{quest.timelineMark}</div>
                </div>
              )}

              {/* Specialization if present */}
              {quest.specialization && (
                <div className="quest-stat-row">
                  <div className="stat-label-group">
                    <Award size={14} className="stat-icon" />
                    <span className="stat-label">SPECIALIZATION</span>
                  </div>
                  <div className="stat-value">{quest.specialization}</div>
                </div>
              )}

              {/* Reward Verified */}
              <div className="quest-stat-row reward-row">
                <div className="stat-label-group">
                  <Award size={14} className="stat-icon highlight" />
                  <span className="stat-label highlight">REWARD VERIFIED</span>
                </div>
                <div className="stat-value">
                  <a
                    href={quest.proofLink || 'https://github.com/KS-Adharshini'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quest-proof-link"
                    onClick={() => sounds.playClick()}
                  >
                    <span>Proof Link</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
