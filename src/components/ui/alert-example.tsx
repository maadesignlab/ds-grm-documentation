import { FilePenLine } from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert"
import { Button } from "./button"

export type AlertExampleProps = {
  variant?: "default" | "destructive"
  title?: string
  description?: string
  showIcon?: boolean
  showAction?: boolean
  actionLabel?: string
}

export function AlertExample({
  variant = "default",
  title = "Nueva cita asignada",
  description = "Se ha asignado una nueva cita al paciente por atención en Recepción",
  showIcon = true,
  showAction = true,
  actionLabel = "Ver detalle",
}: AlertExampleProps) {
  return (
    <Alert variant={variant}>
      {showIcon && <FilePenLine aria-hidden />}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      {showAction && <AlertAction><Button size="xs">{actionLabel}</Button></AlertAction>}
    </Alert>
  )
}
