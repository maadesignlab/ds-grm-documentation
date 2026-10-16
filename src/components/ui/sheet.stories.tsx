import { expect, userEvent, within } from "storybook/test"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { SheetExample, type SheetExampleProps } from "./sheet-example"

const meta = {
  title: "Components/Sheet",
  args: { side: "right", sideWidth: 360, resizable: true, contentType: "edit-form", showCloseButton: true, footerComposition: "single-single", headerType: "title-description", showStatusBand: true, status: "success", showStatusIcon: true, showTiming: true, scrollable: false },
  argTypes: {
    side: { name: "Posición", control: "inline-radio", options: ["top", "right", "bottom", "left"], table: { category: "Disposición" } },
    sideWidth: { name: "Ancho lateral · left/right", control: "inline-radio", options: [360, 720], table: { category: "Disposición" } },
    resizable: { name: "Redimensionar panel", control: "boolean" },
    contentType: { name: "Contenido de Figma", control: "select", options: ["none", "edit-form", "details-view"], table: { category: "Contenido" } },
    bodyType: { name: "Contenido", control: "select", options: ["blank", "tabs-normal", "tabs-overflow", "stepper"] },
    visibleTabs: { name: "Pestañas visibles · automático por defecto", control: "select", options: ["auto", 2, 3, 4], mapping: { auto: undefined } },
    showCloseButton: { name: "Botón de cierre", control: "boolean", table: { category: "Composición" } },
    footerAlignment: { table: { disable: true } },
    footerComposition: { name: "Acciones", control: "select", options: ["single-single", "single-group", "group-single"], table: { category: "Composición" } },
    headerType: { name: "Encabezado", control: "select", options: ["title-description", "progress", "badge", "breadcrumb"], table: { category: "Composición" } },
    showStatusBand: { name: "Banda de estado", control: "boolean" },
    status: { name: "Estado", control: "select", options: ["success", "warning", "error", "destructive", "info"] },
    showStatusIcon: { name: "Icono de estado", control: "boolean" },
    showTiming: { name: "Tiempo", control: "boolean" },
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
    await expect(getComputedStyle(content!).backgroundColor).toBe("rgb(255, 255, 255)")
    await expect(content).toHaveAttribute("data-side", args.side ?? "right")
    await expect(footer).toBeTruthy()
    await expect(getComputedStyle(footer!).flexDirection).toBe(args.footerAlignment === "column" ? "column" : "row")
    if (args.side === "left" || args.side === "right") {
      await expect(getComputedStyle(content!).width).toBe(`${Math.min(args.sideWidth ?? 360, document.defaultView!.innerWidth)}px`)
    } else {
      await expect(getComputedStyle(content!).height).toBe(`${Math.min(512, document.defaultView!.innerHeight)}px`)
    }
    await expect(content!.querySelectorAll("[data-slot=sheet-close]").length).toBe((args.showCloseButton ? 1 : 0) + (args.footerComposition === "group-single" && !args.footerAlignment ? 0 : 1))
    await expect(getComputedStyle(content!).gap).toBe("0px")
    await expect(content!.querySelector("[data-slot=sheet-status-band]") !== null).toBe(args.showStatusBand)
    if (args.showStatusBand) await expect(content!.querySelector("[data-slot=sheet-status-band]")).toHaveAttribute("data-status", args.status)
    if (args.headerType === "progress") await expect(within(content!).getByRole("progressbar")).toHaveAttribute("aria-valuenow", "33")
  },
}
