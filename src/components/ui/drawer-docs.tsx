"use client"

import { DrawerExample } from "./drawer-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground" style={{ fontSize: 10, lineHeight: 1 }}>{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="flex min-h-36 items-center justify-center bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground" style={{ fontSize: 14, lineHeight: "20px" }}>{title}</strong><Code>{value}</Code></div></article>
}

export function DrawerPositions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Top" value="swipeDirection=up"><DrawerExample swipeDirection="up" buttonAmount={1} /></Card><Card title="Right" value="swipeDirection=right"><DrawerExample swipeDirection="right" /></Card><Card title="Bottom" value="swipeDirection=down"><DrawerExample swipeDirection="down" buttonAmount={1} showSwipeHandle /></Card><Card title="Left" value="swipeDirection=left"><DrawerExample swipeDirection="left" /></Card></div>
}

export function DrawerWidths() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Side · 384 px" value="sideWidth=384"><DrawerExample sideWidth={384} /></Card><Card title="Side · 480 px" value="sideWidth=480"><DrawerExample sideWidth={480} /></Card></div>
}

export function DrawerActions() {
  return <div className="not-prose grid gap-3 md:grid-cols-2"><Card title="Una acción" value="buttonAmount=1"><DrawerExample buttonAmount={1} /></Card><Card title="Dos acciones" value="buttonAmount=2"><DrawerExample buttonAmount={2} /></Card></div>
}

export function DrawerBehaviors() {
  return <div className="not-prose grid gap-3 md:grid-cols-3"><Card title="Nested" value="behavior=nested"><DrawerExample behavior="nested" /></Card><Card title="Non-modal" value="behavior=non-modal"><DrawerExample behavior="non-modal" /></Card><Card title="Snap points" value="behavior=snap-points"><DrawerExample behavior="snap-points" /></Card></div>
}

const geometry = [
  ["Side · small", "384px", "viewport − 32px", "16px", "6px", "16px", "24px"],
  ["Side · large", "480px", "viewport − 32px", "16px", "6px", "16px", "24px"],
  ["Bottom", "viewport − 32px", "680px máx.", "16px", "6px", "16px", "24px"],
] as const

const variables = [
  ["--drawer-inset", "0px oficial · 16px GRM", "Separación flotante respecto al viewport"],
  ["--drawer-bleed-background", "transparent con inset · var(--color-popover) sin inset", "Evita unir visualmente el drawer flotante al borde"],
  ["--drawer-overlay-min-opacity", "0 · 0.5 con snap points", "Opacidad mínima del overlay"],
] as const

const anatomy = [
  ["Title", "--popover-foreground", "16px / 24px", "500", "—"],
  ["Description", "--muted-foreground", "14px / 20px", "400", "—"],
  ["Body", "Por contenido", "14px / 20px", "400", "16px"],
  ["Footer · 1", "—", "—", "—", "16px · 49px total"],
  ["Footer · 2", "—", "—", "—", "16px · 10px gap · 91px total"],
  ["Swipe handle", "--muted", "100 × 6px", "—", "6px superior"],
] as const

function Table({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", tableLayout: "fixed" }}><thead><tr style={{ background: "var(--muted)" }}>{columns.map(column => <th key={column} style={{ padding: "11px 16px", border: 0, borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontSize: 11, fontWeight: 600, letterSpacing: ".04em", lineHeight: 1.4, textAlign: "left", textTransform: "uppercase", verticalAlign: "middle" }}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row[0]} style={{ background: index % 2 ? "color-mix(in srgb, var(--muted) 30%, transparent)" : "transparent" }}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`} style={{ height: 52, padding: "10px 16px", border: 0, borderBottom: index === rows.length - 1 ? 0 : "1px solid var(--border)", color: "var(--foreground)", fontSize: 12, lineHeight: 1.4, verticalAlign: "middle" }}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function DrawerSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Geometría</h3><Table columns={["Variante", "Ancho", "Alto", "Inset", "Gap header", "Body padding", "Radio"]} rows={geometry} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Anatomía</h3><Table columns={["Región", "Color/token", "Tamaño", "Peso", "Espaciado"]} rows={anatomy} /></section><section><h3 style={{ margin: "0 0 12px", fontSize: 16, fontWeight: 600, lineHeight: "24px" }}>Variables de estilo</h3><Table columns={["Variable", "Valor", "Uso"]} rows={variables} /></section></div>
}
