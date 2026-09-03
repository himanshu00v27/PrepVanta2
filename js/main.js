/* ===================================
   PREPVANTA MAIN SCRIPT
=================================== */


/* Active Navigation */

const navLinks =
document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item =>
            item.classList.remove("active")
        );

        link.classList.add("active");
    });

});


/* Scroll Navbar Shadow */

const navbar =
document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 20) {

        navbar.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.08)";

    } else {

        navbar.style.boxShadow = "none";
    }

});


/* Animated Statistics */

const statCards =
document.querySelectorAll(".stat-card h2");

let statsAnimated = false;

function animateStats() {

    if (statsAnimated) return;

    const statsSection =
    document.querySelector(".stats");

    const sectionTop =
    statsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100) {

        statsAnimated = true;

        statCards.forEach(card => {

            const text =
            card.innerText;

            const target =
            parseInt(text.replace(/\D/g, ""));

            let count = 0;

            const speed =
            target / 60;

            const counter =
            setInterval(() => {

                count += speed;

                if (count >= target) {

                    card.innerText = text;

                    clearInterval(counter);

                } else {

                    if (text.includes("K")) {

                        card.innerText =
                        Math.floor(count) + "K+";

                    } else {

                        card.innerText =
                        Math.floor(count);
                    }
                }

            }, 20);

        });
    }
}

window.addEventListener(
    "scroll",
    animateStats
);


/* Reveal Animation */

const revealElements =
document.querySelectorAll(
".feature-card, .stat-card, .benefit-card"
);

const observer =
new IntersectionObserver(

(entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");
        }

    });

},

{
    threshold:0.15
}

);

revealElements.forEach(el => {

    el.classList.add("hidden");

    observer.observe(el);
});