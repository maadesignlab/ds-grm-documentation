import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { MoreHorizontal } from "lucide-react"

import { Button } from "./button"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"

type CardStoryArgs = {
  size: "default" | "sm"
  variant: "body" | "image"
  spacing: 12 | 16 | 20 | 24 | 32
  footer: "column" | "row" | "wrap"
  showAction: boolean
  title: string
  description: string
}

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
  render: ({ size, variant, spacing, footer, showAction, title, description }) => (
    <Card size={size} variant={variant} spacing={spacing} className="h-[361px]">
      {variant === "image" && <div className="min-h-0 w-full flex-1 bg-muted" aria-label="Área de imagen" />}
      <CardHeader>
        <CardTitle>{title}</CardTitle><CardDescription>{description}</CardDescription>
        {showAction && <CardAction><Button variant="ghost" size="icon"><MoreHorizontal aria-hidden /></Button></CardAction>}
      </CardHeader>
      {variant === "body" && <CardContent className="flex flex-1 items-center text-muted-foreground">Contenido flexible de la tarjeta</CardContent>}
      <CardFooter layout={footer}>
        <Button variant="outline">Cancelar</Button><Button>Continuar</Button>
      </CardFooter>
    </Card>
  ),
} satisfies Meta<CardStoryArgs>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
