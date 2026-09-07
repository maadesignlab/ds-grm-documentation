import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { AvatarExample, avatarExamplePresets, avatarSizes, type AvatarExampleProps } from "./avatar-example"

const meta = {
  title: "Components/Avatar",
  args: avatarExamplePresets.playground,
  argTypes: {
    composition: { name: "Composición", control: "inline-radio", options: ["single", "group"], table: { category: "Composición" } },
    content: { name: "Contenido", control: "inline-radio", options: ["image", "text", "icon"], if: { arg: "composition", eq: "single" }, table: { category: "Avatar" } },
    style: { name: "Estilo", control: "select", options: ["primary", "secondary", "muted", "gradient"], if: { arg: "composition", eq: "single" }, table: { category: "Avatar" } },
    roundness: { name: "Forma", control: "inline-radio", options: ["full", "semiSquared"], if: { arg: "composition", eq: "single" }, table: { category: "Avatar" } },
    size: { name: "Tamaño", control: "select", options: avatarSizes, if: { arg: "composition", eq: "single" }, table: { category: "Avatar" } },
    initials: { name: "Iniciales", control: "text", if: { arg: "content", eq: "text" }, table: { category: "Contenido" } },
    status: { name: "Estado", control: "select", options: ["none", "online", "away", "busy"], if: { arg: "composition", eq: "single" }, table: { category: "Indicadores" } },
    border: { name: "Borde", control: "select", options: ["default", "success", "warning", "error", "brand", "white"], if: { arg: "composition", eq: "single" }, table: { category: "Indicadores" } },
    services: { name: "Servicios", control: "boolean", if: { arg: "composition", eq: "single" }, table: { category: "Indicadores" } },
    groupQuantity: { name: "Cantidad", control: "inline-radio", options: [1, 2, 3, 4], if: { arg: "composition", eq: "group" }, table: { category: "Grupo" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=246-2681" } },
  render: args => <AvatarExample {...args} />,
} satisfies Meta<AvatarExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    if (args.composition === "group") {
      await expect(canvasElement.querySelector("[data-slot=avatar-group]")).toBeVisible()
    } else {
      const avatar = canvasElement.querySelector<HTMLElement>("[data-slot=avatar]")
      await expect(avatar).toBeVisible()
      await expect(avatar?.getBoundingClientRect().width).toBe(args.size)
      await expect(avatar?.getBoundingClientRect().height).toBe(args.size)
    }
  },
}
