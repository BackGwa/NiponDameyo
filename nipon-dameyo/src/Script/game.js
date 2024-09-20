let moving;
let isopen = false;
let pps = false;
let submit = false;
let interrogate = false;
let search_ing = false;
let person_active = false;
let gst = "";
let yet_person = false;
let warn = false;
let ipr = 0;
let eg_stack = 0;

function init() {
    try {
        stamp = document.querySelector(".stamp");
        mp = document.querySelector(".mini-passport");
        psp = document.querySelector("#passport");
        tt = document.querySelector(".tooltip");
        itr = document.querySelector(".interrogate");
        search = document.querySelector(".search");
        next = document.querySelector(".next");
        can_select = document.querySelectorAll(".can-select");
        pi = document.querySelector(".person-item");
    
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
            PlayAudio(`Asset/Audio/SE/metalstart0.mp3`, 0.2);
            document.querySelector("#key").classList.add("paper-print");
        }, 5750);

        dm_item = document.querySelectorAll(".document-item");
        dm_event();   
    } catch (e) {
        console.error(e);
    }
}

function dm_event() {
    window.addEventListener("mouseup", (e) => {
        try {
            write("window mouseup", e.target);
            if (pps) {
                eg_stack = 0;
                submit = true;
                mp.classList.remove("mpshow");
                tt.classList.remove("mpshow");
                PlayAnimation(mp, "mpani", true);
                PlayAudio(`Asset/Audio/SE/passport_up.mp3`, 1);
                pps = false;

                setTimeout(() => {
                    PlayAudio(`Asset/Audio/SE/passport_down.mp3`, 1);
                }, 100)

                setTimeout(() => {
                    PlayAudio("Asset/Audio/SE/walkout.mp3", 2);
                }, 150);

                setTimeout(() => {
                    randgetme = [
                        "드디어.", "친일파 청산을 위하여,",
                        "불편한 심문이구만.", "이 곳에 안 오길 빌겠어.",
                        "고맙군.", "행운이 찾아오길.",
                        "마참내.", "이렇게 쉽다니.",
                        "친일파도 그냥 넘어가겠군", "허술한 거 아닌가?"];
                    new_chat(randgetme[randint(0, 9)], false);
                }, 250)

                setTimeout(() => {
                    pi.classList.remove("in-person");
                    PlayAnimation(pi, "out-person");
                }, 750);

                setTimeout(() => {
                    person_active = false;
                    yet_person = false;

                    if (warn) {
                        warn_print();
                    }
                }, 2500);

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
                    if (pps) {
                        eg_stack++;
                        if (eg_stack == 4) {
                            new_chat("잘못 걸린거 같군.", false);
                        } else if (eg_stack == 5) {
                            new_chat("장난하나?", false);
                        } else if (eg_stack == 6) {
                            new_chat("장난을 받아줄 기분은 아닌데.", false);
                        } else if (eg_stack == 7) {
                            new_chat("어디서 이런 놈을.", false);
                        } else if (eg_stack == 8) {
                            new_chat("그만하라는 말 안 들리나?", false);
                        } else if (eg_stack == 9) {
                            new_chat("곧 짤리겠군.", false);
                            setTimeout(() => {
                                new_chat("뭐라는건지 모르겠군.", true);
                            }, 1000);
                        } else if (eg_stack == 10) {
                            new_chat("아마 친일파는 그 쪽 같은데?", false);
                            setTimeout(() => {
                                new_chat("그럴리가.", true);
                            }, 1000);
                        } else if (eg_stack == 11) {
                            new_chat("적당히.", false);
                            setTimeout(() => {
                                new_chat("재밌지않나?", true);
                            }, 1000);
                        } else if (eg_stack == 12) {
                            new_chat("어이.", false);
                        } else if (eg_stack >= 13 && eg_stack < 19) {
                            new_chat("그만해.", false);
                        } else if (eg_stack == 19) {
                            new_chat("마지막 기회야.", false);
                        } else if (eg_stack >= 20) {
                            new_chat("넌 이제 끝이야.", false);
                            gameover(500);
                        }
                    }
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


function add_event(target) {
    target.addEventListener("mousedown", (e) => {
        try {
            write("Item Select", e.target);

            dm_item.forEach((j) => {
                j.classList.remove("z-up");
            });

            target.classList.add("z-up");
            
            PlayAudio(`Asset/Audio/SE/paper_pick_up.mp3`, 0.2);

            moving = true;
            target.classList.add("z-up");

        } catch (e) {
            console.error(e);
        }
    });

    target.addEventListener("mouseup", (e) => {
        try {
            write("Item Unselect", e.target);
            PlayAudio(`Asset/Audio/SE/paper_pick_down.mp3`, 0.2);
        } catch (e) {
            console.error(e);
        }
    })

    target.addEventListener("mousemove", (e) => {
        try {
            if (moving && target.classList.contains("z-up") && !interrogate) {
                const top = parseInt(target.style.top.substring(0, target.style.top.length - 2));
                const left = parseInt(target.style.left.substring(0, target.style.left.length - 2));
                write("Item Moving", e.target);

                target.style.left = `${left + e.movementX}px`;
                target.style.top = `${top + e.movementY}px`;
            }
        } catch (e) {
            console.error(e);
        }
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
    if (!person_active) {
        person_active = true;
        setTimeout(() => {
            call_person();
        }, 1000)
        PlayAudio("Asset/Audio/SE/button_click.mp3", 0.5);
        PlayAnimation(next, "search-animation", true);
        PlayAudio("Asset/Audio/SE/speech.mp3", 0.3);
    }
}

function call_person() {
    knrand = randint(1, 64)
    knrand = knrand % 2 == 0 || knrand % 3 == 0; // true : Korean

    if (knrand) {
        warn = false;
        pstg = klist[randint(0, klist.length - 1)]
    } else {
        warn = true;
        pstg = nlist[randint(0, nlist.length - 1)]
    }

    itrrand = randint(1, 64);
    itrrand = itrrand % 2 == 0 || itrrand % 7 == 0; // true : none itr

    console.log(pstg, itrrand);

    if (!itrrand) {
        change_target = randint(0, 2);
        ctay = ["in_image", "gender", "sign"];
        gst = ctay[change_target];
    }

    forward_person();
}

function forward_person() {
    passport_reset();
    yet_person = true;
    Gtable = {"M" : "남자", "F" : "여자"}
    pi.src = pstg["in_image"];
    document.querySelector(".pbimg").src = pstg["pp_image"];
    document.querySelector(".profile-name").innerText = pstg["name"];
    document.querySelector(".profile-gender").innerText = Gtable[pstg["gender"]];
    document.querySelector(".profile-birth").innerText = pstg["birth"];
    pi.classList.remove("out-person");
    PlayAnimation(pi, "in-person");
    setTimeout(() => {
        PlayAudio("Asset/Audio/SE/walkin.mp3", 0.8);
    }, 300);

    setTimeout(() => {
        randgetme = ["신분증 좀 봅시다.", "신분증 내시오.",
                    "신분증 제출하시오.", "신분증 어디있습니까?",
                    "제출하시오.", "신분증은 어딨나?",
                    "빨리 빨리 끝내자고.", "빨리하자고.",
                    "거 신분증 좀 봅시다.", "친일파는 아니겠지?",
                    "내놔봐.", "빨리 안주고 뭐하나?"];
        new_chat(randgetme[randint(0, 11)], true);
    }, 2250);

    setTimeout(() => {
        randgetme = ["기다리시지오.", "여기.",
                    "기다리게.", "어딨더라?",
                    "기다려봐.", "굳이?",
                    "나를 모르나?", "자네 좀 실망이군.",
                    "참을성 좀 기르게.", "좀 참아보시오.",
                    "참아보시오.", "급한 일 없잖소?",
                    "잘 부탁하네.", "잘 좀 부탁하오.",
                    "열심히 하는 군,", "이렇게 작다니.",
                    "잘 되가는가?", "드디어 일하는군."];
        new_chat(randgetme[randint(0, 17)], false);
    }, randint(3500, 4000));

    addtime = 0;
    txt_event = randint(0, 9);
    if (txt_event == 4) {    
        setTimeout(() => {
            randgetme = ["신분증 한 번 받기 힘들군", "조용히 해"];
            new_chat(randgetme[randint(0, 1)], true);
        }, 5000);
        addtime = 1500;
    } else if (txt_event == 5) {
        setTimeout(() => {
            randgetme = ["우리같은 조선인끼리는", "우리끼리는"];
            new_chat(randgetme[randint(0, 1)], false);
        }, 5000);
        setTimeout(() => {
            randgetme = ["통하는게 있겠지?", "그냥 보내줘도 괜찮지않나?", "그냥 넘어갑시다."];
            new_chat(randgetme[randint(0, 2)], false);
        }, 6000);
        setTimeout(() => {
            randgetme = ["모든 사람은 심문을 받아야하오.", "처벌받고 싶은가?", "찔리는게 있나보지?"];
            new_chat(randgetme[randint(0, 2)], true);
        }, 7000);
        setTimeout(() => {
            randgetme = ["더럽게 깐깐하군.", "최악이군."];
            new_chat(randgetme[randint(0, 1)], false);
        }, 8000);
        addtime = 4500;
    } else if (txt_event == 6) {
        setTimeout(() => {
            randgetme = ["빨리 빨리 해.", "난 급한 몸이라고.",
                        "재촉하는만큼 빠르겠지?", "너나 빨리하라고."];
            new_chat(randgetme[randint(0, 3)], false);
        }, 5000);
        addtime = 1500;
    }

    setTimeout(() => {
        PlayAudio(`Asset/Audio/SE/paper_landing.mp3`, 0.6);
        document.querySelector("#passport").classList.add("passport-print");
    }, randint(4500, 5500) + addtime);

}

function new_chat(text, itrs) {
    cha = document.querySelector(".chat-area");
    let chtag = randidx();
    if (itrs) {
        cha.innerHTML += `<div class="chatbox-l" id=${chtag}>${text}</div>`;
        PlayAudio("Asset/Audio/SE/inspector.mp3");
    } else {
        cha.innerHTML += `<div class="chatbox-r" id=${chtag}>${text}</div>`;
        PlayAudio("Asset/Audio/SE/entrant.mp3");
    }

    setTimeout(() => {
        document.querySelector(`#${chtag}`).classList.add("chat-show");
    }, 10);

    setTimeout(() => {
        document.querySelector(`#${chtag}`).classList.remove("chat-show");
    }, 2010);

    setTimeout(() => {
        document.querySelector(`#${chtag}`).remove();
    }, 2210);
}

function randidx() {
    rid = ["a", "b", "c", "d", "e", "f"]
    return `${rid[randint(0, 5)]}${randint(0, randint(64, 128))}${randint(0, 10)}`
}

function passport_reset() {
    submit = false;
    psp.classList.remove("passport-print");
    psp.classList.remove("stamp-status");
    psp.classList.remove("stamp-check1");
    psp.classList.remove("stamp-check2");
    psp.classList.remove("stamp-check3");
    psp.classList.remove("passport-small");
    psp.style.top = "177px";
    psp.style.left = "92px";
}

function warn_print(text = "") {
    ipr++;
    let dat = document.querySelector(".detect-area");
    let dat_id = randidx();
    wait = document.createElement("div");
    wait.setAttribute("id", dat_id);
    wait.setAttribute("class", "document-item warn-size");
    wait.setAttribute("style", "top: 640px; left: 295px;");
    wait.innerHTML = `<p>${text}</p>`;
    dat.appendChild(wait);

    if (ipr > 2) {
        gameover();
    }

    setTimeout(() => {
        document.querySelector(`#${dat_id}`).classList.add("dat-show");
    }, 10);

    PlayAudio("Asset/Audio/SE/print_feed.mp3", 1);

    setTimeout(() => {
        PlayAudio("Asset/Audio/SE/print_line.mp3", 0.5);
    }, 500);

    setTimeout(() => {
        PlayAudio("Asset/Audio/SE/print_line.mp3", 0.55);
    }, 1400);

    setTimeout(() => {
        PlayAudio("Asset/Audio/SE/print_line.mp3", 0.5);
    }, 2300);

    setTimeout(() => {
        PlayAudio("Asset/Audio/SE/print_tear.mp3", 0.7);
        dm_item = document.querySelectorAll(".document-item");
        add_event(wait);
    }, 3300);
}

function gameover(delay = 4000) {
    setTimeout(() => {
        kita.classList.add("gmover");
        setTimeout(() => {
            location.href = "scene2.html";
        }, 2000);
    }, delay);
}