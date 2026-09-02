"use client"

import { Bold } from "lucide-react"

import { Toggle } from "./toggle"

export type ToggleExampleProps = {
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  content?: "icon" | "text" | "icon-text"
  pressed?: boolean
  disabled?: boolean
}

export function ToggleExample({
  variant = "default",
  size = "default",
  content = "icon-text",
  pressed = false,
  disabled = false,
}: ToggleExampleProps) {
  const iconOnly = content === "icon"

  return (
    <Toggle
      variant={variant}
      size={size}
      defaultPressed={pressed}
      disabled={disabled}
      aria-label={iconOnly ? "Negrita" : undefined}
    >
      {content !== "text" && <Bold />}
      {content !== "icon" && "Toggle"}
    </Toggle>
  )
}
