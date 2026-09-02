import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { DropdownMenuExample, type DropdownMenuExampleProps } from "./dropdown-menu-example"

const meta = {
  title: "Components/Dropdown Menu",
  args: { align: "start", trigger: "button", defaultOpen: false, showLabel: true, showIcons: true, showSubmenu: true },
  argTypes: {
    trigger: { name: "Trigger", control: "inline-radio", options: ["button", "icon"], table: { category: "Estructura" } },
    align: { name: "Alineación", control: "inline-radio", options: ["start", "end"], table: { category: "Posición" } },
    defaultOpen: { name: "Abierto inicialmente", control: "boolean", table: { category: "Estado" } },
    showLabel: { name: "Mostrar label", control: "boolean", table: { category: "Contenido" } },
    showIcons: { name: "Mostrar iconos", control: "boolean", table: { category: "Contenido" } },
    showSubmenu: { name: "Mostrar submenú", control: "boolean", table: { category: "Contenido" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1521-4708" } },
  render: (args) => <DropdownMenuExample key={`${args.trigger}-${args.align}-${args.defaultOpen}`} {...args} />,
} satisfies Meta<DropdownMenuExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: /Ajustes|Abrir ajustes/ })
    await expect(trigger).toBeVisible()
    if (trigger.getAttribute("data-state") !== "open") await userEvent.click(trigger)
    const menu = within(canvasElement.ownerDocument.body)
    await waitFor(() => expect(menu.getByRole("menuitem", { name: "Pantalla dividida" })).toBeVisible())
  },
}
