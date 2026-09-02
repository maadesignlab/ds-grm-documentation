"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"
import { SidebarExample } from "./sidebar-example"

type SidebarStoryArgs = {
  state: "expanded" | "collapsed"
  side: "left" | "right"
  variant: "sidebar" | "floating" | "inset"
  collapsible: "offcanvas" | "icon" | "none"
  activeItem: string
  expandedGroups: boolean
}

const meta = {
  title: "Components/Sidebar",
  args: { state: "expanded", side: "left", variant: "sidebar", collapsible: "icon", activeItem: "", expandedGroups: false },
  argTypes: {
    state: { name: "Estado", control: "inline-radio", options: ["expanded", "collapsed"], table: { category: "Sidebar" } },
    side: { name: "Lado", control: "inline-radio", options: ["left", "right"], table: { category: "API oficial" } },
    variant: { name: "Variante", control: "select", options: ["sidebar", "floating", "inset"], table: { category: "API oficial" } },
    collapsible: { name: "Colapsable", control: "inline-radio", options: ["offcanvas", "icon", "none"], table: { category: "API oficial" } },
    activeItem: { name: "Ítem activo", control: "select", options: ["", "Inicio", "Dashboard", "Pacientes", "Reina Wallet", "Servicios", "Staff", "Solicitudes", "Regiones", "Ajustes"], labels: { "": "Ninguno" }, table: { category: "Contenido" } },
    expandedGroups: { name: "Submenús abiertos", control: "boolean", table: { category: "Contenido" } },
  },
  parameters: {
    layout: "fullscreen",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=3114-1373" },
  },
  render: (args) => <SidebarExample key={`${args.state}-${args.side}-${args.variant}-${args.collapsible}-${args.expandedGroups}`} className="min-h-[902px]" {...args} />,
} satisfies Meta<SidebarStoryArgs>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const menu = canvasElement.querySelector<HTMLElement>('[data-slot="sidebar-menu"]')
    const trigger = canvas.getByRole("button", { name: "Toggle Sidebar" })
    const firstItemText = canvas.getByText("Inicio")
    const collapsibleItem = canvas.getByRole("button", { name: /Pacientes/ })

    expect(menu).not.toBeNull()
    expect(getComputedStyle(menu!).listStyleType).toBe("none")
    expect(getComputedStyle(firstItemText).fontSize).toBe("14px")
    expect(getComputedStyle(firstItemText).lineHeight).toBe("20px")
    expect(trigger.getBoundingClientRect().width).toBe(32)
    expect(trigger.getBoundingClientRect().height).toBe(32)

    await userEvent.click(collapsibleItem)
    const subItem = await canvas.findByRole("link", { name: "Directorio" })
    expect(getComputedStyle(subItem).fontSize).toBe("14px")
    expect(getComputedStyle(subItem).lineHeight).toBe("20px")
    expect(getComputedStyle(subItem).fontWeight).toBe("400")
    await userEvent.click(collapsibleItem)

    await userEvent.click(trigger)
    await waitFor(() => {
      expect(canvasElement.querySelector('[data-slot="sidebar"]')?.getAttribute("data-state")).toBe("collapsed")
    })

    const groupLabel = canvasElement.querySelector<HTMLElement>('[data-slot="sidebar-group-label"]')
    expect(groupLabel).not.toBeNull()
    expect(getComputedStyle(groupLabel!, "::after").width).toBe("16px")

    await userEvent.click(trigger)
  },
}
