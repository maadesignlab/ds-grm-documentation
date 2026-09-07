"use client"

import { ScrollAreaExample, scrollAreaExamplePresets, type ScrollAreaExampleProps } from "./scroll-area-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof scrollAreaExamplePresets

function Example({ preset }: { preset: Preset }) {
  return <ScrollAreaExample {...scrollAreaExamplePresets[preset] as ScrollAreaExampleProps} />
}

export function ScrollAreaOrientations() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Vertical" value="ScrollArea"><Example preset="vertical" /></Card><Card title="Horizontal" value='ScrollBar orientation="horizontal"'><Example preset="horizontal" /></Card></div>
}

const anatomy = [
  ["ScrollArea", "Root", "Root props", "Contenedor y contexto"],
  ["Viewport", "Viewport", "Interno", "Contenido desplazable"],
  ["ScrollBar", "Scrollbar", "orientation", "Control vertical u horizontal"],
  ["Thumb", "Thumb", "Interno", "Posición y proporción visible"],
  ["Corner", "Corner", "Interno", "Intersección de ambos ejes"],
] as const
const geometry = [
  ["Muestra vertical", "h-[286px] / w-[190px]", "190 × 286px", "Figma / composición"],
  ["Muestra horizontal", "h-[256px] / w-[382px]", "382 × 256px", "Figma / composición"],
  ["Padding de contenido", "p-4", "16px", "Figma / composición"],
  ["Gap horizontal", "gap-4", "16px", "Figma / composición"],
  ["Scrollbar", "w-2.5 / h-2.5", "10px", "shadcn/ui"],
  ["Padding scrollbar", "p-px", "1px", "shadcn/ui"],
  ["Imagen", "w-[150px] / h-[200px]", "150 × 200px", "Figma"],
  ["Caption", "text-xs / leading-4", "12px / 16px / 500", "Figma / fuente de marca"],
] as const
const behavior = [
  ["Scroll vertical", "ScrollArea", "Rueda / touch / teclado", "Radix"],
  ["Scroll horizontal", "ScrollBar orientation", "Arrastre / touch", "Radix"],
  ["Scrollbar nativo", "type=hover por defecto", "Visible durante interacción", "Radix"],
  ["Foco del viewport", "focus-visible:ring", "--ring", "shadcn/ui"],
  ["Thumb", "bg-border", "--border", "shadcn/ui / marca"],
] as const

export function ScrollAreaSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y anatomía</h3><Table columns={["Parte", "Primitive", "API", "Función"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Comportamiento y tokens</h3><Table columns={["Capacidad", "API", "Valor", "Origen"]} rows={behavior} /></section></div>
}
