document.addEventListener("DOMContentLoaded", () => {

    const bootLine = document.querySelector(".boot-line");
    const heroPieces = [
        document.querySelector(".home-title"),
        document.querySelector(".home-text h2"),
        document.querySelector(".home-desc"),
        document.querySelector(".home-buttons"),
        document.querySelector(".home-image")
    ].filter(Boolean);

    heroPieces.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(18px)";
        el.style.transition = "opacity .7s ease, transform .7s ease";
    });

    function typeBootLine(text, el, done) {
        el.style.opacity = "1";
        el.textContent = "";
        let i = 0;

        const interval = setInterval(() => {
            el.textContent = text.slice(0, i + 1);
            i++;
            if (i === text.length) {
                clearInterval(interval);
                setTimeout(done, 250);
            }
        }, 22);
    }

    function revealHero() {
        heroPieces.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, i * 110);
        });
    }

    if (bootLine) {
        typeBootLine("SYSTEM // PORTFOLIO.INIT — WELCOME", bootLine, revealHero);
    } else {
        revealHero();
    }

    const typing = document.getElementById("typing");

    if (typing) {

        const roles = [
            "CSE Graduate",
            "Software Engineer",
            "Web Developer",
            "Mobile App Developer"
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function type() {
            const current = roles[roleIndex];

            if (!deleting) {
                typing.textContent = current.substring(0, charIndex + 1);
                charIndex++;

                if (charIndex === current.length) {
                    deleting = true;
                    setTimeout(type, 1800);
                    return;
                }
            } else {
                typing.textContent = current.substring(0, charIndex - 1);
                charIndex--;

                if (charIndex === 0) {
                    deleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    setTimeout(type, 500);
                    return;
                }
            }

            setTimeout(type, deleting ? 45 : 95);
        }
        setTimeout(type, bootLine ? 900 : 200);
    }

});
