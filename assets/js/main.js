/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');
  const headerToggleIcon = headerToggleBtn.querySelector('i');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function headerToggle() {
    const isOpen = document.querySelector('#header').classList.toggle('header-show');
    headerToggleIcon.classList.toggle('bi-list', !isOpen);
    headerToggleIcon.classList.toggle('bi-x', isOpen);
    headerToggleBtn.setAttribute('aria-expanded', String(isOpen));
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? 'auto' : 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    document.querySelectorAll('[data-aos-delay]').forEach(element => {
      element.removeAttribute('data-aos-delay');
    });
    AOS.init({
      duration: 350,
      disable: () => reducedMotion.matches,
      easing: 'ease-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && !reducedMotion.matches) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',').map(item => item.trim());
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 55,
      backSpeed: 25,
      backDelay: 2400
    });
  }

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: reducedMotion.matches ? 'auto' : 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    let activeLink = null;
    const position = window.scrollY + 120;
    navmenulinks.forEach(link => {
      const section = link.hash && document.getElementById(link.hash.slice(1));
      if (section && section.offsetTop <= position) activeLink = link;
    });
    // Short sections at the bottom must still receive the active marker.
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      activeLink = [...navmenulinks].reverse().find(link => link.hash && document.getElementById(link.hash.slice(1))) || activeLink;
    }
    navmenulinks.forEach(link => {
      const isActive = link === activeLink;
      link.classList.toggle('active', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  window.addEventListener('resize', navmenuScrollspy);
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && document.querySelector('#header.header-show')) {
      headerToggle();
      headerToggleBtn.focus();
    }
  });
  document.addEventListener('scroll', navmenuScrollspy);

  const copyStatus = document.querySelector('#email-copy-status');
  const defaultCopyMessage = copyStatus?.textContent;
  let copyResetTimer;
  document.querySelectorAll('[data-copy-email]').forEach(button => {
    button.addEventListener('click', async () => {
      const email = button.dataset.copyEmail;
      button.disabled = true;
      try {
        await navigator.clipboard.writeText(email);
        document.querySelectorAll('.email-copy').forEach(other => other.classList.remove('copied'));
        button.classList.add('copied');
        if (copyStatus) copyStatus.textContent = `Copied: ${email}`;
      } catch {
        if (copyStatus) copyStatus.textContent = `Please copy manually: ${email}`;
      } finally {
        button.disabled = false;
        clearTimeout(copyResetTimer);
        copyResetTimer = setTimeout(() => {
          document.querySelectorAll('.email-copy').forEach(other => other.classList.remove('copied'));
          if (copyStatus) copyStatus.textContent = defaultCopyMessage;
        }, 3000);
      }
    });
  });

})();
