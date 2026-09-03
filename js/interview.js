/* ===================================
   PREPVANTA INTERVIEW / MCQ SCRIPT
=================================== */

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
        document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.target).classList.add("active");
    });
});

document.querySelectorAll(".mcq-option input").forEach(input => {
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

document.querySelectorAll(".chip-row").forEach(row => {
    row.addEventListener("click", (e) => {
        const chip = e.target.closest(".chip");
        if (!chip) return;
        row.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
    });
});
