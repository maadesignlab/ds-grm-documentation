"use client"

import * as React from "react"
import type { Column, ColumnDef, ReactTable, Row, RowData, TableOptions } from "@tanstack/react-table"
import { useTable } from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SlidersHorizontalIcon,
  ChevronsUpDownIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableHeaderCellContent,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { dataTableFeatures, type DataTableFeatures } from "./data-table-features"

type DataTableInstance<TData extends RowData> = ReactTable<DataTableFeatures, TData>

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData, unknown>[]
  data: TData[]
  toolbar?: React.ReactNode | ((table: DataTableInstance<TData>) => React.ReactNode)
  footer?: React.ReactNode | ((table: DataTableInstance<TData>) => React.ReactNode)
  toolbarLayout?: "attached" | "separated"
  footerLayout?: "attached" | "separated"
  emptyMessage?: string
  error?: React.ReactNode
  loading?: boolean
  loadingRows?: number
  pageSize?: number
  renderSubComponent?: (row: Row<DataTableFeatures, TData>) => React.ReactNode
  getRowClassName?: (row: Row<DataTableFeatures, TData>) => string | undefined
  striped?: boolean
  stripedRows?: "odd" | "even"
  className?: string
  tableOptions?: Partial<Omit<TableOptions<DataTableFeatures, TData>, "columns" | "data" | "features">>
}

function resolveSlot<TData extends RowData>(
  slot: React.ReactNode | ((table: DataTableInstance<TData>) => React.ReactNode),
  table: DataTableInstance<TData>
) {
  return typeof slot === "function" ? slot(table) : slot
}

function DataTable<TData extends RowData>({
  columns,
  data,
  toolbar,
  footer,
  toolbarLayout = "attached",
  footerLayout = "attached",
  emptyMessage = "No hay resultados.",
  error,
  loading = false,
  loadingRows = 5,
  pageSize = 5,
  renderSubComponent,
  getRowClassName,
  striped = false,
  stripedRows = "odd",
  className,
  tableOptions,
}: DataTableProps<TData>) {
  const table = useTable({
    features: dataTableFeatures,
    columns,
    data,
    initialState: { pagination: { pageIndex: 0, pageSize } },
    getRowCanExpand: renderSubComponent ? () => true : undefined,
    paginateExpandedRows: false,
    ...tableOptions,
  })

  const visibleColumnCount = table.getVisibleLeafColumns().length

  return (
    <div data-slot="data-table" className={cn("isolate w-full font-sans", className)}>
      {toolbar ? (
        <div
          data-slot="data-table-toolbar"
          data-layout={toolbarLayout}
          className={cn(
            "flex items-center",
            toolbarLayout === "attached"
              ? "relative z-30 -mb-px min-h-[62px] rounded-t-lg border border-border bg-card p-3"
              : "mb-3 min-h-9"
          )}
        >
          {resolveSlot(toolbar, table)}
        </div>
      ) : null}

      <div data-slot="data-table-content" className="relative z-20">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody striped={striped} stripedRows={stripedRows}>
            {loading ? Array.from({ length: loadingRows }, (_, rowIndex) => (
              <TableRow key={`loading-${rowIndex}`} aria-hidden="true">
                {Array.from({ length: Math.max(visibleColumnCount, 1) }, (_, cellIndex) => (
                  <TableCell key={`loading-${rowIndex}-${cellIndex}`}><Skeleton className="h-4 w-full min-w-12" /></TableCell>
                ))}
              </TableRow>
            )) : error ? (
              <TableRow>
                <TableCell colSpan={Math.max(visibleColumnCount, 1)} className="h-24 whitespace-normal text-center text-destructive">
                  {error}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? table.getRowModel().rows.map(row => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() ? "selected" : undefined} className={getRowClassName?.(row)}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}><table.FlexRender cell={cell} /></TableCell>
                  ))}
                </TableRow>
                {renderSubComponent && row.getIsExpanded() ? (
                  <TableRow data-slot="data-table-expanded-row" className="hover:bg-muted/20">
                    <TableCell colSpan={Math.max(visibleColumnCount, 1)} className="h-auto whitespace-normal bg-muted/20 p-4">
                      {renderSubComponent(row)}
                    </TableCell>
                  </TableRow>
                ) : null}
              </React.Fragment>
            )) : (
              <TableRow>
                <TableCell colSpan={Math.max(visibleColumnCount, 1)} className="h-24 text-center text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {footer ? (
        <div
          data-slot="data-table-footer"
          data-layout={footerLayout}
          className={cn(
            "flex items-center",
            footerLayout === "attached"
              ? "relative z-10 -mt-px min-h-14 rounded-b-lg border border-border bg-card p-3"
              : "mt-3 min-h-8"
          )}
        >
          {resolveSlot(footer, table)}
        </div>
      ) : null}
    </div>
  )
}

function DataTableColumnHeader<TData extends RowData, TValue>({
  column,
  title,
  className,
}: {
  column: Column<DataTableFeatures, TData, TValue>
  title: string
  className?: string
}) {
  if (!column.getCanSort()) return <TableHeaderCellContent className={className}>{title}</TableHeaderCellContent>

  const sorted = column.getIsSorted()
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn(
        "h-4 w-full justify-start rounded-none border-0 p-0 text-left text-xs leading-4 font-semibold uppercase text-muted-foreground shadow-none hover:bg-transparent hover:text-muted-foreground active:bg-transparent active:text-muted-foreground",
        className
      )}
      onClick={column.getToggleSortingHandler()}
    >
      <TableHeaderCellContent icon={sorted === "desc" ? <ArrowDownIcon /> : sorted === "asc" ? <ArrowUpIcon /> : <ChevronsUpDownIcon />}>
        {title}
      </TableHeaderCellContent>
    </Button>
  )
}

function DataTableViewOptions<TData extends RowData>({ table }: { table: DataTableInstance<TData> }) {
  const labels: Record<string, string> = {
    name: "Paciente",
    email: "Correo",
    status: "Estado",
    appointment: "Próxima cita",
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="shrink-0 font-sans text-sm leading-5">
          <SlidersHorizontalIcon /> Columnas <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table.getAllColumns().filter(column => column.getCanHide()).map(column => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.getIsVisible()}
            onCheckedChange={value => column.toggleVisibility(Boolean(value))}
          >
            {labels[column.id] ?? column.id}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DataTablePagination<TData extends RowData>({ table }: { table: DataTableInstance<TData> }) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <p className="font-sans text-sm leading-5 text-muted-foreground">
        Página {table.state.pagination.pageIndex + 1} de {Math.max(1, table.getPageCount())}
      </p>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" aria-label="Primera página" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}><ChevronsLeftIcon /></Button>
        <Button variant="outline" size="icon" aria-label="Página anterior" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}><ChevronLeftIcon /></Button>
        <Button variant="outline" size="icon" aria-label="Página siguiente" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}><ChevronRightIcon /></Button>
        <Button variant="outline" size="icon" aria-label="Última página" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}><ChevronsRightIcon /></Button>
      </div>
    </div>
  )
}

export {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  type DataTableInstance,
  type DataTableProps,
}
