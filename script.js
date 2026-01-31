// 2026-08-14 13:00 Vilnius
const weddingDate = new Date(2026, 7, 14, 13, 0, 0).getTime();
// 7 = rugpjūtis, nes JS month 0-indexed

const timerEl = document.getElementById("timer");

function updateTimer() {
  const now = new Date().getTime();
  const diff = weddingDate - now;

  if (diff <= 0) {
    timerEl.textContent = "Šiandien mūsų diena 🤍";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  timerEl.textContent = `${days} d. ${hours.toString().padStart(2, "0")} val. ${minutes.toString().padStart(2, "0")} min. ${seconds.toString().padStart(2, "0")} s.`;
}

// paleidimas
updateTimer();
setInterval(updateTimer, 1000);
