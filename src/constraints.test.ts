import { Card } from "./element";
import { canFuse, canFiss } from "./constraints";

const deck: Card[] = [
    { name: "H", orderNumber: 1, weight: 1, seed: 0, },
    { name: "H", orderNumber: 12, weight: 312, seed: 12, },
    { name: "He", orderNumber: 332, weight: 3, seed: -55, },
    { name: "He", orderNumber: 2, weight: 14, seed: 2, },
    { name: "XXX", orderNumber: 0, weight: 0, seed: 1, },
];

const card1: Card = { name: "1", orderNumber: 1, weight: 10, seed: 10, };
const card2: Card = { name: "2", orderNumber: 2, weight: 2, seed: -5, };
const card3: Card = { name: "3", orderNumber: 3, weight: 1, seed: 2, };

test("canFuse", () => {
    expect(canFuse(card1, card2, deck)).toBeTruthy();
    expect(canFuse(card1, card3, deck)).toBeFalsy();
});

test("canFiss", () => {
    expect(canFiss(card1, deck)).toBeTruthy();
    expect(canFiss(card2, deck)).toBeFalsy();
});
