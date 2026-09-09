import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BadgeExample, type BadgeExampleProps } from "./badge-example"

const meta = {
  title: "Components/Badge",
  component: BadgeExample,
  args: {
    children: "Badge",
    variant: "primary",
    appearance: "solid",
    size: "lg",
    leftContent: "none",
    rightContent: "none",
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=186-141",
    },
  },
  argTypes: {
    variant: {
      name: "Estilo",
      table: { category: "Apariencia" },
      control: "select",
      options: ["primary", "secondary", "brand-neutral", "transparent", "success", "warning", "error", "destructive", "info"],
    },
    appearance: {
      name: "Borde",
      table: { category: "Apariencia" },
      control: "inline-radio",
      options: ["solid", "outline"],
    },
    size: {
      name: "Tamaño",
      table: { category: "Tamaño" },
      control: "inline-radio",
      options: ["xl", "lg", "md", "sm"],
    },
    children: {
      name: "Texto",
      table: { category: "Contenido" },
      control: "text",
    },
    leftContent: {
      name: "Contenido izquierdo",
      table: { category: "Contenido" },
      control: "inline-radio",
      options: ["none", "icon", "spinner"],
    },
    rightContent: {
      name: "Contenido derecho",
      table: { category: "Contenido" },
      control: "inline-radio",
      options: ["none", "icon", "spinner"],
    },
    asChild: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  render: args => <BadgeExample {...args} />,
} satisfies Meta<BadgeExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
