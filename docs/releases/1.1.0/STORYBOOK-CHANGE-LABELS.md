# Cambios visibles en Storybook

Comparación de tokens exportados con la versión 1.0.0, commit d47da42. La base se conserva en design-system/release-baseline-tokens.json. El generador scripts/generate-token-changes.mjs vuelve a ejecutarse al sincronizar Figma.

- Nuevo: nombre incorporado al catálogo de código, normalizando antes los nombres CSS que contenían barras. No afirma creación de la variable en Figma.
- Actualizado: valor exportado, nombre CSS o referencia/opacidad documentada. Los cambios de notación se incluyen explícitamente; no todos implican cambio visual.
- Sin etiqueta: sin diferencias detectadas para la marca seleccionada.
- Ver cambio: valor de v1.0.0, valor actual y motivo.

Las cuatro marcas tienen 8 tokens nuevos en código. Actualizados: GRM Global 71, Reina Madre 58, María Linda 83, Piel Sana 80. Extra Colors no cambia.

Los 50 documentos de componentes especifican variantes nuevas, composiciones nuevas cuando corresponde, actualizaciones y tokens consumidos. Button añade brand-gradient; Input añade la composición Large de 44 px, sin inventar una variante del primitive nativo.

La candidata conserva sus hallazgos de contraste pendientes. Esta documentación no aprueba su publicación.

## Validación de la documentación

- Lint, TypeScript, compilación de Storybook y git diff --check: correctos.
- Revisión en navegador: cuatro marcas, comparación desplegable, documentación de Tokens, Button, Input, Table y Releases sin desbordamiento horizontal.
- Pruebas completas por MCP con accesibilidad: inconclusas; el servicio agotó el límite de 300 segundos sin devolver resultados. No se consideran aprobadas.

## Resincronización posterior

El inventario actual contiene 157 roles por marca. Se incorporó secondary/light-border, elevando a 9 los tokens nuevos frente a v1.0.0. Los recuentos actuales son:

- grm-global: 9 nuevos, 73 actualizados, 75 sin cambios.
- reina-madre: 9 nuevos, 71 actualizados, 77 sin cambios.
- maria-linda: 9 nuevos, 87 actualizados, 61 sin cambios.
- piel-sana: 9 nuevos, 83 actualizados, 65 sin cambios.

La comprobación de los 628 valores CSS contra el nuevo snapshot no detectó diferencias. Lint, tipos y compilación pasaron. La auditoría de contraste anterior corresponde al snapshot anterior y no acredita esta resincronización.
