"use client"

import { PopoverExample } from "./popover-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-visible rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-40 items-center justify-center overflow-visible rounded-t-lg bg-background p-10">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

const alignments = ["start", "center", "end"] as const
const sides = ["top", "right", "bottom", "left"] as const

export function PopoverAlignments() {
  return <div className="not-prose grid gap-3 md:grid-cols-3">{alignments.map(align => <Card key={align} title={align[0].toUpperCase() + align.slice(1)} value={`align=${align}`}><PopoverExample align={align} /></Card>)}</div>
}

export function PopoverSides() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{sides.map(side => <Card key={side} title={side[0].toUpperCase() + side.slice(1)} value={`side=${side}`}><PopoverExample side={side} content="form" /></Card>)}</div>
}

export function PopoverContents() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Basic" value="content=basic"><PopoverExample /></Card><Card title="With form" value="content=form"><PopoverExample content="form" /></Card></div>
}

const geometry = [
  ["Content", "288px", "Según contenido", "10px", "rounded-lg", "4px"],
  ["Trigger", "69px", "36px", "8px · 12px", "6px", "—"],
] as const
const tokens = [
  ["Content", "Fondo", "--popover"],
  ["Content", "Texto", "--popover-foreground"],
  ["Content", "Ring", "--foreground / 10%"],
  ["Contenido", "Fuente", "--brand-font-sans"],
] as const
const behavior = [
  ["Abierto", "boolean", "false", "Popover.open / defaultOpen"],
  ["Alineación", "start | center | end", "center", "PopoverContent.align"],
  ["Lado", "top | right | bottom | left", "bottom", "PopoverContent.side"],
  ["Separación", "number", "4px", "PopoverContent.sideOffset"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[720px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function PopoverSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Radio", "Separación"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tokens</h3><Table columns={["Parte", "Propiedad", "Variable"]} rows={tokens} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">API y comportamiento</h3><Table columns={["Propiedad", "Valores", "Default", "API oficial"]} rows={behavior} /></section></div>
}
