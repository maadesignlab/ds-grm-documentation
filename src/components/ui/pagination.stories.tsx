import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { PaginationExample, paginationExamplePresets, type PaginationExampleProps } from "./pagination-example"

const meta = {
  title: "Components/Pagination",
  args: paginationExamplePresets.playground,
  argTypes: {
    composition: { name: "Composición", control: "inline-radio", options: ["default", "page-size"], table: { category: "Composición" } },
    pageCount: { name: "Cantidad de páginas", control: "inline-radio", options: [3, 4, 5], if: { arg: "composition", eq: "default" }, table: { category: "Navegación" } },
    currentPage: { name: "Página activa", control: { type: "number", min: 1, max: 5, step: 1 }, if: { arg: "composition", eq: "default" }, table: { category: "Navegación" } },
    showPrevious: { name: "Anterior", control: "boolean", table: { category: "Navegación" } },
    showNext: { name: "Siguiente", control: "boolean", table: { category: "Navegación" } },
    showLeftEllipsis: { name: "Elipsis izquierda", control: "boolean", if: { arg: "composition", eq: "default" }, table: { category: "Navegación" } },
    showRightEllipsis: { name: "Elipsis derecha", control: "boolean", if: { arg: "composition", eq: "default" }, table: { category: "Navegación" } },
    pageSize: { name: "Filas por página", control: "inline-radio", options: ["10", "20", "50"], if: { arg: "composition", eq: "page-size" }, table: { category: "Select" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1763-1260" } },
  render: args => <div className="w-[414px] max-w-[calc(100vw-32px)]"><PaginationExample {...args} /></div>,
} satisfies Meta<PaginationExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("navigation", { name: "pagination" })).toBeVisible()

    if (args.composition === "page-size") {
      await expect(canvas.getByRole("combobox", { name: "Filas por página" })).toBeVisible()
    } else {
      const activePage = Math.min(args.pageCount ?? 3, Math.max(1, args.currentPage ?? 1))
      await expect(canvas.getByRole("link", { name: `Página ${activePage}` })).toHaveAttribute("aria-current", "page")
      await expect(canvas.getAllByRole("link", { name: /Página/ })).toHaveLength(args.pageCount ?? 3)
    }
  },
}
