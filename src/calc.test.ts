import { Card } from "./element";
import { totalWeight, totalSeed } from "./calc";

const deck: Card[] = [
    { name: "H", orderNumber: 1, weight: 1, seed: 0, },
    { name: "H", orderNumber: 12, weight: 312, seed: 12, },
    { name: "He", orderNumber: 332, weight: 3, seed: -55, },
    { name: "He", orderNumber: 2, weight: 14, seed: 2, },
    { name: "XXX", orderNumber: 0, weight: 0, seed: 1, },
];

test("weight", () => {
    expect(totalWeight(deck)).toBe(330);
});

test("seed", () => {
    expect(totalSeed(deck)).toBe(-40);
});
