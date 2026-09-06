/*!
 * Ghost Fibers adapted from https://reactbits.dev/backgrounds/ghost-fibers
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

const VERTEX = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

// GLSL ES 1.00 keeps the same fiber field on WebGL 1, including mobile Safari.
// The theme already supplies the paper grain, so the shader only draws fibers.
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uResolution;
uniform float uTime;
uniform float uDark;
uniform vec3 uBackdrop;

void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - uResolution) / max(uResolution.y, uResolution.x * 0.5);
    float time = uTime * 0.2;
    float angle = time * 0.25;
    vec2 p = mat2(cos(angle), -sin(angle), sin(angle), cos(angle)) * uv / 2.0;
    vec3 lineColor = vec3(0.078431, 0.054902, 0.207843);
    vec3 glowColor = vec3(0.203922, 0.215686, 0.627451);
    vec3 color = vec3(0.0);
    float fiberField = 0.0;

    for (int index = 0; index < 4; index++) {
        float fi = float(index) + 1.0;
        p += 0.015 * sin(p.yx * fi * 3.0 + time * (0.15 + fi * 0.08));
        float radius = length(p);
        float polarAngle = atan(p.y, p.x);
        polarAngle += sin(radius * 5.0 - time * 1.2 + fi) * 0.1;
        p = vec2(cos(polarAngle), sin(polarAngle)) * radius;
        float lines = abs(sin(p.x * (5.0 + fi * 2.0) + sin(p.y * 3.0 + time)));
        lines = pow(max(0.0, 1.0 - lines), 16.0);
        fiberField += lines / fi;
        color += lineColor * lines / fi;
        float glow = exp(-10.0 * abs(sin(p.x * 3.0 + time + fi)));
        color += glowColor * glow * 1.6 / (fi * 2.0);
    }

    float center = exp(-2.2 * dot(uv, uv));
    float cloud = exp(-1.5 * length(uv + vec2(sin(time * 0.3) * 0.25, cos(time * 0.25) * 0.18)));
    float edgeFade = mix(0.2, 1.0, 1.0 - smoothstep(0.35, 1.45, length(uv)));
    color += max(lineColor * 0.85567 - glowColor * 0.06186, vec3(0.0)) * center;
    color += (lineColor * 0.19588 + glowColor * 0.2268) * cloud;
    color = 1.0 - exp(-color * edgeFade * 2.0);
    color.b *= 1.25;
    vec3 outputColor;
    if (uDark > 0.5) {
        outputColor = uBackdrop + color * 0.72;
    } else {
        // Pigment-like shading keeps the brightest areas within the paper color.
        float bands = smoothstep(0.08, 0.9, color.b);
        float fibers = 1.0 - exp(-fiberField * edgeFade);
        outputColor = mix(uBackdrop, vec3(0.6), bands * 0.34 + fibers * 0.06);
    }
    gl_FragColor = vec4(clamp(outputColor, 0.0, 1.0), 1.0);
}
`;

const FRAME_INTERVAL = 1000 / 30;

export function enhanceGhostFibers(dark) {
    const host = document.querySelector(".hero, .post-template .art-head");
    if (!host) return;

    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: "low-power"
    });
    // A decorative background must never block reading on devices without WebGL.
    if (!gl) return;

    const program = gl.createProgram();
    const shaders = [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]].map(([type, source]) => {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        gl.attachShader(program, shader);
        return shader;
    });
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn("Ghost Fibers could not initialize:", gl.getProgramInfoLog(program), ...shaders.map((shader) => gl.getShaderInfoLog(shader)));
        shaders.forEach((shader) => gl.deleteShader(shader));
        gl.deleteProgram(program);
        return;
    }
    shaders.forEach((shader) => gl.deleteShader(shader));
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    const uniforms = Object.fromEntries(["uResolution", "uTime", "uDark", "uBackdrop"].map((name) => [name, gl.getUniformLocation(program, name)]));

    canvas.className = "ghost-fibers";
    canvas.setAttribute("aria-hidden", "true");
    const header = document.querySelector(".site-head");
    const topMarker = document.createElement("span");
    topMarker.className = "fibers-top-marker";
    topMarker.setAttribute("aria-hidden", "true");
    document.body.classList.add("has-ghost-fibers");
    document.body.prepend(topMarker, canvas);
    header.classList.toggle("is-at-top", window.scrollY <= 0);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let disposed = false;
    let frameId = 0;
    let elapsed = 0;
    let previousTime = 0;
    let lastRender = 0;

    function render() {
        gl.uniform1f(uniforms.uTime, elapsed);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    function setTheme(isDark) {
        if (disposed) return;
        const backdrop = getComputedStyle(host).getPropertyValue("--bg").trim();
        const rgb = backdrop.slice(1).match(/.{2}/g).map((channel) => parseInt(channel, 16) / 255);
        gl.uniform3fv(uniforms.uBackdrop, rgb);
        gl.uniform1f(uniforms.uDark, Number(isDark));
        render();
    }

    function resize() {
        // CSS-pixel resolution and 30 fps bound GPU work on high-DPI phones.
        canvas.style.height = `${Math.ceil(host.getBoundingClientRect().bottom + window.scrollY)}px`;
        canvas.width = Math.max(1, Math.round(canvas.clientWidth));
        canvas.height = Math.max(1, Math.round(canvas.clientHeight));
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        render();
    }

    function stop() {
        cancelAnimationFrame(frameId);
        frameId = 0;
    }

    function tick(now) {
        elapsed += Math.min((now - previousTime) / 1000, 0.1);
        previousTime = now;
        if (now - lastRender >= FRAME_INTERVAL) {
            render();
            lastRender = now - (now - lastRender) % FRAME_INTERVAL;
        }
        frameId = requestAnimationFrame(tick);
    }

    function syncAnimation() {
        stop();
        if (visible && !document.hidden && !reducedMotion.matches) {
            previousTime = performance.now();
            frameId = requestAnimationFrame(tick);
        }
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resizeObserver.observe(host);
    resizeObserver.observe(header);
    const intersectionObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (entry.target === topMarker) header.classList.toggle("is-at-top", entry.intersectionRatio === 1);
            else visible = entry.isIntersecting;
        }
        syncAnimation();
    }, {threshold: [0, 1]});
    intersectionObserver.observe(host);
    intersectionObserver.observe(topMarker);
    document.addEventListener("visibilitychange", syncAnimation);
    reducedMotion.addEventListener("change", syncAnimation);
    window.addEventListener("pagehide", stop);
    window.addEventListener("pageshow", syncAnimation);

    canvas.addEventListener("webglcontextlost", () => {
        disposed = true;
        stop();
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        document.removeEventListener("visibilitychange", syncAnimation);
        reducedMotion.removeEventListener("change", syncAnimation);
        window.removeEventListener("pagehide", stop);
        window.removeEventListener("pageshow", syncAnimation);
        canvas.remove();
        topMarker.remove();
        header.classList.remove("is-at-top");
        document.body.classList.remove("has-ghost-fibers");
    }, {once: true});

    resize();
    setTheme(dark);
    return setTheme;
}
