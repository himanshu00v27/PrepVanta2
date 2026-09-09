/* ===================================
   PREPVANTA DASHBOARD SCRIPT
=================================== */

const demoUser = {
    fullName: "Ananya Iyer",
    username: "ananya_i",
    userId: "7K2QX9M4",
    joined: "2026-02-11T00:00:00.000Z"
};

const storedUser = JSON.parse(localStorage.getItem("prepvanta-user") || "null");
const currentUser = storedUser || demoUser;

const initials = currentUser.fullName
    .split(" ")
    .map(p => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const avatarEl = document.getElementById("profileAvatar");
const nameEl = document.getElementById("profileName");
const usernameEl = document.getElementById("profileUsername");
const useridEl = document.getElementById("profileUserId");
const joinedEl = document.getElementById("profileJoined");

if (avatarEl) avatarEl.textContent = initials;
if (nameEl) nameEl.textContent = currentUser.fullName;
if (usernameEl) usernameEl.textContent = "@" + currentUser.username;
if (useridEl) useridEl.textContent = currentUser.userId;
if (joinedEl) {
    const d = new Date(currentUser.joined);
    joinedEl.textContent = d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/* Topic-wise progress (mock) */

const progress = [
    { name: "DSA", pct: 68 },
    { name: "DBMS", pct: 54 },
    { name: "Web Dev", pct: 41 },
    { name: "Aptitude", pct: 72 },
    { name: "Reasoning", pct: 59 }
];

const progressList = document.getElementById("progressList");

if (progressList) {
    progressList.innerHTML = progress.map(p => `
        <div class="progress-row">
            <span class="p-name">${p.name}</span>
            <div class="progress-track"><div class="progress-fill" style="width:${p.pct}%"></div></div>
            <span class="p-pct">${p.pct}%</span>
        </div>
    `).join("");
}

/* Mock test results (mock) */

const results = [
    { title: "TCS NQT — Full Mock", date: "12 Aug 2026", score: "78/100" },
    { title: "Aptitude Sprint #4", date: "6 Aug 2026", score: "42/50" },
    { title: "DSA Weekly Challenge", date: "29 Jul 2026", score: "17/20" }
];

const resultsList = document.getElementById("resultsList");

if (resultsList) {
    resultsList.innerHTML = results.map(r => `
        <div class="result-row">
            <div>
                <div class="r-title">${r.title}</div>
                <div class="r-date">${r.date}</div>
            </div>
            <div class="r-score">${r.score}</div>
        </div>
    `).join("");
}
