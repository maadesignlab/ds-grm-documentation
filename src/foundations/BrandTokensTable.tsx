import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

import { Button } from '../components/ui/button';
import { comparableColor } from './color-comparison';
import { CssExport, cssBlock } from './CssExport';
import { BrandBackgroundGradients, brandBackgroundCss } from './BrandBackgroundGradients';

import { cn } from '@/lib/utils';

import { extraColorTokenValues } from './extra-color-token-values';
import { semanticBrandTokenValues } from './semantic-brand-token-values';
import tokenChanges from './token-changes.json';

type BrandValue = keyof typeof semanticBrandTokenValues;
type GlobalsUpdatedPayload = { globals?: { brandTheme?: unknown } };
type TokenEntry = readonly [name: string, value: string];
type SemanticGroup = { title: string; prefixes: readonly string[] };

const BRAND_LABELS: Record<BrandValue, string> = {
  'grm-global': 'GRM Global',
  'reina-madre': 'Reina Madre',
  'maria-linda': 'María Linda',
  'piel-sana': 'Piel Sana',
};

const COLOR_VALUE_RE = /^(#|rgb\(|rgba\(|hsl\(|hsla\(|oklch\(|oklab\(|lab\(|hwb\(|color\(|transparent$|currentColor$)/i;

const SEMANTIC_GROUPS: readonly SemanticGroup[] = [
  { title: 'Background', prefixes: ['--background'] },
  { title: 'Foreground', prefixes: ['--foreground'] },
  { title: 'Card', prefixes: ['--card'] },
  { title: 'Popover', prefixes: ['--popover'] },
  { title: 'Primary', prefixes: ['--primary'] },
  { title: 'Secondary', prefixes: ['--secondary'] },
  { title: 'Muted', prefixes: ['--muted'] },
  { title: 'Accent', prefixes: ['--accent'] },
  { title: 'Success', prefixes: ['--success'] },
  { title: 'Warning', prefixes: ['--warning'] },
  { title: 'Error', prefixes: ['--error'] },
  { title: 'Destructive', prefixes: ['--destructive'] },
  { title: 'Info', prefixes: ['--info'] },
  { title: 'Ring', prefixes: ['--ring'] },
  { title: 'Input', prefixes: ['--input'] },
  { title: 'Chart', prefixes: ['--chart'] },
  { title: 'Sidebar', prefixes: ['--sidebar'] },
  { title: 'Sheet / Drawer', prefixes: ['--sheet-drawer'] },
  { title: 'Typography', prefixes: ['--brand-font', '--font-weight'] },
  { title: 'Table', prefixes: ['--table'] },
  { title: 'Button', prefixes: ['--button'] },
] as const;

const APPOINTMENT_EXTRA_COLOR_FAMILIES = {
  scheduled: 'Slate Gray',
  confirmed: 'Clear Blue',
  reception: 'Golden Yellow',
  vitals: 'Berry Pink',
  consultation: 'Amber Orange',
  completed: 'Nature Green',
  'no-show': 'Warm Red',
  cancelled: 'Soft Coral',
  rescheduled: 'Lavender Purple',
} as const;

const APPOINTMENT_LEVELS = {
  light: '50',
  'light-border': '200',
  default: '500',
  foreground: '700',
} as const;

const extraColorEntries = Object.values(extraColorTokenValues).flat() as TokenEntry[];

function getAppointmentReference(name: string): TokenEntry | undefined {
  for (const [status, family] of Object.entries(APPOINTMENT_EXTRA_COLOR_FAMILIES)) {
    const prefix = `--appointment-${status}-`;
    if (!name.startsWith(prefix)) continue;
    const level = APPOINTMENT_LEVELS[name.slice(prefix.length) as keyof typeof APPOINTMENT_LEVELS];
    if (!level) return undefined;
    const familyName = family.replaceAll(' ', '').replace(/^./, (letter) => letter.toLowerCase());
    return extraColorEntries.find(([extraName]) => extraName === `${familyName}/${level}`);
  }
  return undefined;
}

const getActiveBrand = (): BrandValue => {
  if (typeof document === 'undefined') return 'grm-global';
  const theme = document.documentElement.getAttribute('data-theme') as BrandValue | null;
  return theme && theme in BRAND_LABELS ? theme : 'grm-global';
};

const isBrandValue = (value: unknown): value is BrandValue =>
  typeof value === 'string' && value in BRAND_LABELS;

function CollectionSection({ title, description, modes, count, children }: { title: string; description: string; modes: string; count: string; children: ReactNode }) {
  return (
    <section className="grid gap-8">
      <header className="grid gap-4 border-b border-border pb-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="grid gap-2">
          <h2 className="m-0 text-2xl leading-8 font-semibold text-foreground">{title}</h2>
          <p className="m-0 max-w-3xl text-(length:--docs-description-font-size) leading-5 text-muted-foreground">{description}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground sm:justify-end">
          <span className="rounded-full border border-border bg-card px-3 py-1">{modes}</span>
          <span className="rounded-full border border-border bg-card px-3 py-1">{count}</span>
        </div>
      </header>
      {children}
    </section>
  );
}

type TokenChange = { status: string; previousName: string | null; previousValue: string | null; currentValue: string; reasons: string[] };

function TokenChangeNote({ change }: { change?: TokenChange }) {
  if (!change || change.status === 'unchanged') return null;
  const before = comparableColor(change.previousValue);
  const after = comparableColor(change.currentValue);
  const sameColor = before && after && before.hex === after.hex && before.opacity === after.opacity;
  const technical = change.previousValue === change.currentValue || sameColor;
  if (change.status === 'updated' && technical) return null;
  const explanation = before && after
    ? sameColor ? 'Mismo color y opacidad al comparar en RGB de 8 bits. Cambió su definición técnica.'
      : before.hex === after.hex ? `Cambió la opacidad: ${before.opacity}% → ${after.opacity}%.`
      : before.opacity === after.opacity ? 'Cambió el color; la opacidad se mantiene.' : 'Cambiaron el color y la opacidad.'
    : technical ? 'El valor se mantiene. Cambió su nombre o referencia.' : 'Cambió el valor del token.';
  return <div className="mt-2 grid gap-2 text-xs text-foreground">
    <span className="w-fit rounded border border-border bg-muted px-2 py-1 font-medium">{change.status === 'new' ? 'Nuevo' : 'Actualizado'} · v{tokenChanges.release}</span>
    {change.status === 'new' ? <p className="m-0">No existía en el catálogo de código de v{tokenChanges.baselineRelease}.</p> : <details>
      <summary className="cursor-pointer underline underline-offset-2">Ver cambio</summary>
      <div className="mt-3 grid gap-3 rounded-md border border-border bg-card p-3">
        <p className="m-0 font-medium">{technical ? 'Cambio técnico' : 'Cambio de valor'}: {explanation}</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { title: `Antes (${tokenChanges.baselineRelease})`, subtitle: 'Versión publicada', value: change.previousValue, color: before, imageLabel: 'Color anterior' },
            { title: `Ahora (${tokenChanges.release})`, subtitle: 'Versión actual', value: change.currentValue, color: after, imageLabel: 'Color actual' },
          ].map(item => <div key={item.title} className="min-w-0 rounded-md border border-border p-3">
            <p className="m-0 font-semibold">{item.title}</p><p className="mb-3 mt-1 text-muted-foreground">{item.subtitle}</p>
            {item.color && <div className="overflow-hidden rounded border border-border" style={{ background: 'repeating-conic-gradient(var(--muted) 0% 25%, var(--card) 0% 50%) 0 / 16px 16px' }}>
              <span aria-label={`${item.imageLabel}: ${item.value}`} role="img" className="block h-16 w-full" style={{ background: item.value ?? undefined }} />
            </div>}
            <code className="mt-2 block [overflow-wrap:anywhere]">{item.color?.label ?? item.value}</code>
          </div>)}
        </div>
        {before && after && <p className="m-0 text-muted-foreground">Ambas muestras usan el mismo fondo. La cuadrícula permite ver la transparencia. Los valores se presentan en HEX y opacidad para compararlos en el mismo formato.</p>}
        <details><summary className="cursor-pointer underline underline-offset-2">Detalles técnicos</summary>
          <div className="mt-2 grid gap-2">
            <span>CSS anterior: <code className="[overflow-wrap:anywhere]">{change.previousValue}</code></span>
            <span>CSS actual: <code className="[overflow-wrap:anywhere]">{change.currentValue}</code></span>
            {change.reasons.filter(reason => !reason.startsWith('Valor exportado actualizado')).map(reason => <span key={reason}>{reason}</span>)}
          </div>
        </details>
      </div>
    </details>}
  </div>;
}

function TokenTable({ title, entries, changes }: { title: string; entries: readonly TokenEntry[]; changes?: Record<string, TokenChange> }) {
  return (
    <article className="mb-6 inline-block w-full break-inside-avoid overflow-hidden rounded-lg border border-border bg-card align-top">
      <header className="flex min-h-11 items-center justify-between gap-3 border-b border-border bg-muted px-4 py-2.5">
        <h3 className="m-0 text-sm leading-5 font-medium text-card-foreground">{title}</h3>
        <span className="shrink-0 text-xs text-muted-foreground">{entries.length}</span>
      </header>
      {entries.map(([name, value], index) => {
        const isColor = COLOR_VALUE_RE.test(value);
        return (
          <div key={name} className={cn('grid min-h-13 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-4 px-4 py-2.5 text-xs leading-(--docs-table-line-height)', index < entries.length - 1 && 'border-b border-border')}>
            <div><code className="[overflow-wrap:anywhere] text-xs leading-4 text-foreground">{name}</code></div>
            <div className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5">
              {isColor ? <span aria-hidden="true" className="size-7 rounded-md border border-border" style={{ background: value }} /> : null}
              <code className={cn('[overflow-wrap:anywhere] text-xs leading-4 text-muted-foreground', !isColor && 'col-span-2')}>{value}</code>
            </div>
            {changes?.[name] && <div className="col-span-2"><TokenChangeNote change={changes[name]} /></div>}
          </div>
        );
      })}
    </article>
  );
}

function TokenColumns({ children }: { children: ReactNode }) {
  return <div className="columns-1 gap-6 lg:columns-2">{children}</div>;
}

function AppointmentTable({ entries, changes }: { entries: readonly TokenEntry[]; changes: Record<string, TokenChange> }) {
  return (
    <div className="grid gap-3">
      <div>
        <h3 className="m-0 text-sm leading-5 font-medium text-foreground">Appointment</h3>
        <p className="mb-0 mt-1 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">Cada estado semántico referencia una familia de Extra Colors.</p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full min-w-[760px] table-fixed border-collapse">
          <thead>
            <tr className="bg-muted">
              {['Semantic Brand', 'Extra Colors', 'Valor compartido'].map((column) => (
                <th key={column} className="border-0 border-b border-border px-4 py-(--docs-table-header-padding-block) text-left align-middle text-(length:--docs-table-header-font-size) leading-(--docs-table-line-height) font-semibold tracking-(--docs-table-letter-spacing) text-muted-foreground uppercase">{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {entries.map(([name, value]) => {
              const reference = getAppointmentReference(name);
              return (
                <tr key={name} className="even:bg-muted/30 last:[&>td]:border-b-0">
                  <td className="h-13 border-0 border-b border-border px-4 py-2.5 align-middle text-xs"><code className="[overflow-wrap:anywhere] text-xs leading-4 text-foreground">{name}</code><TokenChangeNote change={changes[name]} /></td>
                  <td className="h-13 border-0 border-b border-border px-4 py-2.5 align-middle text-xs"><code className="text-xs leading-4 text-foreground">{reference?.[0] ?? '—'}</code></td>
                  <td className="h-13 border-0 border-b border-border px-4 py-2.5 align-middle text-xs"><div className="flex items-center gap-2.5"><span aria-hidden="true" className="size-7 shrink-0 rounded-md border border-border" style={{ background: value }} /><code className="text-xs leading-4 text-muted-foreground">{value}</code></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BrandTokensTable() {
  const [activeBrand, setActiveBrand] = useState<BrandValue>(getActiveBrand);
  const [onlyUpdated, setOnlyUpdated] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const channel = addons.getChannel();
    let frame = 0;
    const updateTheme = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setActiveBrand(getActiveBrand()));
    };
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    const handleGlobalsUpdated = ({ globals }: GlobalsUpdatedPayload) => {
      const selectedBrand = globals?.brandTheme;
      if (!isBrandValue(selectedBrand)) return;
      root.setAttribute('data-theme', selectedBrand);
      updateTheme();
    };
    channel.on(GLOBALS_UPDATED, handleGlobalsUpdated);
    updateTheme();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      channel.off(GLOBALS_UPDATED, handleGlobalsUpdated);
    };
  }, []);

  const activeBrandLabel = BRAND_LABELS[activeBrand];
  const semanticEntries = useMemo(
    () => Object.entries(semanticBrandTokenValues[activeBrand]) as TokenEntry[],
    [activeBrand],
  );

  const changes: Record<string, TokenChange> = tokenChanges.tokens[activeBrand];
  const newCount = Object.values(changes).filter(change => change.status === 'new').length;
  const updatedCount = Object.values(changes).filter(change => change.status === 'updated').length;
  const semanticCount = semanticEntries.length;
  const visibleEntries = onlyUpdated ? semanticEntries.filter(([name]) => changes[name]?.status === 'updated') : semanticEntries;
  const appointmentEntries = visibleEntries.filter(([name]) => name.startsWith('--appointment'));

  const completeCss = [
    `/* Tokens completos · ${activeBrandLabel}. Aplica data-theme="${activeBrand}" al contenedor. */`,
    '/* Extra Colors · compartidos entre marcas */',
    cssBlock(':root', extraColorEntries.map(([name, value]) => [`--${name.replaceAll('/', '-')}`, value] as const)),
    '/* Semantic Brand · todas las secciones, incluida tipografía y paradas de gradiente */',
    cssBlock(`[data-theme="${activeBrand}"]`, semanticEntries),
    '/* Background · usa la clase brand-background en el contenedor con data-theme */',
    brandBackgroundCss(activeBrand),
  ].join('\n\n');

  return (
    <div className="sb-unstyled not-prose mt-12 grid gap-20 text-foreground">
      <CssExport key={activeBrand} filename={`grm-tokens-${activeBrand}.css`} description={`CSS completo de ${activeBrandLabel}: todas las secciones de Semantic Brand, Extra Colors y composición del gradiente de fondo. El filtro visual no limita la exportación. Las fuentes deben cargarse en tu proyecto.`} css={completeCss} />
      <CollectionSection
        title="Semantic Brand"
        description={`Tokens semánticos consumidos por los componentes. Los valores visibles corresponden a ${activeBrandLabel} y cambian desde el selector global de Storybook.`}
        modes={activeBrandLabel}
        count={`${visibleEntries.length} de ${semanticCount} variables`}
      >
        <div className="rounded-lg border border-border bg-card p-4 text-sm text-foreground" aria-label="Cambios de tokens de la marca">
          <h3 className="m-0 font-semibold">Cambios en v{tokenChanges.release}</h3>
          <p>{newCount} nuevos · {updatedCount} actualizados · {semanticCount - newCount - updatedCount} sin cambios para {activeBrandLabel}.</p>
          <p className="mb-0">Antes = v{tokenChanges.baselineRelease} publicada. Ahora = v{tokenChanges.release} actual. La comparación no es contra la última sincronización. “Nuevo” indica incorporación al catálogo de código, no creación de la variable en Figma. “Actualizado” indica un cambio de valor. Los colores equivalentes en HEX y opacidad no se marcan; los cambios de nombre, referencia o formato sin cambio de valor tampoco.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3" role="group" aria-label="Filtrar tokens por cambios">
          <Button aria-pressed={!onlyUpdated} onClick={() => setOnlyUpdated(false)} className="border border-border bg-muted text-foreground hover:bg-background-hover aria-pressed:underline">Todos ({semanticCount})</Button>
          <Button aria-pressed={onlyUpdated} onClick={() => setOnlyUpdated(true)} className="border border-border bg-muted text-foreground hover:bg-background-hover aria-pressed:underline">Solo actualizados ({updatedCount})</Button>
          <span role="status" className="text-sm text-muted-foreground">{visibleEntries.length} tokens visibles en {activeBrandLabel}</span>
        </div>
        {visibleEntries.length === 0 && <p>No hay tokens actualizados para esta marca.</p>}
        <TokenColumns>
          {SEMANTIC_GROUPS.map((group) => {
            const entries = visibleEntries.filter(([name]) => group.prefixes.some((prefix) => name.startsWith(prefix)));
            return entries.length ? <TokenTable key={group.title} title={group.title} entries={entries} changes={changes} /> : null;
          })}
        </TokenColumns>
        {appointmentEntries.length > 0 && <AppointmentTable entries={appointmentEntries} changes={changes} />}
      </CollectionSection>

      {!onlyUpdated && <BrandBackgroundGradients brand={activeBrand} />}

      {!onlyUpdated && <CollectionSection
        title="Extra Colors"
        description="Paletas auxiliares organizadas como en Figma. Sin cambios respecto a v1.0.0; cada familia conserva sus cuatro niveles originales."
        modes="Mode 1"
        count="36 variables"
      >
        <TokenColumns>
          {Object.entries(extraColorTokenValues).map(([title, entries]) => <TokenTable key={title} title={title} entries={entries} />)}
        </TokenColumns>
      </CollectionSection>}
    </div>
  );
}
