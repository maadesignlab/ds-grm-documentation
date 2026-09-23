import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const stable = v => JSON.stringify(v, (_k, x) => x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)) : x);
const sha = v => crypto.createHash('sha256').update(stable(v)).digest('hex');
const snapshot = read('design-system/figma-snapshot.json');
const manifest = read('design-system/release-manifest.json');
const evidence = `docs/releases/${manifest.version}/reconciliation-2026-09-23`;
const live = read(`${evidence}/live-foundations.json`);
const followupPath = `docs/releases/${manifest.version}/variables-sync-2026-09-23-active.json`;
if (fs.existsSync(followupPath)) {
  const delta = read(followupPath);
  for (const change of delta.changed) {
    const index = live.variables.findIndex(v => v[0] === change.before[0]);
    assert.deepEqual(live.variables[index], change.before, 'Follow-up base mismatch');
    live.variables[index] = change.after;
  }
  live.variables.push(...delta.added);
  live.variables.sort((a, b) => a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0);
  for (const collection of live.discovery.collections) collection.count = live.variables.filter(v => v[2] === collection.id).length;
}

for (const key of ['variables', 'textStyles', 'visualStyles']) assert.deepEqual(snapshot[key], live[key], `Live capture mismatch: ${key}`);
assert.deepEqual(snapshot.collections, live.discovery.collections);
const entities = [...snapshot.variables, ...snapshot.textStyles, ...Object.values(snapshot.visualStyles).flat()];
assert.equal(manifest.entities.length, entities.length);
assert.equal(new Set(manifest.entities.map(e => e.id)).size, entities.length);
for (const entity of entities) {
  const id = Array.isArray(entity) ? entity[0] : entity.id;
  assert.equal(manifest.entities.find(e => e.id === id)?.sha256, sha(entity), `Entity drift: ${id}`);
}
const pages = read(`${evidence}/live-pages.json`);
for (const page of pages) {
  const baseline = read(`docs/releases/${manifest.version}/page-final-${page.page.replace(':', '-')}.json`);
  assert.equal(page.definitionCount, baseline.definitionCount, page.name);
  assert.deepEqual(page.sets, baseline.sets, page.name);
}
const publicManifest = read('public/r/ai-manifest.json');
for (const component of manifest.components) {
  assert.ok(pages.some(p => p.page === component.page), `Uninspected component: ${component.id}`);
  const entry = publicManifest.components.find(c => c.slug === component.id);
  const implementation = entry?.implementation ?? entry?.example;
  assert.ok(implementation && fs.existsSync(implementation), `Missing implementation/composition: ${component.id}`);
}
const tokensSource = fs.readFileSync('src/foundations/semantic-brand-token-values.ts', 'utf8');
const tokens = JSON.parse(tokensSource.slice(tokensSource.indexOf('=') + 1).replace(/as const;\s*$/, '').trim());
const css = fs.readFileSync('src/styles/tokens.css', 'utf8');
let values = 0;
for (const [brand, entries] of Object.entries(tokens)) {
  const body = css.split(`[data-theme="${brand}"] {`)[1]?.split('}')[0];
  assert.ok(body, `Missing CSS theme ${brand}`);
  for (const [name, value] of Object.entries(entries)) {
    assert.ok(body.includes(`${name}: ${value};`), `CSS mismatch: ${brand} ${name}`);
    values++;
  }
}
const typographySource = fs.readFileSync('src/foundations/typography-style-values.ts', 'utf8');
const typography = JSON.parse(typographySource.slice(typographySource.indexOf('=') + 1).split(' as const;')[0].trim());
assert.equal(typography.length, snapshot.textStyles.length);
for (const style of snapshot.textStyles) assert.ok(typography.some(s => s.figmaStyleId === style[0] && s.name === style[1] && s.size === Number(style[3].toFixed(4))), `Missing typography: ${style[1]}`);
for (const prefix of ['public/r', 'storybook-static/r']) {
  assert.deepEqual(read(`${prefix}/figma-snapshot.json`), snapshot, `Stale snapshot: ${prefix}`);
  assert.deepEqual(read(`${prefix}/release-manifest.json`), manifest, `Stale manifest: ${prefix}`);
}
console.log(`Reconciled: ${entities.length} entities, ${pages.length} component pages, ${values} CSS values, ${typography.length} text styles. Figma capture: ${live.capturedAt}.`);
console.log('Scope: source synchronization and component inventory/property schemas. This is not the release or WCAG approval.');

// Validate the latest live recheck against the current snapshot and inventory.
const recheck = read(`${evidence}/recheck-after-toast.json`);
const fingerprint = value => {
  let h = 2166136261;
  for (const char of stable(value)) { h ^= char.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16);
};
for (const key of ['variables', 'textStyles', 'visualStyles', 'collections']) {
  assert.equal(fingerprint(snapshot[key]), recheck.foundations.hashes[key], `Latest live mismatch: ${key}`);
}
assert.equal(recheck.pages.length, pages.length);
assert.equal(new Set(recheck.pages.map(page => page.page)).size, pages.length);
for (const page of pages) {
  const current = recheck.pages.find(row => row.page === page.page);
  assert.equal(current?.hash, fingerprint(page), `Latest component inventory mismatch: ${page.name}`);
}
for (const prefix of ['public/r', 'storybook-static/r']) {
  const toastRegistry = read(`${prefix}/toast.json`);
  const toastSource = fs.readFileSync('src/components/ui/toast.tsx', 'utf8');
  const publishedSource = toastRegistry.files.find(file => file.path.endsWith('/toast.tsx'))?.content;
  assert.equal(publishedSource, toastSource, `Stale Toast implementation: ${prefix}`);
  assert.ok(!toastSource.includes('text-current/72'), 'Toast opacity regression');
}
console.log(`Latest live recheck: ${recheck.capturedAt}; foundations and all ${pages.length} component inventories match; Toast registry matches source.`);
