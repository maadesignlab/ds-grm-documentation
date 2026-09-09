import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CardExample, type CardExampleProps } from "./card-example"

const meta = {
  title: "Components/Card",
  args: { size: "default", variant: "body", spacing: 16, footer: "column", showAction: true, title: "Login to your account", description: "Enter your email below to login to your account" },
  argTypes: {
    size: { name: "Tamaño", control: "inline-radio", options: ["default", "sm"], table: { category: "Card" } },
    variant: { name: "Estilo", control: "inline-radio", options: ["body", "image"], table: { category: "Card" } },
    spacing: { name: "Espaciado", control: "select", options: [12, 16, 20, 24, 32], table: { category: "Card" } },
    footer: { name: "Footer", control: "inline-radio", options: ["column", "row", "wrap"], table: { category: "Composición" } },
    showAction: { name: "Acción en header", control: "boolean", table: { category: "Composición" } },
    title: { name: "Título", control: "text", table: { category: "Contenido" } },
    description: { name: "Descripción", control: "text", table: { category: "Contenido" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1798-3431" } },
  render: args => <CardExample {...args} />,
} satisfies Meta<CardExampleProps>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
