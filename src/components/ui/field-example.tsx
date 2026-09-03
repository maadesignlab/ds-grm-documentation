"use client"

import * as React from "react"

import { Checkbox } from "./checkbox"
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "./field"
import { Input } from "./input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp"
import { NativeSelect, NativeSelectOption } from "./native-select"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Slider } from "./slider"
import { Switch } from "./switch"
import { Textarea } from "./textarea"

export type FieldControl = "input" | "time" | "textarea" | "checkbox" | "radio" | "switch" | "native-select" | "select" | "otp" | "slider" | "group"
export type FieldExampleProps = {
  control?: FieldControl
  status?: "default" | "invalid" | "disabled"
  description?: "none" | "before" | "after"
  required?: boolean
  orientation?: "vertical" | "horizontal" | "responsive"
}

const descriptionText = "Texto de ayuda para completar este campo."

function Description({ position, target }: { position: FieldExampleProps["description"]; target: "before" | "after" }) {
  return position === target ? <FieldDescription>{descriptionText}</FieldDescription> : null
}

export function FieldExample({ control = "input", status = "default", description = "after", required = false, orientation = "vertical" }: FieldExampleProps) {
  const id = React.useId()
  const invalid = status === "invalid"
  const disabled = status === "disabled"
  const stateProps = { "data-invalid": invalid || undefined, "data-disabled": disabled || undefined }

  if (control === "group") {
    return (
      <FieldGroup className="w-[300px] shrink-0">
        <Field><FieldLabel htmlFor={`${id}-name`}>Nombre</FieldLabel><Input id={`${id}-name`} placeholder="Nombre" /></Field>
        <FieldSeparator>o</FieldSeparator>
        <Field><FieldLabel htmlFor={`${id}-email`}>Correo electrónico</FieldLabel><Input id={`${id}-email`} type="email" placeholder="correo@ejemplo.com" /></Field>
      </FieldGroup>
    )
  }

  if (control === "radio") {
    return (
      <FieldSet className="w-[300px] shrink-0" {...stateProps}>
        <FieldLegend variant="label">Plan</FieldLegend>
        <Description position={description} target="before" />
        <RadioGroup defaultValue="basic" disabled={disabled} required={required} aria-invalid={invalid || undefined}>
          {["basic", "pro"].map(value => <Field key={value} orientation="horizontal" {...stateProps}><RadioGroupItem id={`${id}-${value}`} value={value} /><FieldLabel htmlFor={`${id}-${value}`}>{value === "basic" ? "Básico" : "Profesional"}</FieldLabel></Field>)}
        </RadioGroup>
        <Description position={description} target="after" />
        {invalid && <FieldError>Selecciona una opción válida.</FieldError>}
      </FieldSet>
    )
  }

  if (control === "checkbox" || control === "switch") {
    return (
      <Field orientation="horizontal" className="w-[300px] shrink-0" {...stateProps}>
        {control === "checkbox" && <Checkbox id={id} disabled={disabled} required={required} aria-invalid={invalid || undefined} />}
        <FieldContent>
          <FieldLabel htmlFor={id}>{control === "checkbox" ? "Aceptar términos" : "Activar notificaciones"}{required && <span className="text-destructive">*</span>}</FieldLabel>
          {description !== "none" && <FieldDescription>{descriptionText}</FieldDescription>}
          {invalid && <FieldError>Este campo es obligatorio.</FieldError>}
        </FieldContent>
        {control === "switch" && <Switch id={id} disabled={disabled} required={required} aria-invalid={invalid || undefined} />}
      </Field>
    )
  }

  return (
    <Field orientation={orientation} className="w-[300px] shrink-0" {...stateProps}>
      <FieldContent>
        <FieldLabel htmlFor={id}>Label Text{required && <span className="text-destructive">*</span>}</FieldLabel>
        <Description position={description} target="before" />
      </FieldContent>
      {control === "input" && <Input id={id} placeholder="Placeholder text" disabled={disabled} required={required} aria-invalid={invalid || undefined} />}
      {control === "time" && <Input id={id} type="time" disabled={disabled} required={required} aria-invalid={invalid || undefined} />}
      {control === "textarea" && <Textarea id={id} placeholder="Description Text" disabled={disabled} required={required} aria-invalid={invalid || undefined} />}
      {control === "native-select" && <NativeSelect id={id} disabled={disabled} required={required} aria-invalid={invalid || undefined}><NativeSelectOption value="">Selecciona una opción</NativeSelectOption><NativeSelectOption value="one">Opción uno</NativeSelectOption></NativeSelect>}
      {control === "select" && <Select disabled={disabled} required={required}><SelectTrigger id={id} aria-invalid={invalid || undefined}><SelectValue placeholder="Selecciona una opción" /></SelectTrigger><SelectContent><SelectGroup><SelectItem value="one">Opción uno</SelectItem><SelectItem value="two">Opción dos</SelectItem></SelectGroup></SelectContent></Select>}
      {control === "otp" && <InputOTP id={id} maxLength={4} disabled={disabled} required={required} aria-invalid={invalid || undefined}><InputOTPGroup>{[0, 1, 2, 3].map(index => <InputOTPSlot key={index} index={index} aria-invalid={invalid || undefined} />)}</InputOTPGroup></InputOTP>}
      {control === "slider" && <Slider id={id} defaultValue={[50]} disabled={disabled} aria-invalid={invalid || undefined} />}
      <Description position={description} target="after" />
      {invalid && <FieldError>El valor ingresado no es válido.</FieldError>}
    </Field>
  )
}
