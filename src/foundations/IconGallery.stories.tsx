import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent } from "storybook/test"
import { IconGallery } from "./IconGallery"

const meta = { title: "Foundations/Iconos", component: IconGallery, tags: ["!autodocs"], parameters: { layout: "padded" } } satisfies Meta<typeof IconGallery>
export default meta
type Story = StoryObj<typeof meta>
export const Catalogo: Story = {
  name: "Catálogo",
  tags: ["!dev"],
  play: async ({ canvas }) => {
    const search = canvas.getByRole("searchbox", { name: "Buscar iconos" })
    await userEvent.click(canvas.getByRole("button", { name: "Siguiente" }))
    await expect(canvas.getByText(/Página 2 de/)).toBeVisible()
    await userEvent.type(search, "calendar-days")
    await expect(canvas.getByText("CalendarDays", { exact: true })).toBeVisible()
    await expect(canvas.getByRole("button", { name: "Anterior" })).toBeDisabled()
    await userEvent.clear(search)
    await userEvent.type(search, "zzzznonexistent")
    await expect(canvas.getByText(/No hay iconos/)).toBeVisible()
    await userEvent.clear(search)
  },
}
