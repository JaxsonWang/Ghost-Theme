import "../css/index.css";
import {enhanceLinksPage} from "./links.js";
import {highlightCodeBlocks} from "./syntax-highlight.js";
import {enhanceHeroTitle} from "./depth-text.js";
import {enhanceGhostFibers} from "./ghost-fibers.js";
import {enhanceCardEffects} from "./card-effects.js";

(function () {
    "use strict";

    const root = document.documentElement;
    const storeKey = "winner-theme";
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const themeNames = {auto: "自动", light: "亮色", dark: "暗色"};
    const darkSearchStyles = `
        :root { color-scheme: dark; }
        body { background: transparent !important; color: #e9e7e1; }
        body > div:first-child { background: rgba(13, 14, 18, 0.72) !important; }
        .bg-white { background-color: #15171d !important; }
        .bg-neutral-100 { background-color: #1a1d25 !important; }
        .bg-neutral-200, .bg-neutral-300 { background-color: #242832 !important; }
        input { background: transparent !important; color: #e9e7e1 !important; }
        .text-neutral-800, .text-neutral-900 { color: #e9e7e1 !important; }
        .text-neutral-400, .text-neutral-500, input::placeholder { color: #9aa0ad !important; }
        .border-gray-200, .border-neutral-200 { border-color: rgba(233, 231, 225, 0.18) !important; }
    `;

    function usesDarkTheme() {
        const theme = root.getAttribute("data-theme");
        return theme === "dark" || (!theme && colorScheme.matches);
    }

    const paintFibersTheme = enhanceGhostFibers(usesDarkTheme());

    function paintSearchTheme() {
        const frameDocument = document.querySelector("#sodo-search-root iframe")?.contentDocument;
        if (!frameDocument?.head) return;
        let style = frameDocument.getElementById("winner-search-theme");
        if (!style) {
            style = frameDocument.createElement("style");
            style.id = "winner-search-theme";
            style.textContent = darkSearchStyles;
            frameDocument.head.append(style);
        }
        style.disabled = !usesDarkTheme();
    }

    function bindSearchTheme() {
        const frame = document.querySelector("#sodo-search-root iframe");
        if (!frame) return false;
        frame.addEventListener("load", paintSearchTheme);
        paintSearchTheme();
        return true;
    }

    function paintThemePicker() {
        const mode = root.getAttribute("data-theme-mode") || "auto";
        document.querySelectorAll("[data-theme-trigger]").forEach((trigger) => {
            const label = `主题模式：${themeNames[mode]}`;
            trigger.setAttribute("aria-label", label);
            trigger.setAttribute("title", label);
        });
        document.querySelectorAll("[data-theme-option]").forEach((option) => {
            option.setAttribute("aria-checked", String(option.dataset.themeOption === mode));
        });
    }

    function setThemeMode(mode) {
        root.setAttribute("data-theme-mode", mode);
        if (mode === "auto") root.removeAttribute("data-theme");
        else root.setAttribute("data-theme", mode);
        try {
            localStorage.setItem(storeKey, mode);
        } catch (error) {}
        paintThemePicker();
        paintSearchTheme();
        paintFibersTheme?.(usesDarkTheme());
    }

    document.addEventListener("click", (event) => {
        if (!(event.target instanceof Element)) return;
        const option = event.target.closest("[data-theme-option]");
        if (option) {
            setThemeMode(option.dataset.themeOption);
            option.closest("[data-theme-picker]").removeAttribute("open");
            return;
        }
        document.querySelectorAll("[data-theme-picker][open]").forEach((picker) => {
            if (!picker.contains(event.target)) picker.removeAttribute("open");
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;
        const picker = document.querySelector("[data-theme-picker][open]");
        if (!picker) return;
        picker.removeAttribute("open");
        picker.querySelector("[data-theme-trigger]").focus();
    });

    colorScheme.addEventListener("change", () => {
        if (root.getAttribute("data-theme-mode") === "auto") {
            paintSearchTheme();
            paintFibersTheme?.(usesDarkTheme());
        }
    });

    const searchFrameObserver = new MutationObserver(bindSearchTheme);

    function observeSearchRoot() {
        const searchRoot = document.querySelector("#sodo-search-root");
        if (!searchRoot) return false;
        searchFrameObserver.observe(searchRoot, {childList: true});
        bindSearchTheme();
        return true;
    }

    if (!observeSearchRoot()) {
        const searchRootObserver = new MutationObserver(() => {
            if (!observeSearchRoot()) return;
            searchRootObserver.disconnect();
        });
        searchRootObserver.observe(document.body, {childList: true});
    }

    paintThemePicker();

    enhanceLinksPage();
    enhanceCardEffects();
    highlightCodeBlocks();
    enhanceHeroTitle();

    const revealables = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
        revealables.forEach((element) => element.classList.add("is-in"));
    } else {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-in");
                revealObserver.unobserve(entry.target);
            });
        }, {rootMargin: "0px 0px -12% 0px", threshold: 0.08});

        revealables.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index, 4) * 70}ms`;
            revealObserver.observe(element);
        });
    }

    const toc = document.querySelector("[data-toc]");
    if (!toc) return;

    const headings = [...document.querySelectorAll(".gh-content h2[id], .gh-content h3[id]")];
    if (!headings.length) return;

    toc.replaceChildren(...headings.map((heading) => {
        const link = document.createElement("a");
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent;
        if (heading.tagName === "H3") link.className = "toc-sub";
        return link;
    }));

    if (!("IntersectionObserver" in window)) return;

    const linksById = new Map([...toc.querySelectorAll("a")].map((link) => [link.hash.slice(1), link]));
    const visibleHeadings = new Set();

    function paintActiveHeading() {
        const active = headings.find((heading) => visibleHeadings.has(heading.id));
        if (!active) return;
        linksById.forEach((link, id) => link.classList.toggle("is-active", id === active.id));
    }

    const headingObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) visibleHeadings.add(entry.target.id);
            else visibleHeadings.delete(entry.target.id);
        });
        paintActiveHeading();
    }, {rootMargin: "-15% 0px -70% 0px", threshold: 0});

    headings.forEach((heading) => headingObserver.observe(heading));
}());
