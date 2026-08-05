/* ============================================
   VALLEYMIND AI — Interactions & Animations
   Premium Futuristic Experience
   ============================================ */

(function() {
  'use strict';

  // ===== VALLEYMIND APP LINK =====
  // Single source of truth for the live app URL. When the app moves to a
  // custom domain (e.g. https://valleymind.ai or https://app.valleymind.ai),
  // change ONLY this constant — every "Log In / Get Started / Launch" button
  // is wired to it below via the [data-app-link] attribute.
  const VALLEYMIND_APP_URL = 'https://valleymind-ai.onrender.com';

  document.querySelectorAll('[data-app-link]').forEach(el => {
    el.setAttribute('href', VALLEYMIND_APP_URL);
    // These leave the marketing site for the app; open in the same tab so it
    // feels like "entering" the product. Add target="_blank" here if you'd
    // rather open the app in a new tab.
    el.setAttribute('rel', 'noopener');
  });

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

  // ===== PWA: SERVICE WORKER REGISTRATION =====
  // Enables offline support + installability. Registered after load so it
  // never competes with first paint.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => { /* non-fatal */ });
    });
  }

  // ===== ANALYTICS (placeholders — no-ops until you add IDs) =====
  // Fill any of these in to activate that provider site-wide. Left blank they
  // do nothing, so there is zero tracking until you opt in.
  const ANALYTICS = {
    GA4_MEASUREMENT_ID: '',   // e.g. 'G-XXXXXXXXXX'  (Google Analytics 4)
    GTM_CONTAINER_ID:  '',    // e.g. 'GTM-XXXXXXX'   (Google Tag Manager)
    CLARITY_PROJECT_ID: '',   // e.g. 'abcdefghij'    (Microsoft Clarity)
  };

  function loadScript(src, attrs = {}) {
    const s = document.createElement('script');
    s.src = src; s.async = true;
    Object.entries(attrs).forEach(([k, v]) => s.setAttribute(k, v));
    document.head.appendChild(s);
    return s;
  }

  if (ANALYTICS.GTM_CONTAINER_ID) {
    (function (w, d, id) {
      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
      loadScript('https://www.googletagmanager.com/gtm.js?id=' + id);
    })(window, document, ANALYTICS.GTM_CONTAINER_ID);
  }

  if (ANALYTICS.GA4_MEASUREMENT_ID) {
    loadScript('https://www.googletagmanager.com/gtag/js?id=' + ANALYTICS.GA4_MEASUREMENT_ID);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS.GA4_MEASUREMENT_ID);
  }

  if (ANALYTICS.CLARITY_PROJECT_ID) {
    (function (c, l, a, r, i) {
      c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
      loadScript('https://www.clarity.ms/tag/' + i);
      c[a]('start', { projectId: i });
    })(window, document, 'clarity', 'script', ANALYTICS.CLARITY_PROJECT_ID);
  }

})();
