# DropdownMenu

ID: components-dropdown-menu

## Stories

### Playground

Story ID: components-dropdown-menu--playground

```
import { DropdownMenuExample } from "@reina-madre/design-system";

const Playground = () => <DropdownMenuExample
    key={`${args.trigger}-${args.align}-${args.defaultOpen}`}
    align="start"
    trigger="button"
    defaultOpen={false}
    showLabel
    showIcons
    showSubmenu />;
```

## Docs

### Docs

import { Meta, Title, Source } from "@storybook/addon-docs/blocks"
import * as DropdownStories from "./dropdown-menu.stories"
import dropdownSource from "./dropdown-menu.tsx?raw"
import exampleSource from "./dropdown-menu-example.tsx?raw"
import { DropdownAlignment, DropdownPatterns, DropdownSpecifications } from "./dropdown-menu-docs"

<Meta of={DropdownStories} />
<Title of={DropdownStories} />

## Versión

<details className="rounded-lg border border-border bg-card px-4 py-3 mb-12">
  <summary><strong>v1.0.0</strong> · Implementación inicial desde Figma y shadcn/ui</summary>

  - Trigger Button o Icon Button.
  - Alineación `start` y `end` con offset vertical de 4 px.
  - Labels, grupos, separadores, estados, iconos y submenús.
  - Navegación por teclado, foco y semántica conservados desde Radix UI.
</details>

## Trigger

<div className="mb-12"><DropdownPatterns /></div>

## Alineación

<div className="mb-12"><DropdownAlignment /></div>

## Especificaciones

<div className="mb-12"><DropdownSpecifications /></div>

## Código

### Primitive

<Source language="tsx" code={dropdownSource} />

### Composición de referencia

<Source language="tsx" code={exampleSource} />
