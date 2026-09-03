import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { PopoverExample, type PopoverExampleProps } from "./popover-example"

const meta = {
  title: "Components/Popover",
  args: { align: "start", side: "bottom", opened: false, content: "basic" },
  argTypes: {
    align: { name: "Alineación del trigger", control: "inline-radio", options: ["start", "center", "end"], table: { category: "Posición" } },
    side: { name: "Lado", control: "inline-radio", options: ["top", "right", "bottom", "left"], table: { category: "Posición" } },
    opened: { name: "Abierto", control: "boolean", table: { category: "Estado" } },
    content: { name: "Contenido", control: "inline-radio", options: ["basic", "form"], table: { category: "Composición" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=726-6350" } },
  render: args => <PopoverExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<PopoverExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Button" })
    await expect(trigger).toBeVisible()
    if (!args.opened) await userEvent.click(trigger)
    await waitFor(() => {
      const content = canvasElement.ownerDocument.querySelector<HTMLElement>("[data-slot=popover-content]")
      expect(content).toBeTruthy()
      expect(content?.getBoundingClientRect().width).toBe(288)
      expect(getComputedStyle(content!).padding).toBe("10px")
      expect(content?.dataset.side).toBe(args.side)
      expect(content?.dataset.align).toBe(args.align)
    })
  },
}
