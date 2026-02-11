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

  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}

// start
updateTimer();
setInterval(updateTimer, 1000);
