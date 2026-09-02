"use client"

import { TableExample } from "./table-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-52 items-center justify-center overflow-auto bg-background p-5">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

export function TableBorderOverview() {
  return <div className="not-prose grid gap-3"><Card title="Normal" value='borderStyle="normal"'><TableExample borderStyle="normal" rows={2} /></Card><Card title="Rounded" value='borderStyle="rounded"'><TableExample borderStyle="rounded" rows={2} /></Card></div>
}

const leadingCases = [
  ["Sin control", "none"],
  ["Checkbox", "checkbox"],
  ["Switch", "switch"],
  ["Chevron", "chevron"],
] as const

export function TableLeadingOverview() {
  return <div className="not-prose grid gap-3">{leadingCases.map(([title, leadingColumn]) => <Card key={leadingColumn} title={title} value={`leadingColumn="${leadingColumn}"`}><TableExample borderStyle="rounded" leadingColumn={leadingColumn} expanded={leadingColumn === "chevron"} rows={2} /></Card>)}</div>
}

const rows = [
  ["Contenedor", "100%", "—", "—", "--card / --border", "overflow-x-auto"],
  ["Header", "100%", "36px", "10px", "--muted / 40%", "sticky top-0"],
  ["Header text", "—", "16px", "—", "--muted-foreground", "12px · 600 · uppercase"],
  ["Body cell", "Flexible", "36px mín.", "10px", "--foreground", "12px / 16px"],
  ["Checkbox column", "36px", "Según control", "10px", "—", "Checkbox público"],
  ["Switch column", "52px", "Según control", "10px", "—", "Switch público"],
  ["Chevron column", "34px", "48px", "10px", "—", "Icono 14px"],
  ["Expanded row", "100%", "64px", "10px", "--muted / 20%", "colSpan completo"],
  ["Rounded", "100%", "—", "—", "--border", "rounded-lg · shadow-xs"],
] as const

function SpecsTable() {
  const columns = ["Parte", "Ancho", "Alto", "Padding", "Token", "Detalle"]
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cellIndex) => <td key={`${row[0]}-${cellIndex}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cellIndex === 0 ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function TableSpecifications() {
  return <div className="not-prose grid gap-6 text-foreground"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría y tokens</h3><SpecsTable /></section></div>
}
