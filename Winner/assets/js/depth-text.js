/*!
 * Depth Text adapted from https://reactbits.dev/text-animations/depth-text
 * MIT + Commons Clause License Condition v1.0
 * Copyright (c) 2026 David Haz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, and distribute the Software as part of
 * an application, website, or product, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * Commons Clause Restriction
 * You may use this Software, including for any commercial purpose, so long as
 * you do not sell, sublicense, or redistribute the components themselves-whether
 * alone, in a bundle, or as a ported version.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const TILT = 7.5;
const BASE_ROTATION = {x: -2.4, y: 3.15};
const LAYERS = 34;

export function getDepthTextRotation(clientX, clientY, rect) {
    const x = Math.max(-1, Math.min(1, (clientX - rect.left - rect.width / 2) / (rect.width * 0.8)));
    const y = Math.max(-1, Math.min(1, (clientY - rect.top - rect.height / 2) / (rect.height * 0.8)));
    return {x: BASE_ROTATION.x - y * TILT, y: BASE_ROTATION.y + x * TILT};
}

export function enhanceHeroTitle() {
    const title = document.querySelector(".hero-title");
    if (!title) return;

    const face = document.createElement("span");
    face.className = "hero-title-face";
    face.append(...title.childNodes);

    const stage = document.createElement("span");
    stage.className = "hero-title-stage";
    for (let index = LAYERS; index > 0; index--) {
        const layer = face.cloneNode(true);
        layer.className = "hero-title-layer";
        layer.setAttribute("aria-hidden", "true");
        layer.style.transform = `translateZ(${-index * 0.02}em)`;
        layer.style.setProperty("--depth-face-mix", `${Math.round((1 - (index / LAYERS) ** 2) * 72 + 4)}%`);
        stage.append(layer);
    }
    stage.append(face);
    title.append(stage);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hero = title.closest(".hero");
    const current = {...BASE_ROTATION};
    let target = {...BASE_ROTATION};
    let pointerActive = false;
    let inView = false;
    let frameId = 0;
    const startTime = performance.now();

    hero.addEventListener("pointermove", (event) => {
        if (reducedMotion.matches || !finePointer.matches || event.pointerType === "touch") return;
        pointerActive = true;
        target = getDepthTextRotation(event.clientX, event.clientY, title.getBoundingClientRect());
    });
    function releasePointer() {
        pointerActive = false;
    }
    hero.addEventListener("pointerleave", releasePointer);
    window.addEventListener("blur", releasePointer);

    function tick(now) {
        if (!pointerActive) {
            const orbit = (now - startTime) / 1000 * 0.35 * Math.PI * 2;
            const amount = TILT * (finePointer.matches ? 0.18 : 0.55);
            target = {
                x: BASE_ROTATION.x + Math.sin(orbit) * amount,
                y: BASE_ROTATION.y + Math.cos(orbit * 0.85) * amount
            };
        }
        current.x += (target.x - current.x) * 0.14;
        current.y += (target.y - current.y) * 0.14;
        stage.style.transform = `rotateX(${current.x.toFixed(3)}deg) rotateY(${current.y.toFixed(3)}deg)`;
        frameId = requestAnimationFrame(tick);
    }

    function syncAnimation() {
        cancelAnimationFrame(frameId);
        if (reducedMotion.matches) {
            pointerActive = false;
            Object.assign(current, BASE_ROTATION);
            stage.style.transform = "";
            return;
        }
        if (inView) frameId = requestAnimationFrame(tick);
    }

    new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        syncAnimation();
    }).observe(title);
    reducedMotion.addEventListener("change", syncAnimation);
}
