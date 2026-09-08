"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tableContainer = cva("relative w-full overflow-x-auto shadow-xs", {
  variants: {
    borderStyle: {
      normal: "border border-border",
      rounded: "border border-border rounded-lg",
    },
  },
  defaultVariants: {
    borderStyle: "normal",
  },
})

function Table({ className, borderStyle = "normal", ...props }: React.ComponentProps<"table"> & { borderStyle?: "normal" | "rounded" }) {
  return (
    <div
      data-slot="table-container"
      data-border-style={borderStyle}
      className={cn(tableContainer({ borderStyle }))}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom border-collapse font-sans text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("sticky top-0 z-10 bg-muted/40 [&_tr]:border-b [&_tr]:bg-transparent [&_tr:hover]:bg-transparent", className)}
      {...props}
    />
  )
}

function TableBody({
  className,
  striped = false,
  stripedRows = "odd",
  ...props
}: React.ComponentProps<"tbody"> & { striped?: boolean; stripedRows?: "odd" | "even" }) {
  return (
    <tbody
      data-slot="table-body"
      data-striped={striped || undefined}
      data-striped-rows={striped ? stripedRows : undefined}
      className={cn(
        "[&_tr:last-child]:border-0 data-[striped=true]:data-[striped-rows=odd]:[&_tr:nth-child(odd)]:bg-muted/5 data-[striped=true]:data-[striped-rows=even]:[&_tr:nth-child(even)]:bg-muted/5",
        className
      )}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border bg-card transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-9 px-2.5 py-0 text-left align-middle text-xs leading-4 font-semibold tracking-normal whitespace-nowrap text-muted-foreground uppercase [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableHeaderCellContent({
  children,
  icon,
  className,
  ...props
}: React.ComponentProps<"span"> & { icon?: React.ReactNode }) {
  return (
    <span
      data-slot="table-header-cell-content"
      className={cn("flex w-full min-w-0 items-center gap-2.5 text-left", className)}
      {...props}
    >
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {icon ? <span data-slot="table-header-cell-icon" className="flex size-3 shrink-0 items-center justify-center [&_svg]:size-3">{icon}</span> : null}
    </span>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "h-[49px] px-2.5 py-2 align-middle text-sm leading-5 font-normal tracking-normal whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableHeaderCellContent,
  TableRow,
  TableCell,
  TableCaption,
}
