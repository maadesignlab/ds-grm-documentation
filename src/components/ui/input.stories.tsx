import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { InputExample, type InputExampleProps } from "./input-example"

const meta = {
  title: "Components/Input",
  args: { type: "text", state: "default", leftContent: "none", rightContent: "none", placeholder: "Placeholder text", filled: false },
  argTypes: {
    type: { name: "Tipo nativo", control: "select", options: ["text", "email", "password", "tel", "url", "search", "number", "date", "time", "file"], table: { category: "Props nativas" } },
    placeholder: { name: "Placeholder", control: "text", table: { category: "Contenido" } },
    filled: { name: "Con valor", control: "boolean", description: "Configura defaultValue en la muestra.", table: { category: "Configuración de muestra" } },
    state: { name: "Estado", control: "inline-radio", options: ["default", "focused", "invalid", "disabled"], description: "Traduce el estado a autoFocus, aria-invalid o disabled.", table: { category: "Configuración de muestra" } },
    leftContent: { name: "Contenido izquierdo", control: "select", options: ["none", "icon", "text", "button", "spinner"], description: "Composición mediante InputGroupAddon; no es una prop de Input.", table: { category: "Input Group" } },
    rightContent: { name: "Contenido derecho", control: "select", options: ["none", "icon", "text", "button", "spinner"], description: "Composición mediante InputGroupAddon; no es una prop de Input.", table: { category: "Input Group" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-34" } },
  render: args => <InputExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<InputExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText("Campo de ejemplo")
    await expect(input).toBeVisible()
    if (args.state === "disabled") await expect(input).toBeDisabled()
    if (args.state === "invalid") await expect(input).toHaveAttribute("aria-invalid", "true")
    if (args.state === "focused") await expect(input).toHaveFocus()
  },
}
