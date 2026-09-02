import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import { ToggleGroupExample, type ToggleGroupExampleProps } from "./toggle-group-example"

const values = Array.from({ length: 10 }, (_, index) => `item-${index + 1}`)

const meta = {
  title: "Components/Toggle Group",
  args: {
    type: "single",
    items: 5,
    content: "icon",
    singleValue: "item-3",
    multipleValues: ["item-2", "item-4"],
    variant: "default",
    size: "default",
    spacing: 2,
    orientation: "horizontal",
    disabled: false,
  },
  argTypes: {
    type: { name: "Selección", control: "inline-radio", options: ["single", "multiple"], table: { category: "Comportamiento" } },
    items: { name: "Cantidad", control: "select", options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], table: { category: "Composición" } },
    content: { name: "Contenido", control: "inline-radio", options: ["icon", "text", "icon-text"], table: { category: "Composición" } },
    singleValue: { name: "Valor seleccionado", control: "select", options: ["none", ...values], if: { arg: "type", eq: "single" }, table: { category: "Selección única" } },
    multipleValues: { name: "Valores seleccionados", control: "multi-select", options: values, if: { arg: "type", eq: "multiple" }, table: { category: "Selección múltiple" } },
    variant: { name: "Estilo", control: "inline-radio", options: ["default", "outline"], table: { category: "Apariencia" } },
    size: { name: "Tamaño", control: "inline-radio", options: ["sm", "default", "lg"], table: { category: "Apariencia" } },
    spacing: { name: "Spacing", control: { type: "range", min: 0, max: 4, step: 1 }, table: { category: "Disposición" } },
    orientation: { name: "Orientación", control: "inline-radio", options: ["horizontal", "vertical"], table: { category: "Disposición" } },
    disabled: { name: "Deshabilitado", control: "boolean", table: { category: "Estado" } },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3331-60517" },
  },
  render: args => <ToggleGroupExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<ToggleGroupExampleProps>

export default meta
type Story = StoryObj<typeof meta>

const heights = { sm: 32, default: 36, lg: 40 } as const

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const group = canvasElement.querySelector<HTMLElement>("[data-slot=toggle-group]")
    const items = [...canvasElement.querySelectorAll<HTMLButtonElement>("[data-slot=toggle-group-item]")]
    const count = args.items ?? 5
    const size = args.size ?? "default"
    const orientation = args.orientation ?? "horizontal"
    await expect(group).toBeTruthy()
    await expect(items).toHaveLength(count)
    await expect(group).toHaveAttribute("data-orientation", orientation)
    await expect(getComputedStyle(items[0]).height).toBe(`${heights[size]}px`)

    if (!args.disabled) {
      await userEvent.click(items[0])
      if (args.type === "single") {
        await expect(items.filter(item => item.dataset.state === "on")).toHaveLength(1)
      } else {
        const wasSecondOn = items[1]?.dataset.state === "on"
        await userEvent.click(items[1])
        await expect(items[1]).toHaveAttribute("data-state", wasSecondOn ? "off" : "on")
      }
    }
  },
}
