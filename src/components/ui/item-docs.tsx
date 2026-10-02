"use client"

import { Badge } from "./badge"
import { ItemExample, itemExamplePresets, type ItemExampleProps } from "./item-example"
import { DocsSection, SelectableCard as Card, SelectableTable as Table } from "./selectable-docs-shared"

type Preset = keyof typeof itemExamplePresets
function Example({ preset }: { preset: Preset }) { return <ItemExample {...itemExamplePresets[preset] as ItemExampleProps} /> }

const appearanceGuide = [
  { appearance: "default", title: "Default", description: "Sin fondo ni borde visibles. Para integrar una fila dentro de una lista.", },
  { appearance: "outline", title: "Outline", description: "Un borde delimita el contenido sin añadir un fondo. Para separar elementos independientes.", },
  { appearance: "muted", title: "Muted", description: "Un fondo suave destaca el bloque sin dibujar un borde. Para agrupar contenido relacionado.", },
  { appearance: "light", title: "Light", description: "Combina fondo suave y borde. Para destacar un mensaje o estado dentro de la página.", },
] as const

export function ItemAppearances() {
  return <div className="not-prose grid gap-4">
    <p className="m-0 text-sm text-muted-foreground">Compara cada apariencia sin estado y con un estado informativo. El selector de marca actualiza los colores de ambas muestras.</p>
    {appearanceGuide.map(({appearance,title,description}) => <article key={appearance} className="overflow-hidden rounded-lg border border-border bg-card">
      <header className="grid gap-1 border-b border-border p-4">
        <div className="flex items-center gap-2"><h3 className="m-0 text-sm font-semibold text-card-foreground">{title}</h3>{appearance === "light" && <Badge variant="info" appearance="outline" size="lg">Nuevo</Badge>}</div>
        <p className="m-0 text-sm leading-5 text-muted-foreground">{description}</p>
      </header>
      <div className="sb-unstyled grid gap-4 bg-background p-4 md:grid-cols-2">
        {(["neutral", "info"] as const).map(status => <div key={status} className="grid min-w-0 grid-cols-1 gap-2"><span className="text-xs font-medium text-muted-foreground">{status === "neutral" ? "Sin estado" : "Informativo"}</span><ItemExample appearance={appearance} status={status} showTrailing={false} /></div>)}
      </div>
    </article>)}
  </div>
}

export function ItemColorDetails() {
  return <details className="not-prose mb-12 rounded-lg border border-border bg-card">
    <summary className="cursor-pointer px-4 py-3 text-sm font-medium">Ver tokens de color · implementación</summary>
    <div className="grid gap-4 border-t border-border p-4">
      <p className="m-0 text-sm text-muted-foreground">Ejemplo concreto para el estado informativo. Success, warning y error usan las mismas posiciones con sus propios tokens.</p>
      <Table columns={["Apariencia", "Fondo", "Borde", "Texto e icono"]} rows={[
        ["Default", "Transparente", "Transparente", "--info-light-foreground"],
        ["Outline", "Transparente", "--info-light-border", "--info-light-foreground"],
        ["Muted", "--info-light", "Transparente", "--info-light-foreground"],
        ["Light", "--info-light", "--info-light-border", "--info-light-foreground"],
      ]} />
      <p className="m-0 text-sm text-muted-foreground">Sin estado, el título y el icono usan card/foreground y la descripción muted/foreground.</p>
      <Table columns={["Sin estado", "Fondo", "Borde"]} rows={[
        ["Default", "Transparente", "Transparente"], ["Outline", "Transparente", "--border"],
        ["Muted", "--muted", "Transparente"], ["Light", "--card", "--border"],
      ]} />
      <p className="m-0 text-sm text-muted-foreground">Un botón dentro del Item conserva su propia apariencia; no adopta automáticamente el color del estado.</p>
    </div>
  </details>
}

export function ItemCompositions() {
  return <div className="not-prose grid gap-3"><Card title="Icon" value='ItemMedia variant="icon"'><Example preset="icon" /></Card><Card title="Avatar" value="ItemMedia + Avatar"><Example preset="avatar" /></Card><Card title="Image" value='ItemMedia variant="image"'><Example preset="image" /></Card><Card title="Avatar group" value="AvatarGroup + Button"><Example preset="avatarGroup" /></Card><Card title="Sin descripción" value="description=false"><Example preset="withoutDescription" /></Card><Card title="Header / Stacked group" value="ItemGroup > ItemHeader"><Example preset="header" /></Card><Card title="Link" value="Item render"><Example preset="link" /></Card><Card title="Items dentro de Dropdown" value="DropdownMenuItem > Item"><Example preset="dropdown" /></Card><Card title="Time" value="time"><Example preset="time" /></Card></div>
}

export function ItemLayouts() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base font-semibold leading-6 text-foreground">Tamaños oficiales</h3><div className="grid gap-3"><Card title="Default · media 40px" value="size=default"><Example preset="sizeDefault" /></Card><Card title="Small · media 32px" value="size=sm"><Example preset="sizeSm" /></Card><Card title="Extra small · media 24px" value="size=xs"><Example preset="sizeXs" /></Card></div></section><section><h3 className="mb-3 text-base font-semibold leading-6 text-foreground">Layouts del Design System</h3><div className="grid gap-3"><Card title="Compact" value="layout=compact · px-2.5 py-2"><Example preset="compact" /></Card><Card title="Stacked · 182px de ancho" value="layout=stacked"><Example preset="stacked" /></Card></div></section></div>
}

export function ItemGroups() {
  return <div className="not-prose grid gap-3"><Card title="List" value="ItemGroup"><Example preset="list" /></Card><Card title="Grid" value="ItemGroup + flex-row"><Example preset="grid" /></Card></div>
}

const anatomy = [
  ["Item", "Base UI useRender", "variant / size / render", "Contenedor"], ["ItemMedia", "div", "variant", "Icono, avatar o imagen"],
  ["ItemContent", "div", "Composición", "Contenido flexible"], ["ItemTitle", "div", "HTML props", "Título"],
  ["ItemDescription", "p", "HTML props", "Descripción"], ["ItemActions", "div", "Composición", "Acción o metadato"],
  ["ItemHeader", "div", "HTML props", "Cabecera de ancho completo"], ["ItemFooter", "div", "HTML props", "Pie de ancho completo"],
  ["ItemGroup", "div role=list", "HTML props", "Agrupación"], ["ItemSeparator", "Separator", "Separator props", "Divisor"],
] as const
const geometry = [
  ["Item default", "w-[511px] max-w-full", "511px máximo", "Figma / composición"], ["Item stacked", "w-[182px]", "182px", "Figma / composición"],
  ["Group oficial", "w-[448px] max-w-full", "448px máximo", "shadcn/ui max-w-md"],
  ["Padding", "px-3 py-2.5", "12px / 10px", "shadcn/ui / Figma"], ["Gap", "gap-2.5", "10px", "shadcn/ui / Figma"],
  ["Group gap", "gap-4", "16px", "shadcn/ui / Figma"], ["Radio", "rounded-lg", "8px", "shadcn/ui / Figma"],
  ["Avatar", "size=lg", "40 × 40px", "Avatar / Figma"], ["Icono", "size-4", "16 × 16px", "shadcn/ui / Figma"],
  ["Button action", "size=sm", "28px alto", "shadcn/ui / Figma"], ["Icon button avatar", "size=icon-sm", "28 × 28px", "shadcn/ui"],
  ["Avatar en Group", "Avatar default", "32 × 32px", "shadcn/ui"], ["Acción en Group", "size=icon", "32 × 32px", "shadcn/ui"],
  ["Size default", "gap-2.5 px-3 py-2.5", "10px / 12px / 10px", "shadcn/ui"], ["Size sm", "gap-2.5 px-3 py-2.5", "10px / 12px / 10px", "shadcn/ui"],
  ["Size xs", "gap-2 px-2.5 py-2", "8px / 10px / 8px", "shadcn/ui"], ["Dropdown content", "w-44 p-1", "176px / 4px", "Figma + Dropdown"],
  ["Item en Dropdown", "gap-2 px-1.5 py-1", "8px / 6px / 4px", "Figma / composición"], ["Avatar en Dropdown", "size-7", "28 × 28px", "Figma / composición"],
] as const
const typography = [
  ["Title", "text-sm / leading-5 / font-medium", "14px / 20px / 500", "shadcn/ui / token de marca"],
  ["Description", "text-sm / leading-5 / font-normal", "14px / 20px / 400", "shadcn/ui / token de marca"],
  ["Time", "text-sm / leading-5", "14px / 20px", "Figma / token de marca"],
  ["Dropdown title", "text-sm / leading-5 / font-medium", "14px / 20px / 500", "shadcn/ui / Figma"],
  ["Dropdown description", "text-xs / leading-4", "12px / 16px / 400", "Figma"],
] as const
export function ItemSpecifications() {
  return <div className="not-prose grid gap-6"><DocsSection title="API y anatomía"><Table columns={["Parte","Primitive","API","Función"]} rows={anatomy} /></DocsSection><DocsSection title="Tamaño y espaciado"><Table columns={["Propiedad","Tailwind","Valor","Origen"]} rows={geometry} /></DocsSection><DocsSection title="Tipografía"><Table columns={["Elemento","Tailwind","Valor","Origen"]} rows={typography} /></DocsSection><ItemColorDetails /></div>
}

export function ItemStatuses() {
  return <div className="not-prose grid gap-3">{(["neutral", "success", "warning", "error", "info"] as const).map(status => <Card key={status} title={status + " · Nuevo"} value={"appearance=light · status=" + status}><ItemExample appearance="light" status={status} /></Card>)}</div>
}
