"use client"

import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"

export type CarouselExampleProps = {
  size?: "full" | "large" | "medium" | "small"
  orientation?: "horizontal" | "vertical"
  items?: number
  disabled?: boolean
  loop?: boolean
  setApi?: (api: CarouselApi) => void
  contentClassName?: string
  itemClassName?: string
}

export function CarouselExample({ size = "full", orientation = "horizontal", items = 4, disabled = false, loop = false, setApi, contentClassName, itemClassName }: CarouselExampleProps) {
  return (
    <Carousel size={size} orientation={orientation} opts={{ active: !disabled, align: "start", watchDrag: !disabled, loop }} setApi={setApi} aria-disabled={disabled || undefined}>
      <CarouselContent className={contentClassName}>
        {Array.from({ length: items }, (_, index) => (
          <CarouselItem className={itemClassName} key={index}>
            <div className="flex h-full items-center justify-center rounded-md border border-border bg-muted font-sans text-2xl font-medium text-muted-foreground">{index + 1}</div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious disabled={disabled || undefined} />
      <CarouselNext disabled={disabled || undefined} />
    </Carousel>
  )
}
