/* =========================================================
   PROJECT.JS
   Signature move: project tiles pop in one-by-one like a
   grid loading ("tile-in"), and while browsing, each card
   tilts toward the cursor with a soft spotlight glow that
   follows the mouse — distinct from the other pages' more
   static reveal styles.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- ENTRANCE: TILE GRID-IN ---------- */

    const tiles = document.querySelectorAll(".tile-in");

    tiles.forEach(tile => {
        tile.style.transition = "opacity .6s cubic-bezier(.25,.8,.3,1), transform .6s cubic-bezier(.25,.8,.3,1)";
    });

    requestAnimationFrame(() => {
        tiles.forEach((tile, i) => {
            setTimeout(() => {
                tile.style.opacity = "1";
                tile.style.transform = "scale(1)";
            }, i * 140);
        });
    });

    /* ---------- MOUSE-TILT + SPOTLIGHT ---------- */

    const cards = document.querySelectorAll(".project-box");
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) {
        cards.forEach(card => {
            const image = card.querySelector(".project-image");
            if (!image) return;

            let rafId = null;

            card.addEventListener("mousemove", event => {
                const rect = card.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const rotateX = ((y / rect.height) - 0.5) * -6;
                const rotateY = ((x / rect.width) - 0.5) * 6;

                if (rafId) cancelAnimationFrame(rafId);

                rafId = requestAnimationFrame(() => {
                    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    image.style.setProperty("--spot-x", `${(x / rect.width) * 100}%`);
                    image.style.setProperty("--spot-y", `${(y / rect.height) * 100}%`);
                });
            });

            card.addEventListener("mouseleave", () => {
                if (rafId) cancelAnimationFrame(rafId);
                card.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
            });
        });
    }

});
