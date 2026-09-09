import { AlertDialogExample } from "./alert-dialog-example"
import { DocsCode, DocsTable } from "./selectable-docs-shared"

function Code({ children }: { children: string }) {
  return <DocsCode>{children}</DocsCode>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="sb-unstyled flex min-h-56 items-center justify-center overflow-auto bg-background p-5">{children}</div>
      <div className="border-t border-border px-4 py-3"><div className="grid min-h-8 grid-cols-[minmax(0,1fr)_auto] items-center gap-3"><strong className="truncate text-sm text-card-foreground">{title}</strong><Code>{value}</Code></div></div>
    </article>
  )
}

export function AlertDialogSizeOverview() {
  return <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2"><Card title="Basic" value='size="basic"'><AlertDialogExample inline /></Card><Card title="Small" value='size="sm"'><AlertDialogExample size="sm" inline /></Card></div>
}

export function AlertDialogStatusOverview() {
  return <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2"><Card title="Default" value='status="default"'><AlertDialogExample showMedia inline /></Card><Card title="Destructive" value='status="destructive"'><AlertDialogExample status="destructive" showMedia inline /></Card></div>
}

export function AlertDialogMediaOverview() {
  return <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2"><Card title="Con media" value="media"><AlertDialogExample showMedia inline /></Card><Card title="Sin media" value="content"><AlertDialogExample inline /></Card></div>
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
  return <DocsTable columns={columns} rows={rows} minWidthClassName="min-w-[700px]" codeWhen={(value, _row, column) => column === 0 || value.startsWith("--") || value.includes(" / ")} />
}

export function AlertDialogSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría y espaciado</h3><SpecTable columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Radio"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Color</h3><SpecTable columns={["Parte", "Propiedad", "Token"]} rows={tokens} /></section></div>
}
