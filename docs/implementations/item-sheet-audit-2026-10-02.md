# Auditoría Figma → código · Item y Sheet
Fecha: 2 de octubre de 2026. Archivo: X33xAJBT7ty8FWYDFVvo3m.

| Hallazgo con evidencia | Causa | Solución aplicada |
| --- | --- | --- |
| Item 2190:2109 tiene 115 variantes y dimensiones Appearance/Status; código exponía solo Default/Outline/Muted. Light/info 7146:2193 confirma fondo, borde y texto semánticos. | Composición anterior sin estados ni Light. | itemAppearanceClasses compone las cuatro apariencias y cinco estados sobre variant/size/render existentes. |
| Tokens de estados: success, warning, error, info usan light-foreground; Outline añade light-border; Muted añade light; Light combina ambos. Neutral Light usa blanco y border. | Tokens no documentados en Item. | Helper compartido con aliases CSS locales a tokens existentes; neutral Light usa card (blanco en las marcas). Matriz visible en Docs y controles de Playground. |
| Compact 2191:3492 usa padding 8×10 px y descripción 12/16 px. | Código usaba py-1.5 y texto 14 px. | Ajuste de composición Compact; tamaños oficiales conservados. |
| Muted 2190:2124 tiene opacity=1 y token muted. | Ejemplo heredaba muted/50. | Fondo completo por composición. |
| Iconos de estado son circle-check, triangle-alert, circle-x, info; neutral usa a-arrow-down. | Ejemplo usaba Bell. | Reutilización de los iconos Lucide equivalentes del DS. |
| Títulos y descripción de Item usan 14/20 px; título neutral usa card/foreground. | Leading heredado no era exactamente 20 px. | Tipografía conciliada por composición; acciones conservan tokens propios. |
| Sheet FreeOptions 7180:4084 se llama label y tiene Label + Description, 48 px. Edit-form 1304:1084 añade sección final 7180:22380. | Versión previa aún trataba esa opción como duplicado de avatar. | Nueva sección Información adicional con FieldTitle y FieldDescription. |
| Encabezados BodySection usan 10 px con line-height automático, 12 px renderizados. | Código usaba leading-none (10 px). | Leading de 12 px. |

## Correcciones preservadas
- Tirador en franja independiente de 16 px, fondo muted, grip 2×40.
- Resize continuo 360–720 px y adaptación Tabs/Overflow conservando valores.
- Padding de 16 px en ambos lados del viewport.
- Carril adicional de 10 px solo al existir scrollbar vertical; sin scrollbar no se reserva espacio.
- Portales de Calendar y Combobox fuera de ScrollArea, dentro de SheetContent.
- Altura de 36 px para fecha al apilarse.
- No se modifican variables de Figma ni colores oficiales, releases publicadas o excepciones de marca.

## Validación
- 21 pruebas Chromium de Item y Sheet aprobadas, con accesibilidad configurada.
- TypeScript y ESLint correctos.
- Revisión visual y compilación Storybook en el flujo de cierre.
- Cambios locales; no se publican.
