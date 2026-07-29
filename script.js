/* ============================================
   VALLEYMIND AI — Interactions & Animations
   Premium Futuristic Experience
   ============================================ */

(function() {
  'use strict';

  // ===== LOADING SCREEN =====
  const loadingScreen = document.getElementById('loadingScreen');

  function hideLoadingScreen() {
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 800);
    }
  }

  // Hide loading after content is ready
  if (document.readyState === 'complete') {
    setTimeout(hideLoadingScreen, 600);
  } else {
    window.addEventListener('load', () => {
      setTimeout(hideLoadingScreen, 600);
    });
  }

  // Fallback: force hide after 4 seconds max
  setTimeout(hideLoadingScreen, 4000);

  // ===== PREMIUM CURSOR (Desktop Only) =====
  const cursorGlow = document.getElementById('cursorGlow');
  const cursorDot = document.getElementById('cursorDot');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;
  let dotX = 0, dotY = 0;
  let cursorActive = false;

  if (cursorGlow && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!cursorActive) {
        cursorActive = true;
        cursorGlow.classList.add('active');
        cursorDot.classList.add('active');
      }
    });

    document.addEventListener('mouseleave', () => {
      cursorActive = false;
      cursorGlow.classList.remove('active');
      cursorDot.classList.remove('active');
    });

    // Hover detection for interactive elements
    const hoverTargets = 'a, button, .btn, .feature-card, .cap-card, .product-card, .about-card, .contact-card, .social-card, .social-link';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverTargets)) {
        cursorGlow.classList.add('hover');
        cursorDot.classList.add('hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverTargets)) {
        cursorGlow.classList.remove('hover');
        cursorDot.classList.remove('hover');
      }
    });

    // Smooth cursor animation at 60fps
    function animateCursor() {
      const glowEase = 0.12;
      const dotEase = 0.25;

      glowX += (mouseX - glowX) * glowEase;
      glowY += (mouseY - glowY) * glowEase;
      dotX += (mouseX - dotX) * dotEase;
      dotY += (mouseY - dotY) * dotEase;

      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      cursorDot.style.left = dotX + 'px';
      cursorDot.style.top = dotY + 'px';

      requestAnimationFrame(animateCursor);
    }

    requestAnimationFrame(animateCursor);
  }

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    const mobileLinks = mobileMenu.querySelectorAll('a');

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ===== SCROLL ANIMATIONS =====
  const animatedElements = document.querySelectorAll('[data-animate]');

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, parseInt(delay));
          observer.unobserve(entry.target);
        }
      });
    }, { root: null, rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));
  }

  // ===== HERO PARTICLES =====
  const particlesContainer = document.getElementById('heroParticles');

  if (particlesContainer) {
    const fragment = document.createDocumentFragment();
    const particleCount = 30;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.3 + 0.1;
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * -20;
      const drift = Math.random() * 100 - 50;

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(0, 255, 204, ${opacity});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        pointer-events: none;
      `;

      particles.push({ el: particle, drift, duration: duration * 1000, startDelay: delay * 1000 });
      fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);

    let particleAnimFrame;
    const heroSection = document.getElementById('hero');

    function animateParticles(time) {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const elapsed = (time + p.startDelay) % p.duration;
        const progress = elapsed / p.duration;
        const y = progress * -100;
        const x = Math.sin(progress * Math.PI * 2) * p.drift * 0.3;
        const o = progress < 0.1 ? progress * 10 : progress > 0.9 ? (1 - progress) * 10 : 1;

        p.el.style.transform = `translateY(${y}vh) translateX(${x}px)`;
        p.el.style.opacity = o * 0.5;
      }
      particleAnimFrame = requestAnimationFrame(animateParticles);
    }

    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          particleAnimFrame = requestAnimationFrame(animateParticles);
        } else {
          cancelAnimationFrame(particleAnimFrame);
        }
      }, { threshold: 0 });

      heroObserver.observe(heroSection);
    }
  }

  // ===== VIDEO AUTOPLAY MANAGEMENT =====
  const videos = document.querySelectorAll('video');

  videos.forEach(video => {
    video.addEventListener('pause', () => {
      video.play().catch(() => {});
    });

    video.addEventListener('ended', () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    });
  });

  document.addEventListener('visibilitychange', () => {
    videos.forEach(video => {
      if (document.hidden) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = navbar ? navbar.offsetHeight + 20 : 90;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // ===== PARALLAX EFFECT (via ambient-bg wrapper) =====
  const ambientBg = document.querySelector('.ambient-bg');
  let rafId;

  function updateParallax() {
    if (ambientBg) {
      const scrollY = window.scrollY;
      ambientBg.style.transform = `translateY(${scrollY * 0.04}px)`;
    }
    rafId = null;
  }

  window.addEventListener('scroll', () => {
    if (!rafId) {
      rafId = requestAnimationFrame(updateParallax);
    }
  }, { passive: true });

  // ===== BUTTON RIPPLE =====
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 0; height: 0;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        left: ${x}px; top: ${y}px;
        pointer-events: none;
        animation: vmRipple 0.6s ease-out forwards;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple keyframes once
  const rippleStyle = document.createElement('style');
  rippleStyle.textContent = `@keyframes vmRipple { to { width: 300px; height: 300px; opacity: 0; } }`;
  document.head.appendChild(rippleStyle);

})();
