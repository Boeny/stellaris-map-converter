import fs from 'fs';
import {staticMapConfig} from './config/map.js';
import {commonConfig} from './config/common.js';

const YES_NO = {
    yes: 'yes',
    no: 'no',
};
const TAB = '\t';
const COO = ['x', 'y', 'z'];

export function yes(value) {
    return value ? YES_NO.yes : YES_NO.no;
}

export function getFieldObject(name, value, options = {}) {
    return {name, value, ...options};
}

export function renderField(name, value) {
    return `${name} = ${value}`;
}

function getTextValue(value) {
    return `"${value}"`;
}

export function renderBlock(fields, level = 0) {
    const tabs = level === -1 ? '' : [...Array(level)].map(() => TAB).join('');
    const delimiter = level === -1 ? '' : '\n';
    const beforeContent = level === -1 ? ' ' : delimiter + TAB + tabs;
    const afterContent = level === -1 ? ' ' : delimiter + tabs;

    const content = fields.filter((f) => f !== null)
        .map((f) => typeof f !== 'object' ? f : renderField(f.name, f.isText ? getTextValue(f.value) : f.value))
        .join(beforeContent);

    return '{' + beforeContent + content + afterContent + '}';
}

export function renderRange({min, max}) {
    return renderBlock([
        getFieldObject('min', min),
        getFieldObject('max', max),
    ], -1);
}

export function renderPartitionBlock({systems, bridges, method}) {
    return renderBlock([
        getFieldObject('min_systems', systems.min),
        getFieldObject('max_systems', systems.max),
        '',
        getFieldObject('min_bridges', bridges.min),
        getFieldObject('max_bridges', bridges.min),
        '',
        getFieldObject('method', method),
    ], 1);
}
/**
 *
 * @param {boolean} mapIsStatic
 * @param {object} options {filter?: Function, modify?: Function}
 * @returns {object[]} Field[] where Field is {name: string, value: string | number}
 */
export function getStaticMapData(mapIsStatic, options = {}) {
    if (!mapIsStatic) {
        return [];
    }

    let data = JSON.parse(fs.readFileSync(commonConfig.inputConfigFile));

    if (options.filter) {
        data = data.filter(options.filter);
    }
    if (options.modify) {
        data = data.map(options.modify);
    }

    return data;
}

export const prepareSystem = (positionMultiplier = 1) => (system, index) => {
    const [systemName, x, y, z] = system;
    const position = [x, y, z];

    return {
        id: index,
        name: systemName,
        position: position.map(coo => (coo * positionMultiplier).toFixed(3)),
    };
}

export function renderSystem(system) {
    const systemFields = [
        staticMapConfig.generateId ? getFieldObject('id', system.id) : null,
        staticMapConfig.generateName ? getFieldObject('name', system.name, {isText: true}) : null,
        getFieldObject('position', renderBlock(system.position.map((p, i) => getFieldObject(COO[i], p)), 2)),
    ];

    return getFieldObject('system', renderBlock(systemFields, 1));
}
