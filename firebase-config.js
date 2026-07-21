// ============================================================
// firebase-config.js — EGAT Study Planner
// Firebase Realtime Sync Config
// ============================================================

const firebaseConfig = {
  apiKey:            "AIzaSyAWfauX3Nn7i-deG6wBdwIe5kA9MZjM_0g",
  authDomain:        "my-egat-planner.firebaseapp.com",
  databaseURL:       "https://my-egat-planner-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "my-egat-planner",
  storageBucket:     "my-egat-planner.firebasestorage.app",
  messagingSenderId: "930123210459",
  appId:             "1:930123210459:web:df7c3a1635d34b6822b6fe",
  measurementId:     "G-0L4BCVWFTS"
};

// !! อย่าแก้บรรทัดนี้ !!
window.EGAT_FIREBASE_CONFIG = firebaseConfig;
