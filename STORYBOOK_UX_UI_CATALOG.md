---
title: "Catálogo UX/UI del Storybook GRM"
designSystem: "Design System GRM"
version: "1.0.0"
catalogSchemaVersion: 1
status: "current"
canonicalRendering: "Playground"
generatedFrom: "Storybook source"
---

# Catálogo UX/UI del Storybook GRM

> Snapshot exhaustivo de **Design System GRM v1.0.0**. Este archivo está orientado a diseñadores UX/UI y agentes de IA que necesiten construir wireframes fieles al Storybook sin recorrer todo el repositorio.
> **Archivo generado:** no editar manualmente. Actualizar las fuentes canónicas y ejecutar `npm run catalog:generate`.

## Estado y alcance de esta versión

| Campo | Valor |
| --- | --- |
| Versión del Design System | `1.0.0` |
| Componentes documentados | 50 |
| Marcas | GRM Global, Reina Madre, María Linda, Piel Sana |
| Base técnica | shadcn/ui; Radix UI o Base UI según el componente oficial vigente |
| Fuente visual canónica | Playground de Storybook |
| Fuente de tokens y geometría | Figma Design System GRM v1 |
| Distribución | Storybook + shadcn Registry; paquete npm no publicado |

Este documento describe **todo lo disponible en v1**. No convierte ejemplos editoriales en nuevas APIs y no sustituye los primitives públicos. Cuando una pantalla necesite algo que no aparezca aquí, se registra como gap en lugar de inventarlo.

## Cómo usar este catálogo sin cargarlo completo

1. Identificar la marca y el objetivo de la pantalla.
2. Consultar el índice y abrir únicamente las secciones `Componente: ...` necesarias.
3. Usar la tabla de controles de Playground para combinaciones válidas.
4. Usar las tablas documentales para tamaños, tokens, spacing, estados y composiciones.
5. Usar el código del primitive solo cuando se necesite implementar; el diseñador puede trabajar con los nombres públicos.
6. Mantener en una misma composición las instancias compartidas por Docs y Playground.
7. Reportar cualquier propiedad o variante no listada como gap.

### Orden de autoridad

1. **shadcn/ui:** primitive, API, comportamiento, accesibilidad y composición técnica.
2. **Figma GRM:** tokens, tipografía, geometría, estados visuales y composiciones aprobadas.
3. **Playground:** instancia renderizada canónica y controles válidos.
4. **Docs:** explicación y tablas; nunca una implementación paralela.
5. **Este catálogo:** índice versionado y consolidado de las cuatro capas anteriores.

### Reglas innegociables para wireframes

- No inventar props, subcomponentes, estados ni variantes.
- No recrear con HTML un componente público existente.
- No aplicar `!important`, colores hardcodeados o un sistema CSS paralelo.
- Usar Tailwind CSS y variables semánticas GRM.
- Aplicar la marca con `data-theme`.
- Mantener accesibilidad, teclado, foco, disabled y ARIA heredados de shadcn/ui.
- Considerar los archivos `*-example.tsx` como composiciones canónicas, no como primitives nuevos.
- Mantener lógica, rutas, permisos y datos de negocio fuera del Design System.

## Fuentes canónicas y acceso

| Fuente | Uso | URL o ruta |
| --- | --- | --- |
| Storybook visual | Docs, Playground y selector de marca | https://ds-grm-documentation.vercel.app/ |
| Storybook MCP | Descubrimiento y documentación estructurada | https://6aa378ea63d7e5f79e6c2845-ctflbyijzl.chromatic.com/mcp |
| Figma | Variables, geometría y componentes | https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1 |
| GitHub | Código y versionamiento | https://github.com/maadesignlab/ds-grm-documentation |
| Registry | Código instalable por shadcn | https://ds-grm-documentation.vercel.app/r/{name}.json |
| Manifiesto IA | Mapa máquina-componente | https://ds-grm-documentation.vercel.app/r/ai-manifest.json |
| Contrato | Reglas completas del proceso | DESIGN_SYSTEM_WORKFLOW.md |

## Marcas y tematización

El selector global modifica `data-theme` en el elemento raíz. Todos los componentes deben reaccionar a la marca sin reconstruirse ni recibir colores directos.

| Selector | Marca | Fuente sans | Fuente mono |
| --- | --- | --- | --- |
| grm-global | GRM Global | Inter Variable | JetBrains Mono Variable |
| reina-madre | Reina Madre | Inter Variable | JetBrains Mono Variable |
| maria-linda | María Linda | Plus Jakarta Sans Variable | JetBrains Mono Variable |
| piel-sana | Piel Sana | Kantumruy Pro Variable | JetBrains Mono Variable |

## Foundations: Semantic Brand

Las siguientes tablas contienen todos los valores exportados desde Figma para cada modo. El nombre de variable es estable; cambia el valor según la marca.

### GRM Global — `grm-global`

| Variable | Valor |
| --- | --- |
| `--background` | `#f8f7f9` |
| `--background/10` | `oklch(0.9775 0.0028 308.43 / 20%)` |
| `--background-hover` | `#f5f3ef` |
| `--background-active` | `#f5f3ef` |
| `--foreground` | `#342f32` |
| `--foreground/60` | `oklch(0.3116 0.0088 340.87 / 60%)` |
| `--card` | `#ffffff` |
| `--card/1` | `oklch(1 0 89.88 / 1%)` |
| `--popover` | `#f7f6f8` |
| `--primary` | `#008979` |
| `--primary-hover` | `#007b6d` |
| `--primary-active` | `#006459` |
| `--secondary` | `#ddf9ee` |
| `--secondary-hover` | `#45d6a1` |
| `--secondary-active` | `#24b783` |
| `--muted` | `#ece8ea` |
| `--accent` | `#ddd8e3` |
| `--success` | `#4ccb6a` |
| `--success-hover` | `#32ad52` |
| `--success-active` | `#288a43` |
| `--warning` | `#f6c453` |
| `--error` | `#ea6e5c` |
| `--destructive` | `#ff3759` |
| `--info` | `#6577e8` |
| `--border` | `#dad4d7` |
| `--input` | `#bbb3b7` |
| `--ring` | `#008979` |
| `--sidebar` | `#ffffff` |
| `--card-foreground` | `#484145` |
| `--popover-foreground` | `#342f32` |
| `--primary-foreground` | `#ffffff` |
| `--primary-default-foreground` | `#008979` |
| `--primary-default-border` | `#008979` |
| `--primary-light-border` | `#94ded4` |
| `--primary/5` | `oklch(0.5649 0.1019 180.8 / 5%)` |
| `--primary/10` | `oklch(0.5649 0.1019 180.8 / 10%)` |
| `--primary/15` | `oklch(0.5649 0.1019 180.8 / 15%)` |
| `--primary/20` | `oklch(0.5649 0.1019 180.8 / 20%)` |
| `--secondary-foreground` | `#166f54` |
| `--secondary-default-border` | `#7cedc1` |
| `--secondary/10` | `oklch(0.8672 0.1221 166.06 / 10%)` |
| `--secondary/40` | `oklch(0.8672 0.1221 166.06 / 40%)` |
| `--muted-foreground` | `#9b9196` |
| `--muted/5` | `oklch(0.9347 0.0051 345.29 / 5%)` |
| `--muted/40` | `oklch(0.9347 0.0051 345.29 / 40%)` |
| `--muted/50` | `oklch(0.9347 0.0051 345.29 / 50%)` |
| `--accent-foreground` | `#484145` |
| `--accent/50` | `oklch(0.8894 0.0158 306.39 / 50%)` |
| `--success-foreground` | `#ffffff` |
| `--success-default-border` | `#4ccb6a` |
| `--success-light` | `#f0fcf3` |
| `--success-light-hover` | `#dcf8e3` |
| `--success-light-active` | `#baf0c8` |
| `--success-light-border` | `#baf0c8` |
| `--success-light-foreground` | `#288a43` |
| `--warning-foreground` | `#342f32` |
| `--warning-default-border` | `#f6c453` |
| `--warning-light` | `#fffbef` |
| `--warning-light-hover` | `#fff4d5` |
| `--warning-light-active` | `#ffe8a8` |
| `--warning-light-border` | `#ffe8a8` |
| `--warning-light-foreground` | `#b57822` |
| `--error-foreground` | `#ffffff` |
| `--error-default-foreground` | `#ea6e5c` |
| `--error-default-border` | `#ea6e5c` |
| `--error-light` | `#fff5f3` |
| `--error-light-hover` | `#ffe6e2` |
| `--error-light-active` | `#ffcfc8` |
| `--error-light-border` | `#ffcfc8` |
| `--error-light-foreground` | `#aa392f` |
| `--destructive-foreground` | `#ffffff` |
| `--destructive-default-foreground` | `#ff3759` |
| `--error/20` | `oklch(0.6828 0.1573 30.09 / 20%)` |
| `--destructive-light` | `#ffeeee` |
| `--destructive-light-hover` | `#fed9d9` |
| `--destructive-light-active` | `#fdbebf` |
| `--destructive-light-border` | `#fdbebf` |
| `--destructive-light-foreground` | `#e31646` |
| `--destructive/10` | `oklch(0.6566 0.2317 17.86 / 10%)` |
| `--destructive/20` | `oklch(0.6566 0.2317 17.86 / 20%)` |
| `--destructive/30` | `oklch(0.6566 0.2317 17.86 / 30%)` |
| `--info-foreground` | `#ffffff` |
| `--appointment-scheduled-light` | `#ececef` |
| `--appointment-scheduled-light-border` | `#ccced6` |
| `--appointment-scheduled-default` | `#6a6f86` |
| `--appointment-scheduled-foreground` | `#56596c` |
| `--appointment-confirmed-light` | `#e6eef8` |
| `--appointment-confirmed-light-border` | `#bed1ed` |
| `--appointment-confirmed-default` | `#3f79c9` |
| `--appointment-confirmed-foreground` | `#36619e` |
| `--appointment-reception-light` | `#fcf6de` |
| `--appointment-reception-light-border` | `#f7e7a8` |
| `--appointment-reception-default` | `#e6b800` |
| `--appointment-reception-foreground` | `#b18f09` |
| `--appointment-vitals-light` | `#fbeaf0` |
| `--appointment-vitals-light-border` | `#f4c7d7` |
| `--appointment-vitals-default` | `#e05a8a` |
| `--appointment-vitals-foreground` | `#ad4a6f` |
| `--appointment-consultation-light` | `#fbf1e3` |
| `--appointment-consultation-light-border` | `#f4dab7` |
| `--appointment-consultation-default` | `#e0912a` |
| `--appointment-consultation-foreground` | `#ad7328` |
| `--appointment-completed-light` | `#e4f2ec` |
| `--appointment-completed-light-border` | `#b8decc` |
| `--appointment-completed-default` | `#2f9e6a` |
| `--appointment-completed-foreground` | `#2a7c57` |
| `--appointment-no-show-light` | `#fae8e8` |
| `--appointment-no-show-light-border` | `#f1c3c3` |
| `--appointment-no-show-default` | `#d64f4f` |
| `--appointment-no-show-foreground` | `#a64243` |
| `--appointment-cancelled-light` | `#fdf4f0` |
| `--appointment-cancelled-light-border` | `#fae2d7` |
| `--appointment-cancelled-default` | `#f0a988` |
| `--appointment-cancelled-foreground` | `#b9846d` |
| `--appointment-rescheduled-light` | `#f2eef9` |
| `--appointment-rescheduled-light-border` | `#ddd3f0` |
| `--appointment-rescheduled-default` | `#9b7fd4` |
| `--appointment-rescheduled-foreground` | `#7a65a6` |
| `--ring/15` | `oklch(0.7638 0.1576 52.1 / 15%)` |
| `--ring/50` | `oklch(0.7638 0.1576 52.1 / 50%)` |
| `--input/50` | `oklch(0.7745 0.0106 345.5 / 50%)` |
| `--info-light` | `#f5f6ff` |
| `--info-light-hover` | `#e9ebff` |
| `--info-light-active` | `#d4d9ff` |
| `--info-light-border` | `#d4d9ff` |
| `--info-light-foreground` | `#4d5fd1` |
| `--chart-1` | `#008979` |
| `--chart-2` | `#7cedc1` |
| `--sidebar-primary` | `#008979` |
| `--chart-3` | `#887a99` |
| `--chart-4` | `#4ccb6a` |
| `--chart-5` | `#f6c453` |
| `--sidebar-foreground` | `#342f32` |
| `--sidebar-accent` | `#e8f8f5` |
| `--sidebar-border` | `#bbb3b7` |
| `--sidebar-ring` | `#2aae9f` |
| `--sidebar-primary-foreground` | `#ffffff` |
| `--sidebar-accent-foreground` | `#342f32` |
| `--table-row-alternate` | `#fcfbfa` |
| `--warning-hover` | `#d99e2e` |
| `--warning-active` | `#b57822` |
| `--error-hover` | `#ce4d3e` |
| `--error-active` | `#aa392f` |
| `--destructive-hover` | `#e31646` |
| `--destructive-active` | `#bb1138` |
| `--info-hover` | `#4d5fd1` |
| `--info-active` | `#3f4daa` |
| `--brand-font-sans` | `Inter Variable` |
| `--brand-font-mono` | `JetBrains Mono Variable` |
| `--font-weight-medium` | `500` |

### Reina Madre — `reina-madre`

| Variable | Valor |
| --- | --- |
| `--background` | `#f4f4fb` |
| `--background/10` | `oklch(0.9691 0.0093 286.22 / 20%)` |
| `--background-hover` | `#8a8fb6` |
| `--background-active` | `#565386` |
| `--foreground` | `#373644` |
| `--foreground/60` | `oklch(0.3396 0.0244 288.3 / 60%)` |
| `--card` | `#ffffff` |
| `--card/1` | `oklch(1 0 89.88 / 1%)` |
| `--popover` | `#fcfcff` |
| `--primary` | `#ed80a8` |
| `--primary-hover` | `#d8618e` |
| `--primary-active` | `#b84772` |
| `--secondary` | `#f1e8f7` |
| `--secondary-hover` | `#8c48a7` |
| `--secondary-active` | `#74388a` |
| `--muted` | `#f0f1fa` |
| `--accent` | `#d9d8f5` |
| `--success` | `#afd393` |
| `--success-hover` | `#93b478` |
| `--success-active` | `#77915f` |
| `--warning` | `#fac186` |
| `--error` | `#ef4444` |
| `--destructive` | `#ff3759` |
| `--info` | `#0ea5e9` |
| `--border` | `#d6d9f3` |
| `--input` | `#d6d9f3` |
| `--ring` | `#ed80a8` |
| `--sidebar` | `#ffffff` |
| `--card-foreground` | `#444b54` |
| `--popover-foreground` | `#373644` |
| `--primary-foreground` | `#ffffff` |
| `--primary-default-foreground` | `#ed80a8` |
| `--primary-default-border` | `#ed80a8` |
| `--primary-light-border` | `#ed80a8` |
| `--primary/5` | `oklch(0.7313 0.1402 357.8 / 5%)` |
| `--primary/10` | `oklch(0.7313 0.1402 357.8 / 10%)` |
| `--primary/15` | `oklch(0.7313 0.1402 357.8 / 15%)` |
| `--primary/20` | `oklch(0.7313 0.1402 357.8 / 20%)` |
| `--secondary-foreground` | `#a25cbf` |
| `--secondary-default-border` | `#a25cbf` |
| `--secondary/10` | `oklch(0.5948 0.1605 315.16 / 10%)` |
| `--secondary/40` | `oklch(0.5948 0.1605 315.16 / 40%)` |
| `--muted-foreground` | `#8a8fb6` |
| `--muted/5` | `oklch(0.96 0.0121 281.08 / 40%)` |
| `--muted/40` | `oklch(0.96 0.0121 281.08 / 40%)` |
| `--muted/50` | `oklch(0.96 0.0121 281.08 / 50%)` |
| `--accent-foreground` | `#444b54` |
| `--accent/50` | `oklch(0.892 0.0396 287.15 / 50%)` |
| `--success-foreground` | `#373644` |
| `--success-default-border` | `#afd393` |
| `--success-light` | `#f8fcf4` |
| `--success-light-hover` | `#f0f8e8` |
| `--success-light-active` | `#e0f0d1` |
| `--success-light-border` | `#e0f0d1` |
| `--success-light-foreground` | `#77915f` |
| `--warning-foreground` | `#373644` |
| `--warning-default-border` | `#fac186` |
| `--warning-light` | `#fff9f2` |
| `--warning-light-hover` | `#fff1e3` |
| `--warning-light-active` | `#ffe2c2` |
| `--warning-light-border` | `#ffe2c2` |
| `--warning-light-foreground` | `#b3854f` |
| `--error-foreground` | `#ffffff` |
| `--error-default-foreground` | `#ffffff` |
| `--error-default-border` | `#ef4444` |
| `--error-light` | `#fef2f2` |
| `--error-light-hover` | `#fee2e2` |
| `--error-light-active` | `#fecaca` |
| `--error-light-border` | `#fecaca` |
| `--error-light-foreground` | `#b91c1c` |
| `--destructive-foreground` | `#ffffff` |
| `--destructive-default-foreground` | `#ff3759` |
| `--error/20` | `oklch(0.6368 0.2078 25.33 / 20%)` |
| `--destructive-light` | `#fff4f6` |
| `--destructive-light-hover` | `#ffe7ec` |
| `--destructive-light-active` | `#ffcdd7` |
| `--destructive-light-border` | `#ffcdd7` |
| `--destructive-light-foreground` | `#bf1636` |
| `--destructive/10` | `oklch(0.6566 0.2317 17.86 / 10%)` |
| `--destructive/20` | `oklch(0.6566 0.2317 17.86 / 20%)` |
| `--destructive/30` | `oklch(0.6566 0.2317 17.86 / 30%)` |
| `--info-foreground` | `#ffffff` |
| `--appointment-scheduled-light` | `#ececef` |
| `--appointment-scheduled-light-border` | `#ccced6` |
| `--appointment-scheduled-default` | `#6a6f86` |
| `--appointment-scheduled-foreground` | `#56596c` |
| `--appointment-confirmed-light` | `#e6eef8` |
| `--appointment-confirmed-light-border` | `#bed1ed` |
| `--appointment-confirmed-default` | `#3f79c9` |
| `--appointment-confirmed-foreground` | `#36619e` |
| `--appointment-reception-light` | `#fcf6de` |
| `--appointment-reception-light-border` | `#f7e7a8` |
| `--appointment-reception-default` | `#e6b800` |
| `--appointment-reception-foreground` | `#b18f09` |
| `--appointment-vitals-light` | `#fbeaf0` |
| `--appointment-vitals-light-border` | `#f4c7d7` |
| `--appointment-vitals-default` | `#e05a8a` |
| `--appointment-vitals-foreground` | `#ad4a6f` |
| `--appointment-consultation-light` | `#fbf1e3` |
| `--appointment-consultation-light-border` | `#f4dab7` |
| `--appointment-consultation-default` | `#e0912a` |
| `--appointment-consultation-foreground` | `#ad7328` |
| `--appointment-completed-light` | `#e4f2ec` |
| `--appointment-completed-light-border` | `#b8decc` |
| `--appointment-completed-default` | `#2f9e6a` |
| `--appointment-completed-foreground` | `#2a7c57` |
| `--appointment-no-show-light` | `#fae8e8` |
| `--appointment-no-show-light-border` | `#f1c3c3` |
| `--appointment-no-show-default` | `#d64f4f` |
| `--appointment-no-show-foreground` | `#a64243` |
| `--appointment-cancelled-light` | `#fdf4f0` |
| `--appointment-cancelled-light-border` | `#fae2d7` |
| `--appointment-cancelled-default` | `#f0a988` |
| `--appointment-cancelled-foreground` | `#b9846d` |
| `--appointment-rescheduled-light` | `#f2eef9` |
| `--appointment-rescheduled-light-border` | `#ddd3f0` |
| `--appointment-rescheduled-default` | `#9b7fd4` |
| `--appointment-rescheduled-foreground` | `#7a65a6` |
| `--ring/15` | `oklch(0.7313 0.1402 357.8 / 15%)` |
| `--ring/50` | `oklch(0.7313 0.1402 357.8 / 50%)` |
| `--input/50` | `oklch(0.891 0.0357 280.42 / 50%)` |
| `--info-light` | `#f0f9ff` |
| `--info-light-hover` | `#e0f2fe` |
| `--info-light-active` | `#bae6fd` |
| `--info-light-border` | `#bae6fd` |
| `--info-light-foreground` | `#0369a1` |
| `--chart-1` | `#ed80a8` |
| `--chart-2` | `#a25cbf` |
| `--sidebar-primary` | `#ed80a8` |
| `--chart-3` | `#d9d8f5` |
| `--chart-4` | `#afd393` |
| `--chart-5` | `#fac186` |
| `--sidebar-foreground` | `#373644` |
| `--sidebar-accent` | `#fff3f8` |
| `--sidebar-border` | `#d6d9f3` |
| `--sidebar-ring` | `#ed80a8` |
| `--sidebar-primary-foreground` | `#ffffff` |
| `--sidebar-accent-foreground` | `#373644` |
| `--table-row-alternate` | `#fcfcfe` |
| `--warning-hover` | `#d6a36a` |
| `--warning-active` | `#b3854f` |
| `--error-hover` | `#dc2626` |
| `--error-active` | `#b91c1c` |
| `--destructive-hover` | `#e61e42` |
| `--destructive-active` | `#bf1636` |
| `--info-hover` | `#0284c7` |
| `--info-active` | `#0369a1` |
| `--brand-font-sans` | `Inter Variable` |
| `--brand-font-mono` | `JetBrains Mono Variable` |
| `--font-weight-medium` | `500` |

### María Linda — `maria-linda`

| Variable | Valor |
| --- | --- |
| `--background` | `#f0f1f1` |
| `--background/10` | `oklch(0.9574 0.0011 197.14 / 20%)` |
| `--background-hover` | `#f0f1f1` |
| `--background-active` | `#f0f1f1` |
| `--foreground` | `#494949` |
| `--foreground/60` | `oklch(0.4054 0 89.88 / 60%)` |
| `--card` | `#ffffff` |
| `--card/1` | `oklch(1 0 89.88 / 1%)` |
| `--popover` | `#fbfaf6` |
| `--primary` | `#7bc6bb` |
| `--primary-hover` | `#63b1a5` |
| `--primary-active` | `#63b1a5` |
| `--secondary` | `#f2f9f7` |
| `--secondary-hover` | `#a8c9c3` |
| `--secondary-active` | `#a8c9c3` |
| `--muted` | `#dcddde` |
| `--accent` | `#ccc7b2` |
| `--success` | `#32ac70` |
| `--success-hover` | `#14945c` |
| `--success-active` | `#12784a` |
| `--warning` | `#e2a11d` |
| `--error` | `#de4655` |
| `--destructive` | `#ca1f50` |
| `--info` | `#397dd0` |
| `--border` | `#bfbfbf` |
| `--input` | `#909294` |
| `--ring` | `#7bc6bb` |
| `--sidebar` | `#ffffff` |
| `--card-foreground` | `#56585a` |
| `--popover-foreground` | `#494949` |
| `--primary-foreground` | `#ffffff` |
| `--primary-default-foreground` | `#7bc6bb` |
| `--primary-default-border` | `#7bc6bb` |
| `--primary-light-border` | `#7bc6bb` |
| `--primary/5` | `oklch(0.7744 0.0767 184.01 / 5%)` |
| `--primary/10` | `oklch(0.7744 0.0767 184.01 / 10%)` |
| `--primary/15` | `oklch(0.7744 0.0767 184.01 / 15%)` |
| `--primary/20` | `oklch(0.7744 0.0767 184.01 / 20%)` |
| `--secondary-foreground` | `#697d7a` |
| `--secondary-default-border` | `#c7e5e0` |
| `--secondary/10` | `oklch(0.8987 0.0323 184.49 / 10%)` |
| `--secondary/40` | `oklch(0.8987 0.0323 184.49 / 40%)` |
| `--muted-foreground` | `#7b7d7e` |
| `--muted/5` | `oklch(0.8971 0.0017 247.84 / 40%)` |
| `--muted/40` | `oklch(0.8971 0.0017 247.84 / 40%)` |
| `--muted/50` | `oklch(0.8971 0.0017 247.84 / 50%)` |
| `--accent-foreground` | `#56585a` |
| `--accent/50` | `oklch(0.828 0.0291 95.95 / 50%)` |
| `--success-foreground` | `#ffffff` |
| `--success-default-border` | `#32ac70` |
| `--success-light` | `#eaf8ef` |
| `--success-light-hover` | `#ceeed9` |
| `--success-light-active` | `#a7e2be` |
| `--success-light-border` | `#a7e2be` |
| `--success-light-foreground` | `#12784a` |
| `--warning-foreground` | `#ffffff` |
| `--warning-default-border` | `#e2a11d` |
| `--warning-light` | `#fdf4e6` |
| `--warning-light-hover` | `#fde8c7` |
| `--warning-light-active` | `#fcd79d` |
| `--warning-light-border` | `#fcd79d` |
| `--warning-light-foreground` | `#9c6c01` |
| `--error-foreground` | `#ffffff` |
| `--error-default-foreground` | `#ffffff` |
| `--error-default-border` | `#de4655` |
| `--error-light` | `#feeeee` |
| `--error-light-hover` | `#fed7d6` |
| `--error-light-active` | `#ffb6b6` |
| `--error-light-border` | `#ffb6b6` |
| `--error-light-foreground` | `#aa1330` |
| `--destructive-foreground` | `#ffffff` |
| `--destructive-default-foreground` | `#ca1f50` |
| `--error/20` | `oklch(0.6135 0.1877 19.18 / 20%)` |
| `--destructive-light` | `#feecee` |
| `--destructive-light-hover` | `#fed0d4` |
| `--destructive-light-active` | `#fea8b2` |
| `--destructive-light-border` | `#fea8b2` |
| `--destructive-light-foreground` | `#950a37` |
| `--destructive/10` | `oklch(0.5466 0.2021 12.13 / 10%)` |
| `--destructive/20` | `oklch(0.5466 0.2021 12.13 / 20%)` |
| `--destructive/30` | `oklch(0.5466 0.2021 12.13 / 30%)` |
| `--info-foreground` | `#ffffff` |
| `--appointment-scheduled-light` | `#ececef` |
| `--appointment-scheduled-light-border` | `#ccced6` |
| `--appointment-scheduled-default` | `#6a6f86` |
| `--appointment-scheduled-foreground` | `#56596c` |
| `--appointment-confirmed-light` | `#e6eef8` |
| `--appointment-confirmed-light-border` | `#bed1ed` |
| `--appointment-confirmed-default` | `#3f79c9` |
| `--appointment-confirmed-foreground` | `#36619e` |
| `--appointment-reception-light` | `#fcf6de` |
| `--appointment-reception-light-border` | `#f7e7a8` |
| `--appointment-reception-default` | `#e6b800` |
| `--appointment-reception-foreground` | `#b18f09` |
| `--appointment-vitals-light` | `#fbeaf0` |
| `--appointment-vitals-light-border` | `#f4c7d7` |
| `--appointment-vitals-default` | `#e05a8a` |
| `--appointment-vitals-foreground` | `#ad4a6f` |
| `--appointment-consultation-light` | `#fbf1e3` |
| `--appointment-consultation-light-border` | `#f4dab7` |
| `--appointment-consultation-default` | `#e0912a` |
| `--appointment-consultation-foreground` | `#ad7328` |
| `--appointment-completed-light` | `#e4f2ec` |
| `--appointment-completed-light-border` | `#b8decc` |
| `--appointment-completed-default` | `#2f9e6a` |
| `--appointment-completed-foreground` | `#2a7c57` |
| `--appointment-no-show-light` | `#fae8e8` |
| `--appointment-no-show-light-border` | `#f1c3c3` |
| `--appointment-no-show-default` | `#d64f4f` |
| `--appointment-no-show-foreground` | `#a64243` |
| `--appointment-cancelled-light` | `#fdf4f0` |
| `--appointment-cancelled-light-border` | `#fae2d7` |
| `--appointment-cancelled-default` | `#f0a988` |
| `--appointment-cancelled-foreground` | `#b9846d` |
| `--appointment-rescheduled-light` | `#f2eef9` |
| `--appointment-rescheduled-light-border` | `#ddd3f0` |
| `--appointment-rescheduled-default` | `#9b7fd4` |
| `--appointment-rescheduled-foreground` | `#7a65a6` |
| `--ring/15` | `oklch(0.7744 0.0767 184.01 / 15%)` |
| `--ring/50` | `oklch(0.7744 0.0767 184.01 / 50%)` |
| `--input/50` | `oklch(0.6589 0.0038 247.88 / 50%)` |
| `--info-light` | `#eaf3ff` |
| `--info-light-hover` | `#cce2ff` |
| `--info-light-active` | `#a5ccfd` |
| `--info-light-border` | `#a5ccfd` |
| `--info-light-foreground` | `#1156a2` |
| `--chart-1` | `#7bc6bb` |
| `--chart-2` | `#c7e5e0` |
| `--sidebar-primary` | `#7bc6bb` |
| `--chart-3` | `#ccc7b2` |
| `--chart-4` | `#32ac70` |
| `--chart-5` | `#e2a11d` |
| `--sidebar-foreground` | `#494949` |
| `--sidebar-accent` | `#f5fbfa` |
| `--sidebar-border` | `#a6a8a9` |
| `--sidebar-ring` | `#7bc6bb` |
| `--sidebar-primary-foreground` | `#ffffff` |
| `--sidebar-accent-foreground` | `#494949` |
| `--table-row-alternate` | `#fbfbfb` |
| `--warning-hover` | `#c18700` |
| `--warning-active` | `#9c6c01` |
| `--error-hover` | `#c82b41` |
| `--error-active` | `#aa1330` |
| `--destructive-hover` | `#b40242` |
| `--destructive-active` | `#950a37` |
| `--info-hover` | `#236abd` |
| `--info-active` | `#1156a2` |
| `--brand-font-sans` | `Plus Jakarta Sans Variable` |
| `--brand-font-mono` | `JetBrains Mono Variable` |
| `--font-weight-medium` | `500` |

### Piel Sana — `piel-sana`

| Variable | Valor |
| --- | --- |
| `--background` | `#f5f3ef` |
| `--background/10` | `oklch(0.9646 0.0057 84.57 / 20%)` |
| `--background-hover` | `#f5f3ef` |
| `--background-active` | `#f5f3ef` |
| `--foreground` | `#333333` |
| `--foreground/60` | `oklch(0.3211 0 89.88 / 60%)` |
| `--card` | `#ffffff` |
| `--card/1` | `oklch(1 0 89.88 / 1%)` |
| `--popover` | `#fbf8f1` |
| `--primary` | `#ff9248` |
| `--primary-hover` | `#e6782e` |
| `--primary-active` | `#e6782e` |
| `--secondary` | `#e3f8f4` |
| `--secondary-hover` | `#e3f8f4` |
| `--secondary-active` | `#e3f8f4` |
| `--muted` | `#e8e4dd` |
| `--accent` | `#ddcaa4` |
| `--success` | `#71b92d` |
| `--success-hover` | `#5a9f07` |
| `--success-active` | `#488007` |
| `--warning` | `#e7a70b` |
| `--error` | `#ed5032` |
| `--destructive` | `#d61d42` |
| `--info` | `#237fd3` |
| `--border` | `#d0cac1` |
| `--input` | `#d0cac1` |
| `--ring` | `#ff9248` |
| `--sidebar` | `#ffffff` |
| `--card-foreground` | `#66635e` |
| `--popover-foreground` | `#333333` |
| `--primary-foreground` | `#ffffff` |
| `--primary-default-foreground` | `#ff9248` |
| `--primary-default-border` | `#ff9248` |
| `--primary-light-border` | `#ff9248` |
| `--primary/5` | `oklch(0.7638 0.1576 52.1 / 5%)` |
| `--primary/10` | `oklch(0.7638 0.1576 52.1 / 10%)` |
| `--primary/15` | `oklch(0.7638 0.1576 52.1 / 15%)` |
| `--primary/20` | `oklch(0.7638 0.1576 52.1 / 20%)` |
| `--secondary-foreground` | `#35917f` |
| `--secondary-default-border` | `#5eccb7` |
| `--secondary/10` | `oklch(0.7749 0.106 179.01 / 10%)` |
| `--secondary/40` | `oklch(0.7749 0.106 179.01 / 40%)` |
| `--muted-foreground` | `#a9a49c` |
| `--muted/5` | `oklch(0.92 0.0104 81.79 / 40%)` |
| `--muted/40` | `oklch(0.92 0.0104 81.79 / 40%)` |
| `--muted/50` | `oklch(0.92 0.0104 81.79 / 50%)` |
| `--accent-foreground` | `#66635e` |
| `--accent/50` | `oklch(0.8452 0.0548 84.5 / 50%)` |
| `--success-foreground` | `#ffffff` |
| `--success-default-border` | `#71b92d` |
| `--success-light` | `#eef9e7` |
| `--success-light-hover` | `#d9f1ca` |
| `--success-light-active` | `#bde7a1` |
| `--success-light-border` | `#bde7a1` |
| `--success-light-foreground` | `#488007` |
| `--warning-foreground` | `#ffffff` |
| `--warning-default-border` | `#e7a70b` |
| `--warning-light` | `#fef5e6` |
| `--warning-light-hover` | `#fee9c6` |
| `--warning-light-active` | `#fed99c` |
| `--warning-light-border` | `#fed99c` |
| `--warning-light-foreground` | `#9d7109` |
| `--error-foreground` | `#ffffff` |
| `--error-default-foreground` | `#ffffff` |
| `--error-default-border` | `#ed5032` |
| `--error-light` | `#ffefec` |
| `--error-light-hover` | `#fedad2` |
| `--error-light-active` | `#febeaf` |
| `--error-light-border` | `#febeaf` |
| `--error-light-foreground` | `#b12403` |
| `--destructive-foreground` | `#ffffff` |
| `--destructive-default-foreground` | `#d61d42` |
| `--error/20` | `oklch(0.6437 0.1983 32.89 / 20%)` |
| `--destructive-light` | `#ffeded` |
| `--destructive-light-hover` | `#fed2d2` |
| `--destructive-light-active` | `#ffacae` |
| `--destructive-light-border` | `#ffacae` |
| `--destructive-light-foreground` | `#9d042b` |
| `--destructive/10` | `oklch(0.5647 0.2128 18.44 / 10%)` |
| `--destructive/20` | `oklch(0.5647 0.2128 18.44 / 20%)` |
| `--destructive/30` | `oklch(0.5647 0.2128 18.44 / 30%)` |
| `--info-foreground` | `#ffffff` |
| `--appointment-scheduled-light` | `#ececef` |
| `--appointment-scheduled-light-border` | `#ccced6` |
| `--appointment-scheduled-default` | `#6a6f86` |
| `--appointment-scheduled-foreground` | `#56596c` |
| `--appointment-confirmed-light` | `#e6eef8` |
| `--appointment-confirmed-light-border` | `#bed1ed` |
| `--appointment-confirmed-default` | `#3f79c9` |
| `--appointment-confirmed-foreground` | `#36619e` |
| `--appointment-reception-light` | `#fcf6de` |
| `--appointment-reception-light-border` | `#f7e7a8` |
| `--appointment-reception-default` | `#e6b800` |
| `--appointment-reception-foreground` | `#b18f09` |
| `--appointment-vitals-light` | `#fbeaf0` |
| `--appointment-vitals-light-border` | `#f4c7d7` |
| `--appointment-vitals-default` | `#e05a8a` |
| `--appointment-vitals-foreground` | `#ad4a6f` |
| `--appointment-consultation-light` | `#fbf1e3` |
| `--appointment-consultation-light-border` | `#f4dab7` |
| `--appointment-consultation-default` | `#e0912a` |
| `--appointment-consultation-foreground` | `#ad7328` |
| `--appointment-completed-light` | `#e4f2ec` |
| `--appointment-completed-light-border` | `#b8decc` |
| `--appointment-completed-default` | `#2f9e6a` |
| `--appointment-completed-foreground` | `#2a7c57` |
| `--appointment-no-show-light` | `#fae8e8` |
| `--appointment-no-show-light-border` | `#f1c3c3` |
| `--appointment-no-show-default` | `#d64f4f` |
| `--appointment-no-show-foreground` | `#a64243` |
| `--appointment-cancelled-light` | `#fdf4f0` |
| `--appointment-cancelled-light-border` | `#fae2d7` |
| `--appointment-cancelled-default` | `#f0a988` |
| `--appointment-cancelled-foreground` | `#b9846d` |
| `--appointment-rescheduled-light` | `#f2eef9` |
| `--appointment-rescheduled-light-border` | `#ddd3f0` |
| `--appointment-rescheduled-default` | `#9b7fd4` |
| `--appointment-rescheduled-foreground` | `#7a65a6` |
| `--ring/15` | `oklch(0.7638 0.1576 52.1 / 15%)` |
| `--ring/50` | `oklch(0.7638 0.1576 52.1 / 50%)` |
| `--input/50` | `oklch(0.8413 0.014 78.25 / 50%)` |
| `--info-light` | `#e9f3ff` |
| `--info-light-hover` | `#cae3fe` |
| `--info-light-active` | `#a1cdfc` |
| `--info-light-border` | `#a1cdfc` |
| `--info-light-foreground` | `#00599d` |
| `--chart-1` | `#ff9248` |
| `--chart-2` | `#5eccb7` |
| `--sidebar-primary` | `#ff9248` |
| `--chart-3` | `#ddcaa4` |
| `--chart-4` | `#71b92d` |
| `--chart-5` | `#e7a70b` |
| `--sidebar-foreground` | `#333333` |
| `--sidebar-accent` | `#fff8f3` |
| `--sidebar-border` | `#d0cac1` |
| `--sidebar-ring` | `#7bc6bb` |
| `--sidebar-primary-foreground` | `#ffffff` |
| `--sidebar-accent-foreground` | `#333333` |
| `--table-row-alternate` | `#fcfbfa` |
| `--warning-hover` | `#c38d0e` |
| `--warning-active` | `#9d7109` |
| `--error-hover` | `#d53412` |
| `--error-active` | `#b12403` |
| `--destructive-hover` | `#bb1137` |
| `--destructive-active` | `#9d042b` |
| `--info-hover` | `#0b6cbc` |
| `--info-active` | `#00599d` |
| `--brand-font-sans` | `Kantumruy Pro Variable` |
| `--brand-font-mono` | `JetBrains Mono Variable` |
| `--font-weight-medium` | `500` |

## Foundations: Extra Colors

Paletas auxiliares estables. Appointment consume estas familias mediante aliases semánticos; los componentes deben usar el alias de Appointment y no el nombre de paleta cuando representen un estado de cita.

### Slate Gray

| Token | Valor |
| --- | --- |
| `slateGray/50` | `#ececef` |
| `slateGray/200` | `#ccced6` |
| `slateGray/500` | `#6a6f86` |
| `slateGray/700` | `#56596c` |

### Clear Blue

| Token | Valor |
| --- | --- |
| `clearBlue/50` | `#e6eef8` |
| `clearBlue/200` | `#bed1ed` |
| `clearBlue/500` | `#3f79c9` |
| `clearBlue/700` | `#36619e` |

### Golden Yellow

| Token | Valor |
| --- | --- |
| `goldenYellow/50` | `#fcf6de` |
| `goldenYellow/200` | `#f7e7a8` |
| `goldenYellow/500` | `#e6b800` |
| `goldenYellow/700` | `#b18f09` |

### Berry Pink

| Token | Valor |
| --- | --- |
| `berryPink/50` | `#fbeaf0` |
| `berryPink/200` | `#f4c7d7` |
| `berryPink/500` | `#e05a8a` |
| `berryPink/700` | `#ad4a6f` |

### Amber Orange

| Token | Valor |
| --- | --- |
| `amberOrange/50` | `#fbf1e3` |
| `amberOrange/200` | `#f4dab7` |
| `amberOrange/500` | `#e0912a` |
| `amberOrange/700` | `#ad7328` |

### Nature Green

| Token | Valor |
| --- | --- |
| `natureGreen/50` | `#e4f2ec` |
| `natureGreen/200` | `#b8decc` |
| `natureGreen/500` | `#2f9e6a` |
| `natureGreen/700` | `#2a7c57` |

### Warm Red

| Token | Valor |
| --- | --- |
| `warmRed/50` | `#fae8e8` |
| `warmRed/200` | `#f1c3c3` |
| `warmRed/500` | `#d64f4f` |
| `warmRed/700` | `#a64243` |

### Soft Coral

| Token | Valor |
| --- | --- |
| `softCoral/50` | `#fdf4f0` |
| `softCoral/200` | `#fae2d7` |
| `softCoral/500` | `#f0a988` |
| `softCoral/700` | `#b9846d` |

### Lavender Purple

| Token | Valor |
| --- | --- |
| `lavenderPurple/50` | `#f2eef9` |
| `lavenderPurple/200` | `#ddd3f0` |
| `lavenderPurple/500` | `#9b7fd4` |
| `lavenderPurple/700` | `#7a65a6` |

## Foundations: relación Appointment ↔ Extra Colors

| Estado | Token semántico | Token base | Valor |
| --- | --- | --- | --- |
| scheduled | `--appointment-scheduled-light` | `slateGray/50` | `#ececef` |
| scheduled | `--appointment-scheduled-light-border` | `slateGray/200` | `#ccced6` |
| scheduled | `--appointment-scheduled-default` | `slateGray/500` | `#6a6f86` |
| scheduled | `--appointment-scheduled-foreground` | `slateGray/700` | `#56596c` |
| confirmed | `--appointment-confirmed-light` | `clearBlue/50` | `#e6eef8` |
| confirmed | `--appointment-confirmed-light-border` | `clearBlue/200` | `#bed1ed` |
| confirmed | `--appointment-confirmed-default` | `clearBlue/500` | `#3f79c9` |
| confirmed | `--appointment-confirmed-foreground` | `clearBlue/700` | `#36619e` |
| reception | `--appointment-reception-light` | `goldenYellow/50` | `#fcf6de` |
| reception | `--appointment-reception-light-border` | `goldenYellow/200` | `#f7e7a8` |
| reception | `--appointment-reception-default` | `goldenYellow/500` | `#e6b800` |
| reception | `--appointment-reception-foreground` | `goldenYellow/700` | `#b18f09` |
| vitals | `--appointment-vitals-light` | `berryPink/50` | `#fbeaf0` |
| vitals | `--appointment-vitals-light-border` | `berryPink/200` | `#f4c7d7` |
| vitals | `--appointment-vitals-default` | `berryPink/500` | `#e05a8a` |
| vitals | `--appointment-vitals-foreground` | `berryPink/700` | `#ad4a6f` |
| consultation | `--appointment-consultation-light` | `amberOrange/50` | `#fbf1e3` |
| consultation | `--appointment-consultation-light-border` | `amberOrange/200` | `#f4dab7` |
| consultation | `--appointment-consultation-default` | `amberOrange/500` | `#e0912a` |
| consultation | `--appointment-consultation-foreground` | `amberOrange/700` | `#ad7328` |
| completed | `--appointment-completed-light` | `natureGreen/50` | `#e4f2ec` |
| completed | `--appointment-completed-light-border` | `natureGreen/200` | `#b8decc` |
| completed | `--appointment-completed-default` | `natureGreen/500` | `#2f9e6a` |
| completed | `--appointment-completed-foreground` | `natureGreen/700` | `#2a7c57` |
| no-show | `--appointment-no-show-light` | `warmRed/50` | `#fae8e8` |
| no-show | `--appointment-no-show-light-border` | `warmRed/200` | `#f1c3c3` |
| no-show | `--appointment-no-show-default` | `warmRed/500` | `#d64f4f` |
| no-show | `--appointment-no-show-foreground` | `warmRed/700` | `#a64243` |
| cancelled | `--appointment-cancelled-light` | `softCoral/50` | `#fdf4f0` |
| cancelled | `--appointment-cancelled-light-border` | `softCoral/200` | `#fae2d7` |
| cancelled | `--appointment-cancelled-default` | `softCoral/500` | `#f0a988` |
| cancelled | `--appointment-cancelled-foreground` | `softCoral/700` | `#b9846d` |
| rescheduled | `--appointment-rescheduled-light` | `lavenderPurple/50` | `#f2eef9` |
| rescheduled | `--appointment-rescheduled-light-border` | `lavenderPurple/200` | `#ddd3f0` |
| rescheduled | `--appointment-rescheduled-default` | `lavenderPurple/500` | `#9b7fd4` |
| rescheduled | `--appointment-rescheduled-foreground` | `lavenderPurple/700` | `#7a65a6` |

## Foundations: Typography

Cada estilo conserva el nombre de Figma y su traducción vigente a Tailwind CSS. `font-sans` resuelve la familia activa de marca y `font-mono` resuelve JetBrains Mono.

| Estilo Figma | Estado | Familia | Peso | Tamaño | Line height | Tracking | Case | Decoración | Tailwind CSS | Variables |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `Legacy/display/one/extrabold` | Legacy | Inter | Extra Bold (800) | 30px | Auto | 0% | TITLE | NONE | `font-sans text-3xl leading-normal font-extrabold tracking-normal capitalize no-underline` | `typography/heading`<br>`text/display-1`<br>`typography/style/extrabold` |
| `heading/lg/semibold` | Activo | Inter | Semi Bold (600) | 24px | Auto | -2.5% | ORIGINAL | NONE | `font-sans text-2xl leading-normal font-semibold tracking-[-0.025em] normal-case no-underline` | `typography/heading`<br>`text/heading-lg`<br>`typography/style/semibold` |
| `Legacy/heading/one/bold` | Legacy | Inter | Bold (700) | 24px | Auto | -2.5% | ORIGINAL | NONE | `font-sans text-2xl leading-normal font-bold tracking-[-0.025em] normal-case no-underline` | `typography/heading`<br>`text/heading-lg`<br>`typography/style/bold` |
| `heading/md/semibold` | Activo | Inter | Semi Bold (600) | 20px | Auto | 0% | ORIGINAL | NONE | `font-sans text-xl leading-normal font-semibold tracking-normal normal-case no-underline` | `typography/heading`<br>`text/heading-md`<br>`typography/style/semibold` |
| `Legacy/heading/two/bold` | Legacy | Inter | Bold (700) | 20px | Auto | 0% | ORIGINAL | NONE | `font-sans text-xl leading-normal font-bold tracking-normal normal-case no-underline` | `typography/heading`<br>`text/heading-md`<br>`typography/style/bold` |
| `heading/sm/semibold` | Activo | Inter | Semi Bold (600) | 18px | Auto | 0% | ORIGINAL | NONE | `font-sans text-lg leading-normal font-semibold tracking-normal normal-case no-underline` | `typography/heading`<br>`text/heading-sm`<br>`typography/style/semibold` |
| `Legacy/heading/three/bold` | Legacy | Inter | Bold (700) | 18px | Auto | 0% | ORIGINAL | NONE | `font-sans text-lg leading-normal font-bold tracking-normal normal-case no-underline` | `typography/heading`<br>`text/heading-sm`<br>`typography/style/bold` |
| `Legacy/body/base/regular` | Legacy | Inter | Regular (400) | 16px | 24px | 0% | ORIGINAL | NONE | `font-sans text-base leading-6 font-normal tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-lg`<br>`typography/style/normal` |
| `body/lg/sans/medium` | Activo | Inter | Medium (500) | 16px | 24px | 0% | ORIGINAL | NONE | `font-sans text-base leading-6 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-lg`<br>`typography/style/medium` |
| `body/lg/sans/semibold` | Activo | Inter | Semi Bold (600) | 16px | 24px | 0% | ORIGINAL | NONE | `font-sans text-base leading-6 font-semibold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-lg`<br>`typography/style/semibold` |
| `body/md/sans/regular` | Activo | Inter | Regular (400) | 14px | 20px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-5 font-normal tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/normal` |
| `Legacy/body/two/regular uppercase` | Legacy | Inter | Regular (400) | 14px | 20px | 0% | UPPER | NONE | `font-sans text-sm leading-5 font-normal tracking-normal uppercase no-underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/normal` |
| `body/md/mono/regular` | Activo | JetBrains Mono | Regular (400) | 14px | 20px | 0% | ORIGINAL | NONE | `font-mono text-sm leading-5 font-normal tracking-normal normal-case no-underline` | `typography/mono`<br>`text/body-md`<br>`typography/style/normal` |
| `body/sm/sans/regular` | Activo | Inter | Regular (400) | 12px | 16px | 0% | ORIGINAL | NONE | `font-sans text-xs leading-4 font-normal tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-sm`<br>`typography/style/normal` |
| `body/sm/sans/regular uppercase` | Activo | Inter | Regular (400) | 12px | 16px | 2.5% | UPPER | NONE | `font-sans text-xs leading-4 font-normal tracking-[0.025em] uppercase no-underline` | `typography/sans`<br>`text/body-sm`<br>`typography/style/normal` |
| `body/sm/sans/medium` | Activo | Inter | Medium (500) | 12px | 16px | 0% | ORIGINAL | NONE | `font-sans text-xs leading-4 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-sm`<br>`typography/style/medium` |
| `body/sm/sans/semibold` | Activo | Inter | Semi Bold (600) | 12px | 16px | 0% | ORIGINAL | NONE | `font-sans text-xs leading-4 font-semibold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-sm`<br>`typography/style/semibold` |
| `body/sm/sans/semibold uppercase` | Activo | Inter | Semi Bold (600) | 12px | 16px | 0% | UPPER | NONE | `font-sans text-xs leading-4 font-semibold tracking-normal uppercase no-underline` | `typography/sans`<br>`text/body-sm`<br>`typography/style/semibold` |
| `Legacy/body/three/medium uppercase` | Legacy | Inter | Medium (500) | 12px | 16px | 2.5% | UPPER | NONE | `font-sans text-xs leading-4 font-medium tracking-[0.025em] uppercase no-underline` | `typography/sans`<br>`text/body-sm`<br>`typography/style/medium` |
| `Legacy/caption/one/regular` | Legacy | Inter | Regular (400) | 11px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[11px] leading-normal font-normal tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-md`<br>`typography/style/normal` |
| `Legacy/caption/one/medium` | Legacy | Inter | Medium (500) | 11px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[11px] leading-normal font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-md`<br>`typography/style/medium` |
| `caption/md/semibold` | Activo | Inter | Semi Bold (600) | 11px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[11px] leading-normal font-semibold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-md`<br>`typography/style/semibold` |
| `caption/md/bold uppercase` | Activo | Inter | Bold (700) | 11px | Auto | 10% | UPPER | NONE | `font-sans text-[11px] leading-normal font-bold tracking-[0.1em] uppercase no-underline` | `typography/sans`<br>`text/caption-md`<br>`typography/style/bold` |
| `caption/sm/regular` | Activo | Inter | Regular (400) | 10px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[10px] leading-normal font-normal tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-sm`<br>`typography/style/normal` |
| `caption/sm/medium` | Activo | Inter | Medium (500) | 10px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[10px] leading-normal font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-sm`<br>`typography/style/medium` |
| `Legacy/caption/two/medium uppercase` | Legacy | Inter | Medium (500) | 10px | Auto | 5% | UPPER | NONE | `font-sans text-[10px] leading-normal font-medium tracking-[0.05em] uppercase no-underline` | `typography/sans`<br>`text/caption-sm`<br>`typography/style/medium` |
| `caption/sm/semibold` | Activo | Inter | Semi Bold (600) | 10px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[10px] leading-normal font-semibold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-sm`<br>`typography/style/semibold` |
| `Legacy/caption/three/regular` | Legacy | Inter | Regular (400) | 9px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[9px] leading-normal font-normal tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-xs`<br>`typography/style/normal` |
| `caption/xs/semibold` | Activo | Inter | Semi Bold (600) | 9px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[9px] leading-normal font-semibold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-xs`<br>`typography/style/semibold` |
| `Legacy/caption/four/regular` | Legacy | Inter | Regular (400) | 8px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[8px] leading-normal font-normal tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-4`<br>`typography/style/normal` |
| `components/avatar/micro/semibold` | Activo | Inter | Semi Bold (600) | 8px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[8px] leading-normal font-semibold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-4`<br>`typography/style/semibold` |
| `components/avatar/tiny/semibold` | Activo | Inter | Semi Bold (600) | 6px | Auto | 0% | ORIGINAL | NONE | `font-sans text-[6px] leading-normal font-semibold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/caption-5`<br>`typography/style/semibold` |
| `Legacy/mono/one/regular` | Legacy | JetBrains Mono | Regular (400) | 14px | Auto | 0% | ORIGINAL | NONE | `font-mono text-sm leading-normal font-normal tracking-normal normal-case no-underline` | `typography/mono`<br>`text/body-md`<br>`typography/style/normal` |
| `Legacy/mono/two/regular` | Legacy | JetBrains Mono | Regular (400) | 12px | Auto | 0% | ORIGINAL | NONE | `font-mono text-xs leading-normal font-normal tracking-normal normal-case no-underline` | `typography/mono`<br>`text/body-sm`<br>`typography/style/normal` |
| `Legacy/mono/two/medium` | Legacy | JetBrains Mono | Medium (500) | 12px | Auto | 0% | ORIGINAL | NONE | `font-mono text-xs leading-normal font-medium tracking-normal normal-case no-underline` | `typography/mono`<br>`text/body-sm`<br>`typography/style/medium` |
| `body/xs/mono/regular` | Activo | JetBrains Mono | Regular (400) | 11px | Auto | 5% | ORIGINAL | NONE | `font-mono text-[11px] leading-normal font-normal tracking-[0.05em] normal-case no-underline` | `typography/mono`<br>`text/caption-md`<br>`typography/style/normal` |
| `body/md/sans/medium` | Activo | Inter | Medium (500) | 14px | 20px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-5 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/medium` |
| `Legacy/body/two/medium uppercase` | Legacy | Inter | Medium (500) | 14px | 20px | 0% | UPPER | NONE | `font-sans text-sm leading-5 font-medium tracking-normal uppercase no-underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/medium` |
| `body/md/mono/medium` | Activo | JetBrains Mono | Medium (500) | 14px | 20px | 0% | ORIGINAL | NONE | `font-mono text-sm leading-5 font-medium tracking-normal normal-case no-underline` | `typography/mono`<br>`text/body-md`<br>`typography/style/medium` |
| `body/md/sans/medium underline` | Activo | Inter | Medium (500) | 14px | 20px | 0% | ORIGINAL | UNDERLINE | `font-sans text-sm leading-5 font-medium tracking-normal normal-case underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/medium` |
| `body/md/mono/medium underline` | Activo | JetBrains Mono | Medium (500) | 14px | 20px | 0% | ORIGINAL | UNDERLINE | `font-mono text-sm leading-5 font-medium tracking-normal normal-case underline` | `typography/mono`<br>`text/body-md`<br>`typography/style/medium` |
| `Legacy/body/two/medium italic` | Legacy | Inter | Medium Italic (500) | 14px | 20px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-5 font-medium tracking-normal normal-case no-underline italic` | `typography/sans`<br>`text/body-md` |
| `body/md/sans/semibold` | Activo | Inter | Semi Bold (600) | 14px | 20px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-5 font-semibold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/semibold` |
| `Legacy/body/two/semibold uppercase` | Legacy | Inter | Semi Bold (600) | 14px | 20px | 2.5% | UPPER | NONE | `font-sans text-sm leading-5 font-semibold tracking-[0.025em] uppercase no-underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/semibold` |
| `Legacy/body/three/bold uppercase` | Legacy | Inter | Bold (700) | 12px | 16px | 0% | UPPER | NONE | `font-sans text-xs leading-4 font-bold tracking-normal uppercase no-underline` | `typography/sans`<br>`text/body-sm`<br>`typography/style/bold` |
| `components/button/base` | Activo | Inter | Medium (500) | 14px | 20px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-5 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/size/tailwind/sm`<br>`typography/style/medium` |
| `components/button/base underline` | Activo | Inter | Medium (500) | 14px | 20px | 0% | ORIGINAL | UNDERLINE | `font-sans text-sm leading-5 font-medium tracking-normal normal-case underline` | `typography/sans`<br>`typography/size/tailwind/sm`<br>`typography/style/medium` |
| `Legacy/components/button/default` | Legacy | Inter | Medium (500) | 14px | 20px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-5 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/size/tailwind/sm`<br>`typography/style/medium` |
| `Legacy/components/button/default underline` | Legacy | Inter | Medium (500) | 14px | 20px | 0% | ORIGINAL | UNDERLINE | `font-sans text-sm leading-5 font-medium tracking-normal normal-case underline` | `typography/sans`<br>`typography/size/tailwind/sm`<br>`typography/style/medium` |
| `components/button/sm` | Activo | Inter | Medium (500) | 12.8px | 20px | 0% | ORIGINAL | NONE | `font-sans text-[0.8rem] leading-5 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/size/rem/0,8`<br>`typography/style/medium` |
| `components/button/sm underline` | Activo | Inter | Medium (500) | 12.8px | 20px | 0% | ORIGINAL | UNDERLINE | `font-sans text-[0.8rem] leading-5 font-medium tracking-normal normal-case underline` | `typography/sans`<br>`typography/size/rem/0,8`<br>`typography/style/medium` |
| `components/button/xs` | Activo | Inter | Medium (500) | 12px | 20px | 0% | ORIGINAL | NONE | `font-sans text-xs leading-5 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/size/tailwind/xs`<br>`typography/style/medium` |
| `components/button/xs underline` | Activo | Inter | Medium (500) | 12px | 20px | 0% | ORIGINAL | UNDERLINE | `font-sans text-xs leading-5 font-medium tracking-normal normal-case underline` | `typography/sans`<br>`typography/size/tailwind/xs`<br>`typography/style/medium` |
| `components/badge/xl/medium` | Activo | Inter | Medium (500) | 14px | 20px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-5 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/style/medium` |
| `components/badge/lg/medium` | Activo | Inter | Medium (500) | 12px | 16px | 0% | ORIGINAL | NONE | `font-sans text-xs leading-4 font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/style/medium` |
| `Legacy/components/badge/md/medium` | Legacy | Inter | Medium (500) | 10px | 15px | 0% | ORIGINAL | NONE | `font-sans text-[10px] leading-[15px] font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/style/medium` |
| `components/badge/compact/medium` | Activo | Inter | Medium (500) | 10px | 15px | 0% | ORIGINAL | NONE | `font-sans text-[10px] leading-[15px] font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/style/medium` |
| `components/toast/medium` | Activo | Inter | Medium (500) | 13px | 19.5px | 0% | ORIGINAL | NONE | `font-sans text-[13px] leading-[19.5px] font-medium tracking-normal normal-case no-underline` | `typography/sans`<br>`typography/style/medium` |
| `Legacy/components/calendar/regular line-through` | Legacy | Inter | Regular (400) | 14px | 14px | 0% | ORIGINAL | STRIKETHROUGH | `font-sans text-sm leading-[14px] font-normal tracking-normal normal-case line-through` | `typography/sans`<br>`text/body-md`<br>`typography/style/normal` |
| `components/calendar/regular` | Activo | Inter | Regular (400) | 14px | 14px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-[14px] font-normal tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/normal` |
| `components/calendar/bold` | Activo | Inter | Bold (700) | 14px | 14px | 0% | ORIGINAL | NONE | `font-sans text-sm leading-[14px] font-bold tracking-normal normal-case no-underline` | `typography/sans`<br>`text/body-md`<br>`typography/style/bold` |
| `Legacy/body/base/mono-regular` | Legacy | JetBrains Mono | Regular (400) | 16px | 24px | 0% | ORIGINAL | NONE | `font-mono text-base leading-6 font-normal tracking-normal normal-case no-underline` | `typography/mono`<br>`typography/size/tailwind/base` |

## Inventario de componentes v1

| Componente | Categoría | Tipo | Nodo Figma | Docs | Playground |
| --- | --- | --- | --- | --- | --- |
| [Accordion](#componente-accordion) | Disclosure | component | `1771:909` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-accordion--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-accordion--playground) |
| [Alert](#componente-alert) | Feedback | component | `1178:530` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-alert--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-alert--playground) |
| [Alert Dialog](#componente-alert-dialog) | Overlay | component | `1187:612` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-alert-dialog--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-alert-dialog--playground) |
| [Attachment](#componente-attachment) | Data display | component | `2827:14904` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-attachment--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-attachment--playground) |
| [Avatar](#componente-avatar) | Data display | component | `246:2681` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-avatar--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-avatar--playground) |
| [Badge](#componente-badge) | Data display | component | `186:141` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-badge--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-badge--playground) |
| [Breadcrumb](#componente-breadcrumb) | Navigation | component | `1760:597` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-breadcrumb--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-breadcrumb--playground) |
| [Button](#componente-button) | Action | component | `1:24` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-button--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-button--texto) |
| [Button Group](#componente-button-group) | Action | component | `3355:1262` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-button-group--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-button-group--playground) |
| [Calendar](#componente-calendar) | Form | component | `1521:3069` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-calendar--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-calendar--playground) |
| [Card](#componente-card) | Data display | component | `1798:3431` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-card--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-card--playground) |
| [Carousel](#componente-carousel) | Layout | component | `2782:1341` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-carousel--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-carousel--playground) |
| [Checkbox](#componente-checkbox) | Form | component | `1:41` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-checkbox--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-checkbox--playground) |
| [Collapsible](#componente-collapsible) | Disclosure | component | `1771:929` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-collapsible--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-collapsible--playground) |
| [Combobox](#componente-combobox) | Form | component | `1:39` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-combobox--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-combobox--playground) |
| [Context Menu](#componente-context-menu) | Menu | component | `1675:339` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-context-menu--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-context-menu--playground) |
| [Data Table](#componente-data-table) | Data display | component | `2366:19504` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-data-table--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-data-table--playground) |
| [Date Picker](#componente-date-picker) | Form | block | `1:35` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-date-picker--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-date-picker--playground) |
| [Drawer](#componente-drawer) | Overlay | component | `1290:302` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-drawer--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-drawer--playground) |
| [Dropdown Menu](#componente-dropdown-menu) | Menu | component | `1521:4708` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-dropdown-menu--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-dropdown-menu--playground) |
| [Empty](#componente-empty) | Feedback | component | `2173:21188` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-empty--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-empty--playground) |
| [Field](#componente-field) | Form | component | `553:2675` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-field--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-field--playground) |
| [Hover Card](#componente-hover-card) | Overlay | component | `1650:2013` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-hover-card--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-hover-card--playground) |
| [Input](#componente-input) | Form | component | `1:34` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-input--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-input--playground) |
| [Input OTP](#componente-input-otp) | Form | component | `561:4282` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-input-otp--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-input-otp--playground) |
| [Item](#componente-item) | Data display | component | `2190:1413` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-item--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-item--playground) |
| [Kbd](#componente-kbd) | Data display | component | `2793:2325` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-kbd--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-kbd--playground) |
| [Label](#componente-label) | Form | component | `1:38` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-label--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-label--playground) |
| [Menubar](#componente-menubar) | Navigation | component | `2938:11449` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-menubar--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-menubar--playground) |
| [Native Select](#componente-native-select) | Form | component | `553:7952` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-native-select--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-native-select--playground) |
| [Navigation Menu](#componente-navigation-menu) | Navigation | component | `2938:12924` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-navigation-menu--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-navigation-menu--playground) |
| [Pagination](#componente-pagination) | Navigation | component | `1763:1260` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-pagination--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-pagination--playground) |
| [Popover](#componente-popover) | Overlay | component | `726:6350` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-popover--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-popover--playground) |
| [Progress](#componente-progress) | Feedback | component | `2206:16412` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-progress--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-progress--playground) |
| [Radio Group](#componente-radio-group) | Form | component | `1:41` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-radio-group--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-radio-group--playground) |
| [Resizable](#componente-resizable) | Layout | component | `2882:453` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-resizable--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-resizable--playground) |
| [Scroll Area](#componente-scroll-area) | Layout | component | `1800:1860` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-scroll-area--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-scroll-area--playground) |
| [Select](#componente-select) | Form | component | `614:4917` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-select--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-select--playground) |
| [Separator](#componente-separator) | Layout | component | `589:983` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-separator--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-separator--playground) |
| [Sheet](#componente-sheet) | Overlay | component | `1295:386` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-sheet--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-sheet--playground) |
| [Sidebar](#componente-sidebar) | Navigation | component | `3114:1373` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-sidebar--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-sidebar--playground) |
| [Slider](#componente-slider) | Form | component | `2772:1030` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-slider--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-slider--playground) |
| [Spinner](#componente-spinner) | Feedback | component | `2206:19380` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-spinner--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-spinner--playground) |
| [Switch](#componente-switch) | Form | component | `1:41` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-switch--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-switch--playground) |
| [Table](#componente-table) | Data display | component | `2064:259` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-table--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-table--playground) |
| [Tabs](#componente-tabs) | Navigation | component | `1:33` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-tabs--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-tabs--playground) |
| [Toast](#componente-toast) | Feedback | component | `1:45` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-toast--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-toast--playground) |
| [Toggle](#componente-toggle) | Action | component | `3267:2627` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-toggle--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-toggle--playground) |
| [Toggle Group](#componente-toggle-group) | Action | component | `3331:60517` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-toggle-group--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-toggle-group--playground) |
| [Tooltip](#componente-tooltip) | Overlay | component | `1:30` | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-tooltip--docs) | [abrir](https://ds-grm-documentation.vercel.app/?path=/story/components-tooltip--playground) |

## Componente: Accordion

Agrupa contenido expandible en uno o varios paneles y conserva interacción por teclado.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `accordion` |
| Categoría | Disclosure |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma |
| Figma | [nodo 1771:909](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1771-909) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-accordion--docs) |
| Registry | [accordion.json](https://ds-grm-documentation.vercel.app/r/accordion.json) |
| Implementación | `src/components/ui/accordion.tsx` |
| Composición canónica | `src/components/ui/accordion-example.tsx` |
| Stories | `src/components/ui/accordion.stories.tsx` |
| Documentación | `src/components/ui/accordion.mdx` |

### Cambios declarados en la versión del componente

- Modos Multiple y Unique sincronizados con el nodo 1771:909.
- Entre 2 y 10 ítems configurables.
- Estados colapsado, expandido y hover.
- Implementación accesible sobre Accordion de Radix incluido por shadcn/ui.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| Data slots | `accordion`, `accordion-item`, `accordion-trigger`, `accordion-trigger-text`, `accordion-trigger-icon`, `accordion-content`, `accordion-content-inner` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./accordion` |
| Secciones visibles en Docs | Versión → Variantes de comportamiento → Estados → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type AccordionMode = "unique" | "multiple"
```

```ts
export type AccordionExampleProps = {
  mode?: AccordionMode
  itemCount?: number
  defaultOpen?: boolean
  constrained?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `mode` | `unique` |
| `itemCount` | `3` |
| `defaultOpen` | `true` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `mode` | Comportamiento | Accordion | Sí | inline-radio | `unique`, `multiple` | — |
| `itemCount` | Cantidad de ítems | Accordion | Sí | range | — | — |
| `defaultOpen` | Iniciar expandido | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-accordion--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-accordion--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | No |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Accordion

Valores de Figma expresados con tokens y utilidades TailwindCSS.

### Reglas de uso para wireframes

- Construir la instancia mediante **accordion-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Alert

Comunica información contextual, advertencias, errores o confirmaciones dentro del flujo.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `alert` |
| Categoría | Feedback |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma |
| Figma | [nodo 1178:530](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1178-530) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-alert--docs) |
| Registry | [alert.json](https://ds-grm-documentation.vercel.app/r/alert.json) |
| Implementación | `src/components/ui/alert.tsx` |
| Composición canónica | `src/components/ui/alert-example.tsx` |
| Stories | `src/components/ui/alert.stories.tsx` |
| Documentación | `src/components/ui/alert.mdx` |

### Cambios declarados en la versión del componente

- Variantes `default` y `destructive` sincronizadas con el nodo 1178:530.
- Icono y acción opcionales mediante composición.
- Implementación sobre la API compuesta de Alert de shadcn/ui.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Alert`, `AlertTitle`, `AlertDescription`, `AlertAction` |
| Data slots | `alert`, `alert-title`, `alert-description`, `alert-action` |
| Dependencias externas | `react`, `class-variance-authority`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./alert`, `./button` |
| Secciones visibles en Docs | Versión → Variantes de estado → Composición → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type AlertExampleProps = {
  variant?: "default" | "destructive"
  title?: string
  description?: string
  showIcon?: boolean
  showAction?: boolean
  actionLabel?: string
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `variant` | `default` |
| `title` | `Nueva cita asignada` |
| `description` | `Se ha asignado una nueva cita al paciente por atención en Recepción` |
| `showIcon` | `true` |
| `showAction` | `true` |
| `actionLabel` | `Ver detalle` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `variant` | Estado | Alert | Sí | inline-radio | `default`, `destructive` | — |
| `title` | Título | Contenido | Sí | text | — | — |
| `description` | Descripción | Contenido | Sí | text | — | — |
| `showIcon` | Mostrar icono | Composición | Sí | boolean | — | — |
| `showAction` | Mostrar acción | Composición | Sí | boolean | — | — |
| `actionLabel` | Texto de la acción | Composición | Sí | text | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-alert--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-alert--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | No |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **alert-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Alert Dialog

Solicita confirmación explícita antes de ejecutar una acción relevante o irreversible.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `alert-dialog` |
| Categoría | Overlay |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma |
| Figma | [nodo 1187:612](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1187-612) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-alert-dialog--docs) |
| Registry | [alert-dialog.json](https://ds-grm-documentation.vercel.app/r/alert-dialog.json) |
| Implementación | `src/components/ui/alert-dialog.tsx` |
| Composición canónica | `src/components/ui/alert-dialog-example.tsx` |
| Stories | `src/components/ui/alert-dialog.stories.tsx` |
| Documentación | `src/components/ui/alert-dialog.mdx` |

### Cambios declarados en la versión del componente

- Tamaños `basic` y `sm` sincronizados con el nodo 1187:612.
- Estados `default` y `destructive` aplicados a media y acción principal.
- Media opcional y composición accesible sobre Alert Dialog de Radix incluido por shadcn/ui.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `AlertDialog`, `AlertDialogAction`, `AlertDialogCancel`, `AlertDialogContent`, `AlertDialogDescription`, `AlertDialogFooter`, `AlertDialogHeader`, `AlertDialogMedia`, `AlertDialogOverlay`, `AlertDialogPortal`, `AlertDialogTitle`, `AlertDialogTrigger` |
| Data slots | `alert-dialog`, `alert-dialog-trigger`, `alert-dialog-portal`, `alert-dialog-overlay`, `alert-dialog-content`, `alert-dialog-header`, `alert-dialog-footer`, `alert-dialog-media`, `alert-dialog-title`, `alert-dialog-description`, `alert-dialog-action`, `alert-dialog-cancel` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base` |
| Composición interna del ejemplo | `./alert-dialog`, `./button` |
| Secciones visibles en Docs | Versión → Escala y forma → Estados → Media → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type AlertDialogExampleProps = {
  size?: "basic" | "sm"
  status?: "default" | "destructive"
  showMedia?: boolean
  title?: string
  description?: string
  cancelLabel?: string
  actionLabel?: string
  inline?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `size` | `basic` |
| `status` | `default` |
| `showMedia` | `false` |
| `title` | `¿Deseas eliminar este registro?` |
| `description` | `Esta acción no se puede deshacer` |
| `cancelLabel` | `Cancelar` |
| `actionLabel` | `Eliminar` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `size` | Tamaño | Alert Dialog | Sí | inline-radio | `basic`, `sm` | — |
| `status` | Estado | Alert Dialog | Sí | inline-radio | `default`, `destructive` | — |
| `showMedia` | Mostrar media | Composición | Sí | boolean | — | — |
| `title` | Título | Contenido | Sí | text | — | — |
| `description` | Descripción | Contenido | Sí | text | — | — |
| `cancelLabel` | Cancelar | Acciones | Sí | text | — | — |
| `actionLabel` | Confirmar | Acciones | Sí | text | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-alert-dialog--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-alert-dialog--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | No |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **alert-dialog-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Attachment

Representa archivos adjuntos y sus estados de carga, procesamiento, error y finalización.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `attachment` |
| Categoría | Data display |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma |
| Figma | [nodo 2827:14904](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2827-14904) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-attachment--docs) |
| Registry | [attachment.json](https://ds-grm-documentation.vercel.app/r/attachment.json) |
| Implementación | `src/components/ui/attachment.tsx` |
| Composición canónica | `src/components/ui/attachment-example.tsx` |
| Stories | `src/components/ui/attachment.stories.tsx` |
| Documentación | `src/components/ui/attachment.mdx` |

### Cambios declarados en la versión del componente

- Componente compuesto basado en el patrón Attachment de shadcn/ui.
- Estados `idle`, `uploading`, `processing`, `error` y `done`.
- Tamaños `default`, `sm` y `xs`; orientaciones horizontal y vertical.
- Media, acciones, trigger y grupos desplazables componibles.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Attachment`, `AttachmentGroup`, `AttachmentMedia`, `AttachmentContent`, `AttachmentTitle`, `AttachmentDescription`, `AttachmentActions`, `AttachmentAction`, `AttachmentTrigger` |
| Data slots | `attachment`, `attachment-media`, `attachment-content`, `attachment-title`, `attachment-description`, `attachment-actions`, `attachment-action`, `attachment-trigger`, `attachment-group` |
| Dependencias externas | `react`, `class-variance-authority`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base` |
| Composición interna del ejemplo | `./spinner`, `./attachment` |
| Secciones visibles en Docs | Versión → Anatomía y orientación → Estados → Escala y forma → Grupo de adjuntos → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done"
```

```ts
export type AttachmentExampleProps = Omit<ComponentProps<typeof Attachment>, "children"> & {
  state?: AttachmentState
  media?: "icon" | "image"
  title?: string
  showAction?: boolean
  showTrigger?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `state` | `idle` |
| `size` | `default` |
| `orientation` | `horizontal` |
| `media` | `icon` |
| `title` | `documento-paciente.pdf` |
| `showAction` | `true` |
| `showTrigger` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `state` | Estado | Attachment | Sí | select | `idle`, `uploading`, `processing`, `error`, `done` | — |
| `size` | Tamaño | Attachment | Sí | inline-radio | `default`, `sm`, `xs` | — |
| `orientation` | Orientación | Attachment | Sí | inline-radio | `horizontal`, `vertical` | — |
| `media` | Media | Contenido | Sí | inline-radio | `icon`, `image` | — |
| `title` | Nombre del archivo | Contenido | Sí | text | — | — |
| `showAction` | Mostrar acciones | Acciones | Sí | boolean | — | — |
| `showTrigger` | Área interactiva | Acciones | Sí | boolean | — | — |
| `className` | className | General | No | automático | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-attachment--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-attachment--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | No |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Attachment

Medidas de Figma expresadas con utilidades TailwindCSS.

### Reglas de uso para wireframes

- Construir la instancia mediante **attachment-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Avatar

Representa una identidad mediante imagen, iniciales o icono, con tamaños y complementos proporcionales.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `avatar` |
| Categoría | Data display |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 246:2681](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=246-2681) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-avatar--docs) |
| Registry | [avatar.json](https://ds-grm-documentation.vercel.app/r/avatar.json) |
| Implementación | `src/components/ui/avatar.tsx` |
| Composición canónica | `src/components/ui/avatar-example.tsx` |
| Stories | `src/components/ui/avatar.stories.tsx` |
| Documentación | `src/components/ui/avatar.mdx` |

### Cambios declarados en la versión del componente

- Conserva sin modificaciones la API oficial `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarBadge`, `AvatarGroup` y `AvatarGroupCount`.
- Traduce por composición los contenidos image, text e icon; las formas full y semiSquared; la escala, bordes y estados de Figma.
- Los status badges, badges de servicio, textos, iconos y radios responden a la matriz de tamaños definida en Figma.
- Usa la imagen original del nodo y tokens semánticos sensibles a la marca.
- Playground y Docs consumen `avatarExamplePresets` y la misma instancia `AvatarExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Avatar`, `AvatarImage`, `AvatarFallback`, `AvatarGroup`, `AvatarGroupCount`, `AvatarBadge` |
| Data slots | `avatar`, `avatar-image`, `avatar-fallback`, `avatar-badge`, `avatar-group`, `avatar-group-count` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./avatar` |
| Secciones visibles en Docs | Versión → Contenido y composición → Variantes de estilo → Forma → Estados y badges → Bordes de estado → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type AvatarDisplaySize = (typeof avatarSizes)[number]
```

```ts
export type AvatarExampleProps = {
  composition?: "single" | "group"
  content?: "image" | "text" | "icon"
  style?: "primary" | "secondary" | "muted" | "gradient"
  roundness?: "full" | "semiSquared"
  size?: AvatarDisplaySize
  initials?: string
  status?: "none" | "online" | "away" | "busy"
  border?: "default" | "success" | "warning" | "error" | "brand" | "white"
  services?: boolean
  groupQuantity?: 1 | 2 | 3 | 4
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `a` |
| `13` | `v` |
| `14` | `a` |
| `15` | `t` |
| `16` | `a` |
| `17` | `r` |
| `18` | `E` |
| `19` | `x` |
| `20` | `a` |
| `21` | `m` |
| `22` | `p` |
| `23` | `l` |
| `24` | `e` |
| `25` | `P` |
| `26` | `r` |
| `27` | `e` |
| `28` | `s` |
| `29` | `e` |
| `30` | `t` |
| `31` | `s` |
| `32` | `.` |
| `33` | `p` |
| `34` | `l` |
| `35` | `a` |
| `36` | `y` |
| `37` | `g` |
| `38` | `r` |
| `39` | `o` |
| `40` | `u` |
| `41` | `n` |
| `42` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `composition` | Composición | Composición | Sí | inline-radio | `single`, `group` | — |
| `content` | Contenido | Avatar | Sí | inline-radio | `image`, `text`, `icon` | — |
| `style` | Estilo | Avatar | Sí | select | `primary`, `secondary`, `muted`, `gradient` | — |
| `roundness` | Forma | Avatar | Sí | inline-radio | `full`, `semiSquared` | — |
| `size` | Tamaño | Avatar | Sí | select | — | — |
| `initials` | Iniciales | Contenido | Sí | text | — | — |
| `status` | Estado | Indicadores | Sí | select | `none`, `online`, `away`, `busy` | — |
| `border` | Borde | Indicadores | Sí | select | `default`, `success`, `warning`, `error`, `brand`, `white` | — |
| `services` | Servicios | Indicadores | Sí | boolean | — | — |
| `groupQuantity` | Cantidad | Grupo | Sí | inline-radio | `1`, `2`, `3`, `4` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-avatar--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-avatar--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `avatarSizes`

| Valor |
| --- |
| `16` |
| `20` |
| `24` |
| `28` |
| `32` |
| `36` |
| `40` |
| `48` |
| `56` |
| `64` |
| `72` |
| `80` |
| `96` |
| `120` |

#### `avatarPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `composition` | `single` |
| `content` | `image` |
| `style` | `primary` |
| `roundness` | `full` |
| `size` | `80` |
| `initials` | `FJ` |
| `status` | `none` |
| `border` | `default` |
| `services` | `false` |
| `groupQuantity` | `4` |

#### `avatarExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `image` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `text` | `{"composition":"single","content":"text","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `icon` | `{"composition":"single","content":"icon","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `primary` | `{"composition":"single","content":"text","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `secondary` | `{"composition":"single","content":"text","style":"secondary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `muted` | `{"composition":"single","content":"text","style":"muted","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `gradient` | `{"composition":"single","content":"text","style":"gradient","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `full` | `{"composition":"single","content":"text","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `semiSquared` | `{"composition":"single","content":"text","style":"primary","roundness":"semiSquared","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |
| `online` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"online","border":"default","services":false,"groupQuantity":4}` |
| `away` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"away","border":"default","services":false,"groupQuantity":4}` |
| `busy` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"busy","border":"default","services":false,"groupQuantity":4}` |
| `services` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":true,"groupQuantity":4}` |
| `borderSuccess` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"success","services":false,"groupQuantity":4}` |
| `borderWarning` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"warning","services":false,"groupQuantity":4}` |
| `borderError` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"error","services":false,"groupQuantity":4}` |
| `borderBrand` | `{"composition":"single","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"brand","services":false,"groupQuantity":4}` |
| `group` | `{"composition":"group","content":"image","style":"primary","roundness":"full","size":80,"initials":"FJ","status":"none","border":"default","services":false,"groupQuantity":4}` |

### Especificaciones consolidadas desde Docs

#### Datos documentales: `sizes`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Avatar 16` | `size-4` | `16 × 16px` | `Figma / className` |
| `Avatar 20` | `size-5` | `20 × 20px` | `Figma / className` |
| `Avatar 24` | `size-6` | `24 × 24px` | `Figma / className` |
| `Avatar 28` | `size-7` | `28 × 28px` | `Figma / className` |
| `Avatar 32` | `size-8` | `32 × 32px` | `Figma / className` |
| `Avatar 36` | `size-9` | `36 × 36px` | `Figma / className` |
| `Avatar 40` | `size-10` | `40 × 40px` | `Figma / className` |
| `Avatar 48` | `size-12` | `48 × 48px` | `Figma / className` |
| `Avatar 56` | `size-14` | `56 × 56px` | `Figma / className` |
| `Avatar 64` | `size-16` | `64 × 64px` | `Figma / className` |
| `Avatar 72` | `size-[72px]` | `72 × 72px` | `Figma / className` |
| `Avatar 80` | `size-20` | `80 × 80px` | `Figma / className` |
| `Avatar 96` | `size-24` | `96 × 96px` | `Figma / className` |
| `Avatar 120` | `size-[120px]` | `120 × 120px` | `Figma / className` |

### Reglas de uso para wireframes

- Construir la instancia mediante **avatar-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Badge

Etiqueta compacta para clasificación, estado o metadatos breves.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `badge` |
| Categoría | Data display |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma |
| Figma | [nodo 186:141](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=186-141) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-badge--docs) |
| Registry | [badge.json](https://ds-grm-documentation.vercel.app/r/badge.json) |
| Implementación | `src/components/ui/badge.tsx` |
| Composición canónica | `src/components/ui/badge-example.tsx` |
| Stories | `src/components/ui/badge.stories.tsx` |
| Documentación | `src/components/ui/badge.mdx` |

### Cambios declarados en la versión del componente

- Nueve estilos y dos tratamientos visuales sincronizados con el nodo 186:141.
- Cuatro tamaños con tipografía, espaciado e iconografía propios.
- Contenido opcional a izquierda y derecha mediante composición.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Badge`, `badgeVariants` |
| Data slots | `badge` |
| Dependencias externas | `react`, `class-variance-authority`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./badge` |
| Secciones visibles en Docs | Versión → Variantes de estilo → Escala y forma → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type BadgeContent = "none" | "icon" | "spinner"
```

```ts
export type BadgeExampleProps = ComponentProps<typeof Badge> & {
  leftContent?: BadgeContent
  rightContent?: BadgeContent
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `children` | `Badge` |
| `variant` | `primary` |
| `appearance` | `solid` |
| `size` | `lg` |
| `leftContent` | `none` |
| `rightContent` | `none` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `variant` | Estilo | Apariencia | Sí | select | `primary`, `secondary`, `brand-neutral`, `transparent`, `success`, `warning`, `error`, `destructive`, `info` | — |
| `appearance` | Borde | Apariencia | Sí | inline-radio | `solid`, `outline` | — |
| `size` | Tamaño | Tamaño | Sí | inline-radio | `xl`, `lg`, `md`, `sm` | — |
| `children` | Texto | Contenido | Sí | text | — | — |
| `leftContent` | Contenido izquierdo | Contenido | Sí | inline-radio | `none`, `icon`, `spinner` | — |
| `rightContent` | Contenido derecho | Contenido | Sí | inline-radio | `none`, `icon`, `spinner` | — |
| `asChild` | asChild | General | No | automático | — | — |
| `className` | className | General | No | automático | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-badge--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-badge--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | No |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Tamaños y espaciado

Valores medidos en Figma y expresados con su utilidad TailwindCSS.

| Tamaño | Altura | Padding X | Padding Y | Gap | Tipografía | Icono |
| --- | --- | --- | --- | --- | --- | --- |
| `xl` | `30px` | `px-[11px] · 11px` | `py-[5px] · 5px` | `gap-1 · 4px` | `14px / 20px` | `14px` |
| `lg` | `22px` | `px-[9px] · 9px` | `py-[3px] · 3px` | `gap-1 · 4px` | `12px / 16px` | `12px` |
| `md` | `21px` | `px-[9px] · 9px` | `py-[3px] · 3px` | `gap-1 · 4px` | `10px / 15px` | `12px` |
| `sm` | `17px` | `px-[7px] · 7px` | `py-px · 1px` | `gap-1 · 4px` | `10px / 15px` | `10px` |

#### Tokens por tratamiento

Los nombres permanecen estables; sus valores cambian con la marca activa.

#### Datos documentales: `variants`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 | Valor 5 | Valor 6 | Valor 7 |
| --- | --- | --- | --- | --- | --- | --- |
| `primary` | `Primary` | `--primary` | `--primary-foreground` | `--primary / 5%` | `--primary-default-foreground` | `--primary-light-border` |
| `secondary` | `Secondary` | `--secondary` | `--secondary-foreground` | `--secondary-default-border / 10%` | `--secondary-foreground` | `--secondary-default-border` |
| `brand-neutral` | `Brand neutral` | `--background` | `--foreground` | `--background` | `--foreground` | `--border` |
| `transparent` | `Transparent` | `No aplica` | `No aplica` | `transparent` | `--foreground` | `--border` |
| `success` | `Success` | `--success` | `--success-foreground` | `--success-light` | `--success-light-foreground` | `--success-light-border` |
| `warning` | `Warning` | `--warning` | `--warning-foreground` | `--warning-light` | `--warning-light-foreground` | `--warning-light-border` |
| `error` | `Error` | `--error` | `--error-foreground` | `--error-light` | `--error-light-foreground` | `--error-light-border` |
| `destructive` | `Destructive` | `--destructive` | `--destructive-foreground` | `--destructive-light` | `--destructive-light-foreground` | `--destructive-light-border` |
| `info` | `Info` | `--info` | `--info-foreground` | `--info-light` | `--info-light-foreground` | `--info-light-border` |

### Reglas de uso para wireframes

- Construir la instancia mediante **badge-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Breadcrumb

Representa la jerarquía de ubicación; en Storybook GRM su muestra no navega.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `breadcrumb` |
| Categoría | Navigation |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1760:597](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1760-597) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-breadcrumb--docs) |
| Registry | [breadcrumb.json](https://ds-grm-documentation.vercel.app/r/breadcrumb.json) |
| Implementación | `src/components/ui/breadcrumb.tsx` |
| Composición canónica | `src/components/ui/breadcrumb-example.tsx` |
| Stories | `src/components/ui/breadcrumb.stories.tsx` |
| Documentación | `src/components/ui/breadcrumb.mdx` |

### Cambios declarados en la versión del componente

- Rutas de 2, 3 y 4 niveles mediante composición.
- Links, ubicación actual, separadores y patrones de reducción.
- Elipsis estática o interactiva con Dropdown Menu.
- Navegación semántica con `aria-label` y `aria-current`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`, `BreadcrumbEllipsis` |
| Data slots | `breadcrumb`, `breadcrumb-list`, `breadcrumb-item`, `breadcrumb-link`, `breadcrumb-page`, `breadcrumb-separator`, `breadcrumb-ellipsis` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./breadcrumb`, `./button`, `./dropdown-menu` |
| Secciones visibles en Docs | Versión → Niveles → Reducción → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type BreadcrumbExampleProps = {
  levels?: 2 | 3 | 4
  reduction?: "none" | "ellipsis" | "dropdown"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `levels` | `4` |
| `reduction` | `none` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `levels` | Niveles | Estructura | Sí | inline-radio | `2`, `3`, `4` | — |
| `reduction` | Reducción | Estructura | Sí | inline-radio | `none`, `ellipsis`, `dropdown` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-breadcrumb--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-breadcrumb--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **breadcrumb-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Button

Acción primaria o secundaria con texto, icono, spinner y estados interactivos.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `button` |
| Categoría | Action |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.1.0` — Alineación con Figma |
| Figma | [nodo 1:24](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-24) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-button--docs) |
| Registry | [button.json](https://ds-grm-documentation.vercel.app/r/button.json) |
| Implementación | `src/components/ui/button.tsx` |
| Composición canónica | `src/components/ui/button-example.tsx` |
| Stories | `src/components/ui/button.stories.tsx` |
| Documentación | `src/components/ui/button.mdx` |

### Cambios declarados en la versión del componente

- Tamaños, espaciado, radio, sombra y variantes sincronizados con el nodo `1:24`.
- Button e Icon Button conservan propiedades independientes en Storybook.
- Icon Button admite forma semicuadrada o circular.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Button`, `buttonVariants` |
| Data slots | `button` |
| Dependencias externas | `react`, `class-variance-authority`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button` |
| Secciones visibles en Docs | Versión → Variantes de estilo → Escala y forma → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ButtonState = "normal" | "loading" | "disabled"
```

```ts
export type ButtonTextSize = "default" | "xs" | "sm" | "lg"
```

```ts
export type ButtonIconSize = "icon" | "icon-xs" | "icon-sm"
```

```ts
export type ButtonContentPlacement = "none" | "left" | "right"
```

```ts
export type ButtonIconRoundness = "semiSquared" | "full"
```

```ts
export type ButtonTextExampleProps = SharedButtonProps & {
  state?: ButtonState
  size?: ButtonTextSize
  contentPlacement?: ButtonContentPlacement
}
```

```ts
export type ButtonIconExampleProps = Omit<SharedButtonProps, "children"> & {
  state?: ButtonState
  size?: ButtonIconSize
  roundness?: ButtonIconRoundness
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `buttonMode` | `text` |
| `state` | `normal` |
| `variant` | `default` |
| `size` | `default` |
| `children` | `Button` |
| `disabled` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `buttonMode` | buttonMode | General | No | automático | — | — |
| `variant` | Estilo | Estilo | Sí | inline-radio | `default`, `secondary`, `brand-neutral`, `outline`, `ghost`, `link`, `success`, `warning`, `destructive` | — |
| `children` | children | Contenido | Sí | text | — | — |
| `state` | Estado | Estado | Sí | inline-radio | `normal`, `loading`, `disabled` | — |
| `asChild` | asChild | General | No | desactivado | — | — |
| `className` | className | General | No | desactivado | — | — |
| `onClick` | onClick | General | No | desactivado | — | — |

### Stories y Playground

#### Texto

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-button--texto) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-button--texto&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | Sí |
| Prueba de interacción | No |

**Args de esta story**

| Propiedad | Valor |
| --- | --- |
| `buttonMode` | `text` |
| `state` | `normal` |
| `size` | `default` |
| `contentPlacement` | `left` |
| `variant` | `default` |
| `children` | `Ver más` |

**Controles específicos o sobrescritos**

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `size` | Tamaño | Tamaño | Sí | inline-radio | `default`, `xs`, `sm`, `lg` | — |
| `contentPlacement` | Contenido | Modo Texto | Sí | radio | `none`, `left`, `right` | Ícono/loader a izquierda o derecha del texto. |
| `children` | children | Contenido | Sí | text | — | — |
| `buttonMode` | buttonMode | General | No | automático | — | — |

#### Icono

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-button--icono) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-button--icono&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | Sí |
| Prueba de interacción | No |

**Args de esta story**

| Propiedad | Valor |
| --- | --- |
| `buttonMode` | `icon` |
| `state` | `normal` |
| `size` | `icon` |
| `roundness` | `semiSquared` |
| `variant` | `default` |

**Controles específicos o sobrescritos**

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `size` | Tamaño | Tamaño | Sí | inline-radio | `icon`, `icon-xs`, `icon-sm` | — |
| `roundness` | Redondez | Forma | Sí | inline-radio | `semiSquared`, `full` | — |
| `buttonMode` | buttonMode | General | No | automático | — | — |

### Especificaciones consolidadas desde Docs

#### Button

Escala para botones con texto, icono o spinner opcional.

| Tamaño | Altura | Padding X | Gap | Tipografía |
| --- | --- | --- | --- | --- |
| `lg` | `h-9 · 36px` | `px-3 · 12px` | `gap-3 · 12px` | `14px / 20px` |
| `default` | `h-8 · 32px` | `px-3 · 12px` | `gap-3 · 12px` | `14px / 20px` |
| `sm` | `h-7 · 28px` | `px-3 · 12px` | `gap-3 · 12px` | `12.8px / 20px` |
| `xs` | `h-6 · 24px` | `px-3 · 12px` | `gap-3 · 12px` | `12px / 20px` |

#### Icon Button

Escala cuadrada con icono interno constante.

| Tamaño | Dimensiones | Padding | Icono | Formas |
| --- | --- | --- | --- | --- |
| `icon` | `size-8 · 32 × 32px` | `8px` | `size-4 · 16 × 16px` | `6px / circular` |
| `icon-sm` | `size-7 · 28 × 28px` | `6px` | `size-4 · 16 × 16px` | `6px / circular` |
| `icon-xs` | `size-6 · 24 × 24px` | `4px` | `size-4 · 16 × 16px` | `6px / circular` |

#### Datos documentales: `variants`

| value | label | surface | text | border |
| --- | --- | --- | --- | --- |
| `default` | `Primary` | `--primary` | `--primary-foreground` | `—` |
| `secondary` | `Secondary` | `--secondary` | `--secondary-foreground` | `--border` |
| `brand-neutral` | `Brand neutral` | `--background` | `--foreground` | `--border` |
| `outline` | `Outline` | `transparent` | `--foreground` | `--border` |
| `ghost` | `Ghost` | `transparent` | `--foreground` | `—` |
| `link` | `Link` | `transparent` | `--foreground` | `—` |
| `success` | `Success` | `--success-light` | `--success-light-foreground` | `--success-light-border` |
| `warning` | `Warning` | `--warning-light` | `--warning-light-foreground` | `--warning-light-border` |
| `destructive` | `Destructive` | `--destructive-light` | `--destructive-light-foreground` | `--destructive-light-border` |

#### Datos documentales: `textSizes`

| value | label | height | padding |
| --- | --- | --- | --- |
| `lg` | `Large` | `36px` | `12px` |
| `default` | `Default` | `32px` | `12px` |
| `sm` | `Small` | `28px` | `12px` |
| `xs` | `Extra small` | `24px` | `12px` |

#### Datos documentales: `iconSizes`

| value | label | dimension | padding |
| --- | --- | --- | --- |
| `icon` | `Default` | `32 × 32px` | `8px` |
| `icon-sm` | `Small` | `28 × 28px` | `6px` |
| `icon-xs` | `Extra small` | `24 × 24px` | `4px` |

### Reglas de uso para wireframes

- Construir la instancia mediante **button-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Button Group

Agrupa acciones relacionadas y coordina bordes, orientación y espaciado entre botones.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `button-group` |
| Categoría | Action |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 3355:1262](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3355-1262) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-button-group--docs) |
| Registry | [button-group.json](https://ds-grm-documentation.vercel.app/r/button-group.json) |
| Implementación | `src/components/ui/button-group.tsx` |
| Composición canónica | `src/components/ui/button-group-example.tsx` |
| Stories | `src/components/ui/button-group.stories.tsx` |
| Documentación | `src/components/ui/button-group.mdx` |

### Cambios declarados en la versión del componente

- Conserva `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`, `role=group` y navegación Tab oficiales.
- Compone Button, Icon Button, Dropdown y Popover reales con bordes y radios dependientes de su posición.
- Adapta orientación horizontal/vertical y composiciones de 1 a 10 elementos del set de Figma.
- Mantiene 6 px de radio exterior y alturas consistentes entre botones de texto e icono en toda la escala.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `ButtonGroup`, `ButtonGroupSeparator`, `ButtonGroupText`, `buttonGroupVariants` |
| Data slots | `button-group`, `button-group-text`, `button-group-separator` |
| Dependencias externas | `class-variance-authority`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base`, `@grm/separator` |
| Composición interna del ejemplo | `./button`, `./button-group`, `./dropdown-menu`, `./popover` |
| Secciones visibles en Docs | Versión → Último slot → Contenido → Orientación → Composición oficial → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ButtonGroupExampleProps = {
  composition?: "buttons" | "separator" | "text"
  orientation?: "horizontal" | "vertical"
  items?: number
  lastSlot?: "button" | "icon-button" | "dropdown" | "popover"
  content?: "icon" | "text" | "icon-text"
  size?: "xs" | "sm" | "default" | "lg"
  disabled?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `composition` | `buttons` |
| `orientation` | `horizontal` |
| `items` | `4` |
| `lastSlot` | `button` |
| `content` | `text` |
| `size` | `default` |
| `disabled` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `composition` | Composición | Composición | Sí | inline-radio | `buttons`, `separator`, `text` | — |
| `orientation` | Orientación | Disposición | Sí | inline-radio | `horizontal`, `vertical` | — |
| `items` | Cantidad | Botones | Sí | range | — | — |
| `lastSlot` | Último slot | Botones | Sí | select | `button`, `icon-button`, `dropdown`, `popover` | — |
| `content` | Contenido de botones | Botones | Sí | inline-radio | `icon`, `text`, `icon-text` | — |
| `size` | Tamaño | Apariencia | Sí | inline-radio | `xs`, `sm`, `default`, `lg` | — |
| `disabled` | Deshabilitado | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-button-group--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-button-group--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `sizes`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `xs` | `24px` | `12px` | `16px` |
| `sm` | `28px` | `12.8px` | `16px` |
| `default` | `32px` | `14px` | `16px` |
| `lg` | `36px` | `14px` | `16px` |

### Reglas de uso para wireframes

- Construir la instancia mediante **button-group-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Calendar

Selección de fecha, rango y disponibilidad basada en el Calendar oficial de shadcn/ui.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `calendar` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1521:3069](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1521-3069) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-calendar--docs) |
| Registry | [calendar.json](https://ds-grm-documentation.vercel.app/r/calendar.json) |
| Implementación | `src/components/ui/calendar.tsx` |
| Composición canónica | `src/components/ui/calendar-example.tsx` |
| Stories | `src/components/ui/calendar.stories.tsx` |
| Documentación | `src/components/ui/calendar.mdx` |

### Cambios declarados en la versión del componente

- Mantiene la API de `react-day-picker` y el primitive vigente de shadcn/ui `radix-nova`.
- Traduce single, range, encabezados, hora y presets mediante propiedades y composición oficial; el rango de dos meses replica la ventana de 30 días del ejemplo oficial.
- Añade disponibilidad desde Figma mediante `modifiers`, `modifiersClassNames` y una leyenda externa, sin alterar el primitive.
- Presenta siempre dos meses cuando `mode="range"`.
- Docs y Playground renderizan exclusivamente `CalendarExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Calendar`, `CalendarDayButton` |
| Data slots | `calendar` |
| Dependencias externas | `react`, `react-day-picker`, `lucide-react`, `date-fns`, `react-day-picker/locale` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./calendar`, `./card`, `./field`, `./input-group`, `./separator` |
| Secciones visibles en Docs | Versión → Selección → Encabezado → Composiciones oficiales → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type CalendarExampleProps = {
  mode?: "single" | "multiple" | "range"
  composition?: "calendar" | "availability" | "time" | "presets"
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  numberOfMonths?: 1 | 2
  showOutsideDays?: boolean
  showWeekNumber?: boolean
  fixedWeeks?: boolean
  bookedDates?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `mode` | `single` |
| `composition` | `calendar` |
| `captionLayout` | `label` |
| `numberOfMonths` | `1` |
| `showOutsideDays` | `true` |
| `showWeekNumber` | `false` |
| `fixedWeeks` | `false` |
| `bookedDates` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `mode` | Selección | Calendar | Sí | inline-radio | `single`, `multiple`, `range` | — |
| `captionLayout` | Encabezado | Calendar | Sí | select | `label`, `dropdown`, `dropdown-months`, `dropdown-years` | Los selectores aplican a un mes. Con dos meses se muestran captions «mes año», como en shadcn/ui. |
| `numberOfMonths` | Meses | Calendar | Sí | inline-radio | `1`, `2` | Aplica a single y multiple. Range siempre presenta dos meses. |
| `showOutsideDays` | Días externos | Calendar | Sí | boolean | — | — |
| `showWeekNumber` | Número de semana | Calendar | Sí | boolean | — | — |
| `fixedWeeks` | Semanas fijas | Calendar | Sí | boolean | — | — |
| `bookedDates` | Fechas ocupadas | Configuración de muestra | Sí | boolean | — | Configura disabled y modifiers en la muestra. |
| `composition` | Composición | Configuración de muestra | Sí | inline-radio | `calendar`, `availability`, `time`, `presets` | Compone Calendar con modifiers y primitives oficiales; no amplía su API. |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-calendar--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-calendar--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **calendar-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Card

Contenedor estructurado con header, contenido, media, acciones y footer opcionales.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `card` |
| Categoría | Data display |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma |
| Figma | [nodo 1798:3431](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1798-3431) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-card--docs) |
| Registry | [card.json](https://ds-grm-documentation.vercel.app/r/card.json) |
| Implementación | `src/components/ui/card.tsx` |
| Composición canónica | `src/components/ui/card-example.tsx` |
| Stories | `src/components/ui/card.stories.tsx` |
| Documentación | `src/components/ui/card.mdx` |

### Cambios declarados en la versión del componente

- Tamaños, estilos y espaciados sincronizados con el nodo `1798:3431`.
- Header, body y footer conservan la composición pública de Card de shadcn/ui.
- Footer admite distribución en columna, fila o wrap.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardAction`, `CardDescription`, `CardContent` |
| Data slots | `card`, `card-header`, `card-title`, `card-description`, `card-action`, `card-content`, `card-footer` |
| Dependencias externas | `react`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./card` |
| Secciones visibles en Docs | Versión → Escala y forma → Estilos → Footer → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type CardExampleProps = {
  size?: "default" | "sm"
  variant?: "body" | "image"
  spacing?: 12 | 16 | 20 | 24 | 32
  footer?: "column" | "row" | "wrap"
  showAction?: boolean
  title?: string
  description?: string
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `size` | `default` |
| `variant` | `body` |
| `spacing` | `16` |
| `footer` | `column` |
| `showAction` | `true` |
| `title` | `Login to your account` |
| `description` | `Enter your email below to login to your account` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `size` | Tamaño | Card | Sí | inline-radio | `default`, `sm` | — |
| `variant` | Estilo | Card | Sí | inline-radio | `body`, `image` | — |
| `spacing` | Espaciado | Card | Sí | select | `12`, `16`, `20`, `24`, `32` | — |
| `footer` | Footer | Composición | Sí | inline-radio | `column`, `row`, `wrap` | — |
| `showAction` | Acción en header | Composición | Sí | boolean | — | — |
| `title` | Título | Contenido | Sí | text | — | — |
| `description` | Descripción | Contenido | Sí | text | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-card--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-card--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | No |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `rows`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 | Valor 5 | Valor 6 |
| --- | --- | --- | --- | --- | --- |
| `Card default` | `384px` | `361px` | `14px` | `16 / 20 / 24 / 32px` | `--card / --border` |
| `Card small` | `320px` | `361px` | `14px` | `12px` | `--card / --border` |
| `Header` | `Flexible` | `68px` | `—` | `4px` | `--foreground / --muted-foreground` |
| `Image` | `100%` | `154 / 138 / 122 / 90px` | `14px superior` | `Según Card` | `Contenido` |
| `Footer row` | `100%` | `65 / 73 / 81 / 97px` | `14px inferior` | `10px` | `--muted / 50% / --border` |
| `Footer column` | `100%` | `107 / 115 / 123 / 139px` | `14px inferior` | `10px` | `--muted / 50% / --border` |

### Reglas de uso para wireframes

- Construir la instancia mediante **card-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Carousel

Secuencia navegable de contenidos basada en Embla y la composición oficial de shadcn/ui.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `carousel` |
| Categoría | Layout |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma |
| Figma | [nodo 2782:1341](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2782-1341) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-carousel--docs) |
| Registry | [carousel.json](https://ds-grm-documentation.vercel.app/r/carousel.json) |
| Implementación | `src/components/ui/carousel.tsx` |
| Composición canónica | `src/components/ui/carousel-example.tsx` |
| Stories | `src/components/ui/carousel.stories.tsx` |
| Documentación | `src/components/ui/carousel.mdx` |

### Cambios declarados en la versión del componente

- Escalas `full`, `large`, `medium` y `small` sincronizadas con el nodo `2782:1341`.
- Orientación horizontal y vertical sobre Embla Carousel.
- Navegación, estado disabled, teclado y posición derivados de la API real de shadcn/ui.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `CarouselApi`, `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext`, `useCarousel` |
| Data slots | `carousel`, `carousel-content`, `carousel-item`, `carousel-previous`, `carousel-next` |
| Dependencias externas | `react`, `class-variance-authority`, `embla-carousel-react`, `lucide-react` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base` |
| Composición interna del ejemplo | `./carousel` |
| Secciones visibles en Docs | Versión → Anatomía y composición → Escala y forma → Orientación → Comportamiento shadcn/ui → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type CarouselExampleProps = {
  size?: "full" | "large" | "medium" | "small"
  orientation?: "horizontal" | "vertical"
  items?: number
  disabled?: boolean
  loop?: boolean
  setApi?: (api: CarouselApi) => void
  contentClassName?: string
  itemClassName?: string
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `size` | `full` |
| `orientation` | `horizontal` |
| `items` | `4` |
| `disabled` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `size` | Tamaño | Carousel | Sí | inline-radio | `full`, `large`, `medium`, `small` | — |
| `orientation` | Orientación | Carousel | Sí | inline-radio | `horizontal`, `vertical` | — |
| `items` | Ítems | Contenido | Sí | range | — | — |
| `disabled` | Deshabilitado | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-carousel--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-carousel--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | No |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `apiRows`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `orientation` | `horizontal \| vertical` | `Prop oficial` | `Define axis y teclado` |
| `opts` | `CarouselOptions` | `Prop oficial` | `Opciones nativas de Embla` |
| `plugins` | `CarouselPlugin` | `Prop oficial` | `Plugins como Autoplay` |
| `setApi` | `(api) => void` | `Prop oficial` | `API, posición y eventos` |
| `dir + opts.direction` | `ltr \| rtl` | `Patrón oficial` | `Soporte RTL` |
| `size` | `full \| large \| medium \| small` | `Extensión GRM` | `1, 2, 3 o 4 visibles` |

### Reglas de uso para wireframes

- Construir la instancia mediante **carousel-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Checkbox

Control de selección binaria o indeterminada, individual o contenido en una opción ampliada.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `checkbox` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación desde Figma y shadcn/ui |
| Figma | [nodo 1:41](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-checkbox--docs) |
| Registry | [checkbox.json](https://ds-grm-documentation.vercel.app/r/checkbox.json) |
| Implementación | `src/components/ui/checkbox.tsx` |
| Composición canónica | `src/components/ui/checkbox-example.tsx` |
| Stories | `src/components/ui/checkbox.stories.tsx` |
| Documentación | `src/components/ui/checkbox.mdx` |

### Cambios declarados en la versión del componente

- Conserva Root, Indicator, estado controlado/no controlado, indeterminate, teclado, disabled y ARIA del primitive oficial.
- Label, Description, Choice Card y Group son composiciones oficiales con Field.
- Adapta geometría, estados y tokens del nodo de Figma sin ampliar la API pública.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Checkbox` |
| Data slots | `checkbox`, `checkbox-indicator` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./checkbox`, `./field` |
| Secciones visibles en Docs | Versión → Patrones → Posición del texto → Estados → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type CheckboxExampleProps = {
  appearance?: "default" | "contained"
  text?: "label" | "description"
  textSide?: "left" | "right"
  state?: "default" | "error" | "disabled"
  checked?: boolean
  amount?: 1 | 2 | 3 | 4 | 5 | 6
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `appearance` | `default` |
| `text` | `label` |
| `textSide` | `right` |
| `state` | `default` |
| `checked` | `false` |
| `amount` | `1` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `appearance` | Presentación | Composición | Sí | inline-radio | `default`, `contained` | — |
| `text` | Texto | Composición | Sí | inline-radio | `label`, `description` | — |
| `textSide` | Posición del texto | Composición | Sí | inline-radio | `left`, `right` | — |
| `amount` | Opciones | Composición | Sí | range | — | — |
| `state` | Estado | Estado | Sí | inline-radio | `default`, `error`, `disabled` | — |
| `checked` | Seleccionado inicialmente | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-checkbox--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-checkbox--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **checkbox-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Collapsible

Muestra u oculta una región de contenido mediante un trigger accesible.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `collapsible` |
| Categoría | Disclosure |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1771:929](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1771-929) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-collapsible--docs) |
| Registry | [collapsible.json](https://ds-grm-documentation.vercel.app/r/collapsible.json) |
| Implementación | `src/components/ui/collapsible.tsx` |
| Composición canónica | `src/components/ui/collapsible-example.tsx` |
| Stories | `src/components/ui/collapsible.stories.tsx` |
| Documentación | `src/components/ui/collapsible.mdx` |

### Cambios declarados en la versión del componente

- Conserva sin modificaciones `Collapsible`, `CollapsibleTrigger` y `CollapsibleContent` del registro oficial de shadcn/ui sobre Radix.
- Añade los patrones FixedTrigger y ExpandableTrigger mediante composición pública.
- Mantiene estado, teclado, atributos `data-state` y semántica del primitive.
- Playground y Docs consumen `collapsibleExamplePresets` y la misma instancia `CollapsibleExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Collapsible`, `CollapsibleTrigger`, `CollapsibleContent` |
| Data slots | `collapsible`, `collapsible-trigger`, `collapsible-content` |
| Dependencias externas | `radix-ui`, `react`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./collapsible` |
| Secciones visibles en Docs | Versión → Patrones → Estados → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type CollapsibleExampleProps = {
  pattern?: "fixedTrigger" | "expandableTrigger"
  defaultOpen?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `c` |
| `13` | `o` |
| `14` | `l` |
| `15` | `l` |
| `16` | `a` |
| `17` | `p` |
| `18` | `s` |
| `19` | `i` |
| `20` | `b` |
| `21` | `l` |
| `22` | `e` |
| `23` | `E` |
| `24` | `x` |
| `25` | `a` |
| `26` | `m` |
| `27` | `p` |
| `28` | `l` |
| `29` | `e` |
| `30` | `P` |
| `31` | `r` |
| `32` | `e` |
| `33` | `s` |
| `34` | `e` |
| `35` | `t` |
| `36` | `s` |
| `37` | `.` |
| `38` | `p` |
| `39` | `l` |
| `40` | `a` |
| `41` | `y` |
| `42` | `g` |
| `43` | `r` |
| `44` | `o` |
| `45` | `u` |
| `46` | `n` |
| `47` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `pattern` | Patrón | Composición | Sí | inline-radio | `fixedTrigger`, `expandableTrigger` | — |
| `defaultOpen` | Iniciar expandido | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-collapsible--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-collapsible--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `collapsiblePlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `pattern` | `fixedTrigger` |
| `defaultOpen` | `false` |

#### `collapsibleExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"pattern":"fixedTrigger","defaultOpen":false}` |
| `fixedCollapsed` | `{"pattern":"fixedTrigger","defaultOpen":false}` |
| `fixedExpanded` | `{"pattern":"fixedTrigger","defaultOpen":true}` |
| `expandableCollapsed` | `{"pattern":"expandableTrigger","defaultOpen":false}` |
| `expandableExpanded` | `{"pattern":"expandableTrigger","defaultOpen":true}` |

### Especificaciones consolidadas desde Docs

#### Datos documentales: `behavior`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Estado` | `data-state` | `open / closed` | `Radix` |
| `Teclado` | `Enter / Space` | `Alterna el contenido` | `Radix` |
| `Focus` | `focus-visible:ring` | `--ring` | `shadcn/ui` |
| `Contenido` | `CollapsibleContent` | `Mount condicional` | `Radix` |

### Reglas de uso para wireframes

- Construir la instancia mediante **collapsible-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Combobox

Selección con búsqueda, grupos, limpieza, opción múltiple y popup según Base UI.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `combobox` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Base UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1:39](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-39) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-combobox--docs) |
| Registry | [combobox.json](https://ds-grm-documentation.vercel.app/r/combobox.json) |
| Implementación | `src/components/ui/combobox.tsx` |
| Composición canónica | `src/components/ui/combobox-example.tsx` |
| Stories | `src/components/ui/combobox.stories.tsx` |
| Documentación | `src/components/ui/combobox.mdx` |

### Cambios declarados en la versión del componente

- Conserva el primitive, la composición pública, el filtrado, el teclado y la accesibilidad oficiales de Combobox sobre Base UI.
- Incluye Simple, Clear Button, Groups, Multiple con Chips y Popup mediante la API pública de shadcn/ui.
- Los iconos se componen como hijos de `ComboboxItem`; no se añaden propiedades privadas al primitive.
- Playground y Docs consumen la misma matriz `comboboxExamplePresets`; Docs no recrea ni estiliza internamente el componente.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Combobox`, `ComboboxInput`, `ComboboxContent`, `ComboboxList`, `ComboboxItem`, `ComboboxGroup`, `ComboboxLabel`, `ComboboxCollection`, `ComboboxEmpty`, `ComboboxSeparator`, `ComboboxChips`, `ComboboxChip`, `ComboboxChipsInput`, `ComboboxTrigger`, `ComboboxValue`, `useComboboxAnchor` |
| Data slots | `combobox-value`, `combobox-trigger`, `combobox-clear`, `input-group-button`, `combobox-content`, `combobox-list`, `combobox-item`, `combobox-group`, `combobox-label`, `combobox-collection`, `combobox-empty`, `combobox-separator`, `combobox-chips`, `combobox-chip`, `combobox-chip-remove`, `combobox-chip-input` |
| Dependencias externas | `react`, `@base-ui/react`, `lucide-react` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base`, `@grm/input-group` |
| Composición interna del ejemplo | `./button`, `./combobox` |
| Secciones visibles en Docs | Versión → Composición → Estados → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ComboboxExampleProps = {
  type?: "simple" | "groups" | "multiple" | "popup"
  state?: "default" | "invalid" | "disabled"
  filled?: boolean
  initiallyOpen?: boolean
  showClear?: boolean
  autoHighlight?: boolean
  icons?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `c` |
| `13` | `o` |
| `14` | `m` |
| `15` | `b` |
| `16` | `o` |
| `17` | `b` |
| `18` | `o` |
| `19` | `x` |
| `20` | `E` |
| `21` | `x` |
| `22` | `a` |
| `23` | `m` |
| `24` | `p` |
| `25` | `l` |
| `26` | `e` |
| `27` | `P` |
| `28` | `r` |
| `29` | `e` |
| `30` | `s` |
| `31` | `e` |
| `32` | `t` |
| `33` | `s` |
| `34` | `.` |
| `35` | `p` |
| `36` | `l` |
| `37` | `a` |
| `38` | `y` |
| `39` | `g` |
| `40` | `r` |
| `41` | `o` |
| `42` | `u` |
| `43` | `n` |
| `44` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | Composición | Composición oficial | Sí | select | `simple`, `groups`, `multiple`, `popup` | — |
| `state` | Estado | API shadcn/ui | Sí | inline-radio | `default`, `invalid`, `disabled` | — |
| `filled` | Con valor | Muestra | Sí | boolean | — | Configura defaultValue en la composición. |
| `initiallyOpen` | Abierto inicialmente | API shadcn/ui | Sí | boolean | — | Configura defaultOpen. |
| `showClear` | Clear button | API shadcn/ui | Sí | boolean | — | Prop oficial de ComboboxInput. |
| `autoHighlight` | Auto highlight | API shadcn/ui | Sí | boolean | — | Resalta la primera coincidencia al filtrar. |
| `icons` | Iconos | Composición oficial | Sí | boolean | — | Compone iconos como hijos de ComboboxItem. |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-combobox--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-combobox--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `comboboxPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `type` | `simple` |
| `state` | `default` |
| `filled` | `false` |
| `initiallyOpen` | `false` |
| `showClear` | `false` |
| `autoHighlight` | `false` |
| `icons` | `false` |

#### `comboboxExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"type":"simple","state":"default","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `simple` | `{"type":"simple","state":"default","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `clear` | `{"type":"simple","state":"default","filled":true,"initiallyOpen":false,"showClear":true,"autoHighlight":false,"icons":false}` |
| `groups` | `{"type":"groups","state":"default","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `multiple` | `{"type":"multiple","state":"default","filled":true,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `popup` | `{"type":"popup","state":"default","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `placeholder` | `{"type":"simple","state":"default","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `filled` | `{"type":"simple","state":"default","filled":true,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `invalid` | `{"type":"simple","state":"invalid","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `disabled` | `{"type":"simple","state":"disabled","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":false}` |
| `autoHighlight` | `{"type":"simple","state":"default","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":true,"icons":false}` |
| `icons` | `{"type":"simple","state":"default","filled":false,"initiallyOpen":false,"showClear":false,"autoHighlight":false,"icons":true}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **combobox-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Context Menu

Menú contextual activado sobre un área de trigger mediante interacción secundaria.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `context-menu` |
| Categoría | Menu |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1675:339](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1675-339) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-context-menu--docs) |
| Registry | [context-menu.json](https://ds-grm-documentation.vercel.app/r/context-menu.json) |
| Implementación | `src/components/ui/context-menu.tsx` |
| Composición canónica | `src/components/ui/context-menu-example.tsx` |
| Stories | `src/components/ui/context-menu.stories.tsx` |
| Documentación | `src/components/ui/context-menu.mdx` |

### Cambios declarados en la versión del componente

- Apertura mediante clic derecho y navegación por teclado.
- Posicionamiento nativo desde el punto del clic derecho y manejo de colisiones por Radix UI.
- Labels, grupos, separadores, iconos, shortcuts, estados y submenús.
- Variante destructive conectada con tokens semánticos.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `ContextMenu`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut`, `ContextMenuGroup`, `ContextMenuPortal`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuRadioGroup` |
| Data slots | `context-menu`, `context-menu-trigger`, `context-menu-group`, `context-menu-portal`, `context-menu-sub`, `context-menu-radio-group`, `context-menu-content`, `context-menu-item`, `context-menu-sub-trigger`, `context-menu-sub-content`, `context-menu-checkbox-item`, `context-menu-radio-item`, `context-menu-label`, `context-menu-separator`, `context-menu-shortcut` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./context-menu` |
| Secciones visibles en Docs | Versión → Estado → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ContextMenuExampleProps = {
  opened?: boolean
  showLabel?: boolean
  showIcons?: boolean
  showShortcut?: boolean
  showSubmenu?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `opened` | `false` |
| `showLabel` | `true` |
| `showIcons` | `true` |
| `showShortcut` | `true` |
| `showSubmenu` | `true` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `opened` | Abierto inicialmente | Estado | Sí | boolean | — | — |
| `showLabel` | Mostrar label | Contenido | Sí | boolean | — | — |
| `showIcons` | Mostrar iconos | Contenido | Sí | boolean | — | — |
| `showShortcut` | Mostrar shortcut | Contenido | Sí | boolean | — | — |
| `showSubmenu` | Mostrar submenú | Contenido | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-context-menu--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-context-menu--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `states`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Default` | `--popover` | `--foreground` | `—` |
| `Hover / active` | `--accent` | `--accent-foreground` | `focus / data-open` |
| `Destructive` | `--popover` | `--destructive` | `variant=destructive` |
| `Destructive hover` | `--destructive / 10%` | `--destructive` | `focus` |
| `Disabled` | `—` | `--foreground` | `opacity-50` |

### Reglas de uso para wireframes

- Construir la instancia mediante **context-menu-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Data Table

Composición avanzada de Table con TanStack: sorting, filtros, visibilidad, selección y paginación.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `data-table` |
| Categoría | Data display |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2366:19504](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2366-19504) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-data-table--docs) |
| Registry | [data-table.json](https://ds-grm-documentation.vercel.app/r/data-table.json) |
| Implementación | `src/components/ui/data-table.tsx` |
| Composición canónica | `src/components/ui/data-table-example.tsx` |
| Stories | `src/components/ui/data-table.stories.tsx` |
| Documentación | `src/components/ui/data-table.mdx` |

### Cambios declarados en la versión del componente

- Composición oficial sobre el primitive `Table` existente y TanStack Table v9.
- Sorting, filtering, visibilidad, selección, paginación y acciones por fila.
- Patrones de selección, activación, identificador y detalle expandible.
- Acciones por fila mediante Dropdown o grupos directos de uno, dos y tres Icon Buttons.
- Estados loading, empty y error, además de soporte para estado remoto controlado.
- Toolbar configurable de Figma mediante slots de composición.
- Tokens y tipografía responden a la marca activa.
- Playground y Docs consumen la misma instancia `DataTableExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `DataTable`, `DataTableColumnHeader`, `DataTablePagination`, `DataTableViewOptions`, `DataTableInstance`, `DataTableProps` |
| Data slots | `data-table`, `data-table-toolbar`, `data-table-content`, `data-table-expanded-row`, `data-table-footer` |
| Dependencias externas | `react`, `@tanstack/react-table`, `lucide-react` |
| Dependencias Registry | `@grm/button`, `@grm/data-table-features`, `@grm/dropdown-menu`, `@grm/grm-base`, `@grm/skeleton`, `@grm/table` |
| Composición interna del ejemplo | `@/components/ui/button`, `@/components/ui/checkbox`, `@/components/ui/data-table`, `@/components/ui/data-table-features`, `@/components/ui/dropdown-menu`, `@/components/ui/input-group`, `@/components/ui/select`, `@/components/ui/switch`, `@/components/ui/table-cell-content` |
| Secciones visibles en Docs | Versión → Composición → Patrones → Estados de datos → Funciones → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type DataTableExampleProps = {
  toolbar?: "full" | "search" | "none"
  toolbarLayout?: "attached" | "separated"
  pagination?: boolean
  paginationLayout?: "attached" | "separated"
  pattern?: DataTablePattern
  rowActions?: DataTableRowActions
  striped?: boolean
  stripedRows?: "odd" | "even"
  pageSize?: 4 | 5 | 8
  status?: "ready" | "loading" | "empty" | "error"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `d` |
| `13` | `a` |
| `14` | `t` |
| `15` | `a` |
| `16` | `T` |
| `17` | `a` |
| `18` | `b` |
| `19` | `l` |
| `20` | `e` |
| `21` | `E` |
| `22` | `x` |
| `23` | `a` |
| `24` | `m` |
| `25` | `p` |
| `26` | `l` |
| `27` | `e` |
| `28` | `P` |
| `29` | `r` |
| `30` | `e` |
| `31` | `s` |
| `32` | `e` |
| `33` | `t` |
| `34` | `s` |
| `35` | `.` |
| `36` | `p` |
| `37` | `l` |
| `38` | `a` |
| `39` | `y` |
| `40` | `g` |
| `41` | `r` |
| `42` | `o` |
| `43` | `u` |
| `44` | `n` |
| `45` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `toolbar` | Toolbar | Composición | Sí | inline-radio | `full`, `search`, `none` | — |
| `toolbarLayout` | Disposición de filtros | Composición | Sí | inline-radio | `attached`, `separated` | — |
| `pagination` | Paginación | Composición | Sí | boolean | — | — |
| `paginationLayout` | Disposición de paginación | Composición | Sí | inline-radio | `attached`, `separated` | — |
| `pattern` | Patrón | Composición | Sí | select | `complete`, `checkbox`, `switch`, `identifier`, `expandable` | — |
| `rowActions` | Acciones por fila | Composición | Sí | select | `none`, `dropdown`, `one`, `two`, `three` | — |
| `striped` | Filas alternas | Apariencia | Sí | boolean | — | — |
| `stripedRows` | Alternar sobre | Apariencia | Sí | inline-radio | `odd`, `even` | — |
| `pageSize` | Filas por página | Paginación | Sí | inline-radio | `4`, `5`, `8` | — |
| `status` | Estado de datos | Estado | Sí | inline-radio | `ready`, `loading`, `empty`, `error` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-data-table--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-data-table--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `dataTableExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"toolbar":"full","toolbarLayout":"attached","pagination":true,"paginationLayout":"attached","pattern":"complete","rowActions":"dropdown","striped":false,"stripedRows":"odd","pageSize":5,"status":"ready"}` |
| `complete` | `{"toolbar":"full","toolbarLayout":"attached","pagination":true,"paginationLayout":"attached","pattern":"complete","rowActions":"dropdown","striped":false,"stripedRows":"odd","pageSize":5,"status":"ready"}` |
| `separated` | `{"toolbar":"full","toolbarLayout":"separated","pagination":true,"paginationLayout":"separated","pattern":"complete","rowActions":"dropdown","striped":false,"stripedRows":"odd","pageSize":5,"status":"ready"}` |
| `checkbox` | `{"toolbar":"none","toolbarLayout":"attached","pagination":false,"paginationLayout":"attached","pattern":"checkbox","rowActions":"three","striped":false,"stripedRows":"odd","pageSize":5,"status":"ready"}` |
| `switch` | `{"toolbar":"none","toolbarLayout":"attached","pagination":false,"paginationLayout":"attached","pattern":"switch","rowActions":"two","striped":true,"stripedRows":"odd","pageSize":5,"status":"ready"}` |
| `identifier` | `{"toolbar":"none","toolbarLayout":"attached","pagination":false,"paginationLayout":"attached","pattern":"identifier","rowActions":"one","striped":false,"stripedRows":"odd","pageSize":5,"status":"ready"}` |
| `expandable` | `{"toolbar":"none","toolbarLayout":"attached","pagination":false,"paginationLayout":"attached","pattern":"expandable","rowActions":"dropdown","striped":false,"stripedRows":"odd","pageSize":5,"status":"ready"}` |

### Especificaciones consolidadas desde Docs

#### Datos documentales: `patternCases`

| Valor 1 | Valor 2 |
| --- | --- |
| `Selección` | `checkbox` |
| `Activación` | `switch` |
| `Identificador` | `identifier` |
| `Detalle expandible` | `expandable` |

#### Datos documentales: `stateCases`

| Valor |
| --- |
| `loading` |
| `empty` |
| `error` |

#### Datos documentales: `featureRows`

| Valor 1 | Valor 2 | Valor 3 |
| --- | --- | --- |
| `Sorting` | `Encabezados Paciente, Estado y Próxima cita` | `rowSortingFeature` |
| `Filtering` | `Búsqueda por paciente y filtro de estado` | `columnFilteringFeature` |
| `Visibility` | `Selector Columnas` | `columnVisibilityFeature` |
| `Selection` | `Checkbox por fila y selección de página` | `rowSelectionFeature` |
| `Row actions` | `Dropdown o 1–3 Icon Buttons` | `TableCellBulkOptions` |
| `Pagination` | `Primera, anterior, siguiente y última página` | `rowPaginationFeature` |
| `Expansion` | `Chevron y panel de detalle por fila` | `rowExpandingFeature` |
| `Server state` | `Paginación, sorting y filtering controlados` | `tableOptions` |

#### Datos documentales: `specRows`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 | Valor 5 | Valor 6 |
| --- | --- | --- | --- | --- | --- |
| `Toolbar unido` | `62px mín.` | `12px` | `10px` | `--card / --border` | `Controles: 36px · --brand-font-sans · 14/20px` |
| `Toolbar separado` | `36px` | `0` | `10px` | `sin contenedor` | `Separación de tabla: 12px` |
| `Search / filtros` | `36px` | `Tailwind px-2` | `8px` | `--input / --border` | `InputGroup · Button · Select` |
| `Table header` | `36px` | `0 10px` | `10px` | `--muted / --muted-foreground` | `12/16px · 600 · uppercase · icono 12px` |
| `Table cell` | `49px mín.` | `8px 10px` | `10px` | `--card / --foreground` | `14px / 20px` |
| `Striped rows` | `49px mín.` | `8px 10px` | `—` | `--muted / 5%` | `stripedRows: odd \| even` |
| `Avatar cell` | `55px mín.` | `8px 10px` | `10px` | `--card / --foreground` | `Avatar 28px` |
| `Switch row` | `49px mín.` | `8px 10px` | `10px` | `--primary / --input` | `Activa por defecto · Off aplica opacity-30` |
| `Bulk actions` | `32px` | `0` | `6px` | `Button tokens` | `Dropdown o 1–3 Icon Buttons` |
| `Pagination unido` | `56px mín.` | `12px` | `4px` | `--card / --border` | `Botones 32px` |
| `Pagination separado` | `32px` | `0` | `4px` | `sin contenedor` | `Separación de tabla: 12px · botones 32px` |

### Reglas de uso para wireframes

- Construir la instancia mediante **data-table-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Date Picker

Composición de Button, Popover y Calendar para elegir fecha, rango o fecha y hora.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `date-picker` |
| Categoría | Form |
| Tipo | Composición / block |
| Base técnica detectada | Composición de componentes GRM |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1:35](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-35) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-date-picker--docs) |
| Registry | [date-picker.json](https://ds-grm-documentation.vercel.app/r/date-picker.json) |
| Implementación | Se resuelve en la composición de ejemplo |
| Composición canónica | `src/components/ui/date-picker-example.tsx` |
| Stories | `src/components/ui/date-picker.stories.tsx` |
| Documentación | `src/components/ui/date-picker.mdx` |

### Cambios declarados en la versión del componente

- Sigue el patrón oficial de composición `Popover + Calendar`; no crea un primitive Date Picker inexistente en shadcn/ui.
- Incluye Single, Range de dos meses y Date and time, más la configuración de disponibilidad ya soportada por Calendar.
- Conserva selección, navegación por teclado, foco, portales y atributos accesibles de los primitives oficiales.
- Playground y Docs consumen exclusivamente `datePickerExamplePresets` y la misma instancia `DatePickerExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | Composición sin primitive propio |
| Data slots | No detectados |
| Dependencias externas | `react`, `date-fns`, `date-fns/locale`, `lucide-react`, `react-day-picker`, `react-day-picker/locale` |
| Dependencias Registry | `@grm/button`, `@grm/calendar`, `@grm/grm-base`, `@grm/input-group`, `@grm/popover`, `@grm/separator` |
| Composición interna del ejemplo | `./button`, `./calendar`, `./input-group`, `./popover`, `./separator` |
| Secciones visibles en Docs | Versión → Composición → Estados y configuración → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type DatePickerExampleProps = {
  type?: "single" | "range" | "date-time"
  state?: "empty" | "filled"
  captionLayout?: "label" | "dropdown"
  initiallyOpen?: boolean
  showOutsideDays?: boolean
  availability?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `d` |
| `13` | `a` |
| `14` | `t` |
| `15` | `e` |
| `16` | `P` |
| `17` | `i` |
| `18` | `c` |
| `19` | `k` |
| `20` | `e` |
| `21` | `r` |
| `22` | `E` |
| `23` | `x` |
| `24` | `a` |
| `25` | `m` |
| `26` | `p` |
| `27` | `l` |
| `28` | `e` |
| `29` | `P` |
| `30` | `r` |
| `31` | `e` |
| `32` | `s` |
| `33` | `e` |
| `34` | `t` |
| `35` | `s` |
| `36` | `.` |
| `37` | `p` |
| `38` | `l` |
| `39` | `a` |
| `40` | `y` |
| `41` | `g` |
| `42` | `r` |
| `43` | `o` |
| `44` | `u` |
| `45` | `n` |
| `46` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | Tipo | Composición | Sí | inline-radio | `single`, `range`, `date-time` | — |
| `state` | Estado | Composición | Sí | inline-radio | `empty`, `filled` | — |
| `captionLayout` | Encabezado | Calendar | Sí | inline-radio | `label`, `dropdown` | Range conserva label en sus dos meses. |
| `initiallyOpen` | Abierto inicialmente | Popover | Sí | boolean | — | — |
| `showOutsideDays` | Días externos | Calendar | Sí | boolean | — | — |
| `availability` | Disponibilidad | Composición Figma | Sí | boolean | — | Compone modifiers y leyenda del Calendar GRM; no amplía su API. |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-date-picker--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-date-picker--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `datePickerPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `type` | `single` |
| `state` | `empty` |
| `captionLayout` | `label` |
| `initiallyOpen` | `false` |
| `showOutsideDays` | `true` |
| `availability` | `false` |

#### `datePickerExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"type":"single","state":"empty","captionLayout":"label","initiallyOpen":false,"showOutsideDays":true,"availability":false}` |
| `single` | `{"type":"single","state":"filled","captionLayout":"label","initiallyOpen":false,"showOutsideDays":true,"availability":false}` |
| `range` | `{"type":"range","state":"filled","captionLayout":"label","initiallyOpen":false,"showOutsideDays":true,"availability":false}` |
| `dateTime` | `{"type":"date-time","state":"filled","captionLayout":"label","initiallyOpen":false,"showOutsideDays":true,"availability":false}` |
| `availability` | `{"type":"single","state":"filled","captionLayout":"label","initiallyOpen":false,"showOutsideDays":true,"availability":true}` |
| `empty` | `{"type":"single","state":"empty","captionLayout":"label","initiallyOpen":false,"showOutsideDays":true,"availability":false}` |
| `filled` | `{"type":"single","state":"filled","captionLayout":"label","initiallyOpen":false,"showOutsideDays":true,"availability":false}` |
| `monthYear` | `{"type":"single","state":"filled","captionLayout":"dropdown","initiallyOpen":false,"showOutsideDays":true,"availability":false}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **date-picker-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Drawer

Panel flotante deslizable con posiciones, tamaños, nesting, non-modal y snap points.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `drawer` |
| Categoría | Overlay |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Base UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1290:302](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1290-302) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-drawer--docs) |
| Registry | [drawer.json](https://ds-grm-documentation.vercel.app/r/drawer.json) |
| Implementación | `src/components/ui/drawer.tsx` |
| Composición canónica | `src/components/ui/drawer-example.tsx` |
| Stories | `src/components/ui/drawer.stories.tsx` |
| Documentación | `src/components/ui/drawer.mdx` |

### Cambios declarados en la versión del componente

- Migra el primitive de Vaul a Base UI y conserva la composición, swipe, foco, cierre y accesibilidad oficiales de shadcn/ui.
- Sustituye `direction` por `swipeDirection` y `asChild` por `render`, según la API vigente.
- Adapta anchos laterales de 384/480 px, bottom de hasta 680 px y radio de 24 px.
- Añade inset flotante de 16 px y documenta Nested, Non-modal y Snap Points con composiciones reales.
- Mantiene acciones fijas mientras el cuerpo puede desplazarse y permite una o dos acciones según Figma.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Drawer`, `DrawerPortal`, `DrawerOverlay`, `DrawerSwipeHandle`, `DrawerTrigger`, `DrawerClose`, `DrawerContent`, `DrawerHeader`, `DrawerFooter`, `DrawerTitle`, `DrawerDescription` |
| Data slots | `drawer`, `drawer-trigger`, `drawer-portal`, `drawer-close`, `drawer-overlay`, `drawer-swipe-handle`, `drawer-viewport`, `drawer-popup`, `drawer-content`, `drawer-header`, `drawer-footer`, `drawer-title`, `drawer-description` |
| Dependencias externas | `react`, `@base-ui/react/drawer` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./drawer` |
| Secciones visibles en Docs | Versión → Posición → Ancho lateral → Acciones → Comportamientos oficiales → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type DrawerExampleProps = {
  behavior?: "standard" | "nested" | "non-modal" | "snap-points"
  swipeDirection?: "up" | "right" | "down" | "left"
  sideWidth?: 384 | 480
  buttonAmount?: 1 | 2
  showSwipeHandle?: boolean
  scrollable?: boolean
  inset?: 0 | 8 | 16
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `behavior` | `standard` |
| `swipeDirection` | `right` |
| `sideWidth` | `480` |
| `buttonAmount` | `2` |
| `showSwipeHandle` | `false` |
| `scrollable` | `false` |
| `inset` | `16` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `behavior` | Comportamiento | Composición | Sí | select | `standard`, `nested`, `non-modal`, `snap-points` | — |
| `swipeDirection` | Dirección de swipe | Disposición | Sí | inline-radio | `up`, `right`, `down`, `left` | — |
| `sideWidth` | Ancho lateral | Disposición | Sí | inline-radio | `384`, `480` | — |
| `buttonAmount` | Cantidad de botones | Acciones | Sí | inline-radio | `1`, `2` | — |
| `showSwipeHandle` | Swipe handle | Composición | Sí | boolean | — | — |
| `scrollable` | Contenido desplazable | Contenido | Sí | boolean | — | — |
| `inset` | Inset flotante | Disposición | Sí | inline-radio | `0`, `8`, `16` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-drawer--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-drawer--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **drawer-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Dropdown Menu

Menú de acciones y opciones con grupos, checks, radios, submenús y shortcuts.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `dropdown-menu` |
| Categoría | Menu |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1521:4708](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1521-4708) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-dropdown-menu--docs) |
| Registry | [dropdown-menu.json](https://ds-grm-documentation.vercel.app/r/dropdown-menu.json) |
| Implementación | `src/components/ui/dropdown-menu.tsx` |
| Composición canónica | `src/components/ui/dropdown-menu-example.tsx` |
| Stories | `src/components/ui/dropdown-menu.stories.tsx` |
| Documentación | `src/components/ui/dropdown-menu.mdx` |

### Cambios declarados en la versión del componente

- Trigger Button o Icon Button.
- Alineación `start` y `end` con offset vertical de 4 px.
- Labels, grupos, separadores, estados, iconos y submenús.
- Navegación por teclado, foco y semántica conservados desde Radix UI.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `DropdownMenu`, `DropdownMenuPortal`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuGroup`, `DropdownMenuLabel`, `DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioGroup`, `DropdownMenuRadioItem`, `DropdownMenuSeparator`, `DropdownMenuShortcut`, `DropdownMenuSub`, `DropdownMenuSubTrigger`, `DropdownMenuSubContent` |
| Data slots | `dropdown-menu`, `dropdown-menu-portal`, `dropdown-menu-trigger`, `dropdown-menu-content`, `dropdown-menu-group`, `dropdown-menu-item`, `dropdown-menu-checkbox-item`, `dropdown-menu-checkbox-item-indicator`, `dropdown-menu-radio-group`, `dropdown-menu-radio-item`, `dropdown-menu-radio-item-indicator`, `dropdown-menu-label`, `dropdown-menu-separator`, `dropdown-menu-shortcut`, `dropdown-menu-sub`, `dropdown-menu-sub-trigger`, `dropdown-menu-sub-content` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./dropdown-menu` |
| Secciones visibles en Docs | Versión → Trigger → Alineación → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type DropdownMenuExampleProps = {
  align?: "start" | "end"
  trigger?: "button" | "icon"
  defaultOpen?: boolean
  showLabel?: boolean
  showIcons?: boolean
  showSubmenu?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `align` | `start` |
| `trigger` | `button` |
| `defaultOpen` | `false` |
| `showLabel` | `true` |
| `showIcons` | `true` |
| `showSubmenu` | `true` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `trigger` | Trigger | Estructura | Sí | inline-radio | `button`, `icon` | — |
| `align` | Alineación | Posición | Sí | inline-radio | `start`, `end` | — |
| `defaultOpen` | Abierto inicialmente | Estado | Sí | boolean | — | — |
| `showLabel` | Mostrar label | Contenido | Sí | boolean | — | — |
| `showIcons` | Mostrar iconos | Contenido | Sí | boolean | — | — |
| `showSubmenu` | Mostrar submenú | Contenido | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-dropdown-menu--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-dropdown-menu--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `states`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Default` | `--popover` | `--foreground` | `—` |
| `Hover / focus` | `--accent` | `--accent-foreground` | `focus` |
| `Active / submenu` | `--accent` | `--accent-foreground` | `data-open` |
| `Disabled` | `—` | `--foreground` | `opacity-50` |
| `Destructive` | `—` | `--destructive` | `variant=destructive` |

### Reglas de uso para wireframes

- Construir la instancia mediante **dropdown-menu-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Empty

Estado vacío con media, título, descripción y acciones opcionales.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `empty` |
| Categoría | Feedback |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2173:21188](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2173-21188) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-empty--docs) |
| Registry | [empty.json](https://ds-grm-documentation.vercel.app/r/empty.json) |
| Implementación | `src/components/ui/empty.tsx` |
| Composición canónica | `src/components/ui/empty-example.tsx` |
| Stories | `src/components/ui/empty.stories.tsx` |
| Documentación | `src/components/ui/empty.mdx` |

### Cambios declarados en la versión del componente

- API oficial: `Empty`, `EmptyHeader`, `EmptyMedia`, `EmptyTitle`, `EmptyDescription` y `EmptyContent`.
- Contenedor, medios y acciones se construyen por composición, sin ampliar artificialmente la API del primitive.
- Tipografía, color y espaciado responden a los tokens de la marca activa.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Empty`, `EmptyHeader`, `EmptyTitle`, `EmptyDescription`, `EmptyContent`, `EmptyMedia` |
| Data slots | `empty`, `empty-header`, `empty-icon`, `empty-title`, `empty-description`, `empty-content` |
| Dependencias externas | `class-variance-authority`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./avatar`, `./button`, `./empty`, `./spinner` |
| Secciones visibles en Docs | Versión → Contenedor → Media → Acciones → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type EmptyExampleProps = {
  container?: "none" | "outline"
  media?: "icon" | "avatar" | "spinner" | "none"
  actions?: "both" | "primary" | "none"
  actionLayout?: "horizontal" | "vertical"
  showAuxiliary?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `container` | `none` |
| `media` | `icon` |
| `actions` | `both` |
| `actionLayout` | `horizontal` |
| `showAuxiliary` | `true` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `container` | Contenedor | Apariencia | Sí | inline-radio | `none`, `outline` | — |
| `media` | Media | Contenido | Sí | inline-radio | `icon`, `avatar`, `spinner`, `none` | — |
| `actions` | Acciones | Contenido | Sí | inline-radio | `both`, `primary`, `none` | — |
| `actionLayout` | Disposición | Composición | Sí | inline-radio | `horizontal`, `vertical` | — |
| `showAuxiliary` | Acción auxiliar | Contenido | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-empty--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-empty--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **empty-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Field

Estructura de formulario que asocia label, descripción, control, errores y agrupaciones.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `field` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 553:2675](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=553-2675) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-field--docs) |
| Registry | [field.json](https://ds-grm-documentation.vercel.app/r/field.json) |
| Implementación | `src/components/ui/field.tsx` |
| Composición canónica | `src/components/ui/field-example.tsx` |
| Stories | `src/components/ui/field.stories.tsx` |
| Documentación | `src/components/ui/field.mdx` |

### Cambios declarados en la versión del componente

- Conserva todos los subcomponentes, orientaciones, estados y semántica de Field oficial.
- Compone controles públicos reales; Field no duplica Input, Checkbox, Select ni otros primitives.
- Traduce las matrices de Figma a estados `data-invalid`, `data-disabled` y atributos accesibles.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Field`, `FieldLabel`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLegend`, `FieldSeparator`, `FieldSet`, `FieldContent`, `FieldTitle` |
| Data slots | `field-set`, `field-legend`, `field-group`, `field`, `field-content`, `field-label`, `field-description`, `field-separator`, `field-separator-content`, `field-error` |
| Dependencias externas | `react`, `class-variance-authority` |
| Dependencias Registry | `@grm/grm-base`, `@grm/label`, `@grm/separator` |
| Composición interna del ejemplo | `./checkbox`, `./field`, `./input`, `./input-otp`, `./native-select`, `./radio-group`, `./select`, `./slider`, `./switch`, `./textarea` |
| Secciones visibles en Docs | Versión → Controles → Estados → Distribución → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type FieldControl = "input" | "time" | "textarea" | "checkbox" | "radio" | "switch" | "native-select" | "select" | "otp" | "slider" | "group"
```

```ts
export type FieldExampleProps = {
  control?: FieldControl
  status?: "default" | "invalid" | "disabled"
  description?: "none" | "before" | "after"
  required?: boolean
  orientation?: "vertical" | "horizontal" | "responsive"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `control` | `input` |
| `status` | `default` |
| `description` | `after` |
| `required` | `false` |
| `orientation` | `vertical` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `control` | Control | Composición | Sí | select | `input`, `time`, `textarea`, `checkbox`, `radio`, `switch`, `native-select`, `select`, `otp`, `slider`, `group` | — |
| `status` | Estado | Estado | Sí | inline-radio | `default`, `invalid`, `disabled` | — |
| `description` | Descripción | Contenido | Sí | inline-radio | `none`, `before`, `after` | — |
| `required` | Requerido | Estado | Sí | boolean | — | — |
| `orientation` | Orientación | Layout | Sí | inline-radio | `vertical`, `horizontal`, `responsive` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-field--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-field--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `layout`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Field` | `gap-2` | `8px` | `Oficial shadcn/ui` |
| `FieldGroup` | `gap-5` | `20px` | `Oficial shadcn/ui` |
| `FieldSet` | `gap-4` | `16px` | `Oficial shadcn/ui` |
| `FieldContent` | `gap-0.5` | `2px` | `Oficial shadcn/ui` |
| `FieldDescription` | `text-sm / leading-normal` | `14px / normal` | `--muted-foreground` |
| `FieldError` | `text-sm / font-normal` | `14px / 400` | `--destructive` |

#### Datos documentales: `states`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Invalid` | `data-invalid=true` | `aria-invalid=true` | `Texto y control destructivos` |
| `Disabled` | `data-disabled=true` | `disabled` | `Opacidad y bloqueo del control` |
| `Required` | `—` | `required` | `Validación nativa` |

### Reglas de uso para wireframes

- Construir la instancia mediante **field-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Hover Card

Contenido contextual enriquecido que aparece al mantener hover o foco sobre un trigger.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `hover-card` |
| Categoría | Overlay |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1650:2013](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1650-2013) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-hover-card--docs) |
| Registry | [hover-card.json](https://ds-grm-documentation.vercel.app/r/hover-card.json) |
| Implementación | `src/components/ui/hover-card.tsx` |
| Composición canónica | `src/components/ui/hover-card-example.tsx` |
| Stories | `src/components/ui/hover-card.stories.tsx` |
| Documentación | `src/components/ui/hover-card.mdx` |

### Cambios declarados en la versión del componente

- Conserva Root, Trigger, Content, Portal, delays, colisiones y navegación accesible de Radix/shadcn.
- Adapta la superficie de Figma de 276 × 104 px con tokens semánticos y tipografía por marca.
- Resuelve Button y texto mediante `asChild`, sin ampliar artificialmente la API pública.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `HoverCard`, `HoverCardTrigger`, `HoverCardContent` |
| Data slots | `hover-card`, `hover-card-trigger`, `hover-card-portal`, `hover-card-content` |
| Dependencias externas | `react`, `radix-ui` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./hover-card` |
| Secciones visibles en Docs | Versión → Variantes de trigger → Posición → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type HoverCardExampleProps = {
  triggerType?: "button" | "text"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  opened?: boolean
  openDelay?: number
  closeDelay?: number
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `triggerType` | `button` |
| `side` | `top` |
| `align` | `center` |
| `opened` | `false` |
| `openDelay` | `700` |
| `closeDelay` | `300` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `triggerType` | Trigger | Composición | Sí | inline-radio | `button`, `text` | — |
| `side` | Lado | Posición | Sí | inline-radio | `top`, `right`, `bottom`, `left` | — |
| `align` | Alineación | Posición | Sí | inline-radio | `start`, `center`, `end` | — |
| `opened` | Abierto | Estado | Sí | boolean | — | — |
| `openDelay` | Demora de apertura | Comportamiento | Sí | number | — | — |
| `closeDelay` | Demora de cierre | Comportamiento | Sí | number | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-hover-card--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-hover-card--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **hover-card-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Input

Entrada de texto basada en shadcn/ui, con estados y composición lateral mediante Input Group.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `input` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1:34](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-34) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-input--docs) |
| Registry | [input.json](https://ds-grm-documentation.vercel.app/r/input.json) |
| Implementación | `src/components/ui/input.tsx` |
| Composición canónica | `src/components/ui/input-example.tsx` |
| Stories | `src/components/ui/input.stories.tsx` |
| Documentación | `src/components/ui/input.mdx` |

### Cambios declarados en la versión del componente

- Mantiene `Input` como elemento HTML nativo y conserva su API oficial.
- Conserva geometría, tipografía y estados del registry oficial `radix-nova`; Figma funciona como referencia de uso.
- El contenido lateral se compone con `InputGroup`; no añade propiedades privadas a Input.
- Los controles de estado y contenido pertenecen a `InputExample` y se traducen a props nativas o composición pública.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Input` |
| Data slots | `input` |
| Dependencias externas | `react`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./input`, `./input-group`, `./spinner` |
| Secciones visibles en Docs | Versión → Estados → Tipos nativos → Contenido adicional → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type InputState = "default" | "focused" | "invalid" | "disabled"
```

```ts
export type InputContent = "none" | "icon" | "text" | "button" | "spinner"
```

```ts
export type InputExampleProps = {
  type?: "text" | "email" | "password" | "tel" | "url" | "search" | "number" | "date" | "time" | "file"
  state?: InputState
  leftContent?: InputContent
  rightContent?: InputContent
  placeholder?: string
  filled?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `type` | `text` |
| `state` | `default` |
| `leftContent` | `none` |
| `rightContent` | `none` |
| `placeholder` | `Placeholder text` |
| `filled` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | Tipo nativo | Props nativas | Sí | select | `text`, `email`, `password`, `tel`, `url`, `search`, `number`, `date`, `time`, `file` | — |
| `placeholder` | Placeholder | Contenido | Sí | text | — | — |
| `filled` | Con valor | Configuración de muestra | Sí | boolean | — | Configura defaultValue en la muestra. |
| `state` | Estado | Configuración de muestra | Sí | inline-radio | `default`, `focused`, `invalid`, `disabled` | Traduce el estado a autoFocus, aria-invalid o disabled. |
| `leftContent` | Contenido izquierdo | Input Group | Sí | select | `none`, `icon`, `text`, `button`, `spinner` | Composición mediante InputGroupAddon; no es una prop de Input. |
| `rightContent` | Contenido derecho | Input Group | Sí | select | `none`, `icon`, `text`, `button`, `spinner` | Composición mediante InputGroupAddon; no es una prop de Input. |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-input--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-input--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `states`

| Valor 1 | Valor 2 |
| --- | --- |
| `default` | `Default` |
| `focused` | `Focused` |
| `invalid` | `Invalid` |
| `disabled` | `Disabled` |

#### Datos documentales: `types`

| Valor |
| --- |
| `text` |
| `email` |
| `password` |
| `tel` |
| `url` |
| `search` |
| `number` |
| `date` |
| `time` |
| `file` |

#### Datos documentales: `content`

| Valor 1 | Valor 2 |
| --- | --- |
| `icon` | `Icon` |
| `text` | `Text` |
| `button` | `Button` |
| `spinner` | `Spinner` |

### Reglas de uso para wireframes

- Construir la instancia mediante **input-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Input OTP

Entrada accesible para códigos segmentados con agrupación, separadores y estados.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `input-otp` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 561:4282](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=561-4282) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-input-otp--docs) |
| Registry | [input-otp.json](https://ds-grm-documentation.vercel.app/r/input-otp.json) |
| Implementación | `src/components/ui/input-otp.tsx` |
| Composición canónica | `src/components/ui/input-otp-example.tsx` |
| Stories | `src/components/ui/input-otp.stories.tsx` |
| Documentación | `src/components/ui/input-otp.mdx` |

### Cambios declarados en la versión del componente

- Conserva la composición oficial de shadcn/ui sobre `input-otp` y `OTPInputContext`.
- Mantiene entrada real, caret, foco, teclado, paste, patrón, disabled y semántica ARIA.
- Adapta los slots a la escala de 36 px y tokens de las cuatro marcas definidos en Figma.
- Cantidad, separadores, estado y progreso pertenecen exclusivamente a `InputOTPExample`; Error propaga `aria-invalid` a la entrada y sus slots para mantener una señal visual inequívoca.
- Playground y Docs renderizan la misma composición compartida.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `InputOTP`, `InputOTPGroup`, `InputOTPSlot`, `InputOTPSeparator` |
| Data slots | `input-otp`, `input-otp-group`, `input-otp-slot`, `input-otp-separator` |
| Dependencias externas | `react`, `input-otp`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./input-otp` |
| Secciones visibles en Docs | Versión → Estilo → Cantidad y distribución → Estados → Progreso → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type InputOTPExampleProps = {
  slotAmount?: 4 | 5 | 6
  style?: "default" | "separator"
  separatorPattern?: "balanced" | "pairs"
  status?: "default" | "error" | "disabled"
  step?: "empty" | "selected" | "1" | "2" | "3" | "4" | "5" | "6" | "filled"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `i` |
| `13` | `n` |
| `14` | `p` |
| `15` | `u` |
| `16` | `t` |
| `17` | `O` |
| `18` | `T` |
| `19` | `P` |
| `20` | `E` |
| `21` | `x` |
| `22` | `a` |
| `23` | `m` |
| `24` | `p` |
| `25` | `l` |
| `26` | `e` |
| `27` | `P` |
| `28` | `r` |
| `29` | `e` |
| `30` | `s` |
| `31` | `e` |
| `32` | `t` |
| `33` | `s` |
| `34` | `.` |
| `35` | `p` |
| `36` | `l` |
| `37` | `a` |
| `38` | `y` |
| `39` | `g` |
| `40` | `r` |
| `41` | `o` |
| `42` | `u` |
| `43` | `n` |
| `44` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `slotAmount` | Slots | Composición | Sí | inline-radio | `4`, `5`, `6` | — |
| `style` | Estilo | Composición | Sí | inline-radio | `default`, `separator` | — |
| `separatorPattern` | Distribución | Composición | Sí | inline-radio | `balanced`, `pairs` | — |
| `status` | Estado | Input OTP | Sí | inline-radio | `default`, `error`, `disabled` | — |
| `step` | Progreso | Composición | Sí | select | `empty`, `selected`, `1`, `2`, `3`, `4`, `5`, `6`, `filled` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-input-otp--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-input-otp--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `inputOTPPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `slotAmount` | `4` |
| `style` | `default` |
| `separatorPattern` | `balanced` |
| `status` | `default` |
| `step` | `empty` |

#### `inputOTPExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"default","step":"empty"}` |
| `default` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"default","step":"empty"}` |
| `separator` | `{"slotAmount":4,"style":"separator","separatorPattern":"balanced","status":"default","step":"empty"}` |
| `four` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"default","step":"empty"}` |
| `five` | `{"slotAmount":5,"style":"default","separatorPattern":"balanced","status":"default","step":"empty"}` |
| `six` | `{"slotAmount":6,"style":"default","separatorPattern":"balanced","status":"default","step":"empty"}` |
| `pairs` | `{"slotAmount":6,"style":"separator","separatorPattern":"pairs","status":"default","step":"empty"}` |
| `error` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"error","step":"empty"}` |
| `disabled` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"disabled","step":"empty"}` |
| `empty` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"default","step":"empty"}` |
| `selected` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"default","step":"selected"}` |
| `partial` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"default","step":"3"}` |
| `filled` | `{"slotAmount":4,"style":"default","separatorPattern":"balanced","status":"default","step":"filled"}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **input-otp-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Item

Unidad de contenido reutilizable con media, cuerpo, acciones, header y footer.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `item` |
| Categoría | Data display |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Base UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2190:1413](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2190-1413) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-item--docs) |
| Registry | [item.json](https://ds-grm-documentation.vercel.app/r/item.json) |
| Implementación | `src/components/ui/item.tsx` |
| Composición canónica | `src/components/ui/item-example.tsx` |
| Stories | `src/components/ui/item.stories.tsx` |
| Documentación | `src/components/ui/item.mdx` |

### Cambios declarados en la versión del componente

- Conserva sin modificaciones el primitive Base UI y la API pública oficial de Item de shadcn/ui.
- Conserva las variantes, tamaños y composiciones oficiales relevantes: Icon, Avatar, Image, Group, Header, Link y Dropdown.
- Traduce por composición las apariencias, contenidos laterales, layouts y agrupaciones de Figma.
- Reutiliza Button y Avatar públicos; no agrega propiedades privadas al primitive.
- Playground y Docs consumen `itemExamplePresets` y la misma instancia `ItemExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Item`, `ItemMedia`, `ItemContent`, `ItemActions`, `ItemGroup`, `ItemSeparator`, `ItemTitle`, `ItemDescription`, `ItemHeader`, `ItemFooter` |
| Data slots | `item-group`, `item-separator`, `item-media`, `item-content`, `item-title`, `item-description`, `item-actions`, `item-header`, `item-footer` |
| Dependencias externas | `react`, `@base-ui/react/merge-props`, `@base-ui/react/use-render`, `class-variance-authority`, `lucide-react`, `next/image` |
| Dependencias Registry | `@grm/grm-base`, `@grm/separator` |
| Composición interna del ejemplo | `./avatar`, `./button`, `./dropdown-menu`, `./item` |
| Secciones visibles en Docs | Versión → Variantes de estilo → Contenido y composición → Escala y forma → Item Group → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ItemExampleProps = {
  composition?: "single" | "list" | "grid"
  pattern?: "basic" | "group" | "header" | "link" | "dropdown"
  appearance?: "default" | "outline" | "muted"
  size?: "default" | "sm" | "xs"
  layout?: "default" | "compact" | "stacked"
  leading?: "none" | "icon" | "avatar" | "avatarGroup" | "image"
  trailing?: "none" | "button" | "icon" | "iconButton" | "time"
  description?: boolean
  itemCount?: 2 | 3 | 4 | 5
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `i` |
| `13` | `t` |
| `14` | `e` |
| `15` | `m` |
| `16` | `E` |
| `17` | `x` |
| `18` | `a` |
| `19` | `m` |
| `20` | `p` |
| `21` | `l` |
| `22` | `e` |
| `23` | `P` |
| `24` | `r` |
| `25` | `e` |
| `26` | `s` |
| `27` | `e` |
| `28` | `t` |
| `29` | `s` |
| `30` | `.` |
| `31` | `p` |
| `32` | `l` |
| `33` | `a` |
| `34` | `y` |
| `35` | `g` |
| `36` | `r` |
| `37` | `o` |
| `38` | `u` |
| `39` | `n` |
| `40` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `composition` | Composición | Composición | Sí | inline-radio | `single`, `list`, `grid` | — |
| `pattern` | Patrón | Composición | Sí | select | `basic`, `group`, `header`, `link`, `dropdown` | — |
| `appearance` | Apariencia | Item | Sí | inline-radio | `default`, `outline`, `muted` | — |
| `size` | Tamaño oficial | Item | Sí | inline-radio | `default`, `sm`, `xs` | — |
| `layout` | Layout | Item | Sí | inline-radio | `default`, `compact`, `stacked` | — |
| `leading` | Contenido inicial | Contenido | Sí | select | `none`, `icon`, `avatar`, `avatarGroup`, `image` | — |
| `trailing` | Contenido final | Contenido | Sí | select | `none`, `button`, `icon`, `iconButton`, `time` | — |
| `description` | Descripción | Contenido | Sí | boolean | — | — |
| `itemCount` | Cantidad | Grupo | Sí | inline-radio | `2`, `3`, `4`, `5` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-item--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-item--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `itemPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `composition` | `single` |
| `pattern` | `basic` |
| `appearance` | `default` |
| `size` | `default` |
| `layout` | `default` |
| `leading` | `icon` |
| `trailing` | `button` |
| `description` | `true` |
| `itemCount` | `2` |

#### `itemExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"composition":"single","pattern":"basic","appearance":"default","size":"default","layout":"default","leading":"icon","trailing":"button","description":true,"itemCount":2}` |
| `default` | `{"composition":"single","pattern":"basic","appearance":"default","size":"default","layout":"default","leading":"icon","trailing":"button","description":true,"itemCount":2}` |
| `outline` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"icon","trailing":"button","description":true,"itemCount":2}` |
| `muted` | `{"composition":"single","pattern":"basic","appearance":"muted","size":"default","layout":"default","leading":"icon","trailing":"button","description":true,"itemCount":2}` |
| `sizeDefault` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"image","trailing":"icon","description":false,"itemCount":2}` |
| `sizeSm` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"sm","layout":"default","leading":"image","trailing":"icon","description":false,"itemCount":2}` |
| `sizeXs` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"xs","layout":"default","leading":"image","trailing":"icon","description":false,"itemCount":2}` |
| `icon` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"icon","trailing":"button","description":true,"itemCount":2}` |
| `avatar` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"avatar","trailing":"none","description":true,"itemCount":2}` |
| `image` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"image","trailing":"time","description":true,"itemCount":2}` |
| `group` | `{"composition":"single","pattern":"group","appearance":"default","size":"default","layout":"default","leading":"none","trailing":"none","description":true,"itemCount":3}` |
| `header` | `{"composition":"single","pattern":"header","appearance":"outline","size":"default","layout":"default","leading":"none","trailing":"none","description":true,"itemCount":2}` |
| `link` | `{"composition":"single","pattern":"link","appearance":"outline","size":"default","layout":"default","leading":"icon","trailing":"icon","description":true,"itemCount":2}` |
| `dropdown` | `{"composition":"single","pattern":"dropdown","appearance":"default","size":"sm","layout":"default","leading":"none","trailing":"none","description":false,"itemCount":2}` |
| `iconIcon` | `{"composition":"single","pattern":"basic","appearance":"default","size":"default","layout":"default","leading":"icon","trailing":"icon","description":true,"itemCount":2}` |
| `avatarAction` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"avatar","trailing":"iconButton","description":true,"itemCount":2}` |
| `avatarGroup` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"avatarGroup","trailing":"button","description":true,"itemCount":2}` |
| `time` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"none","trailing":"time","description":true,"itemCount":2}` |
| `withoutDescription` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"icon","trailing":"icon","description":false,"itemCount":2}` |
| `compact` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"compact","leading":"icon","trailing":"icon","description":true,"itemCount":2}` |
| `stacked` | `{"composition":"single","pattern":"basic","appearance":"outline","size":"default","layout":"stacked","leading":"none","trailing":"none","description":true,"itemCount":2}` |
| `list` | `{"composition":"list","pattern":"basic","appearance":"outline","size":"default","layout":"default","leading":"icon","trailing":"button","description":true,"itemCount":2}` |
| `grid` | `{"composition":"grid","pattern":"basic","appearance":"outline","size":"default","layout":"stacked","leading":"none","trailing":"none","description":true,"itemCount":2}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **item-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Kbd

Representación compacta de teclas o atajos de teclado.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `kbd` |
| Categoría | Data display |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2793:2325](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2793-2325) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-kbd--docs) |
| Registry | [kbd.json](https://ds-grm-documentation.vercel.app/r/kbd.json) |
| Implementación | `src/components/ui/kbd.tsx` |
| Composición canónica | `src/components/ui/kbd-example.tsx` |
| Stories | `src/components/ui/kbd.stories.tsx` |
| Documentación | `src/components/ui/kbd.mdx` |

### Cambios declarados en la versión del componente

- Conserva sin extensiones la API oficial `Kbd` y `KbdGroup` de shadcn/ui.
- Texto, icono y grupos se expresan mediante `children`; no se añaden props privadas de contenido o estilo.
- El aspecto oscuro se obtiene únicamente por contexto real de `TooltipContent`.
- Incluye las composiciones oficiales con Button, Tooltip e Input Group.
- Playground y Docs consumen la misma matriz `kbdExamplePresets` y la instancia `KbdExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Kbd`, `KbdGroup` |
| Data slots | `kbd`, `kbd-group` |
| Dependencias externas | `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./input-group`, `./kbd`, `./tooltip` |
| Secciones visibles en Docs | Versión → Contenido y agrupación → Composiciones oficiales → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type KbdExampleProps = {
  composition?: "single" | "group" | "button" | "tooltip" | "input-group"
  content?: "text" | "icon"
  text?: string
  tooltipOpen?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `k` |
| `13` | `b` |
| `14` | `d` |
| `15` | `E` |
| `16` | `x` |
| `17` | `a` |
| `18` | `m` |
| `19` | `p` |
| `20` | `l` |
| `21` | `e` |
| `22` | `P` |
| `23` | `r` |
| `24` | `e` |
| `25` | `s` |
| `26` | `e` |
| `27` | `t` |
| `28` | `s` |
| `29` | `.` |
| `30` | `p` |
| `31` | `l` |
| `32` | `a` |
| `33` | `y` |
| `34` | `g` |
| `35` | `r` |
| `36` | `o` |
| `37` | `u` |
| `38` | `n` |
| `39` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `composition` | Composición | Composición oficial | Sí | select | `single`, `group`, `button`, `tooltip`, `input-group` | — |
| `content` | Contenido | Children | Sí | inline-radio | `text`, `icon` | Se expresa mediante children; no es una prop de Kbd. |
| `text` | Texto | Children | Sí | text | — | — |
| `tooltipOpen` | Tooltip abierto | Composición Tooltip | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-kbd--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-kbd--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `kbdPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `composition` | `single` |
| `content` | `text` |
| `text` | `Ctrl` |
| `tooltipOpen` | `false` |

#### `kbdExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"composition":"single","content":"text","text":"Ctrl","tooltipOpen":false}` |
| `text` | `{"composition":"single","content":"text","text":"Ctrl","tooltipOpen":false}` |
| `icon` | `{"composition":"single","content":"icon","text":"Ctrl","tooltipOpen":false}` |
| `group` | `{"composition":"group","content":"text","text":"Ctrl","tooltipOpen":false}` |
| `button` | `{"composition":"button","content":"text","text":"Ctrl","tooltipOpen":false}` |
| `tooltip` | `{"composition":"tooltip","content":"text","text":"Ctrl","tooltipOpen":true}` |
| `inputGroup` | `{"composition":"input-group","content":"text","text":"Ctrl","tooltipOpen":false}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **kbd-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Label

Etiqueta accesible asociada a controles de formulario.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `label` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.1` — Alineación estricta con shadcn/ui |
| Figma | [nodo 1:38](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-38) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-label--docs) |
| Registry | [label.json](https://ds-grm-documentation.vercel.app/r/label.json) |
| Implementación | `src/components/ui/label.tsx` |
| Composición canónica | `src/components/ui/label-example.tsx` |
| Stories | `src/components/ui/label.stories.tsx` |
| Documentación | `src/components/ui/label.mdx` |

### Cambios declarados en la versión del componente

- Conserva el primitive oficial como un elemento HTML `label` sin variantes propias.
- Compone Label con Field, Input, Checkbox y Textarea siguiendo los ejemplos oficiales.
- Disabled, invalid y required pertenecen al control y a Field; no amplían la API de Label.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Label` |
| Data slots | `label` |
| Dependencias externas | `react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./checkbox`, `./field`, `./input`, `./label`, `./textarea` |
| Secciones visibles en Docs | Versión → Composición → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type LabelExampleProps = {
  control?: "input" | "checkbox" | "textarea"
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  text?: string
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `control` | `input` |
| `disabled` | `false` |
| `invalid` | `false` |
| `required` | `false` |
| `text` | `Nombre de usuario` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `control` | Control | Composición | Sí | inline-radio | `input`, `checkbox`, `textarea` | — |
| `text` | Texto | Contenido | Sí | text | — | — |
| `disabled` | Deshabilitado | Estado del control | Sí | boolean | — | — |
| `invalid` | Inválido | Estado del control | Sí | boolean | — | — |
| `required` | Requerido | Estado del control | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-label--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-label--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `states`

| Valor 1 | Valor 2 | Valor 3 |
| --- | --- | --- |
| `Disabled` | `Field[data-disabled] + control[disabled]` | `opacity-50 · pointer-events-none` |
| `Invalid` | `Field[data-invalid] + aria-invalid` | `text-destructive + FieldError` |
| `Required` | `control[required]` | `Indicador compuesto en children` |

### Reglas de uso para wireframes

- Construir la instancia mediante **label-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Menubar

Barra persistente de menús con items, checks, radios, submenús y shortcuts.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `menubar` |
| Categoría | Navigation |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2938:11449](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2938-11449) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-menubar--docs) |
| Registry | [menubar.json](https://ds-grm-documentation.vercel.app/r/menubar.json) |
| Implementación | `src/components/ui/menubar.tsx` |
| Composición canónica | `src/components/ui/menubar-example.tsx` |
| Stories | `src/components/ui/menubar.stories.tsx` |
| Documentación | `src/components/ui/menubar.mdx` |

### Cambios declarados en la versión del componente

- Conserva el primitive Radix, los subcomponentes y la API pública oficial de Menubar.
- Implementa de 1 a 10 opciones, estado abierto/cerrado, opción activa y disabled.
- Incluye items, grupos, labels, separadores, shortcuts, checkbox, radio y submenús.
- Mantiene navegación por teclado, foco, Escape y cambio lateral entre menús.
- Playground y Docs renderizan exclusivamente `MenubarExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Menubar`, `MenubarPortal`, `MenubarMenu`, `MenubarTrigger`, `MenubarContent`, `MenubarGroup`, `MenubarSeparator`, `MenubarLabel`, `MenubarItem`, `MenubarShortcut`, `MenubarCheckboxItem`, `MenubarRadioGroup`, `MenubarRadioItem`, `MenubarSub`, `MenubarSubTrigger`, `MenubarSubContent` |
| Data slots | `menubar`, `menubar-menu`, `menubar-group`, `menubar-portal`, `menubar-radio-group`, `menubar-trigger`, `menubar-content`, `menubar-item`, `menubar-checkbox-item`, `menubar-radio-item`, `menubar-label`, `menubar-separator`, `menubar-shortcut`, `menubar-sub`, `menubar-sub-trigger`, `menubar-sub-content` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./menubar` |
| Secciones visibles en Docs | Versión → Estados → Cantidad de opciones → Composición → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type MenubarExampleProps = {
  optionCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  defaultOpen?: boolean
  activeOption?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  disabledOption?: number | "none"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `m` |
| `13` | `e` |
| `14` | `n` |
| `15` | `u` |
| `16` | `b` |
| `17` | `a` |
| `18` | `r` |
| `19` | `E` |
| `20` | `x` |
| `21` | `a` |
| `22` | `m` |
| `23` | `p` |
| `24` | `l` |
| `25` | `e` |
| `26` | `P` |
| `27` | `r` |
| `28` | `e` |
| `29` | `s` |
| `30` | `e` |
| `31` | `t` |
| `32` | `s` |
| `33` | `.` |
| `34` | `p` |
| `35` | `l` |
| `36` | `a` |
| `37` | `y` |
| `38` | `g` |
| `39` | `r` |
| `40` | `o` |
| `41` | `u` |
| `42` | `n` |
| `43` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `optionCount` | Cantidad de opciones | Estructura | Sí | inline-radio | `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` | — |
| `defaultOpen` | Abierto inicialmente | Estado | Sí | boolean | — | — |
| `activeOption` | Opción activa | Estado | Sí | select | `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` | — |
| `disabledOption` | Opción deshabilitada | Estado | Sí | select | `none`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-menubar--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-menubar--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `menubarPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `optionCount` | `3` |
| `defaultOpen` | `false` |
| `activeOption` | `1` |
| `disabledOption` | `none` |

#### `menubarExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"optionCount":3,"defaultOpen":false,"activeOption":1,"disabledOption":"none"}` |
| `closed` | `{"optionCount":3,"defaultOpen":false,"activeOption":1,"disabledOption":"none"}` |
| `open` | `{"optionCount":3,"defaultOpen":true,"activeOption":1,"disabledOption":"none"}` |
| `one` | `{"optionCount":1,"defaultOpen":false,"activeOption":1,"disabledOption":"none"}` |
| `three` | `{"optionCount":3,"defaultOpen":false,"activeOption":1,"disabledOption":"none"}` |
| `six` | `{"optionCount":6,"defaultOpen":false,"activeOption":1,"disabledOption":"none"}` |
| `ten` | `{"optionCount":10,"defaultOpen":false,"activeOption":1,"disabledOption":"none"}` |
| `checkbox` | `{"optionCount":3,"defaultOpen":true,"activeOption":3,"disabledOption":"none"}` |
| `radio` | `{"optionCount":5,"defaultOpen":true,"activeOption":5,"disabledOption":"none"}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **menubar-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Native Select

Selector nativo del navegador adaptado a tokens y geometría GRM.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `native-select` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 553:7952](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=553-7952) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-native-select--docs) |
| Registry | [native-select.json](https://ds-grm-documentation.vercel.app/r/native-select.json) |
| Implementación | `src/components/ui/native-select.tsx` |
| Composición canónica | `src/components/ui/native-select-example.tsx` |
| Stories | `src/components/ui/native-select.stories.tsx` |
| Documentación | `src/components/ui/native-select.mdx` |

### Cambios declarados en la versión del componente

- Conserva el elemento HTML `select` y la API oficial de shadcn/ui.
- Implementa opciones simples y agrupadas mediante `NativeSelectOption` y `NativeSelectOptGroup`.
- Los estados invalid y disabled usan `aria-invalid` y `disabled` nativos.
- La geometría, superficie, tamaños y estados visuales pertenecen al componente oficial de shadcn/ui.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `NativeSelect`, `NativeSelectOptGroup`, `NativeSelectOption` |
| Data slots | `native-select-wrapper`, `native-select`, `native-select-icon`, `native-select-option`, `native-select-optgroup` |
| Dependencias externas | `react`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./native-select` |
| Secciones visibles en Docs | Versión → Composición → Estados → Tamaños oficiales → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type NativeSelectExampleProps = {
  type?: "simple" | "groups"
  state?: "default" | "invalid" | "disabled"
  size?: "sm" | "default"
  filled?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `type` | `simple` |
| `state` | `default` |
| `size` | `default` |
| `filled` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | Composición | Composición | Sí | inline-radio | `simple`, `groups` | — |
| `state` | Estado | Props nativas | Sí | inline-radio | `default`, `invalid`, `disabled` | Se traduce a aria-invalid o disabled. |
| `size` | Tamaño | API shadcn/ui | Sí | inline-radio | `sm`, `default` | — |
| `filled` | Con valor | Muestra | Sí | boolean | — | Configura defaultValue en la muestra. |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-native-select--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-native-select--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **native-select-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Navigation Menu

Navegación principal con links, dropdowns y viewport compuesto.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `navigation-menu` |
| Categoría | Navigation |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2938:12924](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2938-12924) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-navigation-menu--docs) |
| Registry | [navigation-menu.json](https://ds-grm-documentation.vercel.app/r/navigation-menu.json) |
| Implementación | `src/components/ui/navigation-menu.tsx` |
| Composición canónica | `src/components/ui/navigation-menu-example.tsx` |
| Stories | `src/components/ui/navigation-menu.stories.tsx` |
| Documentación | `src/components/ui/navigation-menu.mdx` |

### Cambios declarados en la versión del componente

- Restaura el primitive Radix y la API pública vigente de shadcn/ui.
- Incluye dropdown, link directo y Viewport habilitado/deshabilitado; `Indicator` permanece disponible como API opcional, pero no se renderiza en la composición de Figma.
- Implementa layouts `list` y `featured` del nodo de Figma.
- Soporta de 1 a 10 ítems, estados open/closed, active y disabled.
- Playground y Docs renderizan exclusivamente `NavigationMenuExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `NavigationMenu`, `NavigationMenuList`, `NavigationMenuItem`, `NavigationMenuContent`, `NavigationMenuTrigger`, `NavigationMenuLink`, `NavigationMenuIndicator`, `NavigationMenuViewport`, `navigationMenuTriggerStyle` |
| Data slots | `navigation-menu`, `navigation-menu-list`, `navigation-menu-item`, `navigation-menu-trigger`, `navigation-menu-content`, `navigation-menu-viewport`, `navigation-menu-link`, `navigation-menu-indicator` |
| Dependencias externas | `react`, `class-variance-authority`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./navigation-menu` |
| Secciones visibles en Docs | Versión → Estados → Contenido y composición → Cantidad de ítems → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type NavigationMenuExampleProps = {
  itemCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  layout?: "list" | "featured"
  viewport?: boolean
  defaultOpen?: boolean
  activeItem?: number
  lastItemType?: "dropdown" | "link"
  disabledItem?: number | "none"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `n` |
| `13` | `a` |
| `14` | `v` |
| `15` | `i` |
| `16` | `g` |
| `17` | `a` |
| `18` | `t` |
| `19` | `i` |
| `20` | `o` |
| `21` | `n` |
| `22` | `M` |
| `23` | `e` |
| `24` | `n` |
| `25` | `u` |
| `26` | `E` |
| `27` | `x` |
| `28` | `a` |
| `29` | `m` |
| `30` | `p` |
| `31` | `l` |
| `32` | `e` |
| `33` | `P` |
| `34` | `r` |
| `35` | `e` |
| `36` | `s` |
| `37` | `e` |
| `38` | `t` |
| `39` | `s` |
| `40` | `.` |
| `41` | `p` |
| `42` | `l` |
| `43` | `a` |
| `44` | `y` |
| `45` | `g` |
| `46` | `r` |
| `47` | `o` |
| `48` | `u` |
| `49` | `n` |
| `50` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `itemCount` | Cantidad de ítems | Estructura | Sí | inline-radio | `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` | — |
| `layout` | Layout de contenido | Contenido | Sí | inline-radio | `list`, `featured` | — |
| `viewport` | Viewport | Comportamiento | Sí | boolean | — | — |
| `defaultOpen` | Abierto inicialmente | Estado | Sí | boolean | — | — |
| `activeItem` | Ítem activo | Estado | Sí | select | `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` | — |
| `lastItemType` | Último ítem | Estructura | Sí | inline-radio | `dropdown`, `link` | — |
| `disabledItem` | Ítem deshabilitado | Estado | Sí | select | `none`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-navigation-menu--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-navigation-menu--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `navigationMenuPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `itemCount` | `3` |
| `layout` | `list` |
| `viewport` | `true` |
| `defaultOpen` | `false` |
| `activeItem` | `1` |
| `lastItemType` | `dropdown` |
| `disabledItem` | `none` |

#### `navigationMenuExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"itemCount":3,"layout":"list","viewport":true,"defaultOpen":false,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `closed` | `{"itemCount":3,"layout":"list","viewport":true,"defaultOpen":false,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `open` | `{"itemCount":3,"layout":"list","viewport":true,"defaultOpen":true,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `list` | `{"itemCount":3,"layout":"list","viewport":true,"defaultOpen":true,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `featured` | `{"itemCount":3,"layout":"featured","viewport":true,"defaultOpen":true,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `withoutViewport` | `{"itemCount":3,"layout":"list","viewport":false,"defaultOpen":true,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `one` | `{"itemCount":1,"layout":"list","viewport":true,"defaultOpen":false,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `three` | `{"itemCount":3,"layout":"list","viewport":true,"defaultOpen":false,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `six` | `{"itemCount":6,"layout":"list","viewport":true,"defaultOpen":false,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `ten` | `{"itemCount":10,"layout":"list","viewport":true,"defaultOpen":false,"activeItem":1,"lastItemType":"dropdown","disabledItem":"none"}` |
| `link` | `{"itemCount":3,"layout":"list","viewport":true,"defaultOpen":false,"activeItem":1,"lastItemType":"link","disabledItem":"none"}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **navigation-menu-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Pagination

Navegación entre páginas con controles laterales, elipsis y selector de filas.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `pagination` |
| Categoría | Navigation |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1763:1260](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1763-1260) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-pagination--docs) |
| Registry | [pagination.json](https://ds-grm-documentation.vercel.app/r/pagination.json) |
| Implementación | `src/components/ui/pagination.tsx` |
| Composición canónica | `src/components/ui/pagination-example.tsx` |
| Stories | `src/components/ui/pagination.stories.tsx` |
| Documentación | `src/components/ui/pagination.mdx` |

### Cambios declarados en la versión del componente

- Conserva la composición oficial `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext` y `PaginationEllipsis`.
- Mantiene links semánticos, `aria-current`, región de navegación y estilos heredados de Button.
- Cantidad, página activa, elipsis y botones laterales pertenecen al ejemplo; no amplían el primitive.
- La composición de filas por página reutiliza el Select público del sistema.
- Playground y Docs consumen `paginationExamplePresets` y la misma instancia `PaginationExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Pagination`, `PaginationContent`, `PaginationEllipsis`, `PaginationItem`, `PaginationLink`, `PaginationNext`, `PaginationPrevious` |
| Data slots | `pagination`, `pagination-content`, `pagination-item`, `pagination-link`, `pagination-ellipsis` |
| Dependencias externas | `react`, `lucide-react` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base` |
| Composición interna del ejemplo | `./pagination`, `./select` |
| Secciones visibles en Docs | Versión → Composiciones → Cantidad de páginas → Estados y visibilidad → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type PaginationExampleProps = {
  composition?: "default" | "page-size"
  pageCount?: 3 | 4 | 5
  currentPage?: number
  showPrevious?: boolean
  showNext?: boolean
  showLeftEllipsis?: boolean
  showRightEllipsis?: boolean
  pageSize?: "10" | "20" | "50"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `p` |
| `13` | `a` |
| `14` | `g` |
| `15` | `i` |
| `16` | `n` |
| `17` | `a` |
| `18` | `t` |
| `19` | `i` |
| `20` | `o` |
| `21` | `n` |
| `22` | `E` |
| `23` | `x` |
| `24` | `a` |
| `25` | `m` |
| `26` | `p` |
| `27` | `l` |
| `28` | `e` |
| `29` | `P` |
| `30` | `r` |
| `31` | `e` |
| `32` | `s` |
| `33` | `e` |
| `34` | `t` |
| `35` | `s` |
| `36` | `.` |
| `37` | `p` |
| `38` | `l` |
| `39` | `a` |
| `40` | `y` |
| `41` | `g` |
| `42` | `r` |
| `43` | `o` |
| `44` | `u` |
| `45` | `n` |
| `46` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `composition` | Composición | Composición | Sí | inline-radio | `default`, `page-size` | — |
| `pageCount` | Cantidad de páginas | Navegación | Sí | inline-radio | `3`, `4`, `5` | — |
| `currentPage` | Página activa | Navegación | Sí | number | — | — |
| `showPrevious` | Anterior | Navegación | Sí | boolean | — | — |
| `showNext` | Siguiente | Navegación | Sí | boolean | — | — |
| `showLeftEllipsis` | Elipsis izquierda | Navegación | Sí | boolean | — | — |
| `showRightEllipsis` | Elipsis derecha | Navegación | Sí | boolean | — | — |
| `pageSize` | Filas por página | Select | Sí | inline-radio | `10`, `20`, `50` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-pagination--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-pagination--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `paginationPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `composition` | `default` |
| `pageCount` | `3` |
| `currentPage` | `1` |
| `showPrevious` | `true` |
| `showNext` | `true` |
| `showLeftEllipsis` | `true` |
| `showRightEllipsis` | `true` |
| `pageSize` | `10` |

#### `paginationExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"composition":"default","pageCount":3,"currentPage":1,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `default` | `{"composition":"default","pageCount":3,"currentPage":1,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `pageSize` | `{"composition":"page-size","pageCount":3,"currentPage":1,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `threeItems` | `{"composition":"default","pageCount":3,"currentPage":1,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `fourItems` | `{"composition":"default","pageCount":4,"currentPage":1,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `fiveItems` | `{"composition":"default","pageCount":5,"currentPage":1,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `firstActive` | `{"composition":"default","pageCount":3,"currentPage":1,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `middleActive` | `{"composition":"default","pageCount":3,"currentPage":2,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `lastActive` | `{"composition":"default","pageCount":3,"currentPage":3,"showPrevious":true,"showNext":true,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |
| `noEllipses` | `{"composition":"default","pageCount":3,"currentPage":1,"showPrevious":true,"showNext":true,"showLeftEllipsis":false,"showRightEllipsis":false,"pageSize":"10"}` |
| `noNavigation` | `{"composition":"default","pageCount":3,"currentPage":1,"showPrevious":false,"showNext":false,"showLeftEllipsis":true,"showRightEllipsis":true,"pageSize":"10"}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **pagination-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Popover

Contenedor contextual no modal con trigger, anchor y content oficiales de shadcn/ui.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `popover` |
| Categoría | Overlay |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Base UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 726:6350](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=726-6350) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-popover--docs) |
| Registry | [popover.json](https://ds-grm-documentation.vercel.app/r/popover.json) |
| Implementación | `src/components/ui/popover.tsx` |
| Composición canónica | `src/components/ui/popover-example.tsx` |
| Stories | `src/components/ui/popover.stories.tsx` |
| Documentación | `src/components/ui/popover.mdx` |

### Cambios declarados en la versión del componente

- Conserva Root, Trigger, Portal, Positioner, Popup, Title y Description de Base UI/shadcn.
- Mantiene estado controlado y no controlado, foco, teclado, dismiss, colisiones, lados y alineación.
- Interpreta la superficie vacía de Figma como un slot y conserva el contenedor heredado de shadcn/ui: ancho, altura, padding, radio y sombra oficiales.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Popover`, `PopoverContent`, `PopoverDescription`, `PopoverHeader`, `PopoverTitle`, `PopoverTrigger` |
| Data slots | `popover`, `popover-trigger`, `popover-content`, `popover-header`, `popover-title`, `popover-description` |
| Dependencias externas | `react`, `@base-ui/react/popover` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./input`, `./label`, `./popover` |
| Secciones visibles en Docs | Versión → Alineación del trigger → Posición → Contenido → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type PopoverExampleProps = {
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  opened?: boolean
  content?: "basic" | "form"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `align` | `start` |
| `side` | `bottom` |
| `opened` | `false` |
| `content` | `basic` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `align` | Alineación del trigger | Posición | Sí | inline-radio | `start`, `center`, `end` | — |
| `side` | Lado | Posición | Sí | inline-radio | `top`, `right`, `bottom`, `left` | — |
| `opened` | Abierto | Estado | Sí | boolean | — | — |
| `content` | Contenido | Composición | Sí | inline-radio | `basic`, `form` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-popover--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-popover--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `behavior`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Abierto` | `boolean` | `false` | `Popover.open / defaultOpen` |
| `Alineación` | `start \| center \| end` | `center` | `PopoverContent.align` |
| `Lado` | `top \| right \| bottom \| left` | `bottom` | `PopoverContent.side` |
| `Separación` | `number` | `4px` | `PopoverContent.sideOffset` |

### Reglas de uso para wireframes

- Construir la instancia mediante **popover-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Progress

Indicador de avance determinado con label y porcentaje opcionales por composición.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `progress` |
| Categoría | Feedback |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2206:16412](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2206-16412) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-progress--docs) |
| Registry | [progress.json](https://ds-grm-documentation.vercel.app/r/progress.json) |
| Implementación | `src/components/ui/progress.tsx` |
| Composición canónica | `src/components/ui/progress-example.tsx` |
| Stories | `src/components/ui/progress.stories.tsx` |
| Documentación | `src/components/ui/progress.mdx` |

### Cambios declarados en la versión del componente

- Conserva el wrapper oficial `Progress` de shadcn/ui sobre Radix y reenvía `value` al `Root` para mantener `aria-valuenow`.
- Mantiene `value`, semántica `progressbar`, estados ARIA y personalización mediante `className`.
- El label y el porcentaje son composición externa y proporcionan el nombre accesible mediante `aria-labelledby`.
- Incluye valores de 0 a 100 y responde a los tokens y tipografía de la marca activa.
- Playground y Docs consumen `progressExamplePresets` y la misma instancia `ProgressExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Progress` |
| Data slots | `progress`, `progress-indicator` |
| Dependencias externas | `react`, `radix-ui` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./progress` |
| Secciones visibles en Docs | Versión → Valores → Composición → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ProgressExampleProps = {
  value?: number
  showLabel?: boolean
  label?: string
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `p` |
| `13` | `r` |
| `14` | `o` |
| `15` | `g` |
| `16` | `r` |
| `17` | `e` |
| `18` | `s` |
| `19` | `s` |
| `20` | `E` |
| `21` | `x` |
| `22` | `a` |
| `23` | `m` |
| `24` | `p` |
| `25` | `l` |
| `26` | `e` |
| `27` | `P` |
| `28` | `r` |
| `29` | `e` |
| `30` | `s` |
| `31` | `e` |
| `32` | `t` |
| `33` | `s` |
| `34` | `.` |
| `35` | `p` |
| `36` | `l` |
| `37` | `a` |
| `38` | `y` |
| `39` | `g` |
| `40` | `r` |
| `41` | `o` |
| `42` | `u` |
| `43` | `n` |
| `44` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `value` | Valor | Progress | Sí | range | — | Prop pública value de Progress. |
| `showLabel` | Mostrar label | Composición | Sí | boolean | — | Composición externa; no es una prop del primitive. |
| `label` | Label | Composición | Sí | text | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-progress--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-progress--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `progressPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `value` | `60` |
| `showLabel` | `true` |
| `label` | `Progreso` |

#### `progressExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"value":60,"showLabel":true,"label":"Progreso"}` |
| `empty` | `{"value":0,"showLabel":true,"label":"Progreso"}` |
| `quarter` | `{"value":25,"showLabel":true,"label":"Progreso"}` |
| `half` | `{"value":50,"showLabel":true,"label":"Progreso"}` |
| `threeQuarter` | `{"value":75,"showLabel":true,"label":"Progreso"}` |
| `complete` | `{"value":100,"showLabel":true,"label":"Progreso"}` |
| `withoutLabel` | `{"value":60,"showLabel":false,"label":"Progreso"}` |

### Especificaciones consolidadas desde Docs

#### Datos documentales: `behavior`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Valor` | `value` | `0–100 en la muestra` | `Progress Root` |
| `Semántica` | `role=progressbar` | `aria-valuenow/min/max` | `Radix` |
| `Transición` | `transition-all` | `Transform del Indicator` | `shadcn/ui` |
| `Sin label visible` | `aria-label` | `Nombre accesible` | `Composición` |

### Reglas de uso para wireframes

- Construir la instancia mediante **progress-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Radio Group

Selección excluyente entre opciones relacionadas.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `radio-group` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación desde Figma y shadcn/ui |
| Figma | [nodo 1:41](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-radio-group--docs) |
| Registry | [radio-group.json](https://ds-grm-documentation.vercel.app/r/radio-group.json) |
| Implementación | `src/components/ui/radio-group.tsx` |
| Composición canónica | `src/components/ui/radio-group-example.tsx` |
| Stories | `src/components/ui/radio-group.stories.tsx` |
| Documentación | `src/components/ui/radio-group.mdx` |

### Cambios declarados en la versión del componente

- Conserva Root, Item, Indicator, selección exclusiva, teclado, orientación, disabled y ARIA del primitive oficial.
- Description, Choice Cards y Fieldset se resuelven mediante composición con Field.
- Adapta geometría, estados y tokens del nodo de Figma sin duplicar Radio Group.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `RadioGroup`, `RadioGroupItem` |
| Data slots | `radio-group`, `radio-group-item`, `radio-group-indicator` |
| Dependencias externas | `react`, `radix-ui` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./field`, `./radio-group` |
| Secciones visibles en Docs | Versión → Patrones → Posición del texto → Estados → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type RadioGroupExampleProps = {
  appearance?: "default" | "contained"
  text?: "label" | "description"
  textSide?: "left" | "right"
  state?: "default" | "error" | "disabled"
  selected?: boolean
  amount?: 2 | 3 | 4 | 5 | 6
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `appearance` | `default` |
| `text` | `label` |
| `textSide` | `right` |
| `state` | `default` |
| `selected` | `true` |
| `amount` | `3` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `appearance` | Presentación | Composición | Sí | inline-radio | `default`, `contained` | — |
| `text` | Texto | Composición | Sí | inline-radio | `label`, `description` | — |
| `textSide` | Posición del texto | Composición | Sí | inline-radio | `left`, `right` | — |
| `amount` | Opciones | Composición | Sí | range | — | — |
| `state` | Estado | Estado | Sí | inline-radio | `default`, `error`, `disabled` | — |
| `selected` | Selección inicial | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-radio-group--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-radio-group--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **radio-group-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Resizable

Distribución de paneles redimensionables horizontal o verticalmente.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `resizable` |
| Categoría | Layout |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2882:453](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2882-453) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-resizable--docs) |
| Registry | [resizable.json](https://ds-grm-documentation.vercel.app/r/resizable.json) |
| Implementación | `src/components/ui/resizable.tsx` |
| Composición canónica | `src/components/ui/resizable-example.tsx` |
| Stories | `src/components/ui/resizable.stories.tsx` |
| Documentación | `src/components/ui/resizable.mdx` |

### Cambios declarados en la versión del componente

- Conserva la API oficial `ResizablePanelGroup`, `ResizablePanel` y `ResizableHandle` sobre `react-resizable-panels` v4.
- Usa `orientation`, `Group`, `Panel`, `Separator` y valores porcentuales de `defaultSize`.
- Incluye orientación horizontal/vertical, distribuciones 25/75, 50/50 y 75/25, grip visible y paneles anidados.
- Mantiene arrastre, touch, teclado, foco y ARIA del primitive oficial.
- Playground y Docs consumen la misma matriz `resizableExamplePresets` y la instancia `ResizableExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `ResizableHandle`, `ResizablePanel`, `ResizablePanelGroup` |
| Data slots | `resizable-panel-group`, `resizable-panel`, `resizable-handle` |
| Dependencias externas | `react-resizable-panels` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./resizable` |
| Secciones visibles en Docs | Versión → Orientación → Distribución inicial → Composición → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ResizableExampleProps = {
  orientation?: "horizontal" | "vertical"
  distribution?: "25/75" | "50/50" | "75/25"
  withHandle?: boolean
  layout?: "two-panels" | "nested"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `r` |
| `13` | `e` |
| `14` | `s` |
| `15` | `i` |
| `16` | `z` |
| `17` | `a` |
| `18` | `b` |
| `19` | `l` |
| `20` | `e` |
| `21` | `E` |
| `22` | `x` |
| `23` | `a` |
| `24` | `m` |
| `25` | `p` |
| `26` | `l` |
| `27` | `e` |
| `28` | `P` |
| `29` | `r` |
| `30` | `e` |
| `31` | `s` |
| `32` | `e` |
| `33` | `t` |
| `34` | `s` |
| `35` | `.` |
| `36` | `p` |
| `37` | `l` |
| `38` | `a` |
| `39` | `y` |
| `40` | `g` |
| `41` | `r` |
| `42` | `o` |
| `43` | `u` |
| `44` | `n` |
| `45` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `orientation` | Orientación | ResizablePanelGroup | Sí | inline-radio | `horizontal`, `vertical` | — |
| `distribution` | Distribución inicial | ResizablePanel | Sí | inline-radio | `25/75`, `50/50`, `75/25` | Se traduce a defaultSize con porcentajes de react-resizable-panels v4. |
| `withHandle` | Grip visible | ResizableHandle | Sí | boolean | — | Prop oficial de ResizableHandle. |
| `layout` | Composición | Composición oficial | Sí | inline-radio | `two-panels`, `nested` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-resizable--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-resizable--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `resizablePlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `orientation` | `horizontal` |
| `distribution` | `50/50` |
| `withHandle` | `false` |
| `layout` | `two-panels` |

#### `resizableExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"orientation":"horizontal","distribution":"50/50","withHandle":false,"layout":"two-panels"}` |
| `horizontal` | `{"orientation":"horizontal","distribution":"50/50","withHandle":false,"layout":"two-panels"}` |
| `vertical` | `{"orientation":"vertical","distribution":"50/50","withHandle":false,"layout":"two-panels"}` |
| `quarter` | `{"orientation":"horizontal","distribution":"25/75","withHandle":false,"layout":"two-panels"}` |
| `half` | `{"orientation":"horizontal","distribution":"50/50","withHandle":false,"layout":"two-panels"}` |
| `threeQuarter` | `{"orientation":"horizontal","distribution":"75/25","withHandle":false,"layout":"two-panels"}` |
| `handle` | `{"orientation":"horizontal","distribution":"50/50","withHandle":true,"layout":"two-panels"}` |
| `nested` | `{"orientation":"horizontal","distribution":"50/50","withHandle":true,"layout":"nested"}` |

### Especificaciones consolidadas desde Docs

#### Datos documentales: `behavior`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Orientación` | `orientation` | `horizontal \| vertical` | `Group` |
| `Tamaño inicial` | `defaultSize` | `string porcentual` | `Panel v4` |
| `Arrastre` | `Pointer events` | `Mouse y touch` | `Separator` |
| `Teclado` | `role=separator` | `Arrow keys` | `react-resizable-panels` |
| `Foco` | `focus-visible:ring-1` | `--ring` | `shadcn/ui` |
| `Color` | `bg-border` | `--border` | `shadcn/ui / marca` |

### Reglas de uso para wireframes

- Construir la instancia mediante **resizable-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Scroll Area

Región con scroll estilizado vertical u horizontal sin sustituir el comportamiento nativo.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `scroll-area` |
| Categoría | Layout |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1800:1860](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1800-1860) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-scroll-area--docs) |
| Registry | [scroll-area.json](https://ds-grm-documentation.vercel.app/r/scroll-area.json) |
| Implementación | `src/components/ui/scroll-area.tsx` |
| Composición canónica | `src/components/ui/scroll-area-example.tsx` |
| Stories | `src/components/ui/scroll-area.stories.tsx` |
| Documentación | `src/components/ui/scroll-area.mdx` |

### Cambios declarados en la versión del componente

- Conserva sin modificaciones `ScrollArea` y `ScrollBar` del registro oficial de shadcn/ui sobre Radix.
- Mantiene Viewport, Scrollbar, Thumb, Corner, foco, mouse, touch y teclado del primitive.
- Incluye las composiciones oficiales vertical y horizontal con contenido de referencia de Figma.
- Las dimensiones y el contenido viven en el ejemplo; no amplían ni fijan el primitive.
- Playground y Docs consumen `scrollAreaExamplePresets` y la misma instancia `ScrollAreaExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `ScrollArea`, `ScrollBar` |
| Data slots | `scroll-area`, `scroll-area-viewport`, `scroll-area-scrollbar`, `scroll-area-thumb` |
| Dependencias externas | `react`, `radix-ui`, `next/image` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./scroll-area`, `./separator` |
| Secciones visibles en Docs | Versión → Orientación → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ScrollAreaExampleProps = {
  orientation?: "vertical" | "horizontal"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `s` |
| `13` | `c` |
| `14` | `r` |
| `15` | `o` |
| `16` | `l` |
| `17` | `l` |
| `18` | `A` |
| `19` | `r` |
| `20` | `e` |
| `21` | `a` |
| `22` | `E` |
| `23` | `x` |
| `24` | `a` |
| `25` | `m` |
| `26` | `p` |
| `27` | `l` |
| `28` | `e` |
| `29` | `P` |
| `30` | `r` |
| `31` | `e` |
| `32` | `s` |
| `33` | `e` |
| `34` | `t` |
| `35` | `s` |
| `36` | `.` |
| `37` | `p` |
| `38` | `l` |
| `39` | `a` |
| `40` | `y` |
| `41` | `g` |
| `42` | `r` |
| `43` | `o` |
| `44` | `u` |
| `45` | `n` |
| `46` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `orientation` | Orientación | Composición | Sí | inline-radio | `vertical`, `horizontal` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-scroll-area--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-scroll-area--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `scrollAreaPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `orientation` | `vertical` |

#### `scrollAreaExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"orientation":"vertical"}` |
| `vertical` | `{"orientation":"vertical"}` |
| `horizontal` | `{"orientation":"horizontal"}` |

### Especificaciones consolidadas desde Docs

#### Datos documentales: `behavior`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Scroll vertical` | `ScrollArea` | `Rueda / touch / teclado` | `Radix` |
| `Scroll horizontal` | `ScrollBar orientation` | `Arrastre / touch` | `Radix` |
| `Scrollbar nativo` | `type=hover por defecto` | `Visible durante interacción` | `Radix` |
| `Foco del viewport` | `focus-visible:ring` | `--ring` | `shadcn/ui` |
| `Thumb` | `bg-border` | `--border` | `shadcn/ui / marca` |

### Reglas de uso para wireframes

- Construir la instancia mediante **scroll-area-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Select

Selector compuesto accesible con grupos, scrolling e iconos opcionales.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `select` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 614:4917](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=614-4917) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-select--docs) |
| Registry | [select.json](https://ds-grm-documentation.vercel.app/r/select.json) |
| Implementación | `src/components/ui/select.tsx` |
| Composición canónica | `src/components/ui/select-example.tsx` |
| Stories | `src/components/ui/select.stories.tsx` |
| Documentación | `src/components/ui/select.mdx` |

### Cambios declarados en la versión del componente

- Conserva la composición y API pública oficial de Select basada en Radix UI.
- Incluye Simple, Groups y Scrollable mediante subcomponentes públicos.
- Admite iconos mediante composición como hijos de `SelectItem`; no añade props a la primitiva.
- Mantiene tamaños, posicionamiento, foco, teclado, selección, disabled e invalid de shadcn/ui.
- No añade variantes visuales ni propiedades privadas desde Figma.
- Playground y Docs consumen la misma matriz canónica `selectExamplePresets`; Docs no redefine configuraciones del componente.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Select`, `SelectContent`, `SelectGroup`, `SelectItem`, `SelectLabel`, `SelectScrollDownButton`, `SelectScrollUpButton`, `SelectSeparator`, `SelectTrigger`, `SelectValue` |
| Data slots | `select`, `select-group`, `select-value`, `select-trigger`, `select-content`, `select-label`, `select-item`, `select-separator`, `select-scroll-up-button`, `select-scroll-down-button` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./select` |
| Secciones visibles en Docs | Versión → Composición → Estados → Tamaño y posicionamiento → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type SelectExampleProps = {
  type?: "simple" | "groups" | "scrollable"
  state?: "default" | "invalid" | "disabled"
  size?: "sm" | "default"
  position?: "item-aligned" | "popper"
  filled?: boolean
  initiallyOpen?: boolean
  icons?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `s` |
| `13` | `e` |
| `14` | `l` |
| `15` | `e` |
| `16` | `c` |
| `17` | `t` |
| `18` | `E` |
| `19` | `x` |
| `20` | `a` |
| `21` | `m` |
| `22` | `p` |
| `23` | `l` |
| `24` | `e` |
| `25` | `P` |
| `26` | `r` |
| `27` | `e` |
| `28` | `s` |
| `29` | `e` |
| `30` | `t` |
| `31` | `s` |
| `32` | `.` |
| `33` | `p` |
| `34` | `l` |
| `35` | `a` |
| `36` | `y` |
| `37` | `g` |
| `38` | `r` |
| `39` | `o` |
| `40` | `u` |
| `41` | `n` |
| `42` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | Composición | Composición oficial | Sí | select | `simple`, `groups`, `scrollable` | — |
| `state` | Estado | API shadcn/ui | Sí | inline-radio | `default`, `invalid`, `disabled` | Se traduce a aria-invalid o disabled. |
| `size` | Tamaño | API shadcn/ui | Sí | inline-radio | `sm`, `default` | — |
| `position` | Posición | SelectContent | Sí | inline-radio | `item-aligned`, `popper` | — |
| `filled` | Con valor | Muestra | Sí | boolean | — | Configura defaultValue en la composición. |
| `initiallyOpen` | Abierto inicialmente | API shadcn/ui | Sí | boolean | — | Configura defaultOpen; el usuario mantiene el control interactivo. |
| `icons` | Iconos | Composición oficial | Sí | boolean | — | Compone iconos como hijos de SelectItem; requiere un valor seleccionado para aparecer en SelectValue. |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-select--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-select--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `selectPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `type` | `simple` |
| `state` | `default` |
| `size` | `default` |
| `position` | `item-aligned` |
| `filled` | `false` |
| `initiallyOpen` | `false` |
| `icons` | `false` |

#### `selectExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"type":"simple","state":"default","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `simple` | `{"type":"simple","state":"default","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `icons` | `{"type":"simple","state":"default","size":"default","position":"item-aligned","filled":true,"initiallyOpen":false,"icons":true}` |
| `groups` | `{"type":"groups","state":"default","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `scrollable` | `{"type":"scrollable","state":"default","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `placeholder` | `{"type":"simple","state":"default","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `filled` | `{"type":"simple","state":"default","size":"default","position":"item-aligned","filled":true,"initiallyOpen":false,"icons":false}` |
| `invalid` | `{"type":"simple","state":"invalid","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `disabled` | `{"type":"simple","state":"disabled","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `defaultSize` | `{"type":"simple","state":"default","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `smallSize` | `{"type":"simple","state":"default","size":"sm","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `itemAligned` | `{"type":"simple","state":"default","size":"default","position":"item-aligned","filled":false,"initiallyOpen":false,"icons":false}` |
| `popper` | `{"type":"simple","state":"default","size":"default","position":"popper","filled":false,"initiallyOpen":false,"icons":false}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **select-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Separator

Divisor semántico o decorativo horizontal o vertical.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `separator` |
| Categoría | Layout |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 589:983](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=589-983) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-separator--docs) |
| Registry | [separator.json](https://ds-grm-documentation.vercel.app/r/separator.json) |
| Implementación | `src/components/ui/separator.tsx` |
| Composición canónica | `src/components/ui/separator-example.tsx` |
| Stories | `src/components/ui/separator.stories.tsx` |
| Documentación | `src/components/ui/separator.mdx` |

### Cambios declarados en la versión del componente

- Conserva el primitive Radix y la API pública oficial de Separator.
- Implementa las orientaciones horizontal y vertical.
- Mantiene el modo decorativo predeterminado y el modo semántico.
- La longitud pertenece al contenedor; no se añade una propiedad privada al primitive.
- Playground y Docs renderizan exclusivamente `SeparatorExample`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Separator` |
| Data slots | `separator` |
| Dependencias externas | `react`, `radix-ui` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./separator` |
| Secciones visibles en Docs | Versión → Orientación → Accesibilidad → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type SeparatorExampleProps = {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `s` |
| `13` | `e` |
| `14` | `p` |
| `15` | `a` |
| `16` | `r` |
| `17` | `a` |
| `18` | `t` |
| `19` | `o` |
| `20` | `r` |
| `21` | `E` |
| `22` | `x` |
| `23` | `a` |
| `24` | `m` |
| `25` | `p` |
| `26` | `l` |
| `27` | `e` |
| `28` | `P` |
| `29` | `r` |
| `30` | `e` |
| `31` | `s` |
| `32` | `e` |
| `33` | `t` |
| `34` | `s` |
| `35` | `.` |
| `36` | `p` |
| `37` | `l` |
| `38` | `a` |
| `39` | `y` |
| `40` | `g` |
| `41` | `r` |
| `42` | `o` |
| `43` | `u` |
| `44` | `n` |
| `45` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `orientation` | Orientación | Separator | Sí | inline-radio | `horizontal`, `vertical` | — |
| `decorative` | Decorativo | Accesibilidad | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-separator--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-separator--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `separatorPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `orientation` | `horizontal` |
| `decorative` | `true` |

#### `separatorExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"orientation":"horizontal","decorative":true}` |
| `horizontal` | `{"orientation":"horizontal","decorative":true}` |
| `vertical` | `{"orientation":"vertical","decorative":true}` |
| `semantic` | `{"orientation":"horizontal","decorative":false}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **separator-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Sheet

Panel superpuesto desde un borde con anchuras y disposiciones de footer documentadas.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `sheet` |
| Categoría | Overlay |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1295:386](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1295-386) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-sheet--docs) |
| Registry | [sheet.json](https://ds-grm-documentation.vercel.app/r/sheet.json) |
| Implementación | `src/components/ui/sheet.tsx` |
| Composición canónica | `src/components/ui/sheet-example.tsx` |
| Stories | `src/components/ui/sheet.stories.tsx` |
| Documentación | `src/components/ui/sheet.mdx` |

### Cambios declarados en la versión del componente

- Conserva Dialog de Radix, portal, overlay, foco, teclado, dismiss y composición oficial de shadcn/ui.
- Adapta las cuatro posiciones, anchos laterales de 384/480 px y altura vertical de hasta 512 px.
- Integra cierre opcional, footer en fila/columna y contenido desplazable según Figma.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Sheet`, `SheetTrigger`, `SheetClose`, `SheetContent`, `SheetHeader`, `SheetFooter`, `SheetTitle`, `SheetDescription` |
| Data slots | `sheet`, `sheet-trigger`, `sheet-close`, `sheet-portal`, `sheet-overlay`, `sheet-content`, `sheet-header`, `sheet-footer`, `sheet-title`, `sheet-description` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./sheet` |
| Secciones visibles en Docs | Versión → Posición → Ancho lateral → Botón de cierre → Disposición de acciones → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type SheetExampleProps = {
  side?: "top" | "right" | "bottom" | "left"
  sideWidth?: 384 | 480
  showCloseButton?: boolean
  footerAlignment?: "column" | "row"
  scrollable?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `side` | `right` |
| `sideWidth` | `480` |
| `showCloseButton` | `true` |
| `footerAlignment` | `column` |
| `scrollable` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `side` | Posición | Disposición | Sí | inline-radio | `top`, `right`, `bottom`, `left` | — |
| `sideWidth` | Ancho lateral · left/right | Disposición | Sí | inline-radio | `384`, `480` | — |
| `showCloseButton` | Botón de cierre | Composición | Sí | boolean | — | — |
| `footerAlignment` | Acciones | Composición | Sí | inline-radio | `column`, `row` | — |
| `scrollable` | Contenido desplazable | Contenido | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-sheet--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-sheet--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **sheet-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Sidebar

Navegación lateral responsive con estados expanded/collapsed, subnavegación y tooltips.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `sidebar` |
| Categoría | Navigation |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.4.0` — Actualización del estado colapsado desde Figma |
| Figma | [nodo 3114:1373](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3114-1373) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-sidebar--docs) |
| Registry | [sidebar.json](https://ds-grm-documentation.vercel.app/r/sidebar.json) |
| Implementación | `src/components/ui/sidebar.tsx` |
| Composición canónica | `src/components/ui/sidebar-example.tsx` |
| Stories | `src/components/ui/sidebar.stories.tsx` |
| Documentación | `src/components/ui/sidebar.mdx` |

### Cambios declarados en la versión del componente

- Trigger circular de 32 px superpuesto al borde derecho, con chevron izquierdo en `expanded` y derecho en `collapsed`.
- Logos vigentes de Figma: muestra completa de 191 × 26 px y símbolo colapsado de 15 × 26 px.
- Sidebar colapsado actualizado a 64 px, con canal de navegación de 48 px.
- Separadores de sección de 24 px preservados en estado colapsado.
- Tooltips individuales disponibles para cada subopción icon-only.
- Subnavegación expandida de 240 px con ítems de 40 px, iconos de 14 px y sangría de 36 px.
- Subnavegación colapsada de 48 × 90 px con borde, ítems icon-only de 40 × 32 px y tooltips individuales.
- Contenedor colapsable abierto de 134 px: trigger de 40 px, panel de 90 px y padding inferior de 4 px.
- Estado abierto colapsado con `--sidebar-accent` y chevron a la derecha, centrado verticalmente.
- Estados expandido y colapsado sincronizados con el nodo `3114:1373`.
- Regiones de header, navegación primaria, contenido desplazable, grupos, menú y submenú.
- API, responsive Sheet, shortcut, tooltips y composición oficial de shadcn/ui preservados; `SidebarRail` continúa disponible en la API pública.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Sidebar`, `SidebarContent`, `SidebarFooter`, `SidebarGroup`, `SidebarGroupAction`, `SidebarGroupContent`, `SidebarGroupLabel`, `SidebarHeader`, `SidebarInput`, `SidebarInset`, `SidebarMenu`, `SidebarMenuAction`, `SidebarMenuBadge`, `SidebarMenuButton`, `SidebarMenuItem`, `SidebarMenuSkeleton`, `SidebarMenuSub`, `SidebarMenuSubButton`, `SidebarMenuSubItem`, `SidebarProvider`, `SidebarRail`, `SidebarSeparator`, `SidebarTrigger`, `useSidebar` |
| Data slots | `sidebar-wrapper`, `sidebar`, `sidebar-gap`, `sidebar-container`, `sidebar-inner`, `sidebar-trigger`, `sidebar-rail`, `sidebar-inset`, `sidebar-input`, `sidebar-header`, `sidebar-footer`, `sidebar-separator`, `sidebar-content`, `sidebar-group`, `sidebar-group-label`, `sidebar-group-action`, `sidebar-group-content`, `sidebar-menu`, `sidebar-menu-item`, `sidebar-menu-button`, `sidebar-menu-action`, `sidebar-menu-badge`, `sidebar-menu-skeleton`, `sidebar-menu-sub`, `sidebar-menu-sub-item`, `sidebar-menu-sub-button` |
| Dependencias externas | `react`, `class-variance-authority`, `radix-ui`, `lucide-react`, `next/image` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base`, `@grm/input`, `@grm/separator`, `@grm/sheet`, `@grm/skeleton`, `@grm/tooltip`, `@grm/use-mobile` |
| Composición interna del ejemplo | `./collapsible`, `./tooltip`, `./sidebar` |
| Secciones visibles en Docs | Versión → Estados → Ítems de navegación → Subnavegación colapsable → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type SidebarExampleProps = {
  state?: "expanded" | "collapsed"
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
  activeItem?: string
  expandedGroups?: boolean
  showInset?: boolean
  contained?: boolean
  className?: string
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `state` | `expanded` |
| `side` | `left` |
| `variant` | `sidebar` |
| `collapsible` | `icon` |
| `activeItem` | — |
| `expandedGroups` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `state` | Estado | Sidebar | Sí | inline-radio | `expanded`, `collapsed` | — |
| `side` | Lado | API oficial | Sí | inline-radio | `left`, `right` | — |
| `variant` | Variante | API oficial | Sí | select | `sidebar`, `floating`, `inset` | — |
| `collapsible` | Colapsable | API oficial | Sí | inline-radio | `offcanvas`, `icon`, `none` | — |
| `activeItem` | Ítem activo | Contenido | Sí | select | ``, `Inicio`, `Dashboard`, `Pacientes`, `Reina Wallet`, `Servicios`, `Staff`, `Solicitudes`, `Regiones`, `Ajustes` | — |
| `expandedGroups` | Submenús abiertos | Contenido | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-sidebar--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-sidebar--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **sidebar-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Slider

Selección numérica simple, de rango o múltiple, horizontal o vertical.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `slider` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2772:1030](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2772-1030) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-slider--docs) |
| Registry | [slider.json](https://ds-grm-documentation.vercel.app/r/slider.json) |
| Implementación | `src/components/ui/slider.tsx` |
| Composición canónica | `src/components/ui/slider-example.tsx` |
| Stories | `src/components/ui/slider.stories.tsx` |
| Documentación | `src/components/ui/slider.mdx` |

### Cambios declarados en la versión del componente

- Conserva literalmente el wrapper oficial `radix-nova` de shadcn/ui sobre Radix.
- Single, Range y Multiple se expresan mediante uno, dos o tres valores; Range integra la receta Controlled oficial.
- Mantiene orientación, disabled, teclado, gestos, foco y atributos ARIA oficiales.
- Incluye la receta Controlled oficial mediante `Label`, estado React y valor visible.
- La geometría de 240 × 20 px y los presets Low, Medium y High pertenecen a `SliderExample`.
- Playground y Docs renderizan exclusivamente la misma composición compartida.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Slider` |
| Data slots | `slider`, `slider-track`, `slider-range`, `slider-thumb` |
| Dependencias externas | `react`, `radix-ui` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./label`, `./slider` |
| Secciones visibles en Docs | Versión → Tipo → Orientación → Valores y estados → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type SliderExampleProps = {
  type?: "single" | "range" | "multiple"
  orientation?: "horizontal" | "vertical"
  valueLevel?: "low" | "medium" | "high"
  disabled?: boolean
  label?: string
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `s` |
| `13` | `l` |
| `14` | `i` |
| `15` | `d` |
| `16` | `e` |
| `17` | `r` |
| `18` | `E` |
| `19` | `x` |
| `20` | `a` |
| `21` | `m` |
| `22` | `p` |
| `23` | `l` |
| `24` | `e` |
| `25` | `P` |
| `26` | `r` |
| `27` | `e` |
| `28` | `s` |
| `29` | `e` |
| `30` | `t` |
| `31` | `s` |
| `32` | `.` |
| `33` | `p` |
| `34` | `l` |
| `35` | `a` |
| `36` | `y` |
| `37` | `g` |
| `38` | `r` |
| `39` | `o` |
| `40` | `u` |
| `41` | `n` |
| `42` | `d` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | Tipo | Composición | Sí | inline-radio | `single`, `range`, `multiple` | Composición definida por la cantidad de valores del arreglo. |
| `orientation` | Orientación | Slider | Sí | inline-radio | `horizontal`, `vertical` | — |
| `valueLevel` | Valor | Composición | Sí | inline-radio | `low`, `medium`, `high` | Preset de valores para documentar los estados de Figma. |
| `disabled` | Deshabilitado | Slider | Sí | boolean | — | — |
| `label` | Label | Composición | Sí | text | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-slider--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-slider--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `sliderPlaygroundArgs`

| Preset | Configuración |
| --- | --- |
| `type` | `single` |
| `orientation` | `horizontal` |
| `valueLevel` | `medium` |
| `disabled` | `false` |
| `label` | `Temperatura` |

#### `sliderExamplePresets`

| Preset | Configuración |
| --- | --- |
| `playground` | `{"type":"single","orientation":"horizontal","valueLevel":"medium","disabled":false,"label":"Temperatura"}` |
| `single` | `{"type":"single","orientation":"horizontal","valueLevel":"medium","disabled":false,"label":"Temperatura"}` |
| `range` | `{"type":"range","orientation":"horizontal","valueLevel":"medium","disabled":false,"label":"Temperatura"}` |
| `multiple` | `{"type":"multiple","orientation":"horizontal","valueLevel":"medium","disabled":false,"label":"Temperatura"}` |
| `horizontal` | `{"type":"single","orientation":"horizontal","valueLevel":"medium","disabled":false,"label":"Temperatura"}` |
| `vertical` | `{"type":"single","orientation":"vertical","valueLevel":"medium","disabled":false,"label":"Temperatura"}` |
| `low` | `{"type":"single","orientation":"horizontal","valueLevel":"low","disabled":false,"label":"Temperatura"}` |
| `medium` | `{"type":"single","orientation":"horizontal","valueLevel":"medium","disabled":false,"label":"Temperatura"}` |
| `high` | `{"type":"single","orientation":"horizontal","valueLevel":"high","disabled":false,"label":"Temperatura"}` |
| `disabled` | `{"type":"single","orientation":"horizontal","valueLevel":"medium","disabled":true,"label":"Temperatura"}` |

### Reglas de uso para wireframes

- Construir la instancia mediante **slider-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Spinner

Indicador animado de actividad o carga indeterminada.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `spinner` |
| Categoría | Feedback |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2206:19380](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2206-19380) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-spinner--docs) |
| Registry | [spinner.json](https://ds-grm-documentation.vercel.app/r/spinner.json) |
| Implementación | `src/components/ui/spinner.tsx` |
| Composición canónica | `src/components/ui/spinner-example.tsx` |
| Stories | `src/components/ui/spinner.stories.tsx` |
| Documentación | `src/components/ui/spinner.mdx` |

### Cambios declarados en la versión del componente

- Conserva el SVG accesible y la personalización mediante `className` de shadcn/ui.
- Añade la escala pública de Figma: 12, 16, 24 y 32 px.
- Sincroniza la rotación lineal de 800 ms y conserva el color contextual con `currentColor`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Spinner`, `SpinnerProps` |
| Data slots | `spinner` |
| Dependencias externas | `lucide-react`, `class-variance-authority` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./spinner` |
| Secciones visibles en Docs | Versión → Escala → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type SpinnerExampleProps = {
  size?: 12 | 16 | 24 | 32
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `size` | `16` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `size` | Tamaño | Apariencia | Sí | inline-radio | `12`, `16`, `24`, `32` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-spinner--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-spinner--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `sizes`

| Valor |
| --- |
| `12` |
| `16` |
| `24` |
| `32` |

### Reglas de uso para wireframes

- Construir la instancia mediante **spinner-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Switch

Control binario inmediato para activar o desactivar una configuración.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `switch` |
| Categoría | Form |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación desde Figma y shadcn/ui |
| Figma | [nodo 1:41](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-switch--docs) |
| Registry | [switch.json](https://ds-grm-documentation.vercel.app/r/switch.json) |
| Implementación | `src/components/ui/switch.tsx` |
| Composición canónica | `src/components/ui/switch-example.tsx` |
| Stories | `src/components/ui/switch.stories.tsx` |
| Documentación | `src/components/ui/switch.mdx` |

### Cambios declarados en la versión del componente

- Conserva Root, Thumb, estado controlado/no controlado, teclado, disabled y ARIA del primitive oficial.
- Description y Choice Card son composiciones oficiales con Field.
- Mantiene la propiedad oficial `size` y aplica las escalas del nodo de Figma.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Switch` |
| Data slots | `switch`, `switch-thumb` |
| Dependencias externas | `react`, `radix-ui` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./field`, `./switch` |
| Secciones visibles en Docs | Versión → Patrones → Posición del texto → Escala → Estados → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type SwitchExampleProps = {
  appearance?: "default" | "contained"
  text?: "label" | "description"
  textSide?: "left" | "right"
  state?: "default" | "error" | "disabled"
  size?: "sm" | "default"
  checked?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `appearance` | `default` |
| `text` | `label` |
| `textSide` | `right` |
| `state` | `default` |
| `size` | `default` |
| `checked` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `appearance` | Presentación | Composición | Sí | inline-radio | `default`, `contained` | — |
| `text` | Texto | Composición | Sí | inline-radio | `label`, `description` | — |
| `textSide` | Posición del texto | Composición | Sí | inline-radio | `left`, `right` | — |
| `size` | Tamaño | Apariencia | Sí | inline-radio | `sm`, `default` | — |
| `state` | Estado | Estado | Sí | inline-radio | `default`, `error`, `disabled` | — |
| `checked` | Activo inicialmente | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-switch--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-switch--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **switch-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Table

Primitivas semánticas de tabla para headers, filas, celdas, captions y contenido especializado.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `table` |
| Categoría | Data display |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | React/HTML semántico |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 2064:259](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2064-259) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-table--docs) |
| Registry | [table.json](https://ds-grm-documentation.vercel.app/r/table.json) |
| Implementación | `src/components/ui/table.tsx` |
| Composición canónica | `src/components/ui/table-example.tsx` |
| Stories | `src/components/ui/table.stories.tsx` |
| Documentación | `src/components/ui/table.mdx` |

### Cambios declarados en la versión del componente

- Bordes `normal` y `rounded`.
- Columnas iniciales `none`, `checkbox`, `switch` y `chevron`.
- Filas alternas y contenido expandible.
- Tabla semántica, responsive y componible basada en shadcn/ui.
- Tipografía, fondos y bordes conectados con los tokens de marca.
- Las celdas preservan la tipografía y geometría propias de componentes anidados.
- CellContent incluye Text, Avatar, Status Label, Status Badge, Progress, Counter y Bulk Options.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableHeaderCellContent`, `TableRow`, `TableCell`, `TableCaption` |
| Data slots | `table-container`, `table`, `table-header`, `table-body`, `table-footer`, `table-row`, `table-head`, `table-header-cell-content`, `table-header-cell-icon`, `table-cell`, `table-caption` |
| Dependencias externas | `react`, `class-variance-authority`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./badge`, `./checkbox`, `./switch`, `./table`, `./table-cell-content` |
| Secciones visibles en Docs | Versión → Borde → Columna inicial → Contenido de celda → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type TableExampleProps = {
  borderStyle?: "normal" | "rounded"
  leadingColumn?: "none" | "checkbox" | "switch" | "chevron"
  striped?: boolean
  stripedRows?: "odd" | "even"
  expanded?: boolean
  rows?: number
  cellContent?: "text" | "avatar" | "status-label" | "status-badge" | "progress" | "counter" | "bulk-options"
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `0` | `E` |
| `1` | `x` |
| `2` | `p` |
| `3` | `r` |
| `4` | `e` |
| `5` | `s` |
| `6` | `s` |
| `7` | `i` |
| `8` | `o` |
| `9` | `n` |
| `10` | `:` |
| `11` | — |
| `12` | `t` |
| `13` | `a` |
| `14` | `b` |
| `15` | `l` |
| `16` | `e` |
| `17` | `E` |
| `18` | `x` |
| `19` | `a` |
| `20` | `m` |
| `21` | `p` |
| `22` | `l` |
| `23` | `e` |
| `24` | `D` |
| `25` | `e` |
| `26` | `f` |
| `27` | `a` |
| `28` | `u` |
| `29` | `l` |
| `30` | `t` |
| `31` | `s` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `borderStyle` | Borde | Apariencia | Sí | inline-radio | `normal`, `rounded` | — |
| `leadingColumn` | Columna inicial | Estructura | Sí | select | `none`, `checkbox`, `switch`, `chevron` | — |
| `striped` | Filas alternas | Apariencia | Sí | boolean | — | — |
| `stripedRows` | Alternar sobre | Apariencia | Sí | inline-radio | `odd`, `even` | — |
| `expanded` | Primera fila expandida | Estado | Sí | boolean | — | — |
| `rows` | Filas | Contenido | Sí | range | — | — |
| `cellContent` | Contenido de celda | Contenido | Sí | select | `text`, `avatar`, `status-label`, `status-badge`, `progress`, `counter`, `bulk-options` | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-table--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-table--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Presets exportados por la composición

#### `tableExampleDefaults`

| Preset | Configuración |
| --- | --- |
| `borderStyle` | `normal` |
| `leadingColumn` | `none` |
| `striped` | `false` |
| `stripedRows` | `odd` |
| `expanded` | `false` |
| `rows` | `4` |
| `cellContent` | `text` |

### Especificaciones consolidadas desde Docs

#### Datos documentales: `contentCases`

| Valor 1 | Valor 2 |
| --- | --- |
| `Text` | `text` |
| `Avatar` | `avatar` |
| `Status Label` | `status-label` |
| `Status Badge` | `status-badge` |
| `Progress` | `progress` |
| `Counter` | `counter` |
| `Bulk Options` | `bulk-options` |

#### Datos documentales: `rows`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 | Valor 5 | Valor 6 |
| --- | --- | --- | --- | --- | --- |
| `Contenedor` | `100%` | `—` | `—` | `--card / --border` | `overflow-x-auto` |
| `Header` | `100%` | `36px` | `10px` | `--muted / 40%` | `sticky top-0` |
| `Header text` | `—` | `16px` | `—` | `--muted-foreground` | `12px · 600 · uppercase` |
| `Body cell` | `Flexible` | `49px mín.` | `8px 10px` | `--foreground` | `14px / 20px` |
| `Striped rows` | `100%` | `Según fila` | `—` | `--muted / 5%` | `stripedRows: odd \| even` |
| `Text` | `Flexible` | `20–32px` | `—` | `--foreground` | `Sans/Mono · regular/medium/link` |
| `Numeric value` | `140px` | `20px` | `8px 10px` | `--brand-font-mono` | `14/20px · alineación derecha` |
| `Avatar` | `Flexible` | `28–42px` | `—` | `--foreground` | `Supporting/Compact/Metadata/Custom` |
| `Status Label` | `Flexible` | `20px` | `—` | `--success/warning/destructive` | `Indicador 6px + label` |
| `Status Badge` | `Auto` | `30px` | `5px 11px` | `Tokens semánticos light` | `Badge outline XL` |
| `Progress` | `139px` | `20px` | `—` | `Semántico por valor` | `Track 97×4px + porcentaje` |
| `Counter` | `94px` | `32px` | `—` | `--border` | `Rango 1–10` |
| `Bulk Options` | `Auto` | `32px` | `—` | `Button tokens` | `Icon Buttons · gap 6px` |
| `Checkbox column` | `36px` | `Según control` | `10px` | `—` | `Checkbox público` |
| `Switch column` | `52px` | `Según control` | `10px` | `--primary / --input` | `Activa por defecto · Off aplica opacity-30 a la fila` |
| `Chevron column` | `34px` | `48px` | `10px` | `—` | `Icono 14px` |
| `Expanded row` | `100%` | `Auto` | `16px` | `--muted / 20%` | `colSpan completo` |
| `Rounded` | `100%` | `—` | `—` | `--border` | `rounded-lg · shadow-xs` |

### Reglas de uso para wireframes

- Construir la instancia mediante **table-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Tabs

Cambio entre paneles relacionados mediante triggers contenidos o underline.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `tabs` |
| Categoría | Navigation |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1:33](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-33) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-tabs--docs) |
| Registry | [tabs.json](https://ds-grm-documentation.vercel.app/r/tabs.json) |
| Implementación | `src/components/ui/tabs.tsx` |
| Composición canónica | `src/components/ui/tabs-example.tsx` |
| Stories | `src/components/ui/tabs.stories.tsx` |
| Documentación | `src/components/ui/tabs.mdx` |

### Cambios declarados en la versión del componente

- Conserva Root, List, Trigger y Content sobre el primitive accesible de Radix utilizado por shadcn/ui.
- Mapea Contained a `variant="default"` y Underline a `variant="line"`, sin crear aliases públicos.
- Integra orientación vertical, disabled e iconos oficiales además de las composiciones de 2 a 9 tabs de Figma.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `tabsListVariants` |
| Data slots | `tabs`, `tabs-list`, `tabs-trigger`, `tabs-content` |
| Dependencias externas | `react`, `class-variance-authority`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./tabs` |
| Secciones visibles en Docs | Versión → Variantes de estilo → Comportamientos oficiales → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type TabsExampleProps = {
  variant?: "default" | "line"
  orientation?: "horizontal" | "vertical"
  tabAmount?: TabAmount
  activeTab?: number
  iconPosition?: "none" | "left" | "right" | "both"
  disabledTab?: boolean
  showContent?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `variant` | `default` |
| `orientation` | `horizontal` |
| `tabAmount` | `4` |
| `activeTab` | `1` |
| `iconPosition` | `none` |
| `disabledTab` | `false` |
| `showContent` | `true` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `variant` | Estilo | Apariencia | Sí | inline-radio | `default`, `line` | — |
| `orientation` | Orientación | Disposición | Sí | inline-radio | `horizontal`, `vertical` | — |
| `tabAmount` | Cantidad | Contenido | Sí | range | — | — |
| `activeTab` | Tab activa | Estado | Sí | range | — | — |
| `iconPosition` | Iconos | Contenido | Sí | inline-radio | `none`, `left`, `right`, `both` | — |
| `disabledTab` | Última deshabilitada | Estado | Sí | boolean | — | — |
| `showContent` | Mostrar panel | Contenido | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-tabs--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-tabs--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Reglas de uso para wireframes

- Construir la instancia mediante **tabs-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Toast

Notificación temporal basada en Toast de Base UI con estados y comportamientos compuestos.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `toast` |
| Categoría | Feedback |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Base UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y Toast de Base UI |
| Figma | [nodo 1:45](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-45) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-toast--docs) |
| Registry | [toast.json](https://ds-grm-documentation.vercel.app/r/toast.json) |
| Implementación | `src/components/ui/toast.tsx` |
| Composición canónica | `src/components/ui/toast-example.tsx` |
| Stories | `src/components/ui/toast.stories.tsx` |
| Documentación | `src/components/ui/toast.mdx` |

### Cambios declarados en la versión del componente

- Conserva manager, Provider, Portal, Viewport, Root, Content, Title, Description, Action y Close del Toast oficial de shadcn/ui.
- Incluye tipos, promesas, stacking y swipe dismissal de Base UI.
- Mapea los seis estados de Figma mediante `type`, composición pública y tokens semánticos por marca.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `ToastData`, `Toaster`, `Toast`, `ToastAction`, `ToastClose`, `ToastContent`, `ToastDescription`, `ToastIcon`, `ToastList`, `ToastPortal`, `ToastProvider`, `ToastTitle`, `ToastViewport`, `createToastManager`, `toast`, `useToastManager` |
| Data slots | `toast-portal`, `toast-viewport`, `toast`, `toast-content`, `toast-title`, `toast-description`, `toast-action`, `toast-close`, `toast-icon` |
| Dependencias externas | `react`, `@base-ui/react/toast`, `lucide-react` |
| Dependencias Registry | `@grm/button`, `@grm/grm-base` |
| Composición interna del ejemplo | `./button`, `./toast` |
| Secciones visibles en Docs | Versión → Estados → Composición → Comportamientos oficiales → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ToastStatus = "success" | "warning" | "error" | "info" | "brand-neutral" | "neutral"
```

```ts
export type ToastBehavior = "standard" | "promise" | "stack"
```

```ts
export type ToastExampleProps = {
  status?: ToastStatus
  text?: string
  showIcon?: boolean
  showDescription?: boolean
  showAction?: boolean
  showClose?: boolean
  behavior?: ToastBehavior
  preview?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `status` | `success` |
| `text` | `Datos actualizados` |
| `showIcon` | `true` |
| `showDescription` | `false` |
| `showAction` | `false` |
| `showClose` | `false` |
| `behavior` | `standard` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `status` | Estado | Apariencia | Sí | select | `success`, `warning`, `error`, `info`, `brand-neutral`, `neutral` | — |
| `text` | Texto | Contenido | Sí | text | — | — |
| `showIcon` | Icono | Contenido | Sí | boolean | — | — |
| `showDescription` | Descripción | Contenido | Sí | boolean | — | — |
| `showAction` | Acción | Contenido | Sí | boolean | — | — |
| `showClose` | Cerrar | Contenido | Sí | boolean | — | — |
| `behavior` | Comportamiento | Comportamiento | Sí | inline-radio | `standard`, `promise`, `stack` | — |
| `preview` | preview | General | No | automático | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-toast--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-toast--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `statuses`

| Valor 1 | Valor 2 |
| --- | --- |
| `Success` | `success` |
| `Warning` | `warning` |
| `Error` | `error` |
| `Info` | `info` |
| `Brand neutral` | `brand-neutral` |
| `Neutral` | `neutral` |

#### Datos documentales: `statusRows`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 | Valor 5 |
| --- | --- | --- | --- | --- |
| `success` | `--success-light` | `--success-light-foreground` | `--success-light-border` | `CircleCheckIcon` |
| `warning` | `--warning-light` | `--warning-light-foreground` | `--warning-light-border` | `TriangleAlertIcon` |
| `error` | `--error-light` | `--error-light-foreground` | `--error-light-border` | `CircleXIcon` |
| `info` | `--info-light` | `--info-light-foreground` | `--info-light-border` | `InfoIcon` |
| `brand-neutral` | `--background` | `--foreground` | `--border` | `CircleCheckIcon` |
| `neutral` | `--card` | `--foreground` | `--border` | `CircleCheckIcon` |

#### Datos documentales: `geometryRows`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 | Valor 5 | Valor 6 |
| --- | --- | --- | --- | --- | --- |
| `Toast` | `--toast-width` | `--toast-compact-height · auto con extras` | `p-4` | `gap-3` | `rounded-2xl` |
| `Icon` | `size-4` | `size-4` | `p-0` | `—` | `—` |
| `Title` | `intrínseco` | `--toast-title-line-height` | `p-0` | `—` | `—` |

### Reglas de uso para wireframes

- Construir la instancia mediante **toast-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Toggle

Control presionable independiente con icono, texto, estilos y tamaños.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `toggle` |
| Categoría | Action |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 3267:2627](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3267-2627) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-toggle--docs) |
| Registry | [toggle.json](https://ds-grm-documentation.vercel.app/r/toggle.json) |
| Implementación | `src/components/ui/toggle.tsx` |
| Composición canónica | `src/components/ui/toggle-example.tsx` |
| Stories | `src/components/ui/toggle.stories.tsx` |
| Documentación | `src/components/ui/toggle.mdx` |

### Cambios declarados en la versión del componente

- Conserva el primitive Radix, `aria-pressed`, estado controlado/no controlado y navegación por teclado.
- Adapta variantes, tamaños, pressed, hover, focus y disabled desde Figma.
- Mantiene icono, texto o ambos como composición de `children`.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Toggle`, `toggleVariants` |
| Data slots | `toggle` |
| Dependencias externas | `react`, `class-variance-authority`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./toggle` |
| Secciones visibles en Docs | Versión → Variantes de estilo → Contenido → Escala → Estados → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ToggleExampleProps = {
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  content?: "icon" | "text" | "icon-text"
  pressed?: boolean
  disabled?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `variant` | `default` |
| `size` | `default` |
| `content` | `icon-text` |
| `pressed` | `false` |
| `disabled` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `variant` | Estilo | Apariencia | Sí | inline-radio | `default`, `outline` | — |
| `size` | Tamaño | Apariencia | Sí | inline-radio | `sm`, `default`, `lg` | — |
| `content` | Contenido | Composición | Sí | inline-radio | `icon`, `text`, `icon-text` | — |
| `pressed` | Presionado inicialmente | Estado | Sí | boolean | — | — |
| `disabled` | Deshabilitado | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-toggle--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-toggle--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `sizes`

| label | value | height | padding |
| --- | --- | --- | --- |
| `Small` | `sm` | `32px` | `6px` |
| `Default` | `default` | `36px` | `8px` |
| `Large` | `lg` | `40px` | `10px` |

### Reglas de uso para wireframes

- Construir la instancia mediante **toggle-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Toggle Group

Agrupación single o multiple construida sobre Toggle.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `toggle-group` |
| Categoría | Action |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 3331:60517](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3331-60517) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-toggle-group--docs) |
| Registry | [toggle-group.json](https://ds-grm-documentation.vercel.app/r/toggle-group.json) |
| Implementación | `src/components/ui/toggle-group.tsx` |
| Composición canónica | `src/components/ui/toggle-group-example.tsx` |
| Stories | `src/components/ui/toggle-group.stories.tsx` |
| Documentación | `src/components/ui/toggle-group.mdx` |

### Cambios declarados en la versión del componente

- Conserva selección única y múltiple, navegación por teclado, orientación y estado disabled del primitive oficial.
- Adapta la escala visual de Toggle y el gap predeterminado de 8 px del set de Figma.
- Permite composiciones de 1 a 10 ítems con icono, texto o ambos, sin crear una API paralela.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `ToggleGroup`, `ToggleGroupItem` |
| Data slots | `toggle-group`, `toggle-group-item` |
| Dependencias externas | `react`, `class-variance-authority`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base`, `@grm/toggle` |
| Composición interna del ejemplo | `./toggle-group` |
| Secciones visibles en Docs | Versión → Tipo de selección → Variantes de estilo → Contenido → Disposición → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type ToggleGroupExampleProps = {
  type?: "single" | "multiple"
  items?: number
  content?: "icon" | "text" | "icon-text"
  singleValue?: string
  multipleValues?: string[]
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  spacing?: number
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `type` | `single` |
| `items` | `5` |
| `content` | `icon` |
| `singleValue` | `item-3` |
| `multipleValues` | `["item-2","item-4"]` |
| `variant` | `default` |
| `size` | `default` |
| `spacing` | `2` |
| `orientation` | `horizontal` |
| `disabled` | `false` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `type` | Selección | Comportamiento | Sí | inline-radio | `single`, `multiple` | — |
| `items` | Cantidad | Composición | Sí | select | `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10` | — |
| `content` | Contenido | Composición | Sí | inline-radio | `icon`, `text`, `icon-text` | — |
| `singleValue` | Valor seleccionado | Selección única | Sí | select | `none`, `item-1`, `item-2`, `item-3`, `item-4`, `item-5`, `item-6`, `item-7`, `item-8`, `item-9`, `item-10` | — |
| `multipleValues` | Valores seleccionados | Selección múltiple | Sí | multi-select | `item-1`, `item-2`, `item-3`, `item-4`, `item-5`, `item-6`, `item-7`, `item-8`, `item-9`, `item-10` | — |
| `variant` | Estilo | Apariencia | Sí | inline-radio | `default`, `outline` | — |
| `size` | Tamaño | Apariencia | Sí | inline-radio | `sm`, `default`, `lg` | — |
| `spacing` | Spacing | Disposición | Sí | range | — | — |
| `orientation` | Orientación | Disposición | Sí | inline-radio | `horizontal`, `vertical` | — |
| `disabled` | Deshabilitado | Estado | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-toggle-group--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-toggle-group--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `sizes`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `sm` | `32px` | `32px` | `6px` |
| `default` | `36px` | `36px` | `8px` |
| `lg` | `40px` | `40px` | `10px` |

### Reglas de uso para wireframes

- Construir la instancia mediante **toggle-group-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Componente: Tooltip

Ayuda contextual breve activada por hover o foco y vinculada accesiblemente al trigger.

### Identidad y fuentes de verdad

| Campo | Valor |
| --- | --- |
| Slug | `tooltip` |
| Categoría | Overlay |
| Tipo | Primitive o wrapper público |
| Base técnica detectada | Radix UI |
| Versión documentada | `v1.0.0` — Implementación inicial desde Figma y shadcn/ui |
| Figma | [nodo 1:30](https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-30) |
| Docs | [abrir](https://ds-grm-documentation.vercel.app/?path=/docs/components-tooltip--docs) |
| Registry | [tooltip.json](https://ds-grm-documentation.vercel.app/r/tooltip.json) |
| Implementación | `src/components/ui/tooltip.tsx` |
| Composición canónica | `src/components/ui/tooltip-example.tsx` |
| Stories | `src/components/ui/tooltip.stories.tsx` |
| Documentación | `src/components/ui/tooltip.mdx` |

### Cambios declarados en la versión del componente

- Conserva Provider, Root, Trigger, Content, Portal y Arrow de Radix/shadcn.
- Mantiene apertura por hover y foco, demora configurable, colisiones, lados y alineación.
- Adapta geometría, flecha, color y tipografía mediante tokens del Design System.

### Contrato técnico y composición

| Aspecto | Detalle |
| --- | --- |
| Exports públicos | `Tooltip`, `TooltipContent`, `TooltipProvider`, `TooltipTrigger` |
| Data slots | `tooltip-provider`, `tooltip`, `tooltip-trigger`, `tooltip-content` |
| Dependencias externas | `react`, `radix-ui`, `lucide-react` |
| Dependencias Registry | `@grm/grm-base` |
| Composición interna del ejemplo | `./badge`, `./button`, `./kbd`, `./tooltip` |
| Secciones visibles en Docs | Versión → Tipos de trigger → Posición → Contenido → Especificaciones → Código |

### Propiedades públicas de la composición de Playground

Estas declaraciones corresponden al archivo compartido entre Docs y Playground. No todas amplían el primitive; varias son controles editoriales de la composición.

```ts
export type TooltipExampleProps = {
  triggerType?: "button" | "icon" | "badge" | "text"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  opened?: boolean
  showShortcut?: boolean
  delayDuration?: number
  avoidCollisions?: boolean
}
```

### Valores predeterminados globales de Storybook

| Propiedad | Valor |
| --- | --- |
| `triggerType` | `button` |
| `side` | `top` |
| `align` | `center` |
| `opened` | `false` |
| `showShortcut` | `false` |
| `delayDuration` | `0` |
| `avoidCollisions` | `true` |

### Controles globales

| Propiedad | Nombre visible | Categoría | Visible | Control | Opciones | Descripción |
| --- | --- | --- | --- | --- | --- | --- |
| `triggerType` | Trigger | Composición | Sí | select | `button`, `icon`, `badge`, `text` | — |
| `side` | Lado | Posición | Sí | inline-radio | `top`, `right`, `bottom`, `left` | — |
| `align` | Alineación | Posición | Sí | inline-radio | `start`, `center`, `end` | — |
| `opened` | Abierto | Estado | Sí | boolean | — | — |
| `showShortcut` | Mostrar shortcut | Contenido | Sí | boolean | — | — |
| `delayDuration` | Demora | Comportamiento | Sí | number | — | — |
| `avoidCollisions` | Evitar colisiones | Comportamiento | Sí | boolean | — | — |

### Stories y Playground

#### Playground

[Abrir story](https://ds-grm-documentation.vercel.app/?path=/story/components-tooltip--playground) · [Abrir canvas aislado](https://ds-grm-documentation.vercel.app/iframe.html?id=components-tooltip--playground&viewMode=story)

| Propiedad | Valor |
| --- | --- |
| Render compartido explícito | No; usa el componente definido en meta |
| Prueba de interacción | Sí |

**Args de esta story**

_No define valores propios; hereda los valores globales._
### Especificaciones consolidadas desde Docs

#### Datos documentales: `behavior`

| Valor 1 | Valor 2 | Valor 3 | Valor 4 |
| --- | --- | --- | --- |
| `Trigger` | `asChild` | `Hover · focus` | `TooltipTrigger` |
| `Lado` | `top \| right \| bottom \| left` | `top` | `TooltipContent.side` |
| `Alineación` | `start \| center \| end` | `center` | `TooltipContent.align` |
| `Demora` | `number` | `0ms` | `TooltipProvider.delayDuration` |
| `Colisiones` | `boolean` | `true` | `TooltipContent.avoidCollisions` |

### Reglas de uso para wireframes

- Construir la instancia mediante **tooltip-example.tsx** o los exports públicos listados; no copiar el HTML de las cards editoriales.
- Mantener exactamente las combinaciones expuestas por las stories y sus controles.
- Aplicar tokens de la marca activa; no convertir valores de una marca en estilos fijos.
- Conservar interacción, foco, teclado, disabled y atributos accesibles del primitive.
- Si una necesidad no figura en los tipos, controles, presets o especificaciones anteriores, tratarla como gap.

## Piezas de soporte no documentadas como componente independiente

Estas piezas pueden ser dependencias legítimas, pero no deben presentarse como componentes aprobados del catálogo UX/UI mientras no tengan Docs y Playground propios.

| Nombre | Tipo Registry | Descripción | Archivo | Dependencias |
| --- | --- | --- | --- | --- |
| `aspect-ratio` | registry:ui | Aspect Ratio requerido como soporte por los componentes públicos GRM. | `src/components/ui/aspect-ratio.tsx` | `@grm/grm-base` |
| `bubble` | registry:ui | Bubble requerido como soporte por los componentes públicos GRM. | `src/components/ui/bubble.tsx` | `@grm/grm-base` |
| `chart` | registry:ui | Chart requerido como soporte por los componentes públicos GRM. | `src/components/ui/chart.tsx` | `@grm/grm-base` |
| `command` | registry:ui | Command requerido como soporte por los componentes públicos GRM. | `src/components/ui/command.tsx` | `@grm/dialog`, `@grm/grm-base`, `@grm/input-group` |
| `data-table-features` | registry:lib | Data Table Features requerido como soporte por los componentes públicos GRM. | `src/components/ui/data-table-features.ts` | `@grm/grm-base` |
| `dialog` | registry:ui | Dialog requerido como soporte por los componentes públicos GRM. | `src/components/ui/dialog.tsx` | `@grm/button`, `@grm/grm-base` |
| `direction` | registry:ui | Direction requerido como soporte por los componentes públicos GRM. | `src/components/ui/direction.tsx` | `@grm/grm-base` |
| `input-group` | registry:ui | Input Group requerido como soporte por los componentes públicos GRM. | `src/components/ui/input-group.tsx` | `@grm/button`, `@grm/grm-base`, `@grm/input`, `@grm/textarea` |
| `marker` | registry:ui | Marker requerido como soporte por los componentes públicos GRM. | `src/components/ui/marker.tsx` | `@grm/grm-base` |
| `message` | registry:ui | Message requerido como soporte por los componentes públicos GRM. | `src/components/ui/message.tsx` | `@grm/grm-base` |
| `message-scroller` | registry:ui | Message Scroller requerido como soporte por los componentes públicos GRM. | `src/components/ui/message-scroller.tsx` | `@grm/button`, `@grm/grm-base` |
| `questionnaire` | registry:ui | Questionnaire requerido como soporte por los componentes públicos GRM. | `src/components/ui/questionnaire.tsx` | `@grm/button`, `@grm/grm-base` |
| `skeleton` | registry:ui | Skeleton requerido como soporte por los componentes públicos GRM. | `src/components/ui/skeleton.tsx` | `@grm/grm-base` |
| `table-cell-content` | registry:ui | Table Cell Content requerido como soporte por los componentes públicos GRM. | `src/components/ui/table-cell-content.tsx` | `@grm/avatar`, `@grm/button`, `@grm/button-group`, `@grm/grm-base`, `@grm/progress` |
| `textarea` | registry:ui | Textarea requerido como soporte por los componentes públicos GRM. | `src/components/ui/textarea.tsx` | `@grm/grm-base` |
| `use-mobile` | registry:hook | Hook responsive requerido por Sidebar. | `src/hooks/use-mobile.ts` | — |

## Protocolo para crear una pantalla completa

1. Definir marca, objetivo, audiencia, viewport y estados obligatorios.
2. Seleccionar componentes únicamente desde el inventario v1.
3. Leer la sección de cada componente seleccionado; no leer capítulos no usados.
4. Elegir args y presets existentes. No combinar controles incompatibles.
5. Construir primero la estructura, después contenido, estados y responsive.
6. Aplicar la tipografía y los tokens semánticos de la marca.
7. Añadir estados loading, empty, error, disabled y selección solo donde el flujo los requiera.
8. Revisar foco, teclado, labels, nombres accesibles, contraste y orden de tabulación.
9. Comparar contra Playground cuando exista acceso visual; de lo contrario, usar tipos, args y especificaciones de este catálogo.
10. Entregar una lista de componentes usados, configuraciones elegidas, aproximaciones y gaps.

## Plantilla compacta de brief UX/UI

```yaml
screen:
  name: "Nombre de la pantalla"
  objective: "Tarea principal"
  audience: "Usuario objetivo"
brand: "grm-global | reina-madre | maria-linda | piel-sana"
viewport: "desktop | tablet | mobile | responsive"
components:
  required: []
  forbidden: []
states:
  - data
  - loading
  - empty
  - error
content:
  language: "es-MX"
  data_policy: "fictitious"
interactions: []
acceptance:
  - "Uses only documented component APIs"
  - "Uses semantic tokens for the selected brand"
  - "Reports gaps instead of inventing variants"
```

## Versionamiento y actualización del catálogo

Este archivo es un artefacto generado y versionado junto con el código. Su frontmatter registra la versión vigente del paquete. Git conserva el historial completo de cada cambio.

### Regla por release

1. Modificar Figma, tokens, primitive, example, story y Docs según el contrato.
2. Crear el changeset del componente.
3. Actualizar la versión mediante Changesets.
4. Ejecutar `npm run registry:generate`.
5. Ejecutar `npm run catalog:generate`.
6. Revisar el diff de `STORYBOOK_UX_UI_CATALOG.md`.
7. Ejecutar `npm run release` y validar Storybook.
8. Confirmar que versión, controles, presets, tokens y enlaces correspondan a la release.
9. Commit y tag de la versión incluyendo este archivo.

### Qué debe cambiar automáticamente

- Versión global desde `package.json`.
- Inventario y nodos Figma desde `public/r/ai-manifest.json`.
- Tokens desde los archivos de Foundations.
- Tipografía y traducción Tailwind desde la fuente tipográfica.
- Componentes, dependencias y rutas desde el Registry.
- Props, defaults, controles y stories desde CSF.
- Presets desde `*-example.tsx`.
- Especificaciones desde `*-docs.tsx`.
- Versión y secciones visibles desde MDX.

## Checklist de fidelidad 1:1

- [ ] La marca y `data-theme` están definidos.
- [ ] Todos los componentes existen en el inventario v1.
- [ ] Cada componente usa props y presets documentados.
- [ ] No se usaron piezas de soporte como si fueran componentes UX/UI aprobados.
- [ ] Tipografía, tamaño, peso, line-height y tracking corresponden al catálogo.
- [ ] Fondo, texto, borde, focus ring y estados consumen variables semánticas.
- [ ] Padding, gap, altura, anchura, radio e iconos respetan especificaciones.
- [ ] Loading, empty, error, disabled, hover, active y selección están considerados donde aplican.
- [ ] La composición mantiene responsive y accesibilidad.
- [ ] Docs y Playground comparten la misma instancia de ejemplo.
- [ ] Las aproximaciones están declaradas y los gaps no se ocultaron.

## Cierre normativo

Ante una contradicción, prevalece shadcn/ui para el contrato técnico, Figma para la intención visual GRM y Playground para la instancia renderizada. Este catálogo facilita el consumo y el versionamiento, pero no autoriza implementaciones paralelas ni propiedades no documentadas.

