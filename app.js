/* ==========================================
   EGAT 60-Day Study Planner — app.js
   Firebase Realtime Database Sync Edition
   ========================================== */

// ======================================================
// DATA: วิชาที่ต้องสอบ กฟผ.
// ======================================================
const SUBJECTS = [
  {
    id: 'math',
    title: 'คณิตศาสตร์ (Numerical Ability)',
    icon: '🔢',
    score: '~30 คะแนน',
    accentColor: '#3b82f6',
    accentBg: 'rgba(59,130,246,0.12)',
    barColor: '#3b82f6',
    weight: 30,
    topics: [
      { id: 'math_series',   label: 'อนุกรมและลำดับ (Series)' },
      { id: 'math_pct',      label: 'ร้อยละ / อัตราส่วน / กำไร-ขาดทุน' },
      { id: 'math_work',     label: 'งานและเวลา / อัตราเร็ว' },
      { id: 'math_stat',     label: 'สถิติ (ค่าเฉลี่ย, มัธยฐาน, SD)' },
      { id: 'math_equation', label: 'สมการและไม่สมการ' },
      { id: 'math_gcf',      label: 'ห.ร.ม. / ค.ร.น.' },
      { id: 'math_clock',    label: 'นาฬิกา / ปฏิทิน' },
      { id: 'math_geo',      label: 'เรขาคณิต / พื้นที่ / ปริมาตร' },
      { id: 'math_data',     label: 'การวิเคราะห์ข้อมูลจากกราฟ/ตาราง' },
    ]
  },
  {
    id: 'verbal',
    title: 'ความสามารถด้านภาษา (Verbal Ability)',
    icon: '💬',
    score: '~20 คะแนน',
    accentColor: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.12)',
    barColor: '#a78bfa',
    weight: 20,
    topics: [
      { id: 'verbal_analogy',  label: 'อุปมาอุปไมย (Analogy)' },
      { id: 'verbal_classify', label: 'การจัดเข้าพวก / ไม่เข้าพวก' },
      { id: 'verbal_antonym',  label: 'คำตรงข้าม / คำพ้องความหมาย' },
      { id: 'verbal_reading',  label: 'การทำความเข้าใจบทความ' },
      { id: 'verbal_middle',   label: 'หาคำตรงกลาง / ความสัมพันธ์คำ' },
      { id: 'verbal_spell',    label: 'คำที่เขียนถูก/ผิด / การอ่านคำ' },
    ]
  },
  {
    id: 'logic',
    title: 'ตรรกะและการวิเคราะห์ (Logical Reasoning)',
    icon: '🧠',
    score: '~20 คะแนน',
    accentColor: '#22d3ee',
    accentBg: 'rgba(34,211,238,0.10)',
    barColor: '#22d3ee',
    weight: 20,
    topics: [
      { id: 'logic_prop',    label: 'ประพจน์และตัวเชื่อม (p∧q, p→q)' },
      { id: 'logic_deduce',  label: 'การสรุปเหตุผล / สมเหตุสมผล' },
      { id: 'logic_sym',     label: 'การสรุปจากสัญลักษณ์' },
      { id: 'logic_pattern', label: 'รูปแบบและ Pattern' },
      { id: 'logic_venn',    label: 'แผนภาพเวนน์' },
      { id: 'logic_decide',  label: 'การตัดสินใจเชิงตรรกะ' },
    ]
  },
  {
    id: 'spatial',
    title: 'มิติสัมพันธ์ (Spatial Ability)',
    icon: '🎲',
    score: '~10 คะแนน',
    accentColor: '#fb923c',
    accentBg: 'rgba(251,146,60,0.10)',
    barColor: '#fb923c',
    weight: 10,
    topics: [
      { id: 'spatial_unfold', label: 'กางกล่อง / พับกล่อง' },
      { id: 'spatial_rotate', label: 'การหมุนภาพ 3 มิติ' },
      { id: 'spatial_mirror', label: 'ภาพสะท้อน / กระจกเงา' },
      { id: 'spatial_count',  label: 'นับจำนวนชิ้น / ลูกบาศก์' },
      { id: 'spatial_embed',  label: 'รูปที่ซ่อนอยู่ (Embedded Figure)' },
    ]
  },
  {
    id: 'digital',
    title: 'ทักษะดิจิทัล (Digital Literacy)',
    icon: '💻',
    score: '~20 คะแนน',
    accentColor: '#34d399',
    accentBg: 'rgba(52,211,153,0.10)',
    barColor: '#34d399',
    weight: 20,
    topics: [
      { id: 'dig_hardware', label: 'ฮาร์ดแวร์ / ซอฟต์แวร์ / OS' },
      { id: 'dig_office',   label: 'โปรแกรม Office (Word/Excel/PPT)' },
      { id: 'dig_internet', label: 'อินเทอร์เน็ต / การค้นหาข้อมูล' },
      { id: 'dig_security', label: 'ความปลอดภัยไซเบอร์ / รหัสผ่าน' },
      { id: 'dig_comm',     label: 'การสื่อสารออนไลน์ / อีเมล' },
      { id: 'dig_data',     label: 'การจัดการไฟล์ / ฐานข้อมูลเบื้องต้น' },
    ]
  }
];

// ======================================================
// DATA: แผน 60 วัน
// ======================================================
const PHASES = [
  {
    title: 'Phase 1 — ปูพื้นฐาน', days: 'วันที่ 1–15', color: '#3b82f6',
    desc: 'สร้างความเข้าใจพื้นฐานทุกวิชา ทบทวนสูตรสำคัญ',
    groups: [
      { days: 'วันที่ 1–3',   subject: 'คณิตศาสตร์ (พื้นฐาน)',    tasks: ['ทบทวนสูตร ร้อยละ กำไร-ขาดทุน', 'ฝึกโจทย์งานและเวลา 20 ข้อ', 'ทำข้อสอบเก่า Section Math 30 ข้อ'] },
      { days: 'วันที่ 4–5',   subject: 'อนุกรมและลำดับ',           tasks: ['จำรูปแบบอนุกรม 15 ประเภท', 'ฝึกทำ 40 ข้อ', 'ตรวจสอบ Pattern ที่ผิดบ่อย'] },
      { days: 'วันที่ 6–8',   subject: 'ตรรกะ & ประพจน์',          tasks: ['ทบทวน p→q, p∧q, p↔q', 'ฝึก Venn Diagram', 'ทำข้อสอบจริงปี 69 ส่วนตรรกะ'] },
      { days: 'วันที่ 9–10',  subject: 'ภาษาและอุปมาอุปไมย',       tasks: ['ฝึก Analogy 30 ข้อ/วัน', 'หาคำตรงกลาง / คำตรงข้าม', 'อ่านบทความและสรุปใจความ'] },
      { days: 'วันที่ 11–12', subject: 'มิติสัมพันธ์',              tasks: ['ฝึกกางกล่อง/พับกล่อง', 'ฝึกหมุนภาพ 3 มิติ', 'นับลูกบาศก์ 20 ข้อ'] },
      { days: 'วันที่ 13–15', subject: 'Digital Literacy',          tasks: ['ทบทวน Hardware/Software', 'ฝึกโจทย์ MS Office', 'ทบทวนความปลอดภัยไซเบอร์'] },
    ]
  },
  {
    title: 'Phase 2 — เจาะลึกและฝึกข้อสอบ', days: 'วันที่ 16–30', color: '#a78bfa',
    desc: 'เจาะลึกหัวข้อสำคัญ ทำข้อสอบเก่ากฟผ. แต่ละวิชา',
    groups: [
      { days: 'วันที่ 16–18', subject: 'คณิตศาสตร์ (ขั้นสูง)',     tasks: ['สถิติ: ค่าเฉลี่ย, มัธยฐาน, SD', 'โจทย์ส่วนเบี่ยงเบนมาตรฐาน', 'ทำข้อสอบ กฟผ. Section Math เต็มชุด'] },
      { days: 'วันที่ 19–21', subject: 'ตรรกะขั้นสูง',             tasks: ['การสรุปเหตุผลและ Syllogism', 'ฝึกโจทย์สัญลักษณ์', 'ทบทวนข้อสอบจริงปี 68'] },
      { days: 'วันที่ 22–24', subject: 'ภาษาขั้นสูง',              tasks: ['อ่านบทความยาวและตอบคำถาม', 'ฝึกหาความหมายคำจากบริบท', 'ทำข้อสอบ Section Verbal เต็มชุด'] },
      { days: 'วันที่ 25–26', subject: 'มิติสัมพันธ์ (เต็มรูป)',    tasks: ['ฝึก Embedded Figure 25 ข้อ', 'ภาพสะท้อนซับซ้อน', 'ทบทวนทุกประเภทมิติสัมพันธ์'] },
      { days: 'วันที่ 27–30', subject: 'Digital Literacy (ขั้นสูง)', tasks: ['ทบทวนระบบเครือข่ายเบื้องต้น', 'โจทย์ Office Excel สูตร', 'ทำ Mock Test Digital ชุดแรก'] },
    ]
  },
  {
    title: 'Phase 3 — ทำข้อสอบเก่าเต็มชุด', days: 'วันที่ 31–45', color: '#22d3ee',
    desc: 'ทำข้อสอบเก่า กฟผ. เต็มชุด เก็บสถิติคะแนน',
    groups: [
      { days: 'วันที่ 31–33', subject: 'Mock Test ชุดที่ 1 (ปี 65)', tasks: ['ทำข้อสอบปี 65 ครบทุกวิชา <button class="btn-pdf-task" data-pdfid="pdf_egat_65" type="button">📖 เปิดดูข้อสอบปี 65 (PDF)</button>', 'เก็บเวลา 2.30 ชั่วโมง', 'วิเคราะห์ข้อที่ผิด'] },
      { days: 'วันที่ 34–36', subject: 'เน้นจุดอ่อน จาก Mock 1',    tasks: ['ทบทวนเฉพาะหัวข้อที่ผิดมากที่สุด', 'ฝึกข้อสอบเพิ่มเติมเฉพาะจุด', 'สรุปสูตรและ Pattern ที่ลืม'] },
      { days: 'วันที่ 37–39', subject: 'Mock Test ชุดที่ 2 (ปี 68)', tasks: ['ทำข้อสอบปี 68 เต็มชุด <button class="btn-pdf-task" data-pdfid="pdf_egat_68" type="button">📖 เปิดดูข้อสอบปี 68 (PDF)</button>', 'เก็บเวลาเหมือนสอบจริง', 'เปรียบเทียบคะแนนกับ Mock 1'] },
      { days: 'วันที่ 40–42', subject: 'เน้นจุดอ่อน จาก Mock 2',    tasks: ['เจาะวิชาที่คะแนนต่ำสุด', 'ทำโจทย์เพิ่ม 50 ข้อ/วิชา', 'ฝึกเทคนิคตัดตัวเลือก'] },
      { days: 'วันที่ 43–45', subject: 'Mock Test ชุดที่ 3 (ปี 69)', tasks: ['ทำข้อสอบปี 69 ทั้ง #1 และ #2 <button class="btn-pdf-task" data-pdfid="pdf_egat_69_1" type="button">📖 เปิดปี 69 #1</button> <button class="btn-pdf-task" data-pdfid="pdf_egat_69_2" type="button">📖 เปิดปี 69 #2</button>', 'จัดเวลาให้เหมือนสอบจริงที่สุด', 'บันทึกคะแนนและวิเคราะห์'] },
    ]
  },
  {
    title: 'Phase 4 — ทบทวนและเตรียมสอบ', days: 'วันที่ 46–60', color: '#34d399',
    desc: 'ทบทวนสรุปทุกวิชา เน้นความเร็ว และเตรียมจิตใจ',
    groups: [
      { days: 'วันที่ 46–48', subject: 'ทบทวนคณิตศาสตร์รวม',       tasks: ['ทำโจทย์ Mix 80 ข้อ ใน 45 นาที', 'ทบทวนสูตรทุกหมวด', 'เน้นจุดที่ยังผิดอยู่'] },
      { days: 'วันที่ 49–51', subject: 'ทบทวนตรรกะ + ภาษา',        tasks: ['ทำโจทย์รวม Verbal+Logic 60 ข้อ', 'ฝึกให้ใช้เวลาต่อข้อลดลง', 'อ่านบทความ 1 บทความ/วัน'] },
      { days: 'วันที่ 52–54', subject: 'Final Mock Test',            tasks: ['ทำ Simulation เต็มรูปแบบ', 'เก็บเวลาเหมือนสอบจริง 100%', 'วิเคราะห์และแก้ไขจุดอ่อน'] },
      { days: 'วันที่ 55–57', subject: 'Quick Review ทุกวิชา',      tasks: ['อ่านสรุปสูตรที่เตรียมไว้', 'ทำโจทย์เร็วๆ ข้างละ 20 ข้อ', 'ดูตัวอย่างข้อสอบที่ชอบออก'] },
      { days: 'วันที่ 58–59', subject: 'เตรียมพร้อมก่อนสอบ',       tasks: ['พักผ่อนให้เพียงพอ 7-8 ชม.', 'ตรวจสอบเอกสาร (ใบ กว., TOEIC)', 'อ่านสถานที่และเวลาสอบ'] },
      { days: 'วันที่ 60',    subject: '🎯 วันสอบ!',               tasks: ['มาถึงสถานที่ก่อนเวลา 30 นาที', 'นำบัตรประจำตัวและเอกสารครบ', 'ทำใจนิ่ง · สู้ได้! 💪'] },
    ]
  }
];

// ======================================================
// FIREBASE SYNC
// ======================================================
const LS_SYNC_CODE = 'egat_sync_code';

let db         = null;   // Firebase database ref
let syncCode   = null;   // รหัส Sync
let dbRef      = null;   // Firebase path ref
let isSyncing  = false;  // ป้องกัน loop
let firebaseOK = false;  // Firebase พร้อมใช้งาน

function initFirebase() {
  try {
    const cfg = window.EGAT_FIREBASE_CONFIG;
    if (!cfg || cfg.apiKey === 'YOUR_API_KEY') {
      console.warn('Firebase config ยังไม่ได้ตั้งค่า — ใช้ localStorage เท่านั้น');
      return false;
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(cfg);
    }
    db = firebase.database();
    firebaseOK = true;
    return true;
  } catch (e) {
    console.error('Firebase init error:', e);
    return false;
  }
}

function setDbRef(code) {
  if (!firebaseOK || !db) return;
  const sanitized = code.replace(/[.#$[\]/]/g, '_').toUpperCase();
  dbRef = db.ref('egat_planner/' + sanitized);
}

// เขียนข้อมูลขึ้น Firebase
function syncToCloud(key, value) {
  if (!firebaseOK || !dbRef || isSyncing) return;
  dbRef.child(key).set(value).catch(e => console.warn('Firebase write error:', e));
}

// ฟัง real-time update จาก Firebase
function listenToCloud() {
  if (!firebaseOK || !dbRef) return;

  dbRef.on('value', snapshot => {
    if (isSyncing) return;
    const data = snapshot.val() || {};

    isSyncing = true;

    // 1. Exam Date
    examDate = data.examDate ? data.examDate : null;
    saveLocal(LS_KEY_EXAMDATE, examDate);
    const examInput = document.getElementById('examDateInput');
    if (examInput) examInput.value = examDate || '';
    updateCountdown();

    // 2. Topic Status
    if (data.topicStatus !== undefined) {
      topicStatus = data.topicStatus || {};
      saveLocal(LS_KEY_TOPICS, topicStatus);
    }
    // 3. Score Log
    if (data.scoreLog !== undefined) {
      scoreLog = Array.isArray(data.scoreLog) ? data.scoreLog : (data.scoreLog ? Object.values(data.scoreLog) : []);
      saveLocal(LS_KEY_SCORES, scoreLog);
    }
    // 4. Day Done
    if (data.dayDone !== undefined) {
      dayDone = data.dayDone || {};
      saveLocal(LS_KEY_DAY_DONE, dayDone);
    }
    // 5. Watched Videos
    if (data.watchedVideos !== undefined) {
      watchedVideos = data.watchedVideos || {};
      saveLocal(LS_KEY_WATCHED_VIDEOS, watchedVideos);
    }

    buildSubjectGrid();
    buildProgressList();
    buildWeeklyGrid();
    buildScoreLog();
    buildVideoGrid();
    updateOverall();

    isSyncing = false;
  }, err => {
    console.warn('Firebase listen error:', err);
    setSyncStatus('error');
  });

  // Monitor connection state
  db.ref('.info/connected').on('value', snap => {
    if (snap.val() === true) {
      setSyncStatus('connected');
    } else {
      setSyncStatus('offline');
    }
  });
}

function setSyncStatus(status) {
  const dot  = document.getElementById('syncBarDot');
  const text = document.getElementById('syncBarText');
  if (!dot || !text) return;
  const map = {
    connected: { color: '#34d399', label: `☁️ Sync เปิดอยู่ · Code: ${syncCode}` },
    offline:   { color: '#fbbf24', label: '⚠️ Offline — ข้อมูลบันทึกในเครื่อง' },
    error:     { color: '#f87171', label: '❌ เชื่อมต่อ Firebase ไม่ได้' },
    local:     { color: '#64748b', label: '📱 โหมดเฉพาะเครื่อง (ไม่มี Sync)' },
  };
  const s = map[status] || map.local;
  dot.style.background = s.color;
  text.textContent = s.label;
}

// ======================================================
// LOCAL STATE (localStorage fallback)
// ======================================================
const LS_KEY_TOPICS         = 'egat_topic_status';
const LS_KEY_EXAMDATE       = 'egat_exam_date';
const LS_KEY_SCORES         = 'egat_score_log';
const LS_KEY_DAY_DONE       = 'egat_day_done';
const LS_KEY_WATCHED_VIDEOS = 'egat_watched_videos';

function loadLocal(key, def) {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : def; } catch { return def; }
}
function saveLocal(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch {}
}

let topicStatus   = loadLocal(LS_KEY_TOPICS, {});
let examDate      = loadLocal(LS_KEY_EXAMDATE, null);
let scoreLog      = loadLocal(LS_KEY_SCORES, []);
let dayDone       = loadLocal(LS_KEY_DAY_DONE, {});
let watchedVideos = loadLocal(LS_KEY_WATCHED_VIDEOS, {});

let countdownInterval = null; // guard ป้องกัน interval ซ้ำ

// Save ทั้ง local + cloud
function saveAll(key, value) {
  saveLocal(key, value);
  // Map key -> Firebase field name
  const fieldMap = {
    [LS_KEY_TOPICS]:         'topicStatus',
    [LS_KEY_EXAMDATE]:       'examDate',
    [LS_KEY_SCORES]:         'scoreLog',
    [LS_KEY_DAY_DONE]:       'dayDone',
    [LS_KEY_WATCHED_VIDEOS]: 'watchedVideos',
  };
  const field = fieldMap[key];
  if (field) syncToCloud(field, value);
}

// ======================================================
// UTILS
// ======================================================
let currentPhase = 0;
let currentWeek  = 0;

function getTotalTopics()  { return SUBJECTS.reduce((s, sub) => s + sub.topics.length, 0); }
function getDoneCount()    { return Object.values(topicStatus).filter(v => v === 'done').length; }
function getInProgCount()  { return Object.values(topicStatus).filter(v => v === 'in-progress').length; }
function getPctDone()      { const t = getTotalTopics(); return t === 0 ? 0 : Math.round(getDoneCount() / t * 100); }

function cycleStatus(cur) {
  if (!cur || cur === 'pending') return 'in-progress';
  if (cur === 'in-progress')    return 'done';
  return 'pending';
}

function showToast(msg, duration = 2400) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), duration);
}

const STATUS_ICON = { 'done': '✓', 'in-progress': '→', 'pending': '' };

// ======================================================
// PARTICLES
// ======================================================
function initParticles() {
  const container = document.getElementById('bgParticles');
  const colors = ['#3b82f6', '#a78bfa', '#22d3ee', '#34d399'];
  for (let i = 0; i < 22; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 5 + 2;
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      animation-duration:${Math.random()*20+15}s;
      animation-delay:${Math.random()*15}s;
    `;
    container.appendChild(p);
  }
}

// ======================================================
// COUNTDOWN
// ======================================================
function updateCountdown() {
  const cdDays  = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins  = document.getElementById('cdMins');
  const cdSecs  = document.getElementById('cdSecs');

  // ล้าง interval เก่าก่อนเสมอ
  if (countdownInterval) { clearInterval(countdownInterval); countdownInterval = null; }

  if (!examDate) {
    cdDays.textContent  = '--';
    cdHours.textContent = '--';
    cdMins.textContent  = '--';
    if (cdSecs) cdSecs.textContent = '--';
    return;
  }

  function tick() {
    // แปลง date string เป็น local timezone (end of day 23:59:59)
    const parts = examDate.split('-');
    const end   = new Date(+parts[0], +parts[1] - 1, +parts[2], 23, 59, 59);
    const diff  = end - Date.now();

    if (diff <= 0) {
      cdDays.textContent  = '0';
      cdHours.textContent = '00';
      cdMins.textContent  = '00';
      if (cdSecs) cdSecs.textContent = '00';
      clearInterval(countdownInterval);
      showToast('🎯 ถึงวันสอบแล้ว! โชคดีนะครับ 💪');
      return;
    }
    cdDays.textContent  = Math.floor(diff / 86400000);
    cdHours.textContent = String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    cdMins.textContent  = String(Math.floor((diff % 3600000)  / 60000)).padStart(2, '0');
    if (cdSecs) cdSecs.textContent = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
  }

  tick(); // รันทันที
  countdownInterval = setInterval(tick, 1000); // อัปเดตทุก 1 วินาที
}

function resetExamDate() {
  if (!confirm('ต้องการรีเซ็ตวันสอบใช่ไหม?')) return;
  examDate = null;
  saveAll(LS_KEY_EXAMDATE, '');
  const examInput = document.getElementById('examDateInput');
  if (examInput) examInput.value = '';
  updateCountdown();
  showToast('🗑 รีเซ็ตวันสอบเรียบร้อย');
}

// ======================================================
// OVERALL PROGRESS
// ======================================================
function updateOverall() {
  const pct   = getPctDone();
  const done  = getDoneCount();
  const total = getTotalTopics();

  document.getElementById('overallPctLabel').textContent = pct + '%';
  document.getElementById('overallBarFill').style.width  = pct + '%';
  document.getElementById('completedTopics').textContent = done + ' หัวข้อเสร็จแล้ว';
  document.getElementById('totalTopics').textContent     = 'จากทั้งหมด ' + total + ' หัวข้อ';
  document.getElementById('statDone').textContent        = getDoneCount();
  document.getElementById('statInProgress').textContent  = getInProgCount();
  document.getElementById('statPending').textContent     = total - getDoneCount() - getInProgCount();

  const avg = scoreLog.length
    ? Math.round(scoreLog.reduce((s, e) => s + e.score, 0) / scoreLog.length) : 0;
  document.getElementById('statScore').textContent = avg;
}

// ======================================================
// SUBJECT GRID
// ======================================================
function buildSubjectGrid() {
  const container = document.getElementById('subjectGrid');
  container.innerHTML = '';

  SUBJECTS.forEach(sub => {
    const done  = sub.topics.filter(t => topicStatus[t.id] === 'done').length;
    const total = sub.topics.length;
    const pct   = total === 0 ? 0 : Math.round(done / total * 100);

    const card = document.createElement('div');
    card.className = 'subject-card';

    card.innerHTML = `
      <div class="sc-accent-line" style="background:${sub.accentColor};"></div>
      <div class="sc-header">
        <div class="sc-icon" style="background:${sub.accentBg}; color:${sub.accentColor};">${sub.icon}</div>
        <div class="sc-meta">
          <div class="sc-title">${sub.title}</div>
          <div class="sc-score">น้ำหนัก <span class="sc-score-badge">${sub.score}</span>
            <span style="margin-left:8px; color:${sub.accentColor}; font-weight:600;">${pct}%</span>
          </div>
        </div>
      </div>
      <ul class="sc-topics">
        ${sub.topics.map(t => {
          const st = topicStatus[t.id] || 'pending';
          return `<li class="sc-topic status-${st}" data-tid="${t.id}">
            <span class="topic-check">${STATUS_ICON[st]}</span>
            <span>${t.label}</span>
          </li>`;
        }).join('')}
      </ul>
      <div class="sc-progress-bar-track">
        <div class="sc-progress-bar-fill" style="width:${pct}%; background:${sub.accentColor};"></div>
      </div>
    `;

    card.querySelectorAll('.sc-topic').forEach(li => {
      li.addEventListener('click', () => {
        const tid = li.dataset.tid;
        const newSt = cycleStatus(topicStatus[tid] || 'pending');
        topicStatus[tid] = newSt;

        // 2-Way Sync: หากผู้ใช้กดอัปเดตหัวข้อเอง -> ให้ซิงค์สถานะมาร์กวิดีโอเรียนแล้วอัตโนมัติ
        syncVideosFromTopic(tid, newSt);

        saveAll(LS_KEY_TOPICS, topicStatus);
        buildSubjectGrid();
        buildProgressList();
        updateOverall();
        const labels = {
          'in-progress': '📖 กำลังเรียน',
          'done': '✅ เสร็จแล้ว (ซิงค์วิดีโอเรียนแล้วอัตโนมัติ)',
          'pending': '⏳ รีเซ็ต (ปลดมาร์กวิดีโอที่เกี่ยวข้อง)'
        };
        showToast(labels[newSt] + ' — ' + li.querySelector('span:last-child').textContent, 3000);
      });
    });

    container.appendChild(card);
  });
}

// ======================================================
// PHASE CONTENT
// ======================================================
const PHASE_META = [
  { icon: '📖', badge: 'สร้างรากฐาน',   badgeColor: '#3b82f6' },
  { icon: '🎯', badge: 'เจาะลึก',        badgeColor: '#a78bfa' },
  { icon: '📝', badge: 'ฝึกจริง',         badgeColor: '#22d3ee' },
  { icon: '🏆', badge: 'ทบทวน & สอบ',    badgeColor: '#34d399' },
];

function buildPhaseTabs() {
  const container = document.getElementById('phaseTabs');
  container.innerHTML = '';

  PHASES.forEach((phase, i) => {
    // connector ก่อนทุก tab ยกเว้นอันแรก
    if (i > 0) {
      const conn = document.createElement('div');
      conn.className = 'phase-tab-connector' + (i <= currentPhase ? ' passed' : '');
      container.appendChild(conn);
    }

    const btn = document.createElement('button');
    btn.className = 'phase-tab' +
      (i === currentPhase ? ' active' : '') +
      (i < currentPhase  ? ' passed' : '');
    btn.dataset.phase = i;
    btn.dataset.num   = i + 1;
    btn.innerHTML = `Phase ${i + 1}<small>${phase.days}</small>`;
    container.appendChild(btn);
  });
}

function buildPhaseContent(animated = true) {
  const container = document.getElementById('phaseContent');
  const phase     = PHASES[currentPhase];
  const meta      = PHASE_META[currentPhase];

  // ตั้ง CSS custom property สีตาม phase
  container.style.setProperty('--phase-color', phase.color);

  function renderContent() {
    container.innerHTML = `
      <div class="phase-header">
        <div class="phase-header-icon" style="background:${phase.color}22; color:${phase.color};">${meta.icon}</div>
        <div class="phase-header-meta">
          <div class="phase-header-days" style="color:${phase.color};">${phase.days}</div>
          <div class="phase-header-title">${phase.title}</div>
          <div class="phase-header-desc">${phase.desc}</div>
        </div>
        <div class="phase-badge" style="color:${phase.color}; border-color:${phase.color}44; background:${phase.color}11;">${meta.badge}</div>
      </div>
      <div class="phase-grid">
        ${phase.groups.map((g, idx) => `
          <div class="day-group-card" style="--phase-color:${phase.color}; animation-delay:${idx * 60}ms;"
               class="day-group-card anim-card">
            <div class="day-group-title" style="color:${phase.color};">${g.days}</div>
            <div class="day-group-subject">${g.subject}</div>
            <ul class="day-group-tasks">${g.tasks.map(t => `<li>${t}</li>`).join('')}</ul>
          </div>`).join('')}
      </div>`;

    if (animated) {
      container.classList.remove('anim-in', 'anim-out');
      void container.offsetWidth; // force reflow
      container.classList.add('anim-in');
    }
  }

  if (animated && !container.classList.contains('anim-out')) {
    container.classList.add('anim-out');
    setTimeout(renderContent, 200);
  } else {
    renderContent();
  }
}


// ======================================================
// WEEKLY CALENDAR
// ======================================================
const DAYS_TH = ['อา.','จ.','อ.','พ.','พฤ.','ศ.','ส.'];

function getWeekPlan(weekIdx) {
  const startDay = weekIdx * 7 + 1;
  return Array.from({length: 7}, (_, i) => {
    const day = startDay + i;
    if (day > 60) return null;
    let task = '';
    for (const phase of PHASES) {
      for (const g of phase.groups) {
        const m = g.days.match(/(\d+)[–-](\d+)/);
        if (m && day >= parseInt(m[1]) && day <= parseInt(m[2])) { task = g.subject; }
        else if (!m) {
          const m2 = g.days.match(/(\d+)/);
          if (m2 && day === parseInt(m2[1])) task = g.subject;
        }
      }
    }
    return { day, task, done: !!dayDone[day] };
  });
}

function buildWeeklyGrid() {
  const container  = document.getElementById('weeklyGrid');
  const weekLabel  = document.getElementById('weekLabel');
  weekLabel.textContent = `สัปดาห์ที่ ${currentWeek + 1} / ${Math.ceil(60/7)}`;

  container.innerHTML = getWeekPlan(currentWeek).map((p, i) => {
    if (!p) return `<div class="day-cell" style="opacity:0.3;"><div class="day-name">${DAYS_TH[i%7]}</div><div class="day-num" style="color:var(--text-muted);">-</div></div>`;
    const cls = ['day-cell', p.done?'completed':'', (i===0||i===6)?'weekend':''].filter(Boolean).join(' ');
    return `<div class="${cls}" data-day="${p.day}">
      <div class="day-name">${DAYS_TH[i%7]}</div>
      <div class="day-num">วัน ${p.day}</div>
      <div class="day-task">${p.task}</div>
      <div class="day-badge">✓</div>
    </div>`;
  }).join('');

  container.querySelectorAll('.day-cell[data-day]').forEach(cell => {
    cell.addEventListener('click', () => {
      const day = parseInt(cell.dataset.day);
      dayDone[day] = !dayDone[day];
      saveAll(LS_KEY_DAY_DONE, dayDone);
      buildWeeklyGrid();
      showToast(dayDone[day] ? `✅ วันที่ ${day} — เสร็จแล้ว!` : `⬜ วันที่ ${day} — ยกเลิก`);
    });
  });
}

// ======================================================
// PROGRESS LIST
// ======================================================
function buildProgressList() {
  const container = document.getElementById('progressList');
  container.innerHTML = '';

  SUBJECTS.forEach(sub => {
    const done  = sub.topics.filter(t => topicStatus[t.id] === 'done').length;
    const total = sub.topics.length;
    const pct   = total === 0 ? 0 : Math.round(done / total * 100);

    const card = document.createElement('div');
    card.className = 'pl-card';
    card.innerHTML = `
      <div class="pl-top">
        <div class="pl-title"><span>${sub.icon}</span><span>${sub.title}</span></div>
        <div class="pl-pct" style="color:${sub.accentColor};">${pct}%</div>
      </div>
      <div class="pl-bar-track">
        <div class="pl-bar-fill" style="width:${pct}%; background:${sub.accentColor};"></div>
      </div>
      <div class="pl-subtopics">
        ${sub.topics.map(t => {
          const st = topicStatus[t.id] || 'pending';
          return `<span class="subtopic-pill ${st==='done'?'done':st==='in-progress'?'in-progress':''}" data-tid="${t.id}">${t.label}</span>`;
        }).join('')}
      </div>`;

    card.querySelectorAll('.subtopic-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const tid = pill.dataset.tid;
        const newSt = cycleStatus(topicStatus[tid] || 'pending');
        topicStatus[tid] = newSt;

        // 2-Way Sync: หากผู้ใช้กดอัปเดตหัวข้อเอง -> ให้ซิงค์สถานะมาร์กวิดีโอเรียนแล้วอัตโนมัติ
        syncVideosFromTopic(tid, newSt);

        saveAll(LS_KEY_TOPICS, topicStatus);
        buildSubjectGrid();
        buildProgressList();
        updateOverall();
        const labels = {
          'in-progress': '📖 กำลังเรียน',
          'done': '✅ เสร็จแล้ว (ซิงค์วิดีโอเรียนแล้วอัตโนมัติ)',
          'pending': '⏳ รีเซ็ต (ปลดมาร์กวิดีโอที่เกี่ยวข้อง)'
        };
        showToast(labels[newSt] + ' — ' + pill.textContent.trim(), 3000);
      });
    });

    container.appendChild(card);
  });
}

// ======================================================
// SCORE LOG
// ======================================================
function populateScoreSelect() {
  const sel = document.getElementById('scoreSubject');
  sel.innerHTML = '<option value="">เลือกวิชา</option>' +
    SUBJECTS.map(s => `<option value="${s.id}">${s.icon} ${s.title.split(' (')[0]}</option>`).join('') +
    '<option value="mock">📝 Mock Test รวม</option>';
}

function buildScoreLog() {
  const container = document.getElementById('scoreLogList');
  if (!scoreLog.length) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:0.85rem;padding:12px 0;">ยังไม่มีรายการคะแนน · กรอกคะแนนด้านบนเพื่อเริ่มบันทึก</div>';
    return;
  }
  container.innerHTML = [...scoreLog].reverse().map(e => {
    const sub = SUBJECTS.find(s => s.id === e.subject) || { title: 'Mock Test รวม', icon: '📝' };
    const cls = e.score >= 70 ? 'high' : e.score >= 50 ? 'mid' : 'low';
    return `<div class="score-entry">
      <div>
        <div class="score-entry-subject">${sub.icon||'📝'} ${e.subject==='mock'?'Mock Test รวม':(sub.title||'').split(' (')[0]}</div>
        <div class="score-entry-date">📅 ${e.date}</div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;">
        <div class="score-entry-score ${cls}">${e.score}<span style="font-size:0.7rem;font-weight:400;color:var(--text-muted);">/100</span></div>
        <button class="score-entry-del" data-id="${e.id}">🗑</button>
      </div>
    </div>`;
  }).join('');

  container.querySelectorAll('.score-entry-del').forEach(btn => {
    btn.addEventListener('click', () => {
      scoreLog = scoreLog.filter(e => e.id !== btn.dataset.id);
      saveAll(LS_KEY_SCORES, scoreLog);
      buildScoreLog();
      updateOverall();
    });
  });
}

// ======================================================
// SYNC MODAL
// ======================================================
function showSyncModal() {
  document.getElementById('syncOverlay').style.display = 'flex';
}
function hideSyncModal() {
  document.getElementById('syncOverlay').style.display = 'none';
}

function activateSyncCode(code) {
  if (!code || code.trim() === '') return;
  syncCode = code.trim().toUpperCase().replace(/[^A-Z0-9_]/g, '');
  if (!syncCode) { showToast('⚠️ Sync Code ต้องใช้ตัวอักษรภาษาอังกฤษหรือตัวเลข'); return; }

  saveLocal(LS_SYNC_CODE, syncCode);
  setDbRef(syncCode);

  const bar = document.getElementById('syncBar');
  bar.style.display = 'flex';
  setSyncStatus('offline');
  listenToCloud();

  if (dbRef) {
    dbRef.once('value').then(snapshot => {
      if (!snapshot.exists()) {
        saveAll(LS_KEY_TOPICS, topicStatus);
        saveAll(LS_KEY_EXAMDATE, examDate);
        saveAll(LS_KEY_SCORES, scoreLog);
        saveAll(LS_KEY_DAY_DONE, dayDone);
        saveAll(LS_KEY_WATCHED_VIDEOS, watchedVideos);
      }
    }).catch(e => console.warn('Cloud check error:', e));
  }

  hideSyncModal();
  showToast(`🔗 Sync Code: ${syncCode} — เชื่อมต่อสำเร็จ!`);
}

function skipSync() {
  saveLocal(LS_SYNC_CODE, '__LOCAL__');
  hideSyncModal();
  const bar = document.getElementById('syncBar');
  bar.style.display = 'flex';
  setSyncStatus('local');
}

// ======================================================
// NAV ACTIVE
// ======================================================
function initNavObserver() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => obs.observe(s));
}

// ซ่อน sync-bar เมื่อ scroll ลง / แสดงเมื่อ scroll ขึ้นถึงบนสุด
function initSyncBarScroll() {
  const bar = document.getElementById('syncBar');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    if (bar.style.display === 'none') return; // ยังไม่ได้ตั้ง sync code
    if (window.scrollY > 40) {
      bar.classList.add('bar-hidden');
    } else {
      bar.classList.remove('bar-hidden');
    }
  }, { passive: true });
}


// ======================================================
// INIT
// ======================================================
function init() {
  initParticles();
  initFirebase();

  // ---- Sync Modal Logic ----
  const savedCode = loadLocal(LS_SYNC_CODE, null);
  if (!savedCode) {
    // ไม่เคยตั้งค่า → แสดง modal
    showSyncModal();
  } else if (savedCode === '__LOCAL__') {
    // เลือก skip ครั้งก่อน
    document.getElementById('syncBar').style.display = 'flex';
    setSyncStatus('local');
  } else {
    // มี code อยู่แล้ว → เชื่อมต่อทันที
    syncCode = savedCode;
    setDbRef(syncCode);
    document.getElementById('syncBar').style.display = 'flex';
    setSyncStatus('offline');
    listenToCloud();
  }

  document.getElementById('syncCodeConfirmBtn').addEventListener('click', () => {
    activateSyncCode(document.getElementById('syncCodeInput').value);
  });
  document.getElementById('syncCodeInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') activateSyncCode(document.getElementById('syncCodeInput').value);
  });
  document.getElementById('syncSkipBtn').addEventListener('click', e => {
    e.preventDefault(); skipSync();
  });
  document.getElementById('syncBarChange').addEventListener('click', () => {
    document.getElementById('syncCodeInput').value = syncCode || '';
    showSyncModal();
  });

  // ---- Exam date ----
  const examInput = document.getElementById('examDateInput');
  if (examDate && examInput) examInput.value = examDate;

  const saveAndSyncExamDate = () => {
    if (examInput && examInput.value) {
      examDate = examInput.value;
      saveAll(LS_KEY_EXAMDATE, examDate);
      updateCountdown();
      showToast('📅 บันทึกและซิงค์วันสอบแล้ว!');
    }
  };

  const setBtn = document.getElementById('setExamDateBtn');
  if (setBtn) setBtn.addEventListener('click', saveAndSyncExamDate);
  if (examInput) examInput.addEventListener('change', saveAndSyncExamDate);

  document.getElementById('resetExamDateBtn').addEventListener('click', resetExamDate);
  updateCountdown();

  // ---- Build UI ----
  buildSubjectGrid();
  buildPhaseTabs();
  buildPhaseContent(false); // ไม่ animate ครั้งแรก
  buildWeeklyGrid();
  buildProgressList();
  buildScoreLog();
  populateScoreSelect();
  updateOverall();

  // ---- Phase tabs ----
  document.getElementById('phaseTabs').addEventListener('click', e => {
    const tab = e.target.closest('.phase-tab');
    if (!tab || tab.dataset.phase === undefined) return;
    const newPhase = parseInt(tab.dataset.phase);
    if (newPhase === currentPhase) return; // ไม่ทำอะไรถ้ากดเดิม
    currentPhase = newPhase;
    buildPhaseTabs();       // อัปเดต stepper
    buildPhaseContent();    // เปลี่ยนเนื้อหาพร้อม animation
  });

  // ---- Week nav ----
  document.getElementById('prevWeek').addEventListener('click', () => {
    if (currentWeek > 0) { currentWeek--; buildWeeklyGrid(); }
  });
  document.getElementById('nextWeek').addEventListener('click', () => {
    if (currentWeek < 8) { currentWeek++; buildWeeklyGrid(); }
  });

  // ---- Score log ----
  document.getElementById('addScoreBtn').addEventListener('click', () => {
    const sub   = document.getElementById('scoreSubject').value;
    const score = parseInt(document.getElementById('scoreInput').value);
    const date  = document.getElementById('scoreDateInput').value || new Date().toISOString().split('T')[0];
    if (!sub || isNaN(score) || score < 0 || score > 100) {
      showToast('⚠️ กรุณากรอกวิชาและคะแนน (0-100) ให้ครบ');
      return;
    }
    scoreLog.push({ id: Date.now().toString(), subject: sub, score, date });
    saveAll(LS_KEY_SCORES, scoreLog);
    buildScoreLog();
    updateOverall();
    document.getElementById('scoreInput').value = '';
    document.getElementById('scoreDateInput').value = '';
    showToast(`✅ บันทึกคะแนน ${score} คะแนน แล้ว!`);
  });

  buildVideoGrid();
  initVideoSection();

  initNavObserver();
  initSyncBarScroll();
  initMacOSDatePicker();

}

// ======================================================
// DATA: คลังวิดีโอเรียน (Video Lessons)
// ======================================================
const LESSON_VIDEOS = [
  {
    id: 'v_gb_1',
    title: 'รวมแนวข้อสอบ คณิต ก.พ. ภาค ก. "ร้อยละ"',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '25:00',
    youtubeId: 'ZFQnzl2HlfU',
    desc: 'ติวเจาะลึกการทำข้อสอบร้อยละ อัตราส่วน และโจทย์ประยุกต์',
    relatedTopics: ['math_pct']
  },
  {
    id: 'v_gb_2',
    title: 'รวมแนวข้อสอบ คณิต ก.พ. ภาค ก. "สมการ"',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '20:00',
    youtubeId: 'ObRZzJeKPSU',
    desc: 'ปูพื้นฐานการแก้สมการตัวแปรเดียวและหลายตัวแปรสำหรับสอบภาค ก.',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_gb_3',
    title: 'ติว ก.พ. - ความน่าจะเป็น EP. 1/2',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '18:00',
    youtubeId: 'wC32SDFbweM',
    desc: 'ปูพื้นฐานความน่าจะเป็น กฎการนับเบื้องต้นและการสุ่ม',
    relatedTopics: ['math_stat']
  },
  {
    id: 'v_gb_4',
    title: 'ติว ก.พ. - ความน่าจะเป็น EP. 2/2',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '22:00',
    youtubeId: 'lxjNYWy_Nlk',
    desc: 'ตะลุยโจทย์ความน่าจะเป็นระดับเข้มข้นและเทคนิคการตัดตัวเลือก',
    relatedTopics: ['math_stat']
  },
  {
    id: 'v_gb_5',
    title: 'อนุกรม ก.พ. ภาค ก. "มองยังไงให้เป็นระบบ"',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '24:00',
    youtubeId: 'L4IbmkEAtnE',
    desc: 'เทคนิคการมองรูปแบบอนุกรม 15 ประเภทเพื่อทำข้อสอบได้รวดเร็ว',
    relatedTopics: ['math_series']
  },
  {
    id: 'v_gb_6',
    title: 'ตะลุยแนวข้อสอบ ก.พ.ภาค ก. คณิตศาสตร์ (Operate)',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '19:00',
    youtubeId: 'FuorzGeZs_k',
    desc: 'ตะลุยโจทย์คณิตศาสตร์ตัวดำเนินการ Operate หาความสัมพันธ์ตัวเลข',
    relatedTopics: ['math_series']
  },
  {
    id: 'v_gb_7',
    title: 'ตะลุยแนวข้อสอบ ก.พ.ภาค ก. - อนุกรม',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '26:00',
    youtubeId: 'UQkMl6aFJMA',
    desc: 'รวมโจทย์อนุกรมหลากหลายรูปแบบสำหรับฝึกทำก่อนสอบจริง',
    relatedTopics: ['math_series']
  },
  {
    id: 'v_gb_8',
    title: 'ตะลุยแนวข้อสอบ ก.พ.ภาค ก. เงื่อนไขภาษา',
    channel: 'พี่น็อต GoodBrain',
    category: 'verbal',
    categoryLabel: '💬 ภาษา',
    accentColor: '#a78bfa',
    duration: '30:00',
    youtubeId: 'a3Kz5fzCoCg',
    desc: 'เทคนิคการตีความและวิเคราะห์เงื่อนไขทางภาษาอย่างเป็นขั้นตอน',
    relatedTopics: ['verbal_reading']
  },
  {
    id: 'v_gb_9',
    title: 'ตะลุยแนวข้อสอบ ก.พ. ภาค ก. ภาษาไทย (อุปมา-อุปไมย)',
    channel: 'พี่น็อต GoodBrain',
    category: 'verbal',
    categoryLabel: '💬 ภาษา',
    accentColor: '#a78bfa',
    duration: '28:00',
    youtubeId: 'AQ-hgL1oCGg',
    desc: 'การวิเคราะห์ความสัมพันธ์ของคำ อุปมาอุปไมย ภาษาไทย',
    relatedTopics: ['verbal_analogy']
  },
  {
    id: 'v_gb_10',
    title: 'คณิตศาสตร์ ก.พ. ภาค ก.- อนุกรม ตอนที่ 1/2',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '21:00',
    youtubeId: 'R0vmf1xy674',
    desc: 'เจาะลึกเทคนิคการทำโจทย์อนุกรมและลำดับตัวเลข Part 1',
    relatedTopics: ['math_series']
  },
  {
    id: 'v_gb_11',
    title: 'คณิตศาสตร์ ก.พ. ภาค ก.- อนุกรม ตอนที่ 2/2',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '23:00',
    youtubeId: 'DvOUE3BhXyk',
    desc: 'เจาะลึกเทคนิคการทำโจทย์อนุกรมและลำดับตัวเลข Part 2',
    relatedTopics: ['math_series']
  },
  {
    id: 'v_gb_12',
    title: 'ติวคณิตศาสตร์ ก.พ. - การวิเคราะห์ตาราง ตอนที่ 1/2',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '25:00',
    youtubeId: 'LYTyF72r_b8',
    desc: 'ฝึกอ่านกราฟ ตารางข้อมูล และคำนวณตัวเลขอย่างรวดเร็ว',
    relatedTopics: ['math_data']
  },
  {
    id: 'v_gb_13',
    title: 'ติวคณิตศาสตร์ ก.พ. - การวิเคราะห์ตาราง ตอนที่ 2/2',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '27:00',
    youtubeId: 'ftxyGbycLpU',
    desc: 'เจาะโจทย์ตารางข้อมูลเปรียบเทียบร้อยละและการวิเคราะห์ขั้นสูง',
    relatedTopics: ['math_data']
  },
  {
    id: 'v_gb_14',
    title: 'ติวคณิตศาสตร์ ก.พ. - Operate',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '18:00',
    youtubeId: '1O6e2bRWLgA',
    desc: 'เทคนิคหาแบบแผนสัญลักษณ์การดำเนินการ Operate',
    relatedTopics: ['math_series']
  },
  {
    id: 'v_gb_15',
    title: 'ติวคณิต ก.พ. "เงื่อนไขสัญลักษณ์" (ปูพื้นฐานละเอียด) EP 1/3',
    channel: 'พี่น็อต GoodBrain',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '32:00',
    youtubeId: '8ioK5-Ed23s',
    desc: 'ปูพื้นฐานเรื่องเครื่องหมายและสัญลักษณ์ทางตรรกศาสตร์ EP 1',
    relatedTopics: ['logic_sym']
  },
  {
    id: 'v_gb_16',
    title: 'ติวคณิต ก.พ. "เงื่อนไขสัญลักษณ์" (ปูพื้นฐานละเอียด) EP 2/3',
    channel: 'พี่น็อต GoodBrain',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '35:00',
    youtubeId: 'G3IGHsYZ4UY',
    desc: 'ฝึกสรุปความสัมพันธ์ของเงื่อนไขสัญลักษณ์ EP 2',
    relatedTopics: ['logic_sym']
  },
  {
    id: 'v_gb_17',
    title: 'ติวคณิต ก.พ. "เงื่อนไขสัญลักษณ์" (ปูพื้นฐานละเอียด) EP 3/3',
    channel: 'พี่น็อต GoodBrain',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '38:00',
    youtubeId: 'oNKA3qZjdog',
    desc: 'ตะลุยโจทย์เงื่อนไขสัญลักษณ์ขั้นซับซ้อนพร้อมเทคนิคการทำข้อสอบ EP 3',
    relatedTopics: ['logic_sym']
  },
  {
    id: 'v_gb_18',
    title: 'ติวสอบ ก.พ. 64 | คณิตทั่วไป "อัตราส่วน"',
    channel: 'พี่น็อต GoodBrain',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '20:00',
    youtubeId: 'fjZJEeemQs0',
    desc: 'สรุปการเทียบอัตราส่วนและสัดส่วนคณิตศาสตร์ทั่วไป',
    relatedTopics: ['math_pct']
  },
  {
    id: 'v_em_1',
    title: 'Math วันละนิด - โจทย์เกี่ยวกับ คน วัน งาน',
    channel: 'Easy Math',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '15:00',
    youtubeId: 'gpHIKlbnBAw',
    desc: 'ติวเจาะลึกโจทย์ประเภท คน-วัน-งาน (Work Rate) สูตรและเทคนิคทำข้อสอบภาค ก.',
    relatedTopics: ['math_work']
  },
  {
    id: 'v_tn_1',
    title: 'สถิติ ค่ากลางของข้อมูล - ค่าเฉลี่ย มัธยฐาน ฐานนิยม',
    channel: 'TUENONG',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '20:00',
    youtubeId: 'o1O_fJ05GNs',
    desc: 'อธิบายค่ากลางของข้อมูลครบ 3 ตัว ค่าเฉลี่ย มัธยฐาน ฐานนิยม พร้อมตัวอย่างและวิธีทำ',
    relatedTopics: ['math_stat']
  },
  {
    id: 'v_sm_1',
    title: 'สถิติ ม.3 - สรุปทุกสิ่งที่ต้องรู้',
    channel: 'พี่ปั้น SmartMathPro',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '22:00',
    youtubeId: 'JqTxhYtJVJA',
    desc: 'สรุปครบทุกหัวข้อสถิติ ม.3 ทั้ง mean, median, mode, range และ SD ในคลิปเดียว',
    relatedTopics: ['math_stat']
  },
  {
    id: 'v_sm_2',
    title: 'สรุปสูตรเลขยกกำลัง ม.5 - คณิตวันละนิด EP.15',
    channel: 'พี่ปั้น SmartMathPro',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '10:00',
    youtubeId: '_YsGMt_3hMU',
    desc: 'สรุปสูตรและกฎเลขยกกำลังทั้งหมดที่ต้องรู้ พร้อมตัวอย่างประกอบ',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_1',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep1: ปูพื้นฐานความถนัดทางเชาวน์ปัญญา',
    channel: 'Engineer Tutor',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '15:00',
    youtubeId: '8rPEGqgf0ZY',
    desc: 'ปูพื้นฐานความถนัดทางเชาวน์ปัญญาและการวิเคราะห์ความสัมพันธ์เชิงตรรกะ',
    relatedTopics: ['logic_sym', 'logic_decide']
  },
  {
    id: 'v_et_2',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep2: ตรรกศาสตร์ การจำประพจน์ที่สมมูล',
    channel: 'Engineer Tutor',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '20:00',
    youtubeId: 'wpr6t_kxRiU',
    desc: 'เทคนิคการจำและวิเคราะห์ประพจน์ที่สมมูลกันในวิชาตรรกศาสตร์',
    relatedTopics: ['logic_prop', 'logic_sym']
  },
  {
    id: 'v_et_3',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep3: แบบฝึกหัดตรรกศาสตร์',
    channel: 'Engineer Tutor',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '22:00',
    youtubeId: 'qlsZk2hmQDo',
    desc: 'ตะลุยแบบฝึกหัดวิเคราะห์ตรรกศาสตร์และโครงสร้างเงื่อนไขประพจน์',
    relatedTopics: ['logic_prop', 'logic_deduce']
  },
  {
    id: 'v_et_4',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep4: แบบฝึกหัดหาค่าความจริงของประพจน์',
    channel: 'Engineer Tutor',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '22:00',
    youtubeId: 'B-f3PsczyBg',
    desc: 'การหาค่าความจริงของประพจน์เชิงซ้อนและการสร้างตารางค่าความจริง',
    relatedTopics: ['logic_prop']
  },
  {
    id: 'v_et_5',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep5: แบบฝึกหัดเรื่องสมมูล',
    channel: 'Engineer Tutor',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '25:00',
    youtubeId: 'gmhPzOuTiCE',
    desc: 'ฝึกทำโจทย์เรื่องรูปแบบประพจน์ที่สมมูลกันและการแปลงสัญลักษณ์ตรรกศาสตร์',
    relatedTopics: ['logic_prop', 'logic_sym']
  },
  {
    id: 'v_et_6',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep6: แบบฝึกหัดสัจนิรันดร์',
    channel: 'Engineer Tutor',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '24:00',
    youtubeId: 'bBScETvtQdw',
    desc: 'การพิสูจน์และการตรวจสอบสัจนิรันดร์ด้วยวิธีหาข้อขัดแย้ง',
    relatedTopics: ['logic_prop']
  },
  {
    id: 'v_et_7',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep7: เมทริกซ์ การหามิติ และการบวกลบเมทริกซ์',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '25:00',
    youtubeId: 'I6ZPZCJqV-o',
    desc: 'ปูพื้นฐานเรื่องเมทริกซ์ มิติของเมทริกซ์ และการดำเนินการบวกลบ',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_8',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep8: เมทริกซ์ ทรานสโพส และการคูณเมทริกซ์',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '26:00',
    youtubeId: 'vJ7R7DM-4QM',
    desc: 'การทรานสโพสเมทริกซ์ (Matrix Transpose) และเทคนิคการคูณเมทริกซ์',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_9',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep9: เมทริกซ์ การหาดีเทอร์มิแนนต์ 2x2 และ 3x3',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '28:00',
    youtubeId: 'DZQBfKZLiEo',
    desc: 'การคำนวณหาค่าดีเทอร์มิแนนต์ (Determinant) ของเมทริกซ์มิติ 2x2 และ 3x3',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_10',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep10: เมทริกซ์ การหาอินเวอร์สเมทริกซ์ 2x2 และ 3x3',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '30:00',
    youtubeId: 'bmiTkfgV_pQ',
    desc: 'การหาอินเวอร์สเมทริกซ์ผกผัน (Inverse Matrix) สำหรับมิติ 2x2 และ 3x3',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_11',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep11: การหาลิมิตของลำดับอนันต์',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '25:00',
    youtubeId: 'l_8T02xIBUI',
    desc: 'การหาค่าลิมิตของลำดับอนันต์ (Limits of Infinite Sequences)',
    relatedTopics: ['math_series']
  },
  {
    id: 'v_et_12',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep12: อนุกรมอนันต์และการทดสอบการลู่ออก',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '25:00',
    youtubeId: 'msF7hIKStVI',
    desc: 'บทเรียนอนุกรมอนันต์ ผลบวกอนุกรม และการลู่เข้า/ลู่ออกของอนุกรม',
    relatedTopics: ['math_series']
  },
  {
    id: 'v_et_13',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep13: การเรียงลำดับประโยค',
    channel: 'Engineer Tutor',
    category: 'verbal',
    categoryLabel: '💬 ความสามารถด้านภาษา',
    accentColor: '#a78bfa',
    duration: '25:00',
    youtubeId: 'EOdH4u2vNyY',
    desc: 'เทคนิคการวิเคราะห์และเรียงลำดับข้อความ/ประโยคภาษาไทย',
    relatedTopics: ['verbal_reading', 'verbal_middle']
  },
  {
    id: 'v_et_14',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep14: การอ่านบทความสั้น',
    channel: 'Engineer Tutor',
    category: 'verbal',
    categoryLabel: '💬 ความสามารถด้านภาษา',
    accentColor: '#a78bfa',
    duration: '28:00',
    youtubeId: 'Cw9wMGqJais',
    desc: 'การอ่านจับใจความสำคัญ วิเคราะห์ประเด็น และสรุปความจากบทความสั้น',
    relatedTopics: ['verbal_reading']
  },
  {
    id: 'v_et_15',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep15: จำนวนจริง สมบัติของจำนวนจริง และค่าสัมบูรณ์',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '30:00',
    youtubeId: 'oQihtJ08wEw',
    desc: 'สรุปโครงสร้างระบบจำนวนจริง สมบัติทางพีชคณิต และค่าสัมบูรณ์',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_16',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep16: จำนวนจริง พหุนามและการหารยาว',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '25:00',
    youtubeId: 'eudcgwK2Ock',
    desc: 'การจัดการพหุนาม ทฤษฎีบทเศษเหลือและการหารสังเคราะห์',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_17',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep17: การแยกตัวประกอบพหุนามดีกรีสอง',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '27:00',
    youtubeId: 'w9nlY-fdLYM',
    desc: 'เทคนิคการแยกตัวประกอบพหุนามดีกรีสองและการใช้สูตรหาคำตอบสมการ',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_18',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep18: จำนวนจริง การแก้อสมการพหุนาม',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '26:00',
    youtubeId: 'FB4Ddx06QMc',
    desc: 'การแก้และลงเส้นจำนวนหาช่วงคำตอบของอสมการพหุนาม',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_19',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep19: การแก้อสมการค่าสัมบูรณ์',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '28:00',
    youtubeId: '7cQPjq7lEMQ',
    desc: 'การแก้อสมการที่มีเครื่องหมายค่าสัมบูรณ์และการพิจารณาช่วงคำตอบ',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_20',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep20: ตะลุยแนวข้อสอบจำนวนจริง',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '30:00',
    youtubeId: 'nL0VAxbhT68',
    desc: 'ตะลุยแนวข้อสอบเรื่องระบบจำนวนจริง สมการ และอสมการประยุกต์',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_21',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep21: แบบฝึกหัดลิมิตและแคลคูลัส',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '32:00',
    youtubeId: 'hn0sjI3zEiE',
    desc: 'แบบฝึกหัดการหาอนุพันธ์และลิมิตในวิชาแคลคูลัส',
    relatedTopics: ['math_equation', 'math_series']
  },
  {
    id: 'v_et_22',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep22: สรุปสูตรอินทิเกรต',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '30:00',
    youtubeId: 'rMVWosFsiY0',
    desc: 'สรุปสูตรการอินทิเกรต (Integration) รูปแบบต่างๆ สำหรับเตรียมสอบ',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_23',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep23: การอินทิเกรตค่าสัมบูรณ์และหลายชั้น',
    channel: 'Engineer Tutor',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '35:00',
    youtubeId: '1st64xHT6IE',
    desc: 'เทคนิคการอินทิเกรตฟังก์ชันค่าสัมบูรณ์และการคำนวณอินทิเกรตสองชั้น',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_et_24',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep24: ความถนัดทางเชาวน์ปัญญา มิติสัมพันธ์',
    channel: 'Engineer Tutor',
    category: 'spatial',
    categoryLabel: '🎲 มิติสัมพันธ์',
    accentColor: '#fb923c',
    duration: '30:00',
    youtubeId: '_WNbrsOe8QE',
    desc: 'ติวสอบความถนัดทางเชาวน์ปัญญา มิติสัมพันธ์ การมองรูป และอนุกรมรูปภาพ',
    relatedTopics: ['spatial_unfold', 'spatial_rotate', 'spatial_mirror']
  },
  {
    id: 'v_et_25',
    title: 'คอร์สติวสอบการไฟฟ้าฝ่ายผลิต Ep25: Digital Literacy',
    channel: 'Engineer Tutor',
    category: 'digital',
    categoryLabel: '💻 ทักษะดิจิทัล',
    accentColor: '#34d399',
    duration: '30:00',
    youtubeId: 'BEfadcPOngA',
    desc: 'สรุปความรู้ทักษะดิจิทัล ความมั่นคงปลอดภัยไซเบอร์ และเทคโนโลยีสารสนเทศ',
    relatedTopics: ['dig_hardware', 'dig_security', 'dig_internet']
  },
  {
    id: 'v_ik_1',
    title: 'I know MATH ep.1 - เซต (Part 1 : พื้นฐานของเซต)',
    channel: 'I know PHYSICs a little',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '11:17',
    youtubeId: 'Ia5LO-HtbyI',
    desc: 'ปูพื้นฐานเรื่องเซต นิยามของเซต การเขียนเซตแบบแจกแจงสมาชิกและแบบบอกเงื่อนไข',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_ik_2',
    title: 'I know MATH ep.1 - เซต (Part 2 : Subset & Power set)',
    channel: 'I know PHYSICs a little',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '18:59',
    youtubeId: 'XWW-AbP7Oyc',
    desc: 'สรุปสับเซต (Subset) และเพาเวอร์เซต (Power set) พร้อมสูตรหาจำนวนสมาชิก',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_ik_3',
    title: 'I know MATH ep.1 - เซต (Part 3 : แผนภาพ เวนน์ - ออยเลอร์)',
    channel: 'I know PHYSICs a little',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '27:59',
    youtubeId: 'e-BQf5kbBKQ',
    desc: 'การใช้งานแผนภาพเวนน์-ออยเลอร์ แก้โจทย์เรื่องเซต Union, Intersection, Complement',
    relatedTopics: ['logic_venn']
  },
  {
    id: 'v_pb_1',
    title: 'แผนภาพเวนน์-ออยเลอร์ | คณิต ม.4',
    channel: 'พ่อบ้านติวคณิต',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '20:00',
    youtubeId: 'XSlG1-Ri_og',
    desc: 'สอนแผนภาพเวนน์-ออยเลอร์ในการทำโจทย์ตรรกศาสตร์และเซต',
    relatedTopics: ['logic_venn']
  },
  {
    id: 'v_gb_19',
    title: 'ภาษาไทย ภาค ก. - คำที่ไม่เข้าพวก และคำที่เขียนผิด',
    channel: 'พี่น็อต GoodBrain',
    category: 'verbal',
    categoryLabel: '💬 ความสามารถด้านภาษา',
    accentColor: '#a78bfa',
    duration: '20:00',
    youtubeId: 'SaM9N0MhM1g',
    desc: 'ติวภาษาไทยเรื่องการหาคำที่ไม่เข้าพวกตามหมวดหมู่ความหมาย และข้อสังเกตคำที่เขียนถูก/ผิด',
    relatedTopics: ['verbal_classify', 'verbal_spell']
  },
  {
    id: 'v_gb_20',
    title: 'ภาษาไทย ภาค ก. - คำตรงข้าม และคำพ้องความหมาย',
    channel: 'พี่น็อต GoodBrain',
    category: 'verbal',
    categoryLabel: '💬 ความสามารถด้านภาษา',
    accentColor: '#a78bfa',
    duration: '20:00',
    youtubeId: 'XP2VWOSGRfk',
    desc: 'ติวคำตรงข้าม (Antonym) และคำพ้องความหมาย (Synonym) ที่มักนำมาออกข้อสอบภาค ก.',
    relatedTopics: ['verbal_antonym']
  },
  {
    id: 'v_gb_21',
    title: 'ติวภาษาไทย "การใช้คำให้ถูกต้อง" EP 1/5',
    channel: 'พี่น็อต GoodBrain',
    category: 'verbal',
    categoryLabel: '💬 ความสามารถด้านภาษา',
    accentColor: '#a78bfa',
    duration: '25:00',
    youtubeId: 'cKjp7lVHV7Y',
    desc: 'ติวการใช้คำให้ถูกต้องตามหลักภาษาไทย คำราชาศัพท์ และโครงสร้างประโยค',
    relatedTopics: ['verbal_reading', 'verbal_middle']
  },
  {
    id: 'v_ct_1',
    title: 'เทคนิคหา ห.ร.ม. และ ค.ร.น.',
    channel: 'CHULATUTOR',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '15:37',
    youtubeId: 'j2hFg_KliUY',
    desc: 'เทคนิคการหา ห.ร.ม. (หารร่วมมาก) และ ค.ร.น. (คูณร่วมน้อย) พร้อมตัวอย่างโจทย์ประยุกต์',
    relatedTopics: ['math_gcf']
  },
  {
    id: 'v_sm_3',
    title: 'การแยกตัวประกอบพหุนาม - คณิตวันละนิด EP.4',
    channel: 'พี่ปั้น SmartMathPro',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '23:21',
    youtubeId: 'iTPMAJBP33w',
    desc: 'ปูพื้นฐานการแยกตัวประกอบพหุนามและสูตรผลต่างกำลังสอง',
    relatedTopics: ['math_equation']
  },
  {
    id: 'v_ct_2',
    title: 'บวก ลบ คูณ หารระคน เศษส่วน',
    channel: 'CHULATUTOR',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '18:14',
    youtubeId: 'ZdTvO7WISr0',
    desc: 'การบวก ลบ คูณ หารระคนของเศษส่วน พร้อมโจทย์ตัวอย่างฝึกทำ',
    relatedTopics: ['math_pct', 'math_equation']
  },
  {
    id: 'v_sm_4',
    title: 'พื้นที่ผิวและปริมาตร ม.3 (พีระมิด กรวย และทรงกลม)',
    channel: 'พี่ปั้น SmartMathPro',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '38:00',
    youtubeId: 'q-hWoIjgmqA',
    desc: 'สรุปหลักการและสูตรคำนวณพื้นที่ผิวและปริมาตรของพีระมิด กรวย และทรงกลม',
    relatedTopics: ['math_geo']
  },
  {
    id: 'v_pt_1',
    title: 'ทบทวนเรขาคณิต EP1: จุด เส้น มุม สามเหลี่ยม',
    channel: 'คณิตพี่ถา',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '1:23:59',
    youtubeId: 'xuNnzgouE1E',
    desc: 'ทบทวนพื้นฐานเรขาคณิตเรื่อง จุด เส้น มุม และสามเหลี่ยม',
    relatedTopics: ['math_geo']
  },
  {
    id: 'v_pt_2',
    title: 'ทบทวนเรขาคณิต EP2: สี่เหลี่ยม หลายเหลี่ยม เส้นขนาน',
    channel: 'คณิตพี่ถา',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '1:20:00',
    youtubeId: '4wZk0a69Rr4',
    desc: 'สอนสมบัติรูปสี่เหลี่ยมชนิดต่างๆ รูปหลายเหลี่ยม และผลรวมมุมภายใน',
    relatedTopics: ['math_geo']
  },
  {
    id: 'v_pt_3',
    title: 'ทบทวนเรขาคณิต EP3: เส้นขนานจัดเต็ม',
    channel: 'คณิตพี่ถา',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '1:35:54',
    youtubeId: 'q02pGSBfc-Y',
    desc: 'สอนเจาะลึกเรื่องเส้นขนาน สมบัติมุมแย้ง มุมภายใน และตะลุยโจทย์ประยุกต์',
    relatedTopics: ['math_geo']
  },
  {
    id: 'v_pt_4',
    title: 'ทบทวนเรขาคณิต EP5: คำนวณพื้นที่ซับซ้อน',
    channel: 'คณิตพี่ถา',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '1:46:16',
    youtubeId: 'QxW9JAw_mzE',
    desc: 'เทคนิคคำนวณหาพื้นที่รูปทรงซับซ้อน การหาพื้นที่ส่วนที่แรเงา',
    relatedTopics: ['math_geo']
  },
  {
    id: 'v_pt_5',
    title: 'ทบทวนเรขาคณิต EP6: คำนวณพื้นที่และปริมาตรอย่างง่าย',
    channel: 'คณิตพี่ถา',
    category: 'math',
    categoryLabel: '🔢 คณิตศาสตร์',
    accentColor: '#3b82f6',
    duration: '1:46:16',
    youtubeId: 'DyMSYyghruY',
    desc: 'สรุปการคำนวณพื้นที่เรขาคณิตขั้นสูง และปูพื้นฐานปริมาตรทรง 3 มิติ',
    relatedTopics: ['math_geo']
  }
];

let currentVideoCategory = 'all';
let currentVideoChannel = 'all';
let activeModalVideoId = null;
let videoGridExpanded  = false;

const VIDEO_INITIAL_COUNT = 6; // 2 แถว × ~3 คอล

// ======================================================
// DATA: ไฟล์แนวข้อสอบ PDF กฟผ.
// ======================================================
const EXAM_PDFS = [
  {
    id: 'pdf_egat_65',
    title: 'แนวข้อสอบเก่า กฟผ. (ระดับปริญญาตรี) ปี 2565',
    year: 'ปี 2565',
    file: 'exams/egat_exam_2565.pdf',
    size: '12.1 MB',
    pages: 'ฉบับเต็มชุด',
    desc: 'ข้อสอบจริง กฟผ. ปริญญาตรี ปี 65 ครอบคลุม Aptitude Test ทุกส่วนพร้อมเฉลยและวิธีทำ',
    badge: '🎓 ข้อสอบเก่า ปี 65',
    accentColor: '#3b82f6'
  },
  {
    id: 'pdf_egat_68',
    title: 'แนวข้อสอบเก่า กฟผ. (ระดับปริญญาตรี) ปี 2568',
    year: 'ปี 2568',
    file: 'exams/egat_exam_2568.pdf',
    size: '8.5 MB',
    pages: 'ฉบับเต็มชุด',
    desc: 'ข้อสอบจริง กฟผ. ปริญญาตรี ปี 68 แนวใหม่ ล่าสุด ครบทั้ง Math, Verbal, Logic และ Spatial',
    badge: '🎓 ข้อสอบเก่า ปี 68',
    accentColor: '#a78bfa'
  },
  {
    id: 'pdf_egat_69_1',
    title: 'แนวข้อสอบเก่า กฟผ. (ระดับปริญญาตรี) ปี 2569 — ชุดที่ 1',
    year: 'ปี 2569 #1',
    file: 'exams/egat_exam_2569_1.pdf',
    size: '14.1 MB',
    pages: 'ชุดที่ 1',
    desc: 'แนวข้อสอบเข้มข้น กฟผ. ปริญญาตรี ปี 69 ชุดที่ 1 ฉบับปรับปรุงใหม่ล่าสุด',
    badge: '🔥 ข้อสอบล่าสุด ปี 69 #1',
    accentColor: '#ef4444'
  },
  {
    id: 'pdf_egat_69_2',
    title: 'แนวข้อสอบเก่า กฟผ. (ระดับปริญญาตรี) ปี 2569 — ชุดที่ 2',
    year: 'ปี 2569 #2',
    file: 'exams/egat_exam_2569_2.pdf',
    size: '7.9 MB',
    pages: 'ชุดที่ 2',
    desc: 'แนวข้อสอบเข้มข้น กฟผ. ปริญญาตรี ปี 69 ชุดที่ 2 เพิ่มเติมโจทย์วิเคราะห์',
    badge: '🔥 ข้อสอบล่าสุด ปี 69 #2',
    accentColor: '#f59e0b'
  }
];

function buildVideoGrid() {
  const container = document.getElementById('videoGrid');
  if (!container) return;

  // --- กรณีเลือกหมวดข้อสอบเก่า/ติวรวม (mock) -> แสดง PDF Exam Cards ---
  if (currentVideoCategory === 'mock') {
    container.innerHTML = EXAM_PDFS.map(pdf => `
      <div class="pdf-exam-card">
        <div class="pec-thumb">
          <div class="pec-icon">📄</div>
          <span class="pec-badge" style="color:${pdf.accentColor};border-color:${pdf.accentColor}44;background:${pdf.accentColor}11;">${pdf.badge}</span>
        </div>
        <div class="pec-body">
          <h4 class="pec-title">${pdf.title}</h4>
          <p class="pec-desc">${pdf.desc}</p>
          <div class="pec-meta">
            <span>📦 ${pdf.size}</span>
            <span>📑 ${pdf.pages}</span>
          </div>
          <button class="btn-open-pdf-modal" data-pdfid="${pdf.id}" type="button">
            📖 เปิดดูแนวข้อสอบ (PDF Popup)
          </button>
        </div>
      </div>
    `).join('');
    return;
  }

  const filtered = LESSON_VIDEOS.filter(v => {
    const matchCat  = (currentVideoCategory === 'all' || v.category === currentVideoCategory);
    const matchChan = (currentVideoChannel  === 'all' || v.channel  === currentVideoChannel);
    return matchCat && matchChan;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:56px 20px;color:var(--text-secondary);background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-lg);">
        <div style="font-size:2.5rem;margin-bottom:12px;">🎬</div>
        <h3 style="font-size:1.1rem;color:var(--text-primary);margin-bottom:6px;">ยังไม่มีวิดีโอในระบบ</h3>
        <p style="font-size:0.88rem;color:var(--text-muted);">ส่งลิงก์วิดีโอ YouTube ที่คุณต้องการให้ผม เพื่อเพิ่มเข้าสู่คลังวิดีโอได้เลยครับ</p>
      </div>`;
    return;
  }

  const hasMore   = filtered.length > VIDEO_INITIAL_COUNT;
  const hiddenCnt = filtered.length - VIDEO_INITIAL_COUNT;

  // --- Render การ์ดทุกตัวครั้งเดียว แล้วใช้ CSS class ควบคุมว่าจะโชว์ไหม ---
  container.innerHTML = filtered.map((v, idx) => {
    const isWatched  = !!watchedVideos[v.id];
    const thumbUrl   = `https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`;
    const isExtra    = hasMore && idx >= VIDEO_INITIAL_COUNT;

    return `
      <div class="video-card ${isWatched ? 'watched' : ''} ${isExtra ? 'vc-extra vc-hidden' : ''}" data-vid="${v.id}">
        <div class="vc-thumb-wrap">
          <img src="${thumbUrl}" alt="${v.title}" class="vc-thumb-img" loading="lazy" />
          <span class="vc-duration">${v.duration}</span>
          <div class="vc-play-overlay"><div class="vc-play-btn">▶</div></div>
        </div>
        <div class="vc-body">
          <div class="vc-meta">
            <span class="vc-badge" style="color:${v.accentColor};border-color:${v.accentColor}44;background:${v.accentColor}11;">${v.categoryLabel}</span>
            <span class="vc-channel">📺 ${v.channel}</span>
          </div>
          <h4 class="vc-title">${v.title}</h4>
          <div class="vc-footer">
            <button class="btn-toggle-watched" data-vid="${v.id}" type="button">
              ${isWatched ? '✓ เรียนแล้ว' : '+ มาร์กเรียนแล้ว'}
            </button>
            <span style="font-size:0.78rem;color:${isWatched ? 'var(--green)' : 'var(--text-muted)'};">
              ${isWatched ? 'เรียนแล้ว ✅' : 'ยังไม่ได้เรียน'}
            </span>
          </div>
        </div>
      </div>`;
  }).join('');

  // --- ปุ่ม Show More ---
  if (hasMore) {
    const btnWrap = document.createElement('div');
    btnWrap.id = 'vcToggleWrap';
    btnWrap.style.cssText = 'grid-column:1/-1;display:flex;justify-content:center;margin-top:8px;';
    btnWrap.innerHTML = `
      <button class="btn-show-more-videos" id="toggleVideoBtn">
        <span class="bsm-icon">🎬</span>
        <span class="bsm-label">แสดงวิดีโอเพิ่มเติม (${hiddenCnt} รายการ)</span>
        <span class="bsm-chevron">▼</span>
      </button>`;
    container.appendChild(btnWrap);
  }

  // --- Apply expand state ที่บันทึกไว้ก่อนหน้า (เช่น หลัง filter เปลี่ยน) ---
  _applyVideoExpandState(false); // false = ไม่ animate ครั้งแรก

  // --- Events: ปุ่ม show more ---
  const toggleBtn = document.getElementById('toggleVideoBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      videoGridExpanded = !videoGridExpanded;
      _applyVideoExpandState(true); // true = ใช้ animation
    });
  }

  // --- Events: การ์ดวิดีโอ ---
  container.querySelectorAll('.video-card').forEach(card => {
    const vid = card.dataset.vid;
    card.addEventListener('click', e => {
      if (e.target.closest('.btn-toggle-watched')) { e.stopPropagation(); toggleVideoWatched(vid); return; }
      openVideoModal(vid);
    });
  });
}

// ควบคุมการ show/hide การ์ด extra พร้อม animation
function _applyVideoExpandState(animate) {
  const container = document.getElementById('videoGrid');
  if (!container) return;

  const extras  = container.querySelectorAll('.vc-extra');
  const btn     = document.getElementById('toggleVideoBtn');
  const chevron = btn ? btn.querySelector('.bsm-chevron') : null;
  const label   = btn ? btn.querySelector('.bsm-label')   : null;
  const icon    = btn ? btn.querySelector('.bsm-icon')    : null;
  const hiddenCnt = extras.length;

  if (videoGridExpanded) {
    // ขยาย: แสดงการ์ดทีละตัว stagger
    extras.forEach((card, i) => {
      card.classList.remove('vc-hidden');
      if (animate) {
        card.style.animationDelay = `${i * 55}ms`;
        card.classList.add('vc-reveal');
        card.addEventListener('animationend', () => card.classList.remove('vc-reveal'), { once: true });
      }
    });
    if (btn) {
      btn.classList.add('expanded');
      if (chevron) chevron.textContent = '▲';
      if (label)   label.textContent   = 'ย่อวิดีโอกลับ';
      if (icon)    icon.textContent    = '';
    }
  } else {
    // ย่อ: ซ่อนการ์ดพร้อม fade-out
    extras.forEach((card, i) => {
      if (animate) {
        card.classList.add('vc-collapse');
        card.style.animationDelay = `${(hiddenCnt - 1 - i) * 35}ms`;
        card.addEventListener('animationend', () => {
          card.classList.remove('vc-collapse');
          card.classList.add('vc-hidden');
        }, { once: true });
      } else {
        card.classList.add('vc-hidden');
      }
    });
    if (btn) {
      btn.classList.remove('expanded');
      if (chevron) chevron.textContent = '▼';
      if (label)   label.textContent   = `แสดงวิดีโอเพิ่มเติม (${hiddenCnt} รายการ)`;
      if (icon)    icon.textContent    = '🎬';
    }
  }
}

// ======================================================
// 2-WAY AUTO SYNC BETWEEN VIDEOS & PROGRESS TOPICS
// ======================================================
function getVideosForTopic(tid) {
  return LESSON_VIDEOS.filter(v => v.relatedTopics && v.relatedTopics.includes(tid));
}

// 1. Video -> Topic Sync: อัปเดตสถานะหัวข้อตามจำนวนวิดีโอที่เรียน
function syncTopicFromVideos(tid) {
  const vids = getVideosForTopic(tid);
  if (vids.length === 0) return { newStatus: topicStatus[tid] || 'pending', watchedCount: 0, totalVids: 0 };

  const watchedCount = vids.filter(v => !!watchedVideos[v.id]).length;
  let newStatus = 'pending';

  if (watchedCount === vids.length) {
    newStatus = 'done'; // เรียนครบทุกวิดีโอในหัวข้อนี้แล้ว -> สีเขียว (เสร็จแล้ว)
  } else if (watchedCount > 0) {
    newStatus = 'in-progress'; // เรียนไปบางวิดีโอ -> กำลังเรียน (ปลดสีเขียวออก)
  } else {
    newStatus = 'pending'; // ยังไม่ได้เรียนเลย -> รีเซ็ต (ปลดสีเขียวออก)
  }

  topicStatus[tid] = newStatus;
  return { newStatus, watchedCount, totalVids: vids.length };
}

// 2. Topic -> Video Sync: หากผู้ใช้กดอัปเดตหัวข้อเอง -> มาร์กวิดีโอเกี่ยวข้องทั้งหมดอัตโนมัติ
function syncVideosFromTopic(tid, newTopicStatus) {
  const vids = getVideosForTopic(tid);
  if (vids.length === 0) return;

  if (newTopicStatus === 'done') {
    // User กดเสร็จแล้วเอง -> ถือว่าศึกษาจากที่อื่น มาร์กวิดีโอทุกตัวในหัวข้อนี้เป็นเรียนแล้ว
    vids.forEach(v => { watchedVideos[v.id] = true; });
  } else if (newTopicStatus === 'pending') {
    // User ปลดเป็นยังไม่ได้ทำ -> ปลดมาร์กวิดีโอทุกตัวในหัวข้อนี้
    vids.forEach(v => { watchedVideos[v.id] = false; });
  }

  saveAll(LS_KEY_WATCHED_VIDEOS, watchedVideos);
  buildVideoGrid();
}

function toggleVideoWatched(vid) {
  watchedVideos[vid] = !watchedVideos[vid];
  saveAll(LS_KEY_WATCHED_VIDEOS, watchedVideos);

  const video = LESSON_VIDEOS.find(v => v.id === vid);
  let toastMsg = watchedVideos[vid] ? '✅ มาร์กเรียนวิดีโอนี้แล้ว!' : '⬜ ยกเลิกสถานะการเรียนแล้ว';

  if (video && video.relatedTopics && video.relatedTopics.length > 0) {
    video.relatedTopics.forEach(tid => {
      const res = syncTopicFromVideos(tid);

      let topicLabel = tid;
      for (const s of SUBJECTS) {
        const top = s.topics.find(t => t.id === tid);
        if (top) { topicLabel = top.label; break; }
      }

      if (res.newStatus === 'done') {
        toastMsg = `🎉 เรียนครบทุกวิดีโอในหัวข้อแล้ว (${res.watchedCount}/${res.totalVids})! อัปเดต "${topicLabel}" เป็นเสร็จแล้ว (สีเขียว) อัตโนมัติ!`;
      } else if (res.newStatus === 'in-progress') {
        toastMsg = watchedVideos[vid]
          ? `📖 เรียนแล้ว (${res.watchedCount}/${res.totalVids} คลิป) — หัวข้อ "${topicLabel}" สถานะกำลังเรียน`
          : `⬜ ยกเลิกคลิป — หัวข้อ "${topicLabel}" ปลดสีเขียวออก (เหลือ ${res.watchedCount}/${res.totalVids} คลิป)`;
      } else if (res.newStatus === 'pending') {
        toastMsg = `⏳ ยกเลิกทุกคลิป — ปลดสีเขียวจากหัวข้อ "${topicLabel}" อัตโนมัติ`;
      }
    });

    saveAll(LS_KEY_TOPICS, topicStatus);
    buildSubjectGrid();
    buildProgressList();
    updateOverall();
  }

  buildVideoGrid();
  updateVideoModalWatchedBtn(vid);
  showToast(toastMsg, 3400);
}

function openVideoModal(vid) {
  const video = LESSON_VIDEOS.find(v => v.id === vid);
  if (!video) return;

  activeModalVideoId = vid;
  const overlay = document.getElementById('videoModalOverlay');
  const iframe = document.getElementById('videoModalIframe');
  const title = document.getElementById('videoModalTitle');
  const channel = document.getElementById('videoModalChannel');
  const cat = document.getElementById('videoModalCategory');
  const extLink = document.getElementById('videoModalExternalLink');
  const footerLink = document.getElementById('videoModalFooterLink');

  title.textContent = video.title;
  channel.textContent = `📺 ช่อง: ${video.channel}`;
  cat.textContent = video.categoryLabel;
  cat.style.color = video.accentColor;
  cat.style.borderColor = video.accentColor + '44';
  cat.style.background = video.accentColor + '11';

  const currentOrigin = window.location.protocol.startsWith('http')
    ? window.location.origin
    : 'https://www.youtube.com';

  const ytWatchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;
  if (extLink) extLink.href = ytWatchUrl;
  if (footerLink) footerLink.href = ytWatchUrl;

  iframe.src = `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(currentOrigin)}`;

  updateVideoModalWatchedBtn(vid);

  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
  const overlay = document.getElementById('videoModalOverlay');
  const iframe = document.getElementById('videoModalIframe');
  if (iframe) iframe.src = '';
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
  activeModalVideoId = null;
}

// ======================================================
// PDF EXAM VIEWER MODAL
// ======================================================
function openPdfModal(pdfId) {
  const pdf = EXAM_PDFS.find(p => p.id === pdfId);
  if (!pdf) return;

  const overlay    = document.getElementById('pdfModalOverlay');
  const title      = document.getElementById('pdfModalTitle');
  const badge      = document.getElementById('pdfModalBadge');
  const size       = document.getElementById('pdfModalSize');
  const dlBtn      = document.getElementById('pdfModalDownload');
  const extBtn     = document.getElementById('pdfModalExternal');
  const fExtBtn    = document.getElementById('pdfModalFooterExternal');
  const fDlBtn     = document.getElementById('pdfModalFooterDownload');
  const wrapper    = document.querySelector('.pdf-viewer-wrapper');

  if (title) title.textContent = pdf.title;
  if (badge) {
    badge.textContent = pdf.badge;
    badge.style.color = pdf.accentColor;
    badge.style.borderColor = pdf.accentColor + '44';
    badge.style.background = pdf.accentColor + '11';
  }
  if (size) size.textContent = `📦 ${pdf.size} · ${pdf.pages}`;
  if (dlBtn) dlBtn.href = pdf.file;
  if (extBtn) extBtn.href = pdf.file;
  if (fExtBtn) fExtBtn.href = pdf.file;
  if (fDlBtn) fDlBtn.href = pdf.file;

  if (wrapper) {
    const pdfUrl = `${pdf.file}#toolbar=1&navpanes=1&scrollbar=1&view=FitH`;
    wrapper.innerHTML = `
      <object data="${pdfUrl}" type="application/pdf" width="100%" height="100%">
        <embed src="${pdfUrl}" type="application/pdf" width="100%" height="100%" />
        <iframe id="pdfViewerIframe" src="${pdfUrl}" width="100%" height="100%" frameborder="0" style="border:none;width:100%;height:100%;min-height:500px;"></iframe>
      </object>
    `;
  }

  if (overlay) overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closePdfModal() {
  const overlay = document.getElementById('pdfModalOverlay');
  const wrapper = document.querySelector('.pdf-viewer-wrapper');
  if (wrapper) wrapper.innerHTML = '';
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function updateVideoModalWatchedBtn(vid) {
  const btn = document.getElementById('videoModalWatchedBtn');
  if (!btn) return;
  const isWatched = !!watchedVideos[vid];
  btn.textContent = isWatched ? '✓ เรียนแล้ว (กดเพื่อยกเลิก)' : '✓ Mark เรียนจบแล้ว';
  btn.style.background = isWatched ? 'var(--green)' : 'var(--grad-main)';
}

function initVideoSection() {
  buildVideoGrid();

  const tabsContainer = document.getElementById('videoCategoryTabs');
  if (tabsContainer) {
    tabsContainer.addEventListener('click', (e) => {
      const tab = e.target.closest('.video-tab');
      if (!tab) return;
      currentVideoCategory = tab.dataset.cat;
      tabsContainer.querySelectorAll('.video-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      buildVideoGrid();
    });
  }

  // --- Global click listener for PDF exam cards & Modals ---
  document.addEventListener('click', (e) => {
    const pdfBtn = e.target.closest('[data-pdfid]');
    if (pdfBtn) {
      openPdfModal(pdfBtn.dataset.pdfid);
    }
  });

  const pdfCloseBtn = document.getElementById('pdfModalCloseBtn');
  if (pdfCloseBtn) pdfCloseBtn.addEventListener('click', closePdfModal);

  const pdfOverlay = document.getElementById('pdfModalOverlay');
  if (pdfOverlay) {
    pdfOverlay.addEventListener('click', (e) => {
      if (e.target === pdfOverlay) closePdfModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closePdfModal();
    }
  });



  const closeBtn = document.getElementById('videoModalClose');
  if (closeBtn) closeBtn.addEventListener('click', closeVideoModal);

  const overlay = document.getElementById('videoModalOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeVideoModal();
    });
  }

  const watchedBtn = document.getElementById('videoModalWatchedBtn');
  if (watchedBtn) {
    watchedBtn.addEventListener('click', () => {
      if (activeModalVideoId) {
        toggleVideoWatched(activeModalVideoId);
      }
    });
  }
}

// ======================================================
// CUSTOM macOS STYLE DATEPICKER
// ======================================================
const THAI_MONTHS = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

let macCalActiveInput = null;
let macCalViewDate = new Date();

function createMacCalendarPopover() {
  if (document.getElementById('macCalendarPopover')) return;

  const popover = document.createElement('div');
  popover.className = 'mac-calendar-popover';
  popover.id = 'macCalendarPopover';
  popover.style.display = 'none';

  popover.innerHTML = `
    <div class="mac-cal-header">
      <span class="mac-cal-month-year" id="macCalMonthYear"></span>
      <div class="mac-cal-nav">
        <button type="button" class="mac-cal-nav-btn" id="macCalPrev" title="เดือนก่อนหน้า">‹</button>
        <button type="button" class="mac-cal-nav-btn" id="macCalToday" title="วันนี้">วันนี้</button>
        <button type="button" class="mac-cal-nav-btn" id="macCalNext" title="เดือนถัดไป">›</button>
      </div>
    </div>
    <div class="mac-cal-weekdays">
      <span>อา</span><span>จ</span><span>อ</span><span>พ</span><span>พฤ</span><span>ศ</span><span>ส</span>
    </div>
    <div class="mac-cal-days" id="macCalDays"></div>
  `;

  document.body.appendChild(popover);

  document.getElementById('macCalPrev').addEventListener('click', (e) => {
    e.stopPropagation();
    macCalViewDate.setMonth(macCalViewDate.getMonth() - 1);
    renderMacCalendar();
  });

  document.getElementById('macCalNext').addEventListener('click', (e) => {
    e.stopPropagation();
    macCalViewDate.setMonth(macCalViewDate.getMonth() + 1);
    renderMacCalendar();
  });

  document.getElementById('macCalToday').addEventListener('click', (e) => {
    e.stopPropagation();
    const today = new Date();
    macCalViewDate = new Date(today.getFullYear(), today.getMonth(), 1);
    selectMacCalDate(today.getFullYear(), today.getMonth(), today.getDate());
  });

  document.addEventListener('click', (e) => {
    if (!popover.contains(e.target) && (!macCalActiveInput || !macCalActiveInput.contains(e.target))) {
      closeMacCalendar();
    }
  });

  window.addEventListener('resize', closeMacCalendar);
  window.addEventListener('scroll', closeMacCalendar, { passive: true });
}

function renderMacCalendar() {
  const monthYearEl = document.getElementById('macCalMonthYear');
  const daysEl = document.getElementById('macCalDays');
  if (!monthYearEl || !daysEl) return;

  const year = macCalViewDate.getFullYear();
  const month = macCalViewDate.getMonth();

  const thaiYear = year + 543;
  monthYearEl.textContent = `${THAI_MONTHS[month]} ${thaiYear}`;

  daysEl.innerHTML = '';

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const today = new Date();
  let selectedY = null, selectedM = null, selectedD = null;

  if (macCalActiveInput && macCalActiveInput.value) {
    const parts = macCalActiveInput.value.split('-');
    if (parts.length === 3) {
      selectedY = parseInt(parts[0]);
      selectedM = parseInt(parts[1]) - 1;
      selectedD = parseInt(parts[2]);
    }
  }

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dayBtn = document.createElement('div');
    dayBtn.className = 'mac-cal-day other-month';
    dayBtn.textContent = prevMonthTotalDays - i;
    daysEl.appendChild(dayBtn);
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    const dayBtn = document.createElement('div');
    dayBtn.className = 'mac-cal-day';
    dayBtn.textContent = d;

    const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
    if (isToday) dayBtn.classList.add('today');

    const isSelected = (selectedY === year && selectedM === month && selectedD === d);
    if (isSelected) dayBtn.classList.add('selected');

    dayBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      selectMacCalDate(year, month, d);
    });

    daysEl.appendChild(dayBtn);
  }

  // Next month leading days
  const totalCells = firstDayIndex + totalDays;
  const remainingCells = (totalCells > 35 ? 42 : 35) - totalCells;
  for (let i = 1; i <= remainingCells; i++) {
    const dayBtn = document.createElement('div');
    dayBtn.className = 'mac-cal-day other-month';
    dayBtn.textContent = i;
    daysEl.appendChild(dayBtn);
  }
}

function selectMacCalDate(year, month, day) {
  if (!macCalActiveInput) return;

  const yyyy = year;
  const mm = String(month + 1).padStart(2, '0');
  const dd = String(day).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  macCalActiveInput.value = dateStr;
  macCalActiveInput.dispatchEvent(new Event('input', { bubbles: true }));
  macCalActiveInput.dispatchEvent(new Event('change', { bubbles: true }));

  closeMacCalendar();
}

function openMacCalendar(inputEl) {
  createMacCalendarPopover();
  macCalActiveInput = inputEl;

  if (inputEl.value) {
    const parts = inputEl.value.split('-');
    if (parts.length === 3) {
      macCalViewDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
    } else {
      macCalViewDate = new Date();
    }
  } else {
    macCalViewDate = new Date();
  }

  renderMacCalendar();

  const popover = document.getElementById('macCalendarPopover');
  popover.style.display = 'block';

  const rect = inputEl.getBoundingClientRect();
  const popWidth = 320;
  let left = rect.left + window.scrollX;
  let top = rect.bottom + window.scrollY + 8;

  if (left + popWidth > window.innerWidth - 16) {
    left = window.innerWidth - popWidth - 16;
  }
  if (left < 16) left = 16;

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function closeMacCalendar() {
  const popover = document.getElementById('macCalendarPopover');
  if (popover) {
    popover.style.display = 'none';
  }
  macCalActiveInput = null;
}

function initMacOSDatePicker() {
  const inputs = document.querySelectorAll('input[type="date"]');
  inputs.forEach(inputEl => {
    inputEl.addEventListener('click', (e) => {
      e.preventDefault();
      openMacCalendar(inputEl);
    });
    inputEl.addEventListener('focus', (e) => {
      e.preventDefault();
      openMacCalendar(inputEl);
    });
  });
}


document.addEventListener('DOMContentLoaded', init);
