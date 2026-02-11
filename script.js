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
window.addEventListener("load", () => {
  const sections = document.querySelectorAll(".reveal-group");

  sections.forEach((section) => {
    // surenkame tik img elementus
    const images = section.querySelectorAll("img");
    let loadedCount = 0;

    if (images.length === 0) {
      // jei nėra img, paleidžiam iš karto
      revealSection(section);
    }

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = img.onerror = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            revealSection(section);
          }
        };
      }
    });

    // jei visi paveiksliukai jau užkrauti
    if (loadedCount === images.length) {
      revealSection(section);
    }
  });

  function revealSection(section) {
    const reveals = section.querySelectorAll(".reveal");

    // animuojame po vieną elementą iš viršaus į apačią
    reveals.forEach((el, index) => {
      const delay = 80 * Math.pow(1.75, index); // greitai → lėtai
      setTimeout(() => el.classList.add("visible"), delay);
    });

    // scroll animacijoms
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const revealsInside = entry.target.querySelectorAll(
              ".reveal:not(.visible)",
            );
            revealsInside.forEach((el, idx) => {
              const delay = 80 * Math.pow(1.75, idx);
              setTimeout(() => el.classList.add("visible"), delay);
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(section);
  }
});
