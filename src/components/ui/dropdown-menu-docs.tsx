"use client"

import { DropdownMenuExample } from "./dropdown-menu-example"

function Code({ children }: { children: string }) { return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code> }
function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) { return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-64 items-start justify-center overflow-visible bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article> }

export function DropdownPatterns() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Button" value='trigger="button"'><DropdownMenuExample defaultOpen /></Card><Card title="Icon Button" value='trigger="icon"'><DropdownMenuExample trigger="icon" defaultOpen /></Card></div>
}

export function DropdownAlignment() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Start" value='align="start"'><DropdownMenuExample defaultOpen /></Card><Card title="End" value='align="end"'><DropdownMenuExample align="end" defaultOpen /></Card></div>
}

const anatomy = [
  ["Content", "176px mín.", "4px", "4px", "8px", "--popover / --border"],
  ["Label", "168px", "24px", "6px · 4px", "—", "--muted-foreground"],
  ["Item", "168px", "28px", "6px · 4px", "8px", "--foreground"],
  ["Icon", "16px", "16px", "—", "—", "currentColor"],
  ["Separador", "168px", "1px", "4px · 0", "—", "--border"],
  ["Offset", "—", "4px", "—", "—", "sideOffset"],
] as const
const states = [
  ["Default", "--popover", "--foreground", "—"],
  ["Hover / focus", "--accent", "--accent-foreground", "focus"],
  ["Active / submenu", "--accent", "--accent-foreground", "data-open"],
  ["Disabled", "—", "--foreground", "opacity-50"],
  ["Destructive", "—", "--destructive", "variant=destructive"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) { return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 680, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(c => <th key={c} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{c}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={row[0]} style={{ background: i % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((v, j) => <td key={`${row[0]}-${j}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: i === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{j === 0 || v.startsWith("--") ? <Code>{v}</Code> : v}</td>)}</tr>)}</tbody></table></div> }

export function DropdownSpecifications() { return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría y tokens</h3><Table columns={["Parte", "Ancho", "Alto", "Padding", "Radio", "Token"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Estados</h3><Table columns={["Estado", "Fondo", "Texto", "Implementación"]} rows={states} /></section></div> }
