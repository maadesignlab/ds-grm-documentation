# Conciliación Figma → código · etapa 1 · 23 septiembre 2026

Estado: conciliación de variables, estilos e inventario de componentes completada. Candidata v1.1.0 sin publicar.

Fuente: lectura en vivo del archivo `X33xAJBT7ty8FWYDFVvo3m`. Captura de fundamentos: `2026-09-23T18:05:58.432Z`; inventario de componentes leído en esta misma sesión.

## Hallazgos y correcciones

| Hallazgo | Causa | Corrección |
| --- | --- | --- |
| `Default Column Grid` figuraba en el manifiesto, pero faltaba en el snapshot. El estilo existe en Figma. | La captura anterior de estilos visuales incluía paint/effect y omitía grid. | Se reincorpora la retícula real de 12 columnas, con sus bindings de offset, count y gutter. No se elimina del manifiesto. |
| `body/lg/sans/regular` no estaba documentado ni exportado en código. | Estilo presente en Figma y ausente del snapshot anterior. | Se importa con su ID, bindings, tamaño 16 px y línea 24 px; se regenera Typography y su exportación CSS. Primera versión local registrada: 1.1.0. |
| Snapshot y manifiesto no tenían el mismo inventario. | Omisión de la retícula y del estilo de texto. | Ambos quedan en 820 entidades: 768 variables, 40 estilos de texto, 3 pinturas, 8 efectos y 1 retícula. |

## Correspondencia comprobada

- 768 variables: valores, nombres, IDs, colecciones y aliases idénticos al código anterior a esta conciliación. Sin cambios de color; se conservan los 500 y las exclusiones acordadas de Reina Madre y Piel Sana.
- 5 colecciones: modos y cantidades coincidentes.
- Pinturas y efectos: idénticos al snapshot previo.
- 49 páginas de componentes, 2.687 definiciones/conjuntos: cantidades, IDs/nombres de conjuntos, variantes y esquemas de propiedades coinciden con el inventario registrado de código. Se comprobaron también las rutas de implementación o composición de las 50 familias del manifiesto.
- 157 roles × 4 marcas = 628 valores: coincidencia entre catálogo generado y declaraciones CSS.
- Registry público y artefacto compilado: snapshot y manifiesto iguales a las fuentes conciliadas.

## Validación

- ESLint: correcto.
- TypeScript: correcto.
- Vitest en navegador: 56 pruebas en 52 archivos, correctas. Incluye exportación del nuevo estilo tipográfico.
- Build Storybook: correcto.
- `node scripts/verify-figma-reconciliation.mjs`: correcto. Verifica captura, huellas de entidades, inventario de componentes, CSS, estilos tipográficos y distribución.

## Alcance y siguiente etapa

Esta etapa verifica sincronización e inventario/esquemas de componentes; no vuelve a certificar geometría renderizada, todos los estados visuales ni contraste WCAG. No se alteró Figma ni se publicaron cambios.

`npm run release:verify` ya supera la discrepancia de inventario, pero sigue detenido en `Required verification failed`: el sello histórico requiere renovación. El verificador global aún referencia evidencia antigua de 624 valores. Actualizar esa evidencia y revisar visualmente estados/contraste corresponde a las siguientes etapas; no se sustituyeron esas comprobaciones por resultados de esta conciliación.

Evidencia: `docs/releases/1.1.0/reconciliation-2026-09-23/` (capturas completas y resumen). La verificación es respecto de esa captura; cambios posteriores en Figma requieren otra lectura.
