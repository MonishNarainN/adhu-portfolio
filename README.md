# ⚔️ The Obsidian Scar — Fantasy RPG Developer Portfolio Template

> A cinematic, dark-fantasy & sci-fi HUD developer portfolio built with **React 19** and **Vite**. Features atmospheric realm navigation, procedural sound effects, a 3D collision-free codex carousel, interactive dossiers, and volcanic particle embers.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Features](#2-features)
3. [Tech Stack](#3-tech-stack)
4. [Project Folder Structure](#4-project-folder-structure)
5. [Prerequisites](#5-prerequisites)
6. [Installation and Setup](#6-installation-and-setup)
7. [Run Locally](#7-run-locally)
8. [Quick Customization Reference](#8-quick-customization-reference)
9. [How to Change Personal Information](#9-how-to-change-personal-information)
10. [How to Replace Images and GIFs](#10-how-to-replace-images-and-gifs)
11. [How to Add Projects](#11-how-to-add-projects)
12. [How to Update Skills and Achievements](#12-how-to-update-skills-and-achievements)
13. [How to Update Education and Experience](#13-how-to-update-education-and-experience)
14. [How to Change Social Links and Contact Details](#14-how-to-change-social-links-and-contact-details)
15. [How to Customize the Carousel](#15-how-to-customize-the-carousel)
16. [How to Customize Colors, Fonts, and Animations](#16-how-to-customize-colors-fonts-and-animations)
17. [How to Add a New Section](#17-how-to-add-a-new-section)
18. [Build and Deployment](#18-build-and-deployment)
19. [Troubleshooting](#19-troubleshooting)
20. [Files Beginners Should Avoid Editing](#20-files-beginners-should-avoid-editing)
21. [Final Customization Checklist](#21-final-customization-checklist)

---

## 1. Project Overview

This template is designed as an immersive developer portfolio that presents your skills, projects, achievements, and background as an interactive RPG adventure. Visitors explore distinct "realm locations", interact with weapon artifacts, inspect detailed codex modals, and navigate 3D skill carousels.

Anyone with basic computer skills and beginner JavaScript knowledge can customize this template by editing simple data files in `src/data/` and replacing images in `public/assets/`, without having to touch complex routing or 3D mathematics.

---

## 2. Features

- **6 Atmospheric Realm Stages**:
  - **The Forge** (`hero`): Cinematic gateway with pulsing play trigger.
  - **Brimstone Basin** (`about`): Interactive education branching tree and character portrait.
  - **The Cinder-Vail Peaks** (`projects`): Horizontal weapon overview transitioning into codex projects.
  - **The Wrathful Caldera** (`quests`): Achievements and awards showcase.
  - **The Infernal Threshold** (`skills`): Categorized abilities and technology armory.
  - **Mount Pyre's Reach** (`contact`): Interactive encrypted transmission channels (LinkedIn, GitHub, Phone, Email).
- **Synchronized Weapon Deck**: 4 preview cards (`Shield`, `Sword`, `Bow`, `Axe`) that cycle between sections when clicked, fully synchronized with the top navigation dock.
- **Collision-Free 3D Curved Carousel**: Exact mathematical slotting prevents card overlap across all screen resolutions (desktop, tablet, mobile).
- **Procedural Audio Synthesizer**: Web Audio API generates sci-fi / fantasy sound effects in code—no heavy MP3 or WAV audio files required, complete with a persistent mute toggle.
- **Canvas Volcanic Particles**: Real-time floating magma embers floating across the viewport.
- **Interactive Modals**: Detailed popups for projects, quests, skill runes, and the Architect dossier.

---

## 3. Tech Stack

- **Framework**: [React 19](https://react.dev/) (`react`, `react-dom`)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/) (`lucide-react`)
- **Styling**: Vanilla CSS3 with custom design tokens, backdrop blur filters, and 3D transforms
- **Typography**: Google Fonts (*Cinzel*, *Cinzel Decorative*, *Outfit*, *Share Tech Mono*)
- **Audio Engine**: Native Browser HTML5 Web Audio API

---

## 4. Project Folder Structure

```text
port/
├── index.html                   # HTML entry point, page title, font links
├── package.json                 # Scripts and dependencies
├── vite.config.js               # Vite configuration
├── .gitignore                   # Excluded files for git
├── public/                      # Static assets served directly
│   ├── Vector.png               # Fallback avatar icon
│   └── assets/                  # Images, animated GIFs, and brand logos
│       ├── anim-axe.gif         # Battle Axe animated GIF
│       ├── anim-bow.gif         # Bow animated GIF
│       ├── anim-shield.gif      # Shield animated GIF
│       ├── anim-sword.gif       # Sword animated GIF
│       ├── architect-portrait.png # Main cutout portrait on About page
│       ├── avatar.png           # Circular avatar in header & dossier
│       ├── bg-cinder-vail.jpg   # Projects overview background
│       ├── bg-infernal-threshold.jpg # Skills overview background
│       ├── bg-mount-pyre.jpg    # Contact overview background
│       ├── bg-wrathful-caldera.jpg # Achievements overview background
│       ├── brimstone-basin.jpg  # About page background
│       ├── card-axe.png         # Weapon deck Axe card
│       ├── card-bow.png         # Weapon deck Bow card
│       ├── card-shield.png      # Weapon deck Shield card
│       ├── card-sword.png       # Weapon deck Sword card
│       ├── hero-anim.gif        # Hero portal background animation
│       ├── temple-real.png      # Temple background for codex carousels
│       └── logos/               # Brand logos for skills and contact
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Main view switcher, routing, sound state
│   ├── index.css                # Global theme tokens, typography, layout, animations
│   ├── components/              # Reusable UI components
│   │   ├── BrandIcons.jsx       # Custom SVG icons (GitHub, LinkedIn)
│   │   ├── CurvedCarousel.jsx   # 3D collision-free card carousel
│   │   ├── HUDHeader.jsx        # Top HUD header, back button, location tag, audio mute
│   │   ├── NavigationDock.jsx   # Bottom realm navigation dock (optional HUD)
│   │   ├── ParticleCanvas.jsx   # Canvas volcanic ember background
│   │   ├── SectionOverview.jsx  # 4-card overview layout for major sections
│   │   ├── SoundEffects.js      # Web Audio procedural sound generator
│   │   ├── SubNavBar.jsx        # Top-left icon navigation bar
│   │   └── Modals/
│   │       ├── ArchitectModal.jsx # Character profile dossier popup
│   │       ├── ProjectModal.jsx # Project details popup
│   │       ├── QuestModal.jsx   # Achievement/quest details popup
│   │       └── SkillModal.jsx   # Skill category runes popup
│   ├── data/                    # ★ MAIN CUSTOMIZATION DATA FILES
│   │   ├── achievements.js      # Achievement/quest cards & details
│   │   ├── contact.js           # Contact info, phone, email, social links
│   │   ├── overviewCards.js     # 4 weapon preview cards definition
│   │   ├── projects.js          # Project cards, descriptions, links, tags
│   │   └── skills.js            # Skill categories and brand runes
│   └── views/                   # Stage views for each section
│       ├── HeroView.jsx         # Start page
│       ├── AboutView.jsx        # Education & Character portrait
│       ├── ProjectsView.jsx     # Projects overview & carousel view
│       ├── QuestsView.jsx       # Achievements overview & carousel view
│       ├── SkillsView.jsx       # Skills overview & carousel view
│       └── ContactView.jsx      # Transmission channels overview & active details
```

---

## 5. Prerequisites

Before running this project, ensure you have:

1. **Node.js**: Version 18.0.0 or higher (version 20.x or 22.x LTS recommended).
   - Check version: `node -v`
   - Download from: [nodejs.org](https://nodejs.org/)
2. **npm**: Included with Node.js (version 9.x or higher).
   - Check version: `npm -v`
3. A code editor such as **VS Code**.

---

## 6. Installation and Setup

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/MonishNarainN/adhu-portfolio.git
   cd adhu-portfolio
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```

---

## 7. Run Locally

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to:
```text
http://localhost:3000/
```

- Any edits you make in `src/data/` or `src/index.css` will update automatically in real-time via Hot Module Replacement (HMR).

---

## 8. Quick Customization Reference

Use this table to find the exact file to edit for each part of your portfolio:

| What to customize | Exact file path | What to change |
|---|---|---|
| **Page Title & Meta Description** | [index.html](file:///c:/port/index.html) | Lines 6–7: Replace `<title>` and `<meta name="description">` |
| **Architect Name & Role** | [src/components/HUDHeader.jsx](file:///c:/port/src/components/HUDHeader.jsx) | Line 64: Tooltip and badge label |
| **Hero Title & Tagline** | [src/views/HeroView.jsx](file:///c:/port/src/views/HeroView.jsx) | Lines 20, 54–55: Change `PORTFOLIO` and subtitle lore text |
| **About Name & Role** | [src/views/AboutView.jsx](file:///c:/port/src/views/AboutView.jsx) | Lines 93–94: Replace `ADHARSHINI KS` and `STUDENT \| AI & ML` |
| **Education Tree & Scores** | [src/views/AboutView.jsx](file:///c:/port/src/views/AboutView.jsx) | Lines 30–72: Replace schools, college degrees, percentages, and CGPA |
| **Resume Link** | [src/views/AboutView.jsx](file:///c:/port/src/views/AboutView.jsx) | Line 8: Replace resume / profile URL in `handleResumeClick` |
| **Architect Dossier Popup** | [src/components/Modals/ArchitectModal.jsx](file:///c:/port/src/components/Modals/ArchitectModal.jsx) | Lines 53–90: Replace dossier name, realm, honors, and bio text |
| **Profile Photos** | `public/assets/avatar.png`<br>`public/assets/architect-portrait.png` | Replace images with your own portrait and avatar |
| **Projects List & Links** | [src/data/projects.js](file:///c:/port/src/data/projects.js) | Edit, add, or remove project objects (titles, descriptions, URLs) |
| **Achievements & Quests** | [src/data/achievements.js](file:///c:/port/src/data/achievements.js) | Edit, add, or remove awards, prizes, and contest wins |
| **Skills & Technologies** | [src/data/skills.js](file:///c:/port/src/data/skills.js) | Edit skill categories, tool names, colors, and logo references |
| **Contact, Phone & Email** | [src/data/contact.js](file:///c:/port/src/data/contact.js) | Replace telephone number, email, and transmission telemetry |
| **Social Links (LinkedIn, GitHub)** | [src/data/contact.js](file:///c:/port/src/data/contact.js) | Lines 11 & 19: Replace LinkedIn and GitHub profile URLs |
| **Weapon Deck Preview Cards** | [src/data/overviewCards.js](file:///c:/port/src/data/overviewCards.js) | Change card titles or map different images to each section |
| **Carousel Behavior & Spacing** | [src/components/CurvedCarousel.jsx](file:///c:/port/src/components/CurvedCarousel.jsx) | Adjust `gap`, card dimensions, or responsive counts |
| **Theme Colors & Fonts** | [src/index.css](file:///c:/port/src/index.css) | Lines 10–35: Customize CSS design variables |

---

## 9. How to Change Personal Information

### 1. Browser Tab Title & Meta Tag
Open [index.html](file:///c:/port/index.html):
```html
<title>Your Name — Portfolio | The Obsidian Scar</title>
<meta name="description" content="Portfolio of Your Name — Fullstack Developer. Explore projects, achievements, and skills." />
```

### 2. Top Header Badge
Open [src/components/HUDHeader.jsx](file:///c:/port/src/components/HUDHeader.jsx):
- Search for `title="Architect: Adharshini KS (Click to inspect)"` and change to your name.

### 3. About Page Hero Title & Subtitle
Open [src/views/AboutView.jsx](file:///c:/port/src/views/AboutView.jsx):
```jsx
<div className="architect-hero-tag">
  <span className="architect-role-sup">THE ARCHITECT</span>
  <h2 className="architect-hero-name">YOUR NAME</h2>
  <span className="architect-hero-role">SOFTWARE ENGINEER | AI & CLOUD</span>
</div>
```

### 4. Architect Dossier Modal
Open [src/components/Modals/ArchitectModal.jsx](file:///c:/port/src/components/Modals/ArchitectModal.jsx):
- Update `dossier-name`: `YOUR NAME`
- Update `dossier-class`: e.g. `Full-Stack Developer & Cloud Architect`
- Update `dossier-stat-box` fields:
  - `PRIMARY REALM`: your core stack (e.g. `React, Node.js & AWS`)
  - `SANCTUARY`: your university, city, or company
  - `HONORS`: your top milestone or hackathon awards
- Update `dossier-bio`: write your personalized 2–3 sentence biography.

---

## 10. How to Replace Images and GIFs

All static images live inside `public/assets/`. You do not need complex import statements—Vite serves files from the `public` folder directly from the root `/assets/...` path.

### Key Asset Map

| Image File | Purpose | Recommended Size | Format |
|---|---|---|---|
| `public/assets/avatar.png` | Circular avatar in header and dossier modal | 200 × 200 px | PNG / WebP (transparent) |
| `public/assets/architect-portrait.png` | Cutout character on About view | ~400 × 600 px | Transparent PNG |
| `public/assets/card-shield.png` | Weapon card 1 (Projects) | 480 × 720 px | PNG / JPG |
| `public/assets/card-sword.png` | Weapon card 2 (Achievements) | 480 × 720 px | PNG / JPG |
| `public/assets/card-bow.png` | Weapon card 3 (Skills) | 480 × 720 px | PNG / JPG |
| `public/assets/card-axe.png` | Weapon card 4 (Contact) | 480 × 720 px | PNG / JPG |
| `public/assets/anim-shield.gif` | Animated relic inside ProjectModal | ~400 × 400 px | Animated GIF |
| `public/assets/anim-sword.gif` | Animated relic inside QuestModal | ~400 × 400 px | Animated GIF |
| `public/assets/anim-bow.gif` | Animated relic inside SkillModal | ~400 × 400 px | Animated GIF |
| `public/assets/hero-anim.gif` | Portal animation on Start Page | 1920 × 1080 px | Animated GIF / WebP |
| `public/assets/temple-real.png` | Background inside codex carousel | 1920 × 1080 px | PNG / JPG |
| `public/assets/logos/*.png` | Skill runes & contact logos | 64 × 64 px to 128 × 128 px | Transparent PNG |

### How to Replace an Image
1. Prepare your image or GIF with the recommended dimensions.
2. For transparent cutouts (avatars, weapon cards, character portraits), use tools like [remove.bg](https://www.remove.bg/) or Photoshop.
3. Save the new image to `public/assets/` using the exact same filename (e.g., `avatar.png`), or change the path in the relevant component.
4. **Hard-refresh your browser** (`Ctrl + F5` or `Cmd + Shift + R`) to bypass browser image caching.

> [!WARNING]
> Do not rename or delete shared cards (`card-shield.png`, `card-sword.png`, etc.) without updating [src/data/overviewCards.js](file:///c:/port/src/data/overviewCards.js).

---

## 11. How to Add Projects

Projects are defined as an array of JavaScript objects in [src/data/projects.js](file:///c:/port/src/data/projects.js).

### Project Data Structure

```javascript
{
  id: 'my-project-id',            // Unique URL-friendly slug
  title: 'PROJECT TITLE',         // Full title in caps
  displayTitle: 'PROJECT\nTITLE', // Title with line break for carousel card
  category: 'QUARTER',            // Tag above title (e.g., WEB APP, MOBILE, AI)
  subtitle: 'TECH STACK SUMMARY', // Short stack label (e.g., REACT & FASTAPI)
  description: 'Detailed description of the problem solved and architecture.',
  github: 'https://github.com/username/project', // GitHub repository link
  website: 'https://my-live-demo.com',           // Optional live demo (or null)
  tags: ['React', 'Python', 'Tailwind', 'Docker'], // Array of technology tags
  artifactType: 'shield'          // Relic icon type
}
```

### Steps to Add a New Project
1. Open [src/data/projects.js](file:///c:/port/src/data/projects.js).
2. Copy an existing object and paste it into the `projects` array.
3. Replace the fields with your project details.
4. Save the file. The new project card will instantly appear inside the **Projects Codex Carousel**.

---

## 12. How to Update Skills and Achievements

### Updating Skills
Skills are grouped by categories in [src/data/skills.js](file:///c:/port/src/data/skills.js). Each category has a list of individual skill runes.

```javascript
{
  id: 'frontend-languages',
  title: 'FRONTEND LANGUAGES',
  displayTitle: 'FRONTEND\nLANGUAGES',
  skills: [
    {
      name: 'REACT',
      type: 'react',
      logo: '/assets/logos/react-removebg-preview.png', // Path in public/
      color: '#61DAFB',                               // Accent border glow
      badgeBg: '#092537'                              // Badge pill background
    },
    // Add more skills here...
  ]
}
```

- To add a new skill logo, drop the transparent PNG into `public/assets/logos/` and reference it in the `logo` field.

### Updating Achievements / Quests
Achievements are defined in [src/data/achievements.js](file:///c:/port/src/data/achievements.js):

```javascript
{
  id: 'hackathon-winner',
  title: 'NATIONAL HACKATHON',
  displayTitle: 'NATIONAL\nHACKATHON',
  subtitle: '1ST PRIZE WINNER',
  questStatus: 'QUEST COMPLETED',
  battlefield: 'Tech Expo 2025',
  timelineMark: '15 / 03 / 2025',
  proofLink: 'https://github.com/username',
  artifactType: 'sword'
}
```

---

## 13. How to Update Education and Experience

Education details are rendered visually as an interactive branching tree in [src/views/AboutView.jsx](file:///c:/port/src/views/AboutView.jsx).

### Changing College / Degree
Locate lines 51–57 in `AboutView.jsx`:
```jsx
<div className="edu-text-card text-right-side">
  <h3 className="edu-degree-title">B.Tech Computer Science</h3>
  <p className="edu-school-name">Your University Name</p>
  <p className="edu-score-badge">CGPA : 8.5 / 10</p>
</div>
```

### Changing Schooling
Locate lines 30–35 and 65–70 in `AboutView.jsx`:
- Edit `Higher Secondary` and `Senior Secondary` school names, boards (CBSE/State), and percentages.

### Changing Experience / Roles
If you have work or internship experience, you can add experience cards directly into [src/data/achievements.js](file:///c:/port/src/data/achievements.js) (the template models professional roles like *Placement Coordinator* or *Software Engineer Intern* as completed quests).

---

## 14. How to Change Social Links and Contact Details

All contact frequencies, phone numbers, email addresses, and social profile links are centralized in [src/data/contact.js](file:///c:/port/src/data/contact.js).

### 1. Social Profiles (LinkedIn & GitHub)
Edit `contactData.mobile.links` and `contactData.mobile.codeLinks`:
```javascript
links: [
  {
    type: 'linkedin',
    label: 'Your Name | LinkedIn',
    url: 'https://www.linkedin.com/in/your-profile'
  }
],
codeLinks: [
  {
    type: 'github',
    label: 'YourHandle | GitHub',
    url: 'https://github.com/your-username'
  }
]
```

### 2. Telephone Channel
Edit `contactData.phone`:
```javascript
number: '+1 (555) 019-2834',
telUrl: 'tel:+15550192834'
```

### 3. Email Channel
Edit `contactData.mail`:
```javascript
email: 'contact@yourdomain.com',
mailUrl: 'mailto:contact@yourdomain.com'
```

---

## 15. How to Customize the Carousel

The 3D curved carousel component is located at [src/components/CurvedCarousel.jsx](file:///c:/port/src/components/CurvedCarousel.jsx). It powers the Projects, Quests, and Skills codex views.

### Safe Parameters to Tweak

| Parameter | Location | Default Value | What it does |
|---|---|---|---|
| `gap` | `CurvedCarousel.jsx:55` | `24` (px) | Horizontal space between adjacent cards |
| `cardWidthActive` | `CurvedCarousel.jsx:51` | `250` (px) | Width of the centered active card |
| `cardHeightActive` | `CurvedCarousel.jsx:52` | `460` (px) | Height of the centered active card |
| `cardWidthInactive`| `CurvedCarousel.jsx:53` | `205` (px) | Width of flanking inactive cards |
| `cardHeightInactive`| `CurvedCarousel.jsx:54`| `410` (px) | Height of flanking inactive cards |
| `maxVisibleDiff` | `CurvedCarousel.jsx:56` | `2` (desktop) | Number of cards visible on each side (total 5) |
| Transition Speed | `src/index.css:959` | `0.4s` | Duration of the card sliding animation |

### How Card Centering and Anti-Overlap Work
The component calculates exact horizontal slot offsets using the formula:
```javascript
const firstOffset = (cardWidthActive / 2) + gap + (cardWidthInactive / 2);
const extraOffset = (absDiff - 1) * (cardWidthInactive + gap);
const translateX = sign * (firstOffset + extraOffset);
```
This guarantees cards will **never physically overlap**, regardless of how many items are added to the data array.

---

## 16. How to Customize Colors, Fonts, and Animations

All design tokens are defined at the very top of [src/index.css](file:///c:/port/src/index.css) (lines 10–40):

```css
:root {
  /* Color Palette */
  --bg-abyss: #05070a;          /* Deep dark background */
  --accent-ember: #ff8c42;      /* Primary orange flame highlight */
  --accent-magma: #ef4444;      /* Fiery red for borders and buttons */
  --accent-cyan: #38bdf8;       /* Tech cyan for HUD elements */
  --text-primary: #ffffff;      /* Main text color */
  --text-muted: rgba(255, 255, 255, 0.7);

  /* Typography */
  --font-serif: 'Cinzel', serif;
  --font-sans: 'Outfit', sans-serif;
  --font-mono: 'Share Tech Mono', monospace;
}
```

### Changing Fonts
1. Open [index.html](file:///c:/port/index.html) and update the Google Fonts `<link>` tag.
2. Update the corresponding font variable in `src/index.css` (e.g. `--font-serif: 'Playfair Display', serif;`).

---

## 17. How to Add a New Section

To add a completely new section (e.g., `testimonials` or `blog`):

1. **Register the Section ID** in [src/App.jsx](file:///c:/port/src/App.jsx):
   - Add your ID to `valid` array in `getInitialSection` and `handleHashChange` (e.g., `['hero', 'about', 'projects', 'quests', 'skills', 'contact', 'blog']`).
2. **Create the View**:
   - Create `src/views/BlogView.jsx` following the pattern in [src/views/ProjectsView.jsx](file:///c:/port/src/views/ProjectsView.jsx).
3. **Render the View in `App.jsx`**:
   ```jsx
   {currentSection === 'blog' && (
     <BlogView onSelectSection={handleSelectSection} />
   )}
   ```
4. **Add to Navigation**:
   - In [src/components/SubNavBar.jsx](file:///c:/port/src/components/SubNavBar.jsx), add a new item with an icon from `lucide-react`.

---

## 18. Build and Deployment

### 1. Build for Production
Run the Vite build command:
```bash
npm run build
```
This outputs a minified, production-ready bundle into the `dist/` directory.

### 2. Preview Locally
Preview your production build to verify assets load properly:
```bash
npm run preview
```

### 3. Deploy to Vercel (Recommended)
1. Push your code to a GitHub repository.
2. Go to [vercel.com](https://vercel.com/) and click **Add New Project**.
3. Import your GitHub repository.
4. Framework Preset: **Vite** (detected automatically).
5. Click **Deploy**.

### 4. Deploy to Netlify
1. Connect your repository on [netlify.com](https://www.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy site**.

### 5. Deploy to GitHub Pages
If deploying to GitHub Pages (`username.github.io/repo-name/`), add your repository name to `base` in [vite.config.js](file:///c:/port/vite.config.js):
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/adhu-portfolio/' // Set to your GitHub repo name
})
```

---

## 19. Troubleshooting

### Images or GIFs Don't Load (404 Error)
- Ensure the image file is placed inside the `public/` folder, NOT inside `src/`.
- File paths must start with a leading slash: `/assets/my-image.png`.
- Linux/hosting servers are case-sensitive: `avatar.PNG` is not the same as `avatar.png`.

### Sound Doesn't Play on First Click
- Browsers require user interaction (a click anywhere on the page) before allowing audio playback. Click any element on the page, and the procedural sound engine will activate.
- Use the sound icon in the top-right header to toggle mute/unmute.

### Port 3000 is Already in Use
- If port 3000 is occupied, Vite will automatically switch to another port (e.g., 3001). Check the terminal output for the active URL, or specify a custom port in `vite.config.js`.

---

## 20. Files Beginners Should Avoid Editing

To prevent breaking layout mathematics, audio synthesis, or route handling, avoid modifying these core files unless you are experienced with React and Canvas:

- **`src/components/CurvedCarousel.jsx`**: Contains 3D geometric positioning calculations for the carousel slots. Edit card data in `src/data/` instead.
- **`src/components/SoundEffects.js`**: Procedural audio synthesizer using Web Audio API oscillator nodes.
- **`src/components/ParticleCanvas.jsx`**: HTML5 canvas rendering loop for volcanic magma particles.
- **`src/main.jsx`**: React root mounting logic.

---

## 21. Final Customization Checklist

Before publishing your portfolio, verify these items:

- [ ] Replaced name, title, and bio in `index.html`, `AboutView.jsx`, and `ArchitectModal.jsx`.
- [ ] Added your own `avatar.png` and `architect-portrait.png` in `public/assets/`.
- [ ] Replaced education history and scores in `AboutView.jsx`.
- [ ] Replaced resume URL in `AboutView.jsx`.
- [ ] Updated projects in `src/data/projects.js` with your own repositories and live links.
- [ ] Updated skills and logos in `src/data/skills.js`.
- [ ] Updated achievements in `src/data/achievements.js`.
- [ ] Replaced LinkedIn, GitHub, email, and phone in `src/data/contact.js`.
- [ ] Tested local build with `npm run build` and `npm run preview`.
- [ ] Committed and pushed to your personal GitHub repository.

---

## License

This template is open-source and free for personal portfolio use. Feel free to fork, customize, and make it your own!
