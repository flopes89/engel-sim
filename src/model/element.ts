import { replicate, flatten } from "fp-ts/lib/Array";

export interface Element {
    name: string,
    orderNumber: number,
    weight: number,
};

export interface ElementDeckDefinition {
    [name: string]: number
};

const createElements = (definition: ElementDeckDefinition, element: Element): Element[] =>
    replicate(definition[element.name], element);

const buildDeck = (pool: Element[], definition: ElementDeckDefinition): Element[] =>
    flatten(pool.map(el => createElements(definition, el)));

const elementPool: Element[] = [
    { name: "H", orderNumber: 1, weight: 1, },
    { name: "He", orderNumber: 2, weight: 1, },
    { name: "Li", orderNumber: 3, weight: 1, },
    { name: "C", orderNumber: 6, weight: 1, },
    { name: "N", orderNumber: 7, weight: 1, },
    { name: "O", orderNumber: 8, weight: 1, },
    { name: "F", orderNumber: 9, weight: 1, },
    { name: "Ne", orderNumber: 10, weight: 1, },
    { name: "Na", orderNumber: 11, weight: 1, },
    { name: "Mg", orderNumber: 12, weight: 1, },
    { name: "Al", orderNumber: 13, weight: 1, },
    { name: "Si", orderNumber: 14, weight: 1, },
    { name: "P", orderNumber: 15, weight: 1, },
    { name: "S", orderNumber: 16, weight: 1, },
    { name: "Cl", orderNumber: 17, weight: 1, },
    { name: "K", orderNumber: 19, weight: 1, },
    { name: "Ca", orderNumber: 2, weight: 1, },
    { name: "Ti", orderNumber: 22, weight: 1, },
    { name: "Cr", orderNumber: 24, weight: 1, },
    { name: "Mn", orderNumber: 25, weight: 1, },
    { name: "Fe", orderNumber: 26, weight: 1, },
    { name: "Co", orderNumber: 27, weight: 1, },
    { name: "Ni", orderNumber: 28, weight: 1, },
    { name: "Cu", orderNumber: 29, weight: 1, },
    { name: "Zn", orderNumber: 30, weight: 1, },
    { name: "As", orderNumber: 33, weight: 1, },
    { name: "Se", orderNumber: 34, weight: 1, },
    { name: "Br", orderNumber: 35, weight: 1, },
    { name: "Kr", orderNumber: 36, weight: 1, },
    { name: "Mo", orderNumber: 42, weight: 1, },
    { name: "Ag", orderNumber: 47, weight: 1, },
    { name: "Sn", orderNumber: 50, weight: 1, },
    { name: "Nd", orderNumber: 60, weight: 1, },
    { name: "Pt", orderNumber: 78, weight: 1, },
    { name: "Au", orderNumber: 79, weight: 1, },
    { name: "Hg", orderNumber: 80, weight: 1, },
    { name: "Pb", orderNumber: 82, weight: 1, },
    { name: "U", orderNumber: 92, weight: 1, },
    { name: "Pu", orderNumber: 94, weight: 1, },
];

const elementDeckDefinition: ElementDeckDefinition = {
    "H": 2, "He": 2, "Li": 2, "C": 2, "N": 2, "O": 2, "F": 2, "Ne": 2, "Na": 2, "Mg": 2,
    "Al": 2, "Si": 2, "P": 2, "S": 2, "Cl": 2, "K": 2, "Ca": 2, "Ti": 2, "Cr": 2, "Mn": 2,
    "Fe": 2, "Co": 2, "Ni": 2, "Cu": 2, "Zn": 2, "As": 2, "Se": 2, "Br": 2, "Kr": 2, "Mo": 2,
    "Ag": 2, "Sn": 2, "Nd": 2, "Pt": 2, "Au": 2, "Hg": 2, "Pb": 2, "U": 2, "Pu": 2,
};
    
export const createDeck = (): Element[] => buildDeck(elementPool, elementDeckDefinition);

