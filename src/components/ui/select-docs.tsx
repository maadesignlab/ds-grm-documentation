"use client"

import { SelectExample, selectExamplePresets, type SelectExampleProps } from "./select-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof selectExamplePresets

function Example({ preset }: { preset: Preset }) {
  return <SelectExample {...selectExamplePresets[preset] as SelectExampleProps} />
}

export function SelectComposition() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Simple" value="SelectGroup"><Example preset="simple" /></Card><Card title="With icons" value="SelectItem children"><Example preset="icons" /></Card><Card title="Groups" value="SelectLabel + Separator"><Example preset="groups" /></Card><Card title="Scrollable" value="Scrollable content"><Example preset="scrollable" /></Card></div>
}

export function SelectStates() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Placeholder" value="value=undefined"><Example preset="placeholder" /></Card><Card title="Filled" value="defaultValue"><Example preset="filled" /></Card><Card title="Invalid" value="aria-invalid"><Example preset="invalid" /></Card><Card title="Disabled" value="disabled"><Example preset="disabled" /></Card></div>
}

export function SelectConfiguration() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Default" value="size=default"><Example preset="defaultSize" /></Card><Card title="Small" value="size=sm"><Example preset="smallSize" /></Card><Card title="Item aligned" value="position=item-aligned"><Example preset="itemAligned" /></Card><Card title="Popper" value="position=popper"><Example preset="popper" /></Card></div>
}

const anatomy = [
  ["Select", "Radix Root", "value / defaultValue / open / disabled", "Estado y comportamiento"],
  ["SelectTrigger", "Radix Trigger", "size / aria-invalid", "Control accesible"],
  ["SelectValue", "Radix Value", "placeholder", "Valor visible"],
  ["SelectContent", "Portal + Content", "position / align / side", "Panel flotante"],
  ["SelectGroup", "Radix Group", "Props del primitive", "Agrupación"],
  ["SelectLabel", "Radix Label", "Props del primitive", "Etiqueta de grupo"],
  ["SelectItem", "Radix Item", "value / disabled", "Opción seleccionable"],
  ["SelectSeparator", "Radix Separator", "Props del primitive", "Separación semántica"],
] as const
const geometry = [
  ["Trigger default", "h-8", "32px", "shadcn/ui"],
  ["Trigger small", "h-7", "28px", "shadcn/ui"],
  ["Trigger simple", "w-[180px]", "180px", "Composición oficial de ejemplo"],
  ["Trigger scrollable", "w-[280px]", "280px", "Composición oficial de ejemplo"],
  ["Trigger padding", "pl-2.5 / pr-2", "10px / 8px", "shadcn/ui"],
  ["Trigger gap", "gap-1.5", "6px", "shadcn/ui"],
  ["Item padding", "py-1 / pl-1.5 / pr-8", "4px / 6px / 32px", "shadcn/ui"],
  ["Icono de item", "size-4 / gap-2", "16px / 8px", "Composición oficial"],
  ["Trigger y valor", "text-sm", "14px / 20px", "shadcn/ui / fuente de marca"],
  ["Texto de item", "text-sm", "14px / 20px", "shadcn/ui / fuente de marca"],
  ["Label de grupo", "text-xs", "12px / 16px", "shadcn/ui / fuente de marca"],
] as const
const colors = [
  ["Trigger", "border-input / bg-transparent", "--input", "shadcn/ui"],
  ["Placeholder", "text-muted-foreground", "--muted-foreground", "shadcn/ui"],
  ["Content", "bg-popover / text-popover-foreground", "--popover", "shadcn/ui / marca"],
  ["Item focus", "bg-accent / text-accent-foreground", "--accent", "shadcn/ui / marca"],
  ["Focus", "border-ring / ring-ring/50", "--ring", "shadcn/ui"],
  ["Invalid", "border-destructive / ring-destructive/20", "--destructive", "shadcn/ui"],
  ["Disabled", "opacity-50", "50%", "shadcn/ui"],
] as const

export function SelectSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y composición</h3><Table columns={["Parte", "Primitive", "API", "Función"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color y estados</h3><Table columns={["Parte", "Tailwind", "Variable", "Origen"]} rows={colors} /></section></div>
}
