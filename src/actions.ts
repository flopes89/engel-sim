import { Card } from "./deck";
import * as R from "ramda";

export const fuse = (card1: Card, card2: Card): Card|null => null;

/**
 * Shuffles a deck of cards and returns a new, shuffled deck
 * @param deck Deck of cards
 */
export const shuffle = (deck: Card[]): Card[] => {
    const newDeck: Card[] = R.clone(deck);
    for (let size = deck.length - 1; size > 0; size--) {
        const index = Math.floor(Math.random() * (size + 1));
        [newDeck[size], newDeck[index]] = [newDeck[index], newDeck[size]];
    }
    return newDeck;
};
