"use client"

import * as React from "react"

import { Checkbox } from "./checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldTitle } from "./field"

export type CheckboxExampleProps = {
  appearance?: "default" | "contained"
  text?: "label" | "description"
  textSide?: "left" | "right"
  state?: "default" | "error" | "disabled"
  checked?: boolean
  amount?: 1 | 2 | 3 | 4 | 5 | 6
}

function CheckboxOption({ id, appearance, text, textSide, state, checked, index }: Omit<CheckboxExampleProps, "amount"> & { id: string; index: number }) {
  const disabled = state === "disabled"
  const invalid = state === "error"
  const control = <Checkbox id={id} defaultChecked={checked && index === 0} disabled={disabled} aria-invalid={invalid || undefined} />
  const content = appearance === "contained" || text === "description" ? <FieldContent className="min-w-0"><FieldTitle className="whitespace-nowrap text-sm leading-5">Opción {index + 1}</FieldTitle>{text === "description" && <FieldDescription className="!m-0 whitespace-nowrap text-sm leading-5">Descripción de la opción.</FieldDescription>}</FieldContent> : <FieldLabel htmlFor={id} className="whitespace-nowrap leading-5">Opción {index + 1}</FieldLabel>
  const field = <Field orientation="horizontal" data-invalid={invalid || undefined} data-disabled={disabled || undefined} className={appearance === "contained" ? "!w-full items-start" : "!w-[200px] gap-3"}>{textSide === "left" ? <>{content}{control}</> : <>{control}{content}</>}</Field>

  return appearance === "contained" ? <FieldLabel className="!w-[230px]" data-disabled={disabled || undefined}>{field}</FieldLabel> : field
}

export function CheckboxExample({ appearance = "default", text = "label", textSide = "right", state = "default", checked = false, amount = 1 }: CheckboxExampleProps) {
  const uid = React.useId()
  const width = appearance === "contained" ? "w-[230px]" : "w-[200px]"

  return <div className={`selectable-example ${width}`}><FieldGroup data-slot="checkbox-group" className={`${width} gap-3`}>{Array.from({ length: amount }, (_, index) => <CheckboxOption key={index} id={`${uid}-${index}`} appearance={appearance} text={text} textSide={textSide} state={state} checked={checked} index={index} />)}</FieldGroup></div>
}
