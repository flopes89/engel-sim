import { Player } from "./player";
import { Card } from "./element";

export interface Game {
    players: Player[],
    drawPile: Card[],
    discardPile: Card[],
    roundsLeft: number,
    creationPile: Card[],
};
