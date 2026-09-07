"use client"

import { NavigationMenuExample, navigationMenuExamplePresets, type NavigationMenuExampleProps } from "./navigation-menu-example"
import { SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof navigationMenuExamplePresets
function Example({ preset }: { preset: Preset }) { return <NavigationMenuExample {...navigationMenuExamplePresets[preset] as NavigationMenuExampleProps} /> }
function Code({ children }: { children: string }) { return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code> }
function Card({ title, value, children, tall = false }: { title: string; value: string; children: React.ReactNode; tall?: boolean }) { return <article className="overflow-visible rounded-lg border border-border bg-card"><div className={`sb-unstyled flex items-start justify-center overflow-visible rounded-t-lg bg-background p-8 ${tall ? "min-h-[360px]" : "min-h-40"}`}>{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article> }

export function NavigationMenuStates() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Closed" value="defaultOpen=false"><Example preset="closed" /></Card><Card title="Open" value="defaultOpen=true" tall><Example preset="open" /></Card></div>
}

export function NavigationMenuLayouts() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="List" value="layout=list" tall><Example preset="list" /></Card><Card title="Featured" value="layout=featured" tall><Example preset="featured" /></Card><Card title="Without viewport" value="viewport=false" tall><Example preset="withoutViewport" /></Card><Card title="Direct link" value="NavigationMenuLink"><Example preset="link" /></Card></div>
}

export function NavigationMenuAmounts() {
  return <div className="not-prose grid gap-3"><Card title="1 ítem" value="itemCount=1"><Example preset="one" /></Card><Card title="3 ítems" value="itemCount=3"><Example preset="three" /></Card><Card title="6 ítems" value="itemCount=6"><Example preset="six" /></Card><Card title="10 ítems" value="itemCount=10"><div className="max-w-full overflow-x-auto"><Example preset="ten" /></div></Card></div>
}

const geometry = [
  ["Trigger", "h-9 px-4 py-2", "36px", "16px / 8px", "rounded-md"],
  ["Chevron", "size-3 ml-1", "12px", "4px", "—"],
  ["List", "gap-1", "Según contenido", "4px", "—"],
  ["Content list", "w-[400px] p-2 pr-2.5", "400 × 268px", "8px / 10px", "rounded-md"],
  ["Content featured", "w-[520px] p-2 pr-2.5", "520 × 196px", "8px / 10px", "rounded-md"],
  ["Link", "h-[60px] gap-1 p-2", "60px", "8px", "rounded-sm"],
] as const
const typography = [
  ["Trigger", "text-sm font-medium", "14px / 20px / 500", "--foreground"],
  ["Link title", "text-sm leading-5 font-medium", "14px / 20px / 500", "--foreground"],
  ["Link description", "text-xs leading-4 font-normal", "12px / 16px / 400", "--muted-foreground"],
  ["Featured title", "text-base leading-6 font-medium", "16px / 24px / 500", "--accent-foreground"],
] as const
const api = [
  ["NavigationMenu", "Root", "viewport", "Estado y coordinación"], ["NavigationMenuList", "List", "HTML props", "Lista horizontal"],
  ["NavigationMenuItem", "Item", "value", "Trigger o link"], ["NavigationMenuTrigger", "Trigger", "disabled", "Abre contenido"],
  ["NavigationMenuContent", "Content", "motion", "Panel por ítem"], ["NavigationMenuLink", "Link", "active / asChild", "Navegación"],
  ["NavigationMenuViewport", "Viewport", "CSS variables", "Transición entre panels"], ["NavigationMenuIndicator", "Indicator", "state", "Indicador del panel"],
] as const

export function NavigationMenuSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y anatomía</h3><Table columns={["Parte", "Primitive", "API", "Función"]} rows={api} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Parte", "Tailwind", "Medida", "Espaciado", "Radio"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tipografía y color</h3><Table columns={["Elemento", "Tailwind", "Valor", "Token"]} rows={typography} /></section></div>
}
