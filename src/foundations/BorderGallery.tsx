export function BorderGallery() {
  return <section aria-label="Muestras de bordes" className="sb-unstyled flex flex-col gap-8 text-sm leading-5 text-foreground">
    <div className="grid gap-3">
      <h2 className="m-0 text-2xl leading-8 font-semibold">Bordes de superficie y controles</h2>
      <p className="m-0">El rol define el color del borde. El grosor, radio y estado pertenecen a cada componente.</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <figure className="m-0 grid gap-3 rounded-lg border border-border bg-card p-6 text-card-foreground"><div className="h-20 rounded-md border border-border" aria-hidden="true" /><figcaption><code className="text-xs">border-border · --border</code><p className="mb-0 mt-2">Separación de superficies y contornos neutros.</p></figcaption></figure>
        <figure className="m-0 grid gap-3 rounded-lg border border-border bg-card p-6 text-card-foreground"><div className="h-20 rounded-md border border-input" aria-hidden="true" /><figcaption><code className="text-xs">border-input · --input</code><p className="mb-0 mt-2">Contornos de controles que consumen el rol input.</p></figcaption></figure>
      </div>
    </div>
    <div className="flex flex-col gap-3">
      <h2 className="m-0 text-2xl leading-8 font-semibold">Bordes y separaciones interiores</h2>
      <p className="m-0 text-sm leading-5">Estos efectos delimitan contenido sin elevarlo ni ocupar espacio adicional en el layout.</p>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { name: "inset 0 1px 0 var(--border)", label: "Sheet · borde superior del footer", className: "shadow-[inset_0_1px_0_var(--border)]" },
          { name: "inset 0 -1px 0 var(--border)", label: "Sheet · borde inferior del encabezado y la banda de estado", className: "shadow-[inset_0_-1px_0_var(--border)]" },
          { name: "inset 0 0 0 1px var(--border)", label: "Badge · contorno interior neutro", className: "shadow-[inset_0_0_0_1px_var(--border)]" },
        ].map(sample => <figure key={sample.name} className="m-0 overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
          <div className="flex h-40 items-center justify-center bg-background p-6" aria-hidden="true"><div className={`h-20 w-full bg-card ${sample.className}`} /></div>
          <figcaption className="grid gap-2 border-t border-border p-4"><code className="break-words font-mono text-xs leading-4">{sample.name}</code><span>{sample.label}</span></figcaption>
        </figure>)}
      </div>
      <p className="m-0 text-sm leading-5">Badge conserva la misma geometría de contorno en sus estados; cambia el token de borde según la variante.</p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["primary-light-border", "--primary-light-border"],
          ["success-light-border", "--success-light-border"],
          ["warning-light-border", "--warning-light-border"],
          ["error-light-border", "--error-light-border"],
          ["destructive-light-border", "--destructive-light-border"],
          ["info-light-border", "--info-light-border"],
        ].map(([name, token]) => <figure key={token} className="m-0 grid gap-2 rounded-lg bg-card p-4" style={{ boxShadow: `inset 0 0 0 1px var(${token})` }}><figcaption className="break-words font-mono text-xs leading-4 text-card-foreground">{name}</figcaption></figure>)}
      </div>
    </div>
    <p className="m-0 text-xs leading-4">Muestras aisladas: no sustituyen la geometría del componente. Los anillos de foco son indicadores de interacción; deben conservarse aunque exista un borde.</p>
  </section>
}
