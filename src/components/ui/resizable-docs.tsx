"use client"

import { ResizableExample, resizableExamplePresets, type ResizableExampleProps } from "./resizable-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof resizableExamplePresets

function Example({ preset }: { preset: Preset }) {
  return <ResizableExample {...resizableExamplePresets[preset] as ResizableExampleProps} />
}

export function ResizableOrientation() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Horizontal" value="orientation=horizontal"><Example preset="horizontal" /></Card><Card title="Vertical" value="orientation=vertical"><Example preset="vertical" /></Card></div>
}

export function ResizableDistribution() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="25 / 75" value="defaultSize=25%"><Example preset="quarter" /></Card><Card title="50 / 50" value="defaultSize=50%"><Example preset="half" /></Card><Card title="75 / 25" value="defaultSize=75%"><Example preset="threeQuarter" /></Card></div>
}

export function ResizableComposition() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Visible grip" value="withHandle"><Example preset="handle" /></Card><Card title="Nested panels" value="nested Groups"><Example preset="nested" /></Card></div>
}

const anatomy = [
  ["ResizablePanelGroup", "Group", "orientation / onLayoutChange", "Distribución y estado"],
  ["ResizablePanel", "Panel", "defaultSize / minSize / maxSize", "Contenido redimensionable"],
  ["ResizableHandle", "Separator", "withHandle / disabled", "Control accesible"],
] as const
const geometry = [
  ["Muestra", "max-w-[450px] / h-[200px]", "450 × 200px", "Figma / composición"],
  ["Distribuciones", "defaultSize", "25% / 50% / 75%", "react-resizable-panels v4"],
  ["Separador", "w-px / h-px", "1px", "shadcn/ui"],
  ["Área interactiva", "after:w-1 / after:h-1", "4px", "shadcn/ui"],
  ["Grip horizontal", "h-6 / w-1", "24 × 4px", "shadcn/ui radix-nova"],
  ["Contenedor", "rounded-lg", "var(--radius)", "Token global"],
  ["Texto de muestra", "text-sm / font-medium", "14px / 20px", "Composición / fuente de marca"],
] as const
const behavior = [
  ["Orientación", "orientation", "horizontal | vertical", "Group"],
  ["Tamaño inicial", "defaultSize", "string porcentual", "Panel v4"],
  ["Arrastre", "Pointer events", "Mouse y touch", "Separator"],
  ["Teclado", "role=separator", "Arrow keys", "react-resizable-panels"],
  ["Foco", "focus-visible:ring-1", "--ring", "shadcn/ui"],
  ["Color", "bg-border", "--border", "shadcn/ui / marca"],
] as const

export function ResizableSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">API y composición</h3><Table columns={["Parte", "Primitive v4", "API", "Función"]} rows={anatomy} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind / API", "Valor", "Origen"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Comportamiento y estados</h3><Table columns={["Capacidad", "API", "Valor", "Origen"]} rows={behavior} /></section></div>
}
