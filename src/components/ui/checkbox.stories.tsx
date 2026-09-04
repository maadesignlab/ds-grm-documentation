import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { CheckboxExample, type CheckboxExampleProps } from "./checkbox-example"

const meta = {
  title: "Components/Checkbox",
  args: { appearance: "default", text: "label", textSide: "right", state: "default", checked: false, amount: 1 },
  argTypes: {
    appearance: { name: "Presentación", control: "inline-radio", options: ["default", "contained"], table: { category: "Composición" } },
    text: { name: "Texto", control: "inline-radio", options: ["label", "description"], table: { category: "Composición" } },
    textSide: { name: "Posición del texto", control: "inline-radio", options: ["left", "right"], table: { category: "Composición" } },
    amount: { name: "Opciones", control: { type: "range", min: 1, max: 6, step: 1 }, table: { category: "Composición" } },
    state: { name: "Estado", control: "inline-radio", options: ["default", "error", "disabled"], table: { category: "Estado" } },
    checked: { name: "Seleccionado inicialmente", control: "boolean", table: { category: "Estado" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41" } },
  render: args => <CheckboxExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<CheckboxExampleProps>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = { play: async ({ canvasElement, args }) => { const controls = [...canvasElement.querySelectorAll<HTMLButtonElement>("[data-slot=checkbox]")]; await expect(controls).toHaveLength(args.amount ?? 1); await expect(getComputedStyle(controls[0]).width).toBe("16px"); await expect(controls[0]).toHaveAttribute("data-state", args.checked ? "checked" : "unchecked"); await expect(controls[0].getAttribute("aria-invalid")).toBe(args.state === "error" ? "true" : null) } }
