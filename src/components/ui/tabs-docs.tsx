"use client"

import type { ReactNode } from "react"

import { TabsExample } from "./tabs-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-40 items-center justify-center overflow-x-auto bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
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
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function TabsSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Estilos</h3><Table columns={["Variante", "Fondo list", "Fondo activo", "Texto activo", "Indicador/sombra", "Radio list/trigger"]} rows={styles} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaños y espaciado</h3><Table columns={["Elemento", "Ancho", "Alto", "Padding", "Gap", "Radio"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tipografía y color</h3><Table columns={["Estado", "Color/token", "Tamaño", "Line height", "Peso"]} rows={typography} /></section></div>
}
