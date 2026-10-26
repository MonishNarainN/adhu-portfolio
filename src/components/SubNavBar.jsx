import React from 'react';
import { User, Image as ImageIcon, Trophy, GraduationCap, Phone } from 'lucide-react';
import { sounds } from './SoundEffects';

export default function SubNavBar({ activeSection, onSelectSection }) {
  const navItems = [
    { id: 'about', label: 'USER', icon: User, title: 'Architect / About' },
    { id: 'projects', label: 'PROJECTS', icon: ImageIcon, title: 'Projects' },
    { id: 'quests', label: 'ACHIEVEMENTS', icon: Trophy, title: 'Quests & Achievements' },
    { id: 'skills', label: 'SKILLS', icon: GraduationCap, title: 'Skills & Artifacts' },
    { id: 'contact', label: 'CONTACT', icon: Phone, title: 'Transmissions & Contact' }
  ];

  return (
    <nav className="about-subnav-bar" aria-label="Section Navigation">
      {navItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            className={`about-nav-icon-btn ${isActive ? 'active' : ''}`}
            onClick={() => {
              if (!isActive) {
                sounds.playClick();
                onSelectSection(item.id);
              }
            }}
            title={item.title}
            aria-label={item.title}
          >
            {isActive && <div className="nav-icon-glow" />}
            <IconComponent size={18} className="nav-svg-icon" />
            {isActive && <span className="nav-icon-label">{item.label}</span>}
          </button>
        );
      })}
    </nav>
  );
}
