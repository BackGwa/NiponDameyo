function init() {
    EngineInit();
    logo_image = document.querySelector('.logo-image');
    button_area = document.querySelector('.btn-ui');
    infomaton = document.querySelector('.infomation');

    PlayAnimation(logo_image, "logo-animation");
    PlayAnimation(button_area, "logo-animation");

    setTimeout(() => {
        PlayAnimation(logo_image, "last-animation");
        PlayAnimation(button_area, "button-animation");
        PlayAnimation(infomaton, "infomation-animation");
    }, 21500);
}

function play() {
    kita.classList.add("exit");
    kita.classList.add("block-event");
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