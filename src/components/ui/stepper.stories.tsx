import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { StepperExample } from "./stepper-example"

const meta = {
  id: "components-stepper",
  title: "Componentes no legacy/Stepper",
  component: StepperExample,
  args: { stepCount: 3, size: "default", orientation: "horizontal", labels: true, showDescription: true, showControls: true, activeStep: "1", errorStep: "none", disabledStep: "none" },
  argTypes: {
    stepCount: { name: "Cantidad de pasos", control: "inline-radio", options: [2, 3, 4, 5, 6] },
    size: { control: "inline-radio", options: ["default", "sm"] },
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
    indicator: { control: "inline-radio", options: ["icon", "number"] },
    activeStep: { control: "select", options: ["1", "2", "3", "4", "5", "6", "complete"] },
    errorStep: { control: "select", options: ["none", "1", "2", "3", "4", "5", "6"] },
    disabledStep: { control: "select", options: ["none", "2", "3", "4", "5", "6"] },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m?node-id=7088-1337" } },
  render: args => <StepperExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<typeof StepperExample>
export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
