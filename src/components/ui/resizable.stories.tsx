import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { ResizableExample, resizableExamplePresets, type ResizableExampleProps } from "./resizable-example"

const meta = {
  title: "Components/Resizable",
  args: resizableExamplePresets.playground,
  argTypes: {
    orientation: { name: "Orientación", control: "inline-radio", options: ["horizontal", "vertical"], table: { category: "ResizablePanelGroup" } },
    distribution: { name: "Distribución inicial", control: "inline-radio", options: ["25/75", "50/50", "75/25"], description: "Se traduce a defaultSize con porcentajes de react-resizable-panels v4.", table: { category: "ResizablePanel" } },
    withHandle: { name: "Grip visible", control: "boolean", description: "Prop oficial de ResizableHandle.", table: { category: "ResizableHandle" } },
    layout: { name: "Composición", control: "inline-radio", options: ["two-panels", "nested"], table: { category: "Composición oficial" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2882-453" } },
  render: args => <div className="w-[450px] max-w-[calc(100vw-32px)]"><ResizableExample {...args} /></div>,
} satisfies Meta<ResizableExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const panels = canvasElement.querySelectorAll("[data-slot=resizable-panel]")
    const handles = canvas.getAllByRole("separator")
    await expect(panels.length).toBe(args.layout === "nested" ? 4 : 2)
    await expect(handles.length).toBe(args.layout === "nested" ? 2 : 1)
    for (const handle of handles) {
      await expect(handle).toHaveAttribute("tabindex", "0")
      await expect(handle).toHaveAttribute("aria-valuenow")
    }
  },
}
