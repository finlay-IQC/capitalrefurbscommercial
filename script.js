/* ===================================================================
   Capital Refurbishment Solutions — funnel behaviour
   Vanilla JS, no dependencies. Handles:
     1. UTM / click-ID capture and persistence
     2. Passing those values into the GHL form embed
     3. Appending them to internal links (index -> thank-you, etc.)
     4. Smooth scroll to the form
     5. Sticky mobile CTA after the hero
     6. FAQ accordion
     7. Current year in the footer
   =================================================================== */
(function () {
  'use strict';

  /* -----------------------------------------------------------------
     1. UTM HANDLING
     ----------------------------------------------------------------- */
  var TRACKED = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'fbclid', 'gclid', 'ttclid', 'msclkid'
  ];
  var STORE_KEY = 'crs_attribution';

  function safeSession(action, key, value) {
    try {
      if (action === 'get') return window.sessionStorage.getItem(key);
      if (action === 'set') window.sessionStorage.setItem(key, value);
    } catch (e) {
      /* private mode or storage blocked — carry on without it */
    }
    return null;
  }

  /* Merge: values in the current URL win, anything already stored is kept.
     This means a visitor who lands on index.html with UTMs keeps them even
     after navigating to privacy.html and back. */
  function collectAttribution() {
    var stored = {};
    var raw = safeSession('get', STORE_KEY);
    if (raw) {
      try { stored = JSON.parse(raw) || {}; } catch (e) { stored = {}; }
    }

    var params = new URLSearchParams(window.location.search);
    var found = false;

    TRACKED.forEach(function (key) {
      var val = params.get(key);
      if (val) { stored[key] = val; found = true; }
    });

    /* First landing page and original referrer, captured once. */
    if (!stored.landing_page) {
      stored.landing_page = window.location.origin + window.location.pathname;
      found = true;
    }
    if (!stored.referrer && document.referrer && document.referrer.indexOf(window.location.host) === -1) {
      stored.referrer = document.referrer;
      found = true;
    }

    if (found) safeSession('set', STORE_KEY, JSON.stringify(stored));
    return stored;
  }

  var attribution = collectAttribution();

  /* keysOnly: pass TRACKED to keep internal links short — landing_page and
     referrer are only useful to the form, not to the next page. */
  function attributionQuery(keysOnly) {
    var keys = keysOnly || Object.keys(attribution);
    var parts = [];
    keys.forEach(function (key) {
      if (attribution[key]) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(attribution[key]));
      }
    });
    return parts.join('&');
  }

  /* -----------------------------------------------------------------
     2. PASS ATTRIBUTION INTO THE GHL FORM EMBED
     The values are appended to the iframe src. GoHighLevel maps URL
     parameters onto hidden fields whose field key matches the parameter
     name.

     MANUAL STEP: in the GHL form builder add hidden fields with these
     exact field keys so the values are saved with the submission:
       utm_source, utm_medium, utm_campaign, utm_content, utm_term,
       fbclid, gclid, ttclid, msclkid, landing_page, referrer
     ----------------------------------------------------------------- */
  function decorateFormEmbed() {
    var frame = document.querySelector('iframe[data-form-id]');
    if (!frame) return;

    var query = attributionQuery();
    if (!query) return;

    var src = frame.getAttribute('src');
    if (!src || src.indexOf('utm_source=') !== -1) return;

    frame.setAttribute('src', src + (src.indexOf('?') === -1 ? '?' : '&') + query);
  }

  /* -----------------------------------------------------------------
     3. APPEND ATTRIBUTION TO INTERNAL LINKS
     Covers index.html -> thank-you.html and the footer links, so the
     parameters survive if the visitor moves around the funnel.
     ----------------------------------------------------------------- */
  function decorateInternalLinks() {
    var query = attributionQuery(TRACKED);
    if (!query) return;

    var links = document.querySelectorAll('a[href]');
    Array.prototype.forEach.call(links, function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      /* Skip anchors, phone, mail and anything off-site. */
      if (href.charAt(0) === '#' || /^(tel:|mailto:|https?:|\/\/)/i.test(href)) return;
      if (href.indexOf('utm_source=') !== -1) return;
      link.setAttribute('href', href + (href.indexOf('?') === -1 ? '?' : '&') + query);
    });
  }

  /* -----------------------------------------------------------------
     4. SMOOTH SCROLL TO THE FORM
     Every primary CTA carries data-scroll and points at #quote.
     ----------------------------------------------------------------- */
  function initScrollCtas() {
    var ctas = document.querySelectorAll('[data-scroll]');
    Array.prototype.forEach.call(ctas, function (cta) {
      cta.addEventListener('click', function (event) {
        var id = (cta.getAttribute('href') || '').replace('#', '');
        var target = id ? document.getElementById(id) : null;
        if (!target) return; /* let the browser handle it */

        event.preventDefault();
        var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });

        /* Keep the address bar honest without a second jump. */
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', '#' + id);
        }
      });
    });
  }

  /* -----------------------------------------------------------------
     5. STICKY MOBILE CTA — shows once the hero is out of view
     ----------------------------------------------------------------- */
  function initStickyBar() {
    var bar = document.getElementById('stickybar');
    var hero = document.querySelector('.hero');
    if (!bar || !hero) return;

    function show(on) {
      bar.classList.toggle('is-visible', on);
      bar.setAttribute('aria-hidden', on ? 'false' : 'true');
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { show(!entry.isIntersecting); });
      }, { rootMargin: '-40px 0px 0px 0px', threshold: 0 });
      observer.observe(hero);
      return;
    }

    /* Fallback for older browsers. */
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        show(window.pageYOffset > hero.offsetHeight - 40);
        ticking = false;
      });
    }, { passive: true });
  }

  /* -----------------------------------------------------------------
     6. FAQ ACCORDION
     ----------------------------------------------------------------- */
  function initAccordion() {
    var buttons = document.querySelectorAll('.acc__q');
    Array.prototype.forEach.call(buttons, function (button) {
      button.addEventListener('click', function () {
        var panel = document.getElementById(button.getAttribute('aria-controls'));
        if (!panel) return;
        var open = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', open ? 'false' : 'true');
        panel.hidden = open;
      });
    });
  }

  /* -----------------------------------------------------------------
     7. FOOTER YEAR
     ----------------------------------------------------------------- */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* -----------------------------------------------------------------
     BOOT
     ----------------------------------------------------------------- */
  function boot() {
    decorateFormEmbed();
    decorateInternalLinks();
    initScrollCtas();
    initStickyBar();
    initAccordion();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
