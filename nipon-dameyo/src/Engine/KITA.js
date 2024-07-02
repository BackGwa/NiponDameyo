const originalQuerySelector = Document.prototype.querySelector;
const originalQuerySelectorAll = Document.prototype.querySelectorAll;
const originalSetTimeout = window.setTimeout;
let ConsoleWarn = console.warn;
let ConsoleError = console.error;

function PlayAudio(src, volume = 1.0) {
    try {
        write("PlayAudio", { "src": src, "volume": volume }, false, false, true);
        var audio = document.createElement('audio');
        audio.src = src;
        document.body.appendChild(audio);
        audio.play();
        audio.volume = volume;
        audio.onended = () => {
            write("PlayAudio", `Destroyed ${src}`, false, false, false, true);
            audio.remove();
        };
    } catch (e) {
        console.error(e);
    }
}

function PlayAnimation(target, className, reset = false) {
    try {
        write("PlayAnimation", { "className": className, "reset": reset }, false, false, true);
        target.classList.add(className);
        if (reset) {
            target.addEventListener('animationend', () => {
                write("PlayAnimation", `${className} is reset!`, false, false, false, true);
                target.classList.remove(className);
                target.removeEventListener('animationend', null);
            });
        }
    } catch (e) {
        console.error(e);
    }
}

function EngineInit() {
    kita = document.querySelector('kita-layer');
    logger = document.querySelector('kita-logger');
    var_monitor = document.querySelector("var-monitor");
    customElements.define('kita-fps', KitaFPS);

    try {
        Document.prototype.querySelector = function (selector) {
            const result = originalQuerySelector.call(this, selector);
            write("querySelector", selector, false, false, false, false, true);
            return result;
        };

        Document.prototype.querySelectorAll = function (selector) {
            const result = originalQuerySelectorAll.call(this, selector);
            write("querySelectorAll", selector, false, false, false, false, true);
            return result;
        };

        window.setTimeout = function (callback, delay, ...args) {
            write("Start Timeout", `${delay}ms`, false, false, true);
            const wrappedCallback = () => {
                write("End Timeout", `${delay}ms`, false, false, false, true);
                callback(...args);
            };

            return originalSetTimeout(wrappedCallback, delay);
        };

        console.warn = function () {
            var message = [].join.call(arguments, " ");
            write("WARNING", `${message}`, true, false);
            ConsoleWarn.apply(console, arguments);
        };

        console.error = function () {
            var message = [].join.call(arguments, " ");
            write("ERROR", `${message}`, false, true);
            ConsoleError.apply(console, arguments);
        };

        write("KITA Engine initialization", "Start", false, false, true);

        console.warn("Logger Test 1");
        console.error("Logger Test 2");

        window_button = document.querySelectorAll('button');
        write("Interaction Register", "Start", false, false, true);
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
        write("Interaction Register", "End", false, false, false, true);

        write("KITA Engine initialization", "End", false, false, false, true);
    } catch (e) {
        console.error(e);
    }
}

function randint(min, max) {
    try {
        result = Math.floor(Math.random() * (max - min + 1)) + min;
        write("randint", { "mix": min, "max": max, "result": result });
        return result
    } catch (e) {
        console.error(e);
        return min;
    }
}

function write(head, content, warn = false, error = false, warp1 = false, warp2 = false, warp3 = false) {
    console.log(head, content);

    if (logger.innerHTML.length > 6000) {
        logger.innerHTML = logger.innerText.substring(3000, 3000);
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

        if (warn) {
            logger.innerHTML += `<pre class="warning">${head} -> ${ftent}</pre>`;
        } else if (error) {
            logger.innerHTML += `<pre class="error">${head} -> ${ftent}</pre>`;
        } else if (warp1) {
            logger.innerHTML += `<pre class="warp1">${head} -> ${ftent}</pre>`;
        } else if (warp2) {
            logger.innerHTML += `<pre class="warp2">${head} -> ${ftent}</pre>`;
        } else if (warp3) {
            logger.innerHTML += `<pre class="warp3">${head} -> ${ftent}</pre>`;
        } else {
            logger.innerHTML += `<pre>${head} -> ${ftent}</pre>`;
        }

    } catch (e) {
        console.error(e);
    }
}

function getAttributes(el) {
    try {
        return Array.from(el.attributes)
            .map(a => [a.name, a.value])
            .reduce((acc, attr) => {
                acc[attr[0]] = attr[1]
                return acc
            }, {})
    } catch (e) {
        console.error(e);
    }
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
        ctx.font = '20px monospace';
        ctx.fillText(`${Math.round(currentFPS)}`, width - 28, height - 6);
    }
}

function monitor() {
    write("Variable Monitor", "Sync Start", false, false, true);
    try {
        var_monitor.innerHTML = "";
        for (let key in window) {
            if (window.hasOwnProperty(key)) {
                var_monitor.innerHTML += `
                    <div class="m-item">
                        <div class="m-title">${key}</div>
                        <pre class="m-value">${String(window[key]).replace(/</g, "＜").replace(/>/g, "＞")}</pre>
                    </div>
                `
            }
        }
        var_monitor.innerHTML += `<button onclick="monitor();">Variable Sync</button>`;
        write("Variable Monitor", "Sync End", false, false, false, true);
    } catch (e) {
        console.error(e);
    }
}