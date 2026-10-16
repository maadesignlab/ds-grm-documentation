import type { StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"
import base from "../../src/components/ui/tabs.stories"
const meta = { ...base, id: "internal-tabs", title: "Interno/Tabs", tags: ["!dev", "!autodocs"] }
export default meta
type Story = StoryObj<typeof base>
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
