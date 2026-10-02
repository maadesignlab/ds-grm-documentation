"use client"

import { useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"
import { ScrollArea } from "./scroll-area"
import { TabsOverflow } from "./tabs-overflow"

export type SheetBodyType = "blank" | "tabs-normal" | "tabs-overflow" | "stepper"
const normalLabels = ["Información", "Documentación", "Actividad", "Historial"]
const overflowLabels = ["Resumen", "Pacientes", "Agenda", "Consultas", "Estudios", "Resultados", "Pagos", "Historial"]

/** Reserve the 10px lane only while Radix reports a visible vertical scrollbar. */
function SheetBodyScroll({ children, blank = false }: { children?: ReactNode; blank?: boolean }) {
  return <div className="relative min-h-0 flex-1">
    <div className="absolute inset-0"><ScrollArea className="h-full [&:has(>[data-slot=scroll-area-scrollbar][data-orientation=vertical][data-state=visible])>[data-slot=scroll-area-viewport]]:w-[calc(100%-var(--spacing)*2.5)]" type="auto">
      <div data-slot="sheet-body-padding" className={blank ? "min-w-0 px-4 py-2.5" : "min-w-0 px-4"}>{children}</div>
    </ScrollArea></div>
  </div>
}

/** Sheet chooses the navigation layout from its available space, preserving its data. */
export function SheetBody({ type = "blank", visibleTabs, stepper, children }: { type?: SheetBodyType; visibleTabs?: 2 | 3 | 4; stepper?: ReactNode; children?: ReactNode }) {
  if (type === "blank") return <div data-slot="sheet-body" className="flex min-h-0 min-w-0 flex-1 flex-col"><SheetBodyScroll blank>{children}</SheetBodyScroll></div>
  if (type === "stepper") return <div data-slot="sheet-body" className="flex min-h-0 flex-1 flex-col gap-4 pt-4 [&>[data-slot=stepper]]:w-full">
    {stepper}
    <div className="flex min-h-0 flex-1 flex-col border-t border-border"><SheetBodyScroll>{children}</SheetBodyScroll></div>
  </div>
  return <SheetTabs labels={type === "tabs-overflow" ? overflowLabels : normalLabels} visibleTabs={visibleTabs}>{children}</SheetTabs>
}

function SheetTabs({ labels, visibleTabs, children }: { labels: string[]; visibleTabs?: 2 | 3 | 4; children?: ReactNode }) {
  const container = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState("0")
  const [layout, setLayout] = useState({ overflow: true, count: 2 as 2 | 3 | 4 })
  useLayoutEffect(() => {
    const node = container.current!
    const measure = () => {
      const styles = getComputedStyle(node)
      const trigger = node.querySelector<HTMLElement>('[role="tab"]')
      if (!trigger) return
      const tabStyles = getComputedStyle(trigger)
      const context = document.createElement("canvas").getContext("2d")
      if (!context) return
      context.font = `${tabStyles.fontWeight} ${tabStyles.fontSize} ${tabStyles.fontFamily}`
      const tabWidth = Math.ceil(Math.max(...labels.map(label => context.measureText(label).width))) + parseFloat(tabStyles.paddingLeft) + parseFloat(tabStyles.paddingRight) + 2
      const available = node.clientWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight)
      // Tailwind spacing unit; navigation uses 32px controls and 8px gaps.
      const spacing = 4
      const overflow = available < tabWidth * labels.length + spacing * 1.5
      const count = Math.max(2, Math.min(4, Math.floor((available - spacing * 20) / Math.max(spacing * 28, tabWidth)))) as 2 | 3 | 4
      setLayout(current => current.overflow === overflow && current.count === count ? current : { overflow, count })
    }
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    measure()
    let active = true
    void document.fonts.ready.then(() => { if (active) measure() })
    return () => { active = false; observer.disconnect() }
  }, [labels])
  const items = labels.map((label, index) => ({ value: String(index), label, content: <SheetBodyScroll>{children}</SheetBodyScroll> }))
  const classes = "min-h-0 flex-1 gap-0 [&>[data-slot=tabs-content]]:min-h-0 [&>[data-slot=tabs-content]]:flex [&>[data-slot=tabs-content]]:flex-col [&>[data-slot=tabs-content]]:overflow-hidden [&>[data-slot=tabs-content]]:border-t [&>[data-slot=tabs-content]]:border-border"
  return <div ref={container} data-slot="sheet-body" data-navigation={layout.overflow ? "overflow" : "tabs"} className="flex min-h-0 min-w-0 flex-1 flex-col pt-2">
    {layout.overflow ? <TabsOverflow items={items} visibleTabs={visibleTabs ?? layout.count} value={selected} onValueChange={setSelected} label="Secciones del panel" className={classes} /> : <Tabs value={selected} onValueChange={setSelected} className={classes}>
      <TabsList variant="line" aria-label="Secciones del panel" className="w-full shrink-0">{items.map(item => <TabsTrigger key={item.value} value={item.value}>{item.label}</TabsTrigger>)}</TabsList>
      {items.map(item => <TabsContent key={item.value} value={item.value}>{item.content}</TabsContent>)}
    </Tabs>}
  </div>
}
