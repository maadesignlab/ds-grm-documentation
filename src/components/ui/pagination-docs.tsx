"use client"

import { PaginationExample, paginationExamplePresets, type PaginationExampleProps } from "./pagination-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof paginationExamplePresets

function Example({ preset }: { preset: Preset }) {
  return <PaginationExample {...paginationExamplePresets[preset] as PaginationExampleProps} />
}

export function PaginationCompositions() {
  return <div className="not-prose grid gap-3"><Card title="Navegación" value="PaginationContent"><Example preset="default" /></Card><Card title="Filas por página" value="Pagination + Select"><Example preset="pageSize" /></Card></div>
}

export function PaginationAmounts() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="3 páginas" value="pageCount=3"><Example preset="threeItems" /></Card><Card title="4 páginas" value="pageCount=4"><Example preset="fourItems" /></Card><Card title="5 páginas" value="pageCount=5"><Example preset="fiveItems" /></Card></div>
}

export function PaginationStates() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Primera activa" value="currentPage=1"><Example preset="firstActive" /></Card><Card title="Página intermedia" value="currentPage=2"><Example preset="middleActive" /></Card><Card title="Última activa" value="currentPage=3"><Example preset="lastActive" /></Card><Card title="Sin elipsis" value="ellipsis=false"><Example preset="noEllipses" /></Card><Card title="Sin navegación lateral" value="navigation=false"><Example preset="noNavigation" /></Card></div>
}

const anatomy = [
  ["Pagination", "nav", "HTML nav props", "Región de navegación"],
  ["PaginationContent", "ul", "HTML list props", "Agrupa los ítems"],
  ["PaginationItem", "li", "HTML list item props", "Elemento semántico"],
  ["PaginationLink", "Button + a", "isActive / size", "Página navegable"],
  ["Previous / Next", "PaginationLink", "text", "Navegación lateral"],
  ["PaginationEllipsis", "span", "className", "Páginas omitidas"],
] as const
const geometry = [
  ["Control", "size=icon / default", "32px", "Button / Figma"],
  ["Gap de lista", "gap-0.5", "2px", "shadcn/ui"],
  ["Icono", "data-icon", "16px", "Button / shadcn/ui"],
  ["Elipsis", "size-8", "32 × 32px", "shadcn/ui / Figma"],
  ["Texto", "text-sm / font-medium", "14px / 20px / 500", "Button / fuente de marca"],
  ["Select", "w-20", "80px", "Figma / composición"],
  ["Muestra page-size", "max-w-[414px]", "414px", "Figma / composición"],
] as const
const tokens = [
  ["Página activa", "variant=outline", "--border / --foreground", "aria-current=page"],
  ["Página inactiva", "variant=ghost", "--foreground", "Button"],
  ["Hover", "ghost hover", "--accent / --accent-foreground", "Button"],
  ["Deshabilitado", "opacity-50", "currentColor", "Composición en extremos"],
  ["Fuente", "font-sans", "--brand-font-sans", "Marca activa"],
] as const

export function PaginationSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y composición</h3><Table columns={["Parte", "Elemento", "API", "Función"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind / API", "Valor", "Origen"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tokens y estados</h3><Table columns={["Estado", "Implementación", "Token", "Semántica"]} rows={tokens} /></section></div>
}
