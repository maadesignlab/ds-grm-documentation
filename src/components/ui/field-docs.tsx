"use client"

import { FieldExample, type FieldControl } from "./field-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children, tall = false }: { title: string; value: string; children: React.ReactNode; tall?: boolean }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className={`flex items-center justify-center overflow-x-auto bg-background p-3 [&_[data-slot=field-description]]:!m-0 [&_[data-slot=field-description]]:!text-muted-foreground [&_[data-slot=field-description]]:!leading-normal [&_[data-slot=field-description]:nth-last-child(2)]:!-mt-1 [&_[data-slot=field-error]]:!text-sm [&_[data-slot=field-error]]:!leading-5 [&_[data-slot=input-otp-slot]]:!text-sm [&_[data-slot=input-otp-slot]]:!leading-5 ${tall ? "min-h-64" : "min-h-48"}`}>{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

const controls: readonly [FieldControl, string][] = [
  ["input", "Input"], ["time", "Input Time"], ["textarea", "Textarea"], ["checkbox", "Checkbox"], ["radio", "Radio Group"], ["switch", "Switch"], ["native-select", "Native Select"], ["select", "Select"], ["otp", "Input OTP"], ["slider", "Slider"],
]

export function FieldControls() {
  return <div className="not-prose grid gap-3 md:grid-cols-2">{controls.map(([control, title]) => <Card key={control} title={title} value={`control=${control}`} tall={control === "textarea" || control === "radio"}><FieldExample control={control} /></Card>)}</div>
}

export function FieldStates() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Default" value="default"><FieldExample description="after" /></Card><Card title="Invalid" value="data-invalid"><FieldExample status="invalid" description="after" /></Card><Card title="Disabled" value="data-disabled"><FieldExample status="disabled" description="after" /></Card></div>
}

export function FieldLayouts() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Description before" value="before"><FieldExample description="before" /></Card><Card title="Description after" value="after"><FieldExample description="after" /></Card><Card title="Horizontal" value="orientation=horizontal"><FieldExample orientation="horizontal" description="none" /></Card><Card title="Field Group" value="FieldGroup"><FieldExample control="group" /></Card></div>
}

const primitives = [
  ["Field", "div[role=group]", "orientation", "vertical | horizontal | responsive"],
  ["FieldSet", "fieldset", "className", "Agrupa controles relacionados"],
  ["FieldLegend", "legend", "variant", "legend | label"],
  ["FieldGroup", "div", "—", "Agrupa varios Field"],
  ["FieldLabel", "Label", "htmlFor", "Asocia el control"],
  ["FieldContent", "div", "—", "Agrupa label y descripción"],
  ["FieldTitle", "div", "—", "Título en composiciones anidadas"],
  ["FieldDescription", "p", "—", "Ayuda complementaria"],
  ["FieldError", "div[role=alert]", "errors", "Deduplica mensajes"],
  ["FieldSeparator", "div", "children", "Separador con texto opcional"],
] as const
const layout = [
  ["Field", "gap-2", "8px", "Oficial shadcn/ui"],
  ["FieldGroup", "gap-5", "20px", "Oficial shadcn/ui"],
  ["FieldSet", "gap-4", "16px", "Oficial shadcn/ui"],
  ["FieldContent", "gap-0.5", "2px", "Oficial shadcn/ui"],
  ["FieldDescription", "text-sm / leading-normal", "14px / normal", "--muted-foreground"],
  ["FieldError", "text-sm / font-normal", "14px / 400", "--destructive"],
] as const
const states = [
  ["Invalid", "data-invalid=true", "aria-invalid=true", "Texto y control destructivos"],
  ["Disabled", "data-disabled=true", "disabled", "Opacidad y bloqueo del control"],
  ["Required", "—", "required", "Validación nativa"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") || value.startsWith("data-") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function FieldSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API compuesta</h3><Table columns={["Componente", "Elemento", "Propiedad", "Función / valores"]} rows={primitives} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Layout y tokens</h3><Table columns={["Parte", "Tailwind", "Valor", "Origen / token"]} rows={layout} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Estados</h3><Table columns={["Estado", "Field", "Control", "Resultado"]} rows={states} /></section></div>
}
