import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {enhanceComments} from "../assets/js/comments.js";

const {config} = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const status = {hidden: false, textContent: "评论加载中…"};
const section = {
    hidden: true,
    dataset: {
        twikooEnvId: config.custom.comments_twikoo_env_id.default,
        twikooJsUrl: config.custom.comments_twikoo_js_url.default
    },
    querySelector: () => status
};
const scripts = [];
const calls = [];
const errors = [];
let onPage = true;
let loadError = false;
let initError = false;

globalThis.window = {
    __ghost_twikoo_env_id: "https://unused.example.com",
    twikoo: {
        init: async (options) => {
            calls.push(options);
            if (initError) throw new Error("Twikoo initialization failed.");
        }
    }
};
globalThis.document = {
    querySelector: () => onPage ? section : null,
    createElement: () => new EventTarget(),
    head: {
        append(script) {
            scripts.push(script);
            queueMicrotask(() => script.dispatchEvent(new Event(loadError ? "error" : "load")));
        }
    }
};

await enhanceComments();
assert.equal(section.hidden, true);
assert.equal(scripts.length, 0);

section.dataset.twikooEnvId = " \n ";
await enhanceComments();
assert.equal(section.hidden, true);
assert.equal(scripts.length, 0);

section.dataset.twikooEnvId = " https://comments.example.com ";
onPage = false;
await enhanceComments();
assert.equal(scripts.length, 0);

onPage = true;
await enhanceComments();
assert.equal(section.hidden, false);
assert.equal(status.hidden, true);
assert.equal(scripts[0].async, true);
assert.equal(scripts[0].src, "https://cdn.jsdelivr.net/npm/twikoo@1.6.34/dist/twikoo.all.min.js");
assert.deepEqual(calls, [{el: "#vcomments", envId: "https://comments.example.com", lang: "zh-CN"}]);
assert.equal("path" in calls[0], false, "Keep Brave's default comment thread identity.");

section.dataset.twikooJsUrl = "https://static.example.com/twikoo.js";
await enhanceComments();
assert.equal(scripts[1].src, section.dataset.twikooJsUrl);

const originalError = console.error;
console.error = (...args) => errors.push(args);
try {
    for (const failure of ["load", "init"]) {
        status.hidden = false;
        loadError = failure === "load";
        initError = failure === "init";
        const previousCalls = calls.length;
        await enhanceComments();
        assert.equal(status.hidden, false);
        assert.equal(status.textContent, "评论加载失败，请稍后刷新页面。");
        assert.equal(calls.length, previousCalls + (loadError ? 0 : 1));
    }
    assert.equal(errors.length, 2);
    assert.ok(errors.every(([, error]) => error instanceof Error));

    for (const url of ["", "javascript:alert(1)", "data:text/javascript,alert(1)"]) {
        section.dataset.twikooJsUrl = url;
        status.hidden = false;
        const previousScripts = scripts.length;
        await enhanceComments();
        assert.equal(scripts.length, previousScripts);
        assert.equal(status.hidden, false);
        assert.equal(status.textContent, "评论加载失败，请稍后刷新页面。");
    }
} finally {
    console.error = originalError;
    delete globalThis.window;
    delete globalThis.document;
}

console.log("Comment loading, configuration, thread identity and visible failure checks passed.");
