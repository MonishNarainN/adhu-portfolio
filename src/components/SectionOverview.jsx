import React, { useEffect } from 'react';
import SubNavBar from './SubNavBar';
import { sounds } from './SoundEffects';

export default function SectionOverview({
  sectionId,
  title,
  subtitle,
  description,
  bgImage,
  cards, // array of { id, sectionId, title, image, isCenter }
  onExplore,
  onSelectSection
}) {
  const sectionList = ['projects', 'quests', 'skills', 'contact'];
  const currentIndex = sectionList.indexOf(sectionId);

  const handleExplore = () => {
    sounds.playUnlock();
    onExplore();
  };

  const handleCardClick = (card) => {
    sounds.playClick();
    if (card.sectionId && onSelectSection) {
      onSelectSection(card.sectionId);
    }
  };

  // Previous / Next keyboard arrow navigation across cards
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (currentIndex === -1) return;
      if (e.key === 'ArrowRight') {
        sounds.playClick();
        const nextIdx = (currentIndex + 1) % sectionList.length;
        onSelectSection(sectionList[nextIdx]);
      } else if (e.key === 'ArrowLeft') {
        sounds.playClick();
        const prevIdx = (currentIndex - 1 + sectionList.length) % sectionList.length;
        onSelectSection(sectionList[prevIdx]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, onSelectSection]);

  return (
    <section className={`view-stage section-overview overview-${sectionId}`} aria-label={`${title} Overview`}>
      {/* Scenic Background Layer */}
      <div
        className="overview-bg-layer"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      <div className="overview-ambient-overlay" />

      {/* Top Left Sub-Navigation Bar */}
      <SubNavBar activeSection={sectionId} onSelectSection={onSelectSection} />

      <div className="overview-content-container">
        {/* Left Column: Lore, Title & Explore CTA */}
        <div className="overview-left-col">
          <div className="overview-header-group">
            <h1 className="overview-title">{title}</h1>
            <h2 className="overview-subtitle">{subtitle}</h2>
          </div>

          <p className="overview-description">{description}</p>

          <div className="overview-action-wrap">
            <button
              className="overview-explore-btn"
              onClick={handleExplore}
              id={`explore-btn-${sectionId}`}
              aria-label={`Explore ${title}`}
            >
              EXPLORE
            </button>
          </div>
        </div>

        {/* Right Column: Weapon Cards Preview Deck */}
        <div className="overview-right-col">
          <div className="overview-cards-deck">
            {cards.map((card, idx) => {
              const isActive = card.isCenter || card.sectionId === sectionId;
              return (
                <div
                  key={card.id || idx}
                  className={`overview-preview-card ${isActive ? 'card-primary' : 'card-secondary'}`}
                  onClick={() => handleCardClick(card)}
                  title={`Select ${card.title || card.sectionId}`}
                  role="button"
                  tabIndex={0}
                  id={`preview-card-${card.id}`}
                >
                  <img
                    src={card.image}
                    alt={card.title || 'Relic'}
                    className="preview-card-img"
                  />
                  <div className="preview-card-border" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
