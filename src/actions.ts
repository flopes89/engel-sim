import { Card } from "./deck";
import * as R from "ramda";
import { Player } from "./player";
import { canFuse, hasCards, canFiss } from "./constraints";

/**
 * Fiss a card from the perspective of a player
 * @param player Player that executes the action
 * @param card Card to fiss
 * @param target1 First fiss result card
 * @param target2 Second fiss result card
 */
export const fiss = (player: Player, card: Card, target1: Card, target2: Card): Player => {
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
    // TODO Energy output?
    return newPlayer;
};

/**
 * Fuses two cards from the perspective of a player
 * @param player Player that executes the action
 * @param card1 First card to fuse
 * @param card2 Second card to fuse
 * @param target Fusion target card
 */
export const fuse = (player: Player, card1: Card, card2: Card, target: Card): Player => {
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
    // TODO Energy output?
    return newPlayer;
};

/**
 * Destroy a card from a deck
 * @param deck Deck the destroy the card from
 * @param cards The card to destroy
 * @returns New deck without the card
 */
export const destroyCard = (deck: Card[], cards: Card[]): Card[] => R.without(cards, R.clone(deck));

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
export const discardCard = (player: Player, card: Card): Player => {
    const newPlayer = R.clone(player);
    
    if (!hasCards(player.hand)) {
        return newPlayer;
    }

    newPlayer.hand = R.without([card], newPlayer.hand);
    newPlayer.discardPile.push(R.clone(card));
    return newPlayer;
};
