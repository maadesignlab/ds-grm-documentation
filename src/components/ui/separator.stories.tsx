import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { SeparatorExample, separatorExamplePresets, type SeparatorExampleProps } from "./separator-example"

const meta = {
  title: "Components/Separator",
  args: separatorExamplePresets.playground,
  argTypes: {
    orientation: { name: "Orientación", control: "inline-radio", options: ["horizontal", "vertical"], table: { category: "Separator" } },
    decorative: { name: "Decorativo", control: "boolean", table: { category: "Accesibilidad" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=589-983" } },
  render: args => <SeparatorExample {...args} />,
} satisfies Meta<SeparatorExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const separator = canvasElement.querySelector<HTMLElement>('[data-slot="separator"]')
    await expect(separator).toBeInTheDocument()
    await expect(separator).toHaveAttribute("data-orientation", args.orientation)
    const rect = separator!.getBoundingClientRect()
    if (args.orientation === "vertical") {
      await expect(rect.width).toBe(1)
      await expect(rect.height).toBe(69)
    } else {
      await expect(rect.width).toBe(193)
      await expect(rect.height).toBe(1)
    }
    if (args.decorative) await expect(separator).toHaveAttribute("role", "none")
    else await expect(separator).toHaveAttribute("role", "separator")
  },
}
