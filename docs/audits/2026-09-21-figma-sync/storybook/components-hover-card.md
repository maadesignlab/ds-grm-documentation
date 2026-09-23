# HoverCard

ID: components-hover-card

## Stories

### Playground

Story ID: components-hover-card--playground

```
import { HoverCardExample } from "@reina-madre/design-system";

const Playground = () => <HoverCardExample
    key={JSON.stringify(args)}
    triggerType="button"
    side="top"
    align="center"
    opened={false}
    openDelay={700}
    closeDelay={300} />;
```

## Docs

### Docs

import { Meta, Title, Source } from "@storybook/addon-docs/blocks"
import * as HoverCardStories from "./hover-card.stories"
import hoverCardSource from "./hover-card.tsx?raw"
import exampleSource from "./hover-card-example.tsx?raw"
import { HoverCardSides, HoverCardSpecifications, HoverCardVariants } from "./hover-card-docs"

<Meta of={HoverCardStories} />
<Title of={HoverCardStories} />

## Versión

<details className="rounded-lg border border-border bg-card px-4 py-3 mb-12">
  <summary><strong>v1.0.0</strong> · Implementación inicial desde Figma y shadcn/ui</summary>

  - Conserva Root, Trigger, Content, Portal, delays, colisiones y navegación accesible de Radix/shadcn.
  - Adapta la superficie de Figma de 276 × 104 px con tokens semánticos y tipografía por marca.
  - Resuelve Button y texto mediante `asChild`, sin ampliar artificialmente la API pública.
</details>

## Variantes de trigger

<div className="mb-12"><HoverCardVariants /></div>

## Posición

<div className="mb-12"><HoverCardSides /></div>

## Especificaciones

<div className="mb-12"><HoverCardSpecifications /></div>

## Código

### Primitive

<Source language="tsx" code={hoverCardSource} />

### Composición de referencia

<Source language="tsx" code={exampleSource} />
