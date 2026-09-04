import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { expect, within } from "storybook/test"

import { CalendarExample, type CalendarExampleProps } from "./calendar-example"

const meta = {
  title: "Components/Calendar",
  args: { mode: "single", composition: "calendar", captionLayout: "label", numberOfMonths: 1, showOutsideDays: true, showWeekNumber: false, fixedWeeks: false, bookedDates: false },
  argTypes: {
    mode: { name: "Selección", control: "inline-radio", options: ["single", "multiple", "range"], table: { category: "Calendar" } },
    captionLayout: { name: "Encabezado", control: "select", options: ["label", "dropdown", "dropdown-months", "dropdown-years"], description: "Los selectores aplican a un mes. Con dos meses se muestran captions «mes año», como en shadcn/ui.", table: { category: "Calendar" } },
    numberOfMonths: { name: "Meses", control: "inline-radio", options: [1, 2], description: "Aplica a single y multiple. Range siempre presenta dos meses.", table: { category: "Calendar" } },
    showOutsideDays: { name: "Días externos", control: "boolean", table: { category: "Calendar" } },
    showWeekNumber: { name: "Número de semana", control: "boolean", table: { category: "Calendar" } },
    fixedWeeks: { name: "Semanas fijas", control: "boolean", table: { category: "Calendar" } },
    bookedDates: { name: "Fechas ocupadas", control: "boolean", description: "Configura disabled y modifiers en la muestra.", table: { category: "Configuración de muestra" } },
    composition: { name: "Composición", control: "inline-radio", options: ["calendar", "availability", "time", "presets"], description: "Compone Calendar con modifiers y primitives oficiales; no amplía su API.", table: { category: "Configuración de muestra" } },
  },
  parameters: { layout: "centered", design: { type: "figma", url: "https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m/Design-System-GRM-v1?node-id=1521-3069" } },
  render: args => <CalendarExample key={JSON.stringify(args)} {...args} />,
} satisfies Meta<CalendarExampleProps>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { play: async ({ canvasElement }) => { const canvas = within(canvasElement); await expect(canvasElement.querySelector("[data-slot=calendar]")).toBeTruthy(); await expect(canvas.getAllByRole("grid").length).toBeGreaterThan(0) } }
