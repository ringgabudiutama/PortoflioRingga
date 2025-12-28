// Year
document.getElementById("year").textContent = new Date().getFullYear();

// Typing effect
const typingText = document.getElementById("typingText");
const words = ["Web Developer", "UI Designer", "Freelancer", "Creative Coder"];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = words[wordIndex];

  if (!deleting) {
    typingText.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(typeLoop, 1200);
      return;
    }
  } else {
    typingText.textContent = current.slice(0, charIndex--);
    if (charIndex < 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 70);
}
typeLoop();

// Scroll reveal animation
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));

// Skill bar fill on view
const fills = document.querySelectorAll(".fill");
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      const fill = entry.target;
      fill.style.width = fill.dataset.fill + "%";
    }
  });
}, { threshold: 0.4 });

fills.forEach(el => skillObserver.observe(el));

// Theme toggle
const themeBtn = document.getElementById("themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeBtn.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
});

// Fake form submit
function fakeSubmit(e){
  e.preventDefault();
  const msg = document.getElementById("formMsg");
  msg.textContent = "✅ Pesan terkirim! (demo)";
  setTimeout(()=> msg.textContent = "", 2500);
  return false;
}
window.fakeSubmit = fakeSubmit;
// Tabs (Prestasi/CV/Bisnis/Sertifikasi)
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // remove active button
    tabButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // show correct panel
    const target = btn.dataset.tab;
    tabPanels.forEach(panel => panel.classList.remove("active"));
    document.getElementById(target).classList.add("active");

  const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

music.volume = 0.35;

function startMusic(){
  music.play().then(() => {
    isPlaying = true;
    musicBtn.textContent = "🔊 Music";
  }).catch((err) => {
    console.log("Autoplay diblok browser:", err);
  });
}

// Mulai musik saat klik/tap pertama
document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

// Tombol play/pause
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if(isPlaying){
    music.pause();
    isPlaying = false;
    musicBtn.textContent = "🔇 Music";
  } else {
    startMusic();
  }
});


  });
});

