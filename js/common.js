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

        const inside =
            navMenu.contains(event.target) ||
            menuButton.contains(event.target);

        if (!inside) closeMenu();

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {
            closeMenu();
        }

    });

})();

(function initOutboundTransition() {

    const overlay = document.querySelector(".page-transition");

    if (!overlay) return;

    overlay.classList.add("is-entering");

    requestAnimationFrame(() => {
        setTimeout(() => {
            overlay.classList.remove("is-entering");
        }, 800);
    });

    let isNavigating = false;

    document.querySelectorAll('a[href$=".html"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const href = this.getAttribute("href");

            if (!href) return;

            if (href.startsWith("#")) return;

            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("//")
            ) {
                return;
            }

            if (this.target === "_blank") return;

            if (this.hasAttribute("download")) return;

            if (isNavigating) {
                event.preventDefault();
                return;
            }

            event.preventDefault();

            isNavigating = true;

            const navMenu = document.querySelector(".nav-menu");
            const menuButton = document.querySelector(".menu-toggle");

            if (navMenu) {
                navMenu.classList.remove("open");
            }

            if (menuButton) {
                menuButton.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            }

            // Start exit transition
            overlay.classList.remove("is-entering");

            void overlay.offsetWidth;

            overlay.classList.add("closing");

            setTimeout(() => {
                window.location.href = href;
            }, 800);

        });

    });

    window.addEventListener("pageshow", event => {

        isNavigating = false;

        if (event.persisted) {
            overlay.classList.remove("closing");
            overlay.classList.remove("is-entering");
        }

    });

})();

window.PortfolioReveal = function (elements, opts = {}) {

    const {
        threshold = 0.15,
        stagger = 0,
        onShow = el => el.classList.add("show"),
        once = true
    } = opts;

    const list = Array.from(elements || []);

    if (!list.length) return;

    if (!("IntersectionObserver" in window)) {

        list.forEach(el => onShow(el));

        return;
    }

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const index = list.indexOf(entry.target);

                const delay =
                    Math.max(index, 0) * stagger;

                setTimeout(() => {
                    onShow(entry.target);
                }, delay);

                if (once) {
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold
        }
    );

    list.forEach(el => observer.observe(el));

    return observer;

};

(function initContactForm() {

    const form = document.querySelector(".contact-form");

    if (!form) return;


    form.addEventListener("submit", async event => {

        event.preventDefault();

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

        form.dispatchEvent(
            new CustomEvent("portfolio:sending")
        );


        try {

            const response =
                await fetch(form.action, {

                    method: "POST",

                    body: new FormData(form),

                    headers: {
                        Accept: "application/json"
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