# Changelog

## 1.3.0 — 2026-10-15

- **Badge v1.0.1 → v1.1.0**: Aliases para consumidores existentes. default equivale a primary/solid; outline a transparent/outline. Una apariencia explícita prevalece sobre la inferida por el alias.
- **Popover v1.1.0 → v1.2.0**: Anclaje, composición y control de foco compatibles. Añade PopoverAnchor, anchor y collisionPadding. Trigger admite asChild; conserva render de Base UI. Añade onOpenAutoFocus y onCloseAutoFocus cancelables; conserva initialFocus, finalFocus y container.
- **Sheet v1.1.0 → v1.2.0**: Redimensionamiento disponible como composición instalable. Expone defaultWidth, resizable, resizeKey y onWidthChange. Reutiliza la composición en Storybook y conserva padding, carril condicional y foco. Migración: importar SheetResizableContent; las opciones de tamaño no se agregan al primitive SheetContent.
- **Drawer v1.0.2 → v1.1.0**: Composición asChild en apertura y cierre. DrawerTrigger y DrawerClose admiten asChild; render sigue disponible. Conserva Base UI y swipeDirection; no añade compatibilidad completa con Vaul.
- **Alert v1.0.1 → v1.1.0**: Estados semánticos adicionales conciliados con Figma. Añade success, warning e info con sus tokens light, light-border y light-foreground. Conserva default y destructive; no crea colores primitivos.
- **Calendar v1.0.1 → v1.1.0**: Idioma español y compatibilidad de foco. Español por defecto, meses completos y abreviaturas L M X J V S D. initialFocus funciona como alias de autoFocus; autoFocus explícito tiene prioridad. defaultCalendarEndMonth permanece pendiente de evidencia de su contrato anterior.
- **Card v1.0.1 → v1.0.2**: Contenido de demostración localizado. Textos predeterminados de la demostración en español. Sin cambios en la API ni en la geometría del primitive.
- **Stepper v1.0.0 → v1.0.1**: Atribución distribuida y contraste documentado. Distribuye la licencia MIT como archivo independiente del registro para conservarla tras la transformación del CLI. Documenta el contraste corregido de Continuar en Reina Madre y Piel Sana.

- Tokens: 18 variables versionadas (9 cambios directos y 9 por herencia) y 21 valores resueltos; primary/500 preservado. Detalle en `design-system/pending-token-update.json`.
- Foundations: iconos, espaciados y usos, sombras, integración, modo de color y patrones. Inspector y estilos sin cambio de versión.
- Herramientas: Storybook 10.5.10 → 10.6.2, integración Next.js/Vite y addons alineados; @chromatic-com/storybook fijado en 5.5.1.
- Documentación revisada el 15 de octubre de 2026: títulos compartidos, descripciones orientadas al uso y flujos en Integración, Patrones y Modo de color.
- Gradientes pendientes: Reina Madre normal; Piel Sana normal/hover/active. Tabs Underline de María Linda conserva su excepción histórica. No se declara conformidad WCAG global.
- Diagnósticos y validación de JUNO pendientes según `docs/compatibility/juno/MIGRACION.md`.
- Manifiesto publicado: `design-system/release-manifest.json`.

### Cierre aprobado con salvedades · 2026-10-15

- Publicación aprobada por el usuario con las limitaciones conocidas documentadas.
- Pendientes DS-130-01 a DS-130-07 con responsable, alcance y criterio de cierre en Releases y `docs/releases/1.3.0/PENDIENTES.md`.

- 97 historias aprobadas con a11y activado; no sustituye validación de JUNO ni certifica todos los escenarios de contraste.
- 72 parejas success/error/destructive verificadas en las cuatro marcas.
- Regresiones conservadas en tests/storybook y excluidas del build público.
- Rupturas reportadas de v1.2.0 documentadas con migraciones. Gradientes y Tabs permanecen como decisiones de diseño; diagnósticos incompletos e integración como pendientes de DEV.
- Evidencia: docs/releases/1.3.0/ds-closure.json.

## 1.2.0 — 2026-10-02

Global: 1.1.1 → 1.2.0.

- **Sheet v1.1.0**: Redimensionamiento continuo entre 360 y 720 px; conserva selección y valores. Padding de 16 px y carril de scrollbar de 10 px solo con desbordamiento. Calendario y Combobox fuera del área desplazable para evitar recortes. Etiqueta y descripción, Item Light/info y encabezados conciliados con Figma.
- **Item v1.1.0**: Light y estados se implementan por composición; API del primitivo conservada. Compact: padding 8 × 10 px y descripción 12/16 px. Muted opaco, tipografía 14/20 px e iconos de estado de Figma.
- **Tabs v1.1.0**: Navegación por controles y teclado; selección conservada. Integración adaptable al ancho de Sheet. Texto activo Underline: primary/default-foreground → primary; conserva excepciones de marca.
- **Popover v1.1.0**: Añade container opcional a PopoverContent para controlar el destino del portal. Permite el calendario de Sheet sin recortes; conserva el comportamiento predeterminado.
- **Combobox v1.1.0**: Añade container opcional a ComboboxContent para controlar el destino del portal. Permite opciones dentro del modal Sheet sin recortes; conserva el comportamiento predeterminado.
- **Stepper v1.0.0**: Nuevo componente no legacy basado en francozeta/stepper; licencia MIT conservada. Tamaños default/sm, orientación horizontal/vertical e indicadores numéricos o de icono. Estados pendiente, activo, completado, deshabilitado y error.
- **Inspector v1.0.0**: activación global/local, tarjeta de hover, tokens y geometría, fijación y limpieza.
- Variables, estilos y Drawer sin cambios. Excepciones de marca conservadas; no se declara conformidad WCAG completa.
- Trayectoria: design-system/release-manifest.json y design-system/release-history.json.

## 1.1.1 — 2026-09-23

- Sheet y Drawer v1.0.2: fondo `popover` → `sheet-drawer`, conciliado con las siete variantes de Figma.
- Drawer: extensión del fondo durante swipe usa el mismo token.
- Variables y paletas sin cambios; se mantienen las excepciones documentadas de v1.1.0.

## 1.1.0 — 2026-09-23

### Trayectoria

- Versión global: 1.0.0 → 1.1.0.
- Componentes: versiones independientes en design-system/release-manifest.json y su historial documental; no se reinician ni se igualan a la versión global.
- Variables y estilos: 821 entidades por ID y huella (769 variables, 40 estilos de texto y 12 visuales). Primer registro individual en 1.1.0; previousVersion=null no significa que la entidad sea nueva.
- Historial global y estados: design-system/release-history.json. Diferencias de tokens respecto a 1.0.0: src/foundations/token-changes.json.

### Cambios

- 158 roles semánticos por marca, 632 valores CSS; sincronización de aliases, opacidades, estados y gradientes con Figma.
- Button brand-gradient, tamaños de Input y mejoras de Table, Sidebar y otros consumidores: detalle por componente en el manifiesto y Releases.
- Toast: Description y Close pasan del 72 % al color semántico completo.
- Tipografía organizada por sección, tamaño y familia, propiedades compartidas, excepciones colapsadas y CSS exportable.
- Releases mantiene la estructura de 1.0.0 y añade fichas de cambios al seleccionar cada componente.

### Validaciones y excepciones

- Evidencia técnica en docs/releases/1.1.0/validation.json.
- 28 excepciones aceptadas: primary y brand-gradient de Reina Madre y Piel Sana. No equivalen a conformidad WCAG completa.
- Publicación aprobada por el usuario el 23 de septiembre de 2026.

## 1.0.0 — 2026-09-08

Primera versión estable de la documentación del Design System GRM para Vercel.

### Incluye

- Storybook con 50 componentes documentados y sus Playgrounds canónicos.
- Correspondencia estructural entre Docs y Playground mediante composiciones `*-example.tsx` compartidas.
- Implementaciones basadas prioritariamente en shadcn/ui, con adaptaciones visuales provenientes de Figma.
- Temas para GRM Global, Reina Madre, María Linda y Piel Sana mediante tokens semánticos y selector de marca.
- Documentación de variantes, tamaños, estados, composición, especificaciones y código copiable.
- Contrato de implementación y auditoría en `DESIGN_SYSTEM_WORKFLOW.md`.
- Excepciones técnicas heredadas de shadcn/ui registradas explícitamente.
- Pruebas de interacción y accesibilidad para los componentes documentados.

### Componentes

Accordion, Alert, Alert Dialog, Attachment, Avatar, Badge, Breadcrumb, Button, Button Group, Calendar, Card, Carousel, Checkbox, Collapsible, Combobox, Context Menu, Data Table, Date Picker, Drawer, Dropdown Menu, Empty, Field, Hover Card, Input, Input OTP, Item, Kbd, Label, Menubar, Native Select, Navigation Menu, Pagination, Popover, Progress, Radio Group, Resizable, Scroll Area, Select, Separator, Sheet, Sidebar, Slider, Spinner, Switch, Table, Tabs, Toast, Toggle, Toggle Group y Tooltip.

### Validación de cierre

- TypeScript sin errores.
- ESLint sin errores ni advertencias.
- 51 pruebas superadas en 50 archivos.
- Build de Storybook generado correctamente para Vercel.
