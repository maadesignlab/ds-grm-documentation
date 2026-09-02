import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { EmptyExample, type EmptyExampleProps } from "./empty-example"

const meta = {
  title: "Components/Empty",
  args: { container: "none", media: "icon", actions: "both", actionLayout: "horizontal", showAuxiliary: true },
  argTypes: {
    container: { name: "Contenedor", control: "inline-radio", options: ["none", "outline"], table: { category: "Apariencia" } },
    media: { name: "Media", control: "inline-radio", options: ["icon", "avatar", "spinner", "none"], table: { category: "Contenido" } },
    actions: { name: "Acciones", control: "inline-radio", options: ["both", "primary", "none"], table: { category: "Contenido" } },
    actionLayout: { name: "Disposición", control: "inline-radio", options: ["horizontal", "vertical"], if: { arg: "actions", neq: "none" }, table: { category: "Composición" } },
    showAuxiliary: { name: "Acción auxiliar", control: "boolean", table: { category: "Contenido" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2173-21188" } },
  render: args => <div className="w-[382px]"><EmptyExample {...args} /></div>,
} satisfies Meta<EmptyExampleProps>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = { play: async ({canvasElement}) => { const canvas=within(canvasElement); await expect(canvas.getByText("No hay pacientes registrados")).toBeVisible(); const empty=canvasElement.querySelector("[data-slot=empty]")!; expect(getComputedStyle(empty).width).toBe("382px"); expect(getComputedStyle(canvas.getByText("No hay pacientes registrados")).fontSize).toBe("14px") } }
