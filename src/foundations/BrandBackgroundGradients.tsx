const brands = [
  ['grm-global', 'GRM Global'],
  ['reina-madre', 'Reina Madre'],
  ['maria-linda', 'María Linda'],
  ['piel-sana', 'Piel Sana'],
] as const;

const gradient = 'linear-gradient(180deg in srgb, var(--background-brand-gradient-light-1) 0%, var(--background-brand-gradient-light-2) 100%)';
const css = `.brand-background {
  position: relative;
  overflow: hidden;
  background: var(--background);
  isolation: isolate;
}
.brand-background::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background-image: ${gradient};
}
/* Aplica data-theme al contenedor y carga los tokens CSS del DS. */`;

export function brandBackgroundCss(brand: (typeof brands)[number][0]) {
  return css.replaceAll('.brand-background', `[data-theme="${brand}"].brand-background`);
}

export function BrandBackgroundGradients({ brand }: { brand: (typeof brands)[number][0] }) {
  const label = brands.find(([value]) => value === brand)![1];
  return (
    <section aria-label={`Background · Gradiente de ${label}`} className="grid gap-6">
      <header className="grid gap-2">
        <h2 className="m-0 text-2xl font-semibold">Background · Gradiente de {label}</h2>
        <p className="m-0 text-sm text-muted-foreground">Esta muestra corresponde a {label} y cambia con el selector de marca de Storybook. El contenedor usa <code>--background</code> y la capa superior reproduce el estilo de Figma <code>background/brand-gradient/light</code>.</p>
        <p className="m-0 text-sm text-muted-foreground">Dirección vertical, de arriba hacia abajo: color de marca al 0 % y final transparente al 100 %. La transparencia deja ver el background inferior.</p>
        <a className="text-sm text-foreground underline underline-offset-4" href="https://www.figma.com/design/X33xAJBT7ty8FWYDFVvo3m?node-id=5343-2457" target="_blank" rel="noreferrer">Ver sección en Figma ↗</a>
      </header>
      <div className="grid gap-6">
        {brands.filter(([value]) => value === brand).map(([brand, label]) => (
          <figure key={brand} data-theme={brand} className="m-0 grid gap-3 text-foreground">
            <figcaption className="text-lg font-semibold">{label}</figcaption>
            <div role="img" aria-label={`Gradiente de fondo de ${label}`} className="relative h-60 overflow-hidden rounded-lg bg-background">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ backgroundImage: gradient }} />
            </div>
            <p className="m-0 text-xs text-muted-foreground"><code>--background</code> + <code>--background-brand-gradient-light-1</code> → <code>--background-brand-gradient-light-2</code></p>
          </figure>
        ))}
      </div>
    </section>
  );
}
