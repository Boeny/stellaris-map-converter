import fs from 'fs';
import {getFieldObject, yes, renderBlock, renderRange, renderPartitionBlock, renderField, getStaticMapData, renderSystem, prepareSystem} from './utils.js';
import {commonConfig} from './config/common.js';
import {mapConfig, generatedMapConfig, staticMapConfig} from './config/map.js';
import {enemiesConfig} from './config/enemies.js';

// common
const commonFields = [
    getFieldObject('name', commonConfig.mapName, {isText: true}),
    getFieldObject('priority', commonConfig.mapNumber),
    getFieldObject('default', yes(commonConfig.mapIsDefault)),
    '',
    getFieldObject('crisis_strength', commonConfig.crisisStrengthMultiplier),
    getFieldObject('extra_crisis_strength', renderBlock(commonConfig.extraCrisisMultiplierValues, -1)),
];

// base map fields
const mapFields =  [
    '',
    mapConfig.isStatic ? null : getFieldObject('num_stars', generatedMapConfig.starCount),
	mapConfig.isStatic ? null : getFieldObject('radius', generatedMapConfig.radius),
    getFieldObject('core_radius', mapConfig.coreRadius),
    '',
    getFieldObject('colonizable_planet_odds', mapConfig.colonizablePlanetMultiplier),
    getFieldObject('primitive_odds', mapConfig.primitivePlanetMultiplier),
];

// enemies
const {AIPlayers, fallenEmpires, marauderEmpires, advancedEmpires} = enemiesConfig;
const enemiesFields = [
    '',
    getFieldObject('num_empires', renderRange(AIPlayers.value)),
	getFieldObject('num_empire_default', AIPlayers.default),
    getFieldObject('fallen_empire_max', fallenEmpires.max),
    getFieldObject('fallen_empire_default', fallenEmpires.default),
    getFieldObject('marauder_empire_max', marauderEmpires.max),
    getFieldObject('marauder_empire_default', marauderEmpires.default),
    getFieldObject('advanced_empire_default', advancedEmpires.default),
];

// clusters
const {clusters} = mapConfig;
const clusterFields = clusters.isActive ? [
    '',
    getFieldObject('cluster_count', renderBlock([
        getFieldObject('method', clusters.method),
        getFieldObject('value', clusters.count),
        getFieldObject('max', clusters.maxCount),
    ], 1)),
    getFieldObject('cluster_radius', clusters.radius),
    getFieldObject('cluster_distance_from_core', clusters.distanceFromCore),
] : [];

// hyperlanes, wormholes and gateways
const {hyperlanes, wormholes, gateways} = mapConfig;
const hyperlaneFields = [
    '',
    getFieldObject('max_hyperlane_distance', hyperlanes.maxDistance),
    getFieldObject('num_hyperlanes', renderRange(hyperlanes.multiplier.value)),
    getFieldObject('num_hyperlanes_default', hyperlanes.multiplier.default),
    getFieldObject('random_hyperlanes', yes(hyperlanes.isRandom)),
];
const wormholeFields = [
    getFieldObject('num_wormhole_pairs', renderRange(wormholes.value)),
    getFieldObject('num_wormhole_pairs_default', wormholes.default),
];
const gatewayFields = [
    getFieldObject('num_gateways', renderRange(gateways.value)),
    getFieldObject('num_gateways_default', gateways.default),
];

// partitions
const {spacePartitions} = mapConfig;
const partitionFields = spacePartitions.isActive ? [
    '',
    getFieldObject('home_system_partitions', renderPartitionBlock(spacePartitions.homeSystem)),
    getFieldObject('open_space_partitions', renderPartitionBlock(spacePartitions.openSpace)),
] : [];

// nebulas
const {nebulas} = mapConfig;
const nebulaFields = nebulas.isActive ? [
    '',
    getFieldObject('num_nebulas', nebulas.count),
    getFieldObject('nebula_size', nebulas.size),
    getFieldObject('nebula_min_dist', nebulas.minDistance),
] : [];

// supported shapes
const supportedGalaxyShapes = mapConfig.supportedShapes.length > 0 ? [
    '',
    ...mapConfig.supportedShapes.map((shape) => getFieldObject('supports_shape', shape)),
] : [];

// all content
const mapContent = renderField('static_galaxy_scenario', renderBlock([
    ...commonFields,
    ...mapFields,
    ...enemiesFields,
    ...hyperlaneFields,
    ...wormholeFields,
    ...gatewayFields,
    ...clusterFields,
    ...partitionFields,
    ...nebulaFields,
    ...supportedGalaxyShapes,
    '',
    ...getStaticMapData(mapConfig.isStatic)
        .map(prepareSystem(staticMapConfig.positionMultiplier))
        .map(renderSystem),
]));

fs.writeFileSync(commonConfig.outputMapFile, mapContent);

console.log('map created sucessfully')
