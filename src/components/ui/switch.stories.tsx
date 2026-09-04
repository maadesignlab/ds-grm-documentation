import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { SwitchExample, type SwitchExampleProps } from "./switch-example"

const meta = {
  title: "Components/Switch",
  args: { appearance: "default", text: "label", textSide: "right", state: "default", size: "default", checked: false },
  argTypes: {
    appearance: { name: "Presentación", control: "inline-radio", options: ["default", "contained"], table: { category: "Composición" } },
    text: { name: "Texto", control: "inline-radio", options: ["label", "description"], table: { category: "Composición" } },
    textSide: { name: "Posición del texto", control: "inline-radio", options: ["left", "right"], table: { category: "Composición" } },
    size: { name: "Tamaño", control: "inline-radio", options: ["sm", "default"], table: { category: "Apariencia" } },
    state: { name: "Estado", control: "inline-radio", options: ["default", "error", "disabled"], table: { category: "Estado" } },
    checked: { name: "Activo inicialmente", control: "boolean", table: { category: "Estado" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-41" } },
  render: args => <SwitchExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<SwitchExampleProps>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = { play: async ({ canvasElement, args }) => { const control = canvasElement.querySelector<HTMLButtonElement>("[data-slot=switch]")!; await expect(control).toBeTruthy(); await expect(getComputedStyle(control).width).toBe(args.size === "sm" ? "24px" : "32px"); await expect(control).toHaveAttribute("data-state", args.checked ? "checked" : "unchecked"); await expect(control.getAttribute("aria-invalid")).toBe(args.state === "error" ? "true" : null) } }
