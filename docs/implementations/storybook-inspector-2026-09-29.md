# Inspector de Storybook · 29 de septiembre de 2026

## Activación

- Global: toolbar `dsInspector` (off/on), apagado inicialmente.
- Por componente: toolbar que alterna inherit/on/off, con override en `dsInspectorOverrides` por prefijo del story id. Comparte preferencia entre Canvas y Docs de un componente.
- Preview consume los eventos nativos setGlobals/globalsUpdated y storyRendered/docsRendered de Storybook; no depende de un intercambio personalizado con el toolbar. Incluye MDX sin Canvas decorado.
- No se modifican componentes ni Figma; la herramienta vive en .storybook.

## Lectura

- Valores computados del elemento bajo el puntero, rectángulo, marca más cercana y atributos de estado.
- CSSOM: reglas coincidentes, inline, herencia tipográfica, media/supports activos y reglas anidadas de Tailwind. Referencias a var CSS con resolución en el elemento; no se infiere procedencia por igualdad numérica.
- No se afirma que todas las reglas coincidentes sean ganadoras: pueden estar sobrescritas. No reconstruye todas las prioridades de cascada, container queries ni pseudo-elementos; las hojas no accesibles se contabilizan.
- Jerarquía basada exclusivamente en data-slot del DOM; los componentes React sin representación o sin marcador no pueden identificarse.
- Hover no cancela clics. Overlay en popover manual/top layer para portales. Alt+I fija; Esc limpia sin cancelar el Escape del componente.
- Al desactivar se retiran listeners, observadores, root de React y overlay.

## Validación

Pruebas Chromium: precedencia global/local, tokens reales frente a coincidencias, valores inline y cambio de variable, portales/clics/fijar/limpiar/cleanup y CSS anidado con media queries. TypeScript, ESLint y build de Storybook. Revisión visual manual pendiente por ausencia de navegador conectado.

API de referencia: https://storybook.js.org/docs/addons/addons-api y https://storybook.js.org/docs/essentials/toolbars-and-globals .

## Corrección del hover

Tarjeta junto al cursor con posicionamiento lateral/vertical y límites de ventana. No intercepta eventos salvo cuando se fija con Alt+I. Prueba de integración: globals nativos → hover → tarjeta y posición → override local → cambio de componente → desactivación.
