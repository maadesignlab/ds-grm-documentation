"use client"

import * as React from "react"
import { addDays } from "date-fns"
import { Clock2Icon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { es } from "react-day-picker/locale"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { Card, CardContent, CardFooter } from "./card"
import { Field, FieldGroup, FieldLabel } from "./field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import { Separator } from "./separator"

export type CalendarExampleProps = {
  mode?: "single" | "multiple" | "range"
  composition?: "calendar" | "availability" | "time" | "presets"
  captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years"
  numberOfMonths?: 1 | 2
  showOutsideDays?: boolean
  showWeekNumber?: boolean
  fixedWeeks?: boolean
  bookedDates?: boolean
}

const initialDate = new Date(2026, 0, 20)
const presetInitialDate = new Date(new Date().getFullYear(), 1, 12)
const currentMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
const initialRangeStart = new Date(2026, 0, 12)
const initialRange = { from: initialRangeStart, to: addDays(initialRangeStart, 30) }
const unavailable = Array.from({ length: 5 }, (_, index) => new Date(2026, 0, 24 + index))
const availability = {
  low: [16, 17, 19, 24, 25].map(day => new Date(2026, 0, day)),
  medium: [20, 26, 28, 29, 30].map(day => new Date(2026, 0, day)),
  high: [18, 27, 31].map(day => new Date(2026, 0, day)),
  full: [21, 22, 23].map(day => new Date(2026, 0, day)),
}

const availabilityClasses = {
  low: "[&>button]:border [&>button]:border-[var(--success-light-border)] [&>button]:bg-[var(--success-light)] [&>button]:text-[var(--success-light-foreground)]",
  medium: "[&>button]:border [&>button]:border-[var(--warning-light-border)] [&>button]:bg-[var(--warning-light)] [&>button]:text-[var(--warning-light-foreground)]",
  high: "[&>button]:border [&>button]:border-[var(--error-light-border)] [&>button]:bg-[var(--error-light)] [&>button]:text-[var(--error-light-foreground)]",
  full: "opacity-100 [&>button]:border [&>button]:border-border [&>button]:bg-muted [&>button]:text-muted-foreground",
} as const

const legend = [
  ["Baja", "var(--success-light)", "var(--success-light-border)"],
  ["Media", "var(--warning-light)", "var(--warning-light-border)"],
  ["Alta", "var(--error-light)", "var(--error-light-border)"],
  ["Llena", "var(--muted)", "var(--border)"],
] as const

function AvailabilityLegend() {
  return (
    <div className="calendar-availability-legend flex w-full flex-nowrap items-center justify-center gap-1.5 px-2 py-2.5 text-xs leading-4 text-foreground">
      {legend.map(([label, background, border]) => (
        <span key={label} className="flex items-center gap-1 whitespace-nowrap text-xs leading-4">
          <span className="size-3 rounded-full border" style={{ background, borderColor: border }} />
          {label}
        </span>
      ))}
    </div>
  )
}

function CalendarControl(props: CalendarExampleProps & {
  date: Date | undefined
  setDate: (date: Date | undefined) => void
  dates: Date[] | undefined
  setDates: (dates: Date[] | undefined) => void
  range: DateRange | undefined
  setRange: (range: DateRange | undefined) => void
  month: Date
  setMonth: (month: Date) => void
}) {
  const resolvedNumberOfMonths = props.mode === "range" ? 2 : props.numberOfMonths
  const common = {
    locale: es,
    defaultMonth: initialDate,
    className: props.composition === "presets" ? "p-0 [--cell-size:--spacing(9.5)]" : undefined,
    captionLayout: resolvedNumberOfMonths === 2 ? "label" : props.composition === "availability" ? "dropdown" : props.captionLayout,
    numberOfMonths: resolvedNumberOfMonths,
    showOutsideDays: props.showOutsideDays,
    showWeekNumber: props.showWeekNumber,
    fixedWeeks: props.composition === "presets" ? true : props.fixedWeeks,
    classNames: props.composition === "availability" ? {
      weekdays: "rdp-weekdays flex gap-1",
      week: "rdp-week mt-2 flex w-full gap-1",
      range_start: "rdp-range_start relative isolate z-0 rounded-l-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:right-0 after:w-4 after:bg-muted last:rounded-r-(--cell-radius) [&:not(:last-child)]:after:-right-1 [&:not(:last-child)]:after:w-1",
      range_middle: "rdp-range_middle relative rounded-none bg-muted first:rounded-l-(--cell-radius) last:rounded-r-(--cell-radius) after:absolute after:inset-y-0 after:bg-muted first:[&>button]:rounded-l-(--cell-radius) last:[&>button]:rounded-r-(--cell-radius) [&:not(:last-child)]:after:-right-1 [&:not(:last-child)]:after:w-1",
      range_end: "rdp-range_end relative isolate z-0 rounded-r-(--cell-radius) bg-muted after:absolute after:inset-y-0 after:left-0 after:w-4 after:bg-muted first:rounded-l-(--cell-radius)",
    } : undefined,
    disabled: props.composition === "availability" ? availability.full : props.bookedDates ? unavailable : undefined,
    modifiers: props.composition === "availability" ? availability : props.bookedDates ? { booked: unavailable } : undefined,
    modifiersClassNames: props.composition === "availability" ? availabilityClasses : props.bookedDates ? { booked: "[&>button]:line-through opacity-100" } : undefined,
  } as const

  if (props.mode === "range") return <Calendar {...common} mode="range" selected={props.range} onSelect={props.setRange} />
  if (props.mode === "multiple") return <Calendar {...common} mode="multiple" selected={props.dates} onSelect={props.setDates} />
  return <Calendar {...common} mode="single" month={props.composition === "presets" ? props.month : undefined} onMonthChange={props.composition === "presets" ? props.setMonth : undefined} selected={props.date} onSelect={props.setDate} />
}

export function CalendarExample({ mode = "single", composition = "calendar", captionLayout = "label", numberOfMonths = 1, showOutsideDays = true, showWeekNumber = false, fixedWeeks = false, bookedDates = false }: CalendarExampleProps) {
  const [date, setDate] = React.useState<Date | undefined>(composition === "availability" ? new Date(2026, 0, 15) : composition === "presets" ? presetInitialDate : initialDate)
  const [dates, setDates] = React.useState<Date[] | undefined>([initialDate, addDays(initialDate, 2)])
  const [range, setRange] = React.useState<DateRange | undefined>(initialRange)
  const [month, setMonth] = React.useState(composition === "presets" ? currentMonth : initialDate)
  const props = { mode, composition, captionLayout, numberOfMonths, showOutsideDays, showWeekNumber, fixedWeeks, bookedDates, date, setDate, dates, setDates, range, setRange, month, setMonth }

  if (composition === "time") return <Card size="sm" className="!w-fit !max-w-none"><CardContent><CalendarControl {...props} /></CardContent><CardFooter className="border-t bg-card"><FieldGroup><Field><FieldLabel htmlFor="calendar-time-from">Hora inicial</FieldLabel><InputGroup><InputGroupInput id="calendar-time-from" type="time" step="1" defaultValue="10:30:00" className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden" /><InputGroupAddon><Clock2Icon /></InputGroupAddon></InputGroup></Field><Field><FieldLabel htmlFor="calendar-time-to">Hora final</FieldLabel><InputGroup><InputGroupInput id="calendar-time-to" type="time" step="1" defaultValue="12:30:00" className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden" /><InputGroupAddon><Clock2Icon /></InputGroupAddon></InputGroup></Field></FieldGroup></CardFooter></Card>

  if (composition === "presets") return <Card size="sm" className="mx-auto !w-fit !max-w-[300px]"><CardContent><CalendarControl {...props} /></CardContent><CardFooter className="flex flex-wrap gap-2 border-t">{[["Hoy", 0], ["Mañana", 1], ["En 3 días", 3], ["En una semana", 7], ["En 2 semanas", 14]].map(([label, value]) => <Button key={value} variant="outline" size="sm" className="flex-auto" onClick={() => { const next = addDays(new Date(), Number(value)); setDate(next); setMonth(new Date(next.getFullYear(), next.getMonth(), 1)) }}>{label}</Button>)}</CardFooter></Card>

  if (composition === "availability") return <Card className="!w-fit !max-w-none gap-0 p-0"><CardContent className="p-0"><CalendarControl {...props} /></CardContent><div><Separator /><AvailabilityLegend /></div></Card>

  return <Card className="!w-fit !max-w-none p-0"><CardContent className="p-0"><CalendarControl {...props} /></CardContent></Card>
}
