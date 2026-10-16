"use client"

import { useEffect, useRef, useState, type ComponentProps, type CSSProperties } from "react"
import { SheetContent } from "./sheet"
import { Button } from "./button"
import { cn } from "@/lib/utils"

export type SheetResizableContentProps = ComponentProps<typeof SheetContent> & {
  resizable?: boolean
  defaultWidth?: number
  /** Optional localStorage key. Persistence is opt-in. */
  resizeKey?: string
  onWidthChange?: (width: number) => void
}

export function SheetResizableContent({ side = "right", resizable = true, defaultWidth = 360, resizeKey, onWidthChange, children, className, style, ...props }: SheetResizableContentProps) {
  const lateral = side === "left" || side === "right"
  const [width, updateWidth] = useState(() => Math.min(720, Math.max(360, Number.isFinite(defaultWidth) ? defaultWidth : 360)))
  const [viewport, setViewport] = useState<number | null>(null)
  const dragStart = useRef<{ x: number; width: number } | null>(null)
  useEffect(() => {
    const resize = () => setViewport(window.innerWidth)
    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])
  useEffect(() => {
    if (!resizeKey) return
    try {
      const saved = window.localStorage.getItem(`grm:sheet:${resizeKey}`)
      if (saved !== null && Number.isFinite(Number(saved))) {
        // Synchronize optional external storage after hydration.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        updateWidth(Math.min(720, Math.max(360, Number(saved))))
      }
    } catch { /* Storage can be unavailable; resizing remains usable. */ }
  }, [resizeKey])
  const clampWidth = (value: number) => Math.min(Math.min(720, window.innerWidth), Math.max(Math.min(360, window.innerWidth), value))
  const setWidth = (value: number | ((current: number) => number)) => {
    const next = clampWidth(typeof value === "function" ? value(width) : value)
    updateWidth(next)
    onWidthChange?.(next)
    if (resizeKey) { try { window.localStorage.setItem(`grm:sheet:${resizeKey}`, String(next)) } catch { /* Optional persistence. */ } }
  }
  const visibleWidth = Math.min(width, viewport ?? width)
  return <SheetContent {...props} side={side} className={cn(lateral && "[--overlay-panel-viewport-width:100vw]", lateral && resizable && (side === "right" ? "pl-4" : "pr-4"), className)} style={{ ...style, ...(lateral ? { "--sheet-requested-width": `${width}px` } : {}) } as CSSProperties}>
    {children}
      {lateral && resizable && <Button data-slot="sheet-resize" variant="ghost" size="icon"
          role="separator" aria-orientation="vertical" aria-label="Ancho del panel"
          aria-valuemin={Math.min(360, viewport ?? 360)} aria-valuemax={Math.min(720, viewport ?? 720)} aria-valuenow={visibleWidth} aria-valuetext={`${Math.round(visibleWidth)} píxeles`}
          className={`group/resize absolute inset-y-0 h-full w-4 touch-none cursor-col-resize rounded-none p-0 border-border bg-muted hover:bg-muted active:bg-muted ${side === "right" ? "left-0 border-r" : "right-0 border-l"}`}
          onPointerDown={event => {
            if (event.button !== 0) return
            dragStart.current = { x: event.clientX, width: event.currentTarget.closest('[data-slot="sheet-content"]')!.getBoundingClientRect().width }
            event.currentTarget.setPointerCapture(event.pointerId)
          }}
          onPointerMove={event => {
            if (!dragStart.current) return
            setWidth(clampWidth(dragStart.current.width + (event.clientX - dragStart.current.x) * (side === "right" ? -1 : 1)))
          }}
          onPointerUp={() => { dragStart.current = null }}
          onPointerCancel={() => { dragStart.current = null }}
          onLostPointerCapture={() => { dragStart.current = null }}
          onKeyDown={event => {
            if (event.key === "Home" || event.key === "End") {
              event.preventDefault()
              setWidth(clampWidth(event.key === "Home" ? 360 : 720))
            } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault()
              const direction = (event.key === "ArrowLeft") === (side === "right") ? 1 : -1
              setWidth(current => clampWidth(Math.min(current, window.innerWidth) + direction * (event.shiftKey ? 50 : 10)))
            }
          }}
        ><span aria-hidden="true" className="h-10 w-0.5 rounded-xs bg-muted-foreground opacity-55 group-hover/resize:opacity-100 group-active/resize:opacity-100 group-focus-visible/resize:opacity-100" /></Button>}
  </SheetContent>
}
