"use client"

import { DatePickerExample, datePickerExamplePresets, type DatePickerExampleProps } from "./date-picker-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof datePickerExamplePresets

function Example({ preset }: { preset: Preset }) {
  return <DatePickerExample {...datePickerExamplePresets[preset] as DatePickerExampleProps} />
}

export function DatePickerComposition() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Single" value="Popover + Calendar"><Example preset="single" /></Card><Card title="Range · 2 months" value="mode=range"><Example preset="range" /></Card><Card title="Date and time" value="Calendar + InputGroup"><Example preset="dateTime" /></Card><Card title="Availability" value="modifiers + legend"><Example preset="availability" /></Card></div>
}

export function DatePickerStates() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Empty" value="value=undefined"><Example preset="empty" /></Card><Card title="Filled" value="selected"><Example preset="filled" /></Card><Card title="Month and year" value="captionLayout=dropdown"><Example preset="monthYear" /></Card></div>
}

const anatomy = [
  ["Date Picker", "Composición", "Popover + Calendar", "No existe un Root propio"],
  ["Popover", "Base UI Root", "open / defaultOpen", "Estado del panel"],
  ["PopoverTrigger", "Base UI Trigger", "render={<Button />}", "Activador accesible"],
  ["PopoverContent", "Portal + Popup", "align / side", "Contenedor del calendario"],
  ["Calendar", "React DayPicker", "mode / selected / onSelect", "Selección de fecha"],
  ["InputGroup", "Composición oficial", "input type=time", "Hora en date-time"],
] as const
const geometry = [
  ["Trigger single", "w-[195px]", "195px", "Figma / composición"],
  ["Trigger range", "w-[240px]", "240px", "Figma / composición"],
  ["Date-time", "w-[353px]", "353px", "Figma / composición"],
  ["Trigger", "Button default", "32px de alto", "shadcn/ui"],
  ["Popover", "w-auto / p-0", "Según Calendar", "Patrón oficial Date Picker"],
  ["Range", "numberOfMonths=2", "2 meses", "shadcn/ui / contrato Calendar"],
  ["Calendar cell", "--cell-size: spacing(7)", "28px", "shadcn/ui / Calendar GRM"],
  ["Trigger text", "text-sm", "14px / 20px", "Button / fuente de marca"],
] as const
const colors = [
  ["Trigger", "border-input / bg-background", "--input / --background", "Button outline"],
  ["Empty", "text-muted-foreground", "--muted-foreground", "Patrón oficial"],
  ["Popover", "bg-popover / text-popover-foreground", "--popover", "shadcn/ui / marca"],
  ["Selected", "bg-primary / text-primary-foreground", "--primary", "Calendar"],
  ["Range", "bg-muted", "--muted", "Calendar"],
  ["Focus", "ring-ring/50", "--ring", "Button / Calendar"],
] as const

export function DatePickerSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y composición</h3><Table columns={["Parte", "Primitive", "API", "Función"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color y estados</h3><Table columns={["Parte", "Tailwind", "Variable", "Origen"]} rows={colors} /></section></div>
}
