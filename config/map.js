const BASE_GALAXY_SHAPES = ['elliptical', 'spiral_2', 'spiral_4', 'ring'];
const MAP_IS_STATIC_WITH_DATA_FROM_FILE = true;

const CLUSTER_METHOD = {
    constant: 'constant',
    everyXEmpire: 'one_every_x_empire',
};

const SPACE_PARTITION_METHOD = {
    breadthFirst: 'breadth_first',
    depthFirst: 'depth_first',
};

// if isStatic = false
export const generatedMapConfig = {
    starCount: 600,
    radius: 400,
}
// if isStatic = true
export const staticMapConfig = {
    generateId: true,
    generateName: true,
    positionMultiplier: 100,
}

export const mapConfig = {
    isStatic: MAP_IS_STATIC_WITH_DATA_FROM_FILE,
    coreRadius: 0,
    colonizablePlanetMultiplier: 1,
    primitivePlanetMultiplier: 0,
    supportedShapes: MAP_IS_STATIC_WITH_DATA_FROM_FILE ? [] : BASE_GALAXY_SHAPES,

    hyperlanes: {
        multiplier: {
            value: {min: 0.25, max: 300},
            default: 0.25,
        },
        isRandom: true,
        maxDistance: 100,
    },
    wormholes: {
        value: {min: 0, max: 5},
        default: 0,
    },
    gateways: {
        value: {min: 0, max: 5},
        default: 0,
    },
    clusters: {
        isActive: false,
        method: CLUSTER_METHOD.constant,
        count: 1,
        maxCount: 6,
        radius: 120,
        distanceFromCore: 10,
    },
    nebulas: {
        isActive: false,
        count: 6,
        size: 60,
        minDistance: 200,
    },
    spacePartitions: {
        isActive: false,
        homeSystem: {
            systems: {min: 8, max: 15},
            bridges: {min: 1, max: 4},
            method: SPACE_PARTITION_METHOD.breadthFirst,
        },
        openSpace: {
            systems: {min: 8, max: 15},
            bridges: {min: 1, max: 4},
            method: SPACE_PARTITION_METHOD.depthFirst,
        },
    },
}
