"use client"

import { useId, type ReactNode } from "react"
import { cn } from "@/lib/utils"

/** Figma BodySection: free content or a bordered group of description rows. */
export function SheetBodySection({ title, variant = "free", children, className }: {
  title: ReactNode; variant?: "free" | "contained"; children: ReactNode; className?: string
}) {
  const id = useId()
  return <section data-slot="sheet-body-section" data-variant={variant} aria-labelledby={id} className={cn("flex min-w-0 flex-col gap-4 py-5", className)}>
    <h3 id={id} className="m-0 font-sans text-[10px] leading-3 font-bold tracking-[0.1em] text-muted-foreground uppercase">{title}</h3>
    {variant === "contained"
      ? <dl className="m-0 overflow-hidden rounded-lg border border-border">{children}</dl>
      : <div className="flex min-w-0 flex-col gap-4">{children}</div>}
  </section>
}

export function SheetContainedRow({ label, children, valueFont = "sans" }: {
  label: ReactNode; children: ReactNode; valueFont?: "sans" | "mono"
}) {
  return <div data-slot="sheet-contained-row" className="grid grid-cols-2 gap-4 border-b border-border px-3 py-2.5 font-sans text-sm leading-5 text-foreground last:border-b-0">
    <dt className="min-w-0 break-words">{label}</dt>
    <dd className={cn("m-0 min-w-0 text-right break-words", valueFont === "mono" && "font-mono")}>{children}</dd>
  </div>
}
