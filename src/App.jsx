import React, { useState } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import HUDHeader from './components/HUDHeader';
import NavigationDock from './components/NavigationDock';
import HeroView from './views/HeroView';
import AboutView from './views/AboutView';
import ProjectsView from './views/ProjectsView';
import QuestsView from './views/QuestsView';
import SkillsView from './views/SkillsView';
import ContactView from './views/ContactView';
import ArchitectModal from './components/Modals/ArchitectModal';
import { sounds } from './components/SoundEffects';

export default function App() {
  const getInitialSection = () => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    const valid = ['hero', 'about', 'projects', 'quests', 'skills', 'contact'];
    return valid.includes(hash) ? hash : 'hero';
  };

  const getInitialExploring = () => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('explore') === 'true' ||
             Boolean(params.get('project')) ||
             Boolean(params.get('quest')) ||
             Boolean(params.get('skill')) ||
             Boolean(params.get('channel'));
    } catch {
      return false;
    }
  };

  const [currentSection, setCurrentSection] = useState(getInitialSection);
  const [isExploring, setIsExploring] = useState(getInitialExploring);
  const [isMuted, setIsMuted] = useState(false);
  const [isArchitectOpen, setIsArchitectOpen] = useState(false);

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      const valid = ['hero', 'about', 'projects', 'quests', 'skills', 'contact'];
      if (valid.includes(hash)) {
        setCurrentSection(hash);
        setIsExploring(false);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Section order for linear back/forward
  const sectionOrder = ['hero', 'about', 'projects', 'quests', 'skills', 'contact'];

  const handleStartJourney = () => {
    sounds.playUnlock();
    setCurrentSection('about');
    setIsExploring(false);
    window.location.hash = 'about';
  };

  const handleBack = () => {
    sounds.playClick();
    if (isExploring) {
      setIsExploring(false);
      return;
    }
    const currentIndex = sectionOrder.indexOf(currentSection);
    const nextSection = currentIndex > 0 ? sectionOrder[currentIndex - 1] : 'hero';
    setCurrentSection(nextSection);
    setIsExploring(false);
    window.location.hash = nextSection;
  };

  const handleSelectSection = (sectionId) => {
    sounds.playClick();
    setCurrentSection(sectionId);
    setIsExploring(false);
    window.location.hash = sectionId;
  };

  const handleToggleMute = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playClick();
    }
  };

  const handleOpenArchitect = () => {
    sounds.playUnlock();
    setIsArchitectOpen(true);
  };

  return (
    <div className={`app-container section-${currentSection}`}>
      {/* Floating Magma Embers Canvas */}
      <ParticleCanvas />

      {/* Persistent Futuristic / Fantasy HUD Header */}
      <HUDHeader
        currentSection={currentSection}
        isExploring={isExploring}
        onBack={handleBack}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenArchitect={handleOpenArchitect}
      />

      {/* Main View Area */}
      <main className="app-main-viewport">
        {currentSection === 'hero' && (
          <HeroView onStartJourney={handleStartJourney} />
        )}
        {currentSection === 'about' && (
          <AboutView onSelectSection={handleSelectSection} />
        )}
        {currentSection === 'projects' && (
          <ProjectsView
            onSelectSection={handleSelectSection}
            isExploring={isExploring}
            setIsExploring={setIsExploring}
          />
        )}
        {currentSection === 'quests' && (
          <QuestsView
            onSelectSection={handleSelectSection}
            isExploring={isExploring}
            setIsExploring={setIsExploring}
          />
        )}
        {currentSection === 'skills' && (
          <SkillsView
            onSelectSection={handleSelectSection}
            isExploring={isExploring}
            setIsExploring={setIsExploring}
          />
        )}
        {currentSection === 'contact' && (
          <ContactView
            onSelectSection={handleSelectSection}
            isExploring={isExploring}
            setIsExploring={setIsExploring}
          />
        )}
      </main>

      {/* Architect Dossier Modal */}
      {isArchitectOpen && (
        <ArchitectModal onClose={() => setIsArchitectOpen(false)} />
      )}
    </div>
  );
}
