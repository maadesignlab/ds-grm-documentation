"use client"

import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Italic,
  List,
  Strikethrough,
  Underline,
} from "lucide-react"

import { ToggleGroup, ToggleGroupItem } from "./toggle-group"

export type ToggleGroupExampleProps = {
  type?: "single" | "multiple"
  items?: number
  content?: "icon" | "text" | "icon-text"
  singleValue?: string
  multipleValues?: string[]
  variant?: "default" | "outline"
  size?: "sm" | "default" | "lg"
  spacing?: number
  orientation?: "horizontal" | "vertical"
  disabled?: boolean
}

const options = [
  { label: "Negrita", icon: Bold },
  { label: "Cursiva", icon: Italic },
  { label: "Subrayado", icon: Underline },
  { label: "Tachado", icon: Strikethrough },
  { label: "Código", icon: Code },
  { label: "Lista", icon: List },
  { label: "Alinear izquierda", icon: AlignLeft },
  { label: "Centrar", icon: AlignCenter },
  { label: "Alinear derecha", icon: AlignRight },
  { label: "Justificar", icon: AlignJustify },
] as const

function Items({ count, content, disabled }: { count: number; content: "icon" | "text" | "icon-text"; disabled: boolean }) {
  return Array.from({ length: count }, (_, index) => {
    const item = index + 1
    const option = options[index]
    const Icon = option.icon
    return (
      <ToggleGroupItem
        key={item}
        value={`item-${item}`}
        aria-label={content === "icon" ? option.label : undefined}
        disabled={disabled}
      >
        {content !== "text" && <Icon />}
        {content !== "icon" && option.label}
      </ToggleGroupItem>
    )
  })
}

export function ToggleGroupExample({
  type = "single",
  items = 5,
  content = "icon",
  singleValue = "item-3",
  multipleValues = ["item-2", "item-4"],
  variant = "default",
  size = "default",
  spacing = 2,
  orientation = "horizontal",
  disabled = false,
}: ToggleGroupExampleProps) {
  const count = Math.min(10, Math.max(1, Math.round(items)))
  const commonProps = { variant, size, spacing, orientation, disabled, "aria-label": "Formato de texto" }

  if (type === "multiple") {
    const validValues = multipleValues.filter(value => Number(value.split("-")[1]) <= count)
    return (
      <ToggleGroup type="multiple" defaultValue={validValues} {...commonProps}>
        <Items count={count} content={content} disabled={disabled} />
      </ToggleGroup>
    )
  }

  const valueIndex = Number(singleValue.split("-")[1])
  const defaultValue = singleValue === "none" || valueIndex > count ? undefined : singleValue

  return (
    <ToggleGroup type="single" defaultValue={defaultValue} {...commonProps}>
      <Items count={count} content={content} disabled={disabled} />
    </ToggleGroup>
  )
}
