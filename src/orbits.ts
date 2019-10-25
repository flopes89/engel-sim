import { Card } from "./deck";
import { temperature, seed, compareViability } from "./calc";
import * as R from "ramda";

export enum Temperature {
    FREEZING = -3,
    COLD = -2,
    CHILLY = -1,
    BALANCED = 0,
    COSY = 1,
    WARM = 2,
    HOT = 3,
};

export enum Seed {
    PALAEOPTERA = -3,
    LAGOMORPHA = -2,
    FELIDAE = -1,
    BALANCED = 0,
    TESTUDINIDAE = 1,
    HEXACTINELLIDA = 2,
    HYDRIDAE = 3,
};

export interface Planet {
    temperature: Temperature,
    seed: Seed,
};

export interface Orbits {
    planets: Planet[]
};

export const getPlanet = (deck: Card[]): Planet => ({
    temperature: temperature(deck),
    seed: seed(deck),
});

export const reorder = (orbits: Orbits): Orbits => {
    const newOrbits = R.clone(orbits);

    newOrbits.planets = R.sort(compareViability, newOrbits.planets);

    return newOrbits;
};
