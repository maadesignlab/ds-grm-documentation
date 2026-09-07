import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { CollapsibleExample, collapsibleExamplePresets, type CollapsibleExampleProps } from "./collapsible-example"

const meta = {
  title: "Components/Collapsible",
  args: collapsibleExamplePresets.playground,
  argTypes: {
    pattern: { name: "Patrón", control: "inline-radio", options: ["fixedTrigger", "expandableTrigger"], table: { category: "Composición" } },
    defaultOpen: { name: "Iniciar expandido", control: "boolean", table: { category: "Estado" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1771-929" } },
  render: args => <CollapsibleExample {...args} />,
} satisfies Meta<CollapsibleExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: args.pattern === "fixedTrigger" ? /cita prenatal/i : /detalles de la consulta/i })
    const root = canvasElement.querySelector<HTMLElement>("[data-slot=collapsible]")
    await expect(root).toBeVisible()
    await expect(root?.getBoundingClientRect().width).toBe(350)
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("data-state", args.defaultOpen ? "closed" : "open")
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute("data-state", args.defaultOpen ? "open" : "closed")
  },
}
