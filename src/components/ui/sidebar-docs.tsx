"use client"

import { SidebarExample } from "./sidebar-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 max-w-full items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Sample({ expanded = true, active = "", submenu = false }: { expanded?: boolean; active?: string; submenu?: boolean }) {
  return (
    <div data-docs-sidebar className="relative h-[520px] overflow-hidden rounded-md border border-border bg-background">
      <style>{`
        [data-docs-sidebar] [data-slot="sidebar-wrapper"] { min-height: 520px !important; }
        [data-docs-sidebar] [data-slot="sidebar-gap"] { display: none !important; }
        [data-docs-sidebar] [data-slot="sidebar-container"] { position: relative !important; inset: auto !important; display: flex !important; height: 520px !important; }
        [data-docs-sidebar] :where(ul, li) { margin: 0 !important; padding-block: 0 !important; list-style: none !important; }
        [data-docs-sidebar] [data-slot="sidebar-menu"] { margin: 0 !important; padding: 0 !important; }
        [data-docs-sidebar] [data-slot="sidebar-menu-sub"] { margin: 0 !important; padding: 5px 0 !important; }
      `}</style>
      <SidebarExample
        key={`${expanded}-${active}-${submenu}`}
        state={expanded ? "expanded" : "collapsed"}
        activeItem={active}
        expandedGroups={submenu}
        showInset={false}
        className="min-h-0"
      />
    </div>
  )
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-[560px] items-center justify-center overflow-auto bg-background p-5">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
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
  ["Sidebar collapsed", "56px", "902px de referencia", "—", "—", "--sidebar"],
  ["Header", "100%", "56px", "0 16px", "8px", "--sidebar-border"],
  ["Menu item", "240 / 40px", "40px", "0 12px", "12px", "radius-md · 6px"],
  ["Icon", "16px", "16px", "—", "—", "--sidebar-foreground"],
  ["Group", "240 / 40px", "Variable", "20px 8px 0", "8px", "—"],
  ["Group label", "216 / 16px", "16px", "0 12px", "8px", "11px · uppercase"],
  ["Sub item", "240px", "40px", "0 12px", "12px", "radius-md · 6px"],
  ["Sub item collapsed", "32px", "32px", "10px", "—", "icon 14px"],
  ["Subnavigation collapsed", "40px", "90px / 2 items", "5px 4px", "—", "border + radius-md"],
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
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={row[0]} style={{ background: rowIndex % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, columnIndex) => <td key={`${row[0]}-${columnIndex}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: rowIndex === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{columnIndex === 0 ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function SidebarSpecifications() {
  return <div className="not-prose grid gap-6 text-foreground"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría y tokens</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Token / utilidad"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y comportamiento shadcn/ui</h3><Table columns={["Propiedad", "Valor", "Origen", "Uso"]} rows={api} /></section></div>
}
