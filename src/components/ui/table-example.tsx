"use client"

import * as React from "react"
import { ChevronRight, ChevronsUpDown } from "lucide-react"

import { Checkbox } from "./checkbox"
import { Switch } from "./switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"

export type TableExampleProps = {
  borderStyle?: "normal" | "rounded"
  leadingColumn?: "none" | "checkbox" | "switch" | "chevron"
  striped?: boolean
  expanded?: boolean
  rows?: number
}

const data = [
  { name: "María González", email: "maria@reinamadre.mx", status: "Activo", appointment: "12 sep 2026" },
  { name: "Laura Sánchez", email: "laura@reinamadre.mx", status: "Pendiente", appointment: "14 sep 2026" },
  { name: "Ana Martínez", email: "ana@reinamadre.mx", status: "Activo", appointment: "18 sep 2026" },
  { name: "Sofía Ramírez", email: "sofia@reinamadre.mx", status: "Inactivo", appointment: "21 sep 2026" },
]

function SortLabel({ children }: { children: React.ReactNode }) {
  return <span className="flex min-w-0 items-center gap-2.5"><span className="truncate">{children}</span><ChevronsUpDown aria-hidden className="size-3 shrink-0" /></span>
}

export function TableExample({ borderStyle = "normal", leadingColumn = "none", striped = false, expanded = false, rows = 4 }: TableExampleProps) {
  const [expandedRow, setExpandedRow] = React.useState(expanded ? 0 : -1)
  const hasLeading = leadingColumn !== "none"

  return (
    <Table borderStyle={borderStyle} className="min-w-[720px]">
      <TableHeader>
        <TableRow>
          {hasLeading && <TableHead className={leadingColumn === "switch" ? "w-[52px]" : leadingColumn === "checkbox" ? "w-9" : "w-[34px]"}><span className="sr-only">Control</span></TableHead>}
          <TableHead><SortLabel>Paciente</SortLabel></TableHead>
          <TableHead><SortLabel>Correo</SortLabel></TableHead>
          <TableHead><SortLabel>Estado</SortLabel></TableHead>
          <TableHead><SortLabel>Próxima cita</SortLabel></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody striped={striped}>
        {data.slice(0, rows).map((item, index) => {
          const isExpanded = expandedRow === index
          return (
            <React.Fragment key={item.email}>
              <TableRow aria-expanded={leadingColumn === "chevron" ? isExpanded : undefined} className={leadingColumn === "chevron" ? "h-12" : undefined}>
                {leadingColumn === "checkbox" && <TableCell className="w-9"><Checkbox aria-label={`Seleccionar ${item.name}`} /></TableCell>}
                {leadingColumn === "switch" && <TableCell className="w-[52px]"><Switch aria-label={`Activar ${item.name}`} /></TableCell>}
                {leadingColumn === "chevron" && <TableCell className="w-[34px]"><button type="button" aria-label={`${isExpanded ? "Colapsar" : "Expandir"} ${item.name}`} aria-expanded={isExpanded} onClick={() => setExpandedRow(isExpanded ? -1 : index)} className="flex size-3.5 items-center justify-center text-foreground"><ChevronRight aria-hidden className={`size-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} /></button></TableCell>}
                <TableCell className="font-medium!">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.appointment}</TableCell>
              </TableRow>
              {leadingColumn === "chevron" && isExpanded && <TableRow><TableCell colSpan={5} className="h-16 whitespace-normal bg-muted/20">Detalle expandido de {item.name}. Esta región ocupa todo el ancho disponible de la tabla.</TableCell></TableRow>}
            </React.Fragment>
          )
        })}
      </TableBody>
    </Table>
  )
}
