export async function enhanceComments() {
    const section = document.querySelector("[data-comments]");
    const envId = section?.dataset.twikooEnvId.trim();
    if (!envId) return;

    section.hidden = false;
    const status = section.querySelector("[data-comments-status]");

    try {
        const script = document.createElement("script");
        const scriptUrl = new URL(section.dataset.twikooJsUrl);
        if (!["http:", "https:"].includes(scriptUrl.protocol)) {
            throw new TypeError("comments_twikoo_js_url must be an HTTP(S) URL.");
        }
        script.src = scriptUrl.href;
        script.async = true;
        await new Promise((resolve, reject) => {
            script.addEventListener("load", resolve, {once: true});
            script.addEventListener("error", () => reject(new Error("Failed to load the Twikoo script.")), {once: true});
            document.head.append(script);
        });
        // Keep Twikoo's default pathname key so Brave's existing threads are reused.
        await window.twikoo.init({el: "#vcomments", envId, lang: "zh-CN"});
        status.hidden = true;
    } catch (error) {
        status.textContent = "评论加载失败，请稍后刷新页面。";
        console.error("Winner comments:", error);
    }
}
