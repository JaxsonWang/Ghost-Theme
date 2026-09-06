import assert from "node:assert/strict";
import {getCardPointer} from "../assets/js/card-effects.js";

const rect = {left: 40, top: 80, width: 600, height: 240};
assert.deepEqual(getCardPointer(340, 200, rect), {x: 300, y: 120, angle: 90, edge: 0});

// Cardinal edges must light the matching side of the conic mask.
for (const [x, y, angle] of [[340, 80, 0], [640, 200, 90], [340, 320, 180], [40, 200, 270]]) {
    const pointer = getCardPointer(x, y, rect);
    assert.equal(pointer.angle, angle);
    assert.equal(pointer.edge, 100);
}
assert.equal(getCardPointer(490, 200, rect).edge, 50);
assert.equal(getCardPointer(640, 320, rect).edge, 100);
assert.equal(getCardPointer(-1000, -1000, rect).edge, 100);

// Scrolling and resizing preserve direction and proximity at the same relative point.
const resized = getCardPointer(325, 260, {left: 100, top: 200, width: 300, height: 120});
assert.equal(resized.angle, getCardPointer(490, 200, rect).angle);
assert.equal(resized.edge, getCardPointer(490, 200, rect).edge);
