import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { DrawerExample, type DrawerExampleProps } from "./drawer-example"

const meta = {
  title: "Components/Drawer",
  args: {
    behavior: "standard",
    swipeDirection: "right",
    sideWidth: 480,
    buttonAmount: 2,
    showSwipeHandle: false,
    scrollable: false,
    inset: 16,
  },
  argTypes: {
    behavior: { name: "Comportamiento", control: "select", options: ["standard", "nested", "non-modal", "snap-points"], table: { category: "Composición" } },
    swipeDirection: { name: "Dirección de swipe", control: "inline-radio", options: ["up", "right", "down", "left"], table: { category: "Disposición" } },
    sideWidth: { name: "Ancho lateral", control: "inline-radio", options: [384, 480], table: { category: "Disposición" } },
    buttonAmount: { name: "Cantidad de botones", control: "inline-radio", options: [1, 2], table: { category: "Acciones" } },
    showSwipeHandle: { name: "Swipe handle", control: "boolean", table: { category: "Composición" } },
    scrollable: { name: "Contenido desplazable", control: "boolean", table: { category: "Contenido" } },
    inset: { name: "Inset flotante", control: "inline-radio", options: [0, 8, 16], table: { category: "Disposición" } },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1290-302" },
  },
  render: args => <DrawerExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<DrawerExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const triggerName = args.behavior === "snap-points" ? "Abrir Snap Drawer" : args.behavior === "non-modal" ? "Abrir Non-modal" : "Abrir Drawer"
    await userEvent.click(canvas.getByRole("button", { name: triggerName }))

    const document = canvasElement.ownerDocument
    const popup = document.querySelector<HTMLElement>("[data-slot=drawer-popup]")
    const content = document.querySelector<HTMLElement>("[data-slot=drawer-content]")
    const body = document.querySelector<HTMLElement>("[data-slot=drawer-body]")
    const buttons = [...document.querySelectorAll<HTMLButtonElement>("[data-slot=drawer-footer] button")]
    await expect(popup).toBeTruthy()
    await expect(content).toBeTruthy()
    await expect(body).toBeTruthy()
    await expect(buttons).toHaveLength(args.buttonAmount ?? 2)
    const expectedDirection = args.behavior === "snap-points" ? "down" : args.swipeDirection ?? "right"
    await expect(popup).toHaveAttribute("data-swipe-direction", expectedDirection)

    if (expectedDirection === "left" || expectedDirection === "right") {
      const expectedWidth = Math.min(args.sideWidth ?? 480, document.defaultView!.innerWidth * 0.75)
      await expect(getComputedStyle(popup!).width).toBe(`${expectedWidth}px`)
    }

    await expect(document.querySelector("[data-slot=drawer-swipe-handle]") !== null).toBe(Boolean(args.behavior === "snap-points" || args.showSwipeHandle))
    await expect(getComputedStyle(popup!).marginTop).toBe(`${args.inset ?? 16}px`)
  },
}
