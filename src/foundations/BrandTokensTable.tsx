import { useEffect, useMemo, useState } from 'react';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

import { cn } from '@/lib/utils';

type BrandValue = 'grm-global' | 'reina-madre' | 'maria-linda' | 'piel-sana';
type CssTokenMap = Record<string, string>;
type GlobalsUpdatedPayload = { globals?: { brandTheme?: unknown } };

const BRAND_LABELS: Record<BrandValue, string> = {
  'grm-global': 'GRM Global',
  'reina-madre': 'Reina Madre',
  'maria-linda': 'María Linda',
  'piel-sana': 'Piel Sana',
};

const MAIN_COLORS = [
  { token: '--primary', label: 'primary' },
  { token: '--primary-active', label: 'primary-active' },
  { token: '--secondary', label: 'secondary' },
  { token: '--accent', label: 'accent' },
  { token: '--background', label: 'background' },
  { token: '--muted', label: 'muted' },
  { token: '--sidebar-accent', label: 'sidebar/accent' },
  { token: '--success', label: 'success' },
  { token: '--warning', label: 'warning' },
  { token: '--error', label: 'error · validación' },
  { token: '--destructive', label: 'destructive · irreversible' },
  { token: '--info', label: 'info' },
] as const;

const PREFERRED_ORDER = [
  '--background', '--foreground', '--border', '--card', '--card-foreground',
  '--popover', '--popover-foreground', '--muted', '--muted-foreground',
  '--accent', '--accent-foreground', '--input', '--ring', '--sidebar',
  '--sidebar-foreground', '--sidebar-accent', '--sidebar-accent-foreground',
  '--sidebar-border', '--sidebar-ring', '--primary', '--primary-foreground',
  '--primary-hover', '--primary-active', '--secondary', '--secondary-foreground',
  '--secondary-hover', '--secondary-active', '--success', '--success-foreground',
  '--success-hover', '--success-active', '--warning', '--warning-foreground',
  '--warning-hover', '--warning-active', '--error', '--error-foreground',
  '--error-hover', '--error-active', '--destructive', '--destructive-foreground',
  '--destructive-hover', '--destructive-active', '--info', '--info-foreground',
  '--info-hover', '--info-active',
] as const;

const COLOR_VALUE_RE = /^(#|rgb\(|rgba\(|hsl\(|hsla\(|oklch\(|oklab\(|lab\(|hwb\(|color\(|var\(|transparent$|currentColor$)/i;

const getActiveBrand = (): BrandValue => {
  if (typeof document === 'undefined') return 'grm-global';
  const theme = document.documentElement.getAttribute('data-theme') as BrandValue | null;
  return theme && theme in BRAND_LABELS ? theme : 'grm-global';
};

const isBrandValue = (value: unknown): value is BrandValue =>
  typeof value === 'string' && value in BRAND_LABELS;

const readActiveColorTokens = (): CssTokenMap => {
  if (typeof document === 'undefined') return {};
  const computed = getComputedStyle(document.documentElement);
  const tokens: CssTokenMap = {};

  for (let index = 0; index < computed.length; index += 1) {
    const token = computed[index];
    if (!token.startsWith('--')) continue;
    const value = computed.getPropertyValue(token).trim();
    if (value && COLOR_VALUE_RE.test(value)) tokens[token] = value;
  }
  return tokens;
};

const sortTokens = (tokens: string[]): string[] => {
  const preferred = PREFERRED_ORDER.filter((token) => tokens.includes(token));
  const preferredSet = new Set<string>(preferred);
  const remaining = tokens
    .filter((token) => !preferredSet.has(token))
    .sort((a, b) => a.localeCompare(b));
  return [...preferred, ...remaining];
};

export function BrandTokensTable() {
  const [activeBrand, setActiveBrand] = useState<BrandValue>(getActiveBrand);
  const [tokens, setTokens] = useState<CssTokenMap>(readActiveColorTokens);

  useEffect(() => {
    const root = document.documentElement;
    const channel = addons.getChannel();
    let frame = 0;
    const updateTheme = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActiveBrand(getActiveBrand());
        setTokens(readActiveColorTokens());
      });
    };
    const observer = new MutationObserver(updateTheme);
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    const handleGlobalsUpdated = ({ globals }: GlobalsUpdatedPayload) => {
      const selectedBrand = globals?.brandTheme;
      if (!isBrandValue(selectedBrand)) return;

      root.setAttribute('data-theme', selectedBrand);
      try {
        localStorage.setItem('ds-brand-theme', selectedBrand);
      } catch {
        // Storage can be unavailable in private or restricted browser contexts.
      }
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

  const tokenNames = useMemo(() => sortTokens(Object.keys(tokens)), [tokens]);

  return (
    <div className="grid gap-6">
      <section className="rounded-[14px] border border-border bg-card p-4 text-foreground">
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden="true" className="grid size-9 place-items-center rounded-[11px] bg-secondary text-xl text-primary">◉</span>
          <div>
            <h2 className="m-0 text-base">Tokens de color</h2>
            <p className="mt-[3px] mb-0 text-(length:--docs-description-font-size) text-muted-foreground">
              Modo activo del selector de la franja: <strong>{BRAND_LABELS[activeBrand]}</strong>. Ningún hex vive fuera del bloque <code>:root</code>.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(128px,1fr))] gap-2">
          {MAIN_COLORS.map(({ token, label }) => (
            <article key={token} className="min-w-0 overflow-hidden rounded-[10px] border border-border bg-card">
              <div className="h-[38px]" style={{ background: `var(${token})` }} />
              <div className="min-h-[38px] px-[9px] py-[7px]">
                <strong className="block text-(length:--docs-table-header-font-size) leading-[1.2]">{label}</strong>
                <code className="text-(length:--docs-code-font-size) text-muted-foreground">{token}</code>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-1">Lista global de tokens</h2>
        <p className="mt-0 text-muted-foreground">
          Los nombres son compartidos por todas las marcas; los valores corresponden a {BRAND_LABELS[activeBrand]}.
        </p>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          {tokenNames.map((token, index) => (
            <div key={token} className={cn("grid grid-cols-[minmax(190px,1fr)_minmax(180px,1fr)] items-center gap-4 px-3 py-2.5 text-(length:--docs-description-font-size) even:bg-background", index < tokenNames.length - 1 && "border-b border-border")}>
              <code className="[overflow-wrap:anywhere]">{token}</code>
              <div className="grid grid-cols-[28px_minmax(0,1fr)] items-center gap-2.5">
                <span aria-hidden="true" className="size-7 rounded-md border border-border" style={{ background: `var(${token})` }} />
                <code className="[overflow-wrap:anywhere]">{tokens[token]}</code>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
