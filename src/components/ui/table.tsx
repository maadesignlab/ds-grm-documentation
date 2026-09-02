"use client"

import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const tableContainer = cva("relative w-full overflow-x-auto bg-card shadow-xs", {
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
      className={cn("sticky top-0 z-10 bg-muted/40 [&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, striped = false, ...props }: React.ComponentProps<"tbody"> & { striped?: boolean }) {
  return (
    <tbody
      data-slot="table-body"
      data-striped={striped || undefined}
      className={cn("[&_tr:last-child]:border-0 data-[striped=true]:[&_tr:nth-child(odd)]:bg-muted/40", className)}
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
        "h-9 p-2.5 text-left align-middle font-sans! text-[12px]! leading-4! font-semibold! tracking-normal! whitespace-nowrap text-muted-foreground uppercase [&_*]:font-sans! [&_*]:text-[12px]! [&_*]:leading-4! [&_*]:font-semibold! [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2.5 align-middle font-sans! text-[12px]! leading-4! font-normal! tracking-normal! whitespace-nowrap text-foreground [&_*]:font-sans! [&_*]:text-[12px]! [&_*]:leading-4! [&:has([role=checkbox])]:pr-0",
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
  TableRow,
  TableCell,
  TableCaption,
}
