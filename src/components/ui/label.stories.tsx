import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { LabelExample, type LabelExampleProps } from "./label-example"

const meta = {
  title: "Components/Label",
  args: { control: "input", disabled: false, invalid: false, required: false, text: "Nombre de usuario" },
  argTypes: {
    control: { name: "Control", control: "inline-radio", options: ["input", "checkbox", "textarea"], table: { category: "Composición" } },
    text: { name: "Texto", control: "text", table: { category: "Contenido" } },
    disabled: { name: "Deshabilitado", control: "boolean", table: { category: "Estado del control" } },
    invalid: { name: "Inválido", control: "boolean", table: { category: "Estado del control" } },
    required: { name: "Requerido", control: "boolean", table: { category: "Estado del control" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-38" } },
  render: args => <LabelExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<LabelExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const label = canvas.getByText(args.text || "Nombre de usuario", { selector: "label" })
    const control = args.control === "checkbox" ? canvas.getByRole("checkbox") : canvas.getByRole("textbox")
    await expect(label).toBeVisible()
    await userEvent.click(label)
    if (args.disabled) await expect(control).toBeDisabled()
    else if (args.control === "checkbox") await expect(control).toBeChecked()
    else await expect(control).toHaveFocus()
    if (args.invalid) await expect(control).toHaveAttribute("aria-invalid", "true")
    if (args.required) await expect(control).toBeRequired()
  },
}
