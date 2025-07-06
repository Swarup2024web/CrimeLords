// Initialize default stats if not already set
if (localStorage.getItem("xp") === null) localStorage.setItem("xp", "0");
if (localStorage.getItem("cash") === null) localStorage.setItem("cash", "100");
if (localStorage.getItem("health") === null) localStorage.setItem("health", "100");
if (localStorage.getItem("energy") === null) localStorage.setItem("energy", "100");

// Update top stats and bars
function updateStats() {
  const xp = parseInt(localStorage.getItem("xp")) || 0;
  const cash = parseInt(localStorage.getItem("cash")) || 0;
  const health = parseInt(localStorage.getItem("health")) || 0;
  const energy = parseInt(localStorage.getItem("energy")) || 0;

  if (document.getElementById("xp"))        document.getElementById("xp").textContent = xp;
  if (document.getElementById("cash"))      document.getElementById("cash").textContent = cash;
  if (document.getElementById("health-val")) document.getElementById("health-val").textContent = health;
  if (document.getElementById("energy-val")) document.getElementById("energy-val").textContent = energy;

  if (document.getElementById("health-bar")) {
    document.getElementById("health-bar").style.width = `${health}%`;
  }
  if (document.getElementById("energy-bar")) {
    document.getElementById("energy-bar").style.width = `${energy}%`;
  }
}

// Regenerate health (+10 per sec) and energy (+5 per sec)
setInterval(() => {
  let health = parseInt(localStorage.getItem("health")) || 0;
  let energy = parseInt(localStorage.getItem("energy")) || 0;

  if (health < 100) {
    health = Math.min(100, health + 10);
    localStorage.setItem("health", health);
  }

  if (energy < 100) {
    energy = Math.min(100, energy + 5);
    localStorage.setItem("energy", energy);
  }

  updateStats();
}, 1000);

// Update on page load
updateStats();
