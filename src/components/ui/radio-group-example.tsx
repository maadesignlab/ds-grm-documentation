"use client"

import * as React from "react"

import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "./field"
import { RadioGroup, RadioGroupItem } from "./radio-group"

export type RadioGroupExampleProps = {
  appearance?: "default" | "contained"
  text?: "label" | "description"
  textSide?: "left" | "right"
  state?: "default" | "error" | "disabled"
  selected?: boolean
  amount?: 2 | 3 | 4 | 5 | 6
}

export function RadioGroupExample({ appearance = "default", text = "label", textSide = "right", state = "default", selected = true, amount = 3 }: RadioGroupExampleProps) {
  const uid = React.useId()
  const disabled = state === "disabled"
  const invalid = state === "error"

  return <div className="selectable-example w-fit"><RadioGroup defaultValue={selected ? "option-1" : undefined} disabled={disabled} className="w-fit gap-3">{Array.from({ length: amount }, (_, index) => {
    const value = `option-${index + 1}`
    const id = `${uid}-${value}`
    const control = <RadioGroupItem id={id} value={value} aria-invalid={invalid || undefined} />
    const content = appearance === "contained" || text === "description" ? <FieldContent className="min-w-0"><FieldTitle className="whitespace-nowrap text-sm leading-5">Opción {index + 1}</FieldTitle>{text === "description" && <FieldDescription className="!m-0 whitespace-nowrap text-sm leading-5">Descripción de la opción.</FieldDescription>}</FieldContent> : <FieldLabel htmlFor={id} className="whitespace-nowrap leading-5">Opción {index + 1}</FieldLabel>
    const field = <Field orientation="horizontal" data-invalid={invalid || undefined} data-disabled={disabled || undefined} className={appearance === "contained" ? "!w-full items-start" : "!w-[200px] gap-3"}>{textSide === "left" ? <>{content}{control}</> : <>{control}{content}</>}</Field>
    return appearance === "contained" ? <FieldLabel key={value} className="!w-[230px]" data-disabled={disabled || undefined}>{field}</FieldLabel> : <React.Fragment key={value}>{field}</React.Fragment>
  })}</RadioGroup></div>
}
