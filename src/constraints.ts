import { Player } from "./player";
import { Card, DeckDefinition } from "./deck";
import * as R from "ramda";
import map from "ramda/es/map";

/**
 * Determines if a player can afford to create a card
 * @param player Player to check
 * @param card Card to check
 */
export const canAfford = (player: Player, card: Card): boolean => player.energy >= card.weight;

/**
 * Get candidates for fusing from a pool based on two existing cards
 * @param card1 First card to fuse
 * @param card2 Second card to fuse
 * @param pool Pool of available cards
 */
export const getFuseCandidates = (card1: Card, card2: Card, pool: Card[]): Card[] => 
    pool.filter(c => c.orderNumber === card1.weight + card2.weight)

/**
 * Determines if two cards can be fused to a new card from a pool
 * @param card1 First card to fuse
 * @param card2 Second card to fuse
 * @param pool Pool of available cards
 */
export const canFuse = (card1: Card, card2: Card, pool: Card[]): boolean =>
    getFuseCandidates(card1, card2, pool).length > 0;

/**
 * Get candidate pairs for fissing a card
 * @param card Card to fiss
 * @param pool Pool of available cards
 */
export const getFissCandidates = (card: Card, pool: Card[]): Card[][] => {
    const right = R.clone(pool);
    const result = pool.map((cardLeft, indexLeft) => 
        right
            // Filter out any cards that have already been compared and the current card itself
            .filter((x, indexRight) => indexRight > indexLeft)
            // Then filter out cards that cannot be used with cardLeft as a result of fissing card
            .filter(cardRight => cardLeft.orderNumber + cardRight.orderNumber === card.weight)
            // Combine each left over card with the cardLeft to form the combination pairs
            .map(cardRight => [cardLeft, cardRight])
    );
    //@ts-ignore
    return R.unnest(result);
};

/**
 * Determines if a card has fissing candidates in a pool
 * @param card Card to fiss
 * @param pool Pool of available cards
 */
export const canFiss = (card: Card, pool: Card[]): boolean =>
    getFissCandidates(card, pool).length > 0;
