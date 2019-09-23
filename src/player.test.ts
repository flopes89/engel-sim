import * as R from "ramda";
import { drawCard, discardCard, fuse, Player, fiss, createCard } from "./player";
import { Card } from "./deck";

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

test("fissing a card", () => {
    const player1 = R.clone(player);
    player1.hand.push(card2);
    const newPlayer = fiss(player1, card2, card1, card3);
    expect(newPlayer.hand).toHaveLength(0);
    expect(newPlayer.discardPile).toHaveLength(2);
    expect(newPlayer.discardPile).toContainEqual(card1);
    expect(newPlayer.discardPile).toContainEqual(card3);
});

test("creating a card", () => {
    const player1 = R.clone(player);
    player1.energy = 2;
    const newPlayer = createCard(player1, card2);
    expect(newPlayer.energy).toBe(0);
    expect(newPlayer.discardPile).toHaveLength(1);
    expect(newPlayer.discardPile).toContainEqual(card2);
});
