/* ===================================
   PREPVANTA TOPICS SCRIPT
=================================== */

document.querySelectorAll(".tgroup-head").forEach(head => {
    head.addEventListener("click", () => {
        head.parentElement.classList.toggle("open");
    });
});
