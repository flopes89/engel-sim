import { buildDeck } from "./deck";
import { totalWeight } from "./calc";

const createElements = () => {
    const deck = buildDeck();
    console.log(deck);
    console.log(deck.length);
};

createElements();
