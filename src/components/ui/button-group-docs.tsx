"use client"

import { ButtonGroupExample } from "./button-group-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-36 items-center justify-center overflow-auto bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

export function ButtonGroupSlots() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Button" value="lastSlot=button"><ButtonGroupExample /></Card><Card title="Icon Button" value="lastSlot=icon-button"><ButtonGroupExample lastSlot="icon-button" /></Card><Card title="Dropdown" value="lastSlot=dropdown"><ButtonGroupExample lastSlot="dropdown" /></Card><Card title="Popover" value="lastSlot=popover"><ButtonGroupExample lastSlot="popover" /></Card></div>
}

export function ButtonGroupContent() {
  return <div className="not-prose grid gap-3 lg:grid-cols-3"><Card title="Icono" value="children=icon"><ButtonGroupExample items={3} content="icon" /></Card><Card title="Texto" value="children=text"><ButtonGroupExample items={3} content="text" /></Card><Card title="Icono y texto" value="children=icon-text"><ButtonGroupExample items={3} content="icon-text" /></Card></div>
}

export function ButtonGroupOrientation() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Horizontal" value="orientation=horizontal"><ButtonGroupExample items={3} /></Card><Card title="Vertical" value="orientation=vertical"><ButtonGroupExample items={3} orientation="vertical" /></Card></div>
}

export function ButtonGroupOfficialComposition() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Separator" value="composition=separator"><ButtonGroupExample composition="separator" /></Card><Card title="Text" value="composition=text"><ButtonGroupExample composition="text" /></Card></div>
}

const sizes = [
  ["xs", "24px", "12px", "16px"],
  ["sm", "28px", "12.8px", "16px"],
  ["default", "32px", "14px", "16px"],
  ["lg", "36px", "14px", "16px"],
] as const

const counts = Array.from({ length: 10 }, (_, index) => {
  const count = index + 1
  return [String(count), `${count * 69 - (count - 1)}px`, `${Math.max(0, count - 1) * 68 + 32}px`, "32px"] as const
})

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 650, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function ButtonGroupSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Escala heredada de Button</h3><Table columns={["Size", "Alto", "Texto", "Icono"]} rows={sizes} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Cantidad · referencia Figma con texto</h3><Table columns={["Ítems", "Último Button", "Último Icon/Dropdown", "Alto"]} rows={counts} /></section></div>
}
