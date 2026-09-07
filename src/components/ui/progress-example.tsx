"use client"

import * as React from "react"

import { Progress } from "./progress"

export type ProgressExampleProps = {
  value?: number
  showLabel?: boolean
  label?: string
}

export const progressPlaygroundArgs = {
  value: 60,
  showLabel: true,
  label: "Progreso",
} as const satisfies ProgressExampleProps

export const progressExamplePresets = {
  playground: progressPlaygroundArgs,
  empty: { ...progressPlaygroundArgs, value: 0 },
  quarter: { ...progressPlaygroundArgs, value: 25 },
  half: { ...progressPlaygroundArgs, value: 50 },
  threeQuarter: { ...progressPlaygroundArgs, value: 75 },
  complete: { ...progressPlaygroundArgs, value: 100 },
  withoutLabel: { ...progressPlaygroundArgs, showLabel: false },
} as const satisfies Record<string, ProgressExampleProps>

export function ProgressExample({
  value = 60,
  showLabel = true,
  label = "Progreso",
}: ProgressExampleProps) {
  const labelId = React.useId()
  const normalizedValue = Math.min(100, Math.max(0, value))

  return (
    <div className="grid w-full max-w-[433px] gap-3">
      {showLabel ? (
        <div className="flex items-center justify-between gap-4 text-sm leading-5">
          <span id={labelId} className="truncate font-medium text-foreground">{label}</span>
          <span className="shrink-0 font-normal text-muted-foreground">{normalizedValue}%</span>
        </div>
      ) : null}
      <Progress
        value={normalizedValue}
        aria-labelledby={showLabel ? labelId : undefined}
        aria-label={showLabel ? undefined : label}
      />
    </div>
  )
}
