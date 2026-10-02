import { cn } from "@/lib/utils"

export type ItemAppearance = "default" | "outline" | "muted" | "light"
export type ItemStatus = "neutral" | "success" | "warning" | "error" | "info"

const statusTokens = {
  success: "[--item-bg:var(--success-light)] [--item-border:var(--success-light-border)] [--item-fg:var(--success-light-foreground)]",
  warning: "[--item-bg:var(--warning-light)] [--item-border:var(--warning-light-border)] [--item-fg:var(--warning-light-foreground)]",
  error: "[--item-bg:var(--error-light)] [--item-border:var(--error-light-border)] [--item-fg:var(--error-light-foreground)]",
  info: "[--item-bg:var(--info-light)] [--item-border:var(--info-light-border)] [--item-fg:var(--info-light-foreground)]",
}

/** Figma appearance/status expressed through the public Item className API. */
export function itemAppearanceClasses(appearance: ItemAppearance = "default", status: ItemStatus = "neutral") {
  return cn(
    "text-card-foreground [&_[data-slot=item-title]]:leading-5 [&_[data-slot=item-description]]:leading-5 [&_[data-slot=item-media]]:translate-y-0",
    appearance === "muted" && "bg-muted",
    appearance === "light" && "border-border bg-card",
    status !== "neutral" && [
      statusTokens[status],
      "text-(--item-fg) [&_[data-slot=item-description]]:text-inherit [&_[data-slot=item-media]]:text-inherit",
      (appearance === "light" || appearance === "muted") && "bg-(--item-bg)",
      (appearance === "light" || appearance === "outline") && "border-(--item-border)",
    ],
  )
}

export function itemBaseVariant(appearance: ItemAppearance) {
  return appearance === "light" ? "outline" : appearance
}
