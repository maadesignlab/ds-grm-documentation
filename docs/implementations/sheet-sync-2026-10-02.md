# Sheet · Conciliación Figma → código
Fecha: 2 de octubre de 2026.
Archivo: X33xAJBT7ty8FWYDFVvo3m. Página Sheet: 1295:386.

## Fuentes leídas
- Sheet 1295:1240: posiciones, paneles 360/720, slots, header y acciones.
- BodySection 7020:10662: free 7020:10663 y contained 7152:3310.
- ContainedRow 7152:3345: sans 7152:3331 y sans-mono 7152:3346.
- FreeOptions 7158:1946: item, input, input-double, combobox, switch, date-picker e item-avatar.
- ContentExample 7161:31078: edit-form 1304:1084 y details-view 7161:31079.
- Content Option8 7180:4084 repite la composición item-avatar; no define otro comportamiento.

## Implementación
- sheet-content-sections.tsx: secciones reutilizables free/contained y filas sans/mono.
- sheet-content-example.tsx: formulario y vista de detalle; estado controlado desde SheetExample.
- Playground: contentType none/edit-form/details-view; predeterminado edit-form.
- Docs: mismos ejemplos que Playground, muestras de filas, fuentes y fecha actualizadas.
- Componentes existentes: Field, Input, InputGroup, Switch, Combobox, Popover, Calendar, Item, Avatar, Button, Separator.
- Colores: tokens semánticos existentes; ningún primitivo ni variable de Figma modificado.
- ComboboxContent y PopoverContent admiten container opcional para alojar sus portales dentro del modal Radix sin perder foco ni interacción. Escape cierra primero el desplegable.
- Se conserva el redimensionamiento continuo 360–720 px solicitado por el usuario, aunque la descripción original de Figma mencione extremos.
- Fecha/hora se apilan debajo de 353 px interiores; los valores sobreviven al cambio Tabs/Overflow.
- Títulos descriptivos en los ejemplos evitan regiones accesibles idénticas.
- Cambiar es una acción ilustrativa del diseño; no implementa carga de archivos.

## Validación
- TypeScript y ESLint: correctos.
- 21 pruebas Chromium: Sheet, Tabs, Combobox y Popover, incluyendo accesibilidad configurada, teclado, arrastre, persistencia y portales.
- Storybook y registro: compilación correcta.
- Cambios locales, sin modificar releases publicadas.

## Revisión posterior de espaciados
- Figma 7180:5465 / 7180:4369: contenido separado de franja de resize de 16 px; muted, grip 2×40.
- BodyTypes: navegación sin padding horizontal; slots con 16 px laterales; blank 10 px verticales.
- ScrollArea existente: scrollbar superpuesto en el margen, viewport con ancho estable; header/footer fuera del scroll.
- Fecha mantiene 36 px al apilarse en el panel estrecho.
- Prueba SpacingRegression verifica no solapamiento del tirador, paddings y ancho estable durante scroll.

## Corrección de scrollbar y anclaje del calendario
- Se reemplaza la superposición por un carril reservado de 10 px fuera del viewport.
- Margen visible de 16 px por lado: izquierda 16 px; derecha 6 px de padding + 10 px de carril.
- Portales de calendario y combobox alojados en SheetContent, fuera de ScrollArea y del contenedor de formulario. Conservan anclaje y gestión de foco del DS sin recortarse al llegar al footer.
- Pruebas verifican margen total, reserva de carril, alineación del calendario y límites del viewport.
