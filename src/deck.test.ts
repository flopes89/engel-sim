import { Card, DeckDefinition, buildDeck, shuffle } from "./deck";

const cards: Card[] = [
    { name: "c1", orderNumber: 1, weight: 1, seed: 0, },
    { name: "c2", orderNumber: 1, weight: 1, seed: 0, },
    { name: "c3", orderNumber: 1, weight: 1, seed: 0, },
    { name: "c4", orderNumber: 1, weight: 1, seed: 0, },
];

const deckDef: DeckDefinition = {
    "c1": 1,
    "c2": 2,
    "c3": 3,
    "c4": 4,
};

test("building a new deck", () => {
    const deck = buildDeck(cards, deckDef);
    expect(deck).toHaveLength(10);
});

test("shuffling a deck", () => {
    const newDeck = shuffle(cards);
    expect(newDeck).not.toBe(cards);
    expect(newDeck).not.toEqual(cards);
});
