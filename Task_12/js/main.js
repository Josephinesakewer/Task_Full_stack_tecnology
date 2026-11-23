/* =============================================================
 *  main.js — мобильное меню, «липкая» шапка, плавные якоря
 * ============================================================= */
(function () {
    'use strict';

    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    var header = document.querySelector('.header');
    var body = document.body;

    // ---------- мобильное меню ----------
    function closeNav() {
        if (!nav) return;
        nav.classList.remove('is-open');
        if (burger) {
            burger.classList.remove('is-active');
            burger.setAttribute('aria-expanded', 'false');
        }
        body.classList.remove('is-locked');
    }

    function toggleNav() {
        if (!nav) return;
        var opened = nav.classList.toggle('is-open');
        if (burger) {
            burger.classList.toggle('is-active', opened);
            burger.setAttribute('aria-expanded', opened ? 'true' : 'false');
        }
        body.classList.toggle('is-locked', opened);
    }

    if (burger) {
        burger.addEventListener('click', toggleNav);
    }

    if (nav) {
        nav.addEventListener('click', function (e) {
            if (e.target.closest('.nav__link')) closeNav();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNav();
    });

    document.addEventListener('click', function (e) {
        if (!nav || !nav.classList.contains('is-open')) return;
        if (nav.contains(e.target) || (burger && burger.contains(e.target))) return;
        closeNav();
    });

    // ---------- фон шапки при скролле ----------
    function onScroll() {
        if (!header) return;
        header.classList.toggle('is-scrolled', window.pageYOffset > 40);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---------- активный пункт меню ----------
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
    var sections = links
        .map(function (link) {
            var id = link.getAttribute('href');
            return id && id.charAt(0) === '#' ? document.querySelector(id) : null;
        })
        .filter(Boolean);

    if ('IntersectionObserver' in window && sections.length) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (link) {
                    link.classList.toggle(
                        'nav__link--active',
                        link.getAttribute('href') === '#' + entry.target.id
                    );
                });
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach(function (section) { observer.observe(section); });
    }
}());
