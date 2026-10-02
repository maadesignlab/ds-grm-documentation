"use client"

import type { ReactNode } from "react"
import { AArrowDown, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { SheetClose, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "./sheet"

/** Figma: _components/Sheet/Header. Content slots reuse the public DS components. */
export function SheetHeaderContent({ title, description, media = <Trash2 className="size-6" />, badge, breadcrumb, progress, showCloseButton = true }: {
  title: ReactNode
  description?: ReactNode
  media?: ReactNode
  badge?: ReactNode
  breadcrumb?: ReactNode
  progress?: ReactNode
  showCloseButton?: boolean
}) {
  return <SheetHeader className="shrink-0 flex-row items-start gap-2 shadow-[inset_0_-1px_0_var(--border)]">
    {media && <div className="shrink-0 pb-2"><div className="flex size-10 items-center justify-center rounded-lg bg-(--primary-5) text-primary">{media}</div></div>}
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        {breadcrumb}
        <div className="flex flex-wrap items-center gap-1.5"><SheetTitle>{title}</SheetTitle>{badge}</div>
        {description && <SheetDescription className={breadcrumb ? "sr-only" : undefined}>{description}</SheetDescription>}
      </div>
      {progress}
    </div>
    {showCloseButton && <SheetClose asChild><Button variant="outline" size="icon" className="shrink-0" aria-label="Cerrar"><X className="size-4" /></Button></SheetClose>}
  </SheetHeader>
}

export type SheetStatus = "success" | "warning" | "error" | "destructive" | "info"
const statusClasses: Record<SheetStatus, string> = {
  success: "bg-(--success-light) text-(--success-light-foreground)",
  warning: "bg-(--warning-light) text-(--warning-light-foreground)",
  error: "bg-(--error-light) text-(--error-light-foreground)",
  destructive: "bg-(--destructive-light) text-(--destructive-light-foreground)",
  info: "bg-(--info-light) text-(--info-light-foreground)",
}

/** Figma: _components/Sheet/StatusBar. Timing is supplied by the consumer. */
export function SheetStatusBand({ status = "success", children, icon = <AArrowDown className="size-4 shrink-0" aria-hidden="true" />, timing, className }: {
  status?: SheetStatus
  children: ReactNode
  icon?: ReactNode
  timing?: ReactNode
  className?: string
}) {
  return <div data-slot="sheet-status-band" data-status={status} className={cn("flex shrink-0 items-center justify-between gap-2 px-4 py-2.5 text-xs leading-4 shadow-[inset_0_-1px_0_var(--border)]", statusClasses[status], className)}>
    <div className="flex min-w-0 items-center gap-1.5">{icon}<span>{children}</span></div>
    {timing && <span className="shrink-0 font-mono tracking-wider">{timing}</span>}
  </div>
}

/** Figma: _components/Sheet/Buttons. Pass Button or ButtonGroup to each slot. */
export function SheetActions({ start, end }: { start: ReactNode; end: ReactNode }) {
  return <SheetFooter className="shrink-0 flex-row flex-wrap items-center justify-between">{start}{end}</SheetFooter>
}
