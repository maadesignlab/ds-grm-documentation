"use client"

import { MenubarExample, menubarExamplePresets, type MenubarExampleProps } from "./menubar-example"
import { SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof menubarExamplePresets
function Example({ preset }: { preset: Preset }) { return <MenubarExample {...menubarExamplePresets[preset] as MenubarExampleProps} /> }

export function MenubarStates() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Closed" value="defaultOpen=false"><Example preset="closed" /></Card><Card title="Open" value="defaultOpen=true"><Example preset="open" /></Card></div>
}

export function MenubarAmounts() {
  return <div className="not-prose grid gap-3"><Card title="1 opción" value="optionCount=1"><Example preset="one" /></Card><Card title="3 opciones" value="optionCount=3"><Example preset="three" /></Card><Card title="6 opciones" value="optionCount=6"><Example preset="six" /></Card><Card title="10 opciones" value="optionCount=10"><div className="max-w-full overflow-x-auto"><Example preset="ten" /></div></Card></div>
}

export function MenubarCompositions() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Checkbox items" value="MenubarCheckboxItem"><Example preset="checkbox" /></Card><Card title="Radio group" value="MenubarRadioGroup"><Example preset="radio" /></Card></div>
}

const anatomy = [
  ["Menubar", "Root", "h-8 gap-1 p-[3px]", "32px / 4px / 3px"],
  ["MenubarMenu", "Menu", "value", "Menú por trigger"],
  ["MenubarTrigger", "Trigger", "h-6 px-2 py-1", "24px / 8px / 4px"],
  ["MenubarContent", "Portal + Content", "min-w-44 p-1", "176px / 4px"],
  ["MenubarItem", "Item", "px-1.5 py-1", "6px / 4px"],
  ["MenubarSub", "Sub", "SubTrigger + SubContent", "Submenú"],
  ["MenubarCheckboxItem", "CheckboxItem", "checked", "Selección múltiple"],
  ["MenubarRadioGroup", "RadioGroup", "value", "Selección exclusiva"],
] as const

const tokens = [
  ["Root", "bg-background / border-border", "--background / --border"],
  ["Trigger activo", "bg-accent text-accent-foreground", "--accent / --accent-foreground"],
  ["Content", "bg-popover text-popover-foreground", "--popover / --popover-foreground"],
  ["Item", "text-sm font-normal", "14px / 20px / fuente de marca"],
  ["Label", "text-xs leading-4 font-medium", "12px / 16px / fuente de marca"],
  ["Shortcut", "text-xs text-muted-foreground", "12px / --muted-foreground"],
] as const

export function MenubarSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>API y geometría</h3><Table columns={["Parte", "Primitive", "Tailwind / API", "Valor"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tipografía y color</h3><Table columns={["Elemento", "Tailwind", "Token / valor"]} rows={tokens} /></section></div>
}
