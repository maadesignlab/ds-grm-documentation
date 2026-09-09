import type { ComponentProps } from "react"
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

export type AttachmentState = "idle" | "uploading" | "processing" | "error" | "done"
export type AttachmentExampleProps = Omit<ComponentProps<typeof Attachment>, "children"> & {
  state?: AttachmentState
  media?: "icon" | "image"
  title?: string
  showAction?: boolean
  showTrigger?: boolean
}

const descriptions: Record<AttachmentState, string> = {
  idle: "Ready to upload",
  uploading: "Uploading · 64%",
  processing: "Processing document",
  error: "Upload failed. Try again.",
  done: "Uploaded · 1.8 MB",
}

function StateMedia({ state, media }: Pick<AttachmentExampleProps, "state" | "media">) {
  if (state === "uploading" || state === "processing") return <Spinner />
  if (state === "done") return <CircleCheck aria-hidden />
  if (media === "image") return <File aria-hidden />
  return <Paperclip aria-hidden />
}

export function AttachmentExample({
  state = "idle",
  size = "default",
  orientation = "horizontal",
  media = "icon",
  title = "documento-paciente.pdf",
  showAction = true,
  showTrigger = false,
  ...props
}: AttachmentExampleProps) {
  return (
    <Attachment state={state} size={size} orientation={orientation} {...props}>
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
  )
}
