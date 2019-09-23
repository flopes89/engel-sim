import * as R from "ramda";

export interface Card {
    name: string,
    orderNumber: number,
    weight: number,
    seed: number,
};

export interface DeckDefinition {
    [name: string]: number
};

/**
 * Creates a new deck
 * @param pool Pool of card definitions to use
 * @param definition Definition of how many cards of each type should be in the deck
 */
export const buildDeck = (pool: Card[], definition: DeckDefinition): Card[] =>
    R.chain(card => R.repeat(card, definition[card.name]), pool);

/**
 * Takes a deck of cards and returns a shuffled copy of it
 * @param deck Deck of cards to shuffle
 */
export const shuffle = (deck: Card[]) => {
    const newDeck: Card[] = R.clone(deck);
    for (let size = deck.length - 1; size > 0; size--) {
        const index = Math.floor(Math.random() * (size + 1));
        [newDeck[size], newDeck[index]] = [newDeck[index], newDeck[size]];
    }
    return newDeck;
};
