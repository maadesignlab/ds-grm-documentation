"use client"

import { LabelExample } from "./label-example"
import { DocsCard, DocsSection, DocsTable } from "./selectable-docs-shared"

export function LabelCompositions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><DocsCard title="With Input" value="Input" previewClassName="min-h-44 p-8"><LabelExample control="input" text="Nombre de usuario" /></DocsCard><DocsCard title="With Checkbox" value="Checkbox" previewClassName="min-h-44 p-8"><LabelExample control="checkbox" text="Aceptar términos y condiciones" /></DocsCard><DocsCard title="Disabled" value="data-disabled" previewClassName="min-h-44 p-8"><LabelExample control="input" text="Deshabilitado" disabled /></DocsCard><DocsCard title="With Textarea" value="Textarea" previewClassName="min-h-44 p-8"><LabelExample control="textarea" text="Mensaje" /></DocsCard></div>
}

const anatomy = [
  ["Elemento", "label", "API nativa", "React.ComponentProps<'label'>"],
  ["Asociación", "htmlFor", "Control asociado", "id"],
  ["Contenido", "children", "Texto o composición", "ReactNode"],
  ["Estilos", "className", "Extensión local", "string"],
] as const
const styles = [
  ["Display", "flex items-center", "Oficial shadcn/ui"],
  ["Gap", "gap-2 · 8px", "Oficial shadcn/ui"],
  ["Tamaño", "text-sm · 14px", "Oficial shadcn/ui"],
  ["Line-height", "leading-none · 1", "Oficial shadcn/ui"],
  ["Peso", "font-medium · 500", "Oficial shadcn/ui"],
  ["Selección", "select-none", "Oficial shadcn/ui"],
] as const
const states = [
  ["Disabled", "Field[data-disabled] + control[disabled]", "opacity-50 · pointer-events-none"],
  ["Invalid", "Field[data-invalid] + aria-invalid", "text-destructive + FieldError"],
  ["Required", "control[required]", "Indicador compuesto en children"],
] as const

export function LabelSpecifications() {
  return <div className="not-prose grid gap-6"><DocsSection title="API del primitive"><DocsTable columns={["Parte", "Propiedad", "Función", "Tipo / relación"]} rows={anatomy} /></DocsSection><DocsSection title="Estilos base"><DocsTable columns={["Propiedad", "Tailwind", "Origen"]} rows={styles} /></DocsSection><DocsSection title="Estados compuestos"><DocsTable columns={["Estado", "Implementación", "Resultado"]} rows={states} /></DocsSection></div>
}
