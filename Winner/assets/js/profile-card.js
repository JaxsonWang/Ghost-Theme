/* Profile Card: license and copyright notice in card-effects.js. */
import {getCardPointer} from "./card-effects.js";

export function parseAboutProfile(text) {
    if (!text.trim()) return null;
    const data = JSON.parse(text);
    for (const field of ["name", "title", "avatarUrl"]) {
        if (typeof data?.[field] !== "string" || !data[field].trim()) {
            throw new TypeError(`about_profile.${field} must be a non-empty string.`);
        }
    }
    const avatar = new URL(data.avatarUrl);
    if (!["http:", "https:"].includes(avatar.protocol)) {
        throw new TypeError("about_profile.avatarUrl must be an HTTP(S) URL.");
    }
    return {name: data.name.trim(), title: data.title.trim(), avatarUrl: avatar.href};
}

export function getProfilePointer(clientX, clientY, rect) {
    const pointer = getCardPointer(clientX, clientY, rect);
    const x = Math.min(100, Math.max(0, pointer.x / rect.width * 100));
    const y = Math.min(100, Math.max(0, pointer.y / rect.height * 100));
    return {x, y, rotateX: (y - 50) / 4, rotateY: (50 - x) / 5};
}

export function advanceProfileTilt(current, target, elapsed, tau = 140) {
    const amount = 1 - Math.exp(-elapsed / tau);
    return {
        x: current.x + (target.x - current.x) * amount,
        y: current.y + (target.y - current.y) * amount
    };
}

function animateProfileCard(card) {
    const shell = card.querySelector(".profile-card-shell");
    const motion = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let current = {x: shell.clientWidth - 70, y: 60};
    let target = {x: shell.clientWidth / 2, y: shell.clientHeight / 2};
    let initialUntil = performance.now() + 1200;
    let frameId = null;
    let lastTime = null;
    let enterTimer;

    function paint() {
        const pointer = getProfilePointer(current.x, current.y, {
            left: 0, top: 0, width: shell.clientWidth, height: shell.clientHeight
        });
        const round = (value) => Math.round(value * 1000) / 1000;
        const properties = {
            "--pointer-x": `${pointer.x}%`,
            "--pointer-y": `${pointer.y}%`,
            "--background-x": `${round(35 + pointer.x * 0.3)}%`,
            "--background-y": `${round(35 + pointer.y * 0.3)}%`,
            "--pointer-from-center": Math.min(1, Math.hypot(pointer.x - 50, pointer.y - 50) / 50),
            "--pointer-from-left": pointer.x / 100,
            "--pointer-from-top": pointer.y / 100,
            "--rotate-x": `${round(pointer.rotateY)}deg`,
            "--rotate-y": `${round(pointer.rotateX)}deg`
        };
        for (const [name, value] of Object.entries(properties)) card.style.setProperty(name, String(value));
    }

    function step(time) {
        frameId = null;
        current = advanceProfileTilt(current, target, time - (lastTime ?? time), time < initialUntil ? 600 : 140);
        lastTime = time;
        const moving = Math.abs(target.x - current.x) > 0.05 || Math.abs(target.y - current.y) > 0.05;
        if (!moving) current = {...target};
        paint();
        if (moving) frameId = requestAnimationFrame(step);
        else lastTime = null;
    }

    function start() {
        if (frameId === null) frameId = requestAnimationFrame(step);
    }

    function reset() {
        cancelAnimationFrame(frameId);
        clearTimeout(enterTimer);
        frameId = null;
        lastTime = null;
        initialUntil = 0;
        shell.classList.remove("entering");
        current = target = {x: shell.clientWidth / 2, y: shell.clientHeight / 2};
        paint();
    }

    function move(event) {
        if (!motion.matches || event.pointerType === "touch") return;
        const rect = shell.getBoundingClientRect();
        target = {x: event.clientX - rect.left, y: event.clientY - rect.top};
        start();
    }

    shell.addEventListener("pointerenter", (event) => {
        if (!motion.matches || event.pointerType === "touch") return;
        shell.classList.add("entering");
        clearTimeout(enterTimer);
        enterTimer = setTimeout(() => shell.classList.remove("entering"), 180);
        move(event);
    });
    shell.addEventListener("pointermove", move);
    shell.addEventListener("pointerleave", () => {
        if (!motion.matches) return;
        target = {x: shell.clientWidth / 2, y: shell.clientHeight / 2};
        start();
    });
    shell.addEventListener("pointercancel", reset);
    motion.addEventListener("change", reset);
    window.addEventListener("resize", reset);

    if (motion.matches) {
        paint();
        start();
    }
}

export function enhanceAboutProfile() {
    const template = document.querySelector("[data-about-profile]");
    if (!template) return;

    let profile;
    try {
        profile = parseAboutProfile(template.dataset.aboutProfile);
    } catch (error) {
        console.error("Winner: invalid about_profile setting.", error);
        return;
    }
    if (!profile) return;

    const content = template.parentElement.querySelector(".gh-content");
    const heading = [...content.children].find((node) =>
        node.matches("h2, h3, h4") && node.textContent.trim() === "简介"
    );
    if (!heading) {
        console.error('Winner: the about page needs a "简介" heading for the profile card.');
        return;
    }

    const card = template.content.firstElementChild.cloneNode(true);
    card.querySelector(".profile-card-name").textContent = profile.name;
    card.querySelector(".profile-card-title").textContent = profile.title;
    const avatar = card.querySelector(".profile-card-avatar");
    avatar.src = profile.avatarUrl;
    avatar.alt = profile.name;

    const intro = document.createElement("div");
    intro.className = "about-profile-intro";
    const copy = document.createElement("div");
    copy.className = "about-profile-copy prose";
    heading.before(intro);
    let paragraph = heading.nextElementSibling;
    copy.append(heading);
    // Keep the introductory paragraphs together; the next content block stays full width.
    while (paragraph?.matches("p")) {
        const next = paragraph.nextElementSibling;
        copy.append(paragraph);
        paragraph = next;
    }
    intro.append(copy, card);
    template.remove();
    animateProfileCard(card);
}
