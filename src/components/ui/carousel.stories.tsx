import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel"

type CarouselStoryArgs = {
  size: "full" | "large" | "medium" | "small"
  orientation: "horizontal" | "vertical"
  items: number
  disabled: boolean
}

const meta = {
  title: "Components/Carousel",
  args: { size: "full", orientation: "horizontal", items: 4, disabled: false },
  argTypes: {
    size: { name: "Tamaño", control: "inline-radio", options: ["full", "large", "medium", "small"], table: { category: "Carousel" } },
    orientation: { name: "Orientación", control: "inline-radio", options: ["horizontal", "vertical"], table: { category: "Carousel" } },
    items: { name: "Ítems", control: { type: "range", min: 2, max: 10, step: 1 }, table: { category: "Contenido" } },
    disabled: { name: "Deshabilitado", control: "boolean", table: { category: "Estado" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2782-1341" } },
  render: ({ size, orientation, items, disabled }) => (
    <Carousel size={size} orientation={orientation} opts={{ active: !disabled, align: "start", watchDrag: !disabled }} aria-disabled={disabled || undefined}>
      <CarouselContent>
        {Array.from({ length: items }, (_, index) => <CarouselItem key={index}><div className="flex h-full items-center justify-center rounded-md border border-border bg-muted font-sans text-2xl font-medium text-muted-foreground">{index + 1}</div></CarouselItem>)}
      </CarouselContent>
      <CarouselPrevious {...(disabled ? { disabled: true } : {})} />
      <CarouselNext {...(disabled ? { disabled: true } : {})} />
    </Carousel>
  ),
} satisfies Meta<CarouselStoryArgs>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
