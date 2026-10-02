import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

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

// Regression coverage; kept out of the public navigation and autodocs.
const regressionPlay: NonNullable<Story["play"]> = async context => {
  await Playground.play!(context)
  const document = context.canvasElement.ownerDocument
  const dialog = document.querySelector<HTMLElement>("[data-slot=sheet-content]")!
  await expect(dialog.contains(document.activeElement)).toBe(true)
  await userEvent.keyboard("{Escape}")
  await waitFor(() => expect(dialog).not.toBeVisible())
  await waitFor(() => expect(within(context.canvasElement).getByRole("button", { name: "Abrir Sheet" })).toHaveFocus())
}
export const ProgressRegression: Story = { tags: ["!dev", "!autodocs"], args: { headerType: "progress", status: "warning", footerComposition: "single-group", side: "left", scrollable: true }, play: regressionPlay }
export const BadgeRegression: Story = { globals: { brandTheme: "reina-madre" }, tags: ["!dev", "!autodocs"], args: { headerType: "badge", status: "error", footerComposition: "group-single", side: "top" }, play: regressionPlay }
export const BreadcrumbRegression: Story = { globals: { brandTheme: "maria-linda" }, tags: ["!dev", "!autodocs"], args: { headerType: "breadcrumb", status: "destructive", side: "bottom", showTiming: false }, play: regressionPlay }
export const InfoRegression: Story = { globals: { brandTheme: "piel-sana" }, tags: ["!dev", "!autodocs"], args: { status: "info", showCloseButton: false, showStatusIcon: false, sideWidth: 384 }, play: regressionPlay }
export const LegacyRegression: Story = { tags: ["!dev", "!autodocs"], args: { showStatusBand: false, footerAlignment: "column" }, play: regressionPlay }

export const ResizeRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { bodyType: "blank" },
  play: async context => {
    await Playground.play!(context)
    const document = context.canvasElement.ownerDocument
    const content = document.querySelector<HTMLElement>('[data-slot="sheet-content"]')!
    const dialog = within(content)
    await userEvent.click(dialog.getByRole("separator", { name: "Ancho del panel" }))
    await userEvent.keyboard("{End}")
    await waitFor(() => expect(Math.round(content.getBoundingClientRect().width)).toBe(Math.min(720, document.defaultView!.innerWidth)))
    await waitFor(() => expect(Math.round(content.getBoundingClientRect().right)).toBe(document.defaultView!.innerWidth))
    await userEvent.keyboard("{ArrowRight}")
    await waitFor(() => expect(Math.round(content.getBoundingClientRect().width)).toBe(Math.min(720, document.defaultView!.innerWidth) - 10))
    await userEvent.keyboard("{Home}")
    await waitFor(() => expect(Math.round(content.getBoundingClientRect().width)).toBe(Math.min(360, document.defaultView!.innerWidth)))
    const handle = dialog.getByRole("separator", { name: "Ancho del panel" })
    const start = handle.getBoundingClientRect().x + 8
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: handle, coords: { clientX: start, clientY: 300 } },
      { target: handle, coords: { clientX: start - 137, clientY: 300 } },
    ])
    await waitFor(() => expect(Math.round(content.getBoundingClientRect().width)).toBe(Math.min(497, document.defaultView!.innerWidth)))
    await userEvent.pointer({ keys: '[/MouseLeft]', target: handle })
    await expect(Math.round(content.getBoundingClientRect().width)).toBe(Math.min(497, document.defaultView!.innerWidth))
    await waitFor(() => expect(Math.round(content.getBoundingClientRect().right)).toBe(document.defaultView!.innerWidth))
  },
}
export const TabsRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { bodyType: "tabs-overflow", visibleTabs: 2 },
  play: async context => {
    await Playground.play!(context)
    const dialog = within(context.canvasElement.ownerDocument.querySelector<HTMLElement>('[data-slot="sheet-content"]')!)
    await expect(dialog.getByRole("button", { name: "Mostrar pestañas anteriores" })).toBeDisabled()
    await userEvent.click(dialog.getByRole("button", { name: "Mostrar pestañas siguientes" }))
    await expect(dialog.getByRole("tab", { name: "Resumen" })).toHaveAttribute("aria-selected", "true")
    await userEvent.click(dialog.getByRole("tab", { name: "Agenda" }))
    await expect(dialog.getByRole("tab", { name: "Agenda" })).toHaveAttribute("aria-selected", "true")
    while (!dialog.getByRole("button", { name: "Mostrar pestañas siguientes" }).hasAttribute("disabled")) await userEvent.click(dialog.getByRole("button", { name: "Mostrar pestañas siguientes" }))
    await expect(dialog.getByRole("button", { name: "Mostrar pestañas siguientes" })).toBeDisabled()
    await expect(dialog.getByRole("tab", { name: "Agenda" })).toHaveAttribute("aria-selected", "true")
  },
}
export const StepperBodyRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { bodyType: "stepper" },
  play: async context => {
    await Playground.play!(context)
    const dialog = within(context.canvasElement.ownerDocument.querySelector<HTMLElement>('[data-slot="sheet-content"]')!)
    await userEvent.click(dialog.getByRole("button", { name: "Envío" }))
    await expect(dialog.getByRole("button", { name: "Envío" })).toHaveAttribute("aria-current", "step")
  },
}

export const LeftDragRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { side: "left", bodyType: "blank" },
  play: async context => {
    await Playground.play!(context)
    const document = context.canvasElement.ownerDocument
    const content = document.querySelector<HTMLElement>('[data-slot="sheet-content"]')!
    const handle = within(content).getByRole("separator", { name: "Ancho del panel" })
    await userEvent.pointer([
      { keys: '[MouseLeft>]', target: handle, coords: { clientX: 352, clientY: 300 } },
      { target: handle, coords: { clientX: 600, clientY: 300 } },
    ])
    await waitFor(() => expect(Math.round(content.getBoundingClientRect().width)).toBe(Math.min(608, document.defaultView!.innerWidth)))
    await userEvent.pointer({ keys: '[/MouseLeft]', target: handle, coords: { clientX: 600, clientY: 300 } })
    await expect(Math.round(content.getBoundingClientRect().width)).toBe(Math.min(608, document.defaultView!.innerWidth))
    await waitFor(() => expect(Math.round(content.getBoundingClientRect().left)).toBe(0))
  },
}

export const ResponsiveTabsRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { bodyType: "tabs-normal" },
  play: async context => {
    await Playground.play!(context)
    const content = context.canvasElement.ownerDocument.querySelector<HTMLElement>('[data-slot="sheet-content"]')!
    const dialog = within(content)
    await waitFor(() => expect(content.querySelector('[data-slot="sheet-body"]')).toHaveAttribute("data-navigation", "overflow"))
    await userEvent.click(dialog.getByRole("tab", { name: "Documentación" }))
    const handle = dialog.getByRole("separator", { name: "Ancho del panel" })
    await userEvent.click(handle)
    await userEvent.keyboard("{End}")
    await waitFor(() => expect(content.querySelector('[data-slot="sheet-body"]')).toHaveAttribute("data-navigation", "tabs"))
    await expect(dialog.getAllByRole("tab")).toHaveLength(4)
    await expect(dialog.getByRole("tab", { name: "Documentación" })).toHaveAttribute("aria-selected", "true")
    await expect(dialog.queryByRole("button", { name: "Mostrar pestañas siguientes" })).toBeNull()
    await userEvent.keyboard("{Home}")
    await waitFor(() => expect(content.querySelector('[data-slot="sheet-body"]')).toHaveAttribute("data-navigation", "overflow"))
    await expect(dialog.getAllByRole("tab")).toHaveLength(4)
    await expect(dialog.getByRole("tab", { name: "Documentación" })).toHaveAttribute("aria-selected", "true")
  },
}

export const ContentFormRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { contentType: "edit-form" },
  play: async context => {
    await Playground.play!(context)
    const document = context.canvasElement.ownerDocument
    const panel = document.querySelector<HTMLElement>('[data-slot="sheet-content"]')!
    const dialog = within(panel)
    await userEvent.type(dialog.getAllByRole("textbox")[0], "Contenido conservado")
    await userEvent.click(dialog.getByRole("switch"))
    const combo = dialog.getByRole("combobox")
    await userEvent.click(combo)
    await userEvent.click(await within(document.body).findByRole("option", { name: "Consulta de obstetricia" }))
    const dateTime = panel.querySelector<HTMLElement>('[data-slot="sheet-date-time"]')!
    await expect(getComputedStyle(dateTime).flexDirection).toBe("column")
    await expect(dateTime.querySelector("button")!.getBoundingClientRect().height).toBe(36)
    const handle = dialog.getByRole("separator", { name: "Ancho del panel" })
    await userEvent.click(handle)
    await userEvent.keyboard("{End}")
    await waitFor(() => expect(panel.querySelector('[data-slot="sheet-body"]')).toHaveAttribute("data-navigation", "tabs"))
    await expect(dialog.getAllByRole("textbox")[0]).toHaveValue("Contenido conservado")
    await expect(dialog.getByRole("switch")).toBeChecked()
    await expect(dialog.getByRole("combobox")).toHaveValue("Consulta de obstetricia")
    await expect(getComputedStyle(panel.querySelector<HTMLElement>('[data-slot="sheet-date-time"]')!).flexDirection).toBe("row")
    await userEvent.click(dialog.getByRole("button", { name: "Fecha de la cita" }))
    await expect(await within(document.body).findByRole("grid")).toBeVisible()
    const popup = panel.querySelector<HTMLElement>('[data-slot="popover-content"]')!
    await expect(popup.closest('[data-slot="scroll-area-viewport"]')).toBeNull()
    await waitFor(() => {
      const bounds = popup.getBoundingClientRect()
      expect(bounds.top).toBeGreaterThanOrEqual(0)
      expect(bounds.bottom).toBeLessThanOrEqual(document.defaultView!.innerHeight)
      expect(Math.abs(bounds.left - dialog.getByRole("button", { name: "Fecha de la cita" }).getBoundingClientRect().left)).toBeLessThan(2)
    })
    await userEvent.keyboard("{Escape}")
    await waitFor(() => expect(popup).not.toBeVisible())
    await expect(panel).toBeVisible()
    await userEvent.click(handle)
    await userEvent.keyboard("{Home}")
    await waitFor(() => expect(panel.querySelector('[data-slot="sheet-body"]')).toHaveAttribute("data-navigation", "overflow"))
    await expect(dialog.getAllByRole("textbox")[0]).toHaveValue("Contenido conservado")
    const content = panel.querySelector<HTMLElement>('[data-slot="sheet-content-example"]')!
    await expect(content.scrollWidth).toBeLessThanOrEqual(content.clientWidth)
    const scroll = panel.querySelector<HTMLElement>('[role="tabpanel"][data-state="active"] [data-slot="scroll-area-viewport"]')!
    const footer = panel.querySelector<HTMLElement>('[data-slot="sheet-footer"]')!
    const footerTop = footer.getBoundingClientRect().top
    await waitFor(() => { scroll.scrollTop = scroll.scrollHeight; expect(scroll.scrollTop).toBeGreaterThan(0) })
    await expect(footer.getBoundingClientRect().top).toBe(footerTop)
  },
}

export const ContentDetailsRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { contentType: "details-view", bodyType: "blank" },
  play: async context => {
    await Playground.play!(context)
    const panel = context.canvasElement.ownerDocument.querySelector<HTMLElement>('[data-slot="sheet-content"]')!
    await expect(panel.querySelectorAll("dl")).toHaveLength(3)
    await expect(panel.querySelectorAll("dt")).toHaveLength(9)
    await expect(panel.querySelectorAll("dd")).toHaveLength(9)
    await expect(panel.scrollWidth).toBeLessThanOrEqual(panel.clientWidth)
  },
}

export const SpacingRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { bodyType: "blank", contentType: "edit-form" },
  play: async context => {
    await Playground.play!(context)
    const panel = context.canvasElement.ownerDocument.querySelector<HTMLElement>('[data-slot="sheet-content"]')!
    const handle = panel.querySelector<HTMLElement>('[data-slot="sheet-resize"]')!
    const body = panel.querySelector<HTMLElement>('[data-slot="sheet-body"]')!
    const padding = panel.querySelector<HTMLElement>('[data-slot="sheet-body-padding"]')!
    const content = panel.querySelector<HTMLElement>('[data-slot="sheet-content-example"]')!
    await expect(Math.round(handle.getBoundingClientRect().width)).toBe(16)
    await expect(body.getBoundingClientRect().left).toBeGreaterThanOrEqual(handle.getBoundingClientRect().right)
    await expect(getComputedStyle(padding).paddingLeft).toBe("16px")
    await expect(getComputedStyle(padding).paddingRight).toBe("16px")
    await expect(getComputedStyle(padding).paddingTop).toBe("10px")
    const viewportBefore = panel.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')!
    await waitFor(() => expect(body.clientWidth - viewportBefore.clientWidth).toBe(10))
    const contentBounds = content.getBoundingClientRect()
    const bodyBounds = body.getBoundingClientRect()
    await expect(Math.round(contentBounds.left - bodyBounds.left)).toBe(16)
    await expect(Math.round(bodyBounds.right - contentBounds.right)).toBe(26)
    const width = content.getBoundingClientRect().width
    const viewport = panel.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')!
    await waitFor(() => { viewport.scrollTop = viewport.scrollHeight; expect(viewport.scrollTop).toBeGreaterThan(0) })
    await expect(content.getBoundingClientRect().width).toBe(width)
    await expect(viewport.offsetWidth).toBe(viewport.clientWidth)
  },
}

export const NoScrollbarSpacingRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { bodyType: "blank", contentType: "none" },
  play: async context => {
    await Playground.play!(context)
    const panel = context.canvasElement.ownerDocument.querySelector<HTMLElement>('[data-slot="sheet-content"]')!
    const body = panel.querySelector<HTMLElement>('[data-slot="sheet-body"]')!
    const viewport = panel.querySelector<HTMLElement>('[data-slot="scroll-area-viewport"]')!
    const padding = panel.querySelector<HTMLElement>('[data-slot="sheet-body-padding"]')!
    await waitFor(() => expect(viewport.clientWidth).toBe(body.clientWidth))
    await expect(viewport.scrollHeight).toBe(viewport.clientHeight)
    await expect(getComputedStyle(padding).paddingLeft).toBe("16px")
    await expect(getComputedStyle(padding).paddingRight).toBe("16px")
    await userEvent.click(within(panel).getByRole("separator", { name: "Ancho del panel" }))
    await userEvent.keyboard("{End}")
    await waitFor(() => expect(viewport.clientWidth).toBe(body.clientWidth))
  },
}
