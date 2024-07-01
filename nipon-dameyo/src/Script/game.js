let moving;

function init() {
    EngineInit();

    setTimeout(() => {
        kita.classList.add("fade-opening");
    }, 50);

    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/stamp_open.mp3`, 0.8);
        document.querySelector(".date-counter").classList.add("date-view");
    }, 1500);

    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/stamp_close.mp3`, 0.6);
        document.querySelector(".date-counter").classList.remove("date-view");
    }, 4000);


    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/paper_landing.mp3`, 0.6);
        document.querySelector("#paper1").classList.add("paper-print");
    }, 5000);

    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/paper_landing.mp3`, 0.6);
        document.querySelector("#paper2").classList.add("paper-print");
    }, 5250);

    dm_item = document.querySelectorAll(".document-item");
    dm_event();
}

function dm_event() {
    window.addEventListener("mouseup", () => {
        moving = false;
        dm_item.forEach((i) => {
            i.classList.remove("scale-up");
        });
    });

    dm_item.forEach((i) => {
        i.addEventListener("mousedown", () => {
            dm_item.forEach((j) => {
                j.classList.remove("z-up");
            });
            PlayAudio(`Asset/Audio/SE/paper_pick_up.mp3`, 0.2);
            moving = true;
            i.classList.add("z-up");
            i.classList.add("scale-up");
        });

        i.addEventListener("mouseup", () => {
            PlayAudio(`Asset/Audio/SE/paper_pick_down.mp3`, 0.1);
        })

        i.addEventListener("mousemove", (e) => {
            if (moving && i.classList.contains("z-up")) {
                const top = i.style.top;
                const left = i.style.left
                i.style.top = `${parseInt(top.substring(0, top.length - 2)) + e.movementY}px`;
                i.style.left = `${parseInt(left.substring(0, left.length - 2)) + e.movementX}px`;
            }
        });

    });

}