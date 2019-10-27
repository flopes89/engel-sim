import { Card } from "./deck";
import { Planet } from "./orbits";

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
export const totalWeight = (deck: Card[]) => {
    let total = 0;
    deck.forEach(card => total += card.weight);
    return total;
};

/**
 * Calcualtes the total seed of a deck of cards
 */
export const totalSeed = (deck: Card[]) => {
    let total = 0;
    deck.forEach(card => total += card.seed);
    return total;
};

export const temperature = totalWeight; // TODO Special effects of cards?

export const seed = totalSeed; // TODO Special effects of cards?

/**
 * Calculates the viability (score) of a planet
 * @param planet Planet to calculate for
 */
export const planetViability = (planet: Planet) => planet.seed + planet.temperature;

/**
 * Compares two planets and returns a number indicating the difference between them
 * @param left Planet to compare
 * @param right Planet to compare
 */
export const compareViability = (left: Planet, right: Planet) => planetViability(left) - planetViability(right);
