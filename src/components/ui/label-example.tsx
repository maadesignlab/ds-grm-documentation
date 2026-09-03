"use client"

import * as React from "react"

import { Checkbox } from "./checkbox"
import { Field, FieldError } from "./field"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"

export type LabelExampleProps = {
  control?: "input" | "checkbox" | "textarea"
  disabled?: boolean
  invalid?: boolean
  required?: boolean
  text?: string
}

export function LabelExample({ control = "input", disabled = false, invalid = false, required = false, text }: LabelExampleProps) {
  const id = React.useId()
  const label = text || (control === "checkbox" ? "Aceptar términos y condiciones" : control === "textarea" ? "Mensaje" : "Nombre de usuario")

  if (control === "checkbox") {
    return (
      <Field orientation="horizontal" className="w-72" data-disabled={disabled || undefined} data-invalid={invalid || undefined}>
        <Checkbox id={id} disabled={disabled} required={required} aria-invalid={invalid || undefined} />
        <Label htmlFor={id}>{label}{required && <span aria-hidden="true">*</span>}</Label>
      </Field>
    )
  }

  return (
    <Field className="w-72" data-disabled={disabled || undefined} data-invalid={invalid || undefined}>
      <Label htmlFor={id}>{label}{required && <span aria-hidden="true">*</span>}</Label>
      {control === "textarea" ? (
        <Textarea id={id} placeholder={label} disabled={disabled} required={required} aria-invalid={invalid || undefined} aria-describedby={invalid ? `${id}-error` : undefined} />
      ) : (
        <Input id={id} placeholder={label} disabled={disabled} required={required} aria-invalid={invalid || undefined} aria-describedby={invalid ? `${id}-error` : undefined} />
      )}
      {invalid && <FieldError id={`${id}-error`}>El valor ingresado no es válido.</FieldError>}
    </Field>
  )
}
