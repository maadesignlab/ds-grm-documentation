"use client"

import type { ReactNode } from "react"

import { TabsExample } from "./tabs-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-40 items-center justify-center overflow-x-auto bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

export function TabsStyles() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Contained" value="variant=default"><TabsExample variant="default" tabAmount={3} showContent={false} /></Card><Card title="Underline" value="variant=line"><TabsExample variant="line" tabAmount={3} showContent={false} /></Card></div>
}

export function TabsOfficialBehaviors() {
  return <div className="not-prose grid gap-3 md:grid-cols-3"><Card title="Vertical" value="orientation=vertical"><TabsExample orientation="vertical" tabAmount={3} showContent={false} /></Card><Card title="Con iconos" value="iconPosition=left"><TabsExample tabAmount={3} iconPosition="left" showContent={false} /></Card><Card title="Disabled" value="disabledTab=true"><TabsExample tabAmount={3} disabledTab showContent={false} /></Card></div>
}

const styles = [
  ["Contained / default", "--muted", "--background", "--foreground", "shadow-sm", "10px / 8px"],
  ["Underline / line", "transparent", "transparent", "--primary", "2px indicator", "0px / 8px"],
] as const

const geometry = [
  ["TabsList", "fit-content", "32px", "3px", "0px", "10px"],
  ["TabsTrigger", "intrínseco", "25px", "3px 7px", "6px", "8px"],
  ["Icon", "16px", "16px", "—", "6px", "—"],
  ["Label", "intrínseco", "20px", "—", "—", "—"],
] as const

const typography = [
  ["Trigger default", "--foreground / 60%", "14px", "20px", "500"],
  ["Trigger hover", "--foreground", "14px", "20px", "500"],
  ["Trigger active · contained", "--foreground", "14px", "20px", "500"],
  ["Trigger active · underline", "--primary", "14px", "20px", "500"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[720px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function TabsSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Estilos</h3><Table columns={["Variante", "Fondo list", "Fondo activo", "Texto activo", "Indicador/sombra", "Radio list/trigger"]} rows={styles} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tamaños y espaciado</h3><Table columns={["Elemento", "Ancho", "Alto", "Padding", "Gap", "Radio"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tipografía y color</h3><Table columns={["Estado", "Color/token", "Tamaño", "Line height", "Peso"]} rows={typography} /></section></div>
}
