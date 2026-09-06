import assert from "node:assert/strict";
import {enhanceGhostFibers} from "../assets/js/ghost-fibers.js";

function events(target = {}) {
    const listeners = new Map();
    return Object.assign(target, {
        addEventListener(name, listener) { listeners.set(name, listener); },
        removeEventListener(name) { listeners.delete(name); },
        emit(name) { listeners.get(name)?.(); }
    });
}

function classList() {
    const classes = new Set();
    classes.remove = classes.delete;
    classes.toggle = (name, enabled) => enabled ? classes.add(name) : classes.delete(name);
    return classes;
}

const uniforms = new Map();
let draws = 0;
let linked = true;
const gl = {
    VERTEX_SHADER: 1, FRAGMENT_SHADER: 2, LINK_STATUS: 3,
    ARRAY_BUFFER: 4, STATIC_DRAW: 5, FLOAT: 6, TRIANGLES: 7,
    createProgram: () => ({}),
    createShader: () => ({}),
    createBuffer: () => ({}),
    getAttribLocation: () => 0,
    getUniformLocation: (_, name) => name,
    getProgramParameter: () => linked,
    getProgramInfoLog: () => "Unsupported shader",
    getShaderInfoLog: () => "Unsupported shader",
    uniform1f: (name, value) => uniforms.set(name, value),
    uniform2f: (name, x, y) => uniforms.set(name, [x, y]),
    uniform3fv: (name, value) => uniforms.set(name, value),
    drawArrays: () => draws++
};
for (const method of ["shaderSource", "compileShader", "attachShader", "linkProgram", "deleteShader", "deleteProgram", "useProgram", "bindBuffer", "bufferData", "enableVertexAttribArray", "vertexAttribPointer", "viewport"]) {
    gl[method] = () => {};
}

let hasWebGL = true;
const canvas = events({
    clientWidth: 1600, clientHeight: 360, attributes: {}, style: {}, removed: false,
    getContext: () => hasWebGL ? gl : null,
    setAttribute(name, value) { this.attributes[name] = value; },
    remove() { this.removed = true; }
});
const topMarker = {setAttribute() {}, remove() { this.removed = true; }};
const header = {classList: classList()};
let contentBottom = 360;
const host = {getBoundingClientRect: () => ({bottom: contentBottom - window.scrollY})};
const body = {classList: classList(), prepend: (...elements) => assert.deepEqual(elements, [topMarker, canvas])};
let hasHost = true;
let background = "#0d0e12";
const motion = events({matches: false});
const frames = new Map();
let nextFrame = 0;
let resized;
let intersected;
let disconnected = 0;

globalThis.document = events({
    hidden: false,
    body,
    querySelector: (selector) => {
        if (selector === ".site-head") return header;
        assert.equal(selector, ".hero, .post-template .art-head");
        return hasHost ? host : null;
    },
    createElement: (tag) => tag === "canvas" ? canvas : topMarker
});
globalThis.window = events({scrollY: 0, matchMedia: () => motion});
globalThis.getComputedStyle = () => ({getPropertyValue: () => background});
globalThis.requestAnimationFrame = (callback) => {
    frames.set(++nextFrame, callback);
    return nextFrame;
};
globalThis.cancelAnimationFrame = (id) => frames.delete(id);
globalThis.ResizeObserver = class {
    constructor(callback) { resized = callback; }
    observe() {}
    disconnect() { disconnected++; }
};
globalThis.IntersectionObserver = class {
    constructor(callback) { intersected = callback; }
    observe() {}
    disconnect() { disconnected++; }
};

function advance(now) {
    const [id, callback] = frames.entries().next().value;
    frames.delete(id);
    callback(now);
}

// Outside the two target headers, or without WebGL, leave the page untouched.
hasHost = false;
assert.equal(enhanceGhostFibers(true), undefined);
hasHost = true;
hasWebGL = false;
assert.equal(enhanceGhostFibers(true), undefined);
assert.equal(body.classList.size, 0);
hasWebGL = true;
linked = false;
const originalWarn = console.warn;
let warning;
console.warn = (...message) => { warning = message; };
assert.equal(enhanceGhostFibers(true), undefined);
console.warn = originalWarn;
assert.match(warning.join(" "), /Unsupported shader/);
assert.equal(body.classList.size, 0);
linked = true;

const paintTheme = enhanceGhostFibers(true);
assert.equal(canvas.attributes["aria-hidden"], "true");
assert.deepEqual(uniforms.get("uResolution"), [1600, 360]);
assert.deepEqual(uniforms.get("uBackdrop"), [13 / 255, 14 / 255, 18 / 255]);
assert.equal(uniforms.get("uDark"), 1);
assert.equal(frames.size, 0);
assert.equal(canvas.style.height, "360px");
assert.equal(header.classList.has("is-at-top"), true);

// Transparency ends on the first scroll, and returns only at the document top.
for (const ratio of [0.5, 0, 1]) {
    intersected([{target: topMarker, intersectionRatio: ratio}]);
    assert.equal(header.classList.has("is-at-top"), ratio === 1);
    assert.equal(frames.size, 0);
}

intersected([{isIntersecting: true}]);
assert.equal(frames.size, 1);
let now = performance.now() + 40;
advance(now);
const firstTime = uniforms.get("uTime");
advance(now += 40);
assert.ok(uniforms.get("uTime") > firstTime, "The fibers must actually animate");
assert.equal(frames.size, 1, "Only one animation loop may run");

// Scrolling away, hiding the tab and reduced motion each stop GPU rendering.
intersected([{isIntersecting: false}]);
assert.equal(frames.size, 0);
intersected([{isIntersecting: true}]);
document.hidden = true;
document.emit("visibilitychange");
assert.equal(frames.size, 0);
document.hidden = false;
document.emit("visibilitychange");
assert.equal(frames.size, 1);
motion.matches = true;
motion.emit("change");
assert.equal(frames.size, 0);

// Theme and size still update while motion is reduced, without restarting it.
background = "#e9e7e1";
paintTheme(false);
assert.equal(uniforms.get("uDark"), 0);
assert.deepEqual(uniforms.get("uBackdrop"), [233 / 255, 231 / 255, 225 / 255]);
canvas.clientWidth = 390;
canvas.clientHeight = 420;
contentBottom = 420;
window.scrollY = 120;
resized();
assert.deepEqual(uniforms.get("uResolution"), [390, 420]);
assert.equal(canvas.style.height, "420px", "Scrolling must not shorten the background");
intersected([{target: topMarker, intersectionRatio: 0}]);
assert.equal(header.classList.has("is-at-top"), false);
assert.equal(frames.size, 0);
motion.matches = false;
motion.emit("change");
assert.equal(frames.size, 1);

window.emit("pagehide");
assert.equal(frames.size, 0);
window.emit("pageshow");
assert.equal(frames.size, 1, "Back/forward navigation resumes the existing canvas");
canvas.emit("webglcontextlost");
assert.equal(frames.size, 0);
assert.equal(canvas.removed, true);
assert.equal(body.classList.size, 0);
assert.equal(topMarker.removed, true);
assert.equal(header.classList.has("is-at-top"), false);
assert.equal(disconnected, 2);
const finalDraws = draws;
paintTheme(true);
window.emit("pageshow");
assert.equal(draws, finalDraws);
assert.equal(frames.size, 0);

console.log("Ghost Fibers: theme, header transparency, motion, sizing and WebGL lifecycle checks passed.");
