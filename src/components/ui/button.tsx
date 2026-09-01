import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-[var(--primary-hover)] active:bg-[var(--primary-active)]",
        outline:
          "border-border bg-transparent text-foreground hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]",
        secondary:
          "border-border bg-secondary text-secondary-foreground shadow-xs hover:bg-[var(--secondary-hover)] active:bg-[var(--secondary-active)]",
        "brand-neutral":
          "border-border bg-background text-foreground shadow-xs hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]",
        ghost:
          "bg-transparent text-foreground hover:bg-[var(--background-hover)] active:bg-[var(--background-active)]",
        destructive:
          "border-[var(--destructive-light-border)] bg-[var(--destructive-light)] text-[var(--destructive-light-foreground)] shadow-xs hover:bg-[var(--destructive-light-hover)] active:bg-[var(--destructive-light-active)] focus-visible:ring-destructive/20",
        success:
          "border-[var(--success-light-border)] bg-[var(--success-light)] text-[var(--success-light-foreground)] shadow-xs hover:bg-[var(--success-light-hover)] active:bg-[var(--success-light-active)]",
        warning:
          "border-[var(--warning-light-border)] bg-[var(--warning-light)] text-[var(--warning-light-foreground)] shadow-xs hover:bg-[var(--warning-light-hover)] active:bg-[var(--warning-light-active)]",
        link: "bg-transparent text-foreground hover:underline",
      },
      size: {
        default:
          "h-8 gap-3 px-3",
        xs: "h-6 gap-3 px-3 text-xs",
        sm: "h-7 gap-3 px-3 text-[0.8rem]",
        lg: "h-9 gap-3 px-3",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  if (
    asChild &&
    (React.Children.count(children) !== 1 || !React.isValidElement(children))
  ) {
    return (
      <button
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
