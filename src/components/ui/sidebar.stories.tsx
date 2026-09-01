"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
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
export const Playground: Story = {}
