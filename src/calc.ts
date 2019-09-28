import { Card } from "./deck";
import * as R from "ramda";

/**
 * Calculates the amount of energy gained by fissing a card
 * @param card Card that is fissed
 * @param target1 First target card
 * @param target2 Second target card
 */
export const energyGainFromFiss = (card: Card, target1: Card, target2: Card) =>
    Math.min(1, Math.abs(card.weight - (target1.weight + target2.weight)));

/**
 * Calculates the amount of energy gained by fusing two cards
 * @param card1 First card that is fused
 * @param card2 Second card that is fused
 * @param target Target card
 */
export const energyGainFromFuse = (card1: Card, card2: Card, target: Card) =>
    Math.min(1, Math.abs(target.weight - (card1.weight + card2.weight)));

/**
 * Calcualtes the total weight of a set of cards
 */
export const totalWeight = R.pipe(
    R.map<Card, number>(el => el.weight),
    R.sum,
);

/**
 * Calcualtes the total seed of a deck of cards
 */
export const totalSeed = R.pipe(
    R.map<Card, number>(el => el.seed),
    R.sum,
);

export const temperature = totalWeight; // TODO Special effects of cards?

export const seed = totalSeed; // TODO Special effects of cards?