import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import { ButtonGroupExample, type ButtonGroupExampleProps } from "./button-group-example"

const meta = {
  title: "Components/Button Group",
  args: {
    composition: "buttons",
    orientation: "horizontal",
    items: 4,
    lastSlot: "button",
    content: "text",
    size: "default",
    disabled: false,
  },
  argTypes: {
    composition: { name: "Composición", control: "inline-radio", options: ["buttons", "separator", "text"], table: { category: "Composición" } },
    orientation: { name: "Orientación", control: "inline-radio", options: ["horizontal", "vertical"], table: { category: "Disposición" } },
    items: { name: "Cantidad", control: { type: "range", min: 1, max: 10, step: 1 }, if: { arg: "composition", eq: "buttons" }, table: { category: "Botones" } },
    lastSlot: { name: "Último slot", control: "select", options: ["button", "icon-button", "dropdown", "popover"], if: { arg: "composition", eq: "buttons" }, table: { category: "Botones" } },
    content: { name: "Contenido de botones", control: "inline-radio", options: ["icon", "text", "icon-text"], if: { arg: "composition", eq: "buttons" }, table: { category: "Botones" } },
    size: { name: "Tamaño", control: "inline-radio", options: ["xs", "sm", "default", "lg"], table: { category: "Apariencia" } },
    disabled: { name: "Deshabilitado", control: "boolean", table: { category: "Estado" } },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3355-1262" },
  },
  render: args => <ButtonGroupExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<ButtonGroupExampleProps>

export default meta
type Story = StoryObj<typeof meta>

const heights = { xs: 24, sm: 28, default: 32, lg: 36 } as const

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const group = canvasElement.querySelector<HTMLElement>("[data-slot=button-group]")
    const buttons = [...canvasElement.querySelectorAll<HTMLButtonElement>("button")]
    const count = args.composition === "separator" ? 2 : args.composition === "text" ? 1 : Math.min(10, args.items ?? 4)
    const size = args.size ?? "default"
    await expect(group).toBeTruthy()
    await expect(group).toHaveAttribute("role", "group")
    await expect(group).toHaveAttribute("data-orientation", args.orientation ?? "horizontal")
    await expect(buttons).toHaveLength(count)
    await expect(getComputedStyle(buttons[0]).height).toBe(`${heights[size]}px`)

    if (args.composition === "buttons" && !args.disabled && (args.lastSlot === "dropdown" || args.lastSlot === "popover")) {
      await userEvent.click(buttons.at(-1)!)
      const popupSlot = args.lastSlot === "dropdown" ? "dropdown-menu-content" : "popover-content"
      await expect(canvasElement.ownerDocument.querySelector(`[data-slot=${popupSlot}]`)).toBeTruthy()
    }
  },
}
