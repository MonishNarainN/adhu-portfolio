import React from 'react';
import { Sparkles, User, Shield, Sword, Wrench, Radio } from 'lucide-react';

export default function NavigationDock({ activeSection, onSelectSection }) {
  const navItems = [
    { id: 'hero', label: 'THE FORGE', icon: Sparkles, code: '01' },
    { id: 'about', label: 'ARCHITECT', icon: User, code: '02' },
    { id: 'projects', label: 'PROJECTS', icon: Shield, code: '03' },
    { id: 'quests', label: 'QUESTS', icon: Sword, code: '04' },
    { id: 'skills', label: 'ARTIFACTS', icon: Wrench, code: '05' },
    { id: 'contact', label: 'TRANSMISSIONS', icon: Radio, code: '06' }
  ];

  return (
    <nav className="realm-nav-dock" aria-label="Realm Navigation">
      <div className="nav-dock-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              className={`nav-dock-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSection(item.id)}
            >
              <span className="nav-dock-code">{item.code}</span>
              <Icon size={15} className="nav-dock-icon" />
              <span className="nav-dock-label">{item.label}</span>
              {isActive && <div className="nav-dock-indicator" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
