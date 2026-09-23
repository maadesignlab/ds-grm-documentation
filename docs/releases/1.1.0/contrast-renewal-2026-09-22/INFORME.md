# Auditoría renovada de contraste — DS v1.1 candidata

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

| Caso | GRM Global | Reina Madre | María Linda | Piel Sana |
|---|---:|---:|---:|---:|
| Texto secundario | 5.74 ✓ | 5.67 ✓ | 5.66 ✓ | 5.73 ✓ |
| Enlaces con primary | 5.18 ✓ | 2.54 FALLA | 3.81 FALLA | 2.22 FALLA |
| Texto de error (imagen) | 4.69 ✓ | 4.54 ✓ | 5.49 ✓ | 5.10 ✓ |
| Semáforo · Con lugares | 6.61 ✓ | 5.17 ✓ | 5.01 ✓ | 6.75 ✓ |
| Semáforo · Quedan pocos | 5.43 ✓ | 4.92 ✓ | 6.57 ✓ | 6.37 ✓ |
| Semáforo · Sin lugares | 5.47 ✓ | 5.43 ✓ | 5.41 ✓ | 5.40 ✓ |

**21 de 24 combinaciones cumplen AA para texto normal.** Los tres fallos son primary sobre card.

## 1. Botón primario: texto blanco

**Hallazgo con evidencia:** Button default renderiza blanco sobre primary: GRM 5,18:1 (cumple), Reina Madre 2,54:1, María Linda 3,81:1 y Piel Sana 2,22:1 (fallan). Evidencia: `rendered-buttons.json`, colores computados del botón real.

**Causa:** primary/foreground es blanco en todas las marcas, pero los fondos primarios actuales de tres marcas son demasiado claros. El primary semántico de María Linda resuelve a #4C8E84; no debe confundirse con su primary/500 oficial.

**Posibles soluciones:** conservar las paletas y primary/500 oficiales. Si el texto blanco debe prevalecer, asignar al fondo del botón un tono existente más oscuro: GRM primary/500 (5,18), Reina Madre primary/700 (5,02), María Linda primary/800 (6,18), Piel Sana primary/800 (6,61). Si el fondo oficial debe permanecer, evaluar texto oscuro por marca; esta opción no aplica al gradiente donde se pidió blanco. Recalcular hover y active por separado.

## 2. Button brand-gradient

**Hallazgo con evidencia:** los cuatro gradientes renderizados fallan para el texto blanco de 14 px. Los rangos siguientes corresponden a las cajas reales de las letras, no a los extremos de todo el botón.

| Marca | Rango bajo las letras | Propuesta de stops existentes | Mínimo de propuesta |
|---|---:|---|---:|
| GRM Global | 2.53–4.40:1 | GRM Global/secondary/900 → GRM Global/primary/500 | 5.18:1 |
| Reina Madre | 3.79–4.24:1 | Reina Madre/primary/700 → Reina Madre/secondary/600 | 5.02:1 |
| Maria Linda | 2.27–3.41:1 | Maria Linda/secondary/900 → Maria Linda/primary/800 | 6.18:1 |
| Piel Sana | 2.40–3.78:1 | Piel Sana/primary/800 → Piel Sana/primary/900 | 6.61:1 |

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

La auditoría de contraste se renovó y encontró fallos confirmados. La candidata continúa sin publicar y no debe presentarse como WCAG AA aprobada. No se modificaron colores, variables ni componentes durante esta auditoría. Las pruebas automáticas por marca quedaron inconclusas: el conector run-story-tests agotó 300 segundos en la primera marca. Se canceló el lote restante y no se registró aprobación. Las 51 stories aprobadas en la sincronización anterior no se presentan como un resultado renovado ni como cobertura de cuatro marcas. Este límite no invalida los fallos de contraste calculados y observados.

## Archivos

- `contrast.json`: las 340 combinaciones, valores y clasificación.
- `rendered-buttons.json`: mediciones reales de los 8 botones.
- `gradient-glyphs.json` y `gradient-local-contrast.json`: ubicación de letras y cálculo local.
- `gradient-proposals.json`: propuestas calculadas con tokens existentes.
- Capturas PNG por marca de los gradientes.

Esta auditoría cubre contraste de los escenarios descritos. No certifica todos los criterios WCAG, todas las composiciones de producto ni todas las interacciones posibles.
