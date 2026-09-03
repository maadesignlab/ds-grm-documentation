import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { SheetExample, type SheetExampleProps } from "./sheet-example"

const meta = {
  title: "Components/Sheet",
  args: { side: "right", sideWidth: 480, showCloseButton: true, footerAlignment: "column", scrollable: false },
  argTypes: {
    side: { name: "Posición", control: "inline-radio", options: ["top", "right", "bottom", "left"], table: { category: "Disposición" } },
    sideWidth: { name: "Ancho lateral · left/right", control: "inline-radio", options: [384, 480], table: { category: "Disposición" } },
    showCloseButton: { name: "Botón de cierre", control: "boolean", table: { category: "Composición" } },
    footerAlignment: { name: "Acciones", control: "inline-radio", options: ["column", "row"], table: { category: "Composición" } },
    scrollable: { name: "Contenido desplazable", control: "boolean", table: { category: "Contenido" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1295-386" } },
  render: args => <SheetExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<SheetExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Abrir Sheet" }))
    const document = canvasElement.ownerDocument
    const content = document.querySelector<HTMLElement>("[data-slot=sheet-content]")
    const footer = document.querySelector<HTMLElement>("[data-slot=sheet-footer]")
    await expect(content).toBeTruthy()
    await expect(content).toHaveAttribute("data-side", args.side ?? "right")
    await expect(footer).toBeTruthy()
    await expect(getComputedStyle(footer!).flexDirection).toBe(args.footerAlignment === "row" ? "row" : "column")
    if (args.side === "left" || args.side === "right") {
      await expect(getComputedStyle(content!).width).toBe(`${Math.min(args.sideWidth ?? 480, document.defaultView!.innerWidth * 0.75)}px`)
    } else {
      await expect(getComputedStyle(content!).height).toBe(`${Math.min(512, document.defaultView!.innerHeight)}px`)
    }
    await expect(document.querySelectorAll("[data-slot=sheet-close]").length).toBe(args.showCloseButton ? 2 : 1)
  },
}
