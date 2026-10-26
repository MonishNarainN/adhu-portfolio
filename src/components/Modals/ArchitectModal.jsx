import React, { useEffect } from 'react';
import { X, Shield, Award, Terminal, Mail, Phone } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../BrandIcons';
import { sounds } from '../SoundEffects';

export default function ArchitectModal({ onClose }) {
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

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container architect-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="modal-close-btn"
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          aria-label="Close dossier"
        >
          <X size={20} />
        </button>

        <div className="architect-dossier-wrap">
          <div className="dossier-header">
            <div className="dossier-avatar-wrap">
              <img
                src="/assets/avatar.png"
                alt="Adharshini KS"
                className="dossier-avatar"
                onError={(e) => {
                  e.target.src = '/Vector.png';
                }}
              />
              <span className="dossier-status-dot" />
            </div>

            <div className="dossier-title-box">
              <span className="dossier-tag">ARCHITECT DOSSIER</span>
              <h2 className="dossier-name">ADHARSHINI KS</h2>
              <p className="dossier-class">Full-Stack Architect & AI/ML Specialist</p>
            </div>
          </div>

          <div className="dossier-stats-grid">
            <div className="dossier-stat-box">
              <Terminal size={18} className="stat-box-icon" />
              <div className="stat-box-content">
                <span className="stat-box-label">PRIMARY REALM</span>
                <span className="stat-box-val">Fullstack & Deep Learning</span>
              </div>
            </div>

            <div className="dossier-stat-box">
              <Shield size={18} className="stat-box-icon" />
              <div className="stat-box-content">
                <span className="stat-box-label">SANCTUARY</span>
                <span className="stat-box-val">Kongu Engineering College</span>
              </div>
            </div>

            <div className="dossier-stat-box">
              <Award size={18} className="stat-box-icon" />
              <div className="stat-box-content">
                <span className="stat-box-label">HONORS</span>
                <span className="stat-box-val">Multiple 2nd Prize Winner</span>
              </div>
            </div>
          </div>

          <div className="dossier-bio">
            <p>
              Architecting modular, intelligent software solutions spanning deep learning
              thermal defect detection, agricultural predictive models, bioinformatics DNA
              analytics, and enterprise web engines. Driven to conquer complex computational
              quests.
            </p>
          </div>

          <div className="dossier-actions">
            <a
              href="https://github.com/KS-Adharshini"
              target="_blank"
              rel="noopener noreferrer"
              className="dossier-btn"
              onClick={() => sounds.playClick()}
            >
              <GithubIcon size={16} />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/adharshini-ks"
              target="_blank"
              rel="noopener noreferrer"
              className="dossier-btn"
              onClick={() => sounds.playClick()}
            >
              <LinkedinIcon size={16} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:adharshiniks015@gmail.com"
              className="dossier-btn highlight-btn"
              onClick={() => sounds.playClick()}
            >
              <Mail size={16} />
              <span>Dispatch Signal</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
