function PlayAudio(src, volume = 1.0) {
    var audio = document.createElement('audio');
    audio.src = src;
    document.body.appendChild(audio);
    audio.play();
    audio.volume = volume;
    audio.onended = () => {
        audio.remove();
    };
}

function PlayAnimation(target, className, reset = false) {
    target.classList.add(className);
    if (reset) {
        target.addEventListener('animationend', () => {
            target.classList.remove(className);
            target.removeEventListener('animationend', null);
        });
    }
}

function EngineInit() {
    kita = document.querySelector('kita-layer');

    window_button = document.querySelectorAll('button');
    window_button.forEach(i => {
        i.addEventListener('click', () => {
            PlayAudio("Asset/Audio/SE/button_click.mp3");
        });

        i.addEventListener('mouseenter', () => {
            PlayAudio("Asset/Audio/SE/button_down.mp3");
        });
        i.addEventListener('mouseleave', () => {
            PlayAudio("Asset/Audio/SE/button_up.mp3");
        })
    });
}