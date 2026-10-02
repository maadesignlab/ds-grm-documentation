"use client"

import { StepperExample, type StepperExampleProps } from "./stepper-example"
import { DocsCard, DocsSection, DocsTable } from "./selectable-docs-shared"

function Sample({ title, value, ...props }: StepperExampleProps & { title: string; value: string }) {
  return <DocsCard title={title} value={value}><StepperExample {...props} /></DocsCard>
}

export function StepperOrientations() {
  return <div className="not-prose grid gap-3">
    <Sample title="Horizontal" value="orientation=horizontal" />
    <Sample title="Vertical" value="orientation=vertical" orientation="vertical" />
  </div>
}

export function StepperCounts() {
  return <div className="not-prose grid gap-3">{([2, 3, 4, 5, 6] as const).map(stepCount => <Sample key={stepCount} title={`${stepCount} pasos`} value={`stepCount=${stepCount}`} stepCount={stepCount} />)}
    <Sample title="6 pasos · compacto" value="stepCount=6 · sm" stepCount={6} size="sm" />
    <Sample title="6 pasos · vertical" value="stepCount=6 · vertical" stepCount={6} orientation="vertical" />
  </div>
}

export function StepperSizes() {
  return <div className="not-prose grid gap-3">
    <Sample title="Default · indicador de 32 px" value="size=default" showControls={false} />
    <Sample title="Small · indicador de 24 px" value="size=sm" size="sm" showControls={false} />
  </div>
}

export function StepperComposition() {
  return <div className="not-prose grid gap-3">
    <Sample title="Indicadores numéricos" value="indicator=number" indicator="number" />
    <Sample title="Sin etiquetas visibles" value="labels=false" labels={false} />
    <Sample title="Sin descripción" value="showDescription=false" showDescription={false} />
    <Sample title="Sin controles" value="showControls=false" showControls={false} />
  </div>
}

export function StepperStates() {
  return <div className="not-prose grid gap-3">
    <Sample title="Completado · activo · pendiente" value="activeStep=2" activeStep="2" />
    <Sample title="Error" value="errorStep=2" activeStep="2" errorStep="2" />
    <Sample title="Paso deshabilitado" value="disabledStep=2" disabledStep="2" />
    <Sample title="Proceso completado" value="activeStep=complete" activeStep="complete" />
  </div>
}

const anatomy = [
  ["Stepper", "Raíz", "value / defaultValue / onValueChange", "Estado controlado o interno"],
  ["StepperList / StepperItem", "Secuencia", "steps / value / completed / disabled / error", "Orden y estado de cada paso"],
  ["StepperTrigger", "Navegación", "asChild / onClick / onKeyDown", "Selección y foco"],
  ["StepperIndicator / StepperSeparator", "Indicador y conexión", "children / className", "Icono, número y avance"],
  ["StepperLabel / StepperDescription", "Textos", "children", "Etiqueta y descripción"],
  ["StepperContent", "Contenido", "value / forceMount / keepMounted / asChild", "Región asociada al paso"],
  ["StepperPrevious / StepperNext", "Controles", "asChild / onBeforePrevious / onBeforeNext", "Navegación con validación externa"],
  ["useStepper / useStepperItem", "Hooks", "Estado y acciones del contexto", "Composiciones del consumidor"],
] as const
const geometry = [
  ["Indicador", "32 px", "24 px", "size=default / sm"],
  ["Icono", "16 px", "12 px", "Lucide"],
  ["Etiqueta", "14 px / 20 px", "12 px / 16 px", "Fuente sans de marca"],
  ["Descripción", "12 px / 16 px", "12 px / 16 px", "Fuente sans de marca"],
  ["Separación indicador–etiqueta", "8 px", "4 px", "gap-2 / gap-1"],
  ["Separación entre textos", "4 px", "2 px", "gap-1 / gap-0.5"],
  ["Separación vertical entre pasos", "24 px", "16 px", "gap-6 / gap-4"],
  ["Ancho horizontal de referencia", "600 px", "480 px", "Se adapta al contenedor"],
  ["Ancho vertical de referencia", "320 px", "280 px", "Se adapta al contenedor"],
] as const
const colors = [
  ["Activo", "--primary", "--primary-foreground", "--border"],
  ["Pendiente", "--background", "--muted-foreground", "--border"],
  ["Completado", "--background", "--primary", "--primary"],
  ["Error", "--background", "--destructive", "--destructive"],
  ["Etiquetas y descripción", "—", "--foreground / --muted-foreground", "—"],
  ["Conectores", "--border / --primary", "—", "—"],
] as const
const behavior = [
  ["Cantidad", "stepCount=2…6", "Secuencia y conectores ajustados al total", "Composición GRM"],
  ["Paso activo", "activeStep=1…6 / complete", "Valores superiores al total se ajustan al último paso", "Composición GRM"],
  ["Teclado", "Flechas / Home / End", "Mueven el foco según orientación", "Biblioteca original"],
  ["Activación", "Enter / Espacio", "Seleccionan el paso enfocado", "Biblioteca original"],
  ["Deshabilitado", "disabled", "Se omite en navegación", "Biblioteca original"],
  ["Validación", "onBeforeNext / onBeforePrevious", "Síncrona o asíncrona; a cargo del consumidor", "Biblioteca original"],
  ["Pendiente", "inactive", "Equivale a pending de Figma", "Correspondencia GRM"],
  ["Etiquetas ocultas", "labels=false", "Conservan el nombre accesible", "Composición GRM"],
  ["Finalización", "activeStep=complete", "Conserva el valor del último paso", "Composición GRM"],
] as const
const contrast = [
  ["Reina Madre", "--primary-foreground / --primary", "2,54:1", "No cumple AA · excepción de marca"],
  ["Piel Sana", "--primary-foreground / --primary", "2,22:1", "No cumple AA · excepción de marca"],
] as const

export function StepperSpecifications() {
  return <div className="not-prose grid gap-6">
    <DocsSection title="API y composición"><DocsTable columns={["Parte", "Función", "API", "Descripción"]} rows={anatomy} /></DocsSection>
    <DocsSection title="Tamaño y espaciado"><DocsTable columns={["Propiedad", "Default", "Small", "Referencia"]} rows={geometry} /></DocsSection>
    <DocsSection title="Color"><DocsTable columns={["Estado o parte", "Fondo", "Contenido", "Borde"]} rows={colors} /></DocsSection>
    <DocsSection title="Comportamiento y accesibilidad"><DocsTable columns={["Capacidad", "API", "Comportamiento", "Origen"]} rows={behavior} /></DocsSection>
    <DocsSection title="Excepciones de contraste · botón Continuar"><DocsTable columns={["Marca", "Tokens", "Contraste", "Estado"]} rows={contrast} /></DocsSection>
  </div>
}
