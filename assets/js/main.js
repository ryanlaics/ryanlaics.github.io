/**
 * Personal and DIG@FZU group homepage behaviour.
 * Page-specific, dependency-free. Section order mirrors the document.
 */

(function () {
  "use strict";

  const header = document.querySelector("#header");
  const headerToggleBtn = document.querySelector(".header-toggle");
  const headerToggleIcon = headerToggleBtn ? headerToggleBtn.querySelector("i") : null;
  const mainContent = document.querySelector("#main-content");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopNavigation = window.matchMedia("(min-width: 1000px)");

  const publicationFilters = document.querySelector(".publication-filters");
  const publicationCards = [...document.querySelectorAll("#publication-list .pub-card")];
  const filterButtons = [...publicationFilters.querySelectorAll("button")];
  const publicationStatus = document.getElementById("publication-status");
  const publicationCount = document.querySelector("#publications .record-count");

  function matchesPublicationFilter(card, filter) {
    return filter === "all" || card.dataset.filters.split(" ").includes(filter);
  }

  function filterPublications(button) {
    const filter = button.dataset.filter;
    for (const card of publicationCards) {
      card.hidden = !matchesPublicationFilter(card, filter);
    }
    for (const choice of filterButtons) {
      choice.setAttribute("aria-pressed", String(choice === button));
    }
    const count = button.querySelector(".filter-count").textContent;
    publicationCount.textContent = filter === "all" ? count + " works" : count + " of " + publicationCards.length + " works";
    publicationStatus.textContent = publicationCount.textContent + " shown.";
  }

  const renamedPublicationFilters = {
    "#publications-health": "#publications-interdisciplinary",
    "#publications-energy": "#publications-interdisciplinary",
    "#publications-image": "#publications-generative",
  };

  function followPublicationHash() {
    const replacement = renamedPublicationFilters[location.hash];
    if (replacement) {
      location.replace(replacement);
      return;
    }
    const target = document.getElementById(location.hash.slice(1));
    if (filterButtons.includes(target)) {
      filterPublications(target);
    } else if (publicationCards.includes(target) && target.hidden) {
      filterPublications(document.getElementById("publications-all"));
      target.scrollIntoView({ block: "start" });
    }
  }

  for (const button of filterButtons) {
    const count = publicationCards.filter(card => matchesPublicationFilter(card, button.dataset.filter)).length;
    button.querySelector(".filter-count").textContent = count;
    button.addEventListener("click", () => {
      filterPublications(button);
      history.replaceState(history.state, "", "#" + button.id);
    });
  }
  publicationFilters.hidden = false;
  filterPublications(document.getElementById("publications-selected"));
  followPublicationHash();
  window.addEventListener("hashchange", followPublicationHash);

  /* ------------------------------------------------------------------ *
   * Sidebar / mobile drawer
   * ------------------------------------------------------------------ */

  const sidebarContent = [...(header?.children || [])].filter((element) => element !== headerToggleBtn);
  const isMobileDrawer = () => !desktopNavigation.matches;

  function setHeaderOpen(isOpen) {
    if (!header || !headerToggleBtn) return;
    const open = Boolean(isOpen) && isMobileDrawer();
    header.classList.toggle("header-show", open);
    document.body.classList.toggle("nav-open", open);
    if (headerToggleIcon) {
      headerToggleIcon.classList.toggle("bi-list", !open);
      headerToggleIcon.classList.toggle("bi-x", open);
    }
    headerToggleBtn.setAttribute("aria-expanded", String(open));
    headerToggleBtn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    sidebarContent.forEach((element) => {
      element.inert = isMobileDrawer() && !open;
    });
    if (mainContent) mainContent.inert = open;
    if (open) {
      const firstLink = header.querySelector("#navmenu a");
      if (firstLink) firstLink.focus({ preventScroll: true });
    }
  }

  if (header && headerToggleBtn) {
    function headerToggle() {
      setHeaderOpen(!header.classList.contains("header-show"));
    }

    headerToggleBtn.addEventListener("click", headerToggle);

    // Clicking the scrim (the ::after overlay sits on <body>) closes the drawer.
    document.addEventListener("click", (event) => {
      if (!header.classList.contains("header-show")) return;
      if (header.contains(event.target) || headerToggleBtn.contains(event.target)) return;
      setHeaderOpen(false);
      headerToggleBtn.focus();
    });

    setHeaderOpen(false);

    desktopNavigation.addEventListener("change", () => {
      const sidebarHadFocus = sidebarContent.some((element) => element.contains(document.activeElement));
      setHeaderOpen(false);
      if (!desktopNavigation.matches && sidebarHadFocus) headerToggleBtn.focus();
    });
  }

  /* ------------------------------------------------------------------ *
   * Same-page navigation
   * ------------------------------------------------------------------ */

  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (header && header.classList.contains("header-show")) {
        setHeaderOpen(false);
      }
      const section = document.getElementById(link.hash.slice(1));
      if (section) {
        section.setAttribute("tabindex", "-1");
        section.focus({ preventScroll: true });
      }
    });
  });

  /* ------------------------------------------------------------------ *
   * Back to top
   * ------------------------------------------------------------------ */

  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) scrollTop.classList.toggle("active", window.scrollY > 100);
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotion.matches ? "auto" : "smooth" });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /* ------------------------------------------------------------------ *
   * Scroll reveal (no library: one observer, one class)
   * ------------------------------------------------------------------ */

  const revealElements = [...document.querySelectorAll("[data-aos]")];
  if (revealElements.length) {
    revealElements.forEach((element) => {
      const delay = element.dataset.aosDelay;
      if (delay) element.style.transitionDelay = `${delay}ms`;
      element.removeAttribute("data-aos-delay");
    });
    const revealAll = () => revealElements.forEach((element) => element.classList.add("aos-in"));
    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      revealAll();
    } else {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("aos-in");
            revealObserver.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px" }
      );
      revealElements.forEach((element) => revealObserver.observe(element));
      reducedMotion.addEventListener("change", () => {
        if (reducedMotion.matches) revealAll();
      });
    }
  }

  /* ------------------------------------------------------------------ *
   * Scroll position for hash links and the workbench path
   * ------------------------------------------------------------------ */

  window.addEventListener("load", () => {
    const initialHash = location.hash;
    let section;
    try {
      section = document.getElementById(decodeURIComponent(initialHash.slice(1)));
    } catch {
      return;
    }
    if (!section) return;
    setTimeout(() => {
      if (location.hash !== initialHash) return;
      section.scrollIntoView({
        block: "start",
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }, 100);
  });

  const navmenulinks = document.querySelectorAll(".navmenu a");
  const pathBySection = new Map();
  for (const link of navmenulinks) {
    const id = link.hash.slice(1);
    const label = document.getElementById(id)?.querySelector(".section-label");
    pathBySection.set(id, label?.textContent.trim() || link.querySelector(".nav-label").textContent.toLowerCase());
  }

  function navmenuScrollspy() {
    // The portrait and the guide share the first navigation entry.
    let activeLink = navmenulinks[0];
    const position = window.scrollY + 120;
    navmenulinks.forEach((link) => {
      const section = link.hash && document.getElementById(link.hash.slice(1));
      if (section && section.offsetTop <= position) activeLink = link;
    });
    // A short section near the footer may never reach the top of the viewport.
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      const requestedLink = [...navmenulinks].find((link) => link.hash === location.hash);
      const requestedSection = requestedLink && document.getElementById(requestedLink.hash.slice(1));
      activeLink = navmenulinks[navmenulinks.length - 1];
      if (requestedSection) {
        const top = requestedSection.getBoundingClientRect().top;
        const anchorOffset = parseFloat(getComputedStyle(requestedSection).scrollMarginTop);
        if (top >= anchorOffset - 2 && top < window.innerHeight) activeLink = requestedLink;
      }
    }
    if (activeLink) {
      const sectionId = activeLink.hash.slice(1);
      const path = `~/dig/${pathBySection.get(sectionId)}`;
      document.querySelectorAll(".workbench-path").forEach((element) => {
        if (element.textContent !== path) element.textContent = path;
        element.title = path;
      });
    }
    navmenulinks.forEach((link) => {
      const isActive = link === activeLink;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  window.addEventListener("load", navmenuScrollspy);
  window.addEventListener("hashchange", navmenuScrollspy);
  window.addEventListener("resize", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  document.addEventListener("keydown", (event) => {
    const quickNav = document.querySelector("#quick-nav");
    if (quickNav?.open || !header.classList.contains("header-show")) return;
    if (event.key === "Escape") {
      setHeaderOpen(false);
      headerToggleBtn?.focus();
    } else if (event.key === "Tab") {
      const lastLink = header.querySelector("#navmenu li:last-child a");
      if (event.shiftKey && document.activeElement === headerToggleBtn) {
        event.preventDefault();
        lastLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        headerToggleBtn.focus();
      }
    }
  });

  /* ------------------------------------------------------------------ *
   * Copy email
   * ------------------------------------------------------------------ */

  const copyStatus = document.querySelector("#email-copy-status");
  let copyResetTimer;
  document.querySelectorAll("[data-copy-email]").forEach((button) => {
    button.addEventListener("click", async () => {
      const email = button.dataset.copyEmail;
      button.disabled = true;
      document.querySelectorAll(".email-copy.copied").forEach((other) => other.classList.remove("copied"));
      try {
        await navigator.clipboard.writeText(email);
        button.classList.add("copied");
        if (copyStatus) copyStatus.textContent = `Copied: ${email}`;
      } catch {
        clearTimeout(copyResetTimer);
        if (copyStatus) copyStatus.textContent = `Please copy manually: ${email}`;
      } finally {
        button.disabled = false;
      }
      if (button.classList.contains("copied")) {
        clearTimeout(copyResetTimer);
        copyResetTimer = setTimeout(() => {
          document.querySelectorAll(".email-copy").forEach((other) => other.classList.remove("copied"));
          if (copyStatus) copyStatus.textContent = "";
        }, 3000);
      }
    });
  });

  /* ------------------------------------------------------------------ *
   * Quick navigation dialog
   * ------------------------------------------------------------------ */

  const quickNav = document.querySelector("#quick-nav");
  const quickSearch = document.querySelector("#quick-nav-search");
  const quickResults = document.querySelector("#quick-nav-results");

  if (quickNav && quickSearch && quickResults) {
    const sectionLinks = [...document.querySelectorAll('#navmenu a[href^="#"]')];
    sectionLinks.forEach((link) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.target = link.hash;
      const index = document.createElement("span");
      index.className = "quick-result-index";
      index.textContent = link.querySelector(".nav-index")?.textContent || "";
      index.setAttribute("aria-hidden", "true");
      const label = document.createElement("span");
      label.textContent = link.querySelector(".nav-label")?.textContent || "";
      const arrow = document.createElement("span");
      arrow.className = "quick-result-arrow";
      arrow.textContent = "↵";
      arrow.setAttribute("aria-hidden", "true");
      button.append(index, label, arrow);
      item.append(button);
      quickResults.append(item);
      button.addEventListener("click", () => {
        quickNav.close();
        if (document.querySelector("#header.header-show")) {
          setHeaderOpen(false);
        }
        const section = document.getElementById(button.dataset.target.slice(1));
        location.hash = button.dataset.target;
        if (section) {
          section.scrollIntoView({ behavior: reducedMotion.matches ? "auto" : "smooth" });
          section.setAttribute("tabindex", "-1");
          section.focus({ preventScroll: true });
        }
      });
    });

    function filterSections() {
      const query = quickSearch.value.trim().toLowerCase();
      [...quickResults.children].forEach((item) => {
        const button = item.querySelector("button");
        item.hidden = !button.textContent.toLowerCase().includes(query) && !button.dataset.target.includes(query);
      });
      const empty = document.querySelector(".quick-nav-empty");
      if (empty) empty.hidden = !!quickResults.querySelector("li:not([hidden])");
    }

    function openQuickNav() {
      if (quickNav.open) return;
      quickSearch.value = "";
      filterSections();
      quickNav.showModal();
      quickSearch.focus();
    }

    document.querySelector(".quick-nav-close")?.addEventListener("click", () => quickNav.close());
    quickSearch.addEventListener("input", filterSections);
    quickNav.addEventListener("click", (event) => {
      if (event.target !== quickNav) return;
      const box = quickNav.getBoundingClientRect();
      if (
        event.clientX < box.left ||
        event.clientX > box.right ||
        event.clientY < box.top ||
        event.clientY > box.bottom
      ) {
        quickNav.close();
      }
    });
    quickNav.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        quickNav.close();
        return;
      }
      const buttons = [...quickResults.querySelectorAll("li:not([hidden]) button")];
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        if (!buttons.length) return;
        const current = buttons.indexOf(document.activeElement);
        const next =
          current < 0
            ? event.key === "ArrowDown"
              ? 0
              : buttons.length - 1
            : (current + (event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
        buttons[next].focus();
      } else if (event.key === "Enter" && event.target === quickSearch) {
        event.preventDefault();
        buttons[0]?.click();
      }
    });
    document.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" && !event.altKey) {
        event.preventDefault();
        if (quickNav.open) quickNav.close();
        else openQuickNav();
      }
    });
  }

})();
