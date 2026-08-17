/* =========================================================
   RESUME.JS
   Signature move: a vertical "ruler" line drops down the
   page on load like a blueprint measuring guide, and the
   timeline blocks slide in from the side individually as
   the ruler passes them while scrolling — distinct from
   the terminal, split-panel, and tile entrances elsewhere.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- ENTRANCE: RULER DROP ---------- */

    const rulerFill = document.querySelector(".ruler-fill");
    const introCard = document.querySelector(".resume-intro");

    if (introCard) {
        introCard.style.opacity = "0";
        introCard.style.transform = "translateY(16px)";
        introCard.style.transition = "opacity .6s ease, transform .6s ease";

        requestAnimationFrame(() => {
            setTimeout(() => {
                introCard.style.opacity = "1";
                introCard.style.transform = "translateY(0)";
            }, 80);
        });
    }

    /* ---------- SCROLL: RULER GROWS + TIMELINE REVEALS ---------- */

    const blocks = document.querySelectorAll(".resume-block");
    const resumeContent = document.querySelector(".resume-content");

    function updateRuler() {
        if (!rulerFill || !resumeContent) return;

        const rect = resumeContent.getBoundingClientRect();
        const viewportCenter = window.innerHeight * 0.65;
        const progress = Math.min(Math.max((viewportCenter - rect.top) / rect.height, 0), 1);

        rulerFill.style.height = (progress * 100) + "%";
    }

    window.addEventListener("scroll", updateRuler, { passive: true });
    window.addEventListener("resize", updateRuler);
    updateRuler();

    window.PortfolioReveal(blocks, {
        stagger: 90,
        onShow: el => el.classList.add("show")
    });

});
