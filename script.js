const timerEl = document.querySelector("#timer .timer-grid");
const timeNums = timerEl.querySelectorAll(".time-num");

function updateTimer() {
  // Vilnius timezone offset (rugpjūtį UTC+3)
  const vilniusOffset = 3 * 60; // minutes

  // Sukuriame tikslų Vilnius laiką
  const weddingDate = new Date(Date.UTC(2026, 7, 14, 11, 0, 0)); // 10:00 UTC = 13:00 Vilnius
  const now = new Date();

  // Perskaičiuojam diff milisekundėmis
  const diff = weddingDate.getTime() - now.getTime();

  if (diff <= 0) {
    document.getElementById("timer").textContent = "Šiandien mūsų diena 🤍";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = days
    .toString()
    .padStart(2, "0");
  document.getElementById("hours").textContent = hours
    .toString()
    .padStart(2, "0");
  document.getElementById("minutes").textContent = minutes
    .toString()
    .padStart(2, "0");
  document.getElementById("seconds").textContent = seconds
    .toString()
    .padStart(2, "0");
}

// start
updateTimer();
setInterval(updateTimer, 1000);

// reveal anim script
// === Helper function: animuoja elementus vieną po kito su delay ===
function animateElements(elements, delayFunc) {
  elements.forEach((el, index) => {
    const delay = delayFunc ? delayFunc(index) : index * 150; // pagal funkciją ar default 150ms
    setTimeout(() => el.classList.add("visible"), delay);
  });
}

// === 1️⃣ Pirmo ekrano animacija po pilno load ===
window.addEventListener("load", () => {
  const firstSection = document.querySelector(".reveal-group");
  if (!firstSection) return;

  const firstReveals = firstSection.querySelectorAll(".reveal");

  animateElements(firstReveals, (index) => 80 * Math.pow(1.75, index));
  // "greitai → lėtai" efektas pirmam ekranui
});

// === 2️⃣ Kitos sekcijos animacija scroll metu ===
const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = entry.target;
        const reveals = section.querySelectorAll(".reveal");

        animateElements(reveals); // default delay: 150ms

        obs.unobserve(section); // vieną kartą
      }
    });
  },
  { threshold: 0.15 },
);

// Pradedame stebėti visas sekcijas, išskyrus pirmą (ji jau animuojama po load)
document.querySelectorAll(".reveal-group").forEach((section, i) => {
  if (i === 0) return; // praleidžiame pirmą
  observer.observe(section);
});
