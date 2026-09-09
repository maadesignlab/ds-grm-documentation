"use client"

import { BreadcrumbExample } from "./breadcrumb-example"
import { DocsCard, DocsSection, DocsTable } from "./selectable-docs-shared"

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) { return <DocsCard title={title} value={value} previewClassName="min-h-32 justify-start overflow-auto">{children}</DocsCard> }

export function BreadcrumbLevels() {
  return <div className="not-prose grid gap-3"><Card title="2 niveles" value="levels={2}"><BreadcrumbExample levels={2} /></Card><Card title="3 niveles" value="levels={3}"><BreadcrumbExample levels={3} /></Card><Card title="4 niveles" value="levels={4}"><BreadcrumbExample levels={4} /></Card></div>
}

export function BreadcrumbReduction() {
  return <div className="not-prose grid gap-3 lg:grid-cols-2"><Card title="Elipsis informativa" value='reduction="ellipsis"'><BreadcrumbExample reduction="ellipsis" /></Card><Card title="Elipsis interactiva" value='reduction="dropdown"'><BreadcrumbExample reduction="dropdown" /></Card></div>
}

const geometry = [
  ["Lista", "Contenido", "20px", "—", "6px", "—"],
  ["Link", "Contenido", "20px", "—", "—", "14px / 20px"],
  ["Página actual", "Contenido", "20px", "—", "—", "14px / 20px"],
  ["Separador", "14px", "14px", "—", "—", "ChevronRight"],
  ["Elipsis muted", "16px", "16px", "—", "—", "MoreHorizontal"],
  ["Elipsis dropdown", "24px", "24px", "4px", "—", "Button icon-xs"],
] as const
const tokens = [
  ["Link", "Texto", "--muted-foreground", "font-normal"],
  ["Link hover/focus", "Texto", "--foreground", "hover / focus-visible"],
  ["Página actual", "Texto", "--foreground", "aria-current=page"],
  ["Separador", "Icono", "currentColor", "aria-hidden=true"],
  ["Tipografía", "Familia", "--brand-font-sans", "font-sans"],
] as const

export function BreadcrumbSpecifications() { return <div className="not-prose grid gap-6"><DocsSection title="Geometría y tipografía"><DocsTable minWidthClassName="min-w-[680px]" columns={["Parte", "Ancho", "Alto", "Padding", "Gap", "Detalle"]} rows={geometry} /></DocsSection><DocsSection title="Tokens y estados"><DocsTable minWidthClassName="min-w-[680px]" columns={["Parte", "Propiedad", "Token", "Implementación"]} rows={tokens} /></DocsSection></div> }
