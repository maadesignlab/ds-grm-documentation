import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { TabsExample, type TabsExampleProps } from "./tabs-example"

const meta = {
  title: "Components/Tabs",
  args: { variant: "default", orientation: "horizontal", tabAmount: 4, activeTab: 1, iconPosition: "none", disabledTab: false, showContent: true },
  argTypes: {
    variant: { name: "Estilo", control: "inline-radio", options: ["default", "line"], table: { category: "Apariencia" } },
    orientation: { name: "Orientación", control: "inline-radio", options: ["horizontal", "vertical"], table: { category: "Disposición" } },
    tabAmount: { name: "Cantidad", control: { type: "range", min: 2, max: 9, step: 1 }, table: { category: "Contenido" } },
    activeTab: { name: "Tab activa", control: { type: "range", min: 1, max: 9, step: 1 }, table: { category: "Estado" } },
    iconPosition: { name: "Iconos", control: "inline-radio", options: ["none", "left", "right", "both"], table: { category: "Contenido" } },
    disabledTab: { name: "Última deshabilitada", control: "boolean", table: { category: "Estado" } },
    showContent: { name: "Mostrar panel", control: "boolean", table: { category: "Contenido" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-33" } },
  render: args => <TabsExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<TabsExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const tabs = canvas.getAllByRole("tab")
    await expect(tabs).toHaveLength(args.tabAmount ?? 4)
    const selectedIndex = Math.min(Math.max(args.activeTab ?? 1, 1), args.tabAmount ?? 4) - 1
    await expect(tabs[selectedIndex]).toHaveAttribute("aria-selected", "true")
    await expect(tabs[0].closest("[data-slot=tabs]")).toHaveAttribute("data-orientation", args.orientation ?? "horizontal")
    const nextTab = tabs.find((tab, index) => index !== selectedIndex && !tab.hasAttribute("disabled"))
    if (nextTab) {
      await userEvent.click(nextTab)
      await expect(nextTab).toHaveAttribute("aria-selected", "true")
    }
    await expect(canvasElement.querySelectorAll("[data-slot=tabs-trigger] svg").length).toBe((args.iconPosition === "both" ? 2 : args.iconPosition === "none" ? 0 : 1) * (args.tabAmount ?? 4))
  },
}
