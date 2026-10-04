/* Harbour & Pine — shared subpage behaviour: filters only. Header/drawer in main.js */
(function () {
  'use strict';
  var bar = document.querySelector('[data-filter-bar]');
  if (bar) {
    var btns = Array.prototype.slice.call(bar.querySelectorAll('[data-filter]'));
    var targets = Array.prototype.slice.call(document.querySelectorAll('[data-filter-target]'));
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btns.forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-selected', 'false'); });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        var key = btn.getAttribute('data-filter');
        targets.forEach(function (sec) {
          var show = key === 'all' || sec.getAttribute('data-filter-target') === key;
          sec.classList.toggle('is-hidden', !show);
        });
        if (key !== 'all') {
          var first = document.querySelector('[data-filter-target]:not(.is-hidden)');
          if (first) { first.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        }
      });
    });
  }
  var gbar = document.querySelector('[data-gallery-filters]');
  if (gbar) {
    var gf = Array.prototype.slice.call(gbar.querySelectorAll('[data-gallery-filter]'));
    var items = Array.prototype.slice.call(document.querySelectorAll('[data-gallery-item]'));
    gf.forEach(function (b) {
      b.addEventListener('click', function () {
        gf.forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        var k = b.getAttribute('data-gallery-filter');
        items.forEach(function (it) {
          it.style.display = (k === 'all' || it.getAttribute('data-gallery-item') === k) ? '' : 'none';
        });
      });
    });
    var lb = document.querySelector('[data-lightbox]');
    var lbImg = document.querySelector('[data-lightbox-img]');
    items.forEach(function (it) {
      it.addEventListener('click', function () {
        var img = it.querySelector('img');
        if (img && lb && lbImg) {
          lbImg.src = img.src; lbImg.alt = img.alt;
          lb.hidden = false;
        }
      });
    });
    var close = document.querySelector('[data-lightbox-close]');
    if (lb) { lb.addEventListener('click', function (e) { if (e.target === lb) lb.hidden = true; }); }
    if (close && lb) { close.addEventListener('click', function () { lb.hidden = true; }); }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && lb) lb.hidden = true; });
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-validate]'), function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (f) {
        var err = f.parentElement.querySelector('[data-error]') || f.nextElementSibling;
        var bad = !f.value || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
        if (bad) { ok = false; if (err && err.hasAttribute('data-error')) err.textContent = 'Please complete this field.'; f.setAttribute('aria-invalid', 'true'); }
        else { if (err && err.hasAttribute && err.hasAttribute('data-error')) err.textContent = ''; f.removeAttribute('aria-invalid'); }
      });
      var note = form.querySelector('[data-ok]');
      if (ok && note) { note.hidden = false; form.reset(); }
    });
  });

})();
