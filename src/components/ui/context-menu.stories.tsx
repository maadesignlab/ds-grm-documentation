import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { ContextMenuExample, type ContextMenuExampleProps } from "./context-menu-example"

const meta = {
  title: "Components/Context Menu",
  args: { opened: false, showLabel: true, showIcons: true, showShortcut: true, showSubmenu: true },
  argTypes: {
    opened: { name: "Abierto inicialmente", control: "boolean", table: { category: "Estado" } },
    showLabel: { name: "Mostrar label", control: "boolean", table: { category: "Contenido" } },
    showIcons: { name: "Mostrar iconos", control: "boolean", table: { category: "Contenido" } },
    showShortcut: { name: "Mostrar shortcut", control: "boolean", table: { category: "Contenido" } },
    showSubmenu: { name: "Mostrar submenú", control: "boolean", table: { category: "Contenido" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1675-339" } },
  render: args => <ContextMenuExample key={`${args.opened}`} {...args} />,
} satisfies Meta<ContextMenuExampleProps>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByText("Haz clic derecho aquí")
    await expect(trigger).toBeVisible()
    expect(trigger.getBoundingClientRect().height).toBe(192)
    expect(trigger).toHaveAttribute("data-state", "closed")
    expect(canvasElement.ownerDocument.querySelector("[data-slot='context-menu-content']")).toBeNull()
  },
}
