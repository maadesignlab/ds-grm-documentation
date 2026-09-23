import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

import { CssExport, cssBlock } from './CssExport';

import { semanticBrandTokenValues } from './semantic-brand-token-values';

import { typographyStyles, type TypographyStyle } from './typography-style-values';

type BrandValue = 'grm-global' | 'reina-madre' | 'maria-linda' | 'piel-sana';
type GlobalsUpdatedPayload = { globals?: { brandTheme?: unknown } };

const BRAND_LABELS: Record<BrandValue, string> = {
  'grm-global': 'GRM Global',
  'reina-madre': 'Reina Madre',
  'maria-linda': 'María Linda',
  'piel-sana': 'Piel Sana',
};

function familyRole(style: TypographyStyle): 'heading' | 'sans' | 'mono' {
  if (style.familyToken.includes('mono') || style.family.includes('Mono')) return 'mono';
  return style.familyToken.includes('heading') ? 'heading' : 'sans';
}

function familyName(style: TypographyStyle, brand: BrandValue): string {
  return semanticBrandTokenValues[brand][`--brand-font-${familyRole(style)}`].split(',')[0].replaceAll('"', '').replace(' Variable', '');
}

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
  return {
    fontFamily: `var(--brand-font-${familyRole(style)})`,
    fontSize: `${style.size}px`,
    fontWeight: getFontWeight(style.fontStyle),
    fontStyle: style.fontStyle.includes('Italic') ? 'italic' : 'normal',
    lineHeight: style.lineHeight === 'Auto' ? 'normal' : style.lineHeight,
    letterSpacing: style.letterSpacing.endsWith("%") ? `${Number.parseFloat(style.letterSpacing) / 100}em` : style.letterSpacing,
    textTransform: style.textCase === 'UPPER' ? 'uppercase' : style.textCase === 'TITLE' ? 'capitalize' : 'none',
    textDecoration: style.textDecoration === 'UNDERLINE' ? 'underline' : style.textDecoration === 'STRIKETHROUGH' ? 'line-through' : 'none',
  };
}

export function typographyCss(brand: BrandValue): string {
  const selector = `[data-theme="${brand}"]`;
  const families = Object.entries(semanticBrandTokenValues[brand]).filter(([name]) => name.startsWith('--brand-font-'));
  const tokens: [string, string][] = [];
  const rules = typographyStyles.map(style => {
    const name = style.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
    const properties = Object.entries(getPreviewStyle(style)).map(([property, value]) => {
      const key = property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      const token = `--type-${name}-${key}`;
      tokens.push([token, String(value)]);
      return `  ${key}: var(${token});`;
    });
    return `/* ${style.name} */\n${selector} .type-${name}, ${selector}.type-${name} {\n${properties.join('\n')}\n}`;
  });
  return '/* Familias: carga las fuentes del proyecto antes de utilizar estos estilos. */\n'
    + cssBlock(selector, [...families, ...tokens]) + '\n' + rules.join('\n\n') + '\n';
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
    Auto: 'leading-[normal]',
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
    : style.letterSpacing.endsWith("%") ? `tracking-[${Number.parseFloat(style.letterSpacing) / 100}em]` : `tracking-[${style.letterSpacing}]`;
  const caseClass = style.textCase === 'UPPER' ? 'uppercase' : style.textCase === 'TITLE' ? 'capitalize' : 'normal-case';
  const decorationClass = style.textDecoration === 'UNDERLINE' ? 'underline' : style.textDecoration === 'STRIKETHROUGH' ? 'line-through' : 'no-underline';
  const familyClass = style.familyToken.includes('mono') || style.family.includes('Mono') ? 'font-mono' : 'font-sans';
  const italicClass = style.fontStyle.includes('Italic') ? 'italic' : '';
  return [familyClass, sizeClass, lineHeightClass, weightClasses[getFontWeight(style.fontStyle)], trackingClass, caseClass, decorationClass, italicClass].filter(Boolean).join(' ');
}

type StyleProperty = { label: string; value: string; token?: boolean };

function styleProperties(style: TypographyStyle, brand: BrandValue): StyleProperty[] {
  return [
    { label: 'Familia', value: familyName(style, brand) },
    { label: 'Tamaño', value: `${style.size}px` },
    { label: 'Interlineado', value: style.lineHeight },
    { label: 'Tracking', value: style.letterSpacing },
    { label: 'Case', value: style.textCase },
    { label: 'Decoración', value: style.textDecoration },
    { label: 'Variable de familia', value: style.familyToken || '—', token: true },
    { label: 'Variable de tamaño', value: style.sizeToken || '—', token: true },
    { label: 'Variable de interlineado', value: style.lineHeightToken || '—', token: true },
  ];
}

function Properties({ items }: { items: StyleProperty[] }) {
  if (!items.length) return null;
  return <dl className="m-0 flex flex-wrap gap-x-6 gap-y-3">
    {items.map(({ label, value, token }) => <div key={label} className="min-w-0">
      <dt className="text-xs leading-5 text-muted-foreground">{label}</dt>
      <dd className="m-0 text-sm leading-5 text-foreground">{token ? <code className="break-words text-xs">{value}</code> : value}</dd>
    </div>)}
  </dl>;
}

function StyleTable({ styles, brand, label }: { styles: readonly TypographyStyle[]; brand: BrandValue; label: string }) {
  const properties = styles.map(style => styleProperties(style, brand));
  const shared = properties[0].filter(item => properties.every(items => items.some(other => other.label === item.label && other.value === item.value)));
  const sharedLabels = new Set(shared.map(item => item.label));
  return <div aria-label={label} className="grid min-w-0 gap-4">
    <div className="grid gap-4 rounded-lg bg-muted p-5">
      <p className="m-0 text-xs font-semibold text-foreground">Común a estos {styles.length} {styles.length === 1 ? 'estilo' : 'estilos'}</p>
      <Properties items={shared.filter(item => !item.token)} />
      <div className="border-t border-border pt-3"><Properties items={shared.filter(item => item.token)} /></div>
    </div>
    <div className="grid min-w-0 gap-4 xl:grid-cols-2">
      {styles.map((style, index) => <article key={style.name} data-typography-style={style.name} className="flex min-w-0 flex-col rounded-lg border border-border bg-card">
        <div className="grid gap-5 p-5">
          <h5 className="m-0 break-words text-xs font-medium leading-5 text-muted-foreground">{style.name}</h5>
          <p data-typography-preview className="m-0 break-words text-foreground" style={getPreviewStyle(style)}>Aa Ag 0123</p>
          <Properties items={properties[index].filter(item => !item.token && !sharedLabels.has(item.label))} />
        </div>
        <div className="mt-auto grid gap-3 border-t border-border px-5 py-4">
          <div><p className="m-0 mb-1 text-xs font-medium text-muted-foreground">Tailwind CSS</p><code className="block break-words text-xs leading-5 text-foreground">{getTailwindClasses(style)}</code></div>
          <Properties items={properties[index].filter(item => item.token && !sharedLabels.has(item.label))} />
        </div>
      </article>)}
    </div>
  </div>;
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
    const sections = ['display', 'heading', 'body', 'caption', 'components'];
    const labels: Record<string, string> = { display: 'Display', heading: 'Heading', body: 'Body', caption: 'Caption', components: 'Excepciones tipográficas' };
    return sections.map(section => {
      const entries = typographyStyles.filter(style => style.name.split('/')[0] === section);
      const sizes = [...new Set(entries.map(style => style.size))].sort((a, b) => b - a);
      return {
        section, label: labels[section], id: `typography-${section}`, count: entries.length,
        sizes: sizes.map(size => {
          const styles = entries.filter(style => style.size === size);
          const scale = section === 'heading' || section === 'body' || section === 'caption'
            ? [...new Set(styles.map(style => style.name.split('/')[1].toUpperCase()))].join(' / ')
            : '';
          const families = [...new Set(styles.map(style => familyName(style, activeBrand)))];
          return { size, label: scale ? `${scale} · ${size} px` : `${size} px`, families: families.map(family => ({
            family, styles: styles.filter(style => familyName(style, activeBrand) === family)
              .sort((a, b) => getFontWeight(a.fontStyle) - getFontWeight(b.fontStyle) || a.name.localeCompare(b.name)),
          })) };
        }),
      };
    }).filter(group => group.count > 0);
  }, [activeBrand]);

  return (
    <div className="sb-unstyled not-prose mt-8 grid gap-12 text-foreground">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card px-5 py-4">
        <div>
          <p className="m-0 text-sm leading-5 font-medium">Escala tipográfica</p>
          <p className="mb-0 mt-1 text-(length:--docs-description-font-size) leading-5 text-muted-foreground">Las muestras usan la familia activa de {BRAND_LABELS[activeBrand]}.</p>
        </div>
        <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">{typographyStyles.length} estilos activos</span>
      </header>


      <nav aria-label="Secciones tipográficas" className="flex flex-wrap gap-3">
        {groups.map(({ label, id }) => (
          <a key={id} href={`#${id}`} className="rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground underline-offset-4 hover:underline">{label}</a>
        ))}
        <a href="#typography-export" className="rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground underline-offset-4 hover:underline">Exportar CSS ↓</a>
      </nav>

      {groups.map(({ section, label, id, count, sizes }) => {
        const Group = section === 'components' ? 'details' : 'section';
        const Heading = section === 'components' ? 'summary' : 'header';
        return (
        <Group key={section} id={id} aria-labelledby={`${id}-heading`} className="group scroll-mt-6">
          <Heading className={`flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4 ${section === 'components' ? 'cursor-pointer list-none rounded-sm focus-visible:outline-2 focus-visible:outline-ring' : ''}`}>
            <div>
              <h2 id={`${id}-heading`} className="m-0 text-2xl leading-8 font-semibold">{section === 'components' && <span aria-hidden="true" className="mr-2 inline-block text-base transition-transform group-open:rotate-90">▸</span>}{label}</h2>
              <p className="mb-0 mt-2 text-sm text-muted-foreground">{section === 'components'
                ? 'Estilos específicos de componentes, separados de la escala general.'
                : 'Tamaños de la escala, separados por familia tipográfica.'}</p>
            </div>
            <span className="text-xs text-muted-foreground">{sizes.length} tamaños · {count} estilos</span>
          </Heading>
          <div className="grid gap-8 pt-8">
          <nav aria-label={`Tamaños de ${label}`} className="flex flex-wrap gap-2">
            {sizes.map(({ size, label: sizeLabel }) => <a key={size} href={`#${id}-${size}`} className="rounded-md border border-border px-3 py-2 text-sm text-foreground underline-offset-4 hover:underline">{sizeLabel}</a>)}
          </nav>
          {sizes.map(({ size, label: sizeLabel, families }) => (
            <section key={size} id={`${id}-${size}`} aria-labelledby={`${id}-heading ${id}-${size}-heading`} className="grid scroll-mt-6 gap-5">
              <h3 id={`${id}-${size}-heading`} className="m-0 border-b border-border pb-3 text-lg font-semibold">{sizeLabel}</h3>
              {families.map(({ family, styles }, index) => (
                <section key={family} aria-labelledby={`${id}-heading ${id}-${size}-heading ${id}-${size}-family-${index}`} className="grid gap-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h4 id={`${id}-${size}-family-${index}`} className="m-0 text-base font-medium">{family}</h4>
                    <span className="text-xs text-muted-foreground">{styles.length} {styles.length === 1 ? 'estilo' : 'estilos'}</span>
                  </div>
                  <StyleTable styles={styles} brand={activeBrand} label={`${label} · ${sizeLabel} · ${family}`} />
                </section>
              ))}
            </section>
          ))}
          </div>
        </Group>
      );})}
      <section id="typography-export" aria-labelledby="typography-export-heading" className="grid scroll-mt-6 gap-4">
        <h2 id="typography-export-heading" className="m-0 text-2xl font-semibold">Exportar estilos</h2>
      <CssExport key={activeBrand} filename={`grm-typography-${activeBrand}.css`} description={`Variables CSS y clases de los ${typographyStyles.length} estilos de ${BRAND_LABELS[activeBrand]}, incluidas las excepciones. Requiere cargar las fuentes y aplicar data-theme="${activeBrand}".`} css={typographyCss(activeBrand)} />
      </section>
    </div>
  );
}
