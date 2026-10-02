"use client"

import type { ReactNode } from "react"

import { SheetBodySection, SheetContainedRow } from "./sheet-content-sections"
import { SheetExample } from "./sheet-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-36 items-center justify-center bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

export function SheetPositions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Top" value="side=top"><SheetExample side="top" /></Card><Card title="Right" value="side=right"><SheetExample side="right" /></Card><Card title="Bottom" value="side=bottom"><SheetExample side="bottom" /></Card><Card title="Left" value="side=left"><SheetExample side="left" /></Card></div>
}

export function SheetWidths() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Side · 360 px" value="sideWidth=360"><SheetExample sideWidth={360} /></Card><Card title="Side · 720 px" value="sideWidth=720"><SheetExample sideWidth={720} /></Card></div>
}

export function SheetCloseButtons() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Con cierre" value="showCloseButton=true"><SheetExample showCloseButton /></Card><Card title="Sin cierre" value="showCloseButton=false"><SheetExample showCloseButton={false} /></Card></div>
}

export function SheetFooterAlignments() {
  return <div className="not-prose grid gap-3 md:grid-cols-3">{(["single-single", "single-group", "group-single"] as const).map(value => <Card key={value} title={value.replaceAll("-", " + ")} value={value}><SheetExample footerComposition={value} /></Card>)}</div>
}

export function SheetHeaders() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{(["title-description", "progress", "badge", "breadcrumb"] as const).map(value => <Card key={value} title={{ "title-description": "Título + descripción", progress: "Con progreso", badge: "Con badge", breadcrumb: "Breadcrumb" }[value]} value={value}><SheetExample headerType={value} /></Card>)}</div>
}

export function SheetStatuses() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{(["success", "warning", "error", "destructive", "info"] as const).map(value => <Card key={value} title={value} value={value}><SheetExample status={value} /></Card>)}<Card title="Sin banda" value="showStatusBand=false"><SheetExample showStatusBand={false} /></Card></div>
}

const geometry = [
  ["Side · small", "360px", "100dvh", "16px", "16px", "16px", "—"],
  ["Side · large", "720px", "100dvh", "16px", "16px", "16px", "—"],
  ["Top / Bottom", "100%", "512px máx.", "16px", "16px", "16px", "—"],
] as const

const anatomy = [
  ["Title", "--popover-foreground", "16px / 24px", "500", "—"],
  ["Description", "--muted-foreground", "14px / 20px", "400", "—"],
  ["Close", "--foreground", "32 × 32px", "—", "Integrado en header"],
  ["Body", "Por contenido", "14px / 20px", "400", "padding-x 16px"],
  ["Status band", "--{status}-light / --{status}-light-foreground", "36px", "400", "10px 16px"],
  ["Footer · single/group", "--border", "64px", "—", "16px · gap 10px"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[760px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function SheetSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría</h3><Table columns={["Variante", "Ancho", "Alto", "Header padding", "Body padding", "Footer padding", "Radio"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Anatomía</h3><Table columns={["Región", "Color/token", "Tamaño", "Peso", "Espaciado"]} rows={anatomy} /></section></div>
}

export function SheetBodies() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{(["blank", "tabs-normal", "tabs-overflow", "stepper"] as const).map(value => <Card key={value} title={{ blank: "Vacío", "tabs-normal": "Tabs normales", "tabs-overflow": "Tabs con desplazamiento", stepper: "Stepper" }[value]} value={value}><SheetExample bodyType={value} /></Card>)}</div>
}

export function SheetContentExamples() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Formulario de edición" value="edit-form"><SheetExample contentType="edit-form" /></Card><Card title="Vista de detalle" value="details-view"><SheetExample contentType="details-view" /></Card></div>
}

export function SheetRowFonts() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{(["sans", "mono"] as const).map(font => <Card key={font} title={font === "sans" ? "Sans / Sans" : "Sans / Mono"} value={font}><div className="w-full"><SheetBodySection title="Datos del cupón" variant="contained"><SheetContainedRow label="Código" valueFont={font}>BUENFIN2026</SheetContainedRow></SheetBodySection></div></Card>)}</div>
}
