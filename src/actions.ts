import { Card } from "./deck";
import _ from "lodash";

export enum ACTION {
    FUSE,
    FISS,
    CREATE,
    PASS
};

/**
 * Destroys cards from a deck
 * @param deck Deck the destroy the card from
 * @param cards The cards to destroy
 * @returns New deck without the card
 */
export const destroyCard = (deck: Card[], cards: Card[]) => _.cloneDeep(deck)
    .filter(deckCard => 
        _.findIndex(cards, destroyCard => 
            _.isEqual(deckCard, destroyCard)) === -1);
