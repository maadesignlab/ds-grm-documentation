import { AttachmentExample, type AttachmentState as State } from "./attachment-example"
import { DocsCode, DocsSpecificationTable, DocsTable } from "./selectable-docs-shared"
import {
  AttachmentGroup,
} from "./attachment"

type Size = "default" | "sm" | "xs"

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

export function AttachmentPatternOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2">
      <Card title="Horizontal" value='orientation="horizontal"'><AttachmentExample /></Card>
      <Card title="Vertical" value='orientation="vertical"'><AttachmentExample orientation="vertical" media="image" /></Card>
    </div>
  )
}

export function AttachmentStateOverview() {
  const states: State[] = ["idle", "uploading", "processing", "error", "done"]
  return <div className="not-prose grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">{states.map((state) => <Card key={state} title={state[0].toUpperCase() + state.slice(1)} value={`state="${state}"`}><AttachmentExample state={state} /></Card>)}</div>
}

export function AttachmentSizeOverview() {
  return (
    <section className="not-prose overflow-hidden rounded-lg border border-border bg-card">
      <header className="flex flex-col gap-1 border-b border-border px-5 py-4">
        <h3 className="m-0 text-base leading-6 font-semibold text-card-foreground">Horizontal</h3>
        <p className="m-0 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">Escala definida en Figma para el patrón compacto.</p>
      </header>
      <div className="grid grid-cols-1 divide-y divide-border p-5 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {(["default", "sm", "xs"] as Size[]).map((size) => <div key={size} className="sb-unstyled flex min-h-32 flex-col items-center justify-center gap-3 px-3 py-5"><AttachmentExample size={size} /><Code>{size}</Code></div>)}
      </div>
    </section>
  )
}

export function AttachmentGroupOverview() {
  return (
    <section className="not-prose overflow-hidden rounded-lg border border-border bg-card">
      <header className="flex flex-col gap-1 border-b border-border px-5 py-4">
        <h3 className="m-0 text-base leading-6 font-semibold text-card-foreground">AttachmentGroup</h3>
        <p className="m-0 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">Fila desplazable con separación de 12px y snapping visual para 1 a 10 archivos.</p>
      </header>
      <div className="bg-background p-5">
        <AttachmentGroup>{["orden-medica.pdf", "resultado-laboratorio.pdf", "imagen-diagnostica.jpg"].map((title) => <AttachmentExample key={title} title={title} showAction={false} />)}</AttachmentGroup>
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
  return <DocsSpecificationTable title="Attachment" description="Medidas de Figma expresadas con utilidades TailwindCSS." columns={columns} rows={specifications} minWidthClassName="min-w-[780px]" codeWhen={(value, _row, column) => column === 0 || value.includes("·")} />
}

export function AttachmentTokenSpecifications() {
  const rows = [
    ["Contenedor", "Fondo", "--card"], ["Contenedor", "Borde", "--border"], ["Idle", "Estilo de borde", "border-dashed"],
    ["Título", "Color", "--foreground"], ["Descripción", "Color", "--muted-foreground"], ["Media", "Fondo", "--muted"],
    ["Error", "Borde", "--destructive / 30%"], ["Error", "Media", "--destructive / 10%"], ["Error", "Texto", "--destructive"],
  ]
  return (
    <DocsTable columns={["Parte", "Propiedad", "Token / utilidad"]} rows={rows} minWidthClassName="min-w-[640px]" codeWhen={(_value, _row, column) => column === 0 || column === 2} />
  )
}
