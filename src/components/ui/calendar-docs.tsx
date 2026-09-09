"use client"

import { CalendarExample } from "./calendar-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children, wide = false }: { title: string; value: string; children: React.ReactNode; wide?: boolean }) {
  return <article className={`overflow-hidden rounded-lg border border-border bg-card ${wide ? "md:col-span-2" : ""}`}><div className="sb-unstyled calendar-docs-preview flex min-h-96 items-center justify-center overflow-x-auto bg-background p-3">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
}

export function CalendarModes() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Single" value="mode=single"><CalendarExample /></Card><Card title="Multiple" value="mode=multiple"><CalendarExample mode="multiple" /></Card><Card title="Range · 2 months" value="mode=range" wide><CalendarExample mode="range" numberOfMonths={2} /></Card></div>
}

export function CalendarHeaders() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Month label" value="captionLayout=label"><CalendarExample /></Card><Card title="Month and year selectors" value="captionLayout=dropdown"><CalendarExample captionLayout="dropdown" /></Card></div>
}

export function CalendarCompositions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Availability" value="modifiers + legend"><CalendarExample composition="availability" /></Card><Card title="Availability range" value="mode=range" wide><CalendarExample composition="availability" mode="range" /></Card><Card title="Booked dates" value="disabled + modifiers"><CalendarExample bookedDates /></Card><Card title="Week numbers" value="showWeekNumber"><CalendarExample showWeekNumber /></Card><Card title="Date and time" value="Calendar + InputGroup"><CalendarExample composition="time" /></Card><Card title="Presets" value="Calendar + Button"><CalendarExample composition="presets" /></Card></div>
}

const api = [
  ["Selection", "mode", "single | multiple | range", "react-day-picker"],
  ["Header", "captionLayout", "label | dropdown | dropdown-months | dropdown-years", "react-day-picker"],
  ["Two-month header", "captionLayout", "label", "Patrón oficial shadcn/ui"],
  ["Months", "numberOfMonths", "1 | 2", "Single / multiple"],
  ["Range months", "mode=range", "2", "Contrato de presentación"],
  ["Outside days", "showOutsideDays", "boolean", "Default: true"],
  ["Week number", "showWeekNumber", "boolean", "react-day-picker"],
  ["Fixed weeks", "fixedWeeks", "boolean", "react-day-picker"],
  ["Preset weeks", "composition=presets", "fixedWeeks=true", "Patrón oficial shadcn/ui"],
  ["Custom states", "modifiers / modifiersClassNames", "Matcher records", "react-day-picker"],
] as const
const geometry = [
  ["Calendar", "p-2", "8px", "Oficial shadcn/ui"],
  ["Cell", "--cell-size: spacing(7)", "28px", "Oficial shadcn/ui / Figma"],
  ["Day gap · default", "gap-0", "0px", "Oficial shadcn/ui"],
  ["Day gap · availability", "classNames: gap-1", "4px", "Figma / react-day-picker"],
  ["Range connector · availability", "range_start / range_middle", "4px", "Cubre el gap sin alterar la celda"],
  ["Weekly range corners", "first / last rounded", "--cell-radius", "Cierra cada segmento semanal"],
  ["Availability legend", "text-xs / leading-4 / py-2.5", "12px / 16px / 10px", "Token caption"],
  ["Cell radius", "--cell-radius: radius-md", "calc(var(--radius) × .8)", "Token"],
  ["Month gap", "gap-4", "16px", "Oficial shadcn/ui"],
  ["Week gap", "mt-2", "8px", "Oficial shadcn/ui"],
] as const
const styles = [
  ["Selected", "bg-primary / text-primary-foreground", "--primary / --primary-foreground"],
  ["Range", "bg-muted", "--muted"],
  ["Today", "bg-muted / text-foreground", "--muted / --foreground"],
  ["Outside", "[&>button]:text-muted-foreground", "--muted-foreground"],
  ["Disabled", "opacity-50", "--muted-foreground"],
  ["Low availability", "modifier: low", "--success-light / --success-light-border / --success-light-foreground"],
  ["Medium availability", "modifier: medium", "--warning-light / --warning-light-border / --warning-light-foreground"],
  ["High availability", "modifier: high", "--error-light / --error-light-border / --error-light-foreground"],
  ["Focus", "ring-ring/50", "--ring"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[760px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function CalendarSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">API pública</h3><Table columns={["Capacidad", "Propiedad", "Valores", "Origen"]} rows={api} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Tamaño y espaciado</h3><Table columns={["Parte", "Tailwind", "Valor", "Origen"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Estados y tokens</h3><Table columns={["Estado", "Tailwind", "Variables"]} rows={styles} /></section></div>
}
