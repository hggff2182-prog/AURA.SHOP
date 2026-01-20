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
    document.getElementById("saveNameBtn").onclick = () => {
      const val = document.getElementById("nameInput").value.trim();
      if (val.length < 2) return alert("اكتب اسم صحيح");
      setUser(val);
      location.reload();
    };
  } else {
    box.innerHTML = `
      <div class="welcome-row">
        <span>أهلًا يا <b>${user}</b> 👋</span>
        <button onclick="logoutUser()">خروج</button>
      </div>
    `;
  }
}
renderUserBox();

// ===== keys per user =====
function pointsKey() {
  const u = getUser() || "guest";
  return "points_" + u;
}
function gemsKey() {
  const u = getUser() || "guest";
  return "gems_" + u;
}

// ===== points/gems =====
function getPoints() {
  return parseInt(localStorage.getItem(pointsKey()) || "0");
}
function setPoints(v) {
  localStorage.setItem(pointsKey(), String(v));
}
function getGems() {
  return parseInt(localStorage.getItem(gemsKey()) || "0");
}
function setGems(v) {
  localStorage.setItem(gemsKey(), String(v));
}

// ===== UI =====
function updateUI() {
  const p = document.getElementById("pointsText");
  const g = document.getElementById("gemsText");
  if (p) p.textContent = getPoints();
  if (g) g.textContent = getGems();
}
updateUI();

// ===== buy =====
function buyGems(amount, cost) {
  const msg = document.getElementById("shopMsg");

  const user = getUser();
  if (!user) {
    alert("لازم تسجّل دخول بالاسم أول ✅");
    return;
  }

  const pts = getPoints();
  if (pts < cost) {
    if (msg) msg.textContent = `نقاطك ما كافية ❌ (محتاج ${cost} نقطة)`;
    return;
  }

  // خصم + إضافة
  setPoints(pts - cost);
  setGems(getGems() + amount);

  if (msg) msg.textContent = `تم الشراء ✅ +${amount} جوهرة`;
  updateUI();
}

window.buyGems = buyGems;
