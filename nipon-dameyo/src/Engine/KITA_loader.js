
const DEBUG = false;

try {
    document.addEventListener('DOMContentLoaded', () => {
        EngineInit();
        debug(DEBUG);
        write("KITA ENGINE", "Render Start", false, false, true);
    });

    window.onload = () => {
        write("KITA ENGINE", "Render End", false, false, false, true);
        write("KITA ENGINE", "Layer Script Start", false, false, true);
        init();
        write("KITA ENGINE", "Layer Script End", false, false, false, true);
    };
} catch (e) {
    console.error(e);
}

function debug(can) {
    if (can) {
        if (document.body.classList.contains('debugmode')) {
            document.body.classList.remove('debugmode');
        } else {
            document.body.classList.add('debugmode');
        }
    }
}