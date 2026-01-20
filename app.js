// ===== AURA.SHOP - app.js (User + Points) =====

// ===== User (Local Account) =====
const USER_KEY = "aura_user";

function getUser() {
  return localStorage.getItem(USER_KEY);
}

function setUser(name) {
  localStorage.setItem(USER_KEY, name);
}

function logoutUser() {
  localStorage.removeItem(USER_KEY);
  location.reload();
}

function renderUserBox() {
  const box = document.getElementById("userBox");
  if (!box) return;

  const user = getUser();

  if (!user) {
    box.innerHTML = `
      <div class="login-row">
        <input id="nameInput" placeholder="اكتب اسمك..." />
        <button id="saveNameBtn">دخول</button>
      </div>
    `;

    const btn = document.getElementById("saveNameBtn");
    if (btn) {
      btn.onclick = () => {
        const val = document.getElementById("nameInput").value.trim();
        if (val.length < 2) return alert("اكتب اسم صحيح");
        setUser(val);
        location.reload();
      };
    }
  } else {
    box.innerHTML = `
      <div class="welcome-row">
        <span>أهلًا يا <b>${user}</b> 👋</span>
        <button id="logoutBtn">خروج</button>
      </div>
    `;

    const out = document.getElementById("logoutBtn");
    if (out) out.onclick = logoutUser;
  }
}

renderUserBox();

// ===== Points (Per User) =====
function pointsKey() {
  const user = getUser() || "guest";
  return `points_${user}`;
}

function getPoints() {
  return parseInt(localStorage.getItem(pointsKey()) || "0", 10);
}

function setPoints(v) {
  localStorage.setItem(pointsKey(), String(v));
}

function addPoints(amount) {
  const now = getPoints();
  setPoints(now + amount);
}

// ===== Optional: show points if element exists =====
// ضع عنصر في HTML اسمه: <span id="pointsValue"></span>
function renderPoints() {
  const el = document.getElementById("pointsValue");
  if (!el) return;
  el.textContent = getPoints();
}

renderPoints();
