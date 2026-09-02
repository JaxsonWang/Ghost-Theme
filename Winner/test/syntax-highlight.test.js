import assert from "node:assert/strict";
import {normalizeLanguageName} from "../assets/js/syntax-highlight.js";

assert.equal(normalizeLanguageName("Java"), "java");
assert.equal(normalizeLanguageName("sh"), "bash");
assert.equal(normalizeLanguageName("bashh"), "bash");
assert.equal(normalizeLanguageName("TypeScript"), "typescript");
