// === Initial Setup if first time ===
if (!localStorage.getItem("xp")) localStorage.setItem("xp", "0");
if (!localStorage.getItem("cash")) localStorage.setItem("cash", "100");
if (!localStorage.getItem("health")) localStorage.setItem("health", "100");
if (!localStorage.getItem("energy")) localStorage.setItem("energy", "100");

// === Update Stats on Page ===
function updateStats() {
  const xp = parseInt(localStorage.getItem("xp")) || 0;
  const cash = parseInt(localStorage.getItem("cash")) || 0;
  const health = parseInt(localStorage.getItem("health")) || 0;
  const energy = parseInt(localStorage.getItem("energy")) || 0;

  // Update HTML (if element exists on page)
  if (document.getElementById("xp")) document.getElementById("xp").textContent = xp;
  if (document.getElementById("cash")) document.getElementById("cash").textContent = cash;
  if (document.getElementById("health-val")) document.getElementById("health-val").textContent = health;
  if (document.getElementById("energy-val")) document.getElementById("energy-val").textContent = energy;

  // Update bars
  if (document.getElementById("health-bar")) {
    document.getElementById("health-bar").style.width = `${Math.min(health, 100)}%`;
  }

  if (document.getElementById("energy-bar")) {
    document.getElementById("energy-bar").style.width = `${Math.min(energy, 100)}%`;
  }
}

updateStats();

// === Auto Regeneration ===
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

// === Add XP Function ===
function addXP(amount) {
  let xp = parseInt(localStorage.getItem("xp")) || 0;
  xp += amount;
  localStorage.setItem("xp", xp);
  updateStats();
}

// === Add Cash Function ===
function addCash(amount) {
  let cash = parseInt(localStorage.getItem("cash")) || 0;
  cash += amount;
  localStorage.setItem("cash", cash);
  updateStats();
}

// === Deduct Energy (used in Missions etc.) ===
function useEnergy(amount) {
  let energy = parseInt(localStorage.getItem("energy")) || 0;
  if (energy >= amount) {
    energy -= amount;
    localStorage.setItem("energy", energy);
    updateStats();
    return true;
  } else {
    alert("❌ Not enough energy!");
    return false;
  }
}

// === Deduct Cash (used in Bail etc.) ===
function useCash(amount) {
  let cash = parseInt(localStorage.getItem("cash")) || 0;
  if (cash >= amount) {
    cash -= amount;
    localStorage.setItem("cash", cash);
    updateStats();
    return true;
  } else {
    alert("❌ Not enough cash!");
    return false;
  }
}

// === Buy Item Function (used in shop) ===
function buyItem(category, name, cost) {
  let cash = parseInt(localStorage.getItem("cash")) || 0;
  if (cash < cost) {
    alert("❌ Not enough cash!");
    return;
  }

  // Deduct cash
  cash -= cost;
  localStorage.setItem("cash", cash);
  updateStats();

  // Add item to inventory
  const key = "inventory_" + category;
  let inventory = JSON.parse(localStorage.getItem(key)) || [];
  inventory.push(name);
  localStorage.setItem(key, JSON.stringify(inventory));

  alert(`✅ You bought: ${name}`);
}
