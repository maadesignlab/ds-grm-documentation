"use client"

import { HoverCardExample } from "./hover-card-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-visible rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-48 items-center justify-center overflow-visible rounded-t-lg bg-background p-10">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
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
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[760px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function HoverCardSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría y color</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Radio", "Fondo", "Borde"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tipografía</h3><Table columns={["Parte", "Familia", "Tamaño", "Peso", "Line-height", "Color"]} rows={typography} /></section></div>
}
