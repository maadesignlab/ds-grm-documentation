import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor } from "storybook/test"

import { NavigationMenuExample, navigationMenuExamplePresets, type NavigationMenuExampleProps } from "./navigation-menu-example"

const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const meta = {
  title: "Components/Navigation Menu",
  args: navigationMenuExamplePresets.playground,
  argTypes: {
    itemCount: { name: "Cantidad de ítems", control: "inline-radio", options: counts, table: { category: "Estructura" } },
    layout: { name: "Layout de contenido", control: "inline-radio", options: ["list", "featured"], table: { category: "Contenido" } },
    viewport: { name: "Viewport", control: "boolean", table: { category: "Comportamiento" } },
    defaultOpen: { name: "Abierto inicialmente", control: "boolean", table: { category: "Estado" } },
    activeItem: { name: "Ítem activo", control: "select", options: counts, if: { arg: "defaultOpen", truthy: true }, table: { category: "Estado" } },
    lastItemType: { name: "Último ítem", control: "inline-radio", options: ["dropdown", "link"], table: { category: "Estructura" } },
    disabledItem: { name: "Ítem deshabilitado", control: "select", options: ["none", ...counts], table: { category: "Estado" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2938-12924" } },
  render: args => <NavigationMenuExample key={`${args.itemCount}-${args.layout}-${args.viewport}-${args.defaultOpen}-${args.activeItem}-${args.lastItemType}-${args.disabledItem}`} {...args} />,
} satisfies Meta<NavigationMenuExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const count = args.itemCount ?? 3
    const lastIsLink = args.lastItemType === "link"
    const triggers = canvasElement.querySelectorAll<HTMLElement>('[data-slot="navigation-menu-trigger"]')
    const expectedTriggers = lastIsLink ? count - 1 : count
    await expect(triggers).toHaveLength(expectedTriggers)
    for (const trigger of triggers) await expect(trigger.getBoundingClientRect().height).toBe(36)

    if (triggers.length && !args.defaultOpen) await userEvent.click(triggers[0])
    if (triggers.length) {
      let content: HTMLElement | undefined
      await waitFor(() => {
        content = Array.from(canvasElement.querySelectorAll<HTMLElement>('[data-slot="navigation-menu-content"]')).find(element => element.getBoundingClientRect().width > 0)
        expect(content).toBeTruthy()
      })
      await expect(getComputedStyle(content!).paddingLeft).toBe("8px")
      await expect(getComputedStyle(content!).paddingRight).toBe("10px")
      await userEvent.keyboard("{Escape}")
    }
  },
}
