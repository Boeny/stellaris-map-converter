const MAP_NUMBER = 9;
const MAP_NAME = `${MAP_NUMBER}_5small_sun_stars`;

export const commonConfig = {
    inputConfigFile: 'convert/data.json',
    outputMapFile: `build/${MAP_NAME}.txt`,
    mapName: MAP_NAME,
    mapNumber: MAP_NUMBER,
    mapIsDefault: true,
    crisisStrengthMultiplier: 1,
    extraCrisisMultiplierValues: [10, 25],
}
