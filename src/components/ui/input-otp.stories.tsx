import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import { InputOTPExample, inputOTPExamplePresets, type InputOTPExampleProps } from "./input-otp-example"

const meta = {
  title: "Components/Input OTP",
  args: inputOTPExamplePresets.playground,
  argTypes: {
    slotAmount: { name: "Slots", control: "inline-radio", options: [4, 5, 6], table: { category: "Composición" } },
    style: { name: "Estilo", control: "inline-radio", options: ["default", "separator"], table: { category: "Composición" } },
    separatorPattern: { name: "Distribución", control: "inline-radio", options: ["balanced", "pairs"], if: { arg: "style", eq: "separator" }, table: { category: "Composición" } },
    status: { name: "Estado", control: "inline-radio", options: ["default", "error", "disabled"], table: { category: "Input OTP" } },
    step: { name: "Progreso", control: "select", options: ["empty", "selected", "1", "2", "3", "4", "5", "6", "filled"], table: { category: "Composición" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=561-4282" } },
  render: args => <InputOTPExample {...args} />,
} satisfies Meta<InputOTPExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const slotAmount = args.slotAmount ?? 4
    const style = args.style ?? "default"
    const separatorPattern = args.separatorPattern ?? "balanced"
    const input = canvasElement.querySelector<HTMLInputElement>('[data-slot="input-otp"]')
    const slots = canvasElement.querySelectorAll<HTMLElement>('[data-slot="input-otp-slot"]')
    const separators = canvasElement.querySelectorAll<HTMLElement>('[data-slot="input-otp-separator"]')

    await expect(input).toBeInTheDocument()
    await expect(slots).toHaveLength(slotAmount)
    await expect(separators).toHaveLength(style === "separator" ? separatorPattern === "pairs" && slotAmount === 6 ? 2 : 1 : 0)
    await expect(slots[0]?.getBoundingClientRect().width).toBe(36)
    await expect(slots[0]?.getBoundingClientRect().height).toBe(36)

    if (args.status === "disabled") await expect(input).toBeDisabled()
    else {
      input?.focus()
      await userEvent.keyboard("9")
      await expect(input?.value).toContain("9")
    }

    if (args.status === "error") {
      await expect(input).toHaveAttribute("aria-invalid", "true")
      await expect(slots[0]).toHaveAttribute("aria-invalid", "true")
    }
  },
}
