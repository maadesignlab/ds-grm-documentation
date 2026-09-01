# Flujo de trabajo del Design System GRM

Esta guía describe el proceso utilizado para transformar la fuente de verdad en Figma en componentes basados en shadcn/ui, documentarlos en Storybook y mantenerlos versionados.

## 1. Arquitectura general

```text
Figma
├── Variables por marca
├── Tokens semánticos
├── Tipografía
└── Componentes, variantes y estados
        ↓
CSS tokens por data-theme
        ↓
Componente base de shadcn/ui
        ↓
Stories y controles de Storybook
        ↓
Documentación MDX
        ↓
Validación y versionado
```

Figma es la fuente de verdad para:

- Nombres y valores de tokens.
- Modos de marca.
- Familias tipográficas.
- Variantes, tamaños, estados y estructura de componentes.
- Espaciados, radios, bordes y sombras.

shadcn/ui proporciona el código base del componente. El Design System GRM adapta ese código mediante tokens y variantes propias, conservando el patrón de componentes abiertos y copiables de shadcn/ui.

### Regla de fidelidad a shadcn/ui

Para cada componente se preservan, siempre que exista un equivalente:

- La composición pública y los nombres de sus subcomponentes.
- El primitive accesible de Radix/Base UI utilizado por shadcn/ui.
- `asChild` y la semántica estricta de Slot, sin fallbacks que cambien el elemento renderizado.
- Las propiedades base existentes; las propiedades de Figma se agregan como extensiones o aliases compatibles.
- Los atributos `data-slot`, estados de foco, teclado, disabled y ARIA.

Figma puede modificar tokens, geometría, tipografía, variantes y estados visuales, pero no debe reemplazar el comportamiento accesible del componente base. Las utilidades exclusivas de documentación, como `inline` en Alert Dialog, no representan el modo de producción predeterminado.

Cuando shadcn/ui no ofrece un equivalente —como Attachment— el componente se considera propio del Design System y reutiliza primitivas existentes como Button y Slot.

## 2. Fuente de Figma

Archivo principal:

- [Design System GRM v1](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1)
- Nodo de Button: `1:24`
- Nodo de Badge: `186:141`
- Nodo de Accordion: `1771:909`

Antes de modificar un componente se debe inspeccionar en Figma:

1. Nombre del componente y sus variantes.
2. Propiedades específicas de cada tipo.
3. Tamaños y medidas.
4. Tokens vinculados.
5. Estados: normal, hover, active, disabled y loading cuando corresponda.
6. Tipografía y contenido interno.

El código generado por herramientas de Figma se utiliza como referencia técnica. No se copia literalmente: se traduce al componente, los tokens y las convenciones existentes en el proyecto.

## 3. Marcas y tokens

Las marcas disponibles son:

| Selector | Marca |
| --- | --- |
| `grm-global` | GRM Global |
| `reina-madre` | Reina Madre |
| `maria-linda` | María Linda |
| `piel-sana` | Piel Sana |

Los valores se encuentran en:

- `src/styles/tokens.css`

Cada marca se define mediante el atributo `data-theme`:

```css
[data-theme="reina-madre"] {
  --primary: #ed80a8;
  --primary-foreground: #ffffff;
  --brand-font-sans: "Inter Variable", Inter, sans-serif;
}
```

Los componentes nunca deben contener colores hexadecimales específicos de una marca. Deben consumir variables semánticas:

```tsx
className="bg-primary text-primary-foreground"
```

Para variantes claras de estado se utilizan las familias correspondientes:

```css
--success-light
--success-light-foreground
--success-light-border
--success-light-hover
--success-light-active
```

El mismo patrón se aplica a `warning`, `destructive`, `error` e `info`.

## 4. Tipografía por marca

Los valores fueron leídos de las variables `typography/sans` y `typography/mono` de Figma:

| Marca | Fuente sans |
| --- | --- |
| GRM Global | Inter |
| Reina Madre | Inter |
| María Linda | Plus Jakarta Sans |
| Piel Sana | Kantumruy Pro |

La fuente monoespaciada compartida es JetBrains Mono.

Las familias se cargan localmente en `src/styles/globals.css` y se asignan mediante:

```css
--brand-font-sans
--brand-font-mono
```

TailwindCSS las consume así:

```css
@theme inline {
  --font-heading: var(--brand-font-sans);
  --font-sans: var(--brand-font-sans);
  --font-mono: var(--brand-font-mono);
}
```

Esto permite que la interfaz y la documentación cambien de fuente inmediatamente al seleccionar otra marca.

## 5. Sincronización del selector

El selector global está configurado en:

- `.storybook/preview.tsx`

El global utilizado es `brandTheme`. Cuando cambia, Storybook actualiza:

```html
<html data-theme="maria-linda">
```

La sincronización escucha el evento `GLOBALS_UPDATED`, de modo que Docs y Canvas reciben la nueva marca sin necesidad de navegar a otra vista.

El valor se conserva en `localStorage` con la clave:

```text
ds-brand-theme
```

## 6. Implementación sobre shadcn/ui

El componente Button vive en:

- `src/components/ui/button.tsx`

Mantiene la estructura base de shadcn/ui:

- React.
- `class-variance-authority`.
- Radix Slot para `asChild`.
- Utilidad `cn`.
- Variantes y tamaños con TailwindCSS.

La adaptación del Design System se realiza dentro de `buttonVariants`:

```tsx
const buttonVariants = cva(baseClasses, {
  variants: {
    variant: {
      default: "...",
      secondary: "...",
      "brand-neutral": "...",
      outline: "...",
      ghost: "...",
      link: "...",
      success: "...",
      warning: "...",
      destructive: "...",
    },
    size: {
      default: "...",
      xs: "...",
      sm: "...",
      lg: "...",
      icon: "...",
      "icon-xs": "...",
      "icon-sm": "...",
    },
  },
})
```

### Button con texto

| Tamaño | Altura | Padding X | Gap |
| --- | --- | --- | --- |
| `lg` | 36 px | 12 px | 12 px |
| `default` | 32 px | 12 px | 12 px |
| `sm` | 28 px | 12 px | 12 px |
| `xs` | 24 px | 12 px | 12 px |

El icono o spinner interno mide 16 × 16 px.

### Icon Button

| Tamaño | Dimensiones | Icono |
| --- | --- | --- |
| `icon` | 32 × 32 px | 16 × 16 px |
| `icon-sm` | 28 × 28 px | 16 × 16 px |
| `icon-xs` | 24 × 24 px | 16 × 16 px |

Icon Button puede utilizar:

- `semiSquared`: radio de 6 px.
- `full`: forma circular.

## 7. Stories y propiedades

Las stories viven en:

- `src/components/ui/button.stories.tsx`

Button con texto e Icon Button se documentan como stories separadas porque sus propiedades no deben mezclarse.

### Story Texto

Expone:

- `variant`
- `size`: `xs | sm | default | lg`
- `state`: `normal | loading | disabled`
- `contentPlacement`: `none | left | right`
- `children`

### Story Icono

Expone:

- `variant`
- `size`: `icon-xs | icon-sm | icon`
- `state`: `normal | loading | disabled`
- `roundness`: `semiSquared | full`

No expone `children` ni `contentPlacement` en Controls.

Los botones se centran mediante:

```tsx
parameters: {
  layout: "centered",
}
```

### Caso Badge

Badge mantiene la base de shadcn/ui con `cva`, `Slot`, `asChild` y `cn`, pero utiliza las propiedades definidas en Figma:

- `variant`: `primary | secondary | brand-neutral | transparent | success | warning | error | destructive | info`
- `appearance`: `solid | outline`
- `size`: `xl | lg | md | sm`
- Contenido opcional a izquierda y derecha mediante composición.

Solo existe un Playground. Los controles de contenido permiten seleccionar `none`, `icon` o `spinner` de manera independiente para cada lado.

`transparent` solo existe con tratamiento `outline` en Figma. No se debe documentar `transparent + solid` como combinación válida.

Escala tipográfica y geométrica:

| Tamaño | Fuente | Line-height | Padding X | Padding Y | Altura |
| --- | --- | --- | --- | --- | --- |
| `xl` | 14 px | 20 px | 11 px | 5 px | 30 px |
| `lg` | 12 px | 16 px | 9 px | 3 px | 22 px |
| `md` | 10 px | 15 px | 9 px | 3 px | 21 px |
| `sm` | 10 px | 15 px | 7 px | 1 px | 17 px |

Todos los tamaños usan peso Medium (500), letter spacing 0 y la familia `--brand-font-sans`.

#### Bordes de Figma

Los strokes de Badge en Figma se dibujan hacia el interior y no incrementan sus dimensiones. Un `border: 1px` convencional añade tamaño al box model o reduce el espacio interno cuando se fuerza la altura.

Para reproducir el componente 1:1 se utiliza un borde interior:

```tsx
className="[box-shadow:inset_0_0_0_1px_var(--success-light-border)]"
```

No se deben forzar las alturas del Badge mientras se mantiene un borde CSS externo. La altura correcta debe resultar de:

```text
line-height + padding superior + padding inferior
```

Los fondos porcentuales deben recalcularse desde el token de la marca activa:

```tsx
bg-[color-mix(in_srgb,var(--primary)_5%,transparent)]
bg-[color-mix(in_srgb,var(--secondary-default-border)_10%,transparent)]
```

No se debe usar un valor tenue heredado de otra marca.

## 8. Documentación MDX

La documentación principal está en:

- `src/components/ui/button.mdx`
- `src/components/ui/button-docs.tsx`
- `src/components/ui/badge.mdx`
- `src/components/ui/badge-docs.tsx`

El MDX contiene la estructura editorial. El archivo auxiliar TSX contiene las visualizaciones y tablas para evitar lógica extensa dentro del documento.

Orden actual:

1. Versión del componente.
2. Variantes de estilo.
3. Escala y forma.
4. Especificaciones.
5. Código fuente.

La página Docs no incluye un Playground adicional. La interacción se mantiene en las stories.

### Código siempre actualizado

El código fuente se importa directamente:

```mdx
import buttonSource from "./button.tsx?raw"

<Source language="tsx" code={buttonSource} />
```

Así, el bloque copiable siempre coincide con la implementación real.

### Visualizaciones

`button-docs.tsx` contiene:

- `ButtonVariantOverview`: tarjetas con muestra, fondo, texto y borde.
- `ButtonSizeOverview`: comparación visual de tamaños y formas.
- `ButtonSpecifications`: tablas técnicas para Button e Icon Button.

Las tablas usan estilos explícitos en los puntos donde Storybook Docs puede sobrescribir márgenes, alineación vertical o tipografía.

### Muestras de componente en Docs

Las muestras deben renderizar el componente público, nunca una recreación visual:

```tsx
<Badge variant="primary" appearance="solid" size="lg">
  Badge
</Badge>
```

Las vistas de escala deben mostrar la configuración base de Figma. Los íconos y spinners opcionales se prueban en el Playground y solo deben aparecer en Docs cuando la sección documente expresamente esa propiedad.

La diagramación documental de componentes debe reutilizar el patrón de Button:

- Tarjeta con muestra centrada.
- Encabezado de variante en una sola línea.
- Filas separadas para fondo, texto y borde.
- Escala presentada en filas con divisor.
- Especificaciones en tablas con encabezado, alturas y alineación consistentes.

### Revisión editorial obligatoria

Cada componente nuevo o actualizado debe pasar una revisión de consonancia visual en Docs. Button es la referencia canónica y se deben comprobar estas medidas, no solo que el contenido compile:

| Elemento | Criterio |
| --- | --- |
| Separación entre secciones principales | 48 px después del contenido de cada sección |
| Tarjetas y tablas | `rounded-lg`, borde `--border` y fondo `--card` |
| Encabezado interno | 20 px laterales; título 14/20 o 16/24 según jerarquía; descripción 12/18 o 13/20 |
| Área de muestra | Contenido centrado, fondo `--background` y padding de 20 px |
| Grupos de tarjetas | 12 px para matrices compactas y 24 px entre bloques técnicos |
| Encabezado de tabla | 11 px, peso 600, `0.04em`, uppercase y padding 11 × 16 px |
| Filas de tabla | 52 px mínimo, texto 12 px/1.4, padding 10 × 16 px y divisor `--border` |
| Código corto | JetBrains Mono a 10 px, alto mínimo de 24 px |

La revisión debe ejecutarse en el navegador con las cuatro marcas. Se debe medir `font-family`, color, tamaño, line-height, márgenes, padding, gap, radio y altura de fila. Storybook no puede aportar colores o tipografías editoriales fijas a la vista final; el texto común usa `--brand-font-sans` y `--foreground`, mientras el código conserva `--brand-font-mono`.

### Diferencias entre Canvas y Docs

Canvas y Docs son contextos CSS distintos. Que ambos utilicen el mismo componente React no garantiza por sí solo que tengan los mismos estilos computados.

Storybook Docs puede aplicar reglas como:

```css
.sbdocs-wrapper :where(span:not(...)) {
  font-size: 16px;
}
```

Esta regla llegó a sobrescribir el tamaño LG de Badge en Docs:

| Contexto | Resultado incorrecto |
| --- | --- |
| Playground | 12 px / 16 px |
| Docs | 16 px / 16 px |

Las propiedades críticas que puedan ser sobrescritas por Storybook deben quedar protegidas en el componente. Para Badge se resuelven por `size` y se aplican directamente:

```tsx
const badgeTypography = {
  xl: { fontSize: 14, lineHeight: "20px" },
  lg: { fontSize: 12, lineHeight: "16px" },
  md: { fontSize: 10, lineHeight: "15px" },
  sm: { fontSize: 10, lineHeight: "15px" },
}
```

Esto no sustituye los tokens ni TailwindCSS: protege los valores tipográficos que forman parte de la geometría pública del componente frente al CSS editorial de Docs.

En componentes Radix también se deben medir los elementos semánticos internos. `AccordionPrimitive.Header` renderiza un `h3`; Storybook Docs puede añadirle margen aunque el trigger y el contenido sean correctos. El encabezado debe neutralizarlo:

```tsx
<AccordionPrimitive.Header className="flex" style={{ margin: 0 }}>
```

En Accordion también se retiró el borde transparente heredado de shadcn porque añadía 2 px al trigger. El resultado validado debe ser:

| Parte | Playground | Docs | Figma |
| --- | --- | --- | --- |
| Trigger | 40 px | 40 px | 40 px |
| Contenido de ejemplo | 50 px | 50 px | 50 px |
| Ítem expandido | 91 px | 91 px | 91 px |

El ancho debe seguir el patrón de shadcn/ui: el contenedor de la historia define el límite y Accordion ocupa todo el ancho disponible.

```tsx
<div className="w-[calc(100vw-48px)] max-w-[404px]">
  <Accordion className="w-full">{/* items */}</Accordion>
</div>
```

El texto del trigger necesita una región flex explícita. No debe quedar como nodo de texto anónimo junto al ícono:

```tsx
<span
  data-slot="accordion-trigger-text"
  className="min-w-0 flex-1"
  style={{ font: "inherit", letterSpacing: "inherit" }}
>
  {children}
</span>
```

Con un trigger de 404 px, el texto conserva 382 px tanto expandido como colapsado: 382 px de texto + 6 px de gap + 16 px de ícono. La familia tipográfica cambia por marca sin modificar esa región:

- GRM Global y Reina Madre: Inter.
- María Linda: Plus Jakarta Sans.
- Piel Sana: Kantumruy Pro.

## 9. Estructura recomendada por componente

### Caso Attachment

El nodo `2827:14904` confirma que los componentes compuestos también deben conservar una única fuente de renderizado. Las muestras de Docs y el Playground construyen cada caso con `Attachment`, `AttachmentMedia`, `AttachmentContent`, `AttachmentActions` y el resto de la API pública; no replican su apariencia con HTML documental.

En Attachment se deben validar como propiedades independientes:

- Estado: `idle`, `uploading`, `processing`, `error` y `done`.
- Tamaño: `default`, `sm` y `xs`.
- Orientación: `horizontal` y `vertical`.
- Media: icono o imagen.
- Acciones y trigger opcionales.
- Grupo horizontal de 1 a 10 adjuntos.

Las dimensiones de `error` son 24 px mayores en horizontal porque incorpora Retry y Remove. Esto pertenece a la geometría de Figma, no debe compensarse ocultando una acción ni comprimiendo el texto. `AttachmentGroup` conserva `gap-3`, desplazamiento horizontal y snapping; cada hijo sigue siendo una instancia real de Attachment.

### Caso Alert

El nodo `1178:530` define dos variantes de estado (`default` y `destructive`) y dos propiedades de composición independientes: icono y acción. Docs y Playground deben usar siempre `Alert`, `AlertTitle`, `AlertDescription` y `AlertAction`; la acción renderiza el `Button` XS público del sistema.

La muestra de referencia mide 448 × 80 px. El borde de Figma es interior, por lo que se representa con `outline` negativo para no añadir 2 px a la geometría. Título y descripción usan 14/20 y deben proteger la familia `--brand-font-sans` frente al CSS editorial de Storybook Docs.

### Caso Alert Dialog

El nodo `1187:612` define tamaños `basic` (384 × 148 px) y `sm` (320 × 148 px), estados `default` y `destructive`, y media opcional. La implementación conserva Root, Trigger, Content, Header, Media, Title, Description, Footer, Cancel y Action de Alert Dialog de Radix/shadcn.

Docs utiliza el modo `inline` de `AlertDialogContent` para renderizar la misma superficie real sin crear overlays o portales superpuestos. Este modo es documental; el Playground conserva Portal, Overlay, foco modal y cierre accesible. Las acciones siempre reutilizan Button del sistema.

### Caso Card

El nodo `1798:3431` define tamaños `default` (384 px) y `sm` (320 px), estilos `body` e `image`, y espaciados estructurales de 12, 16, 20, 24 y 32 px. La API mantiene los subcomponentes públicos de shadcn/ui: Card, Header, Title, Description, Action, Content y Footer.

Card Body sigue siendo un slot flexible. CardFooter expone `layout="column|row|wrap"` y las acciones reutilizan Button. Las muestras de Docs deben componer el componente público real; no deben recrear la tarjeta con HTML visual paralelo.

En `variant="image"`, la imagen ocupa el slot Card Body y aparece antes del Header; no se debe renderizar un segundo CardContent. Header y Footer son regiones `shrink-0`, mientras la imagen absorbe el espacio flexible dentro de los 361 px. El padding del Footer usa el mismo `--card-spacing`: en layout column mide 107, 115 y 123 px para spacing 16, 20 y 24 respectivamente.

### Caso Carousel

El nodo `2782:1341` amplía el Carousel de shadcn/ui con escalas `full`, `large`, `medium` y `small`, equivalentes a 1, 2, 3 y 4 ítems visibles. Se preservan Embla, CarouselContext, `opts`, `plugins`, `setApi`, los subcomponentes Content/Item/Previous/Next y la semántica `region`, `carousel`, `group` y `slide`.

Position y Status no son props visuales manuales: se derivan de `api.canScrollPrev()`, `api.canScrollNext()` y la selección real de Embla. La orientación vertical usa ArrowUp/ArrowDown por teclado y la horizontal ArrowLeft/ArrowRight.

La documentación también debe conservar las vías oficiales de personalización de shadcn/ui: `basis-*` en CarouselItem, spacing mediante margen negativo en CarouselContent y padding en CarouselItem, opciones mediante `opts`, acceso con `setApi`, eventos, plugins y dirección RTL. Los tamaños del DS son atajos y no sustituyen estas APIs.

### Caso Sidebar

El nodo `3114:1373` define anchos de 256 px expandido y 56 px colapsado, header de 56 px, ítems de navegación de 40 px, iconos de 16 px, padding horizontal de 12 px y grupos separados por 20 px. Los labels usan 11 px, uppercase y tracking de `0.1em` con divisor flexible.

La adaptación conserva el contrato compuesto de shadcn/ui: `SidebarProvider`, `Sidebar`, `SidebarHeader`, `SidebarContent`, `SidebarGroup`, `SidebarMenu`, submenús, rail, inset, tooltips y responsive Sheet. También mantiene `side`, `variant`, `collapsible`, estado controlado y no controlado, cookie y shortcut `Ctrl/Cmd + B`. Las dimensiones GRM se aplican sobre estas primitivas; no se crea una implementación paralela.

Las muestras de Docs renderizan el Sidebar real en un contenedor editorial acotado. El CSS de Docs solo convierte el contenedor desktop fijo en una instancia relativa para mostrarla dentro de las cards; no cambia la API ni el comportamiento de producción.

```text
src/components/ui/
├── component.tsx
├── component.stories.tsx
├── component.mdx
└── component-docs.tsx       # Solo cuando requiere visualizaciones propias
```

Responsabilidades:

| Archivo | Responsabilidad |
| --- | --- |
| `component.tsx` | Implementación pública basada en shadcn/ui |
| `component.stories.tsx` | Playground, controles, estados y pruebas visuales |
| `component.mdx` | Narrativa, versión, especificaciones y código |
| `component-docs.tsx` | Diagramas, matrices y tablas documentales |

## 10. Versionado

El paquete utiliza Changesets.

Crear un registro de cambio:

```bash
npm run changeset
```

Actualizar versiones:

```bash
npm run version-packages
```

Publicar:

```bash
npm run release
```

Cada cambio de componente debe documentar:

- Versión.
- Descripción breve.
- Propiedades o variantes afectadas.
- Cambios de tokens.
- Cambios visuales o de comportamiento.
- Posibles cambios incompatibles.

## 11. Validación

Antes de cerrar un cambio:

```bash
npm run lint
npm run typecheck
npm run test
npm run build-storybook
```

Para cambios aislados puede ejecutarse ESLint sobre los archivos afectados:

```bash
npx eslint src/components/ui/button.tsx \
  src/components/ui/button.stories.tsx \
  src/components/ui/button-docs.tsx
```

La compilación de Storybook valida:

- Indexación de MDX.
- Asociación de `Meta` con el archivo CSF.
- Importaciones de Docs.
- Generación del código fuente.
- Procesamiento de TailwindCSS.
- Inclusión de fuentes locales.

### Validación visual 1:1

`build-storybook` confirma que el código compila, pero no demuestra igualdad visual. Para componentes afectados por estilos globales se deben comparar los valores computados en Canvas y Docs.

Medir como mínimo:

- `width` y `height`.
- `font-family`, `font-size`, `font-weight` y `line-height`.
- `padding` y `gap`.
- Color de texto y fondo.
- Borde o `box-shadow`.
- Radio.

Ejemplo de resultado validado para Badge LG Primary Solid:

| Propiedad | Playground | Docs |
| --- | --- | --- |
| Ancho | 54.609 px | 54.609 px |
| Alto | 22 px | 22 px |
| Fuente | Inter 12 px / 16 px | Inter 12 px / 16 px |
| Peso | 500 | 500 |
| Padding | 3 px 9 px | 3 px 9 px |
| Gap | 4 px | 4 px |

Si un valor difiere, primero se debe identificar la regla CSS que gana en el navegador. No se deben compensar diferencias mediante ajustes visuales aproximados.

## 12. Checklist para nuevos componentes

- [ ] Leer el nodo específico en Figma.
- [ ] Identificar variantes, tamaños, estados y propiedades.
- [ ] Mapear colores a tokens semánticos.
- [ ] Mapear medidas a TailwindCSS o variables.
- [ ] Instalar el componente base desde shadcn/ui.
- [ ] Adaptar el componente sin romper su API base innecesariamente.
- [ ] Separar stories cuando existan APIs diferentes.
- [ ] Mantener un único Playground por tipo de componente.
- [ ] Crear documentación MDX depurada.
- [ ] Revisar jerarquía tipográfica, ritmo vertical, radios, tablas y separación entre secciones contra el patrón de Button.
- [ ] Mostrar variantes y especificaciones de manera visual.
- [ ] Importar el código real con `?raw`.
- [ ] Probar el selector de las cuatro marcas.
- [ ] Verificar colores, fuentes, estados y accesibilidad.
- [ ] Confirmar que las muestras de Docs renderizan el componente público.
- [ ] Comparar estilos computados entre Playground y Docs.
- [ ] Verificar que Storybook Docs no sobrescribe tipografía o geometría.
- [ ] Comprobar si los bordes de Figma son interiores antes de usar `border`.
- [ ] Evitar combinaciones de variantes que no existan en Figma.
- [ ] Ejecutar lint, typecheck, pruebas y build de Storybook.
- [ ] Crear el changeset correspondiente.

## Principio final

Figma define la intención y los valores del sistema. Los tokens CSS hacen posible el cambio de marca. shadcn/ui proporciona la base técnica. Storybook presenta, prueba y explica el resultado. Ninguna de estas capas debe duplicar manualmente información que pueda obtener de la capa anterior.
