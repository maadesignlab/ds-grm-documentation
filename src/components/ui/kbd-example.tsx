"use client"

import { CommandIcon, SearchIcon } from "lucide-react"

import { Button } from "./button"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import { Kbd, KbdGroup } from "./kbd"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"

export type KbdExampleProps = {
  composition?: "single" | "group" | "button" | "tooltip" | "input-group"
  content?: "text" | "icon"
  text?: string
  tooltipOpen?: boolean
}

export const kbdPlaygroundArgs = {
  composition: "single",
  content: "text",
  text: "Ctrl",
  tooltipOpen: false,
} as const satisfies KbdExampleProps

export const kbdExamplePresets = {
  playground: kbdPlaygroundArgs,
  text: { ...kbdPlaygroundArgs },
  icon: { ...kbdPlaygroundArgs, content: "icon" },
  group: { ...kbdPlaygroundArgs, composition: "group" },
  button: { ...kbdPlaygroundArgs, composition: "button" },
  tooltip: { ...kbdPlaygroundArgs, composition: "tooltip", tooltipOpen: true },
  inputGroup: { ...kbdPlaygroundArgs, composition: "input-group" },
} as const satisfies Record<string, KbdExampleProps>

function Key({ content, text }: Pick<KbdExampleProps, "content" | "text">) {
  return <Kbd>{content === "icon" ? <CommandIcon aria-label="Command" /> : text}</Kbd>
}

function Shortcut() {
  return <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>B</Kbd></KbdGroup>
}

export function KbdExample({ composition = "single", content = "text", text = "Ctrl", tooltipOpen = false }: KbdExampleProps) {
  if (composition === "group") return <Shortcut />

  if (composition === "button") return <Button variant="outline">Aceptar <Kbd>↵</Kbd></Button>

  if (composition === "tooltip") {
    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip open={tooltipOpen ? true : undefined}>
          <TooltipTrigger asChild><Button variant="outline">Guardar</Button></TooltipTrigger>
          <TooltipContent>Guardar <KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>S</Kbd></KbdGroup></TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  if (composition === "input-group") {
    return (
      <InputGroup className="w-[240px]">
        <InputGroupAddon><SearchIcon aria-hidden="true" /></InputGroupAddon>
        <InputGroupInput placeholder="Buscar..." />
        <InputGroupAddon align="inline-end"><KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></InputGroupAddon>
      </InputGroup>
    )
  }

  return <Key content={content} text={text} />
}
