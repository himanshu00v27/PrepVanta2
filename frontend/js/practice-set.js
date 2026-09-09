/* ===================================
   PREPVANTA PRACTICE-SET SCRIPT

   Shared by Reasoning, Aptitude, Topics, Companies AND Interview
   mock tests. Reads ?cat= and ?name= from the URL.

   - cat=interview  -> flat mock-test style: a single objective
     question list with a timer feel, no tabs (mock tests are
     meant to simulate one continuous timed test).
   - everything else -> three tabs: Objective / Subjective / Coding,
     so a learner can practice a topic in whichever mode they want.

   >>> BACKEND INTEGRATION POINT <<<
   All SAMPLE_* arrays below are hardcoded placeholders. Once your
   backend/database is ready, replace loadQuestions() so it fetches
   real questions for the given (cat, name) pair instead, e.g.:

       async function loadQuestions(cat, name) {
           const res = await fetch(`/api/questions?cat=${cat}&topic=${encodeURIComponent(name)}`);
           return res.json();
       }

   and call it from init() instead of using the SAMPLE_* arrays directly.
=================================== */

const CAT_LABELS = {
    reasoning: { label: "Reasoning", href: "reasoning.html" },
    aptitude: { label: "Aptitude", href: "aptitude.html" },
    topics: { label: "Topics", href: "topics.html" },
    company: { label: "Companies", href: "companies.html" },
    interview: { label: "Interview Practice", href: "interview.html" }
};

const SAMPLE_OBJECTIVE = [
    {
        q: "This is a sample objective question for {topic}. Replace SAMPLE_OBJECTIVE in js/practice-set.js with real data from your backend.",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 0
    },
    {
        q: "This is a second placeholder question for {topic}, just to preview how the practice UI will look once real content is loaded.",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 1
    },
    {
        q: "A third sample question for {topic} — swap this whole array out once your question bank/database is connected.",
        options: ["Option A", "Option B", "Option C", "Option D"],
        correct: 2
    }
];

const SAMPLE_SUBJECTIVE = [
    {
        q: "Explain the core idea behind {topic} in your own words, as if teaching it to someone new.",
        answer: "Sample answer — replace SAMPLE_SUBJECTIVE in js/practice-set.js with real question/answer pairs from your backend."
    },
    {
        q: "Walk through a real-world scenario where {topic} would come up in a technical interview.",
        answer: "Sample answer — this is placeholder text shown when the learner clicks \"Show Answer\"."
    }
];

const SAMPLE_CODING = [
    {
        q: "Write a program that applies {topic} to solve a short, representative coding problem.",
        hint: "Expected complexity: O(n) time, O(1) additional space."
    },
    {
        q: "A second coding exercise built around {topic}.",
        hint: "Hint: think about the most efficient approach before writing any code."
    }
];

function getParams() {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat") || "topics";
    const name = params.get("name") || "General Practice";
    return { cat, name };
}

function renderBreadcrumb(cat, name) {
    const info = CAT_LABELS[cat] || CAT_LABELS.topics;
    const el = document.getElementById("psetBreadcrumb");
    if (el) {
        el.innerHTML = `
            <a href="index.html">Home</a>
            <i class="fa-solid fa-chevron-right" style="font-size:.65rem;"></i>
            <a href="${info.href}">${info.label}</a>
            <i class="fa-solid fa-chevron-right" style="font-size:.65rem;"></i>
            <span class="current">${name}</span>
        `;
    }
}

function renderHead(cat, name) {
    const info = CAT_LABELS[cat] || CAT_LABELS.topics;
    document.title = `${name} | PrepVanta`;

    const titleEl = document.getElementById("psetTitle");
    const subEl = document.getElementById("psetSubtitle");

    if (titleEl) titleEl.textContent = name;
    if (subEl) {
        if (cat === "interview") {
            subEl.textContent = `A timed mock test — ${name}.`;
        } else if (cat === "company") {
            subEl.textContent = `Practice questions and patterns for ${name}'s hiring process.`;
        } else {
            subEl.textContent = `Practice questions for ${name} — ${info.label.toLowerCase()} section.`;
        }
    }
}

function mcqCardHTML(item, qIndex, namePrefix, topicName) {
    const options = item.options.map((opt, i) => `
        <label class="mcq-option" data-correct="${i === item.correct}">
            <input type="radio" name="${namePrefix}${qIndex}">
            ${opt}
        </label>
    `).join("");

    return `
        <div class="mcq-card">
            <div class="mcq-q">${qIndex + 1}. ${item.q.replace("{topic}", topicName)}</div>
            ${options}
        </div>
    `;
}

function wireMcqCards(container) {
    container.querySelectorAll(".mcq-option input").forEach(input => {
        input.addEventListener("change", () => {
            const card = input.closest(".mcq-card");
            card.querySelectorAll(".mcq-option").forEach(opt => opt.classList.remove("correct", "wrong"));
            const chosen = input.closest(".mcq-option");
            const isCorrect = chosen.dataset.correct === "true";
            chosen.classList.add(isCorrect ? "correct" : "wrong");
            if (!isCorrect) {
                const correctOpt = card.querySelector('.mcq-option[data-correct="true"]');
                if (correctOpt) correctOpt.classList.add("correct");
            }
        });
    });
}

function wireShowAnswerButtons(container) {
    container.querySelectorAll(".show-answer-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const reveal = document.getElementById(btn.dataset.target);
            const isHidden = reveal.style.display === "none" || !reveal.style.display;
            reveal.style.display = isHidden ? "block" : "none";
            btn.textContent = isHidden ? "Hide Answer" : "Show Answer";
        });
    });
}

/* ---------------- Mock test mode (cat=interview) ---------------- */

function renderMockTest(name) {
    const mount = document.getElementById("psetBody");

    const questionsHTML = SAMPLE_OBJECTIVE.map((item, i) => mcqCardHTML(item, i, "mt", name)).join("");

    mount.innerHTML = `
        <div class="timer-pill" style="margin-bottom:22px;"><span class="dot"></span> 29:40 remaining</div>
        ${questionsHTML}
        <div class="practice-actions">
            <button class="btn btn-secondary" onclick="history.back()">Back to Interview Practice</button>
            <button class="btn btn-primary" onclick="alert('Test submitted — check your dashboard for the score.')">Submit Test</button>
        </div>
    `;

    wireMcqCards(mount);
}

/* ---------------- Topic mode (reasoning / aptitude / topics / company) ---------------- */

function renderTopicPractice(name) {
    const mount = document.getElementById("psetBody");

    const objectiveHTML = SAMPLE_OBJECTIVE.map((item, i) => mcqCardHTML(item, i, "pq", name)).join("");

    const subjectiveHTML = SAMPLE_SUBJECTIVE.map((item, i) => `
        <div class="mcq-card subjective-card">
            <div class="mcq-q">${i + 1}. ${item.q.replace("{topic}", name)}</div>
            <button type="button" class="btn btn-outline-danger show-answer-btn" data-target="pset-ans-${i}">Show Answer</button>
            <div class="answer-reveal" id="pset-ans-${i}" style="display:none;">
                <strong>Answer:</strong> ${item.answer}
            </div>
        </div>
    `).join("");

    const codingHTML = SAMPLE_CODING.map((item, i) => `
        <div class="mcq-card">
            <span class="qtype-badge coding">Coding</span>
            <div class="mcq-q">${i + 1}. ${item.q.replace("{topic}", name)}</div>
            <p style="color:var(--text-light);font-size:.88rem;margin-bottom:14px;">${item.hint}</p>
            <a href="compiler.html" class="btn btn-primary">Open in Compiler</a>
        </div>
    `).join("");

    mount.innerHTML = `
        <div class="tabs-row">
            <button class="tab-btn active" data-target="psetObjective">Objective</button>
            <button class="tab-btn" data-target="psetSubjective">Subjective</button>
            <button class="tab-btn" data-target="psetCoding">Coding</button>
        </div>

        <div class="tab-panel active" id="psetObjective">
            ${objectiveHTML}
            <div class="practice-actions">
                <button class="btn btn-secondary" onclick="history.back()">Back to List</button>
                <button class="btn btn-primary" onclick="alert('Answers submitted — check your dashboard for the score.')">Submit Set</button>
            </div>
        </div>

        <div class="tab-panel" id="psetSubjective">
            ${subjectiveHTML}
        </div>

        <div class="tab-panel" id="psetCoding">
            ${codingHTML}
        </div>
    `;

    wireMcqCards(mount);
    wireShowAnswerButtons(mount);

    mount.querySelectorAll(".tab-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            mount.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
            mount.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
            btn.classList.add("active");
            document.getElementById(btn.dataset.target).classList.add("active");
        });
    });
}

function init() {
    const { cat, name } = getParams();
    renderBreadcrumb(cat, name);
    renderHead(cat, name);

    if (cat === "interview") {
        renderMockTest(name);
    } else {
        renderTopicPractice(name);
    }
}

init();
