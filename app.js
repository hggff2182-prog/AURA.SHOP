// ===== FF Daily Challenges + Points + Store =====

const DAILY_COUNT = 10;
const POINTS_PER_CHALLENGE = 100;

const SHOP_COST_POINTS = 5000;
const SHOP_GEMS_AMOUNT = 100;

// تحديات فري فاير (زِد براحتك)
const ALL_CHALLENGES = [
  "العب مباراة كلاسيك واحدة",
  "العب مباراة رانك واحدة",
  "اقتُل 5 أعداء اليوم",
  "اعمل 2 Headshots اليوم",
  "استخدم 3 Gloo Walls في مباراة",
  "اجمع درع Level 3 مرة",
  "افتح 3 صناديق Loot",
  "وصل للـ Top 10 مرة",
  "اعمل Revive لزميل مرة",
  "اكسب Booyah مرة واحدة",
  "اقتل بسلاح AR مرتين",
  "اقتل بسلاح SMG مرتين",
  "اقتل بسلاح Shotgun مرة",
  "اقتل بسنايبر مرة",
  "استعمل 2 Medkits",
  "اعمل 300+ Damage في مباراة",
  "اركب سيارة مرة",
  "العب مع سكواد مباراة",
  "اجمع 200 Ammo زيادة",
  "عيش 8 دقائق في مباراة"
];

// مفاتيح التخزين
const K = {
  points: "ff_points",
  gems: "ff_gems",
  daily: "ff_daily"
};

const todayKey = new Date().toISOString().split("T")[0];

// أدوات
function getNum(key, fallback = 0) {
  const v = localStorage.getItem(key);
  const n = v === null ? fallback : Number(v);
  return Number.isFinite(n) ? n : fallback;
}
function setNum(key, value) {
  localStorage.setItem(key, String(value));
}
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// تحميل الرصيد
let points = getNum(K.points, 0);
let gems = getNum(K.gems, 0);

// تحديات اليوم
let daily = JSON.parse(localStorage.getItem(K.daily) || "null");
if (!daily || daily.date !== todayKey) {
  daily = {
    date: todayKey,
    challenges: shuffle(ALL_CHALLENGES).slice(0, DAILY_COUNT),
    completed: []
  };
  localStorage.setItem(K.daily, JSON.stringify(daily));
}

// تحديث التاريخ في الواجهة
const todayEl = document.getElementById("todayKey");
if (todayEl) todayEl.textContent = todayKey;

// تحديث النقاط والجواهر في الواجهة
const pointsEl = document.getElementById("points");
const gemsEl = document.getElementById("gems");
if (pointsEl) pointsEl.textContent = points;
if (gemsEl) gemsEl.textContent = gems;

// رسم التحديات (في index)
const challengesEl = document.getElementById("challenges");
if (challengesEl) {
  challengesEl.innerHTML = "";

  daily.challenges.forEach((text, i) => {
    const done = daily.completed.includes(i);

    const div = document.createElement("div");
    div.className = "cardCh";
    div.innerHTML = `
      <div>
        <div class="chTitle">${text}</div>
        <div class="chMeta">
          <span class="badge">+${POINTS_PER_CHALLENGE}</span>
          <span class="badge">${done ? "مكتمل" : "جاهز"}</span>
        </div>
      </div>
      <button class="btn" ${done ? "disabled" : ""} data-i="${i}">
        ${done ? "تم ✅" : "نفّذت"}
      </button>
    `;
    challengesEl.appendChild(div);
  });

  challengesEl.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-i]");
    if (!btn) return;
    completeChallenge(Number(btn.dataset.i));
  });
}

function completeChallenge(i) {
  if (daily.completed.includes(i)) return;

  daily.completed.push(i);
  localStorage.setItem(K.daily, JSON.stringify(daily));

  points += POINTS_PER_CHALLENGE;
  setNum(K.points, points);

  if (pointsEl) pointsEl.textContent = points;

  const btn = document.querySelector(`button[data-i="${i}"]`);
  if (btn) {
    btn.disabled = true;
    btn.textContent = "تم ✅";
  }
}

// متجر (في store)
const buyBtn = document.getElementById("buyGemsBtn");
const shopMsg = document.getElementById("shopMsg");

if (buyBtn) {
  buyBtn.addEventListener("click", () => {
    if (points < SHOP_COST_POINTS) {
      if (shopMsg) shopMsg.textContent = "نقاطك ما كفاية 😅 لازم 5000";
      return;
    }

    points -= SHOP_COST_POINTS;
    gems += SHOP_GEMS_AMOUNT;

    setNum(K.points, points);
    setNum(K.gems, gems);

    if (pointsEl) pointsEl.textContent = points;
    if (gemsEl) gemsEl.textContent = gems;

    if (shopMsg) shopMsg.textContent = `تم الشراء ✅ +${SHOP_GEMS_AMOUNT} 💎`;
    setTimeout(() => { if (shopMsg) shopMsg.textContent = ""; }, 2500);
  });
}

// Reset اختياري
win
