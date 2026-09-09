import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { CarouselExample, type CarouselExampleProps } from "./carousel-example"

const meta = {
  title: "Components/Carousel",
  component: CarouselExample,
  args: { size: "full", orientation: "horizontal", items: 4, disabled: false },
  argTypes: {
    size: { name: "Tamaño", control: "inline-radio", options: ["full", "large", "medium", "small"], table: { category: "Carousel" } },
    orientation: { name: "Orientación", control: "inline-radio", options: ["horizontal", "vertical"], table: { category: "Carousel" } },
    items: { name: "Ítems", control: { type: "range", min: 2, max: 10, step: 1 }, table: { category: "Contenido" } },
    disabled: { name: "Deshabilitado", control: "boolean", table: { category: "Estado" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2782-1341" } },
  render: args => <CarouselExample {...args} />,
} satisfies Meta<CarouselExampleProps>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
