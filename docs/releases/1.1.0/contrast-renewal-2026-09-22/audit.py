import json, math, re
from pathlib import Path
ROOT=Path('/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation')
OUT=Path(__file__).parent
snapshot=json.loads((ROOT/'design-system/figma-snapshot.json').read_text())
vs={v[0]:v for v in snapshot['variables']}
semantic={v[1]:v for v in vs.values() if v[2]=='VariableCollectionId:44:169'}
brands={'GRM Global':'1154:0','Reina Madre':'44:8','Maria Linda':'132:1','Piel Sana':'132:2'}
def resolve(v,mode,seen=()):
 if v[0] in seen:raise ValueError('cycle')
 x=v[4].get(mode,next(iter(v[4].values())));seen=seen+(v[0],)
 if isinstance(x,dict) and x.get('type')=='VARIABLE_ALIAS':return resolve(vs[x['id']],mode,seen)
 if isinstance(x,dict) and 'color' in x:
  c=resolve(vs[x['color']['id']],mode,seen).copy();c['a']=c.get('a',1)*x.get('opacity',100)/100;return c
 return x
def rgb(c):return [c[k] for k in ('r','g','b')]
def over(f,b):return [f.get('a',1)*x+(1-f.get('a',1))*y for x,y in zip(rgb(f),b)]
def lum(c):return sum(w*(x/12.92 if x<=0.04045 else ((x+0.055)/1.055)**2.4) for w,x in zip((.2126,.7152,.0722),c))
def contrast(a,b):
 l,h=sorted((lum(a),lum(b)));return (h+.05)/(l+.05)
def hx(c):return '#'+''.join(f'{round(x*255):02x}' for x in c)
def color(name,mode):return resolve(semantic[name],mode)
pairs=[]
def add(case,fg,bg,threshold=4.5,context='text'):
 if fg in semantic and bg in semantic:pairs.append((case,fg,bg,threshold,context))
for args in [('Texto secundario','muted/foreground','background'),('Enlaces con primary','primary','card'),('Texto de error (imagen)','destructive','card'),('Semáforo · Con lugares','success/light-foreground','success/light'),('Semáforo · Quedan pocos','warning/light-foreground','warning/light'),('Semáforo · Sin lugares','muted/foreground','muted')]:add(*args)
for family in ['primary','secondary','accent','success','warning','error','destructive','info']:
 for state in ['', '-hover','-active']:add(f'{family} sólido {state or "default"}',family+'/foreground',family+state)
 for state in ['', '-hover','-active']:add(f'{family} light {state or "default"}',family+'/light-foreground',family+'/light'+state)
 for bg in ['card','background']:add(f'{family} texto accesible / {bg}',family+'/default-foreground',bg)
for fg,bg in [('foreground','background'),('card/foreground','card'),('popover/foreground','popover'),('muted/foreground','card'),('muted/foreground','input/50%'),('foreground/60%','background'),('sidebar/foreground','sidebar'),('sidebar/primary/foreground','sidebar/primary'),('sidebar/accent/foreground','sidebar/accent'),('foreground','table/header/background'),('foreground','table/row-alternate'),('muted/foreground','muted/50%'),('muted/foreground','muted/40%'),('muted/foreground','muted/30%'),('muted/foreground','muted/20%')]:add(f'{fg} / {bg}',fg,bg)
for fg in ['border','input','ring','ring/50%','ring/15%','sidebar/ring']:
 for bg in ['card','background']:add(f'Indicador {fg} / {bg}',fg,bg,3,'conditional-non-text')
for name in semantic:
 if name.startswith('appointment/') and name.endswith('/foreground'):add(name,name,name.rsplit('/',1)[0]+'/light')
rows=[]
for brand,mode in brands.items():
 for case,fg,bg,threshold,context in pairs:
  b=over(color(bg,mode),[1,1,1]);f=over(color(fg,mode),b);ratio=contrast(f,b)
  rows.append(dict(brand=brand,case=case,foregroundToken=fg,backgroundToken=bg,foreground=hx(f),background=hx(b),ratio=ratio,threshold=threshold,passes=ratio>=threshold,context=context,backdrop='white'))
gradients=[]
for brand,mode in brands.items():
 a=rgb(color('button/brand-gradient-1',mode));b=rgb(color('button/brand-gradient-2',mode));samples=[contrast([1,1,1],[x*(1-t/1000)+y*t/1000 for x,y in zip(a,b)]) for t in range(1001)]
 gradients.append(dict(brand=brand,start=hx(a),end=hx(b),foreground='#ffffff',minimum=min(samples),maximum=max(samples),threshold=4.5,wholeGradientPasses=min(samples)>=4.5,method='1001 sRGB samples; whole fill, not a glyph-position verdict'))
# Proposals only: nearest existing primary/status shade that meets AA with white.
proposals=[]
for brand,mode in brands.items():
 for family in ['primary','status/success','status/error','status/destructive']:
  candidates=[]
  for v in vs.values():
   if v[2]=='VariableCollectionId:16:8' and re.fullmatch(re.escape(brand+'/'+family)+r'/\d+',v[1]):
    c=resolve(v,mode);ratio=contrast([1,1,1],rgb(c))
    if ratio>=4.5:candidates.append(dict(token=v[1],hex=hx(rgb(c)),ratio=ratio))
  if candidates:proposals.append(dict(brand=brand,family=family,lightestPassing=max(candidates,key=lambda c:lum([int(c['hex'][i:i+2],16)/255 for i in [1,3,5]]))))
data=dict(figmaHash='333a943a',variables=len(vs),pairs=rows,gradients=gradients,proposals=proposals)
(OUT/'contrast.json').write_text(json.dumps(data,indent=2,ensure_ascii=False))
print(json.dumps({'cases':len(rows),'textFailures':sum(not r['passes'] and r['context']=='text' for r in rows),'conditionalIndicatorFailures':sum(not r['passes'] and r['context']!='text' for r in rows),'gradient':gradients,'failedText':[(r['brand'],r['case'],round(r['ratio'],2)) for r in rows if not r['passes'] and r['context']=='text'],'proposals':proposals},ensure_ascii=False,indent=2))
