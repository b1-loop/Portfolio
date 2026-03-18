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

// Console Easter Egg
console.log(
    "%c👋 Hi there! Looking for the source code?",
    "color: #8b5cf6; font-size: 20px; font-weight: bold;"
);
console.log(
    "%cNice to meet you! If you're checking my console, we should probably talk code. Feel free to email me at bojidarivanov98@gmail.com",
    "color: #e5e7eb; font-size: 14px;"
);
