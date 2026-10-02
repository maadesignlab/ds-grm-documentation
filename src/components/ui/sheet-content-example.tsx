"use client"

import { useId, useState, type RefObject } from "react"
import { CalendarIcon, Clock2, Copy, Info } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Avatar, AvatarFallback } from "./avatar"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxEmpty, ComboboxList, ComboboxItem } from "./combobox"
import { Field, FieldLabel, FieldDescription, FieldTitle } from "./field"
import { Input } from "./input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group"
import { itemAppearanceClasses } from "./item-appearance"
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "./item"
import { Popover, PopoverTrigger, PopoverContent } from "./popover"
import { Separator } from "./separator"
import { Switch } from "./switch"
import { SheetBodySection, SheetContainedRow } from "./sheet-content-sections"

export type SheetContentType = "none" | "edit-form" | "details-view"

/** State lives above the adaptive navigation so layout changes cannot erase inputs. */
export function useSheetContentValues() {
  return useState({ text: "", first: "", second: "", enabled: false, option: null as string | null, date: new Date(2026, 9, 2) as Date | undefined, time: "09:00:00" })
}
type Values = ReturnType<typeof useSheetContentValues>[0]
type SetValues = ReturnType<typeof useSheetContentValues>[1]

export function SheetContentExample({ type, values, setValues, portalContainer }: { type: SheetContentType; values: Values; setValues: SetValues; portalContainer: RefObject<HTMLDivElement | null> }) {
  const id = useId()
  const [dateOpen, setDateOpen] = useState(false)
  if (type === "none") return null
  if (type === "details-view") return <div data-slot="sheet-content-example" data-content={type}>
    {[
      { title: "Datos generales", rows: [["Código", "BUENFIN2026"], ["Marca", "Todas las marcas"], ["Alcance", "Cualquier servicio o producto"]] },
      { title: "Descuento", rows: [["Categoría", "Ajuste de precio"], ["Tipo", "Porcentaje"], ["Valor", "15 %"]] },
      { title: "Restricciones", rows: [["Límite total de usos", "Sin límite"], ["Usos por paciente", "1"], ["Monto mínimo de compra", "—"]] },
    ].map((section, index) => <div key={section.title}>
      {index > 0 && <Separator />}
      <SheetBodySection title={section.title} variant="contained">
        {section.rows.map(([label, value]) => <SheetContainedRow key={label} label={label} valueFont={label === "Código" ? "mono" : "sans"}>{value}</SheetContainedRow>)}
      </SheetBodySection>
    </div>)}
  </div>
  const fields = {
    text: { label: "Paciente", help: "Busca por nombre, celular o CURP.", placeholder: "Nombre, celular o CURP" },
    first: { label: "Nombre", help: "Nombre del paciente.", placeholder: "Ej. Ana Lucía" },
    second: { label: "Apellidos", help: "Apellidos del paciente.", placeholder: "Ej. Ramírez" },
  }

  const textField = (key: "text" | "first" | "second", copy = false) => <Field className="min-w-0">
    <FieldLabel htmlFor={id + key}>{fields[key].label}</FieldLabel>
    <FieldDescription id={id + key + "-description"}>{fields[key].help}</FieldDescription>
    {copy ? <InputGroup>
      <InputGroupInput id={id + key} aria-describedby={id + key + "-description"} placeholder={fields[key].placeholder} value={values[key]} onChange={event => setValues(current => ({ ...current, [key]: event.target.value }))} />
      <InputGroupAddon align="inline-end"><Copy aria-hidden="true" /></InputGroupAddon>
    </InputGroup> : <Input id={id + key} aria-describedby={id + key + "-description"} placeholder={fields[key].placeholder} value={values[key]} onChange={event => setValues(current => ({ ...current, [key]: event.target.value }))} />}
  </Field>

  return <div data-slot="sheet-content-example" data-content={type} className="@container/sheet-form min-w-0">
    <div className="pt-4"><Item variant="outline" className={itemAppearanceClasses("light", "info")}>
      <ItemMedia variant="icon"><Info aria-hidden="true" /></ItemMedia>
      <ItemContent className="min-w-0"><ItemTitle>Agenda una cita</ItemTitle><ItemDescription className="line-clamp-none text-inherit">Selecciona al paciente, el servicio y el horario de atención.</ItemDescription></ItemContent>
    </Item></div>
    <SheetBodySection title="Paciente">
      {textField("text", true)}
      <div className="grid min-w-0 grid-cols-2 gap-4">{textField("first")}{textField("second")}</div>
    </SheetBodySection>
    <Separator />
    <SheetBodySection title="Recordatorio">
      <Field>
        <FieldLabel htmlFor={id + "-switch"}>Enviar recordatorio</FieldLabel>
        <FieldDescription id={id + "-switch-description"}>Notificar al paciente antes de su cita.</FieldDescription>
        <div className="mt-2 flex items-center gap-2">
          <Switch id={id + "-switch"} aria-describedby={id + "-switch-description"} checked={values.enabled} onCheckedChange={enabled => setValues(current => ({ ...current, enabled }))} />
          <span className="text-sm leading-5">{values.enabled ? "Activado" : "Desactivado"}</span>
        </div>
      </Field>
    </SheetBodySection>
    <Separator />
    <SheetBodySection title="Servicio">
      <Field>
        <FieldLabel htmlFor={id + "-option"}>Servicio</FieldLabel>
        <FieldDescription id={id + "-option-description"}>Elige el servicio para esta cita.</FieldDescription>
        <div className="mt-2 max-w-[270px]">
          <Combobox items={["Consulta de ginecología", "Consulta de obstetricia", "Ultrasonido"]} value={values.option} onValueChange={option => setValues(current => ({ ...current, option }))}>
            <ComboboxInput id={id + "-option"} aria-describedby={id + "-option-description"} placeholder="Selecciona un servicio" className="w-full" />
            <ComboboxContent container={portalContainer}><ComboboxEmpty>Sin resultados.</ComboboxEmpty><ComboboxList>{(option: string) => <ComboboxItem key={option} value={option}>{option}</ComboboxItem>}</ComboboxList></ComboboxContent>
          </Combobox>
        </div>
      </Field>
    </SheetBodySection>
    <Separator />
    <SheetBodySection title="Día y horario">
      <Field>
        <FieldLabel htmlFor={id + "-date"}>Fecha de la cita</FieldLabel>
        <FieldDescription id={id + "-date-description"}>Selecciona el día y la hora de atención.</FieldDescription>
        <div data-slot="sheet-date-time" className="mt-2 flex min-w-0 flex-col gap-4 @[353px]/sheet-form:flex-row">
          <Popover open={dateOpen} onOpenChange={setDateOpen}>
            <PopoverTrigger id={id + "-date"} aria-describedby={id + "-date-description"} render={<Button variant="outline" className="h-9 min-w-0 flex-none justify-between font-normal @[353px]/sheet-form:flex-1" />}>
              {values.date ? format(values.date, "LLLL d, yyyy", { locale: es }) : "Selecciona una fecha"}<CalendarIcon aria-hidden="true" className="size-4" />
            </PopoverTrigger>
            <PopoverContent container={portalContainer} align="start" className="w-auto gap-0 overflow-hidden p-0">
              <Calendar mode="single" selected={values.date} defaultMonth={values.date} onSelect={date => { setValues(current => ({ ...current, date })); setDateOpen(false) }} locale={es} />
            </PopoverContent>
          </Popover>
          <InputGroup className="min-w-0 flex-none @[353px]/sheet-form:flex-1"><InputGroupAddon><Clock2 aria-hidden="true" /></InputGroupAddon><InputGroupInput aria-label="Hora" type="time" step="1" value={values.time} onChange={event => setValues(current => ({ ...current, time: event.target.value }))} className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden" /></InputGroup>
        </div>
      </Field>
    </SheetBodySection>
    <Separator />
    <SheetBodySection title="Médico">
      <Item variant="outline" className={itemAppearanceClasses("outline")}>
        <ItemMedia><Avatar size="lg"><AvatarFallback>DC</AvatarFallback></Avatar></ItemMedia>
        <ItemContent className="min-w-0"><ItemTitle>Dr. Diego Castro Herrera</ItemTitle><ItemDescription className="line-clamp-none">Obstetricia</ItemDescription></ItemContent>
        <ItemActions><Button variant="outline" size="sm">Cambiar</Button></ItemActions>
      </Item>
    </SheetBodySection>
    <Separator />
    <SheetBodySection title="Información adicional">
      <Field><FieldTitle>Datos de demostración</FieldTitle><FieldDescription>Este ejemplo no registra citas ni envía notificaciones.</FieldDescription></Field>
    </SheetBodySection>
  </div>
}
