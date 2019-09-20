import { Card } from "./deck";
import * as R from "ramda";

export const totalWeight = R.pipe(
    R.map<Card, number>(el => el.weight),
    R.sum,
);

export const totalSeed = R.pipe(
    R.map<Card, number>(el => el.seed),
    R.sum,
);
