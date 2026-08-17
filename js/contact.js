/* =========================================================
   CONTACT.JS
   Signature move: a radar-style sweep passes down the page
   on load, form fields cascade in after it, inputs get an
   animated underline while focused, the submit button has
   a magnetic pull toward the cursor, and submitting prints
   a short terminal-style confirmation — distinct from the
   entrance styles used on every other page.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- ENTRANCE: RADAR SWEEP ---------- */

    const sweep = document.querySelector(".radar-sweep");
    const infoNodes = document.querySelectorAll(".contact-info > *");
    const form = document.querySelector(".contact-form");
    const detailLinks = document.querySelectorAll(".contact-details a");
    const socialLinks = document.querySelectorAll(".social-links a");

    function revealContact() {
        infoNodes.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, i * 130);
        });

        detailLinks.forEach((el, i) => {
            el.style.transition = "opacity .5s ease, transform .5s ease";
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 250 + i * 90);
        });

        socialLinks.forEach((el, i) => {
            setTimeout(() => {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, 600 + i * 70);
        });

        if (form) {
            setTimeout(() => {
                form.style.opacity = "1";
                form.style.transform = "translateY(0)";
            }, 150);
        }
    }

    if (sweep) {
        requestAnimationFrame(() => {
            sweep.style.transition = "transform .9s cubic-bezier(.65,0,.35,1)";
            sweep.style.transform = "translateY(100%)";
        });
        setTimeout(revealContact, 300);
    } else {
        revealContact();
    }


    /* ---------- SUBMIT FEEDBACK (driven by common.js's real
       fetch-based form handler) ---------- */

    const status = document.querySelector(".form-status");
    const submitBtn = document.querySelector(".contact-form .btn-primary");

    if (form && status) {

        form.addEventListener("portfolio:sending", () => {
            status.classList.remove("success", "error");
            status.textContent = "> sending message...";
            if (submitBtn) submitBtn.disabled = true;
        });

        form.addEventListener("portfolio:success", () => {
            status.classList.remove("error");
            status.classList.add("success");
            status.textContent = "> message received. thank you!";
            if (submitBtn) submitBtn.disabled = false;
        });

        form.addEventListener("portfolio:error", () => {
            status.classList.remove("success");
            status.classList.add("error");
            status.textContent = "> something went wrong. please try again or email me directly.";
            if (submitBtn) submitBtn.disabled = false;
        });
    }

});