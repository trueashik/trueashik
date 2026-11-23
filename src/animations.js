/**
 * ANIMATIONS MODULE
 * - Particle background on canvas
 * - Scroll-triggered IntersectionObserver animations
 * - Typing effect for hero tagline
 * - Counter animation for stats
 * - Cursor glow effect
 */

/**
 * Particle Background
 */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let mouse = { x: 0, y: 0 };
    let animationId;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 12000);
        for (let i = 0; i < Math.min(count, 120); i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw dot
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
            ctx.fill();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse interaction
            const mdx = p.x - mouse.x;
            const mdy = p.y - mouse.y;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < 150) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - mDist / 150)})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
            }
        });

        animationId = requestAnimationFrame(drawParticles);
    }

    window.addEventListener('resize', () => {
        resize();
        createParticles();
    });

    document.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    resize();
    createParticles();
    drawParticles();
}

/**
 * Cursor Glow Effect
 */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    // Only show on desktop
    if (window.innerWidth < 768) {
        glow.style.display = 'none';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    });
}

/**
 * Typing Effect — updated phrases
 */
function initTypingEffect() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'AI-powered products.',
        'backend systems.',
        'automation workflows.',
        'startups.',
        'things that solve problems.',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (!isDeleting) {
            el.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                timeout = setTimeout(type, 2000); // pause at end
                return;
            }
            timeout = setTimeout(type, 60 + Math.random() * 40);
        } else {
            el.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                timeout = setTimeout(type, 400);
                return;
            }
            timeout = setTimeout(type, 30);
        }
    }

    // Start after a short delay
    setTimeout(type, 1000);
}

/**
 * Scroll-triggered animations via IntersectionObserver
 */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px',
        }
    );

    elements.forEach((el) => observer.observe(el));
}

/**
 * Counter animation for stat numbers
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.target, 10);
                    const suffix = el.dataset.suffix || '';
                    animateCounter(el, 0, target, 1500, suffix);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((c) => observer.observe(c));
}

function animateCounter(el, start, end, duration, suffix) {
    const range = end - start;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + range * eased);

        el.textContent = current + (progress >= 1 ? suffix : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/**
 * Initialize all animations
 */
function initAnimations() {
    initParticles();
    initCursorGlow();
    initTypingEffect();
    initScrollAnimations();
    initCounters();
}
