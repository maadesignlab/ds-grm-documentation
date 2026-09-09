import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { AttachmentExample, type AttachmentExampleProps } from "./attachment-example"

const meta = {
  title: "Components/Attachment",
  component: AttachmentExample,
  args: {
    state: "idle",
    size: "default",
    orientation: "horizontal",
    media: "icon",
    title: "documento-paciente.pdf",
    showAction: true,
    showTrigger: false,
  },
  argTypes: {
    state: { name: "Estado", table: { category: "Attachment" }, control: "select", options: ["idle", "uploading", "processing", "error", "done"] },
    size: { name: "Tamaño", table: { category: "Attachment" }, control: "inline-radio", options: ["default", "sm", "xs"] },
    orientation: { name: "Orientación", table: { category: "Attachment" }, control: "inline-radio", options: ["horizontal", "vertical"] },
    media: { name: "Media", table: { category: "Contenido" }, control: "inline-radio", options: ["icon", "image"] },
    title: { name: "Nombre del archivo", table: { category: "Contenido" }, control: "text" },
    showAction: { name: "Mostrar acciones", table: { category: "Acciones" }, control: "boolean" },
    showTrigger: { name: "Área interactiva", table: { category: "Acciones" }, control: "boolean" },
    className: { table: { disable: true } },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2827-14904" },
  },
  render: args => <AttachmentExample {...args} />,
} satisfies Meta<AttachmentExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
