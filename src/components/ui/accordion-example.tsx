import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

export type AccordionMode = "unique" | "multiple"

export type AccordionExampleProps = {
  mode?: AccordionMode
  itemCount?: number
  defaultOpen?: boolean
  constrained?: boolean
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
    <AccordionItem value={`item-${index + 1}`} key={title}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>{content}</AccordionContent>
    </AccordionItem>
  ))
}

export function AccordionExample({ mode = "unique", itemCount = 3, defaultOpen = true, constrained = true }: AccordionExampleProps) {
  const safeCount = Math.min(10, Math.max(2, itemCount))
  const content = mode === "multiple" ? (
    <Accordion type="multiple" defaultValue={defaultOpen ? ["item-1", "item-2"] : []} className="w-full">
      <AccordionItems itemCount={safeCount} />
    </Accordion>
  ) : (
    <Accordion type="single" collapsible defaultValue={defaultOpen ? "item-1" : undefined} className="w-full">
      <AccordionItems itemCount={safeCount} />
    </Accordion>
  )

  return constrained ? <div className="w-[calc(100vw-var(--spacing)*12)] max-w-(--accordion-width)">{content}</div> : content
}
