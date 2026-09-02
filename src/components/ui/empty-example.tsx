import { FolderX } from "lucide-react"

import { Avatar, AvatarFallback } from "./avatar"
import { Button } from "./button"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./empty"
import { Spinner } from "./spinner"

export type EmptyExampleProps = {
  container?: "none" | "outline"
  media?: "icon" | "avatar" | "spinner" | "none"
  actions?: "both" | "primary" | "none"
  actionLayout?: "horizontal" | "vertical"
  showAuxiliary?: boolean
}

export function EmptyExample({ container = "none", media = "icon", actions = "both", actionLayout = "horizontal", showAuxiliary = true }: EmptyExampleProps) {
  return (
    <Empty className={container === "outline" ? "border" : undefined}>
      <EmptyHeader>
        {media === "icon" && <EmptyMedia variant="icon"><FolderX /></EmptyMedia>}
        {media === "avatar" && <EmptyMedia><Avatar size="lg"><AvatarFallback>RM</AvatarFallback></Avatar></EmptyMedia>}
        {media === "spinner" && <EmptyMedia><Spinner size={24} /></EmptyMedia>}
        <EmptyTitle>No hay pacientes registrados</EmptyTitle>
        <EmptyDescription>Registra un paciente para comenzar a gestionar su información clínica.</EmptyDescription>
      </EmptyHeader>
      {actions !== "none" && (
        <EmptyContent className={actionLayout === "horizontal" ? "flex-row justify-center" : undefined}>
          <Button className={actionLayout === "vertical" ? "w-full" : undefined}>Registrar paciente</Button>
          {actions === "both" && <Button variant="outline" className={actionLayout === "vertical" ? "w-full" : undefined}>Importar pacientes</Button>}
        </EmptyContent>
      )}
      {showAuxiliary && <Button variant="link" size="sm">Conocer más</Button>}
    </Empty>
  )
}
