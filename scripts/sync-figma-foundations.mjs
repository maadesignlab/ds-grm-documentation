import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const snapshot = JSON.parse(fs.readFileSync(path.join(root, 'design-system/figma-snapshot.json'), 'utf8'));
const brands = ['grm-global', 'reina-madre', 'maria-linda', 'piel-sana'];
const modeIds = ['1154:0', '44:8', '132:1', '132:2'];
const variables = new Map(snapshot.variables.map(v => [v[0], v]));
const semantic = snapshot.variables.filter(v => v[2] === 'VariableCollectionId:44:169');
const color = v => {
  if (!v || !['r', 'g', 'b'].every(k => Number.isFinite(v[k]))) throw new Error(`Invalid resolved color: ${JSON.stringify(v)}`);
  const rgb = ['r', 'g', 'b'].map(k => Number((v[k] * 255).toFixed(6)));
  if (rgb.every(c => Math.abs(c - Math.round(c)) < 0.00003) && (v.a ?? 1) === 1)
    return `#${rgb.map(c => Math.round(c).toString(16).padStart(2, '0')).join('')}`;
  return `rgb(${rgb.join(' ')} / ${Number(((v.a ?? 1) * 100).toFixed(6))}%)`;
};
function resolve(v, mode, seen = new Set()) {
  if (seen.has(v[0])) throw new Error(`Cyclic variable alias: ${v[1]}`);
  seen.add(v[0]);
  const value = v[4][mode] ?? Object.values(v[4])[0];
  if (value?.type === 'VARIABLE_ALIAS') {
    const target = variables.get(value.id);
    if (!target) throw new Error(`Missing alias ${value.id}`);
    return resolve(target, mode, seen);
  }
  if (value?.color?.type === 'VARIABLE_ALIAS') {
    const target = variables.get(value.color.id);
    if (!target) throw new Error(`Missing opacity alias ${value.color.id}`);
    const base = resolve(target, mode, seen);
    const opacity = value.opacity ?? 100;
    if (!Number.isFinite(opacity) || opacity < 0 || opacity > 100)
      throw new Error(`Invalid opacity percentage for ${v[1]}: ${opacity}`);
    return {...base, a: (base.a ?? 1) * opacity / 100};
  }
  return value;
}
const cssName = name => name.startsWith('typography/')
  ? `--brand-font-${name.slice('typography/'.length)}`
  : `--${name.replaceAll('%', '').replaceAll('/', '-')}`;
const cssValue = (v, mode) => {
  const value = resolve(v, mode);
  if (v[3] === 'COLOR') return color(value);
  if (v[1].startsWith('typography/')) {
    const fonts = {
      inter: '"Inter Variable", Inter, Arial, Helvetica, sans-serif',
      'jetbrains-mono': '"JetBrains Mono Variable", "JetBrains Mono", monospace',
      'plus-jakarta-sans': '"Plus Jakarta Sans Variable", "Plus Jakarta Sans", sans-serif',
      'kantumruy-pro': '"Kantumruy Pro Variable", "Kantumruy Pro", sans-serif',
    };
    const key = String(value).toLowerCase().replaceAll(' ', '-');
    if (!fonts[key]) throw new Error(`Unmapped Figma font: ${value}`);
    return fonts[key];
  }
  return String(value);
};
const byBrand = Object.fromEntries(brands.map((brand, i) => [brand, Object.fromEntries(semantic.map(v => [cssName(v[1]), cssValue(v, modeIds[i])]))]));
const cssPath = path.join(root, 'src/styles/tokens.css');
let css = fs.readFileSync(cssPath, 'utf8');
const generatedKeys = new Set(Object.keys(byBrand['grm-global']));
let matched = 0;
css = css.replace(/(:root|\[data-theme="(grm-global|reina-madre|maria-linda|piel-sana)"\])\s*\{([^{}]*)\}/g, (_, selector, brand, body) => {
  matched++;
  const values = byBrand[brand ?? 'grm-global'];
  let kept = body.replace(/\s*(--[\w/-]+)\s*:\s*[^;]+;/g, (line, key) => generatedKeys.has(key) ? '' : line);
  kept = kept.replace(/--primary-subtle:\s*[^;]+;/, '--primary-subtle: var(--primary-5);');
  kept = kept.replace(/\s*\/\* Semantic values generated from Figma\. \*\//g, '');
  return `${selector} {${kept.trimEnd()}\n\n  /* Semantic values generated from Figma. */\n${Object.entries(values).map(([k, v]) => `  ${k}: ${v};`).join('\n')}\n}`;
});
if (matched !== 5) throw new Error(`Expected 5 token blocks, found ${matched}`);
fs.writeFileSync(cssPath, css);
fs.writeFileSync(path.join(root, 'src/foundations/semantic-brand-token-values.ts'), `// Generated from design-system/figma-snapshot.json.\nexport const semanticBrandTokenValues = ${JSON.stringify(byBrand, null, 2)} as const;\n`);
const textStyles = snapshot.textStyles.map(([id, name, font, size, line, letter, textCase, textDecoration, bound]) => {
  const token = key => bound?.[key]?.id ? variables.get(bound[key].id)?.[1] ?? '' : '';
  return {name, family: font.family, fontStyle: font.style, size: Number(size.toFixed(4)), lineHeight: line.unit === 'AUTO' ? 'Auto' : `${line.value}${line.unit === 'PIXELS' ? 'px' : '%'}`, letterSpacing: `${letter.value}${letter.unit === 'PIXELS' ? 'px' : '%'}`, textCase, textDecoration, familyToken: token('fontFamily'), sizeToken: token('fontSize'), weightToken: token('fontWeight'), lineHeightToken: token('lineHeight'), figmaStyleId: id, figmaStyleKey: id.replace(/^S:/, '').replace(/,$/, ''), status: 'active'};
});
fs.writeFileSync(path.join(root, 'src/foundations/typography-style-values.ts'), `// Generated from design-system/figma-snapshot.json.\nexport const typographyStyles = ${JSON.stringify(textStyles, null, 2)} as const;\n\nexport type TypographyStyle = { [K in keyof (typeof typographyStyles)[number]]: K extends "size" ? number : string };\n`);
console.log(`Synced ${semantic.length} roles × 4 brands and ${textStyles.length} text styles from the Figma snapshot.`);

// Keep Storybook release labels in sync with regenerated token values.
await import('./generate-token-changes.mjs');
