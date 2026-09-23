# Resincronización de variables — 22 de septiembre de 2026

## Resultado

Leídas 767 variables actuales de Figma. Frente al snapshot de código: 66 variables auxiliares retiradas, 26 variables modificadas y ninguna variable nueva. Se conservan 156 roles semánticos y sus cuatro modos de marca. No se modificó Figma.

Cambios: aliases con opacidad, estados active/hover de GRM, colores de texto primary y success, primary/default-foreground, primary/light-border, background-active y los dos extremos de los gradientes de Button. El detalle antes/después está en `variables-sync-2026-09-22.json`.

El exportador ahora interpreta `opacity: 10` como 10 %, admite aliases encadenados por modo y rechaza porcentajes fuera de 0–100. Se regeneraron tokens.css, semantic-brand-token-values.ts, Registry, catálogo y Storybook estático.

## Validación de esta sincronización

- Lint y TypeScript: correctos.
- Storybook MCP: 51 stories aprobadas, con accesibilidad habilitada en la ejecución.
- Build de Storybook y Registry: correcto.
- Navegador: 624 valores CSS coincidentes, 156 por marca.
- Resolución independiente desde Figma: 612 colores coincidentes; 88 incluyen transparencia. Los 12 valores restantes son tipográficos.
- Lectura final de Figma: 767 variables, huella `333a943a`, coincidente con el snapshot.

## Estado de v1.1.0

Continúa como candidata sin publicar. Sus versiones no aumentan nuevamente durante la preparación de la misma release. El manifiesto registra 818 variables/estilos actuales y conserva la trazabilidad de 66 variables retiradas.

La certificación previa de la candidata se invalidó explícitamente: las pruebas anteriores de 204 vistas no se trasladan automáticamente a estos nuevos colores. Esta sincronización demuestra fidelidad de los tokens y los checks indicados, no conformidad WCAG de todas las combinaciones. Antes de publicar, se debe renovar la auditoría completa y el sello de la release. Los estilos conservan la fecha de su lectura anterior; este trabajo volvió a leer las variables.
