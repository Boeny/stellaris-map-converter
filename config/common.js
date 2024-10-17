const MAP_NAME = 'solar_system_nearby_stars';

export const commonConfig = {
    inputConfigFile: 'convert/data.json',
    outputMapFile: `build/${MAP_NAME}.txt`,
    mapName: MAP_NAME,
    mapNumber: 5,
    mapIsDefault: true,
    crisisStrengthMultiplier: 1,
    extraCrisisMultiplierValues: [10, 25],
}
