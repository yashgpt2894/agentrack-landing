(function () {
  'use strict';
  document.documentElement.classList.add('js');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal on scroll ---------- */
  var revealTargets = document.querySelectorAll(
    '.band .h2, .band .lede, .board, .refs, .circuit, .role, .procedure, .nameplate, .rate, .audit, .terms'
  );
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        el.classList.add('reveal');
        io.observe(el);
      }
    });
    // Insurance: content must never stay hidden because an observer did not fire.
    window.setTimeout(function () {
      document.querySelectorAll('.reveal:not(.is-in)').forEach(function (el) {
        el.classList.add('is-in');
        io.unobserve(el);
      });
    }, 3000);
  }

  /* ---------- The discovery scan ---------- */
  var board = document.querySelector('[data-board]');
  var scanBtn = document.getElementById('scan');
  var scanLabel = document.getElementById('scan-label');
  var scanNote = document.getElementById('scan-note');
  var estate = document.querySelector('[data-estate]');
  var READOUTS = {
    'total': '18',
    'redundant': '6',
    'drifted': '3',
    'waste': '\u20AC1,535',
    'score': '55'
  };
  var scanned = false;

  function setReadout(key, value) {
    var el = document.querySelector('.readout__v[data-k="' + key + '"]');
    if (!el) { return; }
    el.textContent = value;
    if (!reduce) {
      el.classList.remove('board__readout-updated');
      void el.offsetWidth;
      el.classList.add('board__readout-updated');
    }
  }

  function runScan() {
    if (!board || scanned) { return; }
    scanned = true;
    scanBtn.disabled = true;
    scanLabel.textContent = 'Scanning APIs, webhooks, LLM keys\u2026';
    if (typeof expandRegister === 'function') { expandRegister(); }

    var sweep = document.createElement('div');
    sweep.className = 'sweep';
    board.appendChild(sweep);
    window.requestAnimationFrame(function () { sweep.classList.add('is-on'); });

    window.setTimeout(function () {
      var shadowRows = board.querySelectorAll('tr[data-shadow="1"]');
      shadowRows.forEach(function (row, i) {
        row.hidden = false;
        if (!reduce) {
          window.setTimeout(function () { row.classList.add('lit'); }, 90 * i);
        }
      });
      Object.keys(READOUTS).forEach(function (k) { setReadout(k, READOUTS[k]); });
      if (estate) { estate.textContent = '18 agents across 12 teams'; }
      var note = document.querySelector('[data-k="total-note"]');
      if (note) { note.textContent = '2 found by discovery scan'; }
      scanLabel.textContent = 'Scan complete \u2014 2 shadow agents found';
      if (scanNote) {
        scanNote.textContent = 'Two unregistered agents were live on the estate. Both are now in the register, both unowned.';
      }
      window.setTimeout(function () { if (sweep.parentNode) { sweep.parentNode.removeChild(sweep); } }, 1400);
      applyFilter(currentFilter);
    }, reduce ? 60 : 1150);
  }

  if (scanBtn) { scanBtn.addEventListener('click', runScan); }


  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');
  var mobile = window.matchMedia('(max-width: 900px)');

  function closeMenu(returnFocus) {
    if (!menuBtn || !nav) { return; }
    nav.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) { menuBtn.focus(); }
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      if (open) {
        var first = nav.querySelector('a');
        if (first) { first.focus(); }
      }
    });
    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) { closeMenu(false); }
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') { closeMenu(true); }
    });
    document.addEventListener('click', function (event) {
      if (!nav.classList.contains('is-open')) { return; }
      if (nav.contains(event.target) || menuBtn.contains(event.target)) { return; }
      closeMenu(false);
    });
    mobile.addEventListener('change', function () { closeMenu(false); });
  }

  /* ---------- Progressive disclosure for the register on small screens ---------- */
  var moreBtn = document.getElementById('registry-more');
  var COLLAPSED_ROWS = 6;
  var expanded = false;

  function applyCollapse() {
    var rows = document.querySelectorAll('#registry tbody tr');
    var shouldCollapse = mobile.matches && !expanded;
    var shown = 0;
    rows.forEach(function (row, i) {
      var isShadow = row.getAttribute('data-shadow') === '1';
      if (shouldCollapse && !isShadow && shown >= COLLAPSED_ROWS) {
        row.classList.add('is-collapsed');
      } else {
        row.classList.remove('is-collapsed');
      }
      if (!isShadow) { shown += 1; }
    });
    if (moreBtn) {
      var total = rows.length;
      moreBtn.textContent = 'Show the other ' + (total - COLLAPSED_ROWS) + ' agents';
      moreBtn.hidden = !shouldCollapse;
    }
  }

  function expandRegister() {
    expanded = true;
    applyCollapse();
  }

  if (moreBtn) {
    moreBtn.addEventListener('click', expandRegister);
    mobile.addEventListener('change', function () {
      if (!mobile.matches) { expanded = false; }
      applyCollapse();
    });
    applyCollapse();
  }

  /* ---------- Registry filters ---------- */
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chip[data-filter]'));
  var currentFilter = 'all';

  function applyFilter(status) {
    if (typeof applyCollapse === 'function') { applyCollapse(); }
    currentFilter = status;
    var rows = document.querySelectorAll('#registry tbody tr');
    rows.forEach(function (row) {
      var isShadow = row.getAttribute('data-shadow') === '1';
      var hiddenByScan = isShadow && !scanned;
      var hiddenByFilter = status !== 'all' && row.getAttribute('data-status') !== status;
      var hiddenByCollapse = row.classList.contains('is-collapsed');
      row.hidden = hiddenByScan || hiddenByCollapse || hiddenByFilter;
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
      applyFilter(chip.getAttribute('data-filter'));
    });
  });

  /* ---------- Conductor trace on a redundancy cluster ---------- */
  var svg = document.querySelector('svg.trace');
  var inner = document.querySelector('.tablewrap__inner');
  var traceTimer = null;

  function clearTrace() {
    if (svg) { svg.innerHTML = ''; svg.classList.remove('is-drawn'); }
  }

  function drawTrace(cluster) {
    if (!svg || !inner || window.innerWidth <= 900) { return; }
    var rows = Array.prototype.slice.call(
      document.querySelectorAll('#registry tbody tr[data-cluster="' + cluster + '"]')
    ).filter(function (r) { return !r.hidden; });
    if (rows.length < 2) { clearTrace(); return; }

    var base = inner.getBoundingClientRect();
    var x = 4;
    var parts = [];
    var top = 0, bottom = 0;

    rows.forEach(function (row, i) {
      var r = row.getBoundingClientRect();
      var y = r.top - base.top + r.height / 2;
      if (i === 0) { top = y; }
      bottom = y;
      parts.push('<line x1="' + x + '" y1="' + y.toFixed(1) + '" x2="' + (x + 13) + '" y2="' + y.toFixed(1) + '" style="--len:14"/>');
      parts.push('<circle cx="' + (x + 13) + '" cy="' + y.toFixed(1) + '" r="2.6"/>');
    });
    parts.push('<line x1="' + x + '" y1="' + top.toFixed(1) + '" x2="' + x + '" y2="' + bottom.toFixed(1) + '" style="--len:' + (bottom - top).toFixed(1) + '"/>');
    parts.push('<line x1="0" y1="' + ((top + bottom) / 2).toFixed(1) + '" x2="' + x + '" y2="' + ((top + bottom) / 2).toFixed(1) + '" style="--len:9"/>');

    svg.innerHTML = parts.join('');
    rows.forEach(function (row) { row.classList.add('is-traced'); });
    svg.classList.add('is-drawn');
  }

  function scheduleTrace(cluster) {
    window.clearTimeout(traceTimer);
    var rows = document.querySelectorAll('#registry tbody tr');
    rows.forEach(function (r) { r.classList.remove('is-traced'); });
    clearTrace();
    if (!cluster) { return; }
    traceTimer = window.setTimeout(function () { drawTrace(cluster); }, 40);
  }

  document.querySelectorAll('#registry tbody tr[data-cluster]').forEach(function (row) {
    var cluster = row.getAttribute('data-cluster');
    row.addEventListener('mouseenter', function () { scheduleTrace(cluster); });
    row.addEventListener('mouseleave', function () { scheduleTrace(null); });
    var cell = row.querySelector('.c-agent');
    if (cell) {
      cell.addEventListener('focus', function () { scheduleTrace(cluster); });
      cell.addEventListener('blur', function () { scheduleTrace(null); });
    }
  });

  window.addEventListener('resize', function () {
    if (svg && svg.classList.contains('is-drawn')) { scheduleTrace(null); }
  });

  /* ---------- Audit request ---------- */
  var form = document.getElementById('audit-form');
  var input = document.getElementById('email');
  var btn = document.getElementById('audit-btn');
  var msg = document.getElementById('form-msg');

  function showMessage(text, ok) {
    if (!msg) { return; }
    msg.textContent = '';
    var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'ico');
    icon.setAttribute('aria-hidden', 'true');
    var use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttribute('href', ok ? '#i-check' : '#i-alert');
    icon.appendChild(use);
    msg.appendChild(icon);
    msg.appendChild(document.createTextNode(text));
    msg.classList.toggle('is-ok', ok);
    msg.classList.toggle('is-err', !ok);
  }

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = (input.value || '').trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      if (!valid) {
        input.setAttribute('aria-invalid', 'true');
        showMessage('That email address does not look complete. Check it and try again.', false);
        input.focus();
        return;
      }
      input.removeAttribute('aria-invalid');
      btn.disabled = true;
      var original = btn.textContent;
      btn.textContent = 'Sending\u2026';
      showMessage('Sending your request\u2026', true);

      window.fetch('https://formspree.io/f/xkoaqaen', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ email: value, source: 'agentrack.io waitlist' })
      }).then(function (response) {
        if (!response.ok) { throw new Error('Request failed'); }
        showMessage('You\u2019re in \u2014 we\u2019ll be in touch within 48 hours.', true);
        form.reset();
      }).catch(function () {
        showMessage('Something went wrong \u2014 please try again or email hello@agentrack.io', false);
      }).then(function () {
        btn.disabled = false;
        btn.textContent = original;
      });
    });
  }
})();
