"use client"

import { SliderExample, sliderExamplePresets, type SliderExampleProps } from "./slider-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof sliderExamplePresets
function Example({ preset }: { preset: Preset }) {
  return <SliderExample {...sliderExamplePresets[preset] as SliderExampleProps} />
}

export function SliderTypes() {
  return <div className="not-prose grid gap-3 lg:grid-cols-3"><Card title="Single" value="defaultValue={[50]}"><Example preset="single" /></Card><Card title="Range" value="defaultValue={[25, 75]}"><Example preset="range" /></Card><Card title="Multiple" value="defaultValue={[20, 50, 80]}"><Example preset="multiple" /></Card></div>
}

export function SliderOrientations() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Horizontal" value="orientation=horizontal"><Example preset="horizontal" /></Card><Card title="Vertical" value="orientation=vertical"><Example preset="vertical" /></Card></div>
}

export function SliderStates() {
  return <div className="not-prose grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Card title="Low" value="value=low"><Example preset="low" /></Card><Card title="Medium" value="value=medium"><Example preset="medium" /></Card><Card title="High" value="value=high"><Example preset="high" /></Card><Card title="Disabled" value="disabled=true"><Example preset="disabled" /></Card></div>
}

const geometry = [
  ["Horizontal", "w-60 h-5", "240 × 20px", "track: h-1 (4px)"],
  ["Vertical", "h-60 w-5", "20 × 240px", "track: w-1 (4px)"],
  ["Thumb", "size-3", "12 × 12px", "bg-white · border-ring"],
] as const

const api = [
  ["defaultValue / value", "number[]", "[min, max]", "Un valor crea Single; dos, Range; tres o más, Multiple"],
  ["orientation", "horizontal | vertical", "horizontal", "Define el eje y conserva el teclado del primitive"],
  ["min / max", "number", "0 / 100", "Límites públicos del rango"],
  ["step", "number", "1", "Incremento entre valores válidos"],
  ["disabled", "boolean", "false", "Desactiva interacción, foco y gestos"],
  ["value / onValueChange", "number[] / callback", "—", "Control externo; el label y el valor visible se resuelven por composición"],
] as const

export function SliderSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tamaño y tokens</h3><Table columns={["Elemento", "Tailwind", "Medida", "Estilo"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">API oficial</h3><Table columns={["Propiedad", "Tipo", "Default", "Función"]} rows={api} /></section></div>
}
