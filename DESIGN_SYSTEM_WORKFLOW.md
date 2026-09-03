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

#### Orden obligatorio de prioridad

Cuando exista un componente oficial equivalente, la implementación debe resolver decisiones en este orden:

1. **shadcn/ui es la base técnica y contractual.** Se parte del componente oficial vigente, su primitive, API pública, composición, comportamiento, accesibilidad y estados.
2. **Figma adapta la expresión del Design System.** Sus tokens, geometría, tipografía y variantes se aplican sin sustituir ni duplicar innecesariamente la API oficial.
3. **El proyecto solo añade extensiones justificadas.** Una propiedad nueva se incorpora únicamente cuando Figma exige una capacidad que no puede expresarse mediante la composición oficial, `className` o componentes públicos existentes.

No se deben inventar subcomponentes, variantes, estados o propiedades por conveniencia documental. Antes de extender la API se debe comprobar la documentación oficial de shadcn/ui. Avatar, spinner, fondos, bordes y disposiciones construibles mediante composición deben permanecer como composición.

Para cada componente se preservan, siempre que exista un equivalente:

- La composición pública y los nombres de sus subcomponentes.
- El primitive accesible de Radix/Base UI utilizado por shadcn/ui.
- La API de composición del primitive vigente: `asChild` cuando shadcn/ui usa Radix/Slot y `render` cuando usa Base UI, sin fallbacks que cambien el elemento renderizado.
- Las propiedades base existentes; las propiedades de Figma se agregan como extensiones o aliases compatibles.
- Los atributos `data-slot`, estados de foco, teclado, disabled y ARIA.

Figma puede modificar tokens, geometría, tipografía, variantes y estados visuales, pero no debe reemplazar el comportamiento accesible del componente base. Las utilidades exclusivas de documentación, como `inline` en Alert Dialog, no representan el modo de producción predeterminado.

Cuando shadcn/ui no ofrece un equivalente —como Attachment— el componente se considera propio del Design System y reutiliza primitivas existentes como Button y Slot.

### Contrato de correspondencia Docs ↔ Playground

La representación de un componente en Docs y Playground debe ser **1:1**. Playground es la instancia canónica de ejecución y Docs debe renderizar esa misma composición pública, importada desde un archivo compartido como `component-example.tsx`.

Esto exige igualdad en:

- Árbol de componentes y contenido visible.
- Variante, tamaño, estado y propiedades.
- Ancho, alto, padding, gap, borde, radio y alineación.
- Familia, tamaño, peso y altura de línea tipográfica.
- Colores, tokens y respuesta al selector de marca.
- Iconos, subnavegación, acciones y comportamiento aplicable al ejemplo.

Docs puede cambiar únicamente el contenedor editorial externo necesario para diagramar cards, tablas o secciones. No puede recrear el componente con HTML paralelo, aplicar estilos internos distintos ni usar valores visuales aproximados. Si se necesita mostrar otra configuración, se reutiliza la misma instancia compartida con argumentos explícitos.

La igualdad debe comprobarse en el navegador mediante estilos computados; que ambas vistas importen el mismo React component o que Storybook compile no constituye evidencia suficiente.

## 2. Fuente de Figma

Archivo principal:

- [Design System GRM v1](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1)
- Nodo de Button: `1:24`
- Nodo de Badge: `186:141`
- Nodo de Accordion: `1771:909`
- Página de Dropdown: `1521:4708` (set principal `1638:5110`)
- Página de Breadcrumb: `1760:597` (set principal `1763:1562`, base `1763:1339`)
- Página de Context Menu: `1675:339` (set principal `1677:397`, base `1703:22653`)
- Página de Empty: `2173:21188` (set principal `2173:21437`, EmptyContent `2173:21211`, EmptyMedia `2173:21262`)
- Página de Spinner: `2206:19380` (set principal `2206:19610`, base animada `2213:25220`)
- Página de Hover Card: `1650:2013` (set principal `1650:2069`, base `1650:2122`)
- Página de Tooltip: `1:30` (set principal `1136:1739`, base `1140:23`)
- Página de Toggle: `3267:2627` (set principal `3279:53814`)
- Página de Toggle Group: `3331:60517` (tipos `single` y `multiple`, de 1 a 10 ítems)
- Página de Button Group: `3355:1262` (orientación, 1 a 10 ítems y último slot compuesto)
- Página de Drawer: `1290:302` (side 384/480 px, bottom full y una/dos acciones)
- Página de Sheet: `1295:386` (set principal `1295:1240`, cuatro posiciones y footer en fila/columna)
- Página de Tabs: `1:33` (TabBase `1812:2936`, Contained `1812:3148`, Underline `1844:6734`)
- Página de Toast: `1:45` (set principal `288:336`, estados success, warning, error, info, brand-neutral y neutral)

Para Drawer, el contrato técnico vigente es la variante Base UI de shadcn/ui. Se usa `@base-ui/react/drawer`, `swipeDirection` (`up`, `right`, `down`, `left`) y composición mediante `render`; no se conserva la API obsoleta de Vaul (`direction`, `asChild`). `DrawerContent` mantiene la composición oficial `Portal → Backdrop → Viewport → Popup → Content` y expone `DrawerPortal`, `DrawerOverlay` y `DrawerSwipeHandle`.

Las capacidades oficiales Nested, Non-modal (`modal={false}` junto con `disablePointerDismissal`) y Snap Points (`snapPoints`, `snapPoint`, `onSnapPointChange`, `snapToSequentialPoints`) deben estar disponibles aunque Figma todavía no las represente. La expresión GRM añade `--drawer-inset: 16px` en la composición de referencia para el comportamiento flotante. Cuando el inset es mayor que cero, `--drawer-bleed-background` debe ser transparente para que el relleno de overshoot de Base UI no una visualmente el panel con el borde de origen; con inset cero conserva `var(--color-popover)`. `--drawer-overlay-min-opacity` permanece configurable. Docs y Playground usan siempre `DrawerExample` para estas variantes.

Antes de modificar un componente se debe inspeccionar en Figma:

1. Nombre del componente y sus variantes.
2. Propiedades específicas de cada tipo.
3. Tamaños y medidas.
4. Tokens vinculados.
5. Estados: normal, hover, active, disabled y loading cuando corresponda.
6. Tipografía y contenido interno.

El código generado por herramientas de Figma se utiliza como referencia técnica. No se copia literalmente: se traduce al componente, los tokens y las convenciones existentes en el proyecto.

Cuando el enlace apunta a una página, se deben inventariar sus hijos y seleccionar el set real del componente. Para Dropdown se contrastaron el set principal, la base del menú, los items y el frame de documentación; no se tomó la página completa como una única capa visual.

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

### Caso Table

El nodo `2530:39991` define los tratamientos de borde `normal` y `rounded`, tablas de 2 a 10 columnas y cuatro configuraciones de columna inicial: `none`, `checkbox`, `switch` y `chevron`. La implementación conserva la estructura semántica de shadcn/ui: Table, Header, Body, Footer, Row, Head, Cell y Caption.

Checkbox y Switch se componen con los componentes públicos del sistema. Chevron controla una región expandida accesible mediante `aria-expanded`; la fila cerrada mide 49 px y la referencia abierta 113 px. La alternancia visual de filas se controla en TableBody y consume `--muted` al 40 %.

El header usa padding de 10 px, texto de 12/16, peso semibold, uppercase, `--muted-foreground` e icono de orden de 12 px. Las celdas usan padding de 10 px y texto de 12/16. Docs y Playground renderizan `TableExample`; no se recrean tablas documentales para representar el componente.

### Caso Empty

El nodo `2173:21188` define contenedor sin borde o outlined, medios icon/avatar/spinner y disposiciones de contenido horizontal, vertical y wrap. La implementación mantiene la API pública oficial de shadcn/ui: Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription y EmptyContent.

`EmptyMedia` conserva únicamente sus variantes oficiales `default` e `icon`. Avatar, spinner, borde y orientación de acciones son composiciones mediante los componentes públicos y `className`; no se añaden variantes artificiales al primitive. Docs y Playground renderizan la misma instancia `EmptyExample` para impedir discrepancias visuales.

### Caso Spinner

El nodo `2206:19380` define una escala pública de 12, 16, 24 y 32 px, con rotación horaria lineal de 800 ms. La implementación conserva el SVG accesible, `role=status`, `aria-label=Loading`, `currentColor` y la personalización mediante `className` del Spinner oficial de shadcn/ui.

`size` es la única extensión de API y existe para representar explícitamente la escala de Figma. Docs y Playground renderizan `SpinnerExample`; la paridad debe comprobar tamaño, color y duración mediante estilos computados.

### Caso Hover Card

El nodo `1650:2069` define triggers compuestos con Button o texto, posiciones `top`, `right`, `bottom` y `left`, y una superficie de 276 × 104 px. La implementación conserva la API oficial de shadcn/ui sobre Radix: HoverCard, HoverCardTrigger, HoverCardContent, Portal, `openDelay`, `closeDelay`, `side`, `align`, colisiones y foco accesible.

Los tipos de trigger no son variantes del primitive: se componen mediante `HoverCardTrigger asChild` y Button o un botón de texto. La superficie usa `--popover`, `--popover-foreground`, `--border`, `--muted-foreground` y `--brand-font-sans`. Docs y Playground renderizan `HoverCardExample`; no recrean el contenido ni el trigger con HTML documental paralelo.

### Caso Tooltip

El nodo `1136:1739` define triggers de contenido o texto, posiciones `top`, `right`, `bottom` y `left`, shortcut opcional y una superficie oscura de 36 px con flecha de 10 × 5 px. La implementación conserva la API oficial de shadcn/ui sobre Radix: TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Portal, Arrow, demora, colisiones, hover y foco accesible.

Button, Icon Button, Badge y texto son composiciones mediante `TooltipTrigger asChild`; el shortcut reutiliza Kbd y KbdGroup. Los colores se exponen como `--tooltip` y `--tooltip-foreground`, y la fuente consume `--brand-font-sans`. Docs y Playground renderizan `TooltipExample` sin reconstrucciones paralelas.

### Caso Popover

El nodo `726:6350` define los estados abierto y cerrado para alineaciones `start`, `center` y `end`, separación de 4 px respecto al trigger y Button outline de 69 × 36 px. La superficie vacía de 384 × 212 px representa el slot disponible en Figma y no debe convertirse en dimensiones fijas del componente. El contenedor conserva el ancho, altura intrínseca, padding, radio, sombra y ring oficiales de shadcn/ui, consumiendo `--popover`, `--popover-foreground` y `--brand-font-sans` para responder a la marca activa.

La implementación conserva la API oficial vigente de shadcn/ui sobre Base UI: Root, Trigger, Portal, Positioner, Popup, Header, Title y Description, junto con estado controlado/no controlado, foco, teclado, dismiss y posicionamiento con colisiones. La superficie vacía de Figma no se implementa como variante: los ejemplos `basic` y `form` son composiciones reales mediante `children` y no amplían el primitive. Docs y el único Playground renderizan exclusivamente `PopoverExample` para garantizar correspondencia 1:1.

### Caso Toggle

El nodo `3279:53814` define variantes `default` y `outline`, tamaños `sm` (32 px), `default` (36 px) y `lg` (40 px), estados pressed/off, hover, focus y disabled, icono de 16 px, gap de 8 px y texto 14/20 Medium. La implementación conserva el primitive oficial de shadcn/ui sobre Radix, `aria-pressed`, estado controlado y no controlado, teclado, `variant`, `size`, `disabled` y composición mediante `children`.

Icono, texto o ambos son composiciones y no propiedades añadidas al primitive. Toggle Group se mantiene como componente independiente porque shadcn/ui le asigna otra API; no se mezclan sus controles con Toggle. Docs y Playground renderizan `ToggleExample` y consumen los mismos estados y tokens por marca.

### Caso Toggle Group

El nodo `3331:60517` define selección `single` y `multiple`, composiciones de 1 a 10 ítems, botones de 36 px y separación de 8 px. La implementación conserva el contrato oficial de shadcn/ui sobre Radix: `ToggleGroup`, `ToggleGroupItem`, `type`, valores controlados o no controlados, `variant`, `size`, `spacing`, `orientation`, disabled y navegación por teclado.

La cantidad de ítems y su contenido pertenecen a la composición del ejemplo y no se añaden como propiedades del primitive. `ToggleGroupItem` reutiliza `toggleVariants` y acepta `children` igual que Toggle: icono, texto o ambos; por ello tamaños, tipografía, estados y tokens permanecen alineados. Docs y Playground renderizan `ToggleGroupExample`; los controles de selección única y múltiple se muestran de forma condicional para no mezclar propiedades incompatibles.

### Caso Button Group

El nodo `3355:1262` define orientación horizontal y vertical, de 1 a 10 elementos y último slot `Button`, `Icon Button`, `Dropdown` o `Popover`. Todos los controles usan Button `variant=outline`, tamaño `default` de 32 px y radio exterior de 6 px dependiente de la posición. Un argumento nunca debe limitarse silenciosamente: la cantidad elegida en Playground debe coincidir con la cantidad renderizada en ambas orientaciones.

La implementación conserva la composición oficial de shadcn/ui: `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`, `role=group` y navegación mediante Tab. El grupo no duplica Button ni transforma acciones en toggles; sus hijos son instancias públicas reales de Button, Dropdown Menu y Popover. El contenido y tamaño se configuran en cada Button, mientras orientación es la única variante del contenedor. Todas las muestras, incluidas Separator y Text, se configuran mediante `ButtonGroupExample` tanto en Docs como en el único Playground.

El ancho fijo de 69 px corresponde exclusivamente a la variante textual documentada en la matriz de Figma. Las composiciones con icono y texto deben conservar el ancho intrínseco de Button para respetar icono de 16 px, gap de 12 px, padding horizontal de 12 px y texto sin recorte.

### Caso Drawer

El nodo `1290:302` define la ruta lateral en 384 y 480 px, la ruta bottom full-width de hasta 680 px, radio de 24 px, header/body/footer con padding de 16 px y barras de una o dos acciones. El swipe handle de 100 × 6 px pertenece a la variante bottom.

La implementación conserva el Drawer oficial vigente de shadcn/ui sobre Base UI: Root, Trigger, Portal, Backdrop, Viewport, Popup, Content, Close, SwipeHandle, Header, Footer, Title y Description. Mantiene `swipeDirection`, gesto swipe, dismiss, foco, estado controlado/no controlado, nesting, modo no modal y snap points. `showSwipeHandle` pertenece al wrapper oficial de shadcn/ui. El body desplazable usa `flex-1 overflow-y-auto` para mantener acciones visibles. Docs y Playground renderizan exclusivamente `DrawerExample`; Docs muestra triggers reales y nunca recrea una superficie estática paralela.

### Caso Sheet

El nodo `1295:386` define Sheet en `left`, `right`, `top` y `bottom`; las rutas laterales ocupan el alto del viewport y aceptan 384 o 480 px, mientras las verticales ocupan el ancho y alcanzan 512 px. Header, body y footer usan padding de 16 px; el footer alterna columna de 106 px y fila de 64 px, ambos con gap de 10 px. El cierre mide 28 px y se separa 12 px de top/right.

La implementación conserva el Sheet oficial de shadcn/ui sobre Dialog de Radix: Root, Trigger, Portal, Overlay, Content, Close, Header, Footer, Title y Description, junto con foco, teclado, dismiss, estado controlado/no controlado y animaciones por lado. Los anchos, contenido desplazable y alineación de acciones pertenecen a `SheetExample`, no amplían el primitive. `showCloseButton` y `side` mantienen la API pública oficial. Docs y Playground renderizan exclusivamente `SheetExample`.

### Caso Tabs

El nodo `1:33` define los estilos Contained y Underline, triggers de 25 px dentro de listas de 32 px, padding de 3 px en la lista, padding `3px 7px` y gap de 6 px en cada trigger, radio 10/8 px, iconos de 16 px y texto 14/20 Medium. Las matrices admiten de 2 a 9 tabs y cualquier tab válida como activa.

La implementación conserva la API oficial de shadcn/ui sobre Radix: `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `orientation`, estado controlado/no controlado, navegación por teclado, disabled e iconos mediante `children`. Contained se expresa con `variant="default"` y Underline con `variant="line"`; los nombres de Figma no generan aliases. `tabAmount`, `activeTab`, posición de iconos y visibilidad del panel pertenecen únicamente a `TabsExample`. Docs y Playground renderizan esa misma composición compartida.

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

La corrección debe realizarse en la capa responsable. Cuando Storybook Docs sobrescriba una propiedad pública del componente, se protege esa propiedad en el componente compartido; no se maquilla únicamente la muestra de Docs. Después del ajuste se vuelven a medir ambas vistas hasta obtener los mismos valores.

## 12. Checklist para nuevos componentes

- [ ] Leer el nodo específico en Figma.
- [ ] Identificar variantes, tamaños, estados y propiedades.
- [ ] Mapear colores a tokens semánticos.
- [ ] Mapear medidas a TailwindCSS o variables.
- [ ] Instalar el componente base desde shadcn/ui.
- [ ] Revisar la documentación oficial vigente y preservar primero la API, composición, comportamiento y accesibilidad de shadcn/ui.
- [ ] Adaptar el componente sin romper su API base ni inventar propiedades que puedan resolverse por composición.
- [ ] Separar stories cuando existan APIs diferentes.
- [ ] Mantener un único Playground por tipo de componente.
- [ ] Crear documentación MDX depurada.
- [ ] Revisar jerarquía tipográfica, ritmo vertical, radios, tablas y separación entre secciones contra el patrón de Button.
- [ ] Mostrar variantes y especificaciones de manera visual.
- [ ] Importar el código real con `?raw`.
- [ ] Probar el selector de las cuatro marcas.
- [ ] Verificar colores, fuentes, estados y accesibilidad.
- [ ] Confirmar que las muestras de Docs renderizan el componente público.
- [ ] Confirmar que Docs reutiliza la misma instancia compartida del Playground, sin una reconstrucción visual paralela.
- [ ] Comparar estilos computados entre Playground y Docs y exigir correspondencia 1:1.
- [ ] Verificar que Storybook Docs no sobrescribe tipografía o geometría.
- [ ] Comprobar si los bordes de Figma son interiores antes de usar `border`.
- [ ] Evitar combinaciones de variantes que no existan en Figma.
- [ ] Ejecutar lint, typecheck, pruebas y build de Storybook.
- [ ] Crear el changeset correspondiente.

## Principio final

shadcn/ui define primero el contrato técnico, la composición y el comportamiento accesible. Figma define la intención visual y los valores del sistema sobre esa base. Los tokens CSS hacen posible el cambio de marca. Playground ejecuta la instancia canónica y Docs debe representarla 1:1. Ninguna capa debe duplicar, reconstruir o inventar información que pueda obtener de la capa anterior.
