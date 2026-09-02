import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { SpinnerExample, type SpinnerExampleProps } from "./spinner-example"

const meta = {
  title: "Components/Spinner",
  args: { size: 16 },
  argTypes: {
    size: {
      name: "Tamaño",
      control: "inline-radio",
      options: [12, 16, 24, 32],
      table: { category: "Apariencia" },
    },
  },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2206-19610",
    },
  },
  render: args => <SpinnerExample {...args} />,
} satisfies Meta<SpinnerExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const spinner = canvasElement.querySelector<SVGElement>("[data-slot=spinner]")
    await expect(spinner).toBeTruthy()
    await expect(spinner).toHaveAttribute("role", "status")
    await expect(spinner).toHaveAttribute("aria-label", "Loading")
    await expect(getComputedStyle(spinner!).width).toBe(`${args.size}px`)
    await expect(getComputedStyle(spinner!).height).toBe(`${args.size}px`)
    await expect(getComputedStyle(spinner!).animationDuration).toBe("0.8s")
  },
}
