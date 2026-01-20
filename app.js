// ===============================
// AURA SHOP - FF Daily Quiz (10/day) + Points
// ===============================

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
function addPoints(v) {
  setPoints(getPoints() + v);
}
function updatePointsUI() {
  const el = document.getElementById("pointsValue");
  if (el) el.textContent = getPoints();
}

// ===== Daily Quiz Settings =====
const QUESTIONS_PER_DAY = 10;
const POINTS_PER_CORRECT = 100;

// بنك أسئلة فري فاير (زِد عليه براحتك)
const QUESTION_BANK = [
  { q: "شنو اسم عملة الشراء الأساسية في فري فاير؟", options: ["Diamonds", "V-Bucks", "UC", "Coins فقط"], answer: 0 },
  { q: "أقصى عدد لاعبين في باتل رويال عادة؟", options: ["50", "100", "25", "200"], answer: 0 },
  { q: "الـ Gloo Wall يستخدم لشنو؟", options: ["حائط حماية", "زيادة سرعة", "شفاء", "سلاح قنص"], answer: 0 },
  { q: "في سكواد، أقصى عدد في الفريق؟", options: ["4", "3", "5", "2"], answer: 0 },
  { q: "أفضل طريقة لتقليل الارتداد غالباً؟", options: ["سحب Drag + حساسية مناسبة", "القفز دائمًا", "عدم الحركة", "إغلاق الصوت"], answer: 0 },

  { q: "طور CS يعني شنو؟", options: ["Clash Squad", "Classic Solo", "Crazy Shot", "Custom Start"], answer: 0 },
  { q: "Headshot يعني؟", options: ["ضربة رأس", "ضربة رجل", "ضربة يد", "ضربة عشوائية"], answer: 0 },
  { q: "اللوت (Loot) غالباً بتلقاه وين؟", options: ["في المباني والصناديق", "في البحر", "في السماء فقط", "ما موجود"], answer: 0 },
  { q: "الرانك (Rank) يزيد كيف؟", options: ["بالفوز/الأداء في الرانك", "بالنوم", "بالكلاسيك فقط", "بالرسائل"], answer: 0 },
  { q: "أهم شي في بداية المباراة؟", options: ["هبوط ذكي + سلاح سريع", "تقيف مكانك", "تكتب شات", "تطلع من اللعبة"], answer: 0 },

  // احتياط زيادة (عشان لو داير توسع)
  { q: "SMG نوع سلاح شنو؟", options: ["رشاش خفيف", "قناص", "شوتقن", "مسدس"], answer: 0 },
  { q: "AR نوع سلاح شنو؟", options: ["رشاش متوسط", "قناص", "قنبلة", "درع"], answer: 0 },
];

// تاريخ اليوم
const todayKey = new Date().toISOString().split("T")[0];

function dailyQuizKey() {
  const user = getUser() || "guest";
  return `ff_quiz_${user}_${todayKey}`;
}

// تجهيز أسئلة اليوم + حفظ الإجابات المحسوبة
let quiz = JSON.parse(localStorage.getItem(dailyQuizKey()) || "null");

// إنشاء قائمة ثابتة لليوم لهذا المستخدم
function pickRandomQuestions() {
  const copy = [...QUESTION_BANK].sort(() => Math.random() - 0.5);
  return copy.slice(0, QUESTIONS_PER_DAY).map(item => ({
    q: item.q,
    options: item.options,
    answer: item.answer
  }));
}

if (!quiz) {
  quiz = {
    date: todayKey,
    questions: pickRandomQuestions(),
    answered: [] // indexes of answered questions today
  };
  localStorage.setItem(dailyQuizKey(), JSON.stringify(quiz));
}

// ===== Render Quiz into #challenges =====
function re
