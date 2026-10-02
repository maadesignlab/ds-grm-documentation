import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
const read = p => JSON.parse(fs.readFileSync(p, 'utf8'));
const m = read('design-system/release-manifest.json');
const old = read('docs/releases/1.1.1/published-manifest.json');
const pkg = read('package.json'), lock = read('package-lock.json');
assert.equal(m.version, '1.2.0');
assert.equal(pkg.version, m.version); assert.equal(lock.version,m.version); assert.equal(lock.packages[''].version,m.version);
assert.equal(m.status,'published'); assert.equal(m.approval.published,true); assert.equal(m.approval.user,'approved');
assert.equal(m.publishedAt,'2026-10-02'); assert.equal(m.preparedAt,'2026-10-02');
assert.deepEqual(old,JSON.parse(execFileSync('git',['show','v1.1.1:design-system/release-manifest.json'],{encoding:'utf8'})));
assert.deepEqual(m.entities,old.entities,'Variables/styles must retain their versions');
for (const path of ['design-system/figma-snapshot.json','src/styles/tokens.css','src/foundations/semantic-brand-token-values.ts']) {
 assert.equal(fs.readFileSync(path,'utf8'),execFileSync('git',['show',`v1.1.1:${path}`],{encoding:'utf8',maxBuffer:10000000}),`Foundations changed: ${path}`);
}
const changed=['sheet','item','tabs','popover','combobox','stepper'];
assert.equal(m.components.length,old.components.length+1);
const h=read('design-system/release-history.json').releases;
assert.equal(h[0].version,m.version); assert.equal(h[0].previousVersion,'1.1.1'); assert.equal(h[0].publishedAt,m.publishedAt);
assert.deepEqual(h.slice(1),JSON.parse(execFileSync('git',['show','v1.1.1:design-system/release-history.json'],{encoding:'utf8'})).releases);
for (const c of m.components) {
 const prev=old.components.find(x=>x.id===c.id);
 if (!changed.includes(c.id)) { assert.deepEqual(c,prev); continue; }
 assert.equal(c.version,c.id==='stepper'?'1.0.0':'1.1.0');
 assert.equal(c.previousVersion,prev?.version??null);
 assert.deepEqual(h[0].componentVersions[c.id],{from:c.previousVersion,to:c.version});
 assert.equal(c.history[0].release,'1.2.0');
 assert(fs.readFileSync(`src/components/ui/${c.id}.mdx`,'utf8').includes(`<strong>v${c.version}</strong>`));
}
assert.equal(m.tooling[0].id,'storybook-inspector'); assert.equal(m.tooling[0].version,'1.0.0');
assert.deepEqual(h[0].toolingVersions['storybook-inspector'],{from:null,to:'1.0.0'});
for(const prefix of ['public/r','storybook-static/r']) {
 assert.deepEqual(read(`${prefix}/release-manifest.json`),m);
 assert.deepEqual(read(`${prefix}/release-history.json`).releases,h);
 const ai=read(`${prefix}/ai-manifest.json`);
 assert.equal(ai.designSystem.version,m.version);
 for(const c of ai.components) assert.equal(c.version,m.components.find(x=>x.id===c.slug)?.version);
 assert.equal(ai.components.find(c=>c.slug==='stepper').version,'1.0.0');
}
assert(fs.readFileSync('STORYBOOK_UX_UI_CATALOG.md','utf8').includes('version: "1.2.0"'));
assert.equal(fs.readdirSync('.changeset').filter(f=>f.endsWith('.md')&&f!=='README.md').length,0,'Changesets already consumed by local preparation');
console.log('Release 1.2.0 verified: six component histories, Inspector 1.0.0, unchanged foundations, preserved published history and registry parity. Publication approved with documented exceptions; this does not certify WCAG compliance.');

const seal=read('docs/releases/1.2.0/validation.json');
assert.equal(seal.version,m.version);
for (const [file,hash] of Object.entries(seal.files)) assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),hash,`Changed since local consolidation: ${file}`);
assert.equal(seal.checks.fullSuite.passed,97); assert.equal(seal.checks.fullSuite.failed,2);
assert.equal(seal.releaseReady,true); assert.equal(seal.technicalReady,true); assert.equal(seal.blockers.length,0); assert(seal.acceptedExceptions.some(x=>x.component==='Tabs'&&x.brand==='María Linda'));
console.log('Source seal verified. Technically ready with accepted contrast exceptions, including María Linda Tabs Underline. Publication approved by user.');
