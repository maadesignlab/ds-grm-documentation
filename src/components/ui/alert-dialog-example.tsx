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

export type AlertDialogExampleProps = {
  size?: "basic" | "sm"
  status?: "default" | "destructive"
  showMedia?: boolean
  title?: string
  description?: string
  cancelLabel?: string
  actionLabel?: string
  inline?: boolean
}

export function AlertDialogExample({
  size = "basic",
  status = "default",
  showMedia = false,
  title = "¿Deseas eliminar este registro?",
  description = "Esta acción no se puede deshacer",
  cancelLabel = "Cancelar",
  actionLabel = "Eliminar",
  inline = false,
}: AlertDialogExampleProps) {
  return (
    <AlertDialog open={inline ? true : undefined} defaultOpen={inline ? undefined : true}>
      {!inline && <AlertDialogTrigger asChild><Button variant="outline">Abrir Alert Dialog</Button></AlertDialogTrigger>}
      <AlertDialogContent size={size} status={status} inline={inline}>
        <AlertDialogHeader>
          {showMedia && <AlertDialogMedia><Trash2 aria-hidden /></AlertDialogMedia>}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={size === "basic" ? "w-21" : undefined}>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction variant={status === "destructive" ? "destructive" : "default"}>{actionLabel}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
