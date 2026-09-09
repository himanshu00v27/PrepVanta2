/* ===================================
   PREPVANTA SEARCH USERS SCRIPT
=================================== */

const userSearchInput = document.getElementById("userSearchInput");

if (userSearchInput) {
    userSearchInput.addEventListener("input", () => {
        const q = userSearchInput.value.trim().toLowerCase();
        document.querySelectorAll("#userResults .user-result").forEach(card => {
            card.style.display = card.textContent.toLowerCase().includes(q) ? "flex" : "none";
        });
    });
}
