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
    badgeName: 'MATH EXAMS',
    title: 'คณิตศาสตร์ (Numerical Ability)',
    icon: '🔢',
    score: '~30 คะแนน',
    accentColor: '#3b82f6',
    accentBg: 'rgba(59,130,246,0.12)',
    barColor: '#3b82f6',
    weight: 30,
    topics: [
      { id: 'math_series',   label: 'อนุกรมและลำดับ' },
      { id: 'math_pct',      label: 'ร้อยละ อัตราส่วน กำไร' },
      { id: 'math_work',     label: 'งาน-เวลา และความเร็ว' },
      { id: 'math_stat',     label: 'สถิติและค่าเฉลี่ย' },
      { id: 'math_equation', label: 'สมการและพีชคณิต' },
      { id: 'math_gcf',      label: 'ห.ร.ม. และ ค.ร.น.' },
      { id: 'math_clock',    label: 'นาฬิกาและปฏิทิน' },
      { id: 'math_geo',      label: 'เรขาคณิตและพื้นที่' },
      { id: 'math_data',     label: 'วิเคราะห์ตารางกราฟ' },
    ]
  },
  {
    id: 'verbal',
    badgeName: 'VERBAL EXAMS',
    title: 'ความสามารถด้านภาษา (Verbal Ability)',
    icon: '💬',
    score: '~20 คะแนน',
    accentColor: '#a78bfa',
    accentBg: 'rgba(167,139,250,0.12)',
    barColor: '#a78bfa',
    weight: 20,
    topics: [
      { id: 'verbal_analogy',  label: 'อุปมาอุปไมย' },
      { id: 'verbal_classify', label: 'การจัดหมวดหมู่คำ' },
      { id: 'verbal_antonym',  label: 'คำพ้องและคำตรงข้าม' },
      { id: 'verbal_reading',  label: 'การอ่านจับใจความ' },
      { id: 'verbal_middle',   label: 'ความสัมพันธ์ของคำ' },
      { id: 'verbal_spell',    label: 'การสะกดคำถูกผิด' },
    ]
  },
  {
    id: 'logic',
    badgeName: 'LOGIC EXAMS',
    title: 'ตรรกะและการวิเคราะห์ (Logical Reasoning)',
    icon: '🧠',
    score: '~20 คะแนน',
    accentColor: '#22d3ee',
    accentBg: 'rgba(34,211,238,0.10)',
    barColor: '#22d3ee',
    weight: 20,
    topics: [
      { id: 'logic_prop',    label: 'ประพจน์และตัวเชื่อม' },
      { id: 'logic_deduce',  label: 'การสรุปความสมเหตุสมผล' },
      { id: 'logic_sym',     label: 'เงื่อนไขสัญลักษณ์' },
      { id: 'logic_pattern', label: 'แบบรูปและลำดับตรรกะ' },
      { id: 'logic_venn',    label: 'แผนภาพเวนน์ (Venn)' },
      { id: 'logic_decide',  label: 'การตัดสินใจเชิงตรรกะ' },
    ]
  },
  {
    id: 'spatial',
    badgeName: 'SPATIAL EXAMS',
    title: 'มิติสัมพันธ์ (Spatial Ability)',
    icon: '🎲',
    score: '~10 คะแนน',
    accentColor: '#fb923c',
    accentBg: 'rgba(251,146,60,0.10)',
    barColor: '#fb923c',
    weight: 10,
    topics: [
      { id: 'spatial_unfold', label: 'คลี่และพับกล่อง 3D' },
      { id: 'spatial_rotate', label: 'การหมุนภาพ 2D/3D' },
      { id: 'spatial_mirror', label: 'ภาพเงาสะท้อนกระจก' },
      { id: 'spatial_count',  label: 'การคำนวณลูกบาศก์' },
      { id: 'spatial_embed',  label: 'การหารูปที่ซ่อนอยู่' },
    ]
  },
  {
    id: 'digital',
    badgeName: 'DIGITAL EXAMS',
    title: 'ทักษะดิจิทัล (Digital Literacy)',
    icon: '💻',
    score: '~20 คะแนน',
    accentColor: '#34d399',
    accentBg: 'rgba(52,211,153,0.10)',
    barColor: '#34d399',
    weight: 20,
    topics: [
      { id: 'dig_hardware', label: 'ระบบคอมพิวเตอร์ & OS' },
      { id: 'dig_office',   label: 'โปรแกรม MS Office' },
      { id: 'dig_internet', label: 'เครือข่าย & อินเทอร์เน็ต' },
      { id: 'dig_security', label: 'ความปลอดภัยไซเบอร์' },
      { id: 'dig_comm',     label: 'อีเมลและการสื่อสาร' },
      { id: 'dig_data',     label: 'การจัดการไฟล์ข้อมูล' },
    ]
  },
  {
    id: 'egat',
    badgeName: 'EGAT EXAMS',
    title: 'ความรู้ กฟผ. และพลังงาน (EGAT)',
    icon: '⚡',
    score: '~20 คะแนน',
    accentColor: '#eab308',
    accentBg: 'rgba(234,179,8,0.10)',
    barColor: '#eab308',
    weight: 20,
    topics: [
      { id: 'egat_speed',    label: 'ค่านิยมองค์กร SPEED' },
      { id: 'egat_power',    label: 'โรงไฟฟ้าและการผลิต' },
      { id: 'egat_grid',     label: 'สายส่งแรงสูง 500kV' },
      { id: 'egat_carbon',   label: 'Carbon Neutrality & Net Zero' },
      { id: 'egat_history',  label: 'ประวัติ กฟผ. & EleXA' },
    ]
  }
];

// ======================================================
// DATA: PHASE TEMPLATES — เนื้อหาแต่ละช่วงการเรียน
//   w = น้ำหนักวันสัมพัทธ์ภายใน phase นั้น
// ======================================================
const PHASE_TEMPLATES = {
  p1_foundation: {
    titleSuffix: ' — ปูพื้นฐาน', color: '#3b82f6',
    desc: 'สร้างความเข้าใจพื้นฐานทุกวิชา ทบทวนสูตรสำคัญ',
    groups: [
      { subject: 'คณิตศาสตร์ (พื้นฐาน)', w: 3, tasks: ['ทบทวนสูตร ร้อยละ กำไร-ขาดทุน', 'ฝึกโจทย์งานและเวลา 20 ข้อ', 'ทำข้อสอบเก่า Section Math 30 ข้อ'] },
      { subject: 'อนุกรมและลำดับ',        w: 2, tasks: ['จำรูปแบบอนุกรม 15 ประเภท', 'ฝึกทำ 40 ข้อ', 'ตรวจสอบ Pattern ที่ผิดบ่อย'] },
      { subject: 'ตรรกะ & ประพจน์',       w: 3, tasks: ['ทบทวน p→q, p∧q, p↔q', 'ฝึก Venn Diagram', 'ทำข้อสอบจริงปี 69 ส่วนตรรกะ'] },
      { subject: 'ภาษาและอุปมาอุปไมย',    w: 2, tasks: ['ฝึก Analogy 30 ข้อ/วัน', 'หาคำตรงกลาง / คำตรงข้าม', 'อ่านบทความและสรุปใจความ'] },
      { subject: 'มิติสัมพันธ์',           w: 2, tasks: ['ฝึกกางกล่อง/พับกล่อง', 'ฝึกหมุนภาพ 3 มิติ', 'นับลูกบาศก์ 20 ข้อ'] },
      { subject: 'Digital Literacy',       w: 3, tasks: ['ทบทวน Hardware/Software', 'ฝึกโจทย์ MS Office', 'ทบทวนความปลอดภัยไซเบอร์'] },
    ]
  },
  p2_deep: {
    titleSuffix: ' — เจาะลึกและฝึกข้อสอบ', color: '#a78bfa',
    desc: 'เจาะลึกหัวข้อสำคัญ ทำข้อสอบเก่ากฟผ. แต่ละวิชา',
    groups: [
      { subject: 'คณิตศาสตร์ (ขั้นสูง)',       w: 3, tasks: ['สถิติ: ค่าเฉลี่ย, มัธยฐาน, SD', 'โจทย์ส่วนเบี่ยงเบนมาตรฐาน', 'ทำข้อสอบ กฟผ. Section Math เต็มชุด'] },
      { subject: 'ตรรกะขั้นสูง',                w: 3, tasks: ['การสรุปเหตุผลและ Syllogism', 'ฝึกโจทย์สัญลักษณ์', 'ทบทวนข้อสอบจริงปี 68'] },
      { subject: 'ภาษาขั้นสูง',                 w: 3, tasks: ['อ่านบทความยาวและตอบคำถาม', 'ฝึกหาความหมายคำจากบริบท', 'ทำข้อสอบ Section Verbal เต็มชุด'] },
      { subject: 'มิติสัมพันธ์ (เต็มรูป)',       w: 2, tasks: ['ฝึก Embedded Figure 25 ข้อ', 'ภาพสะท้อนซับซ้อน', 'ทบทวนทุกประเภทมิติสัมพันธ์'] },
      { subject: 'Digital Literacy (ขั้นสูง)',   w: 4, tasks: ['ทบทวนระบบเครือข่ายเบื้องต้น', 'โจทย์ Office Excel สูตร', 'ทำ Mock Test Digital ชุดแรก'] },
    ]
  },
  p3_mock: {
    titleSuffix: ' — ทำข้อสอบเก่าเต็มชุด', color: '#22d3ee',
    desc: 'ทำข้อสอบเก่า กฟผ. เต็มชุด เก็บสถิติคะแนน',
    groups: [
      { subject: 'Mock Test ชุดที่ 1 (ปี 65)', w: 3, tasks: ['ทำข้อสอบปี 65 ครบทุกวิชา <button class="btn-pdf-task" data-pdfid="pdf_egat_65" type="button">📖 เปิดดูข้อสอบปี 65 (PDF)</button>', 'เก็บเวลา 2.30 ชั่วโมง', 'วิเคราะห์ข้อที่ผิด'] },
      { subject: 'เน้นจุดอ่อน จาก Mock 1',    w: 3, tasks: ['ทบทวนเฉพาะหัวข้อที่ผิดมากที่สุด', 'ฝึกข้อสอบเพิ่มเติมเฉพาะจุด', 'สรุปสูตรและ Pattern ที่ลืม'] },
      { subject: 'Mock Test ชุดที่ 2 (ปี 68)', w: 3, tasks: ['ทำข้อสอบปี 68 เต็มชุด <button class="btn-pdf-task" data-pdfid="pdf_egat_68" type="button">📖 เปิดดูข้อสอบปี 68 (PDF)</button>', 'เก็บเวลาเหมือนสอบจริง', 'เปรียบเทียบคะแนนกับ Mock 1'] },
      { subject: 'เน้นจุดอ่อน จาก Mock 2',    w: 3, tasks: ['เจาะวิชาที่คะแนนต่ำสุด', 'ทำโจทย์เพิ่ม 50 ข้อ/วิชา', 'ฝึกเทคนิคตัดตัวเลือก'] },
      { subject: 'Mock Test ชุดที่ 3 (ปี 69)', w: 3, tasks: ['ทำข้อสอบปี 69 ทั้ง #1 และ #2 <button class="btn-pdf-task" data-pdfid="pdf_egat_69_1" type="button">📖 เปิดปี 69 #1</button> <button class="btn-pdf-task" data-pdfid="pdf_egat_69_2" type="button">📖 เปิดปี 69 #2</button>', 'จัดเวลาให้เหมือนสอบจริงที่สุด', 'บันทึกคะแนนและวิเคราะห์'] },
    ]
  },
  p4_review: {
    titleSuffix: ' — ทบทวนและเตรียมสอบ', color: '#34d399',
    desc: 'ทบทวนสรุปทุกวิชา เน้นความเร็ว และเตรียมจิตใจ',
    groups: [
      { subject: 'ทบทวนคณิตศาสตร์รวม',  w: 3, tasks: ['ทำโจทย์ Mix 80 ข้อ ใน 45 นาที', 'ทบทวนสูตรทุกหมวด', 'เน้นจุดที่ยังผิดอยู่'] },
      { subject: 'ทบทวนตรรกะ + ภาษา',   w: 3, tasks: ['ทำโจทย์รวม Verbal+Logic 60 ข้อ', 'ฝึกให้ใช้เวลาต่อข้อลดลง', 'อ่านบทความ 1 บทความ/วัน'] },
      { subject: 'Final Mock Test',       w: 3, tasks: ['ทำ Simulation เต็มรูปแบบ', 'เก็บเวลาเหมือนสอบจริง 100%', 'วิเคราะห์และแก้ไขจุดอ่อน'] },
      { subject: 'Quick Review ทุกวิชา', w: 3, tasks: ['อ่านสรุปสูตรที่เตรียมไว้', 'ทำโจทย์เร็วๆ ข้างละ 20 ข้อ', 'ดูตัวอย่างข้อสอบที่ชอบออก'] },
      { subject: 'เตรียมพร้อมก่อนสอบ',  w: 2, tasks: ['พักผ่อนให้เพียงพอ 7-8 ชม.', 'ตรวจสอบเอกสาร (ใบ กว., TOEIC)', 'อ่านสถานที่และเวลาสอบ'] },
      { subject: '🎯 วันสอบ!',           w: 1, tasks: ['มาถึงสถานที่ก่อนเวลา 30 นาที', 'นำบัตรประจำตัวและเอกสารครบ', 'ทำใจนิ่ง · สู้ได้! 💪'] },
    ]
  }
};

// ---- State: แผนที่ generate แล้ว ----
let PHASES    = [];   // จะถูก generate ใหม่เสมอเมื่อ examDate เปลี่ยน
let totalDays = 60;  // จำนวนวันทั้งหมดตั้งแต่วันนี้ถึงวันสอบ

// ======================================================
// DYNAMIC PLAN GENERATOR
// ======================================================

/**
 * คำนวณจำนวนวันทั้งหมดนับจากวันเริ่มถึงวันสอบ (inclusive)
 * คืนค่า fallback 60 ถ้ายังไม่มีการตั้งวันสอบ
 */
function calcTotalDays() {
  if (!examDate) return 60;
  const start = getPlanStartDate();
  const parts = examDate.split('-');
  const exam  = new Date(+parts[0], +parts[1] - 1, +parts[2]);
  const diff  = Math.round((exam - start) / 86400000) + 1; // +1 รวมวันเริ่ม
  return Math.max(1, diff);
}

/**
 * แจกวันของ groups ภายใน phase (ตามน้ำหนัก w)
 * @param {Array} groups  - template groups ที่มี {subject, w, tasks}
 * @param {number} start  - วันเริ่มของ phase
 * @param {number} end    - วันสุดของ phase
 * @returns {Array}       - groups พร้อม days label
 */
function distributeGroupDays(groups, start, end) {
  const phaseDays  = end - start + 1;
  const totalW     = groups.reduce((s, g) => s + g.w, 0);
  const result     = [];
  let dayPos       = start;

  groups.forEach((g, gi) => {
    if (dayPos > end) return; // วันเต็มแล้ว ข้ามไป
    const isLast  = gi === groups.length - 1;
    const gDays   = isLast
      ? end - dayPos + 1
      : Math.max(1, Math.round(phaseDays * (g.w / totalW)));
    const gEnd    = Math.min(dayPos + gDays - 1, end);
    const label   = gEnd === dayPos ? `วันที่ ${dayPos}` : `วันที่ ${dayPos}–${gEnd}`;
    result.push({ days: label, subject: g.subject, tasks: g.tasks });
    dayPos = gEnd + 1;
  });

  return result;
}

/**
 * สร้าง PHASES array แบบ dynamic ตามจำนวนวัน
 * - n ≥ 30 วัน → 4 phases (Foundation · Deep · Mock · Review)
 * - 15–29 วัน → 3 phases (Deep · Mock · Review)
 * - 7–14 วัน  → 2 phases (Mock · Review)
 * - < 7 วัน   → 1 phase  (Review + วันสอบ)
 */
function generateDynamicPlan(n) {
  if (n < 1) n = 1;

  let phaseConfig;
  if (n >= 30) {
    phaseConfig = [
      { key: 'p1_foundation', ratio: 0.25 },
      { key: 'p2_deep',       ratio: 0.25 },
      { key: 'p3_mock',       ratio: 0.25 },
      { key: 'p4_review',     ratio: 0.25 },
    ];
  } else if (n >= 15) {
    phaseConfig = [
      { key: 'p2_deep',   ratio: 0.25 },
      { key: 'p3_mock',   ratio: 0.45 },
      { key: 'p4_review', ratio: 0.30 },
    ];
  } else if (n >= 7) {
    phaseConfig = [
      { key: 'p3_mock',   ratio: 0.50 },
      { key: 'p4_review', ratio: 0.50 },
    ];
  } else {
    phaseConfig = [
      { key: 'p4_review', ratio: 1.0 },
    ];
  }

  // คำนวณ boundary ของแต่ละ phase
  const count = phaseConfig.length;
  const boundaries = [];
  let current = 1;
  phaseConfig.forEach((cfg, i) => {
    const phaseDays = (i === count - 1)
      ? n - current + 1
      : Math.max(1, Math.round(n * cfg.ratio));
    boundaries.push({ start: current, end: current + phaseDays - 1 });
    current += phaseDays;
  });

  // สร้าง phase objects
  return phaseConfig.map((cfg, i) => {
    const tmpl    = PHASE_TEMPLATES[cfg.key];
    const { start, end } = boundaries[i];
    const phaseNum = i + 1;
    const metaMap = {
      p1_foundation: { icon: '📖', badge: 'สร้างรากฐาน' },
      p2_deep:       { icon: '🎯', badge: 'เจาะลึก' },
      p3_mock:       { icon: '📝', badge: 'ฝึกจริง' },
      p4_review:     { icon: '🏆', badge: 'ทบทวน & สอบ' },
    };
    return {
      title:  `Phase ${phaseNum}${tmpl.titleSuffix}`,
      days:   start === end ? `วันที่ ${start}` : `วันที่ ${start}–${end}`,
      color:  tmpl.color,
      desc:   tmpl.desc,
      groups: distributeGroupDays(tmpl.groups, start, end),
      meta:   metaMap[cfg.key] || { icon: '📚', badge: 'Phase' },
    };
  });
}

/**
 * Rebuild แผนทั้งหมดเมื่อ examDate เปลี่ยน
 * (จะถูกเรียกทุกครั้งที่ user กำหนด/เปลี่ยนวันสอบ)
 */
function rebuildPlan() {
  totalDays = calcTotalDays();
  PHASES    = generateDynamicPlan(totalDays);

  // อัปเดต section tag badge
  const tag = document.getElementById('plannerSectionTag');
  if (tag) tag.textContent = `ตารางเรียน ${totalDays} วัน`;

  // อัปเดต hero title: แสดง "N วัน" เมื่อมีวันสอบ หรือ "กฟผ." เมื่อยังไม่มี
  const heroSpan = document.getElementById('heroTitleDays');
  if (heroSpan) heroSpan.textContent = examDate ? `${totalDays} วัน` : 'กฟผ.';

  // อัปเดต section desc ตาม phase count จริง
  const desc = document.querySelector('#planner .section-desc');
  if (desc) {
    const pCount = PHASES.length;
    desc.textContent = `แบ่งเนื้อหาเป็น ${pCount} ช่วง · ทบทวนสะสม · ทำข้อสอบเก่า · Mock Test`;
  }

  // Reset phase index ถ้า index เกิน phase ที่มีอยู่
  if (currentPhase >= PHASES.length) currentPhase = 0;
  // Reset สัปดาห์ถ้าเกิน
  const maxWeek = Math.ceil(totalDays / 7) - 1;
  if (currentWeek > maxWeek) currentWeek = 0;

  buildPhaseTabs();
  buildPhaseContent(false);
  buildWeeklyGrid();
}

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

    // 1. Start Date & Exam Date
    if (data.startDate !== undefined) {
      startDate = data.startDate ? data.startDate : getTodayDateStr();
      saveLocal(LS_KEY_STARTDATE, startDate);
      const startInput = document.getElementById('startDateInput');
      if (startInput) startInput.value = startDate || '';
    }
    if (data.examDate !== undefined) {
      examDate = data.examDate ? data.examDate : null;
      saveLocal(LS_KEY_EXAMDATE, examDate);
      const examInput = document.getElementById('examDateInput');
      if (examInput) examInput.value = examDate || '';
    }
    updateCountdown();
    if (typeof rebuildPlan === 'function') rebuildPlan(); // สร้างแผนใหม่อัตโนมัติตามวันที่เหลือ

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
    // 6. AI Recommendations
    if (data.aiRecommendations !== undefined) {
      aiRecommendations = data.aiRecommendations || {};
      saveLocal(LS_KEY_AI_RECS, aiRecommendations);
    }

    buildAiApprovalCenter();
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
const LS_KEY_STARTDATE      = 'egat_start_date';
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

function getTodayDateStr() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const LS_KEY_AI_RECS = 'egat_ai_recommendations';
let aiRecommendations = loadLocal(LS_KEY_AI_RECS, {});

let topicStatus   = loadLocal(LS_KEY_TOPICS, {});
let startDate     = loadLocal(LS_KEY_STARTDATE, null);
let examDate      = loadLocal(LS_KEY_EXAMDATE, null);
let scoreLog      = loadLocal(LS_KEY_SCORES, []);
let dayDone       = loadLocal(LS_KEY_DAY_DONE, {});
let watchedVideos = loadLocal(LS_KEY_WATCHED_VIDEOS, {});

// กำหนด startDate เริ่มต้นหากยังไม่มี (บันทึกลง localStorage เพื่อให้คงที่ ไม่เปลี่ยนทุกวัน)
if (!startDate) {
  startDate = getTodayDateStr();
  saveLocal(LS_KEY_STARTDATE, startDate);
}

let countdownInterval = null; // guard ป้องกัน interval ซ้ำ

// Save ทั้ง local + cloud
function saveAll(key, value) {
  saveLocal(key, value);
  // Map key -> Firebase field name
  const fieldMap = {
    [LS_KEY_TOPICS]:         'topicStatus',
    [LS_KEY_STARTDATE]:      'startDate',
    [LS_KEY_EXAMDATE]:       'examDate',
    [LS_KEY_SCORES]:         'scoreLog',
    [LS_KEY_DAY_DONE]:       'dayDone',
    [LS_KEY_WATCHED_VIDEOS]: 'watchedVideos',
    [LS_KEY_AI_RECS]:        'aiRecommendations',
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
  if (!confirm('ต้องการรีเซ็ตวันเริ่มและวันสอบใช่ไหม?')) return;
  startDate = getTodayDateStr();
  examDate  = null;
  saveAll(LS_KEY_STARTDATE, startDate);
  saveAll(LS_KEY_EXAMDATE, '');
  const startInput = document.getElementById('startDateInput');
  const examInput  = document.getElementById('examDateInput');
  if (startInput) startInput.value = startDate;
  if (examInput)  examInput.value = '';
  updateCountdown();
  rebuildPlan(); // สร้างแผนใหม่ด้วย default 60 วัน
  showToast('🗑 รีเซ็ตวันที่เรียบร้อย');
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
      <div class="mq-card-header" style="background: linear-gradient(135deg, ${sub.accentColor}15, rgba(15,23,42,0.6)); border-bottom: 1px solid ${sub.accentColor}22;">
        <div class="mq-badge" style="background: ${sub.accentColor}22; color: ${sub.accentColor}; border: 1px solid ${sub.accentColor}44;">
          ${sub.icon} ${sub.badgeName}
        </div>
        <span class="mq-diff" style="background: rgba(255, 255, 255, 0.05); color: var(--text-dim);">
          น้ำหนัก ${sub.score} • <strong style="color:${sub.accentColor};">${pct}%</strong>
        </span>
      </div>
      <div style="padding: 18px 16px 16px;">
        <h3 class="sc-title" style="margin-bottom: 12px; font-size: 1.05rem; font-weight: 700; color: #f8fafc;">${sub.title}</h3>
        <ul class="sc-topics">
          ${sub.topics.map(t => {
            const st = topicStatus[t.id] || 'pending';
            const relVids = LESSON_VIDEOS.filter(v => v.relatedTopics && v.relatedTopics.includes(t.id));
            const watchedCnt = relVids.filter(v => !!watchedVideos[v.id]).length;
            const totalVids = relVids.length;
            const remainingVids = relVids.filter(v => !watchedVideos[v.id]);
            const hasVids = totalVids > 0;

            // video progress badge
            let vidBadge = '';
            if (hasVids) {
              if (watchedCnt === totalVids) {
                vidBadge = `<span class="topic-vid-badge tvb-done">${totalVids}/${totalVids} ✅</span>`;
              } else if (watchedCnt > 0) {
                vidBadge = `<span class="topic-vid-badge tvb-progress">${watchedCnt}/${totalVids} 🎬</span>`;
              } else {
                vidBadge = `<span class="topic-vid-badge tvb-pending">0/${totalVids} 🎬</span>`;
              }
            }

            // expand button for topics with remaining videos
            const hasRemaining = remainingVids.length > 0;
            const expandBtn = hasRemaining
              ? `<button class="topic-expand-btn" data-tid="${t.id}" type="button" title="ดูวิดีโอเนื้อหา">▾</button>`
              : '';

            // remaining videos panel (hidden by default)
            const remainingPanel = hasRemaining ? `
              <div class="topic-remaining-panel" id="trp-${t.id}">
                <div class="trp-header">📺 วิดีโอเรียน (${remainingVids.length} คลิป${st === 'in-progress' ? ' ที่ยังต้องดู' : ''})</div>
                ${remainingVids.map(v => `
                  <div class="trp-video-item" data-vid="${v.id}">
                    <span class="trp-play-icon">▶</span>
                    <div class="trp-info">
                      <div class="trp-title">${v.title}</div>
                      <div class="trp-meta">${v.channel} · ${v.duration}</div>
                    </div>
                  </div>
                `).join('')}
              </div>` : '';

            return `<li class="sc-topic status-${st} ${hasRemaining ? 'has-dropdown' : ''}" data-tid="${t.id}">
              <span class="topic-check">${STATUS_ICON[st]}</span>
              <span class="topic-label-text">${t.label}</span>
              ${vidBadge}
              ${expandBtn}
            </li>${remainingPanel}`;
          }).join('')}
        </ul>
        <div class="sc-progress-bar-track" style="margin-top: 14px;">
          <div class="sc-progress-bar-fill" style="width:${pct}%; background:${sub.accentColor};"></div>
        </div>
      </div>
    `;

    // Click: toggle remaining videos panel if available (ไม่เปลี่ยนสถานะหัวข้อ)
    card.querySelectorAll('.sc-topic').forEach(li => {
      li.addEventListener('click', (e) => {
        const tid = li.dataset.tid;
        const panel = card.querySelector(`#trp-${tid}`);
        if (!panel) return; // ไม่มี panel ป้องกันไม่ให้คลิกเปลี่ยนสถานะ
        const btn = li.querySelector('.topic-expand-btn');
        const isOpen = panel.classList.contains('trp-open');
        panel.classList.toggle('trp-open', !isOpen);
        if (btn) {
          btn.textContent = isOpen ? '▾' : '▴';
          btn.classList.toggle('expanded', !isOpen);
        }
      });
    });

    // Click: open video modal from remaining panel
    card.querySelectorAll('.trp-video-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        openVideoModal(item.dataset.vid);
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
  if (!phase) return; // guard ถ้า PHASES ยังว่างอยู่
  const meta      = phase.meta || { icon: '📚', badge: 'Phase' }; // ใช้ meta ที่ฝังมาใน phase object

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
const MONTHS_TH_SHORT = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];

/**
 * คืนวันเริ่มต้นแผน (จาก startDate หรือ วันนี้หากไม่มี)
 */
function getPlanStartDate() {
  if (startDate) {
    const parts = startDate.split('-');
    if (parts.length === 3) {
      const d = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      d.setHours(0, 0, 0, 0);
      return d;
    }
  }
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  return start;
}

/**
 * แปลงเลขวันในแผน (1-N) เป็นวัน Date จริง
 * วันที่ 1 = วันเริ่มต้นแผน
 */
function getDayRealDate(planDay) {
  const start = getPlanStartDate();
  start.setDate(start.getDate() + planDay - 1);
  return start;
}

/**
 * แสดงวันที่แบบไทยสั้น เช่น "1 ก.ค."
 */
function formatDateShortTH(d) {
  if (!d) return '';
  return `${d.getDate()} ${MONTHS_TH_SHORT[d.getMonth()]}`;
}

function getWeekPlan(weekIdx) {
  const startDay = weekIdx * 7 + 1;
  return Array.from({length: 7}, (_, i) => {
    const day = startDay + i;
    if (day > totalDays) return null;  // ใช้ totalDays dynamic
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
    const realDate = getDayRealDate(day);
    return { day, task, done: !!dayDone[day], realDate };
  });
}

function buildWeeklyGrid() {
  const container  = document.getElementById('weeklyGrid');
  const weekLabel  = document.getElementById('weekLabel');
  weekLabel.textContent = `สัปดาห์ที่ ${currentWeek + 1} / ${Math.ceil(totalDays/7)}`;

  const todayStr = new Date().toDateString();

  container.innerHTML = getWeekPlan(currentWeek).map((p, i) => {
    if (!p) return `<div class="day-cell" style="opacity:0.3;"><div class="day-num" style="color:var(--text-muted);">-</div></div>`;
    const isToday = p.realDate && p.realDate.toDateString() === todayStr;
    const realDateLabel = p.realDate ? `<div class="day-real-date">${formatDateShortTH(p.realDate)}</div>` : '';
    const cls = ['day-cell',
      p.done ? 'completed' : '',
      (i===0||i===6) ? 'weekend' : '',
      isToday ? 'is-today' : ''
    ].filter(Boolean).join(' ');
    return `<div class="${cls}" data-day="${p.day}">

      <div class="day-num">วัน ${p.day}</div>
      ${realDateLabel}
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
          const relVids = LESSON_VIDEOS.filter(v => v.relatedTopics && v.relatedTopics.includes(t.id));
          const watchedCnt = relVids.filter(v => !!watchedVideos[v.id]).length;
          const totalVids = relVids.length;
          let vidInfo = '';
          if (totalVids > 0) {
            vidInfo = `<span class="pill-vid-count ${watchedCnt === totalVids ? 'pvc-done' : watchedCnt > 0 ? 'pvc-progress' : 'pvc-none'}">${watchedCnt}/${totalVids}</span>`;
          }
          return `<span class="subtopic-pill ${st==='done'?'done':st==='in-progress'?'in-progress':''}" data-tid="${t.id}">${t.label}${vidInfo}</span>`;
        }).join('')}
      </div>`;

    container.appendChild(card);
  });
}

// ======================================================
// REMAINING VIDEOS PANEL
// ======================================================
function buildRemainingVideosPanel() {
  const container = document.getElementById('remainingVideosPanel');
  const wrapper   = document.getElementById('remainingVideosSectionWrapper');
  const badge     = document.getElementById('rvsHeaderSummaryBadge');
  if (!container) return;

  // รวม topic ทั้งหมดที่ in-progress และมีวิดีโอที่ยังค้างอยู่
  const groups = [];
  SUBJECTS.forEach(sub => {
    sub.topics.forEach(t => {
      const st = topicStatus[t.id] || 'pending';
      if (st !== 'in-progress') return;
      const relVids = LESSON_VIDEOS.filter(v => v.relatedTopics && v.relatedTopics.includes(t.id));
      const remaining = relVids.filter(v => !watchedVideos[v.id]);
      if (remaining.length > 0) {
        groups.push({ subject: sub, topic: t, remaining });
      }
    });
  });

  if (groups.length === 0) {
    if (badge) badge.style.display = 'none';
    container.innerHTML = `
      <div class="rvp-empty">
        <div class="rvp-empty-icon">🎉</div>
        <div class="rvp-empty-title">ไม่มีวิดีโอค้างอยู่!</div>
        <div class="rvp-empty-desc">คุณดูวิดีโอครบทุกหัวข้อที่กำลังเรียนอยู่แล้ว</div>
      </div>`;
    return;
  }

  // นับรวมทั้งหมด
  const totalRemaining = groups.reduce((s, g) => s + g.remaining.length, 0);

  // Update header summary badge for when section is collapsed
  if (badge) {
    badge.textContent = `${totalRemaining} คลิปค้างดู`;
    const isCollapsed = wrapper && wrapper.classList.contains('is-collapsed');
    badge.style.display = isCollapsed ? 'inline-block' : 'none';
  }

  container.innerHTML = `
    <div class="rvp-summary">
      <span class="rvp-count-badge">${totalRemaining} คลิปที่ต้องดู</span>
      <span class="rvp-hint">ดูให้ครบเพื่อให้หัวข้อเปลี่ยนเป็น ✅ สีเขียว</span>
    </div>
    ${groups.map(g => `
      <div class="rvp-group">
        <div class="rvp-group-header" style="color:${g.subject.accentColor};" title="คลิกเพื่อ ย่อ/ขยาย หัวข้อนี">
          ${g.subject.icon} ${g.topic.label}
          <span class="rvp-group-sub">(${g.subject.title.split(' (')[0]})</span>
          <span class="rvp-group-cnt">
            ${g.remaining.length} คลิปเหลือ
            <span class="rvp-group-arrow">▲</span>
          </span>
        </div>
        ${g.remaining.map(v => `
          <div class="rvp-video-item" data-vid="${v.id}">
            <div class="rvpi-thumb">
              <img src="https://img.youtube.com/vi/${v.youtubeId}/default.jpg" alt="" />
              <span class="rvpi-play">▶</span>
            </div>
            <div class="rvpi-info">
              <div class="rvpi-title">${v.title}</div>
              <div class="rvpi-meta">${v.channel} · ${v.duration}</div>
            </div>
            <button class="rvpi-watch-btn" data-vid="${v.id}" type="button">ดูเลย</button>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;

  // Events: Per-group collapse toggle
  container.querySelectorAll('.rvp-group-header').forEach(header => {
    header.addEventListener('click', () => {
      const groupEl = header.closest('.rvp-group');
      const arrow = header.querySelector('.rvp-group-arrow');
      if (!groupEl) return;
      const isCollapsed = groupEl.classList.toggle('is-group-collapsed');
      if (arrow) arrow.textContent = isCollapsed ? '▼' : '▲';
    });
  });

  // Events: เปิดวิดีโอ modal
  container.querySelectorAll('.rvp-video-item, .rvpi-watch-btn').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const vid = el.dataset.vid;
      if (vid) openVideoModal(vid);
    });
  });
}

function initRemainingVideosToggle() {
  const wrapper = document.getElementById('remainingVideosSectionWrapper');
  const btn     = document.getElementById('rvsToggleBtn');
  const txt     = document.getElementById('rvsToggleText');
  const icon    = document.getElementById('rvsToggleIcon');
  const badge   = document.getElementById('rvsHeaderSummaryBadge');
  if (!wrapper || !btn) return;

  // Restore saved collapse preference
  const isSavedCollapsed = localStorage.getItem('rvs_collapsed') === '1';
  if (isSavedCollapsed) {
    wrapper.classList.add('is-collapsed');
    if (txt)  txt.textContent  = 'ขยายเนื้อหา';
    if (icon) icon.textContent = '▼';
    if (badge && badge.textContent) badge.style.display = 'inline-block';
  }

  btn.addEventListener('click', () => {
    const isCollapsed = wrapper.classList.toggle('is-collapsed');
    if (txt)  txt.textContent  = isCollapsed ? 'ขยายเนื้อหา' : 'ย่อเนื้อหา';
    if (icon) icon.textContent = isCollapsed ? '▼' : '▲';
    if (badge && badge.textContent) badge.style.display = isCollapsed ? 'inline-block' : 'none';
    localStorage.setItem('rvs_collapsed', isCollapsed ? '1' : '0');
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
        saveAll(LS_KEY_STARTDATE, startDate);
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

  // ---- Start Date & Exam date ----
  const startInput = document.getElementById('startDateInput');
  const examInput  = document.getElementById('examDateInput');
  if (startDate && startInput) startInput.value = startDate;
  if (examDate && examInput)   examInput.value = examDate;

  const saveAndSyncDates = () => {
    if (startInput && startInput.value) {
      startDate = startInput.value;
      saveAll(LS_KEY_STARTDATE, startDate);
    }
    if (examInput && examInput.value) {
      examDate = examInput.value;
      saveAll(LS_KEY_EXAMDATE, examDate);
    } else if (examInput && !examInput.value) {
      examDate = null;
      saveAll(LS_KEY_EXAMDATE, '');
    }
    updateCountdown();
    rebuildPlan(); // สร้างแผนใหม่อัตโนมัติตามวันที่เหลือ
    showToast(`📅 บันทึกวันที่เรียบร้อย! (${totalDays} วัน) 💪`);
  };

  const setBtn = document.getElementById('setExamDateBtn');
  if (setBtn) setBtn.addEventListener('click', saveAndSyncDates);
  if (startInput) startInput.addEventListener('change', saveAndSyncDates);
  if (examInput)  examInput.addEventListener('change', saveAndSyncDates);

  document.getElementById('resetExamDateBtn').addEventListener('click', resetExamDate);
  updateCountdown();

  // ---- Build UI ----
  buildAiApprovalCenter();
  buildSubjectGrid();
  rebuildPlan(); // สร้างแผนครั้งแรก (รวม buildPhaseTabs + buildPhaseContent + buildWeeklyGrid)
  buildProgressList();
  buildScoreLog();
  populateScoreSelect();
  updateOverall();

  const simBtn = document.getElementById('simulateAiAgentBtn');
  if (simBtn) simBtn.addEventListener('click', simulateAgentSubmission);

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
    const maxWeek = Math.ceil(totalDays / 7) - 1; // dynamic limit
    if (currentWeek < maxWeek) { currentWeek++; buildWeeklyGrid(); }
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
  initMockTestSection();
  initCustomQuizBuilder();
  buildRemainingVideosPanel();
  initRemainingVideosToggle();

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
  },
  {
    id: 'v_mbuisc_1',
    title: 'ติวสอบ เทคโนโลยีดิจิทัลเพื่อการศึกษา 100 ข้อ',
    channel: 'Mbuisc Channel',
    category: 'digital',
    categoryLabel: '💻 ทักษะดิจิทัล',
    accentColor: '#34d399',
    duration: '45:00',
    youtubeId: 's42Z59M6RwQ',
    desc: 'ติวเจาะลึกข้อสอบเทคโนโลยีดิจิทัลเพื่อการศึกษา และทักษะดิจิทัล 100 ข้อ',
    relatedTopics: ['dig_hardware', 'dig_security']
  },
  {
    id: 'v_khim_1',
    title: 'เฉลย เงื่อนไขภาษา ก.พ. e-Exam69 วันที่ 24 พ.ค.2569 รอบเช้า | EP299',
    channel: 'พี่ขิม ติวสอบราชการ',
    category: 'logic',
    categoryLabel: '🧠 ตรรกะ',
    accentColor: '#22d3ee',
    duration: '35:00',
    youtubeId: 'FBQNc_aP4kE',
    desc: 'เฉลยข้อสอบเงื่อนไขภาษา ก.พ. e-Exam อย่างละเอียด เทคนิคการวิเคราะห์ประพจน์และเงื่อนไข',
    relatedTopics: ['logic_sym', 'logic_deduce']
  },
  {
    id: 'v_khim_2',
    title: 'ติวอุปมา อุปไมย พร้อมเฉลยข้อสอบ ก.พ. รอบวันที่ 28 - 30 มี.ค.2568 | TEP07',
    channel: 'พี่ขิม ติวสอบราชการ',
    category: 'verbal',
    categoryLabel: '💬 ความสามารถด้านภาษา',
    accentColor: '#a78bfa',
    duration: '30:00',
    youtubeId: 'PaogSFUTv2Y',
    desc: 'ติวข้อสอบอุปมา อุปไมย ภาษาไทย พร้อมเฉลยข้อสอบจริง ก.พ. รอบล่าสุด',
    relatedTopics: ['verbal_analogy']
  },
  {
    id: 'v_nat_1',
    title: 'Digital Literacy ความฉลาดทางดิจิทัลคืออะไร มีอะไรบ้าง?',
    channel: 'ครูณัฐพล บัวอุไร',
    category: 'digital',
    categoryLabel: '💻 ทักษะดิจิทัล',
    accentColor: '#34d399',
    duration: '15:00',
    youtubeId: 'lkxBuS5CmrI',
    desc: 'สรุปความรู้ Digital Literacy ความฉลาดทางดิจิทัล องค์ประกอบสำคัญ และเทคโนโลยีไซเบอร์',
    relatedTopics: ['dig_hardware', 'dig_security']
  },
  {
    id: 'v_arit_1',
    title: 'ติวเข้มข้อสอบ Digital Literacy IC3',
    channel: 'ARIT PKRU',
    category: 'digital',
    categoryLabel: '💻 ทักษะดิจิทัล',
    accentColor: '#34d399',
    duration: '50:00',
    youtubeId: 'CpHeZ80fSfw',
    desc: 'ติวเข้มเก็งข้อสอบ Digital Literacy IC3 ครอบคลุมระบบคอมพิวเตอร์ อินเทอร์เน็ต และ Office',
    relatedTopics: ['dig_hardware', 'dig_office', 'dig_security', 'dig_internet']
  },
  {
    id: 'v_khim_3',
    title: 'ติวภาษาไทย ก.พ. การเรียงประโยค ตอนที่ 1 ปูพื้นฐาน | TEP01',
    channel: 'พี่ขิม ติวสอบราชการ',
    category: 'verbal',
    categoryLabel: '💬 ความสามารถด้านภาษา',
    accentColor: '#a78bfa',
    duration: '25:00',
    youtubeId: 'T5plFJes0rw',
    desc: 'ปูพื้นฐานการเรียงลำดับประโยคและข้อความภาษาไทย เทคนิคการสังเกตประโยคแรกและประโยคเชื่อม',
    relatedTopics: ['verbal_middle', 'verbal_reading']
  },
  {
    id: 'v_khim_4',
    title: 'ติวภาษาไทย ก.พ. การเรียงประโยค ตอนที่ 2 ตะลุยโจทย์ | TEP02',
    channel: 'พี่ขิม ติวสอบราชการ',
    category: 'verbal',
    categoryLabel: '💬 ความสามารถด้านภาษา',
    accentColor: '#a78bfa',
    duration: '28:00',
    youtubeId: 'DZO44oMUzQw',
    desc: 'ตะลุยโจทย์การเรียงลำดับประโยคภาษาไทย ฝึกทำข้อสอบจริง ก.พ. เทคนิคทำเร็ว',
    relatedTopics: ['verbal_middle', 'verbal_reading']
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
,
  {
    id: 'pdf_limit_ku',
    title: 'แบบฝึกหัด แคลคูลัส: ลิมิต (Limit 56 ข้อพร้อมเฉลย)',
    year: 'ม.เกษตรศาสตร์',
    file: 'exams/limit1.1.pdf',
    size: '97.7 KB',
    pages: '56 ข้อ + เฉลย',
    desc: 'แบบฝึกหัดลิมิต (Limit) 56 ข้อ พร้อมเฉลยคำตอบทุกข้อ โดย อ.ณรงค์ฤทธิ์ แก้วบรรจักร์ มหาวิทยาลัยเกษตรศาสตร์',
    badge: '📐 แคลคูลัส (Limit) KU',
    accentColor: '#10b981'
  }
];

// ======================================================
// AI VIDEO APPROVAL CENTER & HELPER FUNCTIONS
// ======================================================
function getYoutubeIdFromUrl(url) {
  if (!url) return '';
  if (url.length === 11 && !url.includes('/') && !url.includes('.')) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = String(url).match(regExp);
  return (match && match[2].length === 11) ? match[2] : url;
}

function getAllLessonVideos() {
  const customApproved = [];
  Object.values(aiRecommendations || {}).forEach(rec => {
    if (rec.status === 'approved') {
      customApproved.push({
        id: rec.id,
        title: rec.title + ' ✨ (AI Approved)',
        channel: '🤖 AI Recommended',
        category: rec.category || 'math',
        categoryLabel: rec.categoryLabel || '🔢 คณิตศาสตร์',
        accentColor: '#c084fc',
        duration: 'แนะนำ',
        youtubeId: rec.youtubeId || getYoutubeIdFromUrl(rec.url),
        desc: rec.reason || 'วิดีโอที่ได้รับการอนุมัติจาก AI Agent',
        relatedTopics: rec.relatedTopic ? [rec.relatedTopic] : [],
        isAiApproved: true
      });
    }
  });
  return [...customApproved, ...LESSON_VIDEOS];
}

function buildAiApprovalCenter() {
  const container = document.getElementById('aiApprovalContainer');
  const navBadge = document.getElementById('navAiBadge');
  if (!container) return;

  const recList = Object.values(aiRecommendations || {}).filter(r => r.status === 'pending');

  if (navBadge) {
    if (recList.length > 0) {
      navBadge.textContent = recList.length;
      navBadge.style.display = 'inline-block';
    } else {
      navBadge.style.display = 'none';
    }
  }

  if (recList.length === 0) {
    container.innerHTML = `
      <div class="ai-empty-state">
        <p style="font-size: 1.2rem; margin-bottom: 6px; font-weight: 700; color: var(--text-primary);">✨ ยังไม่มีวิดีโอรอการอนุมัติในขณะนี้</p>
        <p>เมื่อ Agent คัดเลือกลิงก์วิดีโอมาให้ประจำวัน (7:00 น.) รายการจะปรากฏที่นี่ เพื่อให้คุณตรวจสอบและกดอนุมัติก่อนเพิ่มเข้าบทเรียนจริง</p>
        <p style="margin-top: 10px; opacity: 0.9; font-size: 0.85rem; color: #c084fc;">💡 สามารถทดลองกดปุ่ม <strong>"✨ จำลอง Agent เสนอวิดีโอ"</strong> ด้านบนเพื่อทดสอบระบบได้ทันที</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';

  recList.forEach(rec => {
    const card = document.createElement('div');
    card.className = 'ai-rec-card';

    const ytId = rec.youtubeId || getYoutubeIdFromUrl(rec.url);

    card.innerHTML = `
      <div class="ai-rec-header">
        <span class="ai-rec-badge">${rec.categoryLabel || '📚 วิชาเตรียมสอบ'}</span>
        <span class="ai-rec-status">⌛ รอคุณอนุมัติ</span>
      </div>
      <h3 class="ai-rec-title">${rec.title}</h3>
      <div class="ai-rec-reason">🤖 <strong>เหตุผลที่ AI คัดเลือก:</strong> ${rec.reason}</div>
      <div class="ai-rec-actions">
        <button class="btn-rec-approve" onclick="approveAiRecommendation('${rec.id}')">✅ อนุมัติ & เพิ่มเข้าบทเรียน</button>
        <button class="btn-rec-preview" onclick="toggleRecPreview('${rec.id}')">▶️ ดูตัวอย่างวิดีโอ</button>
        <button class="btn-rec-edit" onclick="editAiRecommendation('${rec.id}')">✏️ แก้ไขลิงก์/ชื่อ</button>
        <button class="btn-rec-reject" onclick="rejectAiRecommendation('${rec.id}')">❌ ข้าม / ไม่เอา</button>
      </div>
      <div class="ai-preview-frame" id="recPreview_${rec.id}" style="display:none;">
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${ytId}" title="${rec.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    `;
    container.appendChild(card);
  });
}

function approveAiRecommendation(recId) {
  if (!aiRecommendations[recId]) return;
  aiRecommendations[recId].status = 'approved';
  aiRecommendations[recId].approvedAt = new Date().toISOString();
  saveAll(LS_KEY_AI_RECS, aiRecommendations);

  showToast('✅ อนุมัติวิดีโอเรียบร้อย! เพิ่มเข้าในบทเรียนและคลังวิดีโอแล้ว');
  buildAiApprovalCenter();
  buildSubjectGrid();
  buildVideoGrid();
}

function rejectAiRecommendation(recId) {
  if (!aiRecommendations[recId]) return;
  aiRecommendations[recId].status = 'rejected';
  saveAll(LS_KEY_AI_RECS, aiRecommendations);

  showToast('🗑️ ปฏิเสธวิดีโอแนะนำแล้ว');
  buildAiApprovalCenter();
}

function editAiRecommendation(recId) {
  const rec = aiRecommendations[recId];
  if (!rec) return;

  const newTitle = prompt('แก้ไขชื่อวิดีโอ:', rec.title);
  if (newTitle === null) return;

  const newUrl = prompt('แก้ไข URL หรือ YouTube Video ID:', rec.url || rec.youtubeId);
  if (newUrl === null) return;

  rec.title = newTitle.trim() || rec.title;
  rec.url = newUrl.trim() || rec.url;
  rec.youtubeId = getYoutubeIdFromUrl(rec.url);

  saveAll(LS_KEY_AI_RECS, aiRecommendations);
  showToast('✏️ บันทึกการแก้ไขวิดีโอแล้ว');
  buildAiApprovalCenter();
}

function toggleRecPreview(recId) {
  const el = document.getElementById(`recPreview_${recId}`);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function simulateAgentSubmission() {
  const inProgressTopics = Object.keys(topicStatus).filter(t => topicStatus[t] === 'in-progress');
  const pendingTopics = Object.keys(topicStatus).filter(t => topicStatus[t] === 'pending' || !topicStatus[t]);

  let targetTopic = inProgressTopics[0] || pendingTopics[0] || 'math_series';
  let category = 'math';
  let categoryLabel = '🔢 คณิตศาสตร์';

  if (targetTopic.startsWith('verbal')) {
    category = 'verbal';
    categoryLabel = '💬 ภาษาไทย';
  } else if (targetTopic.startsWith('logic')) {
    category = 'logic';
    categoryLabel = '🧠 ตรรกศาสตร์';
  } else if (targetTopic.startsWith('spatial')) {
    category = 'spatial';
    categoryLabel = '🎲 มิติสัมพันธ์';
  }

  const mockSamples = [
    {
      title: 'ติวเข้มคณิตศาสตร์ กฟผ.: เทคนิคการแก้โจทย์อนุกรมสลับและอนุกรมหลายชั้น',
      youtubeId: 'vJ7R7DM-4QM',
      url: 'https://www.youtube.com/watch?v=vJ7R7DM-4QM',
      reason: 'AI คัดเลือกคลิปติวแนวข้อสอบอนุกรมความยากสูงตรงตามสเปก กฟผ. (7:00 น.)'
    },
    {
      title: 'สรุปเทคนิคตรรกศาสตร์ กฟผ.: การวิเคราะห์ประพจน์และการสรุปเหตุผล',
      youtubeId: 'EOdH4u2vNyY',
      url: 'https://www.youtube.com/watch?v=EOdH4u2vNyY',
      reason: 'AI คัดเลือกลิงก์ติวบทสรุปตรรกศาสตร์ที่คนสอบผ่าน กฟผ. แนะนำมากที่สุด'
    },
    {
      title: 'สรุปสูตรฟิสิกส์ & ไฟฟ้าเบื้องต้น สำหรับสอบวัดความรู้ กฟผ.',
      youtubeId: 'l_8T02xIBUI',
      url: 'https://www.youtube.com/watch?v=l_8T02xIBUI',
      reason: 'AI แนะนำคลิปติวฟิสิกส์เน้นๆ ประจำวันสำหรับการสอบรอบสายช่างและวิศวกร'
    }
  ];

  const sample = mockSamples[Math.floor(Math.random() * mockSamples.length)];
  const recId = 'rec_' + Date.now();

  aiRecommendations[recId] = {
    id: recId,
    title: sample.title,
    url: sample.url,
    youtubeId: sample.youtubeId,
    category: category,
    categoryLabel: categoryLabel,
    relatedTopic: targetTopic,
    reason: sample.reason,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  saveAll(LS_KEY_AI_RECS, aiRecommendations);
  showToast('🤖 AI Agent (จำลอง 7:00 น.) ส่งวิดีโอแนะนำมาแล้ว 1 รายการ!');
  buildAiApprovalCenter();

  const el = document.getElementById('ai-approval');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function buildVideoGrid() {
  const container = document.getElementById('videoGrid');
  if (!container) return;

  // --- กรณีเลือกหมวดข้อสอบเก่า/ติวรวม (mock) -> แสดง PDF Exam Cards ---
  if (currentVideoCategory === 'mock') {
    const isMobile = isMobileOrTabletDevice();
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
            📖 เปิดดูแนวข้อสอบ
          </button>
        </div>
      </div>
    `).join('');
    return;
  }

  const allVids = getAllLessonVideos();
  const filtered = allVids.filter(v => {
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
  return getAllLessonVideos().filter(v => v.relatedTopics && v.relatedTopics.includes(tid));
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

  const video = getAllLessonVideos().find(v => v.id === vid);
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
    buildRemainingVideosPanel();
    updateOverall();
  }

  buildVideoGrid();
  updateVideoModalWatchedBtn(vid);
  showToast(toastMsg, 3400);
}

function openVideoModal(vid) {
  const video = getAllLessonVideos().find(v => v.id === vid);
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
// DEVICE DETECTOR (iPad / Mobile / Touch Tablet)
// ======================================================
function isMobileOrTabletDevice() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  const isTouchMac = (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS 13+
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isSmallScreen = window.innerWidth <= 1024;

  return isMobileUA || isTouchMac || isSmallScreen;
}

// ======================================================
// PDF EXAM VIEWER MODAL / DIRECT NEW TAB
// ======================================================
function openPdfModal(pdfId) {
  const pdf = EXAM_PDFS.find(p => p.id === pdfId);
  if (!pdf) return;

  // เฉพาะใน iPad และ Mobile -> ไม่ต้องเปิดแบบ Popup เมื่อกดให้เด้งเปิด PDF หน้าใหม่ทันที
  if (isMobileOrTabletDevice()) {
    window.open(pdf.file, '_blank');
    return;
  }

  // บน Desktop / PC -> เปิดใน Popup Modal เหมือนเดิม
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

// ======================================================
// MOCK TEST & QUIZ PRACTICE ENGINE (250 QUESTIONS BANK)
// ======================================================

// Helper: Fisher-Yates Array Shuffle
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Helper: Randomize Question (shuffles choices and keeps track of correct choice index)
function randomizeQuestion(q) {
  if (!q.choices || q.answer === undefined) return q;
  const originalCorrectText = q.choices[q.answer];
  const shuffledChoices = shuffleArray(q.choices);
  const newCorrectIndex = shuffledChoices.indexOf(originalCorrectText);
  return {
    ...q,
    choices: shuffledChoices,
    answer: newCorrectIndex
  };
}

const MATH_QUESTIONS = [
  {
    "prompt": "ข้อที่ 1: จงหาตัวเลขถัดไปของอนุกรม: <strong>3, 7, 15, 31, 63, ?</strong>",
    "choices": [
      "125",
      "127",
      "129",
      "131"
    ],
    "answer": 1,
    "explanation": "รูปแบบ x × 2 + 1: 63 × 2 + 1 = <strong>127</strong>"
  },
  {
    "prompt": "ข้อที่ 2: จงหาตัวเลขถัดไปของอนุกรม: <strong>2, 6, 12, 20, 30, 42, ?</strong>",
    "choices": [
      "52",
      "54",
      "56",
      "60"
    ],
    "answer": 2,
    "explanation": "ระยะห่างเพิ่มทีละ 2 (+4, +6, +8, +10, +12, +14): 42 + 14 = <strong>56</strong>"
  },
  {
    "prompt": "ข้อที่ 3: จงหาตัวเลขถัดไปของอนุกรม: <strong>1, 4, 9, 16, 25, 36, ?</strong>",
    "choices": [
      "42",
      "45",
      "49",
      "64"
    ],
    "answer": 2,
    "explanation": "อนุกรมกำลังสอง n²: 7² = <strong>49</strong>"
  },
  {
    "prompt": "ข้อที่ 4: จงหาตัวเลขถัดไปของอนุกรม: <strong>100, 95, 85, 70, 50, ?</strong>",
    "choices": [
      "20",
      "25",
      "30",
      "35"
    ],
    "answer": 1,
    "explanation": "ลดลงทีละ 5 (-5, -10, -15, -20, -25): 50 - 25 = <strong>25</strong>"
  },
  {
    "prompt": "ข้อที่ 5: จงหาตัวเลขถัดไปของอนุกรม: <strong>5, 10, 20, 40, 80, ?</strong>",
    "choices": [
      "120",
      "140",
      "160",
      "180"
    ],
    "answer": 2,
    "explanation": "คูณ 2 ต่อเนื่อง: 80 × 2 = <strong>160</strong>"
  },
  {
    "prompt": "ข้อที่ 6: สินค้าราคาป้าย 2,000 บาท ลดราคา 20% แล้วยังคงได้กำไร 25% ราคาทุนของสินค้าชิ้นนี้คือกี่บาท?",
    "choices": [
      "1,280 บาท",
      "1,320 บาท",
      "1,400 บาท",
      "1,500 บาท"
    ],
    "answer": 0,
    "explanation": "ขายจริง = 2,000 × 0.8 = 1,600 บาท. ทุน = 1,600 / 1.25 = <strong>1,280 บาท</strong>"
  },
  {
    "prompt": "ข้อที่ 7: ซื้อสินค้ามา 800 บาท ขายไป 1,000 บาท คิดเป็นกำไรกี่เปอร์เซ็นต์?",
    "choices": [
      "20%",
      "25%",
      "30%",
      "35%"
    ],
    "answer": 1,
    "explanation": "กำไร = (200 / 800) × 100 = <strong>25%</strong>"
  },
  {
    "prompt": "ข้อที่ 8: ราคาสินค้ารวมภาษีมูลค่าเพิ่ม 7% เท่ากับ 1,070 บาท อยากทราบว่าราคาสินค้าก่อนภาษีคือกี่บาท?",
    "choices": [
      "950 บาท",
      "1,000 บาท",
      "1,020 บาท",
      "1,050 บาท"
    ],
    "answer": 1,
    "explanation": "ราคาก่อนภาษี = 1,070 / 1.07 = <strong>1,000 บาท</strong>"
  },
  {
    "prompt": "ข้อที่ 9: ฝากเงิน 10,000 บาท ได้รับดอกเบี้ย 5% ต่อปี เมื่อฝากครบ 3 ปี จะได้รับเงินรวมทั้งหมดกี่บาท?",
    "choices": [
      "11,000 บาท",
      "11,500 บาท",
      "12,000 บาท",
      "12,500 บาท"
    ],
    "answer": 1,
    "explanation": "ดอกเบี้ยรวม = 10,000 × 0.05 × 3 = 1,500 บาท. เงินรวม = <strong>11,500 บาท</strong>"
  },
  {
    "prompt": "ข้อที่ 10: อัตราส่วนเงินของ A ต่อ B เท่ากับ 3 : 5 ถ้าเงินรวมของทั้งสองคนเท่ากับ 1,600 บาท B มีเงินกี่บาท?",
    "choices": [
      "600 บาท",
      "800 บาท",
      "1,000 บาท",
      "1,200 บาท"
    ],
    "answer": 2,
    "explanation": "ส่วนรวม = 3 + 5 = 8 ส่วน. 1 ส่วน = 200 บาท. B มี 5 ส่วน = <strong>1,000 บาท</strong>"
  },
  {
    "prompt": "ข้อที่ 11: คนงาน 6 คน สร้างบ้านเสร็จใน 12 วัน ถ้าต้องการสร้างบ้านหลังเดิมให้เสร็จใน 4 วัน ต้องใช้คนงานกี่คน?",
    "choices": [
      "12 คน",
      "16 คน",
      "18 คน",
      "20 คน"
    ],
    "answer": 2,
    "explanation": "งานรวม = 6 × 12 = 72 คน-วัน. ใช้เวลา 4 วัน ต้องใช้คน = 72 / 4 = <strong>18 คน</strong>"
  },
  {
    "prompt": "ข้อที่ 12: คนงาน 10 คน ทำงานเสร็จใน 8 วัน ถ้าเพิ่มคนงานเป็น 16 คน งานจะเสร็จในกี่วัน?",
    "choices": [
      "4 วัน",
      "5 วัน",
      "6 วัน",
      "7 วัน"
    ],
    "answer": 1,
    "explanation": "งานรวม = 80 คน-วัน. 16 คน จะเสร็จใน = 80 / 16 = <strong>5 วัน</strong>"
  },
  {
    "prompt": "ข้อที่ 13: รถยนต์ขับด้วยความเร็วคงที่ 60 กม./ชม. เป็นเวลา 2 ชั่วโมง 30 นาที จะได้ระยะทางกี่กิโลเมตร?",
    "choices": [
      "120 กม.",
      "140 กม.",
      "150 กม.",
      "160 กม."
    ],
    "answer": 2,
    "explanation": "ระยะทาง = ความเร็ว × เวลา = 60 × 2.5 = <strong>150 กม.</strong>"
  },
  {
    "prompt": "ข้อที่ 14: ท่อ A ไขน้ำเต็มถังใน 3 ชม. ท่อ B ไขเต็มถังใน 6 ชม. เปิดสองท่อพร้อมกัน น้ำจะเต็มถังในกี่ชม.?",
    "choices": [
      "1.5 ชม.",
      "2 ชม.",
      "2.5 ชม.",
      "3 ชม."
    ],
    "answer": 1,
    "explanation": "อัตราเร็วรวม = 1/3 + 1/6 = 3/6 = 1/2 ถัง/ชม. ดังนั้นเต็มถังใน <strong>2 ชม.</strong>"
  },
  {
    "prompt": "ข้อที่ 15: รถไฟยาว 100 เมตร วิ่งด้วยความเร็ว 20 เมตร/วินาที จะวิ่งผ่านเสาไฟฟ้าต้นหนึ่งในเวลากี่วินาที?",
    "choices": [
      "3 วินาที",
      "4 วินาที",
      "5 วินาที",
      "6 วินาที"
    ],
    "answer": 2,
    "explanation": "เวลา = ระยะทาง / ความเร็ว = 100 / 20 = <strong>5 วินาที</strong>"
  },
  {
    "prompt": "ข้อที่ 16: อีก 5 ปีข้างหน้า อายุของพ่อจะเป็น 3 เท่าของลูก ถ้าปัจจุบันพ่ออายุ 40 ปี ปัจจุบันลูกมีอายุเท่าใด?",
    "choices": [
      "10 ปี",
      "12 ปี",
      "15 ปี",
      "18 ปี"
    ],
    "answer": 0,
    "explanation": "อีก 5 ปี พ่ออายุ 45 ปี. ลูกอายุ 45 / 3 = 15 ปี. ปัจจุบันลูกอายุ 15 - 5 = <strong>10 ปี</strong>"
  },
  {
    "prompt": "ข้อที่ 17: ปัจจุบัน A มีอายุเป็น 2 เท่าของ B อีก 10 ปีข้างหน้า ผลรวมอายุทั้งสองคนเท่ากับ 50 ปี ปัจจุบัน A อายุเท่าใด?",
    "choices": [
      "15 ปี",
      "20 ปี",
      "25 ปี",
      "30 ปี"
    ],
    "answer": 1,
    "explanation": "(2x+10) + (x+10) = 50 -> 3x = 30 -> x = 10 (B). A อายุ 2x = <strong>20 ปี</strong>"
  },
  {
    "prompt": "ข้อที่ 18: คำตอบของสมการ 2x + 3 = 15 คือข้อใด?",
    "choices": [
      "x = 4",
      "x = 6",
      "x = 8",
      "x = 9"
    ],
    "answer": 1,
    "explanation": "2x = 12 -> x = <strong>6</strong>"
  },
  {
    "prompt": "ข้อที่ 19: จำนวนเรียงกัน 3 จำนวน มีผลรวมเท่ากับ 45 จำนวนที่มากที่สุดมีค่าเท่าใด?",
    "choices": [
      "14",
      "15",
      "16",
      "17"
    ],
    "answer": 2,
    "explanation": "ตัวกลาง = 45 / 3 = 15. สามจำนวนคือ 14, 15, 16. ตัวมากที่สุดคือ <strong>16</strong>"
  },
  {
    "prompt": "ข้อที่ 20: ผลบวกของมุมภายในของรูปสามเหลี่ยมใดๆ มีค่าเท่ากับกี่องศา?",
    "choices": [
      "90 องศา",
      "180 องศา",
      "270 องศา",
      "360 องศา"
    ],
    "answer": 1,
    "explanation": "มุมภายในรูปสามเหลี่ยมรวมกันได้ <strong>180 องศา</strong> เสมอ"
  },
  {
    "prompt": "ข้อที่ 21: ข้อมูล 5 จำนวน ได้แก่ 4, 8, 12, 16, X ถ้าค่าเฉลี่ยเลขคณิตเท่ากับ 11 ค่า X มีค่าเท่าใด?",
    "choices": [
      "15",
      "17",
      "18",
      "20"
    ],
    "answer": 0,
    "explanation": "ผลรวม = 55. 4 ตัวแรก = 40. ดังนั้น X = 55 - 40 = <strong>15</strong>"
  },
  {
    "prompt": "ข้อที่ 22: ข้อมูล 5 จำนวน ได้แก่ 2, 4, 6, 8, 10 ค่ามัธยฐาน (Median) มีค่าเท่าใด?",
    "choices": [
      "4",
      "6",
      "8",
      "10"
    ],
    "answer": 1,
    "explanation": "มัธยฐานคือค่าตำแหน่งตรงกลาง = <strong>6</strong>"
  },
  {
    "prompt": "ข้อที่ 23: ข้อมูลชุดหนึ่งได้แก่ 3, 5, 5, 7, 9, 5, 8 ค่าฐานนิยม (Mode) คือข้อใด?",
    "choices": [
      "3",
      "5",
      "7",
      "8"
    ],
    "answer": 1,
    "explanation": "ฐานนิยมคือข้อมูลที่มีความถี่ซ้ำกันมากที่สุด = <strong>5</strong>"
  },
  {
    "prompt": "ข้อที่ 24: สี่เหลี่ยมผืนผ้ามีกว้าง 8 ซม. ยาว 15 ซม. เส้นทแยงมุมยาวกี่เซนติเมตร?",
    "choices": [
      "16 ซม.",
      "17 ซม.",
      "18 ซม.",
      "19 ซม."
    ],
    "answer": 1,
    "explanation": "พีทาโกรัส: c² = 8² + 15² = 64 + 225 = 289 -> c = <strong>17 ซม.</strong>"
  },
  {
    "prompt": "ข้อที่ 25: วงกลมที่มีรัศมี 7 ซม. จะมีพื้นที่กี่ตารางเซนติเมตร? (กำหนด π ≈ 22/7)",
    "choices": [
      "144 ตร.ซม.",
      "154 ตร.ซม.",
      "164 ตร.ซม.",
      "176 ตร.ซม."
    ],
    "answer": 1,
    "explanation": "พื้นที่ = πr² = (22/7) × 7 × 7 = <strong>154 ตร.ซม.</strong>"
  },
  {
    "prompt": "ข้อที่ 26: ลูกบาศก์มีความยาวด้านละ 3 ซม. จะมีปริมาตรกี่ลูกบาศก์เซนติเมตร?",
    "choices": [
      "18 ลบ.ซม.",
      "24 ลบ.ซม.",
      "27 ลบ.ซม.",
      "36 ลบ.ซม."
    ],
    "answer": 2,
    "explanation": "ปริมาตร = 3 × 3 × 3 = <strong>27 ลบ.ซม.</strong>"
  },
  {
    "prompt": "ข้อที่ 27: รูปสามเหลี่ยมมุมฉากมีด้านประกอบมุมฉากยาว 3 ซม. และ 4 ซม. ด้านตรงข้ามมุมฉากยาวกี่ซม.?",
    "choices": [
      "5 ซม.",
      "6 ซม.",
      "7 ซม.",
      "8 ซม."
    ],
    "answer": 0,
    "explanation": "c² = 3² + 4² = 9 + 16 = 25 -> c = <strong>5 ซม.</strong>"
  },
  {
    "prompt": "ข้อที่ 28: รูปสามเหลี่ยมมีฐานยาว 10 ซม. สูง 6 ซม. จะมีพื้นที่กี่ตารางเซนติเมตร?",
    "choices": [
      "20 ตร.ซม.",
      "30 ตร.ซม.",
      "40 ตร.ซม.",
      "60 ตร.ซม."
    ],
    "answer": 1,
    "explanation": "พื้นที่ = 1/2 × ฐาน × สูง = 1/2 × 10 × 6 = <strong>30 ตร.ซม.</strong>"
  },
  {
    "prompt": "ข้อที่ 29: ที่ดินรูปสี่เหลี่ยมผืนผ้ามีกว้าง 20 เมตร ยาว 30 เมตร วัดเส้นรอบรูปได้ยาวกี่เมตร?",
    "choices": [
      "80 เมตร",
      "100 เมตร",
      "120 เมตร",
      "600 เมตร"
    ],
    "answer": 1,
    "explanation": "เส้นรอบรูป = 2 × (20 + 30) = <strong>100 เมตร</strong>"
  },
  {
    "prompt": "ข้อที่ 30: ถังน้ำทรงกระบอกมีรัศมีฐาน 1 เมตร สูง 2 เมตร จะมีปริมาตรกี่ลูกบาศก์เมตร? (ใช้ π ≈ 3.14)",
    "choices": [
      "3.14 ลบ.ม.",
      "6.28 ลบ.ม.",
      "9.42 ลบ.ม.",
      "12.56 ลบ.ม."
    ],
    "answer": 1,
    "explanation": "ปริมาตร = πr²h = 3.14 × 1² × 2 = <strong>6.28 ลบ.ม.</strong>"
  },
  {
    "prompt": "ข้อที่ 31: นาฬิกาเดินเร็วไปวันละ 5 นาที ตั้งเวลาตรงตอนเที่ยงวันจันทร์ ถึงเที่ยงวันพฤหัสบดี นาฬิกาจะชี้เวลาเท่าใด?",
    "choices": [
      "12:10 น.",
      "12:15 น.",
      "12:20 น.",
      "12:25 น."
    ],
    "answer": 1,
    "explanation": "ระยะเวลา 3 วัน × 5 นาที = 15 นาที -> <strong>12:15 น.</strong>"
  },
  {
    "prompt": "ข้อที่ 32: เข็มนาฬิกาสั้นและยาวทำมุมกี่องศาในเวลา 3:00 น.?",
    "choices": [
      "45 องศา",
      "60 องศา",
      "90 องศา",
      "120 องศา"
    ],
    "answer": 2,
    "explanation": "เข็มสั้นชี้เลข 3 เข็มยาวชี้เลข 12 ห่างกัน 3 ช่อง = 3 × 30° = <strong>90 องศา</strong>"
  },
  {
    "prompt": "ข้อที่ 33: ถ้าวันที่ 1 มกราคม เป็นวันจันทร์ วันที่ 31 มกราคม ปีเดียวกันจะเป็นวันอะไร?",
    "choices": [
      "วันพุธ",
      "วันพฤหัสบดี",
      "วันศุกร์",
      "วันเสาร์"
    ],
    "answer": 0,
    "explanation": "31 - 1 = 30 วัน. 30 หาร 7 เหลือเศษ 2 วัน -> จันทร์ -> อังคาร -> <strong>วันพุธ</strong>"
  },
  {
    "prompt": "ข้อที่ 34: จงหาตัวเลขถัดไปของอนุกรม: <strong>1/2, 1/4, 1/8, 1/16, ?</strong>",
    "choices": [
      "1/20",
      "1/24",
      "1/32",
      "1/64"
    ],
    "answer": 2,
    "explanation": "ส่วนคูณ 2 ต่อเนื่อง: 1 / (16 × 2) = <strong>1/32</strong>"
  },
  {
    "prompt": "ข้อที่ 35: จงหาตัวเลขถัดไปของอนุกรมฟีโบนักชี: <strong>1, 1, 2, 3, 5, 8, 13, ?</strong>",
    "choices": [
      "18",
      "20",
      "21",
      "24"
    ],
    "answer": 2,
    "explanation": "บวกสองตัวหน้า: 8 + 13 = <strong>21</strong>"
  },
  {
    "prompt": "ข้อที่ 36: จงหาตัวเลขถัดไปของอนุกรมสลับ: <strong>2, 10, 4, 20, 6, 30, 8, ?</strong>",
    "choices": [
      "35",
      "40",
      "45",
      "50"
    ],
    "answer": 1,
    "explanation": "อนุกรมชุดที่สอง (10, 20, 30, ...) เพิ่มทีละ 10 -> <strong>40</strong>"
  },
  {
    "prompt": "ข้อที่ 37: จงหาตัวเลขถัดไปของอนุกรมจำนวนเฉพาะ: <strong>2, 3, 5, 7, 11, 13, ?</strong>",
    "choices": [
      "15",
      "17",
      "19",
      "21"
    ],
    "answer": 1,
    "explanation": "จำนวนเฉพาะลำดับถัดไปคือ <strong>17</strong>"
  },
  {
    "prompt": "ข้อที่ 38: จงหาตัวเลขถัดไปของอนุกรม: <strong>1, 8, 27, 64, 125, ?</strong>",
    "choices": [
      "196",
      "216",
      "243",
      "256"
    ],
    "answer": 1,
    "explanation": "อนุกรมกำลังสาม n³: 6³ = <strong>216</strong>"
  },
  {
    "prompt": "ข้อที่ 39: พ่อค้าขึ้นราคาสินค้า 10% แล้วประกาศลดราคา 10% อยากทราบว่าราคาขายใหม่เทียบกับราคาเดิมเป็นอย่างไร?",
    "choices": [
      "เท่าเดิม",
      "กำไร 1%",
      "ขาดทุน 1%",
      "ขาดทุน 2%"
    ],
    "answer": 2,
    "explanation": "100 -> 110 -> ลด 10% (11 บาท) = 99 บาท (ขาดทุน 1%)"
  },
  {
    "prompt": "ข้อที่ 40: เมืองหนึ่งมีประชากร 10,000 คน ถ้าประชากรเพิ่มขึ้นปีละ 5% ในเวลา 2 ปี จะมีประชากรกี่คน?",
    "choices": [
      "11,000 คน",
      "11,025 คน",
      "11,050 คน",
      "11,100 คน"
    ],
    "answer": 1,
    "explanation": "ปีที่ 1 = 10,500 คน. ปีที่ 2 = 10,500 × 1.05 = <strong>11,025 คน</strong>"
  },
  {
    "prompt": "ข้อที่ 41: มีถุงใส่ลูกบอลสีแดง 3 ลูก สีพลาสติกเขียว 2 ลูก หากสุ่มหยิบลูกบอล 1 ลูก ความน่าจะเป็นที่จะได้ลูกบอลสีแดงคือเท่าใด?",
    "choices": [
      "1/5",
      "2/5",
      "3/5",
      "4/5"
    ],
    "answer": 2,
    "explanation": "ความน่าจะเป็น = จำนวนผลลัพธ์ที่สนใจ / ผลลัพธ์ทั้งหมด = <strong>3/5</strong>"
  },
  {
    "prompt": "ข้อที่ 42: โยนลูกเต๋า 1 ลูก 1 ครั้ง ความน่าจะเป็นที่จะได้แต้มเป็นจำนวนคู่คือเท่าใด?",
    "choices": [
      "1/6",
      "1/3",
      "1/2",
      "2/3"
    ],
    "answer": 2,
    "explanation": "แต้มคู่มี 2, 4, 6 (3 จาก 6) = 3/6 = <strong>1/2</strong>"
  },
  {
    "prompt": "ข้อที่ 43: โยนเหรียญ 2 เหรียญพร้อมกัน ความน่าจะเป็นที่จะออกหัวทั้งสองเหรียญคือเท่าใด?",
    "choices": [
      "1/4",
      "1/2",
      "3/4",
      "1/3"
    ],
    "answer": 0,
    "explanation": "ผลลัพธ์คือ (HH, HT, TH, TT) -> ออกหัวสองเหรียญ (HH) = <strong>1/4</strong>"
  },
  {
    "prompt": "ข้อที่ 44: ในห้องเรียนมีนักเรียน 40 คน ชอบคณิตศาสตร์ 25 คน ชอบภาษาอังกฤษ 20 คน ชอบทั้งสองวิชา 10 คน มีนักเรียนกี่คนที่ไม่ชอบวิชาใดเลย?",
    "choices": [
      "3 คน",
      "5 คน",
      "7 คน",
      "10 คน"
    ],
    "answer": 1,
    "explanation": "ชอบอย่างน้อยหนึ่งวิชา = 25 + 20 - 10 = 35 คน. ไม่ชอบเลย = 40 - 35 = <strong>5 คน</strong>"
  },
  {
    "prompt": "ข้อที่ 45: จำนวนวิธีในการจัดเรียงอักษร A, B, C ในแนวเส้นตรงแบบไม่ซ้ำกัน มีกี่วิธี?",
    "choices": [
      "3 วิธี",
      "6 วิธี",
      "9 วิธี",
      "12 วิธี"
    ],
    "answer": 1,
    "explanation": "3! = 3 × 2 × 1 = <strong>6 วิธี</strong>"
  },
  {
    "prompt": "ข้อที่ 46: ค่าเฉลี่ยของเลข 1, 2, 3, 4, 5, 6, 7, 8, 9 มีค่าเท่ากับเท่าใด?",
    "choices": [
      "4",
      "5",
      "6",
      "7"
    ],
    "answer": 1,
    "explanation": "ผลรวม = 45 / 9 = <strong>5</strong>"
  },
  {
    "prompt": "ข้อที่ 47: ค่าสัมบูรณ์ของ |-15| + |10| เท่ากับเท่าใด?",
    "choices": [
      "-5",
      "5",
      "25",
      "35"
    ],
    "answer": 2,
    "explanation": "|-15| = 15, |10| = 10 -> 15 + 10 = <strong>25</strong>"
  },
  {
    "prompt": "ข้อที่ 48: ทอดลูกเต๋า 2 ลูกพร้อมกัน โอกาสที่ผลรวมของแต้มเท่ากับ 7 มีกี่กรณี?",
    "choices": [
      "4 กรณี",
      "5 กรณี",
      "6 กรณี",
      "8 กรณี"
    ],
    "answer": 2,
    "explanation": "กรณีได้ 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = <strong>6 กรณี</strong>"
  },
  {
    "prompt": "ข้อที่ 49: สี่เหลี่ยมจัตุรัสมีพื้นที่ 64 ตารางเซนติเมตร จะมีความยาวรอบรูปกี่เซนติเมตร?",
    "choices": [
      "16 ซม.",
      "24 ซม.",
      "32 ซม.",
      "64 ซม."
    ],
    "answer": 2,
    "explanation": "ความยาวด้าน = √64 = 8 ซม. เส้นรอบรูป = 8 × 4 = <strong>32 ซม.</strong>"
  },
  {
    "prompt": "ข้อที่ 50: จงหาตัวเลขถัดไปของอนุกรม: <strong>81, 27, 9, 3, ?</strong>",
    "choices": [
      "0",
      "1",
      "1/3",
      "3"
    ],
    "answer": 1,
    "explanation": "หาร 3 ต่อเนื่อง: 3 / 3 = <strong>1</strong>"
  }
,
  {
      "prompt": "ข้อที่ 51: จงหา ห.ร.ม. ของ 24, 36 และ 60",
      "choices": [
          "6",
          "8",
          "12",
          "24"
      ],
      "answer": 2,
      "explanation": "24 = 12 × 2, 36 = 12 × 3, 60 = 12 × 5 ตัวหารร่วมมากที่สุดคือ <strong>12</strong>"
  },
  {
      "prompt": "ข้อที่ 52: จงหา ค.ร.น. ของ 12, 18 และ 24",
      "choices": [
          "48",
          "72",
          "96",
          "144"
      ],
      "answer": 1,
      "explanation": "พหุคูณร่วมที่น้อยที่สุดของ 12, 18, 24 คือ <strong>72</strong> (72 ÷ 12 = 6, 72 ÷ 18 = 4, 72 ÷ 24 = 3)"
  },
  {
      "prompt": "ข้อที่ 53: มีเชือก 3 เส้น ยาว 18, 27 และ 36 เมตร ต้องการตัดเป็นเส้นยาวเท่าๆ กันโดยไม่เหลือเศษและให้ยาวที่สุด จะได้เชือกยาวเส้นละกี่เมตร",
      "choices": [
          "3 เมตร",
          "6 เมตร",
          "9 เมตร",
          "12 เมตร"
      ],
      "answer": 2,
      "explanation": "หา ห.ร.ม. ของ 18, 27, 36 = <strong>9 เมตร</strong>"
  },
  {
      "prompt": "ข้อที่ 54: นาฬิกาปลุก 3 เรือน ตั้งเวลาให้ปลุกทุกๆ 10, 15 และ 20 นาที ถ้าเริ่มปลุกพร้อมกันครั้งแรกเวลา 08:00 น. จะปลุกพร้อมกันอีกครั้งเวลาเท่าใด",
      "choices": [
          "08:30 น.",
          "08:45 น.",
          "09:00 น.",
          "09:30 น."
      ],
      "answer": 2,
      "explanation": "หา ค.ร.น. ของ 10, 15, 20 = 60 นาที (1 ชั่วโมง) ดังนั้นจะปลุกพร้อมกันเวลา 08:00 + 1 ชม. = <strong>09:00 น.</strong>"
  },
  {
      "prompt": "ข้อที่ 55: เข็มสั้นและเข็มยาวของนาฬิกาทำมุมกี่องศา ณ เวลา 03:30 น.",
      "choices": [
          "60 องศา",
          "75 องศา",
          "90 องศา",
          "105 องศา"
      ],
      "answer": 1,
      "explanation": "เวลา 03:30 น. เข็มยาวชี้เลข 6 (180°), เข็มสั้นชี้กึ่งกลางระหว่างเลข 3 กับ 4 (105°) ผลต่างมุม = 180° - 105° = <strong>75 องศา</strong>"
  },
  {
      "prompt": "ข้อที่ 56: เข็มสั้นและเข็มยาวของนาฬิกาทำมุมกี่องศา ณ เวลา 09:00 น.",
      "choices": [
          "45 องศา",
          "90 องศา",
          "120 องศา",
          "180 องศา"
      ],
      "answer": 1,
      "explanation": "เวลา 09:00 น. เข็มยาวชี้เลข 12 เข็มสั้นชี้เลข 9 ทำมุมฉากเท่ากับ <strong>90 องศา</strong>"
  },
  {
      "prompt": "ข้อที่ 57: ถ้าวันที่ 15 พฤษภาคม เป็นวันอังคาร แล้ววันที่ 12 มิถุนายน ปีเดียวกันจะเป็นวันอะไร",
      "choices": [
          "วันจันทร์",
          "วันอังคาร",
          "วันพุธ",
          "วันพฤหัสบดี"
      ],
      "answer": 1,
      "explanation": "เดือนพฤษภาคมมี 31 วัน จาก 15 พ.ค. ถึง 12 มิ.ย. คิดเป็น (31-15) + 12 = 28 วัน (หาร 7 ลงตัว 4 สัปดาห์พอดี) จึงเป็น <strong>วันอังคาร</strong>"
  },
  {
      "prompt": "ข้อที่ 58: พ.ศ. ใดต่อไปนี้เป็นปีอธิกสุรทิน (มี 366 วัน เดือนกุมภาพันธ์มี 29 วัน)",
      "choices": [
          "พ.ศ. 2565",
          "พ.ศ. 2566",
          "พ.ศ. 2567",
          "พ.ศ. 2568"
      ],
      "answer": 2,
      "explanation": "พ.ศ. 2567 ตรงกับ ค.ศ. 2024 ซึ่งเป็นปีที่หารด้วย 4 ลงตัว มี 366 วัน (กุมภาพันธ์มี 29 วัน) จึงเป็น <strong>ปีอธิกสุรทิน</strong>"
  },
  {
      "prompt": "ข้อที่ 59: จำนวนเต็มบวก 3 จำนวนเรียงกัน มีผลรวมเท่ากับ 72 จำนวนที่มากที่สุดคือจำนวนใด",
      "choices": [
          "23",
          "24",
          "25",
          "26"
      ],
      "answer": 2,
      "explanation": "ให้จำนวนกลางคือ x จะได้ (x-1) + x + (x+1) = 72 → 3x = 72 → x = 24 จำนวนมากสุดคือ 24 + 1 = <strong>25</strong>"
  },
  {
      "prompt": "ข้อที่ 60: ปัจจุบันพ่อมีอายุเป็น 4 เท่าของลูก อีก 10 ปีข้างหน้า พ่อจะมีอายุเป็น 2.5 เท่าของลูก ปัจจุบันลูกมีอายุกี่ปี",
      "choices": [
          "8 ปี",
          "10 ปี",
          "12 ปี",
          "15 ปี"
      ],
      "answer": 1,
      "explanation": "ลูกอายุ x ปี พ่ออายุ 4x ปี สมการ: 4x + 10 = 2.5(x + 10) → 4x + 10 = 2.5x + 25 → 1.5x = 15 → x = <strong>10 ปี</strong>"
  },
  {
      "prompt": "ข้อที่ 61: มีเหรียญห้าบาทและเหรียญสิบบาทรวมกัน 30 เหรียญ คิดเป็นเงินรวม 220 บาท มีเหรียญสิบบาทกี่เหรียญ",
      "choices": [
          "12 เหรียญ",
          "14 เหรียญ",
          "16 เหรียญ",
          "18 เหรียญ"
      ],
      "answer": 1,
      "explanation": "ให้เหรียญสิบบาทมี x เหรียญ เหรียญห้าบาทมี (30-x) เหรียญ สมการ: 10x + 5(30-x) = 220 → 5x + 150 = 220 → 5x = 70 → x = <strong>14 เหรียญ</strong>"
  },
  {
      "prompt": "ข้อที่ 62: จงหาตัวเลขถัดไปของอนุกรม: <strong>2, 5, 10, 17, 26, 37, ?</strong>",
      "choices": [
          "48",
          "50",
          "52",
          "54"
      ],
      "answer": 1,
      "explanation": "อนุกรม n² + 1: 1²+1=2, 2²+1=5, 3²+1=10, ..., 7²+1 = <strong>50</strong>"
  },
  {
      "prompt": "ข้อที่ 63: จงหาตัวเลขถัดไปของอนุกรม: <strong>3, 6, 12, 24, 48, ?</strong>",
      "choices": [
          "72",
          "84",
          "96",
          "108"
      ],
      "answer": 2,
      "explanation": "อนุกรมคูณ 2 ต่อเนื่อง: 48 × 2 = <strong>96</strong>"
  },
  {
      "prompt": "ข้อที่ 64: จงหาตัวเลขถัดไปของอนุกรม: <strong>1, 8, 27, 64, 125, ?</strong>",
      "choices": [
          "180",
          "196",
          "216",
          "243"
      ],
      "answer": 2,
      "explanation": "อนุกรมกำลังสาม n³: 6³ = <strong>216</strong>"
  },
  {
      "prompt": "ข้อที่ 65: จงหาตัวเลขถัดไปของอนุกรม: <strong>10, 13, 19, 28, 40, ?</strong>",
      "choices": [
          "52",
          "55",
          "58",
          "60"
      ],
      "answer": 1,
      "explanation": "ระยะห่างเพิ่มขึ้นทีละ 3 (+3, +6, +9, +12, +15): 40 + 15 = <strong>55</strong>"
  },
  {
      "prompt": "ข้อที่ 66: ขายสินค้า 4,500 บาท ได้กำไร 25% อยากทราบว่าราคาทุนของสินค้าชิ้นนี้คือกี่บาท",
      "choices": [
          "3,200 บาท",
          "3,500 บาท",
          "3,600 บาท",
          "3,800 บาท"
      ],
      "answer": 2,
      "explanation": "ราคาทุน = ราคาขาย ÷ 1.25 = 4,500 ÷ 1.25 = <strong>3,600 บาท</strong>"
  },
  {
      "prompt": "ข้อที่ 67: เสื้อติดราคาไว้ 1,200 บาท ประกาศลดราคา 15% จะต้องจ่ายเงินซื้อเสื้อกี่บาท",
      "choices": [
          "980 บาท",
          "1,020 บาท",
          "1,050 บาท",
          "1,080 บาท"
      ],
      "answer": 1,
      "explanation": "ราคาจ่ายจริง = 1,200 × (1 - 0.15) = 1,200 × 0.85 = <strong>1,020 บาท</strong>"
  },
  {
      "prompt": "ข้อที่ 68: คนงาน 4 คน ทำงานชิ้นหนึ่งเสร็จใน 15 วัน ถ้าต้องการให้งานเสร็จภายใน 6 วัน ต้องใช้คนงานทั้งหมดกี่คน",
      "choices": [
          "8 คน",
          "10 คน",
          "12 คน",
          "15 คน"
      ],
      "answer": 1,
      "explanation": "ปริมาณงาน = 4 × 15 = 60 คน-วัน ต้องใช้คนงาน = 60 ÷ 6 = <strong>10 คน</strong>"
  },
  {
      "prompt": "ข้อที่ 69: รถยนต์ขับด้วยความเร็วคงที่ 90 กม./ชม. ในเวลา 40 นาที จะได้ระยะทางกี่กิโลเมตร",
      "choices": [
          "50 กม.",
          "55 กม.",
          "60 กม.",
          "65 กม."
      ],
      "answer": 2,
      "explanation": "ระยะทาง = ความเร็ว × เวลา = 90 × (40/60) = <strong>60 กิโลเมตร</strong>"
  },
  {
      "prompt": "ข้อที่ 70: ค่าเฉลี่ยเลขคณิตของข้อมูลชุดนี้: 12, 16, 20, 24, 28 เท่ากับเท่าใด",
      "choices": [
          "18",
          "20",
          "22",
          "24"
      ],
      "answer": 1,
      "explanation": "ผลรวม = 100, จำนวนข้อมูล = 5 ค่าเฉลี่ย = 100 ÷ 5 = <strong>20</strong>"
  },
  {
      "prompt": "ข้อที่ 71: สุ่มหยิบไพ่ 1 ใบจากสำรับไพ่มาตรฐาน 52 ใบ โอกาสที่จะได้ไพ่ป๊อกดำ (Ace of Spades) เท่ากับเท่าใด",
      "choices": [
          "1/52",
          "1/13",
          "1/4",
          "4/52"
      ],
      "answer": 0,
      "explanation": "ไพ่ป๊อกดำมีเพียง 1 ใบจากทั้งหมด 52 ใบ ความน่าจะเป็นคือ <strong>1/52</strong>"
  },
  {
      "prompt": "ข้อที่ 72: สามเหลี่ยมมุมฉากมีด้านประกอบมุมฉากยาว 6 ซม. และ 8 ซม. ด้านตรงข้ามมุมฉากยาวกี่เซนติเมตร",
      "choices": [
          "9 ซม.",
          "10 ซม.",
          "12 ซม.",
          "14 ซม."
      ],
      "answer": 1,
      "explanation": "ทฤษฎีบทพีทาโกรัส: c² = 6² + 8² = 36 + 64 = 100 → c = <strong>10 ซม.</strong>"
  },
  {
      "prompt": "ข้อที่ 73: วงกลมมีเส้นผ่านศูนย์กลาง 14 ซม. จะมีพื้นที่กี่ตารางเซนติเมตร (ใช้ π = 22/7)",
      "choices": [
          "132 ตร.ซม.",
          "144 ตร.ซม.",
          "154 ตร.ซม.",
          "176 ตร.ซม."
      ],
      "answer": 2,
      "explanation": "รัศมี r = 7 ซม. พื้นที่ = πr² = (22/7) × 7 × 7 = <strong>154 ตารางเซนติเมตร</strong>"
  },
  {
      "prompt": "ข้อที่ 74: ผลคูณของ ห.ร.ม. และ ค.ร.น. ของเลขสองจำนวนเท่ากับ 180 ถ้าจำนวนหนึ่งคือ 12 อีกจำนวนหนึ่งเท่ากับเท่าใด",
      "choices": [
          "15",
          "18",
          "20",
          "24"
      ],
      "answer": 0,
      "explanation": "สูตร A × B = ห.ร.ม. × ค.ร.น. → 12 × B = 180 → B = 180 ÷ 12 = <strong>15</strong>"
  },
  {
      "prompt": "ข้อที่ 75: จงหาตัวเลขถัดไปของอนุกรม: <strong>100, 99, 95, 86, 70, ?</strong>",
      "choices": [
          "45",
          "48",
          "50",
          "55"
      ],
      "answer": 0,
      "explanation": "ลดลงด้วยกำลังสอง (-1², -2², -3², -4², -5²): 70 - 25 = <strong>45</strong>"
  }
,
];
const VERBAL_QUESTIONS = [
  {
    "prompt": "ข้อที่ 1: อุปมาอุปไมย: <strong>\"ปากกา : เขียน\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "มีด : หั่น",
      "หนังสือ : อ่าน",
      "รองเท้า : ถุงเท้า",
      "แว่นตา : สดใส"
    ],
    "answer": 0,
    "explanation": "ปากกาเป็นอุปกรณ์สำหรับเขียน เช่นเดียวกับ มีด เป็นอุปกรณ์สำหรับหั่น"
  },
  {
    "prompt": "ข้อที่ 2: ข้อใดเป็นคำที่สะกดถูกต้องทุกคำตามหลักราชบัณฑิตยสภา?",
    "choices": [
      "อนุญาต, กราฟฟิก, สังเกต",
      "อนุญาต, กราฟิก, สังเกต",
      "อนุญาติ, กราฟิก, สังเกตุ",
      "อนุญาต, กราฟฟิค, สังเกตุ"
    ],
    "answer": 1,
    "explanation": "อนุญาต (ไม่มีสระอิ), สังเกต (ไม่มีสระอุ), กราฟิก (ใช้ ก ตัวเดียว)"
  },
  {
    "prompt": "ข้อที่ 3: ข้อใดไม่เข้าพวกกับกลุ่มมากที่สุด?",
    "choices": [
      "ดาวพุธ",
      "ดาวศุกร์",
      "ดาวอังคาร",
      "ดวงจันทร์"
    ],
    "answer": 3,
    "explanation": "ดาวพุธ ดาวศุกร์ ดาวอังคาร เป็นดาวเคราะห์ ส่วน ดวงจันทร์ เป็นดาวบริวาร"
  },
  {
    "prompt": "ข้อที่ 4: คำตรงข้ามของคำว่า <strong>\"สุขุม\"</strong> คือข้อใด?",
    "choices": [
      "รอบคอบ",
      "ลุกลี้ลุกลน",
      "เครียด",
      "เงียบขรึม"
    ],
    "answer": 1,
    "explanation": "สุขุม แปลว่า เรียบร้อย รอบคอบ เยือกเย็น ตรงข้ามกับ ลุกลี้ลุกลน"
  },
  {
    "prompt": "ข้อที่ 5: \"กฟผ. มุ่งมั่นสร้างความมั่นคงทางพลังงานไฟฟ้า ควบคู่กับการดูแลสิ่งแวดล้อมและสังคม\" ใจความสำคัญคือข้อใด?",
    "choices": [
      "กฟผ. เน้นผลิตไฟฟ้าปริมาณมากที่สุด",
      "กฟผ. พัฒนาพลังงานพร้อมรับผิดชอบต่อสิ่งแวดล้อมและสังคม",
      "สิ่งแวดล้อมเป็นเป้าหมายเดียวของ กฟผ.",
      "กฟผ. ยกเลิกการใช้เชื้อเพลิงฟอสซิลทั้งหมด"
    ],
    "answer": 1,
    "explanation": "ใจความสำคัญครอบคลุมทั้งมิติความมั่นคงทางพลังงานและการดูแลสิ่งแวดล้อมสังคม"
  },
  {
    "prompt": "ข้อที่ 6: อุปมาอุปไมย: <strong>\"หมอ : โรงพยาบาล\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "ครู : โรงเรียน",
      "ตำรวจ : ปืน",
      "พ่อค้า : ตลาดนัด",
      "นักบิน : ท้องฟ้า"
    ],
    "answer": 0,
    "explanation": "หมอ ปฏิบัติงานที่ โรงพยาบาล เช่นเดียวกับ ครู ปฏิบัติงานที่ โรงเรียน"
  },
  {
    "prompt": "ข้อที่ 7: อุปมาอุปไมย: <strong>\"ขยัน : สำเร็จ\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "ประมาท : ผิดพลาด",
      "ฉลาด : อ่านหนังสือ",
      "ร่ำรวย : ทำงาน",
      "ออกกำลังกาย : แข็งแรง"
    ],
    "answer": 0,
    "explanation": "ความขยัน ส่งผลให้เกิด ความสำเร็จ เช่นเดียวกับ ความประมาท ส่งผลให้เกิด ความผิดพลาด"
  },
  {
    "prompt": "ข้อที่ 8: ข้อใดสะกดคำว่า <strong>\"สัมภาษณ์\"</strong> และ <strong>\"ประสบการณ์\"</strong> ได้ถูกต้องที่สุด?",
    "choices": [
      "สัมภาษณ์, ประสบการณ์",
      "สัมภาษต์, ประสบการ",
      "สัมพาสน์, ประสบการณ์",
      "สัมภาษณ์, ประสบการณ"
    ],
    "answer": 0,
    "explanation": "สัมภาษณ์ ใช้ ษ และ ณ ก์ ส่วน ประสบการณ์ ใช้ ณ ก์ สะกดถูกต้อง"
  },
  {
    "prompt": "ข้อที่ 9: เลือกคำที่ไม่เข้าพวกจากกลุ่มต่อไปนี้: <strong>\"สิงโต, เสือ, แมว, ช้าง\"</strong>",
    "choices": [
      "สิงโต",
      "เสือ",
      "แมว",
      "ช้าง"
    ],
    "answer": 3,
    "explanation": "สิงโต เสือ แมว อยู่ในตระกูลเสือและแมว (Felidae) ส่วน ช้าง ไม่ใช่"
  },
  {
    "prompt": "ข้อที่ 10: คำที่มีความหมายตรงข้ามกับคำว่า <strong>\"มัธยัสถ์\"</strong> คือข้อใด?",
    "choices": [
      "ประหยัด",
      "ตระหนี่",
      "สุรุ่ยสุร่าย",
      "รอบคอบ"
    ],
    "answer": 2,
    "explanation": "มัธยัสถ์ แปลว่า ประหยัดใช้จ่ายพอเหมาะ ตรงข้ามกับ สุรุ่ยสุร่าย"
  },
  {
    "prompt": "ข้อที่ 11: คำว่า <strong>\"บูรณาการ\"</strong> มีความหมายตรงกับข้อใดมากที่สุด?",
    "choices": [
      "การทำลายโครงสร้างเดิม",
      "การนำองค์ความรู้หลายด้านมารวมเข้าด้วยกันอย่างกลมกลืน",
      "การแยกส่วนประกอบออกเป็นชิ้นๆ",
      "การเลียนแบบผลงานผู้อื่น"
    ],
    "answer": 1,
    "explanation": "บูรณาการ (Integration) หมายถึง การผสมผสานเชื่อมโยงสาระความรู้เข้าด้วยกัน"
  },
  {
    "prompt": "ข้อที่ 12: ข้อใดเขียนสะกดคำ **ผิด**?",
    "choices": [
      "โน้ตบุ๊ก",
      "รสชาต",
      "สัมปทาน",
      "ศีรษะ"
    ],
    "answer": 1,
    "explanation": "คำว่า \"รสชาติ\" ต้องมี สระอิ (ติ) คำว่า รสชาต สะกดผิด"
  },
  {
    "prompt": "ข้อที่ 13: อุปมาอุปไมย: <strong>\"ปอด : หายใจ\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "หัวใจ : สูบฉีดเลือด",
      "ตับ : ย่อยอาหาร",
      "สมอง : ฟังเสียง",
      "ตา : ดมกลิ่น"
    ],
    "answer": 0,
    "explanation": "ปอด ทำหน้าที่ หายใจ เช่นเดียวกับ หัวใจ ทำหน้าที่ สูบฉีดเลือด"
  },
  {
    "prompt": "ข้อที่ 14: อุปมาอุปไมย: <strong>\"เรือ : พาย\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "รถยนต์ : พวงมาลัย",
      "จักรยาน : ถีบ",
      "เครื่องบิน : ปีก",
      "ม้า : อาน"
    ],
    "answer": 1,
    "explanation": "เรือ เคลื่อนที่ด้วยการ พาย เช่นเดียวกับ จักรยาน เคลื่อนที่ด้วยการ ถีบ"
  },
  {
    "prompt": "ข้อที่ 15: ในการย่อความบทความ สิ่งที่ไม่ควรนำมาใส่ในข้อความย่อคือข้อใด?",
    "choices": [
      "ประเด็นหลัก",
      "ข้อสรุป",
      "ตัวอย่างและรายละเอียดขยายความ",
      "ชื่อผู้แต่ง"
    ],
    "answer": 2,
    "explanation": "การย่อความต้องตัดตัวอย่างและรายละเอียดขยายความออก คงไว้เฉพาะใจความสำคัญ"
  },
  {
    "prompt": "ข้อที่ 16: อุปมาอุปไมย: <strong>\"ดวงอาทิตย์ : กลางวัน\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "ดวงจันทร์ : กลางคืน",
      "ฝน : ลม",
      "ดาว : ท้องฟ้า",
      "เมฆ : เงา"
    ],
    "answer": 0,
    "explanation": "ดวงอาทิตย์ ปรากฏในเวลากลางวัน เช่นเดียวกับ ดวงจันทร์ ปรากฏในเวลากลางคืน"
  },
  {
    "prompt": "ข้อที่ 17: อุปมาอุปไมย: <strong>\"เทอร์โมมิเตอร์ : อุณหภูมิ\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "นาฬิกา : เวลา",
      "ไม้บรรทัด : ความหนัก",
      "ตราชั่ง : ความยาว",
      "เข็มทิศ : ความเร็ว"
    ],
    "answer": 0,
    "explanation": "เทอร์โมมิเตอร์ ใช้ใช้วัด อุณหภูมิ เช่นเดียวกับ นาฬิกา ใช้ใช้วัด เวลา"
  },
  {
    "prompt": "ข้อที่ 18: ข้อใดเป็นคำสะกดถูกต้องตามหลักภาษาไทย?",
    "choices": [
      "กะทัดรัด",
      "กระทันหัน",
      "สังเกตุ",
      "อนุญาติ"
    ],
    "answer": 0,
    "explanation": "กะทัดรัด สะกดถูกต้อง (กะ ไม่ต้องมี ร กล้ำ, กะทันหัน สะกด กะทันหัน)"
  },
  {
    "prompt": "ข้อที่ 19: คำที่มีความหมายเหมือนกับคำว่า <strong>\"ถาวร\"</strong> คือข้อใด?",
    "choices": [
      "ยั่งยืน",
      "ชั่วคราว",
      "ประดิดประดอย",
      "ชั่วครู่"
    ],
    "answer": 0,
    "explanation": "ถาวร มีความหมายเหมือนกับ ยั่งยืน หรือ มั่นคงคงทน"
  },
  {
    "prompt": "ข้อที่ 20: คำว่า <strong>\"กตัญญู\"</strong> ตรงข้ามกับคำใด?",
    "choices": [
      "เนรคุณ",
      "ใจแคบ",
      "ตระหนี่",
      "เกียจคร้าน"
    ],
    "answer": 0,
    "explanation": "กตัญญู หมายถึง รู้คุณ ตรงข้ามกับ เนรคุณ (อกตัญญู)"
  },
  {
    "prompt": "ข้อที่ 21: เลือกคำที่ไม่เข้าพวก: <strong>\"เก้าอี้, โซฟา, ม้านั่ง, รถยนต์\"</strong>",
    "choices": [
      "เก้าอี้",
      "โซฟา",
      "ม้านั่ง",
      "รถยนต์"
    ],
    "answer": 3,
    "explanation": "เก้าอี้ โซฟา ม้านั่ง เป็นเฟอร์นิเจอร์สำหรับนั่ง ส่วน รถยนต์ เป็นยานพาหนะ"
  },
  {
    "prompt": "ข้อที่ 22: เลือกคำที่ไม่เข้าพวก: <strong>\"กุหลาบ, มะลิ, กล้วยไม้, กะหล่ำปลี\"</strong>",
    "choices": [
      "กุหลาบ",
      "มะลิ",
      "กล้วยไม้",
      "กะหล่ำปลี"
    ],
    "answer": 3,
    "explanation": "กุหลาบ มะลิ กล้วยไม้ เป็นดอกไม้ ส่วน กะหล่ำปลี เป็นผัก"
  },
  {
    "prompt": "ข้อที่ 23: คำว่า <strong>\"วิวัฒนาการ\"</strong> มีความหมายตรงกับข้อใดมากที่สุด?",
    "choices": [
      "การเปลี่ยนแปลงพัฒนาไปสู่สภาพที่ดีขึ้นตามลำดับ",
      "การย้อนกลับไปสู่จุดเริ่มต้น",
      "การทำลายสิ่งเก่าทั้งหมด",
      "การหยุดนิ่งไม่เปลี่ยนแปลง"
    ],
    "answer": 0,
    "explanation": "วิวัฒนาการ หมายถึง การเปลี่ยนแปลงเจริญก้าวหน้าไปตามลำดับ"
  },
  {
    "prompt": "ข้อที่ 24: คำว่า <strong>\"อคติ\"</strong> หมายถึงข้อใด?",
    "choices": [
      "ความลำเอียง",
      "ความยุติธรรม",
      "ความซื่อสัตย์",
      "ความเกรงใจ"
    ],
    "answer": 0,
    "explanation": "อคติ หมายถึง ความลำเอียง ไม่เที่ยงธรรม"
  },
  {
    "prompt": "ข้อที่ 25: อุปมาอุปไมย: <strong>\"กุญแจ : แม่กุญแจ\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "ปลั๊กไฟ : เต้ารับ",
      "มีด : เขียง",
      "ถุงเท้า : รองเท้า",
      "ปากกา : กระดาษ"
    ],
    "answer": 0,
    "explanation": "กุญแจ ต้องใช้คู่กับ แม่กุญแจ (ของเข้าคู่ล็อกกัน) เช่นเดียวกับ ปลั๊กไฟ คู่กับ เต้ารับ"
  },
  {
    "prompt": "ข้อที่ 26: อุปมาอุปไมย: <strong>\"เมล็ดพืช : ต้นไม้\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "ไข่ : แม่ไก่",
      "ลูกอ๊อด : กบ",
      "ทารก : ผู้ใหญ่",
      "ตัวหนอน : ผีเสื้อ"
    ],
    "answer": 3,
    "explanation": "เจริญเติบโตเปลี่ยนรูปร่างตามวงจรชีวิต: เมล็ดพืช -> ต้นไม้ เช่นเดียวกับ ตัวหนอน -> ผีเสื้อ"
  },
  {
    "prompt": "ข้อที่ 27: ข้อใดเป็นสะกดคำว่า <strong>\"ลำไย\"</strong> ได้ถูกต้อง?",
    "choices": [
      "ลำไย",
      "ลำใย",
      "รำไย",
      "รำใย"
    ],
    "answer": 0,
    "explanation": "ลำไย ใช้ ไม้มลาย (ไ) สะกดถูกต้อง"
  },
  {
    "prompt": "ข้อที่ 28: สำนวนไทย <strong>\"ขี่ช้างจับตักแตน\"</strong> มีความหมายว่าอย่างไร?",
    "choices": [
      "ลงทุนมากแต่ได้ผลผลิตน้อย",
      "ทำเรื่องเล็กให้เป็นเรื่องใหญ่",
      "มีความพยายามสูง",
      "ทำลายทรัพยากรธรรมชาติ"
    ],
    "answer": 0,
    "explanation": "ขี่ช้างจับตักแตน หมายถึง ลงทุนหรือทำงานใหญ่โตแต่ได้ผลประโยชน์เพียงนิดเดียว"
  },
  {
    "prompt": "ข้อที่ 29: คำตรงข้ามของคำว่า <strong>\"ประณีต\"</strong> คือข้อใด?",
    "choices": [
      "หยาบ",
      "เรียบ",
      "สวยงาม",
      "แข็งแรง"
    ],
    "answer": 0,
    "explanation": "ประณีต หมายถึง ละเอียด เรียบร้อย ตรงข้ามกับ หยาบ"
  },
  {
    "prompt": "ข้อที่ 30: คำว่า <strong>\"เอกภาพ\"</strong> หมายถึงข้อใด?",
    "choices": [
      "ความเป็นหนึ่งเดียวกัน",
      "ความหลากหลาย",
      "ความแตกแยก",
      "ความซับซ้อน"
    ],
    "answer": 0,
    "explanation": "เอกภาพ หมายถึง ความเป็นอันหนึ่งอันเดียวกัน รวมเป็นน้ำหนึ่งใจเดียวกัน"
  },
  {
    "prompt": "ข้อที่ 31: อุปมาอุปไมย: <strong>\"กรรไกร : ตัด\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "เข็ม : เย็บ",
      "กาว : ทา",
      "ค้อน : ตี",
      "ถูกทุกข้อ"
    ],
    "answer": 3,
    "explanation": "อุปกรณ์ : หน้าที่การใช้งาน ถูกทุกข้อ"
  },
  {
    "prompt": "ข้อที่ 32: คำสะกดในข้อใดถูกต้องตามพจนานุกรม?",
    "choices": [
      "ศีรษะ",
      "ศรีษะ",
      "ศิรษะ",
      "ศีรษะห์"
    ],
    "answer": 0,
    "explanation": "ศีรษะ (สระอี อยู่บน ศ ศาลา) สะกดถูกต้อง"
  },
  {
    "prompt": "ข้อที่ 33: เลือกคำที่ไม่เข้าพวก: <strong>\"ทองคำ, เงิน, ทองแดง, ออกซิเจน\"</strong>",
    "choices": [
      "ทองคำ",
      "เงิน",
      "ทองแดง",
      "ออกซิเจน"
    ],
    "answer": 3,
    "explanation": "ทองคำ เงิน ทองแดง เป็นโลหะ ส่วน ออกซิเจน เป็นแก๊ส"
  },
  {
    "prompt": "ข้อที่ 34: คำตรงข้ามของคำว่า <strong>\"สันติ\"</strong> คือข้อใด?",
    "choices": [
      "สงคราม",
      "ความสงบ",
      "ความเจริญ",
      "ความสามัคคี"
    ],
    "answer": 0,
    "explanation": "สันติ หมายถึง ความสงบราบรื่น ตรงข้ามกับ สงคราม (ความขัดแย้ง)"
  },
  {
    "prompt": "ข้อที่ 35: \"นวัตกรรมพลังงานสะอาดช่วยลดการปล่อยก๊าซเรือนกระจกและชะลอโลกร้อน\" สรุปสาระสำคัญได้ตามข้อใด?",
    "choices": [
      "พลังงานสะอาดช่วยบรรเทาปัญหาโลกร้อน",
      "ก๊าซเรือนกระจกเพิ่มขึ้นเพราะนวัตกรรม",
      "โลกร้อนไม่เกี่ยวข้องกับพลังงาน",
      "นวัตกรรมทำให้ราคาพลังงานแพงขึ้น"
    ],
    "answer": 0,
    "explanation": "สาระสำคัญคือพลังงานสะอาดลดก๊าซเรือนกระจกเพื่อช่วยบรรเทาภาวะโลกร้อน"
  },
  {
    "prompt": "ข้อที่ 36: อุปมาอุปไมย: <strong>\"เมฆ : ฝน\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "ควัน : ไฟ",
      "ลม : พายุ",
      "ฟ้าแลบ : ฟ้าร้อง",
      "แสง : เงา"
    ],
    "answer": 0,
    "explanation": "เมฆ ก่อตัวส่งผลให้เกิด ฝน (สาเหตุ/จุดเริ่มต้น : ผลลัพธ์) เช่นเดียวกับ ควัน เกิดจาก ไฟ"
  },
  {
    "prompt": "ข้อที่ 37: ข้อใดสะกดคำว่า <strong>\"ศีลธรรม\"</strong> ได้ถูกต้อง?",
    "choices": [
      "ศีลธรรม",
      "ศีณธรรม",
      "สิลธรรม",
      "ศีลธรม"
    ],
    "answer": 0,
    "explanation": "ศีลธรรม สะกดถูกต้อง"
  },
  {
    "prompt": "ข้อที่ 38: คำที่มีความหมายตรงข้ามกับ <strong>\"โปร่งใส\"</strong> ในบริบทการบริหารงานคือข้อใด?",
    "choices": [
      "ทุจริตเคลือบแฝง",
      "ตรงไปตรงมา",
      "เปิดเผยข้อมูล",
      "ชัดเจนตรวจสอบได้"
    ],
    "answer": 0,
    "explanation": "โปร่งใส หมายถึง ตรวจสอบได้ ชัดเจน เปิดเผย ตรงข้ามกับ ทุจริตเคลือบแฝง"
  },
  {
    "prompt": "ข้อที่ 39: คำว่า <strong>\"นวัตกรรม\"</strong> (Innovation) หมายถึงข้อใด?",
    "choices": [
      "การคิดค้นหรือปรับปรุงสิ่งใหม่ที่นำไปใช้ประโยชน์ได้จริง",
      "การเลียนแบบสิ่งที่มีอยู่เดิม",
      "การย้อนกลับไปใช้เทคโนโลยีโบราณ",
      "การบันทึกประวัติศาสตร์"
    ],
    "answer": 0,
    "explanation": "นวัตกรรม หมายถึง สิ่งใหม่ที่เกิดจากการใช้ความรู้สร้างสรรค์และนำไปใช้ประโยชน์ได้"
  },
  {
    "prompt": "ข้อที่ 40: สำนวน <strong>\"น้ำขึ้นให้รีบตัก\"</strong> มีความหมายตรงกับข้อใด?",
    "choices": [
      "เมื่อมีโอกาสดีเข้ามาควรรีบฉวยทำทันที",
      "การช่วยเหลือกรรมกรประหยัดน้ำ",
      "การเตรียมพร้อมรับน้ำท่วม",
      "การทำงานอย่างใจเย็น"
    ],
    "answer": 0,
    "explanation": "น้ำขึ้นให้รีบตัก หมายถึง เมื่อมีโอกาสดีเข้ามาควรรีบทำทันที"
  },
  {
    "prompt": "ข้อที่ 41: เลือกคำที่ไม่เข้าพวก: <strong>\"วิ่ง, เดิน, กระโดด, ความคิด\"</strong>",
    "choices": [
      "วิ่ง",
      "เดิน",
      "กระโดด",
      "ความคิด"
    ],
    "answer": 3,
    "explanation": "วิ่ง เดิน กระโดด เป็นกริยาการเคลื่อนไหวทางร่างกาย ส่วน ความคิด เป็นนามนัยน์นาม"
  },
  {
    "prompt": "ข้อที่ 42: อุปมาอุปไมย: <strong>\"แว่นตา : สายตา\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "เครื่องช่วยฟัง : การได้ยิน",
      "รองเท้า : มือ",
      "หมวก : ท้อง",
      "เสื้อ : รองเท้า"
    ],
    "answer": 0,
    "explanation": "แว่นตา ช่วยเสริมประสาทสัมผัส สายตา เช่นเดียวกับ เครื่องช่วยฟัง ช่วยการได้ยิน"
  },
  {
    "prompt": "ข้อที่ 43: คำสะกดในข้อใดถูกต้องตามหลักทับศัพท์?",
    "choices": [
      "เว็บบล็อก",
      "เว็บบล็อกก์",
      "เว็บโบลก",
      "เว็บบล็อกก"
    ],
    "answer": 0,
    "explanation": "เว็บบล็อก (Weblog) สะกดถูกต้อง"
  },
  {
    "prompt": "ข้อที่ 44: คำว่า <strong>\"เสถียรภาพ\"</strong> หมายถึงข้อใด?",
    "choices": [
      "ความมั่นคงคงที่",
      "ความผันผวนไม่อยู่กับที่",
      "ความล้มเหลว",
      "ความรวดเร็วเกินไป"
    ],
    "answer": 0,
    "explanation": "เสถียรภาพ หมายถึง ความมั่นคง ราบรื่น ไม่เปลี่ยนแปลงผันผวนง่าย"
  },
  {
    "prompt": "ข้อที่ 45: ข้อความใดเป็น <strong>\"ข้อเท็จจริง\"</strong> (Fact)?",
    "choices": [
      "กฟผ. ผลิตไฟฟ้าเพื่อความมั่นคงของประเทศไทย",
      "สีฟ้าเป็นสีที่สวยที่สุดในโลก",
      "วิชานี้เรียนยากมาก",
      "อาหารจานนี้อร่อยที่สุด"
    ],
    "answer": 0,
    "explanation": "การที่ กฟผ. ผลิตไฟฟ้า เป็นข้อเท็จจริงที่พิสูจน์ตรวจสอบได้ ส่วนข้ออื่นเป็นข้อคิดเห็นส่วนตัว"
  },
  {
    "prompt": "ข้อที่ 46: อุปมาอุปไมย: <strong>\"หนังสือ : ห้องทอดแทรก/ทบทวน\"</strong> มีความสัมพันธ์เหมือนข้อใด?",
    "choices": [
      "ยารักษาโรค : สุขภาพ",
      "มีด : หั่น",
      "รองเท้า : เท้า",
      "ถูกทุกข้อ"
    ],
    "answer": 0,
    "explanation": "หนังสือ ช่วยพัฒนาความรู้/การเรียน เช่นเดียวกับ ยารักษาโรค ช่วยบำรุงสุขภาพ"
  },
  {
    "prompt": "ข้อที่ 47: ข้อใดสะกดคำว่า <strong>\"นโยบาย\"</strong> ได้ถูกต้อง?",
    "choices": [
      "นโยบาย",
      "นโยบายน์",
      "นโยบายย์",
      "นโยบาย์"
    ],
    "answer": 0,
    "explanation": "นโยบาย สะกดถูกต้อง"
  },
  {
    "prompt": "ข้อที่ 48: คำว่า <strong>\"วิเคราะห์\"</strong> มีความหมายตรงกับข้อใด?",
    "choices": [
      "การแยกแยะออกเป็นส่วนๆ เพื่อทำความเข้าใจ",
      "การรวบรวมผสมผสานเข้าด้วยกัน",
      "การคาดเดาโดยไม่มีหลักฐาน",
      "การปฏิเสธข้อเท็จจริง"
    ],
    "answer": 0,
    "explanation": "วิเคราะห์ (Analysis) หมายถึง การพิจารณาแยกแยะออกเป็นส่วนย่อยเพื่อศึกษาทำความเข้าใจ"
  },
  {
    "prompt": "ข้อที่ 49: สำนวน <strong>\"เกี่ยวข้าวใส่เหล้า\"</strong> หมายถึงข้อใด?",
    "choices": [
      "การจัดเตรียมเสบียงไว้ล่วงหน้า",
      "การทำสิ่งที่ไม่คุ้มค่า",
      "การเฉลิมฉลอง",
      "การขายผลผลิต"
    ],
    "answer": 0,
    "explanation": "หมายถึงการเก็บเกี่ยวพืชผลไว้เป็นเสบียงสำรอง"
  },
  {
    "prompt": "ข้อที่ 50: คำตรงข้ามของคำว่า <strong>\"เจริญรุ่งเรือง\"</strong> คือข้อใด?",
    "choices": [
      "เสื่อมโทรม",
      "มั่นคง",
      "มั่งคั่ง",
      "ก้าวหน้า"
    ],
    "answer": 0,
    "explanation": "เจริญรุ่งเรือง ตรงข้ามกับ เสื่อมโทรม (ถดถอย)"
  }
,
  {
      "prompt": "ข้อที่ 51: ข้อใดเขียนสะกดคำได้ถูกต้องทุกคำ",
      "choices": [
          "อนุญาต, กราฟิก, ศีรษะ",
          "อนุญาตน์, กราฟฟิค, ศรีษะ",
          "อนุมัติ, กราฟิก, ศรีษะ",
          "อนุญาติ, กราฟฟิค, ศีรษะ"
      ],
      "answer": 0,
      "explanation": "คำที่ถูกต้องคือ <strong>อนุญาต</strong> (ไม่มี สระ อิ), <strong>กราฟิก</strong> (ใช้ ก ไก่), <strong>ศีรษะ</strong> (ศ เสือ ขึ้นก่อน ร รั่ว)"
  },
  {
      "prompt": "ข้อที่ 52: ข้อใดมีคำที่เขียนสะกดผิด",
      "choices": [
          "สังเกตการณ์",
          "รสชาติ",
          "สังเกตน์",
          "อารมณ์"
      ],
      "answer": 2,
      "explanation": "คำว่า <strong>สังเกต</strong> ที่ถูกต้องไม่มี ตน์ ไม้ทัณฑฆาต"
  },
  {
      "prompt": "ข้อที่ 53: จงหาคู่คำที่มีความสัมพันธ์เหมือนคู่แรก: <strong>ดำ : ขาว :: ? : ?</strong>",
      "choices": [
          "สูง : ใหญ่",
          "ร้อน : เย็น",
          "มืด : สว่าง",
          "เร็ว : ไกล"
      ],
      "answer": 1,
      "explanation": "มีความสัมพันธ์แบบ <strong>คำตรงข้าม (Antonym)</strong> เหมือน ดำ-ขาว และ ร้อน-เย็น"
  },
  {
      "prompt": "ข้อที่ 54: จงหาคู่คำที่มีความสัมพันธ์เหมือนคู่แรก: <strong>แพทย์ : โรงพยาบาล :: ครู : ?</strong>",
      "choices": [
          "หนังสือ",
          "นักเรียน",
          "โรงเรียน",
          "กระดานดำ"
      ],
      "answer": 2,
      "explanation": "มีความสัมพันธ์แบบ <strong>บุคลากร : สถานที่ทำงาน</strong> แพทย์ทำงานที่โรงพยาบาล ครูทำงานที่ <strong>โรงเรียน</strong>"
  },
  {
      "prompt": "ข้อที่ 55: จงหาคู่คำที่มีความสัมพันธ์เหมือนคู่แรก: <strong>กรรไกร : ตัด :: เข็ม : ?</strong>",
      "choices": [
          "ด้าย",
          "แทง",
          "เย็บ",
          "เสื้อผ้า"
      ],
      "answer": 2,
      "explanation": "มีความสัมพันธ์แบบ <strong>เครื่องมือ : หน้าที่การใช้งาน</strong> กรรไกรใช้ตัด เข็มใช้ <strong>เย็บ</strong>"
  },
  {
      "prompt": "ข้อที่ 56: ข้อใดแตกต่างจากข้ออื่น (คำที่ไม่เข้าพวก)",
      "choices": [
          "โลก",
          "ดาวอังคาร",
          "ดาวพุธ",
          "ดวงอาทิตย์"
      ],
      "answer": 3,
      "explanation": "<strong>ดวงอาทิตย์</strong> เป็นดาวฤกษ์ (Star) ส่วนข้ออื่นเป็นดาวเคราะห์ (Planet)"
  },
  {
      "prompt": "ข้อที่ 57: คำว่า \"ขยัน\" มีความหมายตรงข้ามกับคำใด",
      "choices": [
          "อุตสาหะ",
          "พากเพียร",
          "เกียจคร้าน",
          "มานะ"
      ],
      "answer": 2,
      "explanation": "คำตรงข้ามของ ขยัน คือ <strong>เกียจคร้าน</strong>"
  },
  {
      "prompt": "ข้อที่ 58: คำว่า \"กษัตริย์\" มีความหมายพ้องกับคำใด",
      "choices": [
          "ราชา",
          "อำมาตย์",
          "เสนาบดี",
          "ทหาร"
      ],
      "answer": 0,
      "explanation": "กษัตริย์ มีความหมายเดียวกับ <strong>ราชา</strong> หรือ พระมหากษัตริย์"
  },
  {
      "prompt": "ข้อที่ 59: บทความ: \"การออกกำลังกายอย่างสม่ำเสมอช่วยเสริมสร้างภูมิคุ้มกันและลดความเครียด\" ใจความสำคัญคือข้อใด",
      "choices": [
          "ความเครียดทำให้ภูมิคุ้มกันลดลง",
          "การออกกำลังกายมีประโยชน์ต่อร่างกายและจิตใจ",
          "คนทุกคนต้องออกกำลังกายทุกวัน",
          "การสร้างภูมิคุ้มกันเป็นเรื่องยาก"
      ],
      "answer": 1,
      "explanation": "ใจความสำคัญสรุปถึง <strong>ประโยชน์ของการออกกำลังกายทั้งทางร่างกายและจิตใจ</strong>"
  },
  {
      "prompt": "ข้อที่ 60: จงเรียงลำดับประโยคต่อไปนี้ให้ถูกต้อง: <br>ก. จึงทำให้เกิดภาวะโลกร้อน <br>ข. การเผาไหม้เชื้อเพลิงฟอสซิล <br>ค. ปล่อยก๊าซเรือนกระจกสู่บรรยากาศ",
      "choices": [
          "ก -> ข -> ค",
          "ข -> ค -> ก",
          "ค -> ก -> ข",
          "ข -> ก -> ค"
      ],
      "answer": 1,
      "explanation": "เรียงตามเหตุและผล: การเผาไหม้เชื้อเพลิง (ข) → ปล่อยก๊าซเรือนกระจก (ค) → จึงเกิดภาวะโลกร้อน (ก) ได้เป็น <strong>ข -> ค -> ก</strong>"
  },
  {
      "prompt": "ข้อที่ 61: คำว่า \"ลิขสิทธิ์\" ข้อใดเขียนสะกดได้ถูกต้อง",
      "choices": [
          "ลิขสิทธ์",
          "ลิขสิทธิ์",
          "ลิขสิทธา",
          "ลิขสิทธิ์"
      ],
      "answer": 1,
      "explanation": "คำที่ถูกต้องคือ <strong>ลิขสิทธิ์</strong> (สิทธิ์ มี การันต์ ที่ ธ)"
  },
  {
      "prompt": "ข้อที่ 62: จงหาคู่คำที่มีความสัมพันธ์เหมือนคู่แรก: <strong>ตา : มอง :: หู : ?</strong>",
      "choices": [
          "ฟัง",
          "ดม",
          "ลิ้น",
          "พูด"
      ],
      "answer": 0,
      "explanation": "มีความสัมพันธ์แบบ <strong>อวัยวะ : การรับสัมผัส</strong> ตาใชัรับการมอง หูใช้รับการ <strong>ฟัง</strong>"
  },
  {
      "prompt": "ข้อที่ 63: จงหาคู่คำที่มีความสัมพันธ์เหมือนคู่แรก: <strong>ปากกา : หมึก :: รถยนต์ : ?</strong>",
      "choices": [
          "ถนน",
          "ล้อ",
          "น้ำมัน",
          "พวงมาลัย"
      ],
      "answer": 2,
      "explanation": "มีความสัมพันธ์แบบ <strong>อุปกรณ์ : เชื้อเพลิง/สารขับเคลื่อน</strong> ปากกาต้องใช้หมึก รถยนต์ต้องใช้ <strong>น้ำมัน</strong> (หรือพลังงาน)"
  },
  {
      "prompt": "ข้อที่ 64: ข้อใดแตกต่างจากข้ออื่น (คำที่ไม่เข้าพวก)",
      "choices": [
          "ตู้เย็น",
          "เครื่องซักผ้า",
          "โทรทัศน์",
          "หม้อหุงข้าว"
      ],
      "answer": 2,
      "explanation": "<strong>โทรทัศน์</strong> เป็นเครื่องใช้ไฟฟ้าเพื่อความบันเทิงและการสื่อสาร ส่วนข้ออื่นเป็นเครื่องใช้ไฟฟ้าในครัวเรือนทำความสะอาดและทำอาหาร"
  },
  {
      "prompt": "ข้อที่ 65: คำว่า \"นภา\" มีความหมายตรงกับคำในข้อใด",
      "choices": [
          "มหาศาล",
          "ท้องฟ้า",
          "สายน้ำ",
          "แผ่นดิน"
      ],
      "answer": 1,
      "explanation": "นภา หมายถึง <strong>ท้องฟ้า</strong>"
  },
  {
      "prompt": "ข้อที่ 66: คำว่า \"กตัญญู\" มีความหมายตรงข้ามกับคำใด",
      "choices": [
          "เนรคุณ",
          "อกตัญญู",
          "ซื่อสัตย์",
          "เมตตา"
      ],
      "answer": 1,
      "explanation": "คำตรงข้ามโดยตรงคือ <strong>อกตัญญู</strong> (หรือเนรคุณ)"
  },
  {
      "prompt": "ข้อที่ 67: ข้อใดเป็นคำที่สะกดผิด",
      "choices": [
          "รสชาติ",
          "โอกาส",
          "อนุญาต",
          "รสชาติย์"
      ],
      "answer": 3,
      "explanation": "คำว่า <strong>รสชาติ</strong> สะกดโดยไม่มี ย การันต์"
  },
  {
      "prompt": "ข้อที่ 68: บทความ: \"กฟผ. มุ่งมั่นพัฒนาพลังงานสะอาดเพื่อความยั่งยืนของประเทศ\" ประโยคนี้เน้นย้ำสิ่งใด",
      "choices": [
          "การเพิ่มราคาไฟฟ้า",
          "การใช้พลังงานสะอาดเพื่อความยั่งยืน",
          "การลดจำนวนพนักงาน",
          "การสร้างโรงไฟฟ้าถ่านหินเพิ่ม"
      ],
      "answer": 1,
      "explanation": "สรุปใจความสำคัญคือ <strong>การพัฒนาพลังงานสะอาดเพื่อความยั่งยืน</strong>"
  },
  {
      "prompt": "ข้อที่ 69: จงหาคู่คำที่มีความสัมพันธ์เหมือนคู่แรก: <strong>ปลา : น้ำ :: นก : ?</strong>",
      "choices": [
          "รัง",
          "ต้นไม้",
          "อากาศ",
          "ปีก"
      ],
      "answer": 2,
      "explanation": "มีความสัมพันธ์แบบ <strong>สัตว์ : ตัวกลางในการเคลื่อนที่</strong> ปลาว่ายในน้ำ นกบินใน <strong>อากาศ</strong>"
  },
  {
      "prompt": "ข้อที่ 70: ข้อใดไม่ใช่พืชผักสวนครัว",
      "choices": [
          "กะเพรา",
          "โหระพา",
          "ตำลึง",
          "แอปเปิ้ล"
      ],
      "answer": 3,
      "explanation": "<strong>แอปเปิ้ล</strong> จัดเป็นผลไม้ ไม่ใช่พืชผักสวนครัว"
  },
  {
      "prompt": "ข้อที่ 71: คำว่า \"คำนวณ\" ข้อใดสะกดถูกต้อง",
      "choices": [
          "คำนวน",
          "คำนวณ",
          "คำนวญ",
          "คำนวณน์"
      ],
      "answer": 1,
      "explanation": "คำที่ถูกต้องใช้ ณ ตัวสะกด คือ <strong>คำนวณ</strong>"
  },
  {
      "prompt": "ข้อที่ 72: คำว่า \"วารี\" มีความหมายพ้องกับข้อใด",
      "choices": [
          "ภูเขา",
          "สายน้ำ",
          "ต้นไม้",
          "ดวงอาทิตย์"
      ],
      "answer": 1,
      "explanation": "วารี หมายถึง <strong>สายน้ำ</strong> หรือน้ำ"
  },
  {
      "prompt": "ข้อที่ 73: จงเรียงลำดับประโยคต่อไปนี้ให้ถูกต้อง: <br>ก. เพื่ออนาคตที่ยั่งยืน <br>ข. ร่วมมือกันประหยัดพลังงาน <br>ค. ประชาชนทุกคนควรร่วมมือ",
      "choices": [
          "ค -> ข -> ก",
          "ก -> ข -> ค",
          "ข -> ค -> ก",
          "ค -> ก -> ข"
      ],
      "answer": 0,
      "explanation": "เรียงประโยคที่สมบูรณ์: ประชาชนทุกคนควรร่วมมือ (ค) -> ร่วมมือกันประหยัดพลังงาน (ข) -> เพื่ออนาคตที่ยั่งยืน (ก) ได้เป็น <strong>ค -> ข -> ก</strong>"
  },
  {
      "prompt": "ข้อที่ 74: คำว่า \"บรรยากาศ\" ข้อใดสะกดถูกต้อง",
      "choices": [
          "บรรยากาศ",
          "บรรยากาส",
          "บรยากาศ",
          "บรรยากาศน์"
      ],
      "answer": 0,
      "explanation": "คำที่ถูกต้องใช้ ศ ศาลา เป็นตัวสะกด คือ <strong>บรรยากาศ</strong>"
  },
  {
      "prompt": "ข้อที่ 75: บทความ: \"การเรียนรู้ตลอดชีวิตเป็นสิ่งจำเป็นในยุคดิจิทัลที่เทคโนโลยีเปลี่ยนแปลงรวดเร็ว\" สรุปความได้ว่าอย่างไร",
      "choices": [
          "เทคโนโลยีทำให้คนไม่อยากเรียนรู้",
          "มนุษย์ต้องพัฒนาตนเองและเรียนรู้อย่างต่อเนื่อง",
          "ยุคดิจิทัลไม่จำเป็นต้องเรียนหนังสือ",
          "การเรียนรู้ทำได้เฉพาะตอนเด็ก"
      ],
      "answer": 1,
      "explanation": "ใจความสำคัญเน้นย้ำถึง <strong>การพัฒนาตนเองและการเรียนรู้อย่างต่อเนื่อง (Lifelong Learning)</strong>"
  }
];
const LOGIC_QUESTIONS = [
  {
    "prompt": "ข้อที่ 1: กำหนดให้ \"ถ้าฝนตก แล้วถนนจะเปียก\" เป็นจริง และพบว่า <strong>\"ถนนไม่เปียก\"</strong> สรุปผลได้อย่างไร?",
    "choices": [
      "ฝนตก",
      "ฝนไม่ตก",
      "ถนนแห้งเพราะแดดออก",
      "สรุปแน่นอนไม่ได้"
    ],
    "answer": 1,
    "explanation": "Modus Tollens: ถ้า p → q เป็นจริง และพบ ~q สรุปได้ว่า ~p (ฝนไม่ตก)"
  },
  {
    "prompt": "ข้อที่ 2: กำหนดให้: (1) คนขยันทุกคนสอบผ่าน (2) สมชายเป็นคนขยัน สรุปได้อย่างไร?",
    "choices": [
      "สมชายสอบผ่าน",
      "สมชายสอบไม่ผ่าน",
      "สมชายอาจจะสอบผ่าน",
      "คนสอบผ่านทุกคนชื่อสมชาย"
    ],
    "answer": 0,
    "explanation": "Modus Ponens: p → q และเกิด p ขึ้น สรุปผลได้ q แน่นอน คือ สมชายสอบผ่าน"
  },
  {
    "prompt": "ข้อที่ 3: พิจารณาเงื่อนไขสัญลักษณ์: A > B, B = C, C ≥ D สรุปความสัมพันธ์ระหว่าง A กับ D ได้ตามข้อใด?",
    "choices": [
      "A > D",
      "A = D",
      "A < D",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "จาก B = C จะได้ A > C และ C ≥ D ดังนั้น A > D แน่นอน"
  },
  {
    "prompt": "ข้อที่ 4: แผนภาพเวนน์: \"นักเรียนทุกคนชอบเรียนคณิตศาสตร์\" และ \"มีนักเรียนบางคนชอบเรียนภาษาอังกฤษ\" ข้อใดถูกต้องแน่นอน?",
    "choices": [
      "คนที่ชอบภาษาอังกฤษทุกคนชอบคณิตศาสตร์",
      "มีคนที่ชอบทั้งคณิตศาสตร์และภาษาอังกฤษ",
      "ไม่มีใครชอบทั้งสองวิชา",
      "คนที่ชอบคณิตศาสตร์ทุกคนชอบภาษาอังกฤษ"
    ],
    "answer": 1,
    "explanation": "นักเรียนทุกคนชอบคณิต ดังนั้นคนที่ชอบภาษาอังกฤษก็ย่อมชอบคณิตด้วย"
  },
  {
    "prompt": "ข้อที่ 5: ข้อความ <strong>\"ถ้า A ไม่เกิดขึ้น แล้ว B จะเกิดขึ้น\"</strong> มีค่าความจริงสมพัทธ์กับข้อใด?",
    "choices": [
      "ถ้า B ไม่เกิดขึ้น แล้ว A จะเกิดขึ้น",
      "ถ้า B เกิดขึ้น แล้ว A จะเกิดขึ้น",
      "A เกิดขึ้น และ B เกิดขึ้น",
      "ถ้า A เกิดขึ้น แล้ว B จะไม่เกิดขึ้น"
    ],
    "answer": 0,
    "explanation": "Contrapositive: ~A → B สมพัทธ์กับ ~B → A"
  },
  {
    "prompt": "ข้อที่ 6: พิจารณาเงื่อนไขสัญลักษณ์: P ≤ Q, Q < R, R = S สรุปความสัมพันธ์ระหว่าง P กับ S ได้อย่างไร?",
    "choices": [
      "P < S",
      "P = S",
      "P > S",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "P ≤ Q < R = S สรุปได้ P < S"
  },
  {
    "prompt": "ข้อที่ 7: กำหนดให้: (1) สัตว์ปีกทุกตัวมีขน (2) นกเป็นสัตว์ปีก สรุปได้อย่างไร?",
    "choices": [
      "นกมีขน",
      "นกไม่มีขน",
      "สิ่งมีขนทุกตัวคือนก",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "Modus Ponens: นกเป็นสัตว์ปีก สัตว์ปีกมีขน -> นกมีขน"
  },
  {
    "prompt": "ข้อที่ 8: กำหนดให้ \"ถ้านาย ก. ไม่มา แล้วนาย ข. จะมา\" และพบว่า <strong>\"นาย ข. ไม่มา\"</strong> สรุปได้อย่างไร?",
    "choices": [
      "นาย ก. มา",
      "นาย ก. ไม่มา",
      "นาย ก. อาจจะมา",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "Modus Tollens: ~A → B และ ~B สรุปได้ว่า นาย ก. มา"
  },
  {
    "prompt": "ข้อที่ 9: แผนภาพเวนน์: \"ไม่มีผลไม้พิษชนิดใดอร่อย\" และ \"แอปเปิลเป็นผลไม้อร่อย\" สรุปได้อย่างไร?",
    "choices": [
      "แอปเปิลไม่ใช่ผลไม้พิษ",
      "แอปเปิลเป็นผลไม้พิษ",
      "ผลไม้อร่อยทุกชนิดคือแอปเปิล",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "เซตผลไม้อร่อยกับเซตผลไม้พิษแยกกันเด็ดขาด ดังนั้น แอปเปิลไม่ใช่ผลไม้พิษ"
  },
  {
    "prompt": "ข้อที่ 10: นิเสธ (Not) ของประพจน์ <strong>\"ฝนตก และ ถนนเปียก\"</strong> ตรงกับข้อความใด?",
    "choices": [
      "ฝนไม่ตก หรือ ถนนไม่เปียก",
      "ฝนไม่ตก และ ถนนไม่เปียก",
      "ถ้าฝนไม่ตก แล้วถนนไม่เปียก",
      "ฝนตก แต่ถนนไม่เปียก"
    ],
    "answer": 0,
    "explanation": "De Morgan: ~(p ∧ q) ≡ ~p ∨ ~q"
  },
  {
    "prompt": "ข้อที่ 11: ถ้าประพจน์ A เป็นจริง และประพจน์ B เป็นเท็จ ค่าความจริงของประพจน์ <strong>A → B</strong> คืออะไร?",
    "choices": [
      "เป็นจริง (True)",
      "เป็นเท็จ (False)",
      "ไม่สามารถระบุได้",
      "เป็นสัจนิรันดร์"
    ],
    "answer": 1,
    "explanation": "A → B กรณี T → F ได้ผลลัพธ์เป็น เท็จ (False)"
  },
  {
    "prompt": "ข้อที่ 12: รูปแบบประพจน์ <strong>p ∨ ~p</strong> มีค่าความจริงเป็นอย่างไรเสมอ?",
    "choices": [
      "เป็นจริงเสมอ (Tautology)",
      "เป็นเท็จเสมอ (Contradiction)",
      "ขึ้นอยู่กับค่าของ p",
      "เป็นสรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "p ∨ ~p มีค่าความจริงเป็นจริงในทุกกรณี (Tautology)"
  },
  {
    "prompt": "ข้อที่ 13: พิจารณาเงื่อนไขสัญลักษณ์: X ≥ Y, Y > Z สรุปความสัมพันธ์ระหว่าง X กับ Z ได้อย่างไร?",
    "choices": [
      "X > Z",
      "X = Z",
      "X < Z",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "X ≥ Y > Z สรุปได้ X > Z"
  },
  {
    "prompt": "ข้อที่ 14: ในการแข่งขันวิ่ง 100 เมตร พบว่า: A เข้าถึงเส้นชัยก่อน B, C เข้าถึงเส้นชัยหลัง B ใครเข้าเส้นชัยเป็นคนแรก?",
    "choices": [
      "A",
      "B",
      "C",
      "เข้าพร้อมกัน"
    ],
    "answer": 0,
    "explanation": "ลำดับ: A -> B -> C คนแรกคือ A"
  },
  {
    "prompt": "ข้อที่ 15: กำหนดให้ A เก่งกว่า B และ B เก่งกว่า C ข้อใดสรุปถูกแน่นอน?",
    "choices": [
      "A เก่งกว่า C",
      "C เก่งกว่า A",
      "A และ C เก่งเท่ากัน",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "คุณสมบัติถ่ายทอด: A > B และ B > C -> A > C"
  },
  {
    "prompt": "ข้อที่ 16: กำหนดให้ \"คนสวมแว่นทุกคนเป็นนักอ่าน\" และ \"สมศักดิ์ไม่ได้สวมแว่น\" สรุปได้อย่างไร?",
    "choices": [
      "สมศักดิ์อาจจะเป็นหรือไม่เป็นนักอ่านก็ได้",
      "สมศักดิ์ไม่ได้เป็นนักอ่าน",
      "สมศักดิ์เป็นนักอ่านแน่นอน",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "การไม่สวมแว่นไม่ได้หมายความว่าจะเป็นนักอ่านไม่ได้ (สมศักดิ์อาจเป็นนักอ่านที่ไม่สวมแว่น)"
  },
  {
    "prompt": "ข้อที่ 17: นิเสธของประพจน์ <strong>\"ฝนตก หรือ แดดออก\"</strong> คือข้อความใด?",
    "choices": [
      "ฝนไม่ตก และ แดดไม่ออก",
      "ฝนไม่ตก หรือ แดดไม่ออก",
      "ถ้าฝนไม่ตก แล้วแดดไม่ออก",
      "ฝนตก แต่แดดไม่ออก"
    ],
    "answer": 0,
    "explanation": "De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q"
  },
  {
    "prompt": "ข้อที่ 18: พิจารณาเงื่อนไขสัญลักษณ์: M = N, N < O, O ≤ P สรุปความสัมพันธ์ M กับ P ได้อย่างไร?",
    "choices": [
      "M < P",
      "M = P",
      "M > P",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "M = N < O ≤ P สรุปได้ M < P"
  },
  {
    "prompt": "ข้อที่ 19: กำหนดให้ \"ถ้าตั้งใจเรียน แล้วจะสอบผ่าน\" ประพจน์แย้งสลับที่ (Contrapositive) คือข้อใด?",
    "choices": [
      "ถ้าสอบไม่ผ่าน แล้วไม่ได้ตั้งใจเรียน",
      "ถ้าไม่ได้ตั้งใจเรียน แล้วสอบไม่ผ่าน",
      "ถ้าสอบผ่าน แล้วตั้งใจเรียน",
      "สอบผ่าน และตั้งใจเรียน"
    ],
    "answer": 0,
    "explanation": "Contrapositive ของ p → q คือ ~q → ~p"
  },
  {
    "prompt": "ข้อที่ 20: ในตารางความจริงของการเชื่อมด้วย <strong>\"และ\" (∧)</strong> จะเป็นจริงเมื่อใด?",
    "choices": [
      "เมื่อประพจน์ทั้งสองเป็นจริงทั้งคู่",
      "เมื่อมีประพจน์ใดประพจน์หนึ่งเป็นจริง",
      "เมื่อประพจน์แรกเป็นจริงประพจน์หลังเป็นเท็จ",
      "เป็นจริงเสมอ"
    ],
    "answer": 0,
    "explanation": "p ∧ q เป็นจริงเพียงกรณีเดียวคือเมื่อ p และ q เป็นจริงทั้งคู่"
  },
  {
    "prompt": "ข้อที่ 21: แผนภาพเวนน์: \"ครูทุกคนขยัน\" และ \"นาย A เป็นครู\" สรุปได้อย่างไร?",
    "choices": [
      "นาย A ขยัน",
      "นาย A ไม่ขยัน",
      "คนขยันทุกคนเป็นครู",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "นาย A เป็นครู ซึ่งเป็นสับเซตของคนขยัน -> นาย A ขยัน"
  },
  {
    "prompt": "ข้อที่ 22: กำหนดให้ A > B และ C < B ข้อใดถูกต้อง?",
    "choices": [
      "A > C",
      "A < C",
      "A = C",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "A > B และ B > C -> A > C"
  },
  {
    "prompt": "ข้อที่ 23: ถ้านาย 1 นั่งข้างนาย 2, นาย 2 นั่งข้างนาย 3 นาย 1 จะนั่งข้างนาย 3 หรือไม่?",
    "choices": [
      "อาจจะนั่งหรือไม่อยู่ข้างกันก็ได้",
      "นั่งข้างกันแน่นอน",
      "ไม่นั่งข้างกันแน่นอน",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "ขึ้นอยู่กับลำดับการนั่งในแถว (1-2-3 นาย 1 ไม่ติดกับ 3, แต่ถ้านั่งเป็นวงกลมอาจติดกัน)"
  },
  {
    "prompt": "ข้อที่ 24: ประพจน์ <strong>p ∧ ~p</strong> มีค่าความจริงเป็นอย่างไรเสมอ?",
    "choices": [
      "เป็นเท็จเสมอ (Contradiction)",
      "เป็นจริงเสมอ (Tautology)",
      "เป็นจริงเมื่อ p เป็นจริง",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "p ∧ ~p เป็นข้อขัดแย้ง (Contradiction) มีค่าเป็นเท็จเสมอ"
  },
  {
    "prompt": "ข้อที่ 25: กำหนดให้: (1) ถ้าทอดเตาแล้วไฟติด (2) ไฟไม่ติด สรุปได้อย่างไร?",
    "choices": [
      "ไม่ได้ทอดเตา",
      "ทอดเตาแล้ว",
      "ไฟดับ",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "Modus Tollens: ทอดเตา -> ไฟติด. พบไฟไม่ติด -> ไม่ได้ทอดเตา"
  },
  {
    "prompt": "ข้อที่ 26: พิจารณา: A ≥ B > C = D สรุปความสัมพันธ์ A กับ D ได้อย่างไร?",
    "choices": [
      "A > D",
      "A = D",
      "A < D",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "A ≥ B > C = D สรุปได้ A > D"
  },
  {
    "prompt": "ข้อที่ 27: แผนภาพเวนน์: \"ไม่มีนักเรียนคนใดชอบการบ้าน\" และ \"สมศรีชอบการบ้าน\" สรุปได้อย่างไร?",
    "choices": [
      "สมศรีไม่ได้เป็นนักเรียน",
      "สมศรีเป็นนักเรียน",
      "นักเรียนทุกคนคือสมศรี",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "เซตนักเรียนไม่คาบเกี่ยวกับเซตคนชอบการบ้าน สมศรีอยู่ในเซตคนชอบการบ้าน -> สมศรีไม่ใช่นักเรียน"
  },
  {
    "prompt": "ข้อที่ 28: ถ้า p เป็นจริง q เป็นจริง ค่าความจริงของ <strong>p ∨ q</strong> คืออะไร?",
    "choices": [
      "เป็นจริง (True)",
      "เป็นเท็จ (False)",
      "ไม่แน่นอน",
      "เป็นสัจนิรันดร์"
    ],
    "answer": 0,
    "explanation": "T ∨ T ได้ผลลัพธ์เป็น จริง (True)"
  },
  {
    "prompt": "ข้อที่ 29: ข้อใดคือสัจนิรันดร์?",
    "choices": [
      "p → p",
      "p ∧ q",
      "p → q",
      "p ∨ q"
    ],
    "answer": 0,
    "explanation": "p → p มีค่าความจริงเป็นจริงในทุกกรณี"
  },
  {
    "prompt": "ข้อที่ 30: จัดลำดับความสูง: X สูงกว่า Y, Z สูงกว่า X ใครสูงที่สุด?",
    "choices": [
      "Z",
      "X",
      "Y",
      "เท่ากัน"
    ],
    "answer": 0,
    "explanation": "ลำดับความสูง: Z > X > Y ดังนั้น Z สูงที่สุด"
  },
  {
    "prompt": "ข้อที่ 31: ถ้า \"A แล้ว B\" เป็นจริง และ \"B แล้ว C\" เป็นจริง สรุปได้อย่างไร?",
    "choices": [
      "ถ้า A แล้ว C",
      "ถ้า C แล้ว A",
      "ถ้า A แล้วไม่ C",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "Hypothetical Syllogism: (A → B) ∧ (B → C) ⇒ A → C"
  },
  {
    "prompt": "ข้อที่ 32: นิเสธของ <strong>\"x > 5\"</strong> คือข้อใด?",
    "choices": [
      "x ≤ 5",
      "x < 5",
      "x = 5",
      "x ≥ 5"
    ],
    "answer": 0,
    "explanation": "นิเสธของ มากกว่า คือ \"น้อยกว่าหรือเท่ากับ\" (≤)"
  },
  {
    "prompt": "ข้อที่ 33: เงื่อนไข: K < L, L ≤ M, M < N สรุป K กับ N ได้อย่างไร?",
    "choices": [
      "K < N",
      "K = N",
      "K > N",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "K < L ≤ M < N -> K < N"
  },
  {
    "prompt": "ข้อที่ 34: ผลสอบ 3 คน: ก. ได้คะแนนมากกว่า ข., ค. ได้คะแนนน้อยกว่า ข. ใครได้คะแนนมากที่สุด?",
    "choices": [
      "ก.",
      "ข.",
      "ค.",
      "เท่ากัน"
    ],
    "answer": 0,
    "explanation": "คะแนน: ก. > ข. > ค. คนที่ได้มากที่สุดคือ ก."
  },
  {
    "prompt": "ข้อที่ 35: แผนภาพเวนน์: \"หมอทุกคนมีความรู้\" และ \"พยาบาลทุกคนมีความรู้\" สรุปหมอกับพยาบาลอย่างไร?",
    "choices": [
      "สรุปความสัมพันธ์ระหว่างหมอกับพยาบาลไม่ได้",
      "หมอทุกคนเป็นพยาบาล",
      "พยาบาลทุกคนเป็นหมอ",
      "หมอไม่มีความรู้"
    ],
    "answer": 0,
    "explanation": "ทั้งสองกลุ่มต่างอยู่ในเซตคนมีความรู้ แต่ไม่อาจสรุปความสัมพันธ์ระหว่างหมอกับพยาบาลได้"
  },
  {
    "prompt": "ข้อที่ 36: ถ้า p เป็นเท็จ q เป็นจริง ค่าความจริงของ <strong>p ∧ q</strong> คืออะไร?",
    "choices": [
      "เป็นเท็จ (False)",
      "เป็นจริง (True)",
      "สรุปไม่ได้",
      "เป็นสัจนิรันดร์"
    ],
    "answer": 0,
    "explanation": "F ∧ T ได้ผลลัพธ์เป็น เท็จ"
  },
  {
    "prompt": "ข้อที่ 37: กำหนดให้ \"ถ้าไม่อ่านหนังสือ จะสอบตก\" พบว่า \"นาย ก. สอบผ่าน\" สรุปได้อย่างไร?",
    "choices": [
      "นาย ก. อ่านหนังสือ",
      "นาย ก. ไม่อ่านหนังสือ",
      "นาย ก. ฉลาด",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "Modus Tollens: ~อ่าน -> ตก. พบ สอบผ่าน (~ตก) -> นาย ก. อ่านหนังสือ"
  },
  {
    "prompt": "ข้อที่ 38: เงื่อนไขสัญลักษณ์: U > V = W ≥ Z สรุป U กับ Z ได้อย่างไร?",
    "choices": [
      "U > Z",
      "U = Z",
      "U < Z",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "U > V = W ≥ Z -> U > Z"
  },
  {
    "prompt": "ข้อที่ 39: ข้อความ \"ถ้า A แล้ว B\" สมพัทธ์กับข้อความใด?",
    "choices": [
      "ไม่ A หรือ B",
      "A และ B",
      "ถ้า B แล้ว A",
      "ไม่ A และ ไม่ B"
    ],
    "answer": 0,
    "explanation": "p → q ≡ ~p ∨ q"
  },
  {
    "prompt": "ข้อที่ 40: ถ้าทุกคนในห้องพูดภาษาไทยได้ สมชายอยู่ในห้องนี้ สรุปได้ตามข้อใด?",
    "choices": [
      "สมชายพูดภาษาไทยได้",
      "สมชายพูดภาษาอังกฤษได้",
      "สมชายพูดภาษาไทยไม่ได้",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "สมชายอยู่ในห้อง -> สมชายพูดภาษาไทยได้"
  },
  {
    "prompt": "ข้อที่ 41: จัดลำดับการทำงาน: งาน A ต้องทำก่อนงาน B, งาน B ต้องทำก่อนงาน C งานใดทำเป็นอันดับแรก?",
    "choices": [
      "งาน A",
      "งาน B",
      "งาน C",
      "ทำพร้อมกัน"
    ],
    "answer": 0,
    "explanation": "ลำดับ: A -> B -> C ทำแรกสุดคืองาน A"
  },
  {
    "prompt": "ข้อที่ 42: กำหนดให้: (1) ถ้าหิวต้องกินข้าว (2) สมพงษ์กินข้าว สรุปว่าสมพงษ์หิวหรือไม่?",
    "choices": [
      "อาจจะหิวหรือไม่หิวก็ได้",
      "สมพงษ์หิวแน่นอน",
      "สมพงษ์ไม่หิวแน่นอน",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "การกินข้าวอาจเกิดจากสาเหตุอื่นที่ไม่ใช่หิวได้ (การอ้างเหตุผลแบบ Affirming the Consequent เป็นข้อบกพร่อง)"
  },
  {
    "prompt": "ข้อที่ 43: นิเสธของ <strong>\"p → q\"</strong> สมพัทธ์กับข้อใด?",
    "choices": [
      "p ∧ ~q",
      "~p ∨ q",
      "~p ∧ q",
      "p ∨ ~q"
    ],
    "answer": 0,
    "explanation": "~(p → q) ≡ ~(~p ∨ q) ≡ p ∧ ~q"
  },
  {
    "prompt": "ข้อที่ 44: เงื่อนไข: A = B, B > C, C > D สรุป A กับ D ได้อย่างไร?",
    "choices": [
      "A > D",
      "A = D",
      "A < D",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "A = B > C > D -> A > D"
  },
  {
    "prompt": "ข้อที่ 45: แผนภาพเวนน์: \"คนออกกำลังกายทุกคนแข็งแรง\" \"นาย X ไม่แข็งแรง\" สรุปนาย X อย่างไร?",
    "choices": [
      "นาย X ไม่ได้ออกกำลังกาย",
      "นาย X ออกกำลังกาย",
      "นาย X ป่วย",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "นาย X ไม่แข็งแรง -> นาย X ไม่ได้ออกกำลังกาย"
  },
  {
    "prompt": "ข้อที่ 46: ถ้า p เป็นเท็จ q เป็นเท็จ ค่าความจริงของ <strong>p → q</strong> คืออะไร?",
    "choices": [
      "เป็นจริง (True)",
      "เป็นเท็จ (False)",
      "สรุปไม่ได้",
      "เป็นข้อขัดแย้ง"
    ],
    "answer": 0,
    "explanation": "F → F ได้ผลลัพธ์เป็น จริง (True)"
  },
  {
    "prompt": "ข้อที่ 47: ลำดับคน 4 คน: A นั่งทิศเหนือ, B นั่งทิศตรงข้ามกับ A B นั่งทิศใด?",
    "choices": [
      "ทิศใต้",
      "ทิศตะวันออก",
      "ทิศตะวันตก",
      "ทิศเหนือ"
    ],
    "answer": 0,
    "explanation": "ตรงข้ามกับทิศเหนือคือ ทิศใต้"
  },
  {
    "prompt": "ข้อที่ 48: ประพจน์ใดเป็นสัจนิรันดร์?",
    "choices": [
      "p ↔ p",
      "p ∧ q",
      "p ∨ q",
      "p → ~p"
    ],
    "answer": 0,
    "explanation": "p ↔ p เป็นจริงเสมอในทุกกรณี"
  },
  {
    "prompt": "ข้อที่ 49: เงื่อนไขสัญลักษณ์: X < Y, Y = Z สรุป X กับ Z ได้อย่างไร?",
    "choices": [
      "X < Z",
      "X = Z",
      "X > Z",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "X < Y = Z -> X < Z"
  },
  {
    "prompt": "ข้อที่ 50: ถ้าไม่มีใครสอบตก และสมศรีอยู่ในกลุ่มผู้สอบ สรุปได้อย่างไร?",
    "choices": [
      "สมศรีสอบผ่าน",
      "สมศรีสอบตก",
      "สมศรีสละสิทธิ์",
      "สรุปไม่ได้"
    ],
    "answer": 0,
    "explanation": "ไม่มีใครสอบตก -> ทุกคนสอบผ่าน -> สมศรีสอบผ่าน"
  }
,
  {
      "prompt": "ข้อที่ 51: นิเสธ (Negation) ของประพจน์ \"ฝนตก\" คือประพจน์ในข้อใด",
      "choices": [
          "แดดออก",
          "ฝนไม่ตก",
          "ฟ้าร้อง",
          "พายุเข้า"
      ],
      "answer": 1,
      "explanation": "นิเสธของประพจน์ p คือ ~p ดังนั้น นิเสธของ \"ฝนตก\" คือ <strong>\"ฝนไม่ตก\"</strong>"
  },
  {
      "prompt": "ข้อที่ 52: กำหนดให้ประพจน์ p เป็นจริง (T) และ q เป็นเท็จ (F) แล้วประพจน์ p ∧ q มีค่าความจริงเป็นอย่างไร",
      "choices": [
          "จริง (T)",
          "เท็จ (F)",
          "ไม่แน่นอน",
          "เป็นได้ทั้งจริงและเท็จ"
      ],
      "answer": 1,
      "explanation": "ตัวเชื่อม ∧ (และ) จะเป็นจริงได้กรณีเดียวคือต้องเป็นจริงทั้งคู่ ดังนั้น T ∧ F จึงเป็น <strong>เท็จ (F)</strong>"
  },
  {
      "prompt": "ข้อที่ 53: กำหนดให้ประพจน์ p เป็นจริง (T) และ q เป็นเท็จ (F) แล้วประพจน์ p → q มีค่าความจริงเป็นอย่างไร",
      "choices": [
          "จริง (T)",
          "เท็จ (F)",
          "ไม่แน่นอน",
          "เป็นจริงเสมอ"
      ],
      "answer": 1,
      "explanation": "ตัวเชื่อม → (ถ้า...แล้ว...) จะเป็นเท็จกรณีเดียวคือ หน้าจริงหลังเท็จ (T → F) ดังนั้นจึงเป็น <strong>เท็จ (F)</strong>"
  },
  {
      "prompt": "ข้อที่ 54: สรุปเหตุผล: <br>เหตุ 1: มนุษย์ทุกคนต้องหายใจ <br>เหตุ 2: สมชายเป็นมนุษย์ <br>ข้อสรุปที่สมเหตุสมผลคือข้อใด",
      "choices": [
          "สมชายอาจจะหายใจ",
          "สมชายไม่ต้องหายใจ",
          "สมชายต้องหายใจ",
          "สรุปไม่ได้แน่นอน"
      ],
      "answer": 2,
      "explanation": "จากตรรกศาสตร์นิรนัย (Deductive Logic): สมชายเป็นมนุษย์ ดังนั้น <strong>สมชายต้องหายใจ</strong>"
  },
  {
      "prompt": "ข้อที่ 55: สรุปเหตุผล: <br>เหตุ 1: ถ้าฝนตก แล้วถนนจะเปียก <br>เหตุ 2: ถนนไม่เปียก <br>ข้อสรุปที่ถูกต้องคือข้อใด (Modus Tollens)",
      "choices": [
          "ฝนตก",
          "ฝนไม่ตก",
          "ถนนแห้งเฉพาะบางจุด",
          "สรุปไม่ได้"
      ],
      "answer": 1,
      "explanation": "ตามกฎ Modus Tollens (p → q, ~q ∴ ~p) เมื่อถนนไม่เปียก สรุปได้แน่นอนว่า <strong>ฝนไม่ตก</strong>"
  },
  {
      "prompt": "ข้อที่ 56: เงื่อนไขสัญลักษณ์: กำหนดให้ A > B และ B = C ข้อใดสรุปได้ถูกต้องแน่นอน",
      "choices": [
          "A < C",
          "A = C",
          "A > C",
          "สรุปไม่ได้"
      ],
      "answer": 2,
      "explanation": "เมื่อ B = C สามารถแทน B ด้วย C ใน A > B จะได้ <strong>A > C</strong>"
  },
  {
      "prompt": "ข้อที่ 57: เงื่อนไขสัญลักษณ์: กำหนดให้ X ≥ Y และ Y > Z ข้อใดสรุปได้ถูกต้องแน่นอน",
      "choices": [
          "X > Z",
          "X < Z",
          "X = Z",
          "สรุปไม่ได้"
      ],
      "answer": 0,
      "explanation": "เนื่องจาก X มากกว่าหรือเท่ากับ Y และ Y มากกว่า Z สรุปได้แน่นอนว่า <strong>X > Z</strong>"
  },
  {
      "prompt": "ข้อที่ 58: นักเรียน 50 คน ชอบเล่นฟุตบอล 30 คน ชอบเล่นบาสเกตบอล 25 คน ชอบเล่นทั้งสองอย่าง 10 คน มีนักเรียนที่ไม่ชอบเล่นทั้งสองอย่างกี่คน",
      "choices": [
          "3 คน",
          "5 คน",
          "8 คน",
          "10 คน"
      ],
      "answer": 1,
      "explanation": "สูตรแผนภาพเวนน์ n(A∪B) = 30 + 25 - 10 = 45 คน ดังนั้นคนที่ไม่ชอบทั้งสองอย่าง = 50 - 45 = <strong>5 คน</strong>"
  },
  {
      "prompt": "ข้อที่ 59: จากการสำรวจคน 100 คน ดื่มกาแฟ 60 คน ดื่มชา 40 คน ดื่มทั้งสองอย่าง 15 คน มีคนที่ไม่ดื่มทั้งชาและกาแฟกี่คน",
      "choices": [
          "10 คน",
          "12 คน",
          "15 คน",
          "20 คน"
      ],
      "answer": 2,
      "explanation": "จำนวนคนที่ดื่มอย่างน้อยหนึ่งอย่าง = 60 + 40 - 15 = 85 คน ดังนั้นคนที่ไม่ดื่มเลย = 100 - 85 = <strong>15 คน</strong>"
  },
  {
      "prompt": "ข้อที่ 60: จงหาลำดับถัดไปของแบบรูป: <strong>2, 4, 8, 16, 32, ?</strong>",
      "choices": [
          "48",
          "64",
          "72",
          "96"
      ],
      "answer": 1,
      "explanation": "อนุกรมคูณ 2 (2ⁿ): 32 × 2 = <strong>64</strong>"
  },
  {
      "prompt": "ข้อที่ 61: จงหาตัวอักษรถัดไปของอนุกรม: <strong>A, C, E, G, ?</strong>",
      "choices": [
          "H",
          "I",
          "J",
          "K"
      ],
      "answer": 1,
      "explanation": "เว้นข้ามทีละ 1 อักษร (A [B] C [D] E [F] G [H] I) ตัวถัดไปคือ <strong>I</strong>"
  },
  {
      "prompt": "ข้อที่ 62: สรุปเหตุผล: <br>เหตุ 1: นกทุกตัวมีขน <br>เหตุ 2: เพนกวินเป็นนกชนิดหนึ่ง <br>ข้อสรุปคือข้อใด",
      "choices": [
          "เพนกวินไม่มีขน",
          "เพนกวินมีขน",
          "เพนกวินบินได้",
          "สรุปไม่ได้"
      ],
      "answer": 1,
      "explanation": "เพนกวินเป็นนก และนกทุกตัวมีขน ดังนั้น <strong>เพนกวินมีขน</strong>"
  },
  {
      "prompt": "ข้อที่ 63: เงื่อนไขสัญลักษณ์: กำหนดให้ P ≤ Q และ Q < R ข้อใดสรุปได้แน่นอน",
      "choices": [
          "P < R",
          "P > R",
          "P = R",
          "สรุปไม่ได้"
      ],
      "answer": 0,
      "explanation": "P น้อยกว่าหรือเท่ากับ Q แต่ Q น้อยกว่า R ดังนั้น P จึงต้อง <strong>น้อยกว่า R (P < R)</strong> เสมอ"
  },
  {
      "prompt": "ข้อที่ 64: ประพจน์ p ∨ ~p มีค่าความจริงเป็นอย่างไรเสมอ",
      "choices": [
          "จริงเสมอ (Tautology)",
          "เท็จเสมอ (Contradiction)",
          "ขึ้นกับค่าความจริงของ p",
          "ไม่แน่นอน"
      ],
      "answer": 0,
      "explanation": "ประพจน์ที่เชื่อมด้วย ∨ (หรือ) ระหว่าง p กับ นิเสธของ p จะมีค่าความจริงเป็น <strong>จริงเสมอ (Tautology)</strong>"
  },
  {
      "prompt": "ข้อที่ 65: เงื่อนไขสัญลักษณ์: กำหนดให้ M = N และ N > O ข้อใดสรุปถูกต้องแน่นอน",
      "choices": [
          "M < O",
          "M = O",
          "M > O",
          "สรุปไม่ได้"
      ],
      "answer": 2,
      "explanation": "แทน N ด้วย M จะได้ <strong>M > O</strong>"
  },
  {
      "prompt": "ข้อที่ 66: จงหาตัวอักษรถัดไปของแบบรูปย้อนกลับ: <strong>Z, Y, X, W, ?</strong>",
      "choices": [
          "U",
          "V",
          "T",
          "S"
      ],
      "answer": 1,
      "explanation": "เรียงย้อนกลับอักษรภาษาอังกฤษ ตัวถัดจาก W คือ <strong>V</strong>"
  },
  {
      "prompt": "ข้อที่ 67: สรุปเหตุผล: <br>เหตุ 1: คนที่สอบผ่านทุกคนตั้งใจเรียน <br>เหตุ 2: นารีสอบผ่าน <br>ข้อสรุปคือข้อใด",
      "choices": [
          "นารีไม่ตั้งใจเรียน",
          "นารีตั้งใจเรียน",
          "นารีอาจสอบตก",
          "สรุปไม่ได้"
      ],
      "answer": 1,
      "explanation": "นารีอยู่ในกลุ่มคนที่สอบผ่าน ดังนั้น <strong>นารีตั้งใจเรียน</strong>"
  },
  {
      "prompt": "ข้อที่ 68: แผนภาพเวนน์: เซต A มีสมาชิก 8 ตัว เซต B มีสมาชิก 6 ตัว ถ้า A ∩ B มีสมาชิก 3 ตัว แล้ว A ∪ B มีสมาชิกกี่ตัว",
      "choices": [
          "9 ตัว",
          "11 ตัว",
          "14 ตัว",
          "17 ตัว"
      ],
      "answer": 1,
      "explanation": "สูตร n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 8 + 6 - 3 = <strong>11 ตัว</strong>"
  },
  {
      "prompt": "ข้อที่ 69: จงหาลำดับถัดไปของอนุกรม: <strong>3, 9, 27, 81, ?</strong>",
      "choices": [
          "162",
          "243",
          "324",
          "729"
      ],
      "answer": 1,
      "explanation": "อนุกรมคูณ 3 ต่อเนื่อง (3ⁿ): 81 × 3 = <strong>243</strong>"
  },
  {
      "prompt": "ข้อที่ 70: เงื่อนไขสัญลักษณ์: กำหนดให้ A > B และ C < B ข้อใดสรุปได้ถูกต้องแน่นอน",
      "choices": [
          "A > C",
          "A < C",
          "A = C",
          "สรุปไม่ได้"
      ],
      "answer": 0,
      "explanation": "C < B หมายถึง B > C เมื่อ A > B และ B > C จะสรุปได้ว่า <strong>A > C</strong>"
  },
  {
      "prompt": "ข้อที่ 71: ประพจน์ \"p → q\" สมกาล (Equivalence) กับประพจน์ในข้อใด",
      "choices": [
          "~p ∨ q",
          "~p ∧ q",
          "p ∨ ~q",
          "~p → ~q"
      ],
      "answer": 0,
      "explanation": "ตามกฎตรรกศาสตร์ p → q สมกาลกับ <strong>~p ∨ q</strong>"
  },
  {
      "prompt": "ข้อที่ 72: สรุปเหตุผล: ถ้าเรือพังแล้วเดินทางไม่ได้ บัดนี้เดินทางได้ สรุปว่าอย่างไร",
      "choices": [
          "เรือพัง",
          "เรือไม่พัง",
          "เรือกำลังซ่อม",
          "สรุปไม่ได้"
      ],
      "answer": 1,
      "explanation": "ตาม Modus Tollens เมื่อเดินทางได้ สรุปว่า <strong>เรือไม่พัง</strong>"
  },
  {
      "prompt": "ข้อที่ 73: จงหาลำดับถัดไปของอนุกรมฟีโบนักชี (Fibonacci): <strong>1, 1, 2, 3, 5, 8, 13, ?</strong>",
      "choices": [
          "18",
          "20",
          "21",
          "24"
      ],
      "answer": 2,
      "explanation": "อนุกรมฟีโบนักชี นำสองพจน์ก่อนหน้าบวกกัน: 8 + 13 = <strong>21</strong>"
  },
  {
      "prompt": "ข้อที่ 74: เงื่อนไขสัญลักษณ์: กำหนดให้ K ≥ L และ L ≥ M สรุปได้ว่าอย่างไร",
      "choices": [
          "K ≥ M",
          "K < M",
          "K = M เท่านั้น",
          "สรุปไม่ได้"
      ],
      "answer": 0,
      "explanation": "โดยสมบัติการส่งผ่าน สรุปได้แน่นอนว่า <strong>K ≥ M</strong>"
  },
  {
      "prompt": "ข้อที่ 75: คน 40 คน ชอบทานเผ็ด 20 คน ชอบทานหวาน 25 คน ชอบทั้งสองอย่าง 10 คน มีคนที่ไม่ชอบทานทั้งเผ็ดและหวานกี่คน",
      "choices": [
          "3 คน",
          "5 คน",
          "8 คน",
          "10 คน"
      ],
      "answer": 1,
      "explanation": "จำนวนคนที่ชอบอย่างน้อยหนึ่งอย่าง = 20 + 25 - 10 = 35 คน ดังนั้นคนที่ไม่ชอบทั้งสองอย่าง = 40 - 35 = <strong>5 คน</strong>"
  }
];
const SPATIAL_QUESTIONS = [
  {
    "prompt": "ข้อที่ 1: แผ่นกระดาษคลี่รูปแถวยาว 4 ด้านเรียงกัน A - B - C - D เมื่อพับเป็นกล่องลูกบาศก์ ด้านตรงข้ามของ A คือด้านใด?",
    "choices": [
      "ด้าน B",
      "ด้าน C",
      "ด้าน D",
      "ด้านข้าง"
    ],
    "answer": 1,
    "explanation": "กฎการคลี่กล่องในแถวตรง: ด้านเว้นระยะห่าง 1 ช่อง จะพับมาตรงข้ามกัน (A ตรงข้าม C)"
  },
  {
    "prompt": "ข้อที่ 2: หมุนรูปภาพ 2 มิติ ทิศทางตามเข็มนาฬิกา 90 องศา ลูกศรที่ชี้ขวา ➔ จะชี้ไปทิศใด?",
    "choices": [
      "ชี้ขึ้นบน ⬆",
      "ชี้ลงข้างล่าง ⬇",
      "ชี้ไปทางซ้าย ⬅",
      "ชี้เฉียงขึ้นขวา ↗"
    ],
    "answer": 1,
    "explanation": "ชี้ขวา (3 นาฬิกา) หมุนตามเข็ม 90 องศา จะชี้ลงข้างล่าง ⬇ (6 นาฬิกา)"
  },
  {
    "prompt": "ข้อที่ 3: ลูกบาศก์ขนาด 3×3×3 ซม. ถูกทาสีแดงรอบนอกทั้งหมด แล้วตัดเป็นก้อนเล็ก 1×1×1 ซม. มีกี่ชิ้นที่ไม่ถูกทาสีเลย?",
    "choices": [
      "0 ชิ้น",
      "1 ชิ้น",
      "6 ชิ้น",
      "8 ชิ้น"
    ],
    "answer": 1,
    "explanation": "ชิ้นไม่ถูกทาสีคือชิ้นแกนกลางด้านในสุด: (3-2)³ = 1³ = <strong>1 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 4: ภาพเงาสะท้อน (Mirror Image) แนวตั้งของตัวอักษร \"F\" มีลักษณะตามข้อใด?",
    "choices": [
      "กลับหัวลงล่าง",
      "กลับซ้ายเป็นขวา (รูปสะท้อน ꟻ)",
      "เหมือนเดิมทุกประการ",
      "หมุน 180 องศา"
    ],
    "answer": 1,
    "explanation": "สะท้อนกระจกแนวตั้ง สลับทิศซ้าย-ขวา (กลายเป็น ꟻ)"
  },
  {
    "prompt": "ข้อที่ 5: ทรงตั้งลูกบาศก์ฐานแน่น กว้าง 2 ลึก 2 สูง 3 ชั้น จะมีจำนวนลูกบาศก์ทั้งหมดกี่ชิ้น?",
    "choices": [
      "8 ชิ้น",
      "12 ชิ้น",
      "16 ชิ้น",
      "24 ชิ้น"
    ],
    "answer": 1,
    "explanation": "ชั้นละ 2 × 2 = 4 ชิ้น. มี 3 ชั้น = 4 × 3 = <strong>12 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 6: เมื่อหมุนรูปภาพทวนเข็มนาฬิกา 180 องศา ลูกศรชี้ขึ้นบน ⬆ จะชี้ไปทางทิศใด?",
    "choices": [
      "ชี้ขึ้นบน ⬆",
      "ชี้ลงข้างล่าง ⬇",
      "ชี้ไปทางซ้าย ⬅",
      "ชี้ไปทางขวา ➔"
    ],
    "answer": 1,
    "explanation": "หมุน 180 องศา จะกลับทิศทางตรงข้าม 100% จากขึ้นเปลี่ยนเป็น <strong>ลงข้างล่าง ⬇</strong>"
  },
  {
    "prompt": "ข้อที่ 7: แผ่นกระดาษคลี่รูปกากบาท 6 ด้าน ด้านตรงข้ามของด้านศูนย์กลาง จะเป็นด้านใด?",
    "choices": [
      "ด้านบน",
      "ด้านล่าง",
      "ด้านข้างขวา",
      "ด้านฝากล่องปิดบนสุด"
    ],
    "answer": 3,
    "explanation": "ปีกที่ต่อถัดไปสองช่วงจะพับมาปิดเป็นฝาด้านตรงข้าม"
  },
  {
    "prompt": "ข้อที่ 8: ลูกบาศก์ 3×3×3 ซม. ถูกทาสีรอบนอกทั้งหมด มีลูกบาศก์เล็ก 1×1×1 ซม. กี่ชิ้นที่มีสีทาเพียง 1 ด้าน?",
    "choices": [
      "4 ชิ้น",
      "6 ชิ้น",
      "8 ชิ้น",
      "12 ชิ้น"
    ],
    "answer": 1,
    "explanation": "ลูกบาศก์มี 6 หน้า แต่ละหน้ามีชิ้นกลาง 1 ชิ้น -> 6 × 1 = <strong>6 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 9: ลูกบาศก์ 3×3×3 ซม. ถูกทาสีรอบนอกทั้งหมด มีลูกบาศก์เล็ก 1×1×1 ซม. กี่ชิ้นที่มีสีทา 3 ด้าน?",
    "choices": [
      "4 ชิ้น",
      "6 ชิ้น",
      "8 ชิ้น",
      "12 ชิ้น"
    ],
    "answer": 2,
    "explanation": "ชิ้นที่มีสีทา 3 ด้าน อยู่ตรงมุมทั้ง 8 มุม = <strong>8 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 10: ภาพสะท้อนกระจกเงาแนวตั้งของเข็มนาฬิกาที่ชี้เวลา 3:00 น. จะมองเห็นเป็นเวลาเท่าใด?",
    "choices": [
      "3:00 น.",
      "6:00 น.",
      "9:00 น.",
      "12:00 น."
    ],
    "answer": 2,
    "explanation": "เข็มสั้นชี้ที่ 3 (ขวา) เมื่อสะท้อนกระจกแนวตั้งจะสลับไปชี้ที่ 9 (ซ้าย) = <strong>9:00 น.</strong>"
  },
  {
    "prompt": "ข้อที่ 11: หมุนรูปภาพทวนเข็มนาฬิกา 90 องศา ลูกศรชี้ขึ้นบน ⬆ จะชี้ไปทิศใด?",
    "choices": [
      "ชี้ไปทางซ้าย ⬅",
      "ชี้ไปทางขวา ➔",
      "ชี้ลงข้างล่าง ⬇",
      "ชี้ขึ้นบน ⬆"
    ],
    "answer": 0,
    "explanation": "ขึ้นบน (12 น.) หมุนทวนเข็ม 90° จะชี้ไปทางซ้าย ⬅ (9 น.)"
  },
  {
    "prompt": "ข้อที่ 12: ทรงตั้งลูกบาศก์กว้าง 3 ลึก 3 สูง 3 ชั้น เจาะรูตรงกลางทะลุลงล่าง จะมีลูกบาศก์เหลือกี่ชิ้น?",
    "choices": [
      "20 ชิ้น",
      "22 ชิ้น",
      "24 ชิ้น",
      "26 ชิ้น"
    ],
    "answer": 2,
    "explanation": "ลูกบาศก์เต็ม 27 ชิ้น. เจาะทะลุ 3 ชั้น = 27 - 3 = <strong>24 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 13: ภาพสะท้อนกระจกเงาแนวตั้งของคำภาษาอังกฤษ \"BOX\" ตัวอักษรใดจะยังคงรูปแบบเดิม?",
    "choices": [
      "ตัว B เท่านั้น",
      "ตัว O และ X",
      "ตัว B และ O",
      "เปลี่ยนรูปทั้งหมด"
    ],
    "answer": 1,
    "explanation": "O และ X มีแกนสมมาตรแนวตั้ง รูปสะท้อนกระจกจึงเหมือนเดิม"
  },
  {
    "prompt": "ข้อที่ 14: แผ่นกระดาษคลี่รูปตัว T ประกอบด้วย 6 สี่เหลี่ยม เมื่อพับเป็นกล่องทรงลูกบาศก์ จะได้กล่องสมบูรณ์หรือไม่?",
    "choices": [
      "ได้กล่องสมบูรณ์",
      "ไม่ได้กล่อง",
      "ขาด 1 หน้า",
      "ขาด 2 หน้า"
    ],
    "answer": 0,
    "explanation": "รูปตัว T 6 สี่เหลี่ยม เป็นรูปแบบมาตรฐานที่พับได้กล่องสมบูรณ์"
  },
  {
    "prompt": "ข้อที่ 15: ทรงกระบอก 5 แท่งวางเรียงที่ฐาน มี 3 แท่งซ้อนแถวสอง และ 1 แท่งซ้อนยอดบนสุด มีทรงกระบอกรวมกี่แท่ง?",
    "choices": [
      "7 แท่ง",
      "8 แท่ง",
      "9 แท่ง",
      "10 แท่ง"
    ],
    "answer": 2,
    "explanation": "รวม 5 + 3 + 1 = <strong>9 แท่ง</strong>"
  },
  {
    "prompt": "ข้อที่ 16: กล่องลูกบาศก์มีทั้งหมดกี่หน้า กี่ขอบ และกี่จุดยอด?",
    "choices": [
      "6 หน้า 12 ขอบ 8 จุดยอด",
      "6 หน้า 8 ขอบ 12 จุดยอด",
      "8 หน้า 12 ขอบ 6 จุดยอด",
      "4 หน้า 8 ขอบ 6 จุดยอด"
    ],
    "answer": 0,
    "explanation": "กล่องลูกบาศก์ประกอบด้วย 6 หน้า 12 ขอบ และ 8 จุดยอด"
  },
  {
    "prompt": "ข้อที่ 17: ภาพสะท้อนกระจกเงาแนวนอน (กระจกส่องด้านล่าง) ของตัวอักษร \"E\" จะมีลักษณะอย่างไร?",
    "choices": [
      "เหมือนเดิมทุกประการ",
      "กลับซ้ายเป็นขวา",
      "กลับหัวลงล่าง",
      "เอียง 45 องศา"
    ],
    "answer": 0,
    "explanation": "ตัว E มีแกนสมมาตรแนวนอน ภาพสะท้อนกระจกด้านล่างจึงเหมือนเดิมทุกประการ"
  },
  {
    "prompt": "ข้อที่ 18: เมื่อหมุนรูปภาพตามเข็มนาฬิกา 270 องศา จะได้ผลลัพธ์เท่ากับการหมุนทิศใด?",
    "choices": [
      "ทวนเข็มนาฬิกา 90 องศา",
      "ตามเข็มนาฬิกา 90 องศา",
      "ทวนเข็มนาฬิกา 180 องศา",
      "หมุนครบรอบ"
    ],
    "answer": 0,
    "explanation": "ตามเข็ม 270° มีตำแหน่งปลายทางเท่ากับ ทวนเข็ม 90° (360 - 270 = 90)"
  },
  {
    "prompt": "ข้อที่ 19: ลูกบาศก์ 4×4×4 ซม. ถูกทาสีรอบนอกทั้งหมด จะมีลูกบาศก์เล็ก 1×1×1 ซม. กี่ชิ้นที่ไม่ถูกทาสีเลย?",
    "choices": [
      "4 ชิ้น",
      "8 ชิ้น",
      "16 ชิ้น",
      "27 ชิ้น"
    ],
    "answer": 1,
    "explanation": "แกนกลางในสุด = (4-2)³ = 2³ = <strong>8 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 20: ภาพคลี่กล่องลูกบาศก์ 6 ด้าน มีจำนวนรูปแบบมาตรฐานที่พับได้กล่องสมบูรณ์กี่รูปแบบ?",
    "choices": [
      "8 รูปแบบ",
      "10 รูปแบบ",
      "11 รูปแบบ",
      "12 รูปแบบ"
    ],
    "answer": 2,
    "explanation": "รูปแบบคลี่กล่องลูกบาศก์มาตรฐานมีทั้งหมด <strong>11 รูปแบบ</strong>"
  },
  {
    "prompt": "ข้อที่ 21: หมุนรูปภาพตามเข็มนาฬิกา 180 องศา ลูกศรชี้ซ้าย ⬅ จะชี้ไปทิศใด?",
    "choices": [
      "ชี้ไปทางขวา ➔",
      "ชี้ขึ้นบน ⬆",
      "ชี้ลงข้างล่าง ⬇",
      "ชี้ไปทางซ้าย ⬅"
    ],
    "answer": 0,
    "explanation": "หมุน 180° จะสลับทิศตรงข้าม จากซ้ายเปลี่ยนเป็น <strong>ขวา ➔</strong>"
  },
  {
    "prompt": "ข้อที่ 22: ภาพสะท้อนกระจกเงาแนวตั้งของนาฬิกาชี้เวลา 6:00 น. จะมองเห็นเป็นเวลาเท่าใด?",
    "choices": [
      "6:00 น.",
      "12:00 น.",
      "3:00 น.",
      "9:00 น."
    ],
    "answer": 0,
    "explanation": "เข็มสั้นชี้เลข 6 (ล่าง) เข็มยาวชี้เลข 12 (บน) อยู่บนแกนสะท้อนพอดี จึงมองเห็นเป็น <strong>6:00 น.</strong> เท่าเดิม"
  },
  {
    "prompt": "ข้อที่ 23: ทรงตั้งลูกบาศก์ฐาน 3×3 ซม. สูง 2 ชั้น จะมีลูกบาศก์รวมกี่ชิ้น?",
    "choices": [
      "12 ชิ้น",
      "18 ชิ้น",
      "27 ชิ้น",
      "36 ชิ้น"
    ],
    "answer": 1,
    "explanation": "ชั้นละ 3 × 3 = 9 ชิ้น. มี 2 ชั้น = 9 × 2 = <strong>18 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 24: ภาพสะท้อนกระจกเงาแนวตั้งของตัวอักษร \"MOM\" จะมีลักษณะอย่างไร?",
    "choices": [
      "เหมือนเดิม MOM",
      "สลับเป็น MOM",
      "กลับหัวเป็น WOW",
      "กลายเป็น OMO"
    ],
    "answer": 0,
    "explanation": "อักษร M, O, M มีแกนสมมาตรแนวตั้ง ภาพสะท้อนกระจกจึงได้ MOM เหมือนเดิม"
  },
  {
    "prompt": "ข้อที่ 25: หากนำลูกบาศก์ 2 ชิ้นมาวางต่อติดกัน จะมีหน้าที่มองเห็นได้รอบนอกกี่หน้า?",
    "choices": [
      "10 หน้า",
      "11 หน้า",
      "12 หน้า",
      "14 หน้า"
    ],
    "answer": 0,
    "explanation": "ลูกบาศก์ 2 ชิ้นมี 12 หน้า ประกบติดกันประกบซ่อนไป 2 หน้า เหลือมองเห็น = 12 - 2 = <strong>10 หน้า</strong>"
  },
  {
    "prompt": "ข้อที่ 26: หมุนรูปภาพทวนเข็มนาฬิกา 90 องศา ลูกศรชี้ลงข้างล่าง ⬇ จะชี้ไปทิศใด?",
    "choices": [
      "ชี้ไปทางขวา ➔",
      "ชี้ไปทางซ้าย ⬅",
      "ชี้ขึ้นบน ⬆",
      "ชี้ลงข้างล่าง ⬇"
    ],
    "answer": 0,
    "explanation": "ลงข้างล่าง (6 น.) หมุนทวนเข็ม 90° จะชี้ไปทางขวา ➔ (3 น.)"
  },
  {
    "prompt": "ข้อที่ 27: ลูกบาศก์ 4×4×4 ซม. ถูกทาสีรอบนอกทั้งหมด มีกี่ชิ้นที่มีสีทาเพียงด้านเดียว?",
    "choices": [
      "16 ชิ้น",
      "24 ชิ้น",
      "32 ชิ้น",
      "36 ชิ้น"
    ],
    "answer": 1,
    "explanation": "แต่ละหน้ามีชิ้นกลาง (4-2)² = 4 ชิ้น. มี 6 หน้า = 6 × 4 = <strong>24 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 28: ภาพสะท้อนกระจกเงาแนวตั้งของเลข \"2\" จะมีลักษณะอย่างไร?",
    "choices": [
      "กลับซ้ายเป็นขวา (Ƨ)",
      "กลับหัวลงล่าง (5)",
      "เหมือนเดิม",
      "กลายเป็นเลข 8"
    ],
    "answer": 0,
    "explanation": "เลข 2 สะท้อนกระจกแนวตั้ง จะกลับทิศเป็น Ƨ"
  },
  {
    "prompt": "ข้อที่ 29: ทรงตั้งลูกบาศก์กว้าง 2 ลึก 2 สูง 4 ชั้น รวมมีกี่ชิ้น?",
    "choices": [
      "8 ชิ้น",
      "12 ชิ้น",
      "16 ชิ้น",
      "20 ชิ้น"
    ],
    "answer": 2,
    "explanation": "2 × 2 × 4 = <strong>16 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 30: วัตถุทรงกรวยเมื่อมองจากด้านข้าง (Side View) จะมองเห็นเป็นรูปทรงใด?",
    "choices": [
      "รูปสามเหลี่ยม",
      "รูปวงกลม",
      "รูปสี่เหลี่ยม",
      "รูปวงรี"
    ],
    "answer": 0,
    "explanation": "ทรงกรวยมองจากด้านข้างจะเห็นเป็น <strong>รูปสามเหลี่ยม</strong>"
  },
  {
    "prompt": "ข้อที่ 31: วัตถุทรงกรวยเมื่อมองจากด้านบน (Top View) จะมองเห็นเป็นรูปทรงใด?",
    "choices": [
      "รูปวงกลมมีจุดตรงกลาง",
      "รูปสามเหลี่ยม",
      "รูปสี่เหลี่ยม",
      "รูปวงรี"
    ],
    "answer": 0,
    "explanation": "มองจากด้านบนจะเห็นเป็น <strong>รูปวงกลมพร้อมจุดยอดตรงกลาง</strong>"
  },
  {
    "prompt": "ข้อที่ 32: ทรงกระบอกเมื่อมองจากด้านข้าง (Side View) จะมองเห็นเป็นรูปทรงใด?",
    "choices": [
      "รูปสี่เหลี่ยมผืนผ้า",
      "รูปวงกลม",
      "รูปสามเหลี่ยม",
      "รูปวงรี"
    ],
    "answer": 0,
    "explanation": "ทรงกระบอกมองจากด้านข้างจะเห็นเป็น <strong>รูปสี่เหลี่ยมผืนผ้า</strong>"
  },
  {
    "prompt": "ข้อที่ 33: หมุนรูปภาพตามเข็มนาฬิกา 90 องศา ลูกศรชี้ซ้าย ⬅ จะชี้ไปทิศใด?",
    "choices": [
      "ชี้ขึ้นบน ⬆",
      "ชี้ลงข้างล่าง ⬇",
      "ชี้ไปทางขวา ➔",
      "ชี้ไปทางซ้าย ⬅"
    ],
    "answer": 0,
    "explanation": "ชี้ซ้าย (9 น.) หมุนตามเข็ม 90° จะชี้ขึ้นบน ⬆ (12 น.)"
  },
  {
    "prompt": "ข้อที่ 34: ภาพสะท้อนกระจกเงาแนวตั้งของคำว่า \"AHA\" จะเป็นอย่างไร?",
    "choices": [
      "เหมือนเดิม AHA",
      "กลายเป็น HAH",
      "กลับหัว",
      "กลายเป็น AAH"
    ],
    "answer": 0,
    "explanation": "A และ H มีแกนสมมาตรแนวตั้ง สะท้อนกระจกได้ AHA เหมือนเดิม"
  },
  {
    "prompt": "ข้อที่ 35: ลูกบาศก์ 4×4×4 ซม. มีจำนวนลูกบาศก์เล็ก 1×1×1 ซม. ทั้งหมดกี่ชิ้น?",
    "choices": [
      "36 ชิ้น",
      "48 ชิ้น",
      "64 ชิ้น",
      "81 ชิ้น"
    ],
    "answer": 2,
    "explanation": "4 × 4 × 4 = <strong>64 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 36: ภาพสะท้อนกระจกเงาแนวตั้งของเข็มนาฬิกาชี้ 12:00 น. จะมองเห็นเป็นเวลาเท่าใด?",
    "choices": [
      "12:00 น.",
      "6:00 น.",
      "3:00 น.",
      "9:00 น."
    ],
    "answer": 0,
    "explanation": "เข็มชี้ตรง 12 อยู่บนแกนสะท้อน ได้ 12:00 น. เท่าเดิม"
  },
  {
    "prompt": "ข้อที่ 37: หมุนรูปภาพทวนเข็มนาฬิกา 360 องศา ผลลัพธ์จะเป็นอย่างไร?",
    "choices": [
      "เหมือนเดิมทุกประการ",
      "กลับหัวลงล่าง",
      "สลับซ้ายขวา",
      "เอียง 90 องศา"
    ],
    "answer": 0,
    "explanation": "หมุน 360 องศา คือหมุนครบรอบ กลับมาที่ตำแหน่งเดิมทุกประการ"
  },
  {
    "prompt": "ข้อที่ 38: ทรงพีระมิดฐานสี่เหลี่ยมมีกี่หน้า กี่ขอบ และกี่จุดยอด?",
    "choices": [
      "5 หน้า 8 ขอบ 5 จุดยอด",
      "4 หน้า 6 ขอบ 4 จุดยอด",
      "6 หน้า 10 ขอบ 6 จุดยอด",
      "5 หน้า 6 ขอบ 5 จุดยอด"
    ],
    "answer": 0,
    "explanation": "ฐานสี่เหลี่ยม 1 หน้า + ปีกสามเหลี่ยม 4 หน้า = 5 หน้า, 8 ขอบ, 5 จุดยอด"
  },
  {
    "prompt": "ข้อที่ 39: ลูกบาศก์ 3×3×3 ซม. ถูกทาสีรอบนอกทั้งหมด มีลูกบาศก์เล็กกี่ชิ้นที่มีสีทา 2 ด้าน?",
    "choices": [
      "8 ชิ้น",
      "12 ชิ้น",
      "16 ชิ้น",
      "24 ชิ้น"
    ],
    "answer": 1,
    "explanation": "ชิ้นที่มีสีทา 2 ด้าน อยู่ตรงขอบ 12 ขอบ ขอบละ 1 ชิ้น = <strong>12 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 40: ภาพสะท้อนกระจกเงาแนวตั้งของตัวอักษร \"T\" มีลักษณะอย่างไร?",
    "choices": [
      "เหมือนเดิม T",
      "สลับซ้ายขวา ⊥",
      "กลับหัว ⊥",
      "เอียงขวา"
    ],
    "answer": 0,
    "explanation": "ตัว T มีแกนสมมาตรแนวตั้ง ภาพสะท้อนกระจกจึงได้ T เหมือนเดิม"
  },
  {
    "prompt": "ข้อที่ 41: วัตถุรูปทรงปริซึมสามเหลี่ยม เมื่อมองจากด้านหน้าจะเห็นเป็นรูปทรงใด?",
    "choices": [
      "รูปสามเหลี่ยม",
      "รูปสี่เหลี่ยม",
      "รูปวงกลม",
      "รูปห้าเหลี่ยม"
    ],
    "answer": 0,
    "explanation": "มองจากด้านหน้าด้านฐานสามเหลี่ยม จะเห็นเป็น <strong>รูปสามเหลี่ยม</strong>"
  },
  {
    "prompt": "ข้อที่ 42: หมุนรูปภาพตามเข็มนาฬิกา 180 องศา ตัวอักษร \"V\" จะเปลี่ยนเป็นรูปใด?",
    "choices": [
      "รูป Ʌ (กลับหัว)",
      "รูป V เหมือนเดิม",
      "รูป <",
      "รูป >"
    ],
    "answer": 0,
    "explanation": "หมุน 180° ตัว V จะกลับหัวลงล่างกลายเป็น Ʌ"
  },
  {
    "prompt": "ข้อที่ 43: ภาพสะท้อนกระจกเงาแนวนอน (กระจกส่องด้านล่าง) ของตัวอักษร \"A\" จะมีลักษณะอย่างไร?",
    "choices": [
      "กลับหัวลงล่าง ",
      "เหมือนเดิม A",
      "สลับซ้ายขวา",
      "เอียง 90 องศา"
    ],
    "answer": 0,
    "explanation": "สะท้อนกระจกด้านล่าง ตัว A จะกลับหัวลงล่าง"
  },
  {
    "prompt": "ข้อที่ 44: ทรงตั้งลูกบาศก์กว้าง 3 ลึก 1 สูง 3 ชั้น มีลูกบาศก์รวมกี่ชิ้น?",
    "choices": [
      "6 ชิ้น",
      "9 ชิ้น",
      "12 ชิ้น",
      "15 ชิ้น"
    ],
    "answer": 1,
    "explanation": "3 × 1 × 3 = <strong>9 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 45: ลูกบาศก์ 2×2×2 ซม. ถูกทาสีรอบนอกทั้งหมด จะมีลูกบาศก์เล็ก 1×1×1 ซม. กี่ชิ้นที่ไม่ถูกทาสีเลย?",
    "choices": [
      "0 ชิ้น",
      "1 ชิ้น",
      "2 ชิ้น",
      "4 ชิ้น"
    ],
    "answer": 0,
    "explanation": "ทุกชิ้น (8 ชิ้น) อยู่ตรงมุมภายนอกทั้งหมด จึงไม่มีชิ้นใดเลยที่ไม่ถูกทาสี = <strong>0 ชิ้น</strong>"
  },
  {
    "prompt": "ข้อที่ 46: ลูกบาศก์ 2×2×2 ซม. ถูกทาสีรอบนอกทั้งหมด ทุกชิ้น (8 ชิ้น) จะถูกทาสีกี่ด้าน?",
    "choices": [
      "1 ด้าน",
      "2 ด้าน",
      "3 ด้าน",
      "4 ด้าน"
    ],
    "answer": 2,
    "explanation": "ทุกชิ้นอยู่ตรงมุมทั้ง 8 มุมพอดี จึงถูกทาสีชิ้นละ <strong>3 ด้าน</strong>"
  },
  {
    "prompt": "ข้อที่ 47: หมุนรูปภาพทวนเข็มนาฬิกา 90 องศา ลูกศรชี้ขวา ➔ จะชี้ไปทิศใด?",
    "choices": [
      "ชี้ขึ้นบน ⬆",
      "ชี้ลงข้างล่าง ⬇",
      "ชี้ไปทางซ้าย ⬅",
      "ชี้ขวา ➔"
    ],
    "answer": 0,
    "explanation": "ชี้ขวา (3 น.) หมุนทวนเข็ม 90° จะชี้ขึ้นบน ⬆ (12 น.)"
  },
  {
    "prompt": "ข้อที่ 48: ภาพสะท้อนกระจกเงาแนวตั้งของเข็มนาฬิกาชี้ 9:00 น. จะมองเห็นเป็นเวลาเท่าใด?",
    "choices": [
      "3:00 น.",
      "6:00 น.",
      "9:00 น.",
      "12:00 น."
    ],
    "answer": 0,
    "explanation": "เข็มสั้นชี้ 9 (ซ้าย) สลับไปชี้ 3 (ขวา) = <strong>3:00 น.</strong>"
  },
  {
    "prompt": "ข้อที่ 49: นำทรงกระบอก 3 แท่งวางตั้งเรียงติดกันเป็นแถว จะมองจากด้านบนเห็นเป็นรูปใด?",
    "choices": [
      "รูปวงกลม 3 วงเรียงกัน",
      "รูปสี่เหลี่ยม 3 รูป",
      "รูปสามเหลี่ยม",
      "รูปทรงกระบอก"
    ],
    "answer": 0,
    "explanation": "มองจากด้านบนจะเห็นเป็น <strong>วงกลม 3 วงเรียงต่อกัน</strong>"
  },
  {
    "prompt": "ข้อที่ 50: นำสี่เหลี่ยมจัตุรัส 4 รูปมาวางต่อกันเป็นรูปตัว L มีเส้นรอบรูปยาวกี่หน่วย? (แต่ละด้านยาว 1 หน่วย)",
    "choices": [
      "8 หน่วย",
      "10 หน่วย",
      "12 หน่วย",
      "14 หน่วย"
    ],
    "answer": 1,
    "explanation": "รูปตัว L 4 ตาราง มีขอบภายนอกล้อมรอบรวม <strong>10 หน่วย</strong>"
  }
,
  {
      "prompt": "ข้อที่ 51: กล่องลูกบาศก์มี 6 หน้า กำหนดตัวเลข 1 ถึง 6 บนแต่ละหน้า หน้าที่อยู่ตรงข้ามกับหน้าเลข 1 คือหน้าเลขใดในแผ่นคลี่มาตรฐาน",
      "choices": [
          "เลข 2",
          "เลข 4",
          "เลข 5",
          "เลข 6"
      ],
      "answer": 3,
      "explanation": "ในลูกบาศก์มาตรฐาน หน้าตรงข้ามของ 1 คือ <strong>เลข 6</strong> (รวมกันได้ 7)"
  },
  {
      "prompt": "ข้อที่ 52: หมุนรูปอักษร 'F' ตามเข็มนาฬิกาไป 90 องศา จะได้รูปอักษรชี้ไปทางทิศใด",
      "choices": [
          "หัวอักษรชี้ไปทางขวา",
          "หัวอักษรชี้ลงล่าง",
          "หัวอักษรชี้ไปทางซ้าย",
          "รูปเดิม"
      ],
      "answer": 0,
      "explanation": "หมุนตามเข็ม 90 องศา ทำให้ส่วนหัวและขีดของอักษร F <strong>หมุนชี้ไปทางขวา</strong>"
  },
  {
      "prompt": "ข้อที่ 53: หมุนรูปสามเหลี่ยมที่ชี้ขึ้นฟ้าไป 180 องศา จะได้รูปในลักษณะใด",
      "choices": [
          "สามเหลี่ยมชี้ไปทางขวา",
          "สามเหลี่ยมชี้ลงล่าง",
          "สามเหลี่ยมชี้ไปทางซ้าย",
          "รูปเดิม"
      ],
      "answer": 1,
      "explanation": "หมุน 180 องศา คือการกลับทิศทางตรงข้าม สามเหลี่ยมจะ <strong>ชี้ลงล่าง</strong>"
  },
  {
      "prompt": "ข้อที่ 54: ส่องกระจกเงาด้านขวา ภาพสะท้อนของอักษร 'L' จะเป็นอย่างไร",
      "choices": [
          "ปีกชี้ไปทางซ้าย",
          "ปีกชี้ไปทางขวา",
          "กลับหัวชี้ลง",
          "รูปเดิม"
      ],
      "answer": 0,
      "explanation": "กระจกเงาสะท้อนกลับซ้ายเป็นขวา ปีกของอักษร L ที่เคยชี้ขวาจะ <strong>กลับไปชี้ทางซ้าย</strong>"
  },
  {
      "prompt": "ข้อที่ 55: ส่องกระจกเงาด้านขวา ภาพสะท้อนของอักษร 'P' จะเป็นอย่างไร",
      "choices": [
          "ส่วนโค้งวงกลมชี้ไปทางซ้าย",
          "ส่วนโค้งวงกลมชี้ไปทางขวา",
          "กลับหัวลงล่าง",
          "รูปเดิม"
      ],
      "answer": 0,
      "explanation": "กระจกเงาสะท้อนระนาบซ้ายขวา ส่วนโค้งของ P ที่เคยชี้ขวาจะ <strong>ชี้ไปทางซ้าย</strong>"
  },
  {
      "prompt": "ข้อที่ 56: ทรงกล่องสี่เหลี่ยมมุมฉาก กว้าง 3 หน่วย ยาว 4 หน่วย สูง 2 หน่วย ประกอบด้วยลูกบาศก์ขนาด 1x1x1 ทั้งหมดกี่ลูก",
      "choices": [
          "18 ลูก",
          "20 ลูก",
          "24 ลูก",
          "30 ลูก"
      ],
      "answer": 2,
      "explanation": "ปริมาตร = กว้าง × ยาว × สูง = 3 × 4 × 2 = <strong>24 ลูก</strong>"
  },
  {
      "prompt": "ข้อที่ 57: ลูกบาศก์ใหญ่ขนาด 3x3x3 ทาสีแดงภายนอกทั้งหมด มีลูกบาศก์เล็ก 1x1x1 ที่ไม่อยู่ติดภายนอกเลย (ไม่ถูกทาสีเลย) กี่ลูก",
      "choices": [
          "0 ลูก",
          "1 ลูก",
          "4 ลูก",
          "8 ลูก"
      ],
      "answer": 1,
      "explanation": "ลูกบาศก์แกนกลางที่ไม่ถูกทาสี = (3-2)³ = 1³ = <strong>1 ลูก</strong>"
  },
  {
      "prompt": "ข้อที่ 58: กล่องลูกบาศก์ 6 หน้า หน้าที่อยู่ตรงข้ามกับหน้าบนสุด (Top) คือหน้าใด",
      "choices": [
          "หน้าซ้าย",
          "หน้าขวา",
          "หน้าล่างสุด (Bottom)",
          "หน้าหลัง"
      ],
      "answer": 2,
      "explanation": "ตรงข้ามกับหน้าบนสุดคือ <strong>หน้าล่างสุด (Bottom)</strong>"
  },
  {
      "prompt": "ข้อที่ 59: หมุนลูกบาศก์ไปทางซ้าย 90 องศา ด้านที่เคยอยู่ขวามือจะย้ายไปอยู่ด้านใด",
      "choices": [
          "ด้านหน้า",
          "ด้านบน",
          "ด้านหลัง",
          "ด้านซ้าย"
      ],
      "answer": 0,
      "explanation": "เมื่อหมุนวัตถุไปทางซ้าย 90 องศา ด้านขวาจะหมุนมาอยู่ตำแหน่ง <strong>ด้านหน้า</strong>"
  },
  {
      "prompt": "ข้อที่ 60: แท่นลูกบาศก์วางซ้อนกัน 3 ชั้น ชั้นล่างมี 9 ลูก ชั้นกลางมี 4 ลูก ชั้นบนมี 1 ลูก รวมมีลูกบาศก์ทั้งหมดกี่ลูก",
      "choices": [
          "12 ลูก",
          "14 ลูก",
          "16 ลูก",
          "18 ลูก"
      ],
      "answer": 1,
      "explanation": "ผลรวมลูกบาศก์ = 9 + 4 + 1 = <strong>14 ลูก</strong>"
  },
  {
      "prompt": "ข้อที่ 61: ส่องกระจกเงาด้านขวา ภาพสะท้อนของตัวเลข '3' จะเห็นเป็นอย่างไร",
      "choices": [
          "ตัวเลข 3 กลับซ้ายขวา",
          "ตัวเลข 3 กลับหัว",
          "ตัวเลข 8",
          "รูปเดิม"
      ],
      "answer": 0,
      "explanation": "กระจกเงาสะท้อนกลับซ้ายขวา ทำให้ส่วนโค้งของเลข 3 <strong>กลับทิศทางไปทางซ้าย</strong>"
  },
  {
      "prompt": "ข้อที่ 62: เมื่อพับกระดาษแผ่นคลี่รูปกากบาท 6 ช่อง จะได้รูปทรง 3 มิติชนิดใด",
      "choices": [
          "ทรงทรงกลม",
          "ลูกบาศก์ (Cube)",
          "ทรงกระบอก",
          "พีระมิด"
      ],
      "answer": 1,
      "explanation": "แผ่นคลี่รูปกากบาท 6 สี่เหลี่ยม 정사각형 พับได้เป็น <strong>ลูกบาศก์ (Cube)</strong>"
  },
  {
      "prompt": "ข้อที่ 63: เข็มนาฬิกาชี้ที่ 12 นาฬิกา เมื่อหมุนตามเข็มนาฬิกาไป 270 องศา เข็มจะชี้ที่กี่นาฬิกา",
      "choices": [
          "3 นาฬิกา",
          "6 นาฬิกา",
          "9 นาฬิกา",
          "12 นาฬิกา"
      ],
      "answer": 2,
      "explanation": "270 องศา คือ 3 ใน 4 ของวงกลม (90° = 3 น., 180° = 6 น., 270° = <strong>9 นาฬิกา</strong>)"
  },
  {
      "prompt": "ข้อที่ 64: ทรงพีระมิดลูกบาศก์ประกอบด้วยชั้นล่าง 4x4, ชั้นถัดไป 3x3, 2x2, และ 1x1 มีลูกบาศก์รวมกี่ลูก",
      "choices": [
          "24 ลูก",
          "28 ลูก",
          "30 ลูก",
          "36 ลูก"
      ],
      "answer": 2,
      "explanation": "ผลรวม = 16 + 9 + 4 + 1 = <strong>30 ลูก</strong>"
  },
  {
      "prompt": "ข้อที่ 65: ส่องกระจกเงาด้านล่าง (สะท้อนลง) ภาพสะท้อนของอักษร 'V' จะเห็นเป็นรูปใด",
      "choices": [
          "รูปอักษร V เดิม",
          "รูปคล้ายอักษร A (ไม่มีขีดกลาง) ชี้ขึ้น",
          "รูปอักษร U",
          "รูปอักษร W"
      ],
      "answer": 1,
      "explanation": "สะท้อนแนวตั้งลงล่าง ยอดแหลมของ V ที่ชี้ลงจะ <strong>กลับชี้ขึ้นฟ้าคล้ายอักษร A</strong>"
  },
  {
      "prompt": "ข้อที่ 66: หมุนรูปอักษร 'N' ไป 180 องศา จะได้รูปใด",
      "choices": [
          "รูปอักษร Z",
          "รูปอักษร N เดิม",
          "รูปอักษร M",
          "รูปกลับซ้ายขวา"
      ],
      "answer": 1,
      "explanation": "อักษร N มีสมบัติสมมาตรแบบหมุน 180 องศา จะได้เป็น <strong>รูปอักษร N เดิม</strong>"
  },
  {
      "prompt": "ข้อที่ 67: ลูกบาศก์มีจุด 1 ถึง 6 จุด บนแต่ละหน้า โดยหน้าที่ตรงข้ามกันรวมกันได้ 7 จุด หน้าตรงข้ามกับ 2 จุดคือหน้าที่มีกี่จุด",
      "choices": [
          "3 จุด",
          "4 จุด",
          "5 จุด",
          "6 จุด"
      ],
      "answer": 2,
      "explanation": "หน้าตรงข้ามรวมกันได้ 7 → 7 - 2 = <strong>5 จุด</strong>"
  },
  {
      "prompt": "ข้อที่ 68: ลูกบาศก์ใหญ่ขนาด 4x4x4 ตัดแบ่งเป็นลูกบาศก์เล็กขนาด 1x1x1 ได้ทั้งหมดกี่ลูก",
      "choices": [
          "32 ลูก",
          "48 ลูก",
          "64 ลูก",
          "80 ลูก"
      ],
      "answer": 2,
      "explanation": "ปริมาตร 4 × 4 × 4 = <strong>64 ลูก</strong>"
  },
  {
      "prompt": "ข้อที่ 69: ทรงกระบอกวางตั้ง เมื่อมองจากด้านบนตรงๆ (Top View) จะเห็นเป็นรูปภาพ 2D ชนิดใด",
      "choices": [
          "สี่เหลี่ยมผืนผ้า",
          "วงกลม",
          "สามเหลี่ยม",
          "วงรี"
      ],
      "answer": 1,
      "explanation": "มองจากมุมบนตรงๆ (Top View) ของทรงกระบอก จะเห็นเป็นรูป <strong>วงกลม</strong>"
  },
  {
      "prompt": "ข้อที่ 70: ทรงกรวย (Cone) เมื่อมองจากด้านข้างตรงๆ (Side View) จะเห็นเป็นรูปภาพ 2D ชนิดใด",
      "choices": [
          "วงกลม",
          "สี่เหลี่ยม",
          "สามเหลี่ยม",
          "ครึ่งวงกลม"
      ],
      "answer": 2,
      "explanation": "มองจากด้านข้างตรงๆ (Side View) ของทรงกรวย จะเห็นเป็นรูป <strong>สามเหลี่ยม</strong>"
  },
  {
      "prompt": "ข้อที่ 71: ส่องกระจกเงาด้านขวา ภาพสะท้อนของตัวเลข '7' จะเห็นเป็นอย่างไร",
      "choices": [
          "ตัวเลข 7 กลับซ้ายขวา",
          "ตัวเลข 7 กลับหัว",
          "ตัวเลข 1",
          "รูปเดิม"
      ],
      "answer": 0,
      "explanation": "กระจกเงาสะท้อนซ้ายขวา ทำให้ขีดบนและขาของเลข 7 <strong>กลับทิศทางซ้ายขวา</strong>"
  },
  {
      "prompt": "ข้อที่ 72: กระดาษแผ่นเรียบรูปทรงใดเมื่อนำมาม้วนพับแล้วสามารถทำเป็นทรงกระบอกได้พอดี",
      "choices": [
          "สี่เหลี่ยมผืนผ้า",
          "สามเหลี่ยม",
          "วงกลม",
          "หกเหลี่ยม"
      ],
      "answer": 0,
      "explanation": "แผ่นผิวด้านข้างของทรงกระบอกคลี่ออกเป็นรูป <strong>สี่เหลี่ยมผืนผ้า</strong>"
  },
  {
      "prompt": "ข้อที่ 73: หมุนลูกศรที่ชี้ไปทางทิศตะวันออก ตามเข็มนาฬิกาไป 90 องศา ลูกศรจะชี้ไปทิศใด",
      "choices": [
          "ทิศเหนือ",
          "ทิศใต้",
          "ทิศตะวันตก",
          "ทิศตะวันออกเฉียงใต้"
      ],
      "answer": 1,
      "explanation": "จากทิศตะวันออก หมุนตามเข็มนาฬิกา (ลงล่าง) 90 องศา จะชี้ไป <strong>ทิศใต้</strong>"
  },
  {
      "prompt": "ข้อที่ 74: ทรงกล่องสี่เหลี่ยมกว้าง 2 ยาว 5 สูง 3 ประกอบด้วยลูกบาศก์ขนาด 1x1x1 กี่ลูก",
      "choices": [
          "20 ลูก",
          "25 ลูก",
          "30 ลูก",
          "35 ลูก"
      ],
      "answer": 2,
      "explanation": "ปริมาตร 2 × 5 × 3 = <strong>30 ลูก</strong>"
  },
  {
      "prompt": "ข้อที่ 75: ทรงกลม 3 มิติ เมื่อมองจากทิศทางใดๆ ก็ตาม (Top, Side, Front View) จะเห็นเป็นรูปภาพ 2D ชนิดใดเสมอ",
      "choices": [
          "วงกลมเสมอ",
          "วงรี",
          "สี่เหลี่ยม",
          "ขึ้นกับมุมมอง"
      ],
      "answer": 0,
      "explanation": "ทรงกลมมีความสมมาตรสมบูรณ์ทุกทิศทาง มองจากมุมใดก็เห็นเป็น <strong>วงกลมเสมอ</strong>"
  }
];
const EGAT_KNOWLEDGE_QUESTIONS = [
  {
    "prompt": "ข้อที่ 1: ค่านิยมองค์กร กฟผ. คำว่า \"SPEED\" ตัวอักษร **S** ย่อมาจากคำว่าอะไร?",
    "choices": [
      "Synergy (รวมพลังประสานสร้างสรรค์)",
      "Safety (ความปลอดภัย)",
      "Speed (ความรวดเร็ว)",
      "Service (การบริการ)"
    ],
    "answer": 0,
    "explanation": "S = Synergy (รวมพลังประสานสร้างสรรค์) รวบรวมความร่วมมือเพื่อบรรลุเป้าหมายองค์กร"
  },
  {
    "prompt": "ข้อที่ 2: ค่านิยมองค์กร กฟผ. คำว่า \"SPEED\" ตัวอักษร **P** ย่อมาจากคำว่าอะไร?",
    "choices": [
      "Proactive (ทำงานเชิงรุก)",
      "Performance (ผลงานเป็นเลิศ)",
      "Power (พลังงาน)",
      "Protection (การคุ้มครอง)"
    ],
    "answer": 0,
    "explanation": "P = Proactive (ทำงานเชิงรุก) คิดและทำล่วงหน้าอย่างมีวิสัยทัศน์"
  },
  {
    "prompt": "ข้อที่ 3: ค่านิยมองค์กร กฟผ. คำว่า \"SPEED\" ตัวอักษร **E** ตัวแรก ย่อมาจากคำว่าอะไร?",
    "choices": [
      "Empathy (ใส่ใจเข้าใจผู้อื่น)",
      "Efficiency (ประสิทธิภาพ)",
      "Energy (พลังงาน)",
      "Environment (สิ่งแวดล้อม)"
    ],
    "answer": 0,
    "explanation": "E = Empathy (ใส่ใจเข้าใจผู้อื่น) เข้าใจความต้องการของลูกค้าและผู้มีส่วนได้ส่วนเสีย"
  },
  {
    "prompt": "ข้อที่ 4: ค่านิยมองค์กร กฟผ. คำว่า \"SPEED\" ตัวอักษร **E** ตัวที่สอง ย่อมาจากคำว่าอะไร?",
    "choices": [
      "Adaptability / Excellence (ยืดหยุ่นและมุ่งสู่ความเป็นเลิศ)",
      "Electricity (ไฟฟ้า)",
      "Economy (เศรษฐกิจ)",
      "Evaluation (การประเมิน)"
    ],
    "answer": 0,
    "explanation": "E = Adaptability / Excellence (ปรับเปลี่ยนยืดหยุ่นและมุ่งสู่ความเป็นเลิศในนวัตกรรม)"
  },
  {
    "prompt": "ข้อที่ 5: ค่านิยมองค์กร กฟผ. คำว่า \"SPEED\" ตัวอักษร **D** ย่อมาจากคำว่าอะไร?",
    "choices": [
      "Delight / Trust (สร้างความประทับใจและส่งมอบสิ่งดีๆ)",
      "Digital (ดิจิทัล)",
      "Development (การพัฒนา)",
      "Direct (ตรงไปตรงมา)"
    ],
    "answer": 0,
    "explanation": "D = Delight / Trust (สร้างความประทับใจ ความไว้วางใจ และส่งมอบสิ่งดีๆ ให้สังคม)"
  },
  {
    "prompt": "ข้อที่ 6: ตราสัญลักษณ์ศักดิ์สิทธิ์ประจำ การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.) คือรูปองค์ใด?",
    "choices": [
      "พระประชาปฏิบดี",
      "พระวิษณุกรรม",
      "พระอินทร์ทรงช้างเอราวัณ",
      "พระแม่ธรณี"
    ],
    "answer": 0,
    "explanation": "ตราประจำ กฟผ. คือ รูป \"พระประชาปฏิบดี\" ประทับบนดอกบัวถือสายฟ้า"
  },
  {
    "prompt": "ข้อที่ 7: วันสถาปนา การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.) ตรงกับวันที่เท่าใด?",
    "choices": [
      "1 พฤษภาคม 2512",
      "1 มกราคม 2510",
      "5 ธันวาคม 2515",
      "12 สิงหาคม 2520"
    ],
    "answer": 0,
    "explanation": "กฟผ. สถาปนาขึ้นอย่างเป็นทางการเมื่อวันที่ <strong>1 พฤษภาคม พ.ศ. 2512</strong>"
  },
  {
    "prompt": "ข้อที่ 8: การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.) เป็นหน่วยงานประเภทใด และสังกัดกระทรวงใด?",
    "choices": [
      "รัฐวิสาหกิจ สังกัดกระทรวงพลังงาน",
      "ส่วนราชการ สังกัดกระทรวงมหาดไทย",
      "องค์การมหาชน สังกัดกระทรวงอุตสาหกรรม",
      "บริษัทเอกชนจำกัด"
    ],
    "answer": 0,
    "explanation": "กฟผ. เป็น <strong>รัฐวิสาหกิจด้านพลังงาน</strong> สังกัดกระทรวงพลังงาน"
  },
  {
    "prompt": "ข้อที่ 9: วิสัยทัศน์ (Vision) หลักของ กฟผ. มุ่งสู่การเป็นองค์กรแบบใด?",
    "choices": [
      "นวัตกรรมพลังงานไฟฟ้าเพื่อชีวิตที่ดีกว่า (Innovate Power Solutions for a Better Life)",
      "ผู้ผลิตไฟฟ้าที่ราคาถูกที่สุดในอาเซียน",
      "หน่วยงานผูกขาดพลังงานไฟฟ้า",
      "บริษัทลงทุนข้ามชาติ"
    ],
    "answer": 0,
    "explanation": "วิสัยทัศน์ กฟผ.: นวัตกรรมพลังงานไฟฟ้าเพื่อชีวิตที่ดีกว่า (Innovate Power Solutions for a Better Life)"
  },
  {
    "prompt": "ข้อที่ 10: สำนักงานใหญ่ของ การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.) ตั้งอยู่ที่ใด?",
    "choices": [
      "อำเภอบางกรวย จังหวัดนนทบุรี",
      "เขตจตุจักร กรุงเทพมหานคร",
      "อำเภอคลองหลวง จังหวัดปทุมธานี",
      "เขตบางซื่อ กรุงเทพมหานคร"
    ],
    "answer": 0,
    "explanation": "สำนักงานใหญ่ กฟผ. ตั้งอยู่ที่ <strong>อ.บางกรวย จ.นนทบุรี</strong>"
  },
  {
    "prompt": "ข้อที่ 11: โรงไฟฟ้าพลังน้ำแห่งแรกของประเทศไทย และเป็นเขื่อนคอนกรีตโค้งที่ใหญ่ที่สุดคือเขื่อนใด?",
    "choices": [
      "เขื่อนภูมิพล (จ.ตาก)",
      "เขื่อนสิริกิติ์ (จ.อุตรดิตถ์)",
      "เขื่อนศรีนครินทร์ (จ.กาญจนบุรี)",
      "เขื่อนอุบลรัตน์ (จ.ขอนแก่น)"
    ],
    "answer": 0,
    "explanation": "เขื่อนภูมิพล จ.ตาก เป็นโรงไฟฟ้าพลังน้ำแห่งแรกของไทย"
  },
  {
    "prompt": "ข้อที่ 12: โรงไฟฟ้าพลังงานแสงอาทิตย์ทุ่นลอยน้ำไฮบริด (Hydro-Floating Solar Hybrid) แห่งแรกและใหญ่ที่สุดของ กฟผ. ตั้งอยู่ที่เขื่อนใด?",
    "choices": [
      "เขื่อนสิรินธร (จ.อุบลราชธานี)",
      "เขื่อนจุฬาภรณ์ (จ.ชัยภูมิ)",
      "เขื่อนวชิราลงกรณ (จ.กาญจนบุรี)",
      "เขื่อนรัชชประภา (จ.สุราษฎร์ธานี)"
    ],
    "answer": 0,
    "explanation": "โซลาร์เซลล์ทุ่นลอยน้ำไฮบริดแห่งแรกตั้งอยู่ที่ <strong>เขื่อนสิรินธร จ.อุบลราชธานี</strong>"
  },
  {
    "prompt": "ข้อที่ 13: โรงไฟฟ้าพลังน้ำแบบสูบกลับ (Pumped Storage Hydro power plant) แห่งแรกของ กฟผ. ตั้งอยู่ที่ใด?",
    "choices": [
      "เขื่อนลำตะคองชลภาวัฒนา (จ.นครราชสีมา)",
      "เขื่อนกิ่วลม (จ.ลำปาง)",
      "เขื่อนแม่งัดสมบูรณ์ชล (จ.เชียงใหม่)",
      "เขื่อนปากมูน (จ.อุบลราชธานี)"
    ],
    "answer": 0,
    "explanation": "เขื่อนลำตะคองชลภาวัฒนา ใช้ระบบสูบน้ำกลับขึ้นไปเก็บเพื่อผลิตไฟฟ้าช่วงความต้องการสูง"
  },
  {
    "prompt": "ข้อที่ 14: โรงไฟฟ้าพลังความร้อนที่ใช้เชื้อเพลิงถ่านหินลิกไนต์เป็นหลักของ กฟผ. ตั้งอยู่ที่ใด?",
    "choices": [
      "โรงไฟฟ้าแม่เมาะ (จ.ลำปาง)",
      "โรงไฟฟ้ากระบี่",
      "โรงไฟฟ้าจะนะ (จ.สงขลา)",
      "โรงไฟฟ้าวังน้อย (จ.พระนครศรีอยุธยา)"
    ],
    "answer": 0,
    "explanation": "โรงไฟฟ้าแม่เมาะ จ.ลำปาง ผลิตไฟฟ้าจากถ่านหินลิกไนต์ในพื้นที่"
  },
  {
    "prompt": "ข้อที่ 15: ก๊าซประเภทใดเป็นเชื้อเพลิงหลักที่มีสัดส่วนมากที่สุดในการผลิตไฟฟ้าของประเทศไทยในปัจจุบัน?",
    "choices": [
      "ก๊าซธรรมชาติ (Natural Gas)",
      "ถ่านหิน (Coal)",
      "น้ำมันเตา (Fuel Oil)",
      "พลังงานชีวมวล (Biomass)"
    ],
    "answer": 0,
    "explanation": "ก๊าซธรรมชาติเป็นเชื้อเพลิงหลักในการผลิตไฟฟ้าของประเทศไทย (คิดเป็นสัดส่วนมากกว่า 50-60%)"
  },
  {
    "prompt": "ข้อที่ 16: ทุ่งกังหันลมผลิตไฟฟ้าขนาดใหญ่ของ กฟผ. ที่เปิดเป็นแหล่งท่องเที่ยวตั้งอยู่ที่ใด?",
    "choices": [
      "เขายายเที่ยง เขื่อนลำตะคอง (จ.นครราชสีมา)",
      "ดอยอินทนนท์ (จ.เชียงใหม่)",
      "เขาสก (จ.สุราษฎร์ธานี)",
      "เกาะเสม็ด (จ.ระยอง)"
    ],
    "answer": 0,
    "explanation": "กังหันลมลำตะคอง บนเขายายเที่ยง จ.นครราชสีมา ผลิตไฟฟ้าพลังงานลมและเป็นแหล่งท่องเที่ยว"
  },
  {
    "prompt": "ข้อที่ 17: เขื่อนสิริกิติ์ โรงไฟฟ้าพลังน้ำขนาดใหญ่ของ กฟผ. ตั้งอยู่ที่จังหวัดใด?",
    "choices": [
      "จังหวัดอุตรดิตถ์",
      "จังหวัดเชียงราย",
      "จังหวัดน่าน",
      "จังหวัดแพร่"
    ],
    "answer": 0,
    "explanation": "เขื่อนสิริกิติ์ ตั้งอยู่ที่ อ.ท่าปลา จ.อุตรดิตถ์"
  },
  {
    "prompt": "ข้อที่ 18: เขื่อนศรีนครินทร์ และเขื่อนวชิราลงกรณ ตั้งอยู่ในจังหวัดใด?",
    "choices": [
      "จังหวัดกาญจนบุรี",
      "จังหวัดราชบุรี",
      "จังหวัดตาก",
      "จังหวัดเพชรบุรี"
    ],
    "answer": 0,
    "explanation": "ทั้งเขื่อนศรีนครินทร์และเขื่อนวชิราลงกรณ ตั้งอยู่ใน จ.กาญจนบุรี"
  },
  {
    "prompt": "ข้อที่ 19: โรงไฟฟ้าพลังความร้อนร่วม (Combined Cycle) ใหญ่ที่ตั้งอยู่ใกล้กรุงเทพฯ ได้แก่โรงไฟฟ้าใด?",
    "choices": [
      "โรงไฟฟ้าบางปะกง และ โรงไฟฟ้าพระนครเหนือ",
      "โรงไฟฟ้าแม่เมาะ",
      "โรงไฟฟ้าลำตะคอง",
      "โรงไฟฟ้าลานกระบือ"
    ],
    "answer": 0,
    "explanation": "โรงไฟฟ้าบางปะกง (จ.ฉะเชิงเทรา) และพระนครเหนือ (จ.นนทบุรี) เป็นโรงไฟฟ้าพลังความร้อนร่วมหลัก"
  },
  {
    "prompt": "ข้อที่ 20: โรงไฟฟ้าพลังงานชีวมวล/พลังงานน้ำขนาดเล็ก มุ่งเน้นวัตถุประสงค์ด้านใดเป็นหลัก?",
    "choices": [
      "การกระจายศูนย์ผลิตไฟฟ้าและส่งเสริมพลังงานสะอาดชุมชน",
      "ลดราคาไฟฟ้าลง 90%",
      "แทนที่โรงไฟฟ้าหลักทั้งหมด",
      "ส่งออกไฟฟ้าไปต่างประเทศ"
    ],
    "answer": 0,
    "explanation": "เน้นส่งเสริมการผลิตไฟฟ้าจากพืชผลการเกษตรและสร้างความมั่นคงไฟฟ้าชุมชน"
  },
  {
    "prompt": "ข้อที่ 21: ระดับแรงดันไฟฟ้าสูงสุดในระบบสายส่งไฟฟ้าแรงสูงของ กฟผ. คือกี่กิโลโวลต์ (kV)?",
    "choices": [
      "500 kV (500,000 โวลต์)",
      "230 kV",
      "115 kV",
      "22 kV"
    ],
    "answer": 0,
    "explanation": "สายส่งแรงสูงพิกัดสูงสุดของ กฟผ. คือ <strong>500 kV</strong> เพื่อส่งไฟฟ้าปริมาณมากระยะทางไกล"
  },
  {
    "prompt": "ข้อที่ 22: ระดับแรงดันสายส่งไฟฟ้าแรงสูงมาตรฐานของ กฟผ. ในปัจจุบันประกอบด้วยระดับใดบ้าง?",
    "choices": [
      "500 kV, 230 kV, 115 kV",
      "220 V, 380 V, 110 V",
      "1,000 kV, 800 kV",
      "22 kV, 33 kV"
    ],
    "answer": 0,
    "explanation": "ระดับแรงดันสายส่ง กฟผ. คือ 500 kV, 230 kV และ 115 kV (รวมถึง 69 kV ในบางพื้นที่)"
  },
  {
    "prompt": "ข้อที่ 23: ศูนย์ควบคุมระบบกำลังไฟฟ้าแห่งชาติ (National Control Center: NCC) ของ กฟผ. มีหน้าที่หลักอย่างไร?",
    "choices": [
      "สั่งการและบริหารจัดการการผลิตและส่งจ่ายไฟฟ้าทั่วประเทศตลอด 24 ชม.",
      "เก็บเงินค่าไฟฟ้าจากประชาชน",
      "ซ่อมแซมปลั๊กไฟบ้าน",
      "ผลิตอุปกรณ์เครื่องใช้ไฟฟ้า"
    ],
    "answer": 0,
    "explanation": "NCC ทำหน้าที่บริหารสั่งการระบบไฟฟ้าให้มีความเสถียร สมดุล และมั่นคงตลอด 24 ชั่วโมง"
  },
  {
    "prompt": "ข้อที่ 24: การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.) จำหน่ายไฟฟ้าที่ผลิตได้ให้แก่หน่วยงานใดเป็นหลัก?",
    "choices": [
      "กฟน. (MEA), กฟภ. (PEA) และผู้ใช้ไฟฟ้ารายใหญ่ตามสัญญา",
      "จำหน่ายให้ประชาชนโดยตรงทุกบ้าน",
      "ส่งออกไปขายยุโรปทั้งหมด",
      "กระทรวงการคลัง"
    ],
    "answer": 0,
    "explanation": "กฟผ. ผลิตและส่งไฟฟ้าขายส่งให้ กฟน. และ กฟภ. นำไปกระจายจำหน่ายให้ประชาชน"
  },
  {
    "prompt": "ข้อที่ 25: การไฟฟ้านครหลวง (MEA) รับซื้อไฟฟ้าจาก กฟผ. เพื่อกระจายจำหน่ายในพื้นที่ใด?",
    "choices": [
      "กรุงเทพมหานคร, นนทบุรี, สมุทรปราการ",
      "ทั่วประเทศไทย 77 จังหวัด",
      "ภาคเหนือทั้งหมด",
      "ภาคใต้ทั้งหมด"
    ],
    "answer": 0,
    "explanation": "กฟน. (MEA) ดูแลพื้นที่ กทม. นนทบุรี และสมุทรปราการ"
  },
  {
    "prompt": "ข้อที่ 26: การไฟฟ้าส่วนภูมิภาค (PEA) รับซื้อไฟฟ้าจาก กฟผ. เพื่อกระจายจำหน่ายในพื้นที่ใด?",
    "choices": [
      "74 จังหวัดทั่วประเทศไทย (ยกเว้น กทม. นนทบุรี สมุทรปราการ)",
      "เฉพาะภาคอีสาน",
      "เฉพาะภาคใต้",
      "กรุงเทพมหานครเท่านั้น"
    ],
    "answer": 0,
    "explanation": "กฟภ. (PEA) ดูแลการจำหน่ายไฟฟ้าใน 74 จังหวัดทั่วประเทศ"
  },
  {
    "prompt": "ข้อที่ 27: สถานีไฟฟ้าแรงสูง (Substation) ของ กฟผ. ทำหน้าที่หลักอะไรในระบบไฟฟ้า?",
    "choices": [
      "แปลงระดับแรงดันไฟฟ้า และควบคุมการเชื่อมต่อตัดต่อวงจรสายส่ง",
      "สำรองน้ำในเขื่อน",
      "ขุดเจาะก๊าซธรรมชาติ",
      "ประกอบรถยนต์ไฟฟ้า"
    ],
    "answer": 0,
    "explanation": "สถานีไฟฟ้าแรงสูงทำหน้าที่แปลงแรงดันและเชื่อมโยงโครงข่ายสายส่งไฟฟ้า"
  },
  {
    "prompt": "ข้อที่ 28: อุปกรณ์ใดในสถานีไฟฟ้าแรงสูงใช้สำหรับตัดวงจรไฟฟ้าเมื่อเกิดกระแสไฟฟ้าลัดวงจร?",
    "choices": [
      "เซอร์กิตเบรกเกอร์ (Circuit Breaker)",
      "หม้อแปลงไฟฟ้า (Transformer)",
      "ตัวเก็บประจุ (Capacitor)",
      "สวิตช์ใต้น้ำ"
    ],
    "answer": 0,
    "explanation": "Circuit Breaker แรงสูงใช้ตัดกระแสไฟฟ้าเพื่อปกป้องระบบเมื่อเกิดเหตุขัดข้อง"
  },
  {
    "prompt": "ข้อที่ 29: ลูกถ้วยฉนวนไฟฟ้า (Insulator) บนเสาส่งไฟฟ้าแรงสูงทำจากวัสดุใดที่ทนแรงดันสูงได้ดี?",
    "choices": [
      "กระเบื้องพอร์ซเลน (Porcelain) หรือ แก้วทนไฟ (Toughened Glass)",
      "พลาสติกรียูส",
      "ไม้สัก",
      "อลูมิเนียม"
    ],
    "answer": 0,
    "explanation": "ทำจากเซรามิกพอร์ซเลน หรือแก้วทนไฟเพื่อเป็นฉนวนกันไฟรั่วลงเสาเหล็ก"
  },
  {
    "prompt": "ข้อที่ 30: สายส่งไฟฟ้าแรงสูงส่วนใหญ่ใช้โลหะชนิดใดเป็นตัวนำไฟฟ้าหลักเนื่องจากน้ำหนักเบาและเป็นตัวนำที่ดี?",
    "choices": [
      "อลูมิเนียมแกนเหล็ก (ACSR)",
      "ทองคำแท้",
      "เงินบริสุทธิ์",
      "ทองแดงตัน"
    ],
    "answer": 0,
    "explanation": "ใช้สายอลูมิเนียมเสริมแกนเหล็ก (ACSR) เพื่อความแข็งแรงและน้ำหนักเบาในการพาดสายส่งระยะไกล"
  },
  {
    "prompt": "ข้อที่ 31: กฟผ. กำหนดเป้าหมายมุ่งสู่ความเป็นกลางทางคาร์บอน (EGAT Carbon Neutrality) ภายในปี พ.ศ. ใด?",
    "choices": [
      "พ.ศ. 2593 (ค.ศ. 2050)",
      "พ.ศ. 2575",
      "พ.ศ. 2600",
      "พ.ศ. 2610"
    ],
    "answer": 0,
    "explanation": "เป้าหมาย EGAT Carbon Neutrality คือปี <strong>พ.ศ. 2593 (ค.ศ. 2050)</strong>"
  },
  {
    "prompt": "ข้อที่ 32: กฟผ. กำหนดเป้าหมายปล่อยก๊าซเรือนกระจกสุทธิเป็นศูนย์ (Net Zero Emissions) ภายในปี พ.ศ. ใด?",
    "choices": [
      "พ.ศ. 2605 (ค.ศ. 2065)",
      "พ.ศ. 2590",
      "พ.ศ. 2600",
      "พ.ศ. 2620"
    ],
    "answer": 0,
    "explanation": "เป้าหมาย EGAT Net Zero คือปี <strong>พ.ศ. 2605 (ค.ศ. 2065)</strong>"
  },
  {
    "prompt": "ข้อที่ 33: กลยุทธ์ **Triple E** ของ กฟผ. ในการขับเคลื่อนสู่ความเป็นกลางทางคาร์บอน ประกอบด้วยอะไรบ้าง?",
    "choices": [
      "Energy Efficiency, Economy of Carbon Avoidance, Ecosystem Account",
      "Electricity, Energy, Economy",
      "Environment, Ecology, Education",
      "Engine, Energy, Evolution"
    ],
    "answer": 0,
    "explanation": "Triple E = 1) Energy Efficiency 2) Economy of Carbon Avoidance 3) Ecosystem Account"
  },
  {
    "prompt": "ข้อที่ 34: โครงการฉลากประหยัดไฟฟ้าเบอร์ 5 ของ กฟผ. มีระดับการประหยัดไฟสูงสุดกี่ดาวในปัจจุบัน?",
    "choices": [
      "เบอร์ 5 ระดับ 5 ดาว",
      "เบอร์ 5 ระดับ 3 ดาว",
      "เบอร์ 5 ระดับ 1 ดาว",
      "ไม่มีดาว"
    ],
    "answer": 0,
    "explanation": "ปัจจุบันยกระดับฉลากเบอร์ 5 การันตีประหยัดไฟสูงสุดถึง <strong>5 ดาว</strong>"
  },
  {
    "prompt": "ข้อที่ 35: โครงการปลูกป่าอย่างยั่งยืนของ กฟผ. มีเป้าหมายสำคัญเพื่อช่วยเรื่องใด?",
    "choices": [
      "ดูดซับก๊าซคาร์บอนไดออกไซด์ (Carbon Sink) และฟื้นฟูระบบนิเวศ",
      "ปลูกเพื่อตัดไม้ขาย",
      "ทำฟาร์มสัตว์ป่า",
      "ขยายพื้นที่สร้างโรงไฟฟ้า"
    ],
    "answer": 0,
    "explanation": "มุ่งเน้นเป็นแหล่งดูดซับก๊าซคาร์บอนไดออกไซด์ธรรมชาติเพื่อความยั่งยืน"
  },
  {
    "prompt": "ข้อที่ 36: เทคโนโลยี **CCUS** (Carbon Capture, Utilization, and Storage) มีบทบาทอย่างไร?",
    "choices": [
      "ดักจับ นำไปใช้ประโยชน์ และกักเก็บก๊าซคาร์บอนไดออกไซด์จากโรงไฟฟ้า",
      "วัดความเร็วลม",
      "เปลี่ยนคาร์บอนเป็นทองคำ",
      "กรองฝุ่น PM 2.5"
    ],
    "answer": 0,
    "explanation": "CCUS ดักจับคาร์บอนจากกระบวนการผลิตไฟฟ้าเพื่อนำไปกักเก็บหรือใช้ประโยชน์"
  },
  {
    "prompt": "ข้อที่ 37: เชื้อเพลิง **Green Hydrogen** หมายถึงไฮโดรเจนที่ผลิตด้วยกระบวนการแบบใด?",
    "choices": [
      "แยกน้ำด้วยไฟฟ้าที่มาจากพลังงานหมุนเวียนสะอาด 100%",
      "เผาถ่านหินลิกไนต์",
      "สกัดจากน้ำมันดิบ",
      "ได้จากก๊าซธรรมชาติแบบเดิม"
    ],
    "answer": 0,
    "explanation": "Green Hydrogen ผลิตจากพลังงานสะอาดโดยไม่ปล่อยก๊าซเรือนกระจก"
  },
  {
    "prompt": "ข้อที่ 38: โครงการฉลากประหยัดไฟฟ้าเบอร์ 5 ริเริ่มโดย กฟผ. ตั้งแต่ปี พ.ศ. ใด?",
    "choices": [
      "พ.ศ. 2536",
      "พ.ศ. 2545",
      "พ.ศ. 2550",
      "พ.ศ. 2560"
    ],
    "answer": 0,
    "explanation": "กฟผ. รณรงค์โครงการฉลากเบอร์ 5 มาอย่างต่อเนื่องตั้งแต่ปี <strong>พ.ศ. 2536</strong>"
  },
  {
    "prompt": "ข้อที่ 39: ระบบแบตเตอรี่กักเก็บพลังงาน (BESS: Battery Energy Storage System) ช่วยแก้ปัญหาใดของพลังงานหมุนเวียน?",
    "choices": [
      "ช่วยความไม่สม่ำเสมอในการผลิตไฟฟ้าจากแดดและลม (Intermittency)",
      "ช่วยให้แดดออกตอนกลางคืน",
      "เพิ่มแรงดันน้ำในเขื่อน",
      "ทำให้สายส่งไฟฟ้าสั้นลง"
    ],
    "answer": 0,
    "explanation": "BESS เก็บพลังงานไว้ใช้ช่วงที่ไม่มีแสงแดดหรือลมเพื่อรักษาสเถียรภาพระบบไฟฟ้า"
  },
  {
    "prompt": "ข้อที่ 40: ใบรับรองสิทธิการผลิตไฟฟ้าจากพลังงานหมุนเวียน เรียกว่าอะไร?",
    "choices": [
      "REC (Renewable Energy Certificate)",
      "Carbon Credit",
      "ISO 14001",
      "FT Certificate"
    ],
    "answer": 0,
    "explanation": "REC คือใบรับรองพลังงานหมุนเวียนเพื่อยืนยันการใช้ไฟฟ้าสะอาด"
  },
  {
    "prompt": "ข้อที่ 41: การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.) เกิดจากการรวมตัวกันของ 3 องค์กรในอดีต ได้แก่ข้อใด?",
    "choices": [
      "การไฟฟ้ายันฮี, การไฟฟ้าลิกไนท์, และการพละไฟฟ้า",
      "กฟน., กฟภ., กฟผ.",
      "การรถไฟ, การท่าเรือ, การไฟฟ้า",
      "กรมชลประทาน, กรมพลังงาน, กฟผ."
    ],
    "answer": 0,
    "explanation": "รวม 3 องค์กร: การไฟฟ้ายันฮี, การไฟฟ้าลิกไนท์ และการพละไฟฟ้า ในปี 2512"
  },
  {
    "prompt": "ข้อที่ 42: ชื่อภาษาอังกฤษและอักษรย่ออย่างเป็นทางการของ กฟผ. คือข้อใด?",
    "choices": [
      "EGAT (Electricity Generating Authority of Thailand)",
      "MEA (Metropolitan Electricity Authority)",
      "PEA (Provincial Electricity Authority)",
      "PTT (PTT Public Company)"
    ],
    "answer": 0,
    "explanation": "EGAT = Electricity Generating Authority of Thailand"
  },
  {
    "prompt": "ข้อที่ 43: แอปพลิเคชันสมาร์ทสำหรับผู้ใช้รถยนต์ไฟฟ้า (EV) ในการค้นหาและชาร์จไฟสถานี EleX by EGAT มีชื่อว่าอะไร?",
    "choices": [
      "EleXA",
      "EGAT App",
      "EV Thai",
      "Power Charge"
    ],
    "answer": 0,
    "explanation": "แอปพลิเคชัน <strong>EleXA</strong> ของ กฟผ. อำนวยความสะดวกให้ผู้ใช้ EV"
  },
  {
    "prompt": "ข้อที่ 44: สถานีอัดประจุไฟฟ้าสำหรับรถยนต์ไฟฟ้าของ กฟผ. มีชื่อแบรนด์ว่าอย่างไร?",
    "choices": [
      "EleX by EGAT",
      "EGAT Charge",
      "PEA Volta",
      "PTT EV"
    ],
    "answer": 0,
    "explanation": "สถานีชาร์จ EV ของ กฟผ. คือแบรนด์ <strong>EleX by EGAT</strong>"
  },
  {
    "prompt": "ข้อที่ 45: โครงการ CSR ด้านสายตาของ กฟผ. ที่ให้บริการวัดสายตาและตัดแว่นฟรีแก่ผู้ด้อยโอกาสทั่วประเทศ มีชื่อว่าอะไร?",
    "choices": [
      "โครงการแว่นแก้ว",
      "โครงการตาดี",
      "โครงการมองไกล",
      "โครงการแสงสว่าง"
    ],
    "answer": 0,
    "explanation": "<strong>โครงการแว่นแก้ว</strong> ช่วยเหลือผู้ประสบปัญหาทางสายตาในพื้นที่ห่างไกล"
  },
  {
    "prompt": "ข้อที่ 46: โครงการชีววิถีเพื่อการพัฒนาอย่างยั่งยืนของ กฟผ. น้อมนำแนวพระราชดำริของรัชกาลใดมาประยุกต์ใช้?",
    "choices": [
      "พระบาทสมเด็จพระบรมชนกาธิเบศร มหาภูมิพลอดุลยเดชมหาราช บรมนาถบพิตร (รัชกาลที่ 9)",
      "พระบาทสมเด็จพระจุลจอมเกล้าเจ้าอยู่หัว (รัชกาลที่ 5)",
      "พระบาทสมเด็จพระปกเกล้าเจ้าอยู่หัว (รัชกาลที่ 7)",
      "รัชกาลที่ 10"
    ],
    "answer": 0,
    "explanation": "น้อมนำหลักปรัชญาเศรษฐกิจพอเพียงในรัชกาลที่ 9 มาส่งเสริมเกษตรชีววิถีรอบเขื่อน/โรงไฟฟ้า"
  },
  {
    "prompt": "ข้อที่ 47: องค์กรใดทำหน้าที่กำกับดูแลอัตราค่าไฟฟ้าและกฎระเบียบการดำเนินงานกิจการพลังงานของประเทศไทย?",
    "choices": [
      "คณะกรรมการกำกับกิจการพลังงาน (กกพ. / ERC)",
      "กระทรวงการคลัง",
      "สภาอุตสาหกรรม",
      "สำนักงานตำรวจแห่งชาติ"
    ],
    "answer": 0,
    "explanation": "กกพ. (ERC) เป็นองค์กรกำกับดูแลอัตราค่าไฟฟ้าและกิจการพลังงาน"
  },
  {
    "prompt": "ข้อที่ 48: ค่าไฟฟ้าผันแปรอัตโนมัติที่ปรับเปลี่ยนตามราคาต้นทุนเชื้อเพลิงและอัตราแลกเปลี่ยน เรียกว่าค่าอะไร?",
    "choices": [
      "ค่า Ft (Fuel Adjustment Charge)",
      "ค่า Vat 7%",
      "ค่าบริการรายเดือน",
      "ค่าความสูญเสีย"
    ],
    "answer": 0,
    "explanation": "ค่า Ft (Fuel Adjustment Charge) คือค่าไฟฟ้าผันแปรตามต้นทุนเชื้อเพลิงผลิตไฟฟ้า"
  },
  {
    "prompt": "ข้อที่ 49: ศูนย์เรียนรู้ กฟผ. (EGAT Learning Center) มีจุดประสงค์หลักเพื่ออะไร?",
    "choices": [
      "ถ่ายทอดความรู้ด้านพลังงานไฟฟ้า นวัตกรรม และสิ่งแวดล้อมแก่เยาวชนและประชาชน",
      "ขายเครื่องใช้ไฟฟ้าเบอร์ 5",
      "จัดสอบแข่งขัน",
      "รับสมัครงาน"
    ],
    "answer": 0,
    "explanation": "เป็นแหล่งเรียนรู้สร้างความเข้าใจด้านพลังงานไฟฟ้า นวัตกรรม และสิ่งแวดล้อม"
  },
  {
    "prompt": "ข้อที่ 50: โรงไฟฟ้าพลังงานน้ำแบบสูบกลับเขื่อนลำตะคอง ได้รับพระราชทานนามว่าอย่างไร?",
    "choices": [
      "เขื่อนลำตะคองชลภาวัฒนา",
      "เขื่อนภูมิพล",
      "เขื่อนสิริกิติ์",
      "เขื่อนอุบลรัตน์"
    ],
    "answer": 0,
    "explanation": "ได้รับพระราชทานนามว่า <strong>\"เขื่อนลำตะคองชลภาวัฒนา\"</strong>"
  }
,
  {
      "prompt": "ข้อที่ 51: ค่านิยม SPEED ของ กฟผ. อักษร 'S' ย่อมาจากคำว่าอะไร",
      "choices": [
          "Synergy (รวมพลังผนึกกำลัง)",
          "Safety (ความปลอดภัย)",
          "Speed (ความเร็ว)",
          "Service (การบริการ)"
      ],
      "answer": 0,
      "explanation": "ค่านิยม SPEED: S = <strong>Synergy</strong> (รวมพลังผนึกกำลังเพื่อความสำเร็จร่วมกัน)"
  },
  {
      "prompt": "ข้อที่ 52: ค่านิยม SPEED ของ กฟผ. อักษร 'P' ย่อมาจากคำว่าอะไร",
      "choices": [
          "Power (พลังงาน)",
          "Proactive (รุกมุ่งผลสัมฤทธิ์)",
          "People (ประชาชน)",
          "Performance (สมรรถนะ)"
      ],
      "answer": 1,
      "explanation": "ค่านิยม SPEED: P = <strong>Proactive</strong> (รุกมุ่งผลสัมฤทธิ์)"
  },
  {
      "prompt": "ข้อที่ 53: ค่านิยม SPEED ของ กฟผ. อักษร 'E' ตัวแรก ย่อมาจากคำว่าอะไร",
      "choices": [
          "Energy (พลังงาน)",
          "Empathy (ใส่ใจสร้างมิตร)",
          "Efficiency (ประสิทธิภาพ)",
          "Environment (สิ่งแวดล้อม)"
      ],
      "answer": 1,
      "explanation": "ค่านิยม SPEED: E1 = <strong>Empathy</strong> (ใส่ใจสร้างมิตรและสร้างความผูกพัน)"
  },
  {
      "prompt": "ข้อที่ 54: ค่านิยม SPEED ของ กฟผ. อักษร 'E' ตัวที่สอง ย่อมาจากคำว่าอะไร",
      "choices": [
          "Enterprise (ขับเคลื่อนนวัตกรรม)",
          "Economy (เศรษฐกิจ)",
          "Electricity (ไฟฟ้า)",
          "Excellence (ความเป็นเลิศ)"
      ],
      "answer": 0,
      "explanation": "ค่านิยม SPEED: E2 = <strong>Enterprise</strong> (ขับเคลื่อนนวัตกรรมด้วยหัวใจตระหนักถึงธุรกิจ)"
  },
  {
      "prompt": "ข้อที่ 55: ค่านิยม SPEED ของ กฟผ. อักษร 'D' ย่อมาจากคำว่าอะไร",
      "choices": [
          "Development (การพัฒนา)",
          "Digitalization (ปรับเปลี่ยนสู่ดิจิทัล)",
          "Data (ข้อมูล)",
          "Direction (ทิศทาง)"
      ],
      "answer": 1,
      "explanation": "ค่านิยม SPEED: D = <strong>Digitalization</strong> (ปรับเปลี่ยนสู่ดิจิทัล)"
  },
  {
      "prompt": "ข้อที่ 56: โรงไฟฟ้าลำตะคองชลภาวัฒนา ของ กฟผ. เป็นโรงไฟฟ้าประเภทใด",
      "choices": [
          "โรงไฟฟ้าพลังงานความร้อนร่วม",
          "โรงไฟฟ้าพลังน้ำแบบสูบกลับ",
          "โรงไฟฟ้าพลังงานแสงอาทิตย์",
          "โรงไฟฟ้าชีวมวล"
      ],
      "answer": 1,
      "explanation": "เป็น <strong>โรงไฟฟ้าพลังน้ำแบบสูบกลับ (Pumped-Storage Hydroelectric)</strong> แห่งแรกและแห่งเดียวของไทย"
  },
  {
      "prompt": "ข้อที่ 57: โรงไฟฟ้าแม่เมาะ ของ กฟผ. ตั้งอยู่ที่จังหวัดใด และใช้เชื้อเพลิงชนิดใดเป็นหลัก",
      "choices": [
          "จ.เชียงใหม่ ใช้ก๊าซธรรมชาติ",
          "จ.ลำปาง ใช้ถ่านหินลิกไนต์",
          "จ.ตาก ใช้พลังน้ำ",
          "จ.ขอนแก่น ใช้ชีวมวล"
      ],
      "answer": 1,
      "explanation": "โรงไฟฟ้าแม่เมาะตั้งอยู่ที่ <strong>จ.ลำปาง</strong> ใช้เชื้อเพลิง <strong>ถ่านหินลิกไนต์</strong> จากเหมืองแม่เมาะ"
  },
  {
      "prompt": "ข้อที่ 58: แรงดันไฟฟ้าของสายส่งไฟฟ้าแรงสูงระดับสูงสุดที่ กฟผ. ใช้อยู่ในระบบปัจจุบันคือกี่กิโลโวลต์ (kV)",
      "choices": [
          "115 kV",
          "230 kV",
          "500 kV",
          "765 kV"
      ],
      "answer": 2,
      "explanation": "ระบบสายส่งแรงดันสูงสุดของ กฟผ. คือ <strong>500 kV (กิโลโวลต์)</strong>"
  },
  {
      "prompt": "ข้อที่ 59: กฟผ. ตั้งเป้าหมาย Carbon Neutrality (ความเป็นกลางทางคาร์บอน) ภายในปี พ.ศ. ใด (ค.ศ. 2050)",
      "choices": [
          "พ.ศ. 2580",
          "พ.ศ. 2590",
          "พ.ศ. 2593 (ค.ศ. 2050)",
          "พ.ศ. 2608"
      ],
      "answer": 2,
      "explanation": "กฟผ. ประกาศเป้าหมาย Carbon Neutrality ภายในปี <strong>พ.ศ. 2593 (ค.ศ. 2050)</strong>"
  },
  {
      "prompt": "ข้อที่ 60: กฟผ. ตั้งเป้าหมาย Net Zero Greenhouse Gas Emissions (การปล่อยก๊าซเรือนกระจกสุทธิเป็นศูนย์) ภายในปี พ.ศ. ใด (ค.ศ. 2065)",
      "choices": [
          "พ.ศ. 2590",
          "พ.ศ. 2593",
          "พ.ศ. 2600",
          "พ.ศ. 2608 (ค.ศ. 2065)"
      ],
      "answer": 3,
      "explanation": "เป้าหมายปล่อยก๊าซเรือนกระจกสุทธิเป็นศูนย์ (Net Zero) คือปี <strong>พ.ศ. 2608 (ค.ศ. 2065)</strong>"
  },
  {
      "prompt": "ข้อที่ 61: แอปพลิเคชัน EleXA ของ กฟผ. เปิดขึ้นเพื่อให้บริการหลักในด้านใด",
      "choices": [
          "จ่ายค่าไฟฟ้าประจำเดือน",
          "ค้นหาและใช้บริการสถานีชาร์จรถยนต์ไฟฟ้า (EV Charging Station)",
          "ซื้อขายหุ้น กฟผ.",
          "ร้องเรียนไฟฟ้าดับ"
      ],
      "answer": 1,
      "explanation": "EleXA เป็นแอปพลิเคชันให้บริการ <strong>ค้นหาและชาร์จรถยนต์ไฟฟ้า (EV Charging Station)</strong> ของ กฟผ."
  },
  {
      "prompt": "ข้อที่ 62: โครงการโซลาร์เซลล์ลอยน้ำไฮบริด (Hydro-floating Solar Hybrid) แห่งแรกของ กฟผ. ตั้งอยู่ที่เขื่อนใด",
      "choices": [
          "เขื่อนภูมิพล",
          "เขื่อนศรีนครินทร์",
          "เขื่อนสิรินธร จ.อุบลราชธานี",
          "เขื่อนอุบลรัตน์"
      ],
      "answer": 2,
      "explanation": "ตั้งอยู่ที่ <strong>เขื่อนสิรินธร จ.อุบลราชธานี</strong> เป็นโซลาร์เซลล์ลอยน้ำไฮบริดใหญ่ที่สุดในโลกแห่งหนึ่ง"
  },
  {
      "prompt": "ข้อที่ 63: กฟผ. ก่อตั้งขึ้นอย่างเป็นทางการตามพระราชบัญญัติการไฟฟ้าฝ่ายผลิตแห่งประเทศไทย เมื่อปี พ.ศ. ใด",
      "choices": [
          "พ.ศ. 2500",
          "พ.ศ. 2512",
          "พ.ศ. 2520",
          "พ.ศ. 2530"
      ],
      "answer": 1,
      "explanation": "กฟผ. ก่อตั้งขึ้นเมื่อวันที่ 1 พฤษภาคม <strong>พ.ศ. 2512</strong> โดยการรวม 3 รัฐวิสาหกิจด้านไฟฟ้า"
  },
  {
      "prompt": "ข้อที่ 64: ศูนย์ควบคุมระบบกำลังไฟฟ้าแห่งชาติ (National Control Center) ของ กฟผ. ตั้งอยู่ที่ใด",
      "choices": [
          "สำนักงานใหญ่ กฟผ. อก.บางกรวย จ.นนทบุรี",
          "จ.ลำปาง",
          "จ.อุบลราชธานี",
          "จ.กาญจนบุรี"
      ],
      "answer": 0,
      "explanation": "ตั้งอยู่ที่ <strong>สำนักงานใหญ่ กฟผ. อ.บางกรวย จ.นนทบุรี</strong> ทำหน้าที่ควบคุมระบบไฟฟ้าทั่วประเทศ"
  },
  {
      "prompt": "ข้อที่ 65: โรงไฟฟ้าพระนครเหนือ ของ กฟผ. ตั้งอยู่ที่จังหวัดใด",
      "choices": [
          "กรุงเทพมหานคร",
          "จ.นนทบุรี",
          "จ.ปทุมธานี",
          "จ.สมุทรปราการ"
      ],
      "answer": 1,
      "explanation": "โรงไฟฟ้าพระนครเหนือตั้งอยู่ที่ อ.บางกรวย <strong>จ.นนทบุรี</strong>"
  },
  {
      "prompt": "ข้อที่ 66: โครงการ EGAT Carbon Neutrality ใช้กลยุทธ์ Triple S ประกอบด้วยข้อใดบ้าง",
      "choices": [
          "Sources, Sink, Support",
          "Safety, Speed, Service",
          "Solar, Wind, Hydro",
          "Smart, System, Saving"
      ],
      "answer": 0,
      "explanation": "กลยุทธ์ Triple S ได้แก่ <strong>Sources Transformation, Sink Co-creation, Support Measures Mechanism</strong>"
  },
  {
      "prompt": "ข้อที่ 67: วิสัยทัศน์ (Vision) ของ กฟผ. คือข้อใด",
      "choices": [
          "ผลิตไฟฟ้าถูกที่สุดในอาเซียน",
          "นวัตกรรมพลังงานไฟฟ้าเพื่อชีวิตที่ดีกว่า (Energy Innovation for a Better Life)",
          "ผู้นำไฟฟ้าถ่านหินเอเชีย",
          "ผู้ส่งออกไฟฟ้าอันดับหนึ่ง"
      ],
      "answer": 1,
      "explanation": "วิสัยทัศน์ กฟผ.: <strong>นวัตกรรมพลังงานไฟฟ้าเพื่อชีวิตที่ดีกว่า (Energy Innovation for a Better Life)</strong>"
  },
  {
      "prompt": "ข้อที่ 68: เขื่อนภูมิพล ของ กฟผ. ตั้งอยู่ที่จังหวัดใด และมีลักษณะโดดเด่นอย่างไร",
      "choices": [
          "จ.กาญจนบุรี เขื่อนดิน",
          "จ.ตาก เขื่อนคอนกรีตโค้งแห่งแรกของไทย",
          "จ.เชียงใหม่ เขื่อนหินแทรก",
          "จ.น่าน เขื่อนทดน้ำ"
      ],
      "answer": 1,
      "explanation": "ตั้งอยู่ที่ <strong>จ.ตาก</strong> เป็น <strong>เขื่อนคอนกรีตโค้งแห่งแรกและแห่งเดียวของไทย</strong>"
  },
  {
      "prompt": "ข้อที่ 69: เขื่อนศรีนครินทร์ ของ กฟผ. ตั้งอยู่ที่จังหวัดใด",
      "choices": [
          "จ.กาญจนบุรี",
          "จ.ตาก",
          "จ.ราชบุรี",
          "จ.เพชรบุรี"
      ],
      "answer": 0,
      "explanation": "เขื่อนศรีนครินทร์ตั้งอยู่ที่ อ.ศรีสวัสดิ์ <strong>จ.กาญจนบุรี</strong>"
  },
  {
      "prompt": "ข้อที่ 70: ตราสัญลักษณ์ (Logo) ของ กฟผ. มีรูปสิ่งใดเป็นองค์ประกอบหลัก",
      "choices": [
          "พระอินทร์ทรงช้างเอราวัณ และสายฟ้า",
          "ครุฑพ่าห์",
          "ดวงอาทิตย์และสายน้ำ",
          "ดอกบัวและสายไฟ"
      ],
      "answer": 0,
      "explanation": "ตรา กฟผ. เป็นรูป <strong>พระอินทร์ทรงช้างเอราวัณ เปล่งรัศมีสายฟ้า</strong>"
  },
  {
      "prompt": "ข้อที่ 71: เชื้อเพลิงหลักที่ใช้ในการผลิตไฟฟ้าของประเทศไทยในปัจจุบันคือข้อใด",
      "choices": [
          "ถ่านหิน",
          "ก๊าซธรรมชาติ (Natural Gas)",
          "น้ำมันเตา",
          "พลังงานแสงอาทิตย์"
      ],
      "answer": 1,
      "explanation": "ประเทศไทยใช้ <strong>ก๊าซธรรมชาติ (Natural Gas)</strong> เป็นเชื้อเพลิงหลักคิดเป็นสัดส่วนมากกว่า 50-60%"
  },
  {
      "prompt": "ข้อที่ 72: แนวคิด RE100 ที่องค์กรระดับโลกและ กฟผ. ขับเคลื่อน หมายถึงเป้าหมายใด",
      "choices": [
          "การใช้พลังงานหมุนเวียน 100% (Renewable Energy 100%)",
          "การรีไซเคิลขยะ 100%",
          "การลดต้นทุน 100%",
          "การเพิ่มประสิทธิภาพ 100%"
      ],
      "answer": 0,
      "explanation": "RE100 คือข้อตกลงมุ่งสู่การใช้ <strong>พลังงานหมุนเวียน 100% (Renewable Energy 100%)</strong>"
  },
  {
      "prompt": "ข้อที่ 73: โรงไฟฟ้าบางปะกง ของ กฟผ. ตั้งอยู่ที่จังหวัดใด",
      "choices": [
          "จ.ฉะเชิงเทรา",
          "จ.ชลบุรี",
          "จ.ระยอง",
          "จ.สมุทรปราการ"
      ],
      "answer": 0,
      "explanation": "โรงไฟฟ้าบางปะกงตั้งอยู่ที่ อ.บางปะกง <strong>จ.ฉะเชิงเทรา</strong>"
  },
  {
      "prompt": "ข้อที่ 74: โครงการฉลากประหยัดไฟฟ้าเบอร์ 5 ดำเนินการการรับรองโดยหน่วยงานใด",
      "choices": [
          "กระทรวงพาณิชย์",
          "การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.)",
          "สำนักงานมาตรฐานผลิตภัณฑ์อุตสาหกรรม (มอการ์)",
          "การไฟฟ้าส่วนภูมิภาค"
      ],
      "answer": 1,
      "explanation": "โครงการฉลากประหยัดไฟฟ้าเบอร์ 5 ริเริ่มและรับรองโดย <strong>การไฟฟ้าฝ่ายผลิตแห่งประเทศไทย (กฟผ.)</strong> ตั้งแต่ พ.ศ. 2536"
  },
  {
      "prompt": "ข้อที่ 75: ระบบ BESS (Battery Energy Storage System) ที่ กฟผ. นำมาใช้ในระบบส่งไฟฟ้า มีวัตถุประสงค์หลักเพื่ออะไร",
      "choices": [
          "กักเก็บพลังงานเพื่อรักษาเสถียรภาพระบบไฟฟ้าเมื่อใช้พลังงานหมุนเวียน",
          "ลดค่าบริการรายเดือน",
          "ใช้แทนสายส่งไฟฟ้า",
          "ทำหน้าที่ส่งสัญญาณอินเทอร์เน็ต"
      ],
      "answer": 0,
      "explanation": "BESS คือระบบแบตเตอรี่กักเก็บพลังงานเพื่อ <strong>รักษาเสถียรภาพของระบบไฟฟ้าเมื่อมีการจ่ายไฟจากพลังงานหมุนเวียนที่ไม่สม่ำเสมอ</strong>"
  }
];
const DIGITAL_QUESTIONS = [
  {
    "prompt": "ข้อที่ 1: ใน MS Excel สูตร <code>=VLOOKUP(A2, C:D, 2, FALSE)</code> พารามิเตอร์ <strong>FALSE</strong> มีไว้เพื่ออะไร?",
    "choices": [
      "ค้นหาค่าแบบใกล้เคียงที่สุด",
      "ค้นหาค่าที่ตรงกันเป๊ะ 100% (Exact Match)",
      "ไม่ต้องค้นหาข้อมูล",
      "คืนค่าเป็นเท็จ"
    ],
    "answer": 1,
    "explanation": "FALSE (หรือ 0) กำหนดให้ค้นเฉพาะค่าที่ตรงกัน 100% เท่านั้น"
  },
  {
    "prompt": "ข้อที่ 2: การโจมตีทางไซเบอร์ประเภท Phishing มักมาในรูปแบบใดมากที่สุด?",
    "choices": [
      "การยิงสัญญาณรบกวน Wi-Fi",
      "อีเมล/ข้อความหลอกลวงให้กรอกรหัสผ่าน",
      "การถอดสายไฟเครื่องเซิร์ฟเวอร์",
      "การติดตั้งแอนตี้ไวรัส"
    ],
    "answer": 1,
    "explanation": "Phishing คือการหลอกลวงให้กรอกรหัสผ่าน ข้อมูลส่วนตัว หรือเลขบัญชี"
  },
  {
    "prompt": "ข้อที่ 3: โปรโตคอลใดใช้รับส่งข้อมูลบนเว็บแบบปลอดภัยและมีการเข้ารหัสข้อมูล (Encrypted)?",
    "choices": [
      "HTTP",
      "HTTPS",
      "FTP",
      "SMTP"
    ],
    "answer": 1,
    "explanation": "HTTPS เข้ารหัสการเชื่อมต่อด้วย SSL/TLS เพื่อความปลอดภัย"
  },
  {
    "prompt": "ข้อที่ 4: คีย์ลัด <code>Ctrl + Z</code> ในระบบปฏิบัติการโดยทั่วไปทำหน้าที่อะไร?",
    "choices": [
      "บันทึกไฟล์ (Save)",
      "ยกเลิกการกระทำล่าสุด (Undo)",
      "ตัดข้อความ (Cut)",
      "ปิดโปรแกรม (Close)"
    ],
    "answer": 1,
    "explanation": "Ctrl + Z คือคำสั่งย้อนกลับ/ยกเลิกการกระทำล่าสุด (Undo)"
  },
  {
    "prompt": "ข้อที่ 5: บริการ Cloud Storage ในข้อใด <strong>ไม่ใช่</strong> บริการของ Google?",
    "choices": [
      "Google Drive",
      "OneDrive",
      "Google Photos",
      "Google Cloud Storage"
    ],
    "answer": 1,
    "explanation": "OneDrive เป็นบริการ Cloud Storage ของ Microsoft"
  },
  {
    "prompt": "ข้อที่ 6: ใน MS Excel สูตร <code>=IF(A1>=50, \"ผ่าน\", \"ตก\")</code> ถ้า A1 เท่ากับ 50 จะได้ผลลัพธ์เป็นอย่างไร?",
    "choices": [
      "ผ่าน",
      "ตก",
      "FALSE",
      "ERROR"
    ],
    "answer": 0,
    "explanation": "เงื่อนไขคือ >= 50 เมื่อ A1 เป็น 50 จึงได้ผลลัพธ์ <strong>\"ผ่าน\"</strong>"
  },
  {
    "prompt": "ข้อที่ 7: มัลแวร์ประเภท Ransomware มีพฤติกรรมหลักอย่างไรในการโจมตี?",
    "choices": [
      "แอบขโมยไฟฟ้าไปขุดบิทคอยน์",
      "เข้ารหัสล็อกไฟล์ข้อมูลแล้วเรียกเงินไถ่",
      "ทำให้หน้าจอแสดงภาพโฆษณา",
      "ลบโปรแกรม Antivirus ออก"
    ],
    "answer": 1,
    "explanation": "Ransomware จะเข้ารหัสล็อกไฟล์แล้วเรียกค่าไถ่แลกกับการปลดล็อก"
  },
  {
    "prompt": "ข้อที่ 8: อุปกรณ์ฮาร์ดแวร์ใดเปรียบเสมือน \"สมอง\" ทำหน้าที่ประมวลผลคำสั่งทั้งหมดของคอมพิวเตอร์?",
    "choices": [
      "RAM",
      "Harddisk",
      "CPU",
      "Power Supply"
    ],
    "answer": 2,
    "explanation": "CPU (Central Processing Unit) ทำหน้าที่ประมวลผลกลางเปรียบเสมือนสมอง"
  },
  {
    "prompt": "ข้อที่ 9: หน่วยความจำประเภทใดเป็นแบบ Volatile Memory (ข้อมูลจะหายไปเมื่อปิดเครื่อง)?",
    "choices": [
      "RAM",
      "SSD",
      "Harddisk",
      "ROM"
    ],
    "answer": 0,
    "explanation": "RAM เป็นหน่วยความจำชั่วคราว ข้อมูลจะสูญหายเมื่อไม่มีไฟจ่าย"
  },
  {
    "prompt": "ข้อที่ 10: หมายเลขระบุตัวตนประจำอุปกรณ์ในเครือข่ายอินเทอร์เน็ต เช่น <code>192.168.1.1</code> เรียกว่าอะไร?",
    "choices": [
      "MAC Address",
      "IP Address",
      "URL",
      "DNS"
    ],
    "answer": 1,
    "explanation": "IP Address คือหมายเลขประจำเครื่องในระบบเครือข่าย"
  },
  {
    "prompt": "ข้อที่ 11: ใน MS Excel สูตร <code>=COUNTIF(A1:A10, \">100\")</code> มีหน้าที่ทำงานอย่างไร?",
    "choices": [
      "นับจำนวนเซลล์ในช่วง A1 ถึง A10 ที่มีค่ามากกว่า 100",
      "บวกผลรวมข้อมูลช่วง A1 ถึง A10 ที่มากกว่า 100",
      "หาค่าเฉลี่ยของข้อมูลที่มากกว่า 100",
      "นับเซลล์ทั้งหมด 100 เซลล์"
    ],
    "answer": 0,
    "explanation": "COUNTIF ใช้สำหรับนับจำนวนเซลล์ตามเงื่อนไขที่กำหนด"
  },
  {
    "prompt": "ข้อที่ 12: ระบบ Firewall มีหน้าที่หลักอย่างไรในการรักษาความปลอดภัยระบบเครือข่าย?",
    "choices": [
      "เพิ่มความเร็วอินเทอร์เน็ต",
      "กรองและตรวจสอบทราฟฟิกที่ไม่ได้รับอนุญาตเข้า-ออกเครือข่าย",
      "สำรองข้อมูลอัตโนมัติลงดิสก์",
      "สแกนไวรัสในแฟลชไดรฟ์"
    ],
    "answer": 1,
    "explanation": "Firewall ทำหน้าที่กรองทราฟฟิกคัดกรองการเชื่อมต่อเข้า-ออกเครือข่าย"
  },
  {
    "prompt": "ข้อที่ 13: คีย์ลัด <code>Ctrl + C</code> และ <code>Ctrl + V</code> ทำหน้าที่อะไรตามลำดับ?",
    "choices": [
      "คัดลอก (Copy) และ วาง (Paste)",
      "ตัด (Cut) และ วาง (Paste)",
      "ยกเลิก (Undo) และ ทำซ้ำ (Redo)",
      "ค้นหา (Find) และ แทนที่ (Replace)"
    ],
    "answer": 0,
    "explanation": "Ctrl+C คือ คัดลอก และ Ctrl+V คือ วาง"
  },
  {
    "prompt": "ข้อที่ 14: การตั้งรหัสผ่าน (Password) ที่ปลอดภัยที่สุดตามหลักCyber Hygiene ควรเป็นอย่างไร?",
    "choices": [
      "ใช้เบอร์โทรศัพท์มือถือตนเอง",
      "ยาวอย่างน้อย 12 ตัวอักษร ผสมตัวพิมพ์ใหญ่ เล็ก ตัวเลข และสัญลักษณ์",
      "ใช้วันเดือนปีเกิด",
      "ใช้คำภาษาอังกฤษง่ายๆ เช่น password123"
    ],
    "answer": 1,
    "explanation": "รหัสผ่านรัดกุมควรรวมความยาว 12+ อักขระและผสมตัวพิมพ์เล็กใหญ่ ตัวเลข สัญลักษณ์"
  },
  {
    "prompt": "ข้อที่ 15: ใน MS Excel สูตร <code>=SUM(A1:A5)</code> ให้ผลลัพธ์เท่ากับข้อใด?",
    "choices": [
      "ผลรวมของค่าในเซลล์ A1 ถึง A5",
      "ค่าเฉลี่ยของเซลล์ A1 ถึง A5",
      "นับจำนวนเซลล์ A1 ถึง A5",
      "หาค่าสูงสุดใน A1 ถึง A5"
    ],
    "answer": 0,
    "explanation": "SUM คือฟังก์ชันสำหรับคำนวณผลรวมของตัวเลข"
  },
  {
    "prompt": "ข้อที่ 16: ใน MS Excel สูตร <code>=AVERAGE(B1:B10)</code> ทำหน้าที่อะไร?",
    "choices": [
      "คำนวณค่าเฉลี่ยเลขคณิตของเซลล์ B1 ถึง B10",
      "หาค่าสูงสุด",
      "หาค่าต่ำสุด",
      "นับจำนวนเซลล์"
    ],
    "answer": 0,
    "explanation": "AVERAGE คำนวณค่าเฉลี่ยเลขคณิตของข้อมูลช่วงที่ระบุ"
  },
  {
    "prompt": "ข้อที่ 17: การยืนยันตัวตนแบบ 2 ปัจจัย (Two-Factor Authentication: 2FA) มีประโยชน์อย่างไร?",
    "choices": [
      "เพิ่มความปลอดภัยอีกขั้นโดยต้องใช้ OTP/แอปยืนยันร่วมกับรหัสผ่าน",
      "ทำให้เข้าสู่ระบบได้โดยไม่ต้องกรอกรหัสผ่าน",
      "เพิ่มความเร็วการดาวน์โหลด",
      "สำรองรหัสผ่านลงคลาวด์"
    ],
    "answer": 0,
    "explanation": "2FA เพิ่มความปลอดภัย 2 ชั้นป้องกันผู้ไม่หวังดีแอบอ้างรหัสผ่าน"
  },
  {
    "prompt": "ข้อที่ 18: พรบ. คุ้มครองข้อมูลส่วนบุคคลของไทย มีชื่อย่อภาษาอังกฤษว่าอย่างไร?",
    "choices": [
      "PDPA",
      "GDPR",
      "ISO27001",
      "HIPAA"
    ],
    "answer": 0,
    "explanation": "PDPA (Personal Data Protection Act) พรบ. คุ้มครองข้อมูลส่วนบุคคล"
  },
  {
    "prompt": "ข้อที่ 19: โปรโตคอล DNS (Domain Name System) มีหน้าที่ทำอะไรในระบบอินเทอร์เน็ต?",
    "choices": [
      "แปลงชื่อเว็บไซต์ (Domain Name) เช่น egat.co.th ให้เป็น IP Address",
      "ส่งอีเมลระหว่างเซิร์ฟเวอร์",
      "ดาวน์โหลดไฟล์ความเร็วสูง",
      "เข้ารหัสรหัสผ่าน"
    ],
    "answer": 0,
    "explanation": "DNS ทำหน้าที่แปลงชื่อโดเมนเป็นหมายเลข IP Address"
  },
  {
    "prompt": "ข้อที่ 20: อุปกรณ์จัดเก็บข้อมูลประเภทใดมีความเร็วในการอ่าน-เขียนสูงที่สุดในปัจจุบัน?",
    "choices": [
      "NVMe SSD",
      "Harddisk Drive (HDD)",
      "Flash Drive USB 2.0",
      "CD-ROM"
    ],
    "answer": 0,
    "explanation": "NVMe SSD มีความเร็วอ่าน-เขียนข้อมูลสูงกว่าสื่อบันทึกแบบเดิมหลายเท่า"
  },
  {
    "prompt": "ข้อที่ 21: ใน MS Excel สูตร <code>=MAX(C1:C20)</code> ทำหน้าที่อะไร?",
    "choices": [
      "หาค่าสูงสุดในช่วง C1 ถึง C20",
      "หาค่าต่ำสุด",
      "หาค่าเฉลี่ย",
      "นับเซลล์ที่มีตัวเลข"
    ],
    "answer": 0,
    "explanation": "MAX คืนค่าตัวเลขที่มีค่าสูงสุดในช่วงเซลล์ที่กำหนด"
  },
  {
    "prompt": "ข้อที่ 22: ใน MS Excel สูตร <code>=MIN(C1:C20)</code> ทำหน้าที่อะไร?",
    "choices": [
      "หาค่าต่ำสุดในช่วง C1 ถึง C20",
      "หาค่าสูงสุด",
      "หาค่าเฉลี่ย",
      "นับเซลล์ว่าง"
    ],
    "answer": 0,
    "explanation": "MIN คืนค่าตัวเลขที่มีค่าต่ำสุดในช่วงเซลล์ที่กำหนด"
  },
  {
    "prompt": "ข้อที่ 23: มัลแวร์ประเภท Trojan Horse มีลักษณะการทำงานอย่างไร?",
    "choices": [
      "ซ่อนตัวมาในคราบโปรแกรมปกติที่ดูน่าเชื่อถือเพื่อหลอกให้ติดตั้ง",
      "กระจายตัวผ่านเครือข่ายอัตโนมัติโดยไม่ต้องพึ่งพาไฟล์",
      "ยิงทราฟฟิกถล่มเซิร์ฟเวอร์ให้ล่ม",
      "สแกนหาไวรัส"
    ],
    "answer": 0,
    "explanation": "Trojan Horse ปลอมตัวเป็นโปรแกรมที่มีประโยชน์เพื่อหลอกลวงผู้ใช้"
  },
  {
    "prompt": "ข้อที่ 24: การโจมตีประเภท DDoS (Distributed Denial of Service) มีเป้าหมายเพื่ออะไร?",
    "choices": [
      "ยิงทราฟฟิกจำนวนมหาศาลมุ่งเป้าให้เซิร์ฟเวอร์ล่มจนใช้งานไม่ได้",
      "แอบขโมยรหัสผ่านบัตรเครดิต",
      "ส่งไวรัสเข้าทำลายไฟล์ดิสก์",
      "สอดส่องการพิมพ์คีย์บอร์ด"
    ],
    "answer": 0,
    "explanation": "DDoS คือการระดมส่งทราฟฟิกขัดขวางการทำงานของเซิร์ฟเวอร์จนระบบล่ม"
  },
  {
    "prompt": "ข้อที่ 25: คีย์ลัด <code>Ctrl + X</code> ทำหน้าที่อะไร?",
    "choices": [
      "ตัดข้อความ (Cut)",
      "คัดลอก (Copy)",
      "วาง (Paste)",
      "ยกเลิก (Undo)"
    ],
    "answer": 0,
    "explanation": "Ctrl + X คือ ตัด (Cut) ข้อมูล"
  },
  {
    "prompt": "ข้อที่ 26: คีย์ลัด <code>Ctrl + S</code> ในโปรแกรมส่วนใหญ่ทำหน้าที่อะไร?",
    "choices": [
      "บันทึกไฟล์ (Save)",
      "เลือกทั้งหมด (Select All)",
      "ค้นหา (Search)",
      "ปิดไฟล์ (Shutdown)"
    ],
    "answer": 0,
    "explanation": "Ctrl + S คือ บันทึก (Save) ไฟล์"
  },
  {
    "prompt": "ข้อที่ 27: คีย์ลัด <code>Ctrl + A</code> ในโปรแกรมส่วนใหญ่ทำหน้าที่อะไร?",
    "choices": [
      "เลือกข้อความ/วัตถุทั้งหมด (Select All)",
      "จัดย่อหน้า",
      "บันทึกไฟล์",
      "เพิ่มขนาดฟอนต์"
    ],
    "answer": 0,
    "explanation": "Ctrl + A คือ เลือกทั้งหมด (Select All)"
  },
  {
    "prompt": "ข้อที่ 28: บริการคลาวด์ประเภท SaaS (Software as a Service) หมายถึงข้อใด?",
    "choices": [
      "บริการซอฟต์แวร์แอปพลิเคชันพร้อมใช้งานผ่านอินเทอร์เน็ต",
      "การให้เช่าเฉพาะเครื่องเซิร์ฟเวอร์เปล่า",
      "การให้เช่าสายสัญญาณไฟเบอร์",
      "การขายฮาร์ดแวร์ดิสก์"
    ],
    "answer": 0,
    "explanation": "SaaS (เช่น Google Docs, Office 365) เป็นการให้บริการแอปซอฟต์แวร์พร้อมใช้งานผ่านเว็บ"
  },
  {
    "prompt": "ข้อที่ 29: ระบบปฏิบัติการ (Operating System: OS) ข้อใดเป็น Open Source ใช้งานได้ฟรี?",
    "choices": [
      "Linux",
      "Windows 11",
      "macOS",
      "iOS"
    ],
    "answer": 0,
    "explanation": "Linux เป็นระบบปฏิบัติการโอเพนซอร์ส (Open Source) ฟรี"
  },
  {
    "prompt": "ข้อที่ 30: สัญลักษณ์รูปแม่กุญแจ 🔒 หน้าชื่อ URL เว็บไซต์ แสดงถึงอะไร?",
    "choices": [
      "เว็บไซต์มีการเข้ารหัสความปลอดภัยด้วย HTTPS (SSL/TLS)",
      "เว็บไซต์ถูกล็อกห้ามเข้า",
      "เว็บไซต์กำลังปิดปรับปรุง",
      "เว็บไซต์เป็นของรัฐบาล"
    ],
    "answer": 0,
    "explanation": "รูปแม่กุญแจแสดงว่าการเชื่อมต่อไปยังเว็บไซต์นั้นปลอดภัยและได้รับการเข้ารหัส (HTTPS)"
  },
  {
    "prompt": "ข้อที่ 31: ใน MS Excel สูตร <code>=SUMIF(A1:A10, \"กฟผ.\", B1:B10)</code> ทำหน้าที่อะไร?",
    "choices": [
      "รวมค่าใน B1:B10 เฉพาะแถวที่ A1:A10 มีคำว่า \"กฟผ.\"",
      "นับจำนวนแถวที่มีคำว่า \"กฟผ.\"",
      "หาค่าเฉลี่ยของ \"กฟผ.\"",
      "ค้นหาตำแหน่ง \"กฟผ.\""
    ],
    "answer": 0,
    "explanation": "SUMIF รวมผลค่านับเฉพาะเซลล์ที่ตรงเงื่อนไขที่ระบุ"
  },
  {
    "prompt": "ข้อที่ 32: ใน MS PowerPoint มุมมอง Slide Master มีไว้เพื่ออะไร?",
    "choices": [
      "กำหนดรูปแบบ แม่แบบ (Template) และธีมหลักของสไลด์ทั้งหมด",
      "นำเสนอสไลด์เต็มจอ",
      "ส่งออกสไลด์เป็นวิดีโอ",
      "บันทึกเสียงนพเสนอ"
    ],
    "answer": 0,
    "explanation": "Slide Master ใช้สำหรับออกแบบจัดโครงสร้างแม่แบบธีมสไลด์ทั้งชุด"
  },
  {
    "prompt": "ข้อที่ 33: เทคโนโลยี AI ประเภท Generative AI มีความสามารถหลักอย่างไร?",
    "choices": [
      "สร้างสรรค์เนื้อหาใหม่ เช่น ข้อความ ภาพ หรือโค้ด ตามคำสั่ง Prompt",
      "คำนวณบวกเลขทางคณิตศาสตร์อย่างเดียว",
      "แสกนไวรัสในฮาร์ดดิสก์",
      "สำรองข้อมูลลงเทปม้วน"
    ],
    "answer": 0,
    "explanation": "Generative AI (เช่น Gemini, ChatGPT) มีความสามารถสร้างสรรค์คอนเทนต์ใหม่ๆ ตามคำสั่ง"
  },
  {
    "prompt": "ข้อที่ 34: อุปกรณ์ใดทำหน้าที่กระจายสัญญาณอินเทอร์เน็ตแบบไร้สายภายในบ้าน?",
    "choices": [
      "Wi-Fi Router",
      "Switch",
      "Modem เปล่า",
      "LAN Cable"
    ],
    "answer": 0,
    "explanation": "Wi-Fi Router กระจายสัญญาณอินเทอร์เน็ตไร้สาย"
  },
  {
    "prompt": "ข้อที่ 35: ใน MS Word คีย์ลัด <code>Ctrl + F</code> มีไว้เพื่ออะไร?",
    "choices": [
      "ค้นหาข้อความ (Find)",
      "เปลี่ยนรูปแบบฟอนต์",
      "เติมสีข้อความ",
      "พิมพ์เอกสาร (Print)"
    ],
    "answer": 0,
    "explanation": "Ctrl + F คือ ค้นหา (Find) ข้อความในเอกสาร"
  },
  {
    "prompt": "ข้อที่ 36: ใน MS Word คีย์ลัด <code>Ctrl + P</code> มีไว้เพื่ออะไร?",
    "choices": [
      "พิมพ์เอกสารออกทางเครื่องพิมพ์ (Print)",
      "วางข้อความ",
      "เปลี่ยนขนาดหน้ากระดาษ",
      "ใส่รูปภาพ"
    ],
    "answer": 0,
    "explanation": "Ctrl + P คือ สั่งพิมพ์ (Print)"
  },
  {
    "prompt": "ข้อที่ 37: ภัยคุกคามไซเบอร์ประเภท Spyware มีพฤติกรรมอย่างไร?",
    "choices": [
      "แอบสอดส่องและบันทึกข้อมูลการใช้งาน คีย์บอร์ด รหัสผ่าน ส่งกลับไปให้แฮกเกอร์",
      "ล็อกไฟล์เรียกเงินไถ่",
      "ลบฮาร์ดดิสก์ทั้งหมด",
      "ทำให้เครื่องทำงานเร็วขึ้น"
    ],
    "answer": 0,
    "explanation": "Spyware (สปายแวร์) แอบสอดส่องขโมยข้อมูลพฤติกรรมการใช้งาน"
  },
  {
    "prompt": "ข้อที่ 38: ข้อใดคือความหมายของ IoT (Internet of Things)?",
    "choices": [
      "อุปกรณ์อิเล็กทรอนิกส์ต่างๆ เชื่อมต่อรับส่งข้อมูลกันผ่านอินเทอร์เน็ต",
      "การซื้อของออนไลน์",
      "การเล่นเกมส์บนคลาวด์",
      "การส่งอีเมลปริมาณมาก"
    ],
    "answer": 0,
    "explanation": "IoT คือการที่อุปกรณ์เครื่องใช้ต่างๆ สามารถเชื่อมต่อและสื่อสารกันผ่านอินเทอร์เน็ต"
  },
  {
    "prompt": "ข้อที่ 39: การสำรองข้อมูล (Backup) ตามหลัก 3-2-1 หมายถึงข้อใด?",
    "choices": [
      "สำรอง 3 สำเนา บน 2 สื่อที่ต่างกัน และเก็บไว้ 1 แห่งภายนอก (Offsite)",
      "สำรองข้อมูลทุก 3 วัน 2 ครั้ง ต่อ 1 เดือน",
      "ใช้คอมพิวเตอร์ 3 เครื่อง ดิสก์ 2 ลูก ไดรฟ์ 1 อัน",
      "สำรองข้อมูลเฉพาะ 3 ไฟล์แรก"
    ],
    "answer": 0,
    "explanation": "หลัก 3-2-1: เก็บ 3 Copy, 2 สื่อต่างชนิด, 1 สถานที่ภายนอก (Offsite/Cloud)"
  },
  {
    "prompt": "ข้อที่ 40: ใน MS Excel การอ้างอิงเซลล์แบบสัมบูรณ์ (Absolute Reference) เช่น <code>$A$1</code> มีจุดประสงค์อย่างไร?",
    "choices": [
      "ล็อกตำแหน่งเซลล์ไม่ให้เปลี่ยนตามเมื่อทำการคัดลอกสูตร",
      "ทำให้สูตรคำนวณเร็วขึ้น",
      "ซ่อนข้อมูลในเซลล์",
      "เปลี่ยนสีเซลล์อัตโนมัติ"
    ],
    "answer": 0,
    "explanation": "เครื่องหมาย $ ล็อกตำแหน่งแถวและคอลัมน์ไม่ให้ขยับเมื่อก๊อปปี้สูตร"
  },
  {
    "prompt": "ข้อที่ 41: ใน MS Excel สูตร <code>=CONCATENATE(A1, B1)</code> หรือ <code>A1 & B1</code> ทำหน้าที่อะไร?",
    "choices": [
      "นำข้อความในเซลล์ A1 และ B1 มาเชื่อมต่อรวมกัน",
      "บวกเลขใน A1 และ B1",
      "หาค่าเฉลี่ย A1 และ B1",
      "เปรียบเทียบข้อความ"
    ],
    "answer": 0,
    "explanation": "CONCATENATE หรือ & ใช้สำหรับเชื่อมต่อข้อความเข้าด้วยกัน"
  },
  {
    "prompt": "ข้อที่ 42: เทคโนโลยี Big Data มีคุณลักษณะสำคัญ 4V ประกอบด้วยอะไรบ้าง?",
    "choices": [
      "Volume, Velocity, Variety, Veracity",
      "Vector, Virus, Virtual, Value",
      "Video, Voice, View, Volume",
      "Vanguard, Version, Vary, Value"
    ],
    "answer": 0,
    "explanation": "4V ของ Big Data ได้แก่ Volume (ปริมาณ), Velocity (ความเร็ว), Variety (ความหลากหลาย), Veracity (ความแม่นยำ)"
  },
  {
    "prompt": "ข้อที่ 43: รหัส QR Code มีประโยชน์หลักอย่างไรเมื่อเทียบกับ Barcode แบบเดิม?",
    "choices": [
      "จุข้อมูลได้มากกว่าทั้งตัวอักษรและ URL และสแกนได้รวดเร็วแบบ 2 มิติ",
      "ใช้งานได้โดยไม่ต้องใช้กล้อง",
      "พิมพ์ลงบนกระดาษไม่ได้",
      "ไม่ต้องใช้อินเทอร์เน็ต"
    ],
    "answer": 0,
    "explanation": "QR Code เป็นบาร์โค้ด 2 มิติที่เก็บข้อมูลได้หลากหลายและรวดเร็ว"
  },
  {
    "prompt": "ข้อที่ 44: ใน MS Excel สูตร <code>=NOW()</code> แสดงผลลัพธ์เป็นอะไร?",
    "choices": [
      "วันเวลาปัจจุบันของระบบ",
      "เฉพาะวันที่ปัจจุบัน",
      "เฉพาะเวลาปัจจุบัน",
      "นับเวลาถอยหลัง"
    ],
    "answer": 0,
    "explanation": "=NOW() คืนค่าทั้งวันที่และเวลาปัจจุบันของเครื่องคอมพิวเตอร์"
  },
  {
    "prompt": "ข้อที่ 45: ใน MS Excel สูตร <code>=TODAY()</code> แสดงผลลัพธ์เป็นอะไร?",
    "choices": [
      "เฉพาะวันที่ปัจจุบัน",
      "วันเวลาปัจจุบัน",
      "วันพรุ่งนี้",
      "วันเมื่อวาน"
    ],
    "answer": 0,
    "explanation": "=TODAY() คืนค่าเฉพาะวันที่ปัจจุบัน"
  },
  {
    "prompt": "ข้อที่ 46: คีย์ลัด <code>Alt + Tab</code> ในระบบปฏิบัติการ Windows มีไว้เพื่ออะไร?",
    "choices": [
      "สลับหน้าต่างโปรแกรมที่เปิดใช้งานอยู่",
      "ปิดโปรแกรมปัจจุบัน",
      "เปิด Task Manager",
      "ลบไฟล์"
    ],
    "answer": 0,
    "explanation": "Alt + Tab สลับหน้าต่างแอปพลิเคชันที่เปิดใช้งาน"
  },
  {
    "prompt": "ข้อที่ 47: คีย์ลัด <code>Ctrl + Shift + Esc</code> ใน Windows ใช้สำหรับเปิดอะไร?",
    "choices": [
      "Task Manager",
      "Control Panel",
      "My Computer",
      "Browser"
    ],
    "answer": 0,
    "explanation": "Ctrl + Shift + Esc เปิด Task Manager โดยตรง"
  },
  {
    "prompt": "ข้อที่ 48: การใช้งาน Wi-Fi สาธารณะที่ไม่มีรหัสผ่าน ควรระมัดระวังเรื่องใดมากที่สุด?",
    "choices": [
      "ข้อมูลการเข้าเว็บรหัสผ่านอาจถูกดักจับ (Eavesdropping/Man-in-the-Middle)",
      "เน็ตจะช้าเกินไป",
      "แบตเตอรี่หมดไว",
      "หน้าจอจะดับ"
    ],
    "answer": 0,
    "explanation": "Wi-Fi สาธารณะเสี่ยงต่อการถูกดักจับข้อมูล (MitM Attack) ควรหลีกเลี่ยงการทำธุรกรรมการเงิน"
  },
  {
    "prompt": "ข้อที่ 49: ในการส่งอีเมล ช่อง <strong>BCC</strong> (Blind Carbon Copy) มีจุดประสงค์เพื่ออะไร?",
    "choices": [
      "ซ่อนรายชื่ออีเมลผู้รับคนอื่นไม่ให้ผู้รับคนไหนเห็น",
      "ส่งอีเมลฉบับด่วนที่สุด",
      "แนบไฟล์ขนาดใหญ่พิเศษ",
      "ส่งหาผู้รับหลัก"
    ],
    "answer": 0,
    "explanation": "BCC ซ่อนที่อยู่อีเมลของผู้รับในช่องนี้ไม่ให้ผู้รับคนอื่นเห็น"
  },
  {
    "prompt": "ข้อที่ 50: ในการส่งอีเมล ช่อง <strong>CC</strong> (Carbon Copy) มีจุดประสงค์เพื่ออะไร?",
    "choices": [
      "ส่งสำเนาอีเมลให้ผู้เกี่ยวข้องรับทราบข้อมูล",
      "ส่งหาผู้รับหลักที่ต้องตอบกลับ",
      "ซ่อนชื่อผู้รับ",
      "บล็อกอีเมลขยะ"
    ],
    "answer": 0,
    "explanation": "CC คือการส่งสำเนาแจ้งให้ผู้เกี่ยวข้องรับทราบข้อมูลโดยไม่ต้องตอบกลับ"
  }
,
  {
      "prompt": "ข้อที่ 51: ในโปรแกรม MS Excel หากใช้สูตร =VLOOKUP(\"A\", A1:B10, 2, FALSE) อาร์กิวเมนต์ FALSE หมายถึงสิ่งใด",
      "choices": [
          "ค้นหาค่าที่ใกล้เคียงที่สุด (Approximate Match)",
          "ค้นหาค่าที่ตรงกันทุกประการ (Exact Match)",
          "ให้คืนค่าเป็นเท็จเสมอ",
          "เรียงลำดับข้อมูลจากน้อยไปมาก"
      ],
      "answer": 1,
      "explanation": "FALSE ใน VLOOKUP กำหนดให้ <strong>ค้นหาค่าที่ตรงกันทุกประการ (Exact Match)</strong>"
  },
  {
      "prompt": "ข้อที่ 52: ใน MS Excel หากต้องการรวมผลตัวเลขเฉพาะเซลล์ที่ตรงตามเงื่อนไขที่กำหนด ต้องใช้สูตรใด",
      "choices": [
          "=SUM()",
          "=COUNTIF()",
          "=SUMIF()",
          "=AVERAGEIF()"
      ],
      "answer": 2,
      "explanation": "<strong>=SUMIF()</strong> ใช้คำนวณผลรวมของเซลล์ตามเงื่อนไขที่กำหนด"
  },
  {
      "prompt": "ข้อที่ 53: เครื่องหมาย $ ในสูตร MS Excel เช่น $A$1 มีไว้เพื่อทำสิ่งใด",
      "choices": [
          "กำหนดให้เป็นสกุลเงินดอลลาร์",
          "ล็อกตำแหน่งอ้างอิงเซลล์ไม่ให้เปลี่ยนเมื่อคัดลอกสูตร (Absolute Reference)",
          "แสดงข้อผิดพลาด",
          "ซ่อนข้อมูลในเซลล์"
      ],
      "answer": 1,
      "explanation": "เครื่องหมาย $ ใช้สำหรับ <strong>ตรึงหรือล็อกตำแหน่งอ้างอิงเซลล์ (Absolute Reference)</strong> ไม่ให้เลื่อนตำแหน่งเมื่อ copy สูตร"
  },
  {
      "prompt": "ข้อที่ 54: การส่งอีเมลหลอกลวงที่สร้างลิงก์ปลอมเพื่อหลอกเอาพาสเวิร์ดหรือข้อมูลบัตรเครดิต เรียกว่าภัยคุกคามชนิดใด",
      "choices": [
          "Phishing",
          "Ransomware",
          "DDoS",
          "Spyware"
      ],
      "answer": 0,
      "explanation": "<strong>Phishing</strong> คือการสร้างกลลวงทางอินเทอร์เน็ต/อีเมลเพื่อหลอกเอาข้อมูลสำคัญ"
  },
  {
      "prompt": "ข้อที่ 55: มัลแวร์ที่เข้ารหัสลับไฟล์ข้อมูลในเครื่องคอมพิวเตอร์เพื่อเรียกเงินไถ่แลกคีย์ปลดล็อก เรียกว่าอะไร",
      "choices": [
          "Virus",
          "Worm",
          "Ransomware",
          "Adware"
      ],
      "answer": 2,
      "explanation": "<strong>Ransomware (มัลแวร์เรียกค่าไถ่)</strong> จะเข้ารหัสไฟล์และเรียกเงินไถ่เพื่อแลกกับรหัสปลดล็อก"
  },
  {
      "prompt": "ข้อที่ 56: การยืนยันตัวตนแบบ 2 ปัจจัย (2FA / Two-Factor Authentication) มีประโยชน์อย่างไร",
      "choices": [
          "ทำให้เข้าสู่ระบบได้เร็วขึ้น",
          "เพิ่มความปลอดภัยโดยต้องใช้รหัสผ่านร่วมกับ OTP/อุปกรณ์ยืนยันอีกชั้น",
          "ไม่ต้องจำรหัสผ่านอีกต่อไป",
          "ป้องกันไวรัสคอมพิวเตอร์"
      ],
      "answer": 1,
      "explanation": "2FA ป้องกันบัญชีถูกแฮกโดย <strong>ต้องยืนยันตัวตน 2 ขั้นตอน (เช่น Password + OTP)</strong>"
  },
  {
      "prompt": "ข้อที่ 57: หมายเลข IP Address เวอร์ชัน 4 (IPv4) ประกอบด้วยชุดตัวเลขกี่ชุด (Octets)",
      "choices": [
          "2 ชุด",
          "4 ชุด",
          "6 ชุด",
          "8 ชุด"
      ],
      "answer": 1,
      "explanation": "IPv4 ประกอบด้วยตัวเลข <strong>4 ชุด</strong> คั่นด้วยจุด (เช่น 192.168.1.1)"
  },
  {
      "prompt": "ข้อที่ 58: บริการใดทำหน้าที่แปลงชื่อโดเมนเว็บไซต์ (เช่น www.egat.co.th) ให้เป็นหมายเลข IP Address",
      "choices": [
          "DHCP",
          "DNS (Domain Name System)",
          "HTTP",
          "FTP"
      ],
      "answer": 1,
      "explanation": "<strong>DNS (Domain Name System)</strong> ทำหน้าที่แปลงชื่อเว็บไซต์เป็นหมายเลข IP Address"
  },
  {
      "prompt": "ข้อที่ 59: หน่วยความจำชั่วคราวของคอมพิวเตอร์ที่จะสูญหายเมื่อปิดเครื่อง (Volatile Memory) คือข้อใด",
      "choices": [
          "Hard Disk",
          "ROM",
          "RAM (Random Access Memory)",
          "SSD"
      ],
      "answer": 2,
      "explanation": "<strong>RAM</strong> เป็นหน่วยความจำชั่วคราว ข้อมูลจะสูญหายเมื่อไม่มีกระแสไฟฟ้าเลี้ยง"
  },
  {
      "prompt": "ข้อที่ 60: อุปกรณ์จัดเก็บข้อมูลชนิดใดมีความเร็วในการอ่านเขียนสูงกว่า HDD (Hard Disk Drive) อย่างมาก",
      "choices": [
          "SSD (Solid State Drive)",
          "Floppy Disk",
          "CD-ROM",
          "Magnetic Tape"
      ],
      "answer": 0,
      "explanation": "<strong>SSD (Solid State Drive)</strong> ใช้แฟลชแมมโมรีในการบันทึกข้อมูล ทำให้มีความเร็วสูงกว่า HDD มาก"
  },
  {
      "prompt": "ข้อที่ 61: ใน MS Excel สูตร =COUNTIF(A1:A10, \">50\") ทำหน้าที่อะไร",
      "choices": [
          "รวมผลตัวเลขที่มากกว่า 50",
          "นับจำนวนเซลล์ในช่วง A1:A10 ที่มีค่ามากกว่า 50",
          "หาค่าเฉลี่ยตัวเลขที่มากกว่า 50",
          "แสดงค่า 50 ในช่วง A1:A10"
      ],
      "answer": 1,
      "explanation": "COUNTIF ทำหน้าที่ <strong>นับจำนวนเซลล์ตามเงื่อนไขที่กำหนด</strong> (>50)"
  },
  {
      "prompt": "ข้อที่ 62: ข้อใดคือลักษณะของรหัสผ่าน (Password) ที่มีความปลอดภัยสูงตามมาตรฐานสากล",
      "choices": [
          "ใช้ตัวเลขวันเกิด 6 หลัก",
          "ยาวอย่างน้อย 12 ตัวอักษร ประกอบด้วยอักษรตัวใหญ่ ตัวเล็ก ตัวเลข และสัญลักษณ์",
          "ใช้คำว่า password1234",
          "ใช้อักษรตัวเดียวซ้ำๆ กัน"
      ],
      "answer": 1,
      "explanation": "รหัสผ่านปลอดภัยต้อง <strong>ยาว 12+ ตัวอักษร มีการผสมตัวอักษรใหญ่-เล็ก เลข และสัญลักษณ์พิเศษ</strong>"
  },
  {
      "prompt": "ข้อที่ 63: โปรโตคอลที่ใช้รับส่งข้อมูลเว็บไซต์แบบปลอดภัยที่มีการเข้ารหัสข้อมูล (SSL/TLS) คือข้อใด",
      "choices": [
          "HTTP",
          "HTTPS",
          "FTP",
          "SMTP"
      ],
      "answer": 1,
      "explanation": "<strong>HTTPS (Hypertext Transfer Protocol Secure)</strong> มีการเข้ารหัสข้อมูลเพื่อความปลอดภัย"
  },
  {
      "prompt": "ข้อที่ 64: อุปกรณ์เครือข่ายที่ทำหน้าที่เชื่อมต่อและกำหนดเส้นทางการส่งข้อมูลในอินเทอร์เน็ตคืออะไร",
      "choices": [
          "Switch",
          "Hub",
          "Router",
          "Modem"
      ],
      "answer": 2,
      "explanation": "<strong>Router</strong> ทำหน้าที่ค้นหาและกำหนดเส้นทางส่งข้อมูล (Routing) ในเครือข่าย"
  },
  {
      "prompt": "ข้อที่ 65: ข้อใดจัดเป็นบริการจัดเก็บข้อมูลบนคลาวด์ (Cloud Storage)",
      "choices": [
          "Google Drive",
          "MS Paint",
          "Calculator",
          "Notepad"
      ],
      "answer": 0,
      "explanation": "<strong>Google Drive</strong> (รวมถึง OneDrive, Dropbox) เป็นบริการจัดเก็บไฟล์บนระบบคลาวด์"
  },
  {
      "prompt": "ข้อที่ 66: โปรแกรมคอมพิวเตอร์ที่เป็นอันตรายที่สร้างขึ้นมาเพื่อประทุษร้ายระบบเรียกรวมว่าอะไร",
      "choices": [
          "Software",
          "Hardware",
          "Malware (Malicious Software)",
          "Shareware"
      ],
      "answer": 2,
      "explanation": "<strong>Malware</strong> ย่อมาจาก Malicious Software ครอบคลุมทั้งไวรัส เวิร์ม และแรนซอมแวร์"
  },
  {
      "prompt": "ข้อที่ 67: ใน MS Excel หากแสดงข้อผิดพลาด #DIV/0! หมายถึงสิ่งใด",
      "choices": [
          "สะกดชื่อสูตรผิด",
          "ตัวหารในสูตรมีค่าเป็น 0",
          "อ้างอิงเซลล์ผิดพลาด",
          "ความยาวตัวเลขเกินความกว้างเซลล์"
      ],
      "answer": 1,
      "explanation": "#DIV/0! (Division by Zero) เกิดขึ้นเมื่อ <strong>มีตัวหารเป็น 0</strong> ซึ่งไม่สามารถทางคณิตศาสตร์ได้"
  },
  {
      "prompt": "ข้อที่ 68: โปรแกรมที่ทำหน้าที่ตรวจจับและควบคุมการเข้าออกของทราฟฟิกเครือข่ายเรียกว่าอะไร",
      "choices": [
          "Firewall",
          "Antivirus",
          "Web Browser",
          "Operating System"
      ],
      "answer": 0,
      "explanation": "<strong>Firewall (ไฟร์วอลล์)</strong> ทำหน้าที่เป็นกำแพงกรองและควบคุมข้อมูลการเชื่อมต่อเครือข่าย"
  },
  {
      "prompt": "ข้อที่ 69: ชิปประมวลผลหลักของคอมพิวเตอร์ซึ่งเปรียบเสมือนสมองของเครื่องคืออุปกรณ์ใด",
      "choices": [
          "RAM",
          "GPU",
          "CPU (Central Processing Unit)",
          "Power Supply"
      ],
      "answer": 2,
      "explanation": "<strong>CPU</strong> คือหน่วยประมวลผลกลาง ทำหน้าที่คิดคำนวณและประมวลผลหลักของคอมพิวเตอร์"
  },
  {
      "prompt": "ข้อที่ 70: ใน MS Excel การกดปุ่ม F4 ขณะแก้ไขสูตรเซลล์มีผลอย่างไร",
      "choices": [
          "ลบสูตรออก",
          "สลับประเภทการอ้างอิงเซลล์ (Relative/Absolute $A$1)",
          "คำนวณใหม่ทั้งแผ่นงาน",
          "ปิดโปรแกรม"
      ],
      "answer": 1,
      "explanation": "ปุ่ม F4 ใน Excel ใช้ <strong>สลับใส่เครื่องหมาย $ ตรึงตำแหน่งเซลล์แบบรวดเร็ว</strong>"
  },
  {
      "prompt": "ข้อที่ 71: หมายเลข MAC Address คืออะไร",
      "choices": [
          "หมายเลข IP Address ชั่วคราว",
          "หมายเลขกายภาพประจำการ์ดแลน/อุปกรณ์เครือข่ายที่ไม่ซ้ำกัน",
          "รหัสผ่าน WiFi",
          "หมายเลขเวอร์ชันของ Windows"
      ],
      "answer": 1,
      "explanation": "<strong>MAC Address</strong> คือหมายเลขระบุตัวตนทางกายภาพ (Hardware Address) ประจำอุปกรณ์เครือข่าย"
  },
  {
      "prompt": "ข้อที่ 72: เทคโนโลยีที่ใช้ในการประมวลผลปัญญาประดิษฐ์และเรียนรู้จากชุดข้อมูลจำนวนมากเรียกว่าอะไร",
      "choices": [
          "AI / Machine Learning",
          "Blockchain",
          "Virtual Reality",
          "Quantum Mechanics"
      ],
      "answer": 0,
      "explanation": "<strong>AI (Artificial Intelligence) และ Machine Learning</strong> เป็นเทคโนโลยีปัญญาประดิษฐ์"
  },
  {
      "prompt": "ข้อที่ 73: การสำรองข้อมูล (Backup) ที่ดีตามหลักมาตรฐาน 3-2-1 ประกอบด้วยอะไรบ้าง",
      "choices": [
          "เก็บ 3 สำเนา บนสื่อ 2 ชนิด เก็บภายนอกสถานที่ 1 แห่ง",
          "เก็บ 3 ปี เปลี่ยนสื่อ 2 ครั้ง ลบ 1 ครั้ง",
          "ใช้พาสเวิร์ด 3 ตัว สำรอง 2 วัน ครั้งละ 1 ชั่วโมง",
          "ไม่มีข้อถูก"
      ],
      "answer": 0,
      "explanation": "กฎ 3-2-1: <strong>เก็บ 3 สำเนา (1 ต้นฉบับ + 2 สำรอง), บนสื่อ 2 ชนิดต่างกัน, เก็บไว้ Offsite 1 แห่ง</strong>"
  },
  {
      "prompt": "ข้อที่ 74: คีย์ลัดในแป้นพิมพ์สำหรับ คัดลอก (Copy) และ วาง (Paste) ในระบบ Windows คือข้อใด",
      "choices": [
          "Ctrl + C และ Ctrl + V",
          "Ctrl + X และ Ctrl + V",
          "Ctrl + A และ Ctrl + C",
          "Ctrl + Z และ Ctrl + Y"
      ],
      "answer": 0,
      "explanation": "คีย์ลัดมาตรฐาน: <strong>Ctrl + C (คัดลอก) และ Ctrl + V (วาง)</strong>"
  },
  {
      "prompt": "ข้อที่ 75: การประมวลผลคลาวด์ประเภท SaaS ย่อมาจากคำว่าอะไร",
      "choices": [
          "Software as a Service",
          "System as a Service",
          "Storage as a Service",
          "Security as a Service"
      ],
      "answer": 0,
      "explanation": "SaaS ย่อมาจาก <strong>Software as a Service</strong> (บริการซอฟต์แวร์ผ่านคลาวด์ เช่น Google Docs, Office 365)"
  }
];

// Helper: Prepare Randomized Quiz Session
function prepareRandomizedQuiz(quiz) {
  if (!quiz || quiz.isPdfSet) return quiz;

  let pool = [];
  if (quiz.id === 'mock_random_all') {
    pool = [...MATH_QUESTIONS, ...VERBAL_QUESTIONS, ...LOGIC_QUESTIONS, ...SPATIAL_QUESTIONS, ...DIGITAL_QUESTIONS, ...EGAT_KNOWLEDGE_QUESTIONS];
  } else {
    pool = quiz.questions ? [...quiz.questions] : [];
  }

  if (pool.length === 0) return quiz;

  // Shuffle question order
  const shuffledQuestions = shuffleArray(pool);

  // Pick question count
  const countToPick = quiz.questionsCount || Math.min(10, shuffledQuestions.length);
  const selectedQuestions = shuffledQuestions.slice(0, countToPick);

  // Randomize choices for each question
  const finalQuestions = selectedQuestions.map(q => randomizeQuestion(q));

  return {
    ...quiz,
    questions: finalQuestions
  };
}

const MOCK_TEST_QUIZZES = [
  {
    id: 'mock_random_all',
    cat: 'all',
    title: 'สุ่มชุดข้อสอบรวม (Grand Mock Test)',
    subjectName: 'RANDOM MIX',
    badgeColor: '#ec4899',
    icon: '🎲',
    questionsCount: 20,
    timeLimitMins: 30,
    difficulty: 'สุ่มคละทุกวิชา',
    desc: 'สุ่มโจทย์ 20 ข้อจากคลังใหญ่ 300 ข้อ คละทุกหมวดวิชา ไม่ซ้ำเดิมทุกครั้งที่กดทำ',
    questions: []
  },
  {
    id: 'mock_math_1',
    cat: 'math',
    title: 'ชุดคณิตศาสตร์ (Numerical Ability)',
    subjectName: 'MATH EXAMS',
    badgeColor: '#3b82f6',
    icon: '🔢',
    questionsCount: 10,
    timeLimitMins: 15,
    difficulty: 'แนวสอบจริง (สุ่ม 10 ข้อ)',
    desc: 'สุ่ม 10 ข้อจากคลังโจทย์คณิตศาสตร์ 50 ข้อ (อนุกรมตัวเลข, ร้อยละ/กำไร, สมการอายุ, สถิติ, เรขาคณิต, พีทาโกรัส)',
    questions: MATH_QUESTIONS
  },
  {
    id: 'mock_verbal_1',
    cat: 'verbal',
    title: 'ชุดภาษาไทย (Verbal Ability)',
    subjectName: 'VERBAL EXAMS',
    badgeColor: '#a78bfa',
    icon: '💬',
    questionsCount: 10,
    timeLimitMins: 12,
    difficulty: 'แนวสอบจริง (สุ่ม 10 ข้อ)',
    desc: 'สุ่ม 10 ข้อจากคลังโจทย์ภาษาไทย 50 ข้อ (อุปมาอุปไมย, สะกดคำถูกผิด, คำไม่เข้าพวก, คำตรงข้าม, ย่อความบทความ)',
    questions: VERBAL_QUESTIONS
  },
  {
    id: 'mock_logic_1',
    cat: 'logic',
    title: 'ชุดตรรกศาสตร์ (Logical Reasoning)',
    subjectName: 'LOGIC EXAMS',
    badgeColor: '#22d3ee',
    icon: '🧠',
    questionsCount: 10,
    timeLimitMins: 15,
    difficulty: 'แนวสอบจริง (สุ่ม 10 ข้อ)',
    desc: 'สุ่ม 10 ข้อจากคลังโจทย์ตรรกศาสตร์ 50 ข้อ (ประพจน์ p→q, Modus Ponens/Tollens, เงื่อนไขสัญลักษณ์, แผนภาพเวนน์)',
    questions: LOGIC_QUESTIONS
  },
  {
    id: 'mock_spatial_1',
    cat: 'spatial',
    title: 'ชุดมิติสัมพันธ์ (Spatial Ability)',
    subjectName: 'SPATIAL EXAMS',
    badgeColor: '#fb923c',
    icon: '🎲',
    questionsCount: 10,
    timeLimitMins: 12,
    difficulty: 'แนวสอบจริง (สุ่ม 10 ข้อ)',
    desc: 'สุ่ม 10 ข้อจากคลังโจทย์มิติสัมพันธ์ 50 ข้อ (คลี่พับกล่อง 3D, หมุนภาพ 2D/3D, สะท้อนกระจกเงา, คำนวณลูกบาศก์)',
    questions: SPATIAL_QUESTIONS
  },
  {
    id: 'mock_egat_1',
    cat: 'egat',
    title: 'ชุดความรู้ กฟผ. และพลังงาน (EGAT Knowledge)',
    subjectName: 'EGAT EXAMS',
    badgeColor: '#eab308',
    icon: '⚡',
    questionsCount: 10,
    timeLimitMins: 12,
    difficulty: 'ความรู้องค์กร (สุ่ม 10 ข้อ)',
    desc: 'สุ่ม 10 ข้อจากคลังโจทย์ความรู้ กฟผ. 50 ข้อ (ค่านิยม SPEED, โรงไฟฟ้า, ระบบส่งไฟฟ้า 500kV, Carbon Neutrality, Net Zero, ประวัติ กฟผ.)',
    questions: EGAT_KNOWLEDGE_QUESTIONS
  },
  {
    id: 'mock_digital_1',
    cat: 'digital',
    title: 'ชุดทักษะดิจิทัล (Digital Literacy)',
    subjectName: 'DIGITAL EXAMS',
    badgeColor: '#34d399',
    icon: '💻',
    questionsCount: 10,
    timeLimitMins: 12,
    difficulty: 'แนวสอบจริง (สุ่ม 10 ข้อ)',
    desc: 'สุ่ม 10 ข้อจากคลังโจทย์ดิจิทัล 50 ข้อ (สูตร MS Excel VLOOKUP/IF, Cybersecurity Phishing/Ransomware, OS, IP Address)',
    questions: DIGITAL_QUESTIONS
  },
  {
    id: 'mock_pdf_sets',
    cat: 'pdf',
    title: 'คลังชุดข้อสอบเก่า กฟผ. (ปี 65, 68, 69)',
    subjectName: 'PDF EXAMS',
    badgeColor: '#ec4899',
    icon: '📄',
    questionsCount: 100,
    timeLimitMins: 150,
    difficulty: 'ข้อสอบจริงปีล่าสุด',
    desc: 'แนวข้อสอบจริงปี 2565, 2568, 2569 พร้อมเปิดอ่านผ่าน PDF Viewer ได้ทันที',
    isPdfSet: true
  },
  {
    id: 'mock_custom_builder_card',
    cat: 'all',
    title: 'สร้างชุดข้อสอบตามที่ต้องการ (Custom Quiz)',
    subjectName: 'CUSTOM BUILDER',
    badgeColor: '#fb923c',
    icon: '⚙️',
    questionsCount: 'กำหนดเอง',
    timeLimitMins: 'กำหนดเอง',
    difficulty: 'ออกแบบข้อสอบเอง',
    desc: 'เลือกวิชาเฉพาะ เจาะจงหัวข้อ (เช่น อนุกรม, สมการ, ตรรกะ), กำหนดจำนวนข้อ และเวลาได้ตามต้องการ',
    isCustomCard: true
  }
];

let activeQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = []; // array of selected choice indices
let quizTimerInterval = null;
let quizSecondsElapsed = 0;

// Initialize Mock Test Section
function initMockTestSection() {
  const grid = document.getElementById('mocktestGrid');
  const tabs = document.getElementById('mockCategoryTabs');
  if (!grid || !tabs) return;

  // Category Tabs Click Listener
  tabs.addEventListener('click', e => {
    const tab = e.target.closest('.mock-tab');
    if (!tab) return;

    tabs.querySelectorAll('.mock-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.dataset.cat;
    renderMockTestGrid(category);
  });

  // Action Buttons Listeners
  const quitBtn = document.getElementById('quitQuizBtn');
  if (quitBtn) quitBtn.addEventListener('click', quitQuiz);

  const prevBtn = document.getElementById('prevQuestionBtn');
  if (prevBtn) prevBtn.addEventListener('click', prevQuestion);

  const checkBtn = document.getElementById('checkAnswerBtn');
  if (checkBtn) checkBtn.addEventListener('click', checkCurrentAnswer);

  const nextBtn = document.getElementById('nextQuestionBtn');
  if (nextBtn) nextBtn.addEventListener('click', nextQuestion);

  const finishBtn = document.getElementById('finishQuizBtn');
  if (finishBtn) finishBtn.addEventListener('click', finishQuiz);

  const saveScoreBtn = document.getElementById('saveScoreToLogBtn');
  if (saveScoreBtn) saveScoreBtn.addEventListener('click', saveQuizScoreToLog);

  const retakeBtn = document.getElementById('retakeQuizBtn');
  if (retakeBtn) retakeBtn.addEventListener('click', () => {
    if (activeQuiz) startQuiz(activeQuiz.id);
  });

  const backBtn = document.getElementById('backToQuizzesBtn');
  if (backBtn) backBtn.addEventListener('click', quitQuiz);

  // Initial Render
  renderMockTestGrid('all');
}

// Render Quiz Cards Grid
function renderMockTestGrid(catFilter = 'all') {
  const grid = document.getElementById('mocktestGrid');
  if (!grid) return;

  grid.innerHTML = '';

  const filtered = MOCK_TEST_QUIZZES.filter(q => {
    if (catFilter === 'all') return true;
    return q.cat === catFilter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div class="mock-empty-state">ไม่พบชุดข้อสอบในหมวดหมู่นี้</div>';
    return;
  }

  filtered.forEach(q => {
    const card = document.createElement('div');
    card.className = 'mock-quiz-card';
    
    if (q.isPdfSet) {
      card.innerHTML = `
        <div class="mq-card-header" style="background: linear-gradient(135deg, rgba(236,72,153,0.15), rgba(168,85,247,0.15)); border-bottom: 1px solid rgba(236,72,153,0.2);">
          <div class="mq-badge" style="background: rgba(236,72,153,0.2); color: #f472b6; border: 1px solid rgba(236,72,153,0.3);">${q.icon} ${q.subjectName}</div>
          <span class="mq-diff">${q.difficulty}</span>
        </div>
        <div class="mq-card-body">
          <h3 class="mq-title">${q.title}</h3>
          <p class="mq-desc">${q.desc}</p>
          <div class="mq-pdf-list">
            <button class="btn-pdf-task" data-pdfid="pdf_egat_65" type="button">📖 ข้อสอบปี 2565 (PDF)</button>
            <button class="btn-pdf-task" data-pdfid="pdf_egat_68" type="button">📖 ข้อสอบปี 2568 (PDF)</button>
            <button class="btn-pdf-task" data-pdfid="pdf_egat_69_1" type="button">📖 ข้อสอบปี 2569 #1</button>
            <button class="btn-pdf-task" data-pdfid="pdf_egat_69_2" type="button">📖 ข้อสอบปี 2569 #2</button>
            <button class="btn-pdf-task" data-pdfid="pdf_limit_ku" type="button">📐 แบบฝึกหัด ลิมิต Limit (KU PDF)</button>
          </div>
        </div>
      `;
    } else if (q.isCustomCard) {
      card.innerHTML = `
        <div class="mq-card-header" style="background: linear-gradient(135deg, rgba(251,146,60,0.18), rgba(236,72,153,0.18)); border-bottom: 1px solid rgba(251,146,60,0.3);">
          <div class="mq-badge" style="background: rgba(251,146,60,0.22); color: #fb923c; border: 1px solid rgba(251,146,60,0.4);">${q.icon} ${q.subjectName}</div>
          <span class="mq-diff" style="color: #fdba74; font-weight: 600;">✨ ${q.difficulty}</span>
        </div>
        <div class="mq-card-body">
          <h3 class="mq-title">${q.title}</h3>
          <p class="mq-desc">${q.desc}</p>
          <div class="mq-meta-row">
            <span class="mq-meta-item">🎯 เลือกรายหัวข้อย่อย</span>
            <span class="mq-meta-item">⏱️ ปรับเวลา/ข้อสอบ</span>
          </div>
        </div>
        <div class="mq-card-footer">
          <button class="btn-start-quiz" onclick="openCustomQuizModal()" type="button" style="background: linear-gradient(135deg, #fb923c, #ec4899); border: none; font-weight: 700; box-shadow: 0 4px 16px rgba(251,146,60,0.35);">⚙️ เริ่มสร้างชุดข้อสอบเอง →</button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="mq-card-header" style="background: linear-gradient(135deg, ${q.badgeColor}15, rgba(15,23,42,0.6)); border-bottom: 1px solid ${q.badgeColor}22;">
          <div class="mq-badge" style="background: ${q.badgeColor}22; color: ${q.badgeColor}; border: 1px solid ${q.badgeColor}44;">${q.icon} ${q.subjectName}</div>
          <span class="mq-diff">${q.difficulty}</span>
        </div>
        <div class="mq-card-body">
          <h3 class="mq-title">${q.title}</h3>
          <p class="mq-desc">${q.desc}</p>
          <div class="mq-meta-row">
            <span class="mq-meta-item">📝 ${q.questionsCount} ข้อ</span>
            <span class="mq-meta-item">⏱️ ${q.timeLimitMins} นาที</span>
          </div>
        </div>
        <div class="mq-card-footer">
          <button class="btn-start-quiz" onclick="startQuiz('${q.id}')">🚀 เริ่มทำแบบทดสอบ →</button>
        </div>
      `;
    }
    grid.appendChild(card);
  });
}

// Start Quiz Session with Randomization
function startQuiz(quizId) {
  const originalQuiz = MOCK_TEST_QUIZZES.find(q => q.id === quizId);
  if (!originalQuiz) return;

  if (originalQuiz.isPdfSet) return;

  // Prepare Randomized Quiz Instance (shuffles questions & choice positions)
  const quiz = prepareRandomizedQuiz(originalQuiz);
  if (!quiz || !quiz.questions || quiz.questions.length === 0) return;

  activeQuiz = quiz;
  currentQuestionIndex = 0;
  userAnswers = new Array(quiz.questions.length).fill(null);
  quizSecondsElapsed = 0;

  // Show quiz runner card, hide grid
  const runner = document.getElementById('quizRunnerContainer');
  const grid = document.getElementById('mocktestGrid');
  const bodyView = document.getElementById('quizBody');
  const summaryView = document.getElementById('quizResultSummary');

  if (grid) grid.style.display = 'none';
  if (runner) {
    runner.style.display = 'block';
    runner.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (bodyView) bodyView.style.display = 'block';
  if (summaryView) summaryView.style.display = 'none';

  // Setup Title / Badge with Randomization Indicator
  document.getElementById('quizBadge').textContent = `${quiz.subjectName} • 🔀 สุ่มโจทย์แล้ว`;
  document.getElementById('quizBadge').style.borderColor = quiz.badgeColor;
  document.getElementById('quizTitle').textContent = quiz.title;

  // Start Timer
  clearInterval(quizTimerInterval);
  updateQuizTimerDisplay();
  quizTimerInterval = setInterval(() => {
    quizSecondsElapsed++;
    updateQuizTimerDisplay();
  }, 1000);

  // Render first question
  renderCurrentQuestion();
}

function updateQuizTimerDisplay() {
  const timerEl = document.getElementById('quizTimerText');
  if (!timerEl) return;
  const mins = Math.floor(quizSecondsElapsed / 60);
  const secs = quizSecondsElapsed % 60;
  timerEl.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * ทำความสะอาดและแปลงรูปแบบ LaTeX ให้อยู่ในโครงสร้างที่ MathJax 3 อ่านและแสดงผลเป็นเศษส่วน/สมการคณิตศาสตร์ได้สมบูรณ์
 */
function fixLatexString(str) {
  if (!str || typeof str !== 'string') return str || '';

  let s = str;

  // 1. ซ่อมแซมผลลัพธ์จาก JS Escape Characters ที่กลายเป็น control characters (เช่น \f -> \x0C, \t -> \x09)
  s = s.replace(/\x0Crac(?=[{\s\d\w\(\\\+\-\*\/])/g, '\\frac');
  s = s.replace(/\x09o(?=[{\s\d\w\(\\\+\-\*\/])/g, '\\to');
  s = s.replace(/\x09heta(?=[{\s\d\w\(\\\+\-\*\/])/g, '\\theta');
  s = s.replace(/\x09imes(?=[{\s\d\w\(\\\+\-\*\/])/g, '\\times');
  s = s.replace(/\x0Au(?=[{\s\d\w\(\\\+\-\*\/])/g, '\\nu');
  s = s.replace(/\x0Dho(?=[{\s\d\w\(\\\+\-\*\/])/g, '\\rho');
  s = s.replace(/\x08eta(?=[{\s\d\w\(\\\+\-\*\/])/g, '\\beta');

  // 2. เติม Backslash คำสั่ง LaTeX ยอดนิยมหากหลุดหาย
  s = s.replace(/(^|[^\\])lim(?=_[{\d\w]|[\s\\({])/g, '$1\\lim');
  s = s.replace(/(^|[^\\])frac(?=\{)/g, '$1\\frac');
  s = s.replace(/(^|[^\\])sqrt(?=\{)/g, '$1\\sqrt');

  // 3. ปรับการครอบสูตรคณิตศาสตร์ด้วย \( ... \) หรือ $ ... $
  // หากพบสูตรเช่น \lim หรือ \frac หรือ \sqrt แต่ไม่มี \( ... \) หรือ $ ... $ ครอบ
  // ให้สวม \( ... \) หุ้มสูตรไว้ เพื่อให้ MathJax 3 เรนเดอร์เป็นตัวเศษส่วนลอยกลาง/สมการสวยงามทันที
  if ((s.includes('\\lim') || s.includes('\\frac') || s.includes('\\sqrt')) && !s.includes('\\(') && !s.includes('$')) {
    s = s.replace(/(\([^)]*\\lim[^)]*\))/g, (m) => `\\(${m.slice(1, -1)}\\)`);
    if (!s.includes('\\(')) {
      s = s.replace(/(\\lim_{[^}]*}(\s*\\frac{[^}]*}{[^}]*})?)/g, '\\($1\\)');
      s = s.replace(/(\\frac{[^}]*}{[^}]*})/g, '\\($1\\)');
    }
  }

  return s;
}

// Render Question & Choices
function renderCurrentQuestion() {
  if (!activeQuiz) return;
  const q = activeQuiz.questions[currentQuestionIndex];
  const total = activeQuiz.questions.length;

  // Update progress
  document.getElementById('quizProgressText').textContent = `${currentQuestionIndex + 1}/${total}`;
  const pct = Math.round(((currentQuestionIndex + 1) / total) * 100);
  document.getElementById('quizProgressBar').style.width = `${pct}%`;

  // Question Prompt
  document.getElementById('questionPrompt').innerHTML = fixLatexString(q.prompt);

  // Render Choices
  const choicesContainer = document.getElementById('choicesContainer');
  choicesContainer.innerHTML = '';

  const selectedChoice = userAnswers[currentQuestionIndex];
  const isAnswered = selectedChoice !== null;

  q.choices.forEach((choiceText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    if (selectedChoice === idx) {
      btn.classList.add('selected');
    }

    const label = String.fromCharCode(65 + idx); // A, B, C, D
    btn.innerHTML = `<span class="choice-prefix">${label}</span> <span class="choice-text">${fixLatexString(choiceText)}</span>`;

    btn.addEventListener('click', () => selectChoice(idx));
    choicesContainer.appendChild(btn);
  });

  // Reset explanation & action buttons
  const explanationBox = document.getElementById('explanationBox');
  explanationBox.style.display = 'none';

  const checkBtn = document.getElementById('checkAnswerBtn');
  const nextBtn = document.getElementById('nextQuestionBtn');
  const finishBtn = document.getElementById('finishQuizBtn');
  const prevBtn = document.getElementById('prevQuestionBtn');

  prevBtn.disabled = currentQuestionIndex === 0;

  checkBtn.style.display = 'inline-flex';
  nextBtn.style.display = 'none';
  finishBtn.style.display = 'none';

  // If already answered, show checked state
  if (isAnswered) {
    showAnswerCheckResult();
  }

  // Trigger MathJax render for LaTeX mathematical equations
  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([document.getElementById('quizRunnerContainer')]).catch(() => {});
  }
}

function selectChoice(choiceIdx) {
  userAnswers[currentQuestionIndex] = choiceIdx;
  const choices = document.querySelectorAll('.choice-btn');
  choices.forEach((btn, i) => {
    if (i === choiceIdx) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

function checkCurrentAnswer() {
  if (userAnswers[currentQuestionIndex] === null) {
    showToast('⚠️ กรุณาเลือกคำตอบก่อนกดตรวจคำตอบ');
    return;
  }
  showAnswerCheckResult();
}

function showAnswerCheckResult() {
  const q = activeQuiz.questions[currentQuestionIndex];
  const userChoice = userAnswers[currentQuestionIndex];
  const choices = document.querySelectorAll('.choice-btn');
  const total = activeQuiz.questions.length;

  choices.forEach((btn, i) => {
    btn.classList.remove('selected', 'correct', 'incorrect');
    if (i === q.answer) {
      btn.classList.add('correct');
    }
    if (userChoice === i && userChoice !== q.answer) {
      btn.classList.add('incorrect');
    }
  });

  // Display explanation box
  const explanationBox = document.getElementById('explanationBox');
  const expIcon = document.getElementById('explanationIcon');
  const expText = document.getElementById('explanationText');

  explanationBox.style.display = 'block';
  if (userChoice === q.answer) {
    expIcon.textContent = '✅';
    explanationBox.className = 'explanation-box correct-box';
  } else {
    expIcon.textContent = '❌';
    explanationBox.className = 'explanation-box incorrect-box';
  }
  expText.innerHTML = fixLatexString(q.explanation);

  // Toggle button visibility
  document.getElementById('checkAnswerBtn').style.display = 'none';

  if (currentQuestionIndex < total - 1) {
    document.getElementById('nextQuestionBtn').style.display = 'inline-flex';
  } else {
    document.getElementById('finishQuizBtn').style.display = 'inline-flex';
  }

  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([explanationBox]).catch(() => {});
  }
}

function nextQuestion() {
  if (!activeQuiz) return;
  if (currentQuestionIndex < activeQuiz.questions.length - 1) {
    currentQuestionIndex++;
    renderCurrentQuestion();
  }
}

function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderCurrentQuestion();
  }
}

// Quit quiz
function quitQuiz() {
  clearInterval(quizTimerInterval);
  activeQuiz = null;

  const runner = document.getElementById('quizRunnerContainer');
  const grid = document.getElementById('mocktestGrid');
  const controls = document.querySelector('.mocktest-controls');
  if (runner) runner.style.display = 'none';
  if (grid) grid.style.display = 'grid';
  if (controls) controls.style.display = '';
}

// Finish Quiz & Show Summary Result
function finishQuiz() {
  clearInterval(quizTimerInterval);
  if (!activeQuiz) return;

  const total = activeQuiz.questions.length;
  let correctCount = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === activeQuiz.questions[idx].answer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / total) * 100);

  // Switch view
  document.getElementById('quizBody').style.display = 'none';
  const summaryView = document.getElementById('quizResultSummary');
  summaryView.style.display = 'block';

  document.getElementById('resultScoreNum').textContent = `${correctCount} / ${total} ข้อ`;
  document.getElementById('resultScorePct').textContent = `${percentage}%`;

  const statusPill = document.getElementById('resultStatusPill');
  const resultIcon = document.getElementById('resultIcon');

  if (percentage >= 80) {
    statusPill.textContent = 'ผ่านเกณฑ์ยอดเยี่ยม ✨';
    statusPill.className = 'result-status-pill excellent';
    resultIcon.textContent = '🏆';
  } else if (percentage >= 60) {
    statusPill.textContent = 'ผ่านเกณฑ์มาตรฐาน 👍';
    statusPill.className = 'result-status-pill pass';
    resultIcon.textContent = '🎉';
  } else {
    statusPill.textContent = 'ควรทบทวนเพิ่มเติม 💪';
    statusPill.className = 'result-status-pill needs-work';
    resultIcon.textContent = '📖';
  }

  // Build Question Breakdown
  const breakdown = document.getElementById('resultBreakdown');
  breakdown.innerHTML = '';

  activeQuiz.questions.forEach((q, idx) => {
    const isCorrect = userAnswers[idx] === q.answer;
    const item = document.createElement('div');
    item.className = `breakdown-item ${isCorrect ? 'is-correct' : 'is-wrong'}`;

    const userLabel = userAnswers[idx] !== null ? String.fromCharCode(65 + userAnswers[idx]) : 'ไม่ได้ตอบ';
    const correctLabel = String.fromCharCode(65 + q.answer);

    item.innerHTML = `
      <div class="bd-icon">${isCorrect ? '✅' : '❌'}</div>
      <div class="bd-content">
        <div class="bd-question">ข้อ ${idx + 1}: ${fixLatexString(q.prompt)}</div>
        <div class="bd-answer-row">
          <span>คำตอบของคุณ: <strong>${userLabel}</strong></span>
          <span>เฉลยที่ถูกต้อง: <strong>${correctLabel}</strong></span>
        </div>
      </div>
    `;
    breakdown.appendChild(item);
  });

  if (window.MathJax && window.MathJax.typesetPromise) {
    window.MathJax.typesetPromise([breakdown]).catch(() => {});
  }
}

// Auto Save Score to Progress Section Log
function saveQuizScoreToLog() {
  if (!activeQuiz) return;
  const total = activeQuiz.questions.length;
  let correctCount = 0;
  userAnswers.forEach((ans, idx) => {
    if (ans === activeQuiz.questions[idx].answer) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / total) * 100);
  const subjectName = activeQuiz.subjectName;
  const todayDate = new Date().toISOString().split('T')[0];

  // Push score to scoreLog array
  scoreLog.push({
    id: Date.now().toString(),
    subject: subjectName,
    score: percentage,
    date: todayDate
  });

  saveAll(LS_KEY_SCORES, scoreLog);
  buildScoreLog();
  updateOverall();

  showToast(`📝 บันทึกคะแนน ${percentage}% (${subjectName}) เรียบร้อยแล้ว!`);
  quitQuiz();

  // Scroll to progress section smoothly
  const progressSec = document.getElementById('progress');
  if (progressSec) progressSec.scrollIntoView({ behavior: 'smooth' });
}


document.addEventListener('DOMContentLoaded', init);


// ======================================================
// CUSTOM QUIZ BUILDER — Topic-Level Selection
// ======================================================

// ---- Topic classifier (keyword-based) ----
function classifyMathQuestion(q) {
  const txt = q.prompt || '';
  if (/ห\.ร\.ม|ค\.ร\.น|หารลงตัว|เชือก/.test(txt)) return 'gcf';
  if (/นาฬิกา|ปฏิทิน|อธิกสุรทิน|พฤษภาคม|มิถุนายน|มกราคม/.test(txt)) return 'clock';
  if (/อนุกรม|ลำดับ|ตัวเลขถัดไป/.test(txt)) return 'series';
  if (/ร้อยละ|กำไร|ขาดทุน|ลดราคา|ดอกเบี้ย|อัตราส่วน|ภาษี/.test(txt)) return 'pct';
  if (/สมการ|ตัวแปร|อายุ|จำนวนเรียง|เหรียญ|ค่าสัมบูรณ์|พีชคณิต/.test(txt)) return 'equation';
  if (/คนงาน|งานเสร็จ|ท่อ|ความเร็ว|รถ|ระยะทาง|สร้าง/.test(txt)) return 'work';
  if (/ค่าเฉลี่ย|มัธยฐาน|ฐานนิยม|ความน่าจะเป็น|สุ่ม|ลูกเต๋า|การจัด|ป๊อก/.test(txt)) return 'stat';
  if (/มุม|พื้นที่|เรขา|วงกลม|สามเหลี่ยม|สี่เหลี่ยม|ปริมาตร|ลูกบาศก์|พีทาโกรัส/.test(txt)) return 'geo';
  if (/ตาราง|กราฟ|แผนภูมิ/.test(txt)) return 'data';
  return 'other';
}
function classifyVerbalQuestion(q) {
  const txt = q.prompt || '';
  if (/อุปมา|อุปไมย|ความสัมพันธ์|ความหมาย/.test(txt)) return 'analogy';
  if (/สะกด|เขียนถูก|เขียนผิด|ตัวสะกด/.test(txt)) return 'spell';
  if (/ไม่เข้าพวก|ต่างหมวด|หมวดหมู่/.test(txt)) return 'classify';
  if (/ตรงข้าม|พ้องความ|ความหมายใกล้/.test(txt)) return 'antonym';
  if (/บทความ|ใจความ|ผู้แต่ง|เนื้อหา|อ่าน/.test(txt)) return 'reading';
  if (/เรียงประโยค|เรียงลำดับ|ความสัมพันธ์/.test(txt)) return 'middle';
  return 'other';
}
function classifyLogicQuestion(q) {
  const txt = q.prompt || '';
  if (/ประพจน์|p→q|p∧q|ตัวเชื่อม|~p/.test(txt)) return 'prop';
  if (/สรุปผล|Modus|ข้อสรุป|เหตุผล/.test(txt)) return 'deduce';
  if (/สัญลักษณ์|เงื่อนไข|★|♦|■/.test(txt)) return 'sym';
  if (/เวนน์|Venn|สมาชิก|เซต/.test(txt)) return 'venn';
  if (/แบบรูป|ตาราง|ลำดับภาพ/.test(txt)) return 'pattern';
  return 'other';
}
function classifySpatialQuestion(q) {
  const txt = q.prompt || '';
  if (/กล่อง|พับ|คลี่|ทรง/.test(txt)) return 'unfold';
  if (/หมุน|ภาพ|มุมมอง/.test(txt)) return 'rotate';
  if (/สะท้อน|กระจก|เงา/.test(txt)) return 'mirror';
  if (/ลูกบาศก์|นับ/.test(txt)) return 'count';
  if (/ซ่อน|ฝัง/.test(txt)) return 'embed';
  return 'other';
}
function classifyDigitalQuestion(q) {
  const txt = q.prompt || '';
  if (/CPU|RAM|Hardware|OS|Windows|คอมพิวเตอร์|ระบบปฏิบัติการ/.test(txt)) return 'hardware';
  if (/Excel|Word|PowerPoint|Office|สูตร|VLOOKUP/.test(txt)) return 'office';
  if (/Network|IP|เครือข่าย|อินเทอร์เน็ต|Bandwidth/.test(txt)) return 'internet';
  if (/Phishing|Ransomware|Malware|ไวรัส|ความปลอดภัย|Cyber/.test(txt)) return 'security';
  if (/อีเมล|Email|Gmail|สื่อสาร/.test(txt)) return 'comm';
  if (/ไฟล์|Folder|Cloud/.test(txt)) return 'data';
  return 'other';
}
function classifyEgatQuestion(q) {
  const txt = q.prompt || '';
  if (/SPEED|ค่านิยม|วิสัยทัศน์|พันธกิจ/.test(txt)) return 'speed';
  if (/โรงไฟฟ้า|กำลังผลิต|เขื่อน|พลังงาน/.test(txt)) return 'power';
  if (/สายส่ง|500kV|ระบบส่ง/.test(txt)) return 'grid';
  if (/Carbon|Net Zero|Neutral|ก๊าซเรือนกระจก/.test(txt)) return 'carbon';
  if (/ประวัติ|ก่อตั้ง|กฟผ|EleXA|ผู้ว่า/.test(txt)) return 'history';
  return 'other';
}

// ---- Topic definitions per subject ----
const TOPIC_DEFS = {
  math: {
    label: '🔢 คณิตศาสตร์',
    color: '#3b82f6',
    topics: [
      { id: 'series',   label: 'อนุกรมและลำดับ',      icon: '📈', classify: classifyMathQuestion },
      { id: 'pct',      label: 'ร้อยละ / กำไร-ขาดทุน', icon: '💰', classify: classifyMathQuestion },
      { id: 'work',     label: 'งาน-เวลา / ความเร็ว',  icon: '🏎️', classify: classifyMathQuestion },
      { id: 'stat',     label: 'สถิติ / ความน่าจะเป็น', icon: '📊', classify: classifyMathQuestion },
      { id: 'equation', label: 'สมการ / พีชคณิต',      icon: '🔡', classify: classifyMathQuestion },
      { id: 'geo',      label: 'เรขาคณิต / พื้นที่',   icon: '📐', classify: classifyMathQuestion },
      { id: 'clock',    label: 'นาฬิกา / ปฏิทิน',     icon: '🕐', classify: classifyMathQuestion },
      { id: 'gcf',      label: 'ห.ร.ม. และ ค.ร.น.',   icon: '🔢', classify: classifyMathQuestion },
      { id: 'other',    label: 'อื่นๆ (คละ)',           icon: '📦', classify: classifyMathQuestion },
    ],
    pool: () => MATH_QUESTIONS,
  },
  verbal: {
    label: '💬 ภาษาไทย',
    color: '#a78bfa',
    topics: [
      { id: 'analogy',  label: 'อุปมาอุปไมย',           icon: '🔗', classify: classifyVerbalQuestion },
      { id: 'spell',    label: 'สะกดคำถูก-ผิด',         icon: '✏️', classify: classifyVerbalQuestion },
      { id: 'classify', label: 'คำที่ไม่เข้าพวก',       icon: '🔍', classify: classifyVerbalQuestion },
      { id: 'antonym',  label: 'คำตรงข้าม / พ้องความ', icon: '↔️', classify: classifyVerbalQuestion },
      { id: 'reading',  label: 'อ่านจับใจความ',          icon: '📖', classify: classifyVerbalQuestion },
      { id: 'middle',   label: 'เรียงประโยค',             icon: '📝', classify: classifyVerbalQuestion },
      { id: 'other',    label: 'อื่นๆ (คละ)',             icon: '📦', classify: classifyVerbalQuestion },
    ],
    pool: () => VERBAL_QUESTIONS,
  },
  logic: {
    label: '🧠 ตรรกศาสตร์',
    color: '#22d3ee',
    topics: [
      { id: 'prop',    label: 'ประพจน์และตัวเชื่อม',    icon: '⚡', classify: classifyLogicQuestion },
      { id: 'deduce',  label: 'การสรุปเหตุผล',          icon: '🎯', classify: classifyLogicQuestion },
      { id: 'sym',     label: 'เงื่อนไขสัญลักษณ์',     icon: '🔣', classify: classifyLogicQuestion },
      { id: 'venn',    label: 'แผนภาพเวนน์',           icon: '⭕', classify: classifyLogicQuestion },
      { id: 'pattern', label: 'แบบรูปและตรรกะ',        icon: '🔄', classify: classifyLogicQuestion },
      { id: 'other',   label: 'อื่นๆ (คละ)',            icon: '📦', classify: classifyLogicQuestion },
    ],
    pool: () => LOGIC_QUESTIONS,
  },
  spatial: {
    label: '🎲 มิติสัมพันธ์',
    color: '#fb923c',
    topics: [
      { id: 'unfold', label: 'คลี่/พับกล่อง 3D',      icon: '📦', classify: classifySpatialQuestion },
      { id: 'rotate', label: 'หมุนภาพ 2D/3D',          icon: '🔄', classify: classifySpatialQuestion },
      { id: 'mirror', label: 'ภาพสะท้อนกระจก',        icon: '🪞', classify: classifySpatialQuestion },
      { id: 'count',  label: 'นับลูกบาศก์',            icon: '🟦', classify: classifySpatialQuestion },
      { id: 'other',  label: 'อื่นๆ (คละ)',             icon: '📦', classify: classifySpatialQuestion },
    ],
    pool: () => SPATIAL_QUESTIONS,
  },
  digital: {
    label: '💻 Digital Literacy',
    color: '#34d399',
    topics: [
      { id: 'hardware',  label: 'ระบบคอมพิวเตอร์ & OS', icon: '🖥️', classify: classifyDigitalQuestion },
      { id: 'office',    label: 'MS Office (Excel/Word)', icon: '📊', classify: classifyDigitalQuestion },
      { id: 'internet',  label: 'เครือข่าย & อินเทอร์เน็ต', icon: '🌐', classify: classifyDigitalQuestion },
      { id: 'security',  label: 'ความปลอดภัยไซเบอร์',   icon: '🔒', classify: classifyDigitalQuestion },
      { id: 'comm',      label: 'อีเมลและการสื่อสาร',   icon: '📧', classify: classifyDigitalQuestion },
      { id: 'other',     label: 'อื่นๆ (คละ)',           icon: '📦', classify: classifyDigitalQuestion },
    ],
    pool: () => DIGITAL_QUESTIONS,
  },
  egat: {
    label: '⚡ ความรู้ กฟผ.',
    color: '#eab308',
    topics: [
      { id: 'speed',   label: 'ค่านิยม SPEED',          icon: '🌟', classify: classifyEgatQuestion },
      { id: 'power',   label: 'โรงไฟฟ้า / พลังงาน',    icon: '⚡', classify: classifyEgatQuestion },
      { id: 'grid',    label: 'สายส่ง 500kV',           icon: '🔌', classify: classifyEgatQuestion },
      { id: 'carbon',  label: 'Carbon Neutrality',      icon: '🌿', classify: classifyEgatQuestion },
      { id: 'history', label: 'ประวัติ กฟผ. & EleXA',  icon: '📚', classify: classifyEgatQuestion },
      { id: 'other',   label: 'อื่นๆ (คละ)',             icon: '📦', classify: classifyEgatQuestion },
    ],
    pool: () => EGAT_KNOWLEDGE_QUESTIONS,
  },
};

// Get filtered question pool by subject + topic IDs
function getQuestionsByTopics(subjectKey, topicIds) {
  const def = TOPIC_DEFS[subjectKey];
  if (!def) return [];
  const allQ = def.pool() || [];
  if (!topicIds || topicIds.length === 0) return allQ;

  // Use 'all' shorthand
  if (topicIds.includes('all')) return allQ;

  const classifyFn = def.topics[0].classify;
  return allQ.filter(q => topicIds.includes(classifyFn(q)));
}

// ---- UI state ----
let cqmSelectedSubject = null;
let cqmSelectedTopics  = new Set();

function initCustomQuizBuilder() {
  const overlay   = document.getElementById('customQuizOverlay');
  const openBtn   = document.getElementById('openCustomQuizBtn');
  const closeBtn  = document.getElementById('closeCustomQuizBtn');
  const cancelBtn = document.getElementById('cqmCancelBtn');
  const startBtn  = document.getElementById('cqmStartBtn');

  if (!overlay) return;

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      openCustomQuizModal();
    });
  }

  function closeModal() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });

  renderCQMStep1();

  startBtn.addEventListener('click', () => {
    if (!cqmSelectedSubject) return;
    const topicIds = [...cqmSelectedTopics];
    const count    = getCQMCount();
    const time     = getCQMTime();

    let pool = getQuestionsByTopics(cqmSelectedSubject, topicIds.length > 0 ? topicIds : ['all']);
    pool = shuffleArray([...pool]);
    const selected  = pool.slice(0, Math.min(count, pool.length));
    const questions = selected.map(q => randomizeQuestion(q));

    const def       = TOPIC_DEFS[cqmSelectedSubject];
    const topicNames = topicIds.length > 0
      ? topicIds.map(tid => { const t = def.topics.find(t => t.id === tid); return t ? `${t.icon} ${t.label}` : tid; }).join(', ')
      : 'ทุกหัวข้อ';
    const timeStr = time === 0 ? 'ไม่จำกัด' : `${time} นาที`;

    const customQuiz = {
      id:            'mock_custom_' + Date.now(),
      cat:           'custom',
      title:         `${def.label}: ${topicNames}`,
      subjectName:   `⚙️ CUSTOM · ${def.label}`,
      badgeColor:    def.color,
      icon:          '⚙️',
      questionsCount: questions.length,
      timeLimitMins:  time,
      difficulty:    `${questions.length} ข้อ · ${timeStr}`,
      desc:          `ชุดข้อสอบเฉพาะกิจ ${def.label} หัวข้อ: ${topicNames}`,
      questions,
      isCustom: true,
    };

    closeModal();
    startCustomQuiz(customQuiz);
  });
}

function openCustomQuizModal() {
  const overlay = document.getElementById('customQuizOverlay');
  cqmSelectedSubject = null;
  cqmSelectedTopics  = new Set();
  overlay.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  renderCQMStep1();
}

function getCQMCount() {
  const r = document.querySelector('input[name="cqmCount"]:checked');
  return r ? parseInt(r.value) : 10;
}
function getCQMTime() {
  const r = document.querySelector('input[name="cqmTime"]:checked');
  return r ? parseInt(r.value) : 30;
}

function renderCQMStep1() {
  const body = document.getElementById('cqmModalBody');
  if (!body) return;

  const startBtn = document.getElementById('cqmStartBtn');
  if (startBtn) startBtn.disabled = true;

  body.innerHTML = `
    <div class="cqm-section">
      <div class="cqm-section-label">
        <span class="cqm-step">1</span>
        เลือกวิชาที่ต้องการทดสอบ
      </div>
      <div class="cqm-subject-grid-v2" id="cqmSubjectGridV2">
        ${Object.entries(TOPIC_DEFS).map(([key, def]) => `
          <button class="cqm-subject-card" data-key="${key}">
            <span class="cqm-card-color-bar" style="background:${def.color};"></span>
            <span class="cqm-card-body-inner">
              <span class="cqm-card-label">${def.label}</span>
              <span class="cqm-card-sub">${def.topics.length - 1} หัวข้อย่อย</span>
            </span>
            <span class="cqm-card-arrow">→</span>
          </button>
        `).join('')}
      </div>
    </div>`;

  body.querySelectorAll('.cqm-subject-card').forEach(card => {
    card.addEventListener('click', () => {
      cqmSelectedSubject = card.dataset.key;
      cqmSelectedTopics  = new Set();
      renderCQMStep2(cqmSelectedSubject);
    });
  });
}

function renderCQMStep2(subjectKey) {
  const def  = TOPIC_DEFS[subjectKey];
  const body = document.getElementById('cqmModalBody');
  if (!body || !def) return;

  const allQ     = def.pool() || [];
  const classifyFn = def.topics[0].classify;

  // Count per topic
  const counts = {};
  allQ.forEach(q => {
    const tid = classifyFn(q);
    counts[tid] = (counts[tid] || 0) + 1;
  });

  body.innerHTML = `
    <div class="cqm-section">
      <div class="cqm-section-label">
        <button class="cqm-back-btn" id="cqmBackBtn">← กลับ</button>
        <span class="cqm-step">2</span>
        เลือกหัวข้อย่อย <span style="color:${def.color}">${def.label}</span>
        <span class="cqm-select-hint">(เลือกได้หลายหัวข้อ)</span>
      </div>
      <div class="cqm-topic-grid" id="cqmTopicGrid">
        ${def.topics.map(t => {
          const cnt = counts[t.id] || 0;
          return `
            <label class="cqm-topic-chip ${cnt === 0 ? 'cqm-topic-empty' : ''}" data-tid="${t.id}">
              <input type="checkbox" class="cqm-topic-cb" value="${t.id}" ${cnt === 0 ? 'disabled' : ''}>
              <span class="cqm-topic-icon">${t.icon}</span>
              <span class="cqm-topic-name">${t.label}</span>
              <span class="cqm-topic-count" style="color:${def.color}">${cnt} ข้อ</span>
            </label>`;
        }).join('')}
      </div>
      <div class="cqm-select-all-row">
        <button class="cqm-select-all-btn" id="cqmTopicSelectAll">☑ เลือกทุกหัวข้อ</button>
        <button class="cqm-clear-btn"      id="cqmTopicClear">✕ ล้างทั้งหมด</button>
      </div>
    </div>

    <div class="cqm-section">
      <div class="cqm-section-label"><span class="cqm-step">3</span> จำนวนข้อ</div>
      <div class="cqm-option-group">
        ${[10,20,30,50].map((n,i) => `
          <label class="cqm-option-chip ${i===0?'active':''}">
            <input type="radio" name="cqmCount" value="${n}" ${i===0?'checked':''} class="cqm-radio">
            <span>${n} ข้อ</span>
          </label>`).join('')}
      </div>
    </div>

    <div class="cqm-section">
      <div class="cqm-section-label"><span class="cqm-step">4</span> เวลาจำกัด</div>
      <div class="cqm-option-group">
        ${[[15,'15 นาที'],[30,'30 นาที'],[45,'45 นาที'],[0,'♾ ไม่จำกัด']].map(([v,lbl],i) => `
          <label class="cqm-option-chip ${i===1?'active':''}">
            <input type="radio" name="cqmTime" value="${v}" ${i===1?'checked':''} class="cqm-radio">
            <span>${lbl}</span>
          </label>`).join('')}
      </div>
    </div>

    <div class="cqm-preview" id="cqmPreview">
      <div class="cqm-preview-icon">📋</div>
      <div class="cqm-preview-text" id="cqmPreviewText">เลือกหัวข้อย่อยอย่างน้อย 1 หัวข้อ</div>
    </div>`;

  // Back button
  document.getElementById('cqmBackBtn').addEventListener('click', () => {
    cqmSelectedSubject = null;
    cqmSelectedTopics  = new Set();
    renderCQMStep1();
  });

  // Topic chip toggle
  const chips = body.querySelectorAll('.cqm-topic-chip:not(.cqm-topic-empty)');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cb  = chip.querySelector('.cqm-topic-cb');
      cb.checked = !cb.checked;
      chip.classList.toggle('selected', cb.checked);
      if (cb.checked) cqmSelectedTopics.add(cb.value);
      else            cqmSelectedTopics.delete(cb.value);
      updateCQMPreview();
    });
  });

  document.getElementById('cqmTopicSelectAll').addEventListener('click', () => {
    chips.forEach(chip => {
      const cb = chip.querySelector('.cqm-topic-cb');
      if (!cb.disabled) { cb.checked = true; chip.classList.add('selected'); cqmSelectedTopics.add(cb.value); }
    });
    updateCQMPreview();
  });
  document.getElementById('cqmTopicClear').addEventListener('click', () => {
    chips.forEach(chip => {
      chip.querySelector('.cqm-topic-cb').checked = false;
      chip.classList.remove('selected');
    });
    cqmSelectedTopics.clear();
    updateCQMPreview();
  });

  // Radio chips
  body.querySelectorAll('.cqm-radio').forEach(radio => {
    radio.addEventListener('change', () => {
      const group = radio.closest('.cqm-option-group');
      if (!group) return;
      group.querySelectorAll('.cqm-option-chip').forEach(c => c.classList.remove('active'));
      radio.closest('.cqm-option-chip').classList.add('active');
      updateCQMPreview();
    });
  });

  updateCQMPreview();
}

function updateCQMPreview() {
  const previewBox = document.getElementById('cqmPreview');
  const previewTxt = document.getElementById('cqmPreviewText');
  const startBtn   = document.getElementById('cqmStartBtn');
  if (!previewBox || !previewTxt || !startBtn) return;

  const topicIds = [...cqmSelectedTopics];
  if (topicIds.length === 0) {
    previewBox.classList.remove('ready');
    previewTxt.textContent = 'เลือกหัวข้อย่อยอย่างน้อย 1 หัวข้อ';
    startBtn.disabled = true;
    return;
  }

  const def       = TOPIC_DEFS[cqmSelectedSubject];
  const count     = getCQMCount();
  const time      = getCQMTime();
  const available = getQuestionsByTopics(cqmSelectedSubject, topicIds).length;
  const actual    = Math.min(count, available);
  const timeStr   = time === 0 ? 'ไม่จำกัดเวลา' : `${time} นาที`;
  const topicNames = topicIds.map(tid => { const t = def.topics.find(t => t.id === tid); return t ? t.label : tid; }).join(', ');

  previewBox.classList.add('ready');
  previewTxt.innerHTML = `✅ <strong>${def.label}</strong> › ${topicNames}<br>📝 ${actual} ข้อ (จากคลัง ${available} ข้อ) &nbsp;|&nbsp; ⏱ ${timeStr}`;
  startBtn.disabled = actual === 0;
}

// Start a dynamically built custom quiz (bypasses MOCK_TEST_QUIZZES lookup)
function startCustomQuiz(quiz) {
  if (!quiz || !quiz.questions || quiz.questions.length === 0) return;

  activeQuiz           = quiz;
  currentQuestionIndex = 0;
  userAnswers          = new Array(quiz.questions.length).fill(null);
  quizSecondsElapsed   = 0;

  const container = document.getElementById('quizRunnerContainer');
  const grid      = document.getElementById('mocktestGrid');
  const summary   = document.getElementById('quizResultSummary');
  const body      = document.getElementById('quizBody');

  if (grid)      grid.style.display      = 'none';
  if (container) container.style.display = 'block';
  if (summary)   summary.style.display   = 'none';
  if (body)      body.style.display      = 'block';

  const controls = document.querySelector('.mocktest-controls');
  if (controls) controls.style.display = 'none';

  const badge = document.getElementById('quizBadge');
  const title = document.getElementById('quizTitle');
  if (badge) { badge.textContent = quiz.subjectName; badge.style.borderColor = quiz.badgeColor; }
  if (title) title.textContent = quiz.title;

  if (quizTimerInterval) clearInterval(quizTimerInterval);
  updateQuizTimerDisplay();
  quizTimerInterval = setInterval(() => {
    quizSecondsElapsed++;
    updateQuizTimerDisplay();
  }, 1000);

  renderCurrentQuestion();
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

