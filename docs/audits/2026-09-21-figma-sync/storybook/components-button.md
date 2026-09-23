# ButtonTextExample

ID: components-button

## Stories

### Texto

Story ID: components-button--texto

```
import { ButtonIconExample, ButtonTextExample } from "@reina-madre/design-system";

const Texto = () => {
    void _buttonMode

    return (
        <ButtonTextExample
            buttonMode="text"
            state="normal"
            variant="default"
            size="default"
            disabled={false}
            contentPlacement="left">Ver más</ButtonTextExample>
    );
};
```

### Icono

Story ID: components-button--icono

```
import { ButtonIconExample, ButtonTextExample } from "@reina-madre/design-system";

const Icono = () => {
    void _buttonMode

    return (
        <ButtonIconExample
            buttonMode="icon"
            state="normal"
            variant="default"
            size="icon"
            disabled={false}
            roundness="semiSquared">Button</ButtonIconExample>
    );
};
```

## Props

```
export type Props = {
  /**
    
  */
  state?: "normal" | "loading" | "disabled" = "normal";
  /**
    
  */
  size?: "default" | "xs" | "sm" | "lg" = "default";
  /**
    
  */
  contentPlacement?: "none" | "left" | "right" = "none";
  children?: any = "Button";
}
```

## Docs

### Docs

import { Meta, Title, Source } from "@storybook/addon-docs/blocks"
import * as ButtonStories from "./button.stories"
import buttonSource from "./button.tsx?raw"
import { ButtonSizeOverview, ButtonSpecifications, ButtonVariantOverview } from "./button-docs"

<Meta of={ButtonStories} />
<Title of={ButtonStories} />

## Versión

<details className="rounded-lg border border-border bg-card px-4 py-3 mb-12">
  <summary><strong>v1.1.0</strong> · Alineación con Figma</summary>

  - Tamaños, espaciado, radio, sombra y variantes sincronizados con el nodo `1:24`.
  - Button e Icon Button conservan propiedades independientes en Storybook.
  - Icon Button admite forma semicuadrada o circular.

</details>

## Variantes de estilo

Cada muestra utiliza los tokens de la marca activa.

<div className="mb-12">
  <ButtonVariantOverview />
</div>

## Escala y forma

<div className="mb-12">
  <ButtonSizeOverview />
</div>

## Especificaciones

<div className="mb-12">
  <ButtonSpecifications />
</div>

## Código

<Source language="tsx" code={buttonSource} />
