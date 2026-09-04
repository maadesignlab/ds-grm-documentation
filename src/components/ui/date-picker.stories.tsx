import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { DatePickerExample, datePickerExamplePresets, type DatePickerExampleProps } from "./date-picker-example"

const meta = {
  title: "Components/Date Picker",
  args: datePickerExamplePresets.playground,
  argTypes: {
    type: { name: "Tipo", control: "inline-radio", options: ["single", "range", "date-time"], table: { category: "Composición" } },
    state: { name: "Estado", control: "inline-radio", options: ["empty", "filled"], table: { category: "Composición" } },
    captionLayout: { name: "Encabezado", control: "inline-radio", options: ["label", "dropdown"], description: "Range conserva label en sus dos meses.", table: { category: "Calendar" } },
    initiallyOpen: { name: "Abierto inicialmente", control: "boolean", table: { category: "Popover" } },
    showOutsideDays: { name: "Días externos", control: "boolean", table: { category: "Calendar" } },
    availability: { name: "Disponibilidad", control: "boolean", description: "Compone modifiers y leyenda del Calendar GRM; no amplía su API.", table: { category: "Composición Figma" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-35" } },
  render: args => <DatePickerExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<DatePickerExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button")
    await expect(trigger).toBeVisible()
    if (args.initiallyOpen) await expect(trigger).toHaveAttribute("aria-expanded", "true")
    if (args.type === "date-time") await expect(canvas.getByLabelText("Hora")).toBeVisible()
  },
}
