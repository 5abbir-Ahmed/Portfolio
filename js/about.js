/* =========================================================
   ABOUT.JS
   Signature move: elements slide in from alternating left
   and right ("split panel") on load instead of a simple
   fade. On scroll, stat numbers count up and skill bars
   fill — different from home's boot sequence or project's
   tiled grid-in.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- ENTRANCE: SPLIT PANEL ---------- */

    const panels = document.querySelectorAll(".split-in");

    panels.forEach((el, i) => {
        const fromLeft = i % 2 === 0;
        el.style.transform = `translateX(${fromLeft ? "-36px" : "36px"})`;
        el.style.transition = "opacity .75s cubic-bezier(.25,.8,.3,1), transform .75s cubic-bezier(.25,.8,.3,1)";
    });

    requestAnimationFrame(() => {
        panels.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateX(0)";
            }, i * 130);
        });
    });

    /* ---------- SCROLL REVEAL for skill cards / stat cards ---------- */

    const skillCards = document.querySelectorAll(".skill-card");

    window.PortfolioReveal(skillCards, {
        stagger: 80,
        onShow(card) {
            card.classList.add("show");
            const bar = card.querySelector(".skill-bar span");
            if (bar) {
                const width = bar.getAttribute("data-width") || 0;
                requestAnimationFrame(() => {
                    bar.style.width = width + "%";
                });
            }
        }
    });

    /* ---------- ANIMATED COUNTERS ---------- */

    const counters = document.querySelectorAll("[data-count-num]");

    window.PortfolioReveal(counters, {
        threshold: 0.6,
        onShow(el) {
            const target = parseInt(el.getAttribute("data-target"), 10) || 0;
            const duration = 900;
            const start = performance.now();

            function step(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.round(eased * target) + "+";

                if (progress < 1) requestAnimationFrame(step);
            }

            requestAnimationFrame(step);
        }
    });

});
