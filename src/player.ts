import * as R from "ramda";
import { Card } from "./deck";
import { canFiss, canFuse, hasCards, canCreate } from "./constraints";
import { destroyCard } from "./actions";
import { energyGainFromFiss, energyGainFromFuse } from "./calc";

export interface Player {
    drawPile: Card[],
    hand: Card[],
    discardPile: Card[],
    energy: number,
};

/**
 * Fiss a card from the perspective of a player
 * @param player Player that executes the action
 * @param card Card to fiss
 * @param target1 First fiss result card
 * @param target2 Second fiss result card
 */
export const fiss = (player: Player, card: Card, target1: Card, target2: Card) => {
    if (!canFiss(card, target1, target2)) {
        throw "Fission is not valid!";
    }

    const newPlayer = R.clone(player);
    const handCard = R.find<Card>(c => R.equals(c, card), player.hand);

    if (!handCard) {
        throw "Card must be in hand!";
    }

    newPlayer.hand = destroyCard(newPlayer.hand, [handCard]);
    newPlayer.discardPile.push(R.clone(target1));
    newPlayer.discardPile.push(R.clone(target2));

    newPlayer.energy += energyGainFromFiss(card, target1, target2);

    return newPlayer;
};

/**
 * Fuses two cards from the perspective of a player
 * @param player Player that executes the action
 * @param card1 First card to fuse
 * @param card2 Second card to fuse
 * @param target Fusion target card
 */
export const fuse = (player: Player, card1: Card, card2: Card, target: Card) => {
    if (!canFuse(card1, card2)(target)) {
        throw "Fusion is not valid!";
    }

    const newPlayer = R.clone(player);
    const handCard1 = R.find<Card>(c => R.equals(c, card1), player.hand);
    const handCard2 = R.find<Card>(c => R.equals(c, card2), player.hand);

    if (!handCard1 || !handCard2) {
        throw "Cards must be in hand!";
    }

    newPlayer.hand = destroyCard(newPlayer.hand, [handCard1, handCard2]);
    newPlayer.discardPile.push(R.clone(target));

    newPlayer.energy += energyGainFromFuse(card1, card2, target);

    return newPlayer;
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

    if (!card) {
        throw "Cannot draw from empty deck";
    }

    newPlayer.hand.push(card);

    return [newPlayer, newDeck];
};

/**
 * Discards a card from the hand of a player into their discard pile
 * @param player Player that discards a card
 * @param card Card to discard
 * @returns A new player object
 */
export const discardCard = (player: Player, card: Card) => {
    const newPlayer = R.clone(player);
    
    if (!hasCards(player.hand)) {
        return newPlayer;
    }

    newPlayer.hand = R.without([card], newPlayer.hand);
    newPlayer.discardPile.push(R.clone(card));
    return newPlayer;
};

/**
 * Create a card using a players energy
 * @param player Player that creates the card
 * @param card The card to create
 * @returns A new player object
 */
export const createCard = (player: Player, card: Card) => {
    const newPlayer = R.clone(player);

    if (!canCreate(player, card)) {
        throw "Cannot afford to create card";
    }

    newPlayer.energy -= card.weight;
    newPlayer.discardPile.push(R.clone(card));
    return newPlayer;
};
