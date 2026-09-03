"use client"

import * as React from "react"
import { Eye, Search } from "lucide-react"

import { Input } from "./input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "./input-group"
import { Spinner } from "./spinner"

export type InputState = "default" | "focused" | "invalid" | "disabled"
export type InputContent = "none" | "icon" | "text" | "button" | "spinner"
export type InputExampleProps = {
  type?: "text" | "email" | "password" | "tel" | "url" | "search" | "number" | "date" | "time" | "file"
  state?: InputState
  leftContent?: InputContent
  rightContent?: InputContent
  placeholder?: string
  filled?: boolean
}

function Content({ value, side }: { value: InputContent; side: "left" | "right" }) {
  if (value === "none") return null
  const align = side === "left" ? "inline-start" : "inline-end"
  if (value === "button") return <InputGroupAddon align={align}><InputGroupButton size="icon-xs" aria-label={side === "left" ? "Buscar" : "Mostrar contraseña"}>{side === "left" ? <Search /> : <Eye />}</InputGroupButton></InputGroupAddon>
  if (value === "spinner") return <InputGroupAddon align={align}><Spinner aria-label="Cargando" /></InputGroupAddon>
  if (value === "text") return <InputGroupAddon align={align}><InputGroupText>{side === "left" ? "https://" : ".com"}</InputGroupText></InputGroupAddon>
  return <InputGroupAddon align={align}>{side === "left" ? <Search className="size-4" aria-hidden /> : <Eye className="size-4" aria-hidden />}</InputGroupAddon>
}

export function InputExample({ type = "text", state = "default", leftContent = "none", rightContent = "none", placeholder = "Placeholder text", filled = false }: InputExampleProps) {
  const disabled = state === "disabled"
  const invalid = state === "invalid"
  const autoFocus = state === "focused"
  const common = {
    type,
    placeholder,
    disabled,
    autoFocus,
    "aria-invalid": invalid || undefined,
    "aria-label": "Campo de ejemplo",
    defaultValue: filled && type !== "file" ? "Input value" : undefined,
  }

  if (leftContent === "none" && rightContent === "none") return <Input className="w-[300px] shrink-0" {...common} />

  return <InputGroup className="w-[300px] shrink-0">
    <Content value={leftContent} side="left" />
    <InputGroupInput {...common} />
    <Content value={rightContent} side="right" />
  </InputGroup>
}
