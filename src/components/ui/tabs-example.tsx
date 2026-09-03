"use client"

import * as React from "react"
import { ArrowDownIcon } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

type TabAmount = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type TabsExampleProps = {
  variant?: "default" | "line"
  orientation?: "horizontal" | "vertical"
  tabAmount?: TabAmount
  activeTab?: number
  iconPosition?: "none" | "left" | "right" | "both"
  disabledTab?: boolean
  showContent?: boolean
}

const labels = ["Resumen", "Analytics", "Reportes", "Pacientes", "Agenda", "Equipo", "Archivos", "Ajustes", "Ayuda"]

export function TabsExample({ variant = "default", orientation = "horizontal", tabAmount = 4, activeTab = 1, iconPosition = "none", disabledTab = false, showContent = true }: TabsExampleProps) {
  const selectedIndex = Math.min(Math.max(activeTab, 1), tabAmount)
  const [value, setValue] = React.useState(`tab-${selectedIndex}`)

  return (
    <Tabs value={value} onValueChange={setValue} orientation={orientation} className={orientation === "vertical" ? "min-h-32 flex-row" : undefined}>
      <TabsList variant={variant} aria-label="Secciones de información">
        {labels.slice(0, tabAmount).map((label, index) => (
          <TabsTrigger key={label} value={`tab-${index + 1}`} disabled={disabledTab && index === tabAmount - 1}>
            {(iconPosition === "left" || iconPosition === "both") && <ArrowDownIcon data-icon="inline-start" />}
            {label}
            {(iconPosition === "right" || iconPosition === "both") && <ArrowDownIcon data-icon="inline-end" />}
          </TabsTrigger>
        ))}
      </TabsList>
      {showContent && labels.slice(0, tabAmount).map((label, index) => <TabsContent key={label} value={`tab-${index + 1}`} className={orientation === "horizontal" ? "pt-2" : "px-4 py-1"}>Contenido de {label.toLowerCase()}.</TabsContent>)}
    </Tabs>
  )
}
