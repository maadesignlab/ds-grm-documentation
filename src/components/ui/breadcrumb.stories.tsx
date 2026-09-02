import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"

import { BreadcrumbExample, type BreadcrumbExampleProps } from "./breadcrumb-example"

const meta = {
  title: "Components/Breadcrumb",
  args: { levels: 4, reduction: "none" },
  argTypes: {
    levels: { name: "Niveles", control: "inline-radio", options: [2, 3, 4], table: { category: "Estructura" } },
    reduction: { name: "Reducción", control: "inline-radio", options: ["none", "ellipsis", "dropdown"], if: { arg: "levels", eq: 4 }, table: { category: "Estructura" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1760-597" } },
  render: (args) => <BreadcrumbExample {...args} />,
} satisfies Meta<BreadcrumbExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const nav = canvas.getByRole("navigation", { name: "breadcrumb" })
    await expect(nav).toBeVisible()
    await expect(canvas.getByText("Facturación")).toHaveAttribute("aria-current", "page")
    const listStyles = getComputedStyle(nav.querySelector("ol")!)
    expect(listStyles.fontSize).toBe("14px")
    expect(listStyles.lineHeight).toBe("20px")
    expect(listStyles.paddingLeft).toBe("0px")
    expect(listStyles.marginLeft).toBe("0px")
    expect(getComputedStyle(nav.querySelector("a")!).textDecorationLine).toBe("none")
    const firstLink = canvas.getByRole("link", { name: "Ventas" })
    await userEvent.click(firstLink)
    expect(canvasElement.ownerDocument.defaultView?.location.hash).toBe("")
  },
}
