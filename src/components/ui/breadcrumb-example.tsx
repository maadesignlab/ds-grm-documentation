"use client"

import { Fragment } from "react"
import { MoreHorizontal } from "lucide-react"

import {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "./breadcrumb"
import { Button } from "./button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu"

export type BreadcrumbExampleProps = {
  levels?: 2 | 3 | 4
  reduction?: "none" | "ellipsis" | "dropdown"
}

const paths = {
  2: ["Pacientes", "María Orozco"],
  3: ["Familias", "Familia López González", "Juan López González"],
  4: ["Ventas", "Venta #345235", "Detalles", "Facturación"],
} as const

export function BreadcrumbExample({ levels = 4, reduction = "none" }: BreadcrumbExampleProps) {
  const path = paths[levels]
  const reduce = levels >= 4 && reduction !== "none"
  const visible = reduce ? [path[0], ...path.slice(2)] : [...path]

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {visible.map((label, index) => {
          const isLast = index === visible.length - 1
          const needsReduction = reduce && index === 1
          return (
            <Fragment key={`${label}-${index}`}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
              {needsReduction && reduction === "ellipsis" ? <BreadcrumbEllipsis /> : needsReduction && reduction === "dropdown" ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-xs" aria-label="Mostrar niveles ocultos"><MoreHorizontal /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>{path[1]}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : isLast ? <BreadcrumbPage>{label}</BreadcrumbPage> : <BreadcrumbLink href="#" onClick={(event) => event.preventDefault()}>{label}</BreadcrumbLink>}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
