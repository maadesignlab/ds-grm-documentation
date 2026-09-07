"use client"

import * as React from "react"
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react"

import { Button } from "./button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible"

export type CollapsibleExampleProps = {
  pattern?: "fixedTrigger" | "expandableTrigger"
  defaultOpen?: boolean
}

export const collapsiblePlaygroundArgs = {
  pattern: "fixedTrigger",
  defaultOpen: false,
} as const satisfies CollapsibleExampleProps

export const collapsibleExamplePresets = {
  playground: collapsiblePlaygroundArgs,
  fixedCollapsed: { pattern: "fixedTrigger", defaultOpen: false },
  fixedExpanded: { pattern: "fixedTrigger", defaultOpen: true },
  expandableCollapsed: { pattern: "expandableTrigger", defaultOpen: false },
  expandableExpanded: { pattern: "expandableTrigger", defaultOpen: true },
} as const satisfies Record<string, CollapsibleExampleProps>

function DetailCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full flex-col rounded-[8px] border border-border px-4 py-2 text-sm leading-5">
      <span className="font-medium text-foreground">{label}</span>
      <span className="font-normal text-muted-foreground">{value}</span>
    </div>
  )
}

function FixedTriggerExample({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange} className="grid w-[350px] max-w-full gap-2">
      <div className="flex h-8 items-center gap-1.5 px-4">
        <span className="min-w-0 flex-1 text-sm font-semibold leading-5 text-foreground">Cita prenatal</span>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={open ? "Contraer cita prenatal" : "Expandir cita prenatal"}>
            <ChevronsUpDown aria-hidden />
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="flex min-h-[38px] items-center justify-between rounded-[8px] border border-border px-4 py-2 text-sm leading-5">
        <span className="text-muted-foreground">Estado</span>
        <span className="font-medium text-foreground">Confirmada</span>
      </div>
      <CollapsibleContent className="grid gap-2">
        <DetailCard label="Sede" value="Reina Madre Chapinero" />
        <DetailCard label="Servicio" value="Control prenatal" />
      </CollapsibleContent>
    </Collapsible>
  )
}

function ExpandableTriggerExample({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Collapsible open={open} onOpenChange={onOpenChange} className="grid w-[350px] max-w-full gap-px rounded-[8px] bg-muted">
      <CollapsibleTrigger className="flex h-[30px] w-full items-center gap-1.5 rounded-[10px] bg-muted px-2.5 text-left text-sm font-medium leading-5 text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
        <span className="min-w-0 flex-1">Detalles de la consulta</span>
        {open ? <ChevronUp aria-hidden className="size-4 shrink-0" /> : <ChevronDown aria-hidden className="size-4 shrink-0" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-2.5 pb-2.5">
        <div className="grid gap-[9px]">
          <p className="m-0 text-sm font-normal leading-5 text-foreground">Consulta de control prenatal con seguimiento de la madre y el bebé.</p>
          <Button size="xs" className="w-fit">Ver detalle</Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function StatefulCollapsibleExample({ pattern, defaultOpen }: Required<CollapsibleExampleProps>) {
  const [open, setOpen] = React.useState(defaultOpen)

  return pattern === "fixedTrigger"
    ? <FixedTriggerExample open={open} onOpenChange={setOpen} />
    : <ExpandableTriggerExample open={open} onOpenChange={setOpen} />
}

export function CollapsibleExample({ pattern = "fixedTrigger", defaultOpen = false }: CollapsibleExampleProps) {
  return <StatefulCollapsibleExample key={`${pattern}-${defaultOpen}`} pattern={pattern} defaultOpen={defaultOpen} />
}
