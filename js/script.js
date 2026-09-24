document.addEventListener("DOMContentLoaded", function () {

    createParticles();
    createHearts();
    setupSecretDoor();
    setupCardAnimations();

});


/* =========================================
   GLITTER / PARTICLES
========================================= */

function createParticles() {

    const container = document.getElementById("particles");

    if (!container) return;

    const particleCount = window.innerWidth < 600 ? 35 : 70;

    for (let i = 0; i < particleCount; i++) {

        const particle = document.createElement("div");

        particle.className = "particle";

        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particle.style.animationDuration =
            3 + Math.random() * 5 + "s";

        const size = 1 + Math.random() * 3;

        particle.style.width = size + "px";
        particle.style.height = size + "px";

        container.appendChild(particle);
    }
}


/* =========================================
   FLOATING HEARTS
========================================= */

function createHearts() {

    const container = document.getElementById("hearts");

    if (!container) return;

    const heartCount = window.innerWidth < 600 ? 8 : 15;

    for (let i = 0; i < heartCount; i++) {

        const heart = document.createElement("div");

        heart.className = "heart";

        heart.innerHTML = "♥";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.animationDelay =
            Math.random() * 8 + "s";

        heart.style.animationDuration =
            8 + Math.random() * 8 + "s";

        heart.style.fontSize =
            10 + Math.random() * 16 + "px";

        container.appendChild(heart);
    }
}


/* =========================================
   SECRET DOOR
========================================= */

function setupSecretDoor() {

    const nameInput =
        document.getElementById("nameInput");

    const enterButton =
        document.getElementById("enterButton");

    const errorMessage =
        document.getElementById("errorMessage");

    const loadingScreen =
        document.getElementById("loadingScreen");

    const loadingMessage =
        document.getElementById("loadingMessage");

    const loadingProgress =
        document.getElementById("loadingProgress");

    const loadingPercent =
        document.getElementById("loadingPercent");


    /* If this is not Page 1, stop here */

    if (!nameInput || !enterButton) {
        return;
    }


    /* Hide error message initially */

    if (errorMessage) {
        errorMessage.style.display = "none";
    }


    /* =====================================
       BUTTON CLICK
    ====================================== */

    enterButton.addEventListener("click", function () {

        const enteredName =
            nameInput.value.trim().toLowerCase();


        /* =================================
           CHECK NAME
        ================================= */

        if (enteredName !== "madhu") {

            if (errorMessage) {
                errorMessage.style.display = "block";
            }

            nameInput.classList.add("shake");

            setTimeout(function () {
                nameInput.classList.remove("shake");
            }, 500);

            return;
        }


        /* =================================
           CORRECT NAME
        ================================= */

        if (errorMessage) {
            errorMessage.style.display = "none";
        }


        /* Show loading screen */

        if (loadingScreen) {
            loadingScreen.classList.add("show");
        }


        /* Disable button */

        enterButton.disabled = true;


        /* Loading messages */

        const messages = [
            "Looking for someone special... ❤️",
            "Opening his secret world... ✨",
            "Loading beautiful memories... 💕",
            "Gathering all the little moments... 🌹",
            "Almost there... ❤️"
        ];


        let progress = 0;
        let messageIndex = 0;


        const loadingInterval =
            setInterval(function () {

                progress += 5;


                /* Progress bar */

                if (loadingProgress) {

                    loadingProgress.style.width =
                        progress + "%";

                }


                /* Percentage */

                if (loadingPercent) {

                    loadingPercent.textContent =
                        progress + "%";

                }


                /* Change message */

                if (
                    progress % 20 === 0 &&
                    messageIndex < messages.length
                ) {

                    if (loadingMessage) {

                        loadingMessage.textContent =
                            messages[messageIndex];

                    }

                    messageIndex++;
                }


                /* =================================
                   FINISHED
                ================================= */

                if (progress >= 100) {

                    clearInterval(loadingInterval);


                    if (loadingMessage) {

                        loadingMessage.textContent =
                            "Welcome to our little world... ❤️";

                    }


                    setTimeout(function () {

                        /*
                         * PAGE 2
                         */

                        window.location.href =
                            "about-him.html";

                    }, 700);

                }

            }, 100);

    });


    /* =====================================
       PRESS ENTER KEY
    ====================================== */

    nameInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                enterButton.click();

            }

        }
    );

}


/* =========================================
   CARD ANIMATIONS
========================================= */

function setupCardAnimations() {

    const cards =
        document.querySelectorAll(
            ".story-card, .memory-card, .special-card, .photo-card, .message, .love-item, .dream-card, .timeline-item"
        );


    cards.forEach(function (card, index) {

        card.style.opacity = "0";
        card.style.transform =
            "translateY(30px)";


        setTimeout(function () {

            card.style.transition =
                "opacity 0.8s ease, transform 0.8s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0)";

        }, 200 + index * 120);

    });

}


/* =========================================
   CLICK HEART EFFECT
========================================= */

document.addEventListener(
    "click",
    function (event) {

        /* Don't create extra hearts when
           clicking the main unlock button */

        if (
            event.target.closest("#enterButton")
        ) {
            return;
        }


        const heart =
            document.createElement("div");

        heart.innerHTML = "♥";

        heart.style.position = "fixed";

        heart.style.left =
            event.clientX + "px";

        heart.style.top =
            event.clientY + "px";

        heart.style.pointerEvents =
            "none";

        heart.style.zIndex = "9999";

        heart.style.fontSize =
            "18px";

        heart.style.color =
            "#ff1744";

        heart.style.textShadow =
            "0 0 15px #ff1744";

        heart.style.animation =
            "clickHeart 1s ease forwards";


        document.body.appendChild(heart);


        setTimeout(function () {

            heart.remove();

        }, 1000);

    }
);


/* =========================================
   RESIZE
========================================= */

let resizeTimer;

window.addEventListener(
    "resize",
    function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            const particles =
                document.getElementById("particles");

            const hearts =
                document.getElementById("hearts");


            if (particles) {
                particles.innerHTML = "";
                createParticles();
            }


            if (hearts) {
                hearts.innerHTML = "";
                createHearts();
            }

        }, 300);

    }
);