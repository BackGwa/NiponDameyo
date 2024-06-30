let moving;

function init() {
    EngineInit();

    setTimeout(() => {
        kita.classList.add("fade-opening");
    }, 100);

    dm_item = document.querySelectorAll(".document-item");
    dm_event();
}

function dm_event() {
    window.addEventListener("mouseup", () => {
        moving = false;
    });

    dm_item.forEach((i) => {
        i.addEventListener("mousedown", () => {
            dm_item.forEach((j) => {
                j.classList.remove("z-up");
            });
            PlayAudio(`Asset/Audio/SE/paper_open.mp3`, 0.2);
            moving = true;
            i.classList.add("z-up");
        });

        i.addEventListener("mouseup", () => {
            PlayAudio(`Asset/Audio/SE/paper_right.mp3`, 0.05);
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