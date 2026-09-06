import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"

import { KbdExample, kbdExamplePresets, type KbdExampleProps } from "./kbd-example"

const meta = {
  title: "Components/Kbd",
  args: kbdExamplePresets.playground,
  argTypes: {
    composition: { name: "Composición", control: "select", options: ["single", "group", "button", "tooltip", "input-group"], table: { category: "Composición oficial" } },
    content: { name: "Contenido", control: "inline-radio", options: ["text", "icon"], description: "Se expresa mediante children; no es una prop de Kbd.", table: { category: "Children" } },
    text: { name: "Texto", control: "text", if: { arg: "content", eq: "text" }, table: { category: "Children" } },
    tooltipOpen: { name: "Tooltip abierto", control: "boolean", if: { arg: "composition", eq: "tooltip" }, table: { category: "Composición Tooltip" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2793-2325" } },
  render: args => <KbdExample {...args} />,
} satisfies Meta<KbdExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const expectedKeys = ["group", "tooltip", "input-group"].includes(args.composition ?? "single") ? 2 : 1
    const root = args.composition === "tooltip" ? canvasElement.ownerDocument : canvasElement
    await expect(root.querySelectorAll("[data-slot=kbd]").length).toBe(expectedKeys)
    for (const key of root.querySelectorAll<HTMLElement>("[data-slot=kbd]")) {
      await expect(key).toBeVisible()
    }
  },
}
