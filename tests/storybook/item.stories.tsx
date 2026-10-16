import type { StoryObj } from "@storybook/nextjs-vite"
import { expect } from "storybook/test"
import base, { Playground } from "../../src/components/ui/item.stories"
const meta = { ...base, id: "internal-item", title: "Interno/Item", tags: ["!dev", "!autodocs"] }
export default meta
type Story = StoryObj<typeof base>
const statusPlay: NonNullable<Story["play"]> = async context => {
  await Playground.play!(context)
  const item = context.canvasElement.querySelector<HTMLElement>('[data-slot="item"]')!
  const title = item.querySelector<HTMLElement>('[data-slot="item-title"]')!
  const description = item.querySelector<HTMLElement>('[data-slot="item-description"]')!
  await expect(getComputedStyle(title).color).toBe(getComputedStyle(description).color)
  await expect(getComputedStyle(item).backgroundColor).not.toBe("rgba(0, 0, 0, 0)")
  await expect(item.querySelector('[data-slot="item-media"] svg')).toBeTruthy()
  await expect(item.querySelector('[data-slot="item-actions"]')).toBeNull()
}

export const SuccessRegression: Story = { tags: ["!dev", "!autodocs"], args: { appearance: "light", status: "success", showTrailing: false }, play: statusPlay }
export const WarningRegression: Story = { tags: ["!dev", "!autodocs"], globals: { brandTheme: "reina-madre" }, args: { appearance: "light", status: "warning", showTrailing: false }, play: statusPlay }
export const ErrorRegression: Story = { tags: ["!dev", "!autodocs"], globals: { brandTheme: "maria-linda" }, args: { appearance: "light", status: "error", showTrailing: false }, play: statusPlay }
export const InfoRegression: Story = { tags: ["!dev", "!autodocs"], globals: { brandTheme: "piel-sana" }, args: { appearance: "light", status: "info", showTrailing: false }, play: statusPlay }
export const CompactRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { layout: "compact" },
  play: async context => {
    await Playground.play!(context)
    const description = context.canvasElement.querySelector<HTMLElement>('[data-slot="item-description"]')!
    await expect(getComputedStyle(description).fontSize).toBe("12px")
    await expect(getComputedStyle(description).lineHeight).toBe("16px")
  },
}
