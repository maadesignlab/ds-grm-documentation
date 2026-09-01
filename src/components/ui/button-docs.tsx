import { Plus } from "lucide-react"

import { Button } from "./button"

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
  return (
    <code
      className="rounded bg-muted text-foreground"
      style={{
        display: "inline-flex",
        minHeight: 24,
        maxWidth: "100%",
        alignItems: "center",
        padding: "4px 6px",
        fontSize: 10,
        lineHeight: 1,
      }}
    >
      {children}
    </code>
  )
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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "72px minmax(0, 1fr)",
        alignItems: "center",
        minHeight: 44,
        gap: 12,
        padding: "8px 0",
        borderTop: divided ? "1px solid var(--border)" : undefined,
      }}
    >
      <dt
        className="text-muted-foreground"
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          margin: 0,
          fontStyle: "normal",
        }}
      >
        {label}
      </dt>
      <dd
        style={{
          display: "flex",
          minWidth: 0,
          height: "100%",
          alignItems: "center",
          justifyContent: "flex-end",
          margin: 0,
          textAlign: "right",
        }}
      >
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
          <div className="flex min-h-24 items-center justify-center bg-background p-5">
            <Button variant={variant.value}>Button</Button>
          </div>
          <div className="border-t border-border p-4">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1fr) auto",
                alignItems: "center",
                minHeight: 44,
                gap: 12,
                padding: "8px 0",
                borderBottom: "1px solid var(--border)",
              }}
            >
              <strong
                className="text-sm text-card-foreground"
                style={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {variant.label}
              </strong>
              <div style={{ display: "flex", minWidth: 0, alignItems: "center", justifyContent: "flex-end" }}>
                <TokenValue>{variant.value}</TokenValue>
              </div>
            </div>
            <dl
              className="text-xs"
              style={{
                margin: 0,
                borderBottom: "1px solid var(--border)",
              }}
            >
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
        <header
          className="border-b border-border"
          style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}
        >
          <h3
            className="text-base font-semibold text-card-foreground"
            style={{ margin: 0, fontSize: 16, lineHeight: "24px" }}
          >
            Button
          </h3>
          <p
            className="text-sm text-muted-foreground"
            style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}
          >
            Contenido horizontal con texto.
          </p>
        </header>
        <div>
          {textSizes.map((size) => (
            <div
              key={size.value}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(116px, 0.8fr) minmax(150px, 1.2fr)",
                alignItems: "center",
                gap: 16,
                minHeight: 72,
                padding: "10px 20px",
                borderBottom: size.value === "xs" ? 0 : "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div className="text-xs font-medium text-foreground" style={{ lineHeight: "18px" }}>{size.label}</div>
                <div className="text-[11px] text-muted-foreground" style={{ lineHeight: "16px" }}>{size.height} · px {size.padding}</div>
              </div>
              <div className="flex min-h-12 items-center justify-center rounded-md bg-background px-4">
                <Button size={size.value}>Button</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <header
          className="border-b border-border"
          style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}
        >
          <h3
            className="text-base font-semibold text-card-foreground"
            style={{ margin: 0, fontSize: 16, lineHeight: "24px" }}
          >
            Icon Button
          </h3>
          <p
            className="text-sm text-muted-foreground"
            style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}
          >
            Contenedor cuadrado con icono fijo de 16px.
          </p>
        </header>
        <div>
          {iconSizes.map((size) => (
            <div
              key={size.value}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(116px, 0.8fr) minmax(150px, 1.2fr)",
                alignItems: "center",
                gap: 16,
                minHeight: 72,
                padding: "10px 20px",
                borderBottom: size.value === "icon-xs" ? 0 : "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div className="text-xs font-medium text-foreground" style={{ lineHeight: "18px" }}>{size.label}</div>
                <div className="text-[11px] text-muted-foreground" style={{ lineHeight: "16px" }}>{size.dimension} · p {size.padding}</div>
              </div>
              <div className="flex min-h-12 items-center justify-center gap-3 rounded-md bg-background px-4">
                <Button size={size.value} aria-label={size.label}><Plus /></Button>
                <Button size={size.value} className="rounded-full" aria-label={`${size.label} circular`}><Plus /></Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function SpecificationTable({
  title,
  description,
  columns,
  rows,
}: {
  title: string
  description: string
  columns: readonly string[]
  rows: ReadonlyArray<readonly string[]>
}) {
  return (
    <section className="not-prose overflow-hidden rounded-lg border border-border bg-card">
      <header
        className="border-b border-border"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          padding: "16px 20px",
        }}
      >
        <h3
          className="text-base font-semibold text-card-foreground"
          style={{ margin: 0, fontSize: 16, lineHeight: "24px" }}
        >
          {title}
        </h3>
        <p
          className="text-sm text-muted-foreground"
          style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}
        >
          {description}
        </p>
      </header>
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            minWidth: 680,
            borderCollapse: "collapse",
            tableLayout: "fixed",
          }}
        >
          <thead>
            <tr style={{ background: "var(--muted)" }}>
              {columns.map((column) => (
                <th
                  key={column}
                  style={{
                    padding: "11px 16px",
                    border: 0,
                    borderBottom: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
                    fontSize: 11,
                    fontStyle: "normal",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    lineHeight: 1.4,
                    textAlign: "left",
                    textTransform: "uppercase",
                    verticalAlign: "middle",
                  }}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={row[0]} style={{ background: rowIndex % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>
                {row.map((value, columnIndex) => (
                  <td
                    key={`${row[0]}-${columns[columnIndex]}`}
                    style={{
                      height: 52,
                      padding: "10px 16px",
                      border: 0,
                      borderBottom: rowIndex === rows.length - 1 ? 0 : "1px solid var(--border)",
                      color: "var(--foreground)",
                      fontSize: 12,
                      lineHeight: 1.4,
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                  >
                    {columnIndex === 0 ? <TokenValue>{value}</TokenValue> : value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function ButtonSpecifications() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <SpecificationTable
        title="Button"
        description="Escala para botones con texto, icono o spinner opcional."
        columns={["Tamaño", "Altura", "Padding X", "Gap", "Tipografía"]}
        rows={textSpecifications}
      />
      <SpecificationTable
        title="Icon Button"
        description="Escala cuadrada con icono interno constante."
        columns={["Tamaño", "Dimensiones", "Padding", "Icono", "Formas"]}
        rows={iconSpecifications}
      />
      <div className="not-prose rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-foreground">
        <strong>Propiedades separadas:</strong> Button utiliza <code>children</code> y <code>contentPlacement</code>. Icon Button utiliza <code>roundness</code> y no expone controles de texto o posición.
      </div>
    </div>
  )
}
