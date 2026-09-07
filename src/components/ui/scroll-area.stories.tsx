import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { ScrollAreaExample, scrollAreaExamplePresets, type ScrollAreaExampleProps } from "./scroll-area-example"

const meta = {
  title: "Components/Scroll Area",
  args: scrollAreaExamplePresets.playground,
  argTypes: {
    orientation: { name: "Orientación", control: "inline-radio", options: ["vertical", "horizontal"], table: { category: "Composición" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1800-1860" } },
  render: args => <ScrollAreaExample {...args} />,
} satisfies Meta<ScrollAreaExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const root = canvasElement.querySelector<HTMLElement>("[data-slot=scroll-area]")
    const viewport = canvasElement.querySelector<HTMLElement>("[data-slot=scroll-area-viewport]")

    await expect(root).toBeVisible()
    await expect(viewport).toBeVisible()
    if (args.orientation === "horizontal") {
      await expect(viewport?.scrollWidth).toBeGreaterThan(viewport?.clientWidth ?? 0)
    } else {
      await expect(viewport?.scrollHeight).toBeGreaterThan(viewport?.clientHeight ?? 0)
    }
  },
}
