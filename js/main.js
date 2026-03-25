// Hamburger menu
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    mobileNav.setAttribute("aria-hidden", !isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
});

document.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    });
});

// Contact scroll button
const contactScrollBtn = document.getElementById('contact-scroll-btn');
if (contactScrollBtn) {
    contactScrollBtn.addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}

// Set dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll progress bar
const scrollProgress = document.getElementById("scroll-progress");
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + "%";
});

// Back to top button logic
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Smooth active link highlight
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function onScroll() {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });
    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}
window.addEventListener("scroll", onScroll);

// Reveal on scroll
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);
reveals.forEach((el) => observer.observe(el));

// Typewriter Effect
const rotatingText = document.getElementById("hero-rotating-text");
const phrases = [
    "clean C# code",
    "solid .NET backends",
    "scalable architecture",
    "modern React UIs",
    "solving real problems"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        rotatingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        rotatingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }

    if (!rotatingText.classList.contains("typing-cursor")) {
        rotatingText.classList.add("typing-cursor");
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}

document.addEventListener('DOMContentLoaded', typeWriter);

// Interactive skills
const skillItems = document.querySelectorAll(".skill-item");
const skillDetailsText = document.querySelector(".skill-details-text");

skillItems.forEach((item) => {
    item.addEventListener("click", () => {
        skillItems.forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        const desc = item.getAttribute("data-description") || "";
        if (desc && skillDetailsText) {
            skillDetailsText.textContent = desc;
        }
    });
});

// Project filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        projectCards.forEach((card) => {
            const type = (card.getAttribute("data-type") || "").toLowerCase();
            if (filter === "all" || type.includes(filter)) {
                card.style.display = "flex";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// Auto-scroll GitHub chart to the right
const ghChart = document.querySelector('.github-chart-wrapper');
if (ghChart) {
    ghChart.scrollLeft = ghChart.scrollWidth;
}

// Spotlight Effect Logic
const spotlightCards = document.querySelectorAll('.project-card, .github-card, .testimonial-card');

spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Contact form
const contactForm = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (contactForm && statusEl) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        statusEl.textContent = "Sending...";
        statusEl.className = "form-status";
        const formData = new FormData(contactForm);

        try {
            const res = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { Accept: "application/json" },
            });

            if (res.ok) {
                statusEl.textContent = "Thanks! Your message has been sent.";
                statusEl.classList.add("success");
                contactForm.reset();
            } else {
                statusEl.textContent = "Something went wrong. Please try again or email me directly.";
                statusEl.classList.add("error");
            }
        } catch (err) {
            statusEl.textContent = "Network error. Please try again or email me directly.";
            statusEl.classList.add("error");
        }
    });
}

// === DARK / LIGHT / NEON MODE TOGGLE ===
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('theme-icon-moon');
const sunIcon = document.getElementById('theme-icon-sun');
const neonIcon = document.getElementById('theme-icon-neon');
const htmlEl = document.documentElement;

const themeOrder = ['dark', 'light', 'neon'];

function applyTheme(theme) {
    document.body.classList.add('theme-transition');
    htmlEl.setAttribute('data-theme', theme);
    moonIcon.style.display = theme === 'dark'  ? 'block' : 'none';
    sunIcon.style.display  = theme === 'light' ? 'block' : 'none';
    neonIcon.style.display = theme === 'neon'  ? 'block' : 'none';
    themeToggle.title = theme === 'dark' ? 'Switch to Light' : theme === 'light' ? 'Switch to Neon' : 'Switch to Dark';
    setTimeout(() => document.body.classList.remove('theme-transition'), 500);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = htmlEl.getAttribute('data-theme');
    const idx = themeOrder.indexOf(current);
    const next = themeOrder[(idx + 1) % themeOrder.length];
    localStorage.setItem('theme', next);
    applyTheme(next);
});

// === SKILLS TABS ===
const skillsTabs = document.querySelectorAll('.skills-tab');
const skillsContents = document.querySelectorAll('.skills-tab-content');

function getSkillLevel(pct) {
    if (pct >= 90) return { label: 'Expert',   cls: 'expert'   };
    if (pct >= 75) return { label: 'Advanced', cls: 'advanced' };
    if (pct >= 55) return { label: 'Mid',      cls: 'mid'      };
    return                 { label: 'Learning', cls: 'beginner' };
}

function animateSkillBars(container) {
    container.querySelectorAll('.skill-bar-item').forEach((item, i) => {
        const bar = item.querySelector('.skill-bar-fill');
        const pctEl = item.querySelector('.skill-bar-pct');
        if (!bar || !pctEl) return;

        const width = parseInt(bar.getAttribute('data-width'), 10);
        bar.style.width = '0';

        // Inject level badge if not already there
        if (!pctEl.querySelector('.skill-level')) {
            const lvl = getSkillLevel(width);
            const badge = document.createElement('span');
            badge.className = `skill-level ${lvl.cls}`;
            badge.textContent = lvl.label;
            pctEl.appendChild(badge);
        }

        // Inject skill ring (Feature 8) if not already there
        if (!item.querySelector('.skill-ring-wrap')) {
            const nameEl = item.querySelector('.skill-bar-name');
            const ringWrap = document.createElement('div');
            ringWrap.className = 'skill-ring-wrap';

            const ring = document.createElement('div');
            ring.className = 'skill-ring';
            ring.style.setProperty('--ring-pct', '0%');

            const ringPctLabel = document.createElement('span');
            ringPctLabel.className = 'skill-ring-pct';
            ringPctLabel.textContent = width + '%';
            ring.appendChild(ringPctLabel);

            const ringName = document.createElement('div');
            ringName.className = 'skill-ring-name';
            ringName.innerHTML = nameEl ? nameEl.innerHTML : '';

            ringWrap.appendChild(ring);
            ringWrap.appendChild(ringName);
            item.insertBefore(ringWrap, item.querySelector('.skill-bar-header'));

            setTimeout(() => {
                ring.style.setProperty('--ring-pct', width + '%');
            }, i * 100 + 50);
        }

        setTimeout(() => { bar.style.width = width + '%'; }, i * 100);
    });
}

skillsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillsTabs.forEach(t => t.classList.remove('active'));
        skillsContents.forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        const content = document.querySelector(`.skills-tab-content[data-content="${tab.getAttribute('data-tab')}"]`);
        if (content) {
            content.classList.add('active');
            animateSkillBars(content);
        }
    });
});

// Animate skill bars when about section enters view
const aboutSection = document.getElementById('about');
if (aboutSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const active = entry.target.querySelector('.skills-tab-content.active');
                if (active) animateSkillBars(active);
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    skillsObserver.observe(aboutSection);
}

// === CURSOR GLOW ===
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });
}

// === HERO TERMINAL ANIMATION ===
const terminalBody = document.getElementById('terminal-body');
const termLines = [
    { type: 'cmd', text: 'dotnet new webapi -n CleanAPI' },
    { type: 'out', text: 'Build succeeded ✓' },
    { type: 'cmd', text: 'git commit -m "feat: clean architecture"' },
    { type: 'out', text: '[main] 1 commit · ready to ship 🚀' },
    { type: 'cmd', text: 'docker-compose up --build' },
    { type: 'out', text: 'Container running on :5000 ✓' },
];

let termLineIdx = 0;

function startTerminal() {
    if (!terminalBody) return;
    terminalBody.innerHTML = '';
    termLineIdx = 0;
    runTermLine();
}

function runTermLine() {
    if (termLineIdx >= termLines.length) {
        setTimeout(startTerminal, 2800);
        return;
    }

    const entry = termLines[termLineIdx];
    const line = document.createElement('div');
    line.className = 'terminal-line';

    if (entry.type === 'out') {
        line.innerHTML = `<span class="terminal-out-text">${entry.text}</span>`;
        terminalBody.appendChild(line);
        termLineIdx++;
        setTimeout(runTermLine, 380);
    } else {
        line.innerHTML = `<span class="terminal-prompt">$</span><span class="terminal-cmd-text"></span><span class="terminal-blink">▋</span>`;
        terminalBody.appendChild(line);

        const cmdEl = line.querySelector('.terminal-cmd-text');
        const blink = line.querySelector('.terminal-blink');
        let charIdx = 0;

        function typeChar() {
            if (charIdx < entry.text.length) {
                cmdEl.textContent += entry.text[charIdx];
                charIdx++;
                setTimeout(typeChar, 48 + Math.random() * 38);
            } else {
                blink.remove();
                termLineIdx++;
                setTimeout(runTermLine, 260);
            }
        }
        typeChar();
    }
}

if (terminalBody) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(startTerminal, 600);
    });
}

// === COUNTER ANIMATION ===
const counters = document.querySelectorAll('.counter-num');
let countersStarted = false;

function animateCounters() {
    if (countersStarted) return;
    countersStarted = true;
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 1400;
        const step = Math.ceil(target / (duration / 16));
        let current = 0;
        const tick = () => {
            current = Math.min(current + step, target);
            counter.textContent = current;
            if (current < target) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
}

const heroSection = document.querySelector('#hero');
if (heroSection) {
    const counterObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateCounters();
            counterObserver.disconnect();
        }
    }, { threshold: 0.3 });
    counterObserver.observe(heroSection);
}


// === SKILLS CONSTELLATION ===
const constellationWrap = document.getElementById('constellation');
const cSvg = document.getElementById('c-svg');

const cNodes = [
    // Row 1 — DevOps / cloud
    { id: 'git',    label: 'Git',           icon: 'devicon-git-plain colored',                color: '#fb923c', x: 8,  y: 9  },
    { id: 'azure',  label: 'Azure',         icon: 'devicon-azure-plain colored',               color: '#60a5fa', x: 28, y: 7  },
    { id: 'cs',     label: 'C#',            icon: 'devicon-csharp-plain colored',              color: '#a78bfa', x: 50, y: 9  },
    { id: 'blazor', label: 'Blazor',        emoji: '⚡',                                       color: '#c084fc', x: 72, y: 7  },
    { id: 'github', label: 'GitHub',        icon: 'devicon-github-original',                   color: '#e5e7eb', x: 91, y: 9  },
    // Row 2 — Backend core
    { id: 'docker', label: 'Docker',        icon: 'devicon-docker-plain colored',              color: '#67e8f9', x: 8,  y: 33 },
    { id: 'net',    label: '.NET',          icon: 'devicon-dotnetcore-plain colored',          color: '#8b5cf6', x: 28, y: 31 },
    { id: 'asp',    label: 'ASP.NET',       icon: 'devicon-dot-net-plain colored',             color: '#7c3aed', x: 50, y: 33 },
    { id: 'react',  label: 'React',         icon: 'devicon-react-original colored',            color: '#61dafb', x: 72, y: 31 },
    { id: 'ts',     label: 'TypeScript',    icon: 'devicon-typescript-plain colored',          color: '#3b82f6', x: 91, y: 33 },
    // Row 3 — Data
    { id: 'ef',     label: 'EF Core',       emoji: '🗄️',                                     color: '#6d28d9', x: 8,  y: 58 },
    { id: 'sql',    label: 'SQL Server',    icon: 'devicon-microsoftsqlserver-plain colored',  color: '#06b6d4', x: 28, y: 56 },
    { id: 'pg',     label: 'PostgreSQL',    icon: 'devicon-postgresql-plain colored',          color: '#38bdf8', x: 50, y: 58 },
    { id: 'js',     label: 'JavaScript',    icon: 'devicon-javascript-plain colored',          color: '#fbbf24', x: 72, y: 56 },
    { id: 'html',   label: 'HTML / CSS',    icon: 'devicon-html5-plain colored',               color: '#f97316', x: 91, y: 58 },
    // Row 4 — Extra
    { id: 'python', label: 'Python',        icon: 'devicon-python-plain colored',              color: '#4ade80', x: 19, y: 83 },
    { id: 'cqrs',   label: 'CQRS / Clean',  emoji: '🏛️',                                     color: '#e879f9', x: 50, y: 83 },
    { id: 'openai', label: 'OpenAI API',    emoji: '🤖',                                       color: '#34d399', x: 80, y: 83 },
];

const cEdges = [
    ['cs','net'],['cs','asp'],['cs','azure'],['cs','blazor'],['cs','git'],
    ['net','asp'],['net','ef'],['net','docker'],['net','cqrs'],
    ['asp','sql'],['asp','react'],['asp','blazor'],['asp','cqrs'],
    ['ef','sql'],['ef','pg'],
    ['sql','pg'],
    ['react','js'],['react','ts'],['react','html'],
    ['js','ts'],['js','html'],
    ['docker','azure'],['docker','git'],
    ['azure','github'],['git','github'],
    ['python','sql'],['python','pg'],['python','openai'],
    ['openai','react'],['openai','asp'],
    ['ts','react'],['blazor','react'],
];

function buildConstellation() {
    if (!constellationWrap || !cSvg) return;
    cSvg.innerHTML = '';
    constellationWrap.querySelectorAll('.c-node').forEach(el => el.remove());

    const W = constellationWrap.clientWidth || 520;
    const H = constellationWrap.clientHeight || 380;
    cSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);

    const pos = {};
    cNodes.forEach(n => {
        pos[n.id] = { x: (n.x / 100) * W, y: (n.y / 100) * H };
    });

    // SVG edges
    const edgeEls = [];
    cEdges.forEach(([a, b]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', pos[a].x);
        line.setAttribute('y1', pos[a].y);
        line.setAttribute('x2', pos[b].x);
        line.setAttribute('y2', pos[b].y);
        line.classList.add('c-edge');
        cSvg.appendChild(line);
        edgeEls.push({ el: line, a, b });
    });

    // HTML nodes (use existing CSS classes)
    cNodes.forEach(n => {
        const node = document.createElement('div');
        node.className = 'c-node';
        node.style.left = pos[n.id].x + 'px';
        node.style.top  = pos[n.id].y + 'px';

        const iconEl = document.createElement('div');
        iconEl.className = 'c-icon';
        iconEl.style.setProperty('--node-color', n.color);

        if (n.icon) {
            const i = document.createElement('i');
            i.className = n.icon;
            iconEl.appendChild(i);
        } else {
            iconEl.textContent = n.emoji;
        }

        const labelEl = document.createElement('div');
        labelEl.className = 'c-label';
        labelEl.textContent = n.label;

        node.appendChild(iconEl);
        node.appendChild(labelEl);

        node.addEventListener('mouseenter', () => {
            node.classList.add('lit');
            edgeEls.forEach(({ el, a, b }) => {
                if (a === n.id || b === n.id) el.classList.add('lit');
            });
        });
        node.addEventListener('mouseleave', () => {
            node.classList.remove('lit');
            edgeEls.forEach(({ el }) => el.classList.remove('lit'));
        });

        constellationWrap.appendChild(node);
    });
}

// Build when Map tab is clicked
document.querySelectorAll('.skills-tab').forEach(tab => {
    if (tab.getAttribute('data-tab') === 'map') {
        tab.addEventListener('click', () => {
            setTimeout(buildConstellation, 50);
        });
    }
});

// === ANIMATED TIMELINE ===
const timelineEl = document.querySelector('.timeline');
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineEl) {
    // Animate the vertical line drawing down
    const tlLineObserver = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            timelineEl.classList.add('tl-active');
            tlLineObserver.disconnect();
        }
    }, { threshold: 0.05 });
    tlLineObserver.observe(timelineEl);

    // Animate each item sliding in
    const tlItemObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                const delay = Array.from(timelineItems).indexOf(entry.target) * 120;
                setTimeout(() => entry.target.classList.add('tl-visible'), delay);
                tlItemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2, rootMargin: '0px 0px -20px 0px' });

    timelineItems.forEach(item => tlItemObserver.observe(item));
}

// Console Easter Egg
console.log(
    "%c👋 Hi there! Looking for the source code?",
    "color: #8b5cf6; font-size: 20px; font-weight: bold;"
);
console.log(
    "%cNice to meet you! If you're checking my console, we should probably talk code. Feel free to email me at bojidarivanov98@gmail.com",
    "color: #e5e7eb; font-size: 14px;"
);

// === FEATURE 2 + 6: PROJECT CARD SLIDE-UP OVERLAY + BUILT-WITH ICONS ===
const tagIconMap = {
    'c# / .net':        'devicon-csharp-plain colored',
    'c#':               'devicon-csharp-plain colored',
    '.net':             'devicon-dotnetcore-plain colored',
    '.net 8':           'devicon-dotnetcore-plain colored',
    'asp.net core':     'devicon-dot-net-plain colored',
    'web api':          'devicon-dot-net-plain colored',
    'react':            'devicon-react-original colored',
    'javascript/react': 'devicon-react-original colored',
    'javascript':       'devicon-javascript-plain colored',
    'typescript':       'devicon-typescript-plain colored',
    'sql server':       'devicon-microsoftsqlserver-plain colored',
    'sql':              'devicon-microsoftsqlserver-plain colored',
    'docker':           'devicon-docker-plain colored',
    'azure':            'devicon-azure-plain colored',
    'git':              'devicon-git-plain colored',
    'postgresql':       'devicon-postgresql-plain colored',
    'python':           'devicon-python-plain colored',
    'blazor':           'devicon-blazor-original colored',
    'html / css':       'devicon-html5-plain colored',
    'frontend':         'devicon-html5-plain colored',
};

document.querySelectorAll('.project-card').forEach(card => {
    const titleEl  = card.querySelector('.project-title');
    const descEl   = card.querySelector('.project-description');
    const codeLink = card.querySelector('.project-link:not(.live)');
    const liveLink = card.querySelector('.project-link.live');
    const tagEls   = card.querySelectorAll('.project-tag');

    const overlay = document.createElement('div');
    overlay.className = 'card-overlay';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'card-overlay-title';
    titleDiv.textContent = titleEl ? titleEl.textContent : '';

    // Built-with icons (Feature 6)
    const iconsDiv = document.createElement('div');
    iconsDiv.className = 'card-overlay-icons';
    let hasIcons = false;
    tagEls.forEach(tag => {
        const key = tag.textContent.trim().toLowerCase();
        const iconCls = tagIconMap[key];
        if (iconCls) {
            const i = document.createElement('i');
            i.className = `card-overlay-icon ${iconCls}`;
            i.title = tag.textContent.trim();
            iconsDiv.appendChild(i);
            hasIcons = true;
        }
    });

    const descDiv = document.createElement('div');
    descDiv.className = 'card-overlay-desc';
    descDiv.textContent = descEl ? descEl.textContent.trim() : '';

    const linksDiv = document.createElement('div');
    linksDiv.className = 'card-overlay-links';

    if (codeLink) {
        const a = document.createElement('a');
        a.className = 'card-overlay-link code';
        a.href = codeLink.href;
        a.target = '_blank';
        a.rel = 'noreferrer';
        a.innerHTML = '&#60;/&#62; Code';
        linksDiv.appendChild(a);
    }
    if (liveLink) {
        const a = document.createElement('a');
        a.className = 'card-overlay-link live';
        a.href = liveLink.href;
        a.target = '_blank';
        a.rel = 'noreferrer';
        a.innerHTML = '&#9654; Live';
        linksDiv.appendChild(a);
    }

    overlay.appendChild(titleDiv);
    if (hasIcons) overlay.appendChild(iconsDiv);
    overlay.appendChild(descDiv);
    overlay.appendChild(linksDiv);
    card.appendChild(overlay);
});

// === FEATURE 6: EASTER EGG — type "hireme" ===
(function () {
    const target = 'hireme';
    let typed = '';
    const overlay = document.getElementById('hire-me-overlay');
    const closeBtn = document.getElementById('hire-me-close');
    const ctaBtn   = document.getElementById('hire-me-cta');

    if (!overlay) return;

    function showOverlay() {
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden', 'false');
        closeBtn && closeBtn.focus();
    }
    function hideOverlay() {
        overlay.classList.remove('show');
        overlay.setAttribute('aria-hidden', 'true');
        typed = '';
    }

    document.addEventListener('keydown', e => {
        // Only track plain key presses (no Ctrl/Alt/Meta)
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (e.key.length !== 1) return;
        typed += e.key.toLowerCase();
        if (typed.length > target.length) typed = typed.slice(-target.length);
        if (typed === target) showOverlay();
    });

    closeBtn && closeBtn.addEventListener('click', hideOverlay);
    overlay.addEventListener('click', e => { if (e.target === overlay) hideOverlay(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') hideOverlay(); });
    ctaBtn && ctaBtn.addEventListener('click', hideOverlay);
})();

// === FEATURE 12: SCROLL-TRIGGERED KEYWORD HIGHLIGHT ===
(function () {
    const hlWords = document.querySelectorAll('.hl-word');
    if (!hlWords.length) return;

    const hlObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const words = entry.target.querySelectorAll('.hl-word');
                words.forEach((word, i) => {
                    setTimeout(() => word.classList.add('lit'), i * 120 + 100);
                });
                hlObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const aboutText = document.querySelector('.about-text');
    if (aboutText) hlObserver.observe(aboutText);
})();
