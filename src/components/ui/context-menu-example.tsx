"use client"

import { useEffect, useRef } from "react"
import { Building2, CalendarDays, Copy, Scissors, Trash2 } from "lucide-react"

import {
  ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuItem,
  ContextMenuLabel, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub,
  ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger,
} from "./context-menu"

export type ContextMenuExampleProps = {
  opened?: boolean
  showLabel?: boolean
  showIcons?: boolean
  showShortcut?: boolean
  showSubmenu?: boolean
}

export function ContextMenuExample({ opened = false, showLabel = true, showIcons = true, showShortcut = true, showSubmenu = true }: ContextMenuExampleProps) {
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!opened || !triggerRef.current) return
    const trigger = triggerRef.current
    const frame = requestAnimationFrame(() => {
      const rect = trigger.getBoundingClientRect()
      const clientX = rect.left + rect.width / 2
      const clientY = rect.top + rect.height / 2
      trigger.dispatchEvent(new MouseEvent("contextmenu", { bubbles: true, cancelable: true, clientX, clientY, button: 2 }))
    })
    return () => cancelAnimationFrame(frame)
  }, [opened])

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div ref={triggerRef} className="flex h-48 w-full min-w-72 max-w-lg items-center justify-center rounded-lg border border-dashed border-border bg-muted/50 p-6 font-sans text-sm text-muted-foreground">Haz clic derecho aquí</div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        {showLabel && <ContextMenuLabel>Acciones</ContextMenuLabel>}
        <ContextMenuGroup>
          <ContextMenuItem>{showIcons && <CalendarDays />}Citas médicas{showShortcut && <ContextMenuShortcut>⌘M</ContextMenuShortcut>}</ContextMenuItem>
          <ContextMenuItem>{showIcons && <Copy />}Duplicar{showShortcut && <ContextMenuShortcut>⌘D</ContextMenuShortcut>}</ContextMenuItem>
          {showSubmenu && <ContextMenuSub><ContextMenuSubTrigger>{showIcons && <Building2 />}Sucursales</ContextMenuSubTrigger><ContextMenuSubContent><ContextMenuItem>Norte</ContextMenuItem><ContextMenuItem>Centro</ContextMenuItem><ContextMenuItem>Sur</ContextMenuItem></ContextMenuSubContent></ContextMenuSub>}
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>{showIcons && <Scissors />}Recortar{showShortcut && <ContextMenuShortcut>⌘X</ContextMenuShortcut>}</ContextMenuItem>
        <ContextMenuItem variant="destructive">{showIcons && <Trash2 />}Eliminar{showShortcut && <ContextMenuShortcut>⌫</ContextMenuShortcut>}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
