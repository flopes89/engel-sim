import { Card } from "./deck";
import { shuffle } from "./actions";

const deck: Card[] = [
    { name: "c1", orderNumber: 1, weight: 1, seed: 0, },
    { name: "c2", orderNumber: 1, weight: 1, seed: 0, },
    { name: "c3", orderNumber: 1, weight: 1, seed: 0, },
    { name: "c4", orderNumber: 1, weight: 1, seed: 0, },
];

test("shuffling a deck", () => {
    const newDeck = shuffle(deck);
    expect(newDeck).not.toBe(deck);
    expect(newDeck).not.toEqual(deck);
});
