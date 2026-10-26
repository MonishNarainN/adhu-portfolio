import React, { useState } from 'react';
import CurvedCarousel from '../components/CurvedCarousel';
import QuestModal from '../components/Modals/QuestModal';
import SectionOverview from '../components/SectionOverview';
import { achievements } from '../data/achievements';
import { overviewDeckCards } from '../data/overviewCards';

export default function QuestsView({
  onSelectSection,
  isExploring,
  setIsExploring
}) {
  const [selectedQuest, setSelectedQuest] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const openId = params.get('quest');
      return openId ? achievements.find(a => a.id === openId) || null : null;
    } catch {
      return null;
    }
  });

  const cards = overviewDeckCards.map(c => ({
    ...c,
    isCenter: c.sectionId === 'quests'
  }));

  if (!isExploring) {
    return (
      <SectionOverview
        sectionId="quests"
        title="ACHIEVEMENTS"
        subtitle="TRIALS SURVIVED"
        description="Not all victories are loud. Some are earned through persistence and precision."
        bgImage="/assets/bg-wrathful-caldera.jpg"
        cards={cards}
        onExplore={() => setIsExploring(true)}
        onSelectSection={onSelectSection}
      />
    );
  }

  return (
    <section className="view-stage quests-view" aria-label="Quests & Achievements">
      <div className="temple-bg-layer quests-bg" />

      <div className="view-content-wrap">
        <CurvedCarousel
          items={achievements}
          onUnlock={(quest) => setSelectedQuest(quest)}
          type="achievements"
        />
      </div>

      {selectedQuest && (
        <QuestModal
          quest={selectedQuest}
          onClose={() => setSelectedQuest(null)}
        />
      )}
    </section>
  );
}
