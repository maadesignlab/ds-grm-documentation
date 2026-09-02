"use client"

import { ToggleExample } from "./toggle-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-36 items-center justify-center bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

export function ToggleVariants() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Default" value="variant=default"><ToggleExample /></Card><Card title="Outline" value="variant=outline"><ToggleExample variant="outline" /></Card></div>
}

export function ToggleContent() {
  return <div className="not-prose grid gap-3 sm:grid-cols-3"><Card title="Icono" value="icon"><ToggleExample content="icon" /></Card><Card title="Texto" value="text"><ToggleExample content="text" /></Card><Card title="Icono y texto" value="icon-text"><ToggleExample content="icon-text" /></Card></div>
}

const sizes = [
  { label: "Small", value: "sm", height: "32px", padding: "6px" },
  { label: "Default", value: "default", height: "36px", padding: "8px" },
  { label: "Large", value: "lg", height: "40px", padding: "10px" },
] as const

export function ToggleSizes() {
  return (
    <section className="not-prose overflow-hidden rounded-lg border border-border bg-card">
      <header
        className="border-b border-border"
        style={{ display: "flex", flexDirection: "column", gap: 4, padding: "16px 20px" }}
      >
        <h3
          className="font-semibold text-card-foreground"
          style={{ margin: 0, fontSize: 16, lineHeight: "24px" }}
        >
          Toggle
        </h3>
        <p
          className="text-muted-foreground"
          style={{ margin: 0, fontSize: 13, lineHeight: "20px" }}
        >
          La altura, el ancho mínimo y el padding cambian según el tamaño.
        </p>
      </header>
      <div>
        {sizes.map((size, index) => (
          <div
            key={size.value}
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(116px, 0.8fr) minmax(150px, 1.2fr)",
              alignItems: "center",
              gap: 16,
              minHeight: 72,
              padding: "10px 20px",
              borderBottom: index === sizes.length - 1 ? 0 : "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div className="font-medium text-foreground" style={{ fontSize: 12, lineHeight: "18px" }}>
                {size.label}
              </div>
              <div className="text-muted-foreground" style={{ fontSize: 11, lineHeight: "16px" }}>
                {size.height} · px {size.padding}
              </div>
            </div>
            <div className="flex min-h-12 items-center justify-center rounded-md bg-background px-4">
              <ToggleExample size={size.value} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ToggleStates() {
  return <div className="not-prose grid gap-3 sm:grid-cols-3"><Card title="Off" value="aria-pressed=false"><ToggleExample /></Card><Card title="On" value="aria-pressed=true"><ToggleExample pressed /></Card><Card title="Disabled" value="disabled"><ToggleExample disabled /></Card></div>
}

const geometry = [
  ["sm", "32px", "32px", "6px", "8px", "6px", "16px"],
  ["default", "36px", "36px", "8px", "8px", "6px", "16px"],
  ["lg", "40px", "40px", "10px", "8px", "6px", "16px"],
] as const

const styles = [
  ["Default · off", "transparent", "--foreground", "—"],
  ["Default · hover", "--muted", "--muted-foreground", "—"],
  ["Outline · off", "transparent", "--foreground", "--input"],
  ["Outline · hover", "--accent", "--accent-foreground", "--input"],
  ["On", "--accent", "--accent-foreground", "Por variante"],
  ["Focus", "Por estado", "Por estado", "--ring"],
  ["Disabled", "Por estado", "Por estado", "opacity-50"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 720, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function ToggleSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Tamaños y espaciado</h3><Table columns={["Tamaño", "Alto", "Ancho mín.", "Padding X", "Gap", "Radio", "Icono"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Estados y colores</h3><Table columns={["Estado", "Fondo", "Texto", "Borde · tratamiento"]} rows={styles} /></section></div>
}
