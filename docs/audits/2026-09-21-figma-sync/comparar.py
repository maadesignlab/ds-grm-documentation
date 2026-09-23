import json,re,glob,math,pathlib,collections
BASE=pathlib.Path(__file__).parent
REPO=pathlib.Path('/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation')
def save(name,data): (BASE/name).write_text(json.dumps(data,ensure_ascii=False,indent=2))
variables=sum([json.loads(p.read_text()) for p in BASE.glob('variables*.json')],[])
V={v[0]:dict(zip(['id','name','collection','type','values'],v)) for v in variables}
assert len(V)==833
collections_=json.loads((BASE/'inventario-figma.json').read_text())['collections']
C={c['id']:c for c in collections_}
def resolve(id,mode,trail=None):
 v=V[id]; m=mode if mode in v['values'] else C[v['collection']]['modes'][0]['modeId']; val=v['values'][m]
 trail=(trail or [])+[v['name']]
 if isinstance(val,dict) and val.get('type')=='VARIABLE_ALIAS':return resolve(val['id'],mode,trail)
 return val,trail
def rgba(val):
 if isinstance(val,dict) and 'r' in val:return tuple(val[k] for k in ['r','g','b'])+(val.get('a',1),)
 if not isinstance(val,str):return None
 if val.startswith('#'):
  h=val[1:];h=''.join(c*2 for c in h) if len(h)==3 else h
  return tuple(int(h[i:i+2],16)/255 for i in [0,2,4])+(1,)
 if val.startswith('oklch('):
  nums=[float(x) for x in re.findall(r'[-+]?\d*\.?\d+',val)];L,ch,h=nums[:3];a=ch*math.cos(math.radians(h));b=ch*math.sin(math.radians(h))
  l=(L+.3963377774*a+.2158037573*b)**3;m=(L-.1055613458*a-.0638541728*b)**3;s=(L-.0894841775*a-1.291485548*b)**3
  lin=[4.0767416621*l-3.3077115913*m+.2309699292*s,-1.2684380046*l+2.6097574011*m-.3413193965*s,-.0041960863*l-.7034186147*m+1.707614701*s]
  rgb=[12.92*x if x<=.0031308 else 1.055*x**(1/2.4)-.055 for x in lin]
  alpha=nums[3]/100 if len(nums)>3 and '%' in val else nums[3] if len(nums)>3 else 1
  return tuple(rgb)+(alpha,)
 if val.startswith(('rgb(','rgba(')):
  parts=val[val.index('(')+1:-1].replace(',',' ').split('/'); nums=[float(x) for x in re.findall(r'[\d.]+',parts[0])];alpha=float(re.findall(r'[\d.]+',parts[1])[0])/(100 if '%' in parts[1] else 1) if len(parts)>1 else 1
  return tuple(x/255 for x in nums[:3])+(alpha,)
 return None
def formatted(val):
 c=rgba(val)
 if c:return '#'+''.join(f'{max(0,min(255,round(x*255))):02x}' for x in c[:3])+(f' / {c[3]:.0%}' if c[3]<.99999 else '')
 return val
def equal(a,b):
 ra,rb=rgba(a),rgba(b)
 return max(abs(x-y) for x,y in zip(ra,rb))<=.6/255 if ra and rb else a==b
def tsjson(path):
 s=(REPO/path).read_text();s=s[s.index('=')+1:s.index(' as const')].strip().rstrip(';');return json.loads(s)
doc=tsjson('src/foundations/semantic-brand-token-values.ts')
css=(REPO/'src/styles/tokens.css').read_text();blocks={}
for selector,body in re.findall(r'([^{}]+)\{([^{}]*)\}',re.sub(r'/\*.*?\*/','',css,flags=re.S)):
 blocks[selector.strip()]=dict(re.findall(r'(--[\w/-]+)\s*:\s*([^;]+);',body))
brands=['grm-global','reina-madre','maria-linda','piel-sana'];modes=['1154:0','44:8','132:1','132:2'];semantic=[v for v in V.values() if v['collection']=='VariableCollectionId:44:169']
rows=[]
for brand,mode in zip(brands,modes):
 active={**blocks[':root'],**blocks.get('[data-theme="'+brand+'"]',{})}
 for v in semantic:
  val,trail=resolve(v['id'],mode); key='--'+v['name'].replace('%','').replace('/','-'); dk='--'+v['name'].replace('%','');dk=dk if dk in doc[brand] else key
  olddoc=doc[brand].get(dk);oldcss=active.get(key)
  def cssresolve(value,seen=()):
   match=re.fullmatch(r'var\((--[\w-]+)\)',value or '')
   if match and match[1] not in seen:return cssresolve(active.get(match[1]),seen+(match[1],))
   return value
  oldcss=cssresolve(oldcss)
  rows.append(dict(brand=brand,name=v['name'],id=v['id'],css=key,figma=formatted(val),raw=val,alias=trail,documentation=olddoc,implementation=oldcss,docStatus='missing' if olddoc is None else 'equal' if equal(val,olddoc) else 'different',cssStatus='missing' if oldcss is None else 'equal' if equal(val,oldcss) else 'different'))
save('comparacion-tokens.json',rows)
styles=json.loads((BASE/'estilos-texto.json').read_text()); old=tsjson('src/foundations/typography-style-values.ts');byid={s['figmaStyleId']:s for s in old};sd=[]
for id,name,font,size,line,letter,case,deco,bound in styles:
 actual=dict(name=name,family=font['family'],fontStyle=font['style'],size=size,lineHeight='Auto' if line['unit']=='AUTO' else str(line['value']).removesuffix('.0')+('px' if line['unit']=='PIXELS' else '%'),letterSpacing=str(letter['value']).removesuffix('.0')+('px' if letter['unit']=='PIXELS' else '%'),textCase=case,textDecoration=deco)
 prev=byid.get(id); diff={k:dict(code=prev.get(k),figma=v) for k,v in actual.items() if prev and (abs(prev[k]-v)>.0001 if isinstance(v,(int,float)) else prev.get(k)!=v)}
 sd.append(dict(id=id,name=name,status='new' if not prev else 'different' if diff else 'equal',changes=diff,figma=actual))
for x in old:
 if x['figmaStyleId'] not in {s[0] for s in styles}:sd.append(dict(id=x['figmaStyleId'],name=x['name'],status='absent-in-figma'))
save('comparacion-tipografia.json',sd)
extra=dict(re.findall(r"\['([^']+)',\s*'([^']+)'\]",(REPO/'src/foundations/extra-color-token-values.ts').read_text()))
er=[]
for v in V.values():
 if v['collection']=='VariableCollectionId:3515:13496':
  val,_=resolve(v['id'],'3515:0');er.append(dict(name=v['name'],figma=formatted(val),code=extra.get(v['name']),status='equal' if equal(val,extra.get(v['name'])) else 'different'))
save('comparacion-extra-colors.json',er)
print('Semantic',len(rows),collections.Counter(x['cssStatus'] for x in rows),'docs',collections.Counter(x['docStatus'] for x in rows))
print('Typography',collections.Counter(x['status'] for x in sd));print('Extra',collections.Counter(x['status'] for x in er))
for x in sd:
 if x['status'] in ['new','different']:print(x['name'],x['changes'])
