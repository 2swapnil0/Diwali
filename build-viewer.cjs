// Reuse the public compiled renderer to produce a standalone local HTML viewer.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = __dirname;
const modules = new Map();
const cache = new Map();
const context = vm.createContext({ console, globalThis: { TURBOPACK: { push(chunk) {
  for (let n = 1; n < chunk.length;) {
    const ids = [];
    while (typeof chunk[n] === 'number') ids.push(chunk[n++]);
    const factory = chunk[n++];
    if (typeof factory === 'function') for (const id of ids) modules.set(id, factory);
  }
} } } });
for (const file of ['27miaz7__i2xb.js', '3-da3bt9m_6lv.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, '_next/static/chunks', file), 'utf8'), context);
}
function load(id) {
  if (id === 70211) return { default: { get() {}, set() {}, remove() {} } };
  if (cache.has(id)) return cache.get(id);
  const exports = {};
  cache.set(id, exports);
  const mod = { exports };
  const runtime = {
    i: load,
    s(entries) {
      for (let i = 0; i < entries.length; i += 3) exports[entries[i]] = entries[i + 2];
    }
  };
  const factory = modules.get(id);
  if (!factory) throw new Error('Missing module ' + id);
  factory(runtime, mod, exports);
  if (mod.exports !== exports) exports.default = mod.exports;
  return exports;
}
const data = JSON.parse(fs.readFileSync(path.join(root, 'personalization.json'), 'utf8'));
if (!fs.existsSync(path.join(root, 'audio/voice-note.m4a'))) {
  throw new Error('Missing audio/voice-note.m4a');
}
const config = load(12595).diwaliStyledConfig(data, { style: 'classic', mode: 'light' });
// Present the full personal message as a letter. No photo gallery is needed.
config.flow = ['landing', 'diya', 'letter', 'lanterns', 'voice', 'crackers', 'ending'];
delete config.steps.notes;
delete config.steps.gallery;
for (const key of Object.keys(config.gifs)) {
  if (key.startsWith('photo_')) delete config.gifs[key];
}
config.landing.greeting = 'Happy Diwali, sweetheart! ❤️🪔';
config.landing.line = 'A little Diwali letter, just for you.';
config.landing.button = 'Open My Diwali 💌';
config.steps.diya.button = 'Read my letter 💌';
config.steps.crackers.button = 'One last thing 🪔';
config.letter = {
  title: 'A Diwali letter for you 💌',
  envelopeLabel: 'To my sweetheart',
  tapHint: 'Tap to open',
  seal: '❤️',
  salutation: 'My sweetheart, ❤️🪔',
  paragraphs: data.letterParagraphs,
  signoff: '',
  signature: `Sent with love from ${data.yourName}`,
  button: 'See my three wishes 🏮',
  typed: false,
  paper: 'card',
};
config.steps.lanterns = {
  title: 'Three wishes for you 🏮',
  subtitle: 'Tap each lantern to open a wish',
  doneSubtitle: 'Every wish is for you 💛',
  closeLabel: 'Let it fly 🏮',
  outro: 'May all three find their way to you ✨',
  button: 'Hear my message 🎵',
  items: data.wishes.map(wish => ({ label: wish.label, emoji: wish.emoji, note: wish.message })),
};
config.steps.voice = {
  title: 'A Message for You 🎵',
  subtitle: 'A little song from me to you, Bachu.',
  button: "Let's light some crackers 🎆",
};
config.ending.name = 'sweetheart!';
config.ending.message = 'Happy Diwali, sweetheart. I love you. ❤️🪔';
config.ending.footnote = `🪔 Sent with love from ${data.yourName}`;
config.autoplay = false;
let html = load(75159).renderStyledHtml(config)
  .replace('<head>', '<head><link rel="icon" href="/icon.svg" type="image/svg+xml">')
  .replace('</head>', `<style>
    [data-style="classic"] .paper.card { color: #3a1d2b; }
    [data-style="classic"] .paper.card .lp:not(:first-child):not(.sig) {
      font: 500 19px/1.65 var(--body);
    }
    #s-lanterns .ln small {
      color: #fff3dc;
      text-shadow: 0 1px 6px #120720;
    }
    #s-lanterns .wish-card {
      width: min(100%, 360px);
      padding: 16px 18px;
      margin: 4px auto;
      border: 1px solid #ffc24a;
      border-radius: 18px;
      background: #2b1238;
      color: #fff3dc;
      box-shadow: 0 8px 26px #12072080;
      text-align: center;
      animation: fadeUp .5s both;
    }
    #s-lanterns .wish-card strong {
      display: block;
      color: #ffc24a;
      font: 700 20px/1.3 var(--display);
      margin-bottom: 8px;
    }
    #s-lanterns .wish-card span {
      display: block;
      font: 500 16px/1.5 var(--body);
    }
    #s-voice .voice-card {
      width: min(100%, 380px);
      margin: 18px auto;
      padding: 28px 20px;
      border: 1px solid #ffc24a;
      border-radius: 24px;
      background: #2b1238;
      color: #fff3dc;
      box-shadow: 0 14px 38px #12072080;
    }
    #s-voice .voice-icon {
      font-size: 64px;
      margin-bottom: 14px;
      filter: drop-shadow(0 0 16px #ffc24a80);
    }
    #s-voice .voice-description {
      font: 600 17px/1.5 var(--body);
      margin-bottom: 18px;
    }
    #s-voice .voice-audio {
      display: block;
      width: 100%;
      accent-color: #e8590c;
    }
    #s-voice .voice-caption {
      margin-top: 16px;
      color: #ffc24a;
      font: 600 15px/1.5 var(--body);
    }
  </style></head>`);
const temporaryNote = `if (!it.gif) {
          const note = el('p', 'ln-note', it.note || it.caption || '✨'); Object.assign(note.style, { left: \`clamp(95px, \${x}%, calc(100% - 95px))\`, top: ln.style.top });
          sky.appendChild(note); setTimeout(() => note.remove(), 3000);
          away(ln); finished(); return;
        }`;
const lastingWish = `if (!it.gif) {
          const note = el('div', 'wish-card');
          note.append(el('strong', null, (it.emoji || '✨') + ' ' + (it.label || 'A wish for you')), el('span', null, it.note || '✨'));
          box.appendChild(note);
          away(ln); finished();
          setTimeout(() => note.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' }), 150);
          return;
        }`;
if (!html.includes(temporaryNote)) throw new Error('Lantern renderer changed; cannot add lasting wishes');
html = html.replace(temporaryNote, lastingWish);
html = html.replace("'Set lantern ' + (i + 1) + ' free'", "'Open wish ' + (i + 1)");
const scrollNextButton = "if (b.scrollIntoView) b.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });";
if (!html.includes(scrollNextButton)) throw new Error('Next-button renderer changed');
html = html.replace(scrollNextButton, "if (scene !== 'lanterns' && b.scrollIntoView) b.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' });");
const extraSteps = "const EXTRA = ['timeline'";
if (!html.includes(extraSteps)) throw new Error('Step renderer changed; cannot insert voice scene');
html = html.replace(extraSteps, "const EXTRA = ['voice','timeline'");
const voiceScene = `
  enter.voice = () => {
    const box = stage('voice');
    const card = el('div', 'voice-card');
    const icon = el('div', 'voice-icon', '🎙️');
    const description = el('p', 'voice-description', 'A little song, just for you. Tap play when you’re ready.');
    const player = el('audio', 'voice-audio');
    player.controls = true;
    player.preload = 'metadata';
    player.src = '/audio/voice-note.m4a';
    player.setAttribute('aria-label', 'A song from Swapnil for Bachu');
    const caption = el('p', 'voice-caption', 'With love, from Swapnil ❤️');
    card.append(icon, description, player, caption);
    box.appendChild(card);
    const bgm = $('bgm');
    const musicToggle = $('bgm-toggle');
    const musicToggleWasHidden = musicToggle.hidden;
    const musicToggleDisplay = musicToggle.style.display;
    const resumeMusic = !bgm.paused;
    let voiceActive = true;
    const silenceBackground = () => { if (voiceActive) bgm.pause(); };
    bgm.addEventListener('play', silenceBackground);
    bgm.pause();
    musicToggle.hidden = true;
    musicToggle.style.display = 'none';
    leave.voice = () => {
      voiceActive = false;
      player.pause();
      player.currentTime = 0;
      bgm.removeEventListener('play', silenceBackground);
      musicToggle.hidden = musicToggleWasHidden;
      musicToggle.style.display = musicToggleDisplay;
      if (resumeMusic) bgm.play().catch(() => {});
    };
    showBtn('voice-btn', S.voice.button, 'voice');
  };
`;
if (!html.includes('const enter = {};')) throw new Error('Scene renderer changed; cannot insert voice player');
html = html.replace('const enter = {};', 'const enter = {};\n' + voiceScene);
fs.writeFileSync(path.join(root, 'local-view.html'), html);
fs.writeFileSync(path.join(root, 'index.html'), html);
const configTag = /(<script type="application\/json" id="gift-config">)([\s\S]*?)(<\/script>)/;
if (!configTag.test(html)) throw new Error('Missing viewer configuration in generated HTML');
const previewConfig = { ...config, startAt: 'voice', autoplay: false };
const previewJson = JSON.stringify(previewConfig).replace(/<\//g, '<\\/').replace(/<!/g, '<\\u0021');
fs.writeFileSync(path.join(root, 'voice-preview.html'), html.replace(configTag, (_match, open, _json, close) => open + previewJson + close));
fs.writeFileSync(path.join(root, 'viewer-config.json'), JSON.stringify(config, null, 2));
console.log('Built standalone viewer with', config.flow.join(' → '));
