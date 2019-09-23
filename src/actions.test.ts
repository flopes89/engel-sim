import { Card } from "./deck";
import { shuffle, drawCard, discardCard, fuse } from "./actions";
import { Player } from "./player";
import * as R from "ramda";

const card1 = { name: "c1", orderNumber: 1, weight: 1, seed: 0, };
const card2 = { name: "c2", orderNumber: 1, weight: 2, seed: 0, };
const card3 = { name: "c3", orderNumber: 1, weight: 3, seed: 0, };
const card4 = { name: "c4", orderNumber: 1, weight: 1, seed: 0, };
const card5 = { name: "c5", orderNumber: 2, weight: 1, seed: 0, };
const card6 = { name: "c6", orderNumber: 3, weight: 1, seed: 0, };

const deck: Card[] = [card1, card2, card3, card4];

const player: Player = {
    energy: 0,
    hand: [],
    drawPile: [],
    discardPile: [],
};

test("shuffling a deck", () => {
    const newDeck = shuffle(deck);
    expect(newDeck).not.toBe(deck);
    expect(newDeck).not.toEqual(deck);
});

test("drawing a card", () => {
    const [newPlayer, newDeck] = drawCard(player, deck);
    expect(newDeck).toHaveLength(3);
    expect(newPlayer.hand).toHaveLength(1);
    expect(newPlayer.hand[0]).toEqual(card1);
});

test("discarding a card", () => {
    const player1 = R.clone(player);
    player1.hand.push(card1, card2);
    const newPlayer = discardCard(player1, card2);
    expect(newPlayer.hand).toHaveLength(1);
    expect(newPlayer.hand).not.toContain(card2);
    expect(newPlayer.discardPile).toHaveLength(1);
    expect(newPlayer.discardPile).toContainEqual(card2);
});

test("fusing a card", () => {
    const player1 = R.clone(player);
    player1.hand.push(card1, card2);
    const newPlayer = fuse(player1, card1, card2, card6);
    expect(newPlayer.hand).toHaveLength(0);
    expect(newPlayer.discardPile).toHaveLength(1);
    expect(newPlayer.discardPile).toContainEqual(card6);
});
