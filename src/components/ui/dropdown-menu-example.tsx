"use client"

import { Building2, Download, Expand, Grid2X2, MoreHorizontal, User, Users } from "lucide-react"

import { Button } from "./button"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub,
  DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger,
} from "./dropdown-menu"

export type DropdownMenuExampleProps = {
  align?: "start" | "end"
  trigger?: "button" | "icon"
  defaultOpen?: boolean
  showLabel?: boolean
  showIcons?: boolean
  showSubmenu?: boolean
}

export function DropdownMenuExample({ align = "start", trigger = "button", defaultOpen = false, showLabel = true, showIcons = true, showSubmenu = true }: DropdownMenuExampleProps) {
  return (
    <DropdownMenu defaultOpen={defaultOpen}>
      <DropdownMenuTrigger asChild>
        {trigger === "icon" ? <Button size="icon" aria-label="Abrir ajustes"><MoreHorizontal /></Button> : <Button>Ajustes</Button>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {showLabel && <DropdownMenuLabel>Vista</DropdownMenuLabel>}
        <DropdownMenuGroup>
          <DropdownMenuItem>{showIcons && <Grid2X2 />}Pantalla dividida</DropdownMenuItem>
          <DropdownMenuItem>{showIcons && <Expand />}Pantalla completa</DropdownMenuItem>
          {showSubmenu && <DropdownMenuSub><DropdownMenuSubTrigger>{showIcons && <Building2 />}Sucursales</DropdownMenuSubTrigger><DropdownMenuSubContent><DropdownMenuItem>Norte</DropdownMenuItem><DropdownMenuItem>Centro</DropdownMenuItem><DropdownMenuItem>Sur</DropdownMenuItem></DropdownMenuSubContent></DropdownMenuSub>}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>{showIcons && <User />}Pacientes</DropdownMenuItem>
          <DropdownMenuItem>{showIcons && <Users />}Familias</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>{showIcons && <Download />}Descargar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
