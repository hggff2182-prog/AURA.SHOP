// ===== تسجيل دخول محلي =====
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

// ===== النقاط (لكل اسم) =====
function pointsKey() {
  const u = getUser() || "guest";
  return "points_" + u;
}
function getPoints() {
  return parseInt(localStorage.getItem(pointsKey()) || "0");
}
function setPoints(v) {
  localStorage.setItem(pointsKey(), String(v));
}

// ===== واجهة تسجيل الدخول =====
function renderUserBox() {
  const box = document.getElementById("userBox");
  const user = getUser();

  if (!user) {
    box.innerHTML = `
      <div class="avatar">👤</div>
      <input id="nameInput" placeholder="الاسم" />
      <input type="password" placeholder="كلمة السر (اختياري)" />
      <button onclick="login()">Sign In</button>
      <label class="stay"><input type="checkbox" checked /> Stay signed in</label>
    `;
  } else {
    box.innerHTML = `
      <div class="welcome">
        أهلاً <b>${user}</b> 👋
        <button onclick="logoutUser()">خروج</button>
      </div>
    `;
  }
}
function login() {
  const name = document.getElementById("nameInput").value.trim();
  if (name.length < 2) return alert("اكتب اسم صحيح");
  setUser(name);
  location.reload();
}
renderUserBox();

// ===== مفاتيح يومية لكل مستخدم =====
function todayKey() {
  return new Date().toISOString().split("T")[0]; // YYYY-MM-DD
}
function dailyKey(name) {
  return `dailyQuiz_${name}_${todayKey()}`;
}

// ===== بنك أسئلة صعبة (صح/غلط) =====
const QUESTION_BANK = [
  { q: "في فري فاير: الـGloo Wall يمنع ضرر القنابل بالكامل دائماً.", a: false },
  { q: "سلاح M1887 معروف بأنه قوي جداً في المدى القريب.", a: true },
  { q: "الHeadshot damage بيتأثر بمسافة الضربة في كل الأسلحة بنفس الطريقة.", a: false },
  { q: "الـArmor يقلل الضرر لكنه ما يمنع الـHeadshot multiplier.", a: true },
  { q: "إذا ping عالي دايمًا معناها سيرفرك بعيد فقط.", a: false },
  { q: "في الإعدادات: حساسية General بتأثر على الكاميرا حتى بدون سلاح.", a: true },
  { q: "الـAim Assist يشتغل بنفس القوة في كل الأجهزة.", a: false },
  { q: "سلاح UMP يعتبر من أفضل SMG للتوازن بين مدى وثبات.", a: true },
  { q: "الطلقات في الأسلحة AR بتكون بدون recoil نهائي لو وقفت ثابت.", a: false },
  { q: "الـDrag headshot يحتاج سحب بسيط للأعلى مع timing.", a: true },

  { q: "الـGloo Wall يقدر يقفل عليك الضرر من كل الجهات حتى لو في زاوية مفتوحة.", a: false },
  { q: "تغيير DPI ممكن يحسن تحكم السحب لكن ما يعوض تمرين اليد.", a: true },
  { q: "سلاح Groza غالباً قوي في الضرر لكنه أصعب في التحكم.", a: true },
  { q: "الـSensitivity العالية دائماً أفضل للهيدشوت.", a: false },
  { q: "الـHip fire أدق من الـADS في كل الحالات.", a: false },
  { q: "الـJump Shot ممكن يسبب تقليل دقة لبعض الأسلحة.", a: true },
  { q: "الـOne-tap أسهل في SMG من DMR غالباً.", a: false },
  { q: "الـBullet spread بيتغير حسب الحركة (جري/قفز).", a: true },
  { q: "الـAim tracking أهم من flick في قتال المدى المتوسط.", a: true },
  { q: "الـGloo placement السريع يعتمد على layout أكثر من الحساسية فقط.", a: true },

  { q: "الـHeadshot rate بيتأثر لو حجم زر الضرب صغير جداً.", a: true },
  { q: "الـFPS العالي ما عنده أي تأثير على الإحساس بالسحب.", a: false },
  { q: "الـCustom HUD يساعد تقلل وقت رد الفعل.", a: true },
  { q: "الـAuto pickup لازم يكون مقفول دائماً.", a: false },
  { q: "الـCrosshair placement قبل الاشتباك يقلل السحب الزائد.", a: true },
  { q: "الـGloo wall spam ما ينفع ضد لاعب محترف نهائياً.", a: false },
  { q: "سلاح Desert Eagle ممكن يعمل ضغط قوي لو تصويبك ممتاز.", a: true },
  { q: "الـADS يقلل recoil في أغلب الأسلحة مقارنة بالHip.", a: true },
  { q: "الـSound cues (خطوات) ما بتفيد لو ما عندك سماعة.", a: false },
  { q: "الـPeek من الزاوية يقلل مساحة جسمك المكشوفة.", a: true }
];

// ===== اختيار 10 أسئلة يومياً لكل مستخدم =====
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function getDailySet() {
  const user
  renderUserBox();
