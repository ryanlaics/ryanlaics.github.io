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

  // Keep a readable static fallback for visitors who prefer reduced motion.
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && reducedMotion.matches) {
    selectTyped.textContent = selectTyped.dataset.typedItems.split(',').map(item => item.trim()).join(' · ');
  }
  if (selectTyped && !reducedMotion.matches) {
    const researchTyped = new Typed('.typed', {
      strings: selectTyped.dataset.typedItems.split(',').map(item => item.trim()),
      loop: true,
      typeSpeed: 55,
      backSpeed: 25,
      backDelay: 2400
    });
    const researchStage = selectTyped.closest('.hero-research');
    researchStage.addEventListener('mouseenter', () => researchTyped.stop());
    researchStage.addEventListener('mouseleave', () => researchTyped.start());
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
    const pathBySection = { hero: 'research', organizations: 'experience' };
    const terminalPath = document.querySelector('.terminal-path');
    if (terminalPath && activeLink) {
      const sectionId = activeLink.hash.slice(1);
      terminalPath.textContent = `~/${pathBySection[sectionId] || sectionId}`;
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
    if (event.key === 'Escape' && !document.querySelector('#quick-nav')?.open && document.querySelector('#header.header-show')) {
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

  // Appearance cycles through the system preference, light, and dark.
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const themeToggle = document.querySelector('.theme-toggle');
  const appearanceModes = ['system', 'light', 'dark'];
  function applyAppearance(mode) {
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.dataset.theme = mode === 'system' ? (systemTheme.matches ? 'dark' : 'light') : mode;
    const labels = { system: 'Auto', light: 'Light', dark: 'Dark' };
    const icons = { system: 'bi-circle-half', light: 'bi-sun', dark: 'bi-moon' };
    themeToggle.querySelector('span').textContent = labels[mode];
    themeToggle.querySelector('i').className = `bi ${icons[mode]}`;
    themeToggle.title = `Appearance: ${mode}`;
    const next = appearanceModes[(appearanceModes.indexOf(mode) + 1) % appearanceModes.length];
    themeToggle.setAttribute('aria-label', `Appearance: ${mode}. Switch to ${next}.`);
  }
  applyAppearance(document.documentElement.dataset.themeMode || 'system');
  themeToggle.addEventListener('click', () => {
    const next = appearanceModes[(appearanceModes.indexOf(document.documentElement.dataset.themeMode) + 1) % appearanceModes.length];
    try { localStorage.setItem('homepage-theme', next); } catch {}
    applyAppearance(next);
  });
  systemTheme.addEventListener('change', () => {
    if (document.documentElement.dataset.themeMode === 'system') applyAppearance('system');
  });

  // Native dialog supplies modal focus containment and Escape dismissal.
  const quickNav = document.querySelector('#quick-nav');
  const quickSearch = document.querySelector('#quick-nav-search');
  const quickResults = document.querySelector('#quick-nav-results');
  const sectionLinks = [...document.querySelectorAll('#navmenu a[href^="#"]')];
  sectionLinks.forEach(link => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.target = link.hash;
    const index = document.createElement('span');
    index.className = 'quick-result-index';
    index.textContent = link.querySelector('.nav-index').textContent;
    index.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = link.querySelector('.nav-label').textContent;
    const arrow = document.createElement('span');
    arrow.className = 'quick-result-arrow';
    arrow.textContent = '↵';
    arrow.setAttribute('aria-hidden', 'true');
    button.append(index, label, arrow);
    item.append(button);
    quickResults.append(item);
    button.addEventListener('click', () => {
      quickNav.close();
      if (document.querySelector('#header.header-show')) headerToggle();
      const section = document.getElementById(button.dataset.target.slice(1));
      location.hash = button.dataset.target;
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    });
  });
  function filterSections() {
    const query = quickSearch.value.trim().toLowerCase();
    [...quickResults.children].forEach(item => {
      const button = item.querySelector('button');
      item.hidden = !button.textContent.toLowerCase().includes(query) && !button.dataset.target.includes(query);
    });
    document.querySelector('.quick-nav-empty').hidden = !!quickResults.querySelector('li:not([hidden])');
  }
  function openQuickNav() {
    if (quickNav.open) return;
    quickSearch.value = '';
    filterSections();
    quickNav.showModal();
    quickSearch.focus();
  }
  document.querySelector('.quick-nav-close').addEventListener('click', () => quickNav.close());
  quickSearch.addEventListener('input', filterSections);
  quickNav.addEventListener('click', event => {
    if (event.target === quickNav) {
      const box = quickNav.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) quickNav.close();
    }
  });
  quickNav.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      quickNav.close();
      return;
    }
    const buttons = [...quickResults.querySelectorAll('li:not([hidden]) button')];
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (!buttons.length) return;
      const current = buttons.indexOf(document.activeElement);
      const next = current < 0 ? (event.key === 'ArrowDown' ? 0 : buttons.length - 1)
        : (current + (event.key === 'ArrowDown' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].focus();
    } else if (event.key === 'Enter' && event.target === quickSearch) {
      event.preventDefault();
      buttons[0]?.click();
    }
  });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && !event.altKey) {
      event.preventDefault();
      if (quickNav.open) quickNav.close();
      else openQuickNav();
    }
  });


})();
