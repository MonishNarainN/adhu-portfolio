import { spawn } from 'child_process';
import http from 'http';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\port\\temp_chrome_test';
const port = 9223;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

class CDPClient {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.id = 1;
    this.callbacks = new Map();
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl);
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve;
      this.ws.onerror = reject;
    });

    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id);
        this.callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = this.id++;
      this.callbacks.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expr) {
    const res = await this.send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true
    });
    if (res.exceptionDetails) {
      throw new Error(`Eval error: ${JSON.stringify(res.exceptionDetails)}`);
    }
    return res.result?.value;
  }

  close() {
    if (this.ws) this.ws.close();
  }
}

async function runTests() {
  console.log('--- Starting Portfolio Automated Test Suite ---');

  // Spawn headless chrome with debugging port
  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${userDataDir}`,
    '--window-size=1600,900',
    'about:blank'
  ]);

  let connected = false;
  let client;

  try {
    for (let i = 0; i < 20; i++) {
      await sleep(300);
      try {
        const list = await getJson(`http://127.0.0.1:${port}/json/list`);
        if (list.length > 0 && list[0].webSocketDebuggerUrl) {
          client = new CDPClient(list[0].webSocketDebuggerUrl);
          await client.connect();
          connected = true;
          break;
        }
      } catch {}
    }

    if (!connected) {
      throw new Error('Failed to connect to Chrome CDP endpoint');
    }

    console.log('CDP Connected successfully.');
    await client.send('Page.enable');
    await client.send('DOM.enable');

    const results = [];

    async function test(name, fn) {
      try {
        await fn();
        console.log(`PASS: ${name}`);
        results.push({ name, pass: true });
      } catch (err) {
        console.error(`FAIL: ${name} -> ${err.message}`);
        results.push({ name, pass: false, error: err.message });
      }
    }

    // 1. Initial Navigation
    await test('Navigate to http://localhost:3000/#projects', async () => {
      await client.send('Page.navigate', { url: 'http://localhost:3000/#projects' });
      await sleep(2500);
      const url = await client.eval(`window.location.href`);
      const bodyLen = await client.eval(`document.body.innerHTML.length`);
      console.log(`  Page loaded: url=${url}, bodyLength=${bodyLen}`);
      const title = await client.eval(`document.querySelector('.overview-title')?.textContent.trim()`);
      if (title !== 'PROJECTS') {
        const h1 = await client.eval(`document.querySelector('h1')?.textContent.trim()`);
        const rootHtml = await client.eval(`document.getElementById('root')?.innerHTML.substring(0, 300)`);
        console.log(`  Debug: h1="${h1}", rootHtml="${rootHtml}"`);
        throw new Error(`Expected PROJECTS, got ${title}`);
      }

      const shieldActive = await client.eval(`
        document.getElementById('preview-card-shield')?.classList.contains('card-primary')
      `);
      if (!shieldActive) throw new Error('Shield card should have .card-primary');

      const subNavActive = await client.eval(`
        document.querySelector('.about-nav-icon-btn.active .nav-icon-label')?.textContent.trim()
      `);
      if (subNavActive !== 'PROJECTS') throw new Error(`Subnav active label is ${subNavActive}, expected PROJECTS`);
    });

    // 2. Click Sword Card -> Navigates to ACHIEVEMENTS
    await test('Click Card 2 (Sword) -> Activates Quests/Achievements Section & Card', async () => {
      await client.eval(`document.getElementById('preview-card-sword')?.click()`);
      await sleep(500);

      const title = await client.eval(`document.querySelector('.overview-title')?.textContent.trim()`);
      if (title !== 'ACHIEVEMENTS') throw new Error(`Expected ACHIEVEMENTS, got ${title}`);

      const hash = await client.eval(`window.location.hash`);
      if (hash !== '#quests') throw new Error(`Expected hash #quests, got ${hash}`);

      const swordActive = await client.eval(`
        document.getElementById('preview-card-sword')?.classList.contains('card-primary')
      `);
      if (!swordActive) throw new Error('Sword card should have .card-primary');

      const subNavActive = await client.eval(`
        document.querySelector('.about-nav-icon-btn.active .nav-icon-label')?.textContent.trim()
      `);
      if (subNavActive !== 'ACHIEVEMENTS') throw new Error(`Subnav active label is ${subNavActive}, expected ACHIEVEMENTS`);
    });

    // 3. Click Bow Card -> Navigates to SKILLS
    await test('Click Card 3 (Bow) -> Activates Skills Section & Card', async () => {
      await client.eval(`document.getElementById('preview-card-bow')?.click()`);
      await sleep(500);

      const title = await client.eval(`document.querySelector('.overview-title')?.textContent.trim()`);
      if (title !== 'SKILLS') throw new Error(`Expected SKILLS, got ${title}`);

      const hash = await client.eval(`window.location.hash`);
      if (hash !== '#skills') throw new Error(`Expected hash #skills, got ${hash}`);

      const bowActive = await client.eval(`
        document.getElementById('preview-card-bow')?.classList.contains('card-primary')
      `);
      if (!bowActive) throw new Error('Bow card should have .card-primary');

      const subNavActive = await client.eval(`
        document.querySelector('.about-nav-icon-btn.active .nav-icon-label')?.textContent.trim()
      `);
      if (subNavActive !== 'SKILLS') throw new Error(`Subnav active label is ${subNavActive}, expected SKILLS`);
    });

    // 4. Click Axe Card -> Navigates to CONTACT
    await test('Click Card 4 (Axe) -> Activates Contact Section & Displays All Cards', async () => {
      await client.eval(`document.getElementById('preview-card-axe')?.click()`);
      await sleep(500);

      const title = await client.eval(`document.querySelector('.overview-title')?.textContent.trim()`);
      if (title !== 'CONTACT') throw new Error(`Expected CONTACT, got ${title}`);

      const hash = await client.eval(`window.location.hash`);
      if (hash !== '#contact') throw new Error(`Expected hash #contact, got ${hash}`);

      const axeActive = await client.eval(`
        document.getElementById('preview-card-axe')?.classList.contains('card-primary')
      `);
      if (!axeActive) throw new Error('Axe card should have .card-primary');

      const cardCount = await client.eval(`document.querySelectorAll('.overview-preview-card').length`);
      if (cardCount !== 4) throw new Error(`Expected 4 preview cards in contact deck, got ${cardCount}`);

      const subNavActive = await client.eval(`
        document.querySelector('.about-nav-icon-btn.active .nav-icon-label')?.textContent.trim()
      `);
      if (subNavActive !== 'CONTACT') throw new Error(`Subnav active label is ${subNavActive}, expected CONTACT`);
    });

    // 5. Click Shield Card -> Navigates back to PROJECTS
    await test('Click Card 1 (Shield) -> Returns to Projects Section', async () => {
      await client.eval(`document.getElementById('preview-card-shield')?.click()`);
      await sleep(500);

      const title = await client.eval(`document.querySelector('.overview-title')?.textContent.trim()`);
      if (title !== 'PROJECTS') throw new Error(`Expected PROJECTS, got ${title}`);

      const hash = await client.eval(`window.location.hash`);
      if (hash !== '#projects') throw new Error(`Expected hash #projects, got ${hash}`);

      const shieldActive = await client.eval(`
        document.getElementById('preview-card-shield')?.classList.contains('card-primary')
      `);
      if (!shieldActive) throw new Error('Shield card should have .card-primary');
    });

    // 6. Keyboard navigation (Arrow keys cycle sections)
    await test('ArrowLeft / ArrowRight Keyboard Navigation across Sections', async () => {
      await client.eval(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))`);
      await sleep(300);
      let hash = await client.eval(`window.location.hash`);
      if (hash !== '#quests') throw new Error(`Expected #quests after ArrowRight, got ${hash}`);

      await client.eval(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))`);
      await sleep(300);
      hash = await client.eval(`window.location.hash`);
      if (hash !== '#skills') throw new Error(`Expected #skills after ArrowRight, got ${hash}`);

      await client.eval(`window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))`);
      await sleep(300);
      hash = await client.eval(`window.location.hash`);
      if (hash !== '#quests') throw new Error(`Expected #quests after ArrowLeft, got ${hash}`);
    });

    // 7. EXPLORE Button independently activates Codex View
    await test('EXPLORE Button Independent Activation -> Enters The Obsidian Scar', async () => {
      // Go to #skills
      await client.send('Page.navigate', { url: 'http://localhost:3000/#skills' });
      await sleep(800);

      const exploreBtn = await client.eval(`document.getElementById('explore-btn-skills') !== null`);
      if (!exploreBtn) throw new Error('Explore button not found');

      // Click EXPLORE
      await client.eval(`document.getElementById('explore-btn-skills').click()`);
      await sleep(800);

      const isObsidianScar = await client.eval(`
        document.querySelector('.skills-view') !== null &&
        document.querySelector('.carousel-stage-container') !== null
      `);
      if (!isObsidianScar) throw new Error('Failed to enter Obsidian Scar carousel view');
    });

    // 8. Skill Carousel Card Non-Overlap & Alignment Verification
    await test('Skills Carousel Layout: 5 Cards Displayed with Zero Overlap', async () => {
      const cardsInfo = await client.eval(`
        (() => {
          const cards = Array.from(document.querySelectorAll('.carousel-card'));
          return cards.map(c => {
            const rect = c.getBoundingClientRect();
            const title = c.querySelector('.card-title')?.textContent.trim();
            const isCenter = c.classList.contains('card-center');
            return {
              id: c.id,
              title,
              isCenter,
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              height: Math.round(rect.height),
              top: Math.round(rect.top),
              bottom: Math.round(rect.bottom)
            };
          });
        })()
      `);

      if (cardsInfo.length !== 5) {
        throw new Error(`Expected 5 skill cards, found ${cardsInfo.length}`);
      }

      console.log('Cards detected:');
      cardsInfo.forEach(c => console.log(`  - [${c.id}] "${c.title}" left=${c.left} right=${c.right} w=${c.width} isCenter=${c.isCenter}`));

      // Sort cards from left to right by left coordinate
      const sorted = [...cardsInfo].sort((a, b) => a.left - b.left);

      // Verify Center card is Frontend Languages
      const centerCard = cardsInfo.find(c => c.isCenter);
      if (!centerCard || !centerCard.title.includes('FRONTEND')) {
        throw new Error(`Expected Frontend Languages to be center card, got ${centerCard?.title}`);
      }

      // Check overlap between consecutive cards
      for (let i = 0; i < sorted.length - 1; i++) {
        const current = sorted[i];
        const next = sorted[i + 1];
        const gap = next.left - current.right;
        console.log(`  Gap between "${current.title}" and "${next.title}": ${gap}px`);
        if (gap < 0) {
          throw new Error(`OVERLAP DETECTED! "${current.title}" right (${current.right}) overlaps "${next.title}" left (${next.left}) by ${-gap}px`);
        }
        if (gap < 15) {
          throw new Error(`Gap too small (${gap}px) between "${current.title}" and "${next.title}"`);
        }
      }

      // Verify navigation arrows are outside cards
      const arrowsInfo = await client.eval(`
        (() => {
          const prev = document.getElementById('carousel-btn-prev')?.getBoundingClientRect();
          const next = document.getElementById('carousel-btn-next')?.getBoundingClientRect();
          return {
            prev: prev ? { left: prev.left, right: prev.right } : null,
            next: next ? { left: next.left, right: next.right } : null
          };
        })()
      `);

      if (!arrowsInfo.prev || !arrowsInfo.next) {
        throw new Error('Navigation arrows not found');
      }

      const leftmostCard = sorted[0];
      const rightmostCard = sorted[sorted.length - 1];

      if (arrowsInfo.prev.right > leftmostCard.left) {
        throw new Error(`Left arrow (${arrowsInfo.prev.right}) overlaps leftmost card (${leftmostCard.left})`);
      }
      if (arrowsInfo.next.left < rightmostCard.right) {
        throw new Error(`Right arrow (${arrowsInfo.next.left}) overlaps rightmost card (${rightmostCard.right})`);
      }
      console.log(`  Arrow clearances: Left=${leftmostCard.left - arrowsInfo.prev.right}px, Right=${arrowsInfo.next.left - rightmostCard.right}px`);
    });

    // 9. Carousel Navigation Buttons
    await test('Skills Carousel Navigation: Next & Prev Arrows Cycle Active Card', async () => {
      // Click Next
      await client.eval(`document.getElementById('carousel-btn-next')?.click()`);
      await sleep(600);

      const nextCenter = await client.eval(`
        document.querySelector('.carousel-card.card-center .card-title')?.textContent.trim()
      `);
      if (!nextCenter || !nextCenter.includes('BACKEND')) {
        throw new Error(`Expected Backend Languages after Next, got ${nextCenter}`);
      }

      // Click Prev
      await client.eval(`document.getElementById('carousel-btn-prev')?.click()`);
      await sleep(600);

      const returnCenter = await client.eval(`
        document.querySelector('.carousel-card.card-center .card-title')?.textContent.trim()
      `);
      if (!returnCenter || !returnCenter.includes('FRONTEND')) {
        throw new Error(`Expected Frontend Languages after Prev, got ${returnCenter}`);
      }
    });

    // 10. UNLOCK Action & Modal Test
    await test('Card UNLOCK Button -> Opens Skill Codex Modal & Closes Cleanly', async () => {
      await client.eval(`document.getElementById('unlock-frontend')?.click()`);
      await sleep(600);

      const modalOpen = await client.eval(`document.querySelector('.modal-backdrop') !== null`);
      if (!modalOpen) throw new Error('Skill modal did not open upon UNLOCK');

      const modalTitle = await client.eval(`
        document.querySelector('.modal-title')?.textContent.trim()
      `);
      if (!modalTitle || !modalTitle.includes('FRONTEND')) {
        throw new Error(`Expected modal title to contain FRONTEND, got ${modalTitle}`);
      }

      // Close modal
      await client.eval(`document.querySelector('.modal-close-btn')?.click()`);
      await sleep(500);

      const modalClosed = await client.eval(`document.querySelector('.modal-backdrop') === null`);
      if (!modalClosed) throw new Error('Skill modal did not close');
    });

    console.log('\n--- Test Summary ---');
    const passed = results.filter(r => r.pass).length;
    const total = results.length;
    console.log(`Passed: ${passed} / ${total}`);

    if (passed !== total) {
      process.exit(1);
    }
  } finally {
    if (client) client.close();
    chromeProc.kill();
  }
}

runTests().catch(err => {
  console.error('Test script failed:', err);
  process.exit(1);
});
