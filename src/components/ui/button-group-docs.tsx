"use client"

import { ButtonGroupExample } from "./button-group-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-36 items-center justify-center overflow-auto bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
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
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[650px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function ButtonGroupSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Escala heredada de Button</h3><Table columns={["Size", "Alto", "Texto", "Icono"]} rows={sizes} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Cantidad · referencia Figma con texto</h3><Table columns={["Ítems", "Último Button", "Último Icon/Dropdown", "Alto"]} rows={counts} /></section></div>
}
