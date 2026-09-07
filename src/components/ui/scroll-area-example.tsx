"use client"

import * as React from "react"
import Image from "next/image"

import { ScrollArea, ScrollBar } from "./scroll-area"
import { Separator } from "./separator"

export type ScrollAreaExampleProps = {
  orientation?: "vertical" | "horizontal"
}

export const scrollAreaPlaygroundArgs = {
  orientation: "vertical",
} as const satisfies ScrollAreaExampleProps

export const scrollAreaExamplePresets = {
  playground: scrollAreaPlaygroundArgs,
  vertical: { orientation: "vertical" },
  horizontal: { orientation: "horizontal" },
} as const satisfies Record<string, ScrollAreaExampleProps>

const tags = Array.from({ length: 11 }, (_, index) => `v1.2.0-beta.${50 - index}`)
const locations = [
  { name: "Coacalco", image: "/scroll-area/coacalco.jpeg" },
  { name: "Toluca", image: "/scroll-area/toluca.png" },
  { name: "Metepec", image: "/scroll-area/metepec.png" },
] as const

function VerticalExample() {
  return (
    <ScrollArea className="h-[286px] w-[190px] overflow-hidden rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">Tags</h4>
        {tags.map(tag => (
          <React.Fragment key={tag}>
            <div className="text-sm leading-5 text-foreground">{tag}</div>
            <Separator className="my-2" />
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  )
}

function HorizontalExample() {
  return (
    <ScrollArea className="h-[256px] w-[382px] max-w-full overflow-hidden rounded-md border p-4 **:data-[slot=scroll-area-viewport]:rounded-md">
      <div className="flex gap-4">
        {locations.map(location => (
          <figure key={location.name} className="w-[150px] shrink-0">
            <div className="overflow-hidden rounded-md">
              <Image src={location.image} alt={`Sede ${location.name}`} className="h-[200px] w-[150px] object-cover" width={150} height={200} />
            </div>
            <figcaption className="pt-2 text-xs font-medium leading-4 text-foreground">{location.name}</figcaption>
          </figure>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export function ScrollAreaExample({ orientation = "vertical" }: ScrollAreaExampleProps) {
  return orientation === "horizontal" ? <HorizontalExample /> : <VerticalExample />
}
