import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AlertExample, type AlertExampleProps } from "./alert-example"

const meta = {
  title: "Components/Alert",
  component: AlertExample,
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
  render: args => <AlertExample {...args} />,
} satisfies Meta<AlertExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
