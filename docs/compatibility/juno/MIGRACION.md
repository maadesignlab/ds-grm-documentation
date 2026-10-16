# Migración de JUNO a la actualización de compatibilidad GRM

Fecha de revisión: 15 de octubre de 2026. Base publicada: DS v1.2.0. Candidato: v1.3.0, local y sin publicar.

Esta actualización atiende los casos reproducibles del reporte de DEV. Recupera APIs de consumo y añade una composición Sheet redimensionable. Requiere ajustes en JUNO; todavía no acredita la resolución de sus 309 errores de tipos ni de las 40 pruebas fallidas.

## Disponibilidad e instalación

Los comandos de esta guía requieren un registro que contenga el candidato. El registro público de v1.2.0 no incluye todavía estas correcciones. Antes de la validación conjunta, el responsable del DS debe entregar a DEV la URL del candidato y su revisión exacta. No sustituir la URL por una dirección localhost de otra máquina.

Configurar `@grm` en `components.json` con esa URL, conservando los demás registros. Instalar cada elemento con su namespace explícito, por ejemplo `@grm/popover`, y revisar el diff antes de sobrescribir personalizaciones de JUNO.

```bash
npx shadcn@4.19.1 add @grm/popover @grm/badge @grm/sheet-resizable @grm/drawer @grm/alert @grm/calendar
```

La versión del CLI indicada es la utilizada en la auditoría. El CLI copia código al proyecto consumidor: los imports de la aplicación deben apuntar a sus archivos locales, por ejemplo `@/components/ui/sheet-resizable`.

La auditoría instaló en una sola invocación 70 componentes y composiciones del registro local. No detectó sustituciones por componentes genéricos y TypeScript compiló sin errores. Este resultado corresponde a un consumidor limpio; no reproduce el comando ni la lista exacta de 43 componentes usados por DEV. Evidencia: [instalación conjunta](bulk-install/result.json).

## Rupturas de API de v1.2.0 frente al consumo reportado

El reporte de JUNO identifica cambios incompatibles en la entrega v1.2.0. Su publicación como minor no elimina ese impacto. v1.3.0 agrega puentes y composiciones; no promete restaurar toda la implementación anterior.

| Ruptura reportada | Cobertura de v1.3.0 | Migración que permanece |
| --- | --- | --- |
| Popover: Radix → Base UI, Anchor y eventos de foco | Anchor, asChild, eventos cancelables y collisionPadding | Revisar propiedades fuera del puente y comportamiento en Alta de Personal |
| Drawer: Radix/Vaul → Base UI | asChild en Trigger y Close | Usar swipeDirection; revisar opciones específicas de Vaul |
| Badge: nombres de variantes | Alias default y outline | Verificar personalizaciones y apariencia explícita |
| Sheet: opciones de resize | SheetResizableContent instalable | Cambiar import y contenedor; no trasladar props al primitive |
| Alert: success, warning e info | Variantes recuperadas | Actualizar código y comprobar mensajes en producto |
| Calendar: idioma y foco | Español y alias initialFocus | Configurar selector y límites; export personalizado pendiente |

## Cambios por componente

| Componente | Resultado disponible en el candidato | Acción en JUNO |
| --- | --- | --- |
| Popover | Anchor, `asChild` en Trigger, eventos de foco y `collisionPadding` | Actualizar el archivo y verificar anclaje, apertura y foco en Alta de Personal. |
| Badge | Alias `default` y `outline` | Mantener esos nombres si se desea; comprobar el aspecto frente a las personalizaciones previas. |
| Sheet | Composición `SheetResizableContent` | Cambiar el import y el contenedor de los paneles redimensionables. |
| Drawer | `asChild` en Trigger y Close | Conservar Base UI y revisar los usos heredados de Vaul. |
| Alert | Estados `success`, `warning`, `info` | Actualizar el archivo y comprobar los avisos en las cuatro marcas. |
| Calendar | Español, meses completos y alias `initialFocus` | Revisar límites de fechas, encabezados y usos de exports personalizados. |

### Sheet

Para paneles redimensionables, importar `SheetResizableContent` desde `@/components/ui/sheet-resizable` y utilizarlo en lugar de `SheetContent`. Mantener Root, Trigger, título, descripción, cuerpo y acciones de la aplicación.

```tsx
import {
  Sheet, SheetTrigger, SheetTitle, SheetDescription,
} from "@/components/ui/sheet"
import { SheetResizableContent } from "@/components/ui/sheet-resizable"

export function PanelPersonal() {
  return (
    <Sheet>
      <SheetTrigger>Editar personal</SheetTrigger>
      <SheetResizableContent defaultWidth={480} resizeKey="personal-edicion">
        <SheetTitle>Editar personal</SheetTitle>
        <SheetDescription>Actualiza los datos del registro.</SheetDescription>
        {/* Insertar aquí el cuerpo y las acciones existentes de JUNO. */}
      </SheetResizableContent>
    </Sheet>
  )
}
```

- `resizable` está activo por defecto y el manejador solo aparece en paneles laterales.
- `defaultWidth` es inicial, no controlado. El rango es 360–720 px, limitado al viewport.
- `resizeKey` activa persistencia bajo `grm:sheet:<clave>` en localStorage. No se migran automáticamente claves históricas de JUNO; el valor guardado tiene prioridad sobre el inicial.
- Se conservan los eventos de foco de Sheet. No trasladar las props de resize al primitive `SheetContent`.
- Mantener la composición con `SheetBody` para conservar el comportamiento de padding y scrollbar. La composición redimensionable no incorpora por sí sola el cuerpo de demostración.

Validar arrastre en ambos lados, flechas, Shift + flecha, Home/End, viewport pequeño, persistencia, campos editados y calendario dentro del panel.

### Drawer

`DrawerTrigger` y `DrawerClose` aceptan `asChild` con un único elemento React que propague props y ref. No combinar `asChild` con `render`; la API nativa `render` permanece disponible.

Drawer continúa usando Base UI. Utilizar `swipeDirection` según la posición prevista; `direction` de Vaul no es un alias incorporado. No hacer un reemplazo mecánico de todas las propiedades de Vaul. Comprobar apertura, cierre, foco, gestos, paneles anidados y puntos de ajuste cuando JUNO los utilice.

### Popover

Se recupera `PopoverAnchor`, con una referencia independiente por Root. El Anchor no actúa como trigger. La propiedad explícita `anchor` de Content tiene prioridad sobre el Anchor contextual.

`PopoverTrigger asChild` conserva la composición con un único hijo; no combinarlo con `render`. Los eventos `onOpenAutoFocus` y `onCloseAutoFocus` son eventos cancelables de compatibilidad: `preventDefault()` impide el movimiento automático del foco. No son eventos DOM despachados sobre el elemento.

`container` sigue disponible para el destino del portal. `collisionPadding` se incorpora a Popover; DEV debe confirmar si el error del reporte corresponde a este componente. No se garantiza compatibilidad con toda la API de Radix.

### Badge

| Uso heredado | Resolución en GRM |
| --- | --- |
| `variant="default"` | `primary` con apariencia `solid` |
| `variant="outline"` | `transparent` con apariencia `outline` |

Una `appearance` explícita tiene prioridad. `solid` es una apariencia, no una variante. Los alias se admiten también en `badgeVariants`. El outline neutral puede diferir de una personalización previa de JUNO; comparar visualmente.

### Alert

`success`, `warning` e `info` usan los tokens existentes de cada estado: `light`, `light-border` y `light-foreground`. Las variantes están conciliadas en Figma; 36 asignaciones de color coinciden con código. Las acciones anidadas mantienen los tokens de Button. Se conservan `default` y `destructive`.

### Calendar

El componente usa español por defecto, encabezados de un carácter y meses completos. `locale` y `formatters` permiten personalizarlo. `initialFocus` es un alias de `autoFocus`; un valor explícito de `autoFocus` tiene prioridad.

El selector mes/año se activa con `captionLayout="dropdown"`. El encabezado predeterminado continúa siendo `label`. Los límites `startMonth` y `endMonth` deben responder al caso de uso de JUNO; no asumir un intervalo genérico para nacimiento, agenda y otras fechas.

`defaultCalendarEndMonth` sigue pendiente: no se ha añadido un valor arbitrario para reemplazar el export reportado.

## Estilos y dependencias

Importar `grm.css` desde la entrada CSS de JUNO y cargar las fuentes instaladas que corresponden a las marcas. Aplicar `data-theme` en un ancestro que incluya los portales, preferentemente `html`. El CLI copia las hojas, pero no conecta automáticamente la entrada CSS.

Comparar las definiciones de JUNO en `globals.css` y `.interface-design/system.md` con los tokens versionados del DS. Documentar las excepciones del producto de forma explícita para que no sustituyan silenciosamente los valores del registro.

Los rangos de dependencias permiten resolver versiones más recientes. En el consumidor limpio se instalaron Base UI 1.9.0, Radix UI 1.8.1, lucide-react 1.57.0 y react-day-picker 10.0.2. No son un requisito de actualización forzada a esas versiones: conservar el lockfile y revisar su diff, dependencias compartidas y pruebas del producto. Véase [inventario de dependencias](bulk-install/dependencies.json).

El CLI elimina algunos marcadores `cn-*` y el comentario inicial de Stepper. El registro ahora incluye la licencia de Stepper como archivo independiente; en el consumidor probado se instaló en `src/licenses/stepper-MIT.txt`.

## Pendientes y responsables

| Pendiente | Información o comprobación necesaria | Responsable de aportar evidencia |
| --- | --- | --- |
| `defaultCalendarEndMonth` | Definición anterior, import y valor esperado por caso de uso | DEV |
| `headingLevel` | Componente, uso exacto y error de TypeScript | DEV |
| 8 errores “Varios” en 4 archivos | Diagnósticos completos y fragmentos afectados | DEV |
| Instalación original de 43 componentes | Comando, lista, CLI y diff del lockfile | DEV |
| Dialog y AlertDialog | Comparación visual de overlay y acciones en JUNO | DEV y DS |
| Table | Contrastar los usos del producto con la composición documentada | DEV y DS |
| Espaciado, sombras, iconos, modo oscuro y patrones | Guías añadidas; modo oscuro completo no soportado | Documentado en DS |
| Textos en inglés e historias de regresión | Card y ejemplos de Stepper en español. Regresiones separadas en tests/storybook; excluidas del build de producción y conservadas en desarrollo | DS |
| Releases y versiones particulares | Versiones particulares y candidato v1.3.0 documentados; publicación pendiente de aprobación | DS |

La revisión del 14 de octubre de 2026 cierra el contraste de primary sólido en Reina Madre y Piel Sana: normal, hover y active cumplen 4,5:1 con blanco, conservando primary/500. En brand-gradient, la rampa de Reina Madre queda pendiente en normal y la de Piel Sana en los tres estados. GRM Global y María Linda superan el mínimo en la rampa completa. Evidencia y método: `primary-contrast/gradient-review.json`. Esta evaluación conservadora de la rampa no sustituye la validación de JUNO ni certifica el resto del DS.

## Criterios de aceptación en JUNO

1. Registrar la revisión del candidato, comando de instalación y versiones resueltas.
2. Ejecutar los comandos de tipos, compilación y pruebas que ya utiliza JUNO; adjuntar resultados y errores restantes, agrupados por causa.
3. Confirmar que Alta de Personal abre, permite edición y conserva foco, teclado, selección de fecha y cierre.
4. Revisar Personal, Alta de Personal, Agenda y Pacientes en las cuatro marcas, con las mismas condiciones del reporte inicial.
5. Verificar los paneles redimensionables, popovers anidados, avisos semánticos y etiquetas.
6. Comprobar las excepciones de marca sin dar por resueltos los contrastes excluidos del alcance.
7. Aprobar la integración y la documentación de migración antes de publicar. Las pruebas del consumidor independiente no sustituyen esta aceptación.

## Evidencia del DS

- [Popover](popover-validation.json) y [consumidor independiente](consumer-install/result.json).
- [Badge](badge/validation.json).
- [Sheet](sheet/validation.json).
- [Drawer, Alert y Calendar](remaining/validation.json).
- [Paridad de colores de Alert](remaining/figma-alert-parity.json).
- [Instalación conjunta](bulk-install/result.json).
- [Reporte de DEV en Slack](https://reinamadreworkspace.slack.com/archives/C0BBSG9KB0V/p1791598417750799).
- [Artifact de la prueba de v1.2.0 del 9 de octubre de 2026](https://claude.ai/artifact/LxGeTBfPrAfjDxfVd4dGve).

## Cierre del alcance DS · 15 de octubre de 2026

- 72 combinaciones de success/error/destructive (solid y light; normal, hover y active) verificadas con los valores actuales de las cuatro marcas. Todas alcanzan 4,5:1 sin redondear. Mínimo: 4,500411:1; no se afirma margen adicional ni conformidad global.
- Table dispone de borderStyle en Table y striped/stripedRows en TableBody. Deben aplicarse en el subcomponente correcto.
- Dialog y AlertDialog conservan overlay con bg-black/10 y backdrop-blur-xs condicionado al soporte del navegador. La equivalencia con los estilos previos de JUNO requiere comparación en producto.
- Las pruebas internas se conservan en tests/storybook y se excluyen del build de producción.
- Las propuestas de gradientes están en docs/releases/1.3.0/gradient-proposals.html: usan únicamente tonos existentes y preservan primary/500. Requieren decisión de diseño, no más datos de DEV.

Los pendientes de DEV se limitan al contrato de los diagnósticos sin detalle, la integración real, sus estilos personalizados, dependencias y las pruebas del producto. Los gradientes y la excepción de Tabs son decisiones del DS y no se atribuyen a DEV.
