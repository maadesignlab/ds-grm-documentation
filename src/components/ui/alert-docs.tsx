import { FilePenLine } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"
import { Button } from "./button"

function Code({ children }: { children: string }) {
  return <code className="rounded bg-muted text-foreground" style={{ display: "inline-flex", minHeight: 24, maxWidth: "100%", alignItems: "center", padding: "4px 6px", fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function AlertExample({ variant = "default", icon = true, action = true }: { variant?: "default" | "destructive"; icon?: boolean; action?: boolean }) {
  return (
    <Alert variant={variant}>
      {icon && <FilePenLine aria-hidden />}
      <AlertTitle>Nueva cita asignada</AlertTitle>
      <AlertDescription>Se ha asignado una nueva cita al paciente por atención en Recepción</AlertDescription>
      {action && <AlertAction><Button size="xs">Ver detalle</Button></AlertAction>}
    </Alert>
  )
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex min-h-36 items-center justify-center overflow-auto bg-background p-5">{children}</div>
      <div className="border-t border-border px-4 py-3">
        <div className="grid min-h-8 grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <strong className="truncate text-sm text-card-foreground">{title}</strong>
          <Code>{value}</Code>
        </div>
      </div>
    </article>
  )
}

export function AlertVariantOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2">
      <Card title="Default" value='variant="default"'><AlertExample /></Card>
      <Card title="Destructive" value='variant="destructive"'><AlertExample variant="destructive" action={false} /></Card>
    </div>
  )
}

export function AlertCompositionOverview() {
  const cases = [
    ["Completo", "icon + action", true, true],
    ["Sin icono", "action", false, true],
    ["Sin acción", "icon", true, false],
    ["Solo contenido", "content", false, false],
  ] as const

  return <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2">{cases.map(([title, value, icon, action]) => <Card key={title} title={title} value={value}><AlertExample icon={icon} action={action} /></Card>)}</div>
}

const geometry = [
  ["Contenedor", "448px", "80px", "11px / 9px", "8px / 2px", "10px"],
  ["Icono", "16px", "16px", "—", "—", "—"],
  ["Título", "Flexible", "20px", "—", "—", "—"],
  ["Descripción", "Flexible", "40px máx. en muestra", "—", "—", "—"],
  ["Acción XS", "85px en muestra", "24px", "12px / 2px", "—", "6px"],
] as const

const tokens = [
  ["Contenedor", "Fondo", "--card"],
  ["Contenedor", "Borde", "--border"],
  ["Default", "Título", "--card-foreground"],
  ["Default", "Descripción", "--muted-foreground"],
  ["Destructive", "Título y descripción", "--destructive"],
  ["Acción", "Fondo", "--primary"],
  ["Acción", "Texto", "--primary-foreground"],
] as const

function SpecTable({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return (
    <section className="not-prose overflow-hidden rounded-lg border border-border bg-card">
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 680, borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead><tr style={{ background: "var(--muted)" }}>{columns.map((column) => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead>
          <tbody>{rows.map((row, rowIndex) => <tr key={row.join()} style={{ background: rowIndex % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, columnIndex) => <td key={columns[columnIndex]} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: rowIndex === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{columnIndex === 0 ? <Code>{value}</Code> : value.startsWith("--") || value.includes(" / ") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  )
}

export function AlertSpecifications() {
  return (
    <div className="not-prose grid gap-6">
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría y espaciado</h3>
        <SpecTable columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Radio"]} rows={geometry} />
      </section>
      <section>
        <h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color</h3>
        <SpecTable columns={["Parte", "Propiedad", "Token"]} rows={tokens} />
      </section>
    </div>
  )
}
