import { cn } from "@/lib/utils"

import { ButtonIconExample, ButtonTextExample } from "./button-example"
import { DocsCode, DocsSpecificationTable } from "./selectable-docs-shared"

const variants = [
  { value: "default", label: "Primary", surface: "--primary", text: "--primary-foreground", border: "—" },
  { value: "secondary", label: "Secondary", surface: "--secondary", text: "--secondary-foreground", border: "--border" },
  { value: "brand-neutral", label: "Brand neutral", surface: "--background", text: "--foreground", border: "--border" },
  { value: "outline", label: "Outline", surface: "transparent", text: "--foreground", border: "--border" },
  { value: "ghost", label: "Ghost", surface: "transparent", text: "--foreground", border: "—" },
  { value: "link", label: "Link", surface: "transparent", text: "--foreground", border: "—" },
  { value: "success", label: "Success", surface: "--success-light", text: "--success-light-foreground", border: "--success-light-border" },
  { value: "warning", label: "Warning", surface: "--warning-light", text: "--warning-light-foreground", border: "--warning-light-border" },
  { value: "destructive", label: "Destructive", surface: "--destructive-light", text: "--destructive-light-foreground", border: "--destructive-light-border" },
] as const

const textSizes = [
  { value: "lg", label: "Large", height: "36px", padding: "12px" },
  { value: "default", label: "Default", height: "32px", padding: "12px" },
  { value: "sm", label: "Small", height: "28px", padding: "12px" },
  { value: "xs", label: "Extra small", height: "24px", padding: "12px" },
] as const

const iconSizes = [
  { value: "icon", label: "Default", dimension: "32 × 32px", padding: "8px" },
  { value: "icon-sm", label: "Small", dimension: "28 × 28px", padding: "6px" },
  { value: "icon-xs", label: "Extra small", dimension: "24 × 24px", padding: "4px" },
] as const

const textSpecifications = [
  ["lg", "h-9 · 36px", "px-3 · 12px", "gap-3 · 12px", "14px / 20px"],
  ["default", "h-8 · 32px", "px-3 · 12px", "gap-3 · 12px", "14px / 20px"],
  ["sm", "h-7 · 28px", "px-3 · 12px", "gap-3 · 12px", "12.8px / 20px"],
  ["xs", "h-6 · 24px", "px-3 · 12px", "gap-3 · 12px", "12px / 20px"],
] as const

const iconSpecifications = [
  ["icon", "size-8 · 32 × 32px", "8px", "size-4 · 16 × 16px", "6px / circular"],
  ["icon-sm", "size-7 · 28 × 28px", "6px", "size-4 · 16 × 16px", "6px / circular"],
  ["icon-xs", "size-6 · 24 × 24px", "4px", "size-4 · 16 × 16px", "6px / circular"],
] as const

function TokenValue({ children }: { children: string }) {
  return <DocsCode>{children}</DocsCode>
}

function PropertyRow({
  label,
  value,
  divided = false,
}: {
  label: string
  value: string
  divided?: boolean
}) {
  return (
    <div className={cn("grid min-h-11 grid-cols-[72px_minmax(0,1fr)] items-center gap-3 py-2", divided && "border-t border-border")}>
      <dt className="m-0 flex h-full items-center not-italic text-muted-foreground">
        {label}
      </dt>
      <dd className="m-0 flex h-full min-w-0 items-center justify-end text-right">
        <TokenValue>{value}</TokenValue>
      </dd>
    </div>
  )
}

export function ButtonVariantOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {variants.map((variant) => (
        <article key={variant.value} className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="sb-unstyled flex min-h-24 items-center justify-center bg-background p-5">
            <ButtonTextExample variant={variant.value}>Button</ButtonTextExample>
          </div>
          <div className="border-t border-border p-4">
            <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-2">
              <strong className="flex h-full items-center whitespace-nowrap text-sm text-card-foreground">
                {variant.label}
              </strong>
              <div className="flex min-w-0 items-center justify-end">
                <TokenValue>{variant.value}</TokenValue>
              </div>
            </div>
            <dl className="m-0 border-b border-border text-xs">
              <PropertyRow label="Fondo" value={variant.surface} />
              <PropertyRow label="Texto" value={variant.text} divided />
              <PropertyRow label="Borde" value={variant.border} divided />
            </dl>
          </div>
        </article>
      ))}
    </div>
  )
}

export function ButtonSizeOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-6 lg:grid-cols-2">
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <header className="flex flex-col gap-1 border-b border-border px-5 py-4">
          <h3 className="m-0 text-base leading-6 font-semibold text-card-foreground">
            Button
          </h3>
          <p className="m-0 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">
            Contenido horizontal con texto.
          </p>
        </header>
        <div>
          {textSizes.map((size) => (
            <div key={size.value} className={cn("grid min-h-18 grid-cols-[minmax(116px,0.8fr)_minmax(150px,1.2fr)] items-center gap-4 px-5 py-2.5", size.value !== "xs" && "border-b border-border")}>
              <div className="flex flex-col gap-1">
                <div className="text-xs leading-(--docs-caption-line-height) font-medium text-foreground">{size.label}</div>
                <div className="text-(length:--docs-table-header-font-size) leading-4 text-muted-foreground">{size.height} · px {size.padding}</div>
              </div>
              <div className="sb-unstyled flex min-h-12 items-center justify-center rounded-md bg-background px-4">
                <ButtonTextExample size={size.value}>Button</ButtonTextExample>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <header className="flex flex-col gap-1 border-b border-border px-5 py-4">
          <h3 className="m-0 text-base leading-6 font-semibold text-card-foreground">
            Icon Button
          </h3>
          <p className="m-0 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">
            Contenedor cuadrado con icono fijo de 16px.
          </p>
        </header>
        <div>
          {iconSizes.map((size) => (
            <div key={size.value} className={cn("grid min-h-18 grid-cols-[minmax(116px,0.8fr)_minmax(150px,1.2fr)] items-center gap-4 px-5 py-2.5", size.value !== "icon-xs" && "border-b border-border")}>
              <div className="flex flex-col gap-1">
                <div className="text-xs leading-(--docs-caption-line-height) font-medium text-foreground">{size.label}</div>
                <div className="text-(length:--docs-table-header-font-size) leading-4 text-muted-foreground">{size.dimension} · p {size.padding}</div>
              </div>
              <div className="sb-unstyled flex min-h-12 items-center justify-center gap-3 rounded-md bg-background px-4">
                <ButtonIconExample size={size.value} aria-label={size.label} />
                <ButtonIconExample size={size.value} roundness="full" aria-label={`${size.label} circular`} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function ButtonSpecifications() {
  return (
    <div className="flex flex-col gap-6">
      <DocsSpecificationTable
        title="Button"
        description="Escala para botones con texto, icono o spinner opcional."
        columns={["Tamaño", "Altura", "Padding X", "Gap", "Tipografía"]}
        rows={textSpecifications}
        minWidthClassName="min-w-[680px]"
      />
      <DocsSpecificationTable
        title="Icon Button"
        description="Escala cuadrada con icono interno constante."
        columns={["Tamaño", "Dimensiones", "Padding", "Icono", "Formas"]}
        rows={iconSpecifications}
        minWidthClassName="min-w-[680px]"
      />
      <div className="not-prose rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
        <strong>Propiedades separadas:</strong> Button utiliza <code>children</code> y <code>contentPlacement</code>. Icon Button utiliza <code>roundness</code> y no expone controles de texto o posición.
      </div>
    </div>
  )
}
