import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, userEvent, within } from "storybook/test"
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
export const NavigationRegression: Story = {
  tags: ["!dev", "!autodocs"],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Anterior" })).toBeDisabled()
    await userEvent.click(canvas.getByRole("button", { name: "Continuar" }))
    await expect(canvas.getByRole("button", { name: "Envío" })).toHaveAttribute("aria-current", "step")
    await userEvent.keyboard("{Tab}")
    await userEvent.click(canvas.getByRole("button", { name: "Continuar" }))
    await userEvent.click(canvas.getByRole("button", { name: "Finalizar" }))
    await expect(canvas.getByRole("button", { name: "Completado" })).toBeDisabled()
    await expect(canvas.getAllByRole("button", { name: /completado/ })).toHaveLength(3)
  },
}
export const KeyboardRegression: Story = {
  tags: ["!dev", "!autodocs"], args: { orientation: "vertical", size: "sm", disabledStep: "2", labels: false, indicator: "number" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole("button", { name: "Envío" })).toBeDisabled()
    await userEvent.click(canvas.getByRole("button", { name: "Carrito" }))
    await userEvent.keyboard("{ArrowDown}")
    await expect(canvas.getByRole("button", { name: "Pago" })).toHaveFocus()
    await userEvent.keyboard("{Enter}")
    await expect(canvas.getByRole("button", { name: "Pago" })).toHaveAttribute("aria-current", "step")
  },
}

const geometryPlay: NonNullable<Story["play"]> = async ({ canvasElement, args }) => {
  const indicator = canvasElement.querySelector<HTMLElement>('[data-slot="stepper-indicator"]')!
  const list = canvasElement.querySelector<HTMLElement>('[data-slot="stepper-list"]')!
  const svg = indicator.querySelector('svg')!
  const small = args.size === "sm"
  await expect(getComputedStyle(indicator).width).toBe(small ? "24px" : "32px")
  await expect(getComputedStyle(indicator).height).toBe(small ? "24px" : "32px")
  await expect(getComputedStyle(svg).width).toBe(small ? "12px" : "16px")
  await expect(getComputedStyle(list).height).toBe(args.orientation === "vertical" ? small ? "134px" : "168px" : small ? "62px" : "80px")
}
export const GlobalGeometry: Story = { tags: ["!dev", "!autodocs"], play: geometryPlay }
export const ReinaGeometry: Story = { tags: ["!dev", "!autodocs"], globals: { brandTheme: "reina-madre" }, args: { size: "sm" }, play: geometryPlay }
export const MariaGeometry: Story = { tags: ["!dev", "!autodocs"], globals: { brandTheme: "maria-linda" }, args: { orientation: "vertical" }, play: geometryPlay }
export const PielGeometry: Story = { tags: ["!dev", "!autodocs"], globals: { brandTheme: "piel-sana" }, args: { orientation: "vertical", size: "sm" }, play: geometryPlay }

const countPlay: NonNullable<Story["play"]> = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement)
  const count = args.stepCount ?? 3
  await expect(canvasElement.querySelectorAll('[data-slot="stepper-item"]')).toHaveLength(count)
  await expect(canvasElement.querySelectorAll('[data-slot="stepper-separator"]')).toHaveLength(count - 1)
  for (let index = 1; index < count; index++) await userEvent.click(canvas.getByRole("button", { name: "Continuar" }))
  await expect(canvas.getByRole("button", { name: `Paso ${count}` })).toHaveAttribute("aria-current", "step")
  await userEvent.click(canvas.getByRole("button", { name: "Finalizar" }))
  await expect(canvas.getAllByRole("button", { name: /Paso .*completado/ })).toHaveLength(count)
  await userEvent.click(canvas.getByRole("button", { name: "Anterior" }))
  await expect(canvas.getByRole("button", { name: `Paso ${count - 1}` })).toHaveAttribute("aria-current", "step")
}
export const TwoSteps: Story = { tags: ["!dev", "!autodocs"], args: { stepCount: 2 }, play: countPlay }
export const FourSteps: Story = { tags: ["!dev", "!autodocs"], args: { stepCount: 4, orientation: "vertical" }, play: countPlay }
export const FiveSteps: Story = { tags: ["!dev", "!autodocs"], args: { stepCount: 5, size: "sm" }, play: countPlay }
export const SixSteps: Story = { tags: ["!dev", "!autodocs"], args: { stepCount: 6, size: "sm", orientation: "vertical" }, play: countPlay }
export const ClampedStep: Story = { tags: ["!dev", "!autodocs"], args: { stepCount: 2, activeStep: "6" }, play: async ({ canvasElement }) => {
  await expect(within(canvasElement).getByRole("button", { name: "Paso 2" })).toHaveAttribute("aria-current", "step")
} }
