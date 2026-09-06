import assert from "node:assert/strict";
import {getDepthTextRotation} from "../assets/js/depth-text.js";

const rect = {left: 40, top: 80, width: 600, height: 240};
const center = getDepthTextRotation(340, 200, rect);
assert.deepEqual(center, {x: -2.4, y: 3.15});

const topLeft = getDepthTextRotation(40, 80, rect);
const bottomRight = getDepthTextRotation(640, 320, rect);
assert.ok(topLeft.x > center.x && topLeft.y < center.y);
assert.ok(bottomRight.x < center.x && bottomRight.y > center.y);

// Moving over the photograph must not rotate the title beyond its tilt limit.
for (const [x, y] of [[-10000, -10000], [10000, 10000]]) {
    const rotation = getDepthTextRotation(x, y, rect);
    assert.ok(Math.abs(rotation.x - center.x) <= 7.5);
    assert.ok(Math.abs(rotation.y - center.y) <= 7.5);
}

// The same relative pointer position keeps its rotation after a resize.
assert.deepEqual(
    getDepthTextRotation(640, 320, rect),
    getDepthTextRotation(400, 320, {left: 100, top: 200, width: 300, height: 120})
);
