import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { FilePenLine } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"
import { Button } from "./button"

type AlertStoryArgs = {
  variant: "default" | "destructive"
  title: string
  description: string
  showIcon: boolean
  showAction: boolean
  actionLabel: string
}

const meta = {
  title: "Components/Alert",
  component: Alert,
  args: {
    variant: "default",
    title: "Nueva cita asignada",
    description: "Se ha asignado una nueva cita al paciente por atención en Recepción",
    showIcon: true,
    showAction: true,
    actionLabel: "Ver detalle",
  },
  argTypes: {
    variant: { name: "Estado", table: { category: "Alert" }, control: "inline-radio", options: ["default", "destructive"] },
    title: { name: "Título", table: { category: "Contenido" }, control: "text" },
    description: { name: "Descripción", table: { category: "Contenido" }, control: "text" },
    showIcon: { name: "Mostrar icono", table: { category: "Composición" }, control: "boolean" },
    showAction: { name: "Mostrar acción", table: { category: "Composición" }, control: "boolean" },
    actionLabel: { name: "Texto de la acción", table: { category: "Composición" }, control: "text" },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1178-530" },
  },
  render: ({ variant, title, description, showIcon, showAction, actionLabel }) => (
    <Alert variant={variant}>
      {showIcon && <FilePenLine aria-hidden />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {showAction && <AlertAction><Button size="xs">{actionLabel}</Button></AlertAction>}
    </Alert>
  ),
} satisfies Meta<AlertStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
