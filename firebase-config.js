// ============================================================
// firebase-config.js — EGAT Study Planner
// ------------------------------------------------------------
// วิธีตั้งค่า Firebase (ฟรี — ใช้เวลา ~3 นาที)
// 1. ไปที่ https://console.firebase.google.com
// 2. กด "Add project" → ตั้งชื่อโปรเจกต์ → Create project
// 3. ในหน้า Project Overview → กด "</>" (Web App) → Register app
// 4. Copy firebaseConfig ด้านล่าง แล้ว paste แทน placeholder นี้
// 5. ไปที่ Build → Realtime Database → Create database
//    → เลือก "Start in test mode" → เลือก region ใกล้ที่สุด
// ============================================================

const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL:       "https://YOUR_PROJECT_ID-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// !! อย่าแก้บรรทัดนี้ !!
window.EGAT_FIREBASE_CONFIG = firebaseConfig;
