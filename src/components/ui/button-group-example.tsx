"use client"

import { Ellipsis, Plus } from "lucide-react"

import { Button } from "./button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "./button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"

export type ButtonGroupExampleProps = {
  composition?: "buttons" | "separator" | "text"
  orientation?: "horizontal" | "vertical"
  items?: number
  lastSlot?: "button" | "icon-button" | "dropdown" | "popover"
  content?: "icon" | "text" | "icon-text"
  size?: "xs" | "sm" | "default" | "lg"
  disabled?: boolean
}

const iconSize = {
  xs: "icon-xs",
  sm: "icon-sm",
  default: "icon",
  lg: "icon",
} as const

const iconSizeClass = {
  xs: undefined,
  sm: undefined,
  default: undefined,
  lg: "size-9",
} as const

function GroupButton({
  index,
  content,
  size,
  disabled,
}: {
  index: number
  content: "icon" | "text" | "icon-text"
  size: "xs" | "sm" | "default" | "lg"
  disabled: boolean
}) {
  const accessibleLabel = `Button ${index}`
  return (
    <Button
      variant="outline"
      size={content === "icon" ? iconSize[size] : size}
      className={
        content === "icon"
          ? iconSizeClass[size]
          : content === "text"
            ? "w-[69px]"
            : undefined
      }
      aria-label={content === "icon" ? accessibleLabel : undefined}
      disabled={disabled}
    >
      {content !== "text" && <Plus />}
      {content !== "icon" && "Button"}
    </Button>
  )
}

function LastSlot({
  slot,
  index,
  content,
  size,
  disabled,
}: {
  slot: NonNullable<ButtonGroupExampleProps["lastSlot"]>
  index: number
  content: NonNullable<ButtonGroupExampleProps["content"]>
  size: NonNullable<ButtonGroupExampleProps["size"]>
  disabled: boolean
}) {
  if (slot === "icon-button") {
    return <Button variant="outline" size={iconSize[size]} className={iconSizeClass[size]} aria-label="Más acciones" disabled={disabled}><Ellipsis /></Button>
  }

  if (slot === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={iconSize[size]} className={iconSizeClass[size]} aria-label="Abrir acciones" disabled={disabled}><Ellipsis /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Duplicar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  if (slot === "popover") {
    return (
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size={size} className="w-[69px]" disabled={disabled} />}>
          Button
        </PopoverTrigger>
        <PopoverContent align="end">Contenido del popover</PopoverContent>
      </Popover>
    )
  }

  return <GroupButton index={index} content={content} size={size} disabled={disabled} />
}

export function ButtonGroupExample({
  composition = "buttons",
  orientation = "horizontal",
  items = 4,
  lastSlot = "button",
  content = "text",
  size = "default",
  disabled = false,
}: ButtonGroupExampleProps) {
  const count = Math.min(10, Math.max(1, Math.round(items)))
  const groupClassName = orientation === "horizontal"
    ? "-space-x-px [&>*:not(:first-child)]:border-l"
    : "-space-y-px [&>*:not(:first-child)]:border-t"

  if (composition === "separator") {
    return (
      <ButtonGroup orientation={orientation} aria-label="Acciones de edición">
        <Button variant="default" size={size} disabled={disabled}>Copiar</Button>
        <ButtonGroupSeparator orientation={orientation === "horizontal" ? "vertical" : "horizontal"} />
        <Button variant="default" size={size} disabled={disabled}>Pegar</Button>
      </ButtonGroup>
    )
  }

  if (composition === "text") {
    return (
      <ButtonGroup orientation={orientation} aria-label="Acción con etiqueta">
        <ButtonGroupText>Acciones</ButtonGroupText>
        <Button variant="outline" size={size} disabled={disabled}>Button</Button>
      </ButtonGroup>
    )
  }

  return (
    <ButtonGroup
      orientation={orientation}
      aria-label="Acciones relacionadas"
      className={groupClassName}
    >
      {Array.from({ length: count - 1 }, (_, index) => (
        <GroupButton key={index} index={index + 1} content={content} size={size} disabled={disabled} />
      ))}
      <LastSlot slot={lastSlot} index={count} content={content} size={size} disabled={disabled} />
    </ButtonGroup>
  )
}
