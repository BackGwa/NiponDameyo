function init() {
    EngineInit();
    logo_image = document.querySelector('.logo-image');
    button_area = document.querySelector('.button-area');
    infomaton = document.querySelector('.infomation');

    PlayAnimation(logo_image, "logo-animation");

    setTimeout(() => {
        PlayAnimation(button_area, "button-animation");
        PlayAnimation(infomaton, "infomation-animation");
    }, 10000);
}

function exit() {
    kita.classList.add("exit");
    setTimeout(() => {
        location.href = "about:blank";
    }, 3500)
}