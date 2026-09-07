document.addEventListener("DOMContentLoaded", () => {


    const sidebar = document.getElementById("cvSidebar");

    if (sidebar) {
        sidebar.style.opacity = "0";
        sidebar.style.transform = "translateY(16px)";
        sidebar.style.transition = "opacity .95s ease, transform .95s ease";

        requestAnimationFrame(() => {
            setTimeout(() => {
                sidebar.style.opacity = "1";
                sidebar.style.transform = "translateY(0)";
                }, 180);
        });
    }


    const sections = document.querySelectorAll(".cv-section");

    window.PortfolioReveal(sections, {
        stagger: 150,
        onShow: el => el.classList.add("show")
    });

});