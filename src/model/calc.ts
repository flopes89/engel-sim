import { Element } from "./element";
import { pipe } from "fp-ts/lib/pipeable";
import { map } from "fp-ts/lib/Array";
import { fold, monoidSum } from "fp-ts/lib/Monoid"

const sum = fold(monoidSum);

export const calculateOrbit = (deck: Element[]): number => 
    pipe(
        deck,
        map(el => el.weight),
        sum,
    );
