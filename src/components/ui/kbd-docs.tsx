"use client"

import { KbdExample, kbdExamplePresets, type KbdExampleProps } from "./kbd-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof kbdExamplePresets

function Example({ preset }: { preset: Preset }) {
  return <KbdExample {...kbdExamplePresets[preset] as KbdExampleProps} />
}

export function KbdContent() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Text" value="children=string"><Example preset="text" /></Card><Card title="Icon" value="children=icon"><Example preset="icon" /></Card><Card title="Group" value="KbdGroup"><Example preset="group" /></Card></div>
}

export function KbdCompositions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Button" value="Button + Kbd"><Example preset="button" /></Card><Card title="Tooltip" value="TooltipContent + Kbd"><Example preset="tooltip" /></Card><Card title="Input Group" value="InputGroupAddon + Kbd"><Example preset="inputGroup" /></Card></div>
}

const anatomy = [
  ["Kbd", "kbd", "className + HTML attributes", "Entrada individual"],
  ["KbdGroup", "kbd", "className + HTML attributes", "Agrupa teclas y separadores"],
  ["Text", "children", "string", "Contenido semántico"],
  ["Icon", "children", "ReactNode", "Atajo mediante icono"],
] as const
const geometry = [
  ["Altura", "h-5", "20px", "shadcn/ui / Figma"],
  ["Ancho mínimo", "min-w-5", "20px", "shadcn/ui / Figma"],
  ["Padding horizontal", "px-1", "4px", "shadcn/ui / Figma"],
  ["Gap interno", "gap-1", "4px", "shadcn/ui / Figma"],
  ["Radio", "rounded-sm", "var(--radius-sm)", "shadcn/ui / token"],
  ["Texto", "text-xs / font-medium", "12px / 16px", "shadcn/ui / fuente de marca"],
  ["Icono", "size-3", "12px", "shadcn/ui / Figma"],
  ["Gap de grupo", "gap-1", "4px", "shadcn/ui / Figma"],
] as const
const colors = [
  ["Default surface", "bg-muted", "--muted", "shadcn/ui / marca"],
  ["Default text", "text-muted-foreground", "--muted-foreground", "shadcn/ui / marca"],
  ["Tooltip surface", "bg-background/20", "--background / 20%", "Contexto oficial"],
  ["Tooltip text", "text-background", "--background", "Contexto oficial"],
] as const

export function KbdSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y composición</h3><Table columns={["Parte", "Elemento", "API", "Función"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color y contexto</h3><Table columns={["Parte", "Tailwind", "Variable", "Origen"]} rows={colors} /></section></div>
}
