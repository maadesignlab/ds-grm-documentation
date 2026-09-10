import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

import { typographyStyles, type TypographyStyle } from './typography-style-values';

type BrandValue = 'grm-global' | 'reina-madre' | 'maria-linda' | 'piel-sana';
type GlobalsUpdatedPayload = { globals?: { brandTheme?: unknown } };

const BRAND_LABELS: Record<BrandValue, string> = {
  'grm-global': 'GRM Global',
  'reina-madre': 'Reina Madre',
  'maria-linda': 'María Linda',
  'piel-sana': 'Piel Sana',
};

const GROUP_LABELS: Record<string, string> = {
  display: 'Display',
  heading: 'Heading',
  body: 'Body',
  caption: 'Caption',
  mono: 'Mono',
  components: 'Components',
};

const getActiveBrand = (): BrandValue => {
  if (typeof document === 'undefined') return 'grm-global';
  const theme = document.documentElement.getAttribute('data-theme') as BrandValue | null;
  return theme && theme in BRAND_LABELS ? theme : 'grm-global';
};

const isBrandValue = (value: unknown): value is BrandValue =>
  typeof value === 'string' && value in BRAND_LABELS;

function getFontWeight(fontStyle: string): number {
  if (fontStyle.includes('Extra Bold')) return 800;
  if (fontStyle.includes('Semi Bold')) return 600;
  if (fontStyle.includes('Bold')) return 700;
  if (fontStyle.includes('Medium')) return 500;
  return 400;
}

function getPreviewStyle(style: TypographyStyle): CSSProperties {
  const isMono = style.familyToken.includes('mono') || style.family.includes('Mono');
  return {
    fontFamily: isMono ? 'var(--brand-font-mono)' : 'var(--brand-font-sans)',
    fontSize: `${style.size}px`,
    fontWeight: getFontWeight(style.fontStyle),
    fontStyle: style.fontStyle.includes('Italic') ? 'italic' : 'normal',
    lineHeight: style.lineHeight === 'Auto' ? 'normal' : style.lineHeight,
    letterSpacing: style.letterSpacing,
    textTransform: style.textCase === 'UPPER' ? 'uppercase' : style.textCase === 'TITLE' ? 'capitalize' : 'none',
    textDecoration: style.textDecoration === 'UNDERLINE' ? 'underline' : style.textDecoration === 'STRIKETHROUGH' ? 'line-through' : 'none',
  };
}

function getTailwindClasses(style: TypographyStyle): string {
  const sizeClasses: Record<number, string> = {
    30: 'text-3xl',
    24: 'text-2xl',
    20: 'text-xl',
    18: 'text-lg',
    16: 'text-base',
    14: 'text-sm',
    12: 'text-xs',
  };
  const lineHeightClasses: Record<string, string> = {
    Auto: 'leading-normal',
    '24px': 'leading-6',
    '20px': 'leading-5',
    '16px': 'leading-4',
  };
  const weightClasses: Record<number, string> = {
    400: 'font-normal',
    500: 'font-medium',
    600: 'font-semibold',
    700: 'font-bold',
    800: 'font-extrabold',
  };
  const sizeClass = sizeClasses[style.size] ?? (style.size === 12.8 ? 'text-[0.8rem]' : `text-[${style.size}px]`);
  const lineHeightClass = lineHeightClasses[style.lineHeight] ?? `leading-[${style.lineHeight}]`;
  const trackingClass = style.letterSpacing === '0%'
    ? 'tracking-normal'
    : `tracking-[${Number.parseFloat(style.letterSpacing) / 100}em]`;
  const caseClass = style.textCase === 'UPPER' ? 'uppercase' : style.textCase === 'TITLE' ? 'capitalize' : 'normal-case';
  const decorationClass = style.textDecoration === 'UNDERLINE' ? 'underline' : style.textDecoration === 'STRIKETHROUGH' ? 'line-through' : 'no-underline';
  const familyClass = style.familyToken.includes('mono') || style.family.includes('Mono') ? 'font-mono' : 'font-sans';
  const italicClass = style.fontStyle.includes('Italic') ? 'italic' : '';
  return [familyClass, sizeClass, lineHeightClass, weightClasses[getFontWeight(style.fontStyle)], trackingClass, caseClass, decorationClass, italicClass].filter(Boolean).join(' ');
}

function Property({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="typography-property grid gap-0.5">
      <span className="text-xs leading-4 font-medium tracking-(--docs-table-letter-spacing) text-muted-foreground uppercase">{label}</span>
      <span className="text-xs leading-4 text-foreground">{value}</span>
    </div>
  );
}

function StyleTable({ styles }: { styles: readonly TypographyStyle[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="typography-style-table">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <thead>
          <tr className="bg-muted">
            {['Estilo y muestra', 'Fuente', 'Métricas', 'Formato', 'Tailwind CSS', 'Variables'].map((column) => (
              <th key={column} className="border-0 border-b border-border px-4 py-(--docs-table-header-padding-block) text-left align-middle text-(length:--docs-table-header-font-size) leading-(--docs-table-line-height) font-semibold tracking-(--docs-table-letter-spacing) text-muted-foreground uppercase">{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {styles.map((style, index) => (
            <tr key={`${style.name}-${index}`} className="even:bg-muted/30 last:[&>td]:border-b-0">
              <td className="border-0 border-b border-border px-4 py-4 align-top"><code className="block text-xs leading-4 text-muted-foreground">{style.name}</code><span className="mt-3 block truncate text-foreground" style={getPreviewStyle(style)}>Aa Ag 0123</span></td>
              <td className="border-0 border-b border-border px-4 py-4 align-top"><div className="grid gap-2"><Property label="Familia" value={style.family} /><Property label="Peso" value={style.fontStyle} /></div></td>
              <td className="border-0 border-b border-border px-4 py-4 align-top"><div className="grid gap-2"><Property label="Tamaño" value={`${style.size}px`} /><Property label="Interlineado" value={style.lineHeight} /><Property label="Tracking" value={style.letterSpacing} /></div></td>
              <td className="border-0 border-b border-border px-4 py-4 align-top"><div className="grid gap-2"><Property label="Case" value={style.textCase} /><Property label="Decoración" value={style.textDecoration} /></div></td>
              <td className="border-0 border-b border-border px-4 py-4 align-top"><code className="block [overflow-wrap:anywhere] text-xs leading-5 text-foreground">{getTailwindClasses(style)}</code></td>
              <td className="border-0 border-b border-border px-4 py-4 align-top text-xs leading-4 text-muted-foreground"><code className="block [overflow-wrap:anywhere]">{style.familyToken || '—'}</code><code className="mt-1 block [overflow-wrap:anywhere]">{style.sizeToken || '—'}</code><code className="mt-1 block [overflow-wrap:anywhere]">{style.weightToken || '—'}</code>{style.lineHeightToken ? <code className="mt-1 block [overflow-wrap:anywhere]">{style.lineHeightToken}</code> : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TypographyTable() {
  const [activeBrand, setActiveBrand] = useState<BrandValue>(getActiveBrand);

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

  const groups = useMemo(() => {
    const result = new Map<string, TypographyStyle[]>();
    for (const style of typographyStyles) {
      const group = style.name.split('/')[0];
      result.set(group, [...(result.get(group) ?? []), style]);
    }
    return [...result.entries()];
  }, []);

  return (
    <div className="sb-unstyled not-prose mt-12 grid gap-16 text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card px-5 py-4">
        <div>
          <p className="m-0 text-sm leading-5 font-medium">Escala tipográfica</p>
          <p className="mb-0 mt-1 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">Las muestras usan la familia activa de {BRAND_LABELS[activeBrand]}.</p>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{typographyStyles.length} estilos</span>
      </header>

      {groups.map(([group, styles]) => (
        <section key={group} className="grid gap-4">
          <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
            <div>
              <h2 className="m-0 text-xl leading-7 font-semibold">{GROUP_LABELS[group] ?? group}</h2>
              <p className="mb-0 mt-1 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">Propiedades y variables vinculadas en Figma.</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">{styles.length} estilos</span>
          </div>
          <StyleTable styles={styles} />
        </section>
      ))}
    </div>
  );
}
