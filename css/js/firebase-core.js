import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyClXL28rqPQr--pUu3N_Y-X3ihXEAKOyg8",
    authDomain: "digivault-4c3a3.firebaseapp.com",
    projectId: "digivault-4c3a3",
    storageBucket: "digivault-4c3a3.firebasestorage.app",
    messagingSenderId: "578335534171",
    appId: "1:578335534171:web:1b108a849c0543f998a37e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const SUPER_ADMIN_EMAIL = "ythr2010@gmail.com";

window.showToast = function(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast-notification";
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => { toast.style.display = "none"; }, 2850);
};

// تتبع الزوار الخفيف للرئيسية
import { doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
export async function trackVisitorOnce() {
    const visitedKey = "digivault_visited_session";
    if (sessionStorage.getItem(visitedKey)) return;
    sessionStorage.setItem(visitedKey, "true");
    try {
        const statsRef = doc(db, "stats", "global");
        const snap = await getDoc(statsRef);
        if (snap.exists()) {
            await updateDoc(statsRef, { totalVisitors: increment(1) });
        } else {
            await setDoc(statsRef, { totalVisitors: 1 });
        }
    } catch(e) {}
}
