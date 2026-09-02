import * as React from "react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Breadcrumb({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      style={{ fontFamily: "var(--brand-font-sans)" }}
      className={cn(className)}
      {...props}
    />
  )
}

function BreadcrumbList({ className, style, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "!m-0 flex !list-none flex-wrap items-center gap-1.5 !p-0 !font-sans !text-sm !leading-5 wrap-break-word !text-muted-foreground",
        className
      )}
      style={style}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, style, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("!m-0 inline-flex min-h-5 items-center gap-1 !p-0 !leading-5", className)}
      style={style}
      {...props}
    />
  )
}

function BreadcrumbLink({
  asChild,
  className,
  style,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "a"

  return (
    <Comp
      data-slot="breadcrumb-link"
      style={style}
      className={cn("!font-sans !text-sm !leading-5 !font-normal !text-muted-foreground !no-underline transition-colors hover:!text-foreground focus-visible:!text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50", className)}
      {...props}
    />
  )
}

function BreadcrumbPage({ className, style, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("!font-sans !text-sm !leading-5 !font-normal !text-foreground", className)}
      style={style}
      {...props}
    />
  )
}

function BreadcrumbSeparator({
  children,
  className,
  style,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("!m-0 flex size-3.5 shrink-0 items-center justify-center !p-0 !leading-none !text-muted-foreground [&>svg]:block [&>svg]:size-3.5", className)}
      style={style}
      {...props}
    >
      {children ?? (
        <ChevronRightIcon />
      )}
    </li>
  )
}

function BreadcrumbEllipsis({
  className,
  style,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-4 items-center justify-center !text-muted-foreground [&>svg]:size-4",
        className
      )}
      style={style}
      {...props}
    >
      <MoreHorizontalIcon
      />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
