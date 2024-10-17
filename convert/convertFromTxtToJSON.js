import fs from 'fs';

const INPUT = 'data.txt';
const OUTPUT = 'data.json';

const data = fs.readFileSync(INPUT, 'utf-8');
const mapContent = data.split('\n').filter(Boolean).map(convertSystem);

fs.writeFileSync(OUTPUT, JSON.stringify(mapContent));

function convertSystem(system) {
    const [systemName, x, y, z, tmp, type, exoplanetsCount] = system.split('\t');
    return [systemName, Number(x), Number(y), Number(z), type, exoplanetsCount ? Number(exoplanetsCount) : 0];
}
