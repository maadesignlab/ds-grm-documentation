"use client"

import type { ReactNode } from "react"

import { SheetExample } from "./sheet-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-36 items-center justify-center bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

export function SheetPositions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Top" value="side=top"><SheetExample side="top" /></Card><Card title="Right" value="side=right"><SheetExample side="right" /></Card><Card title="Bottom" value="side=bottom"><SheetExample side="bottom" /></Card><Card title="Left" value="side=left"><SheetExample side="left" /></Card></div>
}

export function SheetWidths() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Side · 384 px" value="sideWidth=384"><SheetExample sideWidth={384} /></Card><Card title="Side · 480 px" value="sideWidth=480"><SheetExample sideWidth={480} /></Card></div>
}

export function SheetCloseButtons() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Con cierre" value="showCloseButton=true"><SheetExample showCloseButton /></Card><Card title="Sin cierre" value="showCloseButton=false"><SheetExample showCloseButton={false} /></Card></div>
}

export function SheetFooterAlignments() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Acciones en columna" value="footerAlignment=column"><SheetExample footerAlignment="column" /></Card><Card title="Acciones en fila" value="footerAlignment=row"><SheetExample footerAlignment="row" /></Card></div>
}

const geometry = [
  ["Side · small", "384px", "100dvh", "16px", "16px", "16px", "—"],
  ["Side · large", "480px", "100dvh", "16px", "16px", "16px", "—"],
  ["Top / Bottom", "100%", "512px máx.", "16px", "16px", "16px", "—"],
] as const

const anatomy = [
  ["Title", "--popover-foreground", "16px / 24px", "500", "—"],
  ["Description", "--muted-foreground", "14px / 20px", "400", "—"],
  ["Close", "--foreground", "28 × 28px", "—", "top/right 12px"],
  ["Body", "Por contenido", "14px / 20px", "400", "padding-x 16px"],
  ["Footer · column", "--border", "106px", "—", "16px · gap 10px"],
  ["Footer · row", "--border", "64px", "—", "16px · gap 10px"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function SheetSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría</h3><Table columns={["Variante", "Ancho", "Alto", "Header padding", "Body padding", "Footer padding", "Radio"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Anatomía</h3><Table columns={["Región", "Color/token", "Tamaño", "Peso", "Espaciado"]} rows={anatomy} /></section></div>
}
