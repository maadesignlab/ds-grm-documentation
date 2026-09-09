"use client"

import { cn } from "@/lib/utils"

export function DocsCode({ children, className }: { children: string; className?: string }) {
  return <code className={cn("inline-flex min-h-6 max-w-full items-center rounded bg-muted px-1.5 py-1 font-mono text-(length:--docs-code-font-size) leading-none text-foreground", className)}>{children}</code>
}

export function DocsCard({ title, value, children, className, previewClassName }: { title: string; value: string; children: React.ReactNode; className?: string; previewClassName?: string }) {
  return <article className={cn("overflow-hidden rounded-lg border border-border bg-card", className)}><div className={cn("sb-unstyled flex min-h-40 items-center justify-center bg-background p-6", previewClassName)}>{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-sm leading-5 text-card-foreground">{title}</strong><DocsCode>{value}</DocsCode></div></article>
}

type DocsTableProps = {
  columns: readonly string[]
  rows: readonly (readonly string[])[]
  minWidthClassName?: string
  codeWhen?: (value: string, rowIndex: number, columnIndex: number) => boolean
}

function DocsTableContent({ columns, rows, minWidthClassName = "min-w-[720px]", codeWhen }: DocsTableProps) {
  return <table className={cn("w-full table-fixed border-collapse", minWidthClassName)}><thead><tr className="bg-muted">{columns.map(column => <th key={column} className="border-0 border-b border-border px-4 py-(--docs-table-header-padding-block) text-left align-middle text-(length:--docs-table-header-font-size) leading-(--docs-table-line-height) font-semibold tracking-(--docs-table-letter-spacing) text-muted-foreground uppercase">{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`} className="even:bg-muted/30 last:[&>td]:border-b-0">{row.map((value, cell) => <td key={`${row[0]}-${cell}`} className="h-13 border-0 border-b border-border px-4 py-2.5 align-middle text-xs leading-(--docs-table-line-height) text-foreground">{(codeWhen?.(value, index, cell) ?? (cell === 0 || value.startsWith("--"))) ? <DocsCode>{value}</DocsCode> : value}</td>)}</tr>)}</tbody></table>
}

export function DocsTable(props: DocsTableProps) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><DocsTableContent {...props} /></div>
}

export function DocsSpecificationTable({ title, description, ...tableProps }: DocsTableProps & { title: string; description: string }) {
  return <section className="not-prose overflow-hidden rounded-lg border border-border bg-card"><header className="flex flex-col gap-1 border-b border-border px-5 py-4"><h3 className="m-0 text-sm leading-5 font-medium text-card-foreground">{title}</h3><p className="m-0 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">{description}</p></header><div className="overflow-x-auto"><DocsTableContent {...tableProps} /></div></section>
}

export function DocsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section><h3 className="mb-3 text-sm leading-5 font-medium text-foreground">{title}</h3>{children}</section>
}

export const SelectableCode = DocsCode
export const SelectableCard = DocsCard
export const SelectableTable = DocsTable
