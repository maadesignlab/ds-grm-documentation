# Changelog

Todos los cambios relevantes de este proyecto se documentan en este archivo. El proyecto sigue [Semantic Versioning](https://semver.org/).

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
