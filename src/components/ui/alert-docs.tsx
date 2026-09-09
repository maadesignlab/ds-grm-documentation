import { AlertExample } from "./alert-example"
import { DocsCode, DocsTable } from "./selectable-docs-shared"

function Code({ children }: { children: string }) {
  return <DocsCode>{children}</DocsCode>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return (
    <article className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="sb-unstyled flex min-h-36 items-center justify-center overflow-auto bg-background p-5">{children}</div>
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
      <Card title="Destructive" value='variant="destructive"'><AlertExample variant="destructive" showAction={false} /></Card>
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

  return <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2">{cases.map(([title, value, icon, action]) => <Card key={title} title={title} value={value}><AlertExample showIcon={icon} showAction={action} /></Card>)}</div>
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
  return <DocsTable columns={columns} rows={rows} minWidthClassName="min-w-[680px]" codeWhen={(value, _row, column) => column === 0 || value.startsWith("--") || value.includes(" / ")} />
}

export function AlertSpecifications() {
  return (
    <div className="not-prose grid gap-6">
      <section>
        <h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría y espaciado</h3>
        <SpecTable columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Radio"]} rows={geometry} />
      </section>
      <section>
        <h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Color</h3>
        <SpecTable columns={["Parte", "Propiedad", "Token"]} rows={tokens} />
      </section>
    </div>
  )
}
