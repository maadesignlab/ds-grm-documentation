# Design System Grupo Reina Madre

Design System React basado en shadcn/ui. El archivo **Design System GRM v1** de Figma es la fuente de verdad para organización, tipografía, tokens y especificación visual.

## Desarrollo

```bash
npm run dev
npm run storybook
```

## Calidad

```bash
npm run lint
npm run typecheck
npm run test
npm run build-storybook
```

## Componentes shadcn/ui

El proyecto incluye `components.json` y aliases compatibles con el CLI:

```bash
npx shadcn@latest add <component>
```

Después de instalar, adapta el componente a los tokens semánticos de Figma. Consulta [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Versionado

El paquete usa SemVer y Changesets. Todo cambio visible debe incluir:

```bash
npm run changeset
```

El resumen comienza con el componente afectado. `npm run version-packages` actualiza la versión y el changelog antes de publicar.
# ds-grm-documentation
