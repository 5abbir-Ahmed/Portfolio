(function initMenu() {
    const menuButton = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (!menuButton || !navMenu) return;

    const closeMenu = () => {
        navMenu.classList.remove("open");
        menuButton.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
    };

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle("open");
        menuButton.classList.toggle("active", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
    };

    menuButton.addEventListener("click", toggleMenu);

    navMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        const inside = navMenu.contains(event.target) || menuButton.contains(event.target);
        if (!inside) closeMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 800) closeMenu();
    });
})();

/* ---------- OUTBOUND PAGE TRANSITION ----------
   When leaving the page via an internal link, sweep the
   bar overlay closed before navigating. The entrance
   animation on the *next* page is owned by that page's
   own script, so every page can feel different while the
   exit always feels consistent. */

(function initOutboundTransition() {
    const overlay = document.querySelector(".page-transition");
    if (!overlay) return;

    const triggerEntrance = () => {
        overlay.classList.remove("closing");
        overlay.classList.remove("is-entering");
        requestAnimationFrame(() => {
            overlay.classList.add("is-entering");
        });
    };

    const isInternalPath = href => {
        if (!href) return false;
        if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http") || href.startsWith("//")) {
            return false;
        }
        return href.endsWith(".html") || href.endsWith("/") || !href.includes(":") || href.startsWith("./") || href.startsWith("../") || href.startsWith("/");
    };

    document.querySelectorAll("a[href]").forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (!isInternalPath(href) || this.target === "_blank") {
                return;
            }

            const currentPage = window.location.pathname.split("/").pop() || "index.html";
            const targetPage = href.split("?")[0].split("#")[0];
            const samePage = targetPage === "" || targetPage === currentPage || targetPage === ".";
            if (samePage) {
                return;
            }

            e.preventDefault();
            overlay.classList.remove("is-entering");
            overlay.classList.add("closing");

            setTimeout(() => {
                window.location.href = href;
            }, 420);
        });
    });

    triggerEntrance();

    window.addEventListener("pageshow", () => {
        triggerEntrance();
    });
})();

/* ---------- REVEAL HELPER ----------
   Pages call window.PortfolioReveal(elements, opts) to
   observe a NodeList/array and add `.show` (or run a
   custom callback) as items scroll into view, optionally
   staggering the delay between items. */

window.PortfolioReveal = function (elements, opts = {}) {
    const {
        threshold = 0.15,
        stagger = 0,
        onShow = el => el.classList.add("show"),
        once = true
    } = opts;

    const list = Array.from(elements || []);
    if (!list.length) return;

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const index = list.indexOf(entry.target);
                const delay = Math.max(index, 0) * stagger;

                setTimeout(() => onShow(entry.target), delay);

                if (once) observer.unobserve(entry.target);
            });
        },
        { threshold }
    );

    list.forEach(el => observer.observe(el));

    return observer;
};

/* ---------- CONTACT FORM (shared handler, used only
   where a .contact-form exists) ---------- */

(function initContactForm() {

    const form =
        document.querySelector(".contact-form");

    if (!form) return;


    form.addEventListener("submit", async event => {

        event.preventDefault();


        /* =========================
           EMAIL VALIDATION
        ========================= */

        const emailInput =
            form.querySelector('input[type="email"]');

        if (emailInput) {

            const email =
                emailInput.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                form.dispatchEvent(
                    new CustomEvent(
                        "portfolio:invalid-email"
                    )
                );

                emailInput.focus();

                return;
            }
        }


        /* =========================
           FORMSPREE SUBMIT
        ========================= */

        form.dispatchEvent(
            new CustomEvent("portfolio:sending")
        );


        try {

            const response =
                await fetch(form.action, {

                    method: "POST",

                    body: new FormData(form),

                    headers: {
                        Accept:
                            "application/json"
                    }

                });


            if (response.ok) {

                form.dispatchEvent(
                    new CustomEvent(
                        "portfolio:success"
                    )
                );

                form.reset();

            } else {

                form.dispatchEvent(
                    new CustomEvent(
                        "portfolio:error"
                    )
                );

            }

        } catch (error) {

            form.dispatchEvent(
                new CustomEvent(
                    "portfolio:error"
                )
            );

        }

    });

})();