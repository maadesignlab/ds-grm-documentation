"use client"

import { SeparatorExample, separatorExamplePresets, type SeparatorExampleProps } from "./separator-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof separatorExamplePresets
function Example({ preset }: { preset: Preset }) { return <SeparatorExample {...separatorExamplePresets[preset] as SeparatorExampleProps} /> }

export function SeparatorOrientations() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Horizontal" value="orientation=horizontal"><Example preset="horizontal" /></Card><Card title="Vertical" value="orientation=vertical"><Example preset="vertical" /></Card></div>
}

export function SeparatorAccessibility() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Decorativo" value="decorative=true"><Example preset="horizontal" /></Card><Card title="Semántico" value="decorative=false"><Example preset="semantic" /></Card></div>
}

const geometry = [
  ["Horizontal", "data-[orientation=horizontal]:h-px w-full", "193 × 1px", "--border"],
  ["Vertical", "data-[orientation=vertical]:h-full w-px", "1 × 69px", "--border"],
] as const
const api = [
  ["orientation", "horizontal | vertical", "horizontal", "Dirección del divisor"],
  ["decorative", "boolean", "true", "Con true usa role=none; con false expone role=separator"],
  ["className", "string", "—", "Controla la longitud desde el contenedor"],
] as const

export function SeparatorSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y color</h3><Table columns={["Orientación", "Tailwind", "Medida de referencia", "Token"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y accesibilidad</h3><Table columns={["Propiedad", "Tipo", "Default", "Función"]} rows={api} /></section></div>
}
