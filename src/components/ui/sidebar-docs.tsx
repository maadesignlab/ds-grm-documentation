"use client"

import { SidebarExample } from "./sidebar-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 max-w-full items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Sample({ expanded = true, active = "", submenu = false }: { expanded?: boolean; active?: string; submenu?: boolean }) {
  return (
    <SidebarExample
      key={`${expanded}-${active}-${submenu}`}
      state={expanded ? "expanded" : "collapsed"}
      activeItem={active}
      expandedGroups={submenu}
      contained
      className="min-h-[902px]"
    />
  )
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-[942px] items-start justify-start overflow-auto bg-background p-5">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

export function SidebarStateOverview() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Expanded" value='state="expanded"'><Sample /></Card><Card title="Collapsed" value='state="collapsed"'><Sample expanded={false} /></Card></div>
}

export function SidebarItemOverview() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Default" value="default"><Sample active="" submenu={false} /></Card><Card title="Active" value="isActive"><Sample active="Pacientes" submenu={false} /></Card></div>
}

export function SidebarSubnavigationOverview() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Expanded · open" value='state="expanded"'><Sample expanded submenu /></Card><Card title="Collapsed · open" value='state="collapsed"'><Sample expanded={false} submenu /></Card></div>
}

const geometry = [
  ["Sidebar expanded", "256px", "902px de referencia", "—", "—", "--sidebar"],
  ["Sidebar collapsed", "64px", "902px de referencia", "—", "—", "--sidebar"],
  ["Header", "100%", "56px", "0 16px", "8px", "--sidebar-border"],
  ["Menu item", "240 / 48px", "40px", "0 12px", "12px", "radius-md · 6px"],
  ["Icon", "16px", "16px", "—", "—", "--sidebar-foreground"],
  ["Group", "240 / 48px", "Variable", "20px 8px 0", "8px", "—"],
  ["Group label", "216 / 24px", "16px", "0 12px", "8px", "11px · uppercase"],
  ["Sub item", "240px", "40px", "0 12px 0 36px", "12px", "radius-md · 6px"],
  ["Sub item collapsed", "40px", "32px", "10px", "—", "icon 14px"],
  ["Subnavigation collapsed", "48px", "90px / 2 items", "5px 4px", "—", "border + radius-md"],
  ["Collapsible open · collapsed", "48px", "134px total", "0 0 4px", "—", "trigger 40px + panel 90px"],
] as const

const api = [
  ["side", "left | right", "Prop oficial", "Posición en desktop y Sheet móvil"],
  ["variant", "sidebar | floating | inset", "Prop oficial", "Tratamiento del contenedor"],
  ["collapsible", "offcanvas | icon | none", "Prop oficial", "Modo de colapso"],
  ["open / onOpenChange", "boolean / callback", "Prop oficial", "Estado controlado"],
  ["defaultOpen", "boolean", "Prop oficial", "Estado no controlado inicial"],
  ["Ctrl/Cmd + B", "shortcut", "Comportamiento oficial", "Alterna el estado"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[720px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, columnIndex) => <td key={`${row[0]}-${columnIndex}`}>{columnIndex === 0 ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function SidebarSpecifications() {
  return <div className="not-prose grid gap-6 text-foreground"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría y tokens</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Token / utilidad"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">API y comportamiento shadcn/ui</h3><Table columns={["Propiedad", "Valor", "Origen", "Uso"]} rows={api} /></section></div>
}
