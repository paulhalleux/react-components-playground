export function rgba(hex: string) {
  if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    throw new Error(
      "Invalid hex color. Hex color should be in format #RRGGBB or #RRGGBBAA",
    );
  }

  const hexColor = hex.replace("#", "");
  const isShort = hexColor.length === 3;

  if (isShort) {
    const [r, g, b] = hexColor.split("");
    return `${parseInt(r + r, 16)}, ${parseInt(g + g, 16)}, ${parseInt(
      b + b,
      16,
    )}`;
  }

  const isAlpha = hexColor.length === 8;

  if (isAlpha) {
    const [r, g, b, a] = hexColor.match(/.{2}/g) as string[];
    return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}, ${
      parseInt(a, 16) / 255
    }`;
  }

  const [r, g, b] = hexColor.match(/.{2}/g) as string[];
  return `${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`;
}
