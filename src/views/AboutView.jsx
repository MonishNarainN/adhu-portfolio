import React from 'react';
import SubNavBar from '../components/SubNavBar';
import { sounds } from '../components/SoundEffects';

export default function AboutView({ onSelectSection }) {
    const handleResumeClick = () => {
      sounds.playUnlock();
      window.open('https://github.com/KS-Adharshini', '_blank');
    };

    return (
      <section className="view-stage about-view" aria-label="About & Education">
        {/* Brimstone Basin Background Layer */}
        <div className="brimstone-bg-layer" />

        {/* Top Left Sub-Navigation Bar matching reference */}
        <SubNavBar activeSection="about" onSelectSection={onSelectSection} />

        <div className="about-stage-container">
          {/* Left Side: Education Header & Branching Tree */}
          <div className="about-left-section">
            <div className="about-title-group">
              <h1 className="about-hero-title">EDUCATION</h1>
              <h2 className="about-hero-subtitle">QUALIFICATION</h2>
            </div>

            <div className="edu-branching-tree">
              {/* Left Node: Higher Secondary */}
              <div className="tree-node-left">
                <div className="edu-text-card text-left-side">
                  <h3 className="edu-degree-title">Higher Secondary</h3>
                  <p className="edu-school-name">Vignesh International</p>
                  <p className="edu-school-sub">School (CBSE)</p>
                  <p className="edu-score-badge">Percentage : 78%</p>
                </div>
                <div className="branch-line-to-trunk">
                  <div className="branch-endpoint-dot" />
                </div>
              </div>

              {/* Central Vertical Trunk Line */}
              <div className="edu-central-trunk" />

              {/* Right Nodes Container: College and Senior Secondary */}
              <div className="tree-nodes-right-column">
                {/* Top Right: College */}
                <div className="tree-node-right node-top-college">
                  <div className="branch-line-from-trunk">
                    <div className="branch-endpoint-dot" />
                  </div>
                  <div className="edu-text-card text-right-side">
                    <h3 className="edu-degree-title">B.Tech Artificial</h3>
                    <h3 className="edu-degree-title">Intelligence and</h3>
                    <h3 className="edu-degree-title">Machine Learing</h3>
                    <p className="edu-school-name">Kongu Engineering College</p>
                    <p className="edu-score-badge">CGPA : 8.16</p>
                  </div>
                </div>

                {/* Bottom Right: Senior Secondary */}
                <div className="tree-node-right node-bot-senior">
                  <div className="branch-line-from-trunk">
                    <div className="branch-endpoint-dot" />
                  </div>
                  <div className="edu-text-card text-right-side">
                    <h3 className="edu-degree-title">Senior Secondary</h3>
                    <p className="edu-school-name">The Path Global Public</p>
                    <p className="edu-school-sub">School (CBSE)</p>
                    <p className="edu-score-badge">Percentage : 82%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Fiery Solar Ring, The Architect Portrait & View Resume */}
          <div className="about-right-section">
            {/* Glowing Fiery Ring */}
            <div className="fiery-solar-ring" />

            {/* Character Portrait cutout */}
            <div className="architect-portrait-frame">
              <img
                src="/assets/architect-portrait.png"
                alt="Adharshini KS - The Architect"
                className="architect-hero-img"
              />
            </div>

            {/* Character Info Overlay */}
            <div className="architect-hero-tag">
              <span className="architect-role-sup">THE ARCHITECT</span>
              <h2 className="architect-hero-name">ADHARSHINI KS</h2>
              <span className="architect-hero-role">STUDENT | AI & ML</span>
            </div>

            {/* VIEW RESUME CTA */}
            <div className="resume-cta-container">
              <button
                className="view-resume-action-btn"
                onClick={handleResumeClick}
                id="view-resume-btn"
                aria-label="View Resume"
              >
                <span className="resume-action-sup">VIEW</span>
                <span className="resume-action-text">RESUME</span>
                <div className="resume-solid-underline" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
