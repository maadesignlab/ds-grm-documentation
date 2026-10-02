"use client"

import { useRef, useState, type CSSProperties } from "react"
import { AArrowDown, CalendarDays, Ticket } from "lucide-react"
import { Button } from "./button"
import { Badge } from "./badge"
import { ButtonGroup } from "./button-group"
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "./breadcrumb"
import { Progress } from "./progress"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTrigger } from "./sheet"
import { StepperExample } from "./stepper-example"
import { SheetBody, type SheetBodyType } from "./sheet-body"
import { SheetActions, SheetHeaderContent, SheetStatusBand, type SheetStatus } from "./sheet-compositions"

import { SheetContentExample, useSheetContentValues, type SheetContentType } from "./sheet-content-example"

export type SheetExampleProps = {
  side?: "top" | "right" | "bottom" | "left"
  sideWidth?: 360 | 720 | 384 | 480
  resizable?: boolean
  contentType?: SheetContentType
  bodyType?: SheetBodyType
  visibleTabs?: 2 | 3 | 4
  showCloseButton?: boolean
  /** Compatibility for existing consumers; Figma now uses footerComposition. */
  footerAlignment?: "column" | "row"
  footerComposition?: "single-single" | "single-group" | "group-single"
  headerType?: "title-description" | "progress" | "badge" | "breadcrumb"
  showStatusBand?: boolean
  status?: SheetStatus
  showStatusIcon?: boolean
  showTiming?: boolean
  scrollable?: boolean
}

export function SheetExample({ side = "right", sideWidth = 360, resizable = true, contentType = "edit-form", bodyType, visibleTabs, showCloseButton = true, footerAlignment, footerComposition = "single-single", headerType = "title-description", showStatusBand = true, status = "success", showStatusIcon = true, showTiming = true, scrollable = false }: SheetExampleProps) {
  const [values, setValues] = useSheetContentValues()
  const portalContainer = useRef<HTMLDivElement>(null)
  const lateral = side === "left" || side === "right"
  const [width, setWidth] = useState<number>(sideWidth)
  const dragStart = useRef<{ x: number; width: number } | null>(null)
  const clampWidth = (value: number) => Math.min(Math.min(720, window.innerWidth), Math.max(Math.min(360, window.innerWidth), value))
  const contentClassName = lateral
    ? "[--overlay-panel-viewport-width:100vw]"
    : "data-[side=top]:h-[min(512px,100dvh)] data-[side=bottom]:h-[min(512px,100dvh)]"
  const details = contentType === "details-view"
  const cancel = <SheetClose asChild><Button variant="outline">Cancelar</Button></SheetClose>
  const group = <ButtonGroup aria-label="Acciones de sección"><Button variant="outline">Anterior</Button><Button variant="outline">Siguiente</Button></ButtonGroup>

  return (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Abrir Sheet</Button></SheetTrigger>
      <SheetContent ref={portalContainer} onEscapeKeyDown={event => {
        const target = event.target
        if (target instanceof Element && (target.closest('[data-slot="popover-content"], [data-slot="combobox-content"]') || target.matches('[role="combobox"][aria-expanded="true"]'))) event.preventDefault()
      }} side={side} showCloseButton={false} className={`gap-0 ${lateral && resizable ? side === "right" ? "pl-4" : "pr-4" : ""} ${contentClassName}`} style={lateral ? { "--sheet-requested-width": `${width}px` } as CSSProperties : undefined}>
        <SheetHeaderContent title={details ? "Cupón BUENFIN2026" : "Nueva cita"} description={details ? "Ajuste de precio · creado el 14 sep 2026" : "Agenda una cita para un paciente"} media={details ? <Ticket className="size-6" /> : <CalendarDays className="size-6" />} showCloseButton={showCloseButton}
          badge={headerType === "badge" ? <Badge variant="success" appearance="outline" size="lg">{details ? "Activo" : "Por confirmar"}</Badge> : undefined}
          breadcrumb={headerType === "breadcrumb" ? <Breadcrumb><BreadcrumbList><BreadcrumbItem>{details ? "Cupones" : "Agenda"}</BreadcrumbItem><BreadcrumbSeparator /></BreadcrumbList></Breadcrumb> : undefined}
          progress={headerType === "progress" ? <div className="flex items-center gap-4"><span className="shrink-0 text-xs font-medium leading-4">Paso 1 de 3 · Datos</span><Progress value={33} aria-label="Progreso del registro" className="min-w-0 flex-1" /></div> : undefined}
        />
        {showStatusBand && <SheetStatusBand status={status} icon={showStatusIcon ? <AArrowDown className="size-4 shrink-0" aria-hidden="true" /> : null} timing={showTiming ? "04:48" : undefined}>{details ? "Cupón disponible para aplicar al cobrar" : "Horario de muestra · pendiente de confirmación"}</SheetStatusBand>}
        <SheetBody type={bodyType ?? "tabs-normal"} visibleTabs={visibleTabs} stepper={<StepperExample showControls={false} showDescription={false} />}>
          <SheetContentExample type={contentType} values={values} setValues={setValues} portalContainer={portalContainer} />
          {scrollable && <div className="grid gap-4 py-4">{Array.from({ length: 16 }, (_, index) => <p key={index} className="m-0 text-sm leading-5 text-muted-foreground">Contenido desplazable {index + 1}</p>)}</div>}
        </SheetBody>
        {lateral && resizable && <Button data-slot="sheet-resize" variant="ghost" size="icon"
          role="separator" aria-orientation="vertical" aria-label="Ancho del panel"
          aria-valuemin={Math.min(360, width)} aria-valuemax={720} aria-valuenow={width} aria-valuetext={`${Math.round(width)} píxeles`}
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
        {footerAlignment ? <SheetFooter className={footerAlignment === "row" ? "flex-row [&>button]:flex-1" : "[&>button]:w-full"}>{cancel}<Button>{details ? "Editar cupón" : "Agendar cita"}</Button></SheetFooter> : <SheetActions
          start={footerComposition === "group-single" ? group : cancel}
          end={footerComposition === "single-group" ? group : <Button>{details ? "Editar cupón" : "Agendar cita"}</Button>}
        />}
      </SheetContent>
    </Sheet>
  )
}
