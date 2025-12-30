document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll(".nav-link");
  const jumpLinks = document.querySelectorAll(".miniBtn, .nav-jump");

  /* =========================
     SLIDE NAVIGATION
  ========================= */
  function setActiveNav(hash) {
    navLinks.forEach(a => a.classList.remove("active"));
    const active = document.querySelector(`.nav-link[href="${hash}"]`);
    if (active) active.classList.add("active");
  }

  function showPage(hash) {
    pages.forEach(p => p.classList.remove("active"));
    const target = document.querySelector(hash);
    if (target) target.classList.add("active");
    setActiveNav(hash);

    if (hash === "#skills") {
      document.querySelectorAll(".fill").forEach(el => {
        const val = el.getAttribute("data-fill");
        el.style.width = val + "%";
      });
    } else {
      document.querySelectorAll(".fill").forEach(el => {
        el.style.width = "0%";
      });
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const hash = link.getAttribute("href");
      showPage(hash);
      history.pushState(null, "", hash);
    });
  });

  jumpLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const hash = link.getAttribute("href");
      if (!hash || !hash.startsWith("#")) return;
      e.preventDefault();
      showPage(hash);
      history.pushState(null, "", hash);
    });
  });

  window.addEventListener("popstate", () => {
    const hash = window.location.hash || "#home";
    showPage(hash);
  });

  const initialHash = window.location.hash || "#home";
  showPage(initialHash);

  /* =========================
     YEAR
  ========================= */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* =========================
     CONTACT DEMO SUBMIT
  ========================= */
  window.fakeSubmit = (event) => {
    event.preventDefault();
    const msg = document.getElementById("formMsg");
    msg.textContent = "✅ Message sent! (Demo Mode)";
    setTimeout(() => msg.textContent = "", 3000);
    return false;
  };

  /* =========================
     MUSIC BUTTON
  ========================= */
  const bgMusic = document.getElementById("bgMusic");
  const musicBtn = document.getElementById("musicBtn");
  let isPlaying = false;

  musicBtn.addEventListener("click", () => {
    if (!isPlaying) {
      bgMusic.play();
      isPlaying = true;
      musicBtn.textContent = "Pause";
    } else {
      bgMusic.pause();
      isPlaying = false;
      musicBtn.textContent = "Music";
    }
  });

  /* =========================
     THEME TOGGLE
  ========================= */
  const themeBtn = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "☀️";
  } else {
    themeBtn.textContent = "🌙";
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

    // re-render chart after theme changes
    setTimeout(() => {
      const activeBtn = document.querySelector(".chartBottom .chip.small.active");
      const range = activeBtn?.getAttribute("data-range") || "12";
      renderVisitorChart(range);
    }, 80);
  });

  /* =========================
     DOC TAB SYSTEM
  ========================= */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.getAttribute("data-tab");
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanels.forEach(panel => panel.classList.remove("active"));
      const activePanel = document.getElementById(tab);
      if (activePanel) activePanel.classList.add("active");
    });
  });

  /* =========================
     TYPING EFFECT
  ========================= */
  const typingText = document.getElementById("typingText");
  const roles = ["Web Developer", "UI/UX Designer", "Data Analyst"];
  let roleIndex = 0, charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!deleting) {
      typingText.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 900);
        return;
      }
    } else {
      typingText.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 70 : 90);
  }
  typeLoop();

  /* =========================
     DIGITAL CLOCK
  ========================= */
  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const day = days[now.getDay()];
    const date = now.getDate();
    const mon = months[now.getMonth()];
    const year = now.getFullYear();

    const timeEl = document.getElementById("clockTime");
    const dateEl = document.getElementById("clockDate");
    const zoneEl = document.getElementById("clockZone");

    if (timeEl) timeEl.textContent = `${hh}:${mm}:${ss}`;
    if (dateEl) dateEl.textContent = `${day}, ${date} ${mon} ${year}`;
    if (zoneEl) zoneEl.textContent = "GMT+7 (WIB)";
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* =========================
     AI SERVICE HELPER (OFFLINE)
  ========================= */
  const services = [
    { key: "website", name: "Website Development", desc: "Portfolio, Company profile, Landing page, Toko online.", price: "Start from Rp 300K", eta: "2-7 days" },
    { key: "ui", name: "UI/UX Design", desc: "Figma design, mobile app, web app, prototype, design system.", price: "Start from Rp 250K", eta: "2-5 days" },
    { key: "joki", name: "Duty Jockey / Coding Task", desc: "Bantu tugas HTML/CSS/JS, Java, laporan, debugging.", price: "Start from Rp 50K", eta: "Fast" },
    { key: "sosmed", name: "Social Media Design", desc: "Poster, feed IG, carousel, branding, template.", price: "Start from Rp 80K", eta: "1-3 days" },
  ];

  const aiChat = document.querySelector(".aiChat");
  const aiInput = document.getElementById("aiInput");
  const aiSend = document.getElementById("aiSend");
  const chips = document.querySelectorAll(".aiCard .chip");

  function addMsg(text, type="bot") {
    if (!aiChat) return;
    const div = document.createElement("div");
    div.className = `aiMsg ${type}`;
    div.textContent = text;
    aiChat.appendChild(div);
    aiChat.scrollTop = aiChat.scrollHeight;
  }

  function aiReply(q) {
    const query = q.toLowerCase();

    if (query.includes("layanan") || query.includes("service") || query.includes("apa saja")) {
      addMsg("Ini layanan yang tersedia:\n- Website\n- UI/UX Design\n- Duty Jockey (Coding Task)\n- Social Media Design");
      addMsg("Mau pilih yang mana? ketik: website / ui ux / joki / sosmed");
      return;
    }

    let pick = null;
    if (query.includes("web") || query.includes("website") || query.includes("landing") || query.includes("toko")) pick = "website";
    else if (query.includes("ui") || query.includes("ux") || query.includes("figma") || query.includes("design")) pick = "ui";
    else if (query.includes("joki") || query.includes("tugas") || query.includes("coding") || query.includes("java")) pick = "joki";
    else if (query.includes("sosmed") || query.includes("instagram") || query.includes("poster") || query.includes("feed")) pick = "sosmed";

    if (pick) {
      const s = services.find(x => x.key === pick);
      addMsg(`✅ Rekomendasi: ${s.name}`);
      addMsg(`📌 Detail: ${s.desc}`);
      addMsg(`💰 Estimasi: ${s.price}`);
      addMsg(`⏳ Durasi: ${s.eta}`);
      addMsg(`Kalau mau lanjut, tulis kebutuhanmu (contoh: "website portfolio 1 halaman").`);
      return;
    }

    addMsg("Aku bisa bantu cariin layanan yang cocok. Coba ketik: website / ui ux / joki / sosmed / atau tulis kebutuhanmu.");
  }

  function sendAI() {
    const text = (aiInput?.value || "").trim();
    if (!text) return;
    addMsg(text, "user");
    aiInput.value = "";
    setTimeout(() => aiReply(text), 280);
  }

  aiSend?.addEventListener("click", sendAI);
  aiInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendAI();
  });

  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.getAttribute("data-q") || "";
      addMsg(q, "user");
      setTimeout(() => aiReply(q), 280);
    });
  });

  /* =========================
     DRAGGABLE HANGER + SWING
  ========================= */
  const hanger = document.getElementById("hanger");
  let isDrag = false;
  let startX = 0, startY = 0;
  let currentX = 0, currentY = 0;

  function setTransform(x, y, rot = 0) {
    if (!hanger) return;
    hanger.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
  }

  if (hanger) {
    hanger.addEventListener("mousedown", (e) => {
      isDrag = true;
      startX = e.clientX - currentX;
      startY = e.clientY - currentY;
      hanger.style.transition = "none";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDrag) return;
      currentX = e.clientX - startX;
      currentY = e.clientY - startY;

      const rot = Math.max(-10, Math.min(10, currentX / 20));
      setTransform(currentX, currentY, rot);
    });

    window.addEventListener("mouseup", () => {
      if (!isDrag) return;
      isDrag = false;
      hanger.style.transition = "transform 0.35s ease";
      setTransform(currentX, currentY, 0);
    });

    // Mobile touch
    hanger.addEventListener("touchstart", (e) => {
      const t = e.touches[0];
      isDrag = true;
      startX = t.clientX - currentX;
      startY = t.clientY - currentY;
      hanger.style.transition = "none";
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isDrag) return;
      const t = e.touches[0];
      currentX = t.clientX - startX;
      currentY = t.clientY - startY;

      const rot = Math.max(-10, Math.min(10, currentX / 20));
      setTransform(currentX, currentY, rot);
    }, { passive: true });

    window.addEventListener("touchend", () => {
      if (!isDrag) return;
      isDrag = false;
      hanger.style.transition = "transform 0.35s ease";
      setTransform(currentX, currentY, 0);
    });
  }

  /* =========================
     VISITOR CHART (Chart.js)
  ========================= */
  let visitorChart = null;

  const visitorData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    values: [120, 180, 240, 310, 290, 420, 510, 480, 610, 720, 690, 820]
  };

  function totalVisitors(vals) {
    return vals.reduce((a,b) => a + b, 0);
  }

  function sliceData(range) {
    const { labels, values } = visitorData;
    if (range === "all") return { labels, values };
    const n = Number(range);
    if (!Number.isFinite(n)) return { labels, values };
    return {
      labels: labels.slice(labels.length - n),
      values: values.slice(values.length - n)
    };
  }

  function renderVisitorChart(range = "12") {
    const canvas = document.getElementById("visitorChart");
    if (!canvas || typeof Chart === "undefined") return;

    const ctx = canvas.getContext("2d");
    const { labels, values } = sliceData(range);

    const totalEl = document.getElementById("chartTotal");
    if (totalEl) totalEl.textContent = `Total: ${totalVisitors(values).toLocaleString()} visitors`;

    const primary = getComputedStyle(document.body).getPropertyValue("--primary").trim() || "#7c5cff";

    if (visitorChart) visitorChart.destroy();

    visitorChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Visitors",
          data: values,
          tension: 0.35,
          fill: true,
          borderWidth: 3,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderColor: primary,
          backgroundColor: "rgba(124, 92, 255, 0.18)"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => ` ${ctx.parsed.y.toLocaleString()} visitors`
            }
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: getComputedStyle(document.body).getPropertyValue("--muted") }
          },
          y: {
            grid: { color: "rgba(255,255,255,0.10)" },
            ticks: { color: getComputedStyle(document.body).getPropertyValue("--muted") }
          }
        }
      }
    });
  }

  const rangeBtns = document.querySelectorAll(".chartBottom .chip.small");
  rangeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      rangeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderVisitorChart(btn.getAttribute("data-range") || "12");
    });
  });

  renderVisitorChart("12");

  /* =========================
     STARS CANVAS
  ========================= */
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resize);
  resize();

  const stars = Array.from({ length: 160 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.2,
    s: Math.random() * 0.45 + 0.15
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
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  animate();
});
