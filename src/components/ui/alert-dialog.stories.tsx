import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Trash2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog"
import { Button } from "./button"

type AlertDialogStoryArgs = {
  size: "basic" | "sm"
  status: "default" | "destructive"
  showMedia: boolean
  title: string
  description: string
  cancelLabel: string
  actionLabel: string
}

const meta = {
  title: "Components/Alert Dialog",
  args: {
    size: "basic",
    status: "default",
    showMedia: false,
    title: "¿Deseas eliminar este registro?",
    description: "Esta acción no se puede deshacer",
    cancelLabel: "Cancelar",
    actionLabel: "Eliminar",
  },
  argTypes: {
    size: { name: "Tamaño", table: { category: "Alert Dialog" }, control: "inline-radio", options: ["basic", "sm"] },
    status: { name: "Estado", table: { category: "Alert Dialog" }, control: "inline-radio", options: ["default", "destructive"] },
    showMedia: { name: "Mostrar media", table: { category: "Composición" }, control: "boolean" },
    title: { name: "Título", table: { category: "Contenido" }, control: "text" },
    description: { name: "Descripción", table: { category: "Contenido" }, control: "text" },
    cancelLabel: { name: "Cancelar", table: { category: "Acciones" }, control: "text" },
    actionLabel: { name: "Confirmar", table: { category: "Acciones" }, control: "text" },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1187-612" },
  },
  render: ({ size, status, showMedia, title, description, cancelLabel, actionLabel }) => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger asChild><Button variant="outline">Abrir Alert Dialog</Button></AlertDialogTrigger>
      <AlertDialogContent size={size} status={status}>
        <AlertDialogHeader>
          {showMedia && <AlertDialogMedia><Trash2 aria-hidden /></AlertDialogMedia>}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={size === "basic" ? "w-[84px]" : undefined}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction variant={status === "destructive" ? "destructive" : "default"}>{actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
} satisfies Meta<AlertDialogStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
