import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { SliderExample, sliderExamplePresets, type SliderExampleProps } from "./slider-example"

const meta = {
  title: "Components/Slider",
  args: sliderExamplePresets.playground,
  argTypes: {
    type: {
      name: "Tipo",
      control: "inline-radio",
      options: ["single", "range", "multiple"],
      description: "Composición definida por la cantidad de valores del arreglo.",
      table: { category: "Composición" },
    },
    orientation: {
      name: "Orientación",
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      table: { category: "Slider" },
    },
    valueLevel: {
      name: "Valor",
      control: "inline-radio",
      options: ["low", "medium", "high"],
      description: "Preset de valores para documentar los estados de Figma.",
      table: { category: "Composición" },
    },
    disabled: {
      name: "Deshabilitado",
      control: "boolean",
      table: { category: "Slider" },
    },
    label: {
      name: "Label",
      control: "text",
      if: { arg: "type", eq: "range" },
      table: { category: "Composición" },
    },
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2772-1030",
    },
  },
  render: args => <SliderExample {...args} />,
} satisfies Meta<SliderExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const slider = canvasElement.querySelector<HTMLElement>('[data-slot="slider"]')
    const track = canvasElement.querySelector<HTMLElement>('[data-slot="slider-track"]')
    const thumbs = canvasElement.querySelectorAll<HTMLElement>('[data-slot="slider-thumb"]')
    const expectedThumbs = args.type === "multiple" ? 3 : args.type === "range" ? 2 : 1

    await expect(slider).toBeVisible()
    await expect(slider).toHaveAttribute("data-orientation", args.orientation)
    await expect(thumbs).toHaveLength(expectedThumbs)
    await expect(track).toBeVisible()
    await expect(slider?.getBoundingClientRect()[args.orientation === "horizontal" ? "width" : "height"]).toBe(240)
    await expect(track?.getBoundingClientRect()[args.orientation === "horizontal" ? "height" : "width"]).toBe(4)

    if (args.disabled) await expect(slider).toHaveAttribute("data-disabled")
    else await expect(slider).not.toHaveAttribute("data-disabled")
  },
}
