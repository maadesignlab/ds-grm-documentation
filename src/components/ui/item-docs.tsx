"use client"

import { ItemExample, itemExamplePresets, type ItemExampleProps } from "./item-example"
import { DocsSection, SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof itemExamplePresets
function Example({ preset }: { preset: Preset }) { return <ItemExample {...itemExamplePresets[preset] as ItemExampleProps} /> }

export function ItemAppearances() {
  return <div className="not-prose grid gap-3"><Card title="Default" value="variant=default"><Example preset="default" /></Card><Card title="Outline" value="variant=outline"><Example preset="outline" /></Card><Card title="Muted" value="variant=muted"><Example preset="muted" /></Card></div>
}

export function ItemCompositions() {
  return <div className="not-prose grid gap-3"><Card title="Icon" value='ItemMedia variant="icon"'><Example preset="icon" /></Card><Card title="Avatar" value="ItemMedia + Avatar"><Example preset="avatar" /></Card><Card title="Image" value='ItemMedia variant="image"'><Example preset="image" /></Card><Card title="Avatar group" value="AvatarGroup + Button"><Example preset="avatarGroup" /></Card><Card title="Sin descripción" value="description=false"><Example preset="withoutDescription" /></Card><Card title="Header / Stacked group" value="ItemGroup > ItemHeader"><Example preset="header" /></Card><Card title="Link" value="Item render"><Example preset="link" /></Card><Card title="Items dentro de Dropdown" value="DropdownMenuItem > Item"><Example preset="dropdown" /></Card><Card title="Time" value="time"><Example preset="time" /></Card></div>
}

export function ItemLayouts() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base font-semibold leading-6 text-foreground">Tamaños oficiales</h3><div className="grid gap-3"><Card title="Default · media 40px" value="size=default"><Example preset="sizeDefault" /></Card><Card title="Small · media 32px" value="size=sm"><Example preset="sizeSm" /></Card><Card title="Extra small · media 24px" value="size=xs"><Example preset="sizeXs" /></Card></div></section><section><h3 className="mb-3 text-base font-semibold leading-6 text-foreground">Layouts del Design System</h3><div className="grid gap-3"><Card title="Compact" value="layout=compact · py-1.5"><Example preset="compact" /></Card><Card title="Stacked · 182px de ancho" value="layout=stacked"><Example preset="stacked" /></Card></div></section></div>
}

export function ItemGroups() {
  return <div className="not-prose grid gap-3"><Card title="List" value="ItemGroup"><Example preset="list" /></Card><Card title="Grid" value="ItemGroup + flex-row"><Example preset="grid" /></Card></div>
}

const anatomy = [
  ["Item", "Base UI useRender", "variant / size / render", "Contenedor"], ["ItemMedia", "div", "variant", "Icono, avatar o imagen"],
  ["ItemContent", "div", "Composición", "Contenido flexible"], ["ItemTitle", "div", "HTML props", "Título"],
  ["ItemDescription", "p", "HTML props", "Descripción"], ["ItemActions", "div", "Composición", "Acción o metadato"],
  ["ItemHeader", "div", "HTML props", "Cabecera de ancho completo"], ["ItemFooter", "div", "HTML props", "Pie de ancho completo"],
  ["ItemGroup", "div role=list", "HTML props", "Agrupación"], ["ItemSeparator", "Separator", "Separator props", "Divisor"],
] as const
const geometry = [
  ["Item default", "w-[511px] max-w-full", "511px máximo", "Figma / composición"], ["Item stacked", "w-[182px]", "182px", "Figma / composición"],
  ["Group oficial", "w-[448px] max-w-full", "448px máximo", "shadcn/ui max-w-md"],
  ["Padding", "px-3 py-2.5", "12px / 10px", "shadcn/ui / Figma"], ["Gap", "gap-2.5", "10px", "shadcn/ui / Figma"],
  ["Group gap", "gap-4", "16px", "shadcn/ui / Figma"], ["Radio", "rounded-lg", "8px", "shadcn/ui / Figma"],
  ["Avatar", "size=lg", "40 × 40px", "Avatar / Figma"], ["Icono", "size-4", "16 × 16px", "shadcn/ui / Figma"],
  ["Button action", "size=sm", "28px alto", "shadcn/ui / Figma"], ["Icon button avatar", "size=icon-sm", "28 × 28px", "shadcn/ui"],
  ["Avatar en Group", "Avatar default", "32 × 32px", "shadcn/ui"], ["Acción en Group", "size=icon", "32 × 32px", "shadcn/ui"],
  ["Size default", "gap-2.5 px-3 py-2.5", "10px / 12px / 10px", "shadcn/ui"], ["Size sm", "gap-2.5 px-3 py-2.5", "10px / 12px / 10px", "shadcn/ui"],
  ["Size xs", "gap-2 px-2.5 py-2", "8px / 10px / 8px", "shadcn/ui"], ["Dropdown content", "w-44 p-1", "176px / 4px", "Figma + Dropdown"],
  ["Item en Dropdown", "gap-2 px-1.5 py-1", "8px / 6px / 4px", "Figma / composición"], ["Avatar en Dropdown", "size-7", "28 × 28px", "Figma / composición"],
] as const
const typography = [
  ["Title", "text-sm / leading-snug / font-medium", "14px / 20px / 500", "shadcn/ui / token de marca"],
  ["Description", "text-sm / leading-normal / font-normal", "14px / 20px / 400", "shadcn/ui / token de marca"],
  ["Time", "text-sm / leading-5", "14px / 20px", "Figma / token de marca"],
  ["Dropdown title", "text-sm / leading-snug / font-medium", "14px / 20px / 500", "shadcn/ui / Figma"],
  ["Dropdown description", "text-xs / leading-4", "12px / 16px / 400", "Figma"],
] as const
const colors = [
  ["Default", "border-transparent", "transparent", "shadcn/ui"], ["Outline", "border-border", "--border", "shadcn/ui / marca"],
  ["Muted", "bg-muted/50", "--muted", "shadcn/ui / marca"], ["Title", "text-foreground", "--foreground", "Herencia / marca"],
  ["Description", "text-muted-foreground", "--muted-foreground", "shadcn/ui / marca"],
] as const

export function ItemSpecifications() {
  return <div className="not-prose grid gap-6"><DocsSection title="API y anatomía"><Table columns={["Parte","Primitive","API","Función"]} rows={anatomy} /></DocsSection><DocsSection title="Tamaño y espaciado"><Table columns={["Propiedad","Tailwind","Valor","Origen"]} rows={geometry} /></DocsSection><DocsSection title="Tipografía"><Table columns={["Elemento","Tailwind","Valor","Origen"]} rows={typography} /></DocsSection><DocsSection title="Color"><Table columns={["Variante","Tailwind","Variable","Origen"]} rows={colors} /></DocsSection></div>
}
