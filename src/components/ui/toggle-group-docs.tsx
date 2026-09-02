"use client"

import { ToggleGroupExample } from "./toggle-group-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-36 items-center justify-center overflow-auto bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

export function ToggleGroupTypes() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Single" value="type=single"><ToggleGroupExample type="single" /></Card><Card title="Multiple" value="type=multiple"><ToggleGroupExample type="multiple" /></Card></div>
}

export function ToggleGroupVariants() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Default" value="variant=default"><ToggleGroupExample /></Card><Card title="Outline" value="variant=outline"><ToggleGroupExample variant="outline" /></Card></div>
}

export function ToggleGroupContent() {
  return <div className="not-prose grid gap-3 lg:grid-cols-3"><Card title="Icono" value="children=icon"><ToggleGroupExample items={3} content="icon" /></Card><Card title="Texto" value="children=text"><ToggleGroupExample items={3} content="text" /></Card><Card title="Icono y texto" value="children=icon-text"><ToggleGroupExample items={3} content="icon-text" /></Card></div>
}

export function ToggleGroupLayouts() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Horizontal" value="orientation=horizontal"><ToggleGroupExample items={3} /></Card><Card title="Vertical" value="orientation=vertical"><ToggleGroupExample items={3} orientation="vertical" /></Card></div>
}

const sizes = [
  ["sm", "32px", "32px", "6px"],
  ["default", "36px", "36px", "8px"],
  ["lg", "40px", "40px", "10px"],
] as const

const counts = Array.from({ length: 10 }, (_, index) => {
  const count = index + 1
  return [String(count), `${count * 36 + (count - 1) * 8}px`, "36px", "8px"] as const
})

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 620, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function ToggleGroupSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaños</h3><Table columns={["Size", "Alto", "Ancho mín.", "Padding X"]} rows={sizes} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Cantidad · referencia Figma con iconos</h3><Table columns={["Ítems", "Ancho horizontal", "Alto del ítem", "Gap"]} rows={counts} /></section></div>
}
