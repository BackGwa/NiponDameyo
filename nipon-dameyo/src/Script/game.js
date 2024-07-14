let moving;
let isopen = false;
let pps = false;
let submit = false;
let interrogate = false;
let search_ing = false;

function init() {
    try {
        stamp = document.querySelector(".stamp");
        mp = document.querySelector(".mini-passport");
        tt = document.querySelector(".tooltip");
        itr = document.querySelector(".interrogate");
        search = document.querySelector(".search");
        next = document.querySelector(".next");
        can_select = document.querySelectorAll(".can-select");
    
        setTimeout(() => {
            kita.classList.add("fade-opening");
        }, 50);
    
        setTimeout(() => {
            PlayAudio(`Asset/Audio/SE/stamp_open.mp3`, 0.4);
            document.querySelector(".date-counter").classList.add("date-view");
        }, 1500);
    
        setTimeout(() => {
            PlayAudio(`Asset/Audio/SE/booth_open.mp3`, 0.4);
            document.querySelector(".date-counter").classList.remove("date-down");
            document.querySelector(".date-counter").classList.add("date-down");
        }, 4250);
    
    
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
        }, 5750);

        setTimeout(() => {
            PlayAudio(`Asset/Audio/SE/paper_landing.mp3`, 0.6);
            document.querySelector("#key").classList.add("paper-print");
        }, 6000);

        dm_item = document.querySelectorAll(".document-item");
        dm_event();   
    } catch (e) {
        console.error(e);
    }
}

function dm_event() {
    window.addEventListener("keydown", (e) => {
        if (e.keyCode == 9) interrogate_toggle();
        if (e.keyCode == 16) call_next();
        if (e.keyCode == 32) stamp_filp();
    });

    window.addEventListener("mouseup", (e) => {
        try {
            write("window mouseup", e.target);
            if (pps) {
                submit = true;
                mp.classList.remove("mpshow");
                tt.classList.remove("mpshow");
                PlayAnimation(mp, "mpani", true);
                PlayAudio(`Asset/Audio/SE/passport_up.mp3`, 1);
                pps = false;

                setTimeout(() => {
                    PlayAudio(`Asset/Audio/SE/passport_down.mp3`, 1);
                }, 100)
            }
            moving = false;
            dm_item.forEach((i) => {
                i.classList.remove("scale-up");
            });
        } catch (e) {
            console.error(e);
        }
    });

    window.addEventListener("mousemove", (e) => {
        try {
            let caliview;
            if (moving && !submit && !interrogate) {
                write("pps", pps);
                write("submit", submit);
                parent = e.target.offsetParent;
                write("parent", parent);
    
                if (parent.classList.contains("person-area")) {
                    dm_item.forEach((i) => {
                        stamp_len = document.querySelectorAll(".stamp-status").length;
                        if (stamp_len > 0) {
                            write("passport drop", i);
                            if (i.classList.contains("z-up") && i.classList.contains("passport-size")) {
                                caliview = i;
                                write("passport drop", i);
                                i.classList.add("passport-small");
                                pps = true;
                            }
                        } else {
                            write("passport drop", "required stamp", true);
                        }
                    });
                } else {
                    dm_item.forEach((i) => {
                        write("passport redrop", i);
                        i.classList.remove("passport-small");
                    });
                    pps = false;
                }
            } else {
                pps = false;
            }
    
            if (pps) {
                write("caliview", caliview);
                viewinfo = caliview.getBoundingClientRect();
                write("viewinfo", viewinfo);
                caliview.style.top = `${e.offsetY - (viewinfo.height / 2)}px`;
                write("moving passport", e.offsetY - (viewinfo.height / 2));
                mp.classList.add("mpshow");
                tt.classList.add("mpshow");
                mp.style.top = `${e.offsetY - 42}px`;
                mp.style.left = `${e.offsetX - 42}px`;
                tt.style.top = `${e.offsetY - 75}px`;
                tt.style.left = `${e.offsetX - 82}px`;
            } else {
                mp.classList.remove("mpshow");
                tt.classList.remove("mpshow");
            }
        } catch (e) {
            console.error(e);
        }
    });

    can_select.forEach((i) => {
        i.addEventListener("mousedown", (e) => {
            try {
                can_select.forEach((j) => {
                    if (j != i) {
                        j.classList.remove("z-up-i");
                        j.parentElement.parentElement.parentElement.classList.remove("super-z");
                    }
                });
            } catch (e) {
                console.error(e);
            }

            if (interrogate && i.classList.contains("can-select")) {
                if (i.classList.contains("z-up-i")) {
                    i.classList.remove("z-up-i");
                    i.parentElement.parentElement.parentElement.classList.remove("super-z");
                    PlayAudio("Asset/Audio/SE/itr_unselect.mp3");
                } else {
                    i.parentElement.parentElement.parentElement.classList.add("super-z");
                    i.classList.add("z-up-i");
                    PlayAudio("Asset/Audio/SE/itr_select.mp3");
                }
            }

        });
    });

    dm_item.forEach((i) => {
        i.addEventListener("mousedown", (e) => {
            try {
                write("Item Select", e.target);
    
                dm_item.forEach((j) => {
                    j.classList.remove("z-up");
                });

                i.classList.add("z-up");
                
                if (e.target.className == "paper-left" || e.target.className == "paper-right" || e.target.classList.contains("item")) {
                    return;
                }
    
                if (e.target.classList.contains("passport-size") ||
                    e.target.classList.contains("note-size") && !e.target.classList.contains("cost-size")) {
                    PlayAudio(`Asset/Audio/SE/passport_up.mp3`, 1);
                } else if (e.target.classList.contains("key-size") && !e.target.classList.contains("cost-size")) {
                    rse = randint(0, 2);
                    PlayAudio(`Asset/Audio/SE/metalstart${rse}.mp3`, 0.2);
                } else {
                    PlayAudio(`Asset/Audio/SE/paper_pick_up.mp3`, 0.2);
                }
    
                moving = true;
                i.classList.add("z-up");
                
                if (!interrogate) {
                    i.classList.add("scale-up");
                }
        } catch (e) {
            console.error(e);
        }
    });

        i.addEventListener("mouseup", (e) => {
            try {
                write("Item Unselect", e.target);

                if (e.target.className == "paper-left" || e.target.className == "paper-right" || e.target.classList.contains("item")) {
                    return;
                }
    
                if (e.target.classList.contains("passport-size") ||
                    e.target.classList.contains("note-size") && !e.target.classList.contains("cost-size")
                ) {
                    PlayAudio(`Asset/Audio/SE/passport_down.mp3`, 0.5);
                } else if (e.target.classList.contains("key-size") && !e.target.classList.contains("cost-size")) {
                    rse = randint(0, 2);
                    PlayAudio(`Asset/Audio/SE/metalstop${rse}.mp3`, 0.2);
                } else {
                    PlayAudio(`Asset/Audio/SE/paper_pick_down.mp3`, 0.2);
                }
            } catch (e) {
                console.error(e);
            }
        })

        i.addEventListener("mousemove", (e) => {
            try {
                if (moving && i.classList.contains("z-up") && !interrogate) {
                    const top = parseInt(i.style.top.substring(0, i.style.top.length - 2));
                    const left = parseInt(i.style.left.substring(0, i.style.left.length - 2));
                    write("Item Moving", e.target);
    
                    write("Blocking Check", { "x" : i.style.left, "y" : i.style.top });
                    if (left < -150 || left > 1100 && !i.classList.contains("key-size")) {
                        write("left-right blocking", i.style.left, true);
                        if (left < - 150) {
                            i.style.left = `-150px`;
                        } else {
                            i.style.left = `1100px`;
                        }
                    } else {
                        i.style.left = `${left + e.movementX}px`;
                    }
                    
                    if (top < -200 || top > 600&& !i.classList.contains("key-size")) {
                        write("top-bottom blocking", i.style.top, true);
                        if (top < -200) {
                            i.style.top = `-200px`;
                        } else {
                            i.style.top = `600px`;
                        }
                    } else {
                        i.style.top = `${top + e.movementY}px`;
                    }
                }
            } catch (e) {
                console.error(e);
            }
        });

    });

}

function stamp_filp() {
    try {
        isopen = !isopen;
        if (!stamp.classList.contains("stamp-open")) {
            PlayAudio(`Asset/Audio/SE/stamp_open.mp3`, 0.8);
            write("stamp open", "open", false, false, true);
            stamp.classList.add("stamp-open");
        } else {
            PlayAudio(`Asset/Audio/SE/stamp_close.mp3`, 0.6);
            write("stamp", "close", false, false, false, true);
            stamp.classList.remove("stamp-open");
        }
    } catch (e) {
        console.error(e);
    }
}

function stamp_collision() {
    try {
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
                    (pos.y + 460 <= ppy && ppy <= sy + 390) &&
                    !i.classList.contains("stamp-status")) 
                {
                    write("stamp", "Permitted", false, false, true);
                    i.classList.add(`stamp-status`);
                    i.classList.add(`stamp-check${randint(1, 3)}`);
                    return true;
                } else {
                    if (i.classList.contains("stamp-status")) {
                        write("stamp", "Rejected", true);
                    }
                    return false;
                }
            });
        }
    } catch (e) {
        console.error(e);
    }
}

function click_stamp() {
    try {
        st_pass = document.querySelector(".stamp-pass");
        st_shadow = document.querySelector(".stamp-shadow");
        st_btn = document.querySelector(".stamp-button");

        if (st_pass.classList.contains("stamp-down")) {
            return;
        }

        st_pass.classList.add("stamp-down");
        st_shadow.classList.add("stamp-shadow-down");
        st_btn.classList.add("stamp-btn-down");
        PlayAudio(`Asset/Audio/SE/stamp_down.mp3`, 0.8);

        setTimeout(() => {
            result = stamp_collision();
        }, 100);

        setTimeout(() => {
            st_pass.classList.remove("stamp-down");
            st_shadow.classList.remove("stamp-shadow-down");
            st_btn.classList.remove("stamp-btn-down");
            PlayAudio(`Asset/Audio/SE/stamp_up.mp3`, 0.6);
        }, 1250);
    } catch (e) {
        console.error(e);
    }
}

function page_change(target, addx) {
    try {
        PlayAudio(`Asset/Audio/SE/paper_left.mp3`, 1);

        page = document.querySelector(`#${target}`);
        pages = page.querySelectorAll(".pages");

        pages.forEach((i, idx) => {
            i.classList.add("disable");
        });
    
        pages[addx - 1].classList.remove("disable");

        page_chk(target, addx - 1, pages.length - 1);
    } catch (e) {
        console.error(e);
    }
}

function page_move(target, addx) {
    try {
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
            PlayAudio(`Asset/Audio/SE/paper_right.mp3`, 1);
        } else {
            PlayAudio(`Asset/Audio/SE/paper_left.mp3`, 1);
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
    } catch (e) {
        console.error(e);
    }
}

function page_chk(target, now, max) {
    try {
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
    } catch (e) {
        console.error(e);
    }
}

function new_chat(text) {

}

function interrogate_toggle() {
    interrogate = !interrogate;
    dm_item.forEach((i) => {
        i.classList.remove("super-z");
    });
    can_select.forEach((i) => {
        i.classList.remove("z-up-i");
    });
    PlayAnimation(itr, "itr-animation", true);

    setTimeout(() => {
        if (interrogate) {
            itr.classList.add("itr-start");
            kita.classList.add("itr-body");
            search.classList.add("search-start");
            PlayAudio(`Asset/Audio/SE/itr_open.mp3`, 0.7);
            document.querySelector(".itr-filter").classList.add("itr-filter-enable");
        } else {
            itr.classList.remove("itr-start");
            kita.classList.remove("itr-body");
            search.classList.remove("search-start");
            PlayAudio(`Asset/Audio/SE/itr_close.mp3`, 0.7);
            document.querySelector(".itr-filter").classList.remove("itr-filter-enable");
        }
    }, 125);
}

function itr_search() {
    if (search_ing) {
        return;
    }

    let itr_select = false;
    search_ing = true;

    can_select.forEach((i) => {
        if (!itr_select) {
            itr_select = i.classList.contains("z-up-i");
            itr_item = i;
        }
    });
    PlayAnimation(search, "search-animation", true);

    if (itr_select) {
        text_tooltip(itr_item, "불일치 발견");
        PlayAudio(`Asset/Audio/SE/itr_check.mp3`, 1);
    } else {
        PlayAudio(`Asset/Audio/SE/itr_error.mp3`, 1);
    }

    setTimeout(() => {
        search_ing = false;
    }, 1500);
}

function text_tooltip(item, text) {
    ttooltip = document.querySelector(".text-tooltip");
    hint_pos = item.offsetParent.offsetParent.getBoundingClientRect();
    console.log(item.offsetParent.offsetParent, hint_pos);
    ttooltip.style.left = `${(hint_pos.x - (hint_pos.width / 4)) + 16}px`;
    ttooltip.style.top = `${(hint_pos.y - (hint_pos.height / 1.5))}px`;

    ttooltip.innerText = text;

    PlayAnimation(ttooltip, "ttooltip-display", true)
}

function call_next() {
    PlayAudio("Asset/Audio/SE/button_click.mp3", 0.5);
    PlayAnimation(next, "search-animation", true);
    PlayAudio("Asset/Audio/SE/speech.mp3", 0.5);
}