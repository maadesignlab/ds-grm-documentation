"use client"

import { useState } from "react"
import { Check, CircleAlert, CreditCard, ShoppingCart, Truck } from "lucide-react"
import { Button } from "./button"
import { cn } from "@/lib/utils"
import { Stepper, StepperContent, StepperDescription, StepperIndicator, StepperItem, StepperLabel, StepperList, StepperNext, StepperPrevious, StepperTrigger, useStepper } from "./stepper"

const checkoutSteps = [
  { value: "cart", label: "Carrito", description: "Revisa los artículos", icon: ShoppingCart },
  { value: "shipping", label: "Envío", description: "Datos de entrega", icon: Truck },
  { value: "payment", label: "Pago", description: "Confirma el pago", icon: CreditCard },
] as const
export type StepperExampleProps = {
  stepCount?: 2 | 3 | 4 | 5 | 6
  size?: "default" | "sm"
  orientation?: "horizontal" | "vertical"
  labels?: boolean
  showDescription?: boolean
  showControls?: boolean
  indicator?: "icon" | "number"
  activeStep?: "1" | "2" | "3" | "4" | "5" | "6" | "complete"
  errorStep?: "none" | "1" | "2" | "3" | "4" | "5" | "6"
  disabledStep?: "none" | "2" | "3" | "4" | "5" | "6"
}
function Navigation({ complete, onComplete, size }: { complete: boolean; onComplete: () => void; size: "default" | "sm" }) {
  const { canGoNext, canGoPrevious } = useStepper()
  return <div className="flex justify-center gap-2">
    <StepperPrevious asChild><Button variant="outline" size={size} disabled={!canGoPrevious}>Anterior</Button></StepperPrevious>
    {canGoNext ? <StepperNext asChild><Button size={size}>Continuar</Button></StepperNext> : <Button size={size} disabled={complete} onClick={onComplete}>{complete ? "Completado" : "Finalizar"}</Button>}
  </div>
}
export function StepperExample(props: StepperExampleProps) {
  return <StepperExampleContent key={`${props.stepCount ?? 3}-${props.activeStep ?? "1"}-${props.disabledStep ?? "none"}`} {...props} />
}

function StepperExampleContent({ stepCount = 3, size = "default", orientation = "horizontal", labels = true, showDescription = true, showControls = true, indicator, activeStep = "1", errorStep = "none", disabledStep = "none" }: StepperExampleProps) {
  const steps = stepCount === 3 ? checkoutSteps : Array.from({ length: stepCount }, (_, i) => ({ value: `step-${i + 1}`, label: `Paso ${i + 1}`, description: "Detalle del paso", icon: ShoppingCart }))
  const selectedIndex = activeStep === "complete" ? stepCount - 1 : Math.min(Number(activeStep), stepCount) - 1
  const initialIndex = disabledStep === String(selectedIndex + 1) ? 0 : selectedIndex
  const [value, setValue] = useState<string>(steps[initialIndex].value)
  const effectiveIndicator = indicator ?? (stepCount === 3 ? "icon" : "number")
  const [complete, setComplete] = useState(activeStep === "complete")
  const index = steps.findIndex(step => step.value === value)
  return <Stepper size={size} orientation={orientation} value={value} onValueChange={next => { setValue(next); setComplete(false) }}
    steps={steps.map((step, i) => ({ value: step.value, disabled: disabledStep === String(i + 1) }))}
    className={cn("w-full max-w-full", orientation === "horizontal" ? size === "sm" ? "w-120" : "w-150" : size === "sm" ? "w-70" : "w-80")}
  >
    <StepperList aria-label="Proceso de compra">{steps.map((step, i) => {
      const completed = complete || i < index
      const error = errorStep === String(i + 1)
      const Icon = error ? CircleAlert : completed ? Check : step.icon
      return <StepperItem key={step.value} value={step.value} completed={completed} error={error} defaultTrigger={false}>
        <StepperTrigger aria-label={`${step.label}${completed ? ", completado" : ""}${error ? ", error" : ""}`} className={cn(orientation === "horizontal" && stepCount !== 3 && "px-2", complete && "data-[state=active]:text-foreground")}>
          <StepperIndicator className={complete ? "group-data-[state=active]:border-primary group-data-[state=active]:bg-background group-data-[state=active]:text-primary" : undefined}>{effectiveIndicator === "icon" || completed || error ? <Icon /> : i + 1}</StepperIndicator>
          <span className={labels ? "flex min-w-0 flex-col gap-1 group-data-[size=sm]/stepper:gap-0.5" : "sr-only"}>
            <StepperLabel>{step.label}</StepperLabel>
            {showDescription && <StepperDescription>{step.description}</StepperDescription>}
          </span>
        </StepperTrigger>
      </StepperItem>
    })}</StepperList>
    {steps.map(step => <StepperContent key={step.value} value={step.value} className="sr-only">{step.description}</StepperContent>)}
    {showControls && <Navigation size={size} complete={complete} onComplete={() => setComplete(true)} />}
  </Stepper>
}
