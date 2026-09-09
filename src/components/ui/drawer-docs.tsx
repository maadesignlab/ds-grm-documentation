"use client"

import { DrawerExample } from "./drawer-example"

function Code({ children }: { children: string }) {
  return <code className="inline-flex min-h-6 items-center rounded bg-muted px-1.5 py-1 text-foreground text-(length:--docs-code-font-size) leading-none">{children}</code>
}

function Card({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return <article className="overflow-hidden rounded-lg border border-border bg-card"><div className="sb-unstyled flex min-h-36 items-center justify-center bg-background p-8">{children}</div><div className="flex min-h-14 items-center justify-between gap-3 border-t border-border px-4"><strong className="truncate text-card-foreground text-sm leading-5">{title}</strong><Code>{value}</Code></div></article>
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
  return <div className="not-prose overflow-x-auto rounded-lg border border-border bg-card"><table className="docs-spec-table min-w-[760px]"><thead><tr>{columns.map(column => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row[0]}>{row.map((value, cell) => <td key={`${row[0]}-${cell}`}>{cell === 0 || value.startsWith("--") ? <Code>{value}</Code> : value}</td>)}</tr>)}</tbody></table></div>
}

export function DrawerSpecifications() {
  return <div className="not-prose grid gap-6"><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Geometría</h3><Table columns={["Variante", "Ancho", "Alto", "Inset", "Gap header", "Body padding", "Radio"]} rows={geometry} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Anatomía</h3><Table columns={["Región", "Color/token", "Tamaño", "Peso", "Espaciado"]} rows={anatomy} /></section><section><h3 className="mb-3 text-base leading-6 font-semibold text-foreground">Variables de estilo</h3><Table columns={["Variable", "Valor", "Uso"]} rows={variables} /></section></div>
}
