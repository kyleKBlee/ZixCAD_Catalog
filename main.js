// ── Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ── FAQ toggle
function toggleFaq(id) {
    const item = document.getElementById(id);
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
}

// ── Scroll reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.market-card, .compare-card, .feature-item, .testimonial-card, ' +
    '.faq-item, .works-feature-item, .support-feat, .tp-col, .fs-item, ' +
    '.works-sub-img, .client-cat, .hero-image, .works-img, .feature-big, .support-img'
).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ── Chart bars animate on scroll
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.bar').forEach((bar, i) => {
                const h = bar.style.getPropertyValue('--h');
                bar.style.setProperty('--h', '0');
                setTimeout(() => {
                    bar.style.transition = 'height 0.8s cubic-bezier(.4,0,.2,1)';
                    bar.style.setProperty('--h', h);
                }, i * 80 + 200);
            });
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.market-chart').forEach(el => chartObserver.observe(el));

// ── Compare bar animate on scroll
const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.compare-fill').forEach((fill, i) => {
                const w = fill.style.getPropertyValue('--w');
                fill.style.setProperty('--w', '0%');
                setTimeout(() => {
                    fill.style.transition = 'width 1s cubic-bezier(.4,0,.2,1)';
                    fill.style.setProperty('--w', w);
                }, i * 150 + 300);
            });
            barObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.compare-speed').forEach(el => barObserver.observe(el));

// ── Smooth active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.style.color = '');
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.style.color = 'var(--primary)';
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => navObserver.observe(sec));

// ── Mobile hamburger ──────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');
const body = document.body;

function openMenu() {
    navLinksEl.classList.add('mobile-open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-label', '메뉴 닫기');
    body.style.overflow = 'hidden';
}

function closeMenu() {
    navLinksEl.classList.remove('mobile-open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-label', '메뉴 열기');
    body.style.overflow = '';
}

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinksEl.classList.contains('mobile-open') ? closeMenu() : openMenu();
});

// 메뉴 링크 클릭 시 닫기
navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeMenu());
});

// 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
    if (navLinksEl.classList.contains('mobile-open') &&
        !navLinksEl.contains(e.target) &&
        !hamburger.contains(e.target)) {
        closeMenu();
    }
});

// 리사이즈 시 닫기
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMenu();
});

// ── Counter animation for hero stats
function animateCounter(el, target, suffix = '') {
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
        current = Math.min(current + increment, target);
        el.textContent = Math.round(current) + suffix;
        if (current >= target) clearInterval(timer);
    }, step);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNums = entry.target.querySelectorAll('.stat-num');
            const vals = [286, 63, 100, 400];
            const suffixes = ['%', '%', '%', '+'];
            statNums.forEach((el, i) => animateCounter(el, vals[i], suffixes[i]));
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(el => statsObserver.observe(el));
