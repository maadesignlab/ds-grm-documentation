"use client"

import * as React from "react"
import { REGEXP_ONLY_DIGITS } from "input-otp"

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "./input-otp"

export type InputOTPExampleProps = {
  slotAmount?: 4 | 5 | 6
  style?: "default" | "separator"
  separatorPattern?: "balanced" | "pairs"
  status?: "default" | "error" | "disabled"
  step?: "empty" | "selected" | "1" | "2" | "3" | "4" | "5" | "6" | "filled"
}

export const inputOTPPlaygroundArgs = {
  slotAmount: 4,
  style: "default",
  separatorPattern: "balanced",
  status: "default",
  step: "empty",
} as const satisfies InputOTPExampleProps

export const inputOTPExamplePresets = {
  playground: inputOTPPlaygroundArgs,
  default: { ...inputOTPPlaygroundArgs },
  separator: { ...inputOTPPlaygroundArgs, style: "separator" },
  four: { ...inputOTPPlaygroundArgs },
  five: { ...inputOTPPlaygroundArgs, slotAmount: 5 },
  six: { ...inputOTPPlaygroundArgs, slotAmount: 6 },
  pairs: { ...inputOTPPlaygroundArgs, slotAmount: 6, style: "separator", separatorPattern: "pairs" },
  error: { ...inputOTPPlaygroundArgs, status: "error" },
  disabled: { ...inputOTPPlaygroundArgs, status: "disabled" },
  empty: { ...inputOTPPlaygroundArgs },
  selected: { ...inputOTPPlaygroundArgs, step: "selected" },
  partial: { ...inputOTPPlaygroundArgs, step: "3" },
  filled: { ...inputOTPPlaygroundArgs, step: "filled" },
} as const satisfies Record<string, InputOTPExampleProps>

function getGroupSizes(slotAmount: number, pattern: "balanced" | "pairs") {
  if (pattern === "pairs" && slotAmount === 6) return [2, 2, 2]
  const first = Math.floor(slotAmount / 2)
  return [first, slotAmount - first]
}

function getDefaultValue(step: NonNullable<InputOTPExampleProps["step"]>, slotAmount: number) {
  if (step === "empty" || step === "selected") return ""
  const count = step === "filled" ? slotAmount : Math.min(Number(step), slotAmount)
  return "123456".slice(0, count)
}

export function InputOTPExample({
  slotAmount = 4,
  style = "default",
  separatorPattern = "balanced",
  status = "default",
  step = "empty",
}: InputOTPExampleProps) {
  const groupSizes = style === "separator" ? getGroupSizes(slotAmount, separatorPattern) : [slotAmount]
  const defaultValue = getDefaultValue(step, slotAmount)
  const groupStarts = groupSizes.map((_, groupIndex) =>
    groupSizes.slice(0, groupIndex).reduce((total, size) => total + size, 0)
  )

  return (
    <InputOTPInstance
      key={`${slotAmount}-${style}-${separatorPattern}-${status}-${step}`}
      slotAmount={slotAmount}
      groupSizes={groupSizes}
      groupStarts={groupStarts}
      initialValue={defaultValue}
      status={status}
      selected={step === "selected"}
    />
  )
}

function InputOTPInstance({
  slotAmount,
  groupSizes,
  groupStarts,
  initialValue,
  status,
  selected,
}: {
  slotAmount: number
  groupSizes: number[]
  groupStarts: number[]
  initialValue: string
  status: NonNullable<InputOTPExampleProps["status"]>
  selected: boolean
}) {
  const [value, setValue] = React.useState(initialValue)
  const invalid = status === "error"

  return (
    <InputOTP
      maxLength={slotAmount}
      value={value}
      onChange={setValue}
      pattern={REGEXP_ONLY_DIGITS}
      inputMode="numeric"
      autoFocus={selected}
      disabled={status === "disabled"}
      aria-invalid={invalid}
      aria-label={`Código de ${slotAmount} dígitos`}
    >
      {groupSizes.map((groupSize, groupIndex) => {
        const startIndex = groupStarts[groupIndex]
        return (
          <div className="contents" key={`${groupIndex}-${groupSize}`}>
            {groupIndex > 0 ? <InputOTPSeparator /> : null}
            <InputOTPGroup>
              {Array.from({ length: groupSize }, (_, index) => (
                <InputOTPSlot
                  key={startIndex + index}
                  index={startIndex + index}
                  aria-invalid={invalid}
                />
              ))}
            </InputOTPGroup>
          </div>
        )
      })}
    </InputOTP>
  )
}
