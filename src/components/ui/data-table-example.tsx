"use client"

import * as React from "react"
import { createColumnHelper } from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PencilIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePagination,
  DataTableViewOptions,
  type DataTableInstance,
} from "@/components/ui/data-table"
import { dataTableFeatures } from "@/components/ui/data-table-features"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TableCellAvatar, TableCellBulkOptions, TableCellStatus } from "@/components/ui/table-cell-content"

type Patient = {
  id: string
  name: string
  email: string
  status: "Activo" | "Pendiente" | "Inactivo"
  appointment: string
}

const patients: Patient[] = [
  { id: "RM-1842", name: "Ana Martínez", email: "ana.martinez@email.com", status: "Activo", appointment: "12 sep 2026" },
  { id: "RM-1839", name: "Carolina López", email: "carolina.lopez@email.com", status: "Pendiente", appointment: "14 sep 2026" },
  { id: "RM-1831", name: "Diana Torres", email: "diana.torres@email.com", status: "Activo", appointment: "18 sep 2026" },
  { id: "RM-1827", name: "Laura Gómez", email: "laura.gomez@email.com", status: "Inactivo", appointment: "21 sep 2026" },
  { id: "RM-1814", name: "María Rodríguez", email: "maria.rodriguez@email.com", status: "Activo", appointment: "23 sep 2026" },
  { id: "RM-1806", name: "Natalia Vega", email: "natalia.vega@email.com", status: "Pendiente", appointment: "25 sep 2026" },
  { id: "RM-1798", name: "Paola Sánchez", email: "paola.sanchez@email.com", status: "Activo", appointment: "28 sep 2026" },
  { id: "RM-1784", name: "Sofía Ramírez", email: "sofia.ramirez@email.com", status: "Inactivo", appointment: "30 sep 2026" },
]

const helper = createColumnHelper<typeof dataTableFeatures, Patient>()

type DataTablePattern = "complete" | "checkbox" | "switch" | "identifier" | "expandable"
type DataTableRowActions = "none" | "dropdown" | "one" | "two" | "three"

function RowActions({ item, type }: { item: Patient; type: DataTableRowActions }) {
  if (type === "none") return null
  if (type === "dropdown") return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" aria-label={`Acciones para ${item.name}`}><MoreHorizontalIcon /></Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Ver detalle</DropdownMenuItem>
      <DropdownMenuItem>Editar paciente</DropdownMenuItem>
      <DropdownMenuItem variant="destructive">Eliminar paciente</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  const amount = type === "one" ? 1 : type === "two" ? 2 : 3
  return <TableCellBulkOptions>
    <Button variant="ghost" size="icon" aria-label={`Ver ${item.name}`}><EyeIcon /></Button>
    {amount >= 2 ? <Button variant="ghost" size="icon" aria-label={`Editar ${item.name}`}><PencilIcon /></Button> : null}
    {amount >= 3 ? <Button variant="ghost" size="icon" aria-label={`Eliminar ${item.name}`}><Trash2Icon /></Button> : null}
  </TableCellBulkOptions>
}

function createColumns(pattern: DataTablePattern, rowActions: DataTableRowActions, activeRows: Record<string, boolean>, onActiveChange: (id: string, checked: boolean) => void) {
  const leading = pattern === "checkbox" || pattern === "complete" ? helper.display({
    id: "select",
    enableHiding: false,
    enableSorting: false,
    header: ({ table }) => <Checkbox aria-label="Seleccionar página" checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={value => table.toggleAllPageRowsSelected(Boolean(value))} />,
    cell: ({ row }) => <Checkbox aria-label={`Seleccionar ${row.original.name}`} checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(Boolean(value))} />,
  }) : pattern === "switch" ? helper.display({
    id: "active",
    enableHiding: false,
    enableSorting: false,
    header: () => <span className="sr-only">Activación</span>,
    cell: ({ row }) => <Switch aria-label={`Activar ${row.original.name}`} checked={activeRows[row.original.id] !== false} onCheckedChange={checked => onActiveChange(row.original.id, checked)} />,
  }) : pattern === "identifier" ? helper.accessor("id", {
    id: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => <span className="font-mono text-sm">{row.original.id}</span>,
  }) : helper.display({
    id: "expand",
    enableHiding: false,
    enableSorting: false,
    header: () => <span className="sr-only">Detalle</span>,
    cell: ({ row }) => <Button variant="ghost" size="icon-sm" aria-label={`${row.getIsExpanded() ? "Colapsar" : "Expandir"} ${row.original.name}`} aria-expanded={row.getIsExpanded()} onClick={row.getToggleExpandedHandler()}><ChevronRightIcon className={row.getIsExpanded() ? "rotate-90 transition-transform" : "transition-transform"} /></Button>,
  })

  return helper.columns([
  leading,
  helper.accessor("name", {
    id: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Paciente" />,
    cell: ({ row }) => <TableCellAvatar className="min-w-48" avatarSrc="/avatar/profile.png" avatarFallback={row.original.name.split(" ").map(part => part[0]).slice(0, 2).join("")} layout="supporting-compact" primaryText={row.original.name} supportingText="Paciente GRM" />,
  }),
  helper.accessor("email", {
    id: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Correo" />,
  }),
  helper.accessor("status", {
    id: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Estado" />,
    cell: ({ row }) => {
      const status = row.original.status
      return <TableCellStatus label={status} status={status === "Activo" ? "success" : status === "Pendiente" ? "warning" : "destructive"} />
    },
  }),
  helper.accessor("appointment", {
    id: "appointment",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Próxima cita" />,
  }),
  helper.display({
    id: "actions",
    enableHiding: false,
    enableSorting: false,
    header: "",
    cell: ({ row }) => <RowActions item={row.original} type={rowActions} />,
  }),
  ])
}

export type DataTableExampleProps = {
  toolbar?: "full" | "search" | "none"
  toolbarLayout?: "attached" | "separated"
  pagination?: boolean
  paginationLayout?: "attached" | "separated"
  pattern?: DataTablePattern
  rowActions?: DataTableRowActions
  striped?: boolean
  stripedRows?: "odd" | "even"
  pageSize?: 4 | 5 | 8
  status?: "ready" | "loading" | "empty" | "error"
}

export const dataTableExamplePresets = {
  playground: { toolbar: "full", toolbarLayout: "attached", pagination: true, paginationLayout: "attached", pattern: "complete", rowActions: "dropdown", striped: false, stripedRows: "odd", pageSize: 5, status: "ready" },
  complete: { toolbar: "full", toolbarLayout: "attached", pagination: true, paginationLayout: "attached", pattern: "complete", rowActions: "dropdown", striped: false, stripedRows: "odd", pageSize: 5, status: "ready" },
  separated: { toolbar: "full", toolbarLayout: "separated", pagination: true, paginationLayout: "separated", pattern: "complete", rowActions: "dropdown", striped: false, stripedRows: "odd", pageSize: 5, status: "ready" },
  checkbox: { toolbar: "none", toolbarLayout: "attached", pagination: false, paginationLayout: "attached", pattern: "checkbox", rowActions: "three", striped: false, stripedRows: "odd", pageSize: 5, status: "ready" },
  switch: { toolbar: "none", toolbarLayout: "attached", pagination: false, paginationLayout: "attached", pattern: "switch", rowActions: "two", striped: true, stripedRows: "odd", pageSize: 5, status: "ready" },
  identifier: { toolbar: "none", toolbarLayout: "attached", pagination: false, paginationLayout: "attached", pattern: "identifier", rowActions: "one", striped: false, stripedRows: "odd", pageSize: 5, status: "ready" },
  expandable: { toolbar: "none", toolbarLayout: "attached", pagination: false, paginationLayout: "attached", pattern: "expandable", rowActions: "dropdown", striped: false, stripedRows: "odd", pageSize: 5, status: "ready" },
} satisfies Record<string, Required<DataTableExampleProps>>

function DataTableToolbar({ table, mode }: { table: DataTableInstance<Patient>; mode: "full" | "search" }) {
  const [activeOnly, setActiveOnly] = React.useState(false)

  React.useEffect(() => {
    table.getColumn("status")?.setFilterValue(activeOnly ? "Activo" : undefined)
  }, [activeOnly, table])

  return (
    <div className="flex w-full min-w-0 items-center gap-2.5">
      <InputGroup className="h-9 min-w-44 flex-1">
        <InputGroupAddon><SearchIcon /></InputGroupAddon>
        <InputGroupInput
          aria-label="Buscar pacientes"
          className="h-full"
          placeholder="Buscar paciente"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={event => table.getColumn("name")?.setFilterValue(event.target.value)}
        />
      </InputGroup>

      {mode === "full" ? <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg" className="shrink-0 font-sans text-sm leading-5">Estado <ChevronDownIcon /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => table.getColumn("status")?.setFilterValue(undefined)}>Todos</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => table.getColumn("status")?.setFilterValue("Activo")}>Activos</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => table.getColumn("status")?.setFilterValue("Pendiente")}>Pendientes</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => table.getColumn("status")?.setFilterValue("Inactivo")}>Inactivos</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DataTableViewOptions table={table} />
        <Select value={String(table.state.pagination.pageSize)} onValueChange={value => table.setPageSize(Number(value))}>
          <SelectTrigger aria-label="Filas por página" size="lg" className="w-[180px] shrink-0 font-sans text-sm leading-5"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="4">4 filas por página</SelectItem>
            <SelectItem value="5">5 filas por página</SelectItem>
            <SelectItem value="8">8 filas por página</SelectItem>
          </SelectContent>
        </Select>
        <label className="flex h-9 shrink-0 items-center gap-2 rounded-lg border border-border px-2.5 font-sans text-sm leading-5">
          <Switch checked={activeOnly} onCheckedChange={setActiveOnly} /> Solo activos
        </label>
      </> : null}
    </div>
  )
}

export function DataTableExample({
  toolbar = "full",
  toolbarLayout = "attached",
  pagination = true,
  paginationLayout = "attached",
  pattern = "complete",
  rowActions = "dropdown",
  striped = false,
  stripedRows = "odd",
  pageSize = 5,
  status = "ready",
}: DataTableExampleProps) {
  const [activeRows, setActiveRows] = React.useState<Record<string, boolean>>({})
  const onActiveChange = React.useCallback((id: string, checked: boolean) => {
    setActiveRows(current => ({ ...current, [id]: checked }))
  }, [])
  const visibleColumns = React.useMemo(() => createColumns(pattern, rowActions, activeRows, onActiveChange), [activeRows, onActiveChange, pattern, rowActions])

  return (
    <DataTable
      columns={visibleColumns}
      data={status === "empty" ? [] : patients}
      loading={status === "loading"}
      error={status === "error" ? "No fue posible cargar los pacientes." : undefined}
      pageSize={pageSize}
      striped={striped}
      stripedRows={stripedRows}
      getRowClassName={pattern === "switch" ? row => activeRows[row.original.id] === false ? "opacity-30" : undefined : undefined}
      renderSubComponent={pattern === "expandable" ? row => <div><p className="text-sm font-medium">Detalle de {row.original.name}</p><p className="mt-1 text-sm text-muted-foreground">{row.original.email} · Próxima cita: {row.original.appointment}</p></div> : undefined}
      tableOptions={{ getRowId: row => row.id }}
      toolbar={toolbar === "none" ? undefined : table => <DataTableToolbar table={table} mode={toolbar} />}
      toolbarLayout={toolbarLayout}
      footer={pagination ? table => <DataTablePagination table={table} /> : undefined}
      footerLayout={paginationLayout}
    />
  )
}
