import { Player } from "./player";
import { Card } from "./deck";
import * as R from "ramda";

/**
 * Determines if a player can afford to create a card
 * @param player Player to check
 * @param card Card to check
 */
export const canAfford = (player: Player, card: Card): boolean => player.energy >= card.weight;

/**
 * Determines if two cards can be fused to target card
 * @param card1 First card to fuse
 * @param card2 Second card to fuse
 * @param target Target card
 */
export const canFuse = (card1: Card, card2: Card) =>
    (target: Card) => R.equals(target.orderNumber)(R.sum([card1.weight, card2.weight]));

/**
 * Get candidates for fusing from a pool based on two existing cards
 * @param card1 First card to fuse
 * @param card2 Second card to fuse
 * @param pool Pool of available cards
 */
export const getFuseCandidates = (card1: Card, card2: Card, pool: Card[]): Card[] =>
    pool.filter(canFuse(card1, card2));

/**
 * Determines if two cards can be fused to a new card from a pool
 * @param card1 First card to fuse
 * @param card2 Second card to fuse
 * @param pool Pool of available cards
 */
export const hasFuseCandidates = (card1: Card, card2: Card, pool: Card[]): boolean =>
    getFuseCandidates(card1, card2, pool).length > 0;

/**
 * Get candidate pairs for fissing a card
 * @param card Card to fiss
 * @param pool Pool of available cards
 */
export const getFissCandidates = (card: Card, pool: Card[]): Array<[Card, Card]> =>
    pool.flatMap((cardLeft, indexLeft) => 
        R.clone(pool)
            // TODO Could use `R.xprod` for this?
            // Filter out any cards that have already been compared and the current card itself
            .filter((_, indexRight) => indexRight > indexLeft)
            // Then filter out cards that cannot be used with cardLeft as a result of fissing card
            .filter(cardRight => cardLeft.orderNumber + cardRight.orderNumber === card.weight)
            // Combine each left over card with the cardLeft to form the combination pairs
            .map<[Card, Card]>(cardRight => [cardLeft, cardRight])
    );

/**
 * Determines if a card has fissing candidates in a pool
 * @param card Card to fiss
 * @param pool Pool of available cards
 */
export const hasFissCandidates = (card: Card, pool: Card[]): boolean =>
    getFissCandidates(card, pool).length > 0;

/**
 * Determines if a card can be fissed into two other cards
 * @param card Card to fiss
 * @param target1 First fiss candidate
 * @param target2 Second fiss candidate
 */
export const canFiss = (card: Card, target1: Card, target2: Card) =>
    R.equals(card.weight)(R.sum([target1.orderNumber, target2.orderNumber]));

/**
 * Checks if a deck has cards left
 * @param deck Deck to check
 */
export const hasCards = (deck: Card[]) => R.gt(deck.length, 0);
