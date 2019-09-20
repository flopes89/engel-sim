import { createDeck } from "./deck";
import { totalWeight } from "./calc";

const createElements = () => {
    const deck = createDeck();
    console.log(deck);
    console.log(deck.length);
};

createElements();
