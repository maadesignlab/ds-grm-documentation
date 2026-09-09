"use client"

import { DataTableExample, dataTableExamplePresets } from "./data-table-example"
import { DocsTable } from "./selectable-docs-shared"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-72 items-center overflow-auto bg-background p-5">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

export function DataTableCompositionOverview() {
  return <div className="not-prose grid gap-3">
    <Card title="Unida" value='toolbarLayout="attached"'><DataTableExample {...dataTableExamplePresets.complete} /></Card>
    <Card title="Separada" value='toolbarLayout="separated"'><DataTableExample {...dataTableExamplePresets.separated} /></Card>
  </div>
}

const patternCases = [
  ["Selección", "checkbox"],
  ["Activación", "switch"],
  ["Identificador", "identifier"],
  ["Detalle expandible", "expandable"],
] as const

export function DataTablePatternsOverview() {
  return <div className="not-prose grid gap-3">{patternCases.map(([title, preset]) => <Card key={preset} title={title} value={`pattern="${preset}"`}><DataTableExample {...dataTableExamplePresets[preset]} /></Card>)}</div>
}

const stateCases = ["loading", "empty", "error"] as const

export function DataTableStatesOverview() {
  return <div className="not-prose grid gap-3">{stateCases.map(status => <Card key={status} title={status === "loading" ? "Cargando" : status === "empty" ? "Vacío" : "Error"} value={`status="${status}"`}><DataTableExample {...dataTableExamplePresets.checkbox} status={status} /></Card>)}</div>
}

const featureRows = [
  ["Sorting", "Encabezados Paciente, Estado y Próxima cita", "rowSortingFeature"],
  ["Filtering", "Búsqueda por paciente y filtro de estado", "columnFilteringFeature"],
  ["Visibility", "Selector Columnas", "columnVisibilityFeature"],
  ["Selection", "Checkbox por fila y selección de página", "rowSelectionFeature"],
  ["Row actions", "Dropdown o 1–3 Icon Buttons", "TableCellBulkOptions"],
  ["Pagination", "Primera, anterior, siguiente y última página", "rowPaginationFeature"],
  ["Expansion", "Chevron y panel de detalle por fila", "rowExpandingFeature"],
  ["Server state", "Paginación, sorting y filtering controlados", "tableOptions"],
] as const

const specRows = [
  ["Toolbar unido", "62px mín.", "12px", "10px", "--card / --border", "Controles: 36px · --brand-font-sans · 14/20px"],
  ["Toolbar separado", "36px", "0", "10px", "sin contenedor", "Separación de tabla: 12px"],
  ["Search / filtros", "36px", "Tailwind px-2", "8px", "--input / --border", "InputGroup · Button · Select"],
  ["Table header", "36px", "0 10px", "10px", "--muted / --muted-foreground", "12/16px · 600 · uppercase · icono 12px"],
  ["Table cell", "49px mín.", "8px 10px", "10px", "--card / --foreground", "14px / 20px"],
  ["Striped rows", "49px mín.", "8px 10px", "—", "--muted / 5%", "stripedRows: odd | even"],
  ["Avatar cell", "55px mín.", "8px 10px", "10px", "--card / --foreground", "Avatar 28px"],
  ["Switch row", "49px mín.", "8px 10px", "10px", "--primary / --input", "Activa por defecto · Off aplica opacity-30"],
  ["Bulk actions", "32px", "0", "6px", "Button tokens", "Dropdown o 1–3 Icon Buttons"],
  ["Pagination unido", "56px mín.", "12px", "4px", "--card / --border", "Botones 32px"],
  ["Pagination separado", "32px", "0", "4px", "sin contenedor", "Separación de tabla: 12px · botones 32px"],
] as const

function FriendlyTable({ columns, rows }: { columns: string[]; rows: readonly (readonly string[])[] }) {
  return <DocsTable columns={columns} rows={rows} codeWhen={(_value, _row, column) => column === 0 || column === columns.length - 1} />
}

export function DataTableFeaturesOverview() {
  return <FriendlyTable columns={["Función", "Aplicación", "API TanStack"]} rows={featureRows} />
}

export function DataTableSpecifications() {
  return <FriendlyTable columns={["Parte", "Alto", "Padding", "Gap", "Token", "Detalle"]} rows={specRows} />
}
