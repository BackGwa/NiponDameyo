function init() {
    EngineInit();

    kita.classList.add("fade-opening");
    text = document.querySelector(".story-text");
    image = document.querySelector(".story-image");
    btn = document.querySelector(".story-btn");
    text_index = 0;

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
            vse = randint(1, 3);
            PlayAudio(`Asset/Audio/SE/speech${vse}.mp3`, 0.6);
        }, i * 55);
    }
    setTimeout(() => {
        btn.disabled = false;
    }, len * 55);
}

function next_text() {
    if (text_index < script.length - 1) {
        btn.disabled = true;
        text_index++;
        text_gen();
    } else {
        location.href = "game.html";
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