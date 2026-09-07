import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {advanceProfileTilt, getProfilePointer, parseAboutProfile} from "../assets/js/profile-card.js";

const {config} = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
assert.ok(Object.keys(config.custom).length <= 20);
const profile = parseAboutProfile(config.custom.about_profile.default);
assert.equal(profile.name, "Jaxson Wang");
assert.equal(profile.avatarUrl, "https://cdn.iiong.com/2026/09/my.webp");
assert.equal(parseAboutProfile(" \n "), null);
assert.throws(() => parseAboutProfile("{invalid"), SyntaxError);
for (const value of [null, [], {}, {...profile, name: 12}, {...profile, title: " "}, {...profile, avatarUrl: "javascript:alert(1)"}, {...profile, avatarUrl: "/photo.webp"}]) {
    assert.throws(() => parseAboutProfile(JSON.stringify(value)));
}
assert.deepEqual(parseAboutProfile(JSON.stringify({
    name: '  <img src=x onerror="alert(1)">  ',
    title: " Engineer ",
    avatarUrl: "https://example.com/photo.webp"
})), {name: '<img src=x onerror="alert(1)">', title: "Engineer", avatarUrl: "https://example.com/photo.webp"});

const rect = {left: 40, top: 80, width: 360, height: 500};
assert.deepEqual(getProfilePointer(220, 330, rect), {x: 50, y: 50, rotateX: 0, rotateY: 0});
assert.deepEqual(getProfilePointer(40, 80, rect), {x: 0, y: 0, rotateX: -12.5, rotateY: 10});
assert.deepEqual(getProfilePointer(1000, 1000, rect), {x: 100, y: 100, rotateX: 12.5, rotateY: -10});
assert.deepEqual(getProfilePointer(140, 275, {left: 50, top: 150, width: 180, height: 250}), {x: 50, y: 50, rotateX: 0, rotateY: 0});

// The original exponential follow must have the same speed at 60 Hz and 120 Hz.
const target = {x: 300, y: 100};
let at60Hz = {x: 180, y: 250};
let at120Hz = {...at60Hz};
for (let frame = 0; frame < 60; frame++) at60Hz = advanceProfileTilt(at60Hz, target, 1000 / 60);
for (let frame = 0; frame < 120; frame++) at120Hz = advanceProfileTilt(at120Hz, target, 1000 / 120);
assert.ok(Math.abs(at60Hz.x - at120Hz.x) < 1e-9);
assert.ok(Math.abs(at60Hz.y - at120Hz.y) < 1e-9);
assert.ok(at60Hz.x < target.x && at60Hz.y > target.y);
assert.deepEqual(advanceProfileTilt(target, target, 16), target);
assert.deepEqual(advanceProfileTilt({x: 0, y: 0}, target, 0), {x: 0, y: 0});
assert.ok(advanceProfileTilt({x: 0, y: 0}, target, 16, 600).x < advanceProfileTilt({x: 0, y: 0}, target, 16).x);

console.log("Profile config, pointer and frame-rate-independent motion checks passed.");
