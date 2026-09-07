import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import { MenubarExample, menubarExamplePresets, type MenubarExampleProps } from "./menubar-example"

const optionCounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const meta = {
  title: "Components/Menubar",
  args: menubarExamplePresets.playground,
  argTypes: {
    optionCount: { name: "Cantidad de opciones", control: "inline-radio", options: optionCounts, table: { category: "Estructura" } },
    defaultOpen: { name: "Abierto inicialmente", control: "boolean", table: { category: "Estado" } },
    activeOption: { name: "Opción activa", control: "select", options: optionCounts, if: { arg: "defaultOpen", truthy: true }, table: { category: "Estado" } },
    disabledOption: { name: "Opción deshabilitada", control: "select", options: ["none", ...optionCounts], table: { category: "Estado" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2938-11449" } },
  render: args => <MenubarExample key={`${args.optionCount}-${args.defaultOpen}-${args.activeOption}-${args.disabledOption}`} {...args} />,
} satisfies Meta<MenubarExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const triggers = canvas.getAllByRole("menuitem")
    const optionCount = args.optionCount ?? 3
    const activeOption = args.activeOption ?? 1
    await expect(triggers).toHaveLength(optionCount)
    await expect(canvasElement.querySelector("[data-slot=menubar]")?.getBoundingClientRect().height).toBe(32)
    for (const trigger of triggers) await expect(trigger.getBoundingClientRect().height).toBe(24)

    const activeIndex = Math.min(activeOption, optionCount) - 1
    const trigger = triggers[activeIndex]
    if (!args.defaultOpen && !trigger.hasAttribute("disabled")) await userEvent.click(trigger)
    if (!trigger.hasAttribute("disabled")) {
      const body = within(canvasElement.ownerDocument.body)
      await waitFor(() => expect(body.getByRole("menu")).toBeVisible())
      await expect(getComputedStyle(body.getByRole("menu")).minWidth).toBe("176px")
      await userEvent.keyboard("{Escape}")
    }
  },
}
