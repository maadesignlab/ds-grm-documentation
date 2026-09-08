"use client"

import * as React from "react"
import { ChevronRight, ChevronsUpDown, EyeIcon, PencilIcon, Trash2Icon } from "lucide-react"

import { Button } from "./button"
import { Badge } from "./badge"
import { Checkbox } from "./checkbox"
import { Switch } from "./switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableHeaderCellContent, TableRow } from "./table"
import { TableCellAvatar, TableCellBulkOptions, TableCellCounter, TableCellProgress, TableCellStatus, TableCellText } from "./table-cell-content"

export type TableExampleProps = {
  borderStyle?: "normal" | "rounded"
  leadingColumn?: "none" | "checkbox" | "switch" | "chevron"
  striped?: boolean
  stripedRows?: "odd" | "even"
  expanded?: boolean
  rows?: number
  cellContent?: "text" | "avatar" | "status-label" | "status-badge" | "progress" | "counter" | "bulk-options"
}

export const tableExampleDefaults = {
  borderStyle: "normal",
  leadingColumn: "none",
  striped: false,
  stripedRows: "odd",
  expanded: false,
  rows: 4,
  cellContent: "text",
} satisfies Required<TableExampleProps>

const data = [
  { name: "María González", email: "maria@reinamadre.mx", status: "Activo", appointment: "12 sep 2026", value: "$ 1.250.000" },
  { name: "Laura Sánchez", email: "laura@reinamadre.mx", status: "Pendiente", appointment: "14 sep 2026", value: "$ 980.000" },
  { name: "Ana Martínez", email: "ana@reinamadre.mx", status: "Activo", appointment: "18 sep 2026", value: "$ 2.140.000" },
  { name: "Sofía Ramírez", email: "sofia@reinamadre.mx", status: "Inactivo", appointment: "21 sep 2026", value: "$ 750.000" },
]

function SortLabel({ children }: { children: React.ReactNode }) {
  return <TableHeaderCellContent icon={<ChevronsUpDown aria-hidden />}>{children}</TableHeaderCellContent>
}

function CellContent({ item, index, type }: { item: (typeof data)[number]; index: number; type: NonNullable<TableExampleProps["cellContent"]> }) {
  if (type === "avatar") return <TableCellAvatar avatarSrc="/avatar/profile.png" avatarFallback={item.name.split(" ").map(part => part[0]).slice(0, 2).join("")} layout="supporting-compact" primaryText={item.name} supportingText={item.email} />
  if (type === "status-label") return <TableCellStatus label={item.status} status={item.status === "Activo" ? "success" : item.status === "Pendiente" ? "warning" : "destructive"} />
  if (type === "status-badge") return <Badge variant={item.status === "Activo" ? "success" : item.status === "Pendiente" ? "warning" : "destructive"} appearance="outline" size="xl">{item.status}</Badge>
  if (type === "progress") return <TableCellProgress value={[70, 80, 90, 100][index] ?? 70} />
  if (type === "counter") return <TableCellCounter defaultValue={index + 1} />
  if (type === "bulk-options") return <TableCellBulkOptions><Button variant="ghost" size="icon" aria-label={`Ver ${item.name}`}><EyeIcon /></Button><Button variant="ghost" size="icon" aria-label={`Editar ${item.name}`}><PencilIcon /></Button><Button variant="ghost" size="icon" aria-label={`Eliminar ${item.name}`}><Trash2Icon /></Button></TableCellBulkOptions>
  return <TableCellText text={item.name} amount="double" supportingText={item.email} />
}

export function TableExample({
  borderStyle = tableExampleDefaults.borderStyle,
  leadingColumn = tableExampleDefaults.leadingColumn,
  striped = tableExampleDefaults.striped,
  stripedRows = tableExampleDefaults.stripedRows,
  expanded = tableExampleDefaults.expanded,
  rows = tableExampleDefaults.rows,
  cellContent = tableExampleDefaults.cellContent,
}: TableExampleProps) {
  const [expandedRow, setExpandedRow] = React.useState(expanded ? 0 : -1)
  const [activeRows, setActiveRows] = React.useState<Record<number, boolean>>({})
  const hasLeading = leadingColumn !== "none"

  return (
    <Table borderStyle={borderStyle} className="min-w-[720px]">
      <TableHeader>
        <TableRow>
          {hasLeading && <TableHead className={leadingColumn === "switch" ? "w-[52px]" : leadingColumn === "checkbox" ? "w-9" : "w-[34px]"}><span className="sr-only">Control</span></TableHead>}
          <TableHead><SortLabel>Contenido</SortLabel></TableHead>
          <TableHead><SortLabel>Correo</SortLabel></TableHead>
          <TableHead><SortLabel>Estado</SortLabel></TableHead>
          <TableHead><SortLabel>Próxima cita</SortLabel></TableHead>
          <TableHead className="w-[140px] text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody striped={striped} stripedRows={stripedRows}>
        {data.slice(0, rows).map((item, index) => {
          const isExpanded = expandedRow === index
          return (
            <React.Fragment key={item.email}>
              <TableRow aria-expanded={leadingColumn === "chevron" ? isExpanded : undefined} className={`${leadingColumn === "chevron" ? "h-12" : ""} ${leadingColumn === "switch" && activeRows[index] === false ? "opacity-30" : ""}`}>
                {leadingColumn === "checkbox" && <TableCell className="w-9"><Checkbox aria-label={`Seleccionar ${item.name}`} /></TableCell>}
                {leadingColumn === "switch" && <TableCell className="w-[52px]"><Switch aria-label={`Activar ${item.name}`} checked={activeRows[index] !== false} onCheckedChange={checked => setActiveRows(current => ({ ...current, [index]: checked }))} /></TableCell>}
                {leadingColumn === "chevron" && <TableCell className="w-[34px]"><button type="button" aria-label={`${isExpanded ? "Colapsar" : "Expandir"} ${item.name}`} aria-expanded={isExpanded} onClick={() => setExpandedRow(isExpanded ? -1 : index)} className="flex size-3.5 items-center justify-center text-foreground"><ChevronRight aria-hidden className={`size-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} /></button></TableCell>}
                <TableCell><CellContent item={item} index={index} type={cellContent} /></TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.appointment}</TableCell>
                <TableCell className="text-right"><TableCellText text={item.value} font="mono" /></TableCell>
              </TableRow>
              {leadingColumn === "chevron" && isExpanded && <TableRow><TableCell colSpan={6 + (hasLeading ? 1 : 0)} className="h-16 whitespace-normal bg-muted/20">Detalle expandido de {item.name}. Esta región ocupa todo el ancho disponible de la tabla.</TableCell></TableRow>}
            </React.Fragment>
          )
        })}
      </TableBody>
    </Table>
  )
}
