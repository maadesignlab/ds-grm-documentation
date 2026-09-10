import { ArrowRight, Blocks, BookOpen, Check, GitBranch, Palette } from 'lucide-react';

const workflow = [
  {
    title: 'Figma',
    description: 'Fuente de verdad para estructura, variantes, tipografía y tokens.',
    icon: Palette,
  },
  {
    title: 'shadcn/ui',
    description: 'Base abierta y editable para la API y composición de componentes.',
    icon: Blocks,
  },
  {
    title: 'Storybook',
    description: 'Documentación, validación visual y playground de cada componente.',
    icon: BookOpen,
  },
] as const;

const sections = [
  {
    title: 'Foundations',
    description: 'Tokens, tipografía e iconografía compartidos por las cuatro marcas.',
    meta: 'Base visual',
  },
  {
    title: 'Components',
    description: 'Implementaciones React documentadas con correspondencia 1:1.',
    meta: 'API y variantes',
  },
  {
    title: 'Releases',
    description: 'Cambios del sistema y de componentes versionados con SemVer.',
    meta: 'Historial',
  },
] as const;

const synchronizationSteps = [
  'El cambio visual se define y aprueba primero en Figma.',
  'Se actualizan tokens o componentes conservando la API de shadcn/ui.',
  'Docs y Playground se validan con correspondencia visual y funcional 1:1.',
  'Se ejecutan pruebas, accesibilidad y compilación antes de crear el changeset.',
] as const;

export function IntroductionOverview() {
  return (
    <div className="sb-unstyled not-prose mt-12 grid gap-16 text-foreground">
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="grid gap-6 px-6 py-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:px-8 md:py-10">
          <div className="grid max-w-3xl gap-3">
            <span className="w-fit rounded-full border border-border bg-muted px-3 py-1 text-xs leading-4 font-medium text-muted-foreground">
              Design System · v1
            </span>
            <h2 className="m-0 text-2xl leading-8 font-semibold tracking-tight text-card-foreground">
              Una base compartida para las marcas de Grupo Reina Madre
            </h2>
            <p className="m-0 text-sm leading-6 text-muted-foreground">
              Figma define el lenguaje visual, shadcn/ui aporta la estructura de código y Storybook mantiene cada decisión visible, comprobable y reutilizable.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 md:max-w-52 md:justify-end">
            {['GRM Global', 'Reina Madre', 'María Linda', 'Piel Sana'].map((brand) => (
              <span key={brand} className="rounded-md bg-muted px-2.5 py-1.5 text-xs leading-4 text-muted-foreground">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5">
        <header className="grid gap-1">
          <h2 className="m-0 text-xl leading-7 font-semibold">Flujo del sistema</h2>
          <p className="m-0 text-sm leading-5 text-muted-foreground">Una misma decisión viaja desde diseño hasta su documentación pública.</p>
        </header>

        <div className="grid overflow-hidden rounded-xl border border-border bg-card md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-stretch">
          {workflow.map(({ title, description, icon: Icon }, index) => (
            <div key={title} className="contents">
              <article className="grid content-start gap-4 p-5 md:p-6">
                <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div className="grid gap-1.5">
                  <h3 className="m-0 text-sm leading-5 font-semibold text-card-foreground">{title}</h3>
                  <p className="m-0 text-sm leading-5 text-muted-foreground">{description}</p>
                </div>
              </article>
              {index < workflow.length - 1 ? (
                <div className="flex items-center justify-center border-y border-border py-2 text-muted-foreground md:border-x md:border-y-0 md:px-2 md:py-0">
                  <ArrowRight className="size-4 rotate-90 md:rotate-0" aria-hidden="true" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-5">
        <header className="grid gap-1">
          <h2 className="m-0 text-xl leading-7 font-semibold">Organización</h2>
          <p className="m-0 text-sm leading-5 text-muted-foreground">La documentación se divide según el rol de cada contenido.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {sections.map(({ title, description, meta }) => (
            <article key={title} className="grid min-h-40 content-between gap-6 rounded-xl border border-border bg-card p-5">
              <div className="grid gap-2">
                <h3 className="m-0 text-sm leading-5 font-semibold text-card-foreground">{title}</h3>
                <p className="m-0 text-sm leading-5 text-muted-foreground">{description}</p>
              </div>
              <span className="text-xs leading-4 font-medium text-muted-foreground">{meta}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5">
        <header className="grid gap-1">
          <div className="flex items-center gap-2">
            <GitBranch className="size-4 text-muted-foreground" aria-hidden="true" />
            <h2 className="m-0 text-xl leading-7 font-semibold">Contrato de sincronización</h2>
          </div>
          <p className="m-0 text-sm leading-5 text-muted-foreground">Criterios que debe cumplir cada cambio antes de publicarse.</p>
        </header>

        <ol className="m-0 overflow-hidden rounded-xl border border-border bg-card p-0">
          {synchronizationSteps.map((step, index) => (
            <li key={step} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 border-b border-border px-5 py-4 last:border-b-0">
              <span className="flex size-7 items-center justify-center rounded-full bg-muted text-xs leading-4 font-semibold text-muted-foreground">
                {index + 1}
              </span>
              <div className="flex min-w-0 items-center justify-between gap-4">
                <span className="text-sm leading-5 text-card-foreground">{step}</span>
                <Check className="hidden size-4 shrink-0 text-muted-foreground sm:block" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
