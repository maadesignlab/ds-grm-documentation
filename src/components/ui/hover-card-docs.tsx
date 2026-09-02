"use client"

import { HoverCardExample } from "./hover-card-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-visible rounded-lg border border-border bg-card"><div className="flex min-h-48 items-center justify-center overflow-visible rounded-t-lg bg-background p-10">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

const sides = ["top", "right", "bottom", "left"] as const

export function HoverCardVariants() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Trigger con Button" value="asChild"><HoverCardExample triggerType="button" /></Card><Card title="Trigger de texto" value="asChild"><HoverCardExample triggerType="text" /></Card></div>
}

export function HoverCardSides() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{sides.map(side => <Card key={side} title={side[0].toUpperCase() + side.slice(1)} value={`side=${side}`}><HoverCardExample side={side} opened /></Card>)}</div>
}

const geometry = [
  ["Content", "276px", "104px", "10px", "6px", "--popover", "--border"],
  ["Título", "256px", "20px", "—", "—", "--popover", "—"],
  ["Descripción", "256px", "40px", "—", "—", "--popover", "—"],
  ["Metadato", "256px", "20px", "4px 0 0", "—", "--popover", "—"],
] as const

const typography = [
  ["Título", "--brand-font-sans", "14px", "600", "20px", "--popover-foreground"],
  ["Descripción", "--brand-font-sans", "14px", "400", "20px", "--popover-foreground"],
  ["Metadato", "--brand-font-sans", "12px", "400", "16px", "--muted-foreground"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function HoverCardSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría y color</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Radio", "Fondo", "Borde"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tipografía</h3><Table columns={["Parte", "Familia", "Tamaño", "Peso", "Line-height", "Color"]} rows={typography} /></section></div>
}
