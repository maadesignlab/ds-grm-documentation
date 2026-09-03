"use client"

import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "./popover"

export type PopoverExampleProps = {
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  opened?: boolean
  content?: "basic" | "form"
}

export function PopoverExample({ align = "start", side = "bottom", opened = false, content = "basic" }: PopoverExampleProps) {
  return (
    <Popover open={opened ? true : undefined}>
      <PopoverTrigger render={<Button variant="outline" size="lg" />}>Button</PopoverTrigger>
      <PopoverContent align={align} side={side}>
        <PopoverHeader>
          <PopoverTitle>{content === "form" ? "Dimensiones" : "Información"}</PopoverTitle>
          <PopoverDescription>{content === "form" ? "Configura las dimensiones del elemento." : "Contenido contextual relacionado con el trigger."}</PopoverDescription>
        </PopoverHeader>
        {content === "form" &&
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4"><Label htmlFor="popover-width">Ancho</Label><Input id="popover-width" defaultValue="100%" className="col-span-2" /></div>
            <div className="grid grid-cols-3 items-center gap-4"><Label htmlFor="popover-height">Alto</Label><Input id="popover-height" defaultValue="auto" className="col-span-2" /></div>
          </div>
        }
      </PopoverContent>
    </Popover>
  )
}
