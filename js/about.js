const panels = document.querySelectorAll(".split-in");

panels.forEach((el, i) => {
    const fromLeft = i % 2 === 0;

    el.style.opacity = "0";
    el.style.transform =
        `translateX(${fromLeft ? "-40px" : "40px"})`;

    el.style.transition = [
        "opacity .8s cubic-bezier(.22, 1, .36, 1)",
        "transform .8s cubic-bezier(.22, 1, .36, 1)"
    ].join(", ");
});

requestAnimationFrame(() => {

    panels.forEach((el, i) => {

        setTimeout(() => {

            el.style.opacity = "1";
            el.style.transform = "translateX(0)";

            const aboutText =
                el.querySelector(".about-text");

            if (aboutText) {

                setTimeout(() => {
                    aboutText.classList.add("scroll-start");
                }, 2000);

            }

        }, i * 150);

    });



    const skillCards = document.querySelectorAll(".skill-card");

    const skillObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const card = entry.target;

                const index = [...skillCards].indexOf(card);

                setTimeout(() => {

                    card.classList.add("show");

                    const bar = card.querySelector(".skill-bar span");

                    if (bar) {
                        const width =
                            bar.getAttribute("data-width") || 0;

                        requestAnimationFrame(() => {
                            bar.style.width = width + "%";
                        });
                    }

                }, index * 120);

               
                observer.unobserve(card);
            });
        },
        {
            threshold: 0.2
        }
    );

    skillCards.forEach(card => {
        skillObserver.observe(card);
    });


    const counters = document.querySelectorAll("[data-count-num]");

    window.PortfolioReveal(counters, {
        threshold: 0.6,

        onShow(el) {

            if (el.dataset.counted === "true") return;

            el.dataset.counted = "true";

            const target =
                parseInt(el.getAttribute("data-target"), 10) || 0;

            const duration = 1100;
            const start = performance.now();

            function step(now) {

                const progress = Math.min(
                    (now - start) / duration,
                    1
                );
                const eased =
                    1 - Math.pow(1 - progress, 4);

                const current =
                    Math.round(eased * target);

                el.textContent = `${current}+`;

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            }

            requestAnimationFrame(step);
        }
    });


    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (reduceMotion) {

        panels.forEach(el => {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.transition = "none";
        });

        document
            .querySelectorAll(".skill-bar span")
            .forEach(bar => {
                const width =
                    bar.getAttribute("data-width") || 0;

                bar.style.width = `${width}%`;
                bar.style.transition = "none";
            });
    }

});