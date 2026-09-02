export function parseFriendLink(text) {
    const [name, url, avatar, ...description] = text.split("|").map((part) => part.trim());
    if (!name || !url || !avatar || !description.length) return null;

    return {name, url, avatar, description: description.join("|").trim()};
}

function createText(className, text) {
    const element = document.createElement("span");
    element.className = className;
    element.textContent = text;
    return element;
}

export function enhanceLinksPage() {
    const source = document.querySelector("[data-links-source] ul");
    if (!source) return;

    let count = 0;
    source.className = "links-grid";

    [...source.children].forEach((item) => {
        const data = parseFriendLink(item.textContent);
        if (!data) return;

        const destination = item.querySelector("a")?.href || data.url;
        const destinationUrl = new URL(destination, window.location.href);
        const avatarUrl = new URL(data.avatar, window.location.href);
        if (!["http:", "https:"].includes(destinationUrl.protocol) || !["http:", "https:"].includes(avatarUrl.protocol)) return;

        const card = document.createElement("a");
        card.className = "friend-card reveal";
        card.href = destinationUrl.href;
        card.target = "_blank";
        card.rel = "noopener noreferrer";

        const image = document.createElement("img");
        image.className = "friend-avatar";
        image.src = avatarUrl.href;
        image.alt = "";
        image.width = 72;
        image.height = 72;
        image.loading = "lazy";

        const copy = document.createElement("span");
        copy.className = "friend-copy";
        copy.append(
            createText("friend-name", data.name),
            createText("friend-domain", destinationUrl.hostname.replace(/^www\./, "")),
            createText("friend-description", data.description)
        );

        card.append(image, copy, createText("friend-arrow", "↗"));
        item.replaceChildren(card);
        count += 1;
    });

    const countWrap = document.querySelector("[data-links-count-wrap]");
    const countValue = document.querySelector("[data-links-count]");
    if (countWrap && countValue) {
        countValue.textContent = String(count);
        countWrap.hidden = false;
    }
}
