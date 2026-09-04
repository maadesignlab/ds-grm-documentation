"use client"

import * as React from "react"

import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "./native-select"

export type NativeSelectExampleProps = {
  type?: "simple" | "groups"
  state?: "default" | "invalid" | "disabled"
  size?: "sm" | "default"
  filled?: boolean
}

export function NativeSelectExample({
  type = "simple",
  state = "default",
  size = "default",
  filled = false,
}: NativeSelectExampleProps) {
  const id = React.useId()
  const invalid = state === "invalid"

  return (
    <NativeSelect
      aria-label="Selecciona una opción"
      aria-invalid={invalid || undefined}
      className="native-select-example w-[180px]"
      defaultValue={filled ? "item-1" : ""}
      disabled={state === "disabled"}
      id={id}
      key={`${type}-${state}-${size}-${filled}`}
      size={size}
    >
      <NativeSelectOption value="">Selecciona una opción</NativeSelectOption>
      {type === "simple" ? (
        <>
          <NativeSelectOption value="item-1">Opción 1</NativeSelectOption>
          <NativeSelectOption value="item-2">Opción 2</NativeSelectOption>
          <NativeSelectOption value="item-3">Opción 3</NativeSelectOption>
        </>
      ) : (
        <>
          <NativeSelectOptGroup label="Grupo 1">
            <NativeSelectOption value="item-1">Opción 1</NativeSelectOption>
            <NativeSelectOption value="item-2">Opción 2</NativeSelectOption>
          </NativeSelectOptGroup>
          <NativeSelectOptGroup label="Grupo 2">
            <NativeSelectOption value="item-3">Opción 3</NativeSelectOption>
            <NativeSelectOption value="item-4">Opción 4</NativeSelectOption>
          </NativeSelectOptGroup>
        </>
      )}
    </NativeSelect>
  )
}
