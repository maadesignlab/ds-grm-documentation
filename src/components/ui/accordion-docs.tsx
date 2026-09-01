import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

const examples = [
  ["item-1", "¿Cómo puedo programar una cita?", "Puedes programarla desde nuestros canales digitales o comunicarte directamente con la sede."],
  ["item-2", "¿Qué servicios están disponibles?", "Consulta de control prenatal · Ultrasonido obstétrico · Ácido fólico prenatal."],
  ["item-3", "¿Puedo modificar una cita?", "Sí. Puedes reprogramarla o cancelarla antes de la fecha asignada."],
] as const

const specifications = [
  ["Trigger", "40px", "py-2.5 · 10px", "gap-1.5 · 6px", "14px / 20px", "500", "--foreground"],
  ["Content", "Variable", "pb-2.5 · 10px", "—", "14px / 20px", "400", "--foreground"],
  ["Icon", "16 × 16px", "—", "—", "—", "—", "--foreground"],
  ["Divider", "1px", "—", "—", "—", "—", "--border"],
] as const

function Code({ children }: { children: string }) {
  return (
    <code className="rounded bg-muted text-foreground" style={{ display: "inline-flex", minHeight: 24, maxWidth: "100%", alignItems: "center", padding: "4px 6px", fontSize: 10, lineHeight: 1 }}>
      {children}
    </code>
  )
}

function ExampleItems() {
  return examples.map(([value, title, content]) => (
    <AccordionItem value={value} key={value}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  ))
}

export function AccordionModeOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-3 lg:grid-cols-2">
      <article className="overflow-hidden rounded-lg border border-border bg-card">
        <div className="flex min-h-[260px] items-start justify-center bg-background p-5">
          <Accordion type="multiple" defaultValue={["item-1", "item-2"]} className="w-full max-w-[404px]">
            <ExampleItems />
          </Accordion>
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
        <div className="flex min-h-[260px] items-start justify-center bg-background p-5">
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full max-w-[404px]">
            <ExampleItems />
          </Accordion>
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
      <header className="border-b border-border" style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}>
        <h3 className="text-base font-semibold text-card-foreground" style={{ margin: 0, fontSize: 16, lineHeight: "24px" }}>Accordion Item</h3>
        <p className="text-sm text-muted-foreground" style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}>Estados estructurales definidos en Figma.</p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="border-b border-border p-5 lg:border-r lg:border-b-0">
          <div className="mb-3 flex items-center justify-between"><strong className="text-xs text-foreground">Colapsado</strong><Code>collapsed</Code></div>
          <Accordion type="single" collapsible className="w-full"><ExampleItems /></Accordion>
        </div>
        <div className="p-5">
          <div className="mb-3 flex items-center justify-between"><strong className="text-xs text-foreground">Expandido</strong><Code>expanded</Code></div>
          <Accordion type="single" collapsible defaultValue="item-1" className="w-full"><ExampleItems /></Accordion>
        </div>
      </div>
    </section>
  )
}

export function AccordionSpecifications() {
  const columns = ["Parte", "Altura", "Padding", "Gap", "Tipografía", "Peso", "Token"]
  return (
    <section className="not-prose overflow-hidden rounded-lg border border-border bg-card">
      <header className="border-b border-border" style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}>
        <h3 className="text-base font-semibold text-card-foreground" style={{ margin: 0, fontSize: 16, lineHeight: "24px" }}>Accordion</h3>
        <p className="text-sm text-muted-foreground" style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}>Valores de Figma expresados con tokens y utilidades TailwindCSS.</p>
      </header>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead><tr style={{ background: "var(--muted)" }}>{columns.map((column) => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead>
          <tbody>{specifications.map((row, rowIndex) => <tr key={row[0]} style={{ background: rowIndex % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, columnIndex) => <td key={row[0] + columns[columnIndex]} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: rowIndex === specifications.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, textAlign: "left", verticalAlign: "middle" }}>{columnIndex === 0 || value.startsWith("--") || value.includes("py-") || value.includes("gap-") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </section>
  )
}
