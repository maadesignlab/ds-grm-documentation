"use client"

import * as React from "react"

import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "./field"
import { Switch } from "./switch"

export type SwitchExampleProps = {
  appearance?: "default" | "contained"
  text?: "label" | "description"
  textSide?: "left" | "right"
  state?: "default" | "error" | "disabled"
  size?: "sm" | "default"
  checked?: boolean
}

export function SwitchExample({ appearance = "default", text = "label", textSide = "right", state = "default", size = "default", checked = false }: SwitchExampleProps) {
  const id = React.useId()
  const disabled = state === "disabled"
  const invalid = state === "error"
  const control = <Switch id={id} size={size} defaultChecked={checked} disabled={disabled} aria-invalid={invalid || undefined} />
  const content = appearance === "contained" || text === "description" ? <FieldContent className="min-w-0"><FieldTitle className="whitespace-nowrap text-sm leading-5">Notificaciones</FieldTitle>{text === "description" && <FieldDescription className="!m-0 whitespace-nowrap text-sm leading-5">Recibe novedades.</FieldDescription>}</FieldContent> : <FieldLabel htmlFor={id} className="whitespace-nowrap leading-5">Notificaciones</FieldLabel>
  const field = <Field orientation="horizontal" data-invalid={invalid || undefined} data-disabled={disabled || undefined} className={appearance === "contained" ? "!w-full items-start" : "!w-[202px] gap-2"}>{textSide === "left" ? <>{content}{control}</> : <>{control}{content}</>}</Field>

  return <div className="selectable-example w-fit">{appearance === "contained" ? <FieldLabel className="!w-[222px]" data-disabled={disabled || undefined}>{field}</FieldLabel> : field}</div>
}
