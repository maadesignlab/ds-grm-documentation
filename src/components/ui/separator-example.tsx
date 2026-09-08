"use client"

import { Separator } from "./separator"

export type SeparatorExampleProps = {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

export const separatorPlaygroundArgs = {
  orientation: "horizontal",
  decorative: true,
} as const satisfies SeparatorExampleProps

export const separatorExamplePresets = {
  playground: separatorPlaygroundArgs,
  horizontal: { ...separatorPlaygroundArgs },
  vertical: { ...separatorPlaygroundArgs, orientation: "vertical" },
  semantic: { ...separatorPlaygroundArgs, decorative: false },
} as const satisfies Record<string, SeparatorExampleProps>

export function SeparatorExample({ orientation = "horizontal", decorative = true }: SeparatorExampleProps) {
  return (
    <div className={orientation === "horizontal" ? "w-[193px]" : "h-[69px]"}>
      <Separator orientation={orientation} decorative={decorative} />
    </div>
  )
}
