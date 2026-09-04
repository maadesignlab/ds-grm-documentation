import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { RadioGroupExample, type RadioGroupExampleProps } from "./radio-group-example"

const meta = {
  title: "Components/Radio Group",
  args: { appearance: "default", text: "label", textSide: "right", state: "default", selected: true, amount: 3 },
  argTypes: {
    appearance: { name: "Presentación", control: "inline-radio", options: ["default", "contained"], table: { category: "Composición" } },
    text: { name: "Texto", control: "inline-radio", options: ["label", "description"], table: { category: "Composición" } },
    textSide: { name: "Posición del texto", control: "inline-radio", options: ["left", "right"], table: { category: "Composición" } },
    amount: { name: "Opciones", control: { type: "range", min: 2, max: 6, step: 1 }, table: { category: "Composición" } },
    state: { name: "Estado", control: "inline-radio", options: ["default", "error", "disabled"], table: { category: "Estado" } },
    selected: { name: "Selección inicial", control: "boolean", table: { category: "Estado" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41" } },
  render: args => <RadioGroupExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<RadioGroupExampleProps>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = { play: async ({ canvasElement, args }) => { const items = [...canvasElement.querySelectorAll<HTMLButtonElement>("[data-slot=radio-group-item]")]; await expect(items).toHaveLength(args.amount ?? 3); await expect(getComputedStyle(items[0]).width).toBe("16px"); await expect(items[0]).toHaveAttribute("data-state", args.selected ? "checked" : "unchecked"); await expect(items[0].getAttribute("aria-invalid")).toBe(args.state === "error" ? "true" : null) } }
