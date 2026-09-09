const themeBtn = document.querySelector(".theme-toggle");

const savedTheme =
    localStorage.getItem("prepvanta-theme");

if (savedTheme) {
    document.documentElement.setAttribute(
        "data-theme",
        savedTheme
    );
}

updateThemeIcon();

themeBtn.addEventListener("click", () => {

    const current =
        document.documentElement.getAttribute("data-theme");

    if (current === "dark") {

        document.documentElement.setAttribute(
            "data-theme",
            "light"
        );

        localStorage.setItem(
            "prepvanta-theme",
            "light"
        );

    } else {

        document.documentElement.setAttribute(
            "data-theme",
            "dark"
        );

        localStorage.setItem(
            "prepvanta-theme",
            "dark"
        );
    }

    updateThemeIcon();
});

function updateThemeIcon() {

    const icon =
        themeBtn.querySelector("i");

    const current =
        document.documentElement.getAttribute("data-theme");

    if (current === "dark") {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
}