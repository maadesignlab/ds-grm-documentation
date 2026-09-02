import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"

import { ToggleExample, type ToggleExampleProps } from "./toggle-example"

const meta = {
  title: "Components/Toggle",
  args: {
    variant: "default",
    size: "default",
    content: "icon-text",
    pressed: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      name: "Estilo",
      control: "inline-radio",
      options: ["default", "outline"],
      table: { category: "Apariencia" },
    },
    size: {
      name: "Tamaño",
      control: "inline-radio",
      options: ["sm", "default", "lg"],
      table: { category: "Apariencia" },
    },
    content: {
      name: "Contenido",
      control: "inline-radio",
      options: ["icon", "text", "icon-text"],
      table: { category: "Composición" },
    },
    pressed: {
      name: "Presionado inicialmente",
      control: "boolean",
      table: { category: "Estado" },
    },
    disabled: {
      name: "Deshabilitado",
      control: "boolean",
      table: { category: "Estado" },
    },
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3279-53814",
    },
  },
  render: args => <ToggleExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<ToggleExampleProps>

export default meta
type Story = StoryObj<typeof meta>

const heights = { sm: 32, default: 36, lg: 40 } as const

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const toggle = canvasElement.querySelector<HTMLButtonElement>("[data-slot=toggle]")
    const size = args.size ?? "default"
    await expect(toggle).toBeTruthy()
    await expect(toggle).toHaveAttribute("aria-pressed", String(args.pressed))
    await expect(getComputedStyle(toggle!).height).toBe(`${heights[size]}px`)
    await expect(getComputedStyle(toggle!).fontSize).toBe("14px")
    await expect(getComputedStyle(toggle!).lineHeight).toBe("20px")

    if (!args.disabled) {
      await userEvent.click(toggle!)
      await expect(toggle).toHaveAttribute("aria-pressed", String(!args.pressed))
    }
  },
}
