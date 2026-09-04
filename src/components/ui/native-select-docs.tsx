"use client"

import { NativeSelectExample } from "./native-select-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

export function NativeSelectComposition() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Simple" value="NativeSelectOption"><NativeSelectExample /></Card><Card title="With groups" value="NativeSelectOptGroup"><NativeSelectExample type="groups" /></Card></div>
}

export function NativeSelectStates() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Placeholder" value="filled=false"><NativeSelectExample /></Card><Card title="Filled" value="filled=true"><NativeSelectExample filled /></Card><Card title="Invalid" value="aria-invalid"><NativeSelectExample state="invalid" /></Card><Card title="Disabled" value="disabled"><NativeSelectExample state="disabled" /></Card></div>
}

export function NativeSelectSizes() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Default" value="size=default"><NativeSelectExample /></Card><Card title="Small" value="size=sm"><NativeSelectExample size="sm" /></Card></div>
}

const anatomy = [
  ["NativeSelect", "select", "Props nativas de select", "Control oficial"],
  ["NativeSelectOption", "option", "value / disabled", "Opción"],
  ["NativeSelectOptGroup", "optgroup", "label / disabled", "Agrupación"],
] as const
const geometry = [
  ["Ancho de muestra", "w-[180px]", "180px", "Composición oficial de ejemplo"],
  ["Altura default", "h-8", "32px", "shadcn/ui"],
  ["Altura small", "data-[size=sm]:h-7", "28px", "shadcn/ui"],
  ["Padding izquierdo", "pl-2.5", "10px", "shadcn/ui"],
  ["Padding derecho", "pr-8", "32px", "shadcn/ui"],
  ["Icono", "size-4 / right-2.5", "16px / 10px", "shadcn/ui"],
  ["Texto", "text-sm", "14px", "shadcn/ui / token de marca"],
  ["Radio", "rounded-lg", "var(--radius)", "Token global"],
] as const
const colors = [
  ["Superficie", "bg-transparent", "transparent", "shadcn/ui"],
  ["Borde", "border-input", "--input", "shadcn/ui / marca"],
  ["Texto auxiliar", "text-muted-foreground", "--muted-foreground", "shadcn/ui / marca"],
  ["Focus", "border-ring / ring-ring/50", "--ring", "shadcn/ui"],
  ["Invalid", "border-destructive / ring-destructive/20", "--destructive", "shadcn/ui"],
  ["Disabled", "opacity-50", "50%", "shadcn/ui"],
] as const

export function NativeSelectSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y composición</h3><Table columns={["Parte", "Elemento", "API", "Función"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color y estados</h3><Table columns={["Parte", "Tailwind", "Variable", "Origen"]} rows={colors} /></section></div>
}
