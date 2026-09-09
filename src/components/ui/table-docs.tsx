"use client"

import { TableExample, tableExampleDefaults } from "./table-example"
import { DocsTable } from "./selectable-docs-shared"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-52 items-center justify-center overflow-auto bg-background p-5">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

export function TableBorderOverview() {
  return <div className="not-prose grid gap-3"><Card title="Normal" value='borderStyle="normal"'><TableExample {...tableExampleDefaults} borderStyle="normal" /></Card><Card title="Rounded" value='borderStyle="rounded"'><TableExample {...tableExampleDefaults} borderStyle="rounded" /></Card></div>
}

const leadingCases = [
  ["Sin control", "none"],
  ["Checkbox", "checkbox"],
  ["Switch", "switch"],
  ["Chevron", "chevron"],
] as const

export function TableLeadingOverview() {
  return <div className="not-prose grid gap-3">{leadingCases.map(([title, leadingColumn]) => <Card key={leadingColumn} title={title} value={`leadingColumn="${leadingColumn}"`}><TableExample {...tableExampleDefaults} leadingColumn={leadingColumn} /></Card>)}</div>
}

const contentCases = [
  ["Text", "text"],
  ["Avatar", "avatar"],
  ["Status Label", "status-label"],
  ["Status Badge", "status-badge"],
  ["Progress", "progress"],
  ["Counter", "counter"],
  ["Bulk Options", "bulk-options"],
] as const

export function TableCellContentOverview() {
  return <div className="not-prose grid gap-3">{contentCases.map(([title, cellContent]) => <Card key={cellContent} title={title} value={`cellContent="${cellContent}"`}><TableExample {...tableExampleDefaults} cellContent={cellContent} /></Card>)}</div>
}

const rows = [
  ["Contenedor", "100%", "—", "—", "--card / --border", "overflow-x-auto"],
  ["Header", "100%", "36px", "10px", "--muted / 40%", "sticky top-0"],
  ["Header text", "—", "16px", "—", "--muted-foreground", "12px · 600 · uppercase"],
  ["Body cell", "Flexible", "49px mín.", "8px 10px", "--foreground", "14px / 20px"],
  ["Striped rows", "100%", "Según fila", "—", "--muted / 5%", "stripedRows: odd | even"],
  ["Text", "Flexible", "20–32px", "—", "--foreground", "Sans/Mono · regular/medium/link"],
  ["Numeric value", "140px", "20px", "8px 10px", "--brand-font-mono", "14/20px · alineación derecha"],
  ["Avatar", "Flexible", "28–42px", "—", "--foreground", "Supporting/Compact/Metadata/Custom"],
  ["Status Label", "Flexible", "20px", "—", "--success/warning/destructive", "Indicador 6px + label"],
  ["Status Badge", "Auto", "30px", "5px 11px", "Tokens semánticos light", "Badge outline XL"],
  ["Progress", "139px", "20px", "—", "Semántico por valor", "Track 97×4px + porcentaje"],
  ["Counter", "94px", "32px", "—", "--border", "Rango 1–10"],
  ["Bulk Options", "Auto", "32px", "—", "Button tokens", "Icon Buttons · gap 6px"],
  ["Checkbox column", "36px", "Según control", "10px", "—", "Checkbox público"],
  ["Switch column", "52px", "Según control", "10px", "--primary / --input", "Activa por defecto · Off aplica opacity-30 a la fila"],
  ["Chevron column", "34px", "48px", "10px", "—", "Icono 14px"],
  ["Expanded row", "100%", "Auto", "16px", "--muted / 20%", "colSpan completo"],
  ["Rounded", "100%", "—", "—", "--border", "rounded-lg · shadow-xs"],
] as const

function SpecsTable() {
  const columns = ["Parte", "Ancho", "Alto", "Padding", "Token", "Detalle"]
  return <DocsTable columns={columns} rows={rows} codeWhen={(_value, _row, column) => column === 0} />
}

export function TableSpecifications() {
  return <div className="not-prose grid gap-6 text-foreground"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría y tokens</h3><SpecsTable /></section></div>
}
