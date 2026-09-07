"use client"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

export type PaginationExampleProps = {
  composition?: "default" | "page-size"
  pageCount?: 3 | 4 | 5
  currentPage?: number
  showPrevious?: boolean
  showNext?: boolean
  showLeftEllipsis?: boolean
  showRightEllipsis?: boolean
  pageSize?: "10" | "20" | "50"
}

export const paginationPlaygroundArgs = {
  composition: "default",
  pageCount: 3,
  currentPage: 1,
  showPrevious: true,
  showNext: true,
  showLeftEllipsis: true,
  showRightEllipsis: true,
  pageSize: "10",
} as const satisfies PaginationExampleProps

export const paginationExamplePresets = {
  playground: paginationPlaygroundArgs,
  default: { ...paginationPlaygroundArgs },
  pageSize: { ...paginationPlaygroundArgs, composition: "page-size" },
  threeItems: { ...paginationPlaygroundArgs, pageCount: 3 },
  fourItems: { ...paginationPlaygroundArgs, pageCount: 4 },
  fiveItems: { ...paginationPlaygroundArgs, pageCount: 5 },
  firstActive: { ...paginationPlaygroundArgs, currentPage: 1 },
  middleActive: { ...paginationPlaygroundArgs, currentPage: 2 },
  lastActive: { ...paginationPlaygroundArgs, currentPage: 3 },
  noEllipses: { ...paginationPlaygroundArgs, showLeftEllipsis: false, showRightEllipsis: false },
  noNavigation: { ...paginationPlaygroundArgs, showPrevious: false, showNext: false },
} as const satisfies Record<string, PaginationExampleProps>

function stopNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
}

export function PaginationExample({
  composition = "default",
  pageCount = 3,
  currentPage = 1,
  showPrevious = true,
  showNext = true,
  showLeftEllipsis = true,
  showRightEllipsis = true,
  pageSize = "10",
}: PaginationExampleProps) {
  const activePage = Math.min(pageCount, Math.max(1, currentPage))
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  if (composition === "page-size") {
    return (
      <Pagination className="max-w-[414px] justify-between gap-4">
        <div className="flex items-center gap-2 whitespace-nowrap text-sm font-medium leading-5 text-foreground">
          <span>Filas por página</span>
          <Select defaultValue={pageSize} key={pageSize}>
            <SelectTrigger className="w-20" aria-label="Filas por página">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <PaginationContent>
          {showPrevious ? <PaginationItem><PaginationPrevious href="#" text="Anterior" onClick={stopNavigation} /></PaginationItem> : null}
          {showNext ? <PaginationItem><PaginationNext href="#" text="Siguiente" onClick={stopNavigation} /></PaginationItem> : null}
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <Pagination className="max-w-fit">
      <PaginationContent>
        {showPrevious ? <PaginationItem><PaginationPrevious href="#" text="Anterior" onClick={stopNavigation} aria-disabled={activePage === 1} tabIndex={activePage === 1 ? -1 : undefined} className={activePage === 1 ? "pointer-events-none opacity-50" : undefined} /></PaginationItem> : null}
        {showLeftEllipsis ? <PaginationItem><PaginationEllipsis /></PaginationItem> : null}
        {pages.map(page => (
          <PaginationItem key={page}>
            <PaginationLink href="#" isActive={page === activePage} onClick={stopNavigation} aria-label={`Página ${page}`}>{page}</PaginationLink>
          </PaginationItem>
        ))}
        {showRightEllipsis ? <PaginationItem><PaginationEllipsis /></PaginationItem> : null}
        {showNext ? <PaginationItem><PaginationNext href="#" text="Siguiente" onClick={stopNavigation} aria-disabled={activePage === pageCount} tabIndex={activePage === pageCount ? -1 : undefined} className={activePage === pageCount ? "pointer-events-none opacity-50" : undefined} /></PaginationItem> : null}
      </PaginationContent>
    </Pagination>
  )
}
