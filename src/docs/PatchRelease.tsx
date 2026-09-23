import { ChevronDown } from 'lucide-react';
import { formatReleaseDate } from './release-date';
import manifest from '../../design-system/release-manifest.json';

export function PatchRelease() {
  const components = manifest.components.filter(component => component.release === '1.1.1');
  return <div className="relative ml-1 border-l border-border pl-6">
    <span className="absolute -left-1.5 top-7 size-3 rounded-full border-2 border-background bg-primary" aria-hidden="true" />
    <details open className="group/release overflow-hidden rounded-xl border border-border bg-card">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 md:px-6">
        <div className="grid gap-1"><div className="flex flex-wrap items-center gap-2">
          <h3 className="m-0 text-lg font-semibold">Versión 1.1.1</h3>
          <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium">Estable</span>
          <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground">Última publicada</span>
        </div><p className="m-0 text-sm text-muted-foreground">Corrige el fondo de Sheet y Drawer según Figma.</p></div>
        <div className="flex shrink-0 items-center gap-3"><time dateTime={manifest.publishedAt} className="hidden text-sm leading-5 text-muted-foreground sm:block">{formatReleaseDate(manifest.publishedAt)}</time><ChevronDown className="size-4 transition-transform group-open/release:rotate-180" aria-hidden="true" /></div>
      </summary>
      <div className="grid gap-5 border-t border-border px-5 py-6 md:px-6">
        <time dateTime={manifest.publishedAt} className="text-xs text-muted-foreground sm:hidden">{formatReleaseDate(manifest.publishedAt)}</time>
        <div className="grid grid-cols-3 gap-5">{[['2', 'Componentes'], ['4', 'Marcas'], ['Vercel', 'Distribución']].map(([value, label]) => <div key={label}><strong className="block text-sm">{value}</strong><span className="text-xs text-muted-foreground">{label}</span></div>)}</div>
        <div><h4 className="m-0 text-sm font-semibold">Incluye</h4><p className="mb-0 text-sm">Fondo <code>popover → sheet-drawer</code> en ambos paneles y en la extensión de Drawer durante el arrastre. Tokens, paletas, texto y variantes conservados.</p></div>
        <section aria-label="Componentes corregidos en 1.1.1"><h4 className="mb-3 text-sm font-semibold">Componentes corregidos</h4><div className="grid gap-3">{components.map(component => <details key={component.id} className="rounded-lg border border-border p-4"><summary className="cursor-pointer text-sm font-medium">{component.name} · v{component.previousVersion} → v{component.version}</summary><ul className="text-sm">{component.updates.map(update => <li key={update}>{update}</li>)}</ul><p className="text-sm">Token de fondo: <code>--sheet-drawer</code>. Sin variantes nuevas.</p></details>)}</div></section>
        <details className="border-t border-border pt-4"><summary className="cursor-pointer text-sm font-medium">Validación de cierre</summary><p className="text-sm">Conciliado con las 4 variantes de Sheet y las 3 de Drawer en Figma. Fondo blanco en las cuatro marcas; pruebas de interacción y accesibilidad verificadas. Las 769 variables conservan sus valores.</p><p className="text-sm">Se mantienen las 28 excepciones de marca de v1.1.0 en primary y brand-gradient de Reina Madre y Piel Sana. No se declara conformidad WCAG completa.</p></details>
        <p className="m-0 text-xs text-muted-foreground">Trayectoria global: 1.1.0 → 1.1.1. Sheet y Drawer: 1.0.1 → 1.0.2.</p>
      </div>
    </details>
  </div>;
}
