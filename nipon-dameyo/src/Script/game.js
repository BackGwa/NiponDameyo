let moving;
let isopen = false;

function init() {
    EngineInit();

    stamp = document.querySelector(".stamp");

    setTimeout(() => {
        kita.classList.add("fade-opening");
    }, 50);

    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/stamp_open.mp3`, 0.4);
        document.querySelector(".date-counter").classList.add("date-view");
    }, 1500);

    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/stamp_close.mp3`, 0.4);
        document.querySelector(".date-counter").classList.remove("date-view");
    }, 4000);


    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/paper_landing.mp3`, 0.6);
        document.querySelector("#paper1").classList.add("paper-print");
    }, 5250);

    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/paper_landing.mp3`, 0.6);
        document.querySelector("#paper2").classList.add("paper-print");
    }, 5500);

    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/paper_landing.mp3`, 0.6);
        document.querySelector("#paper3").classList.add("paper-print");
    }, 6000);

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
        i.addEventListener("mousedown", (e) => {
            dm_item.forEach((j) => {
                j.classList.remove("z-up");
            });
            i.classList.add("z-up");

            if (e.target.className == "paper-left" || e.target.className == "paper-right") {
                return;
            }

            PlayAudio(`Asset/Audio/SE/paper_pick_up.mp3`, 0.2);
            moving = true;
            i.classList.add("z-up");
            i.classList.add("scale-up");
        });

        i.addEventListener("mouseup", (e) => {
            if (e.target.className == "paper-left" || e.target.className == "paper-right") {
                return;
            }

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

function stamp_filp() {
    isopen = !isopen;
    if (!stamp.classList.contains("stamp-open")) {
        PlayAudio(`Asset/Audio/SE/stamp_open.mp3`, 0.8);
        stamp.classList.add("stamp-open");
    } else {
        PlayAudio(`Asset/Audio/SE/stamp_close.mp3`, 0.6);
        stamp.classList.remove("stamp-open");
    }
}

function stamp_collision() {
    if (isopen) {
        pos = stamp.getBoundingClientRect();
        sx = pos.x + pos.width;
        sy = pos.y + pos.height;

        stamp_target = document.querySelectorAll(".allow-stamp");
        stamp_target.forEach((i) => {
            p_pos = i.getBoundingClientRect();
            ppx = p_pos.x;
            ppy = p_pos.y + p_pos.height;

            if ((pos.x - 50 <= ppx && ppx <= sx + 50) &&
                (pos.y + 650 <= ppy && ppy <= sy + 400) &&
                !i.classList.contains("stamp-status")) 
            {
                i.classList.add(`stamp-status`);
                i.classList.add(`stamp-check${randint(1, 3)}`);
                return true;
            } else {
                return false;
            }
        });
    }
}

function click_stamp() {
    st_pass = document.querySelector(".stamp-pass");
    st_shadow = document.querySelector(".stamp-shadow");
    st_btn = document.querySelector(".stamp-button");

    if (st_pass.classList.contains("stamp-down")) {
        return;
    }

    st_pass.classList.add("stamp-down");
    st_shadow.classList.add("stamp-shadow-down");
    st_btn.classList.add("stamp-btn-down");
    PlayAudio(`Asset/Audio/SE/stamp_down.mp3`, 0.6);
    result = stamp_collision();

    setTimeout(() => {
        st_pass.classList.remove("stamp-down");
        st_shadow.classList.remove("stamp-shadow-down");
        st_btn.classList.remove("stamp-btn-down");
        PlayAudio(`Asset/Audio/SE/stamp_up.mp3`, 0.4);
    }, 1250)
}

function page_move(target, addx) {
    page = document.querySelector(`#${target}`);
    curidx = 0;

    pages = page.querySelectorAll(".pages");
    
    pages.forEach((i, idx) => {
        if (!i.classList.contains("disable")) {
            curidx = idx;
            i.classList.add("disable");
        }
    });

    if (addx == 1) {
        PlayAudio(`Asset/Audio/SE/paper_right.mp3`, 0.4);
    } else {
        PlayAudio(`Asset/Audio/SE/paper_left.mp3`, 0.4);
    }

    if (addx == 1 && pages.length - 1 == curidx) {
        pages[curidx].classList.remove("disable");
        return;
    }

    if (addx == -1 && curidx == 0) {
        pages[curidx].classList.remove("disable");
        return;
    }

    curidx += addx;
    pages[curidx].classList.remove("disable");

    page_chk(target, curidx, pages.length - 1);
}

function page_chk(target, now, max) {
    page = document.querySelector(`#${target}`);

    if (now == 0) {
        page.querySelector(".paper-left").classList.add("disable");
    } else {
        page.querySelector(".paper-left").classList.remove("disable");
    }

    if (now == max) {
        page.querySelector(".paper-right").classList.add("disable");
    } else {
        page.querySelector(".paper-right").classList.remove("disable");
    }
}