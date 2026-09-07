"use client"

import {
  Building2, Download, Expand, Grid2X2, Printer, Redo2, Scissors,
  Undo2, User, Users,
} from "lucide-react"

import {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem,
  MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem,
  MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent,
  MenubarSubTrigger, MenubarTrigger,
} from "./menubar"

export type MenubarExampleProps = {
  optionCount?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  defaultOpen?: boolean
  activeOption?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  disabledOption?: number | "none"
}

export const menubarPlaygroundArgs = {
  optionCount: 3,
  defaultOpen: false,
  activeOption: 1,
  disabledOption: "none",
} as const satisfies MenubarExampleProps

export const menubarExamplePresets = {
  playground: menubarPlaygroundArgs,
  closed: { ...menubarPlaygroundArgs },
  open: { ...menubarPlaygroundArgs, defaultOpen: true },
  one: { ...menubarPlaygroundArgs, optionCount: 1 },
  three: { ...menubarPlaygroundArgs, optionCount: 3 },
  six: { ...menubarPlaygroundArgs, optionCount: 6 },
  ten: { ...menubarPlaygroundArgs, optionCount: 10 },
  checkbox: { ...menubarPlaygroundArgs, optionCount: 3, defaultOpen: true, activeOption: 3 },
  radio: { ...menubarPlaygroundArgs, optionCount: 5, defaultOpen: true, activeOption: 5 },
} as const satisfies Record<string, MenubarExampleProps>

const options = [
  { value: "archivo", label: "Archivo" },
  { value: "editar", label: "Editar" },
  { value: "ver", label: "Ver" },
  { value: "ayuda", label: "Ayuda" },
  { value: "ventana", label: "Ventana" },
  { value: "formato", label: "Formato" },
  { value: "herramientas", label: "Herramientas" },
  { value: "historial", label: "Historial" },
  { value: "favoritos", label: "Favoritos" },
  { value: "cuenta", label: "Cuenta" },
] as const

function FileContent() {
  return <>
    <MenubarGroup className="mb-1">
      <MenubarLabel>Vista</MenubarLabel>
      <MenubarItem><Grid2X2 />Pantalla dividida<MenubarShortcut>⌘D</MenubarShortcut></MenubarItem>
      <MenubarItem><Expand />Pantalla completa<MenubarShortcut>⌘F</MenubarShortcut></MenubarItem>
      <MenubarSub>
        <MenubarSubTrigger><Building2 />Sucursales</MenubarSubTrigger>
        <MenubarSubContent><MenubarItem>Norte</MenubarItem><MenubarItem>Centro</MenubarItem><MenubarItem>Sur</MenubarItem></MenubarSubContent>
      </MenubarSub>
    </MenubarGroup>
    <MenubarGroup className="mb-1"><MenubarItem><User />Pacientes</MenubarItem><MenubarItem><Users />Familias</MenubarItem></MenubarGroup>
    <MenubarItem><Download />Descargar</MenubarItem>
  </>
}

function EditContent() {
  return <>
    <MenubarItem><Undo2 />Deshacer<MenubarShortcut>⌘Z</MenubarShortcut></MenubarItem>
    <MenubarItem><Redo2 />Rehacer<MenubarShortcut>⇧⌘Z</MenubarShortcut></MenubarItem>
    <MenubarSeparator />
    <MenubarItem><Scissors />Cortar<MenubarShortcut>⌘X</MenubarShortcut></MenubarItem>
    <MenubarItem>Copiar<MenubarShortcut>⌘C</MenubarShortcut></MenubarItem>
    <MenubarItem>Pegar<MenubarShortcut>⌘V</MenubarShortcut></MenubarItem>
  </>
}

function ViewContent() {
  return <>
    <MenubarCheckboxItem checked>Mostrar barra lateral</MenubarCheckboxItem>
    <MenubarCheckboxItem>Mostrar estado</MenubarCheckboxItem>
    <MenubarSeparator />
    <MenubarItem><Printer />Imprimir<MenubarShortcut>⌘P</MenubarShortcut></MenubarItem>
  </>
}

function WindowContent() {
  return <MenubarRadioGroup value="principal">
    <MenubarRadioItem value="principal">Ventana principal</MenubarRadioItem>
    <MenubarRadioItem value="secundaria">Ventana secundaria</MenubarRadioItem>
  </MenubarRadioGroup>
}

function GenericContent({ label }: { label: string }) {
  return <><MenubarItem>Nueva acción</MenubarItem><MenubarItem>Configurar {label.toLowerCase()}</MenubarItem><MenubarItem disabled>No disponible</MenubarItem></>
}

function MenuContent({ value, label }: { value: string; label: string }) {
  if (value === "archivo") return <FileContent />
  if (value === "editar") return <EditContent />
  if (value === "ver") return <ViewContent />
  if (value === "ventana") return <WindowContent />
  return <GenericContent label={label} />
}

export function MenubarExample({
  optionCount = 3,
  defaultOpen = false,
  activeOption = 1,
  disabledOption = "none",
}: MenubarExampleProps) {
  const visibleOptions = options.slice(0, optionCount)
  const safeActiveIndex = Math.min(activeOption, optionCount) - 1
  const defaultValue = defaultOpen ? visibleOptions[safeActiveIndex]?.value : undefined

  return (
    <Menubar defaultValue={defaultValue}>
      {visibleOptions.map((option, index) => (
        <MenubarMenu key={option.value} value={option.value}>
          <MenubarTrigger disabled={disabledOption === index + 1}>{option.label}</MenubarTrigger>
          <MenubarContent className="w-44">
            <MenuContent value={option.value} label={option.label} />
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  )
}
