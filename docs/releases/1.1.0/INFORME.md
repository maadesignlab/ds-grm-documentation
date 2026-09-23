> **Corrección de los dos active aplicada:** [resultado y muestras](active-fix-2026-09-23/INFORME.html). GRM destructive 5,96:1 y Reina Madre warning 6,65:1. Las 28 excepciones se mantienen. La revisión ampliada de Toast detectó descripciones al 72 % por debajo del mínimo; no se declara aprobación global.

> **Revisión final 23/09/2026:** [resultado actualizado](review-2026-09-23/INFORME.md). 25 casos originales resueltos, 28 excepciones conservadas y 2 nuevos fallos de active fuera de las excepciones. Lanzamiento bloqueado.

> **Conciliación 23/09/2026 completada:** [resultado de la etapa 1](../../audits/figma-reconciliation-2026-09-23.md). 820 entidades, 628 valores CSS y 40 estilos de texto. El sello global de release sigue pendiente.

> **Auditoría renovada:** [contraste 22/09/2026](contrast-renewal-2026-09-22/INFORME.md). Resultado: no aprobada para publicación accesible.

> **Actualización 22/09/2026:** este informe corresponde a la validación anterior. Los tokens se resincronizaron; consulta [el resultado actual](VARIABLES-SYNC-2026-09-22.md). El sello completo de publicación requiere revalidación.

# Candidata DS GRM v1.1.0

**Estado: preparada localmente, sin publicar.** Rama `codex/cambios-ds-grm-documentation`; base `d47da42`.

## Hallazgos resueltos

| Hallazgo y evidencia | Causa | Solución aplicada |
|---|---|---|
| 108 diferencias CSS por rol/marca; catálogo independiente desactualizado. | Snapshots manuales separados. | Exportación única desde Figma: 156 roles × 4 marcas, 624 coincidencias verificadas en navegador. |
| 62 estilos documentados frente a 39 vigentes en Figma. | Reorganización de nombres, pesos e IDs. | Catálogo regenerado con 39 estilos y bindings originales; familias semánticas mapeadas a fuentes instaladas. |
| Button tenía 16 variantes brand-gradient sin equivalente y texto blanco sin contraste. | Stops incompletos por marca y overlay blanco. | Variante con tokens existentes de cada marca, texto blanco y overlay oscuro en hover/active. Radio de 6 px. |
| 56 textos habilitados de Input/TimeInput al 50 % de opacidad. | Atenuación adicional al token muted-foreground. | Opacidad 1 en Figma; Normal 36 px y Large 44 px, fondo card. Large se compone con className, sin sustituir size nativo. |
| Encabezados/filas de Table usaban aproximaciones de muted. | Roles específicos sin exportar. | Consumo directo de table/header/background y table/row-alternate. Data Table hereda la corrección. |
| Dos masters de TableHeaderText tenían el mismo nombre de variante. | Regular y Medium compartían Style=sans. | Medium se identifica como Style=sans-medium conservando el ID 2090:17812. |
| Select y Native Select: 32 px/radio 10 frente a 36 px/radio 8. | Mapeo geométrico desactualizado. | Default sincronizado; API y comportamiento Radix/nativo conservados. |
| Sidebar/ring de Piel Sana apuntaba a María Linda. | Alias cruzado. | Alias a un tono existente de Piel Sana. |
| Texto activo de marca y Tabs atenuados fallaban contraste. | Uso de primary como texto y foreground al 60 %. | Texto de marca usa primary/default-foreground; Tabs inactivos usan muted-foreground opaco. |
| Fondos degradados claros tenían colores literales. | Estilo sin bindings. | Stops ligados a los roles existentes; exportador soporta alias con opacidad cero. |
| Controles sin nombre y scroll no enfocable. | Composiciones incompletas. | Nombres accesibles en Card, Select, Combobox, Sidebar y Slider; foco de Scroll Area y columna Acciones de Data Table. |

Se conservaron **677 variables no semánticas**, incluidos todos los primitivos Brand. No se crearon variables ni estilos en Figma. Los 41 cambios de asignación semántica están registrados con antes/después en `alias-plan.json`.

## Correspondencia y versiones

- Global: **1.1.0** en package, lockfile, changelog, catálogo y registry.
- Local: Button **1.2.0**, Input **1.1.0**, Sidebar **1.4.1**, Label **1.0.2**; las otras 46 familias **1.0.1**. Se conserva la historia anterior en cada MDX.
- 833 variables y 51 estilos identificados individualmente en `design-system/release-manifest.json`, con huella del contenido y primera versión registrada **1.1.0**. `previousVersion: null` expresa que no había un historial local equivalente; no afirma que todos hayan cambiado.
- El snapshot incluye las variables completas, aliases, 39 estilos de texto, 3 pinturas, 8 efectos y 1 grid.
- Las revisiones locales no cambian los valores de primitivos de Figma.

## Verificación

- Lectura final de 49 páginas: 2.687 definiciones y conjuntos, inventario conservado y propiedades de los conjuntos legibles.
- Lectura viva de las 833 variables y 39 estilos de texto: igual al snapshot exportado.
- 624 valores semánticos CSS/catálogo: cero diferencias.
- 51 historias funcionales: pasan mediante MCP de Storybook, con accesibilidad obligatoria (`test: error`).
- 204 vistas (51 × 4 marcas): sin infracciones automáticas WCAG A/AA detectadas en los estados evaluados; se espera a las animaciones antes de medir.
- Gradiente: texto blanco y estados normal/hover/active comprobados en las cuatro marcas.
- Docs: estilos computados de Input, Button, Table, Tabs, Select y Native Select registrados por marca; capturas revisadas de las correcciones principales.
- Lint y TypeScript pasan. Build de Storybook generado. El build conserva avisos de tamaño de chunks, sin errores.

La cobertura corresponde al inventario, bindings y estados probados; no equivale a una certificación WCAG de cualquier producto o de toda combinación posible de props. Los primarios oficiales claros permanecen intactos y no deben usarse como texto pequeño sobre blanco: ese uso corresponde a primary/default-foreground.

El build final verifica además heading/lg a 24 px, peso 700 y tracking de −0,6 px, y reproduce los 624 valores semánticos de la misma fuente.

## Antes de publicar

Ejecutar `npm run release:verify`. Este comando comprueba versiones, snapshot, evidencia y huellas del código/artefacto validado. Falla si hay cambios posteriores. La comprobación de Figma corresponde a la lectura registrada; si Figma cambia después, se debe repetir su captura y comparación antes de publicar.

No se creó tag, commit de release, push ni despliegue.
