import { Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "./alert-dialog"

type Size = "basic" | "sm"
type Status = "default" | "destructive"

function Code({ children }: { children: string }) {
  return <code className="rounded bg-muted text-foreground" style={{ display: "inline-flex", minHeight: 24, maxWidth: "100%", alignItems: "center", padding: "4px 6px", fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function AlertDialogExample({ size = "basic", status = "default", media = false }: { size?: Size; status?: Status; media?: boolean }) {
  return (
    <AlertDialog open>
      <AlertDialogContent size={size} status={status} inline>
        <AlertDialogHeader>
          {media && <AlertDialogMedia><Trash2 aria-hidden /></AlertDialogMedia>}
          <AlertDialogTitle>¿Deseas eliminar este registro?</AlertDialogTitle>
          <AlertDialogDescription>Esta acción no se puede deshacer</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={size === "basic" ? "w-[84px]" : undefined}>Cancelar</AlertDialogCancel>
          <AlertDialogAction variant={status === "destructive" ? "destructive" : "default"}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex min-h-56 items-center justify-center overflow-auto bg-background p-5">{children}</div>
      <div className="border-t border-border px-4 py-3"><div className="grid min-h-8 grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><strong className="truncate text-sm text-card-foreground">{title}</strong><Code>{value}</Code></div></div>
    </article>
  )
}

export function AlertDialogSizeOverview() {
  return <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2"><Card title="Basic" value='size="basic"'><AlertDialogExample /></Card><Card title="Small" value='size="sm"'><AlertDialogExample size="sm" /></Card></div>
}

export function AlertDialogStatusOverview() {
  return <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2"><Card title="Default" value='status="default"'><AlertDialogExample media /></Card><Card title="Destructive" value='status="destructive"'><AlertDialogExample status="destructive" media /></Card></div>
}

export function AlertDialogMediaOverview() {
  return <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2"><Card title="Con media" value="media"><AlertDialogExample media /></Card><Card title="Sin media" value="content"><AlertDialogExample /></Card></div>
}

const geometry = [
  ["Basic", "384px", "148px", "16px", "6px / 16px", "14px"],
  ["Small", "320px", "148px", "16px", "6px", "14px"],
  ["Media", "40px", "40px", "—", "—", "8px"],
  ["Footer", "100%", "66px", "17px", "10px", "0 / 0 / 14px / 14px"],
  ["Botones", "Flexible", "32px", "12px / 6px", "—", "6px"],
] as const

const tokens = [
  ["Superficie", "Fondo", "--popover"], ["Superficie", "Borde", "--border"],
  ["Título", "Color", "--popover-foreground"], ["Descripción", "Color", "--muted-foreground"],
  ["Footer", "Fondo", "--muted / 50%"], ["Media default", "Fondo", "--muted"],
  ["Media destructive", "Fondo", "--destructive / 20%"], ["Acción destructive", "Tokens", "--destructive-light-*"],
] as const

function SpecTable({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <section className="not-prose overflow-hidden rounded-lg border border-border bg-card"><div style={{ overflowX: "auto" }}><table style={{ width: "100%", minWidth: 700, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map((column) => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, rowIndex) => <tr key={row.join()} style={{ background: rowIndex % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, index) => <td key={columns[index]} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: rowIndex === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{index === 0 ? <Code>{value}</Code> : value.startsWith("--") || value.includes(" / ") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div></section>
}

export function AlertDialogSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría y espaciado</h3><SpecTable columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Radio"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Color</h3><SpecTable columns={["Parte", "Propiedad", "Token"]} rows={tokens} /></section></div>
}
