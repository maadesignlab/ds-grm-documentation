import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, waitFor, within } from "storybook/test"

import {
  HoverCardExample,
  type HoverCardExampleProps,
} from "./hover-card-example"

const meta = {
  title: "Components/Hover Card",
  args: {
    triggerType: "button",
    side: "top",
    align: "center",
    opened: false,
    openDelay: 700,
    closeDelay: 300,
  },
  argTypes: {
    triggerType: {
      name: "Trigger",
      control: "inline-radio",
      options: ["button", "text"],
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
    openDelay: {
      name: "Demora de apertura",
      control: { type: "number", min: 0, step: 50 },
      table: { category: "Comportamiento" },
    },
    closeDelay: {
      name: "Demora de cierre",
      control: { type: "number", min: 0, step: 50 },
      table: { category: "Comportamiento" },
    },
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1650-2069",
    },
  },
  render: args => <HoverCardExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<HoverCardExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole("button", { name: "Descargar informe" })
    await expect(trigger).toBeVisible()

    if (!args.opened) {
      await userEvent.hover(trigger)
    }

    await waitFor(() => {
      const content = canvasElement.ownerDocument.querySelector<HTMLElement>(
        "[data-slot=hover-card-content]"
      )
      expect(content).toBeTruthy()
      expect(content?.getBoundingClientRect().width).toBe(276)
      expect(getComputedStyle(content!).fontFamily).toContain(
        getComputedStyle(canvasElement.ownerDocument.documentElement)
          .getPropertyValue("--brand-font-sans")
          .split(",")[0]
          .replaceAll('"', "")
          .trim()
      )
    })
  },
}
