# AlertExample

ID: components-alert

## Stories

### Playground

Story ID: components-alert--playground

```
import { AlertExample } from "@reina-madre/design-system";

const Playground = () => <AlertExample
    variant="default"
    title="Nueva cita asignada"
    description="Se ha asignado una nueva cita al paciente por atención en Recepción"
    showIcon
    showAction
    actionLabel="Ver detalle" />;
```

## Props

```
export type Props = {
  /**
    
  */
  variant?: "default" | "destructive" = "default";
  /**
    
  */
  title?: string = "Nueva cita asignada";
  /**
    
  */
  description?: string = "Se ha asignado una nueva cita al paciente por atención en Recepción";
  /**
    
  */
  showIcon?: boolean = true;
  /**
    
  */
  showAction?: boolean = true;
  /**
    
  */
  actionLabel?: string = "Ver detalle";
}
```

## Docs

### Docs

import { Meta, Title, Source } from "@storybook/addon-docs/blocks"
import * as AlertStories from "./alert.stories"
import alertSource from "./alert.tsx?raw"
import { AlertCompositionOverview, AlertSpecifications, AlertVariantOverview } from "./alert-docs"

<Meta of={AlertStories} />
<Title of={AlertStories} />

## Versión

<details className="rounded-lg border border-border bg-card px-4 py-3 mb-12">
  <summary><strong>v1.0.0</strong> · Implementación inicial desde Figma</summary>

  - Variantes `default` y `destructive` sincronizadas con el nodo 1178:530.
  - Icono y acción opcionales mediante composición.
  - Implementación sobre la API compuesta de Alert de shadcn/ui.

</details>

## Variantes de estado

<div className="mb-12">
  <AlertVariantOverview />
</div>

## Composición

<div className="mb-12">
  <AlertCompositionOverview />
</div>

## Especificaciones

<div className="mb-12">
  <AlertSpecifications />
</div>

## Código

<Source language="tsx" code={alertSource} />
