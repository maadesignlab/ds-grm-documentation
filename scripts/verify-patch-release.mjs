import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const m = read('design-system/release-manifest.json');
const baseline = read('docs/releases/1.1.0/published-manifest.json');
const seal = read('docs/releases/1.1.1/validation.json');
assert.equal(m.version, '1.1.1');
assert.equal(read('package.json').version, m.version);
const lock = read('package-lock.json');
assert.equal(lock.version, m.version); assert.equal(lock.packages[''].version, m.version);
assert.deepEqual(m.entities, baseline.entities, 'Patch must not modify tokens or styles');
for (const component of m.components) {
  const previous = baseline.components.find(c => c.id === component.id);
  if (['sheet','drawer'].includes(component.id)) {
    assert.equal(component.version, '1.0.2'); assert.equal(component.previousVersion, previous.version);
    assert(fs.readFileSync(`src/components/ui/${component.id}.tsx`, 'utf8').includes('bg-(--sheet-drawer)'));
  } else assert.deepEqual(component, previous, `Unexpected component change: ${component.id}`);
}
const oldSeal=read('docs/releases/1.1.0/validation.json');
for(const path of ['design-system/figma-snapshot.json','src/styles/tokens.css','src/foundations/semantic-brand-token-values.ts']) assert.equal(sha(path),oldSeal.files[path],`Unexpected foundation change: ${path}`);
const figma=read('docs/releases/1.1.1/figma-reconciliation.json');
assert.equal(figma.variableHash,'b0ca9a2f'); assert.equal(figma.sheetNodes.length,4); assert.equal(figma.drawerNodes.length,3);
const visual=read('docs/releases/1.1.1/browser.json'); assert.equal(visual.length,28);
assert(visual.every(r=>r.background==='rgb(255, 255, 255)' && (r.bleed===null || r.bleed==='rgb(255, 255, 255)')));
for(const result of Object.values(read('docs/releases/1.1.1/story-tests.json'))) {
  const text=result.content.filter(c=>c.type==='text').map(c=>c.text).join('\n');
  assert(!result.isError && text.includes('## Passing Stories') && !text.includes('## Failing Stories'));
  for(const id of ['components-sheet--playground','components-drawer--playground']) assert(text.includes(id));
}
const history=read('design-system/release-history.json'); assert.equal(history.releases[0].version,'1.1.1');assert.equal(history.releases[0].previousVersion,'1.1.0');
for(const prefix of ['public/r','storybook-static/r']) {assert.deepEqual(read(`${prefix}/release-manifest.json`),m);assert.deepEqual(read(`${prefix}/release-history.json`),history);}
assert(Object.values(seal.checks).every(value=>value==='passed'));
for(const [path,hash] of Object.entries(seal.files)) assert.equal(sha(path),hash,`Changed since validation: ${path}`);
console.log('Patch 1.1.1 verified: Sheet/Drawer 1.0.2; 28 rendered backgrounds; four-brand tests; foundations unchanged.');
