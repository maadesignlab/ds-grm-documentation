"use client"

import { ComboboxExample, comboboxExamplePresets, type ComboboxExampleProps } from "./combobox-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof comboboxExamplePresets

function Example({ preset }: { preset: Preset }) {
  return <ComboboxExample {...comboboxExamplePresets[preset] as ComboboxExampleProps} />
}

export function ComboboxComposition() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Simple" value="ComboboxInput"><Example preset="simple" /></Card><Card title="Clear button" value="showClear"><Example preset="clear" /></Card><Card title="Groups" value="Group + Collection"><Example preset="groups" /></Card><Card title="Multiple" value="multiple + Chips"><Example preset="multiple" /></Card><Card title="Popup" value="Trigger render"><Example preset="popup" /></Card><Card title="With icons" value="Item children"><Example preset="icons" /></Card></div>
}

export function ComboboxStates() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Placeholder" value="value=null"><Example preset="placeholder" /></Card><Card title="Filled" value="defaultValue"><Example preset="filled" /></Card><Card title="Invalid" value="aria-invalid"><Example preset="invalid" /></Card><Card title="Disabled" value="disabled"><Example preset="disabled" /></Card><Card title="Auto highlight" value="autoHighlight"><Example preset="autoHighlight" /></Card></div>
}

const anatomy = [
  ["Combobox", "Base UI Root", "items / value / multiple / disabled", "Estado y comportamiento"],
  ["ComboboxInput", "Input + Input Group", "showTrigger / showClear", "Entrada y controles"],
  ["ComboboxContent", "Portal + Positioner + Popup", "side / align / anchor", "Panel flotante"],
  ["ComboboxList", "Base UI List", "Render function", "Resultados filtrados"],
  ["ComboboxItem", "Base UI Item", "value / disabled", "Opción seleccionable"],
  ["ComboboxGroup", "Base UI Group", "items", "Agrupación"],
  ["ComboboxCollection", "Base UI Collection", "Render function", "Items filtrados del grupo"],
  ["ComboboxChips", "Base UI Chips", "multiple", "Selección múltiple"],
] as const
const geometry = [
  ["Ancho de muestra", "w-[300px]", "300px", "Figma / composición"],
  ["Altura del input", "h-8", "32px", "shadcn/ui"],
  ["Padding del input", "px-2.5", "10px", "shadcn/ui Input Group"],
  ["Separación de item", "gap-2", "8px", "shadcn/ui"],
  ["Padding de item", "py-1 / pl-1.5 / pr-8", "4px / 6px / 32px", "shadcn/ui"],
  ["Texto de input e item", "text-sm", "14px / 20px", "shadcn/ui / fuente de marca"],
  ["Label de grupo", "text-xs", "12px / 16px", "shadcn/ui / fuente de marca"],
  ["Radio del panel", "rounded-lg", "var(--radius)", "shadcn/ui / token global"],
] as const
const colors = [
  ["Input", "border-input / bg-transparent", "--input", "shadcn/ui / marca"],
  ["Placeholder", "placeholder:text-muted-foreground", "--muted-foreground", "shadcn/ui / marca"],
  ["Panel", "bg-popover / text-popover-foreground", "--popover", "shadcn/ui / marca"],
  ["Item highlighted", "bg-accent / text-accent-foreground", "--accent", "shadcn/ui / marca"],
  ["Focus", "border-ring / ring-ring/50", "--ring", "shadcn/ui / marca"],
  ["Invalid", "border-destructive / ring-destructive/20", "--destructive", "shadcn/ui / marca"],
  ["Disabled", "opacity-50", "50%", "shadcn/ui"],
] as const

export function ComboboxSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y composición</h3><Table columns={["Parte", "Primitive", "API", "Función"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color y estados</h3><Table columns={["Parte", "Tailwind", "Variable", "Origen"]} rows={colors} /></section></div>
}
