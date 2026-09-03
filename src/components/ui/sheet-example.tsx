"use client"

import { Button } from "./button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./sheet"

export type SheetExampleProps = {
  side?: "top" | "right" | "bottom" | "left"
  sideWidth?: 384 | 480
  showCloseButton?: boolean
  footerAlignment?: "column" | "row"
  scrollable?: boolean
}

export function SheetExample({ side = "right", sideWidth = 480, showCloseButton = true, footerAlignment = "column", scrollable = false }: SheetExampleProps) {
  const lateral = side === "left" || side === "right"
  const contentClassName = lateral
    ? sideWidth === 480
      ? "w-[min(75vw,480px)]! sm:max-w-[480px]!"
      : "w-[min(75vw,384px)]! sm:max-w-96!"
    : "h-[min(512px,100dvh)]!"

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Abrir Sheet</Button>
      </SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton} className={contentClassName}>
        <SheetHeader>
          <SheetTitle>Título de la sección</SheetTitle>
          <SheetDescription>Descripción de la sección</SheetDescription>
        </SheetHeader>

        <div data-slot="sheet-body" className="min-h-0 flex-1 overflow-y-auto px-4">
          {scrollable && <div className="grid gap-4 py-4">{Array.from({ length: 16 }, (_, index) => <p key={index} className="m-0 text-sm leading-5 text-muted-foreground">Contenido desplazable {index + 1}</p>)}</div>}
        </div>

        <SheetFooter className={footerAlignment === "row" ? "flex-row" : undefined}>
          {footerAlignment === "row" ? (
            <>
              <SheetClose asChild><Button variant="outline" className="flex-1">Cancelar</Button></SheetClose>
              <Button className="flex-1">Guardar</Button>
            </>
          ) : (
            <>
              <Button className="w-full">Guardar</Button>
              <SheetClose asChild><Button variant="outline" className="w-full">Cancelar</Button></SheetClose>
            </>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
