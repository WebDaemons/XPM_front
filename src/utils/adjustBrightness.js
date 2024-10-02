export function adjustBrightness(color, percent) {
  let hex = color.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((char) => char + char)
      .join('');
  }

  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);

  const newR = Math.min(255, Math.max(0, Math.round(r * (1 + percent / 100))));
  const newG = Math.min(255, Math.max(0, Math.round(g * (1 + percent / 100))));
  const newB = Math.min(255, Math.max(0, Math.round(b * (1 + percent / 100))));

  const toHex = (c) => c.toString(16).padStart(2, '0');

  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}
