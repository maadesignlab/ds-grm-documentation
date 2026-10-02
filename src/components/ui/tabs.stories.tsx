import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within, waitFor } from "storybook/test"

import { TabsExample, TabsOverflowExample, type TabsExampleProps, type TabsOverflowExampleProps } from "./tabs-example"

const meta = {
  title: "Components/Tabs",
  args: { composition: "tabs", visibleTabs: 2, variant: "default", orientation: "horizontal", tabAmount: 4, activeTab: 1, iconPosition: "none", disabledTab: false, showContent: true },
  argTypes: {
    variant: { name: "Estilo", control: "inline-radio", options: ["default", "line"], table: { category: "Apariencia" } },
    orientation: { name: "Orientación", control: "inline-radio", options: ["horizontal", "vertical"], table: { category: "Disposición" } },
    composition: { name: "Composición", control: "inline-radio", options: ["tabs", "overflow"], table: { category: "Disposición" } },
    visibleTabs: { name: "Pestañas visibles · Overflow", control: "inline-radio", options: [2, 3, 4], table: { category: "Disposición" } },
    tabAmount: { name: "Cantidad", control: { type: "range", min: 2, max: 9, step: 1 }, table: { category: "Contenido" } },
    activeTab: { name: "Tab activa", control: { type: "range", min: 1, max: 9, step: 1 }, table: { category: "Estado" } },
    iconPosition: { name: "Iconos", control: "inline-radio", options: ["none", "left", "right", "both"], table: { category: "Contenido" } },
    disabledTab: { name: "Última deshabilitada", control: "boolean", table: { category: "Estado" } },
    showContent: { name: "Mostrar panel", control: "boolean", table: { category: "Contenido" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1-33" } },
  render: args => args.composition === "overflow" ? <TabsOverflowExample key={JSON.stringify(args)} {...args} /> : <TabsExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<TabsExampleProps & TabsOverflowExampleProps & { composition?: "tabs" | "overflow" }>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    if (args.composition === "overflow") return
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

const overflowPlay: Story["play"] = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  const tabs = canvas.getAllByRole("tab")
  const previous = canvas.getByRole("button", { name: "Mostrar pestañas anteriores" })
  const next = canvas.getByRole("button", { name: "Mostrar pestañas siguientes" })
  const viewport = canvasElement.querySelector<HTMLElement>('[data-slot="tabs-overflow-viewport"]')!
  const selected = Math.min(8, Math.max(1, args.activeTab ?? 1)) - 1
  await expect(tabs).toHaveLength(8)
  await expect(tabs[selected]).toHaveAttribute("aria-selected", "true")
  await expect(viewport.getBoundingClientRect().height).toBe(32)
  await expect(Math.abs(tabs[0].getBoundingClientRect().width * (args.visibleTabs ?? 2) - viewport.getBoundingClientRect().width)).toBeLessThan(1)
  if (!next.hasAttribute("disabled")) await userEvent.click(next)
  else await expect(previous).toBeEnabled()
  await expect(tabs[selected]).toHaveAttribute("aria-selected", "true")
  if (selected === 0) {
    await userEvent.click(tabs[2])
    await expect(tabs[2]).toHaveAttribute("aria-selected", "true")
    await userEvent.keyboard("{End}")
    const last = args.disabledTab ? 6 : 7
    await expect(tabs[last]).toHaveFocus()
    await waitFor(() => expect(tabs[last].getBoundingClientRect().right).toBeLessThanOrEqual(viewport.getBoundingClientRect().right + 1))
    await userEvent.keyboard("{Home}")
    await expect(tabs[0]).toHaveFocus()
    await waitFor(() => expect(tabs[0].getBoundingClientRect().left).toBeGreaterThanOrEqual(viewport.getBoundingClientRect().left - 1))
    await expect(previous).toBeDisabled()
  }
  for (let step = 0; step < 4 && !next.hasAttribute("disabled"); step++) await userEvent.click(next)
  await expect(next).toBeDisabled()
  const root = canvasElement.querySelector<HTMLElement>('[data-slot="tabs-overflow"]')!
  root.style.width = "248px"
  await waitFor(() => expect(root.getBoundingClientRect().width).toBe(248))
  await expect(Math.abs(tabs[0].getBoundingClientRect().width * (args.visibleTabs ?? 2) - viewport.getBoundingClientRect().width)).toBeLessThan(1)
}
export const OverflowTwo: Story = { tags: ["!dev", "!autodocs"], args: { composition: "overflow", visibleTabs: 2 }, play: overflowPlay }
export const OverflowThree: Story = { tags: ["!dev", "!autodocs"], args: { composition: "overflow", visibleTabs: 3 }, play: overflowPlay }
export const OverflowFour: Story = { tags: ["!dev", "!autodocs"], args: { composition: "overflow", visibleTabs: 4 }, play: overflowPlay }
export const OverflowSelected: Story = { tags: ["!dev", "!autodocs"], args: { composition: "overflow", activeTab: 8, visibleTabs: 2 }, play: overflowPlay }
export const OverflowDisabled: Story = { tags: ["!dev", "!autodocs"], args: { composition: "overflow", visibleTabs: 3, disabledTab: true }, play: overflowPlay }
