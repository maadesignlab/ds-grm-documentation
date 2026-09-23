import fs from 'node:fs';
import path from 'node:path';
import { comparableColor } from '../src/foundations/color-comparison.js';

const root = process.cwd();
const read = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const baseline = read('design-system/release-baseline-tokens.json');
const manifest = read('design-system/release-manifest.json');
const source = fs.readFileSync(path.join(root, 'src/foundations/semantic-brand-token-values.ts'), 'utf8');
const current = JSON.parse(source.slice(source.indexOf('{'), source.lastIndexOf('}') + 1));
const syncDir = `docs/releases/${manifest.version}`;
const delta = { changed: fs.readdirSync(path.join(root, syncDir)).filter(name => /^variables-sync-.*\.json$/.test(name)).sort().flatMap(name => read(`${syncDir}/${name}`).changed ?? []) };
const modes = { 'grm-global': '1154:0', 'reina-madre': '44:8', 'maria-linda': '132:1', 'piel-sana': '132:2' };
const cssName = name => name.startsWith('typography/') ? '--brand-font-' + name.split('/')[1] : '--' + name.replaceAll('%', '').replaceAll('/', '-');
const tokens = {};
function sameValue(a, b) {
  if (a === b) return true;
  const before = comparableColor(a), after = comparableColor(b);
  return Boolean(before && after && before.hex === after.hex && before.opacity === after.opacity);
}
for (const [brand, values] of Object.entries(current)) {
  const previous = new Map(Object.entries(baseline.semanticBrandTokenValues[brand]).map(([key, value]) => [key.replaceAll('/', '-'), { key, value }]));
  tokens[brand] = Object.fromEntries(Object.entries(values).map(([key, value]) => {
    const old = previous.get(key);
    const reasons = [];
    if (old && old.key !== key) reasons.push(`Nombre CSS normalizado: ${old.key} → ${key}.`);
    if (old && old.value !== value) reasons.push('Valor exportado actualizado; incluye cambios de notación CSS o familias de respaldo cuando corresponda.');
    if (old && delta.changed.some(change => cssName(change.after[1]) === key && JSON.stringify(change.before[4][modes[brand]]) !== JSON.stringify(change.after[4][modes[brand]]))) reasons.push('Referencia u opacidad actualizada en Figma.');
    return [key, { status: !old ? 'new' : sameValue(old.value, value) ? 'unchanged' : 'updated', previousName: old?.key ?? null, previousValue: old?.value ?? null, currentValue: value, reasons }];
  }));
}
fs.writeFileSync(path.join(root, 'src/foundations/token-changes.json'), JSON.stringify({ release: manifest.version, baselineRelease: baseline.release, baselineCommit: baseline.commit, tokens }, null, 2) + '\n');
console.log('Updated release token labels against the preserved published baseline.');
