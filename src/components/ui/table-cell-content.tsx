"use client"

import * as React from "react"
import { MinusIcon, PlusIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

type TableCellTextProps = React.ComponentProps<"div"> & {
  amount?: "single" | "double"
  emphasis?: "regular" | "medium" | "link"
  font?: "sans" | "mono"
  href?: string
  text: string
  supportingText?: string
}

function TableCellText({ amount = "single", className, emphasis = "regular", font = "sans", href = "#", supportingText, text, ...props }: TableCellTextProps) {
  const content = <>
    <span className={cn("block truncate text-sm leading-5", font === "mono" && "font-mono", emphasis === "medium" && "font-medium", emphasis === "link" && "font-medium underline underline-offset-4")}>{text}</span>
    {amount === "double" ? <span className="block truncate text-[10px] leading-none text-muted-foreground">{supportingText}</span> : null}
  </>

  return <div data-slot="table-cell-content-text" data-font={font} className={cn("min-w-0", amount === "double" && "flex flex-col gap-0.5", className)} {...props}>{emphasis === "link" ? <a href={href} className="block min-w-0">{content}</a> : content}</div>
}

type TableCellAvatarProps = React.ComponentProps<"div"> & {
  avatarFallback?: string
  avatarSrc?: string
  layout?: "supporting" | "supporting-compact" | "metadata" | "custom"
  primaryText?: string
  supportingText?: string
}

function TableCellAvatar({ avatarFallback = "FJ", avatarSrc, children, className, layout = "supporting", primaryText = "Texto de celda", supportingText = "Texto de celda", ...props }: TableCellAvatarProps) {
  return <div data-slot="table-cell-content-avatar" data-layout={layout} className={cn("inline-flex min-w-0 max-w-full items-center gap-2.5", className)} {...props}>
    <Avatar className="size-7">{avatarSrc ? <AvatarImage src={avatarSrc} alt="" /> : null}<AvatarFallback>{avatarFallback}</AvatarFallback></Avatar>
    {layout === "custom" ? <div className="min-w-0">{children}</div> : layout === "metadata" ? <div className="flex min-w-0 items-center gap-1.5"><span className="truncate text-sm font-medium leading-5">{primaryText}</span><span aria-hidden className="text-muted-foreground">·</span><span className="truncate text-xs leading-4 text-muted-foreground">{supportingText}</span></div> : <div className={cn("flex min-w-0 flex-col", layout === "supporting-compact" ? "gap-0.5" : "gap-1")}><span className="truncate text-sm font-medium leading-5">{primaryText}</span><span className={cn("truncate text-muted-foreground", layout === "supporting-compact" ? "text-[10px] leading-none" : "text-xs leading-4")}>{supportingText}</span></div>}
  </div>
}

const statusTone = {
  success: "bg-[var(--success)]",
  warning: "bg-[var(--warning)]",
  destructive: "bg-destructive",
} as const

type TableCellStatusProps = React.ComponentProps<"div"> & { label: string; status?: keyof typeof statusTone }

function TableCellStatus({ className, label, status = "success", ...props }: TableCellStatusProps) {
  return <div data-slot="table-cell-content-status" data-status={status} className={cn("inline-flex min-w-0 max-w-full items-center gap-1.5", className)} {...props}><span aria-hidden className={cn("size-1.5 shrink-0 rounded-full", statusTone[status])} /><span className="truncate text-sm leading-5">{label}</span></div>
}

function getProgressTone(value: number) {
  if (value >= 90) return "[&_[data-slot=progress-indicator]]:bg-[var(--success)]"
  if (value >= 80) return "[&_[data-slot=progress-indicator]]:bg-[var(--warning)]"
  return "[&_[data-slot=progress-indicator]]:bg-destructive"
}

type TableCellProgressProps = React.ComponentProps<"div"> & { value: number }

function TableCellProgress({ className, value, ...props }: TableCellProgressProps) {
  const normalizedValue = Math.min(100, Math.max(0, Math.round(value / 10) * 10))
  return <div data-slot="table-cell-content-progress" className={cn("flex w-[139px] items-center gap-1.5", className)} {...props}><Progress value={normalizedValue} aria-label={`${normalizedValue}%`} className={cn("w-[97px]", getProgressTone(normalizedValue))} /><span className="shrink-0 text-sm leading-5">{normalizedValue}%</span></div>
}

type TableCellCounterProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange"> & {
  defaultValue?: number
  max?: number
  min?: number
  onValueChange?: (value: number) => void
  value?: number
}

function TableCellCounter({ className, defaultValue = 1, max = 10, min = 1, onValueChange, value: controlledValue, ...props }: TableCellCounterProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const value = controlledValue ?? internalValue
  const update = (nextValue: number) => {
    const boundedValue = Math.min(max, Math.max(min, nextValue))
    if (controlledValue === undefined) setInternalValue(boundedValue)
    onValueChange?.(boundedValue)
  }

  return <ButtonGroup data-slot="table-cell-content-counter" className={cn("w-[94px]", className)} {...props}><Button type="button" variant="outline" size="icon" aria-label="Disminuir cantidad" disabled={value <= min} onClick={() => update(value - 1)}><MinusIcon /></Button><output aria-live="polite" aria-label="Cantidad" className="flex size-8 items-center justify-center border border-border text-sm leading-5">{value}</output><Button type="button" variant="outline" size="icon" aria-label="Aumentar cantidad" disabled={value >= max} onClick={() => update(value + 1)}><PlusIcon /></Button></ButtonGroup>
}

type TableCellBulkOptionsProps = React.ComponentProps<"div">

function TableCellBulkOptions({ className, ...props }: TableCellBulkOptionsProps) {
  return <div data-slot="table-cell-content-bulk-options" className={cn("inline-flex w-fit items-center gap-1.5", className)} {...props} />
}

export { TableCellAvatar, TableCellBulkOptions, TableCellCounter, TableCellProgress, TableCellStatus, TableCellText }
export type { TableCellAvatarProps, TableCellBulkOptionsProps, TableCellCounterProps, TableCellProgressProps, TableCellStatusProps, TableCellTextProps }
