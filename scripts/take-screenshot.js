import { execSync } from 'child_process';
import path from 'path';

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const userDataDir = 'C:\\port\\temp_chrome';

const targets = [
  { url: 'http://localhost:3000/#quests', file: 'C:\\port\\public\\shot-quests-updated.png', size: '1600,900' },
  { url: 'http://localhost:3000/#projects', file: 'C:\\port\\public\\shot-projects-updated.png', size: '1600,900' }
];

for (const t of targets) {
  const cmd = `"${chromePath}" --headless=new --disable-gpu --virtual-time-budget=3000 --user-data-dir="${userDataDir}" --screenshot="${t.file}" --window-size=${t.size} "${t.url}"`;
  console.log(`Shooting ${t.url} (${t.size}) -> ${path.basename(t.file)}`);
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (e) {
    console.error(e.message);
  }
}
