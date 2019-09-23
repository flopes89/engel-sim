import { Card } from "./deck";
import { destroyCard } from "./actions";

const card1 = { name: "c1", orderNumber: 1, weight: 1, seed: 0, };
const card2 = { name: "c2", orderNumber: 1, weight: 2, seed: 0, };

const deck: Card[] = [card1, card2];

test("destroying cards", () => {
    const newDeck = destroyCard(deck, [card1]);
    expect(newDeck).toHaveLength(1);
    expect(newDeck).not.toContainEqual(card1);
});
