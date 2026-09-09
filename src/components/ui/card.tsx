import * as React from "react"

import { cn } from "@/lib/utils"

function Card({
  className,
  size = "default",
  variant = "body",
  spacing,
  style,
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  variant?: "body" | "image"
  spacing?: 12 | 16 | 20 | 24 | 32
}) {
const resolvedSpacing = spacing ?? (size === "sm" ? 12 : 16)
  const spacingClass = {
    12: "[--card-spacing:0.75rem]",
    16: "[--card-spacing:1rem]",
    20: "[--card-spacing:1.25rem]",
    24: "[--card-spacing:1.5rem]",
    32: "[--card-spacing:2rem]",
  }[resolvedSpacing]

  return (
    <div
      data-slot="card"
      data-size={size}
      data-variant={variant}
      data-spacing={resolvedSpacing}
      className={cn(
        "group/card flex w-[calc(100vw-32px)] flex-col gap-(--card-spacing) overflow-hidden rounded-[14px] bg-card pt-(--card-spacing) font-sans text-sm text-card-foreground outline -outline-offset-1 outline-border has-data-[slot=card-footer]:pb-0 data-[size=default]:max-w-96 data-[size=sm]:max-w-80 data-[variant=image]:pt-0 *:[img:first-child]:rounded-t-[14px] *:[img:last-child]:rounded-b-[14px]",
        spacingClass,
        className
      )}
      style={style}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid min-h-[68px] shrink-0 auto-rows-min items-start gap-1 rounded-t-[14px] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "m-0 p-0 font-sans text-base leading-6 font-medium text-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("m-0 p-0 font-sans text-sm leading-5 font-normal text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-(--card-spacing)", className)}
      {...props}
    />
  )
}

function CardFooter({
  className,
  layout = "row",
  ...props
}: React.ComponentProps<"div"> & { layout?: "column" | "row" | "wrap" }) {
  return (
    <div
      data-slot="card-footer"
      data-layout={layout}
      className={cn(
        "flex shrink-0 items-center gap-2.5 rounded-b-[14px] border-t border-border bg-muted/50 p-(--card-spacing) data-[layout=column]:flex-col data-[layout=column]:[&>*]:w-full data-[layout=row]:justify-end data-[layout=wrap]:flex-wrap data-[layout=wrap]:justify-end",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
