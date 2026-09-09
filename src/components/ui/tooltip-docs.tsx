"use client"

import { TooltipExample } from "./tooltip-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-visible rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-40 items-center justify-center overflow-visible rounded-t-lg bg-background p-10">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

const triggers = ["button", "icon", "badge", "text"] as const
const sides = ["top", "right", "bottom", "left"] as const

export function TooltipTriggers() {
  return <div className="not-prose grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{triggers.map(trigger => <Card key={trigger} title={trigger[0].toUpperCase() + trigger.slice(1)} value="asChild"><TooltipExample triggerType={trigger} /></Card>)}</div>
}

export function TooltipSides() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{sides.map(side => <Card key={side} title={side[0].toUpperCase() + side.slice(1)} value={`side=${side}`}><TooltipExample side={side} opened avoidCollisions={false} /></Card>)}</div>
}

export function TooltipContentOptions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Texto" value="children"><TooltipExample opened /></Card><Card title="Con shortcut" value="KbdGroup"><TooltipExample opened showShortcut /></Card></div>
}

const geometry = [
  ["Superficie", "fit-content", "36px", "8px · 12px", "8px", "8px", "--tooltip"],
  ["Flecha", "10px", "5px", "—", "—", "—", "--tooltip"],
  ["Separación", "—", "4px", "—", "—", "—", "—"],
  ["Kbd", "20px mín.", "20px", "4px", "2px", "4px", "--tooltip-foreground / 20%"],
] as const

const behavior = [
  ["Trigger", "asChild", "Hover · focus", "TooltipTrigger"],
  ["Lado", "top | right | bottom | left", "top", "TooltipContent.side"],
  ["Alineación", "start | center | end", "center", "TooltipContent.align"],
  ["Demora", "number", "0ms", "TooltipProvider.delayDuration"],
  ["Colisiones", "boolean", "true", "TooltipContent.avoidCollisions"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[760px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function TooltipSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría y tokens</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Radio", "Gap", "Color"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">API y comportamiento</h3><Table columns={["Propiedad", "Valores", "Default", "API oficial"]} rows={behavior} /></section></div>
}
