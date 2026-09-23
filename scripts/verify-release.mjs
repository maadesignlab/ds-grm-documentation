import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const root=process.cwd(), read=p=>fs.readFileSync(path.join(root,p),'utf8'), json=p=>JSON.parse(read(p));
const fail=m=>{throw new Error(m)}, assert=(c,m)=>{if(!c)fail(m)};
const stable=v=>JSON.stringify(v,(_k,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
const fnv=v=>{let h=2166136261;for(const c of stable(v)){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return(h>>>0).toString(16)};
const sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const manifest=json('design-system/release-manifest.json'), snapshot=json('design-system/figma-snapshot.json'), pkg=json('package.json'), lock=json('package-lock.json');
if (pkg.version === '1.1.1') { await import('./verify-patch-release.mjs'); process.exit(0); }
assert(pkg.version===manifest.version&&lock.version===pkg.version&&lock.packages[''].version===pkg.version,'Global version mismatch');
assert(manifest.status==='published','Unexpected release state');
const live=json(`docs/releases/${pkg.version}/live-variable-hashes.json`);
const rows=[...snapshot.variables].sort((a,b)=>a[0]<b[0]?-1:a[0]>b[0]?1:0);
assert(rows.length===live.count&&fnv(rows)===live.all,'Snapshot differs from recorded live Figma variables');
assert(fnv(rows.filter(v=>v[2]!=='VariableCollectionId:44:169'))===live.protected,'Protected primitives differ');
const sourceEntities=[...snapshot.variables,...snapshot.textStyles,...Object.values(snapshot.visualStyles).flat()];
assert(sourceEntities.length===manifest.entities.length,'Entity inventory incomplete');
for(const item of sourceEntities){const id=Array.isArray(item)?item[0]:item.id,e=manifest.entities.find(e=>e.id===id);assert(e&&e.sha256===sha(stable(item)),`Unversioned entity drift: ${id}`)}
for(const c of manifest.components){const mdx=read(`src/components/ui/${c.id}.mdx`);assert(mdx.includes(`<strong>v${c.version}</strong>`),`Local version mismatch: ${c.id}`)}
const history=json('design-system/release-history.json');
const currentRelease=history.releases.find(item=>item.version===pkg.version);
assert(currentRelease?.previousVersion==='1.0.0'&&currentRelease.publishedAt===manifest.publishedAt,'Release trajectory mismatch');
assert(manifest.approval.user==='approved'&&manifest.approval.published===true,'Release approval state mismatch');
for(const component of manifest.components){
 const record=currentRelease.componentVersions[component.id];
 assert(record?.from===component.previousVersion&&record?.to===component.version,`History version mismatch: ${component.id}`);
 assert(component.history.some(item=>item.version===component.version),`Missing component history: ${component.id}`);
}
assert(stable(json('public/r/release-history.json'))===stable(history),'Public release history mismatch');
assert(stable(json('storybook-static/r/release-history.json'))===stable(history),'Built release history mismatch');
const publicManifest=json('public/r/ai-manifest.json');
assert(publicManifest.designSystem.version===pkg.version,'Registry global version mismatch');
assert(publicManifest.components.every(c=>c.version===manifest.components.find(x=>x.id===c.slug)?.version),'Registry local version mismatch');
assert(read('STORYBOOK_UX_UI_CATALOG.md').includes(`version: "${pkg.version}"`),'Catalog version mismatch');
assert(!/NaN|undefined/.test(read('src/styles/tokens.css')),'Invalid CSS token');
const evidenceDir=`docs/releases/${pkg.version}/review-2026-09-23`;
const review=json(`${evidenceDir}/summary.json`), browser=json(`${evidenceDir}/browser.json`);
assert(review.snapshotSha256===sha(read('design-system/figma-snapshot.json')),'Review snapshot is stale');
const brands=['grm-global','reina-madre','maria-linda','piel-sana'];
assert(browser.playgrounds.length===204&&browser.errors.length===0,'Browser coverage incomplete');
assert(new Set(browser.playgrounds.map(x=>`${x.brand}:${x.id}`)).size===204,'Duplicate browser coverage');
assert(browser.playgrounds.every(x=>x.ready&&x.brand===x.requestedBrand&&x.manual.length===0),'Unresolved browser samples');
const roles=snapshot.variables.filter(v=>v[2]==='VariableCollectionId:44:169').length;
assert(browser.tokenParity.length===4&&new Set(browser.tokenParity.map(x=>x.brand)).size===4&&browser.tokenParity.every(x=>brands.includes(x.brand)&&x.brand===x.renderedBrand&&x.count===roles&&x.differences.length===0),'Semantic CSS parity failed');
assert(review.reportCases.length===53,'Original report cases incomplete');
for(const item of review.reportCases){
 if(item.status==='accepted-exception')assert(['reina-madre','piel-sana'].includes(item.brand)&&(String(item.background).startsWith('--primary')||item.variant==='brand-gradient'),'Exception outside approved scope');
 if(item.status==='passed')assert(item.ratio>=item.threshold,'False contrast approval');
}
const tests=json(`${evidenceDir}/story-tests.json`);
for(const brand of brands){const text=tests[brand].content.filter(x=>x.type==='text').map(x=>x.text).join('\n');assert(text.includes('## Passing Stories')&&!text.includes('## Failing Stories')&&!tests[brand].isError,`Story tests failed: ${brand}`);const ids=[...text.matchAll(/^- (components-[a-z0-9-]+--[a-z0-9-]+)$/gm)].map(x=>x[1]);assert(new Set(ids).size===51,`Incomplete story tests: ${brand}`);}
assert(review.counts.acceptedExceptions===28,'Approved exception inventory changed');
assert(review.toastChecks.length===24&&review.toastChecks.every(x=>x.ratio>=4.5&&x.status==='passed'),'Toast contrast review incomplete');
assert(browser.docs.length===12&&browser.docs.every(x=>x.ready&&x.brand===x.requestedBrand),'Variant documentation review incomplete');
assert(review.hoverChecks.length===20&&review.hoverChecks.every(x=>x.hover),'Actual hover review incomplete');
const foundationTests=json(`${evidenceDir}/foundation-tests.json`);
const foundationTestText=foundationTests.content.filter(x=>x.type==='text').map(x=>x.text).join('\n');
assert(!foundationTests.isError&&!foundationTestText.includes('## Failing Stories')&&foundationTestText.includes('## Passing Stories'),'Foundation tests failed');
assert(new Set([...foundationTestText.matchAll(/^- (foundations-[a-z0-9-]+--[a-z0-9-]+)$/gm)].map(x=>x[1])).size===5,'Foundation test coverage incomplete');
const closureTests=json(`docs/releases/${pkg.version}/closure-local/story-tests.json`);
for(const brand of brands){
 const result=closureTests[brand];
 const text=result.content.filter(item=>item.type==='text').map(item=>item.text).join('\n');
 assert(!result.isError&&text.includes('## Passing Stories')&&!text.includes('## Failing Stories')&&text.includes('- design-system-releases--local-review'),`Release review tests failed: ${brand}`);
}
const seal=json(`docs/releases/${pkg.version}/validation.json`);
assert(Object.entries(seal.checks).filter(([key])=>key!=='contrast').every(([,v])=>v.status==='passed'),'Required technical verification failed');
for(const [file,hash] of Object.entries(seal.files))assert(sha(fs.readFileSync(path.join(root,file)))===hash,`Changed since validation: ${file}`);
assert(stable(json('storybook-static/r/figma-snapshot.json'))===stable(snapshot),'Built artifact Figma snapshot mismatch');
assert(stable(json('storybook-static/r/release-manifest.json'))===stable(manifest),'Built artifact release manifest mismatch');
console.log(`Technical evidence verified: ${manifest.entities.length} entities, ${roles*4} semantic values, 204 browser views. Release metadata approved.`);
const unresolved=[...review.reportCases,...review.buttonStates,...review.renderedFailures,...review.docsFailures,...review.toastChecks,...review.hoverChecks].filter(x=>x.status==='failed');
assert(unresolved.length===0,`Release blocked: ${unresolved.length} contrast failures outside the approved exceptions. See ${evidenceDir}/INFORME.html`);
assert(seal.checks.contrast.status==='passed-with-exceptions','Contrast review incomplete');
console.log(`Release ${pkg.version} verified with explicit product exceptions. This is not a WCAG conformance certification.`);
console.log('Live Figma verification applies to the recorded snapshot; re-read Figma before any later publication.');
