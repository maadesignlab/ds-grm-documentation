import type { ComponentProps, ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ArrowDown, Loader2 } from "lucide-react"

import { Badge } from "./badge"

type Content = "none" | "icon" | "spinner"
type BadgeStoryArgs = ComponentProps<typeof Badge> & {
  leftContent: Content
  rightContent: Content
}

const content = {
  none: null,
  icon: <ArrowDown aria-hidden />,
  spinner: <Loader2 className="animate-spin" aria-hidden />,
} satisfies Record<Content, ReactNode>

const meta = {
  title: "Components/Badge",
  component: Badge,
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
  render: ({ leftContent, rightContent, children, ...args }) => (
    <Badge
      {...args}
      appearance={args.variant === "transparent" ? "outline" : args.appearance}
    >
      {content[leftContent]}
      {children}
      {content[rightContent]}
    </Badge>
  ),
} satisfies Meta<BadgeStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
