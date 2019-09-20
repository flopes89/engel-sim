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
