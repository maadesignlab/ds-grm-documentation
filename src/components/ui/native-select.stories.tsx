import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { NativeSelectExample, type NativeSelectExampleProps } from "./native-select-example"

const meta = {
  title: "Components/Native Select",
  args: { type: "simple", state: "default", size: "default", filled: false },
  argTypes: {
    type: { name: "Composición", control: "inline-radio", options: ["simple", "groups"], table: { category: "Composición" } },
    state: { name: "Estado", control: "inline-radio", options: ["default", "invalid", "disabled"], description: "Se traduce a aria-invalid o disabled.", table: { category: "Props nativas" } },
    size: { name: "Tamaño", control: "inline-radio", options: ["sm", "default"], table: { category: "API shadcn/ui" } },
    filled: { name: "Con valor", control: "boolean", description: "Configura defaultValue en la muestra.", table: { category: "Muestra" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=553-7952" } },
  render: args => <NativeSelectExample {...args} />,
} satisfies Meta<NativeSelectExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const select = within(canvasElement).getByLabelText("Selecciona una opción")
    await expect(select).toBeVisible()
    if (args.state === "disabled") await expect(select).toBeDisabled()
    if (args.state === "invalid") await expect(select).toHaveAttribute("aria-invalid", "true")
    await expect(select.querySelectorAll("option").length).toBe(args.type === "groups" ? 5 : 4)
  },
}
