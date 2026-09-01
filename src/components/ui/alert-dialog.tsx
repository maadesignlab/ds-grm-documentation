"use client"

import * as React from "react"
import { AlertDialog as AlertDialogPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function AlertDialog({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  status = "default",
  inline = false,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  size?: "default" | "basic" | "sm"
  status?: "default" | "destructive"
  inline?: boolean
}) {
  const resolvedSize = size === "default" ? "basic" : size

  const content = (
    <AlertDialogPrimitive.Content
      data-slot="alert-dialog-content"
      data-size={resolvedSize}
      data-status={status}
      data-inline={inline || undefined}
      className={cn(
        "group/alert-dialog-content z-50 flex min-h-[148px] w-[calc(100vw-32px)] flex-col overflow-hidden rounded-[14px] bg-popover font-sans text-popover-foreground outline -outline-offset-1 outline-border data-[size=basic]:max-w-[384px] data-[size=sm]:max-w-[320px]",
        inline ? "relative inset-auto translate-x-0 translate-y-0" : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 duration-100 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      {...props}
    />
  )

  if (inline) return content

  return <AlertDialogPortal><AlertDialogOverlay />{content}</AlertDialogPortal>
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid flex-1 grid-rows-[auto_1fr] place-items-start gap-y-1.5 p-4 text-left group-data-[size=basic]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-cols-[40px_minmax(0,1fr)] group-data-[size=basic]/alert-dialog-content:has-data-[slot=alert-dialog-media]:gap-x-4 group-data-[size=basic]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr] group-data-[size=sm]/alert-dialog-content:place-items-center group-data-[size=sm]/alert-dialog-content:text-center group-data-[size=sm]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[40px_auto_1fr]",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex min-h-[66px] gap-2.5 bg-muted/50 p-[17px] outline -outline-offset-1 outline-border group-data-[size=basic]/alert-dialog-content:items-start group-data-[size=basic]/alert-dialog-content:justify-end group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 group-data-[size=sm]/alert-dialog-content:[&>*]:w-full",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-lg bg-muted group-data-[status=destructive]/alert-dialog-content:bg-destructive/20 group-data-[status=destructive]/alert-dialog-content:text-destructive group-data-[size=basic]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  style,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "w-full text-base leading-6 font-medium group-data-[size=basic]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      style={{ margin: 0, border: 0, padding: 0, fontFamily: "var(--brand-font-sans)", fontSize: 16, fontWeight: "var(--font-weight-medium)", letterSpacing: 0, lineHeight: "24px", ...style }}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  style,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "w-full text-sm leading-5 text-muted-foreground group-data-[size=basic]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2 *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      style={{ margin: 0, padding: 0, fontFamily: "var(--brand-font-sans)", fontSize: 14, fontWeight: 400, letterSpacing: 0, lineHeight: "20px", ...style }}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Action
        data-slot="alert-dialog-action"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <Button variant={variant} size={size} asChild>
      <AlertDialogPrimitive.Cancel
        data-slot="alert-dialog-cancel"
        className={cn(className)}
        {...props}
      />
    </Button>
  )
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
}
