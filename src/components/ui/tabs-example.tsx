"use client"

import * as React from "react"
import { ArrowDownIcon } from "lucide-react"

import { TabsOverflow } from "./tabs-overflow"

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

const overflowLabels = ["Resumen", "Pacientes", "Agenda", "Consultas", "Estudios", "Resultados", "Pagos", "Historial"]
export type TabsOverflowExampleProps = { visibleTabs?: 2 | 3 | 4; activeTab?: number; showContent?: boolean; disabledTab?: boolean }

export function TabsOverflowExample({ visibleTabs = 2, activeTab = 1, showContent = true, disabledTab = false }: TabsOverflowExampleProps) {
  return <div className="w-full min-w-0" style={{ width: `calc(var(--spacing) * ${visibleTabs * 28 + 20})`, maxWidth: "100%" }}>
    <TabsOverflow visibleTabs={visibleTabs} defaultValue={String(Math.min(8, Math.max(1, activeTab)))} label="Secciones de información" items={overflowLabels.map((label, index) => ({
      value: String(index + 1), label, disabled: disabledTab && index === 7,
      content: showContent ? `Contenido de ${label.toLowerCase()}.` : undefined,
    }))} />
  </div>
}
