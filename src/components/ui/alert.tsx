import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "group/alert relative grid min-h-20 w-[448px] max-w-full gap-y-0.5 rounded-[10px] bg-card px-[11px] py-[9px] text-left font-sans text-[14px] leading-5 outline -outline-offset-1 outline-border has-data-[slot=alert-action]:pr-[105px] has-[>svg]:grid-cols-[auto_minmax(0,1fr)] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:mt-0.5 *:[svg]:size-4 *:[svg]:shrink-0 *:[svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "min-w-0 font-medium leading-5 group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      style={{ fontFamily: "var(--brand-font-sans)", fontSize: 14, fontWeight: "var(--font-weight-medium)", letterSpacing: 0, lineHeight: "20px", ...style }}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  style,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "min-w-0 text-[14px] leading-5 text-muted-foreground group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className
      )}
      style={{ fontFamily: "var(--brand-font-sans)", fontSize: 14, fontWeight: 400, letterSpacing: 0, lineHeight: "20px", ...style }}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-[9px] right-[11px]", className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
