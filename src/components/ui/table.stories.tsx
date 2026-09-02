"use client"

import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { TableExample, type TableExampleProps } from "./table-example"

const meta = {
  title: "Components/Table",
  args: { borderStyle: "normal", leadingColumn: "none", striped: false, expanded: false, rows: 4 },
  argTypes: {
    borderStyle: { name: "Borde", control: "inline-radio", options: ["normal", "rounded"], table: { category: "Apariencia" } },
    leadingColumn: { name: "Columna inicial", control: "select", options: ["none", "checkbox", "switch", "chevron"], table: { category: "Estructura" } },
    striped: { name: "Filas alternas", control: "boolean", table: { category: "Apariencia" } },
    expanded: { name: "Primera fila expandida", control: "boolean", if: { arg: "leadingColumn", eq: "chevron" }, table: { category: "Estado" } },
    rows: { name: "Filas", control: { type: "range", min: 2, max: 4, step: 1 }, table: { category: "Contenido" } },
  },
  parameters: { layout: "padded", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2530-39991" } },
  render: (args) => <TableExample key={`${args.leadingColumn}-${args.expanded}`} {...args} />,
} satisfies Meta<TableExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const table = canvas.getByRole("table")
    const head = canvas.getByRole("columnheader", { name: /Paciente/ })
    const cell = canvas.getByRole("cell", { name: "María González" })
    expect(table).toBeVisible()
    expect(getComputedStyle(head).fontSize).toBe("12px")
    expect(getComputedStyle(head).lineHeight).toBe("16px")
    expect(getComputedStyle(cell).fontSize).toBe("12px")
    expect(getComputedStyle(cell).paddingTop).toBe("10px")
  },
}
