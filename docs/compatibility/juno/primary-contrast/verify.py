from pathlib import Path
import json,re,subprocess,hashlib
r=Path('/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation');ev=r/'docs/compatibility/juno/primary-contrast';live=json.loads((ev/'figma-live.json').read_text());snap=json.loads((r/'design-system/figma-snapshot.json').read_text());by={v[0]:v for v in snap['variables']}
for v in live['variables']:assert by[v[0]]==v
old=json.loads(subprocess.check_output(['git','show','HEAD:design-system/figma-snapshot.json'],cwd=r,text=True));oldby={v[0]:v for v in old['variables']};allowed={v[0] for v in live['variables']}
for k,v in by.items():
 if k not in allowed:assert v==oldby[k],k
for id in ['VariableID:44:41','VariableID:132:772']:assert by[id]==oldby[id]
s=(r/'src/foundations/semantic-brand-token-values.ts').read_text();values=json.loads(s[s.index('{'):s.rindex('}')+1]);css=(r/'src/styles/tokens.css').read_text();count=0
for brand,vals in values.items():
 body=css.split('[data-theme="'+brand+'"] {')[1].split('}')[0];actual=dict(re.findall(r'(--[\w-]+):\s*([^;]+);',body))
 for k,v in vals.items():assert actual[k]==v,(brand,k);count+=1
for folder in ['public/r','storybook-static/r']:
 assert json.loads((r/folder/'figma-snapshot.json').read_text())==snap
 assert json.loads((r/folder/'pending-token-update.json').read_text())==json.loads((r/'design-system/pending-token-update.json').read_text())
 registry=json.loads((r/folder/'grm-base.json').read_text());assert any(f.get('content')==css for f in registry['files'])
def ratio(h):
 c=[int(h[i:i+2],16)/255 for i in (1,3,5)];l=sum(w*(x/12.92 if x<=.04045 else ((x+.055)/1.055)**2.4) for w,x in zip([.2126,.7152,.0722],c));return 1.05/(l+.05)
contrasts={b:{k:ratio(values[b][k]) for k in ['--primary','--primary-hover','--primary-active']} for b in ['reina-madre','piel-sana']}
assert all(v>=4.5 for b in contrasts.values() for v in b.values())
result={'date':'2026-10-14','scope':'9 variables from live Figma; inherited semantic values regenerated','liveRowsVerified':len(live['variables']),'semanticValuesVerified':count,'protected500':'unchanged','unrelatedSnapshotVariables':'unchanged','registryAndStaticBuildParity':True,'contrastWithWhite':contrasts,'build':'passed','typecheck':'passed','functionalStories':'95 passed in broad run; Sheet calendar visibility failed once and passed focused rerun with accessibility','limitations':['Not a full-file fresh Figma audit','Gradient contrast and other brand exceptions remain separately reviewable','No release published']}
(ev/'validation.json').write_text(json.dumps(result,indent=2)+'\n');print(json.dumps(result,indent=2))
