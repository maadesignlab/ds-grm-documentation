"use client"

import { useId, useState, type ComponentProps, type ReactNode } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"

export type TabsOverflowItem = { value: string; label: ReactNode; content?: ReactNode; disabled?: boolean }
export type TabsOverflowProps = Omit<ComponentProps<typeof Tabs>, "children" | "orientation"> & {
  items: readonly TabsOverflowItem[]
  visibleTabs?: 2 | 3 | 4
  label?: string
}

/** Figma Tabs/Overflow: flexible viewport, equal tabs, two-position arrow navigation. */
export function TabsOverflow({ items, visibleTabs = 2, label = "Secciones", value, defaultValue, onValueChange, className, ...props }: TabsOverflowProps) {
  const viewportId = useId()
  const [internalValue, setInternalValue] = useState(defaultValue ?? items.find(item => !item.disabled)?.value ?? "")
  const selected = value ?? internalValue
  const count = Math.min(visibleTabs, items.length)
  const maxOffset = Math.max(0, items.length - count)
  const [position, setPosition] = useState(() => ({ offset: Math.max(0, Math.min(maxOffset, items.findIndex(item => item.value === selected) - count + 1)), selected, count }))
  const index = items.findIndex(item => item.value === selected)
  const clamp = (offset: number) => Math.max(0, Math.min(maxOffset, offset))
  const reveal = (offset: number, target: number) => target < 0 ? clamp(offset) : clamp(Math.min(target, Math.max(target - count + 1, offset)))
  // Reconcile externally selected values and visible-count changes before paint.
  if (position.selected !== selected || position.count !== count) {
    setPosition({ offset: reveal(position.offset, index), selected, count })
  }
  const start = clamp(position.offset)
  const moveTo = (offset: number) => setPosition({ offset: clamp(offset), selected, count })
  const select = (next: string) => {
    const nextIndex = items.findIndex(item => item.value === next)
    const direction = Math.sign(nextIndex - index)
    setPosition({ offset: reveal(start + direction, nextIndex), selected: next, count })
    if (value === undefined) setInternalValue(next)
    onValueChange?.(next)
  }
  if (items.length === 0) return null
  return <Tabs {...props} data-slot="tabs-overflow" value={selected} onValueChange={select} orientation="horizontal" className={cn("min-w-0 w-full", className)}>
    <div data-slot="tabs-overflow-navigation" className="flex h-8 min-w-0 shrink-0 items-center gap-2">
      <Button type="button" variant="ghost" size="icon" className="rounded-md" aria-label="Mostrar pestañas anteriores" aria-controls={viewportId} disabled={start === 0} onClick={() => moveTo(start - 2)}><ChevronLeft aria-hidden="true" /></Button>
      <div id={viewportId} data-slot="tabs-overflow-viewport" className="h-8 min-w-0 flex-1 overflow-hidden">
        <TabsList variant="line" aria-label={label} className="h-8 w-full shrink-0 items-start px-0 pb-0 transition-transform duration-220 ease-out motion-reduce:transition-none"
          style={{ width: `${items.length / count * 100}%`, transform: `translateX(-${start / items.length * 100}%)` }}>
          {items.map((item, itemIndex) => <TabsTrigger key={item.value} value={item.value} disabled={item.disabled} className="min-w-0" onFocus={() => {
            if (itemIndex < start || itemIndex >= start + count) moveTo(reveal(start, itemIndex))
          }}>{item.label}</TabsTrigger>)}
        </TabsList>
      </div>
      <Button type="button" variant="ghost" size="icon" className="rounded-md" aria-label="Mostrar pestañas siguientes" aria-controls={viewportId} disabled={start === maxOffset} onClick={() => moveTo(start + 2)}><ChevronRight aria-hidden="true" /></Button>
    </div>
    {items.filter(item => item.content !== undefined).map(item => <TabsContent key={item.value} value={item.value}>{item.content}</TabsContent>)}
  </Tabs>
}
