import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const attachmentVariants = cva(
  "group/attachment relative flex w-fit min-w-0 shrink-0 rounded-[12px] bg-card font-sans text-card-foreground outline -outline-offset-1 outline-border transition-colors outline-solid focus-within:ring-1 focus-within:ring-ring/50 data-[state=error]:outline-destructive/30 data-[state=idle]:outline-dashed",
  {
    variants: {
      size: {
        default: "gap-2 p-2 text-sm",
        sm: "gap-2.5 p-1.5 text-xs",
        xs: "gap-1.5 rounded-lg p-1 text-xs",
      },
      orientation: {
        horizontal: "min-w-40 items-center",
        vertical: "h-[166px] w-[120px] flex-col items-center gap-2 p-2 data-[state=processing]:h-[164px]",
      },
    },
    compoundVariants: [
      { orientation: "horizontal", size: "default", className: "w-[260px] data-[state=error]:w-[284px]" },
      { orientation: "horizontal", size: "sm", className: "w-[224px] data-[state=error]:w-[248px]" },
      { orientation: "horizontal", size: "xs", className: "w-[172px] data-[state=error]:w-[196px]" },
    ],
  }
)

function Attachment({
  className,
  state = "done",
  size = "default",
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof attachmentVariants> & {
    state?: "idle" | "uploading" | "processing" | "error" | "done"
}) {
  const resolvedSize = orientation === "vertical" ? "default" : size

  return (
    <div
      data-slot="attachment"
      data-state={state}
      data-size={resolvedSize}
      data-orientation={orientation}
      className={cn(attachmentVariants({ size: resolvedSize, orientation }), className)}
      {...props}
    />
  )
}

const attachmentMediaVariants = cva(
  "relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted text-foreground group-data-[size=sm]/attachment:size-8 group-data-[size=xs]/attachment:size-7 group-data-[size=xs]/attachment:rounded-md group-data-[orientation=vertical]/attachment:size-[102px]! group-data-[state=error]/attachment:bg-destructive/10 group-data-[state=error]/attachment:text-destructive [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 group-data-[size=xs]/attachment:[&_svg:not([class*='size-'])]:size-3.5 group-data-[orientation=vertical]/attachment:[&_svg:not([class*='size-'])]:size-6!",
  {
    variants: {
      variant: {
        icon: "",
        image: "bg-gradient-to-b from-primary/15 to-secondary/40 *:[img]:size-full *:[img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "icon",
    },
  }
)

function AttachmentMedia({
  className,
  variant = "icon",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof attachmentMediaVariants>) {
  return (
    <div
      data-slot="attachment-media"
      data-variant={variant}
      className={cn(attachmentMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

function AttachmentContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-content"
      className={cn(
        "flex max-w-full min-w-0 flex-1 flex-col gap-0.5 overflow-hidden whitespace-nowrap group-data-[size=xs]/attachment:gap-0 group-data-[orientation=vertical]/attachment:w-full group-data-[orientation=vertical]/attachment:flex-none group-data-[orientation=vertical]/attachment:px-1",
        className
      )}
      {...props}
    />
  )
}

function AttachmentTitle({
  className,
  style,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-title"
      className={cn(
        "block h-5 max-w-full min-w-0 truncate text-[14px]! font-medium leading-5 group-data-[size=sm]/attachment:h-4 group-data-[size=sm]/attachment:text-xs! group-data-[size=sm]/attachment:leading-4 group-data-[size=xs]/attachment:h-4 group-data-[size=xs]/attachment:text-xs! group-data-[size=xs]/attachment:leading-4",
        className
      )}
      style={{
        fontFamily: "var(--brand-font-sans)",
        fontWeight: "var(--font-weight-medium)",
        letterSpacing: 0,
        ...style,
      }}
      {...props}
    />
  )
}

function AttachmentDescription({
  className,
  style,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="attachment-description"
      className={cn(
        "block h-4 max-w-full min-w-0 truncate text-xs leading-4 text-muted-foreground group-data-[state=error]/attachment:text-destructive",
        className
      )}
      style={{
        fontFamily: "var(--brand-font-sans)",
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: 0,
        ...style,
      }}
      {...props}
    />
  )
}

function AttachmentActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-actions"
      className={cn(
        "relative z-20 flex shrink-0 items-center group-data-[orientation=vertical]/attachment:absolute group-data-[orientation=vertical]/attachment:top-2.5 group-data-[orientation=vertical]/attachment:right-2.5",
        className
      )}
      {...props}
    />
  )
}

function AttachmentAction({
  className,
  variant,
  size = "icon-xs",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="attachment-action"
      variant={variant ?? "ghost"}
      size={size}
      className={cn(className)}
      {...props}
    />
  )
}

function AttachmentTrigger({
  className,
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="attachment-trigger"
      type={asChild ? undefined : (type ?? "button")}
      className={cn("absolute inset-0 z-10 outline-none", className)}
      {...props}
    />
  )
}

function AttachmentGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="attachment-group"
      className={cn(
        "flex min-w-0 scroll-fade-x snap-x snap-mandatory scroll-px-1 scrollbar-none gap-3 overflow-x-auto overscroll-x-contain py-1 *:data-[slot=attachment]:flex-none *:data-[slot=attachment]:snap-start",
        className
      )}
      {...props}
    />
  )
}

export {
  Attachment,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentContent,
  AttachmentTitle,
  AttachmentDescription,
  AttachmentActions,
  AttachmentAction,
  AttachmentTrigger,
}
