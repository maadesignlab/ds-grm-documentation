const shadows = [
  { name: "shadow-xs", label: "Button, Table, Toggle outline y trigger de Sidebar", className: "shadow-xs" },
  { name: "shadow-sm", label: "Tabs activo, Sidebar y Stepper", className: "shadow-sm" },
  { name: "shadow", label: "Navigation Menu", className: "shadow" },
  { name: "shadow-md", label: "Popover y menú desplegable", className: "shadow-md" },
  { name: "shadow-lg", label: "Sheet y submenú desplegable", className: "shadow-lg" },
  { name: "shadow-xl", label: "Drawer", className: "shadow-xl" },
] as const

export function ShadowGallery() {
  return <section aria-label="Muestras de sombras" className="sb-unstyled flex flex-col gap-8 text-sm leading-5 text-foreground">
    <div className="flex flex-col gap-3">
      <h2 className="m-0 text-2xl leading-8 font-semibold">Elevación</h2>
      <p className="m-0 text-sm leading-5">Compara las utilidades de elevación presentes en los componentes sobre una misma superficie. La sombra sin sufijo se conserva con el nombre que usa Navigation Menu.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {shadows.map(shadow => <figure key={shadow.name} className="m-0 min-w-0 rounded-lg border border-border">
          <div className="flex h-48 items-center justify-center rounded-t-lg bg-background p-8" aria-hidden="true">
            <div className={`h-24 w-full rounded-lg bg-card ${shadow.className}`} />
          </div>
          <figcaption className="flex flex-col gap-2 border-t border-border bg-card p-4 text-card-foreground">
            <code className="font-mono text-xs leading-4">{shadow.name}</code>
            <span className="text-sm leading-5">{shadow.label}</span>
          </figcaption>
        </figure>)}
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="m-0 text-2xl leading-8 font-semibold">Sombra de Toast</h2>
      <p className="m-0 text-sm leading-5">Toast consume su propio token. La muestra utiliza la variable real, sin sustituirla por un nivel de la escala.</p>
      <figure className="m-0 overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
        <div className="flex h-48 items-center justify-center bg-background p-8" aria-hidden="true"><div className="h-24 w-full max-w-sm rounded-2xl bg-card shadow-(--toast-shadow)" /></div>
        <figcaption className="grid gap-2 border-t border-border p-4"><code className="break-words font-mono text-xs leading-4">--toast-shadow</code><span>Toast · 0 0.25rem 0.75rem rgb(0 0 0 / 10%)</span></figcaption>
      </figure>
    </div>
    <p className="m-0 text-xs leading-4">Muestras aisladas del efecto, no réplicas de componentes. shadow-none elimina la sombra en composiciones que lo requieren. Los anillos de foco (ring) son indicadores de interacción y no niveles de elevación.</p>
  </section>
}
