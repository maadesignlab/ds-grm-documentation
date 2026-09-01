import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Spinner } from "./spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=2206-19610",
    },
    docs: { description: { component: "Indicador de progreso indeterminado con tamaños 12, 16, 24 y 32 definidos en Figma." } },
  },
  args: { size: 16 },
  argTypes: { size: { control: "inline-radio", options: [12, 16, 24, 32] } },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => <div className="flex items-center gap-6">{([12, 16, 24, 32] as const).map((size) => <Spinner key={size} size={size} />)}</div>,
};
