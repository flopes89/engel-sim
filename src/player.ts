import _ from "lodash";
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

    const newPlayer = _.cloneDeep(player);
    const handCard = player.hand.find(c => _.isEqual(c, card));

    if (!handCard) {
        throw "Card must be in hand!";
    }

    newPlayer.hand = destroyCard(newPlayer.hand, [handCard]);
    newPlayer.discardPile.push(_.cloneDeep(target1));
    newPlayer.discardPile.push(_.cloneDeep(target2));

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

    const newPlayer = _.cloneDeep(player);
    const handCard1 = player.hand.find(c => _.isEqual(c, card1));
    const handCard2 = player.hand.find(c => _.isEqual(c, card2));

    if (!handCard1 || !handCard2) {
        throw "Cards must be in hand!";
    }

    newPlayer.hand = destroyCard(newPlayer.hand, [handCard1, handCard2]);
    newPlayer.discardPile.push(_.cloneDeep(target));

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
    const newPlayer = _.cloneDeep(player);
    const newDeck = _.cloneDeep(deck);
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
    const newPlayer = _.cloneDeep(player);
    
    if (!hasCards(player.hand)) {
        return newPlayer;
    }

    newPlayer.hand = newPlayer.hand.filter(c => _.isEqual(c, card));
    newPlayer.discardPile.push(_.cloneDeep(card));
    return newPlayer;
};

/**
 * Create a card using a players energy
 * @param player Player that creates the card
 * @param card The card to create
 * @returns A new player object
 */
export const createCard = (player: Player, card: Card) => {
    const newPlayer = _.cloneDeep(player);

    if (!canCreate(player, card)) {
        throw "Cannot afford to create card";
    }

    newPlayer.energy -= card.weight;
    newPlayer.discardPile.push(_.cloneDeep(card));
    return newPlayer;
};
