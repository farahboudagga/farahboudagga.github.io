/* =====================================================================
   main.js  -  THE BEHAVIOR OF THE PORTFOLIO
   =====================================================================
   You normally do NOT need to edit this file: your data is in config.js.
   (Only the terminal answers in section 9 contain a few texts.)

   TABLE OF CONTENTS
     0.  Helpers
     1.  Fill the page from config.js (email, links, CV, photo)
     2.  Language (EN / FR) and theme (light / dark)
     3.  Hero: animated title + typing words
     4.  Projects, stats and skills banner
     5.  Background particles
     6.  Pointer effects (cursor, tilt, magnetic buttons)
     7.  Scroll effects (reveal, progress bar, active menu)
     8.  Experience tabs
     9.  Terminal
    10.  Community: tabs, photo deck, lightbox
    11.  Contact: copy email + contact form
    12.  Navbar: underline, LinkedIn pill, mobile menu
    13.  Start (preloader)
   ===================================================================== */


/* =====================================================================
   0. HELPERS
   ===================================================================== */
const $  = (selector, root = document) => root.querySelector(selector);       // first match
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)]; // all matches

// RM   = the visitor asked for fewer animations (accessibility)
// FINE = the visitor has a mouse (not a touch screen)
const RM   = matchMedia('(prefers-reduced-motion:reduce)').matches;
const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;

const R = document.documentElement;   // the <html> element
let lang = 'en';                      // current language: 'en' or 'fr'

// L(["English", "Français"]) returns the text in the current language
const L = pair => pair[lang === 'fr' ? 1 : 0];

// Makes a text safe to put inside an HTML attribute
const esc = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');


/* =====================================================================
   1. FILL THE PAGE FROM config.js
   Every element with a data-... attribute in index.html is filled here.
   ===================================================================== */
function fillFromConfig() {
  // Portrait photo (all <img class="ph">)
  $$('.ph').forEach(img => img.src = CONFIG.images.portrait);

  // Name, initials, year
  $$('[data-name]').forEach(e => e.textContent = CONFIG.name);
  $$('[data-initials]').forEach(e => e.textContent = CONFIG.initials);
  $$('[data-year]').forEach(e => e.textContent = new Date().getFullYear());

  // Email: text + mailto link
  $$('[data-email]').forEach(e => e.textContent = CONFIG.email);
  $$('[data-email-link]').forEach(e => e.href = 'mailto:' + CONFIG.email);

  // LinkedIn + GitHub
  $$('[data-linkedin-link]').forEach(e => e.href = CONFIG.linkedin.url);
  $$('[data-linkedin-handle]').forEach(e => e.textContent = CONFIG.linkedin.handle);
  $$('[data-github-link]').forEach(e => e.href = CONFIG.github.url);
  $$('[data-github-handle]').forEach(e => e.textContent = CONFIG.github.handle);

  // CV: every "download my CV" link
  $$('[data-cv-link]').forEach(e => {
    e.href = CONFIG.cv.file;
    e.setAttribute('download', CONFIG.cv.downloadName);
  });
}
fillFromConfig();   // must run first (the navbar card is copied later in section 12)


/* =====================================================================
   2. LANGUAGE (EN / FR) AND THEME (LIGHT / DARK)
   Any element with data-fr="..." is translated: the English text is kept
   in data-en the first time, then swapped when the language changes.
   ===================================================================== */
function updateThemeLabel() {
  const isLight = R.dataset.theme != 'dark';
  $('#th').textContent = lang == 'fr' ? (isLight ? 'Sombre' : 'Clair') : (isLight ? 'Dark' : 'Light');
}

function setLang(l) {
  lang = l;
  R.lang = l;
  $$('[data-fr]').forEach(e => {
    if (!e.dataset.en) e.dataset.en = e.innerHTML;          // remember the English text
    e.innerHTML = l == 'fr' ? e.dataset.fr : e.dataset.en;
  });
  $('#lang').textContent = l == 'fr' ? 'EN' : 'FR';
  $('#h1').setAttribute('aria-label', L(CONFIG.headline));

  // Re-draw everything that is built by JavaScript, in the new language
  renderHeadline();
  renderProjects();
  renderCommunity();
  renderExperience();
  updateThemeLabel();
  updateLinkedInPill();
  setTimeout(moveIndicator, 80);

  // Restart the typing animation
  typeChar = 0; typeDeleting = false; typeLoop();
}
$('#lang').onclick = () => setLang(lang == 'fr' ? 'en' : 'fr');

$('#th').onclick = () => {
  R.dataset.theme = R.dataset.theme == 'dark' ? 'light' : 'dark';
  updateThemeLabel();
  readAccentColor();
};


/* =====================================================================
   3. HERO: ANIMATED TITLE + TYPING WORDS
   ===================================================================== */
// Big title: every letter slides up one after the other
function renderHeadline() {
  $('#h1').innerHTML = L(CONFIG.headline).split(' ').map((word, k) =>
    `<span class="wd">${[...word].map((c, i) =>
      `<i aria-hidden="true" style="--d2:${k * 90 + i * 16}ms">${c}</i>`).join('')}</span>`
  ).join(' ');
}

// "I work on ..." typing effect
let typeWord = 0, typeChar = 0, typeDeleting = false, typeTimer;
function typeLoop() {
  clearTimeout(typeTimer);
  const word = L(CONFIG.typingWords[typeWord]);
  if (RM) { $('#tw').textContent = word; return; }       // no animation if reduced motion

  typeChar += typeDeleting ? -1 : 1;
  $('#tw').textContent = word.slice(0, typeChar);

  let delay = typeDeleting ? 35 : 75;
  if (!typeDeleting && typeChar == word.length) { typeDeleting = true; delay = 1400; }   // pause at the end of the word
  else if (typeDeleting && typeChar == 0) {                                              // go to the next word
    typeDeleting = false;
    typeWord = (typeWord + 1) % CONFIG.typingWords.length;
    delay = 300;
  }
  typeTimer = setTimeout(typeLoop, delay);
}


/* =====================================================================
   4. PROJECTS, STATS AND SKILLS BANNER
   ===================================================================== */
// Project cards (from CONFIG.projects)
function renderProjects() {
  $('#pg').innerHTML = CONFIG.projects.map(p => `
    <article class="pc tl3">
      <div class="im">
        <img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="lazy">
        <div class="ov"><ul>${p.features.map(f => `<li>${L(f)}</li>`).join('')}</ul></div>
      </div>
      <div class="pb">
        <span class="mu">${L(p.period)}</span>
        <h3>${p.name}</h3>
        <p>${L(p.description)}</p>
        <div class="chs">${p.stack.map(s => `<span class="ch">${s}</span>`).join('')}</div>
        ${p.github ? `<a class="btn o mag" href="${esc(p.github)}" target="_blank" rel="noopener">GitHub ↗</a>` : ''}
      </div>
    </article>`).join('');
  bindPointerEffects();
}

// Animated numbers (from CONFIG.stats). The counting animation is in section 7.
function renderStats() {
  $('#stats').innerHTML = CONFIG.stats.map(s =>
    `<div><b data-n="${s.value}">0</b><span data-fr="${esc(s.label[1])}">${s.label[0]}</span></div>`).join('');
}

// Two scrolling banners (from CONFIG.skills). Each list is repeated 4 times so the loop never shows a gap.
function renderSkillsBanner() {
  const repeat = list => [...list, ...list, ...list, ...list].map(t => `<span>${t}</span>`).join('');
  $('#m1').innerHTML = repeat(CONFIG.skills.slice(0, 9));
  $('#m2').innerHTML = repeat(CONFIG.skills.slice(9));
}


/* =====================================================================
   5. BACKGROUND PARTICLES (small floating dots)
   ===================================================================== */
const cv = $('#cv'), cx = cv.getContext('2d');
let pts = [], mx = -999, my = -999, ac = '#C8102E';   // mx/my = mouse position, ac = accent color

function readAccentColor() { ac = getComputedStyle(R).getPropertyValue('--ac').trim(); }

function resizeCanvas() {
  cv.width = innerWidth; cv.height = innerHeight;
  const count = innerWidth < 700 ? 14 : 28;             // fewer dots on phones
  pts = Array.from({ length: count }, () => ({
    x: Math.random() * cv.width, y: Math.random() * cv.height,
    vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25
  }));
}

function drawParticles() {
  cx.clearRect(0, 0, cv.width, cv.height);
  cx.fillStyle = ac; cx.strokeStyle = ac;
  for (const p of pts) {
    // dots are pushed away from the mouse and linked to it by a thin line
    const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
    if (d < 120) {
      p.x += dx / d; p.y += dy / d;
      cx.globalAlpha = .2 * (1 - d / 120);
      cx.beginPath(); cx.moveTo(p.x, p.y); cx.lineTo(mx, my); cx.stroke();
    }
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > cv.width)  p.vx *= -1;         // bounce on the borders
    if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    cx.globalAlpha = .28;
    cx.beginPath(); cx.arc(p.x, p.y, 1.5, 0, 7); cx.fill();
  }
  if (!RM) requestAnimationFrame(drawParticles);
}
addEventListener('resize', resizeCanvas);
resizeCanvas(); readAccentColor(); drawParticles();


/* =====================================================================
   6. POINTER EFFECTS (only with a mouse)
   ===================================================================== */
let curX = 0, curY = 0, ringX = 0, ringY = 0;

// Called every time new cards/buttons are drawn
function bindPointerEffects() {
  if (!FINE || RM) return;
  // Project cards tilt toward the mouse
  $$('.tl3').forEach(card => {
    card.onpointermove = e => {
      const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      card.style.transform = `rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
    };
    card.onpointerleave = () => card.style.transform = '';
  });
  // "Magnetic" buttons follow the mouse a little
  $$('.mag').forEach(b => {
    b.onpointermove = e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .2}px,${(e.clientY - r.top - r.height / 2) * .3}px)`;
    };
    b.onpointerleave = () => b.style.transform = '';
  });
  // The cursor ring grows over links and buttons
  $$('a,button,.pc').forEach(e => {
    e.onpointerenter = () => $('#cr').classList.add('h');
    e.onpointerleave = () => $('#cr').classList.remove('h');
  });
}

if (FINE && !RM) {
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY; curX = e.clientX; curY = e.clientY;
    $('#cu').style.transform = `translate(${curX}px,${curY}px)`;                       // small dot cursor
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    $('#st').style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`;        // hero photo 3D tilt
  });
  // The ring follows the mouse with a small delay (smooth)
  (function followRing() {
    ringX += (curX - ringX) * .18; ringY += (curY - ringY) * .18;
    $('#cr').style.transform = `translate(${ringX}px,${ringY}px)`;
    requestAnimationFrame(followRing);
  })();
  // Color spotlight on the hero photo
  $('#bl').onpointermove = e => {
    const t = e.currentTarget, r = t.getBoundingClientRect();
    t.style.setProperty('--mx', e.clientX - r.left + 'px');
    t.style.setProperty('--my', e.clientY - r.top + 'px');
  };
}


/* =====================================================================
   7. SCROLL EFFECTS
   ===================================================================== */
// 7a. Reveal: elements with class "rv" fade in; numbers count up
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  entry.target.classList.add('in');
  $$('[data-n]', entry.target).forEach(n => {
    const target = +n.dataset.n, start = performance.now();
    (function count(now) {
      const k = Math.min(1, (now - start) / 1300);
      n.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));   // ease-out
      if (k < 1) requestAnimationFrame(count);
    })(start);
  });
  revealObserver.unobserve(entry.target);
}), { threshold: .15 });
$$('.rv').forEach(e => revealObserver.observe(e));

// 7b. Highlight the menu link of the section you are reading
function updateActiveNav() {
  let current = '';
  const line = innerHeight * .4;
  $$('main section').forEach(s => { if (s.getBoundingClientRect().top <= line) current = s.id; });
  if (innerHeight + scrollY >= R.scrollHeight - 6) current = 'contact';       // bottom of the page
  $$('nav [data-s]').forEach(a => a.classList.toggle('on', a.dataset.s == current));
  moveIndicator();
  $('nav').classList.toggle('sc', scrollY > 40);                             // smaller navbar after scrolling
}

// 7c. Scroll progress bar + About photo parallax
function onScroll() {
  updateActiveNav();
  const total = R.scrollHeight - innerHeight;
  $('#bar').style.width = scrollY / total * 100 + '%';
  if (!RM) {
    const frame = $('.af');
    if (frame) {
      const r = frame.getBoundingClientRect();
      frame.firstElementChild.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -.05}px)`;
    }
  }
}
addEventListener('scroll', onScroll, { passive: true });

// 7d. Animated line above each section
const sectionObserver = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('on'); sectionObserver.unobserve(e.target); }
}), { threshold: .08 });
$$('main section').forEach(s => sectionObserver.observe(s));


/* =====================================================================
   8. EXPERIENCE TABS (from CONFIG.experience)
   The tabs change by themselves every 4 seconds until you click one.
   ===================================================================== */
let expIndex = 0, expHover = false, expVisible = false, expAuto = true;

function renderExperience() {
  $('#xt').innerHTML = CONFIG.experience.map((step, i) =>
    `<button class="tab" role="tab" aria-selected="${i == expIndex}" data-i="${i}">
       <span class="n">0${i + 1}</span><h3>${L(step[0])}</h3>
       <div class="bd2"><div><p>${L(step[1])}</p></div></div>
     </button>`).join('');
  $$('#xt .tab').forEach(b => b.onclick = () => { expIndex = +b.dataset.i; expAuto = false; renderExperience(); });
  $('#xmap').dataset.a = expIndex;                 // highlights a part of the diagram
  bindPointerEffects();
}
const xt = $('#xt');
xt.onmouseenter = () => expHover = true;  xt.onmouseleave = () => expHover = false;
xt.onfocusin    = () => expHover = true;  xt.onfocusout   = () => expHover = false;
new IntersectionObserver(es => es.forEach(e => expVisible = e.isIntersecting), { threshold: .3 }).observe($('#experience'));
setInterval(() => {
  if (expAuto && expVisible && !expHover && !RM) { expIndex = (expIndex + 1) % CONFIG.experience.length; renderExperience(); }
}, 4200);


/* =====================================================================
   9. TERMINAL  (press "/" or click ">_ terminal")
   Texts are pairs [English, French]. Edit them freely.
   The email, skills, projects and CV come from config.js.
   ===================================================================== */
const EMAIL = CONFIG.email;
const CONTACT_TEXT = EMAIL + '\n' + CONFIG.linkedin.handle + '\n' + CONFIG.github.handle;

const COMMANDS = {
  help: [
    "Commands: about, skills, projects, experience, community, education, languages, services, cv, contact, theme, clear. Tab completes, arrows recall history.",
    "Commandes : about, skills, projects, experience, community, education, languages, services, cv, contact, theme, clear. Tab complète, les flèches rappellent l’historique."
  ],
  about: [
    "Farah Boudagga. Software engineering student, Faculté des Sciences de Monastir. Spring Boot on the server, React and Next.js on the screen, responsive websites with HTML, CSS and Bootstrap.",
    "Farah Boudagga. Étudiante en génie logiciel, Faculté des Sciences de Monastir. Spring Boot côté serveur, React et Next.js côté écran, sites web responsive en HTML, CSS et Bootstrap."
  ],
  skills: [CONFIG.skills.join(', '), CONFIG.skills.join(', ')],
  projects: [
    CONFIG.projects.map((p, i) => `${i + 1}. ${p.name}: ${p.stack.slice(0, 3).join(', ')}`).join('\n'),
    CONFIG.projects.map((p, i) => `${i + 1}. ${p.name} : ${p.stack.slice(0, 3).join(', ')}`).join('\n')
  ],
  experience: [
    "Software Developer Intern, Singleton Solution. Remote, 10 weeks from 18 July 2026. Dowell dashboard frontend, testing, debugging, integration, validation.",
    "Stagiaire développeuse logiciel, Singleton Solution. À distance, 10 semaines depuis le 18 juillet 2026. Frontend du dashboard Dowell, tests, débogage, intégration, validation."
  ],
  community: [
    "WEHACK 0.0 hackathon and the LinkedIn and CV Creation workshop, both by the IEEE FSM Student Branch. Certificates of participation.",
    "Hackathon WEHACK 0.0 et atelier LinkedIn et création de CV, tous deux par l’IEEE FSM Student Branch. Certificats de participation."
  ],
  education: [
    "Licence in Software Engineering and IS, FSM Monastir, 2024 to present. Baccalauréat Experimental Sciences, June 2024.",
    "Licence en Génie Logiciel et SI, FSM Monastir, 2024 à aujourd’hui. Baccalauréat Sciences Expérimentales, juin 2024."
  ],
  languages: [
    "Arabic (native), French (B1), English (B1)",
    "Arabe (langue maternelle), français (B1), anglais (B1)"
  ],
  services: [
    "Responsive websites with HTML5, CSS3 and Bootstrap: mobile-first, clean code, any screen size.",
    "Sites web responsive en HTML5, CSS3 et Bootstrap : mobile-first, code propre, tous les écrans."
  ],
  cv: [
    "Opening my CV in a new tab (PDF)...",
    "Ouverture de mon CV dans un nouvel onglet (PDF)..."
  ],
  contact: [CONTACT_TEXT, CONTACT_TEXT],
  "sudo hire farah": [
    "Permission granted. Say hello: " + EMAIL,
    "Permission accordée. Écrivez-moi : " + EMAIL
  ]
};
// Shortcuts (aliases)
COMMANDS.whoami = COMMANDS.about;
COMMANDS.stack = COMMANDS.skills;
COMMANDS.hackathon = COMMANDS.community;
COMMANDS.workshops = COMMANDS.community;
COMMANDS.web = COMMANDS.services;
COMMANDS.resume = COMMANDS.cv;

const term = $('#tm'), termLog = $('#tl'), cmdHistory = [];
let historyIndex = 0, typing = false;

// Prints a line in the terminal (typed letter by letter unless "fast")
function say(text, cls, fast) {
  const line = document.createElement('div');
  if (cls) line.className = cls;
  termLog.append(line);
  if (RM || fast) { line.textContent = text; termLog.scrollTop = termLog.scrollHeight; return Promise.resolve(); }
  typing = true;
  return new Promise(done => {
    let i = 0;
    (function step() {
      i += 2;
      line.textContent = text.slice(0, i);
      termLog.scrollTop = termLog.scrollHeight;
      if (i < text.length) setTimeout(step, 10); else { typing = false; done(); }
    })();
  });
}

function toggleTerminal(open) {
  term.classList.toggle('o', open);
  $('#tb').setAttribute('aria-expanded', open);
  if (open) {
    if (!termLog.children.length) say(lang == 'fr' ? 'Bienvenue sur le terminal de Farah. Tapez help.' : 'Welcome to Farah’s terminal. Type help.');
    $('#ti').focus();
  }
}
$('#tb').onclick = () => toggleTerminal(!term.classList.contains('o'));
addEventListener('keydown', e => {
  if (e.key == '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); toggleTerminal(true); }
  if (e.key == 'Escape') toggleTerminal(false);
});

// Tab = auto-complete, arrows = previous commands
$('#ti').addEventListener('keydown', e => {
  const input = e.target;
  if (e.key == 'Tab') {
    e.preventDefault();
    const match = Object.keys(COMMANDS).filter(k => k.startsWith(input.value.toLowerCase()));
    if (match.length && input.value) input.value = match[0];
  }
  if (e.key == 'ArrowUp' && cmdHistory.length)  { e.preventDefault(); historyIndex = Math.max(0, historyIndex - 1); input.value = cmdHistory[historyIndex]; }
  if (e.key == 'ArrowDown')                  { e.preventDefault(); historyIndex = Math.min(cmdHistory.length, historyIndex + 1); input.value = cmdHistory[historyIndex] || ''; }
});

$('#tf').onsubmit = e => {
  e.preventDefault();
  if (typing) return;
  const cmd = $('#ti').value.trim().toLowerCase();
  $('#ti').value = '';
  if (!cmd) return;
  cmdHistory.push(cmd); historyIndex = cmdHistory.length;
  say('$ ' + cmd, 'u', true);
  if (cmd == 'clear') termLog.innerHTML = '';
  else if (cmd == 'theme') $('#th').click();
  else {
    say(COMMANDS[cmd] ? L(COMMANDS[cmd]) : `command not found: ${cmd}. Type help.`, COMMANDS[cmd] ? '' : 'k');
    if (cmd == 'cv' || cmd == 'resume') window.open(CONFIG.cv.file, '_blank');   // opens the PDF
  }
};


/* =====================================================================
   10. COMMUNITY: TABS + PHOTO DECK + LIGHTBOX (from CONFIG.community)
   ===================================================================== */
let activity = 0;                 // which tab is open (0 = hackathon, 1 = workshop)
let deckOrder = [0, 1, 2];        // order of the photos in the deck (first = on top)

function renderCommunity() {
  const a = CONFIG.community[activity];

  // Tabs on the left
  $('#ctabs').innerHTML = CONFIG.community.map((c, i) =>
    `<button class="tab" role="tab" aria-selected="${i == activity}" data-i="${i}">
       <span class="n">0${i + 1}</span><h3>${L(c.title)}</h3><span class="mu">${L(c.organizer)}</span>
       <div class="bd2"><div><p>${L(c.description)}</p>
         <div class="chs"><span class="ch">${c.org}</span><span class="ch">${L(c.tag)}</span><span class="ch">${L(CONFIG.certificateLabel)}</span></div>
       </div></div>
     </button>`).join('');
  $$('#ctabs .tab').forEach(b => b.onclick = () => {
    if (+b.dataset.i == activity) return;
    activity = +b.dataset.i;
    deckOrder = CONFIG.community[activity].photos.map((_, i) => i);
    renderCommunity();
  });

  // Photo deck on the right
  $('#dk').innerHTML = a.photos.map((p, k) =>
    `<figure class="dc" data-k="${k}"><img src="${esc(p.image)}" alt="${esc(p.alt)}" style="object-position:${p.focus}" draggable="false"></figure>`).join('');
  $('#sealt').textContent = a.sealText;
  placeCards();
  bindPointerEffects();
}

// Puts every photo at its position in the stack, updates caption + dots
function placeCards() {
  const a = CONFIG.community[activity], n = a.photos.length;
  $$('.dc').forEach(card => {
    const pos = deckOrder.indexOf(+card.dataset.k);
    card.dataset.p = pos;
    card.setAttribute('aria-hidden', pos ? 'true' : 'false');
  });
  const top = deckOrder[0];
  $('#cap').innerHTML = `<b>${L(a.photos[top].caption)}</b>`;
  $('#dots').innerHTML = a.photos.map((_, i) => `<i class="${i == top ? 'on' : ''}"></i>`).join('');
  $('#pvb').hidden = $('#nxb').hidden = n < 2;       // hide arrows if there is only one photo
}

function nextPhoto() {
  if (CONFIG.community[activity].photos.length < 2) return;
  const front = $('.dc[data-p="0"]');
  if (!front) return;
  front.classList.add('fly');                          // the top photo flies away...
  setTimeout(() => { front.classList.remove('fly'); deckOrder.push(deckOrder.shift()); placeCards(); }, RM ? 0 : 300);
}
function prevPhoto() {
  if (CONFIG.community[activity].photos.length < 2) return;
  deckOrder.unshift(deckOrder.pop());
  placeCards();
}
$('#nxb').onclick = nextPhoto;
$('#pvb').onclick = prevPhoto;

// Swipe / click on the deck, keyboard arrows
const deck = $('#dk');
let swipeStart = null;
deck.onpointerdown = e => swipeStart = e.clientX;
deck.onpointerup = e => {
  if (swipeStart == null) return;
  const dx = e.clientX - swipeStart; swipeStart = null;
  dx > 40 ? prevPhoto() : nextPhoto();
};
deck.onkeydown = e => {
  if (e.key == 'ArrowRight' || e.key == 'Enter') { e.preventDefault(); nextPhoto(); }
  if (e.key == 'ArrowLeft') { e.preventDefault(); prevPhoto(); }
};
if (FINE && !RM) {            // 3D tilt of the deck
  const wrap = $('.dw');
  wrap.onpointermove = e => {
    const r = deck.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    deck.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg)`;
  };
  wrap.onpointerleave = () => deck.style.transform = '';
}

// Lightbox ("View full size")
$('#zm').onclick = () => {
  const p = CONFIG.community[activity].photos[deckOrder[0]];
  $('#lbi').src = p.image; $('#lbi').alt = p.alt; $('#lbc').textContent = L(p.caption);
  $('#lb').classList.add('on'); $('#lbx').focus();
};
const closeLightbox = () => { $('#lb').classList.remove('on'); $('#zm').focus(); };
$('#lbx').onclick = closeLightbox;
$('#lb').onclick = e => { if (e.target.id == 'lb') closeLightbox(); };
addEventListener('keydown', e => { if (e.key == 'Escape' && $('#lb').classList.contains('on')) closeLightbox(); });


/* =====================================================================
   11. CONTACT: COPY EMAIL + CONTACT FORM
   ===================================================================== */
// Character counter of the message box
$('#fq').oninput = e => $('#cn').textContent = e.target.value.length + ' / 600';

// "Copy address" button
$('#cp').onclick = async () => {
  try { await navigator.clipboard.writeText(CONFIG.email); } catch (x) { }
  const b = $('#cp'), old = b.innerHTML;
  b.textContent = lang == 'fr' ? 'Copié ✓' : 'Copied ✓';
  setTimeout(() => b.innerHTML = old, 1800);
};

// Light that follows the mouse on the LinkedIn / GitHub / CV cards
$$('.sc2').forEach(card => card.onpointermove = e => {
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', e.clientX - r.left + 'px');
  card.style.setProperty('--my', e.clientY - r.top + 'px');
});

// The form opens the visitor's email app with everything filled (no server needed)
$('#fm').onsubmit = e => {
  e.preventDefault();
  const name = $('#fn').value.trim();
  const subject = $('input[name=tp]:checked').value + ' | ' + name;
  const btn = $('#fs'), old = btn.innerHTML;
  btn.classList.add('ld');
  btn.textContent = lang == 'fr' ? 'Ouverture de votre messagerie…' : 'Opening your email app…';
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent($('#fq').value + '\n\n' + name)}`;
  setTimeout(() => { btn.classList.remove('ld'); btn.innerHTML = old; }, 3000);
};


/* =====================================================================
   12. NAVBAR: UNDERLINE, LINKEDIN PILL, MOBILE MENU
   ===================================================================== */
// Moving underline under the active menu link
function moveIndicator() {
  const a = $('.nl a.on'), i = $('#ind');
  if (!a || !i) return;
  i.style.opacity = 1;
  i.style.width = a.offsetWidth + 'px';
  i.style.transform = `translateX(${a.offsetLeft}px)`;
}

// The LinkedIn pill alternates between two labels
const LINKEDIN_LABELS = [["LinkedIn", "LinkedIn"], ["See my posts", "Mes publications"]];
let liIndex = 0, liHover = false;
function updateLinkedInPill() { $('#lipt').textContent = L(LINKEDIN_LABELS[liIndex]); }
const liBox = $('#li');
liBox.onmouseenter = () => liHover = true;  liBox.onmouseleave = () => liHover = false;
liBox.onfocusin    = () => liHover = true;  liBox.onfocusout   = () => liHover = false;
setInterval(() => {
  if (RM || liHover) return;
  liIndex = 1 - liIndex;
  const label = $('#lipt');
  label.classList.add('sw');                                   // fade out...
  setTimeout(() => { updateLinkedInPill(); label.classList.remove('sw'); }, 250);   // ...change text, fade in
}, 3600);

// Copy the LinkedIn preview card into the mobile menu
{
  const card = $('#lic').cloneNode(true);
  card.removeAttribute('id'); card.removeAttribute('role');
  $('#mp').append(card);
}

// Mobile menu (burger button)
const burger = $('#bgr'), mobileMenu = $('#mp');
function toggleMenu(open) {
  mobileMenu.classList.toggle('o', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
burger.onclick = () => toggleMenu(!mobileMenu.classList.contains('o'));
$$('#mp .pl').forEach(a => a.onclick = () => toggleMenu(false));
addEventListener('keydown', e => { if (e.key == 'Escape') toggleMenu(false); });
addEventListener('resize', () => { if (innerWidth > 1040) toggleMenu(false); moveIndicator(); });
document.fonts && document.fonts.ready.then(moveIndicator);


/* =====================================================================
   13. START
   Draws everything, then shows the loading screen for a short moment
   (portrait ring) and fades it away. The hero animation starts after that.
   ===================================================================== */
renderStats();
renderSkillsBanner();
setLang('en');
onScroll();

function startSite() {
  $('#pre').classList.add('x');            // loading screen fades away
  document.body.classList.add('go');       // hero animations start
}

if (RM) {
  // visitor asked for reduced motion: no loading screen at all
  startSite();
} else {
  // Wait at least 1.2 s (so the screen never just flashes) AND until the fonts
  // are ready (so the big title does not jump), but never more than 2.4 s.
  const minimum = new Promise(done => setTimeout(done, 1200));
  const fonts   = document.fonts ? document.fonts.ready : Promise.resolve();
  const maximum = new Promise(done => setTimeout(done, 2400));
  Promise.race([Promise.all([minimum, fonts]), maximum]).then(startSite);
}
