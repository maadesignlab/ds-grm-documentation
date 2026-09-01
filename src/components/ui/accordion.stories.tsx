import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

type AccordionMode = "unique" | "multiple"
type AccordionStoryArgs = {
  mode: AccordionMode
  itemCount: number
  defaultOpen: boolean
}

const items = [
  ["¿Cómo puedo programar una cita?", "Puedes programarla desde nuestros canales digitales o comunicarte directamente con la sede."],
  ["¿Qué servicios están disponibles?", "Consulta de control prenatal · Ultrasonido obstétrico · Ácido fólico prenatal."],
  ["¿Puedo modificar una cita?", "Sí. Puedes reprogramarla o cancelarla antes de la fecha asignada."],
  ["¿Qué documentos debo llevar?", "Presenta tu documento de identidad y los soportes médicos relacionados."],
  ["¿Cuáles son los medios de pago?", "Aceptamos efectivo, tarjetas débito y crédito y los convenios disponibles."],
  ["¿Atienden los fines de semana?", "Los horarios dependen de cada sede y del servicio seleccionado."],
  ["¿Cómo recibo mis resultados?", "Los resultados disponibles se envían al correo registrado."],
  ["¿Puedo solicitar atención prioritaria?", "El equipo de atención te orientará según el servicio y la disponibilidad."],
  ["¿Dónde están ubicadas las sedes?", "Consulta el directorio de sedes para encontrar la ubicación más cercana."],
  ["¿Cómo actualizo mis datos?", "Solicita la actualización de tus datos antes de confirmar una nueva cita."],
] as const

function AccordionItems({ itemCount }: { itemCount: number }) {
  return items.slice(0, itemCount).map(([title, content], index) => (
    <AccordionItem value={"item-" + (index + 1)} key={title}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  ))
}

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
  render: ({ mode, itemCount, defaultOpen }) => {
    const safeCount = Math.min(10, Math.max(2, itemCount))

    if (mode === "multiple") {
      return (
        <div className="w-[calc(100vw-48px)] max-w-[404px]">
          <Accordion
            type="multiple"
            defaultValue={defaultOpen ? ["item-1", "item-2"] : []}
            className="w-full"
          >
            <AccordionItems itemCount={safeCount} />
          </Accordion>
        </div>
      )
    }

    return (
      <div className="w-[calc(100vw-48px)] max-w-[404px]">
        <Accordion
          type="single"
          collapsible
          defaultValue={defaultOpen ? "item-1" : undefined}
          className="w-full"
        >
          <AccordionItems itemCount={safeCount} />
        </Accordion>
      </div>
    )
  },
} satisfies Meta<AccordionStoryArgs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
