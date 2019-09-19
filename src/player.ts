import { Card } from "./element";

export interface Player {
    drawPile: Card[],
    hand: Card[],
    discardPile: Card[],
    energy: number,
};
