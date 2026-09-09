import { AccordionExample } from "./accordion-example"
import { DocsCode, DocsSpecificationTable } from "./selectable-docs-shared"

const specifications = [
  ["Trigger", "40px", "py-2.5 · 10px", "gap-1.5 · 6px", "14px / 20px", "500", "--foreground"],
  ["Content", "Variable", "pb-2.5 · 10px", "—", "14px / 20px", "400", "--foreground"],
  ["Icon", "16 × 16px", "—", "—", "—", "—", "--foreground"],
  ["Divider", "1px", "—", "—", "—", "—", "--border"],
] as const

function Code({ children }: { children: string }) {
  return <DocsCode>{children}</DocsCode>
}

export function AccordionModeOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2">
      <article className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="sb-unstyled flex min-h-[260px] items-start justify-center bg-background p-5">
          <AccordionExample mode="multiple" constrained={false} />
        </div>
        <div className="border-t border-border p-4">
          <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-2">
            <strong className="text-sm text-card-foreground">Multiple</strong>
            <Code>type=&quot;multiple&quot;</Code>
          </div>
          <p className="m-0 pt-3 text-xs leading-5 text-muted-foreground">Permite mantener varios ítems expandidos simultáneamente.</p>
        </div>
      </article>
      <article className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="sb-unstyled flex min-h-[260px] items-start justify-center bg-background p-5">
          <AccordionExample constrained={false} />
        </div>
        <div className="border-t border-border p-4">
          <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-2">
            <strong className="text-sm text-card-foreground">Unique</strong>
            <Code>type=&quot;single&quot;</Code>
          </div>
          <p className="m-0 pt-3 text-xs leading-5 text-muted-foreground">Mantiene un solo ítem expandido y admite cierre mediante collapsible.</p>
        </div>
      </article>
    </div>
  )
}

export function AccordionStateOverview() {
  return (
    <section className="not-prose overflow-hidden rounded-lg border border-border bg-card">
      <header className="flex flex-col gap-1 border-b border-border px-5 py-4">
        <h3 className="m-0 text-base leading-6 font-semibold text-card-foreground">Accordion Item</h3>
        <p className="m-0 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">Estados estructurales definidos en Figma.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="sb-unstyled border-b border-border p-5 lg:border-r lg:border-b-0">
          <div className="mb-3 flex items-center justify-between"><strong className="text-xs text-foreground">Colapsado</strong><Code>collapsed</Code></div>
          <AccordionExample defaultOpen={false} constrained={false} />
        </div>
        <div className="sb-unstyled p-5">
          <div className="mb-3 flex items-center justify-between"><strong className="text-xs text-foreground">Expandido</strong><Code>expanded</Code></div>
          <AccordionExample constrained={false} />
        </div>
      </div>
    </section>
  )
}

export function AccordionSpecifications() {
  const columns = ["Parte", "Altura", "Padding", "Gap", "Tipografía", "Peso", "Token"]
  return <DocsSpecificationTable title="Accordion" description="Valores de Figma expresados con tokens y utilidades TailwindCSS." columns={columns} rows={specifications} minWidthClassName="min-w-[760px]" codeWhen={(value, _row, column) => column === 0 || value.startsWith("--") || value.includes("py-") || value.includes("gap-")} />
}
