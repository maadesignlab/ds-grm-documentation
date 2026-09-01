import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CircleCheck, File, Paperclip, RotateCw, X } from "lucide-react"

import { Spinner } from "./spinner"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "./attachment"

type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done"
type AttachmentStoryArgs = ComponentProps<typeof Attachment> & {
  state: AttachmentState
  media: "icon" | "image"
  title: string
  showAction: boolean
  showTrigger: boolean
}

const descriptions: Record<AttachmentState, string> = {
  idle: "Ready to upload",
  uploading: "Uploading · 64%",
  processing: "Processing document",
  error: "Upload failed. Try again.",
  done: "Uploaded · 1.8 MB",
}

function StateMedia({ state, media }: Pick<AttachmentStoryArgs, "state" | "media">) {
  if (state === "uploading" || state === "processing") return <Spinner />
  if (state === "done") return <CircleCheck aria-hidden />
  if (media === "image") return <File aria-hidden />
  return <Paperclip aria-hidden />
}

const meta = {
  title: "Components/Attachment",
  component: Attachment,
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
    children: { table: { disable: true } },
    className: { table: { disable: true } },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2827-14904" },
  },
  render: ({ state, size, orientation, media, title, showAction, showTrigger }) => (
    <Attachment state={state} size={size} orientation={orientation}>
      <AttachmentMedia variant={media}><StateMedia state={state} media={media} /></AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>{title}</AttachmentTitle>
        <AttachmentDescription>{descriptions[state]}</AttachmentDescription>
      </AttachmentContent>
      {showAction && (
        <AttachmentActions>
          {state === "error" && <AttachmentAction aria-label="Reintentar"><RotateCw /></AttachmentAction>}
          <AttachmentAction aria-label="Eliminar archivo"><X /></AttachmentAction>
        </AttachmentActions>
      )}
      {showTrigger && <AttachmentTrigger aria-label={`Abrir ${title}`} />}
    </Attachment>
  ),
} satisfies Meta<AttachmentStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
