import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { SelectExample, selectExamplePresets, type SelectExampleProps } from "./select-example"

const meta = {
  title: "Components/Select",
  args: selectExamplePresets.playground,
  argTypes: {
    type: { name: "Composición", control: "select", options: ["simple", "groups", "scrollable"], table: { category: "Composición oficial" } },
    state: { name: "Estado", control: "inline-radio", options: ["default", "invalid", "disabled"], description: "Se traduce a aria-invalid o disabled.", table: { category: "API shadcn/ui" } },
    size: { name: "Tamaño", control: "inline-radio", options: ["sm", "default"], table: { category: "API shadcn/ui" } },
    position: { name: "Posición", control: "inline-radio", options: ["item-aligned", "popper"], table: { category: "SelectContent" } },
    filled: { name: "Con valor", control: "boolean", description: "Configura defaultValue en la composición.", table: { category: "Muestra" } },
    initiallyOpen: { name: "Abierto inicialmente", control: "boolean", description: "Configura defaultOpen; el usuario mantiene el control interactivo.", table: { category: "API shadcn/ui" } },
    icons: { name: "Iconos", control: "boolean", description: "Compone iconos como hijos de SelectItem; requiere un valor seleccionado para aparecer en SelectValue.", table: { category: "Composición oficial" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=614-4917" } },
  render: args => <SelectExample {...args} />,
} satisfies Meta<SelectExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole("combobox")
    await expect(trigger).toBeVisible()
    if (args.state === "disabled") await expect(trigger).toBeDisabled()
    if (args.state === "invalid") await expect(trigger).toHaveAttribute("aria-invalid", "true")
    if (args.initiallyOpen) await expect(trigger).toHaveAttribute("aria-expanded", "true")
  },
}
