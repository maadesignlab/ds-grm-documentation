"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { TableExample, tableExampleDefaults, type TableExampleProps } from "./table-example"

const meta = {
  title: "Components/Table",
  args: tableExampleDefaults,
  argTypes: {
    borderStyle: { name: "Borde", control: "inline-radio", options: ["normal", "rounded"], table: { category: "Apariencia" } },
    leadingColumn: { name: "Columna inicial", control: "select", options: ["none", "checkbox", "switch", "chevron"], table: { category: "Estructura" } },
    striped: { name: "Filas alternas", control: "boolean", table: { category: "Apariencia" } },
    stripedRows: { name: "Alternar sobre", control: "inline-radio", options: ["odd", "even"], if: { arg: "striped", truthy: true }, table: { category: "Apariencia" } },
    expanded: { name: "Primera fila expandida", control: "boolean", if: { arg: "leadingColumn", eq: "chevron" }, table: { category: "Estado" } },
    rows: { name: "Filas", control: { type: "range", min: 2, max: 4, step: 1 }, table: { category: "Contenido" } },
    cellContent: { name: "Contenido de celda", control: "select", options: ["text", "avatar", "status-label", "status-badge", "progress", "counter", "bulk-options"], table: { category: "Contenido" } },
  },
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2530-39991" } },
  render: (args) => <TableExample key={`${args.leadingColumn}-${args.expanded}`} {...args} />,
} satisfies Meta<TableExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const table = canvas.getByRole("table")
    const head = canvas.getByRole("columnheader", { name: /Contenido/ })
    const headerRow = head.closest("tr")
    const cell = canvas.getAllByRole("cell")[0]
    const bodyRows = canvas.getAllByRole("row").slice(1)
    expect(table).toBeVisible()
    expect(getComputedStyle(head).fontSize).toBe("12px")
    expect(getComputedStyle(head).lineHeight).toBe("16px")
    expect(getComputedStyle(head).fontFamily).toBe(
      getComputedStyle(document.documentElement).getPropertyValue("--brand-font-sans").trim()
    )
    const tokenProbe = document.createElement("span")
    tokenProbe.style.color = "var(--muted-foreground)"
    canvasElement.append(tokenProbe)
    expect(getComputedStyle(head).color).toBe(getComputedStyle(tokenProbe).color)
    tokenProbe.remove()
    expect(getComputedStyle(cell).fontSize).toBe("14px")
    expect(getComputedStyle(cell).lineHeight).toBe("20px")
    const numericCell = canvas.getByRole("cell", { name: "$ 1.250.000" })
    const numericValue = numericCell.querySelector<HTMLElement>('[data-slot="table-cell-content-text"] span')
    const numericContent = numericCell.querySelector<HTMLElement>('[data-slot="table-cell-content-text"]')
    expect(numericContent).toHaveAttribute("data-font", "mono")
    expect(numericValue).not.toBeNull()
    expect(getComputedStyle(numericValue!).fontFamily).toBe(
      getComputedStyle(document.documentElement).getPropertyValue("--brand-font-mono").trim()
    )
    expect(getComputedStyle(numericCell).textAlign).toBe("right")
    expect(headerRow).not.toBeNull()
    expect(getComputedStyle(headerRow!).backgroundColor).toBe("rgba(0, 0, 0, 0)")
    await userEvent.hover(headerRow!)
    expect(getComputedStyle(headerRow!).backgroundColor).toBe("rgba(0, 0, 0, 0)")
    if (args.striped) {
      expect(getComputedStyle(bodyRows[0]).backgroundColor).not.toBe(getComputedStyle(bodyRows[1]).backgroundColor)
      const stripedIndex = args.stripedRows === "even" ? 1 : 0
      expect(getComputedStyle(bodyRows[stripedIndex]).backgroundColor).toContain("0.05")
    }
  },
}
