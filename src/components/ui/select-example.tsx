"use client"

import { Fragment } from "react"
import { CircleIcon, DiamondIcon, SquareIcon, TriangleIcon } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select"

export type SelectExampleProps = {
  type?: "simple" | "groups" | "scrollable"
  state?: "default" | "invalid" | "disabled"
  size?: "sm" | "default"
  position?: "item-aligned" | "popper"
  filled?: boolean
  initiallyOpen?: boolean
  icons?: boolean
}

export const selectPlaygroundArgs = {
  type: "simple",
  state: "default",
  size: "default",
  position: "item-aligned",
  filled: false,
  initiallyOpen: false,
  icons: false,
} as const satisfies SelectExampleProps

export const selectExamplePresets = {
  playground: selectPlaygroundArgs,
  simple: { ...selectPlaygroundArgs },
  icons: { ...selectPlaygroundArgs, filled: true, icons: true },
  groups: { ...selectPlaygroundArgs, type: "groups" },
  scrollable: { ...selectPlaygroundArgs, type: "scrollable" },
  placeholder: { ...selectPlaygroundArgs, filled: false },
  filled: { ...selectPlaygroundArgs, filled: true },
  invalid: { ...selectPlaygroundArgs, state: "invalid" },
  disabled: { ...selectPlaygroundArgs, state: "disabled" },
  defaultSize: { ...selectPlaygroundArgs, size: "default" },
  smallSize: { ...selectPlaygroundArgs, size: "sm" },
  itemAligned: { ...selectPlaygroundArgs, position: "item-aligned" },
  popper: { ...selectPlaygroundArgs, position: "popper" },
} as const satisfies Record<string, SelectExampleProps>

const simpleItems = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"]
const groups = [
  { label: "Grupo 1", items: ["Opción 1", "Opción 2", "Opción 3"] },
  { label: "Grupo 2", items: ["Opción 4", "Opción 5", "Opción 6"] },
]
const scrollableGroups = [
  { label: "América", items: ["Bogotá", "Ciudad de México", "Lima", "Nueva York"] },
  { label: "Europa", items: ["Londres", "Madrid", "París", "Roma"] },
  { label: "Asia", items: ["Seúl", "Singapur", "Tokio"] },
]
const itemIcons = [CircleIcon, SquareIcon, TriangleIcon, DiamondIcon]

export function SelectExample({
  type = "simple",
  state = "default",
  size = "default",
  position = "item-aligned",
  filled = false,
  initiallyOpen = false,
  icons = false,
}: SelectExampleProps) {
  const groupedItems = type === "scrollable" ? scrollableGroups : groups
  const width = type === "scrollable" ? "w-[280px]" : "w-[180px]"

  return (
    <div className={`select-example ${width}`}>
      <Select
        defaultOpen={initiallyOpen}
        defaultValue={filled ? (type === "scrollable" ? "bogotá" : "opción-1") : undefined}
        disabled={state === "disabled"}
        key={`${type}-${state}-${size}-${position}-${filled}-${initiallyOpen}-${icons}`}
      >
        <SelectTrigger aria-invalid={state === "invalid" || undefined} className={width} size={size}>
          <SelectValue placeholder={type === "scrollable" ? "Selecciona una zona horaria" : "Selecciona una opción"} />
        </SelectTrigger>
        <SelectContent position={position}>
          {type === "simple" ? (
            <SelectGroup>
              <SelectLabel>Opciones</SelectLabel>
              {simpleItems.map((item, index) => {
                const Icon = itemIcons[index % itemIcons.length]
                return <SelectItem key={item} value={item.toLocaleLowerCase().replaceAll(" ", "-")}>{icons && <Icon aria-hidden="true" />}{item}</SelectItem>
              })}
            </SelectGroup>
          ) : groupedItems.map((group, groupIndex) => (
            <Fragment key={group.label}>
              {groupIndex > 0 && <SelectSeparator />}
              <SelectGroup>
                <SelectLabel>{group.label}</SelectLabel>
                {group.items.map((item, index) => {
                  const Icon = itemIcons[index % itemIcons.length]
                  return <SelectItem key={item} value={item.toLocaleLowerCase().replaceAll(" ", "-")}>{icons && <Icon aria-hidden="true" />}{item}</SelectItem>
                })}
              </SelectGroup>
            </Fragment>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
