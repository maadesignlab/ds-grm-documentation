"use client"

import * as React from "react"
import { addDays, format } from "date-fns"
import { es as dateFnsEs } from "date-fns/locale"
import { CalendarIcon, Clock2Icon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { es as dayPickerEs } from "react-day-picker/locale"

import { Button } from "./button"
import { Calendar } from "./calendar"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Separator } from "./separator"

export type DatePickerExampleProps = {
  type?: "single" | "range" | "date-time"
  state?: "empty" | "filled"
  captionLayout?: "label" | "dropdown"
  initiallyOpen?: boolean
  showOutsideDays?: boolean
  availability?: boolean
}

export const datePickerPlaygroundArgs = {
  type: "single",
  state: "empty",
  captionLayout: "label",
  initiallyOpen: false,
  showOutsideDays: true,
  availability: false,
} as const satisfies DatePickerExampleProps

export const datePickerExamplePresets = {
  playground: datePickerPlaygroundArgs,
  single: { ...datePickerPlaygroundArgs, state: "filled" },
  range: { ...datePickerPlaygroundArgs, type: "range", state: "filled" },
  dateTime: { ...datePickerPlaygroundArgs, type: "date-time", state: "filled" },
  availability: { ...datePickerPlaygroundArgs, state: "filled", availability: true },
  empty: { ...datePickerPlaygroundArgs },
  filled: { ...datePickerPlaygroundArgs, state: "filled" },
  monthYear: { ...datePickerPlaygroundArgs, state: "filled", captionLayout: "dropdown" },
} as const satisfies Record<string, DatePickerExampleProps>

const initialDate = new Date(2026, 0, 20)
const initialRange = { from: initialDate, to: addDays(initialDate, 20) }
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
  return <div className="flex flex-nowrap items-center justify-center gap-1.5 px-2 py-2.5 text-xs leading-4 text-foreground">{legend.map(([label, background, border]) => <span key={label} className="flex items-center gap-1 whitespace-nowrap"><span className="size-3 rounded-full border" style={{ background, borderColor: border }} />{label}</span>)}</div>
}

function TriggerLabel({ type, date, range }: { type: DatePickerExampleProps["type"]; date?: Date; range?: DateRange }) {
  if (type === "range") {
    if (!range?.from) return <span>Selecciona un rango</span>
    if (!range.to) return <span>{format(range.from, "PP", { locale: dateFnsEs })}</span>
    return <span>{format(range.from, "PP", { locale: dateFnsEs })} – {format(range.to, "PP", { locale: dateFnsEs })}</span>
  }
  return date ? <span>{format(date, "PPP", { locale: dateFnsEs })}</span> : <span>Selecciona una fecha</span>
}

export function DatePickerExample({
  type = "single",
  state = "empty",
  captionLayout = "label",
  initiallyOpen = false,
  showOutsideDays = true,
  availability: showAvailability = false,
}: DatePickerExampleProps) {
  const [date, setDate] = React.useState<Date | undefined>(state === "filled" ? initialDate : undefined)
  const [range, setRange] = React.useState<DateRange | undefined>(state === "filled" ? initialRange : undefined)
  const isRange = type === "range"
  const triggerWidth = isRange ? "w-[240px]" : type === "date-time" ? "flex-1" : "w-[195px]"
  const availabilityProps = showAvailability && !isRange ? {
    disabled: availability.full,
    modifiers: availability,
    modifiersClassNames: availabilityClasses,
    classNames: {
      weekdays: "rdp-weekdays flex gap-1",
      week: "rdp-week mt-2 flex w-full gap-1",
    },
  } : {}

  return (
    <div className={type === "date-time" ? "flex w-[353px] items-center gap-2" : "w-fit"}>
      <Popover defaultOpen={initiallyOpen}>
        <PopoverTrigger
          render={<Button variant="outline" data-empty={isRange ? !range?.from : !date} className={`${triggerWidth} justify-start overflow-hidden text-left font-normal data-[empty=true]:text-muted-foreground`} />}
        >
          <CalendarIcon aria-hidden="true" />
          <span className="min-w-0 flex-1 truncate"><TriggerLabel type={type} date={date} range={range} /></span>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto gap-0 overflow-hidden p-0">
          {isRange ? (
            <Calendar
              captionLayout="label"
              defaultMonth={initialDate}
              locale={dayPickerEs}
              mode="range"
              numberOfMonths={2}
              onSelect={setRange}
              selected={range}
              showOutsideDays={showOutsideDays}
            />
          ) : (
            <>
              <Calendar
                {...availabilityProps}
                captionLayout={captionLayout}
                defaultMonth={initialDate}
                locale={dayPickerEs}
                mode="single"
                onSelect={setDate}
                selected={date}
                showOutsideDays={showOutsideDays}
              />
              {showAvailability && <><Separator /><AvailabilityLegend /></>}
            </>
          )}
        </PopoverContent>
      </Popover>
      {type === "date-time" && (
        <InputGroup className="w-[138px] shrink-0">
          <InputGroupInput aria-label="Hora" defaultValue="11:59:59" type="time" step="1" className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden" />
          <InputGroupAddon><Clock2Icon aria-hidden="true" /></InputGroupAddon>
        </InputGroup>
      )}
    </div>
  )
}
