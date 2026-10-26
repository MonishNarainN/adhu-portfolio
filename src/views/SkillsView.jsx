import React, { useState } from 'react';
import CurvedCarousel from '../components/CurvedCarousel';
import SkillModal from '../components/Modals/SkillModal';
import SectionOverview from '../components/SectionOverview';
import { skillCategories } from '../data/skills';
import { overviewDeckCards } from '../data/overviewCards';

export default function SkillsView({
  onSelectSection,
  isExploring,
  setIsExploring
}) {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const openCat = params.get('skill');
      return openCat ? skillCategories.find(c => c.id === openCat) || null : null;
    } catch {
      return null;
    }
  });

  const cards = overviewDeckCards.map(c => ({
    ...c,
    isCenter: c.sectionId === 'skills'
  }));

  if (!isExploring) {
    return (
      <SectionOverview
        sectionId="skills"
        title="SKILLS"
        subtitle="ABILITIES UNLOCKED"
        description="Power is earned, not given. Each ability was unlocked through repeated trials and relentless iteration."
        bgImage="/assets/bg-infernal-threshold.jpg"
        cards={cards}
        onExplore={() => setIsExploring(true)}
        onSelectSection={onSelectSection}
      />
    );
  }

  return (
    <section className="view-stage skills-view" aria-label="Skills & Armory">
      <div className="temple-bg-layer skills-bg" />

      <div className="view-content-wrap">
        <CurvedCarousel
          items={skillCategories}
          onUnlock={(category) => setSelectedCategory(category)}
          type="skills"
        />
      </div>

      {selectedCategory && (
        <SkillModal
          category={selectedCategory}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </section>
  );
}
