import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {enhanceThemeContent, parseThemeContent} from "../assets/js/theme-content.js";

const {config} = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
assert.ok(Object.keys(config.custom).length <= 20);
for (const name of ["hero", "homepage_about", "footer"]) {
    assert.deepEqual(parseThemeContent(name, config.custom[name].default), JSON.parse(config.custom[name].default));
    assert.equal(parseThemeContent(name, " \n "), null);
    for (const invalid of ["{", "null", "[]", "{}", "123"]) {
        assert.throws(() => parseThemeContent(name, invalid));
    }
}

const about = JSON.parse(config.custom.homepage_about.default);
for (const ctaUrl of ["/about/", "../about/", "https://example.com/about/", "#about"]) {
    assert.equal(parseThemeContent("homepage_about", JSON.stringify({...about, ctaUrl})).ctaUrl, ctaUrl);
}
for (const ctaUrl of ["javascript:alert(1)", "java\nscript:alert(1)", "data:text/html,test", "file:///tmp/test"]) {
    assert.throws(() => parseThemeContent("homepage_about", JSON.stringify({...about, ctaUrl})), TypeError);
}
assert.throws(() => parseThemeContent("homepage_about", JSON.stringify({...about, ctaText: 42})), TypeError);

const data = {...about, titleLineOne: '  <img src=x onerror="alert(1)">  ', ctaText: ""};
const label = {
    dataset: {settingText: "titleLineOne"},
    set innerHTML(value) { assert.fail(`Text must not be parsed as HTML: ${value}`); }
};
const link = {
    dataset: {settingHref: "ctaUrl"},
    setAttribute(name, value) { this[name] = value; }
};
const button = {dataset: {settingVisible: "ctaText ctaUrl"}, remove() { this.removed = true; }};
const secondLine = {dataset: {settingVisible: "titleLineTwo"}, remove() { this.removed = true; }};
const section = {
    hidden: true,
    dataset: {themeContent: "homepage_about", contentConfig: JSON.stringify(data)},
    querySelectorAll(selector) {
        return {
            "[data-setting-text]": [label],
            "[data-setting-href]": [link],
            "[data-setting-visible]": [button, secondLine]
        }[selector];
    }
};
const invalidSection = {hidden: true, dataset: {themeContent: "hero", contentConfig: "{"}};
const emptySection = {hidden: true, dataset: {themeContent: "footer", contentConfig: ""}};
globalThis.document = {querySelectorAll: () => [invalidSection, emptySection, section]};
const originalError = console.error;
const errors = [];
console.error = (...args) => errors.push(args);
try {
    enhanceThemeContent();
    assert.equal(errors.length, 1);
    assert.ok(errors[0][1] instanceof SyntaxError);
    assert.equal(invalidSection.hidden, true);
    assert.equal(emptySection.hidden, true);
    assert.equal(section.hidden, false);
    assert.equal(label.textContent, '<img src=x onerror="alert(1)">');
    assert.equal(link.href, "/about/");
    assert.equal(button.removed, true);
    assert.equal(secondLine.removed, undefined);
} finally {
    console.error = originalError;
    delete globalThis.document;
}

console.log("Grouped settings, safe text/URLs, optional fields and error isolation checks passed.");
