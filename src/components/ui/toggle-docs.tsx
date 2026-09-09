"use client"

import { cn } from "@/lib/utils"

import { ToggleExample } from "./toggle-example"
import { DocsCode } from "./selectable-docs-shared"

function Code({ children }: { children: string }) {
  return <DocsCode>{children}</DocsCode>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-36 items-center justify-center bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

export function ToggleVariants() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Default" value="variant=default"><ToggleExample /></Card><Card title="Outline" value="variant=outline"><ToggleExample variant="outline" /></Card></div>
}

export function ToggleContent() {
  return <div className="not-prose grid gap-3 sm:grid-cols-3"><Card title="Icono" value="icon"><ToggleExample content="icon" /></Card><Card title="Texto" value="text"><ToggleExample content="text" /></Card><Card title="Icono y texto" value="icon-text"><ToggleExample content="icon-text" /></Card></div>
}

const sizes = [
  { label: "Small", value: "sm", height: "32px", padding: "6px" },
  { label: "Default", value: "default", height: "36px", padding: "8px" },
  { label: "Large", value: "lg", height: "40px", padding: "10px" },
] as const

export function ToggleSizes() {
  return (
    <section className="not-prose overflow-hidden rounded-lg border border-border bg-card">
      <header className="flex flex-col gap-1 border-b border-border px-5 py-4">
        <h3 className="m-0 text-base leading-6 font-semibold text-card-foreground">
          Toggle
        </h3>
        <p className="m-0 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">
          La altura, el ancho mínimo y el padding cambian según el tamaño.
        </p>
      </header>
      <div>
        {sizes.map((size, index) => (
          <div key={size.value} className={cn("grid min-h-18 grid-cols-[minmax(116px,0.8fr)_minmax(150px,1.2fr)] items-center gap-4 px-5 py-2.5", index !== sizes.length - 1 && "border-b border-border")}>
            <div className="flex flex-col gap-1">
              <div className="text-xs leading-(--docs-caption-line-height) font-medium text-foreground">
                {size.label}
              </div>
              <div className="text-(length:--docs-table-header-font-size) leading-4 text-muted-foreground">
                {size.height} · px {size.padding}
              </div>
            </div>
            <div className="sb-unstyled flex min-h-12 items-center justify-center rounded-md bg-background px-4">
              <ToggleExample size={size.value} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ToggleStates() {
  return <div className="not-prose grid gap-3 sm:grid-cols-3"><Card title="Off" value="aria-pressed=false"><ToggleExample /></Card><Card title="On" value="aria-pressed=true"><ToggleExample pressed /></Card><Card title="Disabled" value="disabled"><ToggleExample disabled /></Card></div>
}

const geometry = [
  ["sm", "32px", "32px", "6px", "8px", "6px", "16px"],
  ["default", "36px", "36px", "8px", "8px", "6px", "16px"],
  ["lg", "40px", "40px", "10px", "8px", "6px", "16px"],
] as const

const styles = [
  ["Default · off", "transparent", "--foreground", "—"],
  ["Default · hover", "--muted", "--muted-foreground", "—"],
  ["Outline · off", "transparent", "--foreground", "--input"],
  ["Outline · hover", "--accent", "--accent-foreground", "--input"],
  ["On", "--accent", "--accent-foreground", "Por variante"],
  ["Focus", "Por estado", "Por estado", "--ring"],
  ["Disabled", "Por estado", "Por estado", "opacity-50"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[720px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function ToggleSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tamaños y espaciado</h3><Table columns={["Tamaño", "Alto", "Ancho mín.", "Padding X", "Gap", "Radio", "Icono"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Estados y colores</h3><Table columns={["Estado", "Fondo", "Texto", "Borde · tratamiento"]} rows={styles} /></section></div>
}
