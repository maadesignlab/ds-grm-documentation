"use client"

import { InputExample, type InputContent, type InputState } from "./input-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-44 items-center justify-center overflow-x-auto bg-background p-3 [&_input]:!text-sm [&_input]:!leading-5">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

const states: readonly [InputState, string][] = [["default", "Default"], ["focused", "Focused"], ["invalid", "Invalid"], ["disabled", "Disabled"]]
const types = ["text", "email", "password", "tel", "url", "search", "number", "date", "time", "file"] as const
const content: readonly [InputContent, string][] = [["icon", "Icon"], ["text", "Text"], ["button", "Button"], ["spinner", "Spinner"]]

export function InputStates() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{states.map(([state, title]) => <Card key={state} title={title} value={state}><InputExample state={state} /></Card>)}</div>
}

export function InputTypes() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{types.map(type => <Card key={type} title={type[0].toUpperCase() + type.slice(1)} value={`type=${type}`}><InputExample type={type} /></Card>)}</div>
}

export function InputContentExamples() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{content.map(([value, title], index) => <Card key={value} title={title} value={`InputGroup · ${value}`}><InputExample leftContent={index % 2 === 0 ? value : "none"} rightContent={index % 2 === 1 ? value : "none"} /></Card>)}</div>
}

const anatomy = [
  ["Input", "input", "React.ComponentProps<'input'>", "Primitive oficial"],
  ["InputGroup", "div[role=group]", "React.ComponentProps<'div'>", "Contenedor compuesto"],
  ["InputGroupInput", "Input", "Props nativas de input", "Control dentro del grupo"],
  ["InputGroupAddon", "div[role=group]", "align", "inline-start | inline-end | block-start | block-end"],
] as const
const geometry = [
  ["Altura", "h-8", "32px", "Oficial shadcn/ui · radix-nova"],
  ["Radio", "rounded-lg", "var(--radius) · 10px", "Token global"],
  ["Padding horizontal", "px-2.5", "10px", "Oficial shadcn/ui · radix-nova"],
  ["Texto", "text-sm / leading-5", "14px / 20px", "body/two/regular"],
] as const
const colors = [
  ["Fondo", "bg-transparent", "transparent", "Superficie heredada"],
  ["Borde", "border-input", "--input", "Token por marca"],
  ["Placeholder", "placeholder:text-muted-foreground", "--muted-foreground", "Token por marca"],
  ["Focus", "border-ring / ring-ring/50", "--ring", "Estado accesible"],
  ["Invalid", "border-destructive / ring-destructive/20", "--destructive", "Oficial shadcn/ui"],
  ["Disabled", "bg-input/50 / opacity-50", "--input", "shadcn/ui"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function InputSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y composición</h3><Table columns={["Parte", "Elemento", "API", "Función"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaño y espaciado</h3><Table columns={["Propiedad", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color y estados</h3><Table columns={["Parte", "Tailwind", "Variable", "Origen"]} rows={colors} /></section></div>
}
