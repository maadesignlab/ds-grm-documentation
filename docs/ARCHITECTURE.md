# Arquitectura del Design System

## Fuentes de verdad

| Área | Fuente | Representación en código |
| --- | --- | --- |
| Organización visual | Páginas de Figma | Orden de Storybook |
| Tokens y tipografía | Variables de Figma | `src/styles/tokens.css` |
| API base y accesibilidad | shadcn/ui / Radix | `src/components/ui` |
| Comportamiento y variantes | Component sets de Figma | CVA + stories |
| Historial publicado | Repositorio | Changesets + SemVer |

Figma define el resultado visual; el código define la API y el comportamiento ejecutable. Una discrepancia debe resolverse explícitamente y documentarse, no ocultarse con valores locales.

## Estructura

```text
src/
├── components/ui/       componentes instalados o adaptados desde shadcn/ui
├── foundations/         documentación de tokens, tipografía e iconos
├── docs/                introducción y releases en Storybook
├── lib/                 utilidades compartidas de shadcn
└── styles/              tokens de Figma y estilos globales
```

Cada componente vive con su story. Las stories siguen el documento de Figma: anatomía/patrones, propiedades/variantes y uso/accesibilidad.

## Añadir un componente

1. Crear o aprobar la página y component set en Figma.
2. Instalar la base: `npx shadcn@latest add <component>`.
3. Sustituir los tokens de shadcn por tokens semánticos de `tokens.css`.
4. Adaptar las variantes con CVA, manteniendo primitivas Radix cuando existan.
5. Añadir stories, pruebas de interacción y reglas de accesibilidad.
6. Ejecutar `npm run changeset` e identificar el componente en el resumen.

No se edita código generado dentro de `node_modules` y no se copian valores de Figma directamente dentro de JSX.
