import { Card } from "./deck";
import * as R from "ramda";

export enum ACTION {
    FUSE,
    FISS,
    CREATE,
    PASS
};

/**
 * Destroy a card from a deck
 * @param deck Deck the destroy the card from
 * @param cards The card to destroy
 * @returns New deck without the card
 */
export const destroyCard = (deck: Card[], cards: Card[]) => R.without(cards, R.clone(deck));
