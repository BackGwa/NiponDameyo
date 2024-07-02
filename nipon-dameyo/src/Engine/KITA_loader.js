
try {
    window.onload = () => {
        init();
        // debug();
    }
} catch (e) {
    console.error(e);
}

function debug() {
    if (document.body.classList.contains('debugmode')) {
        document.body.classList.remove('debugmode');
    } else {
        document.body.classList.add('debugmode');
    }
}