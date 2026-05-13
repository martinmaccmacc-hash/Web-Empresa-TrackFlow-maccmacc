document.addEventListener('DOMContentLoaded', function () {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const heroSection = document.getElementById('hero');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll Reveal Animation
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-8');
                entry.target.classList.add('opacity-100', 'translate-y-0');
            } else {
                entry.target.classList.add('opacity-0', 'translate-y-8');
                entry.target.classList.remove('opacity-100', 'translate-y-0');
            }
        });
    }, {
        threshold: 0.15,
    });

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${index * 100}ms`;
        revealObserver.observe(element);
    });

    // Parallax Background Effect
    if (heroSection && !prefersReducedMotion) {
        window.addEventListener('scroll', () => {
            const offset = window.pageYOffset;
            const positionY = 50 + offset * 0.08;
            heroSection.style.backgroundPosition = `center ${positionY}%`;
        });
    }

    // Button Hover Effects
    const buttons = document.querySelectorAll('a[href*=\"application\"], .inline-flex');
    buttons.forEach((button) => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';

        button.addEventListener('mouseenter', () => {
            button.style.filter = 'brightness(1.15)';
            button.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.filter = 'brightness(1)';
            button.style.transform = 'translateY(0)';
        });

        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.position = 'absolute';
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Grid Card Hover + Mobile Touch Feedback
    const gridCards = document.querySelectorAll('.grid > *');
    gridCards.forEach((card) => {
        card.style.transition = 'transform 0.35s ease, box-shadow 0.35s ease, background-color 0.35s ease, border-color 0.35s ease';
        card.style.willChange = 'transform';

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-6px) scale(1.01)';
            card.style.boxShadow = '0 24px 48px rgba(15, 23, 42, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });

        card.addEventListener('touchstart', () => {
            card.style.transform = 'translateY(-2px) scale(1.005)';
        });

        card.addEventListener('touchend', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            from {
                transform: scale(0);
                opacity: 1;
            }
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .scroll-reveal {
            transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
    `;
    document.head.appendChild(style);
});