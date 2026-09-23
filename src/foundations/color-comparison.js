// Normalize the formats in the exported catalog to 8-bit sRGB for comparison.
/** @param {string | null} value */
export function comparableColor(value) {
  if (!value) return null;
  let rgb;
  let alpha = 1;
  if (/^#[\da-f]{6}$/i.test(value)) {
    rgb = [1, 3, 5].map(index => parseInt(value.slice(index, index + 2), 16));
  } else if (/^(rgb|rgba|oklch)\(/.test(value)) {
    const body = value.slice(value.indexOf('(') + 1, -1);
    const [channels, opacity] = body.split('/');
    const numbers = channels.match(/-?[\d.]+/g)?.map(Number);
    if (!numbers || numbers.length < 3) return null;
    if (opacity) alpha = parseFloat(opacity) / (opacity.includes('%') ? 100 : 1);
    else if (numbers.length === 4) alpha = numbers[3];
    if (value.startsWith('oklch')) {
      const [L, C, h] = numbers;
      const a = C * Math.cos(h * Math.PI / 180), b = C * Math.sin(h * Math.PI / 180);
      const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
      const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
      const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
      rgb = [4.0767416621*l - 3.3077115913*m + 0.2309699292*s, -1.2684380046*l + 2.6097574011*m - 0.3413193965*s, -0.0041960863*l - 0.7034186147*m + 1.707614701*s]
        .map(c => 255 * Math.max(0, Math.min(1, c <= 0.0031308 ? 12.92*c : 1.055*c**(1/2.4)-0.055)));
    } else {
      if (channels.includes('%')) return null;
      rgb = numbers.slice(0, 3);
    }
  } else return null;
  if (![...rgb, alpha].every(Number.isFinite)) return null;
  const hex = '#' + rgb.map(c => Math.round(c).toString(16).padStart(2, '0')).join('');
  const opacity = Math.round(alpha * 1000) / 10;
  return { hex: hex.toUpperCase(), opacity, label: `${hex.toUpperCase()} · ${opacity}% de opacidad` };
}
