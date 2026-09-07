import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { ProgressExample, progressExamplePresets, type ProgressExampleProps } from "./progress-example"

const meta = {
  title: "Components/Progress",
  args: progressExamplePresets.playground,
  argTypes: {
    value: {
      name: "Valor",
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Prop pública value de Progress.",
      table: { category: "Progress" },
    },
    showLabel: {
      name: "Mostrar label",
      control: "boolean",
      description: "Composición externa; no es una prop del primitive.",
      table: { category: "Composición" },
    },
    label: {
      name: "Label",
      control: "text",
      if: { arg: "showLabel", truthy: true },
      table: { category: "Composición" },
    },
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2206-16412",
    },
  },
  render: args => <div className="w-[433px] max-w-[calc(100vw-32px)]"><ProgressExample {...args} /></div>,
} satisfies Meta<ProgressExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const progress = canvasElement.querySelector<HTMLElement>("[data-slot=progress]")
    const indicator = canvasElement.querySelector<HTMLElement>("[data-slot=progress-indicator]")
    const value = Math.min(100, Math.max(0, args.value ?? 60))

    await expect(progress).toBeVisible()
    await expect(progress).toHaveAttribute("role", "progressbar")
    await expect(progress).toHaveAttribute("aria-valuenow", String(value))
    await expect(indicator?.style.transform).toBe(`translateX(-${100 - value}%)`)
  },
}
