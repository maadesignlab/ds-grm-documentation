"use client"

import { ProgressExample, progressExamplePresets, type ProgressExampleProps } from "./progress-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof progressExamplePresets

function Example({ preset }: { preset: Preset }) {
  return <ProgressExample {...progressExamplePresets[preset] as ProgressExampleProps} />
}

export function ProgressValues() {
  return (
    <div className="not-prose grid gap-3 md:grid-cols-2">
      <Card title="Vacío" value="value=0"><Example preset="empty" /></Card>
      <Card title="Parcial" value="value=25"><Example preset="quarter" /></Card>
      <Card title="Medio" value="value=50"><Example preset="half" /></Card>
      <Card title="Avanzado" value="value=75"><Example preset="threeQuarter" /></Card>
      <Card title="Completado" value="value=100"><Example preset="complete" /></Card>
    </div>
  )
}

export function ProgressComposition() {
  return (
    <div className="not-prose grid gap-3 md:grid-cols-2">
      <Card title="Con label" value="label + Progress"><Example preset="playground" /></Card>
      <Card title="Sin label visible" value="aria-label"><Example preset="withoutLabel" /></Card>
    </div>
  )
}

const anatomy = [
  ["Progress", "Root", "value / max / getValueLabel", "Barra accesible"],
  ["Indicator", "Indicator", "transform", "Representa el avance"],
  ["Label visible", "Composición", "aria-labelledby", "Nombre y porcentaje"],
] as const

const geometry = [
  ["Ancho de muestra", "max-w-[433px]", "433px", "Figma / composición"],
  ["Track", "h-1", "4px", "shadcn/ui / Figma"],
  ["Radio", "rounded-full", "9999px", "shadcn/ui"],
  ["Separación label–track", "gap-3", "12px", "Figma"],
  ["Label", "text-sm / font-medium", "14px / 20px / 500", "Figma / fuente de marca"],
  ["Porcentaje", "text-sm / font-normal", "14px / 20px / 400", "Figma / fuente de marca"],
] as const

const colors = [
  ["Track", "bg-muted", "--muted", "shadcn/ui / marca"],
  ["Indicator", "bg-primary", "--primary", "shadcn/ui / marca"],
  ["Label", "text-foreground", "--foreground", "Token semántico"],
  ["Porcentaje", "text-muted-foreground", "--muted-foreground", "Token semántico"],
] as const

const behavior = [
  ["Valor", "value", "0–100 en la muestra", "Progress Root"],
  ["Semántica", "role=progressbar", "aria-valuenow/min/max", "Radix"],
  ["Transición", "transition-all", "Transform del Indicator", "shadcn/ui"],
  ["Sin label visible", "aria-label", "Nombre accesible", "Composición"],
] as const

export function ProgressSpecifications() {
  return (
    <div className="not-prose grid gap-6">
      <section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y composición</h3><Table columns={["Parte", "Primitive", "API", "Función"]} rows={anatomy} /></section>
      <section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section>
      <section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color</h3><Table columns={["Parte", "Tailwind", "Variable", "Origen"]} rows={colors} /></section>
      <section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Comportamiento y accesibilidad</h3><Table columns={["Capacidad", "API", "Valor", "Origen"]} rows={behavior} /></section>
    </div>
  )
}
