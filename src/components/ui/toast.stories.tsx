import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { ToastExample, type ToastExampleProps } from "./toast-example"

const meta = {
  title: "Components/Toast",
  args: { status: "success", text: "Datos actualizados", showIcon: true, showDescription: false, showAction: false, showClose: false, behavior: "standard" },
  argTypes: {
    status: { name: "Estado", control: "select", options: ["success", "warning", "error", "info", "brand-neutral", "neutral"], table: { category: "Apariencia" } },
    text: { name: "Texto", control: "text", table: { category: "Contenido" } },
    showIcon: { name: "Icono", control: "boolean", table: { category: "Contenido" } },
    showDescription: { name: "Descripción", control: "boolean", table: { category: "Contenido" } },
    showAction: { name: "Acción", control: "boolean", table: { category: "Contenido" } },
    showClose: { name: "Cerrar", control: "boolean", table: { category: "Contenido" } },
    behavior: { name: "Comportamiento", control: "inline-radio", options: ["standard", "promise", "stack"], table: { category: "Comportamiento" } },
    preview: { table: { disable: true } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-45" } },
  render: args => <ToastExample {...args} />,
} satisfies Meta<ToastExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: "Mostrar notificación" }))
    const body = within(canvasElement.ownerDocument.body)
    const expectedText = args.behavior === "promise" ? "Actualizando datos" : args.behavior === "stack" ? "Datos actualizados" : args.text ?? "Datos actualizados"
    const title = await body.findByText(expectedText)
    const toastRoot = title.closest<HTMLElement>("[data-slot=toast]")
    await expect(toastRoot).toBeTruthy()
    await expect(toastRoot).toHaveAttribute("data-type", args.behavior === "promise" ? "loading" : args.status)
    await expect(getComputedStyle(toastRoot!).width).toBe("356px")
  },
}
