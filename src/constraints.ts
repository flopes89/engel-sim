import { Player } from "./player";
import { Card } from "./element";
import * as R from "ramda";

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
 * Determines if two cards can be fused to a new card from the given pool
 * @param card1 First card to fuse
 * @param card2 Second card to fuse
 * @param pool Pool of available cards
 */
export const canFuse = (card1: Card, card2: Card, pool: Card[]): boolean =>
    getFuseCandidates(card1, card2, pool).length > 0;

/**
 * Determines if a card can be fissed into two cards from a pool
 * @param card Card to fiss
 * @param pool Pool of available cards
 */
export const canFiss = (card: Card, pool: Card[]): boolean => {
    const combine = R.clone(pool);
    pool.forEach(c => {

    });
    return false;
};
