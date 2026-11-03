/**
 * Personal homepage behaviour.
 * Page-specific, dependency-free. Section order mirrors the document.
 */

(function () {
  "use strict";

  const header = document.querySelector("#header");
  const headerToggleBtn = document.querySelector(".header-toggle");
  const headerToggleIcon = headerToggleBtn ? headerToggleBtn.querySelector("i") : null;
  const mainContent = document.querySelector("#main-content");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopNavigation = window.matchMedia("(min-width: 1200px)");

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
    let section;
    try {
      section = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch {
      return;
    }
    if (!section) return;
    setTimeout(() => {
      const scrollMarginTop = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
      window.scrollTo({
        top: section.offsetTop - scrollMarginTop,
        behavior: reducedMotion.matches ? "auto" : "smooth",
      });
    }, 100);
  });

  const navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    let activeLink = null;
    const position = window.scrollY + 120;
    navmenulinks.forEach((link) => {
      const section = link.hash && document.getElementById(link.hash.slice(1));
      if (section && section.offsetTop <= position) activeLink = link;
    });
    // Short sections at the bottom must still receive the active marker.
    if (window.scrollY > 0 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      activeLink =
        [...navmenulinks].reverse().find((link) => link.hash && document.getElementById(link.hash.slice(1))) ||
        activeLink;
    }
    const pathBySection = {
      hero: "research",
      about: "about.md",
      publications: "publications",
      projects: "funding",
      organizations: "experience",
      recruitment: "recruitment.md",
      contact: "contact.md",
    };
    if (activeLink) {
      const sectionId = activeLink.hash.slice(1);
      const path = `~/zhichen/${pathBySection[sectionId] || sectionId}`;
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
  window.addEventListener("resize", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  document.addEventListener("keydown", (event) => {
    const quickNav = document.querySelector("#quick-nav");
    if (event.key === "Escape" && !quickNav?.open && document.querySelector("#header.header-show")) {
      setHeaderOpen(false);
      headerToggleBtn?.focus();
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
   * Appearance: system, light, dark
   * ------------------------------------------------------------------ */

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const themeToggle = document.querySelector(".theme-toggle");
  const appearanceModes = ["system", "light", "dark"];

  function applyAppearance(mode) {
    document.documentElement.dataset.themeMode = mode;
    document.documentElement.dataset.theme =
      mode === "system" ? (systemTheme.matches ? "dark" : "light") : mode;
    if (!themeToggle) return;
    const labels = { system: "Auto", light: "Light", dark: "Dark" };
    const icons = { system: "bi-circle-half", light: "bi-sun", dark: "bi-moon" };
    const label = themeToggle.querySelector("span");
    const icon = themeToggle.querySelector("i");
    if (label) label.textContent = labels[mode];
    if (icon) icon.className = `bi ${icons[mode]}`;
    themeToggle.title = `Appearance: ${mode}`;
    const next = appearanceModes[(appearanceModes.indexOf(mode) + 1) % appearanceModes.length];
    themeToggle.setAttribute("aria-label", `Appearance: ${mode}. Switch to ${next}.`);
  }

  applyAppearance(document.documentElement.dataset.themeMode || "system");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next =
        appearanceModes[
          (appearanceModes.indexOf(document.documentElement.dataset.themeMode) + 1) % appearanceModes.length
        ];
      try {
        localStorage.setItem("homepage-theme", next);
      } catch {
        /* storage is optional */
      }
      applyAppearance(next);
    });
  }

  systemTheme.addEventListener("change", () => {
    if (document.documentElement.dataset.themeMode === "system") applyAppearance("system");
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
