import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden rounded-full font-sans font-medium tracking-normal whitespace-nowrap transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "",
        "brand-neutral": "",
        transparent: "",
        success: "",
        warning: "",
        error: "",
        destructive: "",
        info: "",
      },
      appearance: {
        solid: "",
        outline: "",
      },
      size: {
        xl: "gap-1 px-[11px] py-[5px] text-[14px] leading-[20px] [&_svg]:size-3.5",
        lg: "gap-1 px-[9px] py-[3px] text-[12px] leading-[16px] [&_svg]:size-3",
        md: "gap-1 px-[9px] py-[3px] text-[10px] leading-[15px] [&_svg]:size-3",
        sm: "gap-1 px-[7px] py-px text-[10px] leading-[15px] [&_svg]:size-2.5",
      },
    },
    compoundVariants: [
      { variant: "primary", appearance: "solid", className: "bg-primary text-primary-foreground" },
      { variant: "primary", appearance: "outline", className: "bg-[color-mix(in_srgb,var(--primary)_5%,transparent)] text-[var(--primary-default-foreground)] [box-shadow:inset_0_0_0_1px_var(--primary-light-border)]" },
      { variant: "secondary", appearance: "solid", className: "bg-secondary text-secondary-foreground" },
      { variant: "secondary", appearance: "outline", className: "bg-[color-mix(in_srgb,var(--secondary-default-border)_10%,transparent)] text-secondary-foreground [box-shadow:inset_0_0_0_1px_var(--secondary-default-border)]" },
      { variant: "brand-neutral", appearance: "solid", className: "bg-background text-foreground" },
      { variant: "brand-neutral", appearance: "outline", className: "bg-background text-foreground [box-shadow:inset_0_0_0_1px_var(--border)]" },
      { variant: "transparent", appearance: "solid", className: "bg-transparent text-foreground" },
      { variant: "transparent", appearance: "outline", className: "bg-transparent text-foreground [box-shadow:inset_0_0_0_1px_var(--border)]" },
      { variant: "success", appearance: "solid", className: "bg-[var(--success)] text-[var(--success-foreground)]" },
      { variant: "success", appearance: "outline", className: "bg-[var(--success-light)] text-[var(--success-light-foreground)] [box-shadow:inset_0_0_0_1px_var(--success-light-border)]" },
      { variant: "warning", appearance: "solid", className: "bg-[var(--warning)] text-[var(--warning-foreground)]" },
      { variant: "warning", appearance: "outline", className: "bg-[var(--warning-light)] text-[var(--warning-light-foreground)] [box-shadow:inset_0_0_0_1px_var(--warning-light-border)]" },
      { variant: "error", appearance: "solid", className: "bg-[var(--error)] text-[var(--error-foreground)]" },
      { variant: "error", appearance: "outline", className: "bg-[var(--error-light)] text-[var(--error-light-foreground)] [box-shadow:inset_0_0_0_1px_var(--error-light-border)]" },
      { variant: "destructive", appearance: "solid", className: "bg-destructive text-[var(--destructive-foreground)]" },
      { variant: "destructive", appearance: "outline", className: "bg-[var(--destructive-light)] text-[var(--destructive-light-foreground)] [box-shadow:inset_0_0_0_1px_var(--destructive-light-border)]" },
      { variant: "info", appearance: "solid", className: "bg-[var(--info)] text-[var(--info-foreground)]" },
      { variant: "info", appearance: "outline", className: "bg-[var(--info-light)] text-[var(--info-light-foreground)] [box-shadow:inset_0_0_0_1px_var(--info-light-border)]" },
    ],
    defaultVariants: {
      variant: "primary",
      appearance: "solid",
      size: "lg",
    },
  }
)

const badgeTypography = {
  xl: { fontSize: 14, lineHeight: "20px" },
  lg: { fontSize: 12, lineHeight: "16px" },
  md: { fontSize: 10, lineHeight: "15px" },
  sm: { fontSize: 10, lineHeight: "15px" },
} as const

function Badge({
  className,
  variant = "primary",
  appearance = "solid",
  size = "lg",
  asChild = false,
  style,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"
  const resolvedSize = size ?? "lg"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-appearance={appearance}
      data-size={resolvedSize}
      className={cn(badgeVariants({ variant, appearance, size: resolvedSize }), className)}
      style={{
        fontFamily: "var(--brand-font-sans)",
        fontWeight: "var(--font-weight-medium)",
        fontSize: badgeTypography[resolvedSize].fontSize,
        lineHeight: badgeTypography[resolvedSize].lineHeight,
        letterSpacing: 0,
        ...style,
      }}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
