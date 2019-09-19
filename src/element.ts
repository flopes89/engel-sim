import { replicate, flatten } from "fp-ts/lib/Array";

export interface Card {
    name: string,
    orderNumber: number,
    weight: number,
    seed: number,
};

export interface DeckDefinition {
    [name: string]: number
};

const createElements = (definition: DeckDefinition, card: Card): Card[] =>
    replicate(definition[card.name], card);

const buildDeck = (pool: Card[], definition: DeckDefinition): Card[] =>
    flatten(pool.map(card => createElements(definition, card)));

export const cardDefinitions: Card[] = [
    { name: "H", orderNumber: 1, weight: 1, seed: 0, },
    { name: "He", orderNumber: 2, weight: 1, seed: 0, },
    { name: "Li", orderNumber: 3, weight: 1, seed: 0, },
    { name: "C", orderNumber: 6, weight: 1, seed: 0, },
    { name: "N", orderNumber: 7, weight: 1, seed: 0, },
    { name: "O", orderNumber: 8, weight: 1, seed: 0, },
    { name: "F", orderNumber: 9, weight: 1, seed: 0, },
    { name: "Ne", orderNumber: 10, weight: 1, seed: 0, },
    { name: "Na", orderNumber: 11, weight: 1, seed: 0, },
    { name: "Mg", orderNumber: 12, weight: 1, seed: 0, },
    { name: "Al", orderNumber: 13, weight: 1, seed: 0, },
    { name: "Si", orderNumber: 14, weight: 1, seed: 0, },
    { name: "P", orderNumber: 15, weight: 1, seed: 0, },
    { name: "S", orderNumber: 16, weight: 1, seed: 0, },
    { name: "Cl", orderNumber: 17, weight: 1, seed: 0, },
    { name: "K", orderNumber: 19, weight: 1, seed: 0, },
    { name: "Ca", orderNumber: 2, weight: 1, seed: 0, },
    { name: "Ti", orderNumber: 22, weight: 1, seed: 0, },
    { name: "Cr", orderNumber: 24, weight: 1, seed: 0, },
    { name: "Mn", orderNumber: 25, weight: 1, seed: 0, },
    { name: "Fe", orderNumber: 26, weight: 1, seed: 0, },
    { name: "Co", orderNumber: 27, weight: 1, seed: 0, },
    { name: "Ni", orderNumber: 28, weight: 1, seed: 0, },
    { name: "Cu", orderNumber: 29, weight: 1, seed: 0, },
    { name: "Zn", orderNumber: 30, weight: 1, seed: 0, },
    { name: "As", orderNumber: 33, weight: 1, seed: 0, },
    { name: "Se", orderNumber: 34, weight: 1, seed: 0, },
    { name: "Br", orderNumber: 35, weight: 1, seed: 0, },
    { name: "Kr", orderNumber: 36, weight: 1, seed: 0, },
    { name: "Mo", orderNumber: 42, weight: 1, seed: 0, },
    { name: "Ag", orderNumber: 47, weight: 1, seed: 0, },
    { name: "Sn", orderNumber: 50, weight: 1, seed: 0, },
    { name: "Nd", orderNumber: 60, weight: 1, seed: 0, },
    { name: "Pt", orderNumber: 78, weight: 1, seed: 0, },
    { name: "Au", orderNumber: 79, weight: 1, seed: 0, },
    { name: "Hg", orderNumber: 80, weight: 1, seed: 0, },
    { name: "Pb", orderNumber: 82, weight: 1, seed: 0, },
    { name: "U", orderNumber: 92, weight: 1, seed: 0, },
    { name: "Pu", orderNumber: 94, weight: 1, seed: 0, },
];

export const deckDefinition: DeckDefinition = {
    "H": 2, "He": 2, "Li": 2, "C": 2, "N": 2, "O": 2, "F": 2, "Ne": 2, "Na": 2, "Mg": 2,
    "Al": 2, "Si": 2, "P": 2, "S": 2, "Cl": 2, "K": 2, "Ca": 2, "Ti": 2, "Cr": 2, "Mn": 2,
    "Fe": 2, "Co": 2, "Ni": 2, "Cu": 2, "Zn": 2, "As": 2, "Se": 2, "Br": 2, "Kr": 2, "Mo": 2,
    "Ag": 2, "Sn": 2, "Nd": 2, "Pt": 2, "Au": 2, "Hg": 2, "Pb": 2, "U": 2, "Pu": 2,
};
    
export const createDeck = (): Card[] => buildDeck(pool, deckDefinition);

