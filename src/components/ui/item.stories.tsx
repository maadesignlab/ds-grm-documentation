import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { ItemExample, itemExamplePresets, type ItemExampleProps } from "./item-example"

const meta = {
  title: "Components/Item",
  args: itemExamplePresets.playground,
  argTypes: {
    composition: { name: "Composición", control: "inline-radio", options: ["single", "list", "grid"], table: { category: "Composición" } },
    pattern: { name: "Patrón", control: "select", options: ["basic", "group", "header", "link", "dropdown"], if: { arg: "composition", eq: "single" }, table: { category: "Composición" } },
    appearance: { name: "Apariencia", control: "inline-radio", options: ["default", "outline", "muted"], if: { arg: "pattern", neq: "dropdown" }, table: { category: "Item" } },
    size: { name: "Tamaño oficial", control: "inline-radio", options: ["default", "sm", "xs"], if: { arg: "pattern", neq: "dropdown" }, table: { category: "Item" } },
    layout: { name: "Layout", control: "inline-radio", options: ["default", "compact", "stacked"], if: { arg: "composition", eq: "single" }, table: { category: "Item" } },
    leading: { name: "Contenido inicial", control: "select", options: ["none", "icon", "avatar", "avatarGroup", "image"], if: { arg: "layout", neq: "stacked" }, table: { category: "Contenido" } },
    trailing: { name: "Contenido final", control: "select", options: ["none", "button", "icon", "iconButton", "time"], if: { arg: "layout", neq: "stacked" }, table: { category: "Contenido" } },
    description: { name: "Descripción", control: "boolean", table: { category: "Contenido" } },
    itemCount: { name: "Cantidad", control: "inline-radio", options: [2, 3, 4, 5], if: { arg: "composition", neq: "single" }, table: { category: "Grupo" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2190-1413" } },
  render: args => <ItemExample {...args} />,
} satisfies Meta<ItemExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const items = canvasElement.querySelectorAll<HTMLElement>("[data-slot=item]")
    const expectedCount = args.pattern === "dropdown" ? 0 : args.pattern === "header" || args.pattern === "group" ? 3 : args.composition === "single" ? 1 : args.itemCount
    await expect(items.length).toBe(expectedCount)

    if (args.pattern === "dropdown") {
      const trigger = within(canvasElement).getByRole("button", { name: /ajustes/i })
      await userEvent.click(trigger)
      const content = document.querySelector<HTMLElement>("[data-slot=dropdown-menu-content]")
      const dropdownItems = document.querySelectorAll<HTMLElement>("[data-slot=dropdown-menu-content] [data-slot=item]")
      await expect(Math.round(content?.getBoundingClientRect().width ?? 0)).toBe(176)
      await expect(dropdownItems.length).toBe(3)
      for (const item of dropdownItems) {
        const style = getComputedStyle(item)
        await expect(item).toHaveAttribute("data-size", "sm")
        await expect(style.paddingTop).toBe("4px")
        await expect(style.paddingRight).toBe("6px")
        await expect(style.paddingBottom).toBe("4px")
        await expect(style.paddingLeft).toBe("6px")
        await expect(style.gap).toBe("8px")
        await expect(item.querySelector<HTMLElement>("[data-slot=avatar]")?.getBoundingClientRect().width).toBe(28)
        await expect(getComputedStyle(item.querySelector<HTMLElement>("[data-slot=item-content]")!).gap).toBe("0px")
        await expect(getComputedStyle(item.querySelector<HTMLElement>("[data-slot=item-title]")!).fontSize).toBe("14px")
        await expect(getComputedStyle(item.querySelector<HTMLElement>("[data-slot=item-description]")!).fontSize).toBe("12px")
      }
      await userEvent.click(trigger)
      return
    }

    if (items[0]) {
      await expect(items[0]).toHaveAttribute("data-variant", args.appearance)

      if (args.leading === "image" && args.layout !== "stacked" && args.pattern === "basic") {
        const media = items[0].querySelector<HTMLElement>('[data-slot="item-media"][data-variant="image"]')
        const image = media?.querySelector("img")
        await expect(media).toBeInTheDocument()
        await expect(image).toHaveAttribute("src", expect.stringContaining("coacalco.jpeg"))
        await expect(image).toHaveAttribute("alt", "Clínica Reina Madre Coacalco")
      }

      if (args.composition === "single" && args.pattern === "basic") {
        const style = getComputedStyle(items[0])
        const expected = args.size === "xs"
          ? { gap: "8px", paddingBlock: "8px", paddingInline: "10px" }
          : { gap: "10px", paddingBlock: "10px", paddingInline: "12px" }

        await expect(style.gap).toBe(expected.gap)
        await expect(style.paddingTop).toBe(expected.paddingBlock)
        await expect(style.paddingBottom).toBe(expected.paddingBlock)
        await expect(style.paddingLeft).toBe(expected.paddingInline)
        await expect(style.paddingRight).toBe(expected.paddingInline)
        await expect(Math.round(items[0].getBoundingClientRect().width)).toBe(args.layout === "stacked" ? 182 : 511)
      }
    }
  },
}
