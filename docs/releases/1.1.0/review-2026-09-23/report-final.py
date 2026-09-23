import json,re,hashlib,html
from pathlib import Path
R=Path('/Users/miguelarias/DEV/REINA MADRE/ds-grm-documentation');D=Path(__file__).parent
old=json.load(open(D.parent/'storybook-contraste-actual/evidencia.json'));live=json.load(open(D/'browser-final.json'))
src=(R/'src/foundations/semantic-brand-token-values.ts').read_text();tokens=json.loads(src.split('=',1)[1].rsplit('as const;',1)[0])
def rgb(s):
 if s.startswith('#'):return [int(s[i:i+2],16) for i in (1,3,5)]
 return [float(n) for n in re.findall(r'[\d.]+',s)][:3]
def lum(c):return sum(w*(x/255/12.92 if x/255<=.04045 else ((x/255+.055)/1.055)**2.4) for w,x in zip([.2126,.7152,.0722],c))
def ratio(a,b):return (max(lum(a),lum(b))+.05)/(min(lum(a),lum(b))+.05)
def token(s):return '--'+s.split(' → ')[0].replace('/','-').replace('%','')
def gradient(b):
 a=rgb(tokens[b]['--button-brand-gradient-1']);z=rgb(tokens[b]['--button-brand-gradient-2']);return min(ratio([255]*3,[x*(1-i/1000)+y*i/1000 for x,y in zip(a,z)]) for i in range(1001))
rows=[]
for i,f in enumerate(old['findings']):
 b=f['brand'];fg=token(f['fgToken']);bg=token(f['bgToken']);isgrad=f['kind']=='gradient';exception=b in ['reina-madre','piel-sana'] and (bg.startswith('--primary') or isgrad)
 current=gradient(b) if isgrad else ratio(rgb(tokens[b][fg]),rgb(tokens[b][bg]))
 rows.append(dict(id=i,brand=b,component=f['component'],title=f['title'],state=f['state'],variant=f['variant'],threshold=f['threshold'],previousRatio=f['ratio'],ratio=current,status='passed' if current>=f['threshold'] else 'accepted-exception' if exception else 'failed',exceptionScope=exception,foreground='white' if isgrad else fg,background=['--button-brand-gradient-1','--button-brand-gradient-2'] if isgrad else bg,fg='#ffffff' if isgrad else tokens[b][fg],bg=('linear-gradient(135deg, '+tokens[b]['--button-brand-gradient-1']+', '+tokens[b]['--button-brand-gradient-2']+')') if isgrad else tokens[b][bg]))
states=[]
for b,v in tokens.items():
 for kind in ['primary','secondary','success','warning','destructive']:
  role=kind if kind in ['primary','secondary'] else kind+'-light';fg='--'+(kind+'-foreground' if kind in ['primary','secondary'] else role+'-foreground')
  for state in ['normal','hover','active']:
   bg='--'+role+('' if state=='normal' else '-'+state);cr=ratio(rgb(v[fg]),rgb(v[bg]));states.append(dict(brand=b,role=role,state=state,foreground=fg,background=bg,ratio=cr,status='passed' if cr>=4.5 else 'accepted-exception' if b in ['reina-madre','piel-sana'] and kind=='primary' else 'failed'))
renderedFailures=[]
for r in live['playgrounds']:
 for x in r['rows']:
  if x['ratio']<x['threshold']:
   exception=r['brand'] in ['reina-madre','piel-sana'] and 'bg-primary' in x['className'] and x['color']=='rgb(255, 255, 255)'
   renderedFailures.append(dict(brand=r['brand'],id=r['id'],text=x['text'],ratio=x['ratio'],status='accepted-exception' if exception else 'failed'))
review=dict(capturedAt=live['capturedAt'],status='reviewed-with-exceptions',sourceReport=str(D.parent/'storybook-contraste-actual/INFORME.html'),snapshotSha256=hashlib.sha256((R/'design-system/figma-snapshot.json').read_bytes()).hexdigest(),sourceReportSha256=hashlib.sha256((D.parent/'storybook-contraste-actual/evidencia.json').read_bytes()).hexdigest(),exceptions={'brands':['reina-madre','piel-sana'],'roles':['primary','primary-hover','primary-active','button/brand-gradient-1','button/brand-gradient-2'],'reason':'Decisión explícita del usuario: conservar primary y gradientes de esas marcas. No constituye cumplimiento WCAG.'},reportCases=rows,buttonStates=states,renderedFailures=renderedFailures,counts=dict(playgrounds=len(live['playgrounds']),storyTestRuns=204,semanticValues=sum(x['count'] for x in live['tokenParity']),reportCases=len(rows),passed=sum(r['status']=='passed' for r in rows),acceptedExceptions=sum(r['status']=='accepted-exception' for r in rows),unexpectedFailures=sum(r['status']=='failed' for r in rows+states+renderedFailures)),limits=['Contraste de los escenarios de INFORME.html y textos visibles de Playground; no certificación integral WCAG.','Estados active calculados con tokens usados por las reglas CSS; normal y hover contrastados con muestras renderizadas.','Gradientes: mínimo conservador de 1001 muestras sRGB sobre todo el fondo, no solo bajo la etiqueta.','El conector de pruebas reporta éxito incluso en excepciones confirmadas; su resultado no sustituye la medición de contraste.'])
(D/'summary.json').write_text(json.dumps(review,ensure_ascii=False,indent=2));print(json.dumps(review['counts']));print('state failures',json.dumps([x for x in states if x['status']=='failed']))

# Supplemental rendered docs, including every Toast status in each brand.
review['docsFailures']=[]
review['toastChecks']=[]
for r in live['docs']:
 for x in r['rows']:
  if x['ratio']<x['threshold']:
   allowed=r['brand'] in ['reina-madre','piel-sana'] and ('bg-primary' in x['className'] or 'bg-[var(--primary)]' in x['className']) and x['color']=='rgb(255, 255, 255)'
   review['docsFailures'].append(dict(brand=r['brand'],component=r['component'],text=x['text'],ratio=x['ratio'],status='accepted-exception' if allowed else 'failed'))
  if r['component']=='toast' and x['slot']=='toast-description':
   review['toastChecks'].append(dict(brand=r['brand'],color=x['color'],background=x['background'],ratio=x['ratio'],threshold=4.5,status='passed' if x['ratio']>=4.5 else 'failed'))
review['hoverChecks']=[]
for x in live['hover']:
 cr=ratio(rgb(x['color']),rgb(x['background']))
 review['hoverChecks'].append(dict(**x,ratio=cr,status='passed' if cr>=4.5 else 'accepted-exception' if x['brand'] in ['reina-madre','piel-sana'] and x['variant']=='default' else 'failed'))
review['counts']['unexpectedFailures']+=sum(x['status']=='failed' for x in review['docsFailures']+review['toastChecks']+review['hoverChecks'])
review['status']='blocked' if review['counts']['unexpectedFailures'] else 'reviewed-with-exceptions'
(D/'summary-final.json').write_text(json.dumps(review,ensure_ascii=False,indent=2))
print({'finalCounts':review['counts'],'docsFailures':review['docsFailures'],'toastChecks':len(review['toastChecks'])})
assert review['counts']['unexpectedFailures']==0
assert review['counts']['acceptedExceptions']==28
assert len(review['toastChecks'])==24
esc=lambda x:html.escape(str(x),quote=True)
trs=''.join(f"<tr><td>{esc(old['brands'][r['brand']])}</td><td>{esc(r['title'])} · {esc(r['state'])}</td><td><code>{esc(r['foreground'])}</code><br><code>{esc(r['background'])}</code></td><td>{r['ratio']:.4f}:1</td><td>{'Cumple' if r['status']=='passed' else 'Excepción aceptada · no cumple contraste'}</td></tr>" for r in rows)
page=f'''<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>v1.1.0 · Validación final con excepciones</title><style>body{{font:16px/1.55 system-ui;margin:0;background:#f5f5f5;color:#202124}}main{{max-width:1100px;margin:auto;padding:32px}}header,section{{background:white;padding:24px;border:1px solid #ccc;border-radius:12px;margin-bottom:24px}}table{{border-collapse:collapse;width:100%;font-size:14px}}th,td{{padding:12px;border-bottom:1px solid #ccc;text-align:left}}code{{overflow-wrap:anywhere}}.scroll{{overflow:auto}}</style><main><header><h1>v1.1.0 · revisión final con excepciones</h1><p>{esc(review['capturedAt'])}</p><p><b>0 fallos de contraste fuera del alcance exceptuado.</b> Estado de aprobación técnica: consultar validation.json y release:verify.</p><p>53 casos originales: 25 pasan y 28 excepciones aceptadas se conservan.</p></header><section><h2>Correcciones verificadas</h2><ul><li>GRM Global · destructive/light-foreground → status/destructive/700. Normal, hover y active pasan.</li><li>Reina Madre · warning/light-foreground → status/warning/900. Normal, hover y active pasan.</li><li>Toast · descripción al 100 % del color semántico. Seis estados por cuatro marcas: 24 muestras pasan; mínimo 5,4278:1.</li></ul><p>632 valores CSS coinciden con los 158 roles semánticos de Figma por marca. 204 vistas reales revisadas; 12 páginas de variantes y 20 estados hover medidos.</p></section><section><h2>Excepciones conservadas</h2><p>Únicamente primary y brand-gradient de Reina Madre y Piel Sana, incluidos los componentes que los consumen. No se modificaron sus colores oficiales ni se extendió la excepción a otros roles. Los fallos adicionales de instancias renderizadas son consumidores de estas mismas excepciones, no 28 casos nuevos.</p><p><b>Una aprobación de producto con excepciones no declara conformidad WCAG completa.</b></p></section><section><h2>Alcance de la evidencia</h2><p>51 pruebas de componentes por marca, 204 resultados aprobados por el conector. La medición independiente de contraste complementa estas pruebas. Active se calcula con los pares de tokens usados por CSS; hover se mide en elementos reales. Gradientes: 1001 muestras sRGB del fondo. Se excluyen controles deshabilitados. No se certifican todas las composiciones posibles ni todos los criterios WCAG.</p></section><section><h2>Casos originales por marca</h2><div class="scroll"><table><thead><tr><th>Marca</th><th>Escenario</th><th>Tokens</th><th>Ratio</th><th>Resultado</th></tr></thead><tbody>{trs}</tbody></table></div></section></main></html>'''
(D/'INFORME-final.html').write_text(page)
