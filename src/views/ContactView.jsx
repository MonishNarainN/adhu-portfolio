import React, { useState } from 'react';
import { Phone, Mail, Smartphone, ExternalLink, Copy, Check, Radio } from 'lucide-react';
import SectionOverview from '../components/SectionOverview';
import { contactData } from '../data/contact';
import { sounds } from '../components/SoundEffects';
import { overviewDeckCards } from '../data/overviewCards';

export default function ContactView({
  onSelectSection,
  isExploring,
  setIsExploring
}) {
  const [activeChannel, setActiveChannel] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const openChan = params.get('channel');
      return openChan && contactData[openChan] ? openChan : null;
    } catch {
      return null;
    }
  });
  const [copiedText, setCopiedText] = useState(null);

  const handleSelectChannel = (channelId) => {
    sounds.playClick();
    setActiveChannel(channelId);
  };

  const handleCopy = (text, label) => {
    sounds.playClick();
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const current = activeChannel ? contactData[activeChannel] : null;

  const cards = overviewDeckCards.map(c => ({
    ...c,
    isCenter: c.sectionId === 'contact'
  }));

  if (!isExploring) {
    return (
      <SectionOverview
        sectionId="contact"
        title="CONTACT"
        subtitle="COMMUNICATIONS ACTIVE"
        description="The forge remains active, its fires still burning. New quests, collaborations, and challenges are always welcome."
        bgImage="/assets/bg-mount-pyre.jpg"
        cards={cards}
        onExplore={() => setIsExploring(true)}
        onSelectSection={onSelectSection}
      />
    );
  }

  return (
    <section className="view-stage contact-view" aria-label="Transmission Channels">
      <div className="temple-bg-layer contact-bg" />

      {/* Copy notification toast */}
      {copiedText && (
        <div className="telemetry-toast">
          <Check size={16} />
          <span>{copiedText} copied to clipboard!</span>
        </div>
      )}

      <div className="view-content-wrap contact-content-wrap">
        {!activeChannel ? (
          /* Initial 3-Node Pyramid matching 6A .Contact.png */
          <div className="contact-cluster-initial">
            <div className="cluster-nodes-pyramid">
              <div className="cluster-pyramid-row top-row">
                <button
                  className="cluster-node-btn phone-node"
                  onClick={() => handleSelectChannel('phone')}
                  title="Direct Phone Line"
                  id="channel-btn-phone"
                  aria-label="Direct Phone Line"
                >
                  <Phone size={62} className="node-icon" />
                </button>

                <button
                  className="cluster-node-btn mail-node"
                  onClick={() => handleSelectChannel('mail')}
                  title="Encrypted Dispatch"
                  id="channel-btn-mail"
                  aria-label="Encrypted Dispatch"
                >
                  <Mail size={62} className="node-icon" />
                </button>
              </div>

              <div className="cluster-pyramid-row bottom-row">
                <button
                  className="cluster-node-btn mobile-node"
                  onClick={() => handleSelectChannel('mobile')}
                  title="Guild & Alliances"
                  id="channel-btn-mobile"
                  aria-label="Guild & Alliances"
                >
                  <Smartphone size={62} className="node-icon" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Active Channel Display (matching 6A1, 6A2, 6A3) */
          <div className="active-channel-layout">
            {/* Left Column: Active Highlighted Node */}
            <div className="channel-active-node-col">
              <div className="active-node-circle">
                {activeChannel === 'phone' && <Phone size={56} className="active-node-icon" />}
                {activeChannel === 'mail' && <Mail size={56} className="active-node-icon" />}
                {activeChannel === 'mobile' && <Smartphone size={56} className="active-node-icon" />}
              </div>
            </div>

            {/* Middle Column: Lore & Transmission Details */}
            <div className="channel-transmissions-col">
              <div className="transmission-terminal">
                <h3 className="transmission-headline">{current.headline}</h3>
                <p className="transmission-subline">{current.subline || current.subline1}</p>

                {/* Specific Channel Content */}
                {activeChannel === 'phone' && (
                  <div className="frequency-data-box">
                    <div className="data-primary-row">
                      <div className="primary-icon-wrap">
                        <Phone size={24} />
                      </div>
                      <a
                        href={current.telUrl}
                        className="primary-data-val mono phone-val"
                        onClick={() => sounds.playClick()}
                      >
                        {current.number}
                      </a>
                      <button
                        className="copy-chip-btn"
                        onClick={() => handleCopy(current.number, 'Phone Number')}
                        title="Copy Phone Number"
                      >
                        <Copy size={14} />
                      </button>
                    </div>

                    <div className="telemetry-readout">
                      {current.telemetry.map((t, idx) => (
                        <div key={`${t.label}-${idx}`} className="telemetry-item">
                          <span className="telemetry-lbl">{t.label}:</span>
                          <span className="telemetry-val mono">{t.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeChannel === 'mail' && (
                  <div className="frequency-data-box">
                    <div className="data-primary-row">
                      <div className="primary-icon-wrap mail-icon-wrap">
                        <Mail size={24} />
                      </div>
                      <a
                        href={current.mailUrl}
                        className="primary-data-val mono mail-val"
                        onClick={() => sounds.playClick()}
                      >
                        {current.email}
                      </a>
                      <button
                        className="copy-chip-btn"
                        onClick={() => handleCopy(current.email, 'Email Address')}
                        title="Copy Email Address"
                      >
                        <Copy size={14} />
                      </button>
                    </div>

                    <div className="telemetry-readout">
                      {current.telemetry.map((t, idx) => (
                        <div key={`${t.label}-${idx}`} className="telemetry-item">
                          <span className="telemetry-lbl">{t.label}:</span>
                          <span className="telemetry-val mono">{t.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeChannel === 'mobile' && (
                  <div className="frequency-data-box mobile-box">
                    {/* LinkedIn */}
                    <div className="mobile-link-row">
                      <div className="mobile-link-header">
                        <a
                          href="https://www.linkedin.com/in/adharshini-ks"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="network-link-btn"
                          onClick={() => sounds.playClick()}
                        >
                          <img
                            src="/assets/logos/skill-icons_linkedin.png"
                            alt="LinkedIn"
                            className="contact-brand-logo"
                          />
                          <span className="network-title underline-link">
                            Adharshini KS | LinkedIn
                          </span>
                        </a>
                      </div>
                    </div>

                    <p className="transmission-subline subline-mid">
                      {current.subline2}
                    </p>

                    {/* GitHub */}
                    <div className="mobile-link-row">
                      <div className="mobile-link-header">
                        <a
                          href="https://github.com/KS-Adharshini"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="network-link-btn"
                          onClick={() => sounds.playClick()}
                        >
                          <img
                            src="/assets/logos/github-logo-icon-free-vector-removebg-preview.png"
                            alt="GitHub"
                            className="contact-brand-logo"
                          />
                          <span className="network-title underline-link">
                            KS-Adharshini | GitHub
                          </span>
                        </a>
                      </div>
                    </div>

                    <div className="mobile-footer-tag">{current.footer}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Inactive Nodes Selector */}
            <div className="channel-inactive-selectors-col">
              {['phone', 'mail', 'mobile']
                .filter((id) => id !== activeChannel)
                .map((id) => (
                  <button
                    key={id}
                    className="selector-satellite-btn"
                    onClick={() => handleSelectChannel(id)}
                    title={`Switch to ${id}`}
                    aria-label={`Switch to ${id} channel`}
                  >
                    {id === 'phone' && <Phone size={36} />}
                    {id === 'mail' && <Mail size={36} />}
                    {id === 'mobile' && <Smartphone size={36} />}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
