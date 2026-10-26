import React, { useState } from 'react';
import CurvedCarousel from '../components/CurvedCarousel';
import ProjectModal from '../components/Modals/ProjectModal';
import SectionOverview from '../components/SectionOverview';
import { projects } from '../data/projects';
import { overviewDeckCards } from '../data/overviewCards';

export default function ProjectsView({
  onSelectSection,
  isExploring,
  setIsExploring
}) {
  const [selectedProject, setSelectedProject] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const openId = params.get('project');
      return openId ? projects.find(p => p.id === openId) || null : null;
    } catch {
      return null;
    }
  });

  const cards = overviewDeckCards.map(c => ({
    ...c,
    isCenter: c.sectionId === 'projects'
  }));

  if (!isExploring) {
    return (
      <SectionOverview
        sectionId="projects"
        title="PROJECTS"
        subtitle="THE FORGE"
        description="Each creation is a relic — tested in battle, refined through failure, and sealed in the vault of experience."
        bgImage="/assets/bg-cinder-vail.jpg"
        cards={cards}
        onExplore={() => setIsExploring(true)}
        onSelectSection={onSelectSection}
      />
    );
  }

  return (
    <section className="view-stage projects-view" aria-label="Projects Section">
      <div className="temple-bg-layer" />

      <div className="view-content-wrap">
        <CurvedCarousel
          items={projects}
          onUnlock={(project) => setSelectedProject(project)}
          type="projects"
        />
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
