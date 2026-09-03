"use client"

import * as React from "react"

import { Button } from "./button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./drawer"

export type DrawerExampleProps = {
  behavior?: "standard" | "nested" | "non-modal" | "snap-points"
  swipeDirection?: "up" | "right" | "down" | "left"
  sideWidth?: 384 | 480
  buttonAmount?: 1 | 2
  showSwipeHandle?: boolean
  scrollable?: boolean
  inset?: 0 | 8 | 16
}

type DrawerPanelProps = Pick<DrawerExampleProps, "swipeDirection" | "sideWidth" | "buttonAmount" | "scrollable" | "inset"> & {
  children?: React.ReactNode
  description?: string
  hasSnapPoints?: boolean
  title?: string
}

function DrawerPanel({ swipeDirection = "right", sideWidth = 480, buttonAmount = 2, scrollable = false, inset = 16, children, description = "Descripción de la sección", hasSnapPoints = false, title = "Título de la sección" }: DrawerPanelProps) {
  const horizontal = swipeDirection === "left" || swipeDirection === "right"
  const contentClassName = [
    inset === 16
      ? "[--drawer-inset:16px] [--drawer-bleed-background:transparent]"
      : inset === 8
        ? "[--drawer-inset:8px] [--drawer-bleed-background:transparent]"
        : "[--drawer-inset:0px]",
    horizontal
      ? sideWidth === 480
        ? "data-[swipe-axis=x]:[--drawer-content-width:min(75vw,480px)]!"
        : "data-[swipe-axis=x]:[--drawer-content-width:min(75vw,384px)]!"
      : "data-[swipe-axis=y]:[--drawer-height:min(680px,calc(100dvh-32px))]!",
    hasSnapPoints
      ? inset === 16
        ? "data-snap-points:[--drawer-content-height:calc(100dvh-32px)]!"
        : inset === 8
          ? "data-snap-points:[--drawer-content-height:calc(100dvh-16px)]!"
          : "data-snap-points:[--drawer-content-height:100dvh]!"
      : "",
  ].join(" ")

  return (
    <DrawerContent className={contentClassName}>
      <DrawerHeader>
        <DrawerTitle>{title}</DrawerTitle>
        <DrawerDescription>{description}</DrawerDescription>
      </DrawerHeader>
      <div data-slot="drawer-body" className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
        {children}
        {scrollable && <div className="grid gap-4">{Array.from({ length: 12 }, (_, index) => <p key={index} className="m-0 text-sm leading-5 text-muted-foreground">Contenido desplazable {index + 1}</p>)}</div>}
      </div>
      <DrawerFooter>
        {buttonAmount === 1 ? (
          <DrawerClose render={<Button className="w-full rounded-full" />}>Cerrar</DrawerClose>
        ) : (
          <>
            <Button className="w-full rounded-full">Confirmar</Button>
            <DrawerClose render={<Button variant="outline" className="w-full rounded-full" />}>Cancelar</DrawerClose>
          </>
        )}
      </DrawerFooter>
    </DrawerContent>
  )
}

export function DrawerExample({ behavior = "standard", swipeDirection = "right", sideWidth = 480, buttonAmount = 2, showSwipeHandle = false, scrollable = false, inset = 16 }: DrawerExampleProps) {
  const [snapPoint, setSnapPoint] = React.useState<number | string | null>(0.5)
  const snapPoints = [0.25, 0.5, 1]

  if (behavior === "snap-points") {
    return (
      <Drawer swipeDirection="down" showSwipeHandle snapPoints={snapPoints} snapPoint={snapPoint} onSnapPointChange={setSnapPoint} snapToSequentialPoints>
        <DrawerTrigger render={<Button variant="outline" />}>Abrir Snap Drawer</DrawerTrigger>
        <DrawerPanel swipeDirection="down" buttonAmount={1} inset={inset} hasSnapPoints>
          <p className="m-0 text-sm leading-5 text-muted-foreground">Arrastra para alternar entre 25%, 50% y 100%.</p>
        </DrawerPanel>
      </Drawer>
    )
  }

  if (behavior === "non-modal") {
    return (
      <Drawer swipeDirection={swipeDirection} modal={false} disablePointerDismissal showSwipeHandle={showSwipeHandle}>
        <DrawerTrigger render={<Button variant="outline" />}>Abrir Non-modal</DrawerTrigger>
        <DrawerPanel swipeDirection={swipeDirection} sideWidth={sideWidth} buttonAmount={buttonAmount} scrollable={scrollable} inset={inset} />
      </Drawer>
    )
  }

  if (behavior === "nested") {
    return (
      <Drawer swipeDirection={swipeDirection} showSwipeHandle={showSwipeHandle}>
        <DrawerTrigger render={<Button variant="outline" />}>Abrir Drawer</DrawerTrigger>
        <DrawerPanel swipeDirection={swipeDirection} sideWidth={sideWidth} buttonAmount={buttonAmount} scrollable={scrollable} inset={inset}>
          <Drawer swipeDirection={swipeDirection}>
            <DrawerTrigger render={<Button variant="outline" className="w-full" />}>Abrir Drawer anidado</DrawerTrigger>
            <DrawerPanel swipeDirection={swipeDirection} sideWidth={sideWidth} buttonAmount={1} inset={inset} title="Drawer anidado" description="Se apila sobre el drawer principal." />
          </Drawer>
        </DrawerPanel>
      </Drawer>
    )
  }

  return (
    <Drawer swipeDirection={swipeDirection} showSwipeHandle={showSwipeHandle}>
      <DrawerTrigger render={<Button variant="outline" />}>Abrir Drawer</DrawerTrigger>
      <DrawerPanel swipeDirection={swipeDirection} sideWidth={sideWidth} buttonAmount={buttonAmount} scrollable={scrollable} inset={inset} />
    </Drawer>
  )
}
