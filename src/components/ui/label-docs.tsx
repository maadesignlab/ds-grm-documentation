"use client"

import { LabelExample } from "./label-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-44 items-center justify-center bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

export function LabelCompositions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="With Input" value="Input"><LabelExample control="input" text="Nombre de usuario" /></Card><Card title="With Checkbox" value="Checkbox"><LabelExample control="checkbox" text="Aceptar términos y condiciones" /></Card><Card title="Disabled" value="data-disabled"><LabelExample control="input" text="Deshabilitado" disabled /></Card><Card title="With Textarea" value="Textarea"><LabelExample control="textarea" text="Mensaje" /></Card></div>
}

const anatomy = [
  ["Elemento", "label", "API nativa", "React.ComponentProps<'label'>"],
  ["Asociación", "htmlFor", "Control asociado", "id"],
  ["Contenido", "children", "Texto o composición", "ReactNode"],
  ["Estilos", "className", "Extensión local", "string"],
] as const
const styles = [
  ["Display", "flex items-center", "Oficial shadcn/ui"],
  ["Gap", "gap-2 · 8px", "Oficial shadcn/ui"],
  ["Tamaño", "text-sm · 14px", "Oficial shadcn/ui"],
  ["Line-height", "leading-none · 1", "Oficial shadcn/ui"],
  ["Peso", "font-medium · 500", "Oficial shadcn/ui"],
  ["Selección", "select-none", "Oficial shadcn/ui"],
] as const
const states = [
  ["Disabled", "Field[data-disabled] + control[disabled]", "opacity-50 · pointer-events-none"],
  ["Invalid", "Field[data-invalid] + aria-invalid", "text-destructive + FieldError"],
  ["Required", "control[required]", "Indicador compuesto en children"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function LabelSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API del primitive</h3><Table columns={["Parte", "Propiedad", "Función", "Tipo / relación"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Estilos base</h3><Table columns={["Propiedad", "Tailwind", "Origen"]} rows={styles} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Estados compuestos</h3><Table columns={["Estado", "Implementación", "Resultado"]} rows={states} /></section></div>
}
