// === Default values ===
if (!localStorage.getItem("cash")) localStorage.setItem("cash", "100");
if (!localStorage.getItem("xp")) localStorage.setItem("xp", "0");
if (!localStorage.getItem("health")) localStorage.setItem("health", "100");
if (!localStorage.getItem("energy")) localStorage.setItem("energy", "50");

// === Set values to HTML if present ===
function updateStats() {
  const cash = parseInt(localStorage.getItem("cash"));
  const xp = parseInt(localStorage.getItem("xp"));
  const health = parseInt(localStorage.getItem("health"));
  const energy = parseInt(localStorage.getItem("energy"));

  const cashElem = document.getElementById("cash");
  const xpElem = document.getElementById("xp");
  const healthElem = document.getElementById("health-val");
  const energyElem = document.getElementById("energy-val");

  const healthBar = document.getElementById("health-bar");
  const energyBar = document.getElementById("energy-bar");

  if (cashElem) cashElem.textContent = cash;
  if (xpElem) xpElem.textContent = xp;

  if (healthElem) healthElem.textContent = health;
  if (energyElem) energyElem.textContent = energy;

  if (healthBar) healthBar.style.width = `${health}%`;
  if (energyBar) energyBar.style.width = `${energy}%`;
}

// === Regeneration logic ===
setInterval(() => {
  let health = parseInt(localStorage.getItem("health"));
  let energy = parseInt(localStorage.getItem("energy"));

  // Add values
  if (health < 100) {
    health = Math.min(100, health + 10);
    localStorage.setItem("health", health);
  }

  if (energy < 100) {
    energy = Math.min(100, energy + 5);
    localStorage.setItem("energy", energy);
  }

  updateStats();
}, 1000); // every 1 second

// Initial load
updateStats();
