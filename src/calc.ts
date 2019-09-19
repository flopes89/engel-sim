import { Card } from "./element";
import * as R from "ramda";

export const totalWeight = (deck: Card[]): number =>
    R.pipe(
        R.map<Card, number>(el => el.weight),
        R.sum,
    )(deck);

export const totalSeed = (deck: Card[]): number =>
    R.pipe(
        R.map<Card, number>(el => el.seed),
        R.sum,
    )(deck);
