document.addEventListener("DOMContentLoaded", () => {

    const grid = document.getElementById("projectsGrid");
    const projects = window.PROJECTS || [];


    /* =========================
       PROJECT CARDS
    ========================= */

    if (grid) {

        grid.innerHTML = projects.map(project => `

            <article class="project-box bracket tile-in">

                <div class="project-image">

                    <img
                        src="${project.thumbnail}"
                        alt="${project.title}"
                    >

                    <div class="project-hover">
                        <span>
                            VIEW PROJECT ➥
                        </span>
                    </div>

                </div>


                <div class="project-details">

                    <div>

                        <span class="tag">
                            ${project.tag.toUpperCase()}
                        </span>

                        <h2>
                            ${project.title}
                        </h2>

                        <p>
                            ${project.summary}
                        </p>

                    </div>


                    <span
                        class="project-link"
                        aria-hidden="true"
                    >
                        ➥
                    </span>

                </div>


                <a
                    class="card-cover"
                    href="project-details.html?id=${encodeURIComponent(project.id)}"
                    aria-label="View details: ${project.title}"
                ></a>

            </article>

        `).join("");

    }


    /* =========================
       TILE ENTRANCE
    ========================= */

    const tiles =
        document.querySelectorAll(".tile-in");


    tiles.forEach(tile => {

        tile.style.transition =
            "opacity .95s cubic-bezier(.25,.8,.3,1), transform .95s cubic-bezier(.25,.8,.3,1)";

    });


    requestAnimationFrame(() => {

        tiles.forEach((tile, i) => {

            setTimeout(() => {

                tile.style.opacity = "1";

                tile.style.transform =
                    "scale(1)";

            }, i * 220);

        });

    });


    const cards =
        document.querySelectorAll(".project-box");

    const isTouch =
        window.matchMedia(
            "(pointer: coarse)"
        ).matches;


    if (!isTouch) {

        cards.forEach(card => {

            const image =
                card.querySelector(".project-image");

            if (!image) return;


            let rafId = null;


            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        ((y / rect.height) - 0.5) * -6;

                    const rotateY =
                        ((x / rect.width) - 0.5) * 6;


                    if (rafId) {
                        cancelAnimationFrame(rafId);
                    }


                    rafId =
                        requestAnimationFrame(() => {

                            card.style.transform =
                                `perspective(900px)
                                 rotateX(${rotateX}deg)
                                 rotateY(${rotateY}deg)`;


                            image.style.setProperty(
                                "--spot-x",
                                `${(x / rect.width) * 100}%`
                            );


                            image.style.setProperty(
                                "--spot-y",
                                `${(y / rect.height) * 100}%`
                            );

                        });

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    if (rafId) {
                        cancelAnimationFrame(rafId);
                    }

                    card.style.transform =
                        "perspective(900px) rotateX(0) rotateY(0)";

                }
            );

        });

    }

});