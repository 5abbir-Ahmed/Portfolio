document.addEventListener("DOMContentLoaded", () => {

    const sweep =
        document.querySelector(".radar-sweep");

    const infoNodes =
        document.querySelectorAll(
            ".contact-info > *"
        );

    const form =
        document.querySelector(".contact-form");

    const detailLinks =
        document.querySelectorAll(
            ".contact-details a"
        );

    const socialLinks =
        document.querySelectorAll(
            ".social-links a"
        );


    /* =========================
       CONTACT ENTRANCE
    ========================= */

    function revealContact() {

        infoNodes.forEach((el, i) => {

            setTimeout(() => {

                el.style.opacity = "1";

                el.style.transform =
                    "translateY(0)";

            }, i * 190);

        });


        detailLinks.forEach((el, i) => {

            el.style.transition =
                "opacity .5s ease, transform .5s ease";

            setTimeout(() => {

                el.style.opacity = "1";

                el.style.transform =
                    "translateY(0)";

            }, 380 + i * 130);

        });


        socialLinks.forEach((el, i) => {

            setTimeout(() => {

                el.style.opacity = "1";

                el.style.transform =
                    "translateY(0)";

            }, 900 + i * 110);

        });


        if (form) {

            setTimeout(() => {

                form.style.opacity = "1";

                form.style.transform =
                    "translateY(0)";

            }, 260);

        }

    }


    if (sweep) {

        requestAnimationFrame(() => {

            sweep.style.transition =
                "transform .9s cubic-bezier(.65,0,.35,1)";

            sweep.style.transform =
                "translateY(100%)";

        });

        setTimeout(
            revealContact,
            450
        );

    } else {

        revealContact();

    }


    /* =========================
       FORM STATUS
    ========================= */

    if (!form) return;


    const status =
        form.querySelector(
            ".form-status"
        );


    const submitBtn =
        form.querySelector(
            ".btn-primary"
        );


    let statusTimer;


    function showStatus(
        message,
        type
    ) {

        if (!status) return;


        clearTimeout(
            statusTimer
        );


        status.classList.remove(
            "success",
            "error",
            "sending",
            "show"
        );


        status.textContent =
            message;


        /* Force reflow */

        void status.offsetWidth;


        status.classList.add(
            type,
            "show"
        );


        statusTimer =
            setTimeout(() => {

                status.classList.remove(
                    "show"
                );

            }, 5000);

    }


    /* =========================
       INVALID EMAIL
    ========================= */

    form.addEventListener(
        "portfolio:invalid-email",
        () => {

            showStatus(
                "Please enter a valid email address.",
                "error"
            );

        }
    );


    /* =========================
       SENDING
    ========================= */

    form.addEventListener(
        "portfolio:sending",
        () => {

            showStatus(
                "Sending your message...",
                "sending"
            );


            if (submitBtn) {
                submitBtn.disabled = true;
            }

        }
    );


    /* =========================
       SUCCESS
    ========================= */

    form.addEventListener(
        "portfolio:success",
        () => {

            showStatus(
                "Thank you for your message. I will get back to you soon!",
                "success"
            );


            if (submitBtn) {
                submitBtn.disabled = false;
            }

        }
    );


    /* =========================
       ERROR
    ========================= */

    form.addEventListener(
        "portfolio:error",
        () => {

            showStatus(
                "Something went wrong. Please try again.",
                "error"
            );


            if (submitBtn) {
                submitBtn.disabled = false;
            }

        }
    );

});