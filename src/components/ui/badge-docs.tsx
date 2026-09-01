import { Badge } from "./badge"

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

function Table({ title, description, columns, rows }: {
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
            minWidth: 760,
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
            {rows.map((row, index) => (
              <tr
                key={row[0]}
                style={{
                  background: index % 2
                    ? "color-mix(in srgb, var(--muted) 30%, transparent)"
                    : "transparent",
                }}
              >
                {row.map((value, cell) => (
                  <td
                    key={row[0] + columns[cell]}
                    style={{
                      height: 52,
                      padding: "10px 16px",
                      border: 0,
                      borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)",
                      color: "var(--foreground)",
                      fontSize: 12,
                      lineHeight: 1.4,
                      textAlign: "left",
                      verticalAlign: "middle",
                    }}
                  >
                    {cell === 0 || value.startsWith("--") || value.includes("px-") || value.includes("py-") || value.includes("gap-") ? <Code>{value}</Code> : value}
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
              <div className="flex min-h-24 items-center justify-center bg-background p-5">
                <Badge variant={value} appearance={appearance}>Badge</Badge>
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
                    {label}
                  </strong>
                  <div style={{ display: "flex", minWidth: 0, alignItems: "center", justifyContent: "flex-end" }}>
                    <Code>{value}</Code>
                  </div>
                </div>
                <dl className="text-xs" style={{ margin: 0, borderBottom: "1px solid var(--border)" }}>
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
        <Code>{value}</Code>
      </dd>
    </div>
  )
}

export function BadgeSizeOverview() {
  return (
    <div className="not-prose grid grid-cols-1 gap-6">
      <section className="overflow-hidden rounded-lg border border-border bg-card">
        <header
          className="border-b border-border"
          style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}
        >
          <h3
            className="text-base font-semibold text-card-foreground"
            style={{ margin: 0, fontSize: 16, lineHeight: "24px" }}
          >
            Badge
          </h3>
          <p
            className="text-sm text-muted-foreground"
            style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}
          >
            Escala horizontal con texto, ícono o spinner opcional.
          </p>
        </header>
        <div>
          {sizes.map(([size, height, paddingX]) => (
            <div
              key={size}
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(116px, 0.8fr) minmax(150px, 1.2fr)",
                alignItems: "center",
                gap: 16,
                minHeight: 72,
                padding: "10px 20px",
                borderBottom: size === "sm" ? 0 : "1px solid var(--border)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "var(--foreground)",
                    fontSize: 12,
                    fontWeight: 500,
                    lineHeight: "18px",
                  }}
                >
                  {sizeLabels[size]}
                  <Code>{size}</Code>
                </div>
                <div
                  style={{
                    color: "var(--muted-foreground)",
                    fontSize: 11,
                    fontWeight: 400,
                    lineHeight: "16px",
                  }}
                >
                  Altura {height} · Padding horizontal {paddingX.split(" · ")[1]}
                </div>
              </div>
              <div className="flex min-h-12 items-center justify-center rounded-md bg-background px-4">
                <Badge size={size}>Badge</Badge>
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
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <Table title="Tamaños y espaciado" description="Valores medidos en Figma y expresados con su utilidad TailwindCSS." columns={["Tamaño", "Altura", "Padding X", "Padding Y", "Gap", "Tipografía", "Icono"]} rows={sizes} />
      <Table
        title="Tokens por tratamiento"
        description="Los nombres permanecen estables; sus valores cambian con la marca activa."
        columns={["Estilo", "Fondo sólido", "Texto sólido", "Fondo contorno", "Texto contorno", "Borde contorno", "Radio"]}
        rows={variants.map(([value, , solidBg, solidText, outlineBg, outlineText, outlineBorder]) => [value, solidBg, solidText, outlineBg, outlineText, outlineBorder, "rounded-full · --radius-full"])}
      />
    </div>
  )
}
