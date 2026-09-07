"use client"

import { AvatarExample, avatarExamplePresets, type AvatarExampleProps } from "./avatar-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof avatarExamplePresets
function Example({ preset }: { preset: Preset }) { return <AvatarExample {...avatarExamplePresets[preset] as AvatarExampleProps} /> }

export function AvatarContents() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Imagen" value="AvatarImage"><Example preset="image" /></Card><Card title="Texto" value="AvatarFallback"><Example preset="text" /></Card><Card title="Icono" value="AvatarFallback + icon"><Example preset="icon" /></Card><Card title="Grupo" value="AvatarGroup"><Example preset="group" /></Card></div>
}
export function AvatarStyles() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Primary" value="bg-primary/10"><Example preset="primary" /></Card><Card title="Secondary" value="bg-secondary"><Example preset="secondary" /></Card><Card title="Muted" value="bg-muted"><Example preset="muted" /></Card><Card title="Gradient" value="from-primary/15"><Example preset="gradient" /></Card></div>
}
export function AvatarShapes() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Full" value="rounded-full"><Example preset="full" /></Card><Card title="Semi squared" value="rounded-xl"><Example preset="semiSquared" /></Card></div>
}
export function AvatarIndicators() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Online" value="AvatarBadge"><Example preset="online" /></Card><Card title="Away" value="AvatarBadge"><Example preset="away" /></Card><Card title="Busy" value="AvatarBadge"><Example preset="busy" /></Card><Card title="Servicios" value="AvatarBadge group"><Example preset="services" /></Card></div>
}
export function AvatarBorders() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Success" value="--success-default-border"><Example preset="borderSuccess" /></Card><Card title="Warning" value="--warning-default-border"><Example preset="borderWarning" /></Card><Card title="Error" value="--error-default-border"><Example preset="borderError" /></Card><Card title="Brand" value="--primary"><Example preset="borderBrand" /></Card></div>
}

const anatomy = [
  ["Avatar", "Root", "size / className", "Contenedor accesible"], ["AvatarImage", "Image", "src / alt", "Imagen y carga"],
  ["AvatarFallback", "Fallback", "delayMs", "Texto o icono alternativo"], ["AvatarBadge", "span", "Composición", "Estado o servicio"],
  ["AvatarGroup", "div", "Composición", "Superposición de perfiles"], ["AvatarGroupCount", "div", "Composición", "Cantidad adicional"],
] as const
const sizes = [
  ["Avatar 16", "size-4", "16 × 16px", "Figma / className"], ["Avatar 20", "size-5", "20 × 20px", "Figma / className"],
  ["Avatar 24", "size-6", "24 × 24px", "Figma / className"], ["Avatar 28", "size-7", "28 × 28px", "Figma / className"],
  ["Avatar 32", "size-8", "32 × 32px", "Figma / className"], ["Avatar 36", "size-9", "36 × 36px", "Figma / className"],
  ["Avatar 40", "size-10", "40 × 40px", "Figma / className"], ["Avatar 48", "size-12", "48 × 48px", "Figma / className"],
  ["Avatar 56", "size-14", "56 × 56px", "Figma / className"], ["Avatar 64", "size-16", "64 × 64px", "Figma / className"],
  ["Avatar 72", "size-[72px]", "72 × 72px", "Figma / className"], ["Avatar 80", "size-20", "80 × 80px", "Figma / className"],
  ["Avatar 96", "size-24", "96 × 96px", "Figma / className"], ["Avatar 120", "size-[120px]", "120 × 120px", "Figma / className"],
] as const
const geometry = [
  ["Full", "rounded-full", "9999px", "Figma / shadcn/ui"], ["Semi squared 16–20", "rounded-[4px]", "4px", "Figma"],
  ["Semi squared 24–36", "rounded-[6px]", "6px", "Figma"], ["Semi squared 40–56", "rounded-[8px]", "8px", "Figma"],
  ["Semi squared 64–120", "rounded-[12px]", "12px", "Figma"],
  ["Grupo", "size-6 / -space-x-1.5", "24px / -6px", "Figma + AvatarGroup"], ["Borde de estado", "after:border-2", "2px", "Figma / composición"],
  ["Status badge", "style width / height", "6, 10, 12, 16, 20 o 28px", "Figma / AvatarBadge"],
  ["Badge de servicio", "style width / height", "16, 20 o 28px desde Avatar 36", "Figma / AvatarBadge"],
] as const
const colors = [
  ["Primary", "bg-primary/10", "--primary", "Figma / marca"], ["Secondary", "bg-secondary", "--secondary", "Figma / marca"],
  ["Muted", "bg-muted", "--muted", "Figma / marca"], ["Gradient", "from-primary/15 to-secondary/40", "--primary / --secondary", "Figma / marca"],
  ["Online", "bg-success", "--success", "Figma / marca"], ["Away", "bg-warning", "--warning", "Figma / marca"], ["Busy", "bg-error", "--error", "Figma / marca"],
] as const

export function AvatarSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600,lineHeight:"24px"}}>API y anatomía</h3><Table columns={["Parte","Primitive","API","Función"]} rows={anatomy} /></section><section><h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600,lineHeight:"24px"}}>Escala</h3><Table columns={["Tamaño","Tailwind","Valor","Origen"]} rows={sizes} /></section><section><h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600,lineHeight:"24px"}}>Forma y espaciado</h3><Table columns={["Propiedad","Tailwind","Valor","Origen"]} rows={geometry} /></section><section><h3 style={{margin:"0 0 12px",fontSize:16,fontWeight:600,lineHeight:"24px"}}>Color</h3><Table columns={["Variante","Tailwind","Variable","Origen"]} rows={colors} /></section></div>
}
