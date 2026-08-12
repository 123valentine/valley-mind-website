/* ============================================================
   ValleyMind — shared product navigation (injected header).
   One source of truth for the top nav so no page drifts into dead links.
   Requires nav.css + the tokens in style.css. Add to any page with:
     <div id="vmnav-root"></div>  ... <script src="nav.js"></script>
   Optionally set  <body data-vmnav="assistant">  to force the active item.
   ============================================================ */
(function () {
  'use strict';

  // Single source of truth for the app URL (Log in / Try ValleyMind).
  var APP_URL = 'https://valleymind-ai.onrender.com';

  // Minimal inline icon set (stroke icons matching the app's Lucide style).
  var P = {
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
    video: '<polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/>',
    scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    folder: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    brain: '<path d="M12 5a3 3 0 0 0-3 3 3 3 0 0 0-3 3 3 3 0 0 0 0 6 3 3 0 0 0 3 2 3 3 0 0 0 6 0 3 3 0 0 0 3-2 3 3 0 0 0 0-6 3 3 0 0 0-3-3 3 3 0 0 0-3-3z"/>',
    lightbulb: '<path d="M9 18h6"/><path d="M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>',
    search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
    mic: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/>',
    sparkles: '<path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>',
    box: '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/>',
    pencil: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>'
  };
  function svg(name) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + (P[name] || '') + '</svg>'; }

  var studioItems = [
    { t: 'Image Generation', d: 'Text-to-image in seconds', href: 'studio.html#image', ic: 'image' },
    { t: 'Video Generation', d: 'Cinematic AI video', href: 'studio.html#video', ic: 'video' },
    { t: 'Image / Video Analysis', d: 'Understand any media', href: 'studio.html#analysis', ic: 'scan' },
    { t: 'Editing', d: 'Auto short-form editor', href: 'studio.html#editing', ic: 'scissors' },
    { t: 'Templates', d: 'Start faster', href: 'studio.html#templates', ic: 'grid' },
    { t: 'Assets & Gallery', d: 'Your saved work', href: 'studio.html#assets', ic: 'folder' }
  ];
  var featureItems = [
    { t: 'Memory', href: 'assistant.html#memory', ic: 'brain' },
    { t: 'Reasoning', href: 'assistant.html#reasoning', ic: 'lightbulb' },
    { t: 'Search', href: 'assistant.html#search', ic: 'search' },
    { t: 'Voice', href: 'assistant.html#voice', ic: 'mic' },
    { t: 'AI Builder', href: 'ai-builder.html', ic: 'sparkles' },
    { t: 'Round Table', href: 'assistant.html#roundtable', ic: 'users' },
    { t: '3D Studio', href: 'coming-soon.html#threed', ic: 'box', soon: true },
    { t: 'Sketch', href: 'coming-soon.html#sketch', ic: 'pencil', soon: true }
  ];
  // id used for active-state (matches filename); label; href OR dropdown model.
  var top = [
    { id: 'index', t: 'Home', href: 'index.html' },
    { id: 'assistant', t: 'AI Assistant', href: 'assistant.html' },
    { id: 'studio', t: 'Studio', mega: studioItems },
    { id: 'ai-builder', t: 'AI Builder', href: 'ai-builder.html' },
    { id: 'features', t: 'Features', mini: featureItems },
    { id: 'use-cases', t: 'Use Cases', href: 'use-cases.html' },
    { id: 'coming-soon', t: 'Coming Soon', href: 'coming-soon.html' },
    { id: 'pricing', t: 'Pricing', href: 'pricing.html' },
    { id: 'resources', t: 'Resources', href: 'resources.html' }
  ];
  // Extra items shown only in the mobile drawer.
  var mobileExtra = [
    { id: 'about', t: 'About', href: 'about.html' },
    { id: 'contact', t: 'Support', href: 'contact.html' }
  ];

  var caret = '<svg class="caret" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

  var current = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (!current) current = 'index.html';
  var forced = document.body.getAttribute('data-vmnav');
  function isActive(id) { return forced ? forced === id : (current === id + '.html' || (id === 'index' && current === '')); }

  function miItem(it) {
    var badge = it.soon ? ' <span class="vm-soon-badge">Soon</span>' : '';
    var desc = it.d ? '<span class="mi-d">' + it.d + '</span>' : '';
    return '<a class="vmnav-mi" href="' + it.href + '"><span class="mi-ic">' + svg(it.ic) + '</span>' +
      '<span><span class="mi-t">' + it.t + badge + '</span>' + desc + '</span></a>';
  }

  // ── Desktop menu ──
  var menu = top.map(function (n) {
    if (n.mega) {
      return '<li class="vmnav-item" data-dd><button class="vmnav-link"' + (isActive(n.id) ? ' aria-current="page"' : '') +
        ' aria-haspopup="true" aria-expanded="false">' + n.t + caret + '</button>' +
        '<div class="vmnav-panel mega">' + n.mega.map(miItem).join('') + '</div></li>';
    }
    if (n.mini) {
      return '<li class="vmnav-item" data-dd><button class="vmnav-link"' + (isActive(n.id) ? ' aria-current="page"' : '') +
        ' aria-haspopup="true" aria-expanded="false">' + n.t + caret + '</button>' +
        '<div class="vmnav-panel mini">' + n.mini.map(miItem).join('') + '</div></li>';
    }
    return '<li class="vmnav-item"><a class="vmnav-link" href="' + n.href + '"' + (isActive(n.id) ? ' aria-current="page"' : '') + '>' + n.t + '</a></li>';
  }).join('');

  // ── Mobile drawer ──
  function acc(title, items) {
    return '<div class="vmnav-acc"><button class="vmnav-acc-btn" type="button">' + title + caret + '</button>' +
      '<div class="vmnav-acc-panel">' + items.map(function (it) {
        var badge = it.soon ? ' <span class="vm-soon-badge">Soon</span>' : '';
        return '<a href="' + it.href + '">' + it.t + badge + '</a>';
      }).join('') + '</div></div>';
  }
  var drawer = top.map(function (n) {
    if (n.mega) return acc('Studio', n.mega);
    if (n.mini) return acc('Features', n.mini);
    return '<a href="' + n.href + '"' + (isActive(n.id) ? ' aria-current="page"' : '') + '>' + n.t + '</a>';
  }).join('') + '<div class="vmnav-drawer-sep"></div>' +
    mobileExtra.map(function (n) { return '<a href="' + n.href + '"' + (isActive(n.id) ? ' aria-current="page"' : '') + '>' + n.t + '</a>'; }).join('');

  var html =
    '<header class="vmnav" id="vmnav">' +
      '<div class="vmnav-inner">' +
        '<a class="vmnav-logo" href="index.html"><img src="assets/valleymind-logo.png" alt="ValleyMind AI"><span>ValleyMind</span></a>' +
        '<ul class="vmnav-menu">' + menu + '</ul>' +
        '<div class="vmnav-cta">' +
          '<a class="btn btn-ghost" href="' + APP_URL + '" rel="noopener">Log in</a>' +
          '<a class="btn btn-primary" href="' + APP_URL + '" rel="noopener">Try ValleyMind</a>' +
        '</div>' +
        '<button class="vmnav-burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</header>' +
    '<div class="vmnav-backdrop"></div>' +
    '<aside class="vmnav-drawer" aria-label="Mobile menu">' +
      '<div class="vmnav-drawer-head"><a class="vmnav-logo" href="index.html"><img src="assets/valleymind-logo.png" alt="ValleyMind AI"><span>ValleyMind</span></a>' +
      '<button class="vmnav-drawer-close" aria-label="Close menu">&times;</button></div>' +
      drawer +
      '<div class="vmnav-drawer-cta"><a class="btn btn-ghost" href="' + APP_URL + '" rel="noopener">Log in</a>' +
      '<a class="btn btn-primary" href="' + APP_URL + '" rel="noopener">Try ValleyMind</a></div>' +
    '</aside>';

  var root = document.getElementById('vmnav-root');
  if (!root) return;
  root.innerHTML = html;
  // Note: page sections already carry ~100px top padding, which clears the
  // 68px fixed header — so no extra body padding is added (avoids double spacing).

  // ── Behaviour ──
  var header = document.getElementById('vmnav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 8) header.classList.add('scrolled'); else header.classList.remove('scrolled');
  }, { passive: true });

  // Desktop dropdowns: hover opens via CSS; also support click/keyboard toggle.
  root.querySelectorAll('.vmnav-item[data-dd] > .vmnav-link').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var li = btn.parentElement;
      var wasOpen = li.classList.contains('open');
      root.querySelectorAll('.vmnav-item.open').forEach(function (o) { o.classList.remove('open'); o.querySelector('.vmnav-link').setAttribute('aria-expanded', 'false'); });
      if (!wasOpen) { li.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.vmnav-item[data-dd]')) {
      root.querySelectorAll('.vmnav-item.open').forEach(function (o) { o.classList.remove('open'); o.querySelector('.vmnav-link').setAttribute('aria-expanded', 'false'); });
    }
  });

  // Mobile drawer open/close.
  var burger = root.querySelector('.vmnav-burger');
  var closeBtn = root.querySelector('.vmnav-drawer-close');
  var backdrop = root.querySelector('.vmnav-backdrop');
  function openDrawer() { document.body.classList.add('vmnav-open'); burger.setAttribute('aria-expanded', 'true'); }
  function closeDrawer() { document.body.classList.remove('vmnav-open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
  // Close the drawer after tapping a real link (not an accordion toggle).
  root.querySelectorAll('.vmnav-drawer a').forEach(function (a) { a.addEventListener('click', closeDrawer); });

  // Mobile accordions.
  root.querySelectorAll('.vmnav-acc-btn').forEach(function (b) {
    b.addEventListener('click', function () { b.parentElement.classList.toggle('open'); });
  });
})();
