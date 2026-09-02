"use client"

import { Button } from "./button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card"

export type HoverCardExampleProps = {
  triggerType?: "button" | "text"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  opened?: boolean
  openDelay?: number
  closeDelay?: number
}

export function HoverCardExample({
  triggerType = "button",
  side = "top",
  align = "center",
  opened = false,
  openDelay = 700,
  closeDelay = 300,
}: HoverCardExampleProps) {
  return (
    <HoverCard
      open={opened ? true : undefined}
      openDelay={openDelay}
      closeDelay={closeDelay}
    >
      <HoverCardTrigger asChild>
        {triggerType === "button" ? (
          <Button>Descargar informe</Button>
        ) : (
          <button
            type="button"
            className="font-sans text-sm leading-5 text-foreground"
          >
            Descargar informe
          </button>
        )}
      </HoverCardTrigger>
      <HoverCardContent side={side} align={align}>
        <div className="flex flex-col gap-0.5">
          <p className="m-0 text-sm font-semibold leading-5">
            Descarga de informe
          </p>
          <p className="m-0 text-sm font-normal leading-5">
            El informe se descargará en los formatos seleccionados
          </p>
          <p className="m-0 pt-1 text-xs font-normal leading-4 text-muted-foreground">
            XLSX, XML, PDF
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
