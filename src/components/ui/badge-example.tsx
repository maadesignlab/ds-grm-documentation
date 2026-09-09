import type { ComponentProps, ReactNode } from "react"
import { ArrowDown, Loader2 } from "lucide-react"

import { Badge } from "./badge"

export type BadgeContent = "none" | "icon" | "spinner"
export type BadgeExampleProps = ComponentProps<typeof Badge> & {
  leftContent?: BadgeContent
  rightContent?: BadgeContent
}

const content = {
  none: null,
  icon: <ArrowDown aria-hidden />,
  spinner: <Loader2 className="animate-spin" aria-hidden />,
} satisfies Record<BadgeContent, ReactNode>

export function BadgeExample({ leftContent = "none", rightContent = "none", children = "Badge", variant = "primary", appearance = "solid", ...props }: BadgeExampleProps) {
  return (
    <Badge {...props} variant={variant} appearance={variant === "transparent" ? "outline" : appearance}>
      {content[leftContent]}
      {children}
      {content[rightContent]}
    </Badge>
  )
}
