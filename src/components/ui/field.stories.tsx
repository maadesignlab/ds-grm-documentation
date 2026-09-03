import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { FieldExample, type FieldExampleProps } from "./field-example"

const controls = ["input", "time", "textarea", "checkbox", "radio", "switch", "native-select", "select", "otp", "slider", "group"] as const

const meta = {
  title: "Components/Field",
  args: { control: "input", status: "default", description: "after", required: false, orientation: "vertical" },
  argTypes: {
    control: { name: "Control", control: "select", options: controls, table: { category: "Composición" } },
    status: { name: "Estado", control: "inline-radio", options: ["default", "invalid", "disabled"], if: { arg: "control", neq: "group" }, table: { category: "Estado" } },
    description: { name: "Descripción", control: "inline-radio", options: ["none", "before", "after"], if: { arg: "control", neq: "group" }, table: { category: "Contenido" } },
    required: { name: "Requerido", control: "boolean", if: { arg: "control", neq: "group" }, table: { category: "Estado" } },
    orientation: { name: "Orientación", control: "inline-radio", options: ["vertical", "horizontal", "responsive"], if: { arg: "control", neq: "group" }, table: { category: "Layout" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=553-2675" } },
  render: args => <FieldExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<FieldExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    if (args.control === "group") {
      await expect(canvas.getAllByRole("textbox")).toHaveLength(2)
      await expect(canvasElement.querySelector("[data-slot=field-separator]")).toBeTruthy()
      return
    }
    const field = canvasElement.querySelector<HTMLElement>(args.control === "radio" ? "[data-slot=field-set]" : "[data-slot=field]")
    await expect(field).toBeTruthy()
    if (args.status === "invalid") await expect(field).toHaveAttribute("data-invalid", "true")
    if (args.status === "disabled") await expect(field).toHaveAttribute("data-disabled", "true")
    if (args.description !== "none") await expect(canvas.getByText(descriptionTextForTest)).toBeVisible()
  },
}

const descriptionTextForTest = "Texto de ayuda para completar este campo."
