import { Card } from "./deck";
import { canFuse, getFissCandidates, getFuseCandidates, canFiss } from "./constraints";

const deck: Card[] = [
    { name: "H", orderNumber: 1, weight: 1, seed: 0, },
    { name: "K", orderNumber: 12, weight: 312, seed: 12, },
    { name: "He", orderNumber: 332, weight: 3, seed: -55, },
    { name: "Kr", orderNumber: 2, weight: 14, seed: 2, },
    { name: "XXX", orderNumber: 0, weight: 0, seed: 1, },
];

const card1: Card = { name: "1", orderNumber: 1, weight: 10, seed: 10, };
const card2: Card = { name: "2", orderNumber: 2, weight: 2, seed: -5, };
const card3: Card = { name: "3", orderNumber: 3, weight: 3, seed: 2, };

test("fusing cards", () => {
    const candidates = getFuseCandidates(card1, card2, deck);
    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toEqual({ name: "K", orderNumber: 12, weight: 312, seed: 12, });
    expect(canFuse(card1, card3, deck)).toBeFalsy();
});

test("fissing cards", () => {
    const candidates = getFissCandidates(card3, deck);
    expect(candidates).toHaveLength(1);
    expect(candidates[0]).toHaveLength(2);
    expect(candidates[0]).toContainEqual({ name: "H", orderNumber: 1, weight: 1, seed: 0, });
    expect(candidates[0]).toContainEqual({ name: "Kr", orderNumber: 2, weight: 14, seed: 2, });
    expect(canFiss(card1, deck)).toBeFalsy();
});
