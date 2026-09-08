import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { DataTableExample, dataTableExamplePresets, type DataTableExampleProps } from "./data-table-example"

const meta = {
  title: "Components/Data Table",
  args: dataTableExamplePresets.playground,
  argTypes: {
    toolbar: { name: "Toolbar", control: "inline-radio", options: ["full", "search", "none"], table: { category: "Composición" } },
    toolbarLayout: { name: "Disposición de filtros", control: "inline-radio", options: ["attached", "separated"], if: { arg: "toolbar", neq: "none" }, table: { category: "Composición" } },
    pagination: { name: "Paginación", control: "boolean", table: { category: "Composición" } },
    paginationLayout: { name: "Disposición de paginación", control: "inline-radio", options: ["attached", "separated"], if: { arg: "pagination", truthy: true }, table: { category: "Composición" } },
    pattern: { name: "Patrón", control: "select", options: ["complete", "checkbox", "switch", "identifier", "expandable"], table: { category: "Composición" } },
    rowActions: { name: "Acciones por fila", control: "select", options: ["none", "dropdown", "one", "two", "three"], table: { category: "Composición" } },
    striped: { name: "Filas alternas", control: "boolean", table: { category: "Apariencia" } },
    stripedRows: { name: "Alternar sobre", control: "inline-radio", options: ["odd", "even"], if: { arg: "striped", truthy: true }, table: { category: "Apariencia" } },
    pageSize: { name: "Filas por página", control: "inline-radio", options: [4, 5, 8], table: { category: "Paginación" } },
    status: { name: "Estado de datos", control: "inline-radio", options: ["ready", "loading", "empty", "error"], table: { category: "Estado" } },
  },
  parameters: {
    layout: "centered",
    design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2366-19504" },
  },
  render: args => <div className="w-[1116px] max-w-[calc(100vw-32px)]"><DataTableExample {...args} /></div>,
} satisfies Meta<DataTableExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("table")).toBeVisible()

    for (const header of canvas.getAllByRole("columnheader")) {
      const styles = getComputedStyle(header)
      await expect(styles.fontSize).toBe("12px")
      await expect(styles.lineHeight).toBe("16px")
      await expect(styles.fontWeight).toBe("600")
      await expect(styles.textTransform).toBe("uppercase")
      await expect(styles.fontFamily).toBe(
        getComputedStyle(document.documentElement).getPropertyValue("--brand-font-sans").trim()
      )
      const sortableControl = header.querySelector("button")
      if (sortableControl && !sortableControl.matches('[role="checkbox"]')) {
        await expect(getComputedStyle(sortableControl).color).toBe(styles.color)
        await expect(getComputedStyle(sortableControl).textAlign).toBe("left")
        await expect(getComputedStyle(sortableControl.querySelector('[data-slot="table-header-cell-content"]')!).textAlign).toBe("left")
        await userEvent.hover(sortableControl)
        await expect(getComputedStyle(sortableControl).color).toBe(styles.color)
        await expect(getComputedStyle(sortableControl).backgroundColor).toBe("rgba(0, 0, 0, 0)")
      }
    }

    const headerRow = canvas.getAllByRole("columnheader")[0]?.closest("tr")
    await expect(headerRow).not.toBeNull()
    await expect(getComputedStyle(headerRow!).backgroundColor).toBe("rgba(0, 0, 0, 0)")
    await userEvent.hover(headerRow!)
    await expect(getComputedStyle(headerRow!).backgroundColor).toBe("rgba(0, 0, 0, 0)")

    if (args.striped) {
      const bodyRows = canvas.getAllByRole("row").slice(1)
      await expect(getComputedStyle(bodyRows[0]).backgroundColor).not.toBe(getComputedStyle(bodyRows[1]).backgroundColor)
      const stripedIndex = args.stripedRows === "even" ? 1 : 0
      await expect(getComputedStyle(bodyRows[stripedIndex]).backgroundColor).toContain("0.05")
    }

    if (args.status !== "ready") return

    const firstPatient = "Ana Martínez"
    const rowActions = args.rowActions ?? "dropdown"
    if (rowActions === "dropdown") await expect(canvas.getAllByRole("button", { name: `Acciones para ${firstPatient}` })[0]).toBeVisible()
    if (["one", "two", "three"].includes(rowActions)) await expect(canvas.getAllByRole("button", { name: `Ver ${firstPatient}` })[0]).toBeVisible()
    if (["two", "three"].includes(rowActions)) await expect(canvas.getAllByRole("button", { name: `Editar ${firstPatient}` })[0]).toBeVisible()
    if (rowActions === "three") await expect(canvas.getAllByRole("button", { name: `Eliminar ${firstPatient}` })[0]).toBeVisible()

    if (args.toolbar !== "none") {
      const toolbar = canvasElement.querySelector<HTMLElement>('[data-slot="data-table-toolbar"]')
      const content = canvasElement.querySelector<HTMLElement>('[data-slot="data-table-content"]')
      await expect(toolbar).not.toBeNull()
      await expect(content).not.toBeNull()
      const toolbarGap = Math.round(content!.getBoundingClientRect().top - toolbar!.getBoundingClientRect().bottom)
      if (args.toolbarLayout === "separated") await expect(toolbarGap).toBe(12)
      else await expect(Math.abs(toolbarGap)).toBeLessThanOrEqual(1)

      const toolbarTextControls = toolbar!.querySelectorAll<HTMLElement>('input, button:not([role="switch"]), [role="combobox"], label')
      for (const control of toolbarTextControls) {
        if (!control.textContent?.trim() && control.tagName !== "INPUT") continue
        const styles = getComputedStyle(control)
        await expect(styles.fontSize).toBe("14px")
        await expect(styles.lineHeight).toBe("20px")
        await expect(styles.fontFamily).toBe(
          getComputedStyle(document.documentElement).getPropertyValue("--brand-font-sans").trim()
        )
      }

      const toolbarControls = toolbar!.querySelectorAll<HTMLElement>('[data-slot="input-group"], button:not([role="switch"]), [role="combobox"], label')
      for (const control of toolbarControls) {
        await expect(control.getBoundingClientRect().height).toBe(36)
      }

      const search = canvas.getByRole("textbox", { name: "Buscar pacientes" })
      await userEvent.type(search, "Ana")
      await expect(canvas.getByText("Ana Martínez")).toBeVisible()
      await expect(canvas.queryByText("Carolina López")).not.toBeInTheDocument()
      await userEvent.clear(search)
    }

    if (args.pagination) {
      await expect(canvas.getByText(/Página 1 de/)).toBeVisible()
      const content = canvasElement.querySelector<HTMLElement>('[data-slot="data-table-content"]')
      const footer = canvasElement.querySelector<HTMLElement>('[data-slot="data-table-footer"]')
      await expect(content).not.toBeNull()
      await expect(footer).not.toBeNull()
      const paginationGap = Math.round(footer!.getBoundingClientRect().top - content!.getBoundingClientRect().bottom)
      if (args.paginationLayout === "separated") await expect(paginationGap).toBe(12)
      else await expect(Math.abs(paginationGap)).toBeLessThanOrEqual(1)
      if (args.paginationLayout === "separated") {
        const styles = getComputedStyle(footer!)
        await expect(styles.backgroundColor).toBe("rgba(0, 0, 0, 0)")
        await expect(styles.borderTopWidth).toBe("0px")
        await expect(styles.paddingTop).toBe("0px")
      }
    }
  },
}
