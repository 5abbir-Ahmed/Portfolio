const projects = {

    "explore-bangladesh": {

        title: "Let's Explore Bangladesh",
        tag: "WEB APPLICATION",

        short:
            "A web-based platform for exploring tourist destinations across Bangladesh.",

        description: [
            "Let's Explore Bangladesh is a web platform built to help travelers discover tourist destinations across the country in one place, instead of piecing information together from scattered sources.",

            "The site organizes destinations with details travelers actually need before planning a trip, with a clean, responsive layout that works as well on mobile as it does on desktop."
        ],

        tech: [
            "HTML",
            "CSS",
            "JavaScript",
            "Laravel",
            "PHP",
            "MySQL"
        ],

        features: [

            [
                "Destination Browsing",
                "Users can explore tourist destinations through a clear and structured interface."
            ],

            [
                "Responsive Interface",
                "The interface is designed to work across desktop and mobile screen sizes."
            ],

            [
                "Organized Information",
                "Destination content is presented in a clean format to make exploration easier."
            ]

        ],

        images: [
            { src: "assets/img/project1/1.png", caption: "Mainpage" },
            { src: "assets/img/project1/2.png", caption: "Homepage" },
            { src: "assets/img/project1/6.png", caption: "Weather API Integration" },
            { src: "assets/img/project1/10.png", caption: "Admin Panel" },
            { src: "assets/img/project1/8.png", caption: "Admin Dashboard" },
            { src: "assets/img/project1/4.png", caption: "Login Page" },
            { src: "assets/img/project1/9.png", caption: "Adding Service" },
        ],

        github:
            "https://github.com/5abbir-Ahmed/Let-s_Explore_Bangladesh"

    },


    "restaurant-reservation": {

        title: "Restaurant Reservation",
        tag: "MOBILE APPLICATION",

        short:
            "A restaurant reservation app built with modern mobile technologies.",

        description: [
            "A restaurant reservation app that lets customers browse a restaurant's offerings and book a table online without a phone call.",

            "Built with a strong focus on responsive design so the booking flow feels smooth on both mobile and desktop."
        ],

        tech: [
            "Flutter",
            "Dart",
        ],

        features: [

            [
                "Reservation Interface",
                "A clear interface for presenting and managing restaurant reservation information."
            ],

            [
                "Responsive Design",
                "The layout adapts to different devices and screen sizes."
            ],

            [
                "User-Friendly Experience",
                "Simple navigation and structured content keep the booking flow easy to understand."
            ]

        ],

        images: [
            { src: "assets/img/project2/1.png", caption: "Mainpage", Caption: "Welcomepage" },
            { src: "assets/img/project2/2.png", caption: "Login Page" },
            { src: "assets/img/project2/3.png", caption: "Homepage" },
            { src: "assets/img/project2/4.png", caption: "Booking Confirmation" },
        ],

        github: "https://github.com/5abbir-Ahmed/restaurant_reservation_system",

    },



};


window.PROJECTS =
    Object.entries(projects).map(
        ([id, project]) => ({

            id,

            ...project,

            thumbnail:
                project.images[0].src,

            summary:
                project.short

        })
    );



document.addEventListener(
    "DOMContentLoaded",
    () => {

        const container =
            document.getElementById(
                "projectDetail"
            );

        if (!container) {
            return;
        }

        const params =
            new URLSearchParams(
                window.location.search
            );


        const projectId =
            params.get("project") ||
            params.get("id");


        const project =
            projects[projectId] ||
            projects["explore-bangladesh"];


        document.title =
            `${project.title} | Sabbir Ahmed`;


        const techHTML =
            project.tech
                .map(
                    tech => `
                        <span class="tech-chip">
                            ${tech}
                        </span>
                    `
                )
                .join("");


        const descriptionHTML =
            project.description
                .map(
                    text => `
                        <p>
                            ${text}
                        </p>
                    `
                )
                .join("");


        const galleryHTML =
            project.images.map((image, index) => `
        <div class="gallery-item ${index === 0 ? "large" : ""}">

            <img
                src="${image.src}"
                alt="${project.title} screenshot ${index + 1}"
            >

            <div class="gallery-caption">
                ${image.caption}
            </div>

        </div>
    `).join("");


        const githubHTML =
            project.github
                ? `
                    <div class="meta-actions">

                        <a
                            href="${project.github}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="details-btn"
                        >
                            GitHub
                            <span>↗</span>
                        </a>

                    </div>
                `
                : "";


        container.innerHTML = `

            <div class="details-page">


                


                <div class="details-heading">

                    <span class="details-tag">
                        ${project.tag}
                    </span>

                    <h1>
                        ${project.title}
                    </h1>

                    <p>
                        ${project.short}
                    </p>

                </div>


                <div class="hero-project-image">

                    <img
                        src="${project.images[0].src}"
                        alt="${project.title}"
                    >

                </div>


                <div class="details-grid">


                    <article class="details-card">

                        <span class="section-label">
                            OVERVIEW
                        </span>

                        <h2>
                            About the project
                        </h2>

                        <div class="details-description">
                            ${descriptionHTML}
                        </div>

                    </article>


                    <aside class="details-card details-meta">

                        <div>

                            <span class="section-label">
                                TECHNOLOGIES
                            </span>

                            <div class="tech-list">
                                ${techHTML}
                            </div>

                        </div>

                        ${githubHTML}

                    </aside>


                </div>


                <section class="features-section">

                    <div class="section-heading">

                        <span class="section-label">
                            PROJECT INFO
                        </span>

                        <h2>
                            What it includes
                        </h2>

                    </div>


                    <div class="features-grid">

                        ${project.features.map(
            (features, index) => `

                                <article class="feature-card">

                                    <h3>
                                        ${features[0]}
                                    </h3>

                                    <p>
                                        ${features[1]}
                                    </p>

                                </article>

                            `
        ).join("")}

                    </div>

                </section>


                <section class="gallery-section">

                    <div class="section-heading">

                        <span class="section-label">
                            PROJECT GALLERY
                        </span>

                        <h2>
                         Photos
                        </h2>

                    </div>


                    <div class="gallery-grid">

                        ${galleryHTML}

                    </div>

                </section>


            </div>

        `;

        /* =========================
   GALLERY LIGHTBOX
========================= */

        const galleryItems =
            container.querySelectorAll(".gallery-item img");

        if (galleryItems.length) {

            const lightbox = document.createElement("div");

            lightbox.className = "gallery-lightbox";

            lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close">
            ×
        </button>

        <button class="lightbox-prev" aria-label="Previous image">
            ‹
        </button>

        <div class="lightbox-content">
            <img class="lightbox-image" src="" alt="">
        </div>

        <button class="lightbox-next" aria-label="Next image">
            ›
        </button>

        <div class="lightbox-counter"></div>
    `;

            document.body.appendChild(lightbox);


            const lightboxImage =
                lightbox.querySelector(".lightbox-image");

            const closeButton =
                lightbox.querySelector(".lightbox-close");

            const prevButton =
                lightbox.querySelector(".lightbox-prev");

            const nextButton =
                lightbox.querySelector(".lightbox-next");

            const counter =
                lightbox.querySelector(".lightbox-counter");


            let currentIndex = 0;


            function showImage(index) {

                if (index < 0) {
                    index = galleryItems.length - 1;
                }

                if (index >= galleryItems.length) {
                    index = 0;
                }

                currentIndex = index;

                const image =
                    galleryItems[currentIndex];

                lightboxImage.src =
                    image.src;

                lightboxImage.alt =
                    image.alt;

                counter.textContent =
                    `${currentIndex + 1} / ${galleryItems.length}`;

            }


            galleryItems.forEach((image, index) => {

                image.style.cursor = "pointer";

                image.addEventListener("click", () => {

                    showImage(index);

                    lightbox.classList.add("open");

                    document.body.style.overflow =
                        "hidden";

                });

            });


            closeButton.addEventListener("click", closeLightbox);


            lightbox.addEventListener("click", event => {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            });


            prevButton.addEventListener("click", event => {

                event.stopPropagation();

                showImage(currentIndex - 1);

            });


            nextButton.addEventListener("click", event => {

                event.stopPropagation();

                showImage(currentIndex + 1);

            });


            document.addEventListener("keydown", event => {

                if (!lightbox.classList.contains("open")) {
                    return;
                }

                if (event.key === "Escape") {
                    closeLightbox();
                }

                if (event.key === "ArrowLeft") {
                    showImage(currentIndex - 1);
                }

                if (event.key === "ArrowRight") {
                    showImage(currentIndex + 1);
                }

            });


            function closeLightbox() {

                lightbox.classList.remove("open");

                document.body.style.overflow = "";

            }

        }

        const elements =
            container.querySelectorAll(
                ".back-link, .details-heading, " +
                ".hero-project-image, .details-grid, " +
                ".features-section, .gallery-section, " +
                ".project-bottom"
            );


        elements.forEach(
            (element, index) => {

                element.style.opacity = "0";

                element.style.transform =
                    "translateY(20px)";

                element.style.transition =
                    "opacity .6s ease, transform .6s ease";


                setTimeout(
                    () => {

                        element.style.opacity =
                            "1";

                        element.style.transform =
                            "translateY(0)";

                    },
                    100 + index * 100
                );

            }
        );

    }
);
