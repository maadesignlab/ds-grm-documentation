"use client"

import { EmptyExample } from "./empty-example"
import { DocsCard, DocsSection, DocsTable } from "./selectable-docs-shared"

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <DocsCard title={title} value={value} previewClassName="min-h-[340px]"><div className="w-[382px] max-w-full">{children}</div></DocsCard>
}

export function EmptyContainerOverview() {
  return <div className="not-prose grid gap-3 xl:grid-cols-2"><Card title="Sin contenedor" value="none"><EmptyExample container="none" /></Card><Card title="Contorno" value="outline"><EmptyExample container="outline" /></Card></div>
}

export function EmptyMediaOverview() {
  return <div className="not-prose grid gap-3 xl:grid-cols-3"><Card title="Icono" value="variant=icon"><EmptyExample media="icon" actions="primary" showAuxiliary={false} /></Card><Card title="Avatar" value="composition"><EmptyExample media="avatar" actions="primary" showAuxiliary={false} /></Card><Card title="Spinner" value="composition"><EmptyExample media="spinner" actions="primary" showAuxiliary={false} /></Card></div>
}

export function EmptyActionsOverview() {
  return <div className="not-prose grid gap-3 xl:grid-cols-2"><Card title="Horizontal" value="flex-row"><EmptyExample actionLayout="horizontal" /></Card><Card title="Vertical" value="flex-col"><EmptyExample actionLayout="vertical" /></Card></div>
}

const geometry = [["Empty", "382px", "Contenido", "24px", "16px", "12px"], ["Header", "384px máx.", "Contenido", "0", "8px", "—"], ["Media icon", "32px", "32px", "0", "—", "8px"], ["Content", "384px máx.", "Contenido", "0", "10px", "—"]] as const
const typography = [["Título", "--font-sans", "14px / 20px", "500", "--foreground"], ["Descripción", "--font-sans", "14px / 20px", "400", "--muted-foreground"]] as const

export function EmptySpecifications() {
  return <div className="not-prose grid gap-6"><DocsSection title="Geometría"><DocsTable minWidthClassName="min-w-[680px]" columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Radio"]} rows={geometry} /></DocsSection><DocsSection title="Tipografía y color"><DocsTable minWidthClassName="min-w-[680px]" columns={["Parte", "Fuente", "Tamaño / línea", "Peso", "Token"]} rows={typography} /></DocsSection></div>
}
