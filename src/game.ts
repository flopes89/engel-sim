import { Player } from "./player";
import { Card } from "./deck";

export interface Game {
    players: Player[],
    drawPile: Card[],
    discardPile: Card[],
    roundsLeft: number,
    creationPile: Card[],
};
