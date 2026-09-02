"use client"

import { BreadcrumbExample } from "./breadcrumb-example"

function Code({ children }: { children: string }) { return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code> }
function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) { return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-32 items-center overflow-auto bg-background p-6">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article> }

export function BreadcrumbLevels() {
  return <div className="not-prose grid gap-3"><Card title="2 niveles" value="levels={2}"><BreadcrumbExample levels={2} /></Card><Card title="3 niveles" value="levels={3}"><BreadcrumbExample levels={3} /></Card><Card title="4 niveles" value="levels={4}"><BreadcrumbExample levels={4} /></Card></div>
}

export function BreadcrumbReduction() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Elipsis informativa" value='reduction="ellipsis"'><BreadcrumbExample reduction="ellipsis" /></Card><Card title="Elipsis interactiva" value='reduction="dropdown"'><BreadcrumbExample reduction="dropdown" /></Card></div>
}

const geometry = [
  ["Lista", "Contenido", "20px", "—", "6px", "—"],
  ["Link", "Contenido", "20px", "—", "—", "14px / 20px"],
  ["Página actual", "Contenido", "20px", "—", "—", "14px / 20px"],
  ["Separador", "14px", "14px", "—", "—", "ChevronRight"],
  ["Elipsis muted", "16px", "16px", "—", "—", "MoreHorizontal"],
  ["Elipsis dropdown", "24px", "24px", "4px", "—", "Button icon-xs"],
] as const
const tokens = [
  ["Link", "Texto", "--muted-foreground", "font-normal"],
  ["Link hover/focus", "Texto", "--foreground", "hover / focus-visible"],
  ["Página actual", "Texto", "--foreground", "aria-current=page"],
  ["Separador", "Icono", "currentColor", "aria-hidden=true"],
  ["Tipografía", "Familia", "--brand-font-sans", "font-sans"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) { return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 680, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(c => <th key={c} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{c}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={row[0]} style={{ background: i % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((v, j) => <td key={`${row[0]}-${j}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: i === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{j === 0 || v.startsWith("--") ? <Code>{v}</Code> : v}</td>)}</tr>)}</tbody></table></div> }

export function BreadcrumbSpecifications() { return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría y tipografía</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Detalle"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tokens y estados</h3><Table columns={["Parte", "Propiedad", "Token", "Implementación"]} rows={tokens} /></section></div> }
