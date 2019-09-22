import { Card } from "./deck";
import * as R from "ramda";
import { Player } from "./player";

export const fuse = (card1: Card, card2: Card): Card|null => null;

/**
 * Takes a deck of cards and returns a shuffled copy of it
 * @param deck Deck of cards to shuffle
 */
export const shuffle = (deck: Card[]): Card[] => {
    const newDeck: Card[] = R.clone(deck);
    for (let size = deck.length - 1; size > 0; size--) {
        const index = Math.floor(Math.random() * (size + 1));
        [newDeck[size], newDeck[index]] = [newDeck[index], newDeck[size]];
    }
    return newDeck;
};

/**
 * Draw a single card from a deck into a players hand
 * @param player Player that draws a card
 * @param deck Deck the card is drawn from
 * @returns A tuple of the new player and deck object
 */
export const drawCard = (player: Player, deck: Card[]): [Player, Card[]] => {
    const newPlayer = R.clone(player);
    const newDeck = R.clone(deck);
    const card = newDeck.shift();

    if (card) {
        newPlayer.hand.push(card);
    }

    return [newPlayer, newDeck];
};

/**
 * Discards a card from the hand of a player into their discard pile
 * @param player Player that discards a card
 * @param card Card to discard
 * @returns A new player object
 */
export const discardCard = (player: Player, card: Card): Player => {
    const newPlayer = R.clone(player);
    newPlayer.hand = R.without([card], newPlayer.hand);
    newPlayer.discardPile.push(R.clone(card));
    return newPlayer;
};
