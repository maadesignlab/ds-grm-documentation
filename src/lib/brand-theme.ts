export const grmBrands = [
  "grm-global",
  "reina-madre",
  "maria-linda",
  "piel-sana",
] as const

export type GrmBrand = (typeof grmBrands)[number]

export const grmBrandLabels: Record<GrmBrand, string> = {
  "grm-global": "GRM Global",
  "reina-madre": "Reina Madre",
  "maria-linda": "María Linda",
  "piel-sana": "Piel Sana",
}

export function isGrmBrand(value: unknown): value is GrmBrand {
  return typeof value === "string" && grmBrands.includes(value as GrmBrand)
}

export function applyGrmBrand(
  brand: GrmBrand,
  target: HTMLElement = document.documentElement
) {
  target.dataset.theme = brand
}
