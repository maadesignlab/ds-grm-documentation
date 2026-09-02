import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor } from "storybook/test"

import { TooltipExample, type TooltipExampleProps } from "./tooltip-example"

const meta = {
  title: "Components/Tooltip",
  args: {
    triggerType: "button",
    side: "top",
    align: "center",
    opened: false,
    showShortcut: false,
    delayDuration: 0,
    avoidCollisions: true,
  },
  argTypes: {
    triggerType: {
      name: "Trigger",
      control: "select",
      options: ["button", "icon", "badge", "text"],
      table: { category: "Composición" },
    },
    side: {
      name: "Lado",
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
      table: { category: "Posición" },
    },
    align: {
      name: "Alineación",
      control: "inline-radio",
      options: ["start", "center", "end"],
      table: { category: "Posición" },
    },
    opened: {
      name: "Abierto",
      control: "boolean",
      table: { category: "Estado" },
    },
    showShortcut: {
      name: "Mostrar shortcut",
      control: "boolean",
      table: { category: "Contenido" },
    },
    delayDuration: {
      name: "Demora",
      control: { type: "number", min: 0, step: 50 },
      table: { category: "Comportamiento" },
    },
    avoidCollisions: {
      name: "Evitar colisiones",
      control: "boolean",
      table: { category: "Comportamiento" },
    },
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1136-1739",
    },
  },
  render: args => <TooltipExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<TooltipExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const trigger = canvasElement.querySelector<HTMLElement>("[data-slot=tooltip-trigger]")
    await expect(trigger).toBeTruthy()
    await expect(trigger).toBeVisible()

    if (!args.opened) await userEvent.hover(trigger!)

    await waitFor(() => {
      const content = canvasElement.ownerDocument.querySelector<HTMLElement>("[data-slot=tooltip-content]")
      expect(content).toBeTruthy()
      expect(getComputedStyle(content!).height).toBe("36px")
      expect(getComputedStyle(content!).fontSize).toBe("14px")
      expect(getComputedStyle(content!).lineHeight).toBe("20px")
      expect(["top", "right", "bottom", "left"]).toContain(content?.dataset.side)
    })
  },
}
