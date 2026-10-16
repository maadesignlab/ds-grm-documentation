const tokens = [
  ["0", 0], ["0-5", 0.5], ["1", 1], ["1-5", 1.5], ["2", 2], ["2-5", 2.5],
] as const
const utilities = [3, 4, 5, 6, 8] as const

const commonUses: Record<number, string> = {
  0: "Elementos unidos, sin separación adicional. Ejemplo: título y descripción en Item compacto.",
  0.5: "Separación mínima entre textos estrechamente relacionados. Ejemplos: encabezados de Popover y Sheet; contenido de Field.",
  1: "Separación corta entre icono y texto o entre título y descripción. Ejemplos: Badge, CardHeader e ItemContent.",
  1.5: "Separación vertical entre título y descripción en el encabezado de Alert Dialog.",
  2: "Agrupar acciones o contenido compacto. Ejemplos: acciones de Item, Item de tamaño xs y botones del footer de Dialog.",
  2.5: "Espaciado interno compacto. Ejemplos: padding y gap de Popover, separación de acciones en los footers de Sheet y Card.",
  3: "Padding horizontal de controles y separación entre icono y texto. Ejemplos: Button e Item; grupos de selección en Field.",
  4: "Padding de paneles y separación entre bloques relacionados. Ejemplos: Dialog, encabezado y footer de Sheet, grupos de Item.",
  5: "Separación entre campos de formulario. Ejemplo: FieldGroup; también disponible como padding de Card.",
  6: "Dar más aire al contenido de una tarjeta. Disponible como padding de Card; útil para bloques de información con menor densidad.",
  8: "Padding amplio de Card. Recomendado para composiciones espaciosas; evita aplicarlo por defecto en controles compactos.",
}

function SpacingSample({ label, value, units }: { label: string; value: string; units: number }) {
  return <div className="grid gap-4 rounded-lg border border-border bg-card p-4 text-card-foreground sm:grid-cols-3">
    <div className="min-w-0 space-y-1"><code className="break-words font-mono text-xs leading-4">{label}</code><div className="m-0 text-sm leading-5">{units / 4} rem · {units * 4} px*</div></div>
    <div className="space-y-2"><span className="m-0 text-xs leading-4">Medida real</span><div className="flex h-8 items-center"><div className="h-3 bg-foreground" style={{ width: value }} />{units === 0 && <span className="m-0 text-xs leading-4">Sin espacio</span>}</div></div>
    <div className="space-y-2"><span className="m-0 text-xs leading-4">Separación entre elementos</span><div className="flex items-center" style={{ gap: value }} role="img" aria-label={`Separación ${units * 4} píxeles con raíz de 16 píxeles`}><span className="size-8 rounded border border-border bg-muted" /><span className="size-8 rounded border border-border bg-muted" /></div></div>
    <p className="m-0 border-t border-border pt-3 text-sm leading-5 sm:col-span-3"><strong className="font-medium">Uso común: </strong>{commonUses[units]}</p>
  </div>
}

export function SpacingGallery() {
  return <section className="sb-unstyled flex flex-col gap-8 text-sm leading-5 text-foreground" aria-label="Muestras de espaciado">
    <div className="flex flex-col gap-3"><h2 className="m-0 text-2xl leading-8 font-semibold">Variables del DS</h2><p className="m-0 text-sm leading-5">Espacios finos definidos en tokens.css. Las muestras consumen directamente cada variable.</p>
      {tokens.map(([name, units]) => <SpacingSample key={name} label={`--spacing-${name}`} value={`var(--spacing-${name})`} units={units} />)}
    </div>
    <div className="flex flex-col gap-3"><h2 className="m-0 text-2xl leading-8 font-semibold">Espacios de composición</h2><p className="m-0 text-sm leading-5">Utilidades habituales de padding y gap, calculadas desde la base de Tailwind.</p>
      {utilities.map(units => <SpacingSample key={units} label={`p-${units} / gap-${units}`} value={`calc(var(--spacing) * ${units})`} units={units} />)}
    </div>
    <p className="m-0 text-xs leading-4">* Equivalencia con raíz de 16 px. Las muestras se dibujan a escala real, sin ampliar las medidas.</p>
  </section>
}
