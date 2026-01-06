document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link");
  const jumpLinks = document.querySelectorAll(".nav-jump");

  /* =========================
     SLIDE NAVIGATION
  ========================= */
  function setActiveNav(hash) {
    navLinks.forEach(a => a.classList.remove("active"));
    const active = document.querySelector(`.nav-link[href="${hash}"]`);
    if (active) active.classList.add("active");
  }

  function animateSkillsIfNeeded(hash) {
    const fills = document.querySelectorAll(".fill");
    if (!fills.length) return;

    if (hash === "#skills") {
      fills.forEach(el => {
        const val = el.getAttribute("data-fill") || "0";
        el.style.width = val + "%";
      });
    } else {
      fills.forEach(el => (el.style.width = "0%"));
    }
  }

  function showPage(hash) {
    pages.forEach(p => p.classList.remove("active"));
    const target = document.querySelector(hash);
    if (target) target.classList.add("active");

    setActiveNav(hash);
    animateSkillsIfNeeded(hash);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;
      showPage(hash);
      history.pushState(null, "", hash);

      // close mobile menu when click nav
      closeMobileMenu();
    });
  });

  jumpLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;
      e.preventDefault();
      showPage(hash);
      history.pushState(null, "", hash);

      // close mobile menu when click
      closeMobileMenu();
    });
  });

  window.addEventListener("popstate", () => {
    const hash = window.location.hash || "#home";
    showPage(hash);
    closeMobileMenu();
  });

  showPage(window.location.hash || "#home");

  /* =========================
     YEAR
  ========================= */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =========================
     CONTACT DEMO SUBMIT
  ========================= */
  window.fakeSubmit = (event) => {
    event.preventDefault();
    const msg = document.getElementById("formMsg");
    if (!msg) return false;
    msg.textContent = "✅ Message sent! (Demo Mode)";
    setTimeout(() => (msg.textContent = ""), 3000);
    return false;
  };

  /* =========================
     THEME TOGGLE
  ========================= */
  const themeBtn = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem("theme");

  if (themeBtn) {
    if (savedTheme === "dark") {
      document.body.classList.remove("light");
      themeBtn.textContent = "🌙";
    } else {
      document.body.classList.add("light");
      themeBtn.textContent = "☀️";
    }

    themeBtn.addEventListener("click", () => {
      document.body.classList.toggle("light");
      if (document.body.classList.contains("light")) {
        themeBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
      } else {
        themeBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
      }
    });
  }

  /* =========================
     DOC TABS
  ========================= */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  if (tabBtns.length && tabPanels.length) {
    tabBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");
        if (!tab) return;

        tabBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        tabPanels.forEach(panel => panel.classList.remove("active"));
        const activePanel = document.getElementById(tab);
        if (activePanel) activePanel.classList.add("active");
      });
    });
  }

  /* =========================
     PROJECT FILTER
  ========================= */
  const projectTabs = document.querySelectorAll(".tabP");
  const projectCards = document.querySelectorAll(".projectCard");

  if (projectTabs.length && projectCards.length) {
    projectTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        projectTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const filter = tab.getAttribute("data-filter") || "all";

        projectCards.forEach(card => {
          const cat = card.getAttribute("data-cat");
          card.style.display = (filter === "all" || filter === cat) ? "block" : "none";
        });
      });
    });
  }

  /* =========================
     MOBILE MENU TOGGLE
  ========================= */
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu(){
    if (!menuBtn || !mobileMenu) return;
    mobileMenu.classList.remove("show");
    menuBtn.textContent = "☰";
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
      menuBtn.textContent = mobileMenu.classList.contains("show") ? "✕" : "☰";
    });

    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => closeMobileMenu());
    });

    window.addEventListener("click", (e) => {
      if (!mobileMenu.classList.contains("show")) return;
      if (mobileMenu.contains(e.target) || menuBtn.contains(e.target)) return;
      closeMobileMenu();
    });
  }

  /* =========================
     MUSIC BUTTON (OPTIONAL)
  ========================= */
  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  let isPlaying = false;

  if (bgMusic && musicBtn) {
    musicBtn.addEventListener("click", async () => {
      try {
        if (!isPlaying) {
          await bgMusic.play();
          isPlaying = true;
          musicBtn.textContent = "Pause";
          musicBtn.classList.add("playing");
        } else {
          bgMusic.pause();
          isPlaying = false;
          musicBtn.textContent = "Music";
          musicBtn.classList.remove("playing");
        }
      } catch (err) {
        alert("Browser memblokir autoplay. Klik tombol Music untuk mulai.");
      }
    });
  }

  /* =========================
     STARS CANVAS (SUBTLE)
  ========================= */
  const canvas = document.getElementById("stars");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.2,
      s: Math.random() * 0.25 + 0.08
    }));

    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.y += st.s;
        if (st.y > h) {
          st.y = 0;
          st.x = Math.random() * w;
        }
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = document.body.classList.contains("light")
          ? "rgba(0,0,0,0.12)"
          : "rgba(255,255,255,0.55)";
        ctx.fill();
      }
      requestAnimationFrame(animate);
    }
    animate();
  }
});
