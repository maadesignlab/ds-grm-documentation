import { BadgeExample } from "./badge-example"
import { DocsCode, DocsSpecificationTable } from "./selectable-docs-shared"
import { cn } from "@/lib/utils"

const variants = [
  ["primary", "Primary", "--primary", "--primary-foreground", "--primary / 5%", "--primary-default-foreground", "--primary-light-border"],
  ["secondary", "Secondary", "--secondary", "--secondary-foreground", "--secondary-default-border / 10%", "--secondary-foreground", "--secondary-default-border"],
  ["brand-neutral", "Brand neutral", "--background", "--foreground", "--background", "--foreground", "--border"],
  ["transparent", "Transparent", "No aplica", "No aplica", "transparent", "--foreground", "--border"],
  ["success", "Success", "--success", "--success-foreground", "--success-light", "--success-light-foreground", "--success-light-border"],
  ["warning", "Warning", "--warning", "--warning-foreground", "--warning-light", "--warning-light-foreground", "--warning-light-border"],
  ["error", "Error", "--error", "--error-foreground", "--error-light", "--error-light-foreground", "--error-light-border"],
  ["destructive", "Destructive", "--destructive", "--destructive-foreground", "--destructive-light", "--destructive-light-foreground", "--destructive-light-border"],
  ["info", "Info", "--info", "--info-foreground", "--info-light", "--info-light-foreground", "--info-light-border"],
] as const

const sizes = [
  ["xl", "30px", "px-[11px] · 11px", "py-[5px] · 5px", "gap-1 · 4px", "14px / 20px", "14px"],
  ["lg", "22px", "px-[9px] · 9px", "py-[3px] · 3px", "gap-1 · 4px", "12px / 16px", "12px"],
  ["md", "21px", "px-[9px] · 9px", "py-[3px] · 3px", "gap-1 · 4px", "10px / 15px", "12px"],
  ["sm", "17px", "px-[7px] · 7px", "py-px · 1px", "gap-1 · 4px", "10px / 15px", "10px"],
] as const

const sizeLabels = {
  xl: "Extra grande",
  lg: "Grande",
  md: "Mediano",
  sm: "Pequeño",
} as const

function Code({ children }: { children: string }) {
  return <DocsCode>{children}</DocsCode>
}

export function BadgeVariantOverview() {
  return (
    <div className="not-prose flex flex-col gap-8">
      <BadgeAppearanceGroup appearance="solid" title="Sólido" />
      <BadgeAppearanceGroup appearance="outline" title="Contorno" />
    </div>
  )
}

function BadgeAppearanceGroup({
  appearance,
  title,
}: {
  appearance: "solid" | "outline"
  title: string
}) {
  return (
    <section>
      <header className="mb-3">
        <h3 className="m-0 text-base font-semibold leading-6 text-foreground">{title}</h3>
      </header>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {variants
          .filter(([value]) => appearance === "outline" || value !== "transparent")
          .map(([value, label, solidBg, solidText, outlineBg, outlineText, outlineBorder]) => {
          const background = appearance === "solid" ? solidBg : outlineBg
          const text = appearance === "solid" ? solidText : outlineText
          const border = appearance === "solid" ? "transparent" : outlineBorder

          return (
            <article key={value} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="sb-unstyled flex min-h-24 items-center justify-center bg-background p-5">
                <BadgeExample variant={value} appearance={appearance}>Badge</BadgeExample>
              </div>
              <div className="border-t border-border p-4">
                <div className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border py-2">
                  <strong className="flex h-full items-center whitespace-nowrap text-sm text-card-foreground">
                    {label}
                  </strong>
                  <div className="flex min-w-0 items-center justify-end">
                    <Code>{value}</Code>
                  </div>
                </div>
                <dl className="m-0 border-b border-border text-xs">
                  <BadgeProperty label="Fondo" value={background} />
                  <BadgeProperty label="Texto" value={text} divided />
                  <BadgeProperty label="Borde" value={border} divided />
                </dl>
              </div>
            </article>
          )
          })}
      </div>
    </section>
  )
}

function BadgeProperty({
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
        <Code>{value}</Code>
      </dd>
    </div>
  )
}

export function BadgeSizeOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-6">
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <header className="flex flex-col gap-1 border-b border-border px-5 py-4">
          <h3 className="m-0 text-base leading-6 font-semibold text-card-foreground">
            Badge
          </h3>
          <p className="m-0 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">
            Escala horizontal con texto, ícono o spinner opcional.
          </p>
        </header>
        <div>
          {sizes.map(([size, height, paddingX]) => (
            <div key={size} className={cn("grid min-h-18 grid-cols-[minmax(116px,0.8fr)_minmax(150px,1.2fr)] items-center gap-4 px-5 py-2.5", size !== "sm" && "border-b border-border")}>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs leading-(--docs-caption-line-height) font-medium text-foreground">
                  {sizeLabels[size]}
                  <Code>{size}</Code>
                </div>
                <div className="text-(length:--docs-table-header-font-size) leading-4 font-normal text-muted-foreground">
                  Altura {height} · Padding horizontal {paddingX.split(" · ")[1]}
                </div>
              </div>
              <div className="sb-unstyled flex min-h-12 items-center justify-center rounded-md bg-background px-4">
                <BadgeExample size={size}>Badge</BadgeExample>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function BadgeSpecifications() {
  return (
    <div className="flex flex-col gap-6">
      <DocsSpecificationTable title="Tamaños y espaciado" description="Valores medidos en Figma y expresados con su utilidad TailwindCSS." columns={["Tamaño", "Altura", "Padding X", "Padding Y", "Gap", "Tipografía", "Icono"]} rows={sizes} minWidthClassName="min-w-[760px]" codeWhen={(value, _row, cell) => cell === 0 || value.startsWith("--") || value.includes("px-") || value.includes("py-") || value.includes("gap-")} />
      <DocsSpecificationTable
        title="Tokens por tratamiento"
        description="Los nombres permanecen estables; sus valores cambian con la marca activa."
        columns={["Estilo", "Fondo sólido", "Texto sólido", "Fondo contorno", "Texto contorno", "Borde contorno", "Radio"]}
        rows={variants.map(([value, , solidBg, solidText, outlineBg, outlineText, outlineBorder]) => [value, solidBg, solidText, outlineBg, outlineText, outlineBorder, "rounded-full · --radius-full"])}
        minWidthClassName="min-w-[760px]"
        codeWhen={(value, _row, cell) => cell === 0 || value.startsWith("--")}
      />
    </div>
  )
}
