function init() {
    kita.classList.add("fade-opening");
    text = document.querySelector(".story-text");
    image = document.querySelector(".story-image");
    btn = document.querySelector(".story-btn");
    text_index = 0;

    btn.disabled = true;

    setTimeout(() => {
        text_gen();
    }, 1000);
}

function text_gen() {
    text.innerHTML = "";
    len = script[text_index].text.length;

    update_image();

    for(let i = 0; i < len; i++) {
        setTimeout(() => {
            if (script[text_index].text[i] == "↓") {
                text.innerHTML += "<br>";
            } else {
                text.innerHTML += script[text_index].text[i];
            }
            vse = randint(0, 3);
            PlayAudio(`Asset/Audio/SE/typing${vse}.mp3`, 0.6);
        }, i * 60);
    }
    setTimeout(() => {
        btn.disabled = false;
    }, len * 70);
}

function next_text() {
    if (text_index < script.length - 1) {
        btn.disabled = true;
        text_index++;
        text_gen();
    } else {
        kita.classList.remove("fade-opening");
        music = document.querySelector("#music");
        fadeout(music);
        setTimeout(() => {
            location.href = "game.html";
        }, 3000);
    }
}

function update_image() {
    image.classList.remove("show-image");

    setTimeout(() => {
        if(script[text_index].image == null) {
            image.src = "";
        } else {
            image.src = script[text_index].image;
            image.classList.add("show-image");
        }
    }, 500)
}
