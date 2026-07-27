/* =============================================================================
   Business Model Toolkit — builds the wheel, the card index, and the panel
   from window.BUSINESS_MODEL (assets/data.js). No dependencies, no build step.
   ========================================================================== */
(function () {
  'use strict';

  var DATA = window.BUSINESS_MODEL;
  if (!DATA) { return; }

  var CENTER = DATA.center;
  var SEGMENTS = DATA.segments;
  var ALL = [CENTER].concat(SEGMENTS);

  /* ---------------------------------------------------------- geometry -- */
  var CX = 400, CY = 400;
  var R_OUT = 336;      // outer edge of the ring
  var R_IN = 156;       // inner edge of the ring
  var R_DISC = 140;     // the customer disc in the middle
  var R_CENTROID = 246; // where each slice's icon + label block is centred
  var GAP = 20;         // constant-width gap between slices, in user units
  var LIFT = 10;        // how far a slice slides outward on hover

  var DEG = Math.PI / 180;
  var STEP = 360 / SEGMENTS.length;

  function pt(r, deg) {
    var a = deg * DEG;
    return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
  }
  function f(n) { return Math.round(n * 100) / 100; }
  function xy(p) { return f(p[0]) + ',' + f(p[1]); }

  /* A ring segment whose radial gaps stay the same width at every radius:
     the angular padding shrinks as the radius grows. */
  function slicePath(startDeg, endDeg) {
    var padIn = Math.atan((GAP / 2) / R_IN) / DEG;
    var padOut = Math.atan((GAP / 2) / R_OUT) / DEG;
    var a0i = startDeg + padIn, a1i = endDeg - padIn;
    var a0o = startDeg + padOut, a1o = endDeg - padOut;
    return 'M' + xy(pt(R_IN, a0i)) +
           'L' + xy(pt(R_OUT, a0o)) +
           'A' + R_OUT + ' ' + R_OUT + ' 0 0 1 ' + xy(pt(R_OUT, a1o)) +
           'L' + xy(pt(R_IN, a1i)) +
           'A' + R_IN + ' ' + R_IN + ' 0 0 0 ' + xy(pt(R_IN, a0i)) + 'Z';
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* ------------------------------------------------------- build wheel -- */
  function buildWheel() {
    var svg = document.getElementById('wheel');
    var defs = '<defs>';
    var body = '';

    SEGMENTS.forEach(function (seg, i) {
      var start = -90 + i * STEP;
      var end = start + STEP;
      var mid = start + STEP / 2;

      /* Each slice is lit from the centre outwards so the ring has depth. */
      defs += '<radialGradient id="grad-' + esc(seg.id) + '" gradientUnits="userSpaceOnUse"' +
              ' cx="' + CX + '" cy="' + CY + '" r="' + R_OUT + '">' +
              '<stop offset="0.4" stop-color="' + esc(shade(seg.color, -0.1)) + '"/>' +
              '<stop offset="1" stop-color="' + esc(shade(seg.color, 0.12)) + '"/>' +
              '</radialGradient>';

      var d = slicePath(start, end);
      var lift = pt(LIFT, mid);
      var tx = f(lift[0] - CX), ty = f(lift[1] - CY);

      /* Icon and label stack vertically on screen rather than along the radius:
         a horizontal label placed radially runs out of the wedge on the left
         and right of the wheel. The offsets are small enough (±40 of 252) that
         every corner still clears the wedge edges. */
      var c = pt(R_CENTROID, mid);
      var two = seg.lines.length > 1;
      var iconXY = [c[0], c[1] - (two ? 36 : 30)];
      var labelY = c[1] + (two ? 6 : 18);

      body +=
        '<g class="slice" id="slice-' + esc(seg.id) + '" data-id="' + esc(seg.id) + '"' +
          ' tabindex="0" role="button" aria-label="' + esc(seg.name) + ' — open worksheets and tools"' +
          ' style="animation-delay:' + (0.06 * i).toFixed(2) + 's">' +
          '<g class="slice-group" style="--tx:' + tx + 'px; --ty:' + ty + 'px">' +
            '<path class="slice-shape" d="' + d + '" fill="url(#grad-' + esc(seg.id) + ')"' +
              ' stroke="' + esc(shade(seg.color, 0.06)) + '"/>' +
            '<path class="slice-focus" d="' + d + '"/>' +
            iconMarkup(seg.icon, iconXY[0], iconXY[1]) +
            labelMarkup(seg, c[0], labelY, c[1]) +
          '</g>' +
        '</g>';
    });

    defs += '</defs>';

    var deco =
      '<circle class="wheel-ring-outer" cx="' + CX + '" cy="' + CY + '" r="360"/>' +
      '<circle class="wheel-ring-dots" cx="' + CX + '" cy="' + CY + '" r="374"/>';

    var center =
      '<g class="wheel-center">' +
        '<g class="center-hit" data-id="' + esc(CENTER.id) + '" tabindex="0" role="button"' +
          ' aria-label="' + esc(CENTER.name) + ' — open worksheets and tools">' +
          '<circle class="wheel-plate center-plate" cx="' + CX + '" cy="' + CY + '" r="' + R_DISC + '"/>' +
          '<circle class="center-focus" cx="' + CX + '" cy="' + CY + '" r="' + (R_DISC - 8) + '"/>' +
          '<circle class="avatar-disc" cx="400" cy="354" r="72"/>' +
          '<g clip-path="url(#avatarClip)">' +
            '<circle class="avatar-fg" cx="400" cy="336" r="26"/>' +
            '<path class="avatar-fg" d="M360 440v-30a40 40 0 0 1 80 0v30z"/>' +
          '</g>' +
          '<text class="center-label" x="400" y="470">CUSTOMER</text>' +
          '<text class="center-sub" x="400" y="498">who it&#8217;s all for</text>' +
        '</g>' +
      '</g>';

    svg.innerHTML =
      defs +
      '<clipPath id="avatarClip"><circle cx="400" cy="354" r="72"/></clipPath>' +
      deco + body + center;
  }

  function iconMarkup(id, x, y) {
    var s = 36;
    return '<use class="slice-icon" href="#' + esc(id) + '" x="' + f(x - s / 2) + '" y="' + f(y - s / 2) +
           '" width="' + s + '" height="' + s + '"/>';
  }

  /* Two label sets: the full name, and a short one used on narrow screens
     where the icon is hidden and the short label takes the whole block. */
  function labelMarkup(seg, x, labelY, centreY) {
    return textBlock(seg.lines, x, labelY, 'is-full') +
           textBlock(seg.short || seg.lines, x, centreY, 'is-short');
  }

  function textBlock(lines, x, y, cls) {
    var out = '<text class="slice-label ' + cls + '" x="' + f(x) + '" y="' + f(y) + '" dominant-baseline="central">';
    if (lines.length === 1) {
      out += esc(lines[0]);
    } else {
      lines.forEach(function (line, i) {
        out += '<tspan x="' + f(x) + '" y="' + f(y + i * 26) + '">' + esc(line) + '</tspan>';
      });
    }
    return out + '</text>';
  }

  /* Lighten (amount > 0) or darken (amount < 0) a hex colour. */
  function shade(hex, amount) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '');
    if (!m) { return hex; }
    var rgb = [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)].map(function (c) {
      var v = amount >= 0 ? c + (255 - c) * amount : c * (1 + amount);
      return Math.max(0, Math.min(255, Math.round(v)));
    });
    return '#' + rgb.map(function (c) { return ('0' + c.toString(16)).slice(-2); }).join('');
  }

  /* -------------------------------------------------------- brand mark -- */
  function buildBrandMark() {
    var el = document.getElementById('brandMark');
    if (!el) { return; }
    var c = 50, ro = 48, ri = 26, step = 360 / SEGMENTS.length, out = '';
    SEGMENTS.forEach(function (seg, i) {
      var a0 = (-90 + i * step + 2) * DEG, a1 = (-90 + (i + 1) * step - 2) * DEG;
      var p = function (r, a) { return f(c + r * Math.cos(a)) + ',' + f(c + r * Math.sin(a)); };
      out += '<path d="M' + p(ri, a0) + 'L' + p(ro, a0) +
             'A' + ro + ' ' + ro + ' 0 0 1 ' + p(ro, a1) +
             'L' + p(ri, a1) + 'A' + ri + ' ' + ri + ' 0 0 0 ' + p(ri, a0) + 'Z" fill="' + esc(seg.color) + '"/>';
    });
    out += '<circle cx="50" cy="50" r="17" fill="' + esc(CENTER.color) + '" opacity=".28"/>';
    el.innerHTML = out;
  }

  /* ------------------------------------------------------------- cards -- */
  function buildCards() {
    var wrap = document.getElementById('cards');
    if (!wrap) { return; }
    var html = '';

    html +=
      '<button class="card is-center" type="button" data-id="' + esc(CENTER.id) + '" style="--dept:' + esc(CENTER.color) + '">' +
        '<span class="card-icon"><svg width="26" height="26" aria-hidden="true"><use href="#' + esc(CENTER.icon) + '"/></svg></span>' +
        '<span>' +
          '<span class="card-title">' + esc(CENTER.name) + '<span class="sr-only"> — open worksheets and tools</span></span>' +
          '<span class="card-tagline">' + esc(CENTER.tagline) + '</span>' +
        '</span>' +
        '<span class="card-meta"><span class="go">' + countLabel(CENTER) +
          ' <svg width="14" height="14" aria-hidden="true"><use href="#ic-arrow"/></svg></span></span>' +
      '</button>';

    SEGMENTS.forEach(function (seg) {
      html +=
        '<button class="card" type="button" data-id="' + esc(seg.id) + '" style="--dept:' + esc(seg.color) + '">' +
          '<span class="card-icon"><svg width="24" height="24" aria-hidden="true"><use href="#' + esc(seg.icon) + '"/></svg></span>' +
          '<span class="card-title">' + esc(seg.name) + '<span class="sr-only"> — open worksheets and tools</span></span>' +
          '<span class="card-tagline">' + esc(seg.tagline) + '</span>' +
          '<span class="card-meta">' +
            '<span>' + countLabel(seg) + '</span>' +
            '<span class="go">Open <svg width="14" height="14" aria-hidden="true"><use href="#ic-arrow"/></svg></span>' +
          '</span>' +
        '</button>';
    });

    wrap.innerHTML = html;
  }

  function countLabel(item) {
    var n = (item.resources || []).length;
    return n + (n === 1 ? ' tool' : ' worksheets &amp; tools');
  }

  /* ------------------------------------------------------------- panel -- */
  var dlg = document.getElementById('panel');
  var lastFocus = null;
  var currentIndex = 0;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function fileKind(path) {
    var m = /\.([a-z0-9]+)(?:[?#]|$)/i.exec(path || '');
    return m ? m[1].toUpperCase() : 'FILE';
  }

  function resourceMarkup(r) {
    var href = r.file || r.link || '';
    var ready = !!href;
    var tag, foot;

    if (r.file) {
      foot = '<svg width="13" height="13" aria-hidden="true"><use href="#ic-download"/></svg> Download ' + esc(fileKind(r.file));
      tag = ' download';
    } else if (r.link) {
      foot = '<svg width="13" height="13" aria-hidden="true"><use href="#ic-external"/></svg> Open tool';
      tag = ' target="_blank" rel="noopener noreferrer"';
    } else {
      foot = '<svg width="13" height="13" aria-hidden="true"><use href="#ic-clock"/></svg> Coming soon';
      tag = '';
    }

    var open = ready ? '<a class="res is-ready" href="' + esc(href) + '"' + tag + '>' : '<div class="res is-soon">';
    var close = ready ? '</a>' : '</div>';

    return open +
      '<span class="res-top">' +
        '<span class="res-title">' + esc(r.title) + '</span>' +
        '<span class="res-badge">' + esc(r.kind) + '</span>' +
      '</span>' +
      '<span class="res-desc">' + esc(r.desc) + '</span>' +
      '<span class="res-foot">' + foot + '</span>' +
      close;
  }

  function openPanel(id, viaEl) {
    var idx = ALL.findIndex(function (x) { return x.id === id; });
    if (idx < 0) { return; }
    var item = ALL[idx];
    currentIndex = idx;
    lastFocus = viaEl || document.activeElement;

    dlg.style.setProperty('--dept', item.color);
    document.getElementById('panelIconUse').setAttribute('href', '#' + item.icon);
    document.getElementById('panelEyebrow').textContent =
      item.id === CENTER.id ? 'The centre of the model' : 'Business function';
    document.getElementById('panelTitle').textContent = item.name;
    document.getElementById('panelTagline').textContent = item.tagline;

    var res = item.resources || [];
    var ready = res.filter(function (r) { return r.file || r.link; }).length;
    document.getElementById('panelCount').innerHTML =
      res.length + ' worksheets &amp; tools' +
      (ready ? ' &middot; ' + ready + ' available now' : ' &middot; publishing soon');

    document.getElementById('panelBody').innerHTML =
      '<p class="panel-summary">' + esc(item.summary) + '</p>' +
      '<h3 class="panel-sub">Questions this part answers</h3>' +
      '<ul class="questions">' + item.questions.map(function (q) {
        return '<li>' + esc(q) + '</li>';
      }).join('') + '</ul>' +
      '<h3 class="panel-sub">Worksheets &amp; tools</h3>' +
      '<div class="res-grid">' + res.map(resourceMarkup).join('') + '</div>';

    document.getElementById('panelBody').scrollTop = 0;
    markActive(item.id);

    if (!dlg.open) { dlg.showModal(); }
    requestAnimationFrame(function () { dlg.classList.add('is-open'); });
    try { history.replaceState(null, '', '#' + item.id); } catch (e) {}
  }

  function closePanel() {
    dlg.classList.remove('is-open');
    markActive(null);
    var done = function () {
      if (dlg.open) { dlg.close(); }
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
      if (lastFocus && lastFocus.focus) { lastFocus.focus(); }
    };
    if (reduced) { done(); } else { setTimeout(done, 240); }
  }

  function markActive(id) {
    document.querySelectorAll('.slice.is-active').forEach(function (el) { el.classList.remove('is-active'); });
    if (id) {
      var el = document.getElementById('slice-' + id);
      if (el) { el.classList.add('is-active'); }
    }
  }

  function step(delta) {
    var next = (currentIndex + delta + ALL.length) % ALL.length;
    openPanel(ALL[next].id, lastFocus);
  }

  /* ------------------------------------------------------------- wire -- */
  function wire() {
    /* wheel + cards both open the panel */
    document.addEventListener('click', function (e) {
      var hit = e.target.closest('.slice, .center-hit, .card');
      if (hit && hit.dataset.id) { openPanel(hit.dataset.id, hit); }
    });

    /* the SVG groups are buttons, so they need their own key handling */
    document.addEventListener('keydown', function (e) {
      var hit = e.target.closest && e.target.closest('.slice, .center-hit');
      if (!hit) { return; }
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        openPanel(hit.dataset.id, hit);
        return;
      }
      var dir = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1
              : (e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0;
      if (!dir) { return; }
      e.preventDefault();
      var focusable = [].slice.call(document.querySelectorAll('.slice, .center-hit'));
      var at = focusable.indexOf(hit);
      var to = focusable[(at + dir + focusable.length) % focusable.length];
      if (to) { to.focus(); }
    });

    document.getElementById('panelClose').addEventListener('click', closePanel);
    document.getElementById('panelPrev').addEventListener('click', function () { step(-1); });
    document.getElementById('panelNext').addEventListener('click', function () { step(1); });

    /* click on the backdrop */
    dlg.addEventListener('click', function (e) { if (e.target === dlg) { closePanel(); } });

    /* Esc: animate out rather than snapping shut */
    dlg.addEventListener('cancel', function (e) { e.preventDefault(); closePanel(); });
    dlg.addEventListener('close', function () { dlg.classList.remove('is-open'); markActive(null); });

    /* Following a link to #finance from elsewhere on the page should open that
       panel. Our own replaceState calls do not fire this event. */
    window.addEventListener('hashchange', function () {
      var id = (location.hash || '').replace('#', '');
      if (id && ALL.some(function (x) { return x.id === id; })) {
        openPanel(id, null);
      } else if (!id && dlg.open) {
        closePanel();
      }
    });

    /* theme */
    var toggle = document.getElementById('themeToggle');
    toggle.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('bmt-theme', next); } catch (e) {}
    });
  }

  /* ------------------------------------------------------------- copy -- */
  function applyCopy() {
    var b = DATA.brand || {};
    var set = function (id, value) {
      var el = document.getElementById(id);
      if (el && value) { el.textContent = value; }
    };
    set('brandName', b.name);
    set('brandSub', b.tagline);
    set('heroEyebrow', b.heroEyebrow);
    set('heroTitle', b.heroTitle);
    set('heroLead', b.heroLead);
    set('footerNote', b.footerNote);
    if (b.name) { document.title = b.name + ' — ' + (b.tagline || ''); }
  }

  /* -------------------------------------------------------------- init -- */
  applyCopy();
  buildWheel();
  buildBrandMark();
  buildCards();
  wire();

  var hash = (location.hash || '').replace('#', '');
  if (hash && ALL.some(function (x) { return x.id === hash; })) {
    openPanel(hash, null);
  }
})();
