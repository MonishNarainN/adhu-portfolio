import React, { useEffect } from 'react';
import { X, ExternalLink, Globe } from 'lucide-react';
import { GithubIcon } from '../BrandIcons';
import { sounds } from '../SoundEffects';

export default function ProjectModal({ project, onClose }) {
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

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-container project-modal"
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
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="modal-content-grid">
          {/* Left Column: Artifact Weapon (Magma Shield) */}
          <div className="modal-artifact-col">
            <div className="artifact-halo" />
            <img
              src="/assets/anim-shield.gif"
              alt="Shield of Obsidian"
              className="artifact-img artifact-shield-img"
            />
          </div>

          {/* Right Column: Project Details */}
          <div className="modal-details-col">
            <div className="modal-header-block">
              <h2 className="modal-title">{project.title}</h2>
              <h4 className="modal-subtitle">{project.subtitle}</h4>
            </div>

            <p className="modal-description">{project.description}</p>

            {/* Action Links - 1:1 with Figma */}
            <div className="figma-modal-links">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="figma-underlined-link"
                  onClick={() => sounds.playClick()}
                >
                  GITHUB LINK
                </a>
              )}

              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="figma-underlined-link"
                  onClick={() => sounds.playClick()}
                >
                  WEBSITE HOST LINK
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
