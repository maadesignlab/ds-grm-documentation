import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { ComboboxExample, comboboxExamplePresets, type ComboboxExampleProps } from "./combobox-example"

const meta = {
  title: "Components/Combobox",
  args: comboboxExamplePresets.playground,
  argTypes: {
    type: { name: "Composición", control: "select", options: ["simple", "groups", "multiple", "popup"], table: { category: "Composición oficial" } },
    state: { name: "Estado", control: "inline-radio", options: ["default", "invalid", "disabled"], table: { category: "API shadcn/ui" } },
    filled: { name: "Con valor", control: "boolean", description: "Configura defaultValue en la composición.", table: { category: "Muestra" } },
    initiallyOpen: { name: "Abierto inicialmente", control: "boolean", description: "Configura defaultOpen.", table: { category: "API shadcn/ui" } },
    showClear: { name: "Clear button", control: "boolean", description: "Prop oficial de ComboboxInput.", table: { category: "API shadcn/ui" } },
    autoHighlight: { name: "Auto highlight", control: "boolean", description: "Resalta la primera coincidencia al filtrar.", table: { category: "API shadcn/ui" } },
    icons: { name: "Iconos", control: "boolean", description: "Compone iconos como hijos de ComboboxItem.", table: { category: "Composición oficial" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-39" } },
  render: args => <ComboboxExample {...args} />,
} satisfies Meta<ComboboxExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const combobox = canvas.getByRole("combobox")
    await expect(combobox).toBeVisible()
    if (args.state === "disabled") await expect(combobox).toBeDisabled()
    if (args.state === "invalid" && args.type !== "popup") await expect(combobox).toHaveAttribute("aria-invalid", "true")
    if (args.initiallyOpen) await expect(combobox).toHaveAttribute("aria-expanded", "true")
  },
}
