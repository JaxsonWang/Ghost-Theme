import assert from "node:assert/strict";
import {parseFriendLink} from "../assets/js/links.js";

assert.deepEqual(
    parseFriendLink("Design.Me | https://www.saintw.cc | https://example.com/avatar.png | 分享 | 创造快乐。"),
    {
        name: "Design.Me",
        url: "https://www.saintw.cc",
        avatar: "https://example.com/avatar.png",
        description: "分享|创造快乐。"
    }
);
assert.equal(parseFriendLink("字段不完整 | https://example.com"), null);
