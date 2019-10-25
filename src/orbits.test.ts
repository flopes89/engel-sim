import { Planet, Temperature, Seed, Orbits, reorder } from "./orbits";

const balancedPlanet: Planet = {
    temperature: Temperature.BALANCED,
    seed: Seed.BALANCED,
};

const hotSlowPlanet: Planet = {
    temperature: Temperature.HOT,
    seed: Seed.HYDRIDAE,
};

const coldFastPlanet: Planet = {
    temperature: Temperature.FREEZING,
    seed: Seed.PALAEOPTERA,
};

const hotFastPlanet: Planet = {
    temperature: Temperature.HOT,
    seed: Seed.PALAEOPTERA,
};

const coldSlowPlanet: Planet = {
    temperature: Temperature.FREEZING,
    seed: Seed.HYDRIDAE,
};

const orbits: Orbits = {
    planets: [
        balancedPlanet,
        hotSlowPlanet,
        coldFastPlanet,
        hotFastPlanet,
        coldSlowPlanet,
    ]
}

test("reordering planets", () => {
    expect(reorder(orbits)).toMatchObject({
        planets: [
            coldFastPlanet,
            balancedPlanet,
            hotFastPlanet,
            coldSlowPlanet,
            hotSlowPlanet,
        ]
    })
});
