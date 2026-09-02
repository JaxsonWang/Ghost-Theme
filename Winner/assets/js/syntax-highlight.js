import Prism from "prismjs";
import "prismjs/components/prism-applescript.js";
import "prismjs/components/prism-bash.js";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-go.js";
import "prismjs/components/prism-java.js";
import "prismjs/components/prism-json.js";
import "prismjs/components/prism-kotlin.js";
import "prismjs/components/prism-markdown.js";
import "prismjs/components/prism-nginx.js";
import "prismjs/components/prism-sass.js";
import "prismjs/components/prism-scss.js";
import "prismjs/components/prism-typescript.js";
import "prismjs/components/prism-jsx.js";
import "prismjs/components/prism-tsx.js";
import "prismjs/components/prism-yaml.js";

Prism.manual = true;

const languageAliases = {
    bashh: "bash",
    html: "markup",
    js: "javascript",
    sh: "bash",
    shell: "bash",
    xml: "markup"
};

export function normalizeLanguageName(language) {
    const normalized = language.toLowerCase();
    return languageAliases[normalized] || normalized;
}

export function highlightCodeBlocks() {
    document.querySelectorAll(".gh-content pre > code").forEach((block) => {
        const languageClass = [...block.classList].find((name) => name.startsWith("language-"));
        if (!languageClass) return;

        const language = normalizeLanguageName(languageClass.slice(9));
        if (!Prism.languages[language]) return;

        block.classList.replace(languageClass, `language-${language}`);
        Prism.highlightElement(block);
    });
}
