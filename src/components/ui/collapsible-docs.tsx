"use client"

import { CollapsibleExample, collapsibleExamplePresets, type CollapsibleExampleProps } from "./collapsible-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof collapsibleExamplePresets
function Example({ preset }: { preset: Preset }) { return <CollapsibleExample {...collapsibleExamplePresets[preset] as CollapsibleExampleProps} /> }

export function CollapsiblePatterns() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Fixed trigger" value="CollapsibleTrigger + Button"><Example preset="fixedCollapsed" /></Card><Card title="Expandable trigger" value="CollapsibleTrigger"><Example preset="expandableCollapsed" /></Card></div>
}

export function CollapsibleStates() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Fixed · Colapsado" value="open=false"><Example preset="fixedCollapsed" /></Card><Card title="Fixed · Expandido" value="open=true"><Example preset="fixedExpanded" /></Card><Card title="Expandable · Colapsado" value="open=false"><Example preset="expandableCollapsed" /></Card><Card title="Expandable · Expandido" value="open=true"><Example preset="expandableExpanded" /></Card></div>
}

const anatomy = [
  ["Collapsible", "Root", "open / defaultOpen / onOpenChange", "Estado y contexto"],
  ["CollapsibleTrigger", "Trigger", "asChild", "Control accesible"],
  ["CollapsibleContent", "Content", "forceMount", "Contenido condicional"],
  ["Button", "Composición", "variant=ghost / size=icon", "Trigger fijo"],
] as const
const geometry = [
  ["Ancho", "w-[350px]", "350px", "Figma / composición"], ["Fixed colapsado", "h auto", "78px", "Figma"],
  ["Fixed expandido", "h auto", "210px", "Figma"], ["Expandable colapsado", "h-[30px]", "30px", "Figma"],
  ["Expandable expandido", "h auto", "114px", "Figma"], ["Separación fixed", "gap-2", "8px", "Figma"],
  ["Padding horizontal", "px-4 / px-2.5", "16px / 10px", "Figma"], ["Icono", "size-4", "16px", "Figma / Lucide"],
] as const
const typography = [
  ["Título fixed", "text-sm / font-semibold", "14px / 20px / 600", "Figma / marca"],
  ["Trigger expandable", "text-sm / font-medium", "14px / 20px / 500", "Figma / marca"],
  ["Contenido", "text-sm / font-normal", "14px / 20px / 400", "Figma / marca"],
  ["Valor", "text-sm / font-medium", "14px / 20px / 500", "Figma / marca"],
] as const
const behavior = [
  ["Estado", "data-state", "open / closed", "Radix"], ["Teclado", "Enter / Space", "Alterna el contenido", "Radix"],
  ["Focus", "focus-visible:ring", "--ring", "shadcn/ui"], ["Contenido", "CollapsibleContent", "Mount condicional", "Radix"],
] as const

export function CollapsibleSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600,lineHeight:"24px"}}>API y anatomía</h3><Table columns={["Parte","Primitive","API","Función"]} rows={anatomy} /></section><section><h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600,lineHeight:"24px"}}>Tamaño y espaciado</h3><Table columns={["Propiedad","Tailwind","Valor","Origen"]} rows={geometry} /></section><section><h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600,lineHeight:"24px"}}>Tipografía</h3><Table columns={["Parte","Tailwind","Valor","Origen"]} rows={typography} /></section><section><h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600,lineHeight:"24px"}}>Comportamiento y accesibilidad</h3><Table columns={["Capacidad","API","Valor","Origen"]} rows={behavior} /></section></div>
}
