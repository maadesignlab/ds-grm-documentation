# Auditoría para el primer lote de actualización

Fecha: 2026-09-21. Proyecto: `ds-grm-documentation`. Rama: `codex/cambios-ds-grm-documentation`. Base: commit `d47da42`.

## Resultado

El proyecto no refleja todavía el estado actual de Figma. Hay diferencias de tokens, tipografía, variantes y geometría. También hay problemas en el propio Figma que no conviene trasladar al código.

Esta es una auditoría de lectura: no se han modificado variables, estilos ni componentes de Figma, ni la implementación. Los hallazgos describen el estado actual comparado con el repositorio; no todos pueden atribuirse a un cambio reciente sin un snapshot histórico equivalente.

## Cobertura y método

- 833 variables extraídas con valores y aliases: 547 Brand, 156 Semantic Brand, 78 Foundations, 16 Breakpoints & Layout, 36 Extra Colors.
- 624 combinaciones de rol semántico/marca (156 × 4), comparadas con CSS y con el catálogo documental por separado.
- 39 estilos de texto, 3 de pintura, 8 de efectos y 1 de grid leídos en vivo.
- 50/50 familias documentadas: inventario, documentación MCP de Storybook, definiciones Figma, bindings, estilos consumidos y propiedades de sus conjuntos/defaults. 49 páginas inspeccionadas, incluyendo Skeleton, Text Area y Chart fuera del catálogo de 50.
- 2.687 nodos de definición COMPONENT/COMPONENT_SET; recorrido de 49.976 nodos bajo esas definiciones, incluidas instancias anidadas. Estos conteos no significan 2.687 componentes públicos.
- Inspección visual puntual en Figma de Button e Input. No se ejecutó una regresión visual de todos los estados en navegador. El informe no certifica equivalencia visual integral ni conformidad WCAG del producto.
- No se auditaron los glifos de Iconos ni File Assets uno a uno. Chart no tiene componentes maestros en su página; no se considera implementado/documentado por esa sola página.
- Colores: aliases resueltos hasta el valor final por modo, tolerancia de 0,6/255 para evitar diferencias de serialización. Valores OKLCH documentales convertidos a sRGB. `var(...)` simples del CSS resueltos. Contraste calculado con los valores flotantes, no con hexadecimal redondeado.
- Los números de impacto por componente son de su página Figma; Button/Button Group, Toggle/Toggle Group y Checkbox/Radio/Switch comparten páginas. No son un conteo de defectos independientes por componente.

## 1. Tokens semánticos desactualizados

**Hallazgo y evidencia.** 108 combinaciones rol/marca tienen un valor distinto en una declaración CSS existente; 215 coinciden. El catálogo `semantic-brand-token-values.ts` tiene 141 diferentes, 443 coincidentes y 40 sin entrada correspondiente. El detalle completo está en `comparacion-tokens.csv` y JSON, con ID y cadena de aliases.

Hay además 301 combinaciones sin una declaración CSS del mismo nombre normalizado. Esto **no equivale a 301 defectos**: algunas se representan mediante modificadores Tailwind (`/50`, etc.), otras solo están documentadas, y tipografía usa `--brand-font-*`. Deben mapearse por uso antes de crear declaraciones. Los 547 primitivos Brand no tienen una exportación completa equivalente en el CSS actual; se audita su resolución e impacto en roles y se conserva el snapshot, sin inventar una comparación histórica de cada matiz.

**Causa.** El CSS efectivo y la tabla documental son snapshots separados de Figma. Cambiaron tanto valores primitivos como aliases semánticos; actualizar solo una de esas fuentes dejaría discrepancias.

**Posible solución.** Sincronizar primero los roles usados y su documentación desde un mismo snapshot; preservar los colores oficiales y las diferencias deliberadas entre `primary` y `primary/default-foreground`. Añadir al código únicamente la representación de roles ya existentes en Figma que realmente requiera la implementación.

### Ejemplos confirmados

| Marca | Rol | CSS actual | Figma actual |
|---|---|---|---|
| grm-global | `primary` | `#008979` | `#007b6d` |
| grm-global | `muted/foreground` | `#9b9196` | `#696065` |
| grm-global | `accent` | `#ddd8e3` | `#e7e2ed` |
| grm-global | `destructive` | `#ff3759` | `#e31646` |
| grm-global | `success/light-foreground` | `#288a43` | `#026827` |
| grm-global | `primary/default-foreground` | `#008979` | `#007b6d` |
| reina-madre | `muted/foreground` | `#8a8fb6` | `#616271` |
| reina-madre | `accent` | `#d9d8f5` | `#e3e3ef` |
| reina-madre | `destructive` | `#ff3759` | `#e61e42` |
| reina-madre | `success/light-foreground` | `#77915f` | `#5c7149` |
| reina-madre | `primary/default-foreground` | `#ed80a8` | `#95375d` |
| maria-linda | `primary` | `#7bc6bb` | `#4c8e84` |
| maria-linda | `muted/foreground` | `#7b7d7e` | `#616465` |
| maria-linda | `accent` | `#ccc7b2` | `#e9e5d7` |
| maria-linda | `primary/default-foreground` | `#7bc6bb` | `#376a62` |
| piel-sana | `muted/foreground` | `#a9a49c` | `#67635c` |
| piel-sana | `accent` | `#ddcaa4` | `#f1e3c5` |
| piel-sana | `primary/default-foreground` | `#ff9248` | `#94471a` |

## 2. Tipografía: el inventario de 62 estilos quedó obsoleto

**Hallazgo y evidencia.** Figma tiene 39 estilos de texto. Por ID: 31 coinciden en propiedades comparadas, 6 cambiaron, 2 son nuevos y 25 del catálogo ya no aparecen en la lista local de Figma. “Ausente en lista local” no prueba que no exista alguna instancia o estilo remoto con ese ID.

- `heading/lg`: antes `heading/lg/semibold`, ahora **Bold** (700), manteniendo 24 px.
- `heading/md` y `heading/sm`: renombrados, sin cambio de tamaño/peso en la comparación.
- `display/extrabold`: ya no se llama `Legacy/display/one/extrabold`.
- `caption/md/semibold` y `caption/xs/semibold` pasan a `components/avatar/11px/semibold` y `components/avatar/9px/semibold`.
- Nuevos por ID: `body/sm/mono/regular` y `caption/sm/bold uppercase`.

**Causa.** Se reorganizó y depuró la biblioteca de texto después del snapshot local. Algunos cambios son de nombre, otro afecta el peso, otros implican nuevos IDs.

**Posible solución.** Regenerar `typography-style-values.ts`, actualizar referencias en documentación y revisar consumidores del heading 700. No eliminar clases o APIs solo porque un estilo deje de aparecer en la biblioteca local. Detalle en `comparacion-tipografia.json`.

## 3. Button: falta brand-gradient y el radio no coincide

**Hallazgo y evidencia.** Set `49:6`: 160 variantes; el snapshot histórico local tenía 144. Las 16 adicionales son `brand-gradient` (4 tamaños × 4 estados). `button.tsx` conserva 9 estilos y no ofrece esa variante. Figma tiene radio 6 px; el primitive usa `rounded-md`, que en este proyecto calcula 8 px (`--radius=10px`, multiplicador 0,8).

El estilo de pintura `components/Button/brand-gradient` sí está vinculado a las variantes actuales. Usa `button/brand-gradient-1` y `button/brand-gradient-2`; ya no corresponde asumir los stops originales de la conversación. GRM resuelve a #45d6a1→#007b6d. Los dos extremos están blancos en Reina Madre, María Linda y Piel Sana. El texto está vinculado a blanco y hay una capa blanca adicional de 10% en normal, 15% hover y 20% active.

**Causa.** Variante incorporada en Figma sin equivalente de código; los modos de marca del gradiente están incompletos. El nombre de una escala de radio no garantiza el mismo valor numérico entre Figma y el tema shadcn.

**Posible solución.** Mantener texto blanco solicitado; resolver los stops existentes por marca con suficiente contraste antes de publicar la variante. Para el radio, usar una utilidad existente que calcule 6 px o revisar el mapeo de radios con una regresión de consumidores; no cambiar globalmente `--radius` sin medir impacto. Conservar tamaños y API del resto de Button.

## 4. Input: tamaños nuevos y opacidad del placeholder

**Hallazgo y evidencia.** `394:13573` (InputBase) y `1543:10655` (TimeInputBase) tienen 20 variantes cada uno, frente a 10 en el snapshot previo. Nuevos tamaños: Normal 36 px y Large 44 px. `input.tsx` e `input-group.tsx` usan `h-8` (32 px); el ejemplo no corrige la altura ni ofrece Large.

En el input habilitado `394:13570`, texto `424:2195`, el placeholder usa `muted/foreground` pero con **opacidad del nodo 0,5**. Por tanto, el contraste real no es el del token opaco. Esta opacidad se verificó también en la captura de Figma. El código usa `placeholder:text-muted-foreground`, sin esa opacidad explícita.

**Causa.** La geometría y el nuevo eje Size no se trasladaron al primitive/composición. La opacidad de texto atenúa una mejora de contraste hecha en el token.

**Posible solución.** Mapear los dos tamaños visuales sin romper la propiedad HTML nativa `size`; mantener Input e InputGroup sincronizados. Para el placeholder habilitado, proponer opacidad 1 usando el token existente. No trasladar automáticamente el 50% de Figma al código.

## 5. Table y Data Table: roles distintos y variantes duplicadas

**Hallazgo y evidencia.** Figma dispone de `table/header/background`; `TableHeader` en `table.tsx` usa `bg-muted/40`. No son roles intercambiables. Los valores actuales del rol son GRM #f3f1f3, Reina Madre #edeffb, María Linda #e7f2f0 y Piel Sana #fdf3ec. Las filas alternas tienen también un rol específico `table/row-alternate`; el código usa `muted/5`.

El conjunto `_components/Table/TableHeader/CellContent/Text`, `2090:17809`, tiene dos hijos con la misma combinación `Text Amount=single, Type=text, Style=sans`: `2090:17810` y `2090:17812`. Figma devuelve `Component set has existing errors` al leer sus definiciones. El tercer hijo es `Style=sans-underline`.

**Causa.** El código aproximó fondos mediante opacidades de muted. En Figma hay una colisión real de variantes independiente de los tokens. Data Table compone Table y hereda estas diferencias.

**Posible solución.** Mapear a CSS los roles existentes de Table y utilizarlos en encabezados/alternancia; mantener semántica HTML, selección, ordenamiento y TanStack. Corregir la combinación duplicada en un cambio Figma separado, identificando primero cuál de los dos masters tiene consumidores; no borrar ni recrear automáticamente.

## 6. Select y Native Select: mapeo de tamaños/radios

**Hallazgo y evidencia.** Los defaults Figma son de 36 px y radio 8 px. Native Select usa `h-8` y `rounded-lg` (32 y 10 px). Select tiene default=32, sm=28, lg=36 px; su radio default también es 10 px.

**Causa.** Los tamaños nominales del primitive y de la composición Figma no se corresponden de forma directa.

**Posible solución.** Ajustar el mapeo de tamaño de las composiciones y evaluar la base pública sin cambiar comportamiento nativo/Radix. Mantener equivalencia entre Docs y Playground.

## 7. Estilos de pintura, efectos y fundamentos

**Hallazgo y evidencia.** Tres estilos de pintura actuales: `background/brand-gradient/light`, `components/Avatar/background` y `components/Button/brand-gradient`. El primero tiene stops grises literales sin bindings, aunque existen roles de fondo de gradiente; no debe tratarse como un gradiente de marca terminado. Avatar usa primary/15%→secondary/40%; su implementación visual también aparece en `avatar-example.tsx`, no solo en el primitive.

Las seis sombras nombradas `shadow/2xs`, `xs`, `sm`, `md`, `lg`, `xl` coinciden numéricamente con las declaraciones del Tailwind instalado (ignorando orden de capas); `components/sonner/shadow` coincide con `--toast-shadow`. El estilo `Drop Shadow` duplica numéricamente `shadow/xs`. No se detecta motivo para cambiar esos valores. El espaciado base es 4 px en ambos; Figma conserva escalas de radio con semántica diferente a las fórmulas del tema. El grid Default Column Grid y las variables Desktop/Tablet/Mobile quedan en el snapshot; no implican obligatoriamente breakpoints CSS 1:1, porque Figma también define tamaños de lienzo.

**Causa.** Hay estilos nuevos, un estilo aún literal y distintas convenciones entre fundamentos Figma y shadcn.

**Posible solución.** Implementar solo estilos listos y utilizados. Documentar el mapeo de radios; conservar las sombras coincidentes y los 36 Extra Colors, que también coinciden con el catálogo.

## 8. Referencia de marca sospechosa en Sidebar

**Hallazgo y evidencia.** En Piel Sana, `sidebar/ring` resuelve a `Maria Linda/primary/500`, #7bc6bb. El CSS actual usa #ff9248. La cadena exacta está en `comparacion-tokens.json`.

**Causa.** Alias cruzado entre marcas. La lectura confirma la referencia, pero no permite saber si fue deliberada.

**Posible solución.** Revisar el rol en Figma antes de trasladarlo. Si debe representar Piel Sana, seleccionar un tono existente de esa marca que funcione como indicador de foco; no crear un color nuevo ni sustituir automáticamente el alias.

## 9. WCAG: sincronizar no basta para certificar

Las 24 combinaciones de la imagen se recalcularon con las variables actuales, sin opacidad de componente. Umbral AA para texto normal: 4,5:1; no se redondea para decidir aprobación. Fuente: [W3C, Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

| Combinación | GRM | Reina Madre | María Linda | Piel Sana |
|---|---:|---:|---:|---:|
| Texto secundario | 5.74 ✓ | 5.67 ✓ | 5.66 ✓ | 5.73 ✓ |
| Primary sobre card | 5.18 ✓ | 2.54 ✗ | 3.81 ✗ | 2.22 ✗ |
| Texto destructivo | 4.69 ✓ | 4.54 ✓ | 5.49 ✓ | 5.10 ✓ |
| Con lugares | 6.61 ✓ | 5.17 ✓ | 5.01 ✓ | 4.43 ✗ |
| Quedan pocos | 5.43 ✓ | 4.92 ✓ | 6.57 ✓ | 6.37 ✓ |
| Sin lugares | 5.47 ✓ | 5.43 ✓ | 5.41 ✓ | 5.40 ✓ |

Resultado: **20/24 pasan** para texto normal. En Reina Madre, success/light-foreground ya apunta a 800 (#5c7149); esta mejora sí está aplicada en Figma y falta en el código.

**Causa.** `primary` como fondo/color oficial y como color de texto no son siempre el mismo rol. `primary/default-foreground` ya tiene tonos más oscuros en Reina Madre, María Linda y Piel Sana. Algunos consumidores aún usan text-primary; conservar primary/500 no obliga a usarlo para todos los textos. La opacidad de un componente puede cambiar el resultado aunque el token pase.

**Posible solución.** Sincronizar y consumir los roles de texto ya disponibles, revisar enlaces/hover/selección en contexto y no declarar accesible un botón por el contraste de un único extremo del gradiente. Los controles realmente deshabilitados están exentos de 1.4.3; los placeholders habilitados no lo están.

### Dos casos que no deben copiarse sin resolver

- Placeholder habilitado al 50%, grm-global, sobre blanco: **2.15:1**. El token opaco sería 6.07:1.
- Placeholder habilitado al 50%, reina-madre, sobre blanco: **2.15:1**. El token opaco sería 6.01:1.
- Placeholder habilitado al 50%, maria-linda, sobre blanco: **2.14:1**. El token opaco sería 5.97:1.
- Placeholder habilitado al 50%, piel-sana, sobre blanco: **2.14:1**. El token opaco sería 5.97:1.

- Gradiente grm-global, texto blanco y overlay blanco normal 10%: extremos **1.75:1 / 4.32:1**. Estos extremos son límites de evaluación, no una medición del fondo exacto bajo cada glifo.
- Gradiente reina-madre, texto blanco y overlay blanco normal 10%: extremos **1.00:1 / 1.00:1**. Estos extremos son límites de evaluación, no una medición del fondo exacto bajo cada glifo.
- Gradiente maria-linda, texto blanco y overlay blanco normal 10%: extremos **1.00:1 / 1.00:1**. Estos extremos son límites de evaluación, no una medición del fondo exacto bajo cada glifo.
- Gradiente piel-sana, texto blanco y overlay blanco normal 10%: extremos **1.00:1 / 1.00:1**. Estos extremos son límites de evaluación, no una medición del fondo exacto bajo cada glifo.

## 10. Matriz por cada familia del inventario

Cada fila tiene documentación MCP guardada y el snapshot de la página correspondiente. La columna de roles enumera dependencias cambiadas de esa página; no significa que cada variante utilice todos esos roles. Los detalles de IDs, propiedades, defaults y ejemplos de nodos consumidores están en `detalle-*.json`. El CSV contiene la lista íntegra de roles.

| Componente | Hallazgo / acción | Evidencia Figma |
|---|---|---|
| Accordion | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1771:909](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1771-909) · [snapshot](detalle-1771-909.json) |
| Alert | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1178:530](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1178-530) · [snapshot](detalle-1178-530.json) |
| Alert Dialog | Geometría principal 384×148, radio 14 px y bg-popover ya representados en código. Cambian los valores de popover, foreground y muted; el footer usa muted/50 en código. | [1187:612](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1187-612) · [snapshot](detalle-1187-612.json) |
| Attachment | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2827:14904](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2827-14904) · [snapshot](detalle-2827-14904.json) |
| Avatar | Estilo de gradiente existente primary/15%→secondary/40%; typography de 11/9 px renombrada. El primitive y el ejemplo tienen responsabilidades visuales distintas. | [246:2681](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=246-2681) · [snapshot](detalle-246-2681.json) |
| Badge | El ID 186:141 sigue vigente, ahora confirmado dentro de la página 1:32. Actualizar default-foreground además de primary; solid y outline tienen requisitos de contraste distintos. | [186:141](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=186-141) · [snapshot](detalle-1-32.json) |
| Breadcrumb | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1760:597](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1760-597) · [snapshot](detalle-1760-597.json) |
| Button | Figma tiene 160 variantes de Button (incluye 16 brand-gradient); código tiene 9 estilos sin brand-gradient. Radio Figma 6 px frente a rounded-md=8 px. Gradiente requiere resolver contraste antes de publicarse. | [1:24](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-24) · [snapshot](detalle-1-24.json) |
| Button Group | Set 3355:1262, 43 variantes. Hereda el cambio de Button y sus tokens; no confundir sus composiciones con nuevos estilos del primitive. | [3355:1262](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3355-1262) · [snapshot](detalle-1-24.json) |
| Calendar | Revisar primary de selección, muted de rango y los estados success/warning. Sincronizar estilos de texto vigentes; tokens nuevos no garantizan contraste de toda combinación. | [1521:3069](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1521-3069) · [snapshot](detalle-1521-3069.json) |
| Card | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1798:3431](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1798-3431) · [snapshot](detalle-1798-3431.json) |
| Carousel | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2782:1341](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2782-1341) · [snapshot](detalle-2782-1341.json) |
| Checkbox | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1:41](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41) · [snapshot](detalle-1-41.json) |
| Collapsible | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1771:929](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1771-929) · [snapshot](detalle-1771-929.json) |
| Combobox | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1:39](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-39) · [snapshot](detalle-1-39.json) |
| Context Menu | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1675:339](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1675-339) · [snapshot](detalle-1675-339.json) |
| Data Table | Revisar Table, Toolbar, Pagination y controles anidados tras actualizar tokens; hereda la diferencia del encabezado de Table. Mantener TanStack y comportamiento actual. | [2366:19504](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2366-19504) · [snapshot](detalle-2366-19504.json) |
| Date Picker | Es una composición en el manifiesto, no un archivo date-picker.tsx. Cambian Calendar, Button, Popover y su tipografía; probar ambos estados antes de publicar. | [1:35](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-35) · [snapshot](detalle-1-35.json) |
| Drawer | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1290:302](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1290-302) · [snapshot](detalle-1290-302.json) |
| Dropdown Menu | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1521:4708](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1521-4708) · [snapshot](detalle-1521-4708.json) |
| Empty | Actualizar muted-foreground; hover de enlaces usa text-primary y debe evaluarse con el fondo real. | [2173:21188](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2173-21188) · [snapshot](detalle-2173-21188.json) |
| Field | Revisar composiciones con Input/InputTime y tamaños nuevos. Hay hover de enlaces text-primary en código; el token de texto primary/default-foreground ya existe y difiere por marca. | [553:2675](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=553-2675) · [snapshot](detalle-553-2675.json) |
| Hover Card | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1650:2013](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1650-2013) · [snapshot](detalle-1650-2013.json) |
| Input | InputBase y TimeInputBase pasan de 10 a 20 variantes frente al snapshot previo: Normal 36 px y Large 44 px. Input/InputGroup usan h-8=32 px, sin tamaño visual Large. Placeholder Figma al 50%: no copiar esa opacidad. | [1:34](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-34) · [snapshot](detalle-1-34.json) |
| Input OTP | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [561:4282](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=561-4282) · [snapshot](detalle-561-4282.json) |
| Item | Actualizar muted/accent/foreground; hover de enlaces en descripción usa text-primary. No requiere inventar una nueva paleta. | [2190:1413](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2190-1413) · [snapshot](detalle-2190-1413.json) |
| Kbd | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2793:2325](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2793-2325) · [snapshot](detalle-2793-2325.json) |
| Label | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1:38](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-38) · [snapshot](detalle-1-38.json) |
| Menubar | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2938:11449](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2938-11449) · [snapshot](detalle-2938-11449.json) |
| Native Select | Figma default 36 px y radio 8 px; primitive h-8=32 px y rounded-lg=10 px. Mantener select nativo y distinguir colores de opciones controlados por el sistema operativo. | [553:7952](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=553-7952) · [snapshot](detalle-553-7952.json) |
| Navigation Menu | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2938:12924](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2938-12924) · [snapshot](detalle-2938-12924.json) |
| Pagination | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1763:1260](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1763-1260) · [snapshot](detalle-1763-1260.json) |
| Popover | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [726:6350](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=726-6350) · [snapshot](detalle-726-6350.json) |
| Progress | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2206:16412](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2206-16412) · [snapshot](detalle-2206-16412.json) |
| Radio Group | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1:41](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41) · [snapshot](detalle-1-41.json) |
| Resizable | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2882:453](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2882-453) · [snapshot](detalle-2882-453.json) |
| Scroll Area | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1800:1860](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1800-1860) · [snapshot](detalle-1800-1860.json) |
| Select | Figma simple/scrollable default 36 px y radio 8 px; código default=32 px, lg=36 px, rounded-lg=10 px. Alinear el mapeo de tamaño en composición y primitive. | [614:4917](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=614-4917) · [snapshot](detalle-614-4917.json) |
| Separator | Consume border; el cambio de neutral/300 repercute especialmente en María Linda. Mantener dimensiones y orientación. | [589:983](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=589-983) · [snapshot](detalle-589-983.json) |
| Sheet | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1295:386](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1295-386) · [snapshot](detalle-1295-386.json) |
| Sidebar | Figma Piel Sana sidebar/ring resuelve a Maria Linda/primary/500 (#7bc6bb). Es una referencia cruzada entre marcas que exige revisión, no copiar a ciegas. | [3114:1373](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3114-1373) · [snapshot](detalle-3114-1373.json) |
| Slider | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2772:1030](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2772-1030) · [snapshot](detalle-2772-1030.json) |
| Spinner | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [2206:19380](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2206-19380) · [snapshot](detalle-2206-19380.json) |
| Switch | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1:41](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41) · [snapshot](detalle-1-41.json) |
| Table | 13 conjuntos en página. TableHeader usa token table/header/background en Figma; código usa bg-muted/40. Hay dos variantes duplicadas en 2090:17809. Separar reparación del set y migración de colores. | [2064:259](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2064-259) · [snapshot](detalle-2064-259.json) |
| Tabs | Line/underline activo usa text-primary en código. Primary/card sigue bajo 4.5 en tres marcas; revisar el rol de texto sin sustituir el color oficial. | [1:33](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-33) · [snapshot](detalle-1-33.json) |
| Toast | Sombra de 0 4px 12px / 10% coincide con components/sonner/shadow. Cambian colores de estados y textos; no cambiar la sombra por el solo hecho de sincronizar. | [1:45](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-45) · [snapshot](detalle-1-45.json) |
| Toggle | Figma y código tienen radio 6 px y tamaño default 36 px. Cambian accent, muted y foreground; no hay evidencia para rehacer la geometría. | [3267:2627](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3267-2627) · [snapshot](detalle-3267-2627.json) |
| Toggle Group | Set 3331:60517 está en la página Toggle; revisar colores heredados y composición del grupo, conservar la API de selección. | [3331:60517](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3331-60517) · [snapshot](detalle-3267-2627.json) |
| Tooltip | Actualizar los roles consumidos que difieren entre Figma y código; conservar la API y las variantes documentadas. La coincidencia visual completa queda por validar en Playground tras la sincronización. | [1:30](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-30) · [snapshot](detalle-1-30.json) |

## 11. Orden propuesto para el lote de implementación

1. **Snapshot y tokens:** incorporar las diferencias confirmadas de roles, corregir divergencia entre catálogo/CSS, conservar primary oficiales. Apartar gradientes incompletos y alias cruzado de Sidebar para decisión de diseño.
2. **Tipografía:** actualizar inventario e IDs, nombres y heading/lg Bold; revisar ejemplos que los consumen.
3. **Primitives y composiciones:** Input/InputGroup/TimeInput y tamaños; Button/radio; Select/Native Select; Table/Data Table con sus roles propios. Incorporar brand-gradient cuando sus marcas y contraste estén resueltos.
4. **Propagación a las 50 familias:** comprobar normal, hover, focus, active, selected, invalid y disabled donde existan, en las cuatro marcas. Mantener API y comportamiento de Radix/Base UI/TanStack.
5. **Documentación y distribución:** actualizar fuentes canónicas, regenerar catálogo y registry; revisar versionado y changeset. El catálogo anuncia v1.0.0 mientras varias páginas de Storybook muestran v1.1.0: unificar la trazabilidad de release.
6. **Validación de implementación:** lint, typecheck, pruebas de interacción y build-storybook; regresión visual por marca y cálculo de contraste en fondos reales, incluyendo transparencia y gradientes. Estas pruebas no se ejecutaron en esta auditoría sin cambios de implementación.

## Entregables y límites

- `comparacion-tokens.csv/json`: 624 combinaciones y cadenas de aliases.
- `comparacion-tipografia.json`: clasificación por ID de estilo.
- `comparacion-extra-colors.json`: 36 coincidencias verificadas.
- `matriz-componentes.csv/json`: las 50 familias, archivos de implementación, fuentes y acciones.
- `contraste-24-combinaciones.json`: valores completos y criterio AA.
- `variables*.json`, `estilos-*.json`, `detalle-*.json`, `storybook/*.md`: evidencia leída en vivo.
- `comparar.py` e `informe.py`: scripts reproducibles contra este snapshot y el repositorio indicado.

Una familia registrada en la matriz no queda declarada “sin diferencias” solo por no tener un hallazgo geométrico específico. Se comprobó su inventario y sus dependencias; la validación visual completa de cada estado se realiza durante la implementación. El historial de snapshots permite confirmar algunas altas de variantes, pero no reconstruir de manera fiable cada edición humana realizada en Figma.
