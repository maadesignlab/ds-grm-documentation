"use client"

import * as React from "react"

import type { CarouselApi } from "./carousel"
import { CarouselExample } from "./carousel-example"

type Size = "full" | "large" | "medium" | "small"

function Sample({ size = "full", orientation = "horizontal", loop = false, setApi, contentClassName, itemClassName, docsSpacing = "default" }: { size?: Size; orientation?: "horizontal" | "vertical"; loop?: boolean; setApi?: (api: CarouselApi) => void; contentClassName?: string; itemClassName?: string; docsSpacing?: "default" | "compact" }) {
  return <div className="sb-unstyled carousel-docs-sample font-sans text-foreground" data-docs-spacing={docsSpacing}>
    <CarouselExample size={size} orientation={orientation} items={5} loop={loop} setApi={setApi} contentClassName={contentClassName} itemClassName={itemClassName} />
  </div>
}

function Code({ children }: { children: string }) { return <code className="inline-flex min-h-6 max-w-full items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code> }

function ShowcaseRow({ title, description, value, height = 268, children }: { title: string; description: string; value: string; height?: number; children: React.ReactNode }) {
  const heightClassName = height === 380 ? "min-h-[380px]" : height === 310 ? "min-h-[310px]" : "min-h-[268px]"
  return <section className="border-b border-border last:border-b-0"><header className="grid min-h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3"><div className="min-w-0"><strong className="block text-foreground text-sm leading-5">{title}</strong><span className="block text-xs leading-(--docs-caption-line-height) text-muted-foreground">{description}</span></div><Code>{value}</Code></header><div className={`flex items-center justify-center overflow-auto border-t border-border bg-background p-5 ${heightClassName}`}>{children}</div></section>
}

function Showcase({ children }: { children: React.ReactNode }) { return <div className="not-prose overflow-hidden rounded-lg border border-border bg-card font-sans text-card-foreground">{children}</div> }

export function CarouselAnatomy() {
  const parts = [["Carousel", "Contexto, opciones de Embla y región accesible"], ["CarouselContent", "Viewport y track desplazable"], ["CarouselItem", "Grupo accesible con roledescription slide"], ["CarouselPrevious / Next", "Button outline conectado al estado real de Embla"]] as const
  return <div className="not-prose grid gap-6"><Showcase><ShowcaseRow title="Composición base" description="La misma composición pública de shadcn/ui." value="Carousel"><Sample size="medium" /></ShowcaseRow></Showcase><div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">{parts.map(([part, description]) => <div className="grid min-h-[52px] grid-cols-[180px_minmax(0,1fr)] items-center gap-4 border-b border-border px-4 last:border-b-0" key={part}><Code>{part}</Code><span className="text-xs leading-(--docs-caption-line-height) text-muted-foreground">{description}</span></div>)}</div></div>
}

export function CarouselSizeOverview() { return <Showcase><ShowcaseRow title="Full" description="Un ítem visible." value='size="full"'><Sample /></ShowcaseRow><ShowcaseRow title="Large" description="Dos ítems visibles." value='size="large"'><Sample size="large" /></ShowcaseRow><ShowcaseRow title="Medium" description="Tres ítems visibles." value='size="medium"'><Sample size="medium" /></ShowcaseRow><ShowcaseRow title="Small" description="Cuatro ítems visibles." value='size="small"'><Sample size="small" /></ShowcaseRow></Showcase> }

export function CarouselOrientationOverview() { return <Showcase><ShowcaseRow title="Horizontal" description="Navegación lateral y eje x de Embla." value='orientation="horizontal"'><Sample size="medium" /></ShowcaseRow><ShowcaseRow title="Vertical" description="Navegación superior e inferior y eje y de Embla." value='orientation="vertical"' height={380}><Sample orientation="vertical" size="medium" /></ShowcaseRow></Showcase> }

function ApiSample() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(1)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => { if (!api) return; const update = () => { setCurrent(api.selectedScrollSnap() + 1); setCount(api.scrollSnapList().length) }; update(); api.on("select", update); api.on("reInit", update); return () => { api.off("select", update); api.off("reInit", update) } }, [api])
  return <div className="flex flex-col items-center gap-3"><Sample size="medium" setApi={setApi} /><p className="m-0 font-sans text-sm text-muted-foreground">Slide {current} de {count}</p></div>
}

export function CarouselBehaviorOverview() { return <Showcase><ShowcaseRow title="Tamaño personalizado" description="CarouselItem acepta las clases basis oficiales de shadcn/ui." value='className="basis-1/3"'><Sample itemClassName="basis-1/3" /></ShowcaseRow><ShowcaseRow title="Spacing personalizado" description="Margen negativo en el track y padding equivalente en cada ítem." value='-ml-2 / pl-2'><Sample contentClassName="-ml-2" itemClassName="basis-1/3 pl-2" docsSpacing="compact" /></ShowcaseRow><ShowcaseRow title="Opciones de Embla" description="opts se pasa directamente; este ejemplo activa navegación circular." value='opts={{ loop: true }}'><Sample size="medium" loop /></ShowcaseRow><ShowcaseRow title="API y eventos" description="setApi permite consultar posición y escuchar select/reInit." value="setApi={setApi}" height={310}><ApiSample /></ShowcaseRow></Showcase> }

const geometry = [["Carousel horizontal", "520 × 220px", "12px", "8px", "region / carousel"], ["Carousel vertical", "424 × 320px", "12px", "8px", "region / carousel"], ["Viewport horizontal", "416 × 196px", "—", "—", "overflow hidden"], ["Viewport vertical", "400 × 216px", "—", "—", "overflow hidden"], ["Track", "Flexible", "—", "16px", "Embla"], ["Navegación", "32 × 32px", "—", "—", "Button outline"]] as const
const apiRows = [["orientation", "horizontal | vertical", "Prop oficial", "Define axis y teclado"], ["opts", "CarouselOptions", "Prop oficial", "Opciones nativas de Embla"], ["plugins", "CarouselPlugin", "Prop oficial", "Plugins como Autoplay"], ["setApi", "(api) => void", "Prop oficial", "API, posición y eventos"], ["dir + opts.direction", "ltr | rtl", "Patrón oficial", "Soporte RTL"], ["size", "full | large | medium | small", "Extensión GRM", "1, 2, 3 o 4 visibles"]] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div data-docs-table="carousel" className="not-prose overflow-x-auto rounded-lg border border-border bg-card text-card-foreground"><table className="docs-spec-table min-w-[680px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, columnIndex) => <td key={`${row[0]}-${columns[columnIndex]}`}>{columnIndex === 0 ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function CarouselSpecifications() { return <div className="not-prose grid gap-6 text-foreground"><section><h3 className="text-foreground mb-3 text-base leading-6 font-semibold">Geometría</h3><Table columns={["Parte", "Dimensiones", "Padding", "Gap", "Base"]} rows={geometry} /></section><section><h3 className="text-foreground mb-3 text-base leading-6 font-semibold">API y extensiones</h3><Table columns={["Propiedad", "Valor", "Origen", "Uso"]} rows={apiRows} /></section></div> }
