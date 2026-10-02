# Sheet · conciliación 29 de septiembre de 2026

Fuente: X33xAJBT7ty8FWYDFVvo3m, página 1295:386, set 1295:1240. Lectura directa de Figma.

- Laterales: 360/720 px; resize 7099:1938 con grip 2×40 px, muted-foreground, opacidad normal 55%, hover 100%. Anclaje exterior fijo. Por instrucción posterior del usuario, el código permite arrastre continuo entre 360 y 720 px y conserva anchos intermedios, en lugar de alternar los dos estados del prototipo. Flechas: 10 px; Shift + flechas: 50 px; Home/End: límites. El contenedor transparente de 720 px de Figma se resuelve con posicionamiento fixed del panel web.
- BodyTypes 7037:6349: blank, tabs-normal (4 pestañas), tabs-overflow (8 pestañas, 2–4 visibles) y stepper (3 pasos, sin descripciones ni controles).
- Tabs overflow 7065:10055: selección desplaza una posición, chevrons dos; selección conservada al desplazar. Se usan Tabs de Radix del DS.
- Stepper se proporciona como slot de SheetBody, desde la composición compartida basada en francozeta/stepper.
- El área de arrastre permanece transparente en hover y active; la respuesta visual se limita al grip. Se conserva el indicador de foco por teclado.
- Mantiene los encabezados, banda de estado, footer, cierre, foco y API originales. Sin modificaciones de variables o paletas. Sheet permanece en Components/Sheet.
- El primitivo conserva su API y anchos anteriores; los ejemplos ofrecen los nuevos tamaños de Figma.

Validación: tipos, lint, pruebas enfocadas y build de Storybook. Revisión visual manual pendiente por ausencia de navegador conectado. Las excepciones de marca documentadas permanecen vigentes.

## Integración adaptable de Tabs · 29 de septiembre de 2026

- Reutiliza TabsOverflow compartido; elimina la implementación duplicada de flechas y desplazamiento en SheetBody.
- ResizeObserver mide el contenedor y el texto con su tipografía computada. Usa Tabs si caben las etiquetas y Overflow en caso contrario; calcula 2/3/4 visibles. visibleTabs mantiene un ajuste manual opcional.
- Conserva las mismas opciones y selección al cambiar de ancho. La muestra predeterminada de cuatro opciones pasa de Overflow a Tabs entre los extremos. La muestra de ocho conserva ocho: no sustituye datos por los de otra muestra de Figma al redimensionar.
- Mantiene ancho libre 360–720, estados visuales solo en el grip, tokens, footer y comportamiento Radix.
- Pruebas de Tabs + Sheet: 17 aprobadas, incluida ida/vuelta de 360 a 720 con selección conservada. Tipos, lint y build correctos. La revisión visual manual sigue pendiente por falta de navegador conectado.
