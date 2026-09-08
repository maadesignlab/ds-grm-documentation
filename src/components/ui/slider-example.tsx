"use client"

import * as React from "react"

import { Label } from "./label"
import { Slider } from "./slider"

export type SliderExampleProps = {
  type?: "single" | "range" | "multiple"
  orientation?: "horizontal" | "vertical"
  valueLevel?: "low" | "medium" | "high"
  disabled?: boolean
  label?: string
}

const valuesByType = {
  single: {
    low: [20],
    medium: [50],
    high: [80],
  },
  range: {
    low: [10, 40],
    medium: [25, 75],
    high: [60, 90],
  },
  multiple: {
    low: [10, 25, 40],
    medium: [20, 50, 80],
    high: [60, 75, 90],
  },
} as const

export const sliderPlaygroundArgs = {
  type: "single",
  orientation: "horizontal",
  valueLevel: "medium",
  disabled: false,
  label: "Temperatura",
} as const satisfies SliderExampleProps

export const sliderExamplePresets = {
  playground: sliderPlaygroundArgs,
  single: { ...sliderPlaygroundArgs },
  range: { ...sliderPlaygroundArgs, type: "range" },
  multiple: { ...sliderPlaygroundArgs, type: "multiple" },
  horizontal: { ...sliderPlaygroundArgs },
  vertical: { ...sliderPlaygroundArgs, orientation: "vertical" },
  low: { ...sliderPlaygroundArgs, valueLevel: "low" },
  medium: { ...sliderPlaygroundArgs },
  high: { ...sliderPlaygroundArgs, valueLevel: "high" },
  disabled: { ...sliderPlaygroundArgs, disabled: true },
} as const satisfies Record<string, SliderExampleProps>

function ControlledSlider({
  defaultValue,
  orientation,
  disabled,
  label,
}: {
  defaultValue: number[]
  orientation: "horizontal" | "vertical"
  disabled: boolean
  label: string
}) {
  const [value, setValue] = React.useState(defaultValue)
  const sliderId = React.useId()

  return (
    <div className="grid w-60 gap-3">
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={sliderId}>{label}</Label>
        <span className="text-sm text-muted-foreground">{value.join(", ")}</span>
      </div>
      <div className={orientation === "horizontal" ? "flex h-5 w-60 items-center" : "flex h-60 w-5 justify-center"}>
        <Slider
          id={sliderId}
          orientation={orientation}
          value={value}
          onValueChange={setValue}
          disabled={disabled}
        />
      </div>
    </div>
  )
}

export function SliderExample({
  type = "single",
  orientation = "horizontal",
  valueLevel = "medium",
  disabled = false,
  label = "Temperatura",
}: SliderExampleProps) {
  const defaultValue = [...valuesByType[type][valueLevel]]

  if (type === "range") {
    return (
      <ControlledSlider
        key={`${type}-${orientation}-${valueLevel}-${disabled}`}
        defaultValue={defaultValue}
        orientation={orientation}
        disabled={disabled}
        label={label}
      />
    )
  }

  return (
    <div className={orientation === "horizontal" ? "flex h-5 w-60 items-center" : "flex h-60 w-5 justify-center"}>
      <Slider
        key={`${type}-${orientation}-${valueLevel}-${disabled}`}
        orientation={orientation}
        defaultValue={defaultValue}
        disabled={disabled}
        aria-label={`Slider ${type}`}
      />
    </div>
  )
}
