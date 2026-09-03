const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

menuBtn.addEventListener("click", openSidebar);

overlay.addEventListener("click", closeSidebar);

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeSidebar();
    }
});