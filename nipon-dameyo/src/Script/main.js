function init() {
    logo_image = document.querySelector('.logo-image');
    button_area = document.querySelector('.btn-ui');
    infomaton = document.querySelector('.infomation');
    engine_version = document.querySelector('.engine-version');
    game_version = document.querySelector('.game-version');

    PlayAnimation(logo_image, "logo-animation");
    PlayAnimation(button_area, "logo-animation");

    setTimeout(() => {
        PlayAnimation(logo_image, "last-animation");
        PlayAnimation(button_area, "button-animation");
        PlayAnimation(infomaton, "infomation-animation");
        PlayAnimation(engine_version, "infomation-animation");
        PlayAnimation(game_version, "infomation-animation");
    }, 21500);
}

function play() {
    kita.classList.add("exit");
    kita.classList.add("block-event");
    music = document.querySelector("#music");
    fadeout(music);
    setTimeout(() => {
        location.href = "scene1.html";
    }, 3500);
}

function exit() {
    kita.classList.add("exit");
    kita.classList.add("block-event");
    setTimeout(() => {
        window.electronAPI.quitApp();
    }, 3500);
}

function credit() {
    creditf = document.querySelector("#credit");
    PlayAudio("Asset/Audio/SE/button_click.mp3");
    fadeout(music);
    creditf.classList.add("credit-show");
    setTimeout(() => {
        creditf.play();
        console.log(creditf.duration);
    }, 3500);

    setTimeout(() => {
        creditf.classList.remove("credit-show");
        music.volume = 0.4;
    }, (creditf.duration * 1000) + 5000);
}