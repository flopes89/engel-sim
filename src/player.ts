import { Card } from "./deck";

export interface Player {
    drawPile: Card[],
    hand: Card[],
    discardPile: Card[],
    energy: number,
};
