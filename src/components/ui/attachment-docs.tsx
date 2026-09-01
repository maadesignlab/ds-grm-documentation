import { CircleCheck, File, Paperclip, RotateCw, X } from "lucide-react"

import { Spinner } from "./spinner"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "./attachment"

type State = "idle" | "uploading" | "processing" | "error" | "done"
type Size = "default" | "sm" | "xs"

const stateDescriptions: Record<State, string> = {
  idle: "Ready to upload",
  uploading: "Uploading · 64%",
  processing: "Processing document",
  error: "Upload failed. Try again.",
  done: "Uploaded · 1.8 MB",
}

function Code({ children }: { children: string }) {
  return <code className="rounded bg-muted text-foreground" style={{ display: "inline-flex", minHeight: 24, maxWidth: "100%", alignItems: "center", padding: "4px 6px", fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function AttachmentExample({ state = "idle", size = "default", orientation = "horizontal", media = "icon", title = "documento-paciente.pdf", actions = true }: {
  state?: State
  size?: Size
  orientation?: "horizontal" | "vertical"
  media?: "icon" | "image"
  title?: string
  actions?: boolean
}) {
  const visual = state === "uploading" || state === "processing"
    ? <Spinner />
    : state === "done"
      ? <CircleCheck aria-hidden />
      : media === "image"
        ? <File aria-hidden />
        : <Paperclip aria-hidden />

  return (
    <Attachment state={state} size={size} orientation={orientation}>
      <AttachmentMedia variant={media}>{visual}</AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{title}</AttachmentTitle>
        <AttachmentDescription>{stateDescriptions[state]}</AttachmentDescription>
      </AttachmentContent>
      {actions && <AttachmentActions>{state === "error" && <AttachmentAction aria-label="Reintentar"><RotateCw /></AttachmentAction>}<AttachmentAction aria-label="Eliminar"><X /></AttachmentAction></AttachmentActions>}
    </Attachment>
  )
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return (
    <article className="overflow-hidden rounded-xl border border-border bg-card">
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

export function AttachmentPatternOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card title="Horizontal" value='orientation="horizontal"'><AttachmentExample /></Card>
      <Card title="Vertical" value='orientation="vertical"'><AttachmentExample orientation="vertical" media="image" /></Card>
    </div>
  )
}

export function AttachmentStateOverview() {
  const states: State[] = ["idle", "uploading", "processing", "error", "done"]
  return <div className="not-prose grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{states.map((state) => <Card key={state} title={state[0].toUpperCase() + state.slice(1)} value={`state="${state}"`}><AttachmentExample state={state} /></Card>)}</div>
}

export function AttachmentSizeOverview() {
  return (
    <section className="not-prose overflow-hidden rounded-xl border border-border bg-card">
      <header className="border-b border-border" style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Horizontal</h3>
        <p className="text-muted-foreground" style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}>Escala definida en Figma para el patrón compacto.</p>
      </header>
      <div className="grid grid-cols-1 divide-y divide-border p-5 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {(["default", "sm", "xs"] as Size[]).map((size) => <div key={size} className="flex min-h-32 flex-col items-center justify-center gap-3 px-3 py-5"><AttachmentExample size={size} /><Code>{size}</Code></div>)}
      </div>
    </section>
  )
}

export function AttachmentGroupOverview() {
  return (
    <section className="not-prose overflow-hidden rounded-xl border border-border bg-card">
      <header className="border-b border-border" style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>AttachmentGroup</h3>
        <p className="text-muted-foreground" style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}>Fila desplazable con separación de 12px y snapping visual para 1 a 10 archivos.</p>
      </header>
      <div className="bg-background p-5">
        <AttachmentGroup>{["orden-medica.pdf", "resultado-laboratorio.pdf", "imagen-diagnostica.jpg"].map((title) => <AttachmentExample key={title} title={title} actions={false} />)}</AttachmentGroup>
      </div>
    </section>
  )
}

const specifications = [
  ["Default", "260px", "56px", "p-2 · 8px", "gap-2 · 8px", "40px", "rounded-xl · 12px"],
  ["Small", "224px", "46px", "p-1.5 · 6px", "gap-2.5 · 10px", "32px", "rounded-xl · 12px"],
  ["Extra small", "172px", "40px", "p-1 · 4px", "gap-1.5 · 6px", "28px", "rounded-lg · 8px"],
  ["Vertical", "120px", "166px", "p-2 · 8px", "gap-2 · 8px", "102px", "rounded-xl · 12px"],
] as const

export function AttachmentSpecifications() {
  const columns = ["Tamaño", "Ancho", "Alto", "Padding", "Espaciado", "Media", "Radio"]
  return (
    <section className="not-prose overflow-hidden rounded-xl border border-border bg-card">
      <header className="border-b border-border" style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Attachment</h3>
        <p className="text-muted-foreground" style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}>Medidas de Figma expresadas con utilidades TailwindCSS.</p>
      </header>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 780, borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead><tr style={{ background: "var(--muted)" }}>{columns.map((column) => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead>
          <tbody>{specifications.map((row, rowIndex) => <tr key={row[0]} style={{ background: rowIndex % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, columnIndex) => <td key={columns[columnIndex]} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: rowIndex === specifications.length - 1 ? 0 : "1px solid var(--border)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{columnIndex === 0 ? <strong>{value}</strong> : value.includes("·") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  )
}

export function AttachmentTokenSpecifications() {
  const rows = [
    ["Contenedor", "Fondo", "--card"], ["Contenedor", "Borde", "--border"], ["Idle", "Estilo de borde", "border-dashed"],
    ["Título", "Color", "--foreground"], ["Descripción", "Color", "--muted-foreground"], ["Media", "Fondo", "--muted"],
    ["Error", "Borde", "--destructive / 30%"], ["Error", "Media", "--destructive / 10%"], ["Error", "Texto", "--destructive"],
  ]
  return (
    <section className="not-prose overflow-hidden rounded-xl border border-border bg-card">
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{["Parte", "Propiedad", "Token / utilidad"].map((column) => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, textAlign: "left", textTransform: "uppercase" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row.join()}>{row.map((value, column) => <td key={value} style={{ height: 50, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", fontSize: 12, verticalAlign: "middle" }}>{column === 2 ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table>
    </section>
  )
}
