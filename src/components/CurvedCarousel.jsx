import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { sounds } from './SoundEffects';

export default function CurvedCarousel({
  items,
  onUnlock,
  type = 'projects' // 'projects' | 'achievements' | 'skills'
}) {
  // Default to middle card (e.g. Frontend Languages for skills at index 2)
  const defaultIndex = Math.min(2, Math.floor(items.length / 2));
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1600
  );
  const containerRef = useRef(null);

  const total = items.length;

  // Window resize listener for responsive card layout
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    sounds.playClick();
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    sounds.playClick();
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total]);

  // Responsive dimensions calculation ensuring zero overlap
  let cardWidthActive = 250;
  let cardHeightActive = 460;
  let cardWidthInactive = 205;
  let cardHeightInactive = 410;
  let gap = 24;
  let maxVisibleDiff = 2; // All 5 cards visible on desktop

  if (viewportWidth < 768) {
    // Mobile: Show centered active card only to guarantee no collision
    cardWidthActive = Math.min(270, viewportWidth - 70);
    cardHeightActive = 410;
    cardWidthInactive = 0;
    cardHeightInactive = 360;
    gap = 0;
    maxVisibleDiff = 0;
  } else if (viewportWidth < 1200) {
    // Tablet: Show 3 cards (-1, 0, +1)
    cardWidthActive = 225;
    cardHeightActive = 430;
    cardWidthInactive = 175;
    cardHeightInactive = 385;
    gap = 18;
    maxVisibleDiff = 1;
  }

  // Exact horizontal slot translation formula with guaranteed non-overlapping gap
  const getTranslateX = (diff) => {
    if (diff === 0) return 0;
    const sign = Math.sign(diff);
    const absDiff = Math.abs(diff);
    const firstOffset = (cardWidthActive / 2) + gap + (cardWidthInactive / 2);
    const extraOffset = (absDiff - 1) * (cardWidthInactive + gap);
    return sign * (firstOffset + extraOffset);
  };

  return (
    <div className="carousel-stage-container" ref={containerRef}>
      {/* Navigation arrows positioned outside card content */}
      <button
        className="carousel-arrow carousel-arrow-left"
        onClick={handlePrev}
        aria-label="Previous item"
        title="Previous (Left Arrow)"
        id="carousel-btn-prev"
      >
        <ChevronLeft size={30} />
      </button>

      <button
        className="carousel-arrow carousel-arrow-right"
        onClick={handleNext}
        aria-label="Next item"
        title="Next (Right Arrow)"
        id="carousel-btn-next"
      >
        <ChevronRight size={30} />
      </button>

      {/* Controlled Horizontal Slotted Viewport */}
      <div className="carousel-viewport">
        <div className="carousel-slotted-ring">
          {items.map((item, index) => {
            // Relative distance from activeIndex with circular wrapping
            let diff = index - activeIndex;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isVisible = Math.abs(diff) <= maxVisibleDiff;

            const translateX = getTranslateX(diff);
            const rotateY = diff * 4; // Subtle 4° curve without collision
            const translateZ = -Math.abs(diff) * 20; // Subtle depth recession

            const currentWidth = isCenter ? cardWidthActive : cardWidthInactive;
            const currentHeight = isCenter ? cardHeightActive : cardHeightInactive;

            let opacity = 0;
            if (isVisible) {
              if (isCenter) opacity = 1;
              else if (Math.abs(diff) === 1) opacity = 0.82;
              else opacity = 0.65;
            }

            const zIndex = 20 - Math.abs(diff) * 3;

            return (
              <div
                key={item.id}
                className={`carousel-card ${isCenter ? 'card-center' : ''} ${
                  Math.abs(diff) === 1 ? 'card-flank' : ''
                }`}
                style={{
                  width: `${currentWidth}px`,
                  height: `${currentHeight}px`,
                  transform: `translate(-50%, -50%) translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
                onClick={() => {
                  sounds.playClick();
                  if (!isCenter) {
                    setActiveIndex(index);
                  } else {
                    sounds.playUnlock();
                    onUnlock(item);
                  }
                }}
                title={isCenter ? `Unlock ${item.title}` : `Focus ${item.title}`}
                role="button"
                tabIndex={isVisible ? 0 : -1}
                id={`carousel-card-${item.id}`}
              >
                {/* Ambient Center Glow */}
                <div className="card-aura-glow" />

                {/* Card Body */}
                <div className="card-inner">
                  {/* Category / Rune count tag */}
                  <div className="card-top-tag">
                    {item.category || item.subtitle || (item.skills ? `${item.skills.length} RUNES` : 'CODEX')}
                  </div>

                  {/* Main Title */}
                  <div className="card-title-box">
                    <h3 className="card-title">
                      {item.displayTitle || item.title}
                    </h3>
                  </div>

                  {/* Subtitle / Timeline mark if present */}
                  {item.subtitle && !item.category && (
                    <div className="card-sub-info">{item.subtitle}</div>
                  )}

                  {/* Action Button */}
                  <div className="card-action-wrap">
                    <button
                      className="unlock-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        sounds.playUnlock();
                        onUnlock(item);
                      }}
                      id={`unlock-${item.id}`}
                    >
                      <span className="unlock-text">UNLOCK</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom pagination indicators */}
      <div className="carousel-indicators">
        {items.map((item, idx) => (
          <button
            key={item.id}
            className={`carousel-dot ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => {
              sounds.playClick();
              setActiveIndex(idx);
            }}
            aria-label={`Go to card ${idx + 1}: ${item.title}`}
            title={`Card ${idx + 1}: ${item.title}`}
          />
        ))}
      </div>
    </div>
  );
}
