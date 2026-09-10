import { Blocks, BookOpen, Check, CheckCircle2, ChevronDown, Cloud, Palette } from 'lucide-react';

const releaseHighlights = [
  'Playground como instancia canónica de cada componente.',
  'Docs construida con las mismas composiciones compartidas.',
  'Componentes basados prioritariamente en shadcn/ui.',
  'Adaptaciones visuales provenientes de Figma.',
] as const;

const components = [
  'Accordion', 'Alert', 'Alert Dialog', 'Attachment', 'Avatar', 'Badge', 'Breadcrumb', 'Button',
  'Button Group', 'Calendar', 'Card', 'Carousel', 'Checkbox', 'Collapsible', 'Combobox',
  'Context Menu', 'Data Table', 'Date Picker', 'Drawer', 'Dropdown Menu', 'Empty', 'Field',
  'Hover Card', 'Input', 'Input OTP', 'Item', 'Kbd', 'Label', 'Menubar', 'Native Select',
  'Navigation Menu', 'Pagination', 'Popover', 'Progress', 'Radio Group', 'Resizable',
  'Scroll Area', 'Select', 'Separator', 'Sheet', 'Sidebar', 'Slider', 'Spinner', 'Switch',
  'Table', 'Tabs', 'Toast', 'Toggle', 'Toggle Group', 'Tooltip',
] as const;

const validationItems = [
  'TypeScript sin errores.',
  'ESLint sin errores ni advertencias.',
  '51 pruebas superadas en 50 archivos.',
  'Build de Storybook generado correctamente para Vercel.',
] as const;

const versioningRules = [
  {
    type: 'Patch',
    version: '1.0.x',
    description: 'Corrección compatible sin modificar la API pública.',
    example: 'Ajustar el contraste de Badge.',
  },
  {
    type: 'Minor',
    version: '1.x.0',
    description: 'Nueva capacidad compatible con implementaciones existentes.',
    example: 'Añadir una variante a Spinner.',
  },
  {
    type: 'Major',
    version: 'x.0.0',
    description: 'Cambio incompatible que requiere migración.',
    example: 'Renombrar una prop pública.',
  },
] as const;

function Metric({ icon: Icon, value, label }: { icon: typeof Blocks; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="grid gap-0.5">
        <strong className="text-sm leading-5 font-semibold text-card-foreground">{value}</strong>
        <span className="text-xs leading-4 text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

export function ReleasesHistory() {
  return (
    <div className="sb-unstyled not-prose mt-12 grid gap-16 text-foreground">
      <section className="grid gap-5">
        <header className="grid gap-1">
          <h2 className="m-0 text-xl leading-7 font-semibold">Lanzamientos</h2>
          <p className="m-0 text-sm leading-5 text-muted-foreground">Las versiones se muestran de la más reciente a la más antigua.</p>
        </header>

        <div className="relative ml-1 border-l border-border pl-6">
          <span className="absolute -left-1.5 top-7 size-3 rounded-full border-2 border-background bg-primary" aria-hidden="true" />

          <details open className="group/release overflow-hidden rounded-xl border border-border bg-card">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-5 md:px-6">
              <div className="grid gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0 text-lg leading-7 font-semibold text-card-foreground">Versión 1.0.0</h3>
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs leading-4 font-medium text-muted-foreground">Estable</span>
                  <span className="rounded-full bg-primary px-2.5 py-1 text-xs leading-4 font-medium text-primary-foreground">Actual</span>
                </div>
                <p className="m-0 text-sm leading-5 text-muted-foreground">Primera versión pública de la documentación del Design System GRM.</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <time dateTime="2026-09-08" className="hidden text-sm leading-5 text-muted-foreground sm:block">8 sep 2026</time>
                <ChevronDown className="mt-0.5 size-4 text-muted-foreground transition-transform group-open/release:rotate-180" aria-hidden="true" />
              </div>
            </summary>

            <div className="border-t border-border">
              <div className="grid gap-7 px-5 py-6 md:px-6">
                <time dateTime="2026-09-08" className="text-xs leading-4 text-muted-foreground sm:hidden">8 sep 2026</time>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Metric icon={Blocks} value="50" label="Componentes" />
                  <Metric icon={Palette} value="4" label="Marcas" />
                  <Metric icon={Cloud} value="Vercel" label="Distribución" />
                </div>

                <div className="grid gap-3">
                  <h4 className="m-0 text-sm leading-5 font-semibold text-card-foreground">Incluye</h4>
                  <ul className="m-0 grid list-none gap-2 p-0 sm:grid-cols-2">
                    {releaseHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-5 text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-border">
                <details className="group border-b border-border last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm leading-5 font-medium text-card-foreground md:px-6">
                    <span>Componentes incluidos</span>
                    <span className="text-xs font-normal text-muted-foreground">{components.length} componentes</span>
                  </summary>
                  <div className="border-t border-border bg-muted/30 px-5 py-5 md:px-6">
                    <div className="flex flex-wrap gap-2">
                      {components.map((component) => (
                        <span key={component} className="rounded-md border border-border bg-card px-2.5 py-1.5 text-xs leading-4 text-muted-foreground">{component}</span>
                      ))}
                    </div>
                  </div>
                </details>

                <details className="group border-b border-border last:border-b-0">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm leading-5 font-medium text-card-foreground md:px-6">
                    <span>Validación de cierre</span>
                    <CheckCircle2 className="size-4 text-muted-foreground" aria-hidden="true" />
                  </summary>
                  <ul className="m-0 grid list-none gap-2 border-t border-border bg-muted/30 px-5 py-5 md:px-6">
                    {validationItems.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-5 text-muted-foreground">
                        <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          </details>
        </div>
      </section>

      <section className="grid gap-5">
        <header className="grid gap-1">
          <h2 className="m-0 text-xl leading-7 font-semibold">Criterio de versionado</h2>
          <p className="m-0 text-sm leading-5 text-muted-foreground">Cómo se clasificarán las próximas entradas de este historial.</p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-3xl table-fixed border-collapse">
            <thead>
              <tr className="bg-muted">
                {['Cambio', 'Versión', 'Criterio', 'Ejemplo'].map((column) => (
                  <th key={column} className="border-0 border-b border-border px-4 py-(--docs-table-header-padding-block) text-left align-middle text-(length:--docs-table-header-font-size) leading-(--docs-table-line-height) font-semibold tracking-(--docs-table-letter-spacing) text-muted-foreground uppercase">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {versioningRules.map(({ type, version, description, example }) => (
                <tr key={type} className="even:bg-muted/30 last:[&>td]:border-b-0">
                  <td className="border-0 border-b border-border px-4 py-3 text-sm leading-5 font-medium text-card-foreground">{type}</td>
                  <td className="border-0 border-b border-border px-4 py-3"><code className="text-xs leading-4 text-muted-foreground">{version}</code></td>
                  <td className="border-0 border-b border-border px-4 py-3 text-sm leading-5 text-muted-foreground">{description}</td>
                  <td className="border-0 border-b border-border px-4 py-3 text-sm leading-5 text-muted-foreground">{example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-start gap-3 rounded-xl border border-border bg-card px-5 py-4">
          <BookOpen className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <p className="m-0 text-sm leading-5 text-muted-foreground">El detalle técnico completo de cada versión permanece en <code className="text-xs text-foreground">CHANGELOG.md</code>.</p>
        </div>
      </section>
    </div>
  );
}
