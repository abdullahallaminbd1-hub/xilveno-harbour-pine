/* ---------------------------------------------------------------------------
   Harbour & Pine Kitchen - homepage behaviour (local build, phase 1)
   --------------------------------------------------------------------------- */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('has-js');

  /* --- Header: solid/glass once scrolled ---------------------------------- */
  var header = document.querySelector('[data-header]');
  if (header) {
    var syncHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  /* --- Accessible mobile drawer ------------------------------------------- */
  var drawer = document.querySelector('[data-drawer]');
  var openButton = document.querySelector('[data-drawer-open]');

  if (drawer && openButton) {
    var closeTargets = drawer.querySelectorAll('[data-drawer-close]');
    var panel = drawer.querySelector('.mobile-nav__panel');
    var focusables = [];

    var setExpanded = function (state) {
      openButton.setAttribute('aria-expanded', state ? 'true' : 'false');
    };

    var openDrawer = function () {
      focusables = Array.prototype.slice.call(
        drawer.querySelectorAll('a[href], button:not([disabled])')
      );
      drawer.classList.add('is-open');
      drawer.removeAttribute('hidden');
      document.body.classList.add('has-open-nav');
      setExpanded(true);
      var first = drawer.querySelector('.mobile-nav__panel [href], .mobile-nav__panel button');
      if (first) {
        window.setTimeout(function () {
          first.focus();
        }, 60);
      }
    };

    var closeDrawer = function (returnFocus) {
      drawer.classList.remove('is-open');
      document.body.classList.remove('has-open-nav');
      setExpanded(false);
      if (returnFocus !== false) {
        openButton.focus();
      }
      window.setTimeout(function () {
        if (!drawer.classList.contains('is-open')) {
          drawer.setAttribute('hidden', '');
        }
      }, 420);
    };

    openButton.addEventListener('click', function () {
      if (drawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    Array.prototype.forEach.call(closeTargets, function (el) {
      el.addEventListener('click', function () {
        closeDrawer(false);
      });
    });

    /* Close when a drawer link is used (we are a same-page demo). */
    Array.prototype.forEach.call(drawer.querySelectorAll('a[href]'), function (link) {
      link.addEventListener('click', function () {
        closeDrawer(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (!drawer.classList.contains('is-open')) {
        return;
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawer();
        return;
      }
      if (event.key === 'Tab' && focusables.length) {
        var first = focusables[0];
        var last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    if (panel) {
      panel.addEventListener('click', function (event) {
        event.stopPropagation();
      });
    }
  }

  /* --- Scroll reveal ------------------------------------------------------ */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (revealItems.length) {
    if ('IntersectionObserver' in window && !reduceMotion) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
      );
      revealItems.forEach(function (item) {
        observer.observe(item);
      });
    } else {
      revealItems.forEach(function (item) {
        item.classList.add('is-visible');
      });
    }
  }

  /* --- Demo forms (no backend in phase 1) --------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-demo-form]'), function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var note = form.querySelector('[data-form-note]');
      if (note) {
        note.hidden = false;
      }
      var field = form.querySelector('input[type="email"]');
      if (field) {
        field.value = '';
      }
    });
  });

  /* --- Current year ------------------------------------------------------- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-year]'), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
