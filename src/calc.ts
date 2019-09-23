import { Card } from "./deck";
import * as R from "ramda";

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
