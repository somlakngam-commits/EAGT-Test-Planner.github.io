# 🔥 วิธีตั้งค่า Firebase (ฟรี) — EGAT Study Planner

## ทำไมต้อง Firebase?
Firebase Realtime Database ช่วยให้ข้อมูลความก้าวหน้าของคุณ **sync ข้ามทุกอุปกรณ์** (มือถือ, แท็บเล็ต, คอมพิวเตอร์อื่น) แบบ Real-time ฟรีไม่มีค่าใช้จ่าย

---

## ขั้นตอนที่ 1 — สร้าง Firebase Project

1. ไปที่ 👉 **https://console.firebase.google.com**
2. ล็อกอินด้วย Google Account
3. กด **"Add project"** (หรือ "Create a project")
4. ตั้งชื่อโปรเจกต์ เช่น `egat-planner`
5. ปิด Google Analytics (ไม่จำเป็น) → กด **Create project**
6. รอสักครู่... → กด **Continue**

---

## ขั้นตอนที่ 2 — เพิ่ม Web App

1. ในหน้า Project Overview กดไอคอน **`</>`** (Web)
2. ใส่ชื่อ App เช่น `EGAT Planner`
3. **ไม่ต้องติ๊ก** Firebase Hosting
4. กด **Register app**
5. จะเห็น **firebaseConfig** แบบนี้:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "egat-planner.firebaseapp.com",
  databaseURL: "https://egat-planner-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "egat-planner",
  storageBucket: "egat-planner.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

6. **Copy ค่าทั้งหมด** แล้วไปวางในไฟล์ `firebase-config.js`

---

## ขั้นตอนที่ 3 — เปิด Realtime Database

1. ในเมนูซ้าย กด **Build → Realtime Database**
2. กด **"Create database"**
3. เลือก Location: **asia-southeast1 (Singapore)** → Next
4. เลือก **"Start in test mode"** → Enable
5. ✅ Database พร้อมใช้งาน!

---

## ขั้นตอนที่ 4 — แก้ไขไฟล์ firebase-config.js

เปิดไฟล์ `firebase-config.js` และแทนที่ค่า placeholder ด้วยค่าจริง:

```js
const firebaseConfig = {
  apiKey:            "AIzaSy...",          // ← วางค่าจริงที่นี่
  authDomain:        "egat-planner.firebaseapp.com",
  databaseURL:       "https://egat-planner-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "egat-planner",
  storageBucket:     "egat-planner.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abcdef"
};

window.EGAT_FIREBASE_CONFIG = firebaseConfig;
```

---

## ขั้นตอนที่ 5 — Push ขึ้น GitHub และ Deploy บน Render.com

```bash
# ใน folder EGAT-Planner
git init
git add .
git commit -m "Initial EGAT Planner with Firebase sync"
git remote add origin https://github.com/YOUR_USERNAME/egat-planner.git
git push -u origin main
```

จากนั้นบน Render.com:
1. New → **Static Site**
2. เชื่อมกับ GitHub repo `egat-planner`
3. Publish directory: `.` (root)
4. Deploy! ✅

---

## วิธีใช้งาน Sync Code

หลังจาก Deploy แล้ว:

1. เปิด URL ที่ได้จาก Render.com บนทุกอุปกรณ์
2. **ครั้งแรก** → กรอก Sync Code เดียวกันทุกเครื่อง เช่น `MYNAME2025`
3. ข้อมูลทุกอย่างจะ **sync แบบ real-time** ทันที ☁️

> ⚠️ **สำคัญ**: Sync Code ต้องตรงกันทุกอุปกรณ์ที่ต้องการ sync

---

## FAQ

**Q: Firebase ฟรีไหม?**  
A: ฟรีสำหรับการใช้งานส่วนตัว (Spark Plan) — 1 GB storage, 10 GB/เดือน

**Q: ข้อมูลปลอดภัยไหม?**  
A: ข้อมูลอยู่ภายใต้ Sync Code ของคุณ ผู้อื่นต้องรู้ Code จึงจะเข้าถึงได้

**Q: ถ้าไม่มี internet ทำงานได้ไหม?**  
A: ได้ครับ — ข้อมูลบันทึกใน localStorage ก่อน เมื่อ online จะ sync ให้อัตโนมัติ
