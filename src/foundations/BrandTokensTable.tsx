import { useEffect, useMemo, useState } from 'react';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED } from 'storybook/internal/core-events';

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
    <div style={{ display: 'grid', gap: 24 }}>
      <section style={{ padding: 16, border: '1px solid var(--border)', borderRadius: 14, background: 'var(--card)', color: 'var(--foreground)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span aria-hidden="true" style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', borderRadius: 11, background: 'var(--secondary)', color: 'var(--primary)', fontSize: 20 }}>◉</span>
          <div>
            <h2 style={{ margin: 0, fontSize: 16 }}>Tokens de color</h2>
            <p style={{ margin: '3px 0 0', color: 'var(--muted-foreground)', fontSize: 13 }}>
              Modo activo del selector de la franja: <strong>{BRAND_LABELS[activeBrand]}</strong>. Ningún hex vive fuera del bloque <code>:root</code>.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))', gap: 8 }}>
          {MAIN_COLORS.map(({ token, label }) => (
            <article key={token} style={{ minWidth: 0, overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 10, background: 'var(--card)' }}>
              <div style={{ height: 38, background: `var(${token})` }} />
              <div style={{ minHeight: 38, padding: '7px 9px' }}>
                <strong style={{ display: 'block', fontSize: 11, lineHeight: 1.2 }}>{label}</strong>
                <code style={{ color: 'var(--muted-foreground)', fontSize: 10 }}>{token}</code>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: 4 }}>Lista global de tokens</h2>
        <p style={{ marginTop: 0, color: 'var(--muted-foreground)' }}>
          Los nombres son compartidos por todas las marcas; los valores corresponden a {BRAND_LABELS[activeBrand]}.
        </p>
        <div style={{ overflow: 'hidden', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--card)' }}>
          {tokenNames.map((token, index) => (
            <div key={token} style={{ display: 'grid', gridTemplateColumns: 'minmax(190px, 1fr) minmax(180px, 1fr)', gap: 16, alignItems: 'center', padding: '10px 12px', borderBottom: index < tokenNames.length - 1 ? '1px solid var(--border)' : undefined, background: index % 2 ? 'var(--background)' : 'var(--card)', fontSize: 13 }}>
              <code style={{ overflowWrap: 'anywhere' }}>{token}</code>
              <div style={{ display: 'grid', gridTemplateColumns: '28px minmax(0, 1fr)', gap: 10, alignItems: 'center' }}>
                <span aria-hidden="true" style={{ width: 28, height: 28, border: '1px solid var(--border)', borderRadius: 6, background: `var(${token})` }} />
                <code style={{ overflowWrap: 'anywhere' }}>{tokens[token]}</code>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
