    /* ===========================================================
       A. PROJECTS DATA
       ─────────────────────────────────────────────────────────
       Each project object supports:
         title       {string}   — project name
         description {string}   — short description (1–2 sentences)
         tags        {string[]} — tech used (shown as chips)
         github      {string}   — GitHub repo URL  (empty "" = no button)
         live        {string}   — Live site URL    (empty "" = no button)
         featured    {boolean}  — adds accent border highlight

       TO ADD A PROJECT: copy one object, paste after the last
       comma, fill in the fields.
    =========================================================== */
    const projects = [
      {
        title:       "HTML to Image Converter",
        description: "Browser-based tool that turns raw HTML/CSS into downloadable images — built specifically for content creators exporting social cards without a backend.",
        tags:        ["HTML", "CSS", "JavaScript"],
        github:      "https://github.com/commitfrncs",   // ← update
        live:        "https://commitfrncs.github.io",    // ← update
        featured:    true,
      },
      {
        title:       "Quattros Restaurant Redesign",
        description: "Full spec redesign for Quattros — a mobile-first restaurant site with a menu section, photo gallery, and reservation call-to-action.",
        tags:        ["HTML", "CSS", "JavaScript", "UI Design"],
        github:      "https://github.com/commitfrncs",   // ← update
        live:        "https://commitfrncs.github.io",    // ← update
        featured:    false,
      },
      {
        title:       "Developer Hub",
        description: "Personal portfolio + UI component library in one. Houses downloadable cheat sheets, reusable snippets, and showcases my frontend work.",
        tags:        ["HTML", "CSS", "JavaScript"],
        github:      "https://github.com/commitfrncs",   // ← update
        live:        "https://commitfrncs.github.io",    // ← update
        featured:    false,
      },
      {
        title:       "E-Commerce + WhatsApp TV",
        description: "Hybrid storefront with product listings and an integrated WhatsApp TV — combining e-commerce UX with a direct-to-customer broadcast channel.",
        tags:        ["HTML", "CSS", "JavaScript"],
        github:      "https://github.com/commitfrncs",   // ← update
        live:        "https://commitfrncs.github.io",    // ← update
        featured:    false,
      },
      {
        title:       "New Realms School",
        description: "School website for New Realms School, Ibadan — featuring an admissions section, academic calendar, and a staff portal landing page.",
        tags:        ["HTML", "CSS", "JavaScript"],
        github:      "https://github.com/commitfrncs",   // ← update
        live:        "https://commitfrncs.github.io",    // ← update
        featured:    false,
      },
      {
        title:       "@commitfrncs Card System",
        description: "The HTML/CSS design system powering all my social media posts — 500×500 Instagram carousels and landscape X cards, exported as images.",
        tags:        ["HTML", "CSS", "Design System"],
        github:      "https://github.com/commitfrncs",   // ← update
        live:        "",                                  // no live URL
        featured:    false,
      },
    ];

    /* ===========================================================
       B. PROJECT RENDERER
       Reads the projects[] array and builds the cards into
       #projectsGrid. No need to touch this unless you want to
       change the card structure/layout.
    =========================================================== */
    function renderProjects() {
      const grid = document.getElementById("projectsGrid");
      if (!grid) return;

      grid.innerHTML = projects.map((p, i) => `
        <div class="glass-card project-card reveal"
             style="${p.featured ? "border-color: var(--accent-border);" : ""}">
          <div class="project-num">PROJECT — ${String(i + 1).padStart(2, "0")}</div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-desc">${p.description}</p>
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join("")}
          </div>
          <div class="project-actions">
            ${p.github
              ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn-sm">
                   ⎇&nbsp; GitHub
                 </a>`
              : ""}
            ${p.live
              ? `<a href="${p.live}" target="_blank" rel="noopener" class="btn-sm btn-accent">
                   ↗&nbsp; Live Site
                 </a>`
              : ""}
          </div>
        </div>
      `).join("");

      // Re-observe newly injected cards for scroll reveal
      observeRevealElements();
    }


    /* ===========================================================
       C. TYPING ANIMATION
       Cycles through `roles` with a typewriter effect.
       EDIT: Change the strings in `roles` to update what types.
    =========================================================== */
    const roles = [
      "Frontend Developer.",
      "UI Designer.",
      "Content Creator.",
      "Freelancer.",
    ];

    let roleIndex  = 0;
    let charIndex  = 0;
    let isDeleting = false;
    const typedEl  = document.getElementById("typedText");

    function typeRole() {
      if (!typedEl) return;
      const current = roles[roleIndex];

      typedEl.textContent = isDeleting
        ? current.substring(0, charIndex - 1)
        : current.substring(0, charIndex + 1);

      charIndex += isDeleting ? -1 : 1;

      let delay = isDeleting ? 55 : 95;

      if (!isDeleting && charIndex === current.length) {
        delay = 1900; isDeleting = true;               // pause at end
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;   // next role
        delay = 350;
      }

      setTimeout(typeRole, delay);
    }


    /* ===========================================================
       D. NAVBAR SCROLL EFFECT
       Adds .scrolled class (glass blur) after 60px of scroll.
    =========================================================== */
    const navbar = document.getElementById("navbar");

    function handleNavbarScroll() {
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    }


    /* ===========================================================
       E. ACTIVE NAV LINK HIGHLIGHTING
       Marks the link whose section is currently on screen.
    =========================================================== */
    const allSections = document.querySelectorAll("section[id]");
    const allNavLinks = document.querySelectorAll(".nav-link, .sidebar-link");

    function updateActiveLink() {
      let currentId = "";

      allSections.forEach(sec => {
        // 120px offset accounts for the fixed navbar height
        if (window.scrollY >= sec.offsetTop - 120) {
          currentId = sec.getAttribute("id");
        }
      });

      allNavLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("active", isActive);
      });
    }


    /* ===========================================================
       F. MOBILE SIDEBAR
       Open/close the slide-in drawer and its overlay.
    =========================================================== */
    const hamburger      = document.getElementById("hamburger");
    const sidebar        = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const sidebarLinks   = document.querySelectorAll(".sidebar-link");

    function openSidebar() {
      sidebar.classList.add("open");
      hamburger.classList.add("open");
      sidebarOverlay.classList.add("visible");
      hamburger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden"; // prevent background scroll
    }

    function closeSidebar() {
      sidebar.classList.remove("open");
      hamburger.classList.remove("open");
      sidebarOverlay.classList.remove("visible");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    hamburger.addEventListener("click", () =>
      sidebar.classList.contains("open") ? closeSidebar() : openSidebar()
    );

    sidebarOverlay.addEventListener("click", closeSidebar);

    // Close sidebar when any nav link inside it is clicked
    sidebarLinks.forEach(link => link.addEventListener("click", closeSidebar));

    // Close sidebar on Escape key
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && sidebar.classList.contains("open")) closeSidebar();
    });


    /* ===========================================================
       G. SCROLL REVEAL
       Uses IntersectionObserver to fade elements into view
       as you scroll down. Fires once per element.
    =========================================================== */
    function observeRevealElements() {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // animate once, then stop watching
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -55px 0px" }
      );

      document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    }


    /* ===========================================================
       H. THEME TOGGLE
       Cycles: System (🖥️) → Light (☀️) → Dark (🌙) → System
       Preference is saved to localStorage so it persists.
    =========================================================== */
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon   = document.getElementById("themeIcon");
    const htmlEl      = document.documentElement;

    const THEMES      = ["system", "light", "dark"];
    const ICONS       = { system: "🖥️", light: "☀️", dark: "🌙" };

    let themeIndex = 0; // default: system

    // Restore saved preference on page load
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme && THEMES.includes(savedTheme)) {
      themeIndex = THEMES.indexOf(savedTheme);
    }
    applyTheme(THEMES[themeIndex]);

    function applyTheme(theme) {
      if (theme === "system") {
        htmlEl.removeAttribute("data-theme"); // fall back to @media prefers-color-scheme
      } else {
        htmlEl.setAttribute("data-theme", theme);
      }
      themeIcon.textContent = ICONS[theme];
    }

    themeToggle.addEventListener("click", () => {
      themeIndex = (themeIndex + 1) % THEMES.length;
      const next = THEMES[themeIndex];
      applyTheme(next);
      localStorage.setItem("portfolio-theme", next);
    });


    /* ===========================================================
       I. CONTACT FORM
       ─────────────────────────────────────────────────────────
       Currently shows an alert on submit.
       TO MAKE IT REAL: replace the console.log + alert block
       with a fetch() call to Formspree or EmailJS.

       Formspree example:
         fetch("https://formspree.io/f/YOUR_ID", {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify({ name, email, message })
         });
    =========================================================== */
    function handleFormSubmit(e) {
      e.preventDefault();

      const name    = document.getElementById("contactName").value.trim();
      const email   = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMsg").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all fields before sending.");
        return;
      }

      // ← Replace this block with your real form service call
      console.log("Form submitted:", { name, email, message });
      alert(`Thanks, ${name}! Your message has been sent. I'll get back to you soon.`);
    }


    /* ===========================================================
       J. INIT
       Runs once the DOM is ready.
    =========================================================== */
    document.addEventListener("DOMContentLoaded", () => {
      renderProjects();      // inject project cards
      typeRole();            // start typing animation
      observeRevealElements(); // init scroll reveal
    });

    // Passive scroll listeners for performance
    window.addEventListener("scroll", () => {
      handleNavbarScroll();
      updateActiveLink();
    }, { passive: true });
