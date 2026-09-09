import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { AccordionExample, type AccordionExampleProps } from "./accordion-example"

const meta = {
  title: "Components/Accordion",
  args: {
    mode: "unique",
    itemCount: 3,
    defaultOpen: true,
  },
  argTypes: {
    mode: {
      name: "Comportamiento",
      table: { category: "Accordion" },
      control: "inline-radio",
      options: ["unique", "multiple"],
    },
    itemCount: {
      name: "Cantidad de ítems",
      table: { category: "Accordion" },
      control: { type: "range", min: 2, max: 10, step: 1 },
    },
    defaultOpen: {
      name: "Iniciar expandido",
      table: { category: "Estado" },
      control: "boolean",
    },
  },
  parameters: {
    layout: "centered",
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1771-909",
    },
  },
  render: args => <AccordionExample {...args} />,
} satisfies Meta<AccordionExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
