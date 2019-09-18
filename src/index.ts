import { createDeck } from "./model/element";
import { calculateOrbit } from "./model/calc";

const createElements = () => {
    const deck = createDeck();
    console.log(deck);
    console.log(deck.length);
};

createElements();
