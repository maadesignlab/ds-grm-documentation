"use client"

import { CircleIcon, DiamondIcon, SquareIcon, TriangleIcon } from "lucide-react"

import { Button } from "./button"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxValue,
} from "./combobox"

export type ComboboxExampleProps = {
  type?: "simple" | "groups" | "multiple" | "popup"
  state?: "default" | "invalid" | "disabled"
  filled?: boolean
  initiallyOpen?: boolean
  showClear?: boolean
  autoHighlight?: boolean
  icons?: boolean
}

export const comboboxPlaygroundArgs = {
  type: "simple",
  state: "default",
  filled: false,
  initiallyOpen: false,
  showClear: false,
  autoHighlight: false,
  icons: false,
} as const satisfies ComboboxExampleProps

export const comboboxExamplePresets = {
  playground: comboboxPlaygroundArgs,
  simple: { ...comboboxPlaygroundArgs },
  clear: { ...comboboxPlaygroundArgs, filled: true, showClear: true },
  groups: { ...comboboxPlaygroundArgs, type: "groups" },
  multiple: { ...comboboxPlaygroundArgs, type: "multiple", filled: true },
  popup: { ...comboboxPlaygroundArgs, type: "popup" },
  placeholder: { ...comboboxPlaygroundArgs },
  filled: { ...comboboxPlaygroundArgs, filled: true },
  invalid: { ...comboboxPlaygroundArgs, state: "invalid" },
  disabled: { ...comboboxPlaygroundArgs, state: "disabled" },
  autoHighlight: { ...comboboxPlaygroundArgs, autoHighlight: true },
  icons: { ...comboboxPlaygroundArgs, icons: true },
} as const satisfies Record<string, ComboboxExampleProps>

const options = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"]
const groups = [
  { label: "Grupo 1", items: ["Opción 1", "Opción 2", "Opción 3"] },
  { label: "Grupo 2", items: ["Opción 4", "Opción 5", "Opción 6"] },
]
const itemIcons = [CircleIcon, SquareIcon, TriangleIcon, DiamondIcon]

function Item({ item, index, icons }: { item: string; index: number; icons: boolean }) {
  const Icon = itemIcons[index % itemIcons.length]
  return <ComboboxItem value={item}>{icons && <Icon aria-hidden="true" />}{item}</ComboboxItem>
}

export function ComboboxExample({
  type = "simple",
  state = "default",
  filled = false,
  initiallyOpen = false,
  showClear = false,
  autoHighlight = false,
  icons = false,
}: ComboboxExampleProps) {
  const disabled = state === "disabled"
  const invalid = state === "invalid" || undefined
  const key = `${type}-${state}-${filled}-${initiallyOpen}-${showClear}-${autoHighlight}-${icons}`

  if (type === "multiple") {
    return (
      <div className="w-[300px]">
        <Combobox
          autoHighlight={autoHighlight}
          defaultOpen={initiallyOpen}
          defaultValue={filled ? [options[0], options[1]] : []}
          disabled={disabled}
          items={options}
          key={key}
          multiple
        >
          <ComboboxChips aria-invalid={invalid}>
            <ComboboxValue>
              {(value: string[]) => value.map(item => <ComboboxChip key={item}>{item}</ComboboxChip>)}
            </ComboboxValue>
            <ComboboxChipsInput aria-label="Añadir opción" placeholder="Añadir opción" />
          </ComboboxChips>
          <ComboboxContent>
            <ComboboxEmpty>Sin resultados.</ComboboxEmpty>
            <ComboboxList>{(item: string, index: number) => <Item item={item} index={index} icons={icons} />}</ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>
    )
  }

  const rootItems = type === "groups" ? groups : options

  return (
    <div className="w-[300px]">
      <Combobox
        autoHighlight={autoHighlight}
        defaultOpen={initiallyOpen}
        defaultValue={filled ? options[0] : null}
        disabled={disabled}
        items={rootItems}
        key={key}
      >
        {type === "popup" ? (
          <ComboboxTrigger className="w-full justify-between" render={<Button variant="outline" />}>
            <ComboboxValue>{(value: string | null) => value ?? "Selecciona una opción"}</ComboboxValue>
          </ComboboxTrigger>
        ) : (
          <ComboboxInput
            aria-invalid={invalid}
            className="w-full"
            placeholder="Selecciona una opción"
            showClear={showClear}
          />
        )}
        <ComboboxContent>
          {type === "popup" && (
            <ComboboxInput aria-invalid={invalid} placeholder="Buscar opción..." showTrigger={false} />
          )}
          <ComboboxEmpty>Sin resultados.</ComboboxEmpty>
          <ComboboxList>
            {type === "groups" ? groups.map((group, groupIndex) => (
              <div key={group.label}>
                {groupIndex > 0 && <ComboboxSeparator />}
                <ComboboxGroup items={group.items}>
                  <ComboboxLabel>{group.label}</ComboboxLabel>
                  <ComboboxCollection>
                    {(item: string, index: number) => <Item item={item} index={index} icons={icons} />}
                  </ComboboxCollection>
                </ComboboxGroup>
              </div>
            )) : (item: string, index: number) => <Item item={item} index={index} icons={icons} />}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  )
}
