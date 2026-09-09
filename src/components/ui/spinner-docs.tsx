"use client"

import { SpinnerExample } from "./spinner-example"
import { DocsCard, DocsTable } from "./selectable-docs-shared"

const sizes = [12, 16, 24, 32] as const

export function SpinnerSizeOverview() {
  return <div className="not-prose grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{sizes.map(size => <DocsCard key={size} title={`${size} px`} value={`size=${size}`} previewClassName="min-h-36 p-8"><SpinnerExample size={size} /></DocsCard>)}</div>
}

const specifications = sizes.map(size => [String(size), `${size}px`, `${size}px`, "currentColor", "800ms", "linear · infinite"] as const)

export function SpinnerSpecifications() {
  return <DocsTable minWidthClassName="min-w-[680px]" columns={["Size", "Ancho", "Alto", "Color", "Duración", "Easing · repetición"]} rows={specifications} />
}
