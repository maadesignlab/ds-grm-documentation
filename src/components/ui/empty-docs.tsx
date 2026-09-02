"use client"

import { EmptyExample } from "./empty-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-[340px] items-center justify-center bg-background p-6"><div className="w-[382px] max-w-full">{children}</div></div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

export function EmptyContainerOverview() {
  return <div className="not-prose grid gap-3 xl:grid-cols-2"><Card title="Sin contenedor" value="none"><EmptyExample container="none" /></Card><Card title="Contorno" value="outline"><EmptyExample container="outline" /></Card></div>
}

export function EmptyMediaOverview() {
  return <div className="not-prose grid gap-3 xl:grid-cols-3"><Card title="Icono" value="variant=icon"><EmptyExample media="icon" actions="primary" showAuxiliary={false} /></Card><Card title="Avatar" value="composition"><EmptyExample media="avatar" actions="primary" showAuxiliary={false} /></Card><Card title="Spinner" value="composition"><EmptyExample media="spinner" actions="primary" showAuxiliary={false} /></Card></div>
}

export function EmptyActionsOverview() {
  return <div className="not-prose grid gap-3 xl:grid-cols-2"><Card title="Horizontal" value="flex-row"><EmptyExample actionLayout="horizontal" /></Card><Card title="Vertical" value="flex-col"><EmptyExample actionLayout="vertical" /></Card></div>
}

const geometry = [["Empty", "382px", "Contenido", "24px", "16px", "12px"], ["Header", "384px máx.", "Contenido", "0", "8px", "—"], ["Media icon", "32px", "32px", "0", "—", "8px"], ["Content", "384px máx.", "Contenido", "0", "10px", "—"]] as const
const typography = [["Título", "--font-sans", "14px / 20px", "500", "--foreground"], ["Descripción", "--font-sans", "14px / 20px", "400", "--muted-foreground"]] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 680, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function EmptySpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Radio"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tipografía y color</h3><Table columns={["Parte", "Fuente", "Tamaño / línea", "Peso", "Token"]} rows={typography} /></section></div>
}
