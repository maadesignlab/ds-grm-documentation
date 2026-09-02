"use client"

import { Info } from "lucide-react"

import { Badge } from "./badge"
import { Button } from "./button"
import { Kbd, KbdGroup } from "./kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip"

export type TooltipExampleProps = {
  triggerType?: "button" | "icon" | "badge" | "text"
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  opened?: boolean
  showShortcut?: boolean
  delayDuration?: number
  avoidCollisions?: boolean
}

export function TooltipExample({
  triggerType = "button",
  side = "top",
  align = "center",
  opened = false,
  showShortcut = false,
  delayDuration = 0,
  avoidCollisions = true,
}: TooltipExampleProps) {
  const trigger = {
    button: <Button>Button</Button>,
    icon: <Button size="icon" aria-label="Información"><Info /></Button>,
    badge: <Badge variant="primary" size="lg">Badge</Badge>,
    text: <button type="button" className="font-sans text-sm leading-5 text-foreground">Text</button>,
  }[triggerType]

  return (
    <TooltipProvider delayDuration={delayDuration}>
      <Tooltip open={opened ? true : undefined}>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent side={side} align={align} avoidCollisions={avoidCollisions}>
          <span>Tooltip text</span>
          {showShortcut && <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
