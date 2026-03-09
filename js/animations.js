/* =============================================
   ANIMATIONS — Particles, Typewriter, Reveals
   ============================================= */

// === SCROLL PROGRESS BAR ===
(function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const scrolled = document.documentElement.scrollTop;
        const total = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        bar.style.width = Math.round((scrolled / total) * 100) + '%';
    }, { passive: true });
})();

// === SCROLL REVEAL ===
(function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    els.forEach(el => observer.observe(el));
})();

// === ACTIVE NAV LINK ===
(function setActiveNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === page || (page === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
})();

// === HERO CANVAS PARTICLES (home page only) ===
(function initCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x  = Math.random() * canvas.width;
            this.y  = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.45;
            this.vy = (Math.random() - 0.5) * 0.45;
            this.r  = Math.random() * 1.5 + 0.8;
            this.a  = Math.random() * 0.45 + 0.15;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

            // Subtle mouse repulsion
            if (mouse.x !== null) {
                const dx = this.x - mouse.x;
                const dy = this.y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 90) {
                    const force = (90 - dist) / 90 * 0.6;
                    this.x += (dx / dist) * force;
                    this.y += (dy / dist) * force;
                }
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${this.a})`;
            ctx.fill();
        }
    }

    function initParticles() {
        const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 12000));
        particles = Array.from({ length: count }, () => new Particle());
    }

    function drawConnections() {
        const maxDist = 130;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const alpha = 0.18 * (1 - dist / maxDist);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => { resize(); initParticles(); }, { passive: true });
    window.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }, { passive: true });
    window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; }, { passive: true });

    resize();
    initParticles();
    animate();
})();

// === TYPEWRITER (home page only) ===
(function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'Computer Science Student',
        'Network Security Specialist',
        'Full Stack Developer',
        'Cybersecurity Enthusiast',
        'Cal Poly SLO'
    ];

    let phraseIdx = 0, charIdx = 0, deleting = false, delay = 110;

    function tick() {
        const phrase = phrases[phraseIdx];
        if (deleting) {
            el.textContent = phrase.substring(0, charIdx - 1);
            charIdx--;
            delay = 55;
        } else {
            el.textContent = phrase.substring(0, charIdx + 1);
            charIdx++;
            delay = 110;
        }

        if (!deleting && charIdx === phrase.length) {
            deleting = true;
            delay = 2200;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            delay = 420;
        }

        setTimeout(tick, delay);
    }

    setTimeout(tick, 600);
})();

