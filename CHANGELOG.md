# Changelog

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
