/*!
 * Border Glow, Spotlight Card and Profile Card adapted from https://reactbits.dev
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

export function getCardPointer(clientX, clientY, rect) {
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const dx = x - rect.width / 2;
    const dy = y - rect.height / 2;
    return {
        x,
        y,
        angle: (Math.atan2(dy, dx) * 180 / Math.PI + 450) % 360,
        edge: Math.min(1, Math.max(Math.abs(dx) / (rect.width / 2), Math.abs(dy) / (rect.height / 2))) * 100
    };
}

export function enhanceCardEffects() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    document.querySelectorAll(".post-link, .pager-card, .friend-card").forEach((card) => {
        if (card.matches(".post-link, .pager-card")) {
            const light = document.createElement("span");
            light.className = "card-edge-light";
            light.setAttribute("aria-hidden", "true");
            card.append(light);
        }

        card.addEventListener("pointermove", (event) => {
            if (reducedMotion.matches || !finePointer.matches || event.pointerType === "touch") return;
            const pointer = getCardPointer(event.clientX, event.clientY, card.getBoundingClientRect());
            card.style.setProperty("--pointer-x", `${pointer.x}px`);
            card.style.setProperty("--pointer-y", `${pointer.y}px`);
            card.style.setProperty("--cursor-angle", `${pointer.angle}deg`);
            card.style.setProperty("--edge-proximity", String(pointer.edge));
        });
    });
}
