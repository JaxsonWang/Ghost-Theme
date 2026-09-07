const fields = {
    hero: ["titleLineOne", "titleLineTwo", "titleAccent", "sideText", "ctaText"],
    homepage_about: ["titleLineOne", "titleLineTwo", "sideText", "bodyText", "ctaText", "ctaUrl"],
    footer: ["copyrightStartYear", "icpName", "gonganBeianName", "gonganBeianUrl", "linkName", "linkUrl", "motto"]
};

export function parseThemeContent(name, text) {
    if (!text.trim()) return null;
    const data = JSON.parse(text);
    return Object.fromEntries(fields[name].map((field) => {
        if (typeof data?.[field] !== "string") {
            throw new TypeError(`${name}.${field} must be a string.`);
        }
        const value = data[field].trim();
        if (value && field.endsWith("Url")) {
            const url = new URL(value, "https://winner.example");
            if (!["http:", "https:"].includes(url.protocol)) {
                throw new TypeError(`${name}.${field} must be an HTTP(S) or relative URL.`);
            }
        }
        return [field, value];
    }));
}

export function enhanceThemeContent() {
    document.querySelectorAll("[data-theme-content]").forEach((section) => {
        let data;
        try {
            data = parseThemeContent(section.dataset.themeContent, section.dataset.contentConfig);
        } catch (error) {
            console.error(`Winner: invalid ${section.dataset.themeContent} setting.`, error);
            return;
        }
        if (!data) return;

        section.querySelectorAll("[data-setting-text]").forEach((element) => {
            element.textContent = data[element.dataset.settingText];
        });
        section.querySelectorAll("[data-setting-href]").forEach((element) => {
            element.setAttribute("href", data[element.dataset.settingHref]);
        });
        section.querySelectorAll("[data-setting-visible]").forEach((element) => {
            if (!element.dataset.settingVisible.split(" ").every((field) => data[field])) element.remove();
        });
        section.hidden = false;
    });
}
