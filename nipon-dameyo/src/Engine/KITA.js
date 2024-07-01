const originalQuerySelector = Document.prototype.querySelector;
const originalQuerySelectorAll = Document.prototype.querySelectorAll;


function PlayAudio(src, volume = 1.0) {
    write("PlayAudio", {"src" : src, "volume" : volume});
    var audio = document.createElement('audio');
    audio.src = src;
    document.body.appendChild(audio);
    audio.play();
    audio.volume = volume;
    audio.onended = () => {
        write("PlayAudio", `Destroyed ${src}`);
        audio.remove();
    };
}

function PlayAnimation(target, className, reset = false) {
    write("PlayAnimation", {"className" : className, "reset" : reset});
    target.classList.add(className);
    if (reset) {
        target.addEventListener('animationend', () => {
            write("PlayAnimation", `${className} is reset!`);
            target.classList.remove(className);
            target.removeEventListener('animationend', null);
        });
    }
}

function EngineInit() {
    kita = document.querySelector('kita-layer');
    logger = document.querySelector('kita-logger');
    customElements.define('kita-fps', KitaFPS);

    Document.prototype.querySelector = function(selector) {
        const result = originalQuerySelector.call(this, selector);
        write("querySelector", selector);
        return result;
    };

    Document.prototype.querySelectorAll = function(selector) {
        const result = originalQuerySelectorAll.call(this, selector);
        write("querySelectorAll", selector);
        return result;
    };

    write("KITA Engine initialization", "Start");

    window_button = document.querySelectorAll('button');
    write("Interaction Register", "Start");
    window_button.forEach(i => {
        write("Interaction Register", i);
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

    write("Interaction Register", "End");

    write("KITA Engine initialization", "End");
}

function randint(min, max) {
    result = Math.floor(Math.random() * (max - min + 1)) + min;
    write("randint", {"mix" : min, "max" : max, "result" : result});
    return result
}

function write(head, content) {
    console.log(head, content);

    if (logger.innerHTML.length > 5000) {
        logger.innerText = "";
    }

    try {
        if (content instanceof HTMLElement) {
            ftent = JSON.stringify(getAttributes(content));
        }
        else if (typeof content === 'object') {
            ftent = JSON.stringify(content);
        } else {
            ftent = content;
        }
        logger.innerHTML += `<br><b>${head}</b> -> `;
        logger.innerText += ` ${ftent}`;
    } catch {
        console.error("Debuuger is Not Availed!");
    }
}

function getAttributes(el) {
    return Array.from(el.attributes)
        .map(a => [a.name, a.value])
        .reduce((acc, attr) => {
        acc[attr[0]] = attr[1]
        return acc
        }, {})
}

class KitaFPS extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <canvas id="fps-canvas" width="480px" height="72px"></canvas>
        `;
        this.canvas = this.shadowRoot.querySelector('#fps-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.frameTimes = [];
    }

    connectedCallback() {
        this.startMonitoring();
    }

    startMonitoring() {
        let lastFrameTime = performance.now();

        const update = () => {
            const now = performance.now();
            const delta = now - lastFrameTime;
            const fps = 1000 / delta;
            lastFrameTime = now;

            this.frameTimes.push({ time: now, fps: fps });
            this.frameTimes = this.frameTimes.filter(frame => now - frame.time <= 15000);

            this.drawGraph(fps);

            requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }

    drawGraph(currentFPS) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        const width = canvas.width;
        const height = canvas.height;
        const maxFPS = 144;

        ctx.clearRect(0, 0, width, height);


        ctx.beginPath();
        ctx.moveTo(0, height);

        const now = performance.now();
        const fifteenSecondsAgo = now - 15000;

        this.frameTimes.forEach(frame => {
            const x = (frame.time - fifteenSecondsAgo) / 15000 * width;
            const y = height - (frame.fps / maxFPS * height);
            ctx.lineTo(x, y);
        });

        ctx.lineTo(width, height);
        ctx.closePath();

        if (currentFPS >= 30) {
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; 
        } else {
            ctx.fillStyle = 'rgba(255, 0, 0, 0.75)';
        }

        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.font = '18px monospace';
        ctx.fillText(`${Math.round(currentFPS)}`, width - 28, height - 10);
    }
}