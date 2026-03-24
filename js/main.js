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

// === DARK / LIGHT MODE TOGGLE ===
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('theme-icon-moon');
const sunIcon = document.getElementById('theme-icon-sun');
const htmlEl = document.documentElement;

function applyTheme(theme) {
    document.body.classList.add('theme-transition');
    htmlEl.setAttribute('data-theme', theme);
    if (theme === 'light') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
    setTimeout(() => document.body.classList.remove('theme-transition'), 500);
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    applyTheme(next);
});

// === SKILLS TABS ===
const skillsTabs = document.querySelectorAll('.skills-tab');
const skillsContents = document.querySelectorAll('.skills-tab-content');

function animateSkillBars(container) {
    container.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        const width = bar.getAttribute('data-width');
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = width + '%'; }, i * 90);
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
    { id: 'cs',      label: 'C#',           x: 50,  y: 20,  color: '#a78bfa' },
    { id: 'net',     label: '.NET',          x: 30,  y: 45,  color: '#8b5cf6' },
    { id: 'asp',     label: 'ASP.NET',       x: 70,  y: 45,  color: '#7c3aed' },
    { id: 'ef',      label: 'EF Core',       x: 20,  y: 70,  color: '#6d28d9' },
    { id: 'sql',     label: 'SQL',           x: 50,  y: 72,  color: '#06b6d4' },
    { id: 'react',   label: 'React',         x: 78,  y: 68,  color: '#38bdf8' },
    { id: 'docker',  label: 'Docker',        x: 15,  y: 50,  color: '#67e8f9' },
    { id: 'git',     label: 'Git',           x: 85,  y: 30,  color: '#4ade80' },
    { id: 'azure',   label: 'Azure',         x: 62,  y: 15,  color: '#60a5fa' },
    { id: 'js',      label: 'JavaScript',    x: 88,  y: 55,  color: '#fbbf24' },
];

const cEdges = [
    ['cs','net'],['cs','asp'],['cs','azure'],['cs','git'],
    ['net','asp'],['net','ef'],['net','docker'],
    ['asp','sql'],['asp','react'],
    ['ef','sql'],
    ['react','js'],['react','git'],
    ['sql','docker'],
    ['azure','git'],['azure','docker'],
    ['js','git'],
];

function buildConstellation() {
    if (!constellationWrap || !cSvg) return;
    const W = constellationWrap.clientWidth || 400;
    const H = constellationWrap.clientHeight || 280;
    cSvg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    cSvg.innerHTML = '';

    const pos = {};
    cNodes.forEach(n => {
        pos[n.id] = { x: (n.x / 100) * W, y: (n.y / 100) * H };
    });

    // Draw edges
    cEdges.forEach(([a, b]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', pos[a].x);
        line.setAttribute('y1', pos[a].y);
        line.setAttribute('x2', pos[b].x);
        line.setAttribute('y2', pos[b].y);
        line.setAttribute('stroke', 'rgba(139,92,246,0.25)');
        line.setAttribute('stroke-width', '1');
        line.classList.add('c-edge');
        cSvg.appendChild(line);
    });

    // Draw nodes
    cNodes.forEach(n => {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('c-node');
        g.setAttribute('data-id', n.id);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', pos[n.id].x);
        circle.setAttribute('cy', pos[n.id].y);
        circle.setAttribute('r', '7');
        circle.setAttribute('fill', n.color);
        circle.setAttribute('filter', 'url(#node-glow)');

        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', pos[n.id].x);
        text.setAttribute('y', pos[n.id].y + 19);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#e5e7eb');
        text.setAttribute('font-size', '10');
        text.setAttribute('font-family', 'Poppins, sans-serif');
        text.textContent = n.label;

        g.appendChild(circle);
        g.appendChild(text);

        g.addEventListener('mouseenter', () => {
            circle.setAttribute('r', '10');
            // Highlight connected edges
            cEdges.forEach(([a, b], i) => {
                if (a === n.id || b === n.id) {
                    cSvg.querySelectorAll('.c-edge')[i].setAttribute('stroke', 'rgba(139,92,246,0.7)');
                    cSvg.querySelectorAll('.c-edge')[i].setAttribute('stroke-width', '1.5');
                }
            });
        });
        g.addEventListener('mouseleave', () => {
            circle.setAttribute('r', '7');
            cSvg.querySelectorAll('.c-edge').forEach(e => {
                e.setAttribute('stroke', 'rgba(139,92,246,0.25)');
                e.setAttribute('stroke-width', '1');
            });
        });

        cSvg.appendChild(g);
    });

    // SVG filter for node glow
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `<filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>`;
    cSvg.insertBefore(defs, cSvg.firstChild);
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
