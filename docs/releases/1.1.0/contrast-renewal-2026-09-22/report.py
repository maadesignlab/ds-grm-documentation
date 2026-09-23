import json,html
from pathlib import Path
p=Path(__file__).parent
d=json.loads((p/'contrast.json').read_text());local=json.loads((p/'gradient-local-contrast.json').read_text());gp=json.loads((p/'gradient-proposals.json').read_text())
# Use two distinct existing shades for Piel Sana, maintaining its original hue.
gp[-1]['stops'][1]={'token':'Piel Sana/primary/900','rgb':[105/255,49/255,20/255]};gp[-1]['minContrast']=6.613357360123927
(p/'gradient-proposals.json').write_text(json.dumps(gp,indent=2))
imagecases=['Texto secundario','Enlaces con primary','Texto de error (imagen)','Semáforo · Con lugares','Semáforo · Quedan pocos','Semáforo · Sin lugares']
brands=['GRM Global','Reina Madre','Maria Linda','Piel Sana']
matrix='| Caso | GRM Global | Reina Madre | María Linda | Piel Sana |\n|---|---:|---:|---:|---:|\n'
for case in imagecases:
 rs=[next(r for r in d['pairs'] if r['brand']==b and r['case']==case) for b in brands]
 matrix+='| '+case+' | '+' | '.join(f"{r['ratio']:.2f} {'✓' if r['passes'] else 'FALLA'}" for r in rs)+' |\n'
gradtable='| Marca | Rango bajo las letras | Propuesta de stops existentes | Mínimo de propuesta |\n|---|---:|---|---:|\n'
for b,g,proposal in zip(brands,local,gp):
 low=min(x['minimum'] for x in g['glyphBoxes']);high=max(x['maximum'] for x in g['glyphBoxes'])
 gradtable+=f"| {b} | {low:.2f}–{high:.2f}:1 | "+' → '.join(x['token'] for x in proposal['stops'])+f" | {proposal['minContrast']:.2f}:1 |\n"
md='''# Auditoría renovada de contraste — DS v1.1 candidata

**22 de septiembre de 2026 · Resultado: NO APROBADA para publicación accesible.**

## Alcance y evidencia

- Fuente: 767 variables de Figma; lectura viva final con huella `333a943a`, igual al snapshot de código.
- 340 combinaciones semánticas, incluidas las 24 de la imagen original, estados de interacción y transparencias sobre blanco.
- 8 muestras reales de Button en navegador: sólido y brand-gradient en cuatro marcas. Texto de 14 px y peso 500.
- Gradientes: 1001 muestras sRGB del fondo y límites reales de cada letra en “Ver más”. La caja completa de cada letra está por debajo de AA en los cuatro gradientes; el fallo no depende de confundir un extremo lejano con el fondo del texto.
- 93 pares de texto calculados quedan por debajo de 4,5:1. Son combinaciones examinadas, no 93 fallos independientes de componentes: incluyen usos hipotéticos y cuatro pares de input deshabilitado, exentos cuando realmente están inactivos.
- 44 pares de indicadores quedan bajo 3:1. Requieren confirmar que el borde o anillo sea necesario para identificar el control o estado; los bordes decorativos no se clasifican automáticamente como incumplimiento.

## Criterios

WCAG 2.2, 1.4.3: 4,5:1 para texto normal; 3:1 para texto grande (24 px, o aproximadamente 18,67 px en negrita). No se redondea un resultado inferior para aprobarlo. Los controles realmente inactivos están exentos. 1.4.11: 3:1 para información visual necesaria de componentes y estados. No confundir 1.4.11 con 2.4.13 Focus Appearance, de nivel AAA.

Fuentes: [W3C — contraste de texto](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C — contraste no textual](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).

## Los escenarios de tu imagen

'''+matrix+'''
**21 de 24 combinaciones cumplen AA para texto normal.** Los tres fallos son primary sobre card.

## 1. Botón primario: texto blanco

**Hallazgo con evidencia:** Button default renderiza blanco sobre primary: GRM 5,18:1 (cumple), Reina Madre 2,54:1, María Linda 3,81:1 y Piel Sana 2,22:1 (fallan). Evidencia: `rendered-buttons.json`, colores computados del botón real.

**Causa:** primary/foreground es blanco en todas las marcas, pero los fondos primarios actuales de tres marcas son demasiado claros. El primary semántico de María Linda resuelve a #4C8E84; no debe confundirse con su primary/500 oficial.

**Posibles soluciones:** conservar las paletas y primary/500 oficiales. Si el texto blanco debe prevalecer, asignar al fondo del botón un tono existente más oscuro: GRM primary/500 (5,18), Reina Madre primary/700 (5,02), María Linda primary/800 (6,18), Piel Sana primary/800 (6,61). Si el fondo oficial debe permanecer, evaluar texto oscuro por marca; esta opción no aplica al gradiente donde se pidió blanco. Recalcular hover y active por separado.

## 2. Button brand-gradient

**Hallazgo con evidencia:** los cuatro gradientes renderizados fallan para el texto blanco de 14 px. Los rangos siguientes corresponden a las cajas reales de las letras, no a los extremos de todo el botón.

'''+gradtable+'''
**Causa:** uno o ambos stops son demasiado claros. Cambiar la dirección no corrige por sí solo la luminancia del fondo.

**Posibles soluciones:** reasignar únicamente los stops semánticos a los tonos existentes de la tabla, manteniendo 135° y texto blanco. Las propuestas se calcularon en sRGB y no se aplicaron a Figma ni a componentes. Validar después de implementarlas los estados hover/active y todos los tamaños. La propuesta de Piel Sana usa primary/800 → primary/900, conservando dos extremos distintos.

## 3. Success sólido con blanco

**Hallazgo con evidencia:** success/foreground sobre success: GRM 3,36:1; Reina Madre 1,67:1; María Linda 2,89:1; Piel Sana 2,42:1. Todos quedan bajo 4,5:1. No confundir con success/light-foreground sobre success/light: las cuatro marcas sí cumplen en ese caso de la imagen.

**Causa:** el foreground blanco se combina con verdes claros. El estado success de Button actualmente usa la variante light; los ratios anteriores corresponden al tratamiento sólido cuando se consume.

**Posibles soluciones:** para conservar blanco, usar los tonos ya existentes GRM success/600 (4,95), Reina Madre success/800 (5,37), María Linda success/700 (5,49), Piel Sana success/700 (4,82). Para conservar el fondo claro, usar un foreground oscuro existente o mantener la composición light que ya cumple. No es necesario cambiar ningún 500.

## 4. Enlaces y texto de marca

**Hallazgo con evidencia:** primary sobre blanco falla en Reina Madre, María Linda y Piel Sana, como muestra la matriz. El caso GRM cumple.

**Causa:** se utiliza un color de marca como texto normal sobre una superficie clara.

**Posibles soluciones:** consumir primary/default-foreground, verificando la superficie concreta. Mantener primary para los usos donde sí sea adecuado; no sustituir globalmente el color oficial.

## 5. Estados, citas y texto atenuado

**Hallazgo con evidencia:** hay pares bajo AA en estados active/hover de status, citas y foreground/60%. Por ejemplo, foreground/60% sobre background queda entre 3,95 y 3,97:1. En todas las marcas, las citas reception, consultation, completed, cancelled y rescheduled tienen pares foreground/light entre 2,85 y 4,42:1. Los valores exactos están en la matriz completa.

**Causa:** el foreground se conserva mientras el fondo cambia de luminosidad, o se atenúa el propio texto. Los pares exploratorios de error/default-foreground sobre card no demuestran por sí solos un uso erróneo en un componente; hay que respetar el rol de ese token.

**Posibles soluciones:** usar texto opaco para contenido normal, reservar opacidad para fondos y seleccionar un foreground existente que cumpla en el peor estado permitido. Para citas, revisar el nivel oscuro de la misma familia Extra Colors. Los campos realmente disabled no necesitan oscurecerse para cumplir 1.4.3.

## 6. Bordes y foco

**Hallazgo con evidencia:** 44 combinaciones de input/border/ring y sus opacidades quedan bajo 3:1 contra card/background. Son avisos condicionales. Un anillo al 50% no equivale a un texto con la mitad de contraste: hay que componer su color sobre el fondo.

**Causa:** transparencia y tonos claros reducen la diferencia con la superficie adyacente.

**Posibles soluciones:** cuando el indicador sea necesario, usar ring opaco o un tono existente más oscuro. Evaluar el conjunto visible de borde y anillo en foco, no un token aislado. No exigir 3:1 a todas las líneas decorativas de Table.

## Estado de publicación

La auditoría de contraste se renovó y encontró fallos confirmados. La candidata continúa sin publicar y no debe presentarse como WCAG AA aprobada. No se modificaron colores, variables ni componentes durante esta auditoría. Las pruebas automáticas se registran por separado; no sustituyen esta medición.

## Archivos

- `contrast.json`: las 340 combinaciones, valores y clasificación.
- `rendered-buttons.json`: mediciones reales de los 8 botones.
- `gradient-glyphs.json` y `gradient-local-contrast.json`: ubicación de letras y cálculo local.
- `gradient-proposals.json`: propuestas calculadas con tokens existentes.
- Capturas PNG por marca de los gradientes.

Esta auditoría cubre contraste de los escenarios descritos. No certifica todos los criterios WCAG, todas las composiciones de producto ni todas las interacciones posibles.
'''
(p/'INFORME.md').write_text(md)
def esc(x):return html.escape(str(x))
cards=''.join(f'<article><h3>{esc(g["brand"])}</h3><div class="sample" style="background:linear-gradient(135deg,{g["start"]},{g["end"]})">Ver más</div><p>Fondo completo: {g["minimum"]:.2f}–{g["maximum"]:.2f}:1</p><p class="fail">También falla debajo de las letras</p></article>' for g in d['gradients'])
trs=''.join(f'<tr class="{"pass" if r["passes"] else "fail"}"><td>{esc(r["brand"])}</td><td>{esc(r["case"])}</td><td><code>{esc(r["foregroundToken"])}</code><br>{r["foreground"]}</td><td><code>{esc(r["backgroundToken"])}</code><br>{r["background"]}</td><td>{r["ratio"]:.3f}:1</td><td>{r["threshold"]}:1</td><td>{"Cumple" if r["passes"] else "Inferior"}{" · condicional" if r["context"]!="text" else ""}</td></tr>' for r in d['pairs'])
page='''<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Auditoría WCAG GRM · 22 septiembre 2026</title><style>body{font:16px/1.55 system-ui;color:#20242b;background:#f7f8fa;margin:0}main{max-width:1250px;margin:auto;padding:40px 24px}h1{font-size:34px}h2{margin-top:40px}.summary{background:#fff;border:1px solid #ccd2da;border-radius:12px;padding:24px}.fail{color:#9e1837}.pass{color:#225f42}.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}article{background:white;padding:20px;border:1px solid #ccd2da;border-radius:12px}.sample{color:white;width:120px;padding:8px;text-align:center;border-radius:4px;font-size:14px;font-weight:500}table{width:100%;border-collapse:collapse;font-size:13px;background:white}td,th{text-align:left;padding:10px;border-bottom:1px solid #ddd;vertical-align:top}th{background:#20242b;color:white;position:sticky;top:0}code{overflow-wrap:anywhere}pre{white-space:pre-wrap;font:inherit;background:white;padding:24px;border-radius:12px}a{color:#155399}.table{overflow:auto}</style><main><h1>Auditoría de contraste renovada</h1><p>DS v1.1 candidata · 22 septiembre 2026 · 767 variables</p><div class="summary"><h2 style="margin:0" class="fail">No aprobada para publicación accesible</h2><p>21 de 24 combinaciones de la imagen cumplen AA. Fallan los botones primarios de tres marcas y los gradientes de las cuatro marcas.</p><p>340 combinaciones evaluadas. Los casos hipotéticos y los indicadores condicionales se distinguen de los fallos confirmados en componentes.</p><a href="INFORME.md">Informe con hallazgo, causa y posibles soluciones</a></div><h2>Gradientes actuales</h2><p>Estas muestras reproducen colores; las mediciones del texto corresponden al botón real de Storybook, registrado en JSON y capturas.</p><div class="cards">'''+cards+'''</div><h2>Hallazgos y propuestas</h2><pre>'''+esc(md)+'''</pre><h2>Matriz completa</h2><p>Un resultado inferior identifica una combinación bajo el umbral; no implica automáticamente un incumplimiento si el caso es disabled, decorativo o no se utiliza así. Transparencias compuestas sobre blanco.</p><div class="table"><table><thead><tr><th>Marca</th><th>Caso</th><th>Texto / indicador</th><th>Fondo</th><th>Ratio</th><th>Mínimo</th><th>Resultado</th></tr></thead><tbody>'''+trs+'''</tbody></table></div></main></html>'''
(p/'INFORME.html').write_text(page)
print('Generated HTML and Markdown reports.')
